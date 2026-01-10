import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import GlobalWhatsApp from "@/components/GlobalWhatsApp";
import { LanguageProvider } from "@/components/LanguageContext";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
});

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
    <html lang="en">
      <body
        className={`${jost.className} antialiased bg-[#fcfcfc] text-[#1e293b]`}
      >
        <LanguageProvider>
          {/* Menü */}
          <Header />

          {/* Sayfa İçeriği */}
          <main className="pt-0 min-h-screen">
            {children}
          </main>

          {/* --- WHATSAPP BUTONU (Global, Contact dışı sayfalarda görünür) --- */}
          <GlobalWhatsApp />

        </LanguageProvider>
      </body>
    </html>
  );
}