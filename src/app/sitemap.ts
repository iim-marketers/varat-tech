import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL(site.landingPath, site.url).href,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/screens/dashboard.webp`, `${site.url}/screens/web-panel.webp`],
    },
  ];
}
