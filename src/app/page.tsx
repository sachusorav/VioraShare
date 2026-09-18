export const dynamic = "force-static";
export const revalidate = false;

import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { HomeForms } from "@/components/home-forms";
import { SocialLinks } from "@/components/social-links";
import { ComparisonStrip } from "@/components/comparison-strip";
import { ShieldCheck, Timer, Ghost, Zap, ChevronDown } from "lucide-react";

const BASE_URL = "https://www.viorashare.online";

export const metadata: Metadata = {
  title: "Free Temporary File Sharing — No Login, No Sign-Up Required",
  description:
    "Share files instantly with no login or account. VioraShare creates temporary, passcode-protected rooms that auto-delete after 15 minutes, 1 hour, or 24 hours. Free anonymous file sharing — no sign-up needed.",
  keywords:
    "temporary file sharing, file sharing without login, share files without password, free file sharing no signup, temporary image sharing, quick file share, anonymous file sharing",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "VioraShare — Free Temporary File Sharing, No Login Required",
    description:
      "No login. No account. Files auto-delete. Share files anonymously in seconds — free forever.",
    url: BASE_URL,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VioraShare — Share Files Without Login. Auto-delete. Free.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VioraShare — Free Temporary File Sharing, No Login Required",
    description: "No login. Auto-delete. Done in seconds.",
    images: ["/og-image.png"],
  },
};

const trustBadges = [
  { icon: ShieldCheck, label: "No account needed" },
  { icon: Timer, label: "Auto-deletes" },
  { icon: Ghost, label: "Zero traces" },
  { icon: Zap, label: "Instant" },
];

const faqs = [
  {
    q: "Is VioraShare really free?",
    a: "Yes, completely free. No hidden fees, no premium tier required for core features. Create rooms, upload files, and share — all at zero cost.",
  },
  {
    q: "Do I need an account or login to use VioraShare?",
    a: "No account, no login, no email required — ever. You create a room with a passcode of your choice and share the Room ID with your recipient. That's it.",
  },
  {
    q: "How long are files stored? Do they auto-delete?",
    a: "You choose the expiry: 15 minutes, 1 hour, or 24 hours. When the timer runs out, every file, message, and trace of the room is permanently and irreversibly deleted from our servers.",
  },
  {
    q: "Is my file sharing anonymous and private?",
    a: "Yes. VioraShare collects no personal data, stores no IP addresses, and uses no tracking cookies. Your passcode is hashed with bcrypt so even we cannot read it. Files are accessible only to people who know your Room ID and passcode.",
  },
  {
    q: "What is the maximum file size I can share?",
    a: "Up to 50 MB per file. For images, documents, code files, and most everyday transfers this is more than sufficient. You can also enable per-file self-destruct so each file disappears immediately after the first download.",
  },
  {
    q: "How is VioraShare different from WeTransfer or Google Drive?",
    a: "VioraShare requires no account and no sign-up, stores zero personal data, auto-deletes everything on a timer you control, and is free with no upload limits per transfer. It is built for quick, private, one-off transfers — not permanent cloud storage.",
  },
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="flex-1 flex flex-col items-center relative overflow-x-hidden w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[55%] h-[55%] rounded-full bg-primary/6 blur-[120px]" />
      </div>

      {/* ══════════════════════════════════════════════
          ABOVE THE FOLD
          Mobile: stacked (hero → form)
          Desktop: two-column, full viewport height
      ══════════════════════════════════════════════ */}
      <section
        aria-label="Create or join a file sharing room"
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
                   flex flex-col lg:flex-row lg:items-center lg:justify-center
                   gap-6 lg:gap-20
                   pt-8 pb-6 lg:py-0 lg:min-h-[calc(100dvh-64px)]"
      >
        {/* Hero copy */}
        <div className="flex-1 flex flex-col gap-4 text-center lg:text-left max-w-xl mx-auto lg:mx-0">

          {/* Eyebrow */}
          <div className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                             bg-primary/10 border border-primary/20
                             text-primary text-[11px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" aria-hidden="true" />
              Free · Anonymous · No Login
            </span>
          </div>

          {/* H1 — primary keyword in first 6 words */}
          <h1 className="font-heading font-bold tracking-tight leading-[1.1]
                         text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem]">
            Temporary file sharing.<br className="hidden sm:block" />
            <span className="text-foreground/50"> No login required.</span>
          </h1>

          {/* Subheadline — naturally includes secondary keywords */}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm mx-auto lg:mx-0">
            Share files without a password or account. Create a free room, upload your files,
            and send the link — everything auto-deletes when time runs out.
          </p>

          {/* Trust badges */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-items-center sm:justify-center lg:justify-start max-w-xs sm:max-w-none mx-auto lg:mx-0">
            {trustBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 w-full sm:w-auto
                           rounded-full bg-card/60 border border-border/60
                           text-xs font-semibold text-muted-foreground backdrop-blur-sm"
              >
                <Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          {/* Internal links to landing pages */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center lg:justify-start text-[11px] text-muted-foreground/50">
            <Link href="/temporary-file-sharing" className="hover:text-primary transition-colors underline-offset-2 hover:underline">
              Temporary file sharing →
            </Link>
            <Link href="/send-files-without-login" className="hover:text-primary transition-colors underline-offset-2 hover:underline">
              Send files without login →
            </Link>
            <Link href="/secure-file-sharing" className="hover:text-primary transition-colors underline-offset-2 hover:underline">
              Secure file sharing →
            </Link>
          </div>
        </div>

        {/* Form */}
        <div id="create-form" className="w-full max-w-[420px] flex-shrink-0 mx-auto lg:mx-0">
          <Suspense
            fallback={
              <div
                className="w-full h-64 bg-card/60 animate-pulse rounded-2xl border border-border/40"
                aria-label="Loading file sharing form"
              />
            }
          >
            <HomeForms />
          </Suspense>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BELOW THE FOLD
      ══════════════════════════════════════════════ */}
      <div className="w-full border-t border-border/30">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

          {/* Comparison */}
          <ComparisonStrip />

          {/* Feature grid */}
          <section aria-labelledby="features-heading">
            <div className="text-center space-y-2 mb-8">
              <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold font-heading tracking-tight">
                Why choose VioraShare?
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Built for people who value speed and privacy. No bloated sign-up flows,
                no personal data harvested.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  emoji: "🚫",
                  title: "No Account Needed",
                  desc: "Create a room and share instantly. No sign-up, no email, no password to remember.",
                },
                {
                  emoji: "💥",
                  title: "Self-Destruct Mode",
                  desc: "Files deleted after the first download. Zero lingering traces on our servers.",
                },
                {
                  emoji: "⏱️",
                  title: "Flexible Expiry",
                  desc: "15 minutes, 1 hour, or 24 hours — you decide how long your files live.",
                },
                {
                  emoji: "🔒",
                  title: "Passcode Protected",
                  desc: "Lock your room with a passcode so only your intended recipient can access it.",
                },
                {
                  emoji: "📋",
                  title: "Shared Clipboard",
                  desc: "Share text snippets, links, and notes alongside your files in real-time.",
                },
                {
                  emoji: "👻",
                  title: "Zero Tracking",
                  desc: "No IP tracking, no profiling cookies, no personal data stored — ever.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-card/40 border border-border/50
                             hover:bg-card/70 hover:border-border transition-all duration-200 space-y-2"
                >
                  <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section aria-labelledby="how-it-works-heading" className="text-center">
            <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl font-bold font-heading tracking-tight mb-8">
              How it works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Create a free room",
                  desc: "No sign-up. Set a passcode and choose your expiry time. Done in seconds.",
                },
                {
                  step: "02",
                  title: "Upload & share",
                  desc: "Drag & drop files, add text snippets — share the Room ID and passcode with anyone.",
                },
                {
                  step: "03",
                  title: "Files auto-delete",
                  desc: "When the timer hits zero, every file and trace of the room is permanently deleted.",
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center gap-3">
                  <span className="text-4xl font-black font-heading text-primary/15" aria-hidden="true">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground max-w-[220px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ — FAQPage JSON-LD targets rich snippet eligibility */}
          <section aria-labelledby="faq-heading" className="max-w-2xl mx-auto w-full">
            <div className="text-center mb-8 space-y-2">
              <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold font-heading tracking-tight">
                Frequently asked questions
              </h2>
              <p className="text-sm text-muted-foreground">
                Everything you want to know about anonymous, temporary file sharing.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-border/50 bg-card/40
                             hover:bg-card/70 transition-colors duration-150 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer
                                      list-none font-semibold text-sm gap-4
                                      [&::-webkit-details-marker]:hidden">
                    <span>{faq.q}</span>
                    <ChevronDown
                      className="w-4 h-4 shrink-0 text-muted-foreground/50 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
            <p className="text-center mt-6 text-xs text-muted-foreground/50">
              More questions?{" "}
              <Link href="/help" className="text-primary hover:underline underline-offset-2">
                Visit the Help & FAQ page →
              </Link>
            </p>
          </section>

          <SocialLinks />
        </div>

        {/* Footer */}
        <footer className="border-t border-border/30 py-8 text-center space-y-4">
          <nav aria-label="Footer navigation">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground/50">
              <Link href="/help" className="hover:text-foreground transition-colors">Help & FAQ</Link>
              <Link href="/support" className="hover:text-foreground font-semibold transition-colors">Support Us ♥</Link>
              <Link href="/secure-file-sharing" className="hover:text-foreground transition-colors">Security</Link>
              <Link href="/temporary-file-sharing" className="hover:text-foreground transition-colors">Temporary Sharing</Link>
              <Link href="/send-files-without-login" className="hover:text-foreground transition-colors">No-Login Sharing</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </nav>
          <p className="text-[10px] text-muted-foreground/30">
            © 2026 VioraShare by Sachin Kumar. Free temporary file sharing — no login, no account.
          </p>
        </footer>
      </div>
    </main>
  );
}
