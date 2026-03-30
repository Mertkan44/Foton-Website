import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import GlobalWhatsApp from "@/components/GlobalWhatsApp";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import HtmlLangUpdater from "@/components/HtmlLangUpdater";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
  title: "Foton Healthcare Solutions",
  description: "Modern Sağlık Çözümleri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className="antialiased bg-[#fcfcfc] text-[#1e293b]"
        style={{ fontFamily: '"Avenir Next", Avenir, "Segoe UI", sans-serif' }}
      >
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
