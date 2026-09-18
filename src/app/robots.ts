import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",      // API routes — no public value
          "/admin/",    // Admin dashboard — must not be indexed
          "/room/",     // Room pages are private/ephemeral — not indexable
        ],
      },
    ],
    sitemap: "https://www.viorashare.online/sitemap.xml",
  };
}
