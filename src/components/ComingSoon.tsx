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

            <div className="container mx-auto px-6 text-center relative z-10 group cursor-default">

                {/* Mascot Image with Float Animation and Mix Blend Mode */}
                {/* Added group-hover to parent container so hovering anywhere triggers the robot */}
                <div className="relative w-80 h-80 mx-auto mb-8 animate-bounce-slow transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3">
                    <Image
                        src="/mascot-final-v3.png"
                        alt="Coming Soon Mascot"
                        fill
                        className="object-contain drop-shadow-2xl mix-blend-multiply"
                    />
                </div>

                {/* Text Content */}
                <span className="text-[#0054a6] font-bold uppercase tracking-[0.2em] text-sm mb-4 block animate-fade-in-up transition-all duration-500 group-hover:tracking-[0.3em] group-hover:text-[#00a9e0]">
                    {pageTitle}
                </span>

                <h1 className="text-5xl md:text-7xl font-black text-[#1e293b] mb-6 tracking-tighter animate-fade-in-up delay-100 transition-colors duration-500 group-hover:text-[#0054a6]">
                    {t.comingSoon.title}
                </h1>

                <p className="text-slate-500 text-xl font-medium max-w-lg mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
                    {t.comingSoon.desc}
                </p>

                {/* CTA Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-[#0054a6] hover:bg-[#1e293b] text-white font-bold py-4 px-10 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in-up delay-300"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    {t.comingSoon.back}
                </Link>
            </div>

            {/* Global Styles for Animations */}
            <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-3%); }
          50% { transform: translateY(3%); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; /* Start hidden */
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>
        </div>
    );
}
