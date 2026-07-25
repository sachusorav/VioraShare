import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { DonationCard } from "@/components/donation-card";

export const metadata: Metadata = {
  title: "Support VioraShare - Help Us Keep File Sharing Free",
  description: "VioraShare is free, anonymous, and ad-free. If you find the tool useful, consider supporting us to help cover server and hosting costs.",
  alternates: {
    canonical: "https://www.viorashare.online/support",
  },
};

export default function SupportPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-screen">
      {/* Background gradients */}
      <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[80px] -z-10 pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center gap-6 relative z-10">
        <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
          <Image src="/icon.png" alt="VioraShare" width={40} height={40} />
          <span className="text-2xl font-bold font-heading">VioraShare.</span>
        </Link>

        <DonationCard />

        <Link 
          href="/" 
          className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          ← Back to Homepage
        </Link>
      </div>

      <footer className="mt-12 text-center text-[10px] text-muted-foreground/40">
        <p>© 2026 VioraShare by Sachin Kumar. All rights reserved.</p>
      </footer>
    </main>
  );
}
