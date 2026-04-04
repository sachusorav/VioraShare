import type { Metadata } from "next";
import PrivacyContent from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy - VioraShare | Zero Data Storage File Sharing",
  description: "VioraShare's privacy policy. We store zero personal data, no login required, no tracking. Files and rooms auto-delete. GDPR-friendly private file sharing.",
  keywords: [
    "private file sharing privacy policy", "no tracking file sharing",
    "GDPR file sharing", "anonymous file transfer privacy",
    "zero data storage file sharing", "viorashare privacy"
  ],
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
