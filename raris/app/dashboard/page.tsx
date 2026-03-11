"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/raris/GlassCard';
import { GlowButton } from '@/components/ui/raris/GlowButton';
import { StatusTimeline } from '@/components/ui/raris/StatusTimeline';
import { StatusBadge } from '@/components/ui/raris/StatusBadge';
import { RiskBadge } from '@/components/ui/raris/RiskBadge';
import { complaints } from '@/lib/mockData';
import { Search, AlertTriangle, FileUp } from 'lucide-react';
import { fadeUp } from '@/lib/animations';
<<<<<<< HEAD

export default function StudentDashboard() {
=======
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
    const router = useRouter();

    React.useEffect(() => {
        const isAuth = localStorage.getItem('raris_auth') === 'true';
        if (!isAuth) {
            router.push('/login');
            return;
        }
        if (localStorage.getItem('raris_role') === 'admin') {
            router.push('/admin/dashboard');
        }
    }, [router]);

>>>>>>> 6c3cdc7b (Initial commit)
    const [tid, setTid] = useState("");
    const [activeCase, setActiveCase] = useState<any>(null);

    const handleLookup = () => {
        if (tid.toUpperCase() === "EVIDENCE") setActiveCase(complaints[2]);
        else setActiveCase(complaints.find(c => c.trackingId === tid.toUpperCase()) || complaints[0]);
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold mb-2">Track Your Case</h1>
                    <p className="text-muted">Secure status monitoring for anonymous reports.</p>
                </div>
                {activeCase && (
                    <div className="bg-surface/50 border border-primary/20 px-4 py-2 rounded-full flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="text-xs font-mono text-muted tracking-wider">SECURE CONNECTION</span>
                    </div>
                )}
            </div>

            {!activeCase ? (
                <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex justify-center">
                    <GlassCard glow="blue" className="w-full max-w-lg p-10 mt-10 text-center">
                        <Search className="w-12 h-12 text-primary mx-auto mb-6 opacity-80" />
                        <h2 className="text-2xl font-bold mb-6">Enter Tracking ID</h2>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text" value={tid} onChange={e => setTid(e.target.value)}
                                placeholder="TRK-XXXX"
                                className="w-full bg-base border border-primary/40 rounded-xl p-4 text-center font-mono text-xl tracking-widest outline-none focus:border-primary focus:glow-blue transition-all uppercase"
                            />
                            <GlowButton onClick={handleLookup} disabled={!tid} className="w-full py-4">Look Up Case</GlowButton>
                        </div>
                        <p className="text-xs text-muted/60 mt-6 mt-4">For demo purposes, enter any value (or 'EVIDENCE' to see action required flag).</p>
                    </GlassCard>
                </motion.div>
            ) : (
                <motion.div variants={fadeUp} initial="hidden" animate="visible" className="space-y-6">
                    {activeCase.status === 'evidence_requested' && (
                        <motion.div initial={{ x: -8 }} animate={{ x: [0, -4, 4, -4, 4, 0] }} transition={{ duration: 0.5 }} className="bg-warning/10 border border-warning/40 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="text-warning w-5 h-5" />
                                <span className="text-warning font-semibold text-sm">Additional evidence requested to proceed.</span>
                            </div>
                            <GlowButton variant="ghost" className="text-xs h-8 px-4 border-warning/50 text-warning hover:bg-warning/20">
                                <FileUp className="w-3 h-3 mr-2" /> Upload Now
                            </GlowButton>
                        </motion.div>
                    )}

                    <GlassCard glow="violet" className="p-8 float-anim">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pb-8 border-b border-muted/10">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="font-mono text-2xl font-bold tracking-widest text-primary">{activeCase.trackingId}</span>
                                    <StatusBadge status={activeCase.status} />
                                </div>
                                <h3 className="text-xl font-semibold mb-1">{activeCase.category}</h3>
                                <span className="text-sm text-muted">Submitted on {activeCase.createdAt}</span>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <RiskBadge score={activeCase.riskScore} />
                                <span className="text-xs text-muted">Risk Assessment Complete</span>
                            </div>
                        </div>

                        <div className="bg-base border border-surface rounded-xl p-6 mb-8">
                            <h4 className="text-xs font-semibold uppercase text-muted mb-4">Investigator Notes</h4>
                            <p className="text-sm leading-relaxed">{activeCase.investigationNotes || "Investigator has not provided notes yet. Status is monitored actively."}</p>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold uppercase text-muted mb-6">Resolution Progress</h4>
                            <StatusTimeline currentStatus={activeCase.status} />
                        </div>
                    </GlassCard>

                    <div className="flex justify-center pt-8">
                        <button onClick={() => setActiveCase(null)} className="text-sm text-muted hover:text-bright underline underline-offset-4">Track another case</button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
