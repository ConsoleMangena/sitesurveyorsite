import type { MetadataRoute } from "next";

const baseUrl = "https://sitesurveyor.dev";

const routes: string[] = [
  "/",
  "/about",
  "/downloads",
  "/documentation",
  "/community",
  "/changelog",
  "/events",
  "/news",
  "/notifications",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
