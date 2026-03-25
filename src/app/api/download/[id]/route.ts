import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

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
    const filePath = path.join(/* turbopackIgnore: true */ process.cwd(), dbFile.path);
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${dbFile.name}"`,
        "Content-Type": dbFile.mimeType || "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Failed to download file" }, { status: 500 });
  }
}
