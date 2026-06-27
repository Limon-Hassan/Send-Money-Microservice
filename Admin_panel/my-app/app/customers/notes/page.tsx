'use client';

import { useState, useMemo } from 'react';
import {
    Search,
    ChevronDown,
    Plus,
    Pin,
    PinOff,
    Trash2,
    X,
    StickyNote,
    AlertTriangle,
    Users,
} from 'lucide-react';
import {
    custNoteStats,
    customerNotesData,
    custNoteCategoryBadge,
    custNoteCategoryOptions,
    customerNotesTotalCount,
    type CustomerNoteRecord,
    type CustNoteCategory,
} from '@/lib/data';

const statIconMap = {
    total: StickyNote,
    pinned: Pin,
    risk: AlertTriangle,
    customers: Users,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    pinned: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    risk: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
    customers: 'bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
};

export default function CustomerNotesPage() {
    const [notes, setNotes] = useState<CustomerNoteRecord[]>(customerNotesData);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<'All' | CustNoteCategory>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<CustomerNoteRecord | null>(null);

    // form state
    const [formCustomerName, setFormCustomerName] = useState('');
    const [formCategory, setFormCategory] = useState<CustNoteCategory>('General');
    const [formContent, setFormContent] = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const resetForm = () => {
        setFormCustomerName('');
        setFormCategory('General');
        setFormContent('');
    };

    const handleTogglePin = (note: CustomerNoteRecord) => {
        setNotes((prev) => prev.map((n) => (n.id === note.id ? { ...n, isPinned: !n.isPinned } : n)));
        showToast(note.isPinned ? 'Note unpinned' : 'Note pinned to top');
    };

    const handleCreateSubmit = () => {
        if (!formCustomerName.trim() || !formContent.trim()) {
            showToast('Please provide a customer name and note content');
            return;
        }
        const newNote: CustomerNoteRecord = {
            id: `note-${Date.now()}`,
            customerId: `CUST_${Math.floor(Math.random() * 9000) + 1000}`,
            customerName: formCustomerName.trim(),
            customerAvatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 50) + 1}`,
            category: formCategory,
            content: formContent.trim(),
            authorName: 'Admin Rahman',
            authorAvatar: 'https://i.pravatar.cc/40?img=12',
            isPinned: false,
            createdAt: 'Just now',
        };
        setNotes((prev) => [newNote, ...prev]);
        showToast('Note added');
        setCreateModalOpen(false);
        resetForm();
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        setNotes((prev) => prev.filter((n) => n.id !== deleteTarget.id));
        showToast('Note deleted');
        setDeleteTarget(null);
    };

    const filteredNotes = useMemo(() => {
        const result = notes.filter((n) => {
            const matchesSearch = searchQuery
                ? n.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.customerId.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesCategory = categoryFilter === 'All' ? true : n.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
        return [...result].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    }, [notes, searchQuery, categoryFilter]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen relative">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg dark:bg-white dark:text-slate-900">
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Notes</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Internal notes and observations left by your team about customers.
                    </p>
                </div>
                <button
                    onClick={() => setCreateModalOpen(true)}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium w-fit"
                >
                    <Plus size={16} />
                    Add Note
                </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {custNoteStats.map((stat) => {
                    const Icon = statIconMap[stat.icon];
                    return (
                        <div key={stat.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                            <span className={`p-2.5 rounded-xl ${statIconColor[stat.icon]}`}>
                                <Icon size={18} />
                            </span>
                            <div>
                                <p className="text-xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-4 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 flex-1 min-w-50">
                    <Search size={15} />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by customer or note content..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value as 'All' | CustNoteCategory)}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Categories</option>
                        {custNoteCategoryOptions.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
            </div>

            {/* Notes timeline */}
            <div className="flex flex-col gap-3">
                {filteredNotes.map((note) => (
                    <div
                        key={note.id}
                        className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 sm:p-5 ${note.isPinned ? 'border-amber-300 dark:border-amber-500/40' : 'border-slate-200 dark:border-slate-800'
                            }`}
                    >
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                                <img src={note.customerAvatar} alt={note.customerName} className="w-9 h-9 rounded-full" />
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-sm font-medium text-slate-800 dark:text-white">{note.customerName}</p>
                                        <span className="text-[11px] text-slate-400 dark:text-slate-500">{note.customerId}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500">{note.createdAt}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${custNoteCategoryBadge[note.category]}`}>{note.category}</span>
                                {note.isPinned && (
                                    <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                                        <Pin size={10} fill="currentColor" /> Pinned
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{note.content}</p>

                        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                            <div className="flex items-center gap-2">
                                <img src={note.authorAvatar} alt={note.authorName} className="w-5 h-5 rounded-full" />
                                <span className="text-xs text-slate-500 dark:text-slate-400">By {note.authorName}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => handleTogglePin(note)}
                                    className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    {note.isPinned ? <PinOff size={13} /> : <Pin size={13} />}
                                    {note.isPinned ? 'Unpin' : 'Pin'}
                                </button>
                                <button
                                    onClick={() => setDeleteTarget(note)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                    aria-label="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredNotes.length === 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center text-slate-400 text-sm">
                        No notes match your filters.
                    </div>
                )}
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 text-center">
                Showing {filteredNotes.length} of {customerNotesTotalCount.toLocaleString()} notes
            </p>

            {/* Create note modal */}
            {createModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">Add Note</h2>
                            <button
                                onClick={() => {
                                    setCreateModalOpen(false);
                                    resetForm();
                                }}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Customer Name</label>
                                <input
                                    value={formCustomerName}
                                    onChange={(e) => setFormCustomerName(e.target.value)}
                                    placeholder="e.g. Kamal Hossain"
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Category</label>
                                <select
                                    value={formCategory}
                                    onChange={(e) => setFormCategory(e.target.value as CustNoteCategory)}
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none"
                                >
                                    {custNoteCategoryOptions.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Note</label>
                                <textarea
                                    value={formContent}
                                    onChange={(e) => setFormContent(e.target.value)}
                                    rows={4}
                                    placeholder="Write your note here..."
                                    className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => {
                                    setCreateModalOpen(false);
                                    resetForm();
                                }}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button onClick={handleCreateSubmit} className="text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium">
                                Add Note
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Delete Note</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                            Are you sure you want to delete this note about{' '}
                            <span className="font-medium text-slate-700 dark:text-slate-200">{deleteTarget.customerName}</span>? This cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="text-sm px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}