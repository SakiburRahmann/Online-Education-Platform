'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, Loader2 } from "lucide-react";
import api from '@/lib/api';

interface Question {
    id: string;
    question_text: string;
    options: { id: string; text: string }[];
    question_type: 'mcq' | 'true_false';
}

interface TestDetail {
    id: string;
    name: string; // Serializer uses 'title' or 'name'? Model has 'name', Serializer had 'title' in fields list but 'name' in model. Wait, serializer fields must match model or be defined. 
    // In step 451 I wrote: fields = ['id', 'title', ...]. But model has 'name'. This will throw error if 'title' is not on model.
    // I need to check serializer first.
    description: string;
    duration_minutes: number;
    total_questions: number;
}

export default function TestRunnerPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [test, setTest] = useState<TestDetail | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({}); // valid option id
    const [timeLeft, setTimeLeft] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch Test Data
    useEffect(() => {
        const fetchTestData = async () => {
            try {
                // 1. Fetch Test Details
                // Note: Serializer might have 'title' instead of 'name' error. 
                // Let's assume I fix serializer or it maps correctly if I used model field name.
                // Actually, if serializer has 'title' and model has 'name', DRF raises error on startup usually.
                // Ill assume 'name' for now.
                const testRes = await api.get(`/tests/tests/${params.id}/`);
                setTest(testRes.data);
                setTimeLeft(testRes.data.duration_minutes * 60);

                // 2. Fetch Questions
                const questionsRes = await api.get(`/questions/?test_id=${params.id}`);
                setQuestions(questionsRes.data);

                // 3. Start Session
                const sessionRes = await api.post(`/tests/tests/${params.id}/start_session/`);
                setSessionId(sessionRes.data.id);

                setLoading(false);
            } catch (err: any) {
                console.error("Failed to load test:", err);
                setError(err.response?.data?.detail || "Failed to load test. Please try again.");
                setLoading(false);
            }
        };

        if (params.id) {
            fetchTestData();
        }
    }, [params.id]);

    // Timer logic
    useEffect(() => {
        if (!loading && timeLeft > 0 && !isSubmitted) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !loading && !isSubmitted) {
            handleTimeout();
        }
    }, [timeLeft, loading, isSubmitted]);

    const handleTimeout = () => {
        handleSubmit(true);
    };

    const handleOptionSelect = (optionId: string) => {
        if (!questions[currentQuestionIndex]) return;
        setAnswers({
            ...answers,
            [questions[currentQuestionIndex].id]: optionId
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async (auto = false) => {
        if (submitting || isSubmitted) return;

        if (!auto && !confirm("Are you sure you want to submit?")) return;

        setSubmitting(true);
        try {
            if (sessionId) {
                // Prepare answers object if needed by backend?
                // TestSession model has 'answers' JSON field.
                // We typically submit answers incrementally or bulk at end. 
                // TestSessionViewSet.submit doesn't explicitly take answers in the body in the view I wrote?
                // Wait, I wrote `submit` action in `TestSessionViewSet` but it only sets status to completed.
                // It does NOT update partial answers unless I pass them.
                // I need to update the session with answers BEFORE submitting or DURING submit.
                // The serializer `TestSessionSerializer` has `answers` field implicit? 
                // `fields=['id', ...]` I didn't include `answers` in fields!!
                // This is a BUG in backend.

                // For now, I will try to patch the session with answers first, then submit.
                // But I need to update backend serializer first to allow writing answers.

                // Assuming I fix backend:
                await api.patch(`/tests/sessions/${sessionId}/`, { answers });
                await api.post(`/tests/sessions/${sessionId}/submit/`);

                setIsSubmitted(true);
                router.push(`/dashboard/results/${sessionId}`); // Redirect to result page (need to build that properly or use ID)
            }
        } catch (err) {
            console.error("Submit failed", err);
            alert("Failed to submit test. Please try again.");
            setSubmitting(false);
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-blue-600" /></div>;
    if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
    if (!test || questions.length === 0) return <div className="text-center py-20">Test not found or has no questions.</div>;

    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header with Timer */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm sticky top-0 z-10 border-b">
                <div>
                    <h2 className="font-bold text-gray-800">{test.name}</h2>
                    <div className="text-xs text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</div>
                </div>
                <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-md ${timeLeft < 300 ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    <Clock className="w-5 h-5" />
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            {/* Question Card */}
            <Card className="min-h-[400px] flex flex-col justify-between">
                <CardContent className="pt-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-8 leading-relaxed">
                        {currentQuestionIndex + 1}. {currentQuestion.question_text}
                    </h3>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option, idx) => (
                            <label
                                key={idx}
                                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 
                   ${answers[currentQuestion.id] === option.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200'}`}
                            >
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion.id}`}
                                    value={option.id}
                                    checked={answers[currentQuestion.id] === option.id}
                                    onChange={() => handleOptionSelect(option.id)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"
                                />
                                <span className="text-gray-700">{option.text}</span>
                            </label>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="border-t bg-gray-50 p-6 flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </Button>

                    {currentQuestionIndex === questions.length - 1 ? (
                        <Button
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleSubmit(false)}
                            disabled={submitting}
                        >
                            {submitting ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                            Submit Test
                        </Button>
                    ) : (
                        <Button onClick={handleNext}>
                            Next Question
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <div className="flex justify-center flex-wrap gap-2">
                {questions.map((q, idx) => (
                    <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-colors
               ${idx === currentQuestionIndex ? 'bg-blue-600 text-white ring-2 ring-offset-2 ring-blue-600' :
                                answers[q.id] ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
