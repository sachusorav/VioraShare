import { MetadataRoute } from "next";

/**
 * Static dates prevent the sitemap from changing on every build,
 * which helps Google understand when pages were actually updated.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = "https://www.viorashare.online";

  return [
    // ── Homepage ─────────────────────────────────────────────────────────────
    {
      url: BASE,
      lastModified: "2026-09-19",
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ── Primary keyword landing pages (highest SEO value) ────────────────────
    {
      url: `${BASE}/temporary-file-sharing`,
      lastModified: "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/send-files-without-login`,
      lastModified: "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/secure-file-sharing`,
      lastModified: "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.85,
    },

    // ── Competitor comparison pages ───────────────────────────────────────────
    {
      url: `${BASE}/alternatives/wetransfer`,
      lastModified: "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE}/alternatives/filebin`,
      lastModified: "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/alternatives/smash`,
      lastModified: "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/alternatives/toffeeshare`,
      lastModified: "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/alternatives/wormhole`,
      lastModified: "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // ── Support / help pages ──────────────────────────────────────────────────
    {
      url: `${BASE}/help`,
      lastModified: "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/support`,
      lastModified: "2026-09-19",
      changeFrequency: "monthly",
      priority: 0.5,
    },

    // ── Legal ─────────────────────────────────────────────────────────────────
    {
      url: `${BASE}/privacy`,
      lastModified: "2026-09-19",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE}/terms`,
      lastModified: "2026-09-19",
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
