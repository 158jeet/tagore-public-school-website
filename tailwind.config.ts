import type { Config } from "tailwindcss";
const config: Config = { content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { ink: "#14243a", navy: "#102a43", gold: "#c79b45", cream: "#f7f5ef", mist: "#e9eef2" }, boxShadow: { soft: "0 18px 60px rgba(16,42,67,.10)" } } }, plugins: [] };
export default config;
