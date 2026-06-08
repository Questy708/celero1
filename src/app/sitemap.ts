import { MetadataRoute } from "next";

const BASE_URL = "https://xcelerolabs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/manifesto",
    "/platform",
    "/capital",
    "/community",
    "/ventures",
    "/careers",
    "/routes",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
