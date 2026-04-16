"use client";

import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";
import type { ServiceSolutionSlug } from "@/utils/seo";
import Image from "next/image";
import Link from "next/link";

type ServiceDetailClientProps = {
    slug: ServiceSolutionSlug;
};

const imageMap: Record<ServiceSolutionSlug, string> = {
    mr: "mr.png",
    angio: "angio.png",
    ct: "ct.png",
    nuclear: "nuclear.png",
    integrated: "integrated.png",
};

export default function ServiceDetailClient({ slug }: ServiceDetailClientProps) {
    const { lang } = useLanguage();
    const localizedTranslations = translations[lang] as typeof translations.en;
    const servicePage = localizedTranslations.servicePage;
    const serviceData = servicePage[slug];
    const btnText = localizedTranslations.contact.btn;
    const imageSrc = `/images/services/${imageMap[slug]}`;
    const serviceDescription =
        "desc" in serviceData ? (serviceData as { desc?: string }).desc : undefined;
    const detailsHeading = localizedTranslations.servicePage.detailsHeading;

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="relative overflow-hidden bg-[#1e293b] pt-32 pb-20 lg:pt-48 lg:pb-32">
                <div className="absolute top-0 right-0 h-full w-2/3 bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

                <div className="container relative z-10 mx-auto flex flex-col items-center px-6 text-center">
                    <h1 className="mb-6 max-w-4xl text-3xl font-black tracking-tight text-white lg:text-5xl">
                        {serviceData.title}
                    </h1>
                    <div className="mx-auto h-2 w-24 rounded-full bg-[#0054a6]"></div>
                </div>
            </section>

            <section className="px-6 py-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl lg:flex-row">
                        <div className="relative min-h-[400px] lg:w-1/2">
                            <Image
                                src={imageSrc}
                                alt={serviceData.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10"></div>
                        </div>

                        <div className="flex flex-col justify-center p-10 lg:w-1/2 lg:p-16">
                            <h2 className="mb-8 text-2xl font-bold text-[#1e293b]">{detailsHeading}</h2>

                            {serviceDescription ? (
                                <p className="mb-8 text-lg font-medium leading-relaxed text-slate-600">
                                    {serviceDescription}
                                </p>
                            ) : null}

                            {serviceData.items && (
                                <ul className="mb-10 space-y-4">
                                    {serviceData.items.map((item: string, i: number) => (
                                        <li key={i} className="group flex items-start gap-4">
                                            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 transition-colors duration-300 group-hover:bg-[#0054a6]">
                                                <svg className="h-3.5 w-3.5 text-[#0054a6] transition-colors group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            <span className="text-slate-600 transition-colors group-hover:text-slate-900">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <Link href="/contact" className="inline-flex self-start rounded-xl bg-[#0054a6] px-8 py-4 font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-[#1e293b] hover:shadow-xl">
                                <span className="flex items-center justify-center gap-2">
                                    {btnText}
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
