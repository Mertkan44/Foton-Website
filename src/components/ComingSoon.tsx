"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";

interface ComingSoonProps {
    pageTitle: string;
}

export default function ComingSoon({ pageTitle }: ComingSoonProps) {
    const { lang } = useLanguage();
    // @ts-ignore
    const t = translations[lang];

    return (
        <div className="min-h-screen bg-[#fdfbf7] flex flex-col items-center justify-center relative overflow-hidden pt-20">

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00a9e0]/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0054a6]/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 text-center relative z-10">

                {/* Mascot Image with Float Animation */}
                <div className="relative w-64 h-64 mx-auto mb-8 animate-bounce-slow">
                    <Image
                        src="/mascot-robot.png"
                        alt="Coming Soon Mascot"
                        fill
                        className="object-contain drop-shadow-2xl"
                    />
                </div>

                {/* Text Content */}
                <span className="text-[#0054a6] font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
                    {pageTitle}
                </span>

                <h1 className="text-5xl md:text-7xl font-black text-[#1e293b] mb-6 tracking-tighter">
                    {t.comingSoon.title}
                </h1>

                <p className="text-slate-500 text-xl font-medium max-w-lg mx-auto mb-10 leading-relaxed">
                    {t.comingSoon.desc}
                </p>

                {/* CTA Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-[#0054a6] hover:bg-[#1e293b] text-white font-bold py-4 px-10 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    {t.comingSoon.back}
                </Link>
            </div>

            {/* CSS for custom bounce animation if not in global css */}
            <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-3%); }
          50% { transform: translateY(3%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
}
