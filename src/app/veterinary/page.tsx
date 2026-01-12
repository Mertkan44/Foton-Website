"use client";
import ComingSoon from "@/components/ComingSoon";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";

export default function VeterinaryPage() {
    const { lang } = useLanguage();
    // @ts-ignore
    const t = translations[lang];

    return <ComingSoon pageTitle={t.nav.veterinary} />;
}
