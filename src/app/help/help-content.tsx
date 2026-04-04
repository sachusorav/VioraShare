"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  HelpCircle, 
  ChevronDown, 
  Mail, 
  Shield, 
  Clock, 
  Zap, 
  FileBox,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const faqs = [
  {
    question: "How do I share files?",
    answer: "Simply create a 'Room' with a custom duration (15m, 1h, or 24h) and a passcode. Once the room is created, upload your files and share the magic link or the room ID and passcode with your friends. Everything syncs instantly!",
    icon: <FileBox className="w-5 h-5 text-blue-500" />
  },
  {
    question: "What is the file size limit?",
    answer: "VioraShare currently supports files up to 50MB for optimal speed and reliability. If you need larger file support, feel free to reach out to our team.",
    icon: <Zap className="w-5 h-5 text-yellow-500" />
  },
  {
    question: "How long do rooms last?",
    answer: "You are the master! You can choose 15 minutes for a quick drop, 1 hour for a meeting, or 24 hours for long-term collaboration. Once the timer hits zero, the room and all its files are permanently deleted from our servers.",
    icon: <Clock className="w-5 h-5 text-purple-500" />
  },
  {
    question: "Is it secure?",
    answer: "Absolutely. We don't require accounts, so your personal identity is never at risk. Files are stored in secure, encrypted buckets and protected by the room passcode you set. Plus, our 'Self-Destruct' feature ensures files expire instantly after download.",
    icon: <Shield className="w-5 h-5 text-green-500" />
  },
  {
    question: "What is the 'Self-Destruct' mode?",
    answer: "When enabled, 'Self-Destruct' ensures that once a file is downloaded, it is immediately deleted from our server. This is the ultimate privacy tier for highly sensitive sharing.",
    icon: <Shield className="w-5 h-5 text-red-500" />
  }
];

export default function HelpContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-24 selection:bg-primary/30 selection:text-primary-foreground relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[150px] -z-10 pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] -z-20 pointer-events-none scale-150 rotate-12">
        <Image src="/icon.png" alt="" width={600} height={600} priority />
      </div>

      <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out relative z-10">
        <div className="space-y-4">
          <Link href="/">
            <Button variant="ghost" className="mb-2 -ml-3 h-8 hover:bg-white/5 transition-all text-muted-foreground hover:text-primary group text-[10px] uppercase tracking-[0.2em] font-bold">
              <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to VioraShare
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 border border-primary/20 backdrop-blur-2xl rounded-2xl relative group">
              <HelpCircle className="w-8 h-8 text-primary animate-in zoom-in duration-700" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tighter leading-none mb-1 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/40">
                Support Hub
              </h1>
              <p className="text-muted-foreground/60 text-sm md:text-base font-medium max-w-sm">
                Master the art of frictionless, private file sharing.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground/40 flex items-center gap-2">
              <MessageSquare className="w-3 h-3 grayscale opacity-50" />
              Intelligence Briefing
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          
          <div id="faq-schema-container" className="grid gap-3">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`group rounded-2xl transition-all duration-500 border ${
                  openIndex === index 
                  ? 'bg-white/[0.06] border-primary/30 shadow-2xl shadow-primary/5' 
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                } backdrop-blur-2xl overflow-hidden`}
              >
                <button 
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-all duration-500 ${
                      openIndex === index ? 'bg-primary/20' : 'bg-black/40'
                    }`}>
                      {faq.icon}
                    </div>
                    <span className={`font-semibold text-base tracking-tight transition-colors duration-300 ${
                      openIndex === index ? 'text-white' : 'text-white/70'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-full transition-all duration-300 ${
                    openIndex === index ? 'bg-primary/10 rotate-180' : 'bg-white/5'
                  }`}>
                    <ChevronDown className={`w-3.5 h-3.5 transition-colors ${
                      openIndex === index ? 'text-primary' : 'text-muted-foreground/20'
                    }`} />
                  </div>
                </button>
                
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="px-5 pb-6 ml-14"
                >
                  <p className="text-zinc-400 leading-relaxed max-w-lg text-sm font-medium selection:bg-primary/40 selection:text-white">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 backdrop-blur-3xl relative overflow-hidden group shadow-3xl shadow-black">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-1000" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tighter leading-none">Still curious?</h3>
              <p className="text-muted-foreground/80 text-base md:text-lg font-medium max-w-sm">
                If the intelligence briefing above wasn't enough, our team is standing by.
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={() => {
                const email = 'heyimsachin009@gmail.com';
                navigator.clipboard.writeText(email);
                toast.success('Frequency secured: Email copied to clipboard!');
                window.location.href = `mailto:${email}`;
              }}
              className="rounded-xl gap-2.5 h-14 px-8 text-lg font-bold shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all bg-primary hover:bg-blue-600 text-white border-b-4 border-blue-800"
            >
              <Mail className="w-5 h-5 transition-transform group-hover:rotate-12" />
              Contact Support
            </Button>
          </div>
        </div>

        <footer className="pt-20 pb-12 border-t border-white/5 text-center text-muted-foreground/40 text-sm flex flex-col items-center gap-4">
           <div className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <Image src="/icon.png" alt="" width={24} height={24} />
             <span className="font-bold tracking-[0.3em] text-[10px] uppercase">Viora Ecosystem</span>
           </div>
           <p className="font-medium">&copy; 2026 VioraShare Tech. Built by <span className="text-white/60">Sachin Kumar</span>.</p>
           <p className="text-[10px] text-muted-foreground/20 font-mono tracking-[0.5em] uppercase">Private &amp; Frictionless</p>
        </footer>
      </div>
    </main>
  );
}
