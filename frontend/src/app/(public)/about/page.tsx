import { Card, CardContent } from "@/components/ui/card"
import { Shield, Target, Award, Users } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About Defense Coaching Center</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We are dedicated to shaping the future leaders of our nation&apos;s defense forces through comprehensive preparation and expert guidance.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Target className="w-8 h-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            To provide the highest quality IQ training and coaching for defense service aspirants, enabling them to realize their dreams of serving the nation with honor and distinction. We prioritize integrity, excellence, and discipline in all our endeavors.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            To be the premier defense coaching institution in the country, recognized for our exceptional success rate, innovative teaching methodologies, and commitment to holistic student development.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {[
                        { label: "Successful Candidates", value: "5000+", icon: Award },
                        { label: "Years of Experience", value: "12+", icon: Shield },
                        { label: "Expert Instructors", value: "50+", icon: Users },
                        { label: "Practice Tests", value: "1000+", icon: Target },
                    ].map((stat, index) => (
                        <Card key={index} className="text-center border-none shadow-md">
                            <CardContent className="pt-6">
                                <stat.icon className="w-8 h-8 mx-auto text-blue-600 mb-4" />
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Story Section */}
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
                    <div className="prose prose-lg mx-auto text-gray-600">
                        <p className="mb-6">
                            Founded in 2012 by retired military officers, Defense Coaching Center began with a single classroom and a burning desire to guide young patriots. We realized that many talented candidates were failing simply due to a lack of proper guidance and familiarity with the IQ testing formats used in selection boards.
                        </p>
                        <p>
                            Over the last decade, we have developed a proprietary curriculum that deconstructs complex logic puzzles, verbal reasoning, and spatial awareness problems into manageable concepts. Our platform now brings this classroom expertise to the digital realm, allowing students from all corners of the country to access premium preparation materials.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
