"use client";
import { useState } from "react";
import {
    addCustCountryOptions,
    addCustIdTypeOptions,
    addCustAddressProofOptions,
    addCustKycTierOptions,
    addCustKycTierDescription,
    addCustCurrencyOptions,
    addCustInitialStatusOptions,
    addCustGenderOptions,
    addCustReferralSourceOptions,
    addCustRecentEntries,
    type AddCustKycTier,
    type AddCustIdType,
    type AddCustAddressProofType,
    type AddCustInitialStatus,
    type AddCustRecentEntry,
} from "@/lib/data";

const statusBadge = (status: string) => {
    const map: Record<string, string> = {
        Active: "bg-green-50 text-green-700 border border-green-200",
        "Pending Verification": "bg-yellow-50 text-yellow-700 border border-yellow-200",
        Restricted: "bg-red-50 text-red-700 border border-red-200",
    };
    return map[status] || "bg-gray-100 text-gray-600";
};

export default function AddCustomerPage() {
    const [toast, setToast] = useState<string | null>(null);
    const [recentEntries, setRecentEntries] = useState<AddCustRecentEntry[]>(addCustRecentEntries);

    // Personal Info
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState(addCustCountryOptions[0].code);
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState(addCustGenderOptions[0]);

    // Address
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    // Identity Verification
    const [idType, setIdType] = useState<AddCustIdType>(addCustIdTypeOptions[0]);
    const [idNumber, setIdNumber] = useState("");
    const [addressProofType, setAddressProofType] = useState<AddCustAddressProofType>(addCustAddressProofOptions[0]);
    const [idDocAttached, setIdDocAttached] = useState(false);
    const [addressDocAttached, setAddressDocAttached] = useState(false);
    const [selfieAttached, setSelfieAttached] = useState(false);

    // Account Settings
    const [kycTier, setKycTier] = useState<AddCustKycTier>(addCustKycTierOptions[0]);
    const [initialStatus, setInitialStatus] = useState<AddCustInitialStatus>("Pending Verification");
    const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>(["GBP"]);
    const [referralSource, setReferralSource] = useState(addCustReferralSourceOptions[0]);
    const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);
    const [requireKycBeforeTransacting, setRequireKycBeforeTransacting] = useState(true);

    // Notes
    const [internalNote, setInternalNote] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedCountry = addCustCountryOptions.find(c => c.code === countryCode) || addCustCountryOptions[0];

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    };

    const toggleCurrency = (code: string) => {
        setSelectedCurrencies(prev =>
            prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
        );
    };

    const resetForm = () => {
        setFullName("");
        setEmail("");
        setCountryCode(addCustCountryOptions[0].code);
        setPhone("");
        setDob("");
        setGender(addCustGenderOptions[0]);
        setAddressLine1("");
        setAddressLine2("");
        setCity("");
        setPostalCode("");
        setIdType(addCustIdTypeOptions[0]);
        setIdNumber("");
        setAddressProofType(addCustAddressProofOptions[0]);
        setIdDocAttached(false);
        setAddressDocAttached(false);
        setSelfieAttached(false);
        setKycTier(addCustKycTierOptions[0]);
        setInitialStatus("Pending Verification");
        setSelectedCurrencies(["GBP"]);
        setReferralSource(addCustReferralSourceOptions[0]);
        setSendWelcomeEmail(true);
        setRequireKycBeforeTransacting(true);
        setInternalNote("");
        setErrors({});
    };

    const validate = () => {
        const next: Record<string, string> = {};
        if (!fullName.trim()) next.fullName = "Full name is required";
        if (!email.trim()) next.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address";
        if (!phone.trim()) next.phone = "Phone number is required";
        if (selectedCurrencies.length === 0) next.currencies = "Select at least one wallet currency";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) {
            showToast("Please fix the highlighted fields");
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            const newEntry: AddCustRecentEntry = {
                id: `new-${Date.now()}`,
                name: fullName.trim(),
                email: email.trim(),
                country: selectedCountry.name,
                countryFlag: selectedCountry.flag,
                kycTier,
                status: initialStatus,
                createdAt: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
            };
            setRecentEntries(prev => [newEntry, ...prev]);
            setIsSubmitting(false);
            showToast(`Customer "${newEntry.name}" created successfully`);
            resetForm();
        }, 900);
    };

    return (
        <div className="space-y-4">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {toast}
                </div>
            )}

            {/* Header */}
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Add Customer</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard &gt; Customers &gt; Add Customer</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {/* Form column */}
                <div className="xl:col-span-2 space-y-4">

                    {/* Personal Information */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Personal Information</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name *</label>
                                <input
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    placeholder="e.g. John Rahman"
                                    className={`w-full px-3 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 ${errors.fullName ? "border-red-300" : "border-gray-200 dark:border-gray-700"}`}
                                />
                                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address *</label>
                                <input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className={`w-full px-3 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 ${errors.email ? "border-red-300" : "border-gray-200 dark:border-gray-700"}`}
                                />
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Number *</label>
                                <div className="flex gap-2">
                                    <select
                                        value={countryCode}
                                        onChange={e => setCountryCode(e.target.value)}
                                        className="px-2 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    >
                                        {addCustCountryOptions.map(c => (
                                            <option key={c.code} value={c.code}>{c.flag} {c.dialCode}</option>
                                        ))}
                                    </select>
                                    <input
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder="7700 900123"
                                        className={`flex-1 px-3 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 ${errors.phone ? "border-red-300" : "border-gray-200 dark:border-gray-700"}`}
                                    />
                                </div>
                                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={e => setDob(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Gender</label>
                                <select
                                    value={gender}
                                    onChange={e => setGender(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    {addCustGenderOptions.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Country / Residency</label>
                                <select
                                    value={countryCode}
                                    onChange={e => setCountryCode(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    {addCustCountryOptions.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Residential Address</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Address Line 1</label>
                                <input
                                    value={addressLine1}
                                    onChange={e => setAddressLine1(e.target.value)}
                                    placeholder="Street address"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Address Line 2 (optional)</label>
                                <input
                                    value={addressLine2}
                                    onChange={e => setAddressLine2(e.target.value)}
                                    placeholder="Apartment, suite, etc."
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">City</label>
                                <input
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                    placeholder="e.g. London"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Postal Code</label>
                                <input
                                    value={postalCode}
                                    onChange={e => setPostalCode(e.target.value)}
                                    placeholder="e.g. SW1A 1AA"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Identity Verification */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Identity Verification (KYC)</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">ID Document Type</label>
                                <select
                                    value={idType}
                                    onChange={e => setIdType(e.target.value as AddCustIdType)}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    {addCustIdTypeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">ID Document Number</label>
                                <input
                                    value={idNumber}
                                    onChange={e => setIdNumber(e.target.value)}
                                    placeholder="Document number"
                                    className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Address Proof Type</label>
                                <select
                                    value={addressProofType}
                                    onChange={e => setAddressProofType(e.target.value as AddCustAddressProofType)}
                                    className="w-full sm:w-64 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                                >
                                    {addCustAddressProofOptions.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Document uploads */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { label: idType, attached: idDocAttached, setAttached: setIdDocAttached, hint: "ID Proof" },
                                { label: addressProofType, attached: addressDocAttached, setAttached: setAddressDocAttached, hint: "Address Proof" },
                                { label: "Selfie", attached: selfieAttached, setAttached: setSelfieAttached, hint: "Selfie Verification" },
                            ].map((doc, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => doc.setAttached(!doc.attached)}
                                    className={`flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl border-2 border-dashed transition-colors ${doc.attached
                                        ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10"
                                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                                        }`}
                                >
                                    {doc.attached ? (
                                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    )}
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{doc.label}</span>
                                    <span className="text-[10px] text-gray-400">{doc.attached ? "Attached" : `Upload ${doc.hint}`}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                                <span className="text-sm">📝</span>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Internal Note (optional)</h3>
                        </div>
                        <textarea
                            value={internalNote}
                            onChange={e => setInternalNote(e.target.value)}
                            rows={3}
                            placeholder="Any context about this customer for your team..."
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
                        />
                    </div>
                </div>

                {/* Sidebar column: account settings + submit */}
                <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Account Settings</h3>

                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">KYC Tier</label>
                            <select
                                value={kycTier}
                                onChange={e => setKycTier(e.target.value as AddCustKycTier)}
                                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                            >
                                {addCustKycTierOptions.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <p className="text-[11px] text-gray-400 mt-1">{addCustKycTierDescription[kycTier]}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Initial Account Status</label>
                            <div className="flex flex-col gap-1.5">
                                {addCustInitialStatusOptions.map(s => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setInitialStatus(s)}
                                        className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium ${initialStatus === s ? "border-green-300 dark:border-green-700" : "border-gray-200 dark:border-gray-700"}`}
                                    >
                                        <span className={`px-2 py-0.5 rounded-full ${statusBadge(s)}`}>{s}</span>
                                        {initialStatus === s && (
                                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Initial Wallets *</label>
                            <div className="flex flex-wrap gap-1.5">
                                {addCustCurrencyOptions.map(cur => (
                                    <button
                                        key={cur.code}
                                        type="button"
                                        onClick={() => toggleCurrency(cur.code)}
                                        className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full border transition-colors ${selectedCurrencies.includes(cur.code)
                                            ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                                            : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                            }`}
                                    >
                                        <span>{cur.flag}</span>
                                        {cur.code}
                                    </button>
                                ))}
                            </div>
                            {errors.currencies && <p className="text-xs text-red-500 mt-1">{errors.currencies}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">How did they hear about us?</label>
                            <select
                                value={referralSource}
                                onChange={e => setReferralSource(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500"
                            >
                                {addCustReferralSourceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2.5 pt-2 border-t border-gray-100 dark:border-gray-800">
                            <label className="flex items-center justify-between gap-2 cursor-pointer">
                                <span className="text-xs text-gray-600 dark:text-gray-300">Send welcome email</span>
                                <button
                                    type="button"
                                    onClick={() => setSendWelcomeEmail(!sendWelcomeEmail)}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${sendWelcomeEmail ? "bg-green-600" : "bg-gray-300 dark:bg-gray-700"}`}
                                >
                                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${sendWelcomeEmail ? "translate-x-5" : "translate-x-1"}`} />
                                </button>
                            </label>
                            <label className="flex items-center justify-between gap-2 cursor-pointer">
                                <span className="text-xs text-gray-600 dark:text-gray-300">Require KYC before transacting</span>
                                <button
                                    type="button"
                                    onClick={() => setRequireKycBeforeTransacting(!requireKycBeforeTransacting)}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${requireKycBeforeTransacting ? "bg-green-600" : "bg-gray-300 dark:bg-gray-700"}`}
                                >
                                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${requireKycBeforeTransacting ? "translate-x-5" : "translate-x-1"}`} />
                                </button>
                            </label>
                        </div>
                    </div>

                    {/* Submit card */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full py-2.5 text-sm font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 flex items-center justify-center gap-2 mb-2"
                        >
                            {isSubmitting && (
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            )}
                            {isSubmitting ? "Creating Customer..." : "Create Customer"}
                        </button>
                        <button
                            onClick={resetForm}
                            type="button"
                            className="w-full py-2.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            Clear Form
                        </button>
                    </div>
                </div>
            </div>

            {/* Recently added customers */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Recently Added Customers</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                                <th className="text-left pb-2 font-medium pr-4">Name</th>
                                <th className="text-left pb-2 font-medium pr-4">Email</th>
                                <th className="text-left pb-2 font-medium pr-4">Country</th>
                                <th className="text-left pb-2 font-medium pr-4">KYC Tier</th>
                                <th className="text-left pb-2 font-medium pr-4">Status</th>
                                <th className="text-left pb-2 font-medium">Created</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {recentEntries.map(entry => (
                                <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="py-2.5 pr-4 font-medium text-gray-800 dark:text-white">{entry.name}</td>
                                    <td className="py-2.5 pr-4 text-gray-500 dark:text-gray-400">{entry.email}</td>
                                    <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-300"><span className="mr-1">{entry.countryFlag}</span>{entry.country}</td>
                                    <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-300">{entry.kycTier}</td>
                                    <td className="py-2.5 pr-4"><span className={`px-1.5 py-0.5 rounded-full font-medium ${statusBadge(entry.status)}`}>{entry.status}</span></td>
                                    <td className="py-2.5 text-gray-500 dark:text-gray-400">{entry.createdAt}</td>
                                </tr>
                            ))}
                            {recentEntries.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-6 text-center text-gray-400">No customers added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}