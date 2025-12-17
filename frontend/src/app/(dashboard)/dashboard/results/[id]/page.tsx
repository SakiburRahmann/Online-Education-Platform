'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowLeft, BarChart2 } from "lucide-react";
import Link from 'next/link';

export default function ResultDetailPage({ params }: { params: { id: string } }) {
    // Mock detailed result data
    const result = {
        id: params.id,
        testTitle: 'IQ Mock Test 1 (Verbal)',
        score: 85,
        passed: true,
        totalQuestions: 100,
        correct: 85,
        wrong: 10,
        skipped: 5,
        timeTaken: '25:30',
        percentile: 92,
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/results">
                    <Button variant="ghost"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Results</Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 text-center border">
                <div className={`inline-flex items-center justify-center p-4 rounded-full mb-4 ${result.passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {result.passed ? <CheckCircle className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{result.passed ? 'Congratulations! You Passed' : 'Keep Practicing'}</h1>
                <p className="text-gray-600">You scored {result.score}% in {result.testTitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6 text-center">
                        <p className="text-sm text-gray-500 mb-1">Correct Answers</p>
                        <p className="text-3xl font-bold text-green-600">{result.correct}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 text-center">
                        <p className="text-sm text-gray-500 mb-1">Wrong Answers</p>
                        <p className="text-3xl font-bold text-red-600">{result.wrong}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 text-center">
                        <p className="text-sm text-gray-500 mb-1">Skipped</p>
                        <p className="text-3xl font-bold text-gray-600">{result.skipped}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 text-center">
                        <p className="text-sm text-gray-500 mb-1">Percentile</p>
                        <p className="text-3xl font-bold text-blue-600 flex items-center justify-center gap-1">
                            {result.percentile}th <BarChart2 className="w-4 h-4" />
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Question Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-500 text-center py-8">
                        Detailed question breakdown will be available here showing which questions you got wrong and the correct explanations.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
