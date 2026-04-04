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

export const metadata: Metadata = {
  title: "VioraShare - Secure Temporary File Sharing",
  description: "Tired of signing up just to send a file? VioraShare offers secure, temporary file sharing with No Logins, No Tracking, and Self-destructing rooms. 100% Frictionless.",
  keywords: ["file sharing", "secure transfer", "anonymous upload", "temporary storage", "private sharing", "no login file share", "self-destructing files", "viorashare"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VioraShare",
    "operatingSystem": "Web",
    "applicationCategory": "ProductivityApplication",
    "description": "Tired of signing up for a service just to send a single file? Introducing VioraShare. Secure, temporary file sharing with No Logins, No Tracking, and Self-destructing rooms. 100% Frictionless.",
    "url": "https://viorashare.online",
    "applicationSubCategory": "File Sharing",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Sachin Kumar",
      "url": "https://www.linkedin.com/in/sachinkumar014",
      "sameAs": [
        "https://www.linkedin.com/in/sachinkumar014",
        "https://github.com/sachusorav",
        "https://www.linkedin.com/posts/sachinkumar014_viorashare-secure-temporary-file-sharing-activity-7442886400578084864-Mbf7"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "VioraShare",
      "logo": {
        "@type": "ImageObject",
        "url": "https://viorashare.online/icon.png"
      },
      "sameAs": [
        "https://www.linkedin.com/posts/sachinkumar014_viorashare-secure-temporary-file-sharing-activity-7442886400578084864-Mbf7"
      ]
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6881946526372309"
          crossOrigin="anonymous"
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
          <Toaster position="top-center" theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
