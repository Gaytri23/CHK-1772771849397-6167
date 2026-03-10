"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/raris/GlassCard';
import { GlowButton } from '@/components/ui/raris/GlowButton';
import { EvidenceUploader } from '@/components/ui/raris/EvidenceUploader';
import { RiskMeter } from '@/components/ui/raris/RiskMeter';
import { RiskBadge } from '@/components/ui/raris/RiskBadge';
import { computeRiskScore } from '@/lib/scoring';
import { AlertCircle, CheckCircle, Copy, ShieldAlert, Users, Navigation, EyeOff, XOctagon, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

const categories = [
    { id: "Harassment", icon: AlertCircle }, { id: "Bullying", icon: Users }, { id: "Stalking", icon: EyeOff },
    { id: "Discrimination", icon: XOctagon }, { id: "Abuse", icon: ShieldAlert }, { id: "Other", icon: MoreHorizontal }
];

export default function ReportWizard() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({ category: "", description: "", evidence: 0, dept: "", loc: "", date: "" });
    const [submitted, setSubmitted] = useState(false);
    const [trkId, setTrkId] = useState("");

    const risk = computeRiskScore(data.evidence, data.description.length, false);

    const next = () => setStep(s => Math.min(6, s + 1));
    const prev = () => setStep(s => Math.max(1, s - 1));

    const handleSubmit = () => {
        setTrkId(Math.random().toString(36).substring(2, 10).toUpperCase());
        setSubmitted(true);
        toast.success("Report securely submitted.");
    };

    if (submitted) {
        return (
            <div className="min-h-screen pt-32 pb-24 px-8 flex items-center justify-center relative">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }} className="w-full max-w-md">
                    <GlassCard glow="blue" className="p-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-success to-primary" />
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6 text-success">
                            <CheckCircle className="w-10 h-10" />
                        </motion.div>
                        <h2 className="text-2xl font-bold mb-2">Report Submitted</h2>
                        <p className="text-muted text-sm mb-8">Your report is encrypted and queued for review. Save your tracking ID to monitor progress.</p>

                        <div className="bg-base border border-primary/30 p-4 rounded-xl mb-8 flex items-center justify-between group">
                            <span className="font-mono text-xl tracking-widest text-primary font-bold">{trkId}</span>
                            <button
                                onClick={() => { navigator.clipboard.writeText(trkId); toast("Copied tracking ID"); }}
                                className="p-2 bg-surface rounded-lg hover:bg-primary/20 text-muted hover:text-bright transition-colors"
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>

                        <GlowButton onClick={() => window.location.href = '/dashboard'} className="w-full">Track Case &rarr;</GlowButton>
                    </GlassCard>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-8 max-w-3xl mx-auto">
            <div className="mb-12 relative">
                <div className="h-1 w-full bg-surface rounded-full overflow-hidden">
                    <motion.div layoutId="progress" className="h-full bg-primary" animate={{ width: `${(step / 6) * 100}%` }} transition={{ duration: 0.3 }} />
                </div>
                <div className="flex justify-between mt-4">
                    <span className="text-xs text-muted font-medium uppercase tracking-wider">Step {step} of 6</span>
                    <span className="text-xs text-primary font-bold uppercase tracking-wider">{Math.round((step / 6) * 100)}% Complete</span>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.35 }}
                    className="min-h-[400px]"
                >
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">What happened?</h2>
                            <p className="text-muted">Select the category that best fits your concern.</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {categories.map(c => {
                                    const sel = data.category === c.id;
                                    return (
                                        <GlassCard key={c.id} onClick={() => setData({ ...data, category: c.id })} glow={sel ? "violet" : "none"} className={`p-6 cursor-pointer flex flex-col items-center text-center transition-all hover:scale-[1.03] ${sel ? 'bg-primary/10 border-accent' : 'border-transparent hover:border-primary/30'}`}>
                                            <c.icon className={`w-8 h-8 mb-4 ${sel ? 'text-accent' : 'text-muted'}`} />
                                            <span className={`font-semibold ${sel ? 'text-bright' : 'text-muted'}`}>{c.id}</span>
                                            {sel && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 text-accent"><CheckCircle className="w-4 h-4" /></motion.div>}
                                        </GlassCard>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Describe the incident.</h2>
                            <textarea
                                value={data.description} onChange={e => setData({ ...data, description: e.target.value })}
                                className="w-full min-h-[200px] bg-surface border border-muted/30 rounded-xl p-5 outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:glow-blue transition-all"
                                placeholder="Be as detailed as possible..."
                            />
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-muted">Credibility Preview</span>
                                <span className={data.description.length > 200 ? "text-success" : data.description.length > 50 ? "text-warning" : "text-muted"}>{data.description.length} chars</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                                <motion.div className="h-full bg-gradient-to-r from-warning to-success" animate={{ width: `${Math.min(100, (data.description.length / 300) * 100)}%` }} />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Upload supporting evidence.</h2>
                            <p className="text-muted">Evidence increases your report's priority and verification speed.</p>
                            <EvidenceUploader onChange={files => setData({ ...data, evidence: files.length })} maxFiles={3} />
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Additional details.</h2>
                            <div className="space-y-4">
                                <input type="text" placeholder="Department (e.g., Computer Science)" value={data.dept} onChange={e => setData({ ...data, dept: e.target.value })} className="w-full bg-surface border border-muted/30 rounded-xl p-4 outline-none focus:border-primary focus:glow-blue" />
                                <input type="text" placeholder="Location (e.g., Main Library, 2nd Floor)" value={data.loc} onChange={e => setData({ ...data, loc: e.target.value })} className="w-full bg-surface border border-muted/30 rounded-xl p-4 outline-none focus:border-primary focus:glow-blue" />
                                <input type="date" value={data.date} onChange={e => setData({ ...data, date: e.target.value })} className="w-full bg-surface border border-muted/30 rounded-xl p-4 outline-none focus:border-primary focus:glow-blue text-bright" />
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-8 flex flex-col items-center">
                            <div className="text-center w-full">
                                <h2 className="text-3xl font-bold mb-2">Automated Assessment</h2>
                                <p className="text-muted">This is how RARIS AI views your report based on the details provided.</p>
                            </div>
                            <RiskMeter score={risk.score} />
                            <div className="w-full max-w-md">
                                <RiskBadge score={risk.score} />
                            </div>
                            <div className="w-full max-w-md bg-surface border border-muted/20 rounded-xl p-6 text-sm">
                                <div className="flex justify-between py-2 border-b border-muted/10"><span>Evidence Weight</span><span className="text-success font-bold">+{risk.breakdown.evidence}</span></div>
                                <div className="flex justify-between py-2 border-b border-muted/10"><span>Description Density</span><span className="text-success font-bold">+{risk.breakdown.description}</span></div>
                                <div className="flex justify-between py-2"><span>Absence Penalty</span><span className="text-danger font-bold">{risk.breakdown.noEvidencePenalty}</span></div>
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold mb-8">Review & Submit.</h2>
                            <GlassCard className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <label className="text-xs text-muted uppercase tracking-wider mb-1 block">Category</label>
                                        <span className="font-bold text-lg text-primary">{data.category || 'Not specified'}</span>
                                    </div>
                                    <button onClick={() => setStep(1)} className="text-xs text-muted underline hover:text-bright">Edit</button>
                                </div>
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-1"><label className="text-xs text-muted uppercase tracking-wider block">Description</label><button onClick={() => setStep(2)} className="text-xs text-muted underline hover:text-bright">Edit</button></div>
                                    <p className="text-sm bg-base p-4 rounded-lg border border-muted/10 line-clamp-3">{data.description || 'No description provided.'}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-1"><label className="text-xs text-muted uppercase tracking-wider block">Details</label><button onClick={() => setStep(4)} className="text-xs text-muted underline hover:text-bright">Edit</button></div>
                                        <span className="text-sm block">{data.dept} • {data.loc}</span>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-1"><label className="text-xs text-muted uppercase tracking-wider block">Evidence</label><button onClick={() => setStep(3)} className="text-xs text-muted underline hover:text-bright">Edit</button></div>
                                        <span className="text-sm font-bold text-secondary">{data.evidence} file(s) attached</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-12 pt-6 border-t border-muted/20">
                <GlowButton variant="ghost" onClick={prev} disabled={step === 1}>Back</GlowButton>
                {step < 6 ? (
                    <GlowButton onClick={next} disabled={step === 1 && !data.category}>Next Step &rarr;</GlowButton>
                ) : (
                    <GlowButton onClick={handleSubmit} className="px-10">Submit Anonymously &rarr;</GlowButton>
                )}
            </div>
        </div>
    );
}
