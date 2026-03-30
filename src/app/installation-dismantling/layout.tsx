import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Installation & Dismantling | Foton Healthcare Solutions",
    description: "Professional installation and dismantling services for medical imaging systems including MRI, CT, Angio, and X-Ray equipment.",
};

export default function InstallationLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
