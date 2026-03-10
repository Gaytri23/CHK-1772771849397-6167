"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RarisLogo } from '@/components/ui/raris/RarisLogo';
import { LayoutDashboard, FileText, BarChart3, ShieldAlert, LogOut } from 'lucide-react';
import { stats } from '@/lib/mockData';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const nav = [
        { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Cases", href: "/admin/cases", icon: FileText },
        { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        { label: "Flags Queue", href: "/admin/flags", icon: ShieldAlert, badge: stats.flagged }
    ];

    return (
        <div className="min-h-screen bg-base flex">
            <aside className="fixed left-0 top-0 bottom-0 w-64 glass-card rounded-none border-y-0 border-l-0 border-r border-primary/20 flex flex-col z-40">
                <div className="p-6 flex items-center gap-3 border-b border-muted/10">
                    <RarisLogo size={28} />
                    <span className="font-bold tracking-widest text-lg">RARIS</span>
                </div>
                <div className="p-4 flex-1 space-y-2">
                    {nav.map(n => {
                        const act = pathname === n.href;
                        return (
                            <Link key={n.href} href={n.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${act ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'text-muted hover:bg-surface hover:text-bright border-l-2 border-transparent'}`}>
                                <n.icon className={`w-4 h-4 ${n.badge && n.badge > 0 ? act ? '' : 'text-danger' : ''}`} />
                                <span className="flex-1">{n.label}</span>
                                {n.badge && n.badge > 0 ? (
                                    <span className="bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{n.badge}</span>
                                ) : null}
                            </Link>
                        )
                    })}
                </div>
                <div className="p-6 border-t border-muted/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50 text-accent font-bold text-xs">AJ</div>
                        <div><p className="text-sm font-bold">Admin Jane</p><p className="text-xs text-muted">admin@college.edu</p></div>
                    </div>
                    <Link href="/login" className="flex items-center gap-2 text-xs text-muted hover:text-danger font-medium transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </Link>
                </div>
            </aside>
            <main className="flex-1 ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}
