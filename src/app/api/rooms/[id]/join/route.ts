import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { passcode } = await req.json();

    if (!passcode) {
      return NextResponse.json({ error: "Passcode is required" }, { status: 400 });
    }

    const room = await prisma.room.findUnique({
      where: { id: id.toUpperCase() },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    if (new Date() > room.expiresAt) {
      return NextResponse.json({ error: "Room has expired" }, { status: 410 });
    }

    const isMatch = await bcrypt.compare(passcode, room.passcode);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid passcode" }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(`viora_room_${room.id}`, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: room.expiresAt,
    });

    return NextResponse.json({ success: true, roomId: room.id });
  } catch (error) {
    console.error("Error joining room:", error);
    return NextResponse.json({ error: "Failed to join room" }, { status: 500 });
  }
}
