"use client";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";

export default function PrivacyPage() {
    const { lang } = useLanguage();
    const t = translations[lang].privacyPage;

    const sections = [
        { title: t.s1_title, body: t.s1_body },
        { title: t.s2_title, body: t.s2_body },
        { title: t.s3_title, body: t.s3_body },
        { title: t.s4_title, body: t.s4_body },
        { title: t.s5_title, body: t.s5_body },
    ];

    return (
        <div className="min-h-screen bg-[#fdfbf7]">
            <section className="border-b border-slate-100 bg-white pt-48 pb-20">
                <div className="container mx-auto max-w-4xl px-6 text-center">
                    <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#0054a6]">
                        {t.badge}
                    </span>
                    <h1 className="mb-6 text-5xl font-black tracking-tighter text-[#1e293b] md:text-7xl">
                        {t.title}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-500 md:text-xl">
                        {t.subtitle}
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto max-w-4xl px-6">
                    <div className="space-y-6">
                        {sections.map((section) => (
                            <article
                                key={section.title}
                                className="rounded-[30px] border border-slate-100 bg-white p-8 shadow-sm"
                            >
                                <h2 className="mb-4 text-2xl font-black tracking-tight text-[#1e293b]">
                                    {section.title}
                                </h2>
                                <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                                    {section.body}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/contact"
                            className="rounded-2xl bg-[#0054a6] px-8 py-4 font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-[#1e293b]"
                        >
                            {t.contactBtn}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
