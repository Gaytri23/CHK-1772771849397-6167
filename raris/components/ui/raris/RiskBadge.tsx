"use client";
import React from 'react';
import { cn } from '@/lib/utils';

export function RiskBadge({ score }: { score: number }) {
    const isHigh = score >= 70;
    const isMed = score >= 40 && score < 70;
    const label = isHigh ? "HIGH" : isMed ? "MEDIUM" : "LOW";

    return (
        <div className={cn(
            "relative inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide",
            isHigh ? "bg-danger/20 text-danger border border-danger/50" :
                isMed ? "bg-warning/20 text-warning border border-warning/50" :
                    "bg-success/20 text-success border border-success/50"
        )}>
            {isHigh && <div className="absolute inset-0 rounded-full border border-danger/50 animate-[pulse-ring_2s_infinite]" />}
            {label}
        </div>
    );
}
