"use client";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";
import Image from "next/image";

export default function InstallationDismantling() {
    const { lang } = useLanguage();
    // @ts-ignore
    const t = translations[lang as keyof typeof translations].installPage;
    // @ts-ignore
    const btnText = translations[lang as keyof typeof translations].contact.btn;

    return (
        <main className="min-h-screen bg-slate-50">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0f172a]">
                {/* Abstract Background */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-900/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                    <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                        {t.title}
                    </h1>
                    <div className="h-2 w-24 bg-teal-500 rounded-full mx-auto"></div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {t.items.map((item: string, i: number) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group flex items-start gap-4">
                                <div className="h-10 w-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500 transition-colors">
                                    <svg className="w-5 h-5 text-teal-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mt-2 group-hover:text-teal-600 transition-colors">{item}</h3>
                            </div>
                        ))}
                    </div>

                    {/* CTA Box */}
                    <div className="mt-16 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-blue-500"></div>
                        <h2 className="text-2xl md:text-3xl font-black text-[#1e293b] mb-4">Need a specialized project plan?</h2>
                        <p className="text-slate-500 mb-8 max-w-2xl mx-auto">Our team of experts can help you with comprehensive project management solutions tailored to your facility's needs.</p>
                        <a href="/contact" className="inline-flex items-center gap-2 bg-[#0054a6] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1e293b] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            {btnText}
                        </a>
                    </div>

                </div>
            </section>
        </main>
    );
}
