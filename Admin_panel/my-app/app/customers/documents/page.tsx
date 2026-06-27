'use client';

import { useState, useMemo } from 'react';
import {
    Search,
    ChevronDown,
    FileText,
    ShieldCheck,
    Clock,
    XCircle,
    Eye,
    Download,
    Check,
    X,
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import {
    custDocStats,
    customerDocumentsData,
    custDocStatusBadge,
    custDocStatusDot,
    custDocTypeOptions,
    custDocStatusOptions,
    customerDocumentsTotalCount,
    type CustomerDocumentRecord,
    type CustDocType,
    type CustDocStatus,
} from '@/lib/data';

const statIconMap = {
    total: FileText,
    verified: ShieldCheck,
    pending: Clock,
    rejected: XCircle,
} as const;

const statIconColor: Record<string, string> = {
    total: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    verified: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400',
    pending: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    rejected: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};

export default function CustomerDocumentsPage() {
    const [documents, setDocuments] = useState<CustomerDocumentRecord[]>(customerDocumentsData);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'All' | CustDocType>('All');
    const [statusFilter, setStatusFilter] = useState<'All' | CustDocStatus>('All');
    const [toast, setToast] = useState<string | null>(null);
    const [previewTarget, setPreviewTarget] = useState<CustomerDocumentRecord | null>(null);
    const [rejectTarget, setRejectTarget] = useState<CustomerDocumentRecord | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2200);
    };

    const handleApprove = (doc: CustomerDocumentRecord) => {
        setDocuments((prev) =>
            prev.map((d) => (d.id === doc.id ? { ...d, status: 'Verified', reviewedBy: 'Admin Rahman', rejectionReason: null } : d))
        );
        showToast(`${doc.docType} for ${doc.customerName} approved`);
    };

    const openRejectModal = (doc: CustomerDocumentRecord) => {
        setRejectTarget(doc);
        setRejectReason('');
    };

    const confirmReject = () => {
        if (!rejectTarget) return;
        if (!rejectReason.trim()) {
            showToast('Please provide a rejection reason');
            return;
        }
        setDocuments((prev) =>
            prev.map((d) =>
                d.id === rejectTarget.id ? { ...d, status: 'Rejected', reviewedBy: 'Admin Rahman', rejectionReason: rejectReason.trim() } : d
            )
        );
        showToast(`${rejectTarget.docType} for ${rejectTarget.customerName} rejected`);
        setRejectTarget(null);
    };

    const handleDownload = (doc: CustomerDocumentRecord) => {
        showToast(`Downloading ${doc.fileName}`);
    };

    const filteredDocs = useMemo(() => {
        return documents.filter((d) => {
            const matchesSearch = searchQuery
                ? d.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                d.fileName.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesType = typeFilter === 'All' ? true : d.docType === typeFilter;
            const matchesStatus = statusFilter === 'All' ? true : d.status === statusFilter;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [documents, searchQuery, typeFilter, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredDocs.length / pageSize));
    const paginatedDocs = filteredDocs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 min-h-screen relative">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg dark:bg-white dark:text-slate-900">
                    {toast}
                </div>
            )}

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Documents</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Review and manage KYC documents uploaded by customers.
                </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {custDocStats.map((stat) => {
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
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search by customer, ID, or file name..."
                        className="bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={typeFilter}
                        onChange={(e) => {
                            setTypeFilter(e.target.value as 'All' | CustDocType);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Document Types</option>
                        {custDocTypeOptions.map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
                <div className="relative flex items-center gap-1 text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value as 'All' | CustDocStatus);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent outline-none pr-1 appearance-none"
                    >
                        <option value="All">All Statuses</option>
                        {custDocStatusOptions.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none" />
                </div>
            </div>

            {/* Document list */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5">
                <div className="overflow-x-auto -mx-2">
                    <table className="w-full text-sm min-w-205">
                        <thead>
                            <tr className="text-left text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                                <th className="py-2.5 px-2 font-medium">Customer</th>
                                <th className="py-2.5 px-2 font-medium">Document</th>
                                <th className="py-2.5 px-2 font-medium">Type</th>
                                <th className="py-2.5 px-2 font-medium">Uploaded</th>
                                <th className="py-2.5 px-2 font-medium">Status</th>
                                <th className="py-2.5 px-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedDocs.map((doc) => (
                                <tr key={doc.id} className="border-b border-slate-50 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                    <td className="py-3 px-2">
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <img src={doc.customerAvatar} alt={doc.customerName} className="w-7 h-7 rounded-full" />
                                            <div>
                                                <p className="text-sm text-slate-700 dark:text-slate-200">{doc.customerName}</p>
                                                <p className="text-[11px] text-slate-400 dark:text-slate-500">{doc.customerId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-2">
                                        <button onClick={() => setPreviewTarget(doc)} className="text-left hover:underline">
                                            <p className="text-xs font-mono text-slate-600 dark:text-slate-300">{doc.fileName}</p>
                                            <p className="text-[11px] text-slate-400 dark:text-slate-500">{doc.fileSizeKb} KB</p>
                                        </button>
                                    </td>
                                    <td className="py-3 px-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">{doc.docType}</td>
                                    <td className="py-3 px-2 text-slate-500 dark:text-slate-400 whitespace-nowrap">{doc.uploadedAt}</td>
                                    <td className="py-3 px-2">
                                        <span className="flex items-center gap-1.5 text-xs font-medium whitespace-nowrap">
                                            <span className={`w-1.5 h-1.5 rounded-full ${custDocStatusDot[doc.status]}`} />
                                            <span className={`px-2 py-0.5 rounded-full ${custDocStatusBadge[doc.status]}`}>{doc.status}</span>
                                        </span>
                                    </td>
                                    <td className="py-3 px-2">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <button
                                                onClick={() => setPreviewTarget(doc)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                                aria-label="Preview"
                                            >
                                                <Eye size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDownload(doc)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                                                aria-label="Download"
                                            >
                                                <Download size={14} />
                                            </button>
                                            {doc.status === 'Pending Review' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(doc)}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10 dark:hover:text-green-400"
                                                        aria-label="Approve"
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => openRejectModal(doc)}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                                                        aria-label="Reject"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedDocs.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">
                                        No documents match your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 text-xs text-slate-500 dark:text-slate-400">
                    <p>
                        Showing {paginatedDocs.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
                        {Math.min(currentPage * pageSize, filteredDocs.length)} of {filteredDocs.length} documents
                    </p>
                    <div className="flex items-center gap-1">
                        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40">
                            <ChevronLeft size={14} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setCurrentPage(p)}
                                className={`w-7 h-7 rounded-lg text-xs ${currentPage === p ? 'bg-blue-600 text-white' : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}
                            >
                                {p}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40">
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Preview modal */}
            {previewTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="font-semibold text-slate-800 dark:text-white">{previewTarget.docType}</h2>
                            <button onClick={() => setPreviewTarget(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl h-48 flex items-center justify-center">
                                <FileText size={40} className="text-slate-400 dark:text-slate-600" />
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">Customer</p>
                                    <p className="text-slate-700 dark:text-slate-200">{previewTarget.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">File</p>
                                    <p className="text-slate-700 dark:text-slate-200 font-mono text-xs">{previewTarget.fileName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">Uploaded</p>
                                    <p className="text-slate-700 dark:text-slate-200">{previewTarget.uploadedAt}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">Reviewed By</p>
                                    <p className="text-slate-700 dark:text-slate-200">{previewTarget.reviewedBy ?? 'Not yet reviewed'}</p>
                                </div>
                                {previewTarget.expiresAt && (
                                    <div>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">Expires</p>
                                        <p className="text-slate-700 dark:text-slate-200">{previewTarget.expiresAt}</p>
                                    </div>
                                )}
                            </div>
                            {previewTarget.rejectionReason && (
                                <div className="bg-red-50 dark:bg-red-500/10 rounded-xl p-3 flex items-start gap-2">
                                    <AlertTriangle size={14} className="text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                                    <p className="text-xs text-red-700 dark:text-red-400">{previewTarget.rejectionReason}</p>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => handleDownload(previewTarget)}
                                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                <Download size={14} /> Download
                            </button>
                            <button onClick={() => setPreviewTarget(null)} className="text-sm px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject modal */}
            {rejectTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-sm p-5">
                        <h2 className="font-semibold text-slate-800 dark:text-white mb-2">Reject Document</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                            Provide a reason for rejecting <span className="font-medium text-slate-700 dark:text-slate-200">{rejectTarget.docType}</span> for{' '}
                            {rejectTarget.customerName}.
                        </p>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            rows={3}
                            placeholder="e.g. Document is blurry, name mismatch..."
                            className="w-full text-sm px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-blue-500 resize-none mb-4"
                        />
                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setRejectTarget(null)}
                                className="text-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button onClick={confirmReject} className="text-sm px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium">
                                Reject Document
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}