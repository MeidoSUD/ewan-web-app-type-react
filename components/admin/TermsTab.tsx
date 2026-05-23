import React, { useState, useEffect, useCallback } from 'react';
import { adminService, TermsConditions, TermsConditionsPayload } from '../../services/api';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  FileText, Plus, Edit2, Trash2, RefreshCw, Eye, CheckCircle,
  XCircle, Filter, X, Save, Loader, AlertTriangle, ChevronDown
} from 'lucide-react';

type TermsType = 'terms' | 'conditions' | 'privacy_policy';

const TYPE_LABELS: Record<TermsType, { en: string; ar: string; color: string }> = {
  terms: { en: 'Terms of Service', ar: 'شروط الخدمة', color: 'bg-blue-100 text-blue-700' },
  conditions: { en: 'Conditions', ar: 'الشروط', color: 'bg-purple-100 text-purple-700' },
  privacy_policy: { en: 'Privacy Policy', ar: 'سياسة الخصوصية', color: 'bg-green-100 text-green-700' },
};

const EMPTY_FORM: TermsConditionsPayload = {
  title_en: '',
  title_ar: '',
  content_en: '',
  content_ar: '',
  type: 'terms',
  status: true,
  role_id: null,
};

// ─── Modal ──────────────────────────────────────────────────────────────────
interface ModalProps { title: string; onClose: () => void; children: React.ReactNode; }
const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </div>
  </div>
);

// ─── Form ────────────────────────────────────────────────────────────────────
interface TermsFormProps { initial: TermsConditionsPayload; onSave: (p: TermsConditionsPayload) => Promise<void>; saving: boolean; }
const TermsForm: React.FC<TermsFormProps> = ({ initial, onSave, saving }) => {
  const [form, setForm] = useState<TermsConditionsPayload>(initial);
  const set = (key: keyof TermsConditionsPayload, value: any) => setForm(f => ({ ...f, [key]: value }));

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-5">
      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
        <div className="relative">
          <select
            value={form.type}
            onChange={e => set('type', e.target.value as TermsType)}
            className="w-full appearance-none border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-10"
          >
            <option value="terms">Terms of Service</option>
            <option value="conditions">Conditions</option>
            <option value="privacy_policy">Privacy Policy</option>
          </select>
          <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Titles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title (English)</label>
          <input required value={form.title_en} onChange={e => set('title_en', e.target.value)}
            placeholder="Enter English title"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 text-right w-full">العنوان (عربي)</label>
          <input required dir="rtl" value={form.title_ar} onChange={e => set('title_ar', e.target.value)}
            placeholder="أدخل العنوان بالعربية"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>

      {/* Content EN */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Content (English)</label>
        <textarea required rows={6} value={form.content_en} onChange={e => set('content_en', e.target.value)}
          placeholder="Enter full content in English..."
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y" />
      </div>

      {/* Content AR */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1 text-right w-full">المحتوى (عربي)</label>
        <textarea required dir="rtl" rows={6} value={form.content_ar} onChange={e => set('content_ar', e.target.value)}
          placeholder="أدخل المحتوى الكامل بالعربية..."
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y" />
      </div>

      {/* Status Toggle */}
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => set('status', !form.status)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.status ? 'bg-green-500' : 'bg-slate-300'}`}>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.status ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        <span className="text-sm font-medium text-slate-700">
          {form.status ? 'Active (will deactivate others of same type)' : 'Inactive'}
        </span>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60">
          {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

// ─── View Modal ───────────────────────────────────────────────────────────────
const ViewModal: React.FC<{ item: TermsConditions; onClose: () => void }> = ({ item, onClose }) => {
  const ti = TYPE_LABELS[item.type as TermsType] ?? { en: item.type, ar: item.type, color: 'bg-slate-100 text-slate-600' };
  return (
    <Modal title={item.title_en} onClose={onClose}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ti.color}`}>{ti.en}</span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">v{item.version}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {item.status ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div className="border border-slate-100 rounded-xl p-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">English</h3>
          <h4 className="font-semibold text-slate-800 mb-1">{item.title_en}</h4>
          <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{item.content_en}</p>
        </div>
        <div className="border border-slate-100 rounded-xl p-4" dir="rtl">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">عربي</h3>
          <h4 className="font-semibold text-slate-800 mb-1">{item.title_ar}</h4>
          <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{item.content_ar}</p>
        </div>
      </div>
    </Modal>
  );
};

// ─── Main Tab ─────────────────────────────────────────────────────────────────
export const TermsTab: React.FC = () => {
  const { language } = useLanguage();

  const [items, setItems] = useState<TermsConditions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState<TermsConditions | null>(null);
  const [viewItem, setViewItem] = useState<TermsConditions | null>(null);

  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchData = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const filters: any = {};
      if (filterType) filters.type = filterType;
      if (filterStatus !== '') filters.status = filterStatus;
      if (includeDeleted) filters.include_deleted = '1';
      const res = await adminService.getTermsConditions(filters);
      const list = res?.data ?? res ?? [];
      setItems(Array.isArray(list) ? list : []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load terms and conditions.');
    } finally {
      setLoading(false);
    }
  }, [filterType, filterStatus, includeDeleted]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreate = async (payload: TermsConditionsPayload) => {
    setSaving(true);
    try {
      await adminService.createTermsCondition(payload);
      showToast('Created successfully!');
      setShowCreate(false);
      fetchData();
    } catch (e: any) { showToast(e?.message || 'Failed to create.', false); }
    finally { setSaving(false); }
  };

  const handleUpdate = async (payload: TermsConditionsPayload) => {
    if (!editItem) return;
    setSaving(true);
    try {
      await adminService.updateTermsCondition(editItem.id, payload);
      showToast('Updated successfully!');
      setEditItem(null);
      fetchData();
    } catch (e: any) { showToast(e?.message || 'Failed to update.', false); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Soft-delete this record? It can be restored later.')) return;
    setActionId(id);
    try {
      await adminService.deleteTermsCondition(id);
      showToast('Deleted (soft). You can restore it anytime.');
      fetchData();
    } catch (e: any) { showToast(e?.message || 'Failed to delete.', false); }
    finally { setActionId(null); }
  };

  const handleRestore = async (id: number) => {
    setActionId(id);
    try {
      await adminService.restoreTermsCondition(id);
      showToast('Restored successfully!');
      fetchData();
    } catch (e: any) { showToast(e?.message || 'Failed to restore.', false); }
    finally { setActionId(null); }
  };

  const typeInfo = (type: string) =>
    TYPE_LABELS[type as TermsType] ?? { en: type, ar: type, color: 'bg-slate-100 text-slate-600' };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.ok ? 'bg-green-500' : 'bg-red-500'}`}>
          {toast.ok ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FileText className="text-primary" size={26} /> Terms &amp; Conditions
          </h1>
          <p className="text-sm text-slate-500 mt-1">Manage platform terms, conditions and privacy policy.</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
          <Plus size={18} /> Add New
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
        <Filter size={16} className="text-slate-400" />
        <select value={filterType} onChange={e => setFilterType(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option value="">All Types</option>
          <option value="terms">Terms of Service</option>
          <option value="conditions">Conditions</option>
          <option value="privacy_policy">Privacy Policy</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option value="">All Statuses</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
          <input type="checkbox" checked={includeDeleted} onChange={e => setIncludeDeleted(e.target.checked)} className="rounded text-primary" />
          Include Deleted
        </label>
        <button onClick={fetchData} className="ml-auto flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader size={36} className="animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <AlertTriangle className="mx-auto text-red-400 mb-2" size={32} />
          <p className="text-red-600 font-medium">{error}</p>
          <button onClick={fetchData} className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">Retry</button>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center shadow-sm">
          <FileText className="mx-auto text-slate-300 mb-3" size={48} />
          <p className="text-slate-500 font-medium">No records found.</p>
          <p className="text-slate-400 text-sm mt-1">Try adjusting the filters or add a new entry.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map(item => {
            const ti = typeInfo(item.type);
            const isDeleted = !!item.deleted_at;
            const isActing = actionId === item.id;
            return (
              <div key={item.id}
                className={`bg-white border rounded-2xl shadow-sm p-5 transition-all ${isDeleted ? 'border-red-100 opacity-70' : 'border-slate-100 hover:shadow-md'}`}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${ti.color}`}>
                        {language === 'ar' ? ti.ar : ti.en}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">v{item.version}</span>
                      {item.status
                        ? <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1"><CheckCircle size={10} /> Active</span>
                        : <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 flex items-center gap-1"><XCircle size={10} /> Inactive</span>}
                      {isDeleted && <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600">Deleted</span>}
                    </div>
                    <h3 className="font-bold text-slate-800 text-base truncate">{item.title_en}</h3>
                    <p className="text-sm text-slate-500 text-right truncate" dir="rtl">{item.title_ar}</p>
                    <p className="text-sm text-slate-400 mt-2 line-clamp-2">{item.content_en}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      Created: {item.created_at ? new Date(item.created_at).toLocaleDateString() : '—'}
                    </p>
                  </div>
                  <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                    <button onClick={() => setViewItem(item)} title="View"
                      className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors">
                      <Eye size={16} />
                    </button>
                    {!isDeleted && (
                      <>
                        <button onClick={() => setEditItem(item)} title="Edit"
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} disabled={isActing} title="Delete"
                          className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50">
                          {isActing ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
                      </>
                    )}
                    {isDeleted && (
                      <button onClick={() => handleRestore(item.id)} disabled={isActing} title="Restore"
                        className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-green-50 hover:text-green-600 transition-colors disabled:opacity-50">
                        {isActing ? <Loader size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <Modal title="Add New Terms & Conditions" onClose={() => setShowCreate(false)}>
          <TermsForm initial={EMPTY_FORM} onSave={handleCreate} saving={saving} />
        </Modal>
      )}

      {/* Edit Modal */}
      {editItem && (
        <Modal title={`Edit: ${editItem.title_en}`} onClose={() => setEditItem(null)}>
          <TermsForm
            initial={{
              title_en: editItem.title_en,
              title_ar: editItem.title_ar,
              content_en: editItem.content_en,
              content_ar: editItem.content_ar,
              type: editItem.type as TermsConditionsPayload['type'],
              status: Boolean(editItem.status),
              role_id: editItem.role_id ?? null,
            }}
            onSave={handleUpdate}
            saving={saving}
          />
        </Modal>
      )}

      {/* View Modal */}
      {viewItem && <ViewModal item={viewItem} onClose={() => setViewItem(null)} />}
    </div>
  );
};
