"use client";
import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/raris/GlassCard';
import { GlowButton } from '@/components/ui/raris/GlowButton';
import { analyticsData, complaints } from '@/lib/mockData';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AnalyticsPage() {
    const [loading, setLoading] = useState(false);

    const exportCsv = () => {
        setLoading(true);
        setTimeout(() => {
            const hdrs = ["ID", "Tracking ID", "Category", "Risk Score", "Status", "Date\n"];
            const rows = complaints.map(c => `${c.id},${c.trackingId},${c.category},${c.riskScore},${c.status},${c.createdAt}`).join("\n");
            const blob = new Blob([hdrs + rows], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'raris_export.csv';
            a.click();
            setLoading(false);
            toast.success("Export complete");
        }, 1500);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Analytics Engine</h1>
                    <p className="text-muted">Deep insights into campus reporting trends.</p>
                </div>
                <GlowButton variant="ghost" onClick={exportCsv} disabled={loading} className="text-xs">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
                    Export CSV
                </GlowButton>
            </div>

            <GlassCard className="p-6 h-[400px]">
                <h3 className="text-lg font-bold mb-6">Complaint Trend YoY</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart data={analyticsData.monthlyTrend}>
                        <defs>
                            <linearGradient id="cTot" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient>
                            <linearGradient id="cVer" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10B981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10B981" stopOpacity={0} /></linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ background: '#1E293B', border: '1px solid #3B82F6', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                        <Area type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={3} fill="url(#cTot)" animationDuration={1500} />
                        <Area type="monotone" dataKey="verified" stroke="#10B981" strokeWidth={3} fill="url(#cVer)" animationDuration={1500} />
                    </AreaChart>
                </ResponsiveContainer>
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-6">
                <GlassCard className="p-6 h-[350px]">
                    <h3 className="text-lg font-bold mb-6">Risk Distribution</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <BarChart data={analyticsData.riskDistribution} layout="vertical" margin={{ left: 20 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="band" type="category" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: '#1E293B' }} contentStyle={{ background: '#0F172A', border: 'none', borderRadius: '8px' }} />
                            <Bar dataKey="count" radius={[0, 4, 4, 0]} animationDuration={1000} className="fill-primary" barSize={32}>
                                {analyticsData.riskDistribution.map((e, index) => (
                                    <Cell key={`cell-${index}`} fill={e.band === "HIGH" ? "#EF4444" : e.band === "MEDIUM" ? "#F59E0B" : "#10B981"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </GlassCard>

                <GlassCard className="p-6 h-[350px]">
                    <h3 className="text-lg font-bold mb-6">Resolution Time (SLA)</h3>
                    <ResponsiveContainer width="100%" height="80%">
                        <LineChart data={analyticsData.resolutionTime}>
                            <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ background: '#1E293B', border: 'none' }} />
                            <ReferenceLine y={5} label={{ position: 'top', value: 'SLA Target (5d)', fill: '#94A3B8', fontSize: 10 }} stroke="#EF4444" strokeDasharray="3 3" />
                            <Line type="monotone" dataKey="avgDays" stroke="#06B6D4" strokeWidth={3} dot={{ r: 4, fill: '#06B6D4', strokeWidth: 0 }} activeDot={{ r: 8 }} animationDuration={1500} />
                        </LineChart>
                    </ResponsiveContainer>
                </GlassCard>
            </div>

            <GlassCard className="p-6 overflow-x-auto">
                <h3 className="text-lg font-bold mb-6">Department vs Category Heatmap</h3>
                <table className="w-full text-sm font-mono text-center">
                    <thead>
                        <tr>
                            <th className="p-4 text-left font-sans text-muted">Department</th>
                            {["Harassment", "Bullying", "Stalking", "Discrimination", "Abuse", "Other"].map(c => <th key={c} className="p-4 bg-surface text-bright rounded-t-lg mx-1">{c.substring(0, 3).toUpperCase()}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {["Housing", "Academic", "Security", "Faculty", "Student Life"].map((d, rIdx) => (
                            <tr key={d}>
                                <td className="p-4 text-left font-sans font-bold bg-surface rounded-l-lg mb-1">{d}</td>
                                {analyticsData.departmentHeatmap[rIdx].map((val, cIdx) => (
                                    <td key={cIdx} className="p-4 mb-1" style={{ backgroundColor: `rgba(59, 130, 246, ${Math.max(0.1, val / 25)})` }}>
                                        <span className={val > 12 ? 'text-white' : 'text-white/60'}>{val}</span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </GlassCard>
        </div>
    );
}
