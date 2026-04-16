import type { Metadata } from "next";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
    title: "Service Solutions",
    description:
        "Comprehensive medical imaging service solutions including MRI, CT, Angio, Nuclear Medicine and more.",
    path: "/service-solutions",
});

export default function ServiceSolutionsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
