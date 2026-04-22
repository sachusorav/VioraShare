export const dynamic = 'force-static';
export const revalidate = false;

import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { HomeForms } from "@/components/home-forms";

export const metadata: Metadata = {
  title: "VioraShare - Free Secure File Sharing | No Login Required",
  description: "Share files instantly with VioraShare. No login, no account, no trace. Create a private room, upload files, and share a link — files auto-delete after 15 min, 1 hour, or 24 hours.",
  keywords: "free file sharing, no login file sharing, temporary file sharing, secure file transfer, anonymous file sharing, share files online, no account file sharing",
  alternates: { canonical: "https://www.viorashare.online" },
  openGraph: {
    title: "VioraShare - Free Secure File Sharing | No Login Required",
    description: "Share files instantly with VioraShare. No login, no account, no trace.",
    url: "https://www.viorashare.online",
    type: "website",
    images: [{ url: "/icon.png" }],
  },
  twitter: { card: "summary_large_image" },
};

const features = [
  {
    num: "01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[18px] h-[18px]">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
        <line x1="18" y1="8" x2="22" y2="8"/>
        <line x1="20" y1="6" x2="20" y2="10"/>
      </svg>
    ),
    title: "No Account Needed",
    desc: "Create a room in seconds. No sign-up, no email, no passwords — just a link.",
  },
  {
    num: "02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[18px] h-[18px]">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14H6L5 6"/>
        <path d="M10 11v6M14 11v6"/>
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
      </svg>
    ),
    title: "Self-Destruct Mode",
    desc: "Files are permanently wiped the moment they're downloaded. No server copies, ever.",
  },
  {
    num: "03",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[18px] h-[18px]">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Flexible Expiry",
    desc: "Choose 15 minutes, 1 hour, or 24 hours. Rooms vanish automatically when time's up.",
  },
  {
    num: "04",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[18px] h-[18px]">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: "Room Passcodes",
    desc: "Lock your sharing room with a passcode. Only people you trust can get in.",
  },
  {
    num: "05",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[18px] h-[18px]">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Clipboard & Chat",
    desc: "Share text snippets and chat inside the room alongside your files. All ephemeral.",
  },
  {
    num: "06",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[18px] h-[18px]">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>
    ),
    title: "Zero Tracking",
    desc: "No IP logging, no profiling cookies, no personal data stored. You leave no trace.",
  },
];

const tickerItems = [
  "No account required",
  "End-to-end privacy",
  "Self-destruct on download",
  "Zero IP tracking",
  "Passcode protection",
  "Shared clipboard",
  "In-room chat",
  "Auto-expiring rooms",
];

const steps = [
  {
    num: "01",
    title: "Create a Room",
    desc: "Click to generate a private sharing room. Choose expiry and add an optional passcode.",
  },
  {
    num: "02",
    title: "Add Your Files",
    desc: "Drop files, paste text, or share links. Everything lives inside the temporary room.",
  },
  {
    num: "03",
    title: "Share & Vanish",
    desc: "Send the room link. Once downloaded or expired, everything is gone permanently.",
  },
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
    "description": "Free secure temporary file sharing with no login required.",
    "author": { "@type": "Person", "name": "Sachin Kumar" },
    "screenshot": { "@type": "ImageObject", "url": "https://www.viorashare.online/icon.png" },
    "featureList": "No login required, Self-destruct mode, Room passcodes, Shared clipboard, Auto-expiring rooms, Zero tracking",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "inLanguage": "en",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "24", "bestRating": "5", "worstRating": "1" },
  };

  return (
    <div className="dot-grid ambient-left min-h-screen relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 glass-card"
        style={{ borderLeft: "none", borderRight: "none", borderRadius: 0 }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full pulse-emerald"
            style={{ background: "#00e5a0" }}
          />
          <span
            className="font-heading text-[20px] font-bold tracking-[-0.5px] text-[#e8f0f0]"
            style={{ fontFamily: "var(--font-urbanist, var(--font-inter))" }}
          >
            Viora<span style={{ color: "#00e5a0" }}>Share</span>
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {["How it works", "Privacy", "Help & FAQ"].map((label, i) => (
            <li key={i}>
              <Link
                href={i === 1 ? "/privacy" : i === 2 ? "/help" : "#how-it-works"}
                className="text-[11px] font-mono text-[#4a6060] hover:text-[#00e5a0] transition-colors tracking-[0.08em] uppercase"
                style={{ fontFamily: "var(--font-space-mono, monospace)" }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#create"
          className="font-mono text-[11px] font-medium tracking-[0.1em] uppercase px-5 py-2 rounded-full transition-all"
          style={{
            fontFamily: "var(--font-space-mono, monospace)",
            border: "1px solid rgba(0,229,160,0.3)",
            color: "#00e5a0",
            background: "rgba(0,229,160,0.07)",
          }}
        >
          Create Room
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section className="relative flex items-center min-h-screen px-6 md:px-12 pt-28 pb-20 z-10">
        {/* Right radial */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(circle at 70% 30%, rgba(0,229,160,0.06) 0%, transparent 70%)" }}
        />
        {/* Bottom radial */}
        <div
          className="absolute bottom-0 left-[30%] w-[500px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,100,255,0.04) 0%, transparent 70%)" }}
        />

        {/* Left: headline + CTA */}
        <div className="relative max-w-[650px] w-full">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px" style={{ background: "#00e5a0" }} />
            <span
              className="text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "#00e5a0", fontFamily: "var(--font-space-mono, monospace)" }}
            >
              Zero-trace file transfer
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-heading font-extrabold leading-[0.95] tracking-[-2px] mb-7"
            style={{
              fontFamily: "var(--font-urbanist, var(--font-inter))",
              fontSize: "clamp(52px, 8vw, 88px)",
              color: "#e8f0f0",
            }}
          >
            <span className="block">Send files.</span>
            <span className="block" style={{ color: "#00e5a0" }}>No trace.</span>
          </h1>

          <p
            className="text-[17px] font-light leading-[1.7] mb-12 max-w-[460px]"
            style={{ color: "#4a6060" }}
          >
            Private sharing rooms that self-destruct. No account, no tracking, no permanence — just a link that disappears.
          </p>

          {/* Stats */}
          <div
            className="flex gap-10 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { num: "0", unit: "kb", label: "Data retained" },
              { num: "3", unit: "", label: "Expiry options" },
              { num: "∞", unit: "", label: "File types" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  className="font-heading font-bold text-[28px] text-[#e8f0f0]"
                  style={{ fontFamily: "var(--font-urbanist, var(--font-inter))" }}
                >
                  {s.num}
                  <span style={{ color: "#00e5a0" }}>{s.unit}</span>
                </div>
                <div
                  className="text-[11px] uppercase tracking-[0.1em] mt-1"
                  style={{ color: "#4a6060", fontFamily: "var(--font-space-mono, monospace)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Room Panel */}
        <div
          id="create"
          className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-[380px]"
          style={{ zIndex: 10 }}
        >
          <div
            className="glass-card rounded-[20px] overflow-hidden relative"
            style={{
              boxShadow: "0 8px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            {/* Top line glow */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #00e5a0, transparent)", opacity: 0.5 }}
            />
            <Suspense fallback={
              <div className="h-80 flex items-center justify-center text-[#4a6060] font-mono text-xs tracking-widest uppercase">
                Loading...
              </div>
            }>
              <HomeForms />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Mobile form */}
      <section className="lg:hidden px-6 pb-16 relative z-10">
        <div className="glass-card rounded-[20px] overflow-hidden relative">
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #00e5a0, transparent)", opacity: 0.5 }}
          />
          <Suspense fallback={<div className="h-64 animate-pulse" />}>
            <HomeForms />
          </Suspense>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div
        className="relative z-10 overflow-hidden flex items-center py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#060810" }}
      >
        <div className="flex gap-12 ticker-animate" style={{ whiteSpace: "nowrap" }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="text-[11px] uppercase tracking-[0.1em] flex items-center gap-3 shrink-0"
              style={{ color: "#3a5050", fontFamily: "var(--font-space-mono, monospace)" }}
            >
              <span style={{ color: "#00e5a0", opacity: 0.5 }}>//</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="relative z-10 px-6 md:px-12 py-28">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-px" style={{ background: "#00e5a0" }} />
          <span
            className="text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "#00e5a0", fontFamily: "var(--font-space-mono, monospace)" }}
          >
            Why VioraShare
          </span>
        </div>
        <h2
          className="font-heading font-bold mb-16 max-w-[540px]"
          style={{
            fontFamily: "var(--font-urbanist, var(--font-inter))",
            fontSize: "clamp(32px, 4vw, 50px)",
            letterSpacing: "-1.5px",
            lineHeight: 1.05,
            color: "#e8f0f0",
          }}
        >
          Built for people who value{" "}
          <span style={{ color: "#00e5a0" }}>privacy</span>
        </h2>

        {/* Features Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderTopColor: "rgba(255,255,255,0.14)",
            borderRadius: "20px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.025)",
            boxShadow: "0 4px 40px rgba(0,0,0,0.4)",
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-cell p-9"
              style={{
                background: "rgba(13,17,23,0.55)",
                borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(255,255,255,0.04)" : undefined,
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : undefined,
              }}
            >
              <div
                className="font-mono text-[11px] tracking-[0.1em] mb-5"
                style={{ color: "#3a5050", fontFamily: "var(--font-space-mono, monospace)" }}
              >
                {f.num} —
              </div>
              <div
                className="w-10 h-10 rounded-[8px] flex items-center justify-center mb-5"
                style={{
                  background: "rgba(0,229,160,0.08)",
                  border: "1px solid rgba(0,229,160,0.25)",
                  color: "#00e5a0",
                }}
              >
                {f.icon}
              </div>
              <div
                className="font-heading font-semibold text-[18px] mb-2.5"
                style={{
                  fontFamily: "var(--font-urbanist, var(--font-inter))",
                  letterSpacing: "-0.3px",
                  color: "#e8f0f0",
                }}
              >
                {f.title}
              </div>
              <p className="text-[14px] font-light leading-[1.65]" style={{ color: "#4a6060" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="relative z-10 px-6 md:px-12 pb-28">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-px" style={{ background: "#00e5a0" }} />
          <span
            className="text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "#00e5a0", fontFamily: "var(--font-space-mono, monospace)" }}
          >
            The process
          </span>
        </div>
        <h2
          className="font-heading font-bold mb-16"
          style={{
            fontFamily: "var(--font-urbanist, var(--font-inter))",
            fontSize: "clamp(32px, 4vw, 50px)",
            letterSpacing: "-1.5px",
            lineHeight: 1.05,
            color: "#e8f0f0",
          }}
        >
          Three steps. Then{" "}
          <span style={{ color: "#00e5a0" }}>gone.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-7 left-[20%] right-[20%] h-px"
            style={{ background: "linear-gradient(90deg, #00e5a0, rgba(0,229,160,0.1), #00e5a0)", opacity: 0.3 }}
          />

          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="w-14 h-14 rounded-full mx-auto mb-6 flex items-center justify-center relative step-ring"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderTopColor: "rgba(255,255,255,0.14)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <span
                  className="font-mono font-medium text-[16px]"
                  style={{ color: "#00e5a0", fontFamily: "var(--font-space-mono, monospace)" }}
                >
                  {s.num}
                </span>
              </div>
              <h3
                className="font-heading font-semibold text-[20px] mb-3"
                style={{
                  fontFamily: "var(--font-urbanist, var(--font-inter))",
                  letterSpacing: "-0.3px",
                  color: "#e8f0f0",
                }}
              >
                {s.title}
              </h3>
              <p
                className="text-[14px] font-light leading-[1.65] max-w-[220px] mx-auto"
                style={{ color: "#4a6060" }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="relative z-10 px-6 md:px-12 pb-28">
        <div
          className="glass-card rounded-[24px] px-10 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden"
        >
          {/* BG effects inside band */}
          <div
            className="absolute top-[-80px] left-[-80px] w-80 h-80 pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,229,160,0.05) 0%, transparent 70%)" }}
          />
          <div className="relative z-10">
            <h2
              className="font-heading font-bold text-[32px] md:text-[36px] mb-3"
              style={{
                fontFamily: "var(--font-urbanist, var(--font-inter))",
                letterSpacing: "-1px",
                color: "#e8f0f0",
              }}
            >
              Ready to share{" "}
              <span style={{ color: "#00e5a0" }}>securely?</span>
            </h2>
            <p className="text-[15px] font-light" style={{ color: "#4a6060" }}>
              No account needed. Your room is ready in seconds.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <Link
              href="#create"
              className="inline-flex items-center gap-3 font-mono font-medium text-[13px] tracking-[0.06em] uppercase px-7 py-4 rounded-full btn-emerald transition-all"
              style={{ fontFamily: "var(--font-space-mono, monospace)" }}
            >
              Create Your Room
              <span className="text-base">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="relative z-10 px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="font-heading font-bold text-[16px]"
          style={{ fontFamily: "var(--font-urbanist, var(--font-inter))", color: "#e8f0f0" }}
        >
          Viora<span style={{ color: "#00e5a0" }}>Share</span>
        </div>

        <ul className="flex items-center gap-6 list-none">
          {[
            { label: "Help & FAQ", href: "/help" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ].map((l, i) => (
            <li key={i}>
              <Link
                href={l.href}
                className="text-[11px] uppercase tracking-[0.1em] transition-colors"
                style={{ color: "#4a6060", fontFamily: "var(--font-space-mono, monospace)" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="text-[11px] tracking-[0.06em]"
          style={{ color: "#3a5050", fontFamily: "var(--font-space-mono, monospace)" }}
        >
          © 2026 VioraShare by Sachin Kumar
        </div>
      </footer>
    </div>
  );
}
