import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, UserX, Lock, Zap, Shield, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Send Files Without Login | Anonymous File Sharing Free — VioraShare",
  description: "Send files without login or creating an account. VioraShare lets you share files anonymously in seconds. No email, no sign-up, no trace. 100% free.",
  keywords: [
    "send files without login", "file sharing no account", "anonymous file transfer",
    "share files without sign up", "send files without email", "no registration file sharing",
    "anonymous file upload", "share files no account", "file transfer without account"
  ],
  alternates: { canonical: "/send-files-without-login" },
  openGraph: {
    title: "Send Files Without Login — VioraShare",
    description: "No email. No account. No trace. Share files anonymously in 10 seconds.",
    url: "https://viorashare.online/send-files-without-login",
  },
};

const steps = [
  { step: "01", title: "Go to VioraShare", desc: "Open viorashare.online on any device. No download required." },
  { step: "02", title: "Create a Room", desc: "Set a passcode and choose expiry: 15 min, 1 hour, or 24 hours." },
  { step: "03", title: "Upload Your Files", desc: "Drag & drop or browse to upload. Up to 50MB per file." },
  { step: "04", title: "Share the Room ID", desc: "Send the Room ID and passcode to anyone. They join instantly." },
  { step: "05", title: "Files Auto-Delete", desc: "When the room expires, everything vanishes. Zero trace left behind." },
];

const useCases = [
  { title: "Students", desc: "Share assignments and notes without creating cloud accounts.", emoji: "🎓" },
  { title: "Freelancers", desc: "Send project files to clients without sharing personal info.", emoji: "💼" },
  { title: "Remote Teams", desc: "Quick file drops between colleagues across devices.", emoji: "🌍" },
  { title: "Privacy-Conscious Users", desc: "Share sensitive docs that disappear after viewing.", emoji: "🔒" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Send Files Without Login Using VioraShare",
  "description": "Send files anonymously without creating an account using VioraShare's disposable rooms.",
  "step": steps.map((s, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "name": s.title,
    "text": s.desc,
  }))
};

export default function SendFilesWithoutLoginPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-black text-white selection:bg-blue-500/20 selection:text-blue-300">

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent -z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/8 blur-[120px] rounded-full -z-10" />

          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-400 mb-8">
            <UserX className="w-3 h-3" /> No Login Required
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-4xl mx-auto leading-none mb-6">
            Send Files Without Login<br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              In Under 10 Seconds
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            VioraShare is the fastest way to share files without creating an account.
            No email, no password, no registration. Just create a room and share.
          </p>

          <Link href="/">
            <button className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-500/20">
              Share Files Now — No Account Needed
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="mt-4 text-[11px] text-zinc-600 uppercase tracking-widest">Free forever · Zero sign-up · Works on any device</p>
        </section>

        {/* How It Works */}
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-3">How It Works</h2>
          <p className="text-zinc-500 text-center text-sm mb-12">Share files anonymously in 5 simple steps</p>

          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-colors group">
                <span className="text-3xl font-black text-white/10 group-hover:text-emerald-500/30 transition-colors font-mono tabular-nums shrink-0">{s.step}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-emerald-500/30 shrink-0 ml-auto mt-0.5 group-hover:text-emerald-500 transition-colors" />
              </div>
            ))}
          </div>
        </section>

        {/* Why No Login Matters */}
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-3">Why No Login Matters</h2>
          <p className="text-zinc-500 text-center text-sm mb-12">Your privacy is not an afterthought — it's the architecture</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: UserX, title: "No Identity Exposed", desc: "We never know who you are. No email, no name, nothing tied to you personally.", color: "text-blue-400" },
              { icon: Shield, title: "No Data Stored", desc: "Without an account, there's nothing to leak. Your files exist only for the room's lifetime.", color: "text-emerald-400" },
              { icon: Lock, title: "Passcode Only Access", desc: "Only people with your Room ID and passcode can access your files.", color: "text-purple-400" },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-white/10 transition-colors">
                <div className={`mb-4 ${color}`}><Icon className="w-6 h-6" /></div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-12">Who Uses VioraShare?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((u, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                <span className="text-3xl">{u.emoji}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{u.title}</h3>
                  <p className="text-zinc-500 text-sm">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-xl mx-auto p-10 bg-gradient-to-br from-emerald-950/30 to-transparent border border-emerald-500/10 rounded-[2.5rem]">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">Start sharing without login</h2>
            <p className="text-zinc-400 mb-8 text-sm">No account. No email. No trace. Just files.</p>
            <Link href="/">
              <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105">
                Create a Free Room <ArrowRight className="w-4 h-4" />
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
