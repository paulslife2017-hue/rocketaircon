import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://rocketaircon.vercel.app", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://rocketaircon.vercel.app/service-area", lastModified, changeFrequency: "weekly", priority: 0.9 },
  ];
}
