import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import GlobalWhatsApp from "@/components/GlobalWhatsApp";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import HtmlLangUpdater from "@/components/HtmlLangUpdater";
import { LanguageProvider } from "@/components/LanguageContext";
import {
  SITE_NAME,
  buildMetadata,
  getOrganizationStructuredData,
} from "@/utils/seo";

export const metadata: Metadata = buildMetadata({
  title: SITE_NAME,
  description:
    "Medical imaging installation, dismantling, service, spare parts, and rental solutions for healthcare facilities across Turkey and worldwide.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = getOrganizationStructuredData();

  return (
    <html lang="en">
      <body className="antialiased bg-[#fcfcfc] text-[#1e293b]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <LanguageProvider>
          <HtmlLangUpdater />
          {/* Menü */}
          <Header />

          {/* Sayfa İçeriği */}
          <main className="pt-0 min-h-screen">
            {children}
          </main>

          {/* --- WHATSAPP BUTONU (Global, Contact dışı sayfalarda görünür) --- */}
          <GlobalWhatsApp />

          {/* --- FOOTER (Global) --- */}
          <Footer />

          {/* --- COOKIE CONSENT --- */}
          <CookieConsent />

        </LanguageProvider>
      </body>
    </html>
  );
}
