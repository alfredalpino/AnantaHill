export interface Room {
    id: string;
    name: string;
    price: number;
    guests: number;
    view?: string;
    description?: string;
    isAvailable?: boolean;
    image: string;
    images?: string[];
    category: string;
    totalRooms: number;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    isVeg: boolean;
    isAvailable?: boolean;
    image: string;
}

export interface Booking {
    id: string;
    dbId?: number;
    guestName: string;
    email: string;
    phone: string;
    room: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    amount: number;
    status: 'Pending' | 'Confirmed' | 'Cancelled';
}

export interface Hall {
    id: string;
    name: string;
    capacity: string;
    description: string;
    amenities: string[];
    images: string[];
    mainImage: string;
}
