"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, HelpCircle, ChevronDown, Mail,
  Shield, Clock, Zap, FileBox, Flame
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

const faqs = [
  {
    question: "How do I share files without an account?",
    answer: "Create a room with a custom duration (15 min, 1 hour, or 24 hours) and a passcode. Once active, upload files and share the Room ID + passcode with your recipient — no sign-up on either side.",
    icon: FileBox,
  },
  {
    question: "What is the maximum file size?",
    answer: "VioraShare supports individual file uploads up to 50 MB. This ensures optimal speed and reliability. For larger transfers, contact support.",
    icon: Zap,
  },
  {
    question: "How long are files stored?",
    answer: "You choose: 15 minutes, 1 hour, or 24 hours. When the room timer hits zero, all files and room data are permanently and irreversibly purged from encrypted storage.",
    icon: Clock,
  },
  {
    question: "Is VioraShare secure and private?",
    answer: "Security is the foundation. No personal information is ever collected. All data lives in encrypted buckets gated by bcrypt-hashed passcodes. Zero persistent activity tracking.",
    icon: Shield,
  },
  {
    question: "How does Self-Destruct mode work?",
    answer: "When Self-Destruct is enabled on a file, it is immediately and permanently deleted the moment it is successfully downloaded. One transfer, zero remaining trace.",
    icon: Flame,
  },
];

export default function HelpContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  };

  return (
    <main className="min-h-screen px-4 sm:px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-2xl mx-auto space-y-12">

        {/* Back */}
        <Link href="/">
          <Button variant="ghost"
            className="h-8 -ml-2 text-muted-foreground hover:text-foreground gap-2 type-caption uppercase tracking-widest font-bold">
            <ArrowLeft className="w-3 h-3" />
            Back to VioraShare
          </Button>
        </Link>

        {/* Page header */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl surface flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5 text-primary" strokeWidth={1.75} />
          </div>
          <div>
            <h1 className="type-h1">Help & FAQ</h1>
            <p className="type-caption text-muted-foreground mt-0.5">Everything you need to know.</p>
          </div>
        </div>

        {/* Section label */}
        <div className="flex items-center gap-3">
          <span className="type-caption text-muted-foreground/40 uppercase tracking-widest font-bold">
            Frequently asked
          </span>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        {/* Accordion — consistent treatment */}
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const Icon = faq.icon;
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-200
                  ${isOpen
                    ? "bg-card border-primary/25 shadow-sm"
                    : "surface hover:bg-card/60"
                  }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between p-5 text-left
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                             rounded-2xl"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Icon: outline, teal when open, neutral when closed — no background chip */}
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-colors duration-200 ${isOpen ? "text-primary" : "text-muted-foreground/50"}`}
                      strokeWidth={1.75}
                    />
                    <span className={`type-h2 transition-colors duration-200 ${isOpen ? "text-foreground" : "text-foreground/75"}`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-muted-foreground/40 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`}
                    strokeWidth={2}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 ml-[52px] type-body text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still curious — contact CTA */}
        <div className="surface rounded-3xl p-8 space-y-4">
          <div className="space-y-1">
            <h2 className="type-h1">Still have questions?</h2>
            <p className="type-body text-muted-foreground">Our team responds within 24 hours.</p>
          </div>
          <Button
            size="lg"
            onClick={() => {
              const email = "heyimsachin009@gmail.com";
              navigator.clipboard.writeText(email);
              toast.success("Email copied to clipboard!");
              window.location.href = `mailto:${email}`;
            }}
            className="gap-2 font-bold"
          >
            <Mail className="w-4 h-4" strokeWidth={1.75} />
            Contact Support
          </Button>
        </div>

        <footer className="text-center py-8 border-t border-border/40 type-caption text-muted-foreground/30">
          © 2026 VioraShare by Sachin Kumar
        </footer>
      </div>
    </main>
  );
}
