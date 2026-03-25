import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

function generateRoomId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(req: Request) {
  try {
    const { passcode, expiresIn } = await req.json();

    if (!passcode) {
      return NextResponse.json({ error: "Passcode is required" }, { status: 400 });
    }

    const roomId = generateRoomId();
    const expiresAt = new Date(Date.now() + parseInt(expiresIn) * 60 * 1000);
    const hashedPasscode = await bcrypt.hash(passcode, 10);

    const room = await prisma.room.create({
      data: {
        id: roomId,
        passcode: hashedPasscode,
        expiresAt,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set(`viora_room_${roomId}`, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
    });

    return NextResponse.json({ success: true, roomId: room.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json({ error: "Failed to create room" }, { status: 500 });
  }
}
