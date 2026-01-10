"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      {children}
    </div>
  );
};

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations];

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      {/* 1. HERO SECTION */}
      <section className="pt-52 pb-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <span className="text-[#0054a6] font-bold uppercase tracking-[0.2em] text-xs mb-4 block">{t.nav.contact}</span>
            <h1 className="text-5xl md:text-7xl font-black text-[#1e293b] tracking-tighter mb-6">
              {t.contact.title1} <span className="text-[#00a9e0]">{t.contact.title2}</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              {t.contact.desc}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. DEPARTMANLAR VE HIZLI ERİŞİM */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t.contact.dept?.t_title, icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", color: "bg-blue-500", desc: t.contact.dept?.t_desc },
              { title: t.contact.dept?.s_title, icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", color: "bg-[#00a9e0]", desc: t.contact.dept?.s_desc },
              { title: t.contact.dept?.l_title, icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0", color: "bg-indigo-600", desc: t.contact.dept?.l_desc }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20`}>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">{item.desc}</p>
                  <Link href="mailto:support@fotonsc.com" className="text-[#0054a6] font-bold text-sm flex items-center gap-2 group-hover:underline">
                    {t.contact.btn_dept} <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FORM AND OFFICE INFO */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#1e293b] rounded-[50px] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            {/* Form Alanı */}
            <div className="w-full lg:w-3/5 p-10 md:p-20">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">{t.contact.form_title}</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder={t.contact.f_name} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00a9e0] transition-all" />
                    <input type="email" placeholder={t.contact.f_mail} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00a9e0] transition-all" />
                  </div>
                  <input type="text" placeholder={t.contact.f_subj} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00a9e0] transition-all" />
                  <textarea rows={5} placeholder={t.contact.f_msg} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00a9e0] transition-all resize-none"></textarea>
                  <button className="bg-[#0054a6] hover:bg-[#00a9e0] text-white font-black py-5 px-12 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1">
                    {t.contact.btn}
                  </button>
                </form>
              </FadeIn>
            </div>
            {/* Ofis Bilgileri */}
            <div className="w-full lg:w-2/5 bg-[#0054a6] p-10 md:p-20 text-white relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <FadeIn delay={300}>
                <h3 className="text-3xl font-black mb-12 tracking-tighter">{t.contact.office?.title}</h3>
                <div className="space-y-10">
                  <div>
                    <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-2">{t.contact.office?.loc}</p>
                    <p className="text-xl font-bold">Copenhagen, Denmark</p>
                  </div>
                  <div>
                    <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-2">{t.contact.office?.mail}</p>
                    <p className="text-xl font-bold">info@fotonsc.com</p>
                  </div>
                  <div>
                    <p className="text-white/60 font-bold uppercase tracking-widest text-xs mb-2">{t.contact.office?.supp}</p>
                    <p className="text-xl font-bold">+45 00 00 00 00</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SSS (F.A.Q) SECTION */}
      <section className="py-24 bg-[#fdfbf7]">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <h2 className="text-4xl font-black text-[#1e293b] text-center mb-16 tracking-tighter">{t.contact.faq?.title}</h2>
            <div className="space-y-6">
              {[
                { q: t.contact.faq?.q1, a: t.contact.faq?.a1 },
                { q: t.contact.faq?.q2, a: t.contact.faq?.a2 },
                { q: t.contact.faq?.q3, a: t.contact.faq?.a3 }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-8 rounded-[30px] shadow-sm border border-slate-100">
                  <h4 className="font-bold text-[#1e293b] mb-3 text-lg">{faq.q}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHATSAPP BUTTON */}
      <Link href="https://wa.me/905000000000" target="_blank" className="fixed bottom-8 right-8 z-50 group">
        <span className="absolute -inset-2 rounded-full bg-green-500/20 animate-ping"></span>
        <div className="bg-[#25D366] hover:bg-[#128C7E] w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all transform hover:scale-110 relative z-10">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.631 1.436h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </Link>

      {/* FOOTER MATCH */}
      <footer className="bg-[#1e293b] pt-24 pb-12 relative z-40 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-left">
            <div className="space-y-6">
              <div className="text-3xl font-black text-white tracking-tighter italic">Foton<span className="text-[#00a9e0]">SC</span></div>
              <p className="text-slate-400 leading-relaxed">{t.footer.desc}</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">{t.footer.t1}</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="/equipment" className="hover:text-[#00a9e0] transition-colors">{t.nav.solutions}</Link></li>
                <li><Link href="/rental" className="hover:text-[#00a9e0] transition-colors">{t.nav.rental}</Link></li>
                <li><Link href="/parts" className="hover:text-[#00a9e0] transition-colors">{t.nav.parts}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">{t.footer.t2}</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="/about" className="hover:text-[#00a9e0] transition-colors">{t.nav.about}</Link></li>
                <li><Link href="/contact" className="hover:text-[#00a9e0] transition-colors">{t.nav.contact}</Link></li>
                <li><Link href="/privacy" className="hover:text-[#00a9e0] transition-colors">{t.nav.privacy}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">{t.footer.t3}</h4>
              <p className="text-slate-400 mb-4 italic">{t.footer.support}</p>
              <p className="text-[#00a9e0] font-black text-xl leading-none">+45 00 00 00 00</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-sm">{t.footer.copy}</p>
            <div className="flex gap-6">
              {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                <Link key={social} href="#" className="text-slate-500 hover:text-white text-sm transition-colors">{social}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
