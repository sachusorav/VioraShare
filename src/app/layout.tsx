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
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "VioraShare - Free Secure File Sharing | No Login Required",
  description: "Send files instantly with no login, no sign-up, and no trace. Create a secure temporary room, share files across devices, and everything self-destructs when done. Free WeTransfer alternative.",
  keywords: [
    // Core keywords
    "file sharing", "secure file sharing", "free file sharing",
    "temporary file sharing", "anonymous file sharing",
    // US/UK high-value keywords
    "send files without login", "no sign up file sharing",
    "WeTransfer alternative", "send large files free",
    "secure file transfer", "encrypted file sharing",
    "private file sharing", "disposable file sharing",
    // India market keywords
    "free file sharing india", "send files without account",
    "file sharing without registration", "free file transfer online",
    // Long-tail high-conversion
    "self destructing file share", "temporary file storage",
    "share files between devices", "no login file transfer",
    "anonymous file upload", "secure room file sharing",
    "viorashare"
  ],
  authors: [{ name: "Sachin Kumar", url: "https://www.linkedin.com/in/sachinkumar014" }],
  creator: "VioraShare",
  publisher: "VioraShare",
  category: "Technology",
  classification: "File Sharing / Privacy Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.viorashare.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VioraShare - Free Secure File Sharing | No Login Required",
    description: "Send files instantly with no login, no sign-up, and no trace. Create a secure temporary room, share files across devices, and everything self-destructs when done.",
    url: "https://www.viorashare.online",
    siteName: "VioraShare",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VioraShare - Free Secure Temporary File Sharing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VioraShare - Free Secure File Sharing | No Login Required",
    description: "Send files instantly with no login, no sign-up, and no trace. Free WeTransfer alternative with self-destructing rooms.",
    images: ["/og-image.png"],
    creator: "@viorashare",
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
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "VioraShare",
      "operatingSystem": "Web",
      "applicationCategory": "ProductivityApplication",
      "applicationSubCategory": "File Sharing",
      "description": "Free secure temporary file sharing. No login required. Create disposable rooms, share files across devices, everything self-destructs when done.",
      "url": "https://www.viorashare.online",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1250"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Alex R." },
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "reviewBody": "Finally a file sharing site that doesn't ask for my email. Super fast and clean UI!"
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Sarah M." },
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "reviewBody": "The temporary rooms are a game changer for simple file drops between my laptop and phone."
        }
      ],
      "featureList": [
        "No login required",
        "Self-destructing rooms",
        "Passcode protection",
        "QR code sharing",
        "Shared clipboard",
        "File expiry control"
      ],
      "author": {
        "@type": "Person",
        "name": "Sachin Kumar",
        "url": "https://www.linkedin.com/in/sachinkumar014",
        "sameAs": [
          "https://www.linkedin.com/in/sachinkumar014",
          "https://github.com/sachusorav"
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "VioraShare",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.viorashare.online/icon.png"
        }
      }
    }
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
          <Analytics />
          <SpeedInsights />
          <Toaster position="top-center" theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
