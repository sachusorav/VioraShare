export const dynamic = 'force-static';
export const revalidate = false;

import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { HomeForms } from "@/components/home-forms";
import { SocialLinks } from "@/components/social-links";
import { ComparisonStrip } from "@/components/comparison-strip";
import { ShieldCheck, Timer, Ghost, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "VioraShare — Temporary File Sharing Without Login",
  description: "Share files privately without creating an account. Files auto-delete in 15 min, 1 hour, or 24 hours. Passcode-protected rooms, zero tracking, no sign-up.",
  keywords: "free file sharing, no login file sharing, temporary file sharing, secure file transfer, anonymous file sharing",
  alternates: { canonical: "https://www.viorashare.online" },
  openGraph: {
    title: "VioraShare — Temporary File Sharing Without Login",
    description: "No login. No account. Files auto-delete. Done in seconds.",
    url: "https://www.viorashare.online",
    type: "website",
    images: [{ url: "/icon.png" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "VioraShare",
    "url": "https://www.viorashare.online",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Temporary file sharing without login. Files auto-delete.",
    "author": { "@type": "Person", "name": "Sachin Kumar" },
    "featureList": "No login required, Self-destruct mode, Room passcodes, Shared clipboard, Auto-expiring rooms, Zero tracking",
    "inLanguage": "en",
  };

  const features = [
    { icon: Ghost,       title: "No Account, Ever",      desc: "Create a room and share instantly. No email, no sign-up, no profile created." },
    { icon: Timer,       title: "Auto-Delete",            desc: "Choose 15 min, 1 hour, or 24 hours. When time's up, files are gone for good." },
    { icon: Lock,        title: "Passcode Protection",    desc: "Every room is gated by a passcode hashed with bcrypt — not even we can read it." },
    { icon: ShieldCheck, title: "Self-Destruct per File", desc: "Mark any file to delete itself the moment it's downloaded — one transfer, zero trace." },
  ];

  return (
    <main className="flex-1 flex flex-col items-center relative overflow-x-hidden w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Ambient — single accent colour, subtle */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-primary/6 blur-[160px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/4 blur-[160px]" />
      </div>

      {/* ══════════════════════════
          ABOVE THE FOLD
          Mobile: stacked (hero → form)
          Desktop: two-column, full-height
      ══════════════════════════ */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
                          flex flex-col lg:flex-row lg:items-center lg:justify-between
                          gap-10 lg:gap-16
                          pt-10 pb-8 lg:py-0 lg:min-h-[calc(100dvh-56px)]">

        {/* Hero copy */}
        <div className="flex-1 flex flex-col gap-5 text-center lg:text-left max-w-xl mx-auto lg:mx-0">

          {/* Eyebrow */}
          <span className="inline-flex items-center justify-center lg:justify-start gap-2
                           self-center lg:self-start
                           px-3 py-1 rounded-full border border-primary/25 bg-primary/8
                           text-primary type-caption uppercase tracking-widest font-bold">
            <ShieldCheck className="w-3 h-3" />
            Free · Anonymous · No Login
          </span>

          {/* Display headline */}
          <h1 className="type-display">
            Share files privately.<br className="hidden sm:block" />
            {" "}No account needed.
          </h1>

          {/* Subheadline */}
          <p className="type-body text-muted-foreground max-w-sm mx-auto lg:mx-0">
            Create a passcode-protected room in one click. Upload files, share the link — everything auto-deletes when time runs out.
          </p>

          {/* Trust row — 4 badges, 2×2 on mobile */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-items-center sm:justify-center lg:justify-start max-w-[280px] sm:max-w-none mx-auto lg:mx-0">
            {[
              { icon: Ghost,       label: "Zero traces" },
              { icon: Timer,       label: "Auto-deletes" },
              { icon: Lock,        label: "Passcode locked" },
              { icon: ShieldCheck, label: "No account" },
            ].map(({ icon: Icon, label }) => (
              <span key={label}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 w-full sm:w-auto
                           rounded-full surface type-caption font-semibold text-muted-foreground">
                <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                {label}
              </span>
            ))}
          </div>

          {/* Credibility line */}
          <p className="type-caption text-muted-foreground/50 max-w-sm mx-auto lg:mx-0">
            Files stored in encrypted cloud buckets, gated by bcrypt-hashed passcodes.{" "}
            <Link href="/secure-file-sharing" className="text-primary hover:underline underline-offset-2">
              How security works →
            </Link>
          </p>
        </div>

        {/* Form — primary product surface */}
        <div id="create-form" className="w-full max-w-[420px] flex-shrink-0 mx-auto lg:mx-0">
          <Suspense fallback={
            <div className="w-full h-64 surface animate-pulse rounded-2xl" />
          }>
            <HomeForms />
          </Suspense>
        </div>
      </section>

      {/* ══════════════════════════
          BELOW THE FOLD
      ══════════════════════════ */}
      <div className="w-full border-t border-border/40">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">

          {/* Comparison */}
          <ComparisonStrip />

          {/* Features — consistent icon style */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="type-h1">Built around your privacy</h2>
              <p className="type-body text-muted-foreground max-w-md mx-auto">
                Every design decision is a privacy decision.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title}
                  className="surface rounded-2xl p-5 flex gap-4 items-start
                             hover:bg-card/80 transition-colors duration-150">
                  {/* Single icon style: outline, teal, no background chip */}
                  <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
                  <div>
                    <h3 className="type-h2 mb-1">{title}</h3>
                    <p className="type-caption text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="space-y-8 text-center">
            <h2 className="type-h1">How it works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { n: "1", title: "Create a Room", desc: "One click. No sign-up. Instant private room with your chosen expiry." },
                { n: "2", title: "Upload & Share", desc: "Drag and drop files. Copy the link or scan the QR code." },
                { n: "3", title: "It Disappears", desc: "When the timer hits zero, every file and the room itself is permanently deleted." },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex flex-col items-center gap-3">
                  <span className="font-heading font-black text-5xl text-primary/15 leading-none">{n}</span>
                  <h3 className="type-h2">{title}</h3>
                  <p className="type-caption text-muted-foreground max-w-[200px]">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <SocialLinks />
        </div>

        {/* Footer */}
        <footer className="border-t border-border/40 py-8 text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 type-caption text-muted-foreground/50">
            <Link href="/help" className="hover:text-foreground transition-colors">Help & FAQ</Link>
            <Link href="/support" className="hover:text-foreground transition-colors">Support Us</Link>
            <Link href="/secure-file-sharing" className="hover:text-foreground transition-colors">Security</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
          <p className="type-caption text-muted-foreground/30">
            Passcode-protected rooms · Bcrypt hashing · Auto-purge on expiry ·{" "}
            <Link href="/secure-file-sharing" className="hover:text-primary transition-colors">Learn more</Link>
          </p>
          <p className="type-caption text-muted-foreground/25">
            © 2026 VioraShare by Sachin Kumar
          </p>
        </footer>
      </div>
    </main>
  );
}
