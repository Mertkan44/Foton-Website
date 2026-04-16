import type { Metadata } from "next";
import { buildMetadata } from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
    title: "Medical Devices",
    description:
        "Medical device solutions and support services. This page is being prepared and will be available soon.",
    path: "/medical-devices",
    noIndex: true,
});

export default function MedicalDevicesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
