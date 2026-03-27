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
      {/* Background gradients */}
      <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] -z-10 pointer-events-none" />
      
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 pt-8 md:pt-12 relative z-10 flex flex-col h-full">
        <RoomDashboard initialFiles={room.files} roomId={room.id} expiresAt={room.expiresAt.toISOString()} />
        
        <footer className="mt-auto py-12 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-6 text-[10px] text-muted-foreground/30 uppercase tracking-[0.2em] font-medium">
            <Link href="/help" className="hover:text-primary transition-colors">Help</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
          <p className="text-[10px] text-muted-foreground/20 uppercase tracking-[0.3em]">
            VioraShield™ Protected Environment
          </p>
        </footer>
      </main>
    </div>
  );
}
