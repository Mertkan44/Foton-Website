"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  
  const t = translations[lang].nav; 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil menü açıldığında sayfayı kilitle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const menuItems = [
    { name: t.equipment, href: "/equipment" },
    { name: t.rental, href: "/rental" },
    { name: t.parts, href: "/parts" },
    { name: t.about, href: "/about" },
    { name: t.contact, href: "/contact" },
  ];

  return (
    <header className="fixed w-full z-[100] pt-4 md:pt-10 px-5 md:px-6 transition-all duration-500">
      <nav className={`
        mx-auto max-w-[1440px] transition-all duration-500 ease-in-out
        ${isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3 md:py-4 px-6 md:px-10 rounded-full" 
          : "bg-white py-4 md:py-6 px-6 md:px-12 rounded-full shadow-md"}
        flex justify-between items-center border border-black/5
      `}>
        
        <Link href="/" className="flex-shrink-0 z-[110]">
          <Image src="/logo.svg" alt="Foton SC Logo" width={140} height={40} className={`object-contain transition-all duration-300 ${isScrolled ? "h-7 md:h-10" : "h-8 md:h-14"} w-auto`} priority />
        </Link>

        <div className="hidden lg:flex items-center gap-14">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-[#1e293b] font-bold text-[18px] tracking-tight hover:text-[#0054a6] transition-all relative group">
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#0054a6] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-lg border border-slate-200/50">
            {(["tr", "en", "bg"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-2 py-1 rounded-md text-[11px] font-black uppercase transition-all ${lang === l ? "bg-[#0054a6] text-white shadow-sm" : "text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"}`}>{l}</button>
            ))}
          </div>
          <Link href="/contact" className="bg-[#0054a6] text-white px-10 py-5 rounded-full font-bold text-[16px] shadow-xl hover:bg-[#1e293b] transition-all whitespace-nowrap">
            {t.btn}
          </Link>
        </div>

        <button className="lg:hidden p-2 text-[#1e293b] z-[110]" onClick={() => setIsOpen(!isOpen)}>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-7 bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block h-0.5 w-7 bg-current transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`block h-0.5 w-7 bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
      </nav>

      <div className={`fixed inset-0 bg-[#fdfbf7] z-[105] transition-all duration-500 overflow-y-auto ${isOpen ? "opacity-100 visible" : "opacity-0 invisible translate-x-full"}`}>
        <div className="flex flex-col min-h-full p-8 pt-32 pb-10">
          <div className="flex justify-center gap-4 mb-10">
             {(["tr", "en", "bg"] as const).map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-6 py-3 rounded-xl text-lg font-black uppercase transition-all shadow-sm ${lang === l ? "bg-[#0054a6] text-white scale-105" : "bg-white text-slate-400 border border-slate-100"}`}>{l}</button>
            ))}
          </div>
          <div className="flex flex-col gap-6 text-center">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-4xl font-black text-[#1e293b] hover:text-[#0054a6] transition-colors" onClick={() => setIsOpen(false)}>{item.name}</Link>
            ))}
          </div>
          {/* EKSİK OLAN BUTON BURAYA EKLENDİ */}
          <div className="mt-12 flex justify-center">
            <Link href="/contact" onClick={() => setIsOpen(false)} className="bg-[#0054a6] text-white w-full max-w-xs py-5 rounded-2xl font-bold text-xl text-center shadow-xl hover:bg-[#1e293b] transition-all">
              {t.btn}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;