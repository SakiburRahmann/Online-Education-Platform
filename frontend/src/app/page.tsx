import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, Brain } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 lg:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Master Your Defense <br />
                        <span className="text-blue-400">IQ Test Preparation</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
                        Professional coaching platform designed to help you excel in recruitment exams.
                        Practice with timed tests, detailed analytics, and expert-curated questions.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/register">
                            <Button size="lg" className="w-full sm:w-auto text-lg h-12 bg-blue-500 hover:bg-blue-600">
                                Start Preparation
                            </Button>
                        </Link>
                        <Link href="/sample-test">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-12 bg-transparent text-white border-white hover:bg-white/10">
                                Try Free Sample Test
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                        <p className="text-xl text-gray-600">Comprehensive preparation tools for your success</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="bg-white border-none shadow-lg">
                            <CardHeader className="text-center">
                                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <Clock className="w-6 h-6 text-blue-600" />
                                </div>
                                <CardTitle>Timed Practice</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-gray-600">
                                Simulate real exam conditions with strict timing. 30 minutes for 100 questions to build speed and accuracy.
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-none shadow-lg">
                            <CardHeader className="text-center">
                                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <Brain className="w-6 h-6 text-green-600" />
                                </div>
                                <CardTitle>Expert Question Bank</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-gray-600">
                                Thousands of curated questions covering all IQ patterns, logic puzzles, and verbal reasoning topics.
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-none shadow-lg">
                            <CardHeader className="text-center">
                                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle className="w-6 h-6 text-purple-600" />
                                </div>
                                <CardTitle>Detailed Analytics</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-gray-600">
                                Track your progress with instant results, performance breakdowns, and improvement suggestions.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-blue-600 rounded-2xl p-8 md:p-16 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to test your intelligence?</h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join hundreds of successful candidates who prepared with us.
                        </p>
                        <Link href="/register">
                            <Button size="lg" variant="secondary" className="text-blue-900 font-bold">
                                Get Premium Access Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
