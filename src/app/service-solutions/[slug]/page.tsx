"use client";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";
import Image from "next/image";
import { useParams } from "next/navigation";

// Map slugs to image filenames
const imageMap: Record<string, string> = {
    mr: "mr.png",
    angio: "angio.png",
    ct: "ct.png",
    nuclear: "nuclear.png",
    integrated: "integrated.png",
};

export default function ServiceDetail() {
    const { lang } = useLanguage();
    const params = useParams();
    const slug = params?.slug as string;

    // @ts-ignore
    const serviceData = translations[lang as keyof typeof translations].servicePage[slug];
    // @ts-ignore
    const btnText = translations[lang as keyof typeof translations].contact.btn;

    if (!serviceData) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Service not found</div>;
    }

    const imageSrc = `/images/services/${imageMap[slug] || "mr.png"}`; // Fallback

    return (
        <main className="min-h-screen bg-slate-50">

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#1e293b]">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                    <h1 className="text-3xl lg:text-5xl font-black text-white mb-6 tracking-tight max-w-4xl">
                        {serviceData.title}
                    </h1>
                    <div className="h-2 w-24 bg-[#0054a6] rounded-full mx-auto"></div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
                        {/* Image Side */}
                        <div className="lg:w-1/2 relative min-h-[400px]">
                            <Image
                                src={imageSrc}
                                alt={serviceData.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10"></div>
                        </div>

                        {/* Content Side */}
                        <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-[#1e293b] mb-8">Service Details</h2>

                            {serviceData.desc ? (
                                <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                                    {serviceData.desc}
                                </p>
                            ) : null}

                            {serviceData.items && (
                                <ul className="space-y-4 mb-10">
                                    {serviceData.items.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-4 group">
                                            <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0054a6] transition-colors duration-300">
                                                <svg className="w-3.5 h-3.5 text-[#0054a6] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            <span className="text-slate-600 group-hover:text-slate-900 transition-colors">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#0054a6] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1e293b] transition-all self-start shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                {btnText}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
