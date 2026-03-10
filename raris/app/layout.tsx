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
            </body>
        </html>
    );
}
