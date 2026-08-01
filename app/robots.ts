import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://rocketaircon.vercel.app/sitemap.xml",
    host: "https://rocketaircon.vercel.app",
  };
}
