import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "VioraShare - Secure Temporary File Sharing",
  description: "Send files securely with no login and no trace. Disposable rooms for frictionless temporary sharing.",
  keywords: ["file sharing", "secure upload", "anonymous sharing", "temporary storage", "viorashare"],
  authors: [{ name: "Viora Team" }],
  creator: "VioraShare",
  publisher: "VioraShare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://viorashare.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VioraShare - Secure Temporary File Sharing",
    description: "Send files securely with no login and no trace. Disposable rooms for frictionless temporary sharing.",
    url: "https://viorashare.online",
    siteName: "VioraShare",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VioraShare Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VioraShare - Secure Temporary File Sharing",
    description: "Send files securely with no login and no trace.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen bg-background flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
