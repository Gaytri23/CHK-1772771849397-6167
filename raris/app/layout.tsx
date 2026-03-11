<<<<<<< HEAD
"use client";
import "./globals.css";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SplashScreen } from "@/components/SplashScreen";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [showSplash, setShowSplash] = useState(true);
    const pathname = usePathname();

    return (
        <html lang="en">
            <body className={inter.className}>
                {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
                {!showSplash && (
                    <>
                        <AnimatePresence mode="wait">
                            <motion.div key={pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="min-h-screen">
                                {children}
                            </motion.div>
                        </AnimatePresence>
                        <Toaster theme="dark" position="bottom-right" />
                    </>
                )}
=======
import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ClientProviders } from './providers';
import { SplashScreen } from '@/components/ui/SplashScreen';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

const plexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
    variable: '--font-plex-mono',
    display: 'swap',
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
    variable: '--font-dm-sans',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'RARIS | Responsible Anonymous Reporting Intelligence System',
    description: 'A privacy-first, encrypted whistleblowing and incident reporting platform.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${spaceGrotesk.variable} ${plexMono.variable} ${dmSans.variable}`}>
            <body className="bg-void text-text-hi font-sans antialiased min-h-screen flex flex-col">
                <SplashScreen />
                <ClientProviders>
                    {children}
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            className: 'glass-gold !bg-void/90 !border-gold/20 !text-text-hi font-sans',
                            style: { backdropFilter: 'blur(22px)' }
                        }}
                    />
                </ClientProviders>
>>>>>>> 6c3cdc7b (Initial commit)
            </body>
        </html>
    );
}
