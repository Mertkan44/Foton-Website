import type { MetadataRoute } from "next";
import { SITE_URL, serviceSolutionSlugs } from "@/utils/seo";

const STATIC_ROUTES = [
    "",
    "/about",
    "/contact",
    "/installation-dismantling",
    "/privacy",
    "/service-solutions",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticEntries = STATIC_ROUTES.map((path) => ({
        url: `${SITE_URL}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" as const : "monthly" as const,
        priority: path === "" ? 1 : 0.7,
    }));

    const serviceEntries = serviceSolutionSlugs.map((slug) => ({
        url: `${SITE_URL}/service-solutions/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [...staticEntries, ...serviceEntries];
}
