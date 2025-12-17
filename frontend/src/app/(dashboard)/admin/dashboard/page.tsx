'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, AlertCircle, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const registrationData = [
    { name: 'Mon', students: 12 },
    { name: 'Tue', students: 19 },
    { name: 'Wed', students: 15 },
    { name: 'Thu', students: 25 },
    { name: 'Fri', students: 32 },
    { name: 'Sat', students: 45 },
    { name: 'Sun', students: 30 },
];

const paymentData = [
    { name: 'Approved', value: 85, fill: '#16a34a' },
    { name: 'Pending', value: 12, fill: '#eab308' },
    { name: 'Rejected', value: 3, fill: '#dc2626' },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
                <p className="text-gray-600 mt-2">System statistics and management.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-4 bg-blue-100 rounded-full">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Students</p>
                            <h3 className="text-2xl font-bold text-gray-900">1,254</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-4 bg-yellow-100 rounded-full">
                            <AlertCircle className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                            <h3 className="text-2xl font-bold text-gray-900">12</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-4 bg-purple-100 rounded-full">
                            <BookOpen className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Tests</p>
                            <h3 className="text-2xl font-bold text-gray-900">45</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-4 bg-green-100 rounded-full">
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-gray-900">৳1.2M</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Registration Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>New Registrations (Last 7 Days)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={registrationData}>
                                    <defs>
                                        <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="students" stroke="#3b82f6" fillOpacity={1} fill="url(#colorStudents)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Pending Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Payment Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: 'Rahim Karim', trx: 'TRX789012', time: '10 mins ago' },
                                { name: 'Sultana Begum', trx: 'TRX345678', time: '25 mins ago' },
                                { name: 'Kamal Hassan', trx: 'TRX123456', time: '1 hour ago' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                            {item.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-xs text-gray-500">TrxID: {item.trx}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                                            <CheckCircle className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                            <XCircle className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full mt-4" variant="secondary">View All Pending Requests</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
