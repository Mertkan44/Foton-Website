/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          primary: '#0054a6',    // Kurumsal Mavi (Scandinavian Medical tarzı)
          secondary: '#00a9e0',  // Açık Mavi
          accent: '#e6f2ff',     // Arka planlar için
          text: '#1e293b',       // Koyu gri yazı
        },
      },
    },
  },
  plugins: [],
};

