"use client";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";
import Image from "next/image";

// Map service keys to images
const services = [
    { id: 'installation', img: '/images/services/install.png' },
    { id: 'logistics', img: '/images/services/logistics.png' },
    { id: 'planning', img: '/images/services/planning.png' },
    { id: 'rf', img: '/images/services/rf.png' },
];

export default function InstallationPage() {
    const { lang } = useLanguage();
    // @ts-ignore
    const t = translations[lang].installPage;

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
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium">
                        {t.subtitle}
                    </p>
                    <div className="h-2 w-24 bg-[#0054a6] rounded-full mx-auto mt-8"></div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="space-y-20">

                        {services.map((service, idx) => {
                            // @ts-ignore
                            const serviceInfo = t.services && t.services[service.id];
                            if (!serviceInfo) return null;

                            const isEven = idx % 2 === 0;

                            return (
                                <div key={service.id} className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

                                    {/* Image Side */}
                                    <div className="w-full lg:w-1/2 relative group">
                                        <div className="relative h-[300px] lg:h-[400px] w-full rounded-[40px] overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
                                            <Image
                                                src={service.img}
                                                alt={serviceInfo.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                                        </div>
                                        {/* Decorative Blob */}
                                        <div className={`absolute -z-10 w-full h-full top-4 ${isEven ? 'left-4' : 'right-4'} bg-[#0054a6]/5 rounded-[40px]`}></div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="w-full lg:w-1/2">
                                        <h2 className="text-3xl font-black text-[#1e293b] mb-4">{serviceInfo.title}</h2>
                                        <p className="text-lg text-slate-600 mb-8 font-medium leading-relaxed border-l-4 border-[#0054a6] pl-4">
                                            {serviceInfo.desc}
                                        </p>

                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* @ts-ignore */}
                                            {serviceInfo.items.map((item, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0054a6] shrink-0">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                                    </div>
                                                    <span className="text-slate-700 font-medium">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            );
                        })}

                    </div>
                </div>
            </section>

        </main>
    );
}
