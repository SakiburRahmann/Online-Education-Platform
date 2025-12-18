'use client';

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from '@/store/auth'
import api from '@/lib/api'
import { getDeviceFingerprint } from '@/lib/fingerprint'
import { Shield, AlertCircle } from "lucide-react"

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
})

type FormData = z.infer<typeof loginSchema>

export default function LoginPage() {
    const router = useRouter()
    const login = useAuthStore((state) => state.login)
    const { user, isAuthenticated } = useAuthStore()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted && isAuthenticated && user) {
            if (user.role === 'admin') {
                router.push('/admin/dashboard')
            } else {
                router.push('/dashboard')
            }
        }
    }, [mounted, isAuthenticated, user, router])

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        setError(null)

        try {
            // Get device fingerprint
            const deviceFingerprint = await getDeviceFingerprint()

            const response = await api.post('/auth/login/', {
                username: data.username,
                password: data.password,
                device_fingerprint: deviceFingerprint,
            })

            const { user, access, refresh } = response.data // Assuming backend returns user object inside data
            // If backend returns simplified JWT, we might need to decode or fetch user separately
            // Based on serializers.py: `data['user'] = UserSerializer(self.user).data`

            login(user, access, refresh)

            if (user.role === 'admin') {
                router.push('/admin/dashboard')
            } else {
                router.push('/dashboard')
            }
        } catch (err: any) {
            if (err.response?.data?.error) {
                setError(err.response.data.error)
            } else if (err.response?.data?.detail) {
                setError(err.response.data.detail)
            } else {
                setError('Invalid username or password')
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (!mounted || isAuthenticated) {
        return null
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
                        <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access your dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                            <Input
                                id="username"
                                type="text"
                                {...register('username')}
                                className={errors.username ? "border-red-500" : ""}
                            />
                            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                                className={errors.password ? "border-red-500" : ""}
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>

                        <Button type="submit" className="w-full h-10" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center flex-col gap-2 border-t pt-6 bg-gray-50/50 rounded-b-lg">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-blue-600 hover:underline font-medium">
                            Register Now
                        </Link>
                    </p>
                    <p className="text-xs text-gray-400 max-w-xs text-center">
                        Note: You are only allowed to login from one designated device.
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
