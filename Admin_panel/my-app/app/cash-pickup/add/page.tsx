'use client';

import { useState } from 'react';
import {
    ChevronRight, User, MapPin, Banknote, Check, AlertCircle, Send, RotateCcw,
} from 'lucide-react';
import {
    cashPickupAgentOptions,
} from '@/lib/data';

// ── static option lists ──────────────────────────────────────
const COUNTRY_OPTIONS = [
    { name: 'Bangladesh', flag: '🇧🇩', currency: 'BDT', cities: ['Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi', 'Barishal', 'Rangpur', 'Comilla'] },
    { name: 'Philippines', flag: '🇵🇭', currency: 'PHP', cities: ['Manila', 'Cebu', 'Davao', 'Quezon City'] },
    { name: 'India', flag: '🇮🇳', currency: 'INR', cities: ['Mumbai', 'Delhi', 'Kolkata', 'Bangalore'] },
    { name: 'UAE', flag: '🇦🇪', currency: 'AED', cities: ['Dubai', 'Abu Dhabi', 'Sharjah'] },
];

const PURPOSE_OPTIONS = ['Family Support', 'Education', 'Medical', 'Business', 'Personal'];

const currencySymbol: Record<string, string> = { BDT: '৳', PHP: '₱', INR: '₹', AED: 'AED ' };
const sym = (c: string) => currencySymbol[c] ?? '';

const FEE_PCT = 2.0; // mock pickup fee

// ── Form section wrapper ─────────────────────────────────────
function FormSection({
    icon: Icon, title, children,
}: { icon: React.ElementType; title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon size={15} />
                </span>
                <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
            </div>
            {children}
        </div>
    );
}

function Field({
    label, required, error, children,
}: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-1 block">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
            {error && (
                <p className="text-[10px] text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={10} /> {error}
                </p>
            )}
        </div>
    );
}

const inputClasses = (hasError?: boolean) =>
    `w-full border rounded-lg px-3 py-2 text-[13px] bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 outline-none transition-colors ${hasError
        ? 'border-red-400 dark:border-red-600 focus:border-red-500'
        : 'border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500'
    }`;

interface FormState {
    senderName: string;
    senderMobile: string;
    senderEmail: string;
    recipientName: string;
    recipientMobile: string;
    country: string;
    city: string;
    amount: string;
    purpose: string;
    agent: string;
    note: string;
}

const initialForm: FormState = {
    senderName: '', senderMobile: '', senderEmail: '',
    recipientName: '', recipientMobile: '',
    country: '', city: '', amount: '', purpose: '', agent: '', note: '',
};

export default function AddNewRequestPage() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [submitted, setSubmitted] = useState(false);
    const [generatedId, setGeneratedId] = useState('');

    const selectedCountry = COUNTRY_OPTIONS.find(c => c.name === form.country);
    const currency = selectedCountry?.currency ?? '';
    const amountNum = parseFloat(form.amount) || 0;
    const feeAmount = amountNum * (FEE_PCT / 100);
    const totalAmount = amountNum + feeAmount;

    const update = (key: keyof FormState, value: string) => {
        setForm(prev => {
            const next = { ...prev, [key]: value };
            if (key === 'country') next.city = ''; // reset city when country changes
            return next;
        });
        setErrors(prev => ({ ...prev, [key]: undefined }));
    };

    const validate = (): boolean => {
        const next: Partial<Record<keyof FormState, string>> = {};
        if (!form.senderName.trim()) next.senderName = 'Sender name is required';
        if (!form.senderMobile.trim()) next.senderMobile = 'Sender mobile is required';
        if (!form.recipientName.trim()) next.recipientName = 'Recipient name is required';
        if (!form.recipientMobile.trim()) next.recipientMobile = 'Recipient mobile is required';
        if (!form.country) next.country = 'Select a country';
        if (!form.city) next.city = 'Select a city';
        if (!form.amount || amountNum <= 0) next.amount = 'Enter a valid amount';
        if (!form.purpose) next.purpose = 'Select a purpose';
        if (!form.agent) next.agent = 'Assign an agent';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        const id = `TXN-${Date.now().toString().slice(-10)}`;
        setGeneratedId(id);
        setSubmitted(true);
    };

    const handleReset = () => {
        setForm(initialForm);
        setErrors({});
        setSubmitted(false);
    };

    if (submitted) {
        return (
            <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 max-w-md w-full text-center">
                    <span className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                        <Check size={26} />
                    </span>
                    <h2 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-1">Request Created</h2>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-4">
                        Pickup request has been created and is now pending approval.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-5">
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">Transaction Number</p>
                        <p className="text-[15px] font-bold text-blue-600 dark:text-blue-400">{generatedId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleReset}
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            Create Another
                        </button>
                        <button className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer">
                            View All Requests
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* header */}
            <div className="mb-5">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Add New Request</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Cash Pickup</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Add New Request</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* form column */}
                <div className="lg:col-span-2">
                    <FormSection icon={User} title="Sender Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field label="Sender Name" required error={errors.senderName}>
                                <input
                                    value={form.senderName}
                                    onChange={e => update('senderName', e.target.value)}
                                    placeholder="e.g. John Doe"
                                    className={inputClasses(!!errors.senderName)}
                                />
                            </Field>
                            <Field label="Sender Mobile" required error={errors.senderMobile}>
                                <input
                                    value={form.senderMobile}
                                    onChange={e => update('senderMobile', e.target.value)}
                                    placeholder="+44 7700 900123"
                                    className={inputClasses(!!errors.senderMobile)}
                                />
                            </Field>
                            <div className="sm:col-span-2">
                                <Field label="Sender Email (optional)">
                                    <input
                                        type="email"
                                        value={form.senderEmail}
                                        onChange={e => update('senderEmail', e.target.value)}
                                        placeholder="john.doe@example.com"
                                        className={inputClasses()}
                                    />
                                </Field>
                            </div>
                        </div>
                    </FormSection>

                    <FormSection icon={MapPin} title="Recipient & Pickup Location">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field label="Recipient Name" required error={errors.recipientName}>
                                <input
                                    value={form.recipientName}
                                    onChange={e => update('recipientName', e.target.value)}
                                    placeholder="e.g. Rahim Uddin"
                                    className={inputClasses(!!errors.recipientName)}
                                />
                            </Field>
                            <Field label="Recipient Mobile" required error={errors.recipientMobile}>
                                <input
                                    value={form.recipientMobile}
                                    onChange={e => update('recipientMobile', e.target.value)}
                                    placeholder="+880 1712 345678"
                                    className={inputClasses(!!errors.recipientMobile)}
                                />
                            </Field>
                            <Field label="Country" required error={errors.country}>
                                <select
                                    value={form.country}
                                    onChange={e => update('country', e.target.value)}
                                    className={inputClasses(!!errors.country) + ' cursor-pointer'}
                                >
                                    <option value="">Select country</option>
                                    {COUNTRY_OPTIONS.map(c => (
                                        <option key={c.name} value={c.name}>{c.flag} {c.name}</option>
                                    ))}
                                </select>
                            </Field>
                            <Field label="City" required error={errors.city}>
                                <select
                                    value={form.city}
                                    onChange={e => update('city', e.target.value)}
                                    disabled={!selectedCountry}
                                    className={inputClasses(!!errors.city) + ' cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'}
                                >
                                    <option value="">{selectedCountry ? 'Select city' : 'Select country first'}</option>
                                    {selectedCountry?.cities.map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </Field>
                        </div>
                    </FormSection>

                    <FormSection icon={Banknote} title="Transaction Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                            <Field label="Amount" required error={errors.amount}>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-gray-400 dark:text-gray-500">
                                        {sym(currency) || '—'}
                                    </span>
                                    <input
                                        type="number"
                                        value={form.amount}
                                        onChange={e => update('amount', e.target.value)}
                                        placeholder="0.00"
                                        className={inputClasses(!!errors.amount) + ' pl-8'}
                                    />
                                </div>
                            </Field>
                            <Field label="Currency">
                                <input value={currency || '—'} disabled className={inputClasses() + ' opacity-70 cursor-not-allowed'} />
                            </Field>
                            <Field label="Purpose" required error={errors.purpose}>
                                <select
                                    value={form.purpose}
                                    onChange={e => update('purpose', e.target.value)}
                                    className={inputClasses(!!errors.purpose) + ' cursor-pointer'}
                                >
                                    <option value="">Select purpose</option>
                                    {PURPOSE_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </Field>
                            <Field label="Assign Agent" required error={errors.agent}>
                                <select
                                    value={form.agent}
                                    onChange={e => update('agent', e.target.value)}
                                    className={inputClasses(!!errors.agent) + ' cursor-pointer'}
                                >
                                    <option value="">Select agent</option>
                                    {cashPickupAgentOptions.filter(a => a !== 'All Agents').map(a => (
                                        <option key={a} value={a}>{a}</option>
                                    ))}
                                </select>
                            </Field>
                        </div>
                        <Field label="Note (optional)">
                            <textarea
                                value={form.note}
                                onChange={e => update('note', e.target.value)}
                                rows={3}
                                placeholder="Any additional notes for this pickup request…"
                                className={inputClasses() + ' resize-none'}
                            />
                        </Field>
                    </FormSection>
                </div>

                {/* summary sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sticky top-4">
                        <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-4">Request Summary</h3>

                        <div className="space-y-2.5 mb-4">
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-400 dark:text-gray-500">Sender</span>
                                <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{form.senderName || '—'}</span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-400 dark:text-gray-500">Recipient</span>
                                <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{form.recipientName || '—'}</span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-400 dark:text-gray-500">Pickup Location</span>
                                <span className="text-gray-700 dark:text-gray-200 font-medium text-right">
                                    {form.city ? `${form.city}, ${form.country}` : '—'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-400 dark:text-gray-500">Agent</span>
                                <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{form.agent || '—'}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-2 mb-4">
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-500 dark:text-gray-400">Pickup Amount</span>
                                <span className="text-gray-800 dark:text-gray-100 font-medium">
                                    {currency ? `${sym(currency)}${amountNum.toLocaleString()}` : '—'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-500 dark:text-gray-400">Service Fee ({FEE_PCT}%)</span>
                                <span className="text-gray-800 dark:text-gray-100 font-medium">
                                    {currency ? `${sym(currency)}${feeAmount.toFixed(2)}` : '—'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                                <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Total Payable</span>
                                <span className="text-[15px] font-bold text-blue-600 dark:text-blue-400">
                                    {currency ? `${sym(currency)}${totalAmount.toFixed(2)}` : '—'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleReset}
                                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                            >
                                <RotateCcw size={13} /> Reset
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer"
                            >
                                <Send size={13} /> Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}