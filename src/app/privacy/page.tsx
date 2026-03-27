"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ShieldCheck, 
  EyeOff, 
  Database, 
  Trash2, 
  Globe, 
  UserCheck 
} from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Our Zero-Data Commitment",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      content: "VioraShare is built on the principle of minimal data footprint. Unlike traditional cloud services, we are designed specifically for temporary, high-speed sharing without tracking our users."
    },
    {
      title: "1. Information Collection",
      icon: <EyeOff className="w-6 h-6 text-blue-400" />,
      content: "We do not require user accounts or personal information (emails, names, phone numbers) to use the basic features of VioraShare. We do not track your IP address or use cookies for profiling."
    },
    {
      title: "2. File & Data Security",
      icon: <Database className="w-6 h-6 text-indigo-400" />,
      content: "All files uploaded are stored in secure temporary buckets. We use room-level passcodes to restrict access. If 'Self-Destruct' is enabled, your data is permanently deleted from our servers immediately after its first download."
    },
    {
      title: "3. Data Retention",
      icon: <Trash2 className="w-6 h-6 text-red-500" />,
      content: "Rooms automatically expire based on your chosen duration (15m, 1h, 24h). Once a room expires, all associated files, chat messages, and cardboard links are deleted within 24 hours."
    },
    {
      title: "4. Infrastructure",
      icon: <Globe className="w-6 h-6 text-emerald-400" />,
      content: "We use Vercel for hosting and Neon for database management. These industry leaders provide the security infrastructure that protects our data in transit."
    },
    {
      title: "5. Your Rights",
      icon: <UserCheck className="w-6 h-6 text-amber-400" />,
      content: "Since we do not store personal profiles, there is no 'account' to delete. Your right to be forgotten is built directly into our expiring room architecture."
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-20 selection:bg-primary/30 selection:text-primary-foreground relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[150px] -z-10 pointer-events-none" />

      {/* Subtle Logo Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] -z-20 pointer-events-none scale-150 -rotate-6">
        <Image src="/icon.png" alt="" width={600} height={600} priority />
      </div>

      <div className="max-w-3xl mx-auto space-y-12 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="space-y-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4 -ml-4 h-9 hover:bg-white/5 transition-all text-muted-foreground hover:text-primary group text-xs uppercase tracking-widest font-bold">
              <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to VioraShare
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-primary/10 border border-primary/20 backdrop-blur-2xl rounded-2xl relative">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tighter leading-none mb-1.5">Privacy Protocol</h1>
              <p className="text-muted-foreground/60 font-medium text-sm">Last Updated: March 27, 2026</p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl space-y-12 shadow-3xl shadow-black/50 overflow-hidden relative">
          {/* Subtle line decoration */}
          <div className="absolute left-14 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block" />

          {sections.map((section, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="space-y-3.5 relative z-10 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-zinc-900 border border-white/10 rounded-xl shadow-xl z-20 transition-transform group-hover:scale-110 duration-500">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors duration-500">{section.title}</h2>
              </div>
              <p className="text-zinc-400 leading-relaxed text-base font-medium pl-0 md:pl-16 max-w-2xl">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        <footer className="pt-12 border-t border-white/10 text-center text-muted-foreground/40 text-sm italic font-medium">
          &copy; 2026 VioraShare by Sachin Kumar. For inquiries, contact <span className="text-white/60 no-underline">heyimsachin009@gmail.com</span>
        </footer>
      </div>
    </main>
  );
}
