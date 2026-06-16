"use client";
import { useState } from "react";


const customersData = [
  {
    id: "1", name: "John Rahman", email: "john.rahman@example.com", phone: "+44 7700 900123",
    status: "Verified", avatar: "JR", customerId: "CUS-25051901", joinedDate: "May 19, 2025",
    lastLogin: "May 19, 2025 10:30 AM", country: "United Kingdom", countryFlag: "🇬🇧",
    kyc: { status: "Verified", identityProof: "Passport", addressProof: "Utility Bill", selfieVerification: "Verified", amlScreening: "Passed", verifiedOn: "May 19, 2025" },
    wallets: [
      { currency: "GBP Wallet", flag: "🇬🇧", balance: "£2,450.75" },
      { currency: "USD Wallet", flag: "🇺🇸", balance: "$1,280.40" },
      { currency: "EUR Wallet", flag: "🇪🇺", balance: "€980.30" },
      { currency: "BDT Settlement", flag: "🇧🇩", balance: "৳125,450.00" },
    ],
    quickStats: { totalTransactions: 24, totalSent: "£15,750.00", totalReceived: "£15,210.00", averageTransaction: "£656.25", successRate: "95.8%" },
    recentTransactions: [
      { id: "TXN-25051901", type: "Send Money", to: "Bangladesh", toFlag: "🇧🇩", amount: "£520.00", fee: "£3.50", status: "Completed", date: "May 19, 2025" },
      { id: "TXN-25051890", type: "Send Money", to: "India", toFlag: "🇮🇳", amount: "£750.00", fee: "£4.00", status: "Completed", date: "May 18, 2025" },
      { id: "TXN-25051875", type: "Send Money", to: "Pakistan", toFlag: "🇵🇰", amount: "£320.00", fee: "£2.50", status: "Completed", date: "May 17, 2025" },
      { id: "TXN-25051860", type: "Top Up", to: "GBP Wallet", toFlag: "🇬🇧", amount: "£500.00", fee: "£0.00", status: "Completed", date: "May 16, 2025" },
      { id: "TXN-25051845", type: "Withdraw", to: "Bank Transfer", toFlag: "🏦", amount: "£300.00", fee: "£1.50", status: "Completed", date: "May 15, 2025" },
    ],
    documents: [
      { title: "Passport", type: "ID Proof", status: "Verified", uploadedOn: "May 19, 2025", icon: "passport" },
      { title: "Utility Bill", type: "Address Proof", status: "Verified", uploadedOn: "May 19, 2025", icon: "bill" },
      { title: "Selfie", type: "Selfie Verification", status: "Verified", uploadedOn: "May 19, 2025", icon: "selfie" },
    ],
  },
  {
    id: "2", name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+44 7700 900124",
    status: "Pending", avatar: "PS", customerId: "CUS-25051902", joinedDate: "May 18, 2025",
    lastLogin: "May 18, 2025 03:15 PM", country: "United Kingdom", countryFlag: "🇬🇧",
    kyc: { status: "Pending", identityProof: "National ID", addressProof: "Bank Statement", selfieVerification: "Pending", amlScreening: "In Progress", verifiedOn: "—" },
    wallets: [{ currency: "GBP Wallet", flag: "🇬🇧", balance: "£850.20" }, { currency: "INR Wallet", flag: "🇮🇳", balance: "₹45,200.00" }],
    quickStats: { totalTransactions: 8, totalSent: "£3,200.00", totalReceived: "£3,050.00", averageTransaction: "£400.00", successRate: "87.5%" },
    recentTransactions: [
      { id: "TXN-25051810", type: "Send Money", to: "India", toFlag: "🇮🇳", amount: "£420.00", fee: "£3.00", status: "Pending", date: "May 18, 2025" },
      { id: "TXN-25051795", type: "Top Up", to: "GBP Wallet", toFlag: "🇬🇧", amount: "£200.00", fee: "£0.00", status: "Completed", date: "May 17, 2025" },
    ],
    documents: [
      { title: "National ID", type: "ID Proof", status: "Pending", uploadedOn: "May 18, 2025", icon: "passport" },
      { title: "Bank Statement", type: "Address Proof", status: "Pending", uploadedOn: "May 18, 2025", icon: "bill" },
    ],
  },
  {
    id: "3", name: "Ahmed Khan", email: "ahmed.khan@example.com", phone: "+44 7700 900125",
    status: "Verified", avatar: "AK", customerId: "CUS-25051903", joinedDate: "May 15, 2025",
    lastLogin: "May 19, 2025 08:45 AM", country: "United Kingdom", countryFlag: "🇬🇧",
    kyc: { status: "Verified", identityProof: "Passport", addressProof: "Council Tax Bill", selfieVerification: "Verified", amlScreening: "Passed", verifiedOn: "May 15, 2025" },
    wallets: [{ currency: "GBP Wallet", flag: "🇬🇧", balance: "£5,120.60" }, { currency: "USD Wallet", flag: "🇺🇸", balance: "$2,800.00" }, { currency: "PKR Wallet", flag: "🇵🇰", balance: "₨180,000.00" }],
    quickStats: { totalTransactions: 42, totalSent: "£28,500.00", totalReceived: "£27,900.00", averageTransaction: "£678.57", successRate: "97.6%" },
    recentTransactions: [
      { id: "TXN-25051920", type: "Send Money", to: "Pakistan", toFlag: "🇵🇰", amount: "£1,200.00", fee: "£5.00", status: "Completed", date: "May 19, 2025" },
      { id: "TXN-25051905", type: "Send Money", to: "Bangladesh", toFlag: "🇧🇩", amount: "£680.00", fee: "£3.50", status: "Completed", date: "May 18, 2025" },
      { id: "TXN-25051888", type: "Withdraw", to: "Bank Transfer", toFlag: "🏦", amount: "£500.00", fee: "£2.00", status: "Completed", date: "May 17, 2025" },
    ],
    documents: [
      { title: "Passport", type: "ID Proof", status: "Verified", uploadedOn: "May 15, 2025", icon: "passport" },
      { title: "Council Tax Bill", type: "Address Proof", status: "Verified", uploadedOn: "May 15, 2025", icon: "bill" },
      { title: "Selfie", type: "Selfie Verification", status: "Verified", uploadedOn: "May 15, 2025", icon: "selfie" },
    ],
  },
  {
    id: "4", name: "Maria Santos", email: "maria.santos@example.com", phone: "+44 7700 900126",
    status: "Verified", avatar: "MS", customerId: "CUS-25051904", joinedDate: "May 10, 2025",
    lastLogin: "May 19, 2025 11:20 AM", country: "United Kingdom", countryFlag: "🇬🇧",
    kyc: { status: "Verified", identityProof: "Driving License", addressProof: "Utility Bill", selfieVerification: "Verified", amlScreening: "Passed", verifiedOn: "May 10, 2025" },
    wallets: [{ currency: "GBP Wallet", flag: "🇬🇧", balance: "£3,780.45" }, { currency: "EUR Wallet", flag: "🇪🇺", balance: "€1,450.00" }, { currency: "PHP Wallet", flag: "🇵🇭", balance: "₱95,000.00" }],
    quickStats: { totalTransactions: 31, totalSent: "£18,200.00", totalReceived: "£17,600.00", averageTransaction: "£587.10", successRate: "93.5%" },
    recentTransactions: [
      { id: "TXN-25051930", type: "Send Money", to: "Philippines", toFlag: "🇵🇭", amount: "£950.00", fee: "£4.50", status: "Completed", date: "May 19, 2025" },
      { id: "TXN-25051915", type: "Top Up", to: "GBP Wallet", toFlag: "🇬🇧", amount: "£1,000.00", fee: "£0.00", status: "Completed", date: "May 18, 2025" },
      { id: "TXN-25051900", type: "Send Money", to: "Philippines", toFlag: "🇵🇭", amount: "£620.00", fee: "£3.50", status: "Failed", date: "May 17, 2025" },
    ],
    documents: [
      { title: "Driving License", type: "ID Proof", status: "Verified", uploadedOn: "May 10, 2025", icon: "passport" },
      { title: "Utility Bill", type: "Address Proof", status: "Verified", uploadedOn: "May 10, 2025", icon: "bill" },
      { title: "Selfie", type: "Selfie Verification", status: "Verified", uploadedOn: "May 10, 2025", icon: "selfie" },
    ],
  },
  {
    id: "5", name: "James Okafor", email: "james.okafor@example.com", phone: "+44 7700 900127",
    status: "Rejected", avatar: "JO", customerId: "CUS-25051905", joinedDate: "May 8, 2025",
    lastLogin: "May 12, 2025 02:00 PM", country: "United Kingdom", countryFlag: "🇬🇧",
    kyc: { status: "Rejected", identityProof: "Rejected", addressProof: "Rejected", selfieVerification: "Failed", amlScreening: "Failed", verifiedOn: "—" },
    wallets: [{ currency: "GBP Wallet", flag: "🇬🇧", balance: "£0.00" }],
    quickStats: { totalTransactions: 2, totalSent: "£0.00", totalReceived: "£0.00", averageTransaction: "£0.00", successRate: "0%" },
    recentTransactions: [{ id: "TXN-25051820", type: "Top Up", to: "GBP Wallet", toFlag: "🇬🇧", amount: "£100.00", fee: "£0.00", status: "Failed", date: "May 8, 2025" }],
    documents: [{ title: "Passport", type: "ID Proof", status: "Rejected", uploadedOn: "May 8, 2025", icon: "passport" }],
  },
  {
    id: "6", name: "Fatima Ali", email: "fatima.ali@example.com", phone: "+44 7700 900128",
    status: "Pending", avatar: "FA", customerId: "CUS-25051906", joinedDate: "May 17, 2025",
    lastLogin: "May 19, 2025 09:05 AM", country: "United Kingdom", countryFlag: "🇬🇧",
    kyc: { status: "Pending", identityProof: "Passport", addressProof: "Pending", selfieVerification: "Pending", amlScreening: "In Progress", verifiedOn: "—" },
    wallets: [{ currency: "GBP Wallet", flag: "🇬🇧", balance: "£1,200.00" }, { currency: "USD Wallet", flag: "🇺🇸", balance: "$450.00" }],
    quickStats: { totalTransactions: 5, totalSent: "£2,100.00", totalReceived: "£2,000.00", averageTransaction: "£420.00", successRate: "80.0%" },
    recentTransactions: [{ id: "TXN-25051940", type: "Send Money", to: "Bangladesh", toFlag: "🇧🇩", amount: "£380.00", fee: "£2.50", status: "Pending", date: "May 19, 2025" }],
    documents: [
      { title: "Passport", type: "ID Proof", status: "Verified", uploadedOn: "May 17, 2025", icon: "passport" },
      { title: "Utility Bill", type: "Address Proof", status: "Pending", uploadedOn: "May 17, 2025", icon: "bill" },
    ],
  },
  {
    id: "7", name: "David Wilson", email: "david.wilson@example.com", phone: "+44 7700 900129",
    status: "Verified", avatar: "DW", customerId: "CUS-25051907", joinedDate: "Apr 30, 2025",
    lastLogin: "May 19, 2025 07:30 AM", country: "United Kingdom", countryFlag: "🇬🇧",
    kyc: { status: "Verified", identityProof: "Passport", addressProof: "Bank Statement", selfieVerification: "Verified", amlScreening: "Passed", verifiedOn: "Apr 30, 2025" },
    wallets: [{ currency: "GBP Wallet", flag: "🇬🇧", balance: "£8,900.00" }, { currency: "USD Wallet", flag: "🇺🇸", balance: "$4,200.00" }, { currency: "EUR Wallet", flag: "🇪🇺", balance: "€2,100.00" }],
    quickStats: { totalTransactions: 68, totalSent: "£52,300.00", totalReceived: "£51,100.00", averageTransaction: "£769.12", successRate: "98.5%" },
    recentTransactions: [
      { id: "TXN-25051950", type: "Send Money", to: "India", toFlag: "🇮🇳", amount: "£2,000.00", fee: "£6.00", status: "Completed", date: "May 19, 2025" },
      { id: "TXN-25051935", type: "Send Money", to: "Nigeria", toFlag: "🇳🇬", amount: "£1,500.00", fee: "£5.50", status: "Completed", date: "May 18, 2025" },
      { id: "TXN-25051920", type: "Withdraw", to: "Bank Transfer", toFlag: "🏦", amount: "£3,000.00", fee: "£5.00", status: "Completed", date: "May 17, 2025" },
    ],
    documents: [
      { title: "Passport", type: "ID Proof", status: "Verified", uploadedOn: "Apr 30, 2025", icon: "passport" },
      { title: "Bank Statement", type: "Address Proof", status: "Verified", uploadedOn: "Apr 30, 2025", icon: "bill" },
      { title: "Selfie", type: "Selfie Verification", status: "Verified", uploadedOn: "Apr 30, 2025", icon: "selfie" },
    ],
  },
  {
    id: "8", name: "Sophie Martin", email: "sophie.martin@example.com", phone: "+44 7700 900130",
    status: "Verified", avatar: "SM", customerId: "CUS-25051908", joinedDate: "May 5, 2025",
    lastLogin: "May 19, 2025 12:00 PM", country: "United Kingdom", countryFlag: "🇬🇧",
    kyc: { status: "Verified", identityProof: "Driving License", addressProof: "Council Tax Bill", selfieVerification: "Verified", amlScreening: "Passed", verifiedOn: "May 5, 2025" },
    wallets: [{ currency: "GBP Wallet", flag: "🇬🇧", balance: "£4,350.80" }, { currency: "EUR Wallet", flag: "🇪🇺", balance: "€2,800.00" }],
    quickStats: { totalTransactions: 19, totalSent: "£11,400.00", totalReceived: "£11,100.00", averageTransaction: "£600.00", successRate: "94.7%" },
    recentTransactions: [
      { id: "TXN-25051960", type: "Send Money", to: "France", toFlag: "🇫🇷", amount: "£780.00", fee: "£3.50", status: "Completed", date: "May 19, 2025" },
      { id: "TXN-25051945", type: "Top Up", to: "GBP Wallet", toFlag: "🇬🇧", amount: "£1,500.00", fee: "£0.00", status: "Completed", date: "May 18, 2025" },
    ],
    documents: [
      { title: "Driving License", type: "ID Proof", status: "Verified", uploadedOn: "May 5, 2025", icon: "passport" },
      { title: "Council Tax Bill", type: "Address Proof", status: "Verified", uploadedOn: "May 5, 2025", icon: "bill" },
      { title: "Selfie", type: "Selfie Verification", status: "Verified", uploadedOn: "May 5, 2025", icon: "selfie" },
    ],
  },
];


const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    Verified: "bg-green-50 text-green-700 border border-green-200",
    Pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    Rejected: "bg-red-50 text-red-700 border border-red-200",
    Completed: "bg-green-50 text-green-700 border border-green-200",
    Failed: "bg-red-50 text-red-700 border border-red-200",
    Refunded: "bg-purple-50 text-purple-700 border border-purple-200",
  };
  return map[status] || "bg-gray-100 text-gray-600";
};

const avatarColor = (initials: string) => {
  const colors = [
    "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500",
    "bg-pink-500", "bg-teal-500", "bg-indigo-500", "bg-rose-500",
  ];
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % colors.length;
  return colors[idx];
};

const docIcon = (icon: string) => {
  if (icon === "passport") return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
  if (icon === "bill") return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
    </svg>
  );
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};


type TabKey = "Overview" | "KYC Status" | "Wallet Balance" | "Transaction History" | "Documents" | "Notes";

export default function Page() {
  const [selectedId, setSelectedId] = useState(customersData[0].id);
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");
  const [search, setSearch] = useState("");
  const [showDetail, setShowDetail] = useState(false); // mobile toggle

  const filtered = customersData.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const customer = customersData.find(c => c.id === selectedId) || customersData[0];

  const tabs: TabKey[] = ["Overview", "KYC Status", "Wallet Balance", "Transaction History", "Documents", "Notes"];

  const handleSelectCustomer = (id: string) => {
    setSelectedId(id);
    setActiveTab("Overview");
    setShowDetail(true);
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard &gt; Customers</p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-4 h-full">

        {/* ── Left: Customer List ── */}
        <div className={`w-full lg:w-72 xl:w-80 flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col ${showDetail ? "hidden lg:flex" : "flex"}`}>
          {/* Search */}
          <div className="p-3 border-b border-gray-100 dark:border-gray-800">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, email, phone or ID..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Column Headers */}
          <div className="px-4 py-2 flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
            <span>Customer</span>
            <span>Status</span>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map(c => (
              <div
                key={c.id}
                onClick={() => handleSelectCustomer(c.id)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${selectedId === c.id ? "bg-blue-50 dark:bg-blue-900/20 border-l-2 border-l-blue-500" : ""}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${avatarColor(c.avatar)}`}>
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{c.name}</div>
                  <div className="text-xs text-gray-400 truncate">{c.email}</div>
                  <div className="text-xs text-gray-400">{c.phone}</div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusBadge(c.status)}`}>{c.status}</span>
                  {selectedId !== c.id && (
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 flex items-center justify-between">
            <span>Showing 1 to {filtered.length} of 1240 customers</span>
          </div>
          <div className="px-4 pb-3 flex items-center gap-1 text-xs">
            <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">‹</button>
            {[1, 2, 3].map(n => (
              <button key={n} className={`w-6 h-6 rounded text-xs ${n === 1 ? "bg-green-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"}`}>{n}</button>
            ))}
            <span className="text-gray-400 px-1">…</span>
            <button className="w-6 h-6 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">155</button>
            <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">›</button>
          </div>
        </div>

        {/* ── Right: Customer Detail ── */}
        <div className={`flex-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-col min-w-0 ${showDetail ? "flex" : "hidden lg:flex"}`}>
          {/* Mobile back button */}
          <div className="lg:hidden px-4 pt-4">
            <button onClick={() => setShowDetail(false)} className="flex items-center gap-1 text-sm text-green-600 font-medium mb-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to list
            </button>
          </div>

          {/* Header */}
          <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Profile Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${avatarColor(customer.avatar)}`}>
                    {customer.avatar}
                  </div>
                  <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{customer.name}</h2>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusBadge(customer.status)}`}>{customer.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-3 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    <span>{customer.email}</span>
                    <span>{customer.phone}</span>
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button className="px-3 py-1.5 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
                  Edit Customer
                </button>
                <button className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1">
                  Actions
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Meta Row */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
              <div><span className="block text-gray-400 dark:text-gray-500">Customer ID</span><span className="font-medium text-gray-700 dark:text-gray-200">{customer.customerId}</span></div>
              <div><span className="block text-gray-400 dark:text-gray-500">Joined Date</span><span className="font-medium text-gray-700 dark:text-gray-200">{customer.joinedDate}</span></div>
              <div><span className="block text-gray-400 dark:text-gray-500">Last Login</span><span className="font-medium text-gray-700 dark:text-gray-200">{customer.lastLogin}</span></div>
              <div><span className="block text-gray-400 dark:text-gray-500">Country</span><span className="font-medium text-gray-700 dark:text-gray-200">{customer.countryFlag} {customer.country}</span></div>
            </div>

            {/* Tabs */}
            <div className="flex gap-0 mt-5 overflow-x-auto border-b border-gray-100 dark:border-gray-800">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${activeTab === tab
                    ? "border-green-600 text-green-600 dark:text-green-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                >
                  {tab === "Overview" && <span className="hidden sm:inline mr-1">📋 </span>}
                  {tab === "KYC Status" && <span className="hidden sm:inline mr-1">✅ </span>}
                  {tab === "Wallet Balance" && <span className="hidden sm:inline mr-1">💳 </span>}
                  {tab === "Transaction History" && <span className="hidden sm:inline mr-1">🔄 </span>}
                  {tab === "Documents" && <span className="hidden sm:inline mr-1">📄 </span>}
                  {tab === "Notes" && <span className="hidden sm:inline mr-1">📝 </span>}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {activeTab === "Overview" && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6">

                {/* KYC Verification */}
                <div className="xl:col-span-1 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">KYC Verification</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusBadge(customer.kyc.status)}`}>{customer.kyc.status}</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Identity Proof", value: customer.kyc.identityProof },
                      { label: "Address Proof", value: customer.kyc.addressProof },
                      { label: "Selfie Verification", value: customer.kyc.selfieVerification },
                      { label: "AML Screening", value: customer.kyc.amlScreening },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-gray-500 dark:text-gray-400 w-32">{item.label}</span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Verified On</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200">{customer.kyc.verifiedOn}</span>
                  </div>
                </div>

                {/* Wallet Balance */}
                <div className="xl:col-span-1 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Wallet Balance</h3>
                  <div className="space-y-3">
                    {customer.wallets.map(w => (
                      <div key={w.currency} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{w.flag}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{w.currency}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">{w.balance}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1 hover:underline">
                    View All Wallets →
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="xl:col-span-1 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Total Transactions", value: customer.quickStats.totalTransactions },
                      { label: "Total Sent", value: customer.quickStats.totalSent },
                      { label: "Total Received", value: customer.quickStats.totalReceived },
                      { label: "Average Transaction", value: customer.quickStats.averageTransaction },
                      { label: "Success Rate", value: customer.quickStats.successRate, green: true },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{item.label}</span>
                        <span className={`text-xs font-semibold ${item.green ? "text-green-600 dark:text-green-400" : "text-gray-800 dark:text-white"}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="xl:col-span-2 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Recent Transactions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-gray-400 dark:text-gray-500">
                          <th className="text-left pb-2 font-medium pr-4">ID</th>
                          <th className="text-left pb-2 font-medium pr-4">Type</th>
                          <th className="text-left pb-2 font-medium pr-4">To</th>
                          <th className="text-left pb-2 font-medium pr-4">Amount</th>
                          <th className="text-left pb-2 font-medium pr-4">Fee</th>
                          <th className="text-left pb-2 font-medium pr-4">Status</th>
                          <th className="text-left pb-2 font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {customer.recentTransactions.map(tx => (
                          <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="py-2 pr-4 text-gray-500 dark:text-gray-400">{tx.id}</td>
                            <td className="py-2 pr-4 text-gray-700 dark:text-gray-200 font-medium">{tx.type}</td>
                            <td className="py-2 pr-4 text-gray-600 dark:text-gray-300">
                              <span className="mr-1">{tx.toFlag}</span>{tx.to}
                            </td>
                            <td className="py-2 pr-4 font-semibold text-gray-800 dark:text-white">{tx.amount}</td>
                            <td className="py-2 pr-4 text-gray-500 dark:text-gray-400">{tx.fee}</td>
                            <td className="py-2 pr-4">
                              <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${statusBadge(tx.status)}`}>{tx.status}</span>
                            </td>
                            <td className="py-2 text-gray-500 dark:text-gray-400">{tx.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1 hover:underline">
                    View All Transactions →
                  </button>
                </div>

                {/* Documents */}
                <div className="xl:col-span-1 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Documents</h3>
                  <div className="space-y-3">
                    {customer.documents.map((doc, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${doc.icon === "passport" ? "bg-blue-50 text-blue-600" :
                          doc.icon === "bill" ? "bg-purple-50 text-purple-600" :
                            "bg-orange-50 text-orange-600"
                          }`}>
                          {docIcon(doc.icon)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-gray-800 dark:text-white">{doc.title}</div>
                          <div className="text-xs text-gray-400">{doc.type}</div>
                          <div className="text-xs text-gray-400">Uploaded on {doc.uploadedOn}</div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`px-1.5 py-0.5 text-xs rounded-full ${statusBadge(doc.status)}`}>{doc.status}</span>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1 hover:underline">
                    View All Documents →
                  </button>
                </div>
              </div>
            )}

            {activeTab === "KYC Status" && (
              <div className="max-w-lg border border-gray-100 dark:border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white">KYC Verification Details</h3>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusBadge(customer.kyc.status)}`}>{customer.kyc.status}</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Identity Proof", value: customer.kyc.identityProof },
                    { label: "Address Proof", value: customer.kyc.addressProof },
                    { label: "Selfie Verification", value: customer.kyc.selfieVerification },
                    { label: "AML Screening", value: customer.kyc.amlScreening },
                    { label: "Verified On", value: customer.kyc.verifiedOn },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Wallet Balance" && (
              <div className="max-w-sm border border-gray-100 dark:border-gray-800 rounded-xl p-6">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-5">All Wallets</h3>
                <div className="space-y-4">
                  {customer.wallets.map(w => (
                    <div key={w.currency} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{w.flag}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{w.currency}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{w.balance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Transaction History" && (
              <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-4">Transaction History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                        <th className="text-left pb-3 font-medium pr-4">ID</th>
                        <th className="text-left pb-3 font-medium pr-4">Type</th>
                        <th className="text-left pb-3 font-medium pr-4">To</th>
                        <th className="text-left pb-3 font-medium pr-4">Amount</th>
                        <th className="text-left pb-3 font-medium pr-4">Fee</th>
                        <th className="text-left pb-3 font-medium pr-4">Status</th>
                        <th className="text-left pb-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                      {customer.recentTransactions.map(tx => (
                        <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{tx.id}</td>
                          <td className="py-3 pr-4 font-medium text-gray-700 dark:text-gray-200">{tx.type}</td>
                          <td className="py-3 pr-4 text-gray-600 dark:text-gray-300"><span className="mr-1">{tx.toFlag}</span>{tx.to}</td>
                          <td className="py-3 pr-4 font-semibold text-gray-800 dark:text-white">{tx.amount}</td>
                          <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{tx.fee}</td>
                          <td className="py-3 pr-4"><span className={`px-1.5 py-0.5 rounded-full ${statusBadge(tx.status)}`}>{tx.status}</span></td>
                          <td className="py-3 text-gray-500 dark:text-gray-400">{tx.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "Documents" && (
              <div className="max-w-lg border border-gray-100 dark:border-gray-800 rounded-xl p-6">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-5">Documents</h3>
                <div className="space-y-3">
                  {customer.documents.map((doc, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${doc.icon === "passport" ? "bg-blue-50 text-blue-600" :
                        doc.icon === "bill" ? "bg-purple-50 text-purple-600" :
                          "bg-orange-50 text-orange-600"
                        }`}>
                        {docIcon(doc.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-800 dark:text-white">{doc.title}</div>
                        <div className="text-xs text-gray-400">{doc.type} · Uploaded on {doc.uploadedOn}</div>
                      </div>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusBadge(doc.status)}`}>{doc.status}</span>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Notes" && (
              <div className="max-w-lg border border-gray-100 dark:border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center text-center min-h-40">
                <div className="text-3xl mb-2">📝</div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">No notes yet</div>
                <div className="text-xs text-gray-400 mt-1">Add internal notes about this customer.</div>
                <button className="mt-4 px-4 py-1.5 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Add Note
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
