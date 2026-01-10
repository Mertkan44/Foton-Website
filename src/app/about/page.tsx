"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.05 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
        >
            {children}
        </div>
    );
};

export default function AboutPage() {
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <div className="min-h-screen bg-[#fdfbf7]">
            {/* 1. HERO */}
            <section className="pt-52 pb-20 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <span className="text-[#0054a6] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                            {t.nav.about}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-[#1e293b] tracking-tighter mb-6">
                            {t.aboutPage.hero.title}
                        </h1>
                        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                            {t.aboutPage.hero.subtitle}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* 2. OUR STORY */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2">
                            <FadeIn>
                                <span className="text-[#0054a6] font-bold uppercase tracking-[0.2em] text-sm mb-6 block">
                                    {t.aboutPage.hero.title}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-[#1e293b] mb-8 tracking-tighter leading-tight">
                                    {t.aboutPage.story.title}
                                </h2>
                                <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                                    <p>{t.aboutPage.story.p1}</p>
                                    <p>{t.aboutPage.story.p2}</p>
                                    {/* Additional paragraphs for detailed content */}
                                    {t.aboutPage.story.p3 && <p>{t.aboutPage.story.p3}</p>}
                                    {t.aboutPage.story.p4 && <p>{t.aboutPage.story.p4}</p>}
                                </div>
                            </FadeIn>
                        </div>
                        <div className="w-full lg:w-1/2 relative">
                            {/* Decorative Elements */}
                            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#00a9e0]/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#0054a6]/10 rounded-full blur-3xl delay-700" />

                            <FadeIn delay={200}>
                                <div className="relative z-10">
                                    {/* Organic Image Container */}
                                    <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                                        style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}>
                                        <Image
                                            src="/card-2.jpg"
                                            alt="Our Story"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/40 to-transparent pointer-events-none" />
                                    </div>

                                    {/* Floating Badge */}
                                    <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white p-6 rounded-2xl shadow-xl animate-bounce-slow">
                                        <div className="text-[#0054a6] font-black text-4xl">10+</div>
                                        <div className="text-slate-500 font-bold text-sm uppercase tracking-wider">{t.about.badge}</div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CORE VALUES */}
            <section className="bg-white py-20 md:py-32 border-y border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <FadeIn>
                            <h2 className="text-3xl md:text-4xl font-black text-[#1e293b] tracking-tighter mb-4">
                                {t.aboutPage.values.title}
                            </h2>
                            <div className="w-20 h-1.5 bg-[#00a9e0] mx-auto rounded-full" />
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: t.aboutPage.values.v1, desc: t.aboutPage.values.v1d, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
                            { title: t.aboutPage.values.v2, desc: t.aboutPage.values.v2d, icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                            { title: t.aboutPage.values.v3, desc: t.aboutPage.values.v3d, icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" }
                        ].map((val, idx) => (
                            <FadeIn key={idx} delay={idx * 150}>
                                <div className="bg-[#fdfbf7] p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                                    <div className="w-16 h-16 rounded-2xl bg-[#0054a6]/10 text-[#0054a6] flex items-center justify-center mb-6 group-hover:bg-[#0054a6] group-hover:text-white transition-colors duration-300">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={val.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1e293b] mb-3">{val.title}</h3>
                                    <p className="text-slate-500 font-medium">{val.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CERTIFICATIONS (ISO) */}
            <section className="py-20 md:py-32 bg-[#fdfbf7]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="w-full lg:w-1/3 text-left">
                            <FadeIn>
                                <h2 className="text-3xl md:text-4xl font-black text-[#1e293b] tracking-tighter mb-6">
                                    {t.aboutPage.certs.title}
                                </h2>
                                <p className="text-slate-500 text-lg leading-relaxed">
                                    {t.aboutPage.certs.desc}
                                </p>
                            </FadeIn>
                        </div>
                        <div className="w-full lg:w-2/3 grid grid-cols-1 gap-8">
                            {[
                                {
                                    title: t.aboutPage.certs.iso9001,
                                    desc: t.aboutPage.certs.iso9001_desc,
                                    items: t.aboutPage.certs.iso9001_items,
                                    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                },
                                {
                                    title: t.aboutPage.certs.iso14001,
                                    desc: t.aboutPage.certs.iso14001_desc,
                                    items: t.aboutPage.certs.iso14001_items,
                                    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                }
                            ].map((cert, idx) => (
                                <FadeIn key={idx} delay={idx * 150}>
                                    <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:border-[#0054a6] transition-colors group cursor-default relative overflow-hidden">
                                        {/* Decorative Leaf/Nature for ISO 14001 */}
                                        {cert.title.includes("14001") && (
                                            <div className="absolute -bottom-6 -right-6 w-48 h-48 text-[#00a9e0]/5 pointer-events-none rotate-[30deg] scale-125">
                                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                                                    <path d="M22.9 8.7c-4-4.8-10.4-4.2-10.4-4.2s.5 6.3 4.3 10.4c.5.5 1 1 1.6 1.3-1 .2-2 .3-3.1.3-6.1 0-8.9-5.1-6.8-9.8.8-1.7 2.1-3 3.6-3.9 1.1-.6.7-2.3-.5-2.2-6.5.6-11.6 6.3-11.6 13.3 0 .7.1 1.5.2 2.2.1.8.8 1.4 1.6 1.4h.8C3.7 16.3 4.8 15 6 15c2.2 0 4 1.8 4 4v1c0 1.1.9 2 2 2h2.5c1.4 0 2.5-1.1 2.5-2.5V17c0-3.2 2.2-5.9 5.3-6.6 1.2-.4 1.4-1.1.6-1.7z" />
                                                </svg>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-6 mb-6 relative z-10">
                                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#0054a6] group-hover:text-white transition-all shrink-0">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cert.icon} />
                                                </svg>
                                            </div>
                                            <h4 className="text-2xl font-bold text-[#1e293b]">{cert.title}</h4>
                                        </div>
                                        {cert.desc && <p className="text-slate-600 font-bold mb-4 ml-22 relative z-10">{cert.desc}</p>}
                                        {cert.items && (
                                            <ul className="space-y-3 ml-2 lg:ml-2 relative z-10">
                                                {cert.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate-500 font-medium">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00a9e0] mt-2.5 shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CTA aligned with Footer style */}
            <section className="bg-[#1e293b] py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0054a6]/10" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8">
                            {t.contact.title1} <span className="text-[#00a9e0]">{t.contact.title2}</span>
                        </h2>
                        <Link
                            href="/contact"
                            className="inline-block bg-[#00a9e0] hover:bg-[#0054a6] text-white font-bold py-5 px-12 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 text-lg"
                        >
                            {t.contact.btn}
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
