'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Calendar, Star, MapPin, History, CreditCard, MessageSquare } from 'lucide-react';
import { Guest } from '@/data/crmData';

interface CRMGuestModalProps {
    guest: Guest | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function CRMGuestModal({ guest, isOpen, onClose }: CRMGuestModalProps) {
    if (!guest) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-accent/60 backdrop-blur-sm z-[150]"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 z-[151] flex items-center justify-center p-4 md:p-10 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-2xl border border-secondary overflow-hidden pointer-events-auto relative flex flex-col max-h-[90vh] shadow-luxury"
                        >
                            {/* Header / Banner */}
                            <div className="h-32 bg-primary/10 relative shrink-0">
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-10"
                                >
                                    <X className="w-5 h-5 text-text-primary" />
                                </button>

                                <div className="absolute -bottom-10 left-6 md:left-10">
                                    <div className="w-20 md:w-24 h-20 md:h-24 bg-white rounded-full p-1 border border-secondary">
                                        <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center text-primary-dark font-display text-2xl md:text-3xl font-bold border-2 border-primary/5">
                                            {guest.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 md:px-10 pt-14 pb-10 overflow-y-auto space-y-8 custom-scrollbar">
                                {/* Name & VIP Status */}
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary">{guest.name}</h2>
                                        <p className="text-sm text-text-muted flex items-center gap-2">
                                            <Mail className="w-4 h-4" /> {guest.email}
                                        </p>
                                    </div>
                                    {guest.isVIP && (
                                        <div className="flex items-center gap-2 bg-warning/10 text-warning px-4 py-1.5 rounded-lg border border-warning/20">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">VIP Member</span>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                    <div className="bg-secondary/20 p-3 md:p-4 rounded-xl text-center border border-secondary">
                                        <p className="text-[9px] md:text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">Total Stays</p>
                                        <p className="text-lg md:text-xl font-bold text-text-primary">{guest.totalStays}</p>
                                    </div>
                                    <div className="bg-secondary/20 p-3 md:p-4 rounded-xl text-center border border-secondary">
                                        <p className="text-[9px] md:text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">Rewards</p>
                                        <p className="text-lg md:text-xl font-bold text-primary-dark">{guest.totalStays * 500} pts</p>
                                    </div>
                                    <div className="bg-secondary/20 p-3 md:p-4 rounded-xl text-center border border-secondary col-span-2 md:col-span-1">
                                        <p className="text-[9px] md:text-[10px] text-text-muted font-bold uppercase tracking-widest mb-1">Last Stay</p>
                                        <p className="text-base md:text-lg font-bold text-text-primary">{guest.lastVisit.split('-')[1]}/{guest.lastVisit.split('-')[0].slice(2)}</p>
                                    </div>
                                </div>

                                {/* Visit History Mock */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold font-display flex items-center gap-2">
                                        <History className="w-5 h-5 text-primary-dark" /> Recent Visits
                                    </h3>
                                    <div className="space-y-3">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="flex items-center justify-between p-3 md:p-4 border border-secondary rounded-xl hover:bg-secondary/30 transition-colors">
                                                <div className="flex items-center gap-3 md:gap-4">
                                                    <div className="p-2 bg-secondary/50 rounded-lg">
                                                        <Calendar className="w-4 h-4 text-text-muted" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-text-primary">{i === 1 ? 'Luxury Villa' : 'Forest Villa'}</p>
                                                        <p className="text-[10px] text-text-muted font-bold uppercase">{i === 1 ? '2 Nights • May 2025' : '1 Night • Mar 2025'}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-sm font-bold text-primary">Confirmed</p>
                                                    <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">ID: BK-890{i}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Preferences / Notes */}
                                <div className="space-y-4">
                                    <h3 className="text-base md:text-lg font-bold font-display flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-primary-dark" /> Special Requests
                                    </h3>
                                    <div className="p-4 md:p-5 bg-secondary/20 rounded-xl border border-secondary">
                                        <p className="text-sm text-text-body leading-relaxed italic">
                                            "Prefers extra pillows and organic fruit basket on arrival. Always requests for a quiet room far from the banquet area."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-6 md:p-8 border-t border-secondary flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0 bg-secondary/10">
                                <button className="flex-1 btn-primary py-3 md:py-4 rounded-xl text-xs flex items-center justify-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> Send Message
                                </button>
                                <button className="flex-1 py-3 md:py-4 px-6 border border-secondary rounded-xl text-[10px] font-bold uppercase tracking-widest text-text-muted hover:bg-secondary transition-colors">
                                    Edit Profile
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
