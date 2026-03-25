import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const dbFile = await prisma.file.findUnique({
      where: { id },
      include: { room: true },
    });

    if (!dbFile) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const cookieStore = await cookies();
    const hasAccess = cookieStore.get(`viora_room_${dbFile.roomId}`);

    if (!hasAccess && new Date() <= dbFile.room.expiresAt) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // file.path now holds the Vercel Blob public URL
    return NextResponse.redirect(dbFile.path);
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Failed to download file" }, { status: 500 });
  }
}
