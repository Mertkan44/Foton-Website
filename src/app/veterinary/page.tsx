"use client";
import ComingSoon from "@/components/ComingSoon";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";

export default function VeterinaryPage() {
    const { lang } = useLanguage();
    const t = translations[lang] as typeof translations.en;

    return <ComingSoon pageTitle={t.nav.veterinary} />;
}
