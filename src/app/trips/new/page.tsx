"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    Calendar as CalendarIcon,
    ArrowRight,
    Sparkles,
    X,
    ChevronLeft,
    Camera,
    Compass,
    Loader2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function NewTripPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [aiGenerating, setAiGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [itinerary, setItinerary] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        place: '',
        startDate: '',
        endDate: '',
        description: '',
        coverPhoto: null as string | null
    });

    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (!session) {
                router.push('/login?message=Please log in to plan a trip');
            }
        });
    }, [router]);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const calculateDays = () => {
        if (!formData.startDate || !formData.endDate) return 0;
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        const diff = end.getTime() - start.getTime();
        return Math.ceil(diff / (1000 * 3600 * 24)) + 1;
    };

    const generateAIItinerary = async () => {
        setAiGenerating(true);
        setError(null);
        try {
            const response = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    destination: formData.place,
                    days: calculateDays(),
                    preferences: formData.description
                }),
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setItinerary(data.itinerary);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setAiGenerating(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({
                    ...formData,
                    itinerary
                }),
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            router.push(`/trips/${data.trip.id}/itinerary`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!session) return null;

    return (
        <main className="min-h-screen py-12 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
                <button onClick={() => router.push('/')} className="text-slate-400 hover:text-white transition-colors">
                    <X className="w-8 h-8" />
                </button>
            </div>

            <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] bg-accent/20 blur-[100px] rounded-full animate-pulse delay-1000" />

            <motion.div
                layout
                className="w-full max-w-2xl glass-card p-8 z-10"
            >
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-2">
                        <Compass className="w-4 h-4" />
                        New Adventure
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white mb-2">Plan a New Trip</h1>
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                            {error}
                        </div>
                    )}
                    <div className="flex gap-2">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-primary shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`} />
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 ml-1">Trip Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Summer in Europe"
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl py-4 px-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all text-lg font-medium"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 ml-1">Main Destination</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Search for a city or country..."
                                            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all text-lg font-medium"
                                            value={formData.place}
                                            onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!formData.name || !formData.place}
                                        className="w-full bg-white text-background font-black py-4 rounded-2xl flex items-center justify-center gap-2 group hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-background"
                                    >
                                        Next Step
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-300 ml-1">Start Date</label>
                                        <div className="relative group">
                                            <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="date"
                                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl py-4 pl-12 pr-6 text-white appearance-none focus:outline-none focus:border-primary transition-all"
                                                value={formData.startDate}
                                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-300 ml-1">End Date</label>
                                        <div className="relative group">
                                            <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="date"
                                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl py-4 pl-12 pr-6 text-white appearance-none focus:outline-none focus:border-primary transition-all"
                                                value={formData.endDate}
                                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 ml-1">Trip Description (AI will use this)</label>
                                    <textarea
                                        placeholder="What are your goals for this trip? (e.g. Focus on food, budget-friendly, luxury...)"
                                        rows={4}
                                        className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl py-4 px-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all resize-none font-medium"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex-1 bg-slate-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-700 transition-all"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            await generateAIItinerary();
                                            nextStep();
                                        }}
                                        disabled={!formData.startDate || !formData.endDate || aiGenerating}
                                        className="flex-[2] bg-white text-background font-black py-4 rounded-2xl flex items-center justify-center gap-2 group hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                                    >
                                        {aiGenerating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Generating AI Plan...
                                            </>
                                        ) : (
                                            <>
                                                Continue
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold text-slate-300 ml-1">Generated Itinerary Preview</label>
                                    <div className="max-h-64 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                        {itinerary.map((day, idx) => (
                                            <div key={idx} className="glass-card p-4 border-white/5">
                                                <p className="text-primary font-bold mb-2">Day {day.day}</p>
                                                <div className="space-y-2">
                                                    {day.activities.map((act: any, aIdx: number) => (
                                                        <div key={aIdx} className="text-xs text-slate-400 flex justify-between">
                                                            <span>• {act.name}</span>
                                                            <span className="text-slate-500">{act.time}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="glass-card p-6 border-primary/20 bg-primary/5">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-primary/20 rounded-lg shrink-0">
                                            <Sparkles className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-primary mb-1">AI Recommendation Ready</p>
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                We've generated a {calculateDays()}-day plan for {formData.place}. You can customize this in the next step.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex-1 bg-slate-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-700 transition-all font-display"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-[2] bg-gradient-to-r from-primary to-accent text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 group shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all font-display"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                        )}
                                        {loading ? 'Launching...' : 'Launch Adventure'}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </motion.div>
        </main>
    );
}
