import type { Metadata } from "next";
import PrivacyContent from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy - VioraShare | Zero Data Storage File Sharing",
  description: "VioraShare's privacy policy. We collect no personal data, track no IPs, and all files are auto-deleted when your room expires. Built for privacy from the ground up.",
  alternates: { canonical: "https://www.viorashare.online/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
