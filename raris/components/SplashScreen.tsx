"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RarisLogo } from './ui/raris/RarisLogo';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(() => setStep(1), 400);
        const t2 = setTimeout(() => setStep(2), 1200);
        const t3 = setTimeout(() => setStep(3), 1700);
        const t4 = setTimeout(() => setStep(4), 2400);
        const t5 = setTimeout(() => onComplete(), 3200);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-[100] animated-gradient flex flex-col items-center justify-center">
                <div className="relative flex justify-center items-center mb-8">
                    {step >= 1 && <div className="absolute w-[160px] h-[160px] rounded-full border border-primary/30 animate-[pulse-ring_2s_infinite]" />}
                    {step >= 1 && <div className="absolute w-[160px] h-[160px] rounded-full border border-primary/30 animate-[pulse-ring_2s_infinite] delay-700" />}
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }} className={step >= 1 ? "glow-blue rounded-full" : ""}>
                        <RarisLogo size={120} animated={true} />
                    </motion.div>
                </div>

                {step >= 2 && <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold tracking-widest glow-text mb-2">RARIS</motion.h1>}
                {step >= 3 && <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-secondary tracking-widest font-medium uppercase text-sm">Speak Safely. Stay Protected.</motion.p>}
                {step >= 4 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-10 text-muted/50 text-xs text-center">v1.0 — Hackathon Edition</motion.p>}
            </motion.div>
        </AnimatePresence>
    );
}
