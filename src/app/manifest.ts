import type { MetadataRoute } from "next";

import { seo, site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.product} by ${site.company}`,
    short_name: site.product,
    description: seo.description,
    start_url: site.landingPath,
    scope: "/",
    display: "standalone",
    background_color: "#081329",
    theme_color: "#081329",
    lang: "en-IN",
    categories: ["business", "finance", "productivity"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
