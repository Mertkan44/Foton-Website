"use client";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";
import Image from "next/image";
import Link from "next/link";

// Define mappings for display
const services = [
    { id: 'mr', img: '/images/services/mr.png' },
    { id: 'angio', img: '/images/services/angio.png' },
    { id: 'ct', img: '/images/services/ct.png' },
    { id: 'nuclear', img: '/images/services/nuclear.png' },
    { id: 'integrated', img: '/images/services/integrated.png' },
];

export default function ServiceSolutions() {
    const { lang } = useLanguage();
    // @ts-ignore
    const t = translations[lang as keyof typeof translations].servicePage;

    return (
        <main className="min-h-screen bg-slate-50">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#1e293b]">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                    <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                        {t.title}
                    </h1>
                    <div className="h-2 w-24 bg-[#0054a6] rounded-full mx-auto"></div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {services.map((service) => {
                            // @ts-ignore
                            const serviceInfo = t[service.id];
                            return (
                                <Link key={service.id} href={`/service-solutions/${service.id}`} className="group block h-full">
                                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col transform hover:-translate-y-2">

                                        {/* Image Container */}
                                        <div className="relative h-64 overflow-hidden">
                                            <Image
                                                src={service.img}
                                                alt={serviceInfo.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                                            {/* Overlay Icon/Badge */}
                                            <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl group-hover:bg-[#0054a6] group-hover:border-[#0054a6] transition-all duration-300">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold text-[#1e293b] mb-4 group-hover:text-[#0054a6] transition-colors leading-tight">
                                                {serviceInfo.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm mb-6 line-clamp-3">
                                                {serviceInfo.desc || "Click to view comprehensive service details, technical specifications, and support options."}
                                            </p>

                                            <div className="mt-auto flex items-center font-bold text-sm text-[#0054a6]">
                                                View Details <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                            );
                        })}

                    </div>
                </div>
            </section>
        </main>
    );
}
