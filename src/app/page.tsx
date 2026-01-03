"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  MapPin,
  Calendar,
  ChevronRight,
  Filter,
  Grid,
  List,
  TrendingUp,
  Clock,
  CheckCircle2,
  Bell,
  LogOut,
  Loader2,
  Compass
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        router.push('/login');
      } else {
        fetchTrips(session.access_token);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) router.push('/login');
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const fetchTrips = async (token: string) => {
    try {
      const response = await fetch('/api/trips/fetch', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setTrips(data.trips || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const filteredTrips = trips.filter(trip =>
    trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingTrips = filteredTrips.filter(t => new Date(t.startDate) > new Date());
  const ongoingTrips = filteredTrips.filter(t => new Date(t.startDate) <= new Date() && new Date(t.endDate) >= new Date());
  const completedTrips = filteredTrips.filter(t => new Date(t.endDate) < new Date());

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen pb-20 bg-background text-slate-200">
      {/* Header / Navbar */}
      <nav className="glass-morphism sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-xl">
        <h1 className="text-2xl font-display font-bold tracking-tight text-white">
          Globe<span className="text-primary">Trotter</span>
        </h1>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors relative p-2 rounded-xl hover:bg-white/5">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-slate-900" />
          </button>

          <div className="h-6 w-[1px] bg-white/10 mx-2" />

          <div className="flex items-center gap-3 group cursor-pointer p-1 pr-3 rounded-full hover:bg-white/5 transition-all">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20">
              {session?.user?.email?.[0].toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors hidden md:block">
              {session?.user?.user_metadata?.first_name || 'Explorer'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-xl hover:bg-red-400/10"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden h-[450px] group shadow-2xl border border-white/5">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
            alt="Travel Banner"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
                Where to next, <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic">Explorer?</span>
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-4 max-w-3xl">
                <div className="relative flex-1 w-full group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Search your adventures..."
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="w-full md:w-auto bg-white text-slate-950 p-5 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xl font-bold gap-2">
                  <Filter className="w-5 h-5" />
                  <span className="md:hidden">Filters</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Left Controls/Stats */}
        <aside className="lg:col-span-1 space-y-6">
          <Link href="/trips/new" className="block group">
            <div className="glass-card p-6 h-40 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/10 group-hover:border-primary group-hover:bg-primary/5 transition-all rounded-3xl">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-lg shadow-primary/10">
                <Plus className="w-8 h-8" />
              </div>
              <span className="font-bold text-slate-200 text-lg">Plan New Trip</span>
            </div>
          </Link>

          <div className="glass-card p-6 rounded-3xl space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Quick Stats
            </h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
                <span className="text-slate-400 text-sm">Ongoing</span>
                <span className="text-lg font-bold text-primary">{ongoingTrips.length}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
                <span className="text-slate-400 text-sm">Upcoming</span>
                <span className="text-lg font-bold text-accent">{upcomingTrips.length}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-between">
                <span className="text-slate-400 text-sm">Completed</span>
                <span className="text-lg font-bold text-secondary">{completedTrips.length}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-3 space-y-12">

          {/* Ongoing Trips */}
          {ongoingTrips.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-display font-black flex items-center gap-3 text-white">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  Ongoing Adventures
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {ongoingTrips.map(trip => (
                  <TripCard key={trip.id} trip={trip} isActive />
                ))}
              </div>
            </section>
          )}

          {/* Planned Trips */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-display font-black flex items-center gap-3 text-white">
                <Compass className="w-6 h-6 text-accent" />
                Planned Journeys
              </h3>
            </div>
            {upcomingTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingTrips.map(trip => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">No upcoming trips yet. Start planning one!</p>
              </div>
            )}
          </section>

          {/* Past Trips */}
          {completedTrips.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-display font-black flex items-center gap-3 text-white">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                  Past Expeditions
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {completedTrips.map(trip => (
                  <TripCardSmall key={trip.id} trip={trip} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function TripCard({ trip, isActive = false }: { trip: any; isActive?: boolean }) {
  return (
    <Link href={`/trips/${trip.id}/itinerary`}>
      <div className={`glass-card overflow-hidden group hover:border-primary/40 transition-all rounded-[2rem] border border-white/5 ${isActive ? 'bg-primary/5 ring-1 ring-primary/20' : ''}`}>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 h-64 md:h-auto overflow-hidden relative">
            <img
              src={trip.coverImage || `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
              alt={trip.name}
            />
            {isActive && (
              <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                Active
              </div>
            )}
          </div>
          <div className="p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors">{trip.name}</h4>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-400 capitalize">
                    {new Date(trip.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                {trip.description || "No description provided."}
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300">
                  <MapPin className="w-4 h-4 text-primary" />
                  {trip.stops.length} Stops
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300">
                  <Calendar className="w-4 h-4 text-accent" />
                  {Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 3600 * 24)) + 1} Days
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-primary font-bold text-sm flex items-center gap-2">
                Open Itinerary <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover opacity-50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function TripCardSmall({ trip }: { trip: any }) {
  return (
    <Link href={`/trips/${trip.id}/itinerary`}>
      <div className="glass-card p-5 group hover:border-secondary/40 transition-all rounded-[1.5rem] border border-white/5 bg-white/5">
        <div className="relative h-32 rounded-2xl overflow-hidden mb-4">
          <img src={trip.coverImage || `https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop`} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" alt={trip.name} />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
        </div>
        <h5 className="font-bold text-white mb-1 truncate">{trip.name}</h5>
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <span>{new Date(trip.startDate).getFullYear()}</span>
          <span>{trip.stops.length} Stops</span>
        </div>
      </div>
    </Link>
  );
}
