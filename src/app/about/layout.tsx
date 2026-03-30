import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About | Foton Healthcare Solutions",
    description: "20+ years of experience in medical imaging installation, dismantling, and service across Turkey and worldwide.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
