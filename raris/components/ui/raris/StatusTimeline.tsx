"use client";
import React from 'react';
import { motion } from 'framer-motion';

const stages = ["new", "under_review", "evidence_requested", "verified", "action_taken", "closed"];
const labels = ["Report Submitted", "Under Review", "Evidence Required", "Verified", "Action Taken", "Closed"];

export function StatusTimeline({ currentStatus }: { currentStatus: string }) {
    const activeIndex = stages.indexOf(currentStatus) === -1 ? 0 : stages.indexOf(currentStatus);

    return (
        <div className="relative pl-4 py-4 space-y-8">
            <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-surface" />
            <motion.div
                className="absolute left-[27px] top-8 w-0.5 bg-primary"
                initial={{ height: 0 }}
                animate={{ height: `${(activeIndex / (stages.length - 1)) * 100}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />

            {stages.map((stage, idx) => {
                const isActive = idx === activeIndex;
                const isCompleted = idx < activeIndex;

                return (
                    <div key={stage} className="relative flex items-center gap-4 z-10">
                        <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-base">
                            {isActive && (
                                <div className="absolute w-6 h-6 rounded-full bg-primary/20 pulse-ring-anim text-primary" />
                            )}
                            <div className={`w-3 h-3 rounded-full transition-colors ${isActive ? 'bg-primary shadow-[0_0_10px_#3B82F6]' : isCompleted ? 'bg-primary/50' : 'bg-surface border border-muted/30'}`} />
                        </div>
                        <span className={`text-sm font-medium ${isActive ? 'text-bright' : isCompleted ? 'text-muted' : 'text-muted/50'}`}>
                            {labels[idx]}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
