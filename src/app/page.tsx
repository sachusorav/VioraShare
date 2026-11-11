export const dynamic = "force-static";
export const revalidate = false;

import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { HomeForms } from "@/components/home-forms";
import { ChevronDown, UserX, Lock, Clock } from "lucide-react";

const BASE_URL = "https://www.viorashare.online";

export const metadata: Metadata = {
  title: "VioraShare — Temporary File Sharing",
  description:
    "Temporary file sharing. Share files without an account. Create a room, upload your files, and share the Room ID. Files are deleted automatically when the expiry ends. Up to 50 MB per file.",
  keywords:
    "temporary file sharing, file sharing without login, share files without account, free file sharing, anonymous file sharing",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "VioraShare — Temporary File Sharing",
    description:
      "Share files without an account. Create a room, upload your files, and share the Room ID. Files are deleted automatically when the expiry ends.",
    url: BASE_URL,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VioraShare — Temporary File Sharing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VioraShare — Temporary File Sharing",
    description: "Temporary file sharing. Share files without an account.",
    images: ["/og-image.png"],
  },
};

const faqs = [
  {
    q: "Is VioraShare free?",
    a: "Yes. Creating rooms, uploading files, and sharing them is free.",
  },
  {
    q: "What is the maximum file size?",
    a: "Up to 50 MB per file.",
  },
  {
    q: "How long are files kept?",
    a: "Until the expiry time you choose - 15 minutes, 1 hour, or 24 hours. After that, the room and its files are deleted.",
  },
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="flex-1 flex flex-col items-center w-full bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO SECTION ── */}
      <section
        aria-label="Create or join a file sharing room"
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-[40px] lg:py-[64px]
                   flex flex-col lg:flex-row lg:items-center lg:justify-between
                   gap-8 lg:gap-16"
      >
        {/* Hero copy */}
        <div className="flex-1 flex flex-col gap-4 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
          <h1 className="text-[28px] lg:text-[38px] font-bold text-foreground leading-[1.2] tracking-tight">
            Temporary file sharing
          </h1>

          <p className="text-[16px] font-semibold text-foreground leading-[1.6]">
            Share files without an account.
          </p>

          <p className="text-[16px] text-muted-foreground leading-[1.6] max-w-md mx-auto lg:mx-0">
            Create a room, upload your files, and share the Room ID. Files are deleted automatically when the expiry ends.
          </p>

          <p className="text-[14px] text-muted-foreground leading-[1.5]">
            Up to 50 MB per file.
          </p>
        </div>

        {/* Room Form */}
        <div id="create-form" className="w-full max-w-[420px] flex-shrink-0 mx-auto lg:mx-0">
          <Suspense
            fallback={
              <div
                className="w-full h-64 bg-card animate-pulse rounded-[12px] border border-border"
                aria-label="Loading file sharing form"
              />
            }
          >
            <HomeForms />
          </Suspense>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        aria-labelledby="how-it-works-heading"
        className="w-full border-t border-border py-[40px] lg:py-[64px]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            id="how-it-works-heading"
            className="text-[22px] font-bold text-foreground leading-[1.5] tracking-tight mb-8"
          >
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create a room",
                desc: "Choose a passcode and an expiry time. No sign-up required.",
              },
              {
                step: "2",
                title: "Upload and share",
                desc: "Upload your files and share the Room ID and passcode.",
              },
              {
                step: "3",
                title: "Files are deleted",
                desc: "When the expiry ends, the room and its files are deleted.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-3">
                <span
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-[14px] font-bold text-accent"
                  aria-hidden="true"
                >
                  {item.step}
                </span>
                <h3 className="text-[16px] font-bold text-foreground leading-[1.5]">
                  {item.title}
                </h3>
                <p className="text-[14px] text-muted-foreground leading-[1.6] max-w-[240px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY VIORASHARE ── */}
      <section
        aria-labelledby="why-viorashare-heading"
        className="w-full border-t border-border py-[40px] lg:py-[64px]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              id="why-viorashare-heading"
              className="text-[22px] font-bold text-foreground leading-[1.5] tracking-tight"
            >
              Why VioraShare
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: UserX,
                title: "No account",
                desc: "No sign-up, no email address required to share or receive files.",
              },
              {
                icon: Lock,
                title: "Passcode protected",
                desc: "Only people with the Room ID and passcode can open the room.",
              },
              {
                icon: Clock,
                title: "Deleted on expiry",
                desc: "Files are kept only until the expiry time you choose.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-[12px] bg-card border border-border space-y-3 transition-colors"
                >
                  <Icon className="w-5 h-5 text-accent stroke-[1.75]" aria-hidden="true" />
                  <h3 className="text-[16px] font-bold text-foreground leading-[1.5]">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-muted-foreground leading-[1.6]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ── */}
      <section
        aria-labelledby="faq-heading"
        className="w-full border-t border-border py-[40px] lg:py-[64px]"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-8">
            <h2
              id="faq-heading"
              className="text-[22px] font-bold text-foreground leading-[1.5] tracking-tight"
            >
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-[12px] border border-border bg-card overflow-hidden transition-all duration-200 motion-reduce:transition-none"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-[16px] text-foreground gap-4 min-h-[44px] [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors duration-150 motion-reduce:transition-none">
                  <span>{faq.q}</span>
                  <ChevronDown
                    className="w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-5 pb-5 text-[14px] text-muted-foreground leading-[1.6]">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/help"
              className="text-[14px] font-medium text-accent hover:underline underline-offset-4 transition-colors min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-[4px]"
            >
              Visit the Help & FAQ page
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full border-t border-border py-[40px] lg:py-[64px] text-center space-y-3">
        <p className="text-[13px] text-muted-foreground leading-[1.5]">
          © 2026 VioraShare. Built by Sachin Kumar.
        </p>
        <nav aria-label="Footer navigation">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
            <Link
              href="/help"
              className="hover:text-accent transition-colors min-h-[44px] inline-flex items-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background rounded-[4px]"
            >
              Help & FAQ
            </Link>
            <Link
              href="/privacy"
              className="hover:text-accent transition-colors min-h-[44px] inline-flex items-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background rounded-[4px]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-accent transition-colors min-h-[44px] inline-flex items-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background rounded-[4px]"
            >
              Terms of Service
            </Link>
            <Link
              href="/secure-file-sharing"
              className="hover:text-accent transition-colors min-h-[44px] inline-flex items-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background rounded-[4px]"
            >
              Security
            </Link>
            <Link
              href="/support"
              className="hover:text-accent transition-colors min-h-[44px] inline-flex items-center px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background rounded-[4px]"
            >
              Support
            </Link>
          </div>
        </nav>
      </footer>
    </main>
  );
}
