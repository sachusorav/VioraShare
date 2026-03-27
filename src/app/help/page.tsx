"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-24 selection:bg-primary/30 selection:text-primary-foreground">
      <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="space-y-4">
          <Link href="/">
            <Button variant="ghost" className="mb-4 -ml-4 hover:bg-white/5 transition-colors text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to VioraShare
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-2xl relative">
              <div className="absolute inset-0 bg-primary/40 rounded-2xl blur-xl animate-pulse -z-10" />
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Help & Query Center</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-xl">
            Everything you need to know about using VioraShare safely and effectively.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'bg-white/5 ring-1 ring-primary/30' : 'bg-transparent hover:bg-white/5'
                }`}
              >
                <button 
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-zinc-900 shadow-sm shadow-zinc-950">
                      {faq.icon}
                    </div>
                    <span className="font-medium text-lg tracking-tight">{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 ml-14"
                    >
                      <p className="text-zinc-400 leading-relaxed max-w-xl text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support Card */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-blue-600/10 border border-primary/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-all duration-500" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold tracking-tight">Got a specific query?</h3>
              <p className="text-muted-foreground max-w-sm">
                If your question isn't answered here, feel free to reach out to our team directly.
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={() => {
                const email = 'heyimsachin009@gmail.com';
                navigator.clipboard.writeText(email);
                toast.success('Email address copied to clipboard!');
                window.location.href = `mailto:${email}`;
              }}
              className="rounded-2xl gap-2 h-14 px-8 text-lg font-bold shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Mail className="w-5 h-5 transition-transform group-hover:rotate-12" />
              Contact Support
            </Button>
          </div>
        </div>

        <footer className="pt-12 border-t border-white/10 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
           <p>&copy; 2026 VioraShare Tech. Built by Sachin Kumar.</p>
           <p className="text-[10px] text-muted-foreground/40 font-mono tracking-widest uppercase">Privacy-First Communication</p>
        </footer>
      </div>
    </main>
  );
}
