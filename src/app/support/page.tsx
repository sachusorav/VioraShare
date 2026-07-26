import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, Share2, Github, Coffee, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Support VioraShare - Help Keep File Sharing Free",
  description: "VioraShare is free, anonymous, and ad-free. Help us keep it running by spreading the word, starring us on GitHub, or leaving feedback.",
  alternates: {
    canonical: "https://www.viorashare.online/support",
  },
};

const supportOptions = [
  {
    icon: Share2,
    title: "Spread the Word",
    description: "Share VioraShare with friends, colleagues, or on social media. Every mention helps more people discover a privacy-first file sharing tool.",
    action: { label: "Share VioraShare", href: "https://twitter.com/intent/tweet?text=VioraShare%20is%20the%20best%20free%20file%20sharing%20tool%20I%27ve%20found%20-%20no%20login%2C%20no%20trace%2C%20instant%20rooms!%20Check%20it%20out%20at%20https://www.viorashare.online", external: true },
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Star,
    title: "Star on GitHub",
    description: "Give the project a star on GitHub. It takes 2 seconds and helps the project gain visibility in the open-source community.",
    action: { label: "Star on GitHub", href: "https://github.com/sachusorav/VioraShare", external: true },
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    icon: MessageSquare,
    title: "Leave Feedback",
    description: "Found a bug or have a feature idea? Reach out to us on LinkedIn. Your feedback directly shapes the future of VioraShare.",
    action: { label: "Message on LinkedIn", href: "https://www.linkedin.com/in/sachinkumar014", external: true },
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    icon: Coffee,
    title: "Buy Me a Coffee",
    description: "Monetary support helps cover server, database, and storage costs. Donation support is coming soon — thanks for your patience!",
    action: { label: "Coming Soon", href: "#", external: false },
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    disabled: true,
  },
];

export default function SupportPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden min-h-screen w-full">
      {/* Background gradients */}
      <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[80px] -z-10 pointer-events-none" />

      <div className="w-full max-w-2xl flex flex-col items-center gap-10 relative z-10">
        {/* Header */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image src="/icon.png" alt="VioraShare" width={40} height={40} />
          <span className="text-2xl font-bold font-heading">VioraShare.</span>
        </Link>

        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-red-400 fill-red-400" />
            <h1 className="text-3xl md:text-4xl font-bold font-heading">Support VioraShare</h1>
          </div>
          <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
            VioraShare is completely free, has no ads, and requires no login. Running it costs real money for servers, database, and storage. Here's how you can help keep it alive:
          </p>
        </div>

        {/* Support Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {supportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.title}
                className={`bg-card/40 backdrop-blur border ${option.bg} overflow-hidden relative group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${option.disabled ? "opacity-60" : ""}`}
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className={`p-2.5 rounded-xl ${option.bg} w-fit`}>
                    <Icon className={`w-5 h-5 ${option.color}`} />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h2 className="font-heading font-bold text-base">{option.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{option.description}</p>
                  </div>
                  {option.disabled ? (
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground border border-border rounded-lg px-4 py-2.5 text-center">
                      {option.action.label}
                    </span>
                  ) : option.action.external ? (
                    <a
                      href={option.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs font-bold uppercase tracking-wider border rounded-lg px-4 py-2.5 text-center transition-colors ${option.color} ${option.bg} hover:opacity-80`}
                    >
                      {option.action.label} →
                    </a>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground border border-border rounded-lg px-4 py-2.5 text-center">
                      {option.action.label}
                    </span>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Built by footer */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Built with ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/sachinkumar014"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-semibold hover:text-primary transition-colors"
            >
              Sachin Kumar
            </a>
          </p>
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
