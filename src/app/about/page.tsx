"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";

const CertificateModal = dynamic(() => import("@/components/CertificateModal"), {
    ssr: false,
});

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
    const [activePdf, setActivePdf] = useState<{ url: string; title: string; accent: string } | null>(null);

    return (
        <div className="min-h-screen bg-[#fdfbf7]">
            {/* Certificate Modal */}
            {activePdf && (
                <CertificateModal
                    pdfUrl={activePdf.url}
                    title={activePdf.title}
                    accent={activePdf.accent}
                    onClose={() => setActivePdf(null)}
                />
            )}
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
                    <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
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
                                            src="/img-about-team.jpg"
                                            alt="Our Story"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/40 to-transparent pointer-events-none" />
                                    </div>

                                    {/* Floating Badge */}
                                    <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white p-6 rounded-2xl shadow-xl animate-bounce-slow">
                                        <div className="text-[#0054a6] font-black text-4xl whitespace-nowrap">20 Years+</div>
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

            {/* 4. QUALITY POLICY & CERTIFICATIONS */}
            <section className="py-20 md:py-32 bg-[#fdfbf7]">
                <div className="container mx-auto px-6">

                    {/* Section header */}
                    <div className="text-center mb-16">
                        <FadeIn>
                            <h2 className="text-3xl md:text-4xl font-black text-[#1e293b] tracking-tighter mb-4">
                                {t.aboutPage.certs.title}
                            </h2>
                            <div className="w-20 h-1.5 bg-[#00a9e0] mx-auto rounded-full mb-6" />
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                                {t.aboutPage.certs.desc}
                            </p>
                        </FadeIn>
                    </div>

                    {/* ISO Policy Cards — each with integrated certificate download */}
                    <div className="space-y-6">
                        {[
                            {
                                title: t.aboutPage.certs.iso9001,
                                desc: t.aboutPage.certs.iso9001_desc,
                                items: t.aboutPage.certs.iso9001_items,
                                accent: "#0054a6",
                                accentLight: "#0054a608",
                                pdf: "/api/certificate/iso-9001",
                                tag: "9001:2015",
                                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                            },
                            {
                                title: t.aboutPage.certs.iso14001,
                                desc: t.aboutPage.certs.iso14001_desc,
                                items: t.aboutPage.certs.iso14001_items,
                                accent: "#059669",
                                accentLight: "#05966908",
                                pdf: "/api/certificate/iso-14001",
                                tag: "14001:2015",
                                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                            },
                            {
                                title: t.aboutPage.certs.iso45001,
                                desc: t.aboutPage.certs.iso45001_desc,
                                items: t.aboutPage.certs.iso45001_items,
                                accent: "#d97706",
                                accentLight: "#d9770608",
                                pdf: "/api/certificate/iso-45001",
                                tag: "45001:2018",
                                icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
                            },
                        ].map((cert, idx) => (
                            <FadeIn key={idx} delay={idx * 150}>
                                <div
                                    className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:shadow-lg transition-all duration-500 group"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        {/* Left — icon area with accent background */}
                                        <div
                                            className="md:w-52 shrink-0 flex flex-col items-center justify-center py-8 px-6 md:py-12 relative"
                                            style={{ background: `linear-gradient(135deg, ${cert.accentLight}, ${cert.accent}06)` }}
                                        >
                                            <div
                                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                                            >
                                                <svg className="w-8 h-8" style={{ color: cert.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={cert.icon} />
                                                </svg>
                                            </div>
                                            <span
                                                className="text-xs font-black tracking-widest uppercase"
                                                style={{ color: cert.accent }}
                                            >
                                                ISO {cert.tag}
                                            </span>
                                        </div>

                                        {/* Right — content */}
                                        <div className="flex-1 p-8 md:p-10 md:pl-10">
                                            <h4 className="text-lg md:text-xl font-bold text-[#1e293b] mb-3 leading-snug">
                                                {cert.title}
                                            </h4>

                                            {cert.desc && (
                                                <p className="text-slate-500 font-medium mb-5 leading-relaxed">{cert.desc}</p>
                                            )}

                                            {cert.items && (
                                                <ul className="space-y-2.5 mb-8">
                                                    {cert.items.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-slate-500 text-[15px] leading-relaxed">
                                                            <svg className="w-4 h-4 mt-1 shrink-0" style={{ color: cert.accent }} fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Certificate view button */}
                                            <button
                                                onClick={() => setActivePdf({ url: cert.pdf, title: cert.title, accent: cert.accent })}
                                                className="inline-flex items-center gap-2.5 text-sm font-bold rounded-xl px-5 py-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 border cursor-pointer"
                                                style={{
                                                    color: cert.accent,
                                                    borderColor: `${cert.accent}25`,
                                                    background: `${cert.accent}06`,
                                                }}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                {t.aboutPage.certs.viewCert}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* TSE Certification — compact row */}
                    <FadeIn delay={500}>
                        <div className="mt-6 bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:shadow-lg transition-all duration-500 group">
                            <div className="flex flex-col sm:flex-row items-center gap-6 p-8 md:px-10">
                                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                                    <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h4 className="text-lg font-bold text-[#1e293b]">EN ISO 13485:2016 — TSE</h4>
                                    <p className="text-slate-500 text-sm font-medium mt-1">Medical Devices — Quality Management System</p>
                                </div>
                                <button
                                    onClick={() => setActivePdf({ url: '/api/certificate/tse', title: 'EN ISO 13485:2016 — TSE', accent: '#dc2626' })}
                                    className="inline-flex items-center gap-2.5 text-sm font-bold rounded-xl px-5 py-3 text-red-600 bg-red-50 border border-red-100 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 shrink-0 cursor-pointer"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    {t.aboutPage.certs.viewCert}
                                </button>
                            </div>
                        </div>
                    </FadeIn>
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
