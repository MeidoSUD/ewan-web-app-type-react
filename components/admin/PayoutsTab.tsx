
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Check, X, Building, Loader2, Upload, AlertCircle, Filter as FilterIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { adminService, PayoutRequest } from '../../services/api';

export const PayoutsTab: React.FC = () => {
    const { t } = useLanguage();
    const [payouts, setPayouts] = useState<PayoutRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    // Filters
    const [filterTeacher, setFilterTeacher] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // Modal State
    const [selectedPayout, setSelectedPayout] = useState<PayoutRequest | null>(null);
    const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const [rejectReason, setRejectReason] = useState('');

    useEffect(() => {
        fetchPayouts();
    }, []);

    const fetchPayouts = async () => {
        setLoading(true);
        try {
            const data = await adminService.getPayouts();
            setPayouts(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const openActionModal = (payout: PayoutRequest, type: 'approve' | 'reject') => {
        setSelectedPayout(payout);
        setActionType(type);
        setReceiptFile(null);
        setRejectReason('');
    };

    const handleSubmitAction = async () => {
        if (!selectedPayout || !actionType) return;

        setActionLoading(true);
        try {
            if (actionType === 'approve') {
                if (!receiptFile) {
                    alert("Please upload a receipt image.");
                    setActionLoading(false);
                    return;
                }
                await adminService.approvePayout(selectedPayout.id, receiptFile);
                alert("Payout approved successfully.");
            } else {
                if (!rejectReason) {
                    alert("Please provide a reason for rejection.");
                    setActionLoading(false);
                    return;
                }
                await adminService.rejectPayout(selectedPayout.id, rejectReason);
                alert("Payout rejected.");
            }

            // Cleanup and Refresh
            setSelectedPayout(null);
            setActionType(null);
            fetchPayouts();
        } catch (e: any) {
            console.error(e);
            alert(e.message || "Action failed.");
        } finally {
            setActionLoading(false);
        }
    };

    const filteredPayouts = payouts.filter(payout => {
        const userName = payout.user?.name ?? '';
        const matchTeacher = !filterTeacher || userName.toLowerCase().includes((filterTeacher ?? '').toLowerCase());
        const matchDate = !filterDate || (payout.created_at && payout.created_at.startsWith(filterDate));
        const matchStatus = !filterStatus || payout.status === filterStatus;
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
            <h2 className="text-2xl font-bold text-slate-900">{t.payoutRequests}</h2>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-end">
                <div className="w-full md:w-1/3">
                    <label className="text-xs font-bold text-slate-500 mb-1 block">Teacher</label>
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
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
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
                            <th className="px-6 py-4 font-bold text-slate-700">{t.teacher}</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Amount</th>
                            <th className="px-6 py-4 font-bold text-slate-700">Details</th>
                            <th className="px-6 py-4 font-bold text-slate-700">{t.date}</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-right">{t.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredPayouts.map(payout => (
                            <tr key={payout.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">{payout.user?.name || `User #${payout.user?.id}`}</td>
                                <td className="px-6 py-4 text-lg font-bold text-green-600">{payout.amount} {t.sar}</td>
                                <td className="px-6 py-4 text-slate-600 truncate max-w-xs" title={typeof payout.bank_details === 'string' ? payout.bank_details : JSON.stringify(payout.bank_details)}>
                                    {typeof payout.bank_details === 'string' ? payout.bank_details : "Bank Details"}
                                </td>
                                <td className="px-6 py-4 text-slate-500">{new Date(payout.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right">
                                    {payout.status === 'pending' ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openActionModal(payout, 'approve')} className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title={t.approve}>
                                                <Check size={18} />
                                            </button>
                                            <button onClick={() => openActionModal(payout, 'reject')} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors" title={t.reject}>
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={`capitalize font-medium ${payout.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                                            {payout.status}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filteredPayouts.length === 0 && (
                            <tr><td colSpan={5} className="p-8 text-center text-slate-500">No payout requests found matching filters.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Action Modal */}
            <Modal isOpen={!!selectedPayout} onClose={() => setSelectedPayout(null)} title={actionType === 'approve' ? "Approve Payout" : "Reject Payout"}>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm font-bold text-slate-700">Amount: <span className="text-green-600">{selectedPayout?.amount} {t.sar}</span></p>
                        <p className="text-xs text-slate-500 mt-1">To: {selectedPayout?.user?.name}</p>
                    </div>

                    {actionType === 'approve' ? (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Upload Transfer Receipt</label>
                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50 hover:bg-white transition-colors relative cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                                />
                                <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                                <p className="text-sm text-slate-600">{receiptFile ? receiptFile.name : "Click to upload receipt"}</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Rejection Reason</label>
                            <textarea
                                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none"
                                rows={4}
                                placeholder="Explain why this request is being rejected..."
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" className="flex-1" onClick={() => setSelectedPayout(null)}>Cancel</Button>
                        <Button
                            className={`flex-1 ${actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                            onClick={handleSubmitAction}
                            isLoading={actionLoading}
                        >
                            {actionType === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
