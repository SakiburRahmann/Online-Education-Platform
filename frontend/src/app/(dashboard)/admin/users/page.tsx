'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Trash2, UserCog, KeyRound, Smartphone, X, Save } from "lucide-react";
import api from '@/lib/api';

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    is_active: boolean;
    date_joined: string;
}

export default function AdminUsersPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [resetPasswordUser, setResetPasswordUser] = useState<User | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/auth/users/');
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else if (response.data.results) {
                setUsers(response.data.results);
            }
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch users", err);
            setError("Failed to load users.");
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await api.delete(`/auth/users/${id}/`);
            setUsers(users.filter(u => u.id !== id));
        } catch (err: any) {
            console.error("Delete failed", err);
            const msg = err.response?.data?.detail || "Failed to delete user";
            alert(msg);
        }
    };

    const handleResetPassword = async () => {
        if (!resetPasswordUser || !newPassword) return;
        try {
            setActionLoading(true);
            await api.post(`/auth/users/${resetPasswordUser.id}/reset_password/`, { password: newPassword });
            alert(`Password for ${resetPasswordUser.username} has been reset.`);
            setResetPasswordUser(null);
            setNewPassword('');
        } catch (err: any) {
            console.error("Reset password failed", err);
            const msg = err.response?.data?.error || err.response?.data?.detail || "Failed to reset password";
            alert(msg);
        } finally {
            setActionLoading(false);
        }
    };

    const handleResetDevice = async (id: string, username: string) => {
        if (!confirm(`Are you sure you want to clear the device lock for ${username}?`)) return;
        try {
            setActionLoading(true);
            await api.post(`/auth/users/${id}/reset_device/`);
            alert(`Device lock for ${username} has been cleared.`);
        } catch (err: any) {
            console.error("Reset device failed", err);
            const msg = err.response?.data?.error || err.response?.data?.detail || "Failed to clear device lock";
            alert(msg);
        } finally {
            setActionLoading(false);
        }
    };

    if (loading && users.length === 0) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <Button onClick={() => router.push('/admin/users/new')}>
                    <Plus className="mr-2 h-4 w-4" /> Add User
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 font-medium text-gray-500">Username</th>
                                    <th className="p-4 font-medium text-gray-500">Email</th>
                                    <th className="p-4 font-medium text-gray-500">Role</th>
                                    <th className="p-4 font-medium text-gray-500">Status</th>
                                    <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="p-4 font-medium">{user.username}</td>
                                        <td className="p-4 text-gray-500">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                    user.role === 'staff' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {user.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/users/${user.id}`)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                    <span className="sr-only">View</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => router.push(`/admin/users/${user.id}/edit`)} className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                                                    <span className="sr-only">Edit</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => setResetPasswordUser(user)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" title="Reset Password">
                                                    <KeyRound className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleResetDevice(user.id, user.username)} className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50" title="Reset Device Lock">
                                                    <Smartphone className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Reset Password Modal */}
            {resetPasswordUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
                    <Card className="w-full max-w-sm shadow-2xl">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <KeyRound className="w-5 h-5 text-blue-600" />
                                Reset Password
                            </CardTitle>
                            <Button variant="ghost" size="sm" onClick={() => setResetPasswordUser(null)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <p className="text-sm text-gray-500">
                                Resetting password for <span className="font-semibold text-gray-900">{resetPasswordUser.username}</span>
                            </p>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">New Password</label>
                                <Input
                                    type="text"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </CardContent>
                        <div className="p-4 bg-gray-50 border-t flex justify-end gap-2 rounded-b-lg">
                            <Button variant="outline" onClick={() => setResetPasswordUser(null)}>
                                Cancel
                            </Button>
                            <Button onClick={handleResetPassword} disabled={!newPassword || actionLoading}>
                                {actionLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                                Save New Password
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
