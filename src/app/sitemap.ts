import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/products", priority: 0.9 },
    { path: "/contact", priority: 0.8 },
    ...products.map((p) => ({ path: `/products/${p.slug}`, priority: 0.6 })),
  ];

  return pages.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
