import type { Metadata } from "next";
import TermsContent from "./terms-content";

export const metadata: Metadata = {
  title: "Terms of Service - VioraShare | Free Secure File Sharing",
  description: "VioraShare terms of service. Free, temporary file sharing with no login. Rooms auto-expire. No responsibility for user-shared content. Simple, fair terms.",
  keywords: [
    "VioraShare terms of service", "file sharing terms",
    "temporary file sharing legal", "no login file sharing terms",
    "secure file transfer policy", "viorashare terms"
  ],
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <TermsContent />;
}
