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

      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[55%] h-[55%] rounded-full bg-blue-500/8 blur-[120px]" />
      </div>

      {/* ══════════════════════════════════════════════
          ABOVE THE FOLD
          Mobile: compact stacked (hero → form, no gap)
          Desktop: two-column, full viewport height
      ══════════════════════════════════════════════ */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
                          flex flex-col lg:flex-row lg:items-center lg:justify-center
                          gap-6 lg:gap-20
                          pt-8 pb-6 lg:py-0 lg:min-h-[calc(100dvh-64px)]">

        {/* TOP / LEFT — compact value prop */}
        <div className="flex-1 flex flex-col gap-4 text-center lg:text-left max-w-xl mx-auto lg:mx-0">

          {/* Eyebrow pill */}
          <div className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                             bg-primary/10 border border-primary/20
                             text-primary text-[11px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" />
              Free · Anonymous · Instant
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-bold tracking-tight leading-[1.12]
                         text-[1.7rem] sm:text-[2.2rem] lg:text-[2.6rem]">
            Send files too private
            <br className="hidden sm:block" />
            {" "}for{" "}
            <span className="text-foreground/40">WhatsApp.</span>
          </h1>

          {/* Subheadline — shorter on mobile */}
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto lg:mx-0">
            No login. Auto-delete. Done in seconds.
          </p>

          {/* Trust badges — 2×2 grid on mobile, row on desktop */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-items-center sm:justify-center lg:justify-start max-w-xs sm:max-w-none mx-auto lg:mx-0">
            {trustBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 w-full sm:w-auto
                           rounded-full bg-card/60 border border-border/60
                           text-xs font-semibold text-muted-foreground backdrop-blur-sm"
              >
                <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* BOTTOM / RIGHT — the actual product */}
        <div className="w-full max-w-[420px] flex-shrink-0 mx-auto lg:mx-0">
          <Suspense fallback={
            <div className="w-full h-64 bg-card/60 animate-pulse rounded-2xl border border-border/40" />
          }>
            <HomeForms />
          </Suspense>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BELOW THE FOLD — marketing content
      ══════════════════════════════════════════════ */}
      <div className="w-full border-t border-border/30">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

          {/* Comparison */}
          <ComparisonStrip />

          {/* Feature grid */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight">
                Why VioraShare?
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Built for people who value speed and privacy over bloated platforms.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { emoji: "🚫", title: "No Account Needed", desc: "Just create a room and share. No sign-up, no email, no passwords." },
                { emoji: "💥", title: "Self-Destruct Mode", desc: "Files deleted after the first download. Zero lingering traces." },
                { emoji: "⏱️", title: "Flexible Expiry", desc: "15 minutes, 1 hour, or 24 hours — you decide how long files live." },
                { emoji: "🔒", title: "Room Passcodes", desc: "Lock your room with a passcode so only your recipient can access it." },
                { emoji: "📋", title: "Shared Clipboard", desc: "Share text snippets and notes alongside your files in real-time." },
                { emoji: "👻", title: "Zero Tracking", desc: "No IP tracking, no profiling cookies, no personal data stored." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-card/40 border border-border/50
                             hover:bg-card/70 hover:border-border transition-all duration-200 space-y-2"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="space-y-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight">
              How it works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Create a Room", desc: "One click. No sign-up. Instant private room generated for you." },
                { step: "02", title: "Upload Files", desc: "Drag & drop files, add text, share links — all in the same room." },
                { step: "03", title: "Share the Link", desc: "Send the room link. It auto-expires and disappears when done." },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center gap-3">
                  <span className="text-4xl font-black font-heading text-primary/15">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground max-w-[220px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <SocialLinks />
        </div>

        {/* Footer */}
        <footer className="border-t border-border/30 py-8 text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground/50">
            <Link href="/help" className="hover:text-foreground transition-colors">Help & FAQ</Link>
            <Link href="/support" className="hover:text-foreground font-semibold transition-colors">Support Us ♥</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center justify-center">
            <Link
              href="https://www.linkedin.com/posts/sachinkumar014_viorashare-secure-temporary-file-sharing-activity-7442886400578084864-Mbf7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground/40
                         hover:text-primary transition-colors py-1 px-3 rounded-full
                         bg-muted/20 border border-muted-foreground/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              Official Announcement
            </Link>
          </div>
          <p className="text-[10px] text-muted-foreground/30">
            © 2026 VioraShare by Sachin Kumar. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
