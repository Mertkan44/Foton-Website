import type { Metadata } from "next";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
    title: "Sales & Rental",
    description:
        "Sales and rental solutions for medical imaging systems. This page is being prepared and will be available soon.",
    path: "/sales-rental",
    noIndex: true,
});

export default function SalesRentalLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
