'use client';

import {
    LayoutDashboard,
    CalendarCheck,
    BedDouble,
    BookOpen,
    Utensils,
    LogOut,
    Mail,
    UtensilsCrossed,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CRMSidebarProps {
    onLogout: () => void;
}

const navItems = [
    { id: 'overview', name: 'Overview', shortName: 'Overview', icon: LayoutDashboard },
    { id: 'table-reservations', name: 'Table Reservations', shortName: 'Tables', icon: UtensilsCrossed },
    { id: 'bookings', name: 'Bookings', shortName: 'Bookings', icon: CalendarCheck },
    { id: 'rooms', name: 'Rooms', shortName: 'Rooms', icon: BedDouble },
    { id: 'food-menu', name: 'Food Menu', shortName: 'Menu', icon: BookOpen },
    { id: 'orders', name: 'Food Orders', shortName: 'Orders', icon: Utensils },
    { id: 'enquiries', name: 'Enquiries', shortName: 'Enquiries', icon: Mail },
];

export default function CRMSidebar({ onLogout }: CRMSidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex w-[260px] h-screen bg-accent text-white flex-col fixed left-0 top-0 z-50 overflow-y-auto custom-scrollbar">
                <div className="p-7 border-b border-white/10 shrink-0">
                    <h2 className="text-lg font-bold tracking-[0.2em] uppercase text-white">Ananta Staff</h2>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const href = item.id === 'overview' ? '/admin/dashboard' : `/admin/dashboard/${item.id}`;
                        const isActive = pathname === href;

                        return (
                            <Link
                                key={item.id}
                                href={href}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group ${isActive
                                    ? 'bg-primary text-accent font-bold'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-white/40 group-hover:text-white'}`} />
                                <span className="text-sm">{item.name}</span>

                                {isActive && (
                                    <motion.div
                                        layoutId="activeSide"
                                        className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop Logout at bottom */}
                <div className="p-6 border-t border-white/10 mt-auto shrink-0">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 text-white/40 hover:text-error transition-all text-sm font-bold rounded-xl hover:bg-white/5 group"
                    >
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-accent text-white z-[100] border-t border-white/10 px-4 py-2 flex items-center justify-around pb-safe overflow-x-auto no-scrollbar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const href = item.id === 'overview' ? '/admin/dashboard' : `/admin/dashboard/${item.id}`;
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={item.id}
                            href={href}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all relative min-w-[60px] ${isActive ? 'text-primary' : 'text-white/40'}`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-white/40'}`} />
                            <span className="text-[9px] font-bold uppercase tracking-tighter whitespace-nowrap">{item.shortName}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeBottom"
                                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
