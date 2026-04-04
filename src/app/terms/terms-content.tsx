"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Copyright, 
  Lock, 
  Ban 
} from "lucide-react";
import { motion } from "framer-motion";

export default function TermsContent() {
  const terms = [
    {
      title: "1. Acceptance of Terms",
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
      content: "By accessing VioraShare (\"the Service\"), you agree to be bound by these terms. If you do not agree to any part of the terms, you must not use the service."
    },
    {
      title: "2. Permitted Use",
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
      content: "VioraShare is a productivity tool for temporary file sharing. You agree not to use the service for illegal content, malware distribution, or harassment via Shared Clipboard or Chat."
    },
    {
      title: "3. Content Responsibility",
      icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
      content: "You are exclusively responsible for the content you upload. VioraShare does not monitor or audit private rooms, and we are not liable for any content shared between users."
    },
    {
      title: "4. Intellectual Property",
      icon: <Copyright className="w-6 h-6 text-indigo-400" />,
      content: "The software, design, and branding of VioraShare are the exclusive property of its creator, Sachin Kumar. Unauthorized reproduction or reverse-engineering is strictly prohibited."
    },
    {
      title: "5. Limitation of Liability",
      icon: <Lock className="w-6 h-6 text-zinc-400" />,
      content: "VioraShare is provided \"AS IS\" without warranties. We are not responsible for any data loss, service interruptions, or damages arising from the use of the site."
    },
    {
      title: "6. Termination",
      icon: <Ban className="w-6 h-6 text-red-500" />,
      content: "We reserve the right to block access or delete rooms that violate these terms without prior notice to ensure the security of the ecosystem."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-16 selection:bg-primary/30 selection:text-primary-foreground relative overflow-hidden">
      <div className="absolute top-[-5%] right-[-5%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] -z-20 pointer-events-none scale-150 rotate-45">
        <Image src="/icon.png" alt="" width={600} height={600} priority />
      </div>

      <div className="max-w-2xl mx-auto space-y-12 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="space-y-4">
          <Link href="/">
            <Button variant="ghost" className="mb-2 -ml-3 h-8 hover:bg-white/5 transition-all text-muted-foreground hover:text-primary group text-[10px] uppercase tracking-[0.2em] font-bold">
              <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to VioraShare
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 border border-primary/20 backdrop-blur-2xl rounded-2xl relative">
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-none mb-1.5">Legal Terms</h1>
              <p className="text-muted-foreground/60 font-medium text-xs md:text-sm">Effective Date: March 27, 2026</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl space-y-10 shadow-3xl shadow-black/50 overflow-hidden relative">
          {terms.map((term, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="space-y-3 group"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2 bg-zinc-900 border border-white/10 rounded-xl shadow-xl transition-transform group-hover:scale-110 duration-500">
                  {term.icon}
                </div>
                <h2 className="text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-500">{term.title}</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed text-sm font-medium pl-0 md:pl-[3.75rem] max-w-lg">
                {term.content}
              </p>
            </motion.div>
          ))}
        </div>

        <footer className="pt-12 border-t border-white/10 text-center text-muted-foreground/40 text-[10px] uppercase tracking-[0.3em] font-medium">
          Legal inquiries: <span className="text-white/60 no-underline font-bold tracking-tight">heyimsachin009@gmail.com</span>
        </footer>
      </div>
    </main>
  );
}
