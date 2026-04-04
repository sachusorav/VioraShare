import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, Zap, Shield, Clock, UserX } from "lucide-react";

export const metadata: Metadata = {
  title: "Best WeTransfer Alternative Free | No Login File Sharing — VioraShare",
  description: "Looking for a WeTransfer alternative? VioraShare is 100% free, requires no login, no email, and files self-destruct automatically. The private WeTransfer replacement.",
  keywords: [
    "WeTransfer alternative", "WeTransfer alternative free", "better than WeTransfer",
    "WeTransfer no login", "WeTransfer without account", "free file sharing no sign up",
    "anonymous file transfer", "WeTransfer replacement", "send files free no account"
  ],
  alternates: { canonical: "/alternatives/wetransfer" },
  openGraph: {
    title: "Best Free WeTransfer Alternative — VioraShare",
    description: "No login. No email. Files self-destruct. The private WeTransfer alternative.",
    url: "https://viorashare.online/alternatives/wetransfer",
  },
};

const comparison = [
  { feature: "No Login Required",       viora: true,  wetransfer: false, drive: false, dropbox: false },
  { feature: "No Email Needed",          viora: true,  wetransfer: false, drive: false, dropbox: false },
  { feature: "Self-Destructing Files",   viora: true,  wetransfer: false, drive: false, dropbox: false },
  { feature: "Passcode Protection",      viora: true,  wetransfer: false, drive: true,  dropbox: true  },
  { feature: "Completely Free",          viora: true,  wetransfer: false, drive: false, dropbox: false },
  { feature: "Zero Tracking",            viora: true,  wetransfer: false, drive: false, dropbox: false },
  { feature: "Instant Room Creation",    viora: true,  wetransfer: false, drive: false, dropbox: false },
  { feature: "No Ads on Files",          viora: true,  wetransfer: false, drive: true,  dropbox: true  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is VioraShare better than WeTransfer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VioraShare offers key advantages over WeTransfer: no login required, no email address needed, fully free with no file size ads, and self-destructing rooms for maximum privacy."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use VioraShare without creating an account?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. VioraShare requires zero account creation. Just visit the site, create a room with a passcode, and start sharing immediately."
      }
    },
    {
      "@type": "Question",
      "name": "Is VioraShare free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, VioraShare is completely free. No subscription, no premium tier required for basic file sharing."
      }
    }
  ]
};

export default function WeTransferAlternativePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-black text-white selection:bg-blue-500/20 selection:text-blue-300">

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-transparent to-transparent -z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -z-10" />

          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-8">
            <Zap className="w-3 h-3" /> WeTransfer Alternative
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter max-w-4xl mx-auto leading-none mb-6">
            The Free WeTransfer Alternative<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              With No Login Required
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            VioraShare lets you send files instantly — no account, no email, no tracking.
            Create a secure room in 10 seconds and share anything. Files auto-delete when done.
          </p>

          <Link href="/">
            <button className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/25">
              Try VioraShare Free — No Account Needed
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <p className="mt-4 text-[11px] text-zinc-600 uppercase tracking-widest">No sign-up · No credit card · Instant access</p>
        </section>

        {/* Comparison Table */}
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-3">
            VioraShare vs The Rest
          </h2>
          <p className="text-zinc-500 text-center text-sm mb-12">See why VioraShare is the smarter, more private choice</p>

          <div className="overflow-x-auto rounded-3xl border border-white/5 bg-white/[0.02]">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-5 text-xs uppercase tracking-widest text-zinc-500 font-bold">Feature</th>
                  <th className="px-6 py-5 text-center">
                    <span className="text-blue-400 font-black text-sm">VioraShare</span>
                  </th>
                  <th className="px-6 py-5 text-center text-zinc-500 font-bold text-xs">WeTransfer</th>
                  <th className="px-6 py-5 text-center text-zinc-500 font-bold text-xs">Google Drive</th>
                  <th className="px-6 py-5 text-center text-zinc-500 font-bold text-xs">Dropbox</th>
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
                      {row.wetransfer ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-zinc-700 mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.drive ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-zinc-700 mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.dropbox ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : <X className="w-5 h-5 text-zinc-700 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-16 max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-12">Why Switch to VioraShare?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: UserX, title: "Zero Account", desc: "Create a room instantly. No sign-up, no email, no password to remember.", color: "text-blue-400" },
              { icon: Shield, title: "Private by Design", desc: "Passcode-protected rooms. Zero PII stored. GDPR-friendly.", color: "text-green-400" },
              { icon: Clock, title: "Auto Self-Destruct", desc: "Rooms expire in 15min, 1hr, or 24hr. Files vanish automatically.", color: "text-purple-400" },
              { icon: Zap, title: "Instant & Free", desc: "No subscription needed. No ads on your files. Permanently free.", color: "text-yellow-400" },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-white/10 transition-colors group">
                <div className={`mb-4 ${color}`}><Icon className="w-7 h-7" /></div>
                <h3 className="font-bold text-white mb-2 tracking-tight">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-xl mx-auto p-10 bg-gradient-to-br from-blue-950/40 to-transparent border border-blue-500/10 rounded-[2.5rem]">
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4">Ready to ditch WeTransfer?</h2>
            <p className="text-zinc-400 mb-8 text-sm">Join thousands of users sharing files the smarter, more private way.</p>
            <Link href="/">
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl transition-all hover:scale-105">
                Create Your Free Room <ArrowRight className="w-4 h-4" />
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
