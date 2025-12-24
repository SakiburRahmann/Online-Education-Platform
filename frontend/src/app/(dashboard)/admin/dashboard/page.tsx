'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, AlertCircle, TrendingUp, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '@/lib/api';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [slowLoadId, setSlowLoadId] = useState<string | number | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const timer = setTimeout(() => {
                const id = toast.info('Admin dashboard is loading...', {
                    description: 'Our backend might be waking up from sleep. This will only take a moment.',
                    duration: 10000,
                });
                setSlowLoadId(id);
            }, 5000);

            try {
                const res = await api.get('/auth/dashboard-stats/');
                setData(res.data);
                clearTimeout(timer);
                if (slowLoadId) toast.dismiss(slowLoadId);
            } catch (err) {
                clearTimeout(timer);
                if (slowLoadId) toast.dismiss(slowLoadId);
                console.error("Failed to fetch dashboard stats:", err);
                toast.error("Failed to load dashboard statistics.", {
                    duration: 8000
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleVerifyPayment = async (id: string) => {
        try {
            await api.post(`/payments/payments/${id}/verify/`);
            toast.success("Payment verified and access granted!", { duration: 8000 });
            // Refresh data
            const res = await api.get('/auth/dashboard-stats/');
            setData(res.data);
        } catch (err) {
            toast.error("Failed to verify payment.", { duration: 8000 });
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
                <p className="text-gray-500 font-medium text-lg">Loading dashboard statistics...</p>
            </div>
        );
    }

    const { stats, registration_data, recent_payments } = data || {
        stats: { total_students: 0, total_tests: 0, pending_payments: 0, total_revenue: 0 },
        registration_data: [],
        recent_payments: []
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Overview</h1>
                <p className="text-gray-600 mt-2">Real-time system statistics and management.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-4 bg-blue-100 rounded-full">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Students</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.total_students.toLocaleString()}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-4 bg-yellow-100 rounded-full">
                            <AlertCircle className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Payments</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.pending_payments}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-4 bg-purple-100 rounded-full">
                            <BookOpen className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Tests</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.total_tests}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-4 bg-green-100 rounded-full">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-gray-900">৳{stats.total_revenue.toLocaleString()}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Registration Chart */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">New Registrations (Last 7 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={registration_data}>
                                    <defs>
                                        <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Area
                                        type="monotone"
                                        dataKey="students"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorStudents)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Pending Actions */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold">Recent Payment Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recent_payments.length > 0 ? (
                                recent_payments.map((item: any) => (
                                    <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center font-bold text-blue-600 border border-blue-100">
                                                {item.user_name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{item.user_name}</p>
                                                <p className="text-xs text-gray-500 font-mono">Trx: {item.transaction_id} • ৳{item.amount}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-green-600 border-green-200 hover:bg-green-50"
                                                onClick={() => handleVerifyPayment(item.id)}
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-400">
                                    <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                    <p>No pending payment requests</p>
                                </div>
                            )}
                        </div>
                        <Link href="/admin/payments">
                            <Button className="w-full mt-6" variant="secondary">Manage All Payments</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
