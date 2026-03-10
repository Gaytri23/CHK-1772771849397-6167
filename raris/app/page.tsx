"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RarisLogo } from '@/components/ui/raris/RarisLogo';
import { GlowButton } from '@/components/ui/raris/GlowButton';
import { GlassCard } from '@/components/ui/raris/GlassCard';
import { AnimatedCounter } from '@/components/ui/raris/AnimatedCounter';
import { Shield, Eye, CheckCircle } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/animations';

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <div className="min-h-screen bg-base relative">
            <nav className={`fixed top-0 w-full z-40 transition-all ${scrolled ? 'glass-card border-b border-primary/50 shadow-xl py-3' : 'bg-transparent py-5'} px-8 flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                    <RarisLogo size={32} />
                    <span className="font-bold text-xl tracking-wider">RARIS</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-bright">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <a href="#how" className="hover:text-primary transition-colors">How It Works</a>
                    <Link href="/login" className="hover:text-primary transition-colors">Admin</Link>
                </div>
                <Link href="/report">
                    <GlowButton>Submit Report &rarr;</GlowButton>
                </Link>
            </nav>

            {/* Hero */}
            <section className="animated-gradient min-h-screen pt-32 px-8 flex items-center">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
                    <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-start space-y-6">
                        <motion.div variants={fadeUp} className="px-3 py-1 bg-secondary/10 border border-secondary text-secondary rounded-full text-xs font-semibold uppercase tracking-wider">
                            Campus Safety Platform
                        </motion.div>
                        <motion.h1 variants={fadeUp} className="text-6xl md:text-7xl font-bold leading-tight">
                            Campus Safety,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Reimagined.</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-muted text-lg max-w-md">
                            Speak safely. Stay protected. The anonymous, intelligent reporting system that puts student safety first without compromising identity.
                        </motion.p>
                        <motion.div variants={fadeUp} className="flex gap-4 pt-4">
                            <Link href="/report"><GlowButton className="py-3 px-8 text-lg">Submit Report</GlowButton></Link>
                            <Link href="/dashboard"><GlowButton variant="ghost" className="py-3 px-8 text-lg">Track Case</GlowButton></Link>
                        </motion.div>
                        <motion.div variants={fadeUp} className="flex gap-4 text-xs font-mono text-muted/60 pt-4">
                            <span>Encrypted</span> • <span>Anonymous</span> • <span>Audited</span> • <span>Fair</span>
                        </motion.div>
                    </motion.div>
                    <div className="hidden md:flex justify-center relative items-center">
                        <div className="absolute w-[400px] h-[400px] rounded-full border border-primary/20 animate-[pulse-ring_3s_infinite]" />
                        <div className="absolute w-[400px] h-[400px] rounded-full border border-accent/20 animate-[pulse-ring_3s_infinite] delay-1000" />
                        <div className="float-anim">
                            <RarisLogo size={240} animated />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-7xl mx-auto px-8 py-20 -mt-10 relative z-10">
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
                    <GlassCard glow="blue" className="p-8 text-center hover:-translate-y-1 transition-transform">
                        <AnimatedCounter target={48} label="Total Reports Resolved" />
                    </GlassCard>
                    <GlassCard glow="blue" className="p-8 text-center hover:-translate-y-1 transition-transform">
                        <AnimatedCounter target={98} suffix="%" label="Anonymity Guaranteed" />
                    </GlassCard>
                    <GlassCard glow="blue" className="p-8 text-center hover:-translate-y-1 transition-transform">
                        <AnimatedCounter target={4} suffix=" days" label="Avg Resolution Time" />
                    </GlassCard>
                </motion.div>
            </section>

            {/* How it works */}
            <section id="how" className="max-w-7xl mx-auto px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-muted">A fair, secure process from submission to resolution.</p>
                </div>
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Shield, title: "Submit Anonymously", d: "Zero trackers. Fully encrypted." },
                        { icon: Eye, title: "AI Scores Your Report", d: "Smart routing based on evidence." },
                        { icon: CheckCircle, title: "Action Taken Fairly", d: "Track securely with a private PIN." }
                    ].map((s, i) => (
                        <GlassCard key={i} className="p-8 group hover:glow-violet transition-all text-center">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <s.icon className="w-8 h-8 text-bright" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                            <p className="text-muted text-sm">{s.d}</p>
                        </GlassCard>
                    ))}
                </motion.div>
            </section>

            <footer className="bg-surface py-12 text-center border-t border-muted/10">
                <RarisLogo size={24} className="mx-auto mb-4" />
                <p className="text-sm font-medium">RARIS · Speak Safely. Stay Protected.</p>
                <div className="mt-4 flex justify-center gap-6 text-xs text-muted">
                    <a href="#" className="hover:text-bright">Privacy</a>
                    <a href="#" className="hover:text-bright">Terms</a>
                    <a href="#" className="hover:text-bright">Security</a>
                </div>
            </footer>
        </div>
    );
}
