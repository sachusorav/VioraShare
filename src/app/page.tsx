export const dynamic = 'force-static';
export const revalidate = false;

import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { HomeForms } from "@/components/home-forms";
import { SocialLinks } from "@/components/social-links";
import { ComparisonStrip } from "@/components/comparison-strip";
import { ShieldCheck, Timer, Ghost, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "VioraShare - Send Files Without Login | Auto-Delete File Sharing",
  description: "Send files too big, too sensitive, or too private for WhatsApp. No login. No account. Files auto-delete after 15 min, 1 hour, or 24 hours.",
  keywords: "free file sharing, no login file sharing, temporary file sharing, secure file transfer, anonymous file sharing",
  alternates: { canonical: "https://www.viorashare.online" },
  openGraph: {
    title: "VioraShare - Send Files Without Login",
    description: "No login. Auto-delete. Done in seconds.",
    url: "https://www.viorashare.online",
    type: "website",
    images: [{ url: "/icon.png" }],
  },
  twitter: { card: "summary_large_image" },
};

const trustBadges = [
  { icon: ShieldCheck, label: "No account" },
  { icon: Timer, label: "Auto-deletes" },
  { icon: Ghost, label: "Zero traces" },
  { icon: Zap, label: "Instant" },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "VioraShare",
    "url": "https://www.viorashare.online",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Send files without login. Auto-delete file sharing.",
    "author": { "@type": "Person", "name": "Sachin Kumar" },
    "featureList": "No login required, Self-destruct mode, Room passcodes, Shared clipboard, Auto-expiring rooms, Zero tracking",
    "inLanguage": "en",
  };

  return (
    <main className="flex-1 flex flex-col items-center relative overflow-x-hidden w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Background gradients */}
      <div className="fixed top-0 left-[5%] w-[50%] h-[60%] rounded-full bg-primary/10 blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-[5%] w-[45%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] -z-10 pointer-events-none" />

      {/* ── ABOVE THE FOLD: compact hero + form side by side ── */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 min-h-[calc(100vh-72px)] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 py-8">

        {/* LEFT: Compact value prop */}
        <div className="flex-1 text-center lg:text-left space-y-4 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3" />
            Free · Anonymous · Instant
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight leading-[1.15]">
            Send files too private<br />
            for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
              WhatsApp.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            No login. No account. Files auto-delete — 15 min, 1 hour, or 24 hours.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {trustBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card/60 border border-border/50 text-xs font-semibold text-muted-foreground"
              >
                <Icon className="w-3 h-3 text-primary" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: The upload form — the actual product */}
        <div className="w-full max-w-md flex-shrink-0">
          <Suspense fallback={<div className="w-full h-72 bg-card/60 animate-pulse rounded-2xl" />}>
            <HomeForms />
          </Suspense>
        </div>
      </section>

      {/* ── BELOW THE FOLD: marketing / comparison ── */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16 space-y-16 border-t border-muted-foreground/10 pt-12">

        {/* Comparison strip */}
        <ComparisonStrip />

        {/* Feature cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center tracking-tight">Why VioraShare?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "No Account Needed", desc: "Just create a room and share. No sign-up, no email, no passwords." },
              { title: "Self-Destruct Mode", desc: "Files are permanently deleted after the first download — zero traces." },
              { title: "Flexible Expiry", desc: "Choose 15 minutes, 1 hour, or 24 hours — your files, your rules." },
              { title: "Room Passcodes", desc: "Lock your sharing room with a passcode for extra privacy." },
              { title: "Shared Clipboard & Chat", desc: "Share text snippets and chat alongside your files in real-time." },
              { title: "Zero Tracking", desc: "We don't track IPs, set profiling cookies, or store personal data." },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl bg-card/30 border border-border/40 space-y-1.5 hover:bg-card/50 transition-colors">
                <h3 className="text-sm font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight">3 Steps. No friction.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Create a Room", desc: "Instant private room — no sign-up needed." },
              { step: "2", title: "Upload Files", desc: "Drop files, add text, or paste links." },
              { step: "3", title: "Share the Link", desc: "Send the link. It expires automatically." },
            ].map((item) => (
              <div key={item.step} className="space-y-2">
                <div className="text-3xl font-black text-primary/20">{item.step}.</div>
                <h3 className="text-sm font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <SocialLinks />
      </div>

      <footer className="w-full border-t border-muted-foreground/10 py-6 text-center text-[10px] text-muted-foreground/40 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/help" className="hover:text-primary transition-colors">Help & FAQ</Link>
          <Link href="/support" className="hover:text-primary transition-colors font-bold">Support Us</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
        <div className="flex items-center justify-center">
          <Link
            href="https://www.linkedin.com/posts/sachinkumar014_viorashare-secure-temporary-file-sharing-activity-7442886400578084864-Mbf7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-primary transition-all py-1 px-3 rounded-full bg-muted/20 border border-muted-foreground/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span className="font-bold tracking-tight">Official Announcement</span>
          </Link>
        </div>
        <p>© 2026 VioraShare by Sachin Kumar. All rights reserved.</p>
      </footer>
    </main>
  );
}
