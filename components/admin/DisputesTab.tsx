
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AlertCircle, Loader2 } from 'lucide-react';
import { adminService, AdminDispute } from '../../services/api';

export const AdminDisputesTab: React.FC = () => {
    const { t } = useLanguage();
    const [disputes, setDisputes] = useState<AdminDispute[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await adminService.getDisputes();
                setDisputes(Array.isArray(data) ? data : []);
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        fetch();
    }, []);

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900">{t.disputes}</h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-700">Reference</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Reason</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Parties</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Status</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {disputes.map(dispute => (
                            <tr key={dispute.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-slate-500">{dispute.booking_reference}</td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{dispute.reason}</div>
                                    <div className="text-xs text-slate-500 line-clamp-1">{dispute.description}</div>
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-600">
                                    <div>By: {dispute.raised_by}</div>
                                    <div>Against: {dispute.against}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold uppercase">{dispute.status}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-primary hover:underline text-xs font-bold">Resolve</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
