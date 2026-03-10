"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { RiskMeter } from './RiskMeter';
import { StatusBadge } from './StatusBadge';
import { GlowButton } from './GlowButton';
import { toast } from 'sonner';

export function CaseDrawer({ complaint, isOpen, onClose }: { complaint: any, isOpen: boolean, onClose: () => void }) {
    if (!complaint) return null;

    const handleSave = () => {
        toast.success("Case updated successfully");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-base/80 backdrop-blur-sm z-50" onClick={onClose} />
                    <motion.div
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-[480px] z-50 p-4"
                    >
                        <GlassCard className="h-full flex flex-col p-6 rounded-2xl border-l border-primary/30">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="font-mono text-xl text-primary font-bold">{complaint.trackingId}</h2>
                                    <span className="text-sm text-muted">{complaint.category} • {complaint.department}</span>
                                </div>
                                <button onClick={onClose} className="p-2 bg-surface rounded-full hover:bg-danger/20 hover:text-danger transition"><X className="w-5 h-5" /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                                <div className="bg-surface/50 p-4 rounded-xl text-sm leading-relaxed border border-muted/10">
                                    {complaint.description}
                                </div>

                                <div className="flex flex-col items-center p-6 bg-surface border border-muted/20 rounded-xl">
                                    <RiskMeter score={complaint.riskScore} />
                                    <div className="w-full mt-4 space-y-2 text-xs">
                                        <div className="flex justify-between border-b border-muted/10 pb-1"><span>Evidence Match</span><span className="font-bold text-success">+{complaint.riskBreakdown?.evidence || 0}</span></div>
                                        <div className="flex justify-between border-b border-muted/10 pb-1"><span>Description Details</span><span className="font-bold text-success">+{complaint.riskBreakdown?.description || 0}</span></div>
                                        <div className="flex justify-between"><span>Pattern Flag</span><span className="font-bold text-danger">+{complaint.riskBreakdown?.patternMatch || 0}</span></div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-muted font-semibold uppercase mb-2 block">Status & Notes</label>
                                    <div className="flex gap-2 mb-3">
                                        <StatusBadge status={complaint.status} />
                                        {complaint.isFlagged && <StatusBadge status="rejected" />}
                                    </div>
                                    <textarea className="w-full bg-base border border-muted/30 rounded-lg p-3 text-sm min-h-[100px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" defaultValue={complaint.investigationNotes} placeholder="Add investigation notes..." />
                                </div>
                            </div>

                            <div className="pt-4 mt-auto border-t border-muted/20">
                                <GlowButton className="w-full" onClick={handleSave}><Save className="w-4 h-4" /> Save Changes</GlowButton>
                            </div>
                        </GlassCard>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
