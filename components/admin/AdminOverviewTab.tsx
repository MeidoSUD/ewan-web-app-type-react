
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Users, BookOpen, DollarSign, CheckSquare, Loader2, TrendingUp, TrendingDown, UserCheck } from 'lucide-react';
import { adminService } from '../../services/api';

export const AdminOverviewTab: React.FC = () => {
    const { t } = useLanguage();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await adminService.getStats();
                setStats(data);
            } catch (e) {
                console.error("Failed to load admin stats", e);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

    const cards = [
        { title: 'Total Users', value: stats?.total_users || '0', icon: Users, color: 'bg-blue-500' },
        { title: 'Active Teachers', value: stats?.active_teachers || '0', icon: UserCheck, color: 'bg-green-500' },
        { title: 'Total Bookings', value: stats?.total_bookings || '0', icon: BookOpen, color: 'bg-purple-500' },
        { title: 'Revenue', value: `${stats?.total_revenue || '0'} SAR`, icon: DollarSign, color: 'bg-orange-500' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">{t.dashboard} Overview</h2>
                <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200">
                    Last updated: {new Date().toLocaleTimeString()}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${card.color} text-white`}>
                                <card.icon size={24} />
                            </div>
                            <span className="text-green-500 text-xs font-bold flex items-center gap-1">
                                <TrendingUp size={14} /> +4%
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium mb-1">{card.title}</h3>
                        <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6">User Distribution</h3>
                    <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <p className="text-slate-400">Charts integration coming soon</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-0">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <Users size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-slate-900">New user registration</p>
                                    <p className="text-xs text-slate-500">Student joined the platform</p>
                                </div>
                                <span className="text-xs text-slate-400">2m ago</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
