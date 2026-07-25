import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { del } from "@vercel/blob";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const roomId = id.toUpperCase();

  try {
    // 1. Find all files associated with this room to delete them from Vercel Blob
    const files = await prisma.file.findMany({
      where: { roomId },
      select: { path: true },
    });

    // 2. Delete files from Vercel Blob
    const deletePromises = files.map((file) => {
      try {
        return del(file.path);
      } catch (err) {
        console.error(`Failed to delete file from blob: ${file.path}`, err);
        return null;
      }
    });
    await Promise.all(deletePromises);

    // 3. Delete room from Prisma (cascade deletes File, Message, Note records)
    await prisma.room.delete({
      where: { id: roomId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete room:", error);
    return NextResponse.json({ error: "Failed to delete room" }, { status: 500 });
  }
}
