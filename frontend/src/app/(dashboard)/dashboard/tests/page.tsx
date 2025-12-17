'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, HelpCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from 'next/link';

// Mock data
const availableTests = [
    {
        id: 1,
        title: 'IQ Mock Test 1 (Verbal)',
        questions: 100,
        duration: 30, // minutes
        price: 0,
        status: 'unlocked',
        best_score: null,
    },
    {
        id: 2,
        title: 'IQ Mock Test 2 (Non-Verbal)',
        questions: 100,
        duration: 30,
        price: 0,
        status: 'completed',
        best_score: 82,
    },
    {
        id: 3,
        title: 'Defense Special Pattern 1',
        questions: 100,
        duration: 30,
        price: 0,
        status: 'unlocked',
        best_score: null,
    },
    {
        id: 4,
        title: 'Premium Model Test 5',
        questions: 100,
        duration: 30,
        price: 50,
        status: 'locked',
        best_score: null,
    },
];

export default function TestsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Available Tests</h1>
                <p className="text-gray-600 mt-2">Select a test to begin practicing. Remember, time management is key!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableTests.map((test) => (
                    <Card key={test.id} className={`flex flex-col ${test.status === 'locked' ? 'opacity-75' : ''}`}>
                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide
                    ${test.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        test.status === 'locked' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'}`}>
                                    {test.status}
                                </span>
                                {test.price > 0 && test.status === 'locked' && (
                                    <span className="text-sm font-semibold text-gray-900">৳{test.price}</span>
                                )}
                            </div>
                            <CardTitle className="mt-2 text-xl">{test.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                {test.duration} Minutes
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <HelpCircle className="w-4 h-4" />
                                {test.questions} Questions
                            </div>

                            {test.best_score && (
                                <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2 border border-green-100">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="text-xs text-green-600 font-bold uppercase">Best Score</p>
                                        <p className="font-bold text-green-900">{test.best_score}%</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="pt-2">
                            {test.status === 'locked' ? (
                                <Button variant="outline" className="w-full" disabled>
                                    Unlock Test
                                </Button>
                            ) : test.status === 'completed' ? (
                                <Link href={`/dashboard/results/${test.id}`} className="w-full">
                                    <Button variant="secondary" className="w-full">
                                        View Result
                                    </Button>
                                </Link>
                            ) : (
                                <Link href={`/dashboard/tests/${test.id}`} className="w-full">
                                    <Button className="w-full gap-2">
                                        Start Test <AlertTriangle className="w-4 h-4" />
                                    </Button>
                                </Link>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
