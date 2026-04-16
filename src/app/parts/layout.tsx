import type { Metadata } from "next";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
    title: "Parts",
    description:
        "Spare parts and component support solutions for medical imaging systems. This page is being prepared and will be available soon.",
    path: "/parts",
    noIndex: true,
});

export default function PartsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
