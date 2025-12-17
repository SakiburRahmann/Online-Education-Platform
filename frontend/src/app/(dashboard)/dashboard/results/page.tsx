'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Calendar } from "lucide-react";
import Link from 'next/link';

const results = [
    {
        id: 1,
        testTitle: 'IQ Mock Test 1 (Verbal)',
        date: '2023-11-15',
        score: 85,
        passed: true,
        totalQuestions: 100,
        timeTaken: '25:30',
    },
    {
        id: 2,
        testTitle: 'Defense Special Pattern 1',
        date: '2023-11-10',
        score: 45,
        passed: false,
        totalQuestions: 100,
        timeTaken: '30:00',
    },
    {
        id: 3,
        testTitle: 'Premium Model Test 5',
        date: '2023-11-05',
        score: 92,
        passed: true,
        totalQuestions: 100,
        timeTaken: '22:15',
    },
];

export default function ResultsListPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Results</h1>
                <p className="text-gray-600 mt-2">Track your performance and review your answers.</p>
            </div>

            <div className="space-y-4">
                {results.map((result) => (
                    <Card key={result.id} className="transition-shadow hover:shadow-md">
                        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${result.passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {result.passed ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{result.testTitle}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {result.date}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {result.timeTaken}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 uppercase font-bold">Score</p>
                                    <p className={`text-xl font-bold ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                                        {result.score}%
                                    </p>
                                </div>
                                <Link href={`/dashboard/results/${result.id}`}>
                                    <Button variant="outline">View Detailed Analysis</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
