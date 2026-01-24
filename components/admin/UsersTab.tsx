
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Search, MoreVertical, Shield, User, GraduationCap, Loader2, Trash2, Ban, Eye, Key, CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { adminService, AdminUser } from '../../services/api';

export const UsersTab: React.FC = () => {
    const { t, direction } = useLanguage();
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Action State
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await adminService.getUsers();
            setUsers(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
        try {
            await adminService.deleteUser(id);
            setUsers(users.filter(u => u.id !== id));
            setOpenMenuId(null);
            setSelectedUser(null);
        } catch (e: any) { alert("Failed to delete user"); }
    };

    const handleSuspend = async (id: number) => {
        if (!confirm("Are you sure you want to suspend this user?")) return;
        try {
            await adminService.suspendUser(id);
            alert("User suspended successfully");
            fetchUsers();
            setOpenMenuId(null);
        } catch (e: any) { alert("Failed to suspend user"); }
    };

    const handleActivate = async (id: number) => {
        try {
            await adminService.activateUser(id);
            alert("User activated successfully");
            fetchUsers();
            setOpenMenuId(null);
        } catch (e: any) { alert("Failed to activate user"); }
    };

    const handleResetPassword = async (id: number) => {
        if (!confirm("Reset password to default '12345678'?")) return;
        try {
            await adminService.resetUserPassword(id);
            alert("Password reset successfully");
            setOpenMenuId(null);
        } catch (e: any) { alert("Failed to reset password"); }
    };

    const filteredUsers = users.filter(user => {
        const full = `${user.first_name ?? ''} ${user.last_name ?? ''}`.toLowerCase();
        const term = (searchTerm ?? '').toLowerCase();
        return full.includes(term) || (user.email ?? '').toLowerCase().includes(term);
    });

    const getRoleIcon = (roleId: number) => {
        switch (roleId) {
            case 1: return <Shield size={16} className="text-purple-600" />;
            case 3: return <User size={16} className="text-blue-600" />;
            default: return <GraduationCap size={16} className="text-green-600" />;
        }
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6 animate-fade-in" onClick={() => setOpenMenuId(null)}>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">{t.users}</h2>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="relative mb-4">
                    <Search className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${direction === 'rtl' ? 'right-3' : 'left-3'}`} size={20} />
                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-primary ${direction === 'rtl' ? 'pr-10 pl-4' : ''}`}
                    />
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-slate-700">{t.name}</th>
                                <th className="px-6 py-3 font-semibold text-slate-700">{t.role}</th>
                                <th className="px-6 py-3 font-semibold text-slate-700">{t.status}</th>
                                <th className="px-6 py-3 font-semibold text-slate-700 text-right">{t.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedUser(user)}>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-bold text-slate-900">{user.first_name} {user.last_name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 capitalize bg-slate-100 px-3 py-1 rounded-full w-fit text-xs font-medium">
                                            {getRoleIcon(user.role_id)}
                                            {user.role_id === 1 ? t.admin : user.role_id === 3 ? t.teacher : t.student}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {user.is_active ? t.activeStatus : t.inactiveStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right relative">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === user.id ? null : user.id); }}
                                            className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100"
                                        >
                                            <MoreVertical size={18} />
                                        </button>

                                        {openMenuId === user.id && (
                                            <div className={`absolute z-20 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 py-1 ${direction === 'rtl' ? 'left-8' : 'right-8'} top-8`}>
                                                <button onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700">
                                                    <Eye size={16} /> {t.viewDetails}
                                                </button>

                                                {user.is_active ? (
                                                    <button onClick={(e) => { e.stopPropagation(); handleSuspend(user.id); }} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 text-orange-600">
                                                        <Ban size={16} /> {t.deactivate}
                                                    </button>
                                                ) : (
                                                    <button onClick={(e) => { e.stopPropagation(); handleActivate(user.id); }} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 text-green-600">
                                                        <CheckCircle size={16} /> {t.activate}
                                                    </button>
                                                )}

                                                <button onClick={(e) => { e.stopPropagation(); handleResetPassword(user.id); }} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 text-blue-600">
                                                    <Key size={16} /> {t.resetPassword}
                                                </button>

                                                <div className="border-t border-slate-100 my-1"></div>
                                                <button onClick={(e) => { e.stopPropagation(); handleDelete(user.id); }} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 text-red-600">
                                                    <Trash2 size={16} /> {t.delete}
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Details Modal */}
            <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} title={t.details}>
                {selectedUser && (
                    <div className="space-y-4">
                        <div className="flex flex-col items-center mb-6">
                            <div className="h-20 w-20 rounded-full bg-slate-100 mb-2 flex items-center justify-center text-2xl font-bold text-slate-400">
                                {selectedUser.first_name.charAt(0)}
                            </div>
                            <h3 className="text-xl font-bold">{selectedUser.first_name} {selectedUser.last_name}</h3>
                            <p className="text-slate-500">{selectedUser.email}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-3 bg-slate-50 rounded">
                                <span className="block text-xs text-slate-400">{t.phone}</span>
                                <span className="font-medium" dir="ltr">{selectedUser.phone_number}</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded">
                                <span className="block text-xs text-slate-400">{t.role}</span>
                                <span className="font-medium">{selectedUser.role_id === 1 ? t.admin : selectedUser.role_id === 3 ? t.teacher : t.student}</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded">
                                <span className="block text-xs text-slate-400">{t.status}</span>
                                <span className={`font-bold ${selectedUser.is_active ? 'text-green-600' : 'text-red-600'}`}>{selectedUser.is_active ? t.activeStatus : t.inactiveStatus}</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded">
                                <span className="block text-xs text-slate-400">{t.signUp}</span>
                                <span className="font-medium">{new Date(selectedUser.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleDelete(selectedUser.id)}>
                                {t.delete}
                            </Button>
                            <Button className="flex-1" onClick={() => setSelectedUser(null)}>
                                {t.close}
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};
