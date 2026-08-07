import type { MetadataRoute } from "next";
import { areaDetails, serviceAreas } from "./data/areas";
import { errorCodes, localServices } from "./data/local-seo";
import seoKeywords from "./data/seo-keywords.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const areaPages: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: `https://rocketaircon.vercel.app/area/${area.slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const keywordPages: MetadataRoute.Sitemap = seoKeywords.map((entry) => ({
    url: `https://rocketaircon.vercel.app/keyword/${encodeURIComponent(entry.slug)}`,
    lastModified,
    changeFrequency: "weekly",
    priority: entry.impressions > 0 ? 0.75 : 0.65,
  }));
  const neighborhoodPages: MetadataRoute.Sitemap = serviceAreas.flatMap((area) =>
    areaDetails[area.slug].neighborhoods.flatMap((neighborhood) =>
      localServices.map((service) => ({
        url: `https://rocketaircon.vercel.app/local/${area.slug}/${encodeURIComponent(neighborhood)}/${service.slug}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ),
  );
  const errorPages: MetadataRoute.Sitemap = serviceAreas.flatMap((area) =>
    errorCodes.map((error) => ({
      url: `https://rocketaircon.vercel.app/error/${area.slug}/${error.brand}/${error.code.toLowerCase()}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  );

  return [
    { url: "https://rocketaircon.vercel.app", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://rocketaircon.vercel.app/service-area", lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...areaPages,
    ...keywordPages,
    ...neighborhoodPages,
    ...errorPages,
  ];
}
