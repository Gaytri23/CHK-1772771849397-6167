"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function RarisLogo({ size = 48, animated = false, className = "" }: { size?: number, animated?: boolean, className?: string }) {
    return (
        <div style={{ width: size, height: size, filter: 'drop-shadow(0 0 12px #3B82F6)' }} className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                    <linearGradient id="rarisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                </defs>

                <motion.circle
                    cx="50" cy="50" r="40"
                    stroke="url(#rarisGrad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="60 30"
                    initial={animated ? { pathLength: 0, rotate: -90 } : {}}
                    animate={animated ? { pathLength: 1, rotate: 0 } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                <motion.path
                    d="M30 50 Q50 30 70 50 Q50 70 30 50"
                    stroke="url(#rarisGrad)" strokeWidth="4"
                    initial={animated ? { pathLength: 0 } : {}}
                    animate={animated ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.circle
                    cx="50" cy="50" r="6" fill="#06B6D4"
                    initial={animated ? { scale: 0 } : {}}
                    animate={animated ? { scale: 1 } : {}}
                    transition={{ type: "spring", delay: 1 }}
                />
                {[0, 120, 240].map((rot, i) => (
                    <motion.path key={i}
                        d="M 50 15 A 35 35 0 0 1 75 25"
                        stroke="#06B6D4" strokeWidth="2" strokeLinecap="round"
                        transform={`rotate(${rot} 50 50)`}
                        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
                        animate={animated ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 1.2 + i * 0.2 }}
                    />
                ))}
            </svg>
        </div>
    );
}
