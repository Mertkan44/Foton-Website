"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";

export default function CookieConsent() {
    const { lang } = useLanguage();
    const t = translations[lang];
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("foton_cookie_consent");
        if (!consent) {
            // Delay slightly for better UX (fade in)
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("foton_cookie_consent", "true");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("foton_cookie_consent", "false");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-[#1e293b]/95 backdrop-blur-md border-t border-white/10 text-white shadow-2xl transition-all duration-500 ease-out transform translate-y-0 opacity-100">
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                <div className="text-center md:text-left">
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium">
                        {t.cookie.text}
                    </p>
                </div>
                <div className="flex gap-4 shrink-0">
                    <button
                        onClick={handleDecline}
                        className="px-6 py-3 rounded-xl border border-white/20 text-slate-300 font-bold text-sm hover:bg-white/5 hover:text-white transition-all"
                    >
                        {t.cookie.decline}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-8 py-3 rounded-xl bg-[#0054a6] text-white font-bold text-sm shadow-lg hover:bg-[#00a9e0] transition-all transform hover:-translate-y-0.5"
                    >
                        {t.cookie.accept}
                    </button>
                </div>
            </div>
        </div>
    );
}
