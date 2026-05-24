'use client';

import CRMSidebar from '@/components/admin/CRMSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import AuthGuard from '@/components/admin/AuthGuard';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('ananta_admin_auth');
        // Clear cookie
        document.cookie = "ananta_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.replace('/admin/login');
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-secondary/20 flex font-body">
                <CRMSidebar onLogout={handleLogout} />

                <main className="flex-1 lg:ml-[260px] p-4 md:px-10 space-y-6 md:space-y-10 pb-24 lg:pb-10 min-w-0">
                    <AdminHeader
                        isProfileOpen={isProfileOpen}
                        setIsProfileOpen={setIsProfileOpen}
                        onLogout={handleLogout}
                    />
                    {children}
                </main>
            </div>
        </AuthGuard>
    );
}
