import { Booking } from '@/types';

export interface Guest {
    id: string;
    name: string;
    email: string;
    totalStays: number;
    lastVisit: string;
    isVIP: boolean;
}

export interface FoodOrder {
    id: string;
    roomNo: string;
    items: string;
    total: number;
    time: string;
    status: 'Preparing' | 'Delivered' | 'Pending' | 'Cancelled';
}

export interface Enquiry {
    id: string;
    guestName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    date: string;
    status: 'New' | 'Replied' | 'Closed';
}

export const enquiries: Enquiry[] = [
    { id: 'ENQ-201', guestName: 'Suresh Raina', email: 'suresh@example.com', phone: '9888877777', subject: 'Wedding Hall enquiry', message: 'I am looking for a hall for 500 guests for November.', date: '2026-03-22', status: 'New' },
    { id: 'ENQ-202', guestName: 'Anita Desai', email: 'anita@example.com', phone: '9877766666', subject: 'Corporate Event', message: 'Booking for 50 people for a corporate retreat.', date: '2026-03-21', status: 'Replied' },
    { id: 'ENQ-203', guestName: 'Rahul Dravid', email: 'rahul@example.com', phone: '9866655555', subject: 'Birthday Party', message: 'Small gathering for birthday celebration.', date: '2026-03-20', status: 'Closed' },
];

export const guests: Guest[] = [
    { id: 'G-101', name: 'Arjun Sharma', email: 'arjun@example.com', totalStays: 4, lastVisit: '2026-03-10', isVIP: true },
    { id: 'G-102', name: 'Priya Verma', email: 'priya@example.com', totalStays: 1, lastVisit: '2026-03-15', isVIP: false },
    { id: 'G-103', name: 'Rohan Gupta', email: 'rohan@example.com', totalStays: 2, lastVisit: '2026-03-20', isVIP: false },
    { id: 'G-104', name: 'Ananya Iyer', email: 'ananya@example.com', totalStays: 5, lastVisit: '2026-04-02', isVIP: true },
    { id: 'G-105', name: 'Vikram Singh', email: 'vikram@example.com', totalStays: 1, lastVisit: '2026-04-10', isVIP: false },
    { id: 'G-106', name: 'Sanya Malhotra', email: 'sanya@example.com', totalStays: 3, lastVisit: '2026-04-15', isVIP: true },
    { id: 'G-107', name: 'Kabir Das', email: 'kabir@example.com', totalStays: 1, lastVisit: '2026-05-01', isVIP: false },
    { id: 'G-108', name: 'Meera Reddy', email: 'meera@example.com', totalStays: 2, lastVisit: '2026-05-10', isVIP: false },
];

export const foodOrders: FoodOrder[] = [
    { id: 'ORD-501', roomNo: '102', items: 'Farm Omelette, Fresh Juice', total: 850, time: '10 mins ago', status: 'Preparing' },
    { id: 'ORD-502', roomNo: '205', items: 'Organic Thali', total: 1200, time: '25 mins ago', status: 'Delivered' },
    { id: 'ORD-503', roomNo: '301', items: 'Sandwich, Coffee', total: 650, time: '45 mins ago', status: 'Pending' },
    { id: 'ORD-504', roomNo: '108', items: 'Fruit Bowl, Tea', total: 550, time: '1 hour ago', status: 'Delivered' },
    { id: 'ORD-505', roomNo: '202', items: 'Pasta, Garlic Bread', total: 950, time: '2 hours ago', status: 'Delivered' },
    { id: 'ORD-506', roomNo: '105', items: 'Burger, Fries', total: 750, time: '3 hours ago', status: 'Delivered' },
];

export const bookings: Booking[] = [
    { id: 'BK-1001', guestName: 'Arjun Sharma', email: 'arjun@example.com', phone: '9876543210', room: 'Luxury Villa', checkIn: '2026-03-22', checkOut: '2026-03-24', guests: 2, amount: 24000, status: 'Confirmed' },
    { id: 'BK-1002', guestName: 'Priya Verma', email: 'priya@example.com', phone: '9876543211', room: 'Forest Villa', checkIn: '2026-03-25', checkOut: '2026-03-27', guests: 2, amount: 18000, status: 'Confirmed' },
    { id: 'BK-1003', guestName: 'Rohan Gupta', email: 'rohan@example.com', phone: '9876543212', room: 'Garden Suite', checkIn: '2026-03-28', checkOut: '2026-03-30', guests: 3, amount: 21000, status: 'Pending' }
];
