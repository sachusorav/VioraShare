import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://www.viorashare.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "VioraShare — Free Temporary File Sharing, No Login Required",
    template: "%s | VioraShare",
  },
  description:
    "Share files instantly with no login, no sign-up, and no account. VioraShare creates temporary, password-protected rooms that auto-delete after 15 minutes, 1 hour, or 24 hours. Free anonymous file sharing.",

  keywords: [
    "temporary file sharing",
    "file sharing without login",
    "share files without password",
    "free file sharing no signup",
    "temporary image sharing",
    "quick file share",
    "anonymous file sharing",
    "no login file transfer",
    "send files without account",
    "self destructing file share",
    "disposable file sharing",
    "secure file transfer free",
    "WeTransfer alternative free",
    "share files between devices",
    "file sharing no registration",
    "viorashare",
  ],

  authors: [{ name: "Sachin Kumar", url: "https://www.linkedin.com/in/sachinkumar014" }],
  creator: "Sachin Kumar",
  publisher: "VioraShare",
  category: "Technology",

  alternates: {
    canonical: BASE_URL,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: "VioraShare — Free Temporary File Sharing, No Login Required",
    description:
      "Share files instantly. No login, no sign-up. Files auto-delete after 15 min, 1 hour, or 24 hours. Free anonymous file sharing with passcode-protected rooms.",
    url: BASE_URL,
    siteName: "VioraShare",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VioraShare — Share Files Without Login. Auto-delete. Free.",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "VioraShare — Free Temporary File Sharing, No Login Required",
    description:
      "No login. No sign-up. Files auto-delete. Share files anonymously in seconds — free forever.",
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

  // Google Search Console & Bing Webmaster verification
  // Replace the placeholder values with your actual verification codes
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE",
    // bing: "REPLACE_WITH_BING_WEBMASTER_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * SoftwareApplication JSON-LD — single source of truth in layout.
   * NOTE: aggregateRating removed — it requires real, verifiable reviews.
   * Fabricated ratings are against Google's guidelines and risk manual penalties.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VioraShare",
    operatingSystem: "Web",
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "File Sharing",
    description:
      "Free temporary file sharing with no login required. Create passcode-protected rooms that auto-delete after 15 minutes, 1 hour, or 24 hours. Anonymous, private, and instant.",
    url: BASE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "No login required",
      "Anonymous file sharing",
      "Self-destructing rooms",
      "Passcode protection",
      "QR code sharing",
      "Shared clipboard",
      "Flexible file expiry (15 min, 1 hour, 24 hours)",
      "Per-file self-destruct mode",
      "Zero tracking or personal data stored",
    ],
    author: {
      "@type": "Person",
      name: "Sachin Kumar",
      url: "https://www.linkedin.com/in/sachinkumar014",
      sameAs: [
        "https://www.linkedin.com/in/sachinkumar014",
        "https://github.com/sachusorav",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "VioraShare",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon.png`,
        width: 512,
        height: 512,
      },
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Explicit favicon tags */}
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.png" />

        {/* JSON-LD structured data */}
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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster position="top-center" theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
