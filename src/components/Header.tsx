"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage, Lang } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);

  const t = translations[lang as keyof typeof translations].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil menü açıkken body scrollunu engelle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setMobileSubMenu(null); // Menü kapandığında alt menüleri de sıfırla
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { name: t.parts, href: "/parts" },
    { name: t.about, href: "/about" },
    { name: t.contact, href: "/contact" },
  ];

  const langs: Lang[] = ["en", "tr", "de", "es", "ru"];

  const toggleSubMenu = (menuName: string) => {
    setMobileSubMenu(mobileSubMenu === menuName ? null : menuName);
  };

  return (
    <header className="fixed w-full z-[100] pt-4 md:pt-10 px-5 md:px-6 transition-all duration-500">
      <nav className={`mx-auto max-w-[1440px] flex justify-between items-center border border-black/5 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-3 lg:py-6 px-6 md:px-10 rounded-full lg:scale-[0.95] scale-100" : "bg-white py-4 lg:py-7 px-6 md:px-12 rounded-full shadow-md lg:scale-100 scale-100"}`}>
        <Link href="/" className="z-[110] cursor-pointer block"><Image src="/logo.svg" alt="Logo" width={140} height={40} className="w-auto h-8 md:h-12" priority /></Link>

        {/* Masaüstü Menü */}
        <div className="hidden lg:flex items-center gap-10">
          {/* Çözümler Dropdown */}
          <div className="relative group cursor-pointer">
            <span className="text-[#1e293b] font-bold text-[18px] flex items-center gap-1 hover:text-[#0054a6] transition-all">
              {t.solutions} <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </span>
            <div className="absolute top-full -left-4 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 duration-300">
              <Link href="/service-solutions" className="block px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#0054a6] rounded-xl">{t.serviceSolutions}</Link>
              <Link href="/installation-dismantling" className="block px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#0054a6] rounded-xl">{t.installDismantling}</Link>
            </div>
          </div>

          {/* Satış ve Kiralama Dropdown */}
          <div className="relative group cursor-pointer">
            <span className="text-[#1e293b] font-bold text-[18px] flex items-center gap-1 hover:text-[#0054a6] transition-all">
              {t.salesRental} <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </span>
            <div className="absolute top-full -left-4 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 duration-300">
              <Link href="/veterinary" className="block px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#0054a6] rounded-xl">{t.veterinary}</Link>
              <Link href="/medical-devices" className="block px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#0054a6] rounded-xl">{t.medicalDevices}</Link>
            </div>
          </div>

          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-[#1e293b] font-bold text-[18px] hover:text-[#0054a6] relative group">
              {item.name} <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#0054a6] transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Dil Seçici */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-1 bg-slate-100/50 p-1 rounded-lg border">
            {langs.map((l) => (
              <button key={l} onClick={() => setLang(l)} className={`px-2 py-1 rounded-md text-[10px] font-black uppercase transition-all ${lang === l ? "bg-[#0054a6] text-white shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>{l}</button>
            ))}
          </div>
          <Link href="/contact" className="bg-[#0054a6] text-white px-8 py-4 rounded-full font-bold text-[16px] shadow-xl hover:bg-[#1e293b] transition-all">{t.btn}</Link>
        </div>

        <button className="lg:hidden p-2 text-[#1e293b] z-[110]" onClick={() => setIsOpen(!isOpen)}><div className="space-y-1.5"><span className={`block h-0.5 w-7 bg-current transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span><span className={`block h-0.5 w-7 bg-current ${isOpen ? "opacity-0" : ""}`}></span><span className={`block h-0.5 w-7 bg-current transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span></div></button>
      </nav>

      {/* Mobil Menü */}
      <div className={`fixed inset-0 bg-[#fdfbf7] z-[105] transition-all duration-500 overflow-y-auto overscroll-none ${isOpen ? "opacity-100 visible" : "opacity-0 invisible translate-x-full"}`}>
        <div className="flex flex-col min-h-full">
          {/* Mobil Menü Header */}
          <div className="h-[100px] flex items-center justify-between px-6 border-b border-slate-100/50">
            <Link href="/" onClick={() => setIsOpen(false)} className="block">
              <Image src="/logo.svg" alt="Logo" width={140} height={40} className="w-auto h-8" priority />
            </Link>
            <button className="p-2 text-[#1e293b]" onClick={() => setIsOpen(false)}>
              <div className="space-y-1.5">
                <span className="block h-0.5 w-7 bg-current rotate-45 translate-y-2"></span>
                <span className="block h-0.5 w-7 bg-current opacity-0"></span>
                <span className="block h-0.5 w-7 bg-current -rotate-45 -translate-y-2"></span>
              </div>
            </button>
          </div>

          <div className="flex-1 flex flex-col p-6 pt-8">
            {/* Dil Seçim */}
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
              {langs.map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 rounded-xl text-sm font-black uppercase transition-all shadow-sm ${lang === l ? "bg-[#0054a6] text-white" : "bg-white text-slate-400 border border-slate-100"}`}>{l}</button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {/* Çözümler Accordion */}
              <div className="border border-slate-100 rounded-2xl bg-white overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleSubMenu('solutions')}
                  className="w-full flex items-center justify-between p-4 bg-white text-left"
                >
                  <span className={`text-xl font-bold transition-colors ${mobileSubMenu === 'solutions' ? 'text-[#0054a6]' : 'text-[#1e293b]'}`}>{t.solutions}</span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${mobileSubMenu === 'solutions' ? 'rotate-180 text-[#0054a6]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${mobileSubMenu === 'solutions' ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="flex flex-col p-2 pt-0 gap-1 bg-slate-50/50">
                    <Link href="/service-solutions" onClick={() => setIsOpen(false)} className="block p-3 rounded-xl text-slate-600 font-medium hover:bg-[#0054a6]/5 hover:text-[#0054a6] transition-colors pl-6">• {t.serviceSolutions}</Link>
                    <Link href="/installation-dismantling" onClick={() => setIsOpen(false)} className="block p-3 rounded-xl text-slate-600 font-medium hover:bg-[#0054a6]/5 hover:text-[#0054a6] transition-colors pl-6">• {t.installDismantling}</Link>
                  </div>
                </div>
              </div>

              {/* Satış & Kiralama Accordion */}
              <div className="border border-slate-100 rounded-2xl bg-white overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleSubMenu('sales')}
                  className="w-full flex items-center justify-between p-4 bg-white text-left"
                >
                  <span className={`text-xl font-bold transition-colors ${mobileSubMenu === 'sales' ? 'text-[#0054a6]' : 'text-[#1e293b]'}`}>{t.salesRental}</span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${mobileSubMenu === 'sales' ? 'rotate-180 text-[#0054a6]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${mobileSubMenu === 'sales' ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="flex flex-col p-2 pt-0 gap-1 bg-slate-50/50">
                    <Link href="/veterinary" onClick={() => setIsOpen(false)} className="block p-3 rounded-xl text-slate-600 font-medium hover:bg-[#0054a6]/5 hover:text-[#0054a6] transition-colors pl-6">• {t.veterinary}</Link>
                    <Link href="/medical-devices" onClick={() => setIsOpen(false)} className="block p-3 rounded-xl text-slate-600 font-medium hover:bg-[#0054a6]/5 hover:text-[#0054a6] transition-colors pl-6">• {t.medicalDevices}</Link>
                  </div>
                </div>
              </div>

              {/* Diğer Linkler */}
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="block w-full p-4 border border-slate-100 rounded-2xl bg-white text-xl font-bold text-[#1e293b] active:scale-[0.99] transition-transform">
                  {item.name}
                </Link>
              ))}

              <Link href="/contact" onClick={() => setIsOpen(false)} className="mt-4 bg-[#0054a6] text-white py-4 rounded-2xl font-bold text-lg text-center shadow-lg hover:shadow-xl hover:bg-[#004285] transition-all">
                {t.btn}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
