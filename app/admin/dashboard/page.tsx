'use client';

import { useState, useEffect } from 'react';
import CRMOverview from '@/components/admin/CRMOverview';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { bookings as mockBookings, foodOrders as mockOrders } from '@/data/crmData';

export default function AdminDashboardPage() {
    const [bookingsData, setBookingsData] = useState<Record<string, any>[]>([]);
    const [roomsData, setRoomsData] = useState<Record<string, any>[]>([]);
    const [foodOrdersData, setFoodOrdersData] = useState<Record<string, any>[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setBookingsData(mockBookings);
            setFoodOrdersData(mockOrders);
            setRoomsData([
                { id: '1', name: 'Luxury Villa' },
                { id: '2', name: 'Forest Villa' },
                { id: '3', name: 'Garden Suite' },
            ]);
        }, 800);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <CRMOverview 
                onTabChange={(tab) => {
                    router.push(tab === 'overview' ? '/admin/dashboard' : `/admin/dashboard/${tab}`);
                }} 
                bookings={bookingsData}
                foodOrders={foodOrdersData}
                rooms={roomsData}
            />
        </motion.div>
    );
}
