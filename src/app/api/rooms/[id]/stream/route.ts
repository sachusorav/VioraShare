import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const roomId = id.toUpperCase();

  let isClosed = false;
  let currentLastMessageTime = new Date(0);
  let currentLastFileTime = new Date(0);

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const sendEvent = (event: string, data: any) => {
        if (isClosed) return;
        try {
          controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
        } catch {}
      };

      // Send full initial state immediately
      try {
        const room = await prisma.room.findUnique({
          where: { id: roomId },
          include: {
            messages: { orderBy: { createdAt: "asc" } },
            files: { orderBy: { createdAt: "desc" } },
            notes: { orderBy: { createdAt: "desc" } },
          },
        });

        if (!room) {
          sendEvent("error", { message: "Room not found" });
          controller.close();
          isClosed = true;
          return;
        }

        sendEvent("init", {
          messages: room.messages,
          files: room.files,
          notes: room.notes,
        });

        if (room.messages.length > 0) {
          currentLastMessageTime = room.messages[room.messages.length - 1].createdAt;
        }
        if (room.files.length > 0) {
          currentLastFileTime = room.files[0].createdAt;
        }
      } catch (err) {
        console.error("SSE init error:", err);
      }

      // Delta polling every 1 second
      const pollInterval = setInterval(async () => {
        if (isClosed) return clearInterval(pollInterval);
        try {
          const [newMessages, newFiles, allNotes] = await Promise.all([
            prisma.message.findMany({
              where: { roomId, createdAt: { gt: currentLastMessageTime } },
              orderBy: { createdAt: "asc" },
            }),
            prisma.file.findMany({
              where: { roomId, createdAt: { gt: currentLastFileTime } },
              orderBy: { createdAt: "desc" },
            }),
            prisma.note.findMany({
              where: { roomId },
              orderBy: { createdAt: "desc" },
            }),
          ]);

          if (newMessages.length > 0) {
            sendEvent("new_messages", newMessages);
            currentLastMessageTime = newMessages[newMessages.length - 1].createdAt;
          }

          if (newFiles.length > 0) {
            sendEvent("new_files", newFiles);
            currentLastFileTime = newFiles[0].createdAt;
          }

          // Sync notes fully (they're small)
          sendEvent("sync_notes", allNotes);
        } catch (err) {
          console.error("SSE poll error:", err);
        }
      }, 1000);

      req.signal.addEventListener("abort", () => {
        isClosed = true;
        clearInterval(pollInterval);
        try { controller.close(); } catch {}
      });
    },
    cancel() {
      isClosed = true;
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}
