export const dynamic = 'force-static';
export const revalidate = false;

import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeForms } from "@/components/home-forms";
import { SocialLinks } from "@/components/social-links";

export const metadata: Metadata = {
  title: "VioraShare - Free Secure File Sharing | No Login Required",
  description: "Share files instantly with VioraShare. No login, no account, no trace. Create a private room, upload files, and share a link — files auto-delete after 15 min, 1 hour, or 24 hours.",
  keywords: "free file sharing, no login file sharing, temporary file sharing, secure file transfer, anonymous file sharing, share files online, no account file sharing",
  alternates: {
    canonical: "https://www.viorashare.online",
  },
  openGraph: {
    title: "VioraShare - Free Secure File Sharing | No Login Required",
    description: "Share files instantly with VioraShare. No login, no account, no trace. Create a private room, upload files, and share a link — files auto-delete after 15 min, 1 hour, or 24 hours.",
    url: "https://www.viorashare.online",
    type: "website",
    images: [{ url: "/icon.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "VioraShare",
    "url": "https://www.viorashare.online",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": { 
      "@type": "Offer",
      "price": "0", 
      "priceCurrency": "USD" 
    },
    "description": "Free secure temporary file sharing with no login required.",
    "author": {
      "@type": "Person",
      "name": "Sachin Kumar"
    },
    "screenshot": {
      "@type": "ImageObject",
      "url": "https://www.viorashare.online/icon.png"
    },
    "featureList": "No login required, Self-destruct mode, Room passcodes, Shared clipboard, Auto-expiring rooms, Zero tracking",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "inLanguage": "en",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "24",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Background gradients for premium feel */}
      <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[80px] -z-10 pointer-events-none" />
      
      <div className="text-center mb-12 animate-in fade-in duration-300 mt-12 md:mt-24">
        <h1 className="text-6xl md:text-7xl font-bold font-heading tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
          VioraShare.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-medium">
          Send files. No login. No trace.
        </p>
      </div>

      <div className="w-full animate-in fade-in zoom-in-95 duration-1000 delay-150 relative z-10 p-2 md:p-6 pb-24 flex flex-col items-center">
        <Suspense fallback={<div className="w-full max-w-md mx-auto h-96 bg-card/60 animate-pulse rounded-xl" />}>
          <HomeForms />
        </Suspense>

        <section className="max-w-4xl w-full mt-24 space-y-16 py-12 md:py-24 border-t border-muted-foreground/10">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why VioraShare?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">No Account Needed</h3>
                <p className="text-muted-foreground text-sm">Just create a room and share. No sign-up, no email, no passwords.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Self-Destruct Mode</h3>
                <p className="text-muted-foreground text-sm">Files are permanently deleted from our servers immediately after the first download.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Flexible Expiry</h3>
                <p className="text-muted-foreground text-sm">Choose how long your room lives: 15 minutes, 1 hour, or 24 hours.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Room Passcodes</h3>
                <p className="text-muted-foreground text-sm">Lock your sharing room with a passcode for extra privacy.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Shared Clipboard & Chat</h3>
                <p className="text-muted-foreground text-sm">Share text snippets and chat inside the room alongside your files.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Zero Tracking</h3>
                <p className="text-muted-foreground text-sm">We don&apos;t track IPs, set profiling cookies, or store personal data.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="text-3xl font-black text-primary/20">1.</div>
                <h3 className="text-lg font-bold">Create a Room</h3>
                <p className="text-muted-foreground text-sm">Click to generate a private sharing room instantly.</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-black text-primary/20">2.</div>
                <h3 className="text-lg font-bold">Upload Your Files</h3>
                <p className="text-muted-foreground text-sm">Add files, text, or links to your room.</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-black text-primary/20">3.</div>
                <h3 className="text-lg font-bold">Share the Link</h3>
                <p className="text-muted-foreground text-sm">Send the room link. It expires automatically.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-2xl w-full mt-12 text-center">
          <p className="text-muted-foreground font-medium leading-relaxed">
            VioraShare is the easiest way to share files online without creating an account. Whether you need to send documents, images, or any file to a friend or colleague — VioraShare gives you a private, temporary room that disappears when you&apos;re done.
          </p>
        </div>
        
        <SocialLinks />

        <footer className="mt-12 text-center text-[10px] text-muted-foreground/40 space-y-3">
          <div className="flex items-center justify-center gap-4">
            <Link href="/help" className="hover:text-primary transition-colors">Help & FAQ</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center justify-center">
            <Link 
              href="https://www.linkedin.com/posts/sachinkumar014_viorashare-secure-temporary-file-sharing-activity-7442886400578084864-Mbf7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-all duration-300 py-1 px-3 rounded-full bg-muted/20 border border-muted-foreground/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <span className="font-bold tracking-tight">Official Announcement</span>
            </Link>
          </div>
          <p>© 2026 VioraShare by Sachin Kumar. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
