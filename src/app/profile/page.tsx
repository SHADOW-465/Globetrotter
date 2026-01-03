"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Settings,
    Shield,
    Bell,
    Globe,
    LogOut,
    Edit3,
    MapPin,
    Calendar,
    Heart,
    Camera,
    ChevronRight
} from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="min-h-screen pb-20">
            {/* Profile Header */}
            <section className="h-[300px] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-20" />
                <div className="absolute inset-0 backdrop-blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-center">
                    <div className="relative group mb-4">
                        <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-950 flex items-center justify-center overflow-hidden">
                            <User className="w-16 h-16 text-slate-600" />
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white shadow-lg shadow-primary/20 hover:scale-110 transition-all">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <h1 className="text-3xl font-display font-black text-white">Showmik Rockstar</h1>
                    <p className="text-slate-400 font-medium">Digital Nomad | Travel Enthusiast</p>
                </div>
            </section>

            <main className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Settings */}
                <div className="space-y-4">
                    <button className="w-full flex items-center justify-between px-6 py-4 bg-primary/10 text-primary border border-primary/20 rounded-2xl font-bold transition-all">
                        <span className="flex items-center gap-3"><User className="w-5 h-5" /> Account</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    {[
                        { label: 'Security', icon: Shield },
                        { label: 'Notifications', icon: Bell },
                        { label: 'Preferences', icon: Globe },
                        { label: 'Saved Places', icon: Heart },
                    ].map((item) => (
                        <button key={item.label} className="w-full flex items-center justify-between px-6 py-4 bg-white/5 text-slate-400 border border-white/5 rounded-2xl font-bold hover:bg-white/10 hover:text-white transition-all">
                            <span className="flex items-center gap-3"><item.icon className="w-5 h-5" /> {item.label}</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    ))}
                    <button className="w-full flex items-center gap-3 px-6 py-4 text-secondary font-bold hover:bg-secondary/10 rounded-2xl transition-all mt-8">
                        <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 space-y-8">
                    <section className="glass-card p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-display font-bold">Personal Information</h3>
                            <button className="text-sm font-bold text-primary flex items-center gap-2 hover:underline">
                                <Edit3 className="w-4 h-4" /> Edit Profile
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Full Name</p>
                                <p className="text-slate-200 font-bold">Showmik Rockstar</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Email Address</p>
                                <p className="text-slate-200 font-bold">rockstar@example.com</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Location</p>
                                <p className="text-slate-200 font-bold">Dhaka, Bangladesh</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Phone</p>
                                <p className="text-slate-200 font-bold">+880 1234 56789</p>
                            </div>
                        </div>
                    </section>

                    <section className="glass-card p-8">
                        <h3 className="text-xl font-display font-bold mb-6">Travel Statistics</h3>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <p className="text-2xl font-display font-black text-primary">12</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Trips Done</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-display font-black text-secondary">24</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Countries</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-display font-black text-accent">152</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Activities</p>
                            </div>
                        </div>
                    </section>

                    <section className="glass-card p-8 bg-primary/5 border-primary/20">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/20 rounded-xl text-primary shrink-0">
                                <Globe className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-1">Language & Region</h4>
                                <p className="text-sm text-slate-400">English (US) - International Metric system</p>
                                <p className="text-xs text-slate-500 mt-2 italic">Updated 2 days ago</p>
                            </div>
                            <button className="ml-auto p-2 hover:bg-white/5 rounded-lg transition-all">
                                <ChevronRight className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
