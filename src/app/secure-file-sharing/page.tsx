import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Lock, EyeOff, Key, FileCheck, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Secure File Sharing — Private & Encrypted | VioraShare",
  description: "Share files securely with end-to-end passcode protection. VioraShare stores zero personal data, requires no login, and auto-deletes files. GDPR-friendly secure file transfer.",
  keywords: ["secure file sharing", "private file transfer", "encrypted file sharing free", "secure file transfer online", "GDPR file sharing"],
  alternates: { canonical: "https://www.viorashare.online/secure-file-sharing" },
  openGraph: {
    title: "Secure Private File Sharing — VioraShare",
    description: "Zero data stored. Passcode protected. GDPR-friendly.",
    url: "https://www.viorashare.online/secure-file-sharing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is VioraShare secure for confidential files?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. VioraShare uses bcrypt hashing for passcodes, stores zero personal data, and automatically deletes all files when rooms expire." } },
    { "@type": "Question", "name": "Is VioraShare GDPR compliant?",
      "acceptedAnswer": { "@type": "Answer", "text": "VioraShare is GDPR-friendly by design. We collect no personal data, require no account, and automatically delete all user content." } },
    { "@type": "Question", "name": "How does VioraShare protect my files?",
      "acceptedAnswer": { "@type": "Answer", "text": "Files are stored in secure cloud buckets and access is restricted by a bcrypt-hashed passcode. Only users with the correct Room ID and passcode can download files." } },
  ]
};

/* All icons: same stroke weight, same teal accent — no rainbow */
const trustIndicators = [
  { icon: Lock,      label: "Bcrypt Passcode Hashing",  desc: "Room passcodes are hashed with industry-standard bcrypt. Not even we can see them." },
  { icon: EyeOff,   label: "Zero PII Collection",       desc: "No IP logging, no tracking cookies, no email required. You are anonymous by design." },
  { icon: Key,      label: "Room-Level Access Control", desc: "Files are gated behind a unique Room ID + passcode pair. No guessing." },
  { icon: FileCheck, label: "Auto-Purge on Expiry",     desc: "When a room expires, all files and metadata are permanently and irreversibly deleted." },
  { icon: Globe,    label: "GDPR-Friendly Design",      desc: "No personal data processed. Complies with EU privacy regulations by architecture." },
  { icon: Shield,   label: "Self-Destruct Mode",        desc: "Enable per-file deletion after first download for maximum operational security." },
];

export default function SecureFileSharingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen">

        {/* Hero */}
        <section className="relative px-4 sm:px-6 pt-20 pb-16 text-center max-w-4xl mx-auto">
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/6 blur-[140px] rounded-full" />
          </div>

          <span className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-primary/25 bg-primary/8 text-primary type-caption uppercase tracking-widest font-bold">
            <Shield className="w-3 h-3" strokeWidth={1.75} />
            Private & Encrypted
          </span>

          <h1 className="type-display mb-6">
            Secure file sharing.<br />
            <span className="text-primary">Zero data stored.</span>
          </h1>

          <p className="type-body text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            VioraShare is built privacy-first. No personal data collected, passcode-protected rooms,
            and automatic file deletion. The most private way to share files online.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground
                       font-bold px-7 py-3.5 rounded-2xl type-body
                       hover:opacity-90 active:scale-[0.97] transition-all
                       shadow-lg shadow-primary/20"
          >
            Start Sharing Securely
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
          <p className="mt-4 type-caption text-muted-foreground/40 uppercase tracking-widest">
            No login · Zero data stored · GDPR-friendly
          </p>
        </section>

        {/* Trust indicators — consistent icon treatment */}
        <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <h2 className="type-h1">Security architecture</h2>
            <p className="type-body text-muted-foreground">Privacy is not a feature — it is the foundation.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trustIndicators.map(({ icon: Icon, label, desc }) => (
              <div key={label}
                className="surface rounded-2xl p-5 flex gap-4 items-start
                           hover:bg-card/80 transition-colors duration-150">
                {/* Consistent: outline icon, teal, no background chip */}
                <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <h3 className="type-h2 mb-1">{label}</h3>
                  <p className="type-caption text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Private by design — single accent for check/cross */}
        <section className="px-4 sm:px-6 py-16 max-w-3xl mx-auto">
          <h2 className="type-h1 text-center mb-10">Private by design</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Traditional — neutral, not red background */}
            <div className="surface rounded-2xl p-6 space-y-4">
              <h3 className="type-h2 text-muted-foreground">Traditional file sharing</h3>
              <ul className="space-y-2.5">
                {[
                  "Requires email or Google account",
                  "Tracks download activity",
                  "Stores files indefinitely",
                  "Logs IP addresses",
                  "Data used for advertising",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 type-body text-muted-foreground">
                    {/* destructive cross only on destructive actions — here just neutral */}
                    <span className="text-destructive shrink-0 mt-0.5 font-bold">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* VioraShare — primary accent, elevated card */}
            <div className="rounded-2xl p-6 space-y-4 bg-primary/6 border border-primary/20">
              <h3 className="type-h2 text-primary">VioraShare</h3>
              <ul className="space-y-2.5">
                {[
                  "Zero account or email needed",
                  "No activity tracking",
                  "Files deleted automatically",
                  "No IP logging",
                  "Zero advertising data collection",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 type-body text-muted-foreground">
                    <span className="text-primary shrink-0 mt-0.5 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 py-16 text-center max-w-xl mx-auto">
          <div className="surface rounded-3xl p-10 space-y-5">
            <h2 className="type-h1">Share files the private way</h2>
            <p className="type-body text-muted-foreground">Zero data. Zero trace. Maximum privacy.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                         font-bold px-7 py-3.5 rounded-2xl type-body
                         hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Create Secure Room <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <footer className="text-center pb-10 type-caption text-muted-foreground/30">
          © 2026 VioraShare ·{" "}
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>{" "}·{" "}
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
        </footer>
      </main>
    </>
  );
}
