import type { Metadata } from "next";
import TermsContent from "./terms-content";

export const metadata: Metadata = {
  title: "Terms of Service - VioraShare | Free Secure File Sharing",
  description: "Read VioraShare's terms of service. Use our platform responsibly for legal temporary file sharing. No monitoring, no accounts, your content is your responsibility.",
  alternates: { canonical: "https://www.viorashare.online/terms" },
};

export default function TermsPage() {
  return <TermsContent />;
}
