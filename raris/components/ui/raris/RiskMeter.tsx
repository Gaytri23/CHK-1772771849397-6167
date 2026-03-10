"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function RiskMeter({ score }: { score: number }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const color = score >= 70 ? "#EF4444" : score >= 40 ? "#F59E0B" : "#10B981";
    const radius = 80;
    const circumference = Math.PI * radius;
    const strokeDashoffset = mounted ? circumference - (score / 100) * circumference : circumference;

    return (
        <div className="relative flex flex-col items-center justify-center w-[200px] h-[120px]">
            <svg className="w-full h-full" viewBox="0 0 200 110">
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none" stroke="#1E293B" strokeWidth="16" strokeLinecap="round"
                />
                <motion.path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none" stroke={color} strokeWidth="16" strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    style={{ filter: `drop-shadow(0 0 8px ${color})` }}
                />
            </svg>
            <div className="absolute bottom-2 flex flex-col items-center">
                <span className="text-3xl font-bold" style={{ color }}>{score}</span>
                <span className="text-xs text-muted font-medium uppercase tracking-wider">Risk Score</span>
            </div>
        </div>
    );
}
