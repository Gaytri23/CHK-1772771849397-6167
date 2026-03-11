"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "ghost";
    loading?: boolean;
}

export function GlowButton({ children, variant = "primary", loading, className, disabled, ...props }: Props) {
    const isPrimary = variant === "primary";
    return (
        <motion.button
            whileHover={{ scale: disabled || loading ? 1 : 1.04 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.96 }}
            disabled={disabled || loading}
            className={cn(
                "relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all overflow-hidden",
                isPrimary
                    ? "bg-gradient-to-r from-primary to-accent text-white hover:glow-blue disabled:opacity-50"
                    : "bg-transparent border border-primary/40 text-bright hover:bg-primary/10 disabled:opacity-50",
                className
            )}
<<<<<<< HEAD
            {...props}
=======
            {...(props as any)}
>>>>>>> 6c3cdc7b (Initial commit)
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
        </motion.button>
    );
}
