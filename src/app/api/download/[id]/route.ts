import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { del } from "@vercel/blob";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Increment download count
    const updatedFile = await prisma.file.update({
      where: { id },
      data: { downloadCount: { increment: 1 } },
    });

    // Handle self-destruct logic
    if (updatedFile.selfDestruct && updatedFile.downloadCount >= 1) {
      // Delete from Vercel Blob
      await del(file.path);
      // Delete from Database
      await prisma.file.delete({
        where: { id },
      });
    }

    // Redirect to the actual file URL
    return NextResponse.redirect(file.path);
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Failed to process download" }, { status: 500 });
  }
}
