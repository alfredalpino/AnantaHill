'use client';

import {
    Users,
    Mail,
    Calendar,
    Star,
    ShieldCheck,
    MoreVertical,
    Search,
    Download
} from 'lucide-react';
import { Guest } from '@/data/crmData';
import { motion } from 'framer-motion';
import { useState } from 'react';
import CRMGuestModal from './CRMGuestModal';

interface CRMGuestGridProps {
    guests: Guest[];
}

export default function CRMGuestGrid({ guests }: CRMGuestGridProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewProfile = (guest: Guest) => {
        setSelectedGuest(guest);
        setIsModalOpen(true);
    };

    const filteredGuests = guests.filter(g =>
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-4 md:p-8 rounded-xl border border-secondary shadow-premium">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold font-display text-text-primary">Guest Directory</h3>
                    <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase mt-1">Total {filteredGuests.length} Guests</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative min-w-[300px]">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="w-full pl-12 pr-6 py-3 bg-secondary/30 border border-secondary rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {filteredGuests.map((guest, i) => (
                    <motion.div
                        key={guest.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (i % 8) * 0.05 }}
                        className="bg-white p-6 md:p-8 rounded-xl border border-secondary hover:border-primary-dark/30 transition-all group relative shadow-premium"
                    >
                        <button className="absolute top-6 right-6 p-2 text-text-muted hover:bg-secondary/50 rounded-xl transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </button>

                        <div className="space-y-6 text-center">
                            <div className="relative inline-block">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary-dark font-display text-2xl font-bold border-2 border-primary/20">
                                    {guest.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {guest.isVIP && (
                                    <div className="absolute -bottom-1 -right-1 bg-warning text-white p-1.5 rounded-full border-4 border-white shadow-sm">
                                        <Star className="w-3 h-3 fill-current" />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-lg font-bold text-text-primary flex items-center justify-center gap-2">
                                    {guest.name}
                                    {guest.isVIP && (
                                        <span className="bg-warning/10 text-warning text-[9px] font-bold uppercase py-0.5 px-2 rounded-full border border-warning/20">VIP</span>
                                    )}
                                </h4>
                                <p className="text-xs text-text-muted font-medium flex items-center justify-center gap-1">
                                    <Mail className="w-3 h-3" /> {guest.email}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-secondary/50">
                                <div>
                                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">Total Stays</p>
                                    <p className="text-sm font-bold text-text-primary">{guest.totalStays}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">Last Visit</p>
                                    <p className="text-sm font-bold text-text-primary">{guest.lastVisit.split('-')[1]}/{guest.lastVisit.split('-')[0].slice(2)}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleViewProfile(guest)}
                                className="w-full py-3 rounded-2xl bg-secondary/30 text-[10px] font-bold text-text-muted hover:bg-primary hover:text-accent transition-all uppercase tracking-widest"
                            >
                                View Full Profile
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <CRMGuestModal
                guest={selectedGuest}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {filteredGuests.length === 0 && (
                <div className="bg-white p-20 rounded-[2rem] border border-secondary text-center space-y-4 shadow-premium">
                    <Users className="w-12 h-12 text-secondary-dark mx-auto" />
                    <p className="text-text-muted font-bold">No guests found matching your records.</p>
                </div>
            )}
        </div>
    );
}
