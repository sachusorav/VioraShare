import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Trash2, Zap, Shield, Timer } from "lucide-react";

export const metadata: Metadata = {
  title: "Temporary File Sharing | Self-Destructing File Transfer Free — VioraShare",
  description: "Share files temporarily with automatic expiry. VioraShare creates self-destructing rooms that delete all files after 15 minutes, 1 hour, or 24 hours. Free, no login.",
  keywords: [
    "temporary file sharing", "self destructing file share", "disposable file transfer",
    "file sharing with expiry", "auto delete file sharing", "timed file sharing",
    "temporary file upload", "expiring file links", "files that delete themselves"
  ],
  alternates: { canonical: "https://www.viorashare.online/temporary-file-sharing" },
  openGraph: {
    title: "Temporary File Sharing That Auto-Deletes — VioraShare",
    description: "Create self-destructing file rooms. Files vanish automatically when time's up.",
    url: "https://www.viorashare.online/temporary-file-sharing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does temporary file sharing work on VioraShare?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Create a room with an expiry time (15 minutes, 1 hour, or 24 hours). Upload files. Share the Room ID and passcode. When the timer ends, all files and data are automatically deleted from our servers."
      }
    },
    {
      "@type": "Question",
      "name": "Do files really delete automatically?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. VioraShare uses automated cleanup to permanently delete all files, messages, and room data when the expiry time is reached. Nothing is recoverable after deletion."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a self-destruct on first download option?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. VioraShare has a 'Self-Destruct' mode where each file is deleted immediately after its first download, regardless of the room expiry time."
      }
    }
  ]
};

const expiryOptions = [
  { time: "15 Min", icon: "⚡", desc: "Perfect for quick cross-device drops. Zero footprint.", highlight: false },
  { time: "1 Hour", icon: "🕐", desc: "Ideal for meetings and team collaborations.", highlight: true },
  { time: "24 Hours", icon: "📅", desc: "Great for client deliverables and project sharing.", highlight: false },
];

export default function TemporaryFileSharingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-black text-white selection:bg-purple-500/20 selection:text-purple-300">

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent -z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-500/8 blur-[120px] rounded-full -z-10" />

          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-purple-400 mb-8">
            <Timer className="w-3 h-3" /> Files That Disappear
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-4xl mx-auto leading-none mb-6">
            Temporary File Sharing<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              That Auto-Deletes
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Create disposable file rooms with automatic expiry. Share files, set a timer,
            and everything self-destructs when time runs out. No login required.
          </p>

          <Link href="/">
            <button className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-purple-500/20">
              Create a Self-Destructing Room
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="mt-4 text-[11px] text-zinc-600 uppercase tracking-widest">Free · No account · Files auto-delete</p>
        </section>

        {/* Expiry Options */}
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-3">Choose Your Expiry</h2>
          <p className="text-zinc-500 text-center text-sm mb-12">Pick how long your files live — then they're gone forever</p>
          <div className="grid md:grid-cols-3 gap-4">
            {expiryOptions.map((opt, i) => (
              <div key={i} className={`p-8 rounded-3xl border transition-all text-center ${opt.highlight ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}>
                <div className="text-4xl mb-4">{opt.icon}</div>
                <h3 className={`text-2xl font-black mb-2 ${opt.highlight ? 'text-purple-400' : 'text-white'}`}>{opt.time}</h3>
                <p className="text-zinc-500 text-sm">{opt.desc}</p>
                {opt.highlight && <span className="inline-block mt-4 text-[10px] uppercase tracking-widest font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">Most Popular</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-12">Built for Ephemeral Sharing</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Trash2, title: "Auto-Delete on Expiry", desc: "All files, messages, and metadata are permanently purged when your room expires.", color: "text-red-400" },
              { icon: Zap, title: "Self-Destruct per File", desc: "Enable per-file self-destruct: each file deletes itself immediately after the first download.", color: "text-yellow-400" },
              { icon: Shield, title: "Passcode Protected", desc: "Only people with your Room ID and passcode can access files during the active window.", color: "text-blue-400" },
              { icon: Clock, title: "Live Countdown Timer", desc: "See exactly how much time remains on your room with a live countdown in the dashboard.", color: "text-purple-400" },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-colors group">
                <div className={`p-2.5 bg-white/5 rounded-xl shrink-0 ${color} group-hover:bg-white/10 transition-colors`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-xl mx-auto p-10 bg-gradient-to-br from-purple-950/30 to-transparent border border-purple-500/10 rounded-[2.5rem]">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">Share files that disappear</h2>
            <p className="text-zinc-400 mb-8 text-sm">Create your first self-destructing room in under 10 seconds.</p>
            <Link href="/">
              <button className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105">
                Start Sharing <ArrowRight className="w-4 h-4" />
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
