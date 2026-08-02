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
  description: "Send files too big, too sensitive, or too private for WhatsApp. No login. No account. Files auto-delete after 15 min, 1 hour, or 24 hours. Faster and more private than Google Drive.",
  keywords: "free file sharing, no login file sharing, temporary file sharing, secure file transfer, anonymous file sharing, share files online, no account file sharing, whatsapp alternative file sharing",
  alternates: {
    canonical: "https://www.viorashare.online",
  },
  openGraph: {
    title: "VioraShare - Send Files Without Login | Auto-Delete File Sharing",
    description: "Send files too big, too sensitive, or too private for WhatsApp. No login. No account. Auto-deletes. Done in seconds.",
    url: "https://www.viorashare.online",
    type: "website",
    images: [{ url: "/icon.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const trustBadges = [
  { icon: ShieldCheck, label: "No account needed" },
  { icon: Timer, label: "Auto-deletes" },
  { icon: Ghost, label: "Zero traces" },
  { icon: Zap, label: "Done in seconds" },
];

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
    "description": "Send files too big, too sensitive, or too private for WhatsApp. No login required. Auto-deletes.",
    "author": {
      "@type": "Person",
      "name": "Sachin Kumar"
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
    <main className="flex-1 flex flex-col items-center px-4 py-6 relative overflow-hidden min-h-screen w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background gradients */}
      <div className="absolute top-0 left-[5%] w-[50%] h-[50%] rounded-full bg-primary/15 blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[5%] right-[5%] w-[45%] h-[45%] rounded-full bg-blue-500/15 blur-[100px] -z-10 pointer-events-none" />

      {/* ── Hero ── */}
      <section className="w-full max-w-2xl mx-auto text-center mt-8 md:mt-12 mb-8 animate-in fade-in duration-500">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Free · Anonymous · Instant
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tight leading-[1.1] mb-4">
          Send files too{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/60">
            big, too sensitive,
          </span>
          <br className="hidden sm:block" />
          {" "}or too private for WhatsApp.
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground font-medium mb-6 max-w-xl mx-auto leading-relaxed">
          No login. No account. Files auto-delete after your chosen time.{" "}
          <span className="text-foreground/80 font-semibold">Done in seconds.</span>
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {trustBadges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/60 border border-border/50 text-xs font-semibold text-muted-foreground backdrop-blur"
            >
              <Icon className="w-3.5 h-3.5 text-primary" />
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* ── Upload Flow (visual centerpiece) ── */}
      <div className="w-full max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500 delay-100">
        <Suspense fallback={<div className="w-full h-72 bg-card/60 animate-pulse rounded-2xl" />}>
          <HomeForms />
        </Suspense>
      </div>

      {/* ── Comparison Strip ── */}
      <div className="w-full max-w-2xl mx-auto animate-in fade-in duration-700 delay-200">
        <ComparisonStrip />
      </div>

      {/* ── Why VioraShare feature grid ── */}
      <section className="w-full max-w-4xl mx-auto mt-16 mb-8 space-y-12 py-12 border-t border-muted-foreground/10">
        <div className="space-y-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Why VioraShare?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "No Account Needed", desc: "Just create a room and share. No sign-up, no email, no passwords." },
              { title: "Self-Destruct Mode", desc: "Files are permanently deleted after the first download — zero traces." },
              { title: "Flexible Expiry", desc: "Choose 15 minutes, 1 hour, or 24 hours — your files, your rules." },
              { title: "Room Passcodes", desc: "Lock your sharing room with a passcode for extra privacy." },
              { title: "Shared Clipboard & Chat", desc: "Share text snippets and chat alongside your files in real-time." },
              { title: "Zero Tracking", desc: "We don't track IPs, set profiling cookies, or store personal data." },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl bg-card/30 border border-border/40 backdrop-blur text-left space-y-1.5 hover:bg-card/50 transition-colors"
              >
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="space-y-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">3 Steps. No friction.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Create a Room", desc: "Instant private room — no sign-up needed." },
              { step: "2", title: "Upload Your Files", desc: "Drop files, add text, or paste links." },
              { step: "3", title: "Share the Link", desc: "Send the link. It expires automatically." },
            ].map((item) => (
              <div key={item.step} className="space-y-2">
                <div className="text-4xl font-black text-primary/20">{item.step}.</div>
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SocialLinks />

      <footer className="mt-10 mb-6 text-center text-[10px] text-muted-foreground/40 space-y-3">
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
            className="flex items-center gap-1.5 hover:text-primary transition-all duration-300 py-1 px-3 rounded-full bg-muted/20 border border-muted-foreground/10"
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
