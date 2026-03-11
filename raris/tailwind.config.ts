import type { Config } from "tailwindcss";

const config: Config = {
    content: [
<<<<<<< HEAD
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
=======
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
>>>>>>> 6c3cdc7b (Initial commit)
    ],
    theme: {
        extend: {
            colors: {
<<<<<<< HEAD
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
=======
                void: '#0A0E17',
                base: '#0D1320',
                surface: '#111827',
                elevated: '#1A2235',
                overlay: '#1F2B3E',
                'border-dim': 'rgba(255,255,255,0.08)',
                'border-mid': 'rgba(255,255,255,0.14)',
                'border-hi': 'rgba(245,200,66,0.40)',
                gold: '#F5C842',
                'gold-bright': '#FFD966',
                'gold-dim': '#B8960F',
                'gold-ghost': 'rgba(245,200,66,0.08)',
                'gold-glow': 'rgba(245,200,66,0.22)',
                teal: '#2DD4BF',
                'teal-dim': '#0F9484',
                'teal-ghost': 'rgba(45,212,191,0.08)',
                safe: '#22C55E',
                'safe-dim': 'rgba(34,197,94,0.12)',
                caution: '#F59E0B',
                'caution-dim': 'rgba(245,158,11,0.12)',
                critical: '#EF4444',
                'critical-dim': 'rgba(239,68,68,0.12)',
                'critical-glow': 'rgba(239,68,68,0.20)',
                sealed: '#6B7280',
                'sealed-dim': 'rgba(107,114,128,0.12)',
                'p-low': '#60A5FA',
                'p-medium': '#F59E0B',
                'p-high': '#F97316',
                'p-critical': '#EF4444',
                'text-hi': '#F1F5F9',
                'text-mid': '#94A3B8',
                'text-low': '#475569',
                'text-gold': '#F5C842',
                'text-code': '#7DD3FC',
            },
            fontFamily: {
                display: ['var(--font-space-grotesk)', 'sans-serif'],
                mono: ['var(--font-plex-mono)', 'monospace'],
                sans: ['var(--font-dm-sans)', 'sans-serif'],
            },
        },
    },
    plugins: [],
>>>>>>> 6c3cdc7b (Initial commit)
};
export default config;
