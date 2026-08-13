import type { MetadataRoute } from "next";
import { en } from "@/content/en";

// The origin is a routing fact, identical in every locale — read it from the
// English dictionary rather than plumbing a locale into a robots.txt.
const { site } = en;

/**
 * Served at /robots.txt. Nothing here is private — the whole site is a pitch,
 * so everything is crawlable and the sitemap is advertised explicitly.
 *
 * Default export is the Next.js file convention, not a style choice.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
