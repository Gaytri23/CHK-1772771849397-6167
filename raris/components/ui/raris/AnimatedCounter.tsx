"use client";
import React, { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function AnimatedCounter({ target, suffix = "", label }: { target: number, duration?: number, suffix?: string, label?: string }) {
    const spring = useSpring(0, { stiffness: 50, damping: 15 });
    const display = useTransform(spring, (cur) => Math.round(cur) + suffix);

    useEffect(() => {
        spring.set(target);
    }, [target, spring]);

    return (
        <div className="flex flex-col">
            {label && <span className="text-sm text-muted font-medium mb-1">{label}</span>}
            <motion.span className="text-4xl font-bold tracking-tight text-bright glow-text">{display}</motion.span>
        </div>
    );
}
