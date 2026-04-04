import type { Metadata } from "next";
import HelpContent from "./help-content";

export const metadata: Metadata = {
  title: "Help & FAQ - VioraShare | How to Share Files Without Login",
  description: "Learn how to use VioraShare for secure, no-login file sharing. FAQ covering file size limits, room expiry, passcodes, and privacy. Free to use.",
  keywords: [
    "how to share files without login", "VioraShare help",
    "secure file sharing FAQ", "temporary room file sharing guide",
    "no sign up file transfer help", "viorashare FAQ"
  ],
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return <HelpContent />;
}
