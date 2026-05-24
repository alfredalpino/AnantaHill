'use client';

import CRMLogin from '@/components/admin/CRMLogin';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();

    const handleUnlock = () => {
        localStorage.setItem('ananta_admin_auth', 'true');
        document.cookie = "ananta_admin_session=true; path=/; max-age=86400; SameSite=Lax";
        router.push('/admin/dashboard');
    };

    return (
        <CRMLogin onUnlock={handleUnlock} />
    );
}
