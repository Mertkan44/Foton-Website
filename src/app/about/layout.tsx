import type { Metadata } from "next";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
    title: "About",
    description:
        "20+ years of experience in medical imaging installation, dismantling, and service across Turkey and worldwide.",
    path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
