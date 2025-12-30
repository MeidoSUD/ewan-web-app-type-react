
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Calendar, Loader2, Filter, X } from 'lucide-react';
import { adminService, AdminBooking } from '../../services/api';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export const BookingsTab: React.FC = () => {
    const { t } = useLanguage();
    const [bookings, setBookings] = useState<AdminBooking[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Filters
    const [filterTeacher, setFilterTeacher] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await adminService.getBookings();
                setBookings(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const filteredBookings = bookings.filter(booking => {
        const matchTeacher = !filterTeacher || (booking.teacher_name && booking.teacher_name.toLowerCase().includes(filterTeacher.toLowerCase()));
        const matchDate = !filterDate || (booking.created_at && booking.created_at.startsWith(filterDate));
        const matchStatus = !filterStatus || booking.status === filterStatus;
        return matchTeacher && matchDate && matchStatus;
    });

    const clearFilters = () => {
        setFilterTeacher('');
        setFilterDate('');
        setFilterStatus('');
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900">All Bookings</h2>
            
            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">
                <div className="w-full md:w-1/3">
                    <label className="text-xs font-bold text-slate-500 mb-1 block">Teacher Name</label>
                    <input 
                        type="text" 
                        className="w-full p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary"
                        placeholder="Search teacher..."
                        value={filterTeacher}
                        onChange={(e) => setFilterTeacher(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-1/4">
                    <label className="text-xs font-bold text-slate-500 mb-1 block">Date</label>
                    <input 
                        type="date" 
                        className="w-full p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>
                <div className="w-full md:w-1/4">
                    <label className="text-xs font-bold text-slate-500 mb-1 block">Status</label>
                    <select 
                        className="w-full p-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-primary bg-white"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <button 
                    onClick={clearFilters}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    title="Clear Filters"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-700">Reference</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Student</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Teacher</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Amount</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Status</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredBookings.map(booking => (
                            <tr key={booking.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-slate-500">{booking.reference || `#${booking.id}`}</td>
                                <td className="px-6 py-4">{booking.student_name || 'N/A'}</td>
                                <td className="px-6 py-4">{booking.teacher_name || 'N/A'}</td>
                                <td className="px-6 py-4 font-bold text-slate-900">{booking.amount} {t.sar}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                        'bg-slate-100 text-slate-600'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">{new Date(booking.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        {filteredBookings.length === 0 && (
                            <tr><td colSpan={6} className="p-8 text-center text-slate-500">No bookings found matching filters.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
