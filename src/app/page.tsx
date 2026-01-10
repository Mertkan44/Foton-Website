"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";

// --- SAYAÇ VE FADEIN BİLEŞENLERİ (AYNI) ---
const AnimatedNumber: React.FC<{ value: string }> = ({ value }) => { const [count, setCount] = useState(0); const [hasStarted, setHasStarted] = useState(false); const ref = useRef<HTMLSpanElement>(null); const target = parseInt(value.replace(/[^0-9]/g, "")); useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); }, { threshold: 0.1 }); if (ref.current) observer.observe(ref.current); return () => observer.disconnect(); }, [hasStarted]); useEffect(() => { if (!hasStarted) return; let start = 0; const duration = 2000; const increment = target / (duration / 16); const timer = setInterval(() => { start += increment; if (start >= target) { setCount(target); clearInterval(timer); } else { setCount(Math.floor(start)); } }, 16); return () => clearInterval(timer); }, [hasStarted, target]); return <span ref={ref}>{count.toLocaleString()}{value.includes("+") ? "+" : ""}</span>; };
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => { const [isVisible, setIsVisible] = useState(false); const ref = useRef<HTMLDivElement>(null); useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.05 }); if (ref.current) observer.observe(ref.current); return () => observer.disconnect(); }, []); return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>{children}</div>; };

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];

  // VİDEO FIX (Mobilde oynaması için)
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.setAttribute('playsinline', 'true');
      videoRef.current.setAttribute('webkit-playsinline', 'true');
      videoRef.current.setAttribute('controls', 'false');
      videoRef.current.controls = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => console.log("Video autoplay failed:", error));
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fdfbf7] overflow-x-hidden">

      {/* 1. MOBİL VİDEO (REF EKLENDİ) */}
      <div className="absolute top-0 left-0 w-full h-[70vh] lg:hidden z-0 overflow-hidden">
        <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7] via-50% to-transparent z-20 pointer-events-none" />
      </div>

      {/* 2. MASAÜSTÜ VİDEO */}
      <div className="hidden lg:block absolute top-0 right-0 w-[60%] h-[85vh] z-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf7] via-[#fdfbf7]/10 via-10% to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[450px] bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7]/90 via-15% to-transparent z-10" />
      </div>

      {/* 3. HERO (lg:mt-20 EKLENDİ) */}
      <div className="container mx-auto px-6 relative z-30 pt-36 pb-12 lg:pt-0 lg:pb-0 lg:flex lg:items-center lg:min-h-[85vh]">
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left lg:mt-20">
          <FadeIn><h1 className="text-5xl sm:text-6xl md:text-[64px] font-black text-white lg:text-[#1e293b] leading-[1] md:leading-[1] mb-6 tracking-tighter">{t.hero.title1} <br /> <span className="text-[#00a9e0] lg:text-[#0054a6]">{t.hero.title2}</span> <br />{t.hero.title3}</h1></FadeIn>
          <FadeIn delay={200}><p className="text-lg md:text-[19px] text-[#00a9e0] lg:text-slate-500 mb-8 max-w-lg font-medium leading-relaxed">{t.hero.desc}</p></FadeIn>
          <FadeIn delay={400}><Link href="/equipment" className="group bg-[#0054a6] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl flex items-center gap-3 hover:bg-[#1e293b] transition-all">{t.hero.btn}<svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></Link></FadeIn>
        </div>
      </div>

      {/* 4. KARTLAR (MAVİ DEGRADE EKLENDİ) */}
      <section className="relative z-40 py-12 md:py-16 bg-[#fdfbf7]">
        <div className="container mx-auto px-6"><div className="grid grid-cols-1 md:grid-cols-3 gap-8">{[{ title: t.cards.c1, img: "/card-1.jpg", href: "/equipment" }, { title: t.cards.c2, img: "/card-2.jpg", href: "/rental" }, { title: t.cards.c3, img: "/card-3.jpg", href: "/parts" }].map((card, idx) => (<FadeIn key={idx} delay={idx * 150}><Link href={card.href} className="group relative h-[320px] md:h-[380px] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-md block transition-all"><Image src={card.img} alt={card.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0054a6]/90 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end"><h3 className="text-xl md:text-2xl font-bold text-white whitespace-pre-line leading-tight">{card.title}</h3><div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white transition-all duration-500 group-hover:bg-white group-hover:text-[#0054a6]"><svg className="w-6 h-6 rotate-[-45deg] group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></div></div></Link></FadeIn>))}</div></div>
      </section>

      {/* 5. İSTATİSTİKLER */}
      <section className="bg-white py-20 md:py-40 border-y border-slate-100 relative z-40">
        <div className="container mx-auto px-6"><div className="flex flex-col lg:flex-row justify-between items-start gap-12"><FadeIn><div className="max-w-2xl text-left"><h2 className="text-4xl md:text-[60px] font-black text-[#1e293b] leading-[1.1] mb-8 tracking-tighter">{t.stats.title}</h2><p className="text-base md:text-xl text-slate-500 leading-relaxed max-w-lg font-medium">{t.stats.desc}</p></div></FadeIn><div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-16 w-full lg:w-auto mt-10 lg:mt-0">{[{ label: t.stats.s1, value: "1,200+" }, { label: t.stats.s2, value: "450+" }, { label: t.stats.s3, value: "25+" }, { label: t.stats.s4, value: "15+" }].map((stat, idx) => (<FadeIn key={idx} delay={idx * 100}><div className="flex flex-col border-l-2 border-[#0054a6]/20 pl-5 py-1 text-left"><span className="text-3xl md:text-6xl font-black text-[#1e293b] mb-1 tracking-tighter"><AnimatedNumber value={stat.value} /></span><span className="text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-widest leading-tight">{stat.label}</span></div></FadeIn>))}</div></div></div>
      </section>

      {/* 6. ABOUT */}
      <section className="bg-[#fdfbf7] py-16 md:py-20 relative z-40">
        <div className="container mx-auto px-6"><div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"><div className="w-full lg:w-[40%] relative"><FadeIn><div className="relative h-[350px] md:h-[500px] w-full rounded-[40px] md:rounded-[50px] overflow-hidden shadow-2xl"><Image src="/card-1.jpg" alt="About" fill className="object-cover" /><div className="absolute inset-0 bg-gradient-to-tr from-[#0054a6]/20 to-transparent" /></div><div className="absolute -bottom-6 -right-6 bg-[#0054a6] text-white p-6 md:p-10 rounded-[25px] md:rounded-[35px] shadow-2xl hidden md:block z-10"><div className="text-3xl md:text-4xl font-black mb-1">20+</div><div className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80 leading-tight">{t.about.badge}</div></div></FadeIn></div><div className="w-full lg:w-[60%] flex flex-col items-start text-left"><FadeIn><span className="text-[#0054a6] font-bold uppercase tracking-[0.2em] text-sm mb-6 block">{t.about.sub}</span><h2 className="text-4xl md:text-[52px] font-black text-[#1e293b] leading-[1.1] mb-8 tracking-tighter">{t.about.title}</h2></FadeIn><FadeIn delay={200}><div className="space-y-6 text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl"><p>{t.about.desc1}</p><p className="text-base md:text-lg opacity-80">{t.about.desc2}</p></div></FadeIn><div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">{[{ title: t.about.f1, desc: t.about.f1d }, { title: t.about.f2, desc: t.about.f2d }].map((item, idx) => (<FadeIn key={idx} delay={400 + (idx * 100)}><div className="flex gap-4 items-start p-6 rounded-3xl bg-white shadow-sm border border-slate-100"><div className="w-10 h-10 rounded-full bg-[#0054a6]/10 flex items-center justify-center shrink-0"><svg className="w-5 h-5 text-[#0054a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div><div><h4 className="font-bold text-[#1e293b] mb-1">{item.title}</h4><p className="text-sm text-slate-500 leading-tight">{item.desc}</p></div></div></FadeIn>))}</div></div></div></div>
      </section>

      {/* 5.5 PARTNERS */}
      <section className="bg-[#f0f9ff] py-16 md:py-24 relative z-40 border-y border-slate-100/50">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <span className="text-[#0054a6] font-bold uppercase tracking-[0.2em] text-sm mb-4 block">{t.partners.title}</span>
            <h2 className="text-3xl md:text-5xl font-black text-[#1e293b] mb-6 tracking-tighter">{t.partners.desc}</h2>
            <div className="w-24 h-1.5 bg-[#00a9e0] mx-auto rounded-full mb-12"></div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {[
              { country: "Denmark", code: "DK" },
              { country: "Sweden", code: "SE" },
              { country: "Norway", code: "NO" },
              { country: "Finland", code: "FI" },
              { country: "Germany", code: "DE" },
              { country: "International", code: "INT" }
            ].map((partner, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col items-center justify-center gap-4 h-32 md:h-40 cursor-default">
                  <div className="w-12 h-12 rounded-full bg-[#f8fafc] flex items-center justify-center text-[#1e293b] font-bold text-xl group-hover:bg-[#0054a6] group-hover:text-white transition-colors duration-300">
                    {partner.code}
                  </div>
                  <span className="font-bold text-slate-500 group-hover:text-[#1e293b] transition-colors">{partner.country}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6.5 BRANDS */}
      <section className="bg-white py-16 md:py-24 relative z-40">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">{t.brands.title}</span>
            <div className="w-12 h-1 bg-slate-200 mx-auto rounded-full mb-12"></div>
          </FadeIn>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60">
            {[
              { name: "Brand 1", logo: "/brand-logo-1.png" },
              { name: "Brand 2", logo: "/brand-logo-2.png" },
              { name: "Brand 3", logo: "/brand-logo-3.png" },
              { name: "Brand 4", logo: "/brand-logo-4.png" },
              { name: "Brand 5", logo: "/brand-logo-5.png" }
            ].map((brand, idx) => (
              <FadeIn key={idx} delay={idx * 50}>
                <div className="group relative w-24 h-12 md:w-32 md:h-16 flex items-center justify-center transition-all duration-500 hover:opacity-100 hover:scale-110 cursor-pointer grayscale hover:grayscale-0">
                  <Image src={brand.logo} alt={brand.name} fill className="object-contain" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT & FOOTER (AYNI) */}
      <section className="bg-white py-16 md:py-20 relative z-40"><div className="container mx-auto px-6"><div className="bg-[#1e293b] rounded-[40px] md:rounded-[60px] p-8 md:p-16 lg:p-24 overflow-hidden relative shadow-3xl"><div className="absolute top-0 right-0 w-96 h-96 bg-[#0054a6]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" /><div className="flex flex-col lg:flex-row gap-16 relative z-10 text-left"><div className="w-full lg:w-1/2"><FadeIn><h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">{t.contact.title1} <br /><span className="text-[#00a9e0]">{t.contact.title2}</span></h2><p className="text-slate-400 text-lg md:text-xl mb-12 max-w-md">{t.contact.desc}</p><div className="space-y-8"><div className="flex items-center gap-6 group"><div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00a9e0] group-hover:bg-[#0054a6] group-hover:text-white transition-all"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div><div><p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{t.contact.email}</p><p className="text-white font-bold text-lg">info@fotonsc.com</p></div></div></div></FadeIn></div><div className="w-full lg:w-1/2"><FadeIn delay={200}><form className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"><input type="text" placeholder={t.contact.f_name} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00a9e0]" /><input type="email" placeholder={t.contact.f_mail} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00a9e0]" /></div><input type="text" placeholder={t.contact.f_subj} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00a9e0]" /><textarea placeholder={t.contact.f_msg} rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00a9e0] resize-none text-left"></textarea><button type="submit" className="w-full bg-[#0054a6] hover:bg-[#00a9e0] text-white font-bold py-5 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1">{t.contact.btn}</button></form></FadeIn></div></div></div></div></section>
      <footer className="bg-[#1e293b] pt-24 pb-12 relative z-40 border-t border-white/5"><div className="container mx-auto px-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-left"><div className="space-y-6"><div className="text-3xl font-black text-white tracking-tighter italic">Foton<span className="text-[#00a9e0]">SC</span></div><p className="text-slate-400 leading-relaxed">{t.footer.desc}</p></div><div><h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">{t.footer.t1}</h4><ul className="space-y-4 text-slate-400"><li><Link href="/equipment" className="hover:text-[#00a9e0] transition-colors">{t.nav.solutions}</Link></li><li><Link href="/rental" className="hover:text-[#00a9e0] transition-colors">{t.nav.rental}</Link></li><li><Link href="/parts" className="hover:text-[#00a9e0] transition-colors">{t.nav.parts}</Link></li></ul></div><div><h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">{t.footer.t2}</h4><ul className="space-y-4 text-slate-400"><li><Link href="/about" className="hover:text-[#00a9e0] transition-colors">{t.nav.about}</Link></li><li><Link href="/contact" className="hover:text-[#00a9e0] transition-colors">{t.nav.contact}</Link></li><li><Link href="/privacy" className="hover:text-[#00a9e0] transition-colors">{t.nav.privacy}</Link></li></ul></div><div><h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">{t.footer.t3}</h4><p className="text-slate-400 mb-4 italic">{t.footer.support}</p><p className="text-[#00a9e0] font-black text-xl leading-none">+45 00 00 00 00</p></div></div><div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6"><p className="text-slate-500 text-sm">{t.footer.copy}</p><div className="flex gap-6">{['LinkedIn', 'Twitter', 'Instagram'].map((social) => (<Link key={social} href="#" className="text-slate-500 hover:text-white text-sm transition-colors">{social}</Link>))}</div></div></div></footer>

    </div>
  );
}