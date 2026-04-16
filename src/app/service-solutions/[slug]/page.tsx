import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";
import {
    buildMetadata,
    isServiceSolutionSlug,
    serviceSolutionSeo,
    serviceSolutionSlugs,
} from "@/utils/seo";

type ServiceDetailPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
    return serviceSolutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: ServiceDetailPageProps): Promise<Metadata> {
    const { slug } = await params;

    if (!isServiceSolutionSlug(slug)) {
        return buildMetadata({
            title: "Service Solutions",
            description:
                "Comprehensive medical imaging service solutions including MRI, CT, Angio, Nuclear Medicine and more.",
            path: "/service-solutions",
        });
    }

    const seo = serviceSolutionSeo[slug];

    return buildMetadata({
        title: seo.title,
        description: seo.description,
        path: `/service-solutions/${slug}`,
    });
}

export default async function ServiceDetailPage({
    params,
}: ServiceDetailPageProps) {
    const { slug } = await params;

    if (!isServiceSolutionSlug(slug)) {
        notFound();
    }

    return <ServiceDetailClient slug={slug} />;
}
