import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Lock, EyeOff, Key, FileCheck, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Secure File Sharing Free | Private Encrypted File Transfer — VioraShare",
  description: "Share files securely with end-to-end passcode protection. VioraShare stores zero personal data, requires no login, and auto-deletes files. GDPR-friendly secure file transfer.",
  keywords: [
    "secure file sharing", "private file transfer", "encrypted file sharing free",
    "secure file transfer online", "private file sharing no login",
    "GDPR file sharing", "secure anonymous file transfer",
    "zero knowledge file sharing", "confidential file sharing"
  ],
  alternates: { canonical: "https://www.viorashare.online/secure-file-sharing" },
  openGraph: {
    title: "Secure Private File Sharing — VioraShare",
    description: "Zero data stored. Passcode protected. GDPR-friendly. The most private way to share files online.",
    url: "https://www.viorashare.online/secure-file-sharing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is VioraShare secure for sharing confidential files?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. VioraShare uses bcrypt hashing for passcodes, stores zero personal data, and automatically deletes all files when rooms expire. No third party can associate files with your identity."
      }
    },
    {
      "@type": "Question",
      "name": "Is VioraShare GDPR compliant?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VioraShare is GDPR-friendly by design. We collect no personal data, require no account, and automatically delete all user content. There is no personal profile to request deletion of."
      }
    },
    {
      "@type": "Question",
      "name": "How does VioraShare protect my files?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Files are stored in secure cloud buckets and access is restricted by a bcrypt-hashed passcode. Only users with the correct Room ID and passcode can download files."
      }
    }
  ]
};

const trustIndicators = [
  { icon: Lock, label: "Bcrypt Passcode Hashing", desc: "Room passcodes are hashed with industry-standard bcrypt. Not even we can see them.", color: "text-blue-400" },
  { icon: EyeOff, label: "Zero PII Collection", desc: "No IP logging, no cookies for tracking, no email required. You are anonymous.", color: "text-purple-400" },
  { icon: Key, label: "Room-Level Access Control", desc: "Files are gated behind a unique Room ID + passcode combination. No guessing.", color: "text-yellow-400" },
  { icon: FileCheck, label: "Auto-Purge on Expiry", desc: "When a room expires, all files and metadata are permanently and irreversibly deleted.", color: "text-red-400" },
  { icon: Globe, label: "GDPR-Friendly Design", desc: "No personal data processed. Complies with EU privacy regulations by architecture.", color: "text-emerald-400" },
  { icon: Shield, label: "Self-Destruct Mode", desc: "Enable per-file deletion after first download for maximum operational security.", color: "text-cyan-400" },
];

export default function SecureFileSharingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-black text-white selection:bg-blue-500/20 selection:text-blue-300">

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent -z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/8 blur-[120px] rounded-full -z-10" />

          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-cyan-400 mb-8">
            <Shield className="w-3 h-3" /> Private & Encrypted
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-4xl mx-auto leading-none mb-6">
            Secure File Sharing<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              With Zero Data Stored
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            VioraShare is built privacy-first from the ground up. No personal data collected,
            passcode-protected rooms, and automatic file deletion. The most private way to share files online.
          </p>

          <Link href="/">
            <button className="inline-flex items-center gap-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-cyan-500/20">
              Start Sharing Securely
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="mt-4 text-[11px] text-zinc-600 uppercase tracking-widest">No login · Zero data stored · GDPR-friendly</p>
        </section>

        {/* Trust Indicators Grid */}
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-3">Security Architecture</h2>
          <p className="text-zinc-500 text-center text-sm mb-12">Privacy is not a feature. It is the foundation.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trustIndicators.map(({ icon: Icon, label, desc, color }, i) => (
              <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-all group hover:bg-white/[0.04]">
                <div className={`mb-4 p-2.5 bg-white/5 rounded-xl w-fit group-hover:bg-white/10 transition-colors ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{label}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* vs Others */}
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-12">Private by Design</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-3xl">
              <h3 className="font-black text-red-400 mb-4 text-lg">Traditional File Sharing ❌</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                {["Requires email or Google account", "Tracks download activity", "Stores files indefinitely", "IP addresses logged", "Data used for advertising", "Account can be hacked"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-red-500 shrink-0">✕</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl">
              <h3 className="font-black text-cyan-400 mb-4 text-lg">VioraShare ✓</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                {["Zero account or email needed", "No activity tracking", "Files deleted automatically", "No IP logging", "Zero advertising data collection", "No account to hack"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-cyan-400 shrink-0">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-xl mx-auto p-10 bg-gradient-to-br from-cyan-950/30 to-transparent border border-cyan-500/10 rounded-[2.5rem]">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">Share files the private way</h2>
            <p className="text-zinc-400 mb-8 text-sm">Zero data. Zero trace. Maximum privacy.</p>
            <Link href="/">
              <button className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105">
                Create Secure Room <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </section>

        <footer className="text-center pb-12 text-zinc-700 text-xs">
          © 2026 VioraShare · <Link href="/privacy" className="hover:text-zinc-500 transition-colors">Privacy</Link> · <Link href="/terms" className="hover:text-zinc-500 transition-colors">Terms</Link>
        </footer>
      </main>
    </>
  );
}
