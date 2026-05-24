'use client';

import {
    Users,
    CalendarCheck,
    Utensils,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CRMOverviewProps {
    onTabChange: (tab: string) => void;
    bookings?: any[];
    foodOrders?: any[];
    rooms?: any[];
    tableReservations?: any[];
}

export default function CRMOverview({ onTabChange, bookings = [], foodOrders = [], rooms = [], tableReservations = [] }: CRMOverviewProps) {
    const kpis = [
        { name: 'Total Bookings', value: bookings.length.toString(), icon: CalendarCheck, change: '+12%', isUp: true, tab: 'bookings' },
        { name: 'Active Rooms', value: rooms.length.toString(), icon: Users, change: 'Live', isUp: true, tab: 'rooms' },
        { name: 'Pending Orders', value: foodOrders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length.toString(), icon: Utensils, change: 'New', isUp: true, tab: 'orders' },
    ];

    const recentActivities = bookings.slice(0, 5).map(b => {
        return {
            title: `New Booking • ${b.guestName}`,
            desc: `${b.room} - ${b.status}`,
            time: b.checkIn,
            type: 'booking'
        };
    });

    return (
        <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {kpis.map((kpi, i) => {
                    const Icon = kpi.icon;

                    return (
                        <motion.button
                            key={kpi.name}
                            onClick={() => onTabChange(kpi.tab)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white p-6 rounded-xl border border-secondary transition-all text-left hover:border-primary-dark/30 group shadow-premium"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-secondary/50 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${kpi.isUp ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                                    }`}>
                                    {kpi.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    {kpi.change}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">{kpi.name}</p>
                                <h3 className="text-2xl font-bold text-text-primary font-sans">{kpi.value}</h3>
                                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-2 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                    View Details <ArrowUpRight className="w-2.5 h-2.5" />
                                </p>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-secondary overflow-hidden shadow-premium">
                <div className="p-6 border-b border-secondary flex items-center justify-between">
                    <h3 className="text-xl font-bold font-display text-text-primary">Recent Activity</h3>
                    <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline" onClick={() => onTabChange('bookings')}>
                        View All logs
                    </button>
                </div>
                <div className="divide-y divide-secondary/50">
                    {recentActivities.length > 0 ? recentActivities.map((act: any, i: number) => (
                        <div key={i} className="p-6 flex items-start gap-6 hover:bg-secondary/10 transition-colors">
                            <div className={`mt-1 w-3 h-3 rounded-full shrink-0 ${act.type === 'booking' ? 'bg-primary' :
                                act.type === 'food' ? 'bg-success' :
                                    act.type === 'status' ? 'bg-warning' :
                                        'bg-primary'
                                }`} />
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-bold text-text-primary">{act.title}</p>
                                <p className="text-xs text-text-muted leading-tight">{act.desc}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">{act.time}</p>
                            </div>
                        </div>
                    )) : (
                        <div className="p-10 text-center text-text-muted text-sm font-medium">
                            No recent activity found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
