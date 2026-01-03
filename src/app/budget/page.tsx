"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign,
    PieChart as PieChartIcon,
    BarChart as BarChartIcon,
    TrendingDown,
    TrendingUp,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    Plane,
    Home,
    Utensils,
    Ticket,
    ChevronLeft
} from 'lucide-react';

const BUDGET_DATA = [
    { name: 'Transport', amount: 850, color: 'bg-primary', icon: Plane, percentage: 35 },
    { name: 'Accommodation', amount: 1200, color: 'bg-accent', icon: Home, percentage: 48 },
    { name: 'Food & Dining', amount: 450, color: 'bg-secondary', icon: Utensils, percentage: 18 },
    { name: 'Activities', amount: 320, color: 'bg-green-500', icon: Ticket, percentage: 12 },
];

export default function BudgetPage() {
    const totalBudget = 5000;
    const totalSpent = BUDGET_DATA.reduce((acc, curr) => acc + curr.amount, 0);
    const remainingBudget = totalBudget - totalSpent;

    return (
        <div className="min-h-screen pb-24">
            {/* Header */}
            <nav className="glass-morphism sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-display font-bold">Financial Analytics</h1>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
                    <DollarSign className="w-5 h-5" />
                    Add Expense
                </button>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Summary Cards */}
                    <div className="glass-card p-8 border-l-4 border-l-primary relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Wallet className="w-24 h-24" />
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Total Budget</p>
                        <h2 className="text-4xl font-display font-black text-white">$5,000.00</h2>
                        <div className="mt-4 flex items-center gap-2 text-primary font-bold text-sm">
                            <ArrowUpRight className="w-4 h-4" />
                            +5% from last trip
                        </div>
                    </div>

                    <div className="glass-card p-8 border-l-4 border-l-secondary relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <TrendingDown className="w-24 h-24" />
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Total Expended</p>
                        <h2 className="text-4xl font-display font-black text-white">${totalSpent.toLocaleString()}</h2>
                        <div className="mt-4 flex items-center gap-2 text-secondary font-bold text-sm">
                            <BarChartIcon className="w-4 h-4" />
                            On track with planning
                        </div>
                    </div>

                    <div className="glass-card p-8 border-l-4 border-l-green-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <DollarSign className="w-24 h-24" />
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Remaining</p>
                        <h2 className="text-4xl font-display font-black text-white">${remainingBudget.toLocaleString()}</h2>
                        <div className="mt-4 flex items-center gap-2 text-green-500 font-bold text-sm">
                            <CheckCircle2 className="w-4 h-4" />
                            Under budget by 12%
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="glass-card p-8">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                                    <PieChartIcon className="w-6 h-6 text-primary" />
                                    Category Breakdown
                                </h3>
                                <div className="flex items-center gap-2 bg-slate-800/50 p-1 rounded-lg">
                                    <button className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-md">Chart</button>
                                    <button className="px-4 py-1.5 text-slate-400 text-xs font-bold rounded-md hover:text-white">Table</button>
                                </div>
                            </div>

                            {/* Visualized Breakdown (Manual implementation of a pie/bar hybrid) */}
                            <div className="space-y-10">
                                <div className="flex h-12 w-full rounded-2xl overflow-hidden shadow-2xl">
                                    {BUDGET_DATA.map((item) => (
                                        <div
                                            key={item.name}
                                            className={`${item.color} h-full transition-all hover:opacity-80 cursor-help relative group`}
                                            style={{ width: `${item.percentage}%` }}
                                        >
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                                                <div className="bg-slate-900 border border-white/10 px-3 py-1.5 rounded-lg whitespace-nowrap">
                                                    <p className="text-xs font-bold text-white">{item.name}: ${item.amount}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {BUDGET_DATA.map((item) => (
                                        <div key={item.name} className="flex items-center gap-4 group">
                                            <div className={`w-12 h-12 rounded-xl ${item.color}/10 flex items-center justify-center ${item.color.replace('bg-', 'text-')}`}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-bold text-slate-300">{item.name}</span>
                                                    <span className="text-sm font-display font-black">${item.amount}</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${item.percentage}%` }}
                                                        transition={{ duration: 1, ease: 'easeOut' }}
                                                        className={`h-full ${item.color}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="glass-card p-8">
                            <h3 className="text-2xl font-display font-bold flex items-center gap-3 mb-8">
                                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                                Budget Insights
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex gap-4">
                                    <div className="shrink-0 p-2 bg-yellow-500/20 rounded-lg">
                                        <TrendingUp className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-yellow-500">Accommodation is 12% higher than average</p>
                                        <p className="text-xs text-slate-400 mt-1">Consider looking at boutique hostels or Airbnb options in Rome to reduce costs by approximately $150.</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex gap-4">
                                    <div className="shrink-0 p-2 bg-green-500/20 rounded-lg">
                                        <DollarSign className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-green-500">Early booking saved you $240 on flights</p>
                                        <p className="text-xs text-slate-400 mt-1">Great job! Booking 3 months in advance for the Paris-Rome leg was a smart move.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Daily Average */}
                    <div className="space-y-8">
                        <section className="glass-card p-8 text-center bg-gradient-to-br from-primary/20 to-accent/10">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Daily Average</p>
                            <div className="relative inline-block mb-4">
                                <div className="w-40 h-40 rounded-full border-8 border-slate-800 flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-3xl font-display font-black text-white">$235</p>
                                        <p className="text-[10px] font-bold text-slate-400">PER DAY</p>
                                    </div>
                                </div>
                                <svg className="absolute top-0 left-0 w-40 h-40 -rotate-90">
                                    <circle
                                        cx="80" cy="80" r="72"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        strokeDasharray="452.39"
                                        strokeDashoffset="120"
                                        className="text-primary"
                                    />
                                </svg>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed px-4">
                                Your estimated daily spend based on the current itinerary is below your $300 target.
                            </p>
                        </section>

                        <section className="glass-card p-8">
                            <h3 className="text-lg font-display font-bold mb-6">Recent Expenses</h3>
                            <div className="space-y-6">
                                {[
                                    { name: 'Dinner at Le Petit', cost: 85, date: 'Today' },
                                    { name: 'Train to Rome', cost: 120, date: 'Yesterday' },
                                    { name: 'Museum Pass', cost: 45, date: '2 days ago' }
                                ].map((exp, i) => (
                                    <div key={i} className="flex justify-between items-center group cursor-pointer">
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{exp.name}</p>
                                            <p className="text-[10px] text-slate-500">{exp.date}</p>
                                        </div>
                                        <span className="text-sm font-black text-slate-300">-${exp.cost}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-400 transition-all">
                                Export Statement (PDF)
                            </button>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Re-using local Link/CheckCircle2 if not global
function Link({ href, children, className }: any) {
    return <a href={href} className={className}>{children}</a>;
}
function CheckCircle2({ className }: any) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
