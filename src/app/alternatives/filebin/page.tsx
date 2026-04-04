import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, Zap, Shield, UserX, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Filebin Alternative Free | Secure File Sharing — VioraShare",
  description: "Looking for a Filebin alternative? VioraShare offers secure, private, passcode-protected rooms. No public listings, no login, 100% free.",
  keywords: [
    "Filebin alternative", "Filebin alternative free", "better than Filebin",
    "private file sharing no bin", "Filebin vs VioraShare", "free file sharing no sign up",
    "anonymous file transfer", "Filebin replacement", "secure file upload free"
  ],
  alternates: { canonical: "/alternatives/filebin" },
  openGraph: {
    title: "Best Free Filebin Alternative — VioraShare",
    description: "Private rooms. No public access. Secure passcodes. The smarter Filebin alternative.",
    url: "https://viorashare.online/alternatives/filebin",
  },
};

const comparison = [
  { feature: "No Login Required",       viora: true,  filebin: true },
  { feature: "Secure Passcode Access",   viora: true,  filebin: false },
  { feature: "No Public Listing",        viora: true,  filebin: false },
  { feature: "Self-Destructing Files",   viora: true,  filebin: true },
  { feature: "Completely Free",          viora: true,  filebin: true },
  { feature: "Zero Tracking",            viora: true,  filebin: true },
];

export default function FilebinAlternativePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />

        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-400 mb-8">
          <Shield className="w-3 h-3" /> Filebin Alternative
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-4xl mx-auto leading-none mb-6">
          The Private Filebin Alternative<br />
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Private Rooms, Not Public Bins
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Filebin is great, but VioraShare adds a layer of privacy with secure passcode rooms.
          No more public bins. Just private rooms for your files. 100% Free.
        </p>

        <Link href="/">
          <button className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-500/25">
            Create a Private Room — Free
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </section>

      {/* Comparison Table */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-12">
          VioraShare vs Filebin
        </h2>
        <div className="overflow-x-auto rounded-3xl border border-white/5 bg-white/[0.02]">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-5 text-xs uppercase tracking-widest text-zinc-500 font-bold">Feature</th>
                <th className="px-6 py-5 text-center text-emerald-400 font-black">VioraShare</th>
                <th className="px-6 py-5 text-center text-zinc-500 font-bold text-xs">Filebin</th>
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
                    {row.filebin ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-zinc-700 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-xl mx-auto p-10 bg-gradient-to-br from-emerald-950/40 to-transparent border border-emerald-500/10 rounded-[2.5rem]">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">Ditch the public bins.</h2>
          <p className="text-zinc-400 mb-8 text-sm">Experience the security of private rooms today.</p>
          <Link href="/">
            <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105">
              Create a Room Free <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      <footer className="text-center pb-12 text-zinc-700 text-xs px-6">
        <p className="max-w-2xl mx-auto mb-4 opacity-50 italic">
          VioraShare is not affiliated with Filebin. All product names, logos, and brands are property of their respective owners. 
        </p>
        © 2026 VioraShare · <Link href="/privacy" className="hover:text-zinc-500 transition-colors">Privacy Policy</Link> · <Link href="/terms" className="hover:text-zinc-500 transition-colors">Terms of Service</Link>
      </footer>
    </main>
  );
}
