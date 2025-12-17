'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from '@/store/auth';
import { Brain, Trophy, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Test 1', score: 65 },
    { name: 'Test 2', score: 72 },
    { name: 'Test 3', score: 68 },
    { name: 'Test 4', score: 85 },
    { name: 'Test 5', score: 82 },
];

export default function DashboardPage() {
    const { user } = useAuthStore();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.username || 'Candidate'}!</h1>
                <p className="text-gray-600 mt-2">Here's an overview of your progress and upcoming tests.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-4 bg-blue-100 rounded-full">
                            <Brain className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Tests Taken</p>
                            <h3 className="text-2xl font-bold text-gray-900">12</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-4 bg-green-100 rounded-full">
                            <Trophy className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Average Score</p>
                            <h3 className="text-2xl font-bold text-gray-900">76%</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-4 bg-purple-100 rounded-full">
                            <CheckCircle className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Highest Score</p>
                            <h3 className="text-2xl font-bold text-gray-900">92%</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-4 bg-orange-100 rounded-full">
                            <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Time Spent</p>
                            <h3 className="text-2xl font-bold text-gray-900">4.5h</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Performance History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="score" stroke="#2563eb" fillOpacity={1} fill="url(#colorScore)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions / Recent */}
                <div className="space-y-6">
                    <Card className="bg-blue-600 text-white border-none">
                        <CardHeader>
                            <CardTitle className="text-white">Start New Practice</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-blue-100 mb-6">
                                Ready to challenge yourself? Take a new timed IQ test to improve your skills.
                            </p>
                            <Link href="/dashboard/tests">
                                <Button variant="secondary" className="w-full gap-2 font-bold text-blue-700">
                                    <Brain className="h-4 w-4" /> Start Now
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                                iq
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Mixed IQ Test #{i}</p>
                                                <p className="text-xs text-gray-500">2 hours ago</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-green-600">Passed</p>
                                            <p className="text-xs text-gray-500">Score: 85%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full mt-4 text-blue-600" asChild>
                                <Link href="/dashboard/results">View All History <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
