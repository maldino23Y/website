/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1d4ed8',     // bold blue
        'brand-blue-dark': '#1e3a8a',
        'brand-black': '#0a0a0a',
        'brand-gray': '#f3f4f6',
        'brand-white': '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
