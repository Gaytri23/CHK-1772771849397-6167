"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { label: string; color: string }> = {
        new: { label: "New", color: "bg-blue-500/20 text-blue-400 border-blue-500/50" },
        under_review: { label: "Under Review", color: "bg-amber-500/20 text-amber-400 border-amber-500/50" },
        evidence_requested: { label: "Evidence Req", color: "bg-orange-500/20 text-orange-400 border-orange-500/50" },
        verified: { label: "Verified", color: "bg-violet-500/20 text-violet-400 border-violet-500/50" },
        action_taken: { label: "Action Taken", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/50" },
        closed: { label: "Closed", color: "bg-green-500/20 text-green-400 border-green-500/50" },
        rejected: { label: "Rejected", color: "bg-red-500/20 text-red-400 border-red-500/50" }
    };
    const config = map[status] || map.new;

    return (
        <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", config.color)}
        >
            {config.label}
        </motion.span>
    );
}
