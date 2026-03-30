import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Foton Healthcare Solutions",
    description: "Get in touch with Foton Healthcare Solutions for technical inquiries, service requests, and support.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
