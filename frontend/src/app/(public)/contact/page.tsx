'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions about our programs or need assistance? We&apos;re here to help you on your journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <Card className="shadow-lg border-none">
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                            <CardDescription>Fill out the form below and we&apos;ll get back to you shortly.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                                        <Input id="name" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                        <Input id="email" type="email" placeholder="john@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                                    <Input id="subject" placeholder="Course Inquiry" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <Button className="w-full h-11 text-lg">
                                    <Send className="w-4 h-4 mr-2" /> Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <Card className="shadow-md border-none">
                            <CardContent className="pt-6 flex items-start gap-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Our Location</h3>
                                    <p className="text-gray-600">
                                        House #123, Road #45<br />
                                        Defense Officer&apos;s Housing Society (DOHS)<br />
                                        Dhaka, Bangladesh
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-md border-none">
                            <CardContent className="pt-6 flex items-start gap-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <Phone className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Phone Number</h3>
                                    <p className="text-gray-600">01XXX-XXXXXX (Office)</p>
                                    <p className="text-gray-600">01XXX-XXXXXX (Admission)</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-md border-none">
                            <CardContent className="pt-6 flex items-start gap-4">
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <Mail className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Email Address</h3>
                                    <p className="text-gray-600">info@defensecoach.com</p>
                                    <p className="text-gray-600">support@defensecoach.com</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Map Placeholder */}
                        <div className="h-64 bg-gray-200 rounded-xl overflow-hidden shadow-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.0639672576!2d90.25446566416174!3d23.780753031631525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ marginBottom: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="border-0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
