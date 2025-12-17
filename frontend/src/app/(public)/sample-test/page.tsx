'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle } from "lucide-react";
import Link from 'next/link';

// Sample Questions
const sampleQuestions = [
    { id: 1, text: "Which number is the odd one out? 3, 5, 7, 9, 11, 13", options: ["9", "7", "13", "3"], correct: "9" },
    { id: 2, text: "Fill in the blank: Complete is to Incomplete as ____ is to Partial.", options: ["Total", "Whole", "Half", "Empty"], correct: "Whole" },
    { id: 3, text: "Which shape completes the pattern? (Visual logic placeholder)", options: ["A", "B", "C", "D"], correct: "A" },
    // ... (would populate 20 questions)
];

export default function SampleTestPage() {
    const [started, setStarted] = useState(false);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleAnswer = (option: string) => {
        if (option === sampleQuestions[currentQ].correct) setScore(score + 1);

        if (currentQ < sampleQuestions.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            setFinished(true);
        }
    };

    if (!started) {
        return (
            <div className="max-w-4xl mx-auto py-20 px-4 text-center">
                <div className="bg-white p-12 rounded-2xl shadow-lg border">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Clock className="w-10 h-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Free IQ Sample Test</h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Experience our testing platform with 3 simulated questions. This test is free and doesn't require registration.
                        <br /><br />
                        <strong>Note:</strong> The full premium tests contain 100 questions with strict 30-minute timing.
                    </p>
                    <Button size="lg" className="text-lg px-12 py-6" onClick={() => setStarted(true)}>
                        Start Free Test
                    </Button>
                </div>
            </div>
        );
    }

    if (finished) {
        return (
            <div className="max-w-xl mx-auto py-20 px-4 text-center">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-3xl">Test Complete!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="py-8">
                            <p className="text-gray-600 mb-2">You scored:</p>
                            <h2 className="text-6xl font-bold text-blue-600 mb-6">{score} / {sampleQuestions.length}</h2>
                            <p className="text-gray-500">
                                That's {Math.round((score / sampleQuestions.length) * 100)}% accuracy.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg text-left mb-6">
                            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" /> Want to improve your score?
                            </h3>
                            <p className="text-blue-800 text-sm">
                                Join our premium program to access thousands of questions, detailed explanations, and full-length timed mock tests.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-3">
                        <Link href="/register" className="w-full">
                            <Button className="w-full text-lg h-12">Get Premium Access</Button>
                        </Link>
                        <Link href="/" className="w-full">
                            <Button variant="ghost" className="w-full">Back to Home</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <div className="mb-6 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Question {currentQ + 1} of {sampleQuestions.length}</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">Sample Mode</span>
            </div>

            <Card className="shadow-md">
                <CardContent className="pt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">{sampleQuestions[currentQ].text}</h2>
                    <div className="space-y-3">
                        {sampleQuestions[currentQ].options.map((opt, idx) => (
                            <Button
                                key={idx}
                                variant="outline"
                                className="w-full justify-start text-left h-auto py-4 text-lg border-2 hover:border-blue-500 hover:bg-blue-50"
                                onClick={() => handleAnswer(opt)}
                            >
                                <span className="w-8 h-8 rounded-full bg-gray-100 mr-4 flex items-center justify-center text-sm font-bold text-gray-500">
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                {opt}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
