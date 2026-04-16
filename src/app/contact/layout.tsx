import type { Metadata } from "next";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
    title: "Contact",
    description:
        "Get in touch with Foton Healthcare Solutions for technical inquiries, service requests, and support.",
    path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
