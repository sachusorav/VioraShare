import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { RoomDashboard } from "@/components/room-dashboard";

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const roomId = id.toUpperCase();
  
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get(`viora_room_${roomId}`);

  if (!hasAccess) {
    redirect(`/?join=${roomId}`); 
  }

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      files: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!room) {
    redirect("/");
  }

  if (new Date() > room.expiresAt) {
    redirect("/"); 
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Ambient background */}
      <div className="fixed top-0 left-0 w-[50%] h-[50%] rounded-full bg-primary/8 blur-[140px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-blue-500/8 blur-[140px] -z-10 pointer-events-none" />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        <RoomDashboard initialFiles={room.files} roomId={room.id} expiresAt={room.expiresAt.toISOString()} />

        <footer className="mt-4 py-6 flex items-center justify-center gap-5 border-t border-border/20">
          <Link href="/help" className="text-[11px] text-muted-foreground/40 hover:text-primary transition-colors">Help</Link>
          <Link href="/privacy" className="text-[11px] text-muted-foreground/40 hover:text-primary transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[11px] text-muted-foreground/40 hover:text-primary transition-colors">Terms</Link>
        </footer>
      </main>
    </div>
  );
}
