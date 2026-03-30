import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#fdfbf7] px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#0054a6]">
          404
        </p>
        <h1 className="mb-6 text-4xl font-black tracking-tight text-[#1e293b] md:text-6xl">
          Sayfa bulunamadi
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-slate-500">
          Aradiginiz sayfa tasinmis, kaldirilmis veya hic olusturulmamis olabilir.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-[#0054a6] px-8 py-4 font-bold text-white transition-colors hover:bg-[#1e293b]"
        >
          Ana sayfaya don
        </Link>
      </div>
    </div>
  );
}
