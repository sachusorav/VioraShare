import prisma from "@/lib/prisma";
import { AdminDashboardClient } from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const now = new Date();

  // 1. Total active rooms
  const activeRooms = await prisma.room.count({
    where: { expiresAt: { gt: now } },
  });

  // 2. Total rooms created (All-time, Today, This week)
  const allTimeRooms = await prisma.room.count();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todayRooms = await prisma.room.count({
    where: { createdAt: { gte: startOfToday } },
  });

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  const weekRooms = await prisma.room.count({
    where: { createdAt: { gte: startOfWeek } },
  });

  // 3. Files & Storage
  const fileStats = await prisma.file.aggregate({
    _count: true,
    _sum: { size: true },
  });

  const totalFiles = fileStats._count || 0;
  const totalStorageBytes = fileStats._sum.size || 0;

  // 4. Expiry & Passcode breakdown
  const rooms = await prisma.room.findMany({
    select: {
      createdAt: true,
      expiresAt: true,
      passcode: true,
    },
  });

  let passcodedCount = 0;
  let noPasscodeCount = 0;
  let exp15m = 0;
  let exp1h = 0;
  let exp24h = 0;
  let otherExp = 0;

  rooms.forEach((r) => {
    // Passcode check
    if (r.passcode && r.passcode.trim() !== "") {
      passcodedCount++;
    } else {
      noPasscodeCount++;
    }

    // Expiry breakdown
    const diffMs = r.expiresAt.getTime() - r.createdAt.getTime();
    const diffMins = Math.round(diffMs / 1000 / 60);

    if (diffMins <= 16) {
      exp15m++;
    } else if (diffMins <= 65) {
      exp1h++;
    } else if (diffMins <= 1445) {
      exp24h++;
    } else {
      otherExp++;
    }
  });

  // 5. Chart Data: rooms created per day in the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const chartRooms = await prisma.room.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const dateCounts: Record<string, number> = {};
  // Initialize last 30 days
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    dateCounts[dateStr] = 0;
  }

  chartRooms.forEach((r) => {
    const dateStr = r.createdAt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    if (dateCounts[dateStr] !== undefined) {
      dateCounts[dateStr]++;
    }
  });

  const chartData = Object.entries(dateCounts).map(([date, count]) => ({
    date,
    rooms: count,
  }));

  // 6. Recent Rooms list (last 10)
  const recentRooms = await prisma.room.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      _count: {
        select: { files: true, messages: true, notes: true },
      },
    },
  });

  const recentRoomsFormatted = recentRooms.map((r) => ({
    id: r.id,
    createdAt: r.createdAt.toISOString(),
    expiresAt: r.expiresAt.toISOString(),
    filesCount: r._count.files,
    messagesCount: r._count.messages,
    notesCount: r._count.notes,
    hasPasscode: r.passcode.trim() !== "",
  }));

  return (
    <AdminDashboardClient
      stats={{
        activeRooms,
        allTimeRooms,
        todayRooms,
        weekRooms,
        totalFiles,
        totalStorageBytes,
        passcodedCount,
        noPasscodeCount,
        exp15m,
        exp1h,
        exp24h,
        otherExp,
      }}
      chartData={chartData}
      recentRooms={recentRoomsFormatted}
    />
  );
}
