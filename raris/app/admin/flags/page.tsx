"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/raris/GlassCard';
import { GlowButton } from '@/components/ui/raris/GlowButton';
import { CaseDrawer } from '@/components/ui/raris/CaseDrawer';
import { complaints } from '@/lib/mockData';
import { ShieldAlert, CheckCircle, AlertTriangle, Fingerprint, Zap, X } from 'lucide-react';
import { fadeUp } from '@/lib/animations';
import { toast } from 'sonner';

export default function FlagsQueue() {
    const [flags, setFlags] = useState(complaints.filter(c => c.isFlagged));
    const [selectedCase, setSelectedCase] = useState(null);

    const clearFlag = (id: string) => {
        setFlags(prev => prev.filter(f => f.id !== id));
        toast.success("Flag cleared from queue.");
    };

    const getReasonConfig = (rsn: string) => {
        switch (rsn) {
            case 'ip_spike': return { l: "Suspicious Location", c: "bg-red-500/20 text-red-500 border-red-500/50", i: Zap };
            case 'repeat_reject': return { l: "Repeat Rejected Tracker", c: "bg-amber-500/20 text-amber-500 border-amber-500/50", i: AlertTriangle };
            case 'device_anomaly': return { l: "Fingerprint Anomaly", c: "bg-purple-500/20 text-purple-400 border-purple-500/50", i: Fingerprint };
            default: return { l: "System Flag", c: "bg-primary/20 text-primary border-primary/50", i: AlertTriangle };
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4 border-b border-muted/10 pb-6">
                <div className="w-12 h-12 bg-danger/20 rounded-xl flex items-center justify-center text-danger border border-danger/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">Misuse Detection Queue <span className="bg-danger text-white text-sm px-2.5 py-0.5 rounded-full">{flags.length}</span></h1>
                    <p className="text-muted">AI-identified potential abuse of the RARIS reporting system.</p>
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {flags.length === 0 ? (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-24 flex flex-col items-center justify-center text-center">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ type: "spring", duration: 1 }}>
                                <CheckCircle className="w-20 h-20 text-success mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-bright mb-2">Queue Cleared</h2>
                            <p className="text-muted">No active flags require review at this time.</p>
                        </motion.div>
                    ) : (
                        flags.map((f, i) => {
                            const rsn = getReasonConfig(f.flagReasons[0]);
                            const Icon = rsn.i;
                            return (
                                <motion.div key={f.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, x: -20 }} transition={{ delay: i * 0.05 }}>
                                    <GlassCard glow="red" className="p-6 border-l-4 border-l-danger">
                                        <div className="flex flex-col md:flex-row justify-between gap-6">
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <span className="font-mono text-xl font-bold">{f.trackingId}</span>
                                                    <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded-full border flex items-center gap-1.5 ${rsn.c}`}>
                                                        <Icon className="w-3 h-3" /> {rsn.l}
                                                    </span>
                                                    <span className="text-xs text-muted">{f.createdAt}</span>
                                                </div>
                                                <div className="bg-surface/50 p-3 text-sm italic border-l-2 border-muted/20 text-muted/90 rounded-r-lg">
                                                    "{f.description}"
                                                </div>
                                            </div>

                                            <div className="flex md:flex-col gap-3 justify-center min-w-[140px]">
                                                <button onClick={() => setSelectedCase(f as any)} className="px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-lg text-sm font-semibold hover:bg-primary/20 transition-colors">
                                                    View Case &rarr;
                                                </button>
                                                <button onClick={() => clearFlag(f.id)} className="px-4 py-2 bg-success/10 text-success border border-success/30 rounded-lg text-sm font-semibold hover:bg-success/20 transition-colors flex items-center justify-center gap-2">
                                                    <CheckCircle className="w-4 h-4" /> Clear Flag
                                                </button>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            )
                        })
                    )}
                </AnimatePresence>
            </div>

            <CaseDrawer complaint={selectedCase} isOpen={!!selectedCase} onClose={() => setSelectedCase(null)} />
        </div>
    );
}
