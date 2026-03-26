import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scale } from "lucide-react";

export default function TermsOfService() {
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
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          </div>
          <p className="text-muted-foreground italic">Effective Date: March 27, 2026</p>
        </div>

        <section className="space-y-6 text-zinc-300 leading-relaxed text-sm md:text-base">
          <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing VioraShare ("the Service"), you agree to be bound by these terms. If you do not agree 
            to any part of the terms, you must not use the service.
          </p>

          <h2 className="text-2xl font-semibold text-white">2. Permitted Use</h2>
          <p>
            VioraShare is a productivity tool for temporary file sharing. You agree not to use the service for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Storing or sharing illegal, copyrighted, or prohibited content.</li>
            <li>Distributing malware, viruses, or harmful code.</li>
            <li>Harassing or causing harm to others via the Shared Clipboard or Chat.</li>
            <li>Attempting to circumvent the security or encryption of personal rooms.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-white">3. Content Responsibility</h2>
          <p>
            You are exclusively responsible for the content you upload. VioraShare does not monitor or audit 
            private rooms, and we are not liable for any content shared between users.
          </p>

          <h2 className="text-2xl font-semibold text-white">4. Intellectual Property</h2>
          <p>
            The software, design, and branding of VioraShare are the exclusive property of its creator, Sachin Kumar. 
            Unauthorized reproduction, reverse-engineering, or copying of the code is strictly prohibited.
          </p>

          <h2 className="text-2xl font-semibold text-white">5. Limitation of Liability</h2>
          <p>
            VioraShare is provided "AS IS" without any warranties. We are not responsible for any data loss, 
            service interruptions, or damages arising from the use of the site.
          </p>

          <h2 className="text-2xl font-semibold text-white">6. Termination</h2>
          <p>
            We reserve the right to block access or delete rooms that violate these terms without prior notice.
          </p>
        </section>

        <footer className="pt-12 border-t border-white/10 text-center text-muted-foreground text-sm">
          For legal inquiries, contact: <span className="text-white underline">legal@viorashare.online</span>
        </footer>
      </div>
    </main>
  );
}
