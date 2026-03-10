"use client";
import React, { useState, useMemo } from 'react';
import { GlassCard } from '@/components/ui/raris/GlassCard';
import { FilterChip } from '@/components/ui/raris/FilterChip';
import { RiskBadge } from '@/components/ui/raris/RiskBadge';
import { StatusBadge } from '@/components/ui/raris/StatusBadge';
import { CaseDrawer } from '@/components/ui/raris/CaseDrawer';
import { complaints } from '@/lib/mockData';
import { Search, Filter, AlertTriangle } from 'lucide-react';

export default function CasesPage() {
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [selectedCase, setSelectedCase] = useState(null);

    const statuses = ["All", "new", "under_review", "evidence_requested", "verified", "action_taken", "closed", "rejected", "flagged"];

    const filtered = useMemo(() => {
        return complaints.filter(c => {
            if (filterStatus !== "All") {
                if (filterStatus === "flagged" && !c.isFlagged) return false;
                if (filterStatus !== "flagged" && c.status !== filterStatus) return false;
            }
            if (search) {
                return c.trackingId.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
            }
            return true;
        });
    }, [search, filterStatus]);

    return (
        <div className="p-8 max-w-[1400px] mx-auto space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Case Directory</h1>
                    <p className="text-muted">Manage, review, and resolve submitted reports.</p>
                </div>
            </div>

            <div className="sticky top-0 z-30 pt-4 pb-4 bg-base/80 backdrop-blur-xl">
                <GlassCard className="p-3">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted" />
                            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Tracking ID or Category..." className="w-full bg-surface border-none rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-1 focus:ring-primary outline-none" />
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            {statuses.map(s => (
                                <button key={s} onClick={() => setFilterStatus(s)} className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${filterStatus === s ? 'bg-primary text-white shadow-lg glow-blue' : 'bg-surface text-muted hover:text-bright'}`}>
                                    {s === "All" ? "All Cases" : s.replace('_', ' ').toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </GlassCard>
            </div>

            <div className="bg-surface/30 border border-primary/20 flex flex-wrap gap-2 p-2 rounded-xl min-h-[44px]">
                <Filter className="w-4 h-4 text-primary ml-2 mt-1.5" />
                {filterStatus !== "All" && <FilterChip label={`Status: ${filterStatus.replace('_', ' ')}`} onRemove={() => setFilterStatus('All')} />}
                {search && <FilterChip label={`Search: ${search}`} onRemove={() => setSearch('')} />}
            </div>

            <GlassCard className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                    <thead className="bg-surface text-muted uppercase text-xs font-bold border-b border-primary/20">
                        <tr>
                            <th className="px-6 py-4">Case ID</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Date Sub</th>
                            <th className="px-6 py-4 w-40">Risk</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Flagged</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-muted/10">
                        {filtered.length === 0 ? (
                            <tr><td colSpan={7} className="text-center py-12 text-muted">No cases found matching filters.</td></tr>
                        ) : filtered.map(c => (
                            <tr key={c.id} onClick={() => setSelectedCase(c as any)} className="hover:bg-surface/60 group cursor-pointer transition-colors border-l-2 border-transparent hover:border-primary">
                                <td className="px-6 py-4 font-mono font-semibold text-bright">{c.trackingId}</td>
                                <td className="px-6 py-4 text-muted">{c.category}</td>
                                <td className="px-6 py-4 text-muted">{c.createdAt}</td>
                                <td className="px-6 py-4 relative">
                                    <div className="flex items-center gap-3">
                                        <RiskBadge score={c.riskScore} />
                                        <div className="w-16 h-1.5 bg-base rounded-full overflow-hidden hidden xl:block">
                                            <div className="h-full rounded-full" style={{ width: `${c.riskScore}%`, backgroundColor: c.riskScore >= 70 ? '#EF4444' : c.riskScore >= 40 ? '#F59E0B' : '#10B981' }} />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                                <td className="px-6 py-4">{c.isFlagged ? <AlertTriangle className="w-4 h-4 text-danger animate-pulse" /> : <span className="text-muted/30">-</span>}</td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">Open &rarr;</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </GlassCard>

            <CaseDrawer complaint={selectedCase} isOpen={!!selectedCase} onClose={() => setSelectedCase(null)} />
        </div>
    );
}
