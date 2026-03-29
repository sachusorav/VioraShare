import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  // Simple Admin Secret Check
  if (!secret || secret !== process.env.ADMIN_SECRET) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rooms = await prisma.room.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            files: true,
            notes: true,
            messages: true,
          },
        },
      },
    });

    const stats = {
      totalRooms: rooms.length,
      activeRooms: rooms.filter(r => new Date(r.expiresAt) > new Date()).length,
      totalFiles: rooms.reduce((acc, r) => acc + r._count.files, 0),
    };

    return NextResponse.json({ rooms, stats });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  const roomId = searchParams.get('id');

  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!roomId) {
    return NextResponse.json({ error: 'Room ID required' }, { status: 400 });
  }

  try {
    await prisma.room.delete({
      where: { id: roomId },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
