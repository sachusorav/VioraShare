import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-24 selection:bg-primary/30 selection:text-primary-foreground">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <Link href="/">
            <Button variant="ghost" className="mb-4 -ml-4 hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to VioraShare
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          </div>
          <p className="text-muted-foreground italic">Last Updated: March 27, 2026</p>
        </div>

        <section className="space-y-6 text-zinc-300 leading-relaxed">
          <h2 className="text-2xl font-semibold text-white">Our Zero-Data Commitment</h2>
          <p>
            VioraShare is built on the principle of minimal data footprint. Unlike traditional cloud services, we 
            are designed specifically for temporary, high-speed sharing without tracking our users.
          </p>

          <h3 className="text-xl font-medium text-white border-l-2 border-primary pl-4">1. Information Collection</h3>
          <p>
            We do <strong>not</strong> require user accounts or personal information (emails, names, phone numbers) 
            to use the basic features of VioraShare. We do not track your IP address or use cookies for profiling.
          </p>

          <h3 className="text-xl font-medium text-white border-l-2 border-primary pl-4">2. File & Data Security</h3>
          <p>
            All files uploaded are stored in a temporary bucket. We use room-level passcodes to restrict access. 
            If "Self-Destruct" is enabled, your data is permanently deleted from our servers immediately after its first download.
          </p>

          <h3 className="text-xl font-medium text-white border-l-2 border-primary pl-4">3. Data Retention</h3>
          <p>
            Rooms automatically expire based on your chosen duration (15m, 1h, 24h). Once a room expires, all 
            associated files, chat messages, and cardboard links are deleted within 24 hours of expiration.
          </p>

          <h3 className="text-xl font-medium text-white border-l-2 border-primary pl-4">4. Third-Party Services</h3>
          <p>
            We use <strong>Vercel</strong> for hosting and <strong>Neon</strong> for database management. These 
            industry leaders provide the security infrastructure that protects our data in transit. In our 
            "Solution Challenge" version, we utilize <strong>Google Firebase</strong> for real-time syncing.
          </p>

          <h3 className="text-xl font-medium text-white border-l-2 border-primary pl-4">5. Your Rights</h3>
          <p>
            Since we do not store personal profiles, there is no "account" to delete. Your right to be forgotten 
            is built directly into our expiring room architecture.
          </p>
        </section>

        <footer className="pt-12 border-t border-white/10 text-center text-muted-foreground text-sm">
          &copy; 2026 VioraShare by Sachin Kumar. All Rights Reserved.
        </footer>
      </div>
    </main>
  );
}
