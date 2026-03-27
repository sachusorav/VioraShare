import Image from "next/image";
import Link from "next/link";
import { HomeForms } from "@/components/home-forms";
import { SocialLinks } from "@/components/social-links";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-screen">
      {/* Background gradients for premium feel */}
      <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] -z-10 pointer-events-none" />
      
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-12 md:mt-24 flex flex-col items-center gap-6">
        <div className="relative w-20 h-20 md:w-24 md:h-24 p-0.5 rounded-full bg-gradient-to-tr from-primary to-blue-600 shadow-2xl shadow-primary/20 ring-4 ring-background">
          <div className="w-full h-full rounded-full bg-background overflow-hidden flex items-center justify-center">
            <Image 
              src="/icon.png" 
              alt="VioraShare Logo" 
              width={100} 
              height={100} 
              className="object-contain scale-75"
            />
          </div>
        </div>
        <div>
          <h1 className="text-6xl md:text-7xl font-bold font-heading tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
            VioraShare.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            Send files. No login. No trace.
          </p>
        </div>
      </div>

      <div className="w-full animate-in fade-in zoom-in-95 duration-1000 delay-150 relative z-10 p-2 md:p-6 pb-24 flex flex-col items-center">
        <Suspense fallback={<div className="w-full max-w-md mx-auto h-96 bg-card/60 animate-pulse rounded-xl" />}>
          <HomeForms />
        </Suspense>
        
        <SocialLinks />

        <footer className="mt-12 text-center text-[10px] text-muted-foreground/40 space-y-2">
          <div className="flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
          <p>© 2026 VioraShare by Sachin Kumar. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
