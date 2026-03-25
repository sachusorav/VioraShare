import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const roomId = formData.get("roomId") as string;

    if (!file || !roomId) {
      return NextResponse.json({ error: "File and Room ID are required" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const hasAccess = cookieStore.get(`viora_room_${roomId}`);

    if (!hasAccess) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room || new Date() > room.expiresAt) {
      return NextResponse.json({ error: "Room is invalid or expired" }, { status: 410 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "uploads", roomId);
    
    await fs.mkdir(uploadDir, { recursive: true });
    
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueName = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadDir, uniqueName);
    
    await fs.writeFile(filePath, buffer);

    const dbFile = await prisma.file.create({
      data: {
        roomId,
        name: file.name,
        size: file.size,
        mimeType: file.type,
        path: `uploads/${roomId}/${uniqueName}`,
      },
    });

    return NextResponse.json({ success: true, file: dbFile });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
