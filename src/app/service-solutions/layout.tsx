import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Service Solutions | Foton Healthcare Solutions",
    description: "Comprehensive medical imaging service solutions including MRI, CT, Angio, Nuclear Medicine and more.",
};

export default function ServiceSolutionsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
