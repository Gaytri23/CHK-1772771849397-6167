"use client";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    glow?: "blue" | "violet" | "red" | "none";
}

export function GlassCard({ children, glow = "none", className, ...props }: GlassCardProps) {
    const glowClasses = {
        blue: "glow-blue",
        violet: "glow-violet",
        red: "glow-red",
        none: ""
    };

    return (
        <motion.div
            variants={fadeUp}
            className={cn("glass-card overflow-hidden", glowClasses[glow], className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}
