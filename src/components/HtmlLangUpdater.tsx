"use client";
import { useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";

export default function HtmlLangUpdater() {
    const { lang } = useLanguage();

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    return null;
}
