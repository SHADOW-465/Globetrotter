"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    MapPin,
    Calendar,
    DollarSign,
    Trash2,
    Activity as ActivityIcon,
    ChevronDown,
    ChevronUp,
    Save,
    Share2,
    Clock,
    MoreVertical,
    GripVertical,
    ChevronLeft,
    X,
    Loader2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ItineraryBuilderPage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [trip, setTrip] = useState<any>(null);
    const [stops, setStops] = useState<any[]>([]);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (!session) {
                router.push('/login');
            } else {
                fetchTrip(session.access_token);
            }
        });
    }, [id, router]);

    const fetchTrip = async (token: string) => {
        try {
            const response = await fetch(`/api/trips/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setTrip(data.trip);
            setStops(data.trip.stops);
        } catch (err) {
            console.error(err);
            router.push('/');
        } finally {
            setLoading(false);
        }
    };

    const addStop = () => {
        const newStop: any = {
            id: `temp-${Math.random().toString(36).substr(2, 9)}`,
            city: 'New Destination',
            startDate: trip.startDate,
            endDate: trip.endDate,
            activities: []
        };
        setStops([...stops, newStop]);
    };

    const removeStop = (stopId: string) => {
        setStops(stops.filter(s => s.id !== stopId));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Implementation for saving trip updates would go here
            // For now, just a simulate
            await new Promise(r => setTimeout(r, 1000));
            router.push('/');
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen pb-24 bg-slate-950 text-slate-200">
            {/* Tool Bar */}
            <nav className="glass-morphism sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                        <ChevronLeft className="w-6 h-6 text-slate-400 hover:text-white" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-display font-bold text-white">{trip.name}</h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Itinerary Planner</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white transition-all">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Changes
                    </button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-4xl font-display font-black text-white mb-2">Trip Timeline</h2>
                        <p className="text-slate-400 font-medium">Customize your journey and activities</p>
                    </div>
                    <button
                        onClick={addStop}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-primary/10 border border-white/10 rounded-2xl text-primary font-bold transition-all shadow-xl"
                    >
                        <Plus className="w-5 h-5" />
                        Add Destination
                    </button>
                </div>

                <div className="space-y-10 relative">
                    {/* Vertical line connector */}
                    <div className="absolute left-[27px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary opacity-20" />

                    <AnimatePresence>
                        {stops.map((stop, index) => (
                            <motion.section
                                key={stop.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative pl-14"
                            >
                                {/* Stop Marker */}
                                <div className="absolute left-0 top-1 w-14 h-14 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border-2 border-primary/30 flex items-center justify-center text-primary font-black shadow-lg shadow-primary/10 transition-all group-hover:border-primary">
                                        {index + 1}
                                    </div>
                                </div>

                                <div className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/5 hover:bg-white/[0.07] transition-all">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <MapPin className="w-6 h-6 text-primary" />
                                                <input
                                                    type="text"
                                                    value={stop.city}
                                                    className="text-2xl font-display font-bold bg-transparent border-none text-white focus:outline-none focus:ring-0 w-full"
                                                    onChange={(e) => {
                                                        const newStops = [...stops];
                                                        newStops[index].city = e.target.value;
                                                        setStops(newStops);
                                                    }}
                                                />
                                            </div>
                                            <div className="flex flex-wrap items-center gap-6">
                                                <div className="flex items-center gap-2 text-slate-400 text-sm font-bold bg-white/5 px-3 py-1.5 rounded-xl">
                                                    <Calendar className="w-4 h-4 text-accent" />
                                                    {new Date(stop.startDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2.5 bg-slate-900 border border-white/5 text-slate-500 hover:text-white rounded-xl transition-colors">
                                                <GripVertical className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => removeStop(stop.id)}
                                                className="p-2.5 bg-red-400/10 border border-red-400/20 text-red-400 hover:bg-red-400 hover:text-white rounded-xl transition-all"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Activities list */}
                                        <div className="space-y-4">
                                            {stop.activities?.map((act: any, aIdx: number) => (
                                                <div key={aIdx} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-white/5 group/act hover:border-primary/20 transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                            <ActivityIcon className="w-5 h-5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-100">{act.name}</p>
                                                            <div className="flex items-center gap-3 mt-1">
                                                                <p className="text-[10px] text-slate-500 flex items-center gap-1 uppercase font-bold tracking-widest">
                                                                    <Clock className="w-3 h-3 text-accent" /> {act.time}
                                                                </p>
                                                                {act.cost > 0 && (
                                                                    <p className="text-[10px] text-green-400 flex items-center gap-1 uppercase font-bold tracking-widest">
                                                                        <DollarSign className="w-3 h-3" /> {act.cost}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="opacity-0 group-hover/act:opacity-100 p-2 text-slate-500 hover:text-red-400 transition-all">
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}

                                            <button className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl text-xs font-bold text-slate-500 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                                                <Plus className="w-5 h-5" />
                                                Add Activity
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Global Stats Footer */}
                <div className="mt-16 glass-card p-10 rounded-[2.5rem] border-t-4 border-t-primary shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <TrendingUp className="w-32 h-32 text-primary" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                        <div className="space-y-2 text-center md:text-left">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Estimated Budget</p>
                            <p className="text-4xl font-display font-black text-white">
                                ${stops.reduce((acc, stop) => acc + (stop.activities?.reduce((s: number, a: any) => s + (a.cost || 0), 0) || 0), 0)}
                            </p>
                        </div>
                        <div className="space-y-2 text-center md:text-left">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Trip Duration</p>
                            <p className="text-4xl font-display font-black text-white">
                                {Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 3600 * 24)) + 1} Days
                            </p>
                        </div>
                        <div className="space-y-2 text-center md:text-left">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Total Destinations</p>
                            <p className="text-4xl font-display font-black text-white">{stops.length}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
