import type { Metadata } from "next";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
    title: "Installation & Dismantling",
    description:
        "Professional installation and dismantling services for medical imaging systems including MRI, CT, Angio, and X-Ray equipment.",
    path: "/installation-dismantling",
});

export default function InstallationLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
