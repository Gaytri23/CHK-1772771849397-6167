"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/raris/GlassCard';
import { AnimatedCounter } from '@/components/ui/raris/AnimatedCounter';
import { RiskBadge } from '@/components/ui/raris/RiskBadge';
import { StatusBadge } from '@/components/ui/raris/StatusBadge';
import { CaseDrawer } from '@/components/ui/raris/CaseDrawer';
import { GlowButton } from '@/components/ui/raris/GlowButton';
<<<<<<< HEAD
import { complaints, stats, analyticsData } from '@/lib/mockData';
import { FileText, ShieldAlert, CheckCircle, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
=======
import { stats, analyticsData } from '@/lib/mockData';
import { FileText, ShieldAlert, CheckCircle, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { useDatabaseStore } from '@/store/useDatabaseStore';
>>>>>>> 6c3cdc7b (Initial commit)
import { Area, AreaChart, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { fadeUp, stagger, slideRight } from '@/lib/animations';
import Link from 'next/link';

export default function AdminDashboard() {
<<<<<<< HEAD
=======
    const { reports } = useDatabaseStore();
>>>>>>> 6c3cdc7b (Initial commit)
    const [selectedCase, setSelectedCase] = useState(null);

    const statCards = [
        { label: "Total Reports", val: stats.total, icon: FileText, col: "text-primary", bg: "bg-primary/20", glow: "blue" },
        { label: "Open Cases", val: stats.open, icon: Clock, col: "text-warning", bg: "bg-warning/20", glow: "none" },
        { label: "Flags Requiring Review", val: stats.flagged, icon: ShieldAlert, col: "text-danger", bg: "bg-danger/20", glow: "red", anim: true },
        { label: "Verified Cases", val: stats.verified, icon: CheckCircle, col: "text-success", bg: "bg-success/20", glow: "none" },
        { label: "Avg Resolution", val: stats.avgResolutionDays, sfx: " days", icon: TrendingUp, col: "text-secondary", bg: "bg-secondary/20", glow: "none" }
    ];

<<<<<<< HEAD
    const highCases = complaints.filter(c => c.riskScore >= 70).slice(0, 4);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Command Center</h1>
                    <p className="text-muted">Real-time overview of campus safety reports.</p>
                </div>
                <GlowButton variant="ghost" className="text-xs h-9">Download Report</GlowButton>
=======
    // Read real reports from the Zustand store
    const highCases = reports.map((r, i) => ({
        ...r,
        trackingId: r.id,
        riskScore: r.status === 'pending' ? 80 + i : 40,
        createdAt: r.createdAt
    })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="p-8 max-w-[1600px] mx-auto space-y-8 relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex justify-between items-end relative z-10">
                <div>
                    <h1 className="text-4xl font-black mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-tight">Command Center</h1>
                    <p className="text-muted font-medium text-lg">Real-time overview of campus safety infrastructure.</p>
                </div>
                <GlowButton variant="ghost" className="text-sm px-6 h-10 border-white/10 hover:bg-white/5">Export Intelligence</GlowButton>
>>>>>>> 6c3cdc7b (Initial commit)
            </div>

            {stats.flagged > 0 && (
                <motion.div variants={slideRight} initial="hidden" animate="visible" className="bg-danger/10 border border-danger/40 rounded-xl p-4 flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-danger/20 flex items-center justify-center text-danger group-hover:scale-110 transition-transform"><AlertTriangle className="w-5 h-5" /></div>
                        <div>
                            <h4 className="font-bold text-danger">Misuse Detection Alert</h4>
                            <p className="text-sm text-danger/80">{stats.flagged} reports flagged for potential system misuse.</p>
                        </div>
                    </div>
                    <Link href="/admin/flags">
                        <GlowButton className="bg-danger border-none text-white hover:bg-danger/80 h-9 text-xs">Review Flags &rarr;</GlowButton>
                    </Link>
                </motion.div>
            )}

<<<<<<< HEAD
            <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {statCards.map((s, i) => (
                    <GlassCard key={i} glow={s.glow as any} className="p-5 flex flex-col justify-between relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center relative`}>
                                {s.anim && <div className="absolute inset-0 border border-danger/50 rounded-lg animate-[pulse-ring_2s_infinite]" />}
                                <s.icon className={`w-4 h-4 ${s.col}`} />
                            </div>
                            {i === 0 && <span className="text-[10px] font-bold text-success bg-success/20 px-2 rounded-full">{stats.monthlyGrowth}</span>}
                        </div>
                        <AnimatedCounter target={s.val} suffix={s.sfx} />
                        <span className="text-xs text-muted font-medium uppercase mt-2">{s.label}</span>
=======
            <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                {statCards.map((s, i) => (
                    <GlassCard key={i} glow={s.glow as any} className="p-6 flex flex-col justify-between relative overflow-hidden group border-white/5 bg-surface/30 hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center relative shadow-inner`}>
                                {s.anim && <div className="absolute inset-0 border border-danger/50 rounded-xl animate-[pulse-ring_2s_infinite]" />}
                                <s.icon className={`w-5 h-5 ${s.col}`} />
                            </div>
                            {i === 0 && <span className="text-[10px] font-black tracking-widest uppercase text-success bg-success/10 px-3 py-1 rounded-full border border-success/20">{stats.monthlyGrowth}</span>}
                        </div>
                        <AnimatedCounter target={s.val} suffix={s.sfx} />
                        <span className="text-[11px] text-muted font-black uppercase tracking-widest mt-3">{s.label}</span>
>>>>>>> 6c3cdc7b (Initial commit)
                    </GlassCard>
                ))}
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
                <GlassCard className="lg:col-span-2 p-6">
                    <h3 className="text-lg font-bold mb-6">Report Volume (12 Mo)</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData.monthlyTrend}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorVerif" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #3B82F6', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                                <Area type="monotone" dataKey="total" stroke="#3B82F6" fillOpacity={1} fill="url(#colorTotal)" animationBegin={0} animationDuration={1200} />
                                <Area type="monotone" dataKey="verified" stroke="#10B981" fillOpacity={1} fill="url(#colorVerif)" animationBegin={300} animationDuration={1200} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard className="p-6">
                    <h3 className="text-lg font-bold mb-6">Category Split</h3>
                    <div className="h-[250px] w-full flex flex-col items-center">
                        <ResponsiveContainer width="100%" height="180px">
                            <PieChart>
                                <Pie data={analyticsData.categoryBreakdown} dataKey="count" nameKey="category" innerRadius={50} outerRadius={80} stroke="none" animationDuration={1000}>
                                    {analyticsData.categoryBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                            {analyticsData.categoryBreakdown.slice(0, 3).map(c => (
                                <div key={c.category} className="flex items-center gap-1 text-[10px] text-muted"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />{c.category}</div>
                            ))}
                        </div>
                    </div>
                </GlassCard>
            </div>

<<<<<<< HEAD
            <GlassCard className="overflow-hidden">
                <div className="p-6 border-b border-muted/10 bg-surface/50">
                    <h3 className="text-lg font-bold">High Priority Escalations</h3>
                </div>
                <div className="divide-y divide-muted/10">
                    {highCases.map((c, i) => (
                        <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} onClick={() => setSelectedCase(c as any)} className="p-4 flex items-center justify-between hover:bg-surface/80 group cursor-pointer border-l-2 border-transparent hover:border-danger transition-all relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-danger/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-4 relative z-10 w-1/3">
                                <span className="font-mono text-bright font-semibold">{c.trackingId}</span>
                                <span className="text-sm text-muted hidden md:block">{c.category}</span>
                            </div>
                            <div className="flex items-center gap-4 relative z-10 w-1/3 justify-center">
                                <RiskBadge score={c.riskScore} />
                            </div>
                            <div className="flex items-center gap-6 relative z-10 w-1/3 justify-end">
                                <StatusBadge status={c.status} />
                                <span className="text-xs text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 hidden md:block">View &rarr;</span>
=======
            <GlassCard className="overflow-hidden border-white/5 bg-surface/20 shadow-2xl mt-8">
                <div className="p-6 border-b border-white/5 bg-black/20 flex justify-between items-center">
                    <h3 className="text-lg font-black tracking-tight text-white">Live Institutional Reports</h3>
                    <span className="bg-danger/10 text-danger border border-danger/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{highCases.length} Total Reports</span>
                </div>
                <div className="divide-y divide-white/5">
                    {highCases.length === 0 && (
                        <div className="p-8 text-center text-muted">No reports filed yet. Submissions will appear here dynamically.</div>
                    )}
                    {highCases.map((c, i) => (
                        <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} onClick={() => setSelectedCase(c as any)} className="p-5 flex items-center justify-between hover:bg-white/5 group cursor-pointer border-l-4 border-transparent hover:border-danger transition-all relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-danger/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-6 relative z-10 w-2/5">
                                <span className="font-mono text-bright font-black text-sm tracking-widest flex flex-col gap-1">
                                    <span>Track ID: {c.trackingId}</span>
                                    <span className="text-xs text-gold">Submitted By: {c.studentId}</span>
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-muted hidden lg:block bg-surface/50 px-3 py-1 rounded-md border border-white/5">{c.category}</span>
                            </div>
                            <div className="flex items-center gap-4 relative z-10 w-1/5 justify-center">
                                <RiskBadge score={c.riskScore} />
                            </div>
                            <div className="flex items-center gap-8 relative z-10 w-1/3 justify-end">
                                <StatusBadge status={c.status} />
                                <span className="text-xs text-primary font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 hidden md:block">Inspect &rarr;</span>
>>>>>>> 6c3cdc7b (Initial commit)
                            </div>
                        </motion.div>
                    ))}
                </div>
            </GlassCard>

            <CaseDrawer complaint={selectedCase} isOpen={!!selectedCase} onClose={() => setSelectedCase(null)} />
        </div>
    );
}
