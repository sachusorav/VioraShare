import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, Share2, Github, MessageSquare, Coffee } from "lucide-react";

export const metadata: Metadata = {
  title: "Support VioraShare — Help Keep File Sharing Free",
  description: "VioraShare is free, anonymous, and ad-free. Help us keep it running by spreading the word, starring us on GitHub, or leaving feedback.",
  alternates: { canonical: "https://www.viorashare.online/support" },
};

const supportOptions = [
  {
    icon: Share2,
    title: "Spread the Word",
    description: "Share VioraShare with friends or colleagues. Every mention helps more people discover a privacy-first file sharing tool.",
    action: {
      label: "Share on X",
      href: "https://twitter.com/intent/tweet?text=VioraShare%20is%20the%20best%20free%20file%20sharing%20tool%20I%27ve%20found%20-%20no%20login%2C%20no%20trace%2C%20instant%20rooms!%20Check%20it%20out%20at%20https://www.viorashare.online",
      external: true,
    },
  },
  {
    icon: Star,
    title: "Star on GitHub",
    description: "Give the project a star. It takes two seconds and helps VioraShare gain visibility in the open-source community.",
    action: { label: "Star on GitHub", href: "https://github.com/sachusorav/VioraShare", external: true },
  },
  {
    icon: MessageSquare,
    title: "Leave Feedback",
    description: "Found a bug or have a feature idea? Message on LinkedIn. Your feedback directly shapes the product.",
    action: { label: "Message on LinkedIn", href: "https://www.linkedin.com/in/sachinkumar014", external: true },
  },
  {
    icon: Coffee,
    title: "Buy Me a Coffee",
    description: "Monetary support helps cover server, database, and storage costs. Donation support is coming soon.",
    action: { label: "Coming Soon", href: "#", external: false },
    disabled: true,
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 py-16 relative overflow-hidden">
      {/* Single-accent ambient — teal only */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[55%] h-[55%] rounded-full bg-primary/4 blur-[140px]" />
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-12">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-75 transition-opacity self-center">
          <Image src="/icon.png" alt="VioraShare" width={28} height={28} className="rounded-lg" />
          <span className="font-heading text-base font-bold tracking-tight">VioraShare</span>
        </Link>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-primary" strokeWidth={1.75} />
            <h1 className="type-h1">Support VioraShare</h1>
          </div>
          <p className="type-body text-muted-foreground max-w-md mx-auto">
            VioraShare is completely free, has no ads, and requires no login. Running it costs
            real money for servers, databases, and storage. Here's how you can help:
          </p>
        </div>

        {/* Cards — all same style, no rainbow colors */}
        <div className="grid sm:grid-cols-2 gap-4">
          {supportOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.title}
                className={`surface rounded-2xl p-6 flex flex-col gap-4 transition-all duration-150
                  ${opt.disabled ? "opacity-50" : "hover:bg-card/80"}`}
              >
                {/* Icon: no colored background chip — outline, teal or muted */}
                <Icon
                  className={`w-5 h-5 ${opt.disabled ? "text-muted-foreground/40" : "text-primary"}`}
                  strokeWidth={1.75}
                />
                <div className="flex-1 space-y-1.5">
                  <h2 className="type-h2">{opt.title}</h2>
                  <p className="type-caption text-muted-foreground leading-relaxed">{opt.description}</p>
                </div>
                {opt.disabled ? (
                  <span className="type-caption font-bold text-muted-foreground/40 uppercase tracking-widest">
                    {opt.action.label}
                  </span>
                ) : opt.action.external ? (
                  <a
                    href={opt.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 type-caption font-bold text-primary
                               hover:underline underline-offset-2 transition-colors uppercase tracking-wider"
                  >
                    {opt.action.label} →
                  </a>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="text-center space-y-2 border-t border-border/40 pt-8">
          <p className="type-body text-muted-foreground">
            Built with care by{" "}
            <a
              href="https://www.linkedin.com/in/sachinkumar014"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-2 font-semibold"
            >
              Sachin Kumar
            </a>
          </p>
          <Link href="/" className="type-caption text-muted-foreground/40 hover:text-foreground transition-colors">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
