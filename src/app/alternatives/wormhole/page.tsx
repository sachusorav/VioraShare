import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, Zap, Shield, Lock, UserX } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Wormhole Alternative Free | Secure File Sharing — VioraShare",
  description: "Looking for a Wormhole alternative? VioraShare offers secure, passcode-protected rooms for your files. No login, no email, 100% free with self-destructing data.",
  keywords: [
    "Wormhole alternative", "Wormhole alternative free", "better than Wormhole",
    "send files without link", "Wormhole vs VioraShare", "free file sharing no sign up",
    "anonymous file transfer", "Wormhole replacement", "send encrypted files free"
  ],
  alternates: { canonical: "/alternatives/wormhole" },
  openGraph: {
    title: "Best Free Wormhole Alternative — VioraShare",
    description: "Secure rooms. Passcode protection. No login. The private Wormhole alternative.",
    url: "https://viorashare.online/alternatives/wormhole",
  },
};

const comparison = [
  { feature: "No Login Required",       viora: true,  wormhole: true },
  { feature: "Secure Passcode Rooms",    viora: true,  wormhole: false },
  { feature: "Shared Clipboard",         viora: true,  wormhole: false },
  { feature: "QR Code Sharing",          viora: true,  wormhole: true },
  { feature: "Self-Destructing Files",   viora: true,  wormhole: true },
  { feature: "Completely Free",          viora: true,  wormhole: true },
  { feature: "Instant access",           viora: true,  wormhole: true },
];

export default function WormholeAlternativePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/20 selection:text-purple-300">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full -z-10" />

        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-purple-400 mb-8">
          <Lock className="w-3 h-3" /> Wormhole Alternative
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-4xl mx-auto leading-none mb-6">
          The Private Wormhole Alternative<br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Secure Rooms, Not Just Links
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Wormhole sends links. VioraShare creates secure, passcode-protected rooms.
          Share files and text across devices with zero trace. 100% Free.
        </p>

        <Link href="/">
          <button className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-purple-500/25">
            Create Your Room — It's Free
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </section>

      {/* Comparison Table */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-12">
          VioraShare vs Wormhole
        </h2>
        <div className="overflow-x-auto rounded-3xl border border-white/5 bg-white/[0.02]">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-5 text-xs uppercase tracking-widest text-zinc-500 font-bold">Feature</th>
                <th className="px-6 py-5 text-center text-purple-400 font-black">VioraShare</th>
                <th className="px-6 py-5 text-center text-zinc-500 font-bold text-xs">Wormhole</th>
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
                    {row.wormhole ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-zinc-700 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-xl mx-auto p-10 bg-gradient-to-br from-purple-950/40 to-transparent border border-purple-500/10 rounded-[2.5rem]">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">Ready for more privacy?</h2>
          <p className="text-zinc-400 mb-8 text-sm">Join VioraShare and start sharing files the smart way.</p>
          <Link href="/">
            <button className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105">
              Start Sharing Free <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      <footer className="text-center pb-12 text-zinc-700 text-xs px-6">
        <p className="max-w-2xl mx-auto mb-4 opacity-50 italic">
          VioraShare is not affiliated with Wormhole. All product names, logos, and brands are property of their respective owners. 
        </p>
        © 2026 VioraShare · <Link href="/privacy" className="hover:text-zinc-500 transition-colors">Privacy Policy</Link> · <Link href="/terms" className="hover:text-zinc-500 transition-colors">Terms of Service</Link>
      </footer>
    </main>
  );
}
