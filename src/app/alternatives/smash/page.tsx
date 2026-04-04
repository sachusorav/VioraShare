import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, Zap, Shield, Clock, UserX } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Smash Alternative Free | No Wait File Sharing — VioraShare",
  description: "Looking for a Smash alternative? VioraShare offers instant file sharing with zero queues or wait times. No login, no email, 100% free with secure rooms.",
  keywords: [
    "Smash alternative", "Smash alternative free", "better than Smash",
    "send large files no wait", "Smash vs VioraShare", "free file sharing no sign up",
    "anonymous file transfer", "Smash replacement", "send large files free"
  ],
  alternates: { canonical: "/alternatives/smash" },
  openGraph: {
    title: "Best Free Smash Alternative — VioraShare",
    description: "Zero wait times. Instant uploads. Secure rooms. The faster Smash alternative.",
    url: "https://viorashare.online/alternatives/smash",
  },
};

const comparison = [
  { feature: "No Login Required",       viora: true,  smash: true },
  { feature: "Zero Wait Times",          viora: true,  smash: false },
  { feature: "Instant Sharing",          viora: true,  smash: true },
  { feature: "Passcode Protection",      viora: true,  smash: false },
  { feature: "Self-Destructing Files",   viora: true,  smash: true },
  { feature: "Completely Free",          viora: true,  smash: true },
];

export default function SmashAlternativePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/20 selection:text-pink-300">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-950/20 via-transparent to-transparent -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full -z-10" />

        <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-pink-400 mb-8">
          <Zap className="w-3 h-3" /> Smash Alternative
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-4xl mx-auto leading-none mb-6">
          The Instant Smash Alternative<br />
          <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
            No Queues, No Wait Times
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Smash sometimes makes you wait for large transfers. VioraShare is instant.
          Create a room, drop your files, and you're done. No email, no account.
        </p>

        <Link href="/">
          <button className="inline-flex items-center gap-3 bg-pink-600 hover:bg-pink-500 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-pink-500/25">
            Try VioraShare — It's Instant
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </section>

      {/* Comparison Table */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-12">
          VioraShare vs Smash
        </h2>
        <div className="overflow-x-auto rounded-3xl border border-white/5 bg-white/[0.02]">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-5 text-xs uppercase tracking-widest text-zinc-500 font-bold">Feature</th>
                <th className="px-6 py-5 text-center text-pink-400 font-black">VioraShare</th>
                <th className="px-6 py-5 text-center text-zinc-500 font-bold text-xs">Smash</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-300">{row.feature}</td>
                  <td className="px-6 py-4 text-center">
                    {row.viora ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-red-500 mx-auto" />}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.smash ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-zinc-700 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-xl mx-auto p-10 bg-gradient-to-br from-pink-950/40 to-transparent border border-pink-500/10 rounded-[2.5rem]">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">Don't wait for your files.</h2>
          <p className="text-zinc-400 mb-8 text-sm">Experience the fastest way to share files today.</p>
          <Link href="/">
            <button className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105">
              Start Now Free <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      <footer className="text-center pb-12 text-zinc-700 text-xs px-6">
        <p className="max-w-2xl mx-auto mb-4 opacity-50 italic">
          VioraShare is not affiliated with Smash (fromsmash.com). All product names, logos, and brands are property of their respective owners. 
        </p>
        © 2026 VioraShare · <Link href="/privacy" className="hover:text-zinc-500 transition-colors">Privacy Policy</Link> · <Link href="/terms" className="hover:text-zinc-500 transition-colors">Terms of Service</Link>
      </footer>
    </main>
  );
}
