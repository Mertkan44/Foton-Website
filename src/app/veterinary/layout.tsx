import type { Metadata } from "next";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
    title: "Veterinary",
    description:
        "Veterinary imaging and technical support solutions. This page is being prepared and will be available soon.",
    path: "/veterinary",
    noIndex: true,
});

export default function VeterinaryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
