import type { Metadata } from "next";
import HelpContent from "./help-content";

export const metadata: Metadata = {
  title: "Help & FAQ - VioraShare | How to Share Files Without Login",
  description: "Find answers to common questions about VioraShare. Learn how to share files, how long rooms last, file size limits, self-destruct mode, and how your data stays private.",
  alternates: { canonical: "https://www.viorashare.online/help" },
};

export default function HelpPage() {
  return <HelpContent />;
}
