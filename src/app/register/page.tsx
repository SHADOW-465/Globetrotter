"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Globe, Info, UserPlus, LogIn, Camera, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '', // Added password field
        phone: '',
        city: '',
        country: '',
        additionalInfo: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        phone: formData.phone,
                        city: formData.city,
                        country: formData.country,
                        additional_info: formData.additionalInfo
                    }
                }
            });

            if (signUpError) throw signUpError;

            // Redirect to login or home
            router.push('/login?message=Check your email to confirm registration');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm";
    const labelClasses = "text-xs font-semibold text-slate-400 ml-1 mb-1.5 block";

    return (
        <main className="min-h-screen py-12 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Blur Orbs */}
            <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-primary opacity-10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] bg-accent opacity-10 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl glass-card p-8 z-10"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Create Your Account</h1>
                    <p className="text-slate-400 font-medium">Join our community of global travelers</p>
                    {error && (
                        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                            {error}
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Photo Placeholder */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center overflow-hidden group-hover:border-primary transition-colors cursor-pointer">
                                <Camera className="w-8 h-8 text-slate-500 group-hover:text-primary transition-colors" />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white shadow-lg"
                            >
                                <UserPlus className="w-4 h-4" />
                            </motion.button>
                        </div>
                        <span className="text-xs text-slate-500 mt-2">Upload Profile Photo</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className={labelClasses}>First Name</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="John"
                                    className={inputClasses}
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClasses}>Last Name</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className={inputClasses}
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className={labelClasses}>Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className={inputClasses}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className={labelClasses}>Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className={inputClasses}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClasses}>Phone Number</label>
                            <div className="relative group">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    className={inputClasses}
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClasses}>City</label>
                            <div className="relative group">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="San Francisco"
                                    className={inputClasses}
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClasses}>Country</label>
                            <div className="relative group">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="United States"
                                    className={inputClasses}
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className={labelClasses}>Additional Information</label>
                            <div className="relative group">
                                <Info className="absolute left-3 top-3 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <textarea
                                    placeholder="Tell us about your travel preferences..."
                                    rows={3}
                                    className={`${inputClasses} pl-10 pt-2.5 resize-none`}
                                    value={formData.additionalInfo}
                                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <UserPlus className="w-5 h-5" />
                        )}
                        {loading ? 'Registering...' : 'Register Now'}
                    </motion.button>
                </form>

                <div className="mt-8 text-center pt-6 border-t border-slate-700/50">
                    <p className="text-slate-400 text-sm font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="text-secondary hover:text-secondary-hover font-bold transition-colors inline-flex items-center gap-1">
                            <LogIn className="w-4 h-4" />
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </main>
    );
}
