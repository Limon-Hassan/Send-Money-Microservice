'use client';

import { useState } from 'react';
import {
    ChevronRight, User, Building2, Landmark, Percent, AlertCircle, Send, RotateCcw, Check,
} from 'lucide-react';

// ── static option lists ──────────────────────────────────────
const COUNTRY_OPTIONS = [
    { name: 'Bangladesh', flag: '🇧🇩', currency: 'BDT' },
    { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
    { name: 'Pakistan', flag: '🇵🇰', currency: 'PKR' },
    { name: 'India', flag: '🇮🇳', currency: 'INR' },
    { name: 'UAE', flag: '🇦🇪', currency: 'AED' },
    { name: 'Malaysia', flag: '🇲🇾', currency: 'MYR' },
    { name: 'Philippines', flag: '🇵🇭', currency: 'PHP' },
    { name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR' },
];

const BRANCH_OPTIONS = [
    'Dhaka Main Branch', 'London Branch', 'Karachi Branch', 'Mumbai Branch', 'Chittagong Branch',
];

const AGENT_TYPE_OPTIONS = ['Individual Agent', 'Business / Corporate Agent', 'Sub-Agent'];

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
    agentType: string;
    businessName: string;
    contactName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    branch: string;
    commissionRate: string;
    dailyLimit: string;
    note: string;
}

const initialForm: FormState = {
    agentType: '', businessName: '', contactName: '', email: '', phone: '',
    country: '', city: '', address: '', branch: '', commissionRate: '2.0', dailyLimit: '', note: '',
};

export default function AddAgentPage() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [submitted, setSubmitted] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');

    const selectedCountry = COUNTRY_OPTIONS.find(c => c.name === form.country);

    const update = (key: keyof FormState, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
        setErrors(prev => ({ ...prev, [key]: undefined }));
    };

    const validate = (): boolean => {
        const next: Partial<Record<keyof FormState, string>> = {};
        if (!form.agentType) next.agentType = 'Select an agent type';
        if (!form.businessName.trim()) next.businessName = 'Business / agent name is required';
        if (!form.contactName.trim()) next.contactName = 'Contact person name is required';
        if (!form.email.trim()) next.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address';
        if (!form.phone.trim()) next.phone = 'Phone number is required';
        if (!form.country) next.country = 'Select a country';
        if (!form.city.trim()) next.city = 'City is required';
        if (!form.branch) next.branch = 'Assign a branch';
        if (!form.commissionRate || parseFloat(form.commissionRate) <= 0) next.commissionRate = 'Enter a valid commission rate';
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        const code = `AGT-${1000 + Math.floor(Math.random() * 900)}`;
        setGeneratedCode(code);
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
                    <h2 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-1">Agent Added</h2>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-4">
                        {form.businessName} has been added and is now pending approval.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-5">
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">Agent Code</p>
                        <p className="text-[15px] font-bold text-blue-600 dark:text-blue-400">{generatedCode}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleReset}
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-[12px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        >
                            Add Another
                        </button>
                        <button className="flex-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 cursor-pointer">
                            View Agent List
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
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Add Agent</h1>
                <div className="flex items-center gap-2 text-[12px] text-gray-400 dark:text-gray-500 mt-1">
                    <span>Dashboard</span><ChevronRight size={12} />
                    <span>Agents & Partners</span><ChevronRight size={12} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Add Agent</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* form column */}
                <div className="lg:col-span-2">
                    <FormSection icon={User} title="Agent Information">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="sm:col-span-2">
                                <Field label="Agent Type" required error={errors.agentType}>
                                    <select
                                        value={form.agentType}
                                        onChange={e => update('agentType', e.target.value)}
                                        className={inputClasses(!!errors.agentType) + ' cursor-pointer'}
                                    >
                                        <option value="">Select agent type</option>
                                        {AGENT_TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </Field>
                            </div>
                            <div className="sm:col-span-2">
                                <Field label="Business / Agent Name" required error={errors.businessName}>
                                    <input
                                        value={form.businessName}
                                        onChange={e => update('businessName', e.target.value)}
                                        placeholder="e.g. Skyline Transfers"
                                        className={inputClasses(!!errors.businessName)}
                                    />
                                </Field>
                            </div>
                            <Field label="Contact Person Name" required error={errors.contactName}>
                                <input
                                    value={form.contactName}
                                    onChange={e => update('contactName', e.target.value)}
                                    placeholder="e.g. Kamal Hossain"
                                    className={inputClasses(!!errors.contactName)}
                                />
                            </Field>
                            <Field label="Email" required error={errors.email}>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={e => update('email', e.target.value)}
                                    placeholder="agent@example.com"
                                    className={inputClasses(!!errors.email)}
                                />
                            </Field>
                            <Field label="Phone" required error={errors.phone}>
                                <input
                                    value={form.phone}
                                    onChange={e => update('phone', e.target.value)}
                                    placeholder="+880 1712 345678"
                                    className={inputClasses(!!errors.phone)}
                                />
                            </Field>
                        </div>
                    </FormSection>

                    <FormSection icon={Building2} title="Location Details">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field label="Country" required error={errors.country}>
                                <select
                                    value={form.country}
                                    onChange={e => update('country', e.target.value)}
                                    className={inputClasses(!!errors.country) + ' cursor-pointer'}
                                >
                                    <option value="">Select country</option>
                                    {COUNTRY_OPTIONS.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
                                </select>
                            </Field>
                            <Field label="City" required error={errors.city}>
                                <input
                                    value={form.city}
                                    onChange={e => update('city', e.target.value)}
                                    placeholder="e.g. Dhaka"
                                    className={inputClasses(!!errors.city)}
                                />
                            </Field>
                            <div className="sm:col-span-2">
                                <Field label="Address (optional)">
                                    <input
                                        value={form.address}
                                        onChange={e => update('address', e.target.value)}
                                        placeholder="Street address"
                                        className={inputClasses()}
                                    />
                                </Field>
                            </div>
                        </div>
                    </FormSection>

                    <FormSection icon={Landmark} title="Branch Assignment">
                        <Field label="Assign Branch" required error={errors.branch}>
                            <select
                                value={form.branch}
                                onChange={e => update('branch', e.target.value)}
                                className={inputClasses(!!errors.branch) + ' cursor-pointer'}
                            >
                                <option value="">Select branch</option>
                                {BRANCH_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </Field>
                    </FormSection>

                    <FormSection icon={Percent} title="Commission & Limits">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                            <Field label="Commission Rate (%)" required error={errors.commissionRate}>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={form.commissionRate}
                                    onChange={e => update('commissionRate', e.target.value)}
                                    placeholder="2.0"
                                    className={inputClasses(!!errors.commissionRate)}
                                />
                            </Field>
                            <Field label="Daily Transaction Limit (optional)">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-gray-400 dark:text-gray-500">
                                        {selectedCountry ? selectedCountry.currency : '—'}
                                    </span>
                                    <input
                                        type="number"
                                        value={form.dailyLimit}
                                        onChange={e => update('dailyLimit', e.target.value)}
                                        placeholder="0.00"
                                        className={inputClasses() + ' pl-14'}
                                    />
                                </div>
                            </Field>
                        </div>
                        <Field label="Note (optional)">
                            <textarea
                                value={form.note}
                                onChange={e => update('note', e.target.value)}
                                rows={3}
                                placeholder="Any additional notes about this agent…"
                                className={inputClasses() + ' resize-none'}
                            />
                        </Field>
                    </FormSection>
                </div>

                {/* summary sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sticky top-4">
                        <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 mb-4">Agent Summary</h3>

                        <div className="space-y-2.5 mb-4">
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-400 dark:text-gray-500">Agent Type</span>
                                <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{form.agentType || '—'}</span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-400 dark:text-gray-500">Business Name</span>
                                <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{form.businessName || '—'}</span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-400 dark:text-gray-500">Contact</span>
                                <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{form.contactName || '—'}</span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-400 dark:text-gray-500">Location</span>
                                <span className="text-gray-700 dark:text-gray-200 font-medium text-right">
                                    {form.city ? `${form.city}, ${form.country}` : '—'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-400 dark:text-gray-500">Branch</span>
                                <span className="text-gray-700 dark:text-gray-200 font-medium text-right">{form.branch || '—'}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-2 mb-4">
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-500 dark:text-gray-400">Commission Rate</span>
                                <span className="text-gray-800 dark:text-gray-100 font-medium">{form.commissionRate || '0'}%</span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                                <span className="text-gray-500 dark:text-gray-400">Daily Limit</span>
                                <span className="text-gray-800 dark:text-gray-100 font-medium">
                                    {form.dailyLimit ? `${selectedCountry?.currency ?? ''} ${parseFloat(form.dailyLimit).toLocaleString()}` : 'No limit set'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                                <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">Initial Status</span>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                                    Pending Approval
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
                                <Send size={13} /> Submit Agent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}