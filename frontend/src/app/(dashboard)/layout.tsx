'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import {
    LayoutDashboard,
    Brain,
    History,
    User,
    LogOut,
    Shield
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!mounted || !isAuthenticated) {
        return null; // Or a loading spinner
    }

    const sidebarLinks = [
        { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/dashboard/tests', label: 'Take IQ Test', icon: Brain },
        { href: '/dashboard/results', label: 'My Results', icon: History },
        { href: '/dashboard/profile', label: 'Profile', icon: User },
    ];

    const adminLinks = [
        { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/admin/users', label: 'Users', icon: User },
        { href: '/admin/tests', label: 'Tests', icon: Brain },
    ];

    const links = user?.role === 'admin' ? adminLinks : sidebarLinks;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:flex flex-col fixed h-full z-20">
                <div className="h-16 flex items-center px-6 border-b">
                    <Link href="/" className="flex items-center gap-2">
                        <Shield className="h-8 w-8 text-blue-600" />
                        <span className="font-bold text-lg text-gray-900">Defense Coach</span>
                    </Link>
                </div>

                <div className="p-4 flex-grow">
                    <div className="space-y-1">
                        {links.map((link) => (
                            <Link key={link.href} href={link.href}>
                                <Button
                                    variant={pathname === link.href ? 'secondary' : 'ghost'}
                                    className="w-full justify-start gap-3 mb-1"
                                >
                                    <link.icon className="h-5 w-5" />
                                    {link.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.username}</p>
                            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full justify-start gap-3"
                        onClick={() => {
                            logout();
                            router.push('/login');
                        }}
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
