"use client";
import React from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";

export default function Footer() {
    const { lang } = useLanguage();
    const t = translations[lang];

    return (
        <footer className="bg-[#1e293b] pt-24 pb-12 relative z-40 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-left">
                    <div className="space-y-6">
                        <div className="text-3xl font-black text-white tracking-tighter italic">
                            Foton<span className="text-[#00a9e0]">SC</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed">{t.footer.desc}</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">
                            {t.footer.t1}
                        </h4>
                        <ul className="space-y-4 text-slate-400">
                            <li>
                                <Link
                                    href="/equipment"
                                    className="hover:text-[#00a9e0] transition-colors"
                                >
                                    {t.nav.solutions}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/rental"
                                    className="hover:text-[#00a9e0] transition-colors"
                                >
                                    {t.nav.salesRental}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/parts"
                                    className="hover:text-[#00a9e0] transition-colors"
                                >
                                    {t.nav.parts}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">
                            {t.footer.t2}
                        </h4>
                        <ul className="space-y-4 text-slate-400">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-[#00a9e0] transition-colors"
                                >
                                    {t.nav.about}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-[#00a9e0] transition-colors"
                                >
                                    {t.nav.contact}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="hover:text-[#00a9e0] transition-colors"
                                >
                                    {t.nav.privacy}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">
                            {t.footer.t3}
                        </h4>
                        <p className="text-slate-400 mb-4 italic">{t.footer.support}</p>
                        <p className="text-[#00a9e0] font-black text-xl leading-none">
                            +45 00 00 00 00
                        </p>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-sm">{t.footer.copy}</p>
                    <div className="flex gap-6">
                        {["LinkedIn", "Twitter", "Instagram"].map((social) => (
                            <Link
                                key={social}
                                href="#"
                                className="text-slate-500 hover:text-white text-sm transition-colors"
                            >
                                {social}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
