import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { RoomDashboard } from "@/components/room-dashboard";
import { SocialLinks } from "@/components/social-links";

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Room {room.id}
            </h1>
            <p className="text-muted-foreground mt-1">
              Expires at {new Date(room.expiresAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <RoomDashboard initialFiles={room.files} roomId={room.id} />
        
        <div className="mt-auto pt-12 flex justify-center pb-8">
          <SocialLinks />
        </div>
      </main>
    </div>
  );
}
