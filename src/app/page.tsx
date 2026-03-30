"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/utils/translations";
import FadeIn from "@/components/FadeIn";

const AnimatedNumber: React.FC<{ value: string }> = ({ value }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const target = parseInt(value.replace(/[^0-9]/g, ""), 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {value.includes("+") ? "+" : ""}
    </span>
  );
};


export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, []);

  const cards = [
    { title: t.cards.c1, img: "/img-solutions.jpg", href: "/service-solutions" },
    { title: t.cards.c2, img: "/img-rental.jpg", href: "/sales-rental" },
    { title: t.cards.c3, img: "/img-parts.jpg", href: "/parts" },
  ];

  const stats = [
    { label: t.stats.s1, value: "1,000+" },
    { label: t.stats.s2, value: "450+" },
    { label: t.stats.s4, value: "20+" },
  ];

  const aboutFeatures = [
    { title: t.about.f1, desc: t.about.f1d },
    { title: t.about.f2, desc: t.about.f2d },
  ];


  return (
    <div className="relative min-h-screen bg-[#fdfbf7] overflow-x-hidden">
      <div className="absolute top-0 left-0 z-0 h-[70vh] w-full overflow-hidden lg:hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 z-20 h-[30vh] bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7] via-50% to-transparent pointer-events-none" />
      </div>

      <div className="absolute top-0 right-0 z-0 hidden h-[85vh] w-[60%] lg:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#fdfbf7] via-[#fdfbf7]/10 via-10% to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 h-[450px] bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7]/90 via-15% to-transparent" />
      </div>

      <div className="container relative z-30 mx-auto px-6 pb-12 pt-36 lg:flex lg:min-h-[85vh] lg:items-center lg:pb-0 lg:pt-0">
        <div className="mt-20 flex w-full flex-col items-start text-left lg:w-1/2">
          <FadeIn>
            <h1 className="mb-6 text-5xl font-black leading-[1] tracking-tighter text-white sm:text-6xl md:text-[64px] md:leading-[1] lg:text-[#1e293b]">
              {t.hero.title1}
              <br />
              <span className="text-[#00a9e0] lg:text-[#0054a6]">{t.hero.title2}</span>
              <br />
              {t.hero.title3}
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mb-8 max-w-lg text-lg font-medium leading-relaxed text-[#00a9e0] md:text-[19px] lg:text-slate-500">
              {t.hero.desc}
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <Link
              href="/equipment"
              className="group flex items-center gap-3 rounded-2xl bg-[#0054a6] px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all hover:bg-[#1e293b]"
            >
              {t.hero.btn}
              <svg
                className="h-6 w-6 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </div>

      <section className="relative z-40 bg-[#fdfbf7] py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {cards.map((card, idx) => (
              <FadeIn key={idx} delay={idx * 150}>
                <Link
                  href={card.href}
                  className="group relative block h-[320px] overflow-hidden rounded-[30px] shadow-md transition-all md:h-[380px] md:rounded-[40px]"
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0054a6]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
                    <h3 className="whitespace-pre-line text-xl font-bold leading-tight text-white md:text-2xl">
                      {card.title}
                    </h3>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-500 group-hover:bg-white group-hover:text-[#0054a6]">
                      <svg
                        className="h-6 w-6 rotate-[-45deg] transition-transform group-hover:rotate-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-40 border-y border-slate-100 bg-white py-20 md:py-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-start justify-between gap-12 lg:flex-row">
            <FadeIn>
              <div className="max-w-2xl text-left">
                <h2 className="mb-8 text-4xl font-black leading-[1.1] tracking-tighter text-[#1e293b] md:text-[60px]">
                  {t.stats.title}
                </h2>
                <p className="max-w-lg text-base font-medium leading-relaxed text-slate-500 md:text-xl">
                  {t.stats.desc}
                </p>
              </div>
            </FadeIn>
            <div className="mt-10 grid w-full grid-cols-2 gap-x-6 gap-y-10 md:gap-16 lg:mt-0 lg:w-auto">
              {stats.map((stat, idx) => (
                <FadeIn key={idx} delay={idx * 100}>
                  <div className="flex flex-col border-l-2 border-[#0054a6]/20 pl-5 py-1 text-left">
                    <span className="mb-1 text-3xl font-black tracking-tighter text-[#1e293b] md:text-6xl">
                      <AnimatedNumber value={stat.value} />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-tight text-slate-400 md:text-sm">
                      {stat.label}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-40 bg-[#fdfbf7] py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-24">
            <div className="relative w-full lg:w-[40%]">
              <FadeIn>
                <div className="relative h-[350px] w-full overflow-hidden rounded-[40px] shadow-2xl md:h-[500px] md:rounded-[50px]">
                  <Image src="/img-solutions.jpg" alt="About" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0054a6]/20 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 z-10 hidden rounded-[25px] bg-[#0054a6] p-6 text-white shadow-2xl md:block md:rounded-[35px] md:p-10">
                  <div className="mb-1 text-3xl font-black md:text-4xl">20+</div>
                  <div className="text-[10px] font-bold uppercase leading-tight tracking-widest opacity-80 md:text-xs">
                    {t.about.badge}
                  </div>
                </div>
              </FadeIn>
            </div>
            <div className="flex w-full flex-col items-start text-left lg:w-[60%]">
              <FadeIn>
                <span className="mb-6 block text-sm font-bold uppercase tracking-[0.2em] text-[#0054a6]">
                  {t.about.sub}
                </span>
                <h2 className="mb-8 text-4xl font-black leading-[1.1] tracking-tighter text-[#1e293b] md:text-[52px]">
                  {t.about.title}
                </h2>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="max-w-2xl space-y-6 text-lg font-medium leading-relaxed text-slate-600 md:text-xl">
                  <p>{t.about.desc1}</p>
                  <p className="text-base opacity-80 md:text-lg">{t.about.desc2}</p>
                </div>
              </FadeIn>
              <div className="mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                {aboutFeatures.map((item, idx) => (
                  <FadeIn key={idx} delay={400 + idx * 100}>
                    <div className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0054a6]/10">
                        <svg
                          className="h-5 w-5 text-[#0054a6]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="mb-1 font-bold text-[#1e293b]">{item.title}</h4>
                        <p className="text-sm leading-tight text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY FOTON */}
      <section className="relative z-40 bg-[#fdfbf7] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="mb-12 text-center">
              <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#0054a6]">
                {t.brands.title}
              </span>
              <h2 className="text-3xl font-black tracking-tighter text-[#1e293b] md:text-4xl">
                {t.brands.desc}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: t.brands.f1_title,
                desc: t.brands.f1_desc,
                accent: "#0054a6",
                bg: "#0054a608",
              },
              {
                icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                title: t.brands.f2_title,
                desc: t.brands.f2_desc,
                accent: "#059669",
                bg: "#05966908",
              },
              {
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: t.brands.f3_title,
                desc: t.brands.f3_desc,
                accent: "#00a9e0",
                bg: "#00a9e008",
              },
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 120}>
                <div
                  className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* top accent line */}
                  <div className="absolute left-8 right-8 top-0 h-[3px] rounded-b-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: item.accent }} />

                  <div
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    style={{ background: item.bg }}
                  >
                    <svg className="h-7 w-7" style={{ color: item.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>

                  <h3 className="mb-3 text-xl font-black tracking-tight text-[#1e293b]">{item.title}</h3>
                  <p className="text-base font-medium leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-40 bg-white py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-[40px] bg-[#1e293b] p-8 shadow-3xl md:rounded-[60px] md:p-16 lg:p-24">
            <div className="absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#0054a6]/20 blur-[120px]" />
            <div className="relative z-10 flex flex-col gap-16 text-left lg:flex-row">
              <div className="w-full lg:w-1/2">
                <FadeIn>
                  <h2 className="mb-8 text-4xl font-black tracking-tighter text-white md:text-6xl">
                    {t.contact.title1}
                    <br />
                    <span className="text-[#00a9e0]">{t.contact.title2}</span>
                  </h2>
                  <p className="mb-12 max-w-md text-lg text-slate-400 md:text-xl">
                    {t.contact.desc}
                  </p>
                  <div className="space-y-8">
                    <div className="group flex items-center gap-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#00a9e0] transition-all group-hover:bg-[#0054a6] group-hover:text-white">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                          {t.contact.email}
                        </p>
                        <p className="text-lg font-bold text-white">info@fotonsc.com</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </div>
              <div className="w-full lg:w-1/2">
                <FadeIn delay={200}>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2">
                      <input
                        type="text"
                        placeholder={t.contact.f_name}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-[#00a9e0]"
                      />
                      <input
                        type="email"
                        placeholder={t.contact.f_mail}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-[#00a9e0]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder={t.contact.f_subj}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-[#00a9e0]"
                    />
                    <textarea
                      placeholder={t.contact.f_msg}
                      rows={4}
                      className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-left text-white outline-none focus:border-[#00a9e0]"
                    />
                    <button
                      type="submit"
                      className="w-full transform rounded-2xl bg-[#0054a6] py-5 font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-[#00a9e0]"
                    >
                      {t.contact.btn}
                    </button>
                  </form>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
