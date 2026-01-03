"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Map as MapIcon,
    TrendingUp,
    Activity,
    Globe,
    ArrowUp,
    ArrowDown,
    ChevronRight,
    UserCheck,
    PlaneTakeoff,
    BarChart3,
    Moon,
    Sun
} from 'lucide-react';

const STATS = [
    { label: 'Total Users', value: '1,248', trend: '+12%', icon: Users, color: 'text-primary' },
    { label: 'Active Trips', value: '3,842', trend: '+8%', icon: PlaneTakeoff, color: 'text-secondary' },
    { label: 'Top Destination', value: 'Kyoto', trend: 'Constant', icon: Globe, color: 'text-accent' },
    { label: 'Avg. Budget', value: '$2,450', trend: '-2%', icon: TrendingUp, color: 'text-green-500' },
];

const RECENT_TRIPS = [
    { id: 1, user: 'Alex Rivera', destination: 'Tokyo, Japan', status: 'Published', date: '5 mins ago' },
    { id: 2, user: 'Sarah Chen', destination: 'Rome, Italy', status: 'Draft', date: '12 mins ago' },
    { id: 3, user: 'Marc Dubois', destination: 'Paris, France', status: 'Published', date: '1 hour ago' },
];

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-slate-900/50 backdrop-blur-xl p-6 hidden lg:block">
                <h1 className="text-xl font-display font-bold mb-10">Admin<span className="text-primary">Panel</span></h1>
                <nav className="space-y-4">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl font-bold text-sm">
                        <BarChart3 className="w-5 h-5" /> Dashboard
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl text-sm transition-all">
                        <Users className="w-5 h-5" /> User Management
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl text-sm transition-all">
                        <Globe className="w-5 h-5" /> Destinations
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl text-sm transition-all">
                        <Activity className="w-5 h-5" /> Analytics
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-display font-black text-white">Platform Health</h2>
                        <p className="text-slate-500 text-sm font-medium">Real-time overview of Globetrotter activity</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex bg-slate-900 border border-white/10 rounded-xl p-1">
                            <button className="px-3 py-1.5 bg-slate-800 text-white rounded-lg"><Sun className="w-4 h-4" /></button>
                            <button className="px-3 py-1.5 text-slate-500 hover:text-white rounded-lg"><Moon className="w-4 h-4" /></button>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30" />
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {STATS.map((stat) => (
                        <motion.div
                            whileHover={{ y: -5 }}
                            key={stat.label}
                            className="glass-card p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-black ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-secondary'}`}>
                                    {stat.trend} {stat.trend.startsWith('+') ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                </div>
                            </div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-display font-black text-white mt-1">{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Analytics Chart Area */}
                    <section className="lg:col-span-2 glass-card p-8 bg-slate-900/40">
                        <h3 className="text-xl font-display font-bold mb-8">User Engagement Trends</h3>
                        <div className="h-[300px] w-full border-b border-l border-white/5 flex items-end gap-2 px-2 pb-2">
                            {[60, 45, 75, 55, 90, 80, 70, 85, 95, 65, 50, 80].map((val, i) => (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    transition={{ delay: i * 0.05, duration: 1 }}
                                    key={i}
                                    className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-t-sm hover:from-primary/40 hover:to-white transition-all cursor-help"
                                />
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-slate-600 uppercase">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                        </div>
                    </section>

                    {/* Activity Feed */}
                    <section className="glass-card p-8 flex flex-col">
                        <h3 className="text-xl font-display font-bold mb-6">Recent Trip Activity</h3>
                        <div className="space-y-6 flex-1">
                            {RECENT_TRIPS.map((trip) => (
                                <div key={trip.id} className="flex gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                                        <UserCheck className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <div className="flex-1 border-b border-white/5 pb-4 last:border-none">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-bold text-slate-200 group-hover:text-primary transition-colors">{trip.user}</p>
                                            <span className="text-[10px] text-slate-600 font-medium">{trip.date}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">{trip.destination}</p>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase mt-2 inline-block ${trip.status === 'Published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                            {trip.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-400 transition-all flex items-center justify-center gap-2">
                            View All Logs <ChevronRight className="w-4 h-4" />
                        </button>
                    </section>
                </div>
            </main>
        </div>
    );
}
