"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
<<<<<<< HEAD
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
=======
import { motion, AnimatePresence } from 'framer-motion';
import { RarisLogo } from '@/components/brand/RarisLogo';
import { GlassCard } from '@/components/ui/raris/GlassCard';
import { GlowButton } from '@/components/ui/raris/GlowButton';
import { Eye, EyeOff, CheckCircle, Mail, Lock, User, KeyRound, Fingerprint } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useDatabaseStore, UserRole } from '@/store/useDatabaseStore';
import { signIn } from 'next-auth/react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: React.ReactNode;
}

const PremiumInput = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, icon, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const hasValue = props.value && props.value.toString().length > 0;
    const active = focused || hasValue;

    return (
        <motion.div
            initial={false}
            animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="relative mb-6"
        >
            <div className={cn(
                "relative flex items-center bg-surface/30 rounded-xl border transition-all duration-300 overflow-hidden",
                focused ? "border-gold glow-gold bg-surface/50" : (error ? "border-danger bg-danger/5" : "border-muted/20 hover:border-muted/40"),
                className
            )}>
                {icon && (
                    <div className={cn("pl-4 pr-2 transition-colors", focused ? "text-gold" : "text-text-mid")}>
                        {icon}
                    </div>
                )}
                <div className="relative flex-1">
                    <label className={cn(
                        "absolute left-4 transition-all duration-200 pointer-events-none font-medium",
                        active ? "text-[10px] top-1.5 text-gold tracking-widest uppercase" : "text-sm top-4 text-text-mid"
                    )}>
                        {label}
                    </label>
                    <input
                        ref={ref}
                        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
                        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
                        className={cn(
                            "w-full bg-transparent outline-none pb-2 pt-6 px-4 text-sm text-text-hi",
                            !icon && "pl-4"
                        )}
                        {...props}
                    />
                </div>
                {/* Animated Underline Effect */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-gold to-teal"
                    initial={{ width: "0%" }}
                    animate={{ width: focused ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            <AnimatePresence>
                {error && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute -bottom-5 text-[11px] text-danger font-medium left-1">
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
});
PremiumInput.displayName = "PremiumInput";


export default function Login() {
    const router = useRouter();
    const loginStore = useDatabaseStore(state => state.login);

    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [role, setRole] = useState<UserRole>('student');
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form Fields
    const [studentId, setStudentId] = useState('');
    const [studentPwd, setStudentPwd] = useState('');

    const [adminEmail, setAdminEmail] = useState('');
    const [adminPasskey, setAdminPasskey] = useState('');
    const [systemPasskey, setSystemPasskey] = useState('');

    const isStudentValid = studentId.length >= 5 && studentPwd.length >= 6;
    const isAdminValid = adminEmail.includes('@') && adminPasskey.length >= 8 && (mode === 'login' || systemPasskey.length > 0);
    const isValid = role === 'student' ? isStudentValid : isAdminValid;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        setLoading(true);

        // Security Check for Admin Role
        if (role === 'admin') {
            if (mode === 'signup') {
                if (systemPasskey !== 'RARIS-PRINCIPAL-2026') {
                    toast.error("Invalid System Passkey. Principal access denied.");
                    setLoading(false);
                    return;
                }
            }

            if (mode === 'signup') {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: adminEmail, password: adminPasskey, systemPasskey })
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    toast.error(errorData.error || "Failed to create identity.");
                    setLoading(false);
                    return;
                }
            }

            // NextAuth Login
            const result = await signIn('credentials', {
                email: adminEmail,
                password: adminPasskey,
                redirect: false,
            });

            if (result?.error) {
                toast.error(result.error || "Invalid credentials.");
                setLoading(false);
                return;
            }
        }

        // Simulate network delay for student, skip delay if admin since API took time
        const delay = role === 'admin' ? 0 : 1500;
        
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);

            // Login to Persistent Zustand Store
            const finalId = role === 'student' ? studentId : adminEmail;
            loginStore(finalId, role);

            toast.success("Identity Verified Successfully.");

            setTimeout(() => {
                if (role === 'admin') router.push('/admin');
                else router.push('/'); // Students go to home to see steps
            }, 1500);
        }, 1500);
    };

    const formSection = (
        <div className="w-full max-w-md mx-auto relative z-20">
            <AnimatePresence mode="wait">
                {!success ? (
                    <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="w-full">
                        <GlassCard glow="none" className="p-10 border-gold/10 bg-base/90 shadow-xl backdrop-blur-md hover:border-gold/20 transition-colors">

                            <div className="flex p-1 bg-surface/40 rounded-xl mb-8 border border-white/5 shadow-inner">
                                <button onClick={() => { setMode('login'); }} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${mode === 'login' ? 'bg-gold text-void shadow-lg glow-gold' : 'text-text-mid hover:text-text-hi'}`}>Log In</button>
                                <button onClick={() => { setMode('signup'); }} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${mode === 'signup' ? 'bg-gold text-void shadow-lg glow-gold' : 'text-text-mid hover:text-text-hi'}`}>Sign Up</button>
                            </div>

                            <h3 className="text-3xl font-black mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-dim">{mode === 'login' ? 'System Access' : 'Secure Registration'}</h3>
                            <p className="text-sm text-text-mid mb-8">{mode === 'login' ? 'Enter credentials to access the secure portal.' : 'Establish your secure institutional network identity.'}</p>

                            <div className="flex justify-center gap-3 mb-8">
                                <button type="button" onClick={() => setRole('student')} className={`flex-1 py-3 border rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${role === 'student' ? 'border-gold bg-gold/10 text-gold glow-gold' : 'border-white/5 bg-surface/20 text-text-mid hover:border-gold/50 hover:bg-gold/5'}`}>
                                    <User className="w-4 h-4" /> Student
                                </button>
                                <button type="button" onClick={() => setRole('admin')} className={`flex-1 py-3 border rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${role === 'admin' ? 'border-teal bg-teal/10 text-teal glow-safe' : 'border-white/5 bg-surface/20 text-text-mid hover:border-teal/50 hover:bg-teal/5'}`}>
                                    <Lock className="w-4 h-4" /> Admin (Principal Only)
                                </button>
                            </div>

                            <form onSubmit={handleAuth} className="space-y-4">
                                {role === 'student' ? (
                                    <>
                                        <PremiumInput
                                            label="Official Student ID / PRN No"
                                            type="text"
                                            value={studentId}
                                            onChange={e => setStudentId(e.target.value)}
                                            icon={<Fingerprint className="w-5 h-5" />}
                                            error={studentId && studentId.length < 5 ? "Valid Student ID required for reporting" : undefined}
                                        />
                                        <div className="relative">
                                            <PremiumInput
                                                label="Security Password"
                                                type={showPwd ? "text" : "password"}
                                                value={studentPwd}
                                                onChange={e => setStudentPwd(e.target.value)}
                                                icon={<Lock className="w-5 h-5" />}
                                                error={studentPwd && studentPwd.length < 6 ? "Min 6 characters required" : undefined}
                                            />
                                            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-[22px] text-text-mid hover:text-gold transition-colors z-10">
                                                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <PremiumInput
                                            label="Principal Email"
                                            type="email"
                                            value={adminEmail}
                                            onChange={e => setAdminEmail(e.target.value)}
                                            icon={<Mail className="w-5 h-5" />}
                                            error={adminEmail && !adminEmail.includes('@') ? "Requires official institution email" : undefined}
                                        />
                                        <div className="relative">
                                            <PremiumInput
                                                label={mode === 'signup' ? "Create Access Passkey" : "Access Passkey"}
                                                type={showPwd ? "text" : "password"}
                                                value={adminPasskey}
                                                onChange={e => setAdminPasskey(e.target.value)}
                                                icon={<KeyRound className="w-5 h-5" />}
                                                error={adminPasskey && adminPasskey.length < 8 ? "Passkey too short" : undefined}
                                            />
                                            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-[22px] text-text-mid hover:text-gold transition-colors z-10">
                                                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {mode === 'signup' && (
                                            <PremiumInput
                                                label="System Passkey (Identification)"
                                                type="password"
                                                value={systemPasskey}
                                                onChange={e => setSystemPasskey(e.target.value)}
                                                icon={<Fingerprint className="w-5 h-5" />}
                                                error={systemPasskey && systemPasskey.length < 6 ? "Minimum 6 characters required" : undefined}
                                            />
                                        )}
                                    </>
                                )}

                                <div className="pt-2">
                                    {mode === 'signup' && role === 'admin' && (
                                        <div className="text-xs text-teal font-mono mb-4 px-2 tracking-wide">
                                            &gt; Unique Signature Required. Only the Principal may hold the System Passkey.
                                        </div>
                                    )}
                                    <GlowButton type="submit" variant="primary" className="w-full py-4 text-base font-bold tracking-wide shadow-xl bg-gold hover:bg-gold-bright text-void border-none" loading={loading} disabled={!isValid || loading}>
                                        {mode === 'login' ? 'Secure Authentication' : 'Create Identity'}
                                    </GlowButton>
                                </div>
                            </form>
                        </GlassCard>
                    </motion.div>
                ) : (
                    <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center text-center p-12 bg-surface/40 backdrop-blur-xl rounded-3xl border border-gold/30 shadow-[0_0_80px_rgba(245,200,66,0.15)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent pointer-events-none" />
                        <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: [0, 1.2, 1], rotate: 0 }} transition={{ type: "spring", stiffness: 200, delay: 0.1, damping: 10 }}>
                            <CheckCircle className="w-24 h-24 text-gold mb-6 drop-shadow-[0_0_20px_rgba(245,200,66,0.6)]" />
                        </motion.div>
                        <h3 className="text-3xl font-black mb-2 glow-text tracking-tight text-text-hi">Identity Verified</h3>
                        <p className="text-text-mid font-medium">Establishing secure Handshake Tunnels...</p>
                        <motion.div className="w-32 h-1 bg-surface mt-8 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-gold" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5 }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    const graphicSection = (
        <div className="hidden md:flex flex-col items-center justify-center text-center p-12 relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
            <div className="absolute w-[600px] h-[600px] rounded-full border border-gold/20 border-dashed opacity-30" />
            <div className="absolute w-[800px] h-[800px] rounded-full border border-teal/10 border-dotted opacity-30" />

            <div className="relative z-10 w-full lg:px-10">
                <RarisLogo size={180} animated className="mx-auto mb-10 float-anim drop-shadow-[0_0_40px_rgba(245,200,66,0.4)]" />
                <h2 className="text-5xl lg:text-6xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gold to-teal">RARIS Network</h2>
                <p className="text-text-mid text-lg max-w-md mx-auto mb-10 font-medium leading-relaxed">
                    Zero-knowledge institutional reporting. Secure, impartial, and fundamentally private platform for students and authorities.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-[10px] font-mono">
                    <span className="bg-gold/10 px-4 py-2 rounded-lg border border-gold/30 text-gold uppercase tracking-widest font-bold shadow-lg backdrop-blur-sm glow-gold">AES-256 Auth</span>
                    <span className="bg-teal/10 px-4 py-2 rounded-lg border border-teal/30 text-teal uppercase tracking-widest font-bold shadow-lg backdrop-blur-sm glow-safe">Role Based</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen relative overflow-hidden bg-void">
            <div className="grid md:grid-cols-2 min-h-screen relative z-10">
                <AnimatePresence initial={false}>
                    {mode === 'login' ? (
                        <motion.div key="form-left" initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="absolute md:relative w-full h-full md:left-0 md:col-start-1 flex items-center p-8 bg-surface/30 border-r border-white/5 z-20">
                            {formSection}
                        </motion.div>
                    ) : (
                        <motion.div key="graphic-left" initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-100%", opacity: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="absolute md:relative md:w-full h-full md:left-0 md:col-start-1">
                            {graphicSection}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                    {mode === 'login' ? (
                        <motion.div key="graphic-right" initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-100%", opacity: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="absolute md:relative md:w-full h-full md:left-0 md:col-start-2">
                            {graphicSection}
                        </motion.div>
                    ) : (
                        <motion.div key="form-right" initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="absolute md:relative w-full h-full md:left-0 md:col-start-2 flex items-center p-8 bg-surface/30 border-l border-white/5 z-20">
                            {formSection}
                        </motion.div>
                    )}
                </AnimatePresence>
>>>>>>> 6c3cdc7b (Initial commit)
            </div>
        </div>
    );
}
