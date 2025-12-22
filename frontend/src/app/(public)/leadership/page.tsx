import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Shield, Code, Server, BarChart, Zap } from 'lucide-react';

export default function LeadershipPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                            Leadership & Technology
                        </h1>
                        <p className="mt-5 max-w-xl mx-auto text-xl text-slate-500">
                            Driving the technical vision and engineering excellence behind the Bangladesh Bravo Academy digital ecosystem.
                        </p>
                    </div>
                </div>
            </div>

            {/* Profile Section */}
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
                            <Image
                                src="/sakibur-rahman.jpg"
                                alt="Sakibur Rahman"
                                fill
                                className="object-cover transition duration-500 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </div>

                    <div className="mt-12 lg:mt-0">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900">Sakibur Rahman</h2>
                                <p className="text-lg font-semibold text-blue-600 uppercase tracking-wider mt-1">
                                    Lead Software Architect & Platform Engineer
                                </p>
                            </div>

                            <div className="prose prose-blue text-slate-600 max-w-none">
                                <p className="text-lg leading-relaxed">
                                    Sakibur Rahman is responsible for the design, engineering, and ongoing technical development of the Bangladesh Bravo Academy digital testing platform.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    The system was architected as a proprietary, internal platform to meet the specific operational requirements of ISSB cognitive preparation, including strict time enforcement, controlled access, and detailed performance analysis.
                                </p>
                                <p className="text-lg leading-relaxed italic">
                                    The platform was developed to avoid reliance on generic third-party testing tools and to maintain full control over security, data integrity, and system evolution.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href="mailto:sakiburrahmannnn@gmail.com">
                                    <Button className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        Contact via Email
                                    </Button>
                                </Link>
                                <Link href="/about">
                                    <Button variant="outline">Learn About Academy</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technical Responsibilities */}
            <div className="bg-slate-900 py-24 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold">Technical Responsibilities</h2>
                        <div className="mt-4 h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Server className="h-6 w-6" />,
                                title: "System Architecture",
                                desc: "End-to-end architecture design focusing on scalability, security, and high-performance backend engineering."
                            },
                            {
                                icon: <Shield className="h-6 w-6" />,
                                title: "Authentication & Control",
                                desc: "Implementation of secure JWT-based authentication and advanced device fingerprinting for session control."
                            },
                            {
                                icon: <Zap className="h-6 w-6" />,
                                title: "Testing Engine",
                                desc: "Development of a highly accurate, time-enforced IQ testing engine tailored for defense selection board standards."
                            },
                            {
                                icon: <BarChart className="h-6 w-6" />,
                                title: "Performance Analytics",
                                desc: "Construction of complex progress evaluation systems and real-time performance analytics for officer candidates."
                            },
                            {
                                icon: <Code className="h-6 w-6" />,
                                title: "Frontend Engineering",
                                desc: "Crafting modern, responsive UI/UX using Next.js 14 to provide an immersive digital testing experience."
                            },
                            {
                                icon: <Shield className="h-6 w-6" />,
                                title: "Production Infrastructure",
                                desc: "Managing global deployment infrastructure, ensuring maximum uptime and data reliability for all users."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors group">
                                <div className="p-3 bg-blue-600/10 rounded-lg w-fit text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Engagement Section */}
            <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Independent Technical Engagements</h2>
                        <p className="text-lg text-slate-600 mb-8 max-w-2xl">
                            For organizations or institutions seeking the design and development of secure, large-scale assessment platforms or similar digital systems, technical discussions may be directed to the architect.
                        </p>
                        <Link href="mailto:sakiburrahmannnn@gmail.com" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-3">
                            <Mail className="h-6 w-6" />
                            sakiburrahmannnn@gmail.com
                        </Link>
                    </div>
                    <div className="w-full md:w-auto">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                            <p className="text-center font-medium text-slate-500">Available for Enterprise Solutions</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Text */}
            <div className="max-w-7xl mx-auto px-4 pb-16 text-center">
                <p className="text-slate-400 italic">
                    The platform represents a long-term technical investment in building reliable, scalable, and secure digital infrastructure aligned with defense-oriented training standards.
                </p>
            </div>
        </div>
    );
}
