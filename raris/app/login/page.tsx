"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { RarisLogo } from '@/components/ui/raris/RarisLogo';
import { GlassCard } from '@/components/ui/raris/GlassCard';
import { GlowButton } from '@/components/ui/raris/GlowButton';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const router = useRouter();
    const [tab, setTab] = useState<'student' | 'admin'>('student');
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            if (tab === 'admin') router.push('/admin/dashboard');
            else router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2">
            <div className="animated-gradient hidden md:flex flex-col items-center justify-center text-center p-12 relative overflow-hidden">
                <div className="absolute w-[500px] h-[500px] rounded-full border border-primary/20 animate-[pulse-ring_4s_infinite]" />
                <div className="relative z-10">
                    <RarisLogo size={120} animated className="mx-auto mb-8" />
                    <h2 className="text-3xl font-bold mb-4">RARIS Network</h2>
                    <p className="text-muted max-w-sm mx-auto mb-8">Secure authentication portal. All connections are end-to-end encrypted.</p>
                    <div className="flex justify-center gap-4 text-xs font-mono">
                        <span className="bg-surface/50 px-3 py-1 rounded-full border border-primary/20">SOC2 Type II</span>
                        <span className="bg-surface/50 px-3 py-1 rounded-full border border-accent/20">AES-256</span>
                    </div>
                </div>
            </div>

            <div className="bg-surface flex items-center justify-center p-8">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md">
                    <GlassCard className="p-8">
                        <div className="flex p-1 bg-base rounded-lg mb-8">
                            <button onClick={() => setTab('student')} className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${tab === 'student' ? 'bg-primary text-white shadow-lg' : 'text-muted hover:text-bright'}`}>Student</button>
                            <button onClick={() => setTab('admin')} className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${tab === 'admin' ? 'bg-accent text-white shadow-lg' : 'text-muted hover:text-bright'}`}>Admin</button>
                        </div>

                        <h3 className="text-2xl font-bold mb-6">Welcome Back</h3>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="text-xs text-muted mb-1 block">University Email / ID</label>
                                <input required type="text" className="w-full bg-base border border-muted/30 rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:glow-blue transition-all outline-none" placeholder={tab === 'student' ? "student@college.edu" : "admin@college.edu"} />
                            </div>
                            <div className="relative">
                                <label className="text-xs text-muted mb-1 block">Password / PIN</label>
                                <input required type={showPwd ? "text" : "password"} className="w-full bg-base border border-muted/30 rounded-lg p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:glow-blue transition-all outline-none" placeholder="••••••••" />
                                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-[26px] text-muted hover:text-bright">
                                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            <div className="pt-4">
                                <GlowButton type="submit" className="w-full" loading={loading}>Sign In</GlowButton>
                            </div>
                        </form>

                        <div className="mt-6 border-t border-muted/10 pt-6">
                            <GlowButton variant="ghost" className="w-full text-sm">Continue with College SSO</GlowButton>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
}
