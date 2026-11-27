import type { Config } from "tailwindcss";
const config: Config = { content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { ink: "#1b2b43", navy: "#152b4a", gold: "#4167df", cream: "#f7f9fc", mist: "#edf3fa", teal: "#168f85" }, boxShadow: { soft: "0 18px 60px rgba(21,43,74,.10)" } } }, plugins: [] };
export default config;
