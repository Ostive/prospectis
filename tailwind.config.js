/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1c2b3f",
        "navy-2": "#27405c",
        bg: "#f1f4f7",
        surface: "#ffffff",
        border: "#dfe5ec",
        text: "#1c2b3f",
        muted: "#728094",
        accent: "#1f7a68",
        "accent-dark": "#185f51",
        "accent-light": "#e4f2ef",

        prospecter: { dot: "#9aa3ad", bg: "#eef0f2", fg: "#5b6675" },
        contactee: { dot: "#f6a623", bg: "#fef3e2", fg: "#a35b07" },
        interessee: { dot: "#2fae60", bg: "#e6f6ec", fg: "#15803d" },
        noninteressee: { dot: "#e5544c", bg: "#fdecec", fg: "#b91c1c" },
        relancer: { dot: "#3b82d6", bg: "#e8f1fb", fg: "#1d4ed8" },
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      boxShadow: {
        soft: "0 6px 20px rgba(28,43,63,.10)",
        panel: "-6px 0 24px rgba(28,43,63,.10)",
      },
    },
  },
  plugins: [],
};
