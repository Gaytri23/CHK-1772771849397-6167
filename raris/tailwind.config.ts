import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                base: "#0F172A",
                surface: "#1E293B",
                primary: "#3B82F6",
                accent: "#7C3AED",
                secondary: "#06B6D4",
                success: "#10B981",
                warning: "#F59E0B",
                danger: "#EF4444",
                muted: "#94A3B8",
                bright: "#F1F5F9"
            }
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
