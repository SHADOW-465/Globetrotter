"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    MapPin,
    Filter,
    Star,
    DollarSign,
    TrendingUp,
    Compass,
    Plus,
    Info,
    Map as MapIcon,
    ChevronRight,
    X
} from 'lucide-react';

const CATEGORIES = ['All', 'Sightseeing', 'Adventure', 'Food & Drink', 'Nature', 'Culture'];
const CITIES = [
    { id: 1, name: 'Tokyo', country: 'Japan', cost: 'High', rating: 4.9, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop', description: 'Experience the perfect blend of tradition and futurism.' },
    { id: 2, name: 'Rome', country: 'Italy', cost: 'Medium', rating: 4.8, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop', description: 'Explore the eternal city and its ancient history.' },
    { id: 3, name: 'Reykjavik', country: 'Iceland', cost: 'Very High', rating: 4.9, image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27947?q=80&w=800&auto=format&fit=crop', description: 'Discover natural wonders and the magic of the northern lights.' },
];

export default function SearchPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen pb-20">
            {/* Search Header */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-40 grayscale-[0.2]"
                        alt="Search background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
                </div>

                <div className="relative z-10 w-full max-w-3xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h1 className="text-5xl font-display font-black text-white tracking-tight">
                            Discover <span className="text-primary italic">Global</span> Wonders
                        </h1>
                        <div className="flex items-center gap-3 p-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl">
                            <div className="flex-1 relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Where do you want to go?"
                                    className="w-full bg-transparent border-none py-4 pl-14 pr-6 text-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all shadow-lg shadow-primary/30">
                                Explore
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
                {/* Filters Bar */}
                <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeCategory === cat
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-slate-400 hover:text-white font-bold transition-colors">
                            <Filter className="w-5 h-5" />
                            Advanced Filters
                        </button>
                        <div className="h-6 w-px bg-white/10" />
                        <button className="flex items-center gap-2 text-primary font-bold transition-colors">
                            <TrendingUp className="w-5 h-5" />
                            Popularity
                        </button>
                    </div>
                </div>

                {/* Search Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CITIES.map((city, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            key={city.id}
                            className="group glass-card overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={city.image}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={city.name}
                                />
                                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-white text-xs font-bold">{city.rating}</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md mb-1 block">Featured Stop</span>
                                    <h3 className="text-2xl font-display font-bold text-white leading-none">{city.name}</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                                    <MapPin className="w-4 h-4 text-secondary" />
                                    {city.country}
                                    <span className="mx-2">•</span>
                                    <DollarSign className="w-4 h-4 text-green-500" />
                                    {city.cost} Cost
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                                    {city.description}
                                </p>
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                        <Info className="w-4 h-4" />
                                        Details
                                    </button>
                                    <button className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/10">
                                        <Plus className="w-4 h-4" />
                                        Add Stop
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <section className="mt-20 glass-card p-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 relative overflow-hidden text-center">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Compass className="w-32 h-32 rotate-12" />
                    </div>
                    <h2 className="text-3xl font-display font-black mb-4">Can't decide where to go?</h2>
                    <p className="text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
                        Our AI-powered travel guide can suggest destinations based on your budget, interests, and past trips.
                    </p>
                    <button className="bg-white text-background px-10 py-4 rounded-2xl font-black flex items-center gap-3 mx-auto hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-xl">
                        <Sparkles className="w-5 h-5" />
                        Surprise Me
                    </button>
                </section>
            </main>
        </div>
    );
}

// Sub-components
function Sparkles({ className }: any) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    );
}
