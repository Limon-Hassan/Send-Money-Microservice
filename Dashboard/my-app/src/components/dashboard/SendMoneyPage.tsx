// 'use client';

// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   Send,
//   ArrowLeftRight,
//   Shield,
//   CheckCircle,
//   Download,
//   Share2,
//   ChevronDown,
//   Landmark,
//   CreditCard,
//   Smartphone,
//   Wallet,
//   User,
//   Mail,
//   Phone,
//   Hash,
//   MapPin,
//   ChevronRight,
//   Search,
//   X,
//   RefreshCw,
//   Plus,
//   Upload,
//   Eye,
//   ArrowUpRight,
//   ArrowDownLeft,
//   Clock,
//   Tag,
//   ChevronLeft,
// } from 'lucide-react';
// import { CURRENCIES } from '@/src/lib/country_api_data';
// import FlagImg from '../others/FlagImg';
// import CurrencyDropDown from '../others/CurrencyDropDown';
// import {
//   banksByCountry,
//   mockPaymentMethods,
//   wallets,
//   districtsByCountry,
// } from '@/src/lib/data';
// import BankDropdown from '../others/BankDropdown';
// import WalletDropdown from '@/src/components/others/WalletDropdown';

// function formatCurrency(amount: number) {
//   return new Intl.NumberFormat('en-US', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);
// }

// type Step = 1 | 2 | 3 | 4 | 5 | 6;
// type DeliveryMethod = 'bank' | 'wallet' | 'cash' | null;

// interface UploadedDoc {
//   file: File;
//   preview: string;
// }

// const DOC_TYPES = [
//   { value: 'passport', label: 'Passport' },
//   { value: 'nid', label: 'National ID Card' },
//   { value: 'dl', label: "Driver's License" },
//   { value: 'bc', label: 'Birth Certificate' },
// ];

// function DocumentUpload({
//   docType,
//   setDocType,
//   docs,
//   setDocs,
// }: {
//   docType: string;
//   setDocType: (v: string) => void;
//   docs: UploadedDoc[];
//   setDocs: (d: UploadedDoc[]) => void;
// }) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const handleFiles = (files: FileList | null) => {
//     if (!files) return;
//     const remaining = 2 - docs.length;
//     const toAdd = Array.from(files).slice(0, remaining);
//     const newDocs: UploadedDoc[] = toAdd.map(f => ({
//       file: f,
//       preview: URL.createObjectURL(f),
//     }));
//     setDocs([...docs, ...newDocs]);
//   };

//   const removeDoc = (i: number) => {
//     URL.revokeObjectURL(docs[i].preview);
//     setDocs(docs.filter((_, idx) => idx !== i));
//   };

//   return (
//     <div className="space-y-2 sm:col-span-2">
//       <div>
//         <label className="text-xs text-gray-500 mb-1 block">
//           Document Type
//         </label>
//         <select
//           value={docType}
//           onChange={e => setDocType(e.target.value)}
//           className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-600"
//         >
//           <option value="">Select document type</option>
//           {DOC_TYPES.map(d => (
//             <option key={d.value} value={d.value}>
//               {d.label}
//             </option>
//           ))}
//         </select>
//       </div>
//       {docType && (
//         <div>
//           <label className="text-xs text-gray-500 mb-1 block">
//             Upload Photo <span className="text-gray-400">(max 2 photos)</span>
//           </label>
//           {docs.length > 0 && (
//             <div className="flex gap-2 mb-2 flex-wrap">
//               {docs.map((d, i) => (
//                 <div key={i} className="relative group">
//                   <img
//                     src={d.preview}
//                     alt="doc"
//                     className="w-[100px] h-[100px] object-cover rounded-lg border border-gray-200"
//                   />
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-1">
//                     <button
//                       type="button"
//                       onClick={() => setPreview(d.preview)}
//                       className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center"
//                     >
//                       <Eye size={13} className="text-gray-700" />
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => removeDoc(i)}
//                       className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center"
//                     >
//                       <X size={13} className="text-white" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               {docs.length < 2 && (
//                 <button
//                   type="button"
//                   onClick={() => inputRef.current?.click()}
//                   className="w-[100px] h-[100px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-green-500 transition text-gray-400 hover:text-green-600"
//                 >
//                   <Upload size={18} />
//                   <span className="text-xs">Add more</span>
//                 </button>
//               )}
//             </div>
//           )}
//           {docs.length === 0 && (
//             <button
//               type="button"
//               onClick={() => inputRef.current?.click()}
//               className="w-full border-2 border-dashed border-gray-300 rounded-xl py-4 flex flex-col items-center gap-1.5 hover:border-green-500 hover:bg-green-50/30 transition"
//             >
//               <Upload size={20} className="text-gray-400" />
//               <span className="text-xs text-gray-500">
//                 Click to upload photo
//               </span>
//               <span className="text-xs text-gray-400">PNG, JPG up to 5MB</span>
//             </button>
//           )}
//           <input
//             ref={inputRef}
//             type="file"
//             accept="image/*"
//             multiple
//             className="hidden"
//             onChange={e => handleFiles(e.target.files)}
//           />
//         </div>
//       )}
//       {preview && (
//         <div
//           className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4"
//           onClick={() => setPreview(null)}
//         >
//           <div
//             className="relative max-w-sm w-full"
//             onClick={e => e.stopPropagation()}
//           >
//             <img src={preview} alt="preview" className="w-full rounded-xl" />
//             <button
//               onClick={() => setPreview(null)}
//               className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function CountrySelect({
//   value,
//   onChange,
//   className,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   className?: string;
// }) {
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState('');
//   const ref = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const countries = CURRENCIES.filter(
//     (c, i, arr) => arr.findIndex(x => x.country === c.country) === i,
//   );
//   const filtered = countries.filter(
//     c =>
//       c.country.toLowerCase().includes(search.toLowerCase()) ||
//       c.code.toLowerCase().includes(search.toLowerCase()),
//   );
//   const selected = countries.find(c => c.country === value || c.code === value);

//   useEffect(() => {
//     function handleClick(e: MouseEvent) {
//       if (ref.current && !ref.current.contains(e.target as Node)) {
//         setOpen(false);
//         setSearch('');
//       }
//     }
//     document.addEventListener('mousedown', handleClick);
//     return () => document.removeEventListener('mousedown', handleClick);
//   }, []);

//   useEffect(() => {
//     if (open && inputRef.current)
//       setTimeout(() => inputRef.current?.focus(), 50);
//   }, [open]);

//   return (
//     <div ref={ref} className={`relative ${className ?? ''}`}>
//       <button
//         type="button"
//         onClick={() => setOpen(o => !o)}
//         className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-600 flex items-center gap-2 text-left"
//       >
//         {selected ? (
//           <>
//             <FlagImg flag={selected.flag} code={selected.code} size={18} />
//             <span className="flex-1 truncate">{selected.country}</span>
//           </>
//         ) : (
//           <span className="text-gray-400 flex-1">Select country</span>
//         )}
//         <ChevronDown size={13} className="text-gray-400 shrink-0" />
//       </button>
//       {open && (
//         <div className="absolute left-0 top-full mt-1 w-full min-w-[220px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 flex flex-col max-h-60">
//           <div className="p-2 border-b border-gray-100 shrink-0">
//             <div className="relative">
//               <Search
//                 size={13}
//                 className="absolute left-2.5 top-2.5 text-gray-400"
//               />
//               <input
//                 ref={inputRef}
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 placeholder="Search country…"
//                 className="w-full pl-7 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-green-600"
//               />
//             </div>
//           </div>
//           <div className="overflow-y-auto flex-1">
//             {filtered.map(c => (
//               <button
//                 key={c.country}
//                 onClick={() => {
//                   onChange(c.country);
//                   setOpen(false);
//                   setSearch('');
//                 }}
//                 className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-gray-50 transition text-sm ${value === c.country ? 'bg-green-50' : ''}`}
//               >
//                 <FlagImg flag={c.flag} code={c.code} size={18} />
//                 <span className="truncate">{c.country}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const STEPS = [
//   { n: 1, label: 'Amount' },
//   { n: 2, label: 'Recipient' },
//   { n: 3, label: 'Receive Method' },
//   { n: 4, label: 'Payment' },
//   { n: 5, label: 'Review' },
// ];

// function StepBar({ current }: { current: Step }) {
//   return (
//     <div className="flex items-center mb-6 overflow-x-auto pb-1">
//       {STEPS.map((s, i) => {
//         const done = s.n < current;
//         const active = s.n === current;
//         return (
//           <React.Fragment key={s.n}>
//             <div className="flex items-center gap-1.5 shrink-0">
//               <div
//                 className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
//                 ${done ? 'bg-green-600 border-green-600 text-white' : active ? 'bg-white border-green-700 text-green-700' : 'bg-white border-gray-300 text-gray-400'}`}
//               >
//                 {done ? <CheckCircle size={14} /> : s.n}
//               </div>
//               <span
//                 className={`text-xs font-medium hidden sm:block whitespace-nowrap
//                 ${active ? 'text-green-700 font-semibold' : done ? 'text-green-600' : 'text-gray-400'}`}
//               >
//                 {s.label}
//               </span>
//             </div>
//             {i < STEPS.length - 1 && (
//               <div
//                 className={`flex-1 h-0.5 mx-1 sm:mx-2 min-w-3 transition-all ${done ? 'bg-green-500' : 'bg-gray-200'}`}
//               />
//             )}
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );
// }

// interface SummaryProps {
//   fromAmount: string;
//   fromCurrency: string;
//   toAmount: string;
//   toCurrency: string;
//   rate: number;
//   fee: number;
//   total: number;
//   loadingRate?: boolean;
// }

// function TransferSummary({
//   fromAmount,
//   fromCurrency,
//   toAmount,
//   toCurrency,
//   rate,
//   fee,
//   total,
//   loadingRate,
// }: SummaryProps) {
//   const fromCurr = CURRENCIES.find(c => c.code === fromCurrency);
//   const toCurr = CURRENCIES.find(c => c.code === toCurrency);
//   return (
//     <div className="lg:col-span-2 space-y-4">
//       <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
//         <h3 className="font-bold text-gray-800 mb-4 text-base">
//           Transfer Summary
//         </h3>
//         <div className="space-y-3">
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-500">You send</span>
//             <span className="font-medium text-gray-700 flex items-center gap-1.5">
//               {fromCurr && (
//                 <FlagImg flag={fromCurr.flag} code={fromCurr.code} size={16} />
//               )}
//               ${formatCurrency(parseFloat(fromAmount || '0'))} {fromCurrency}
//             </span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-500">
//               Connected bank account (ACH) fee
//             </span>
//             <span className="font-medium text-gray-700">
//               ${fee.toFixed(2)} USD
//             </span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-500">Our fee</span>
//             <span className="font-medium text-gray-700">
//               ${fee.toFixed(2)} USD
//             </span>
//           </div>

//           <div className="border-t border-gray-100 pt-3">
//             <div className="flex justify-between items-center">
//               <span className="font-semibold text-gray-800 text-sm">
//                 Total to pay
//               </span>
//               <span className="font-bold text-green-700 text-xl">
//                 ${formatCurrency(total)} {fromCurrency}
//               </span>
//             </div>
//           </div>
//           <div className="bg-blue-50 rounded-xl p-3 mt-2">
//             <p className="text-xs text-gray-500 mb-0.5">Recipient gets</p>
//             <div className="flex items-center gap-2">
//               {toCurr && (
//                 <FlagImg flag={toCurr.flag} code={toCurr.code} size={20} />
//               )}
//               {loadingRate ? (
//                 <div className="flex items-center gap-1">
//                   <RefreshCw size={14} className="animate-spin text-blue-400" />
//                   <span className="text-gray-400 text-sm">Updating…</span>
//                 </div>
//               ) : (
//                 <p className="text-2xl font-bold text-blue-600">
//                   {toAmount} {toCurrency}
//                 </p>
//               )}
//             </div>
//             <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
//               {fromCurr && (
//                 <FlagImg flag={fromCurr.flag} code={fromCurr.code} size={14} />
//               )}
//               1 {fromCurrency} =
//               {loadingRate ? (
//                 <span className="text-gray-400 ml-1">…</span>
//               ) : (
//                 <span className="ml-1 font-medium">
//                   {rate.toFixed(4)} {toCurrency}
//                 </span>
//               )}
//             </p>
//             <p className="text-xs text-gray-500">Delivery: 1–2 business days</p>
//           </div>
//         </div>
//       </div>
//       <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-2.5">
//         {[
//           { icon: '🛡️', text: 'No hidden fees' },
//           { icon: '🔄', text: 'Guaranteed exchange rate' },
//           { icon: '🔒', text: 'Secure and encrypted' },
//           { icon: '👥', text: 'Trusted by millions worldwide' },
//         ].map(item => (
//           <div
//             key={item.text}
//             className="flex items-center gap-3 text-sm text-gray-600"
//           >
//             <span>{item.icon}</span> {item.text}
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center justify-around py-3 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
//         {[
//           { icon: '🔒', label: '256-bit SSL' },
//           { icon: '📋', label: 'PCI DSS' },
//           { icon: '👥', label: 'Trusted' },
//         ].map(b => (
//           <div key={b.label} className="text-center">
//             <span className="text-xl">{b.icon}</span>
//             <p className="text-xs text-gray-500 mt-0.5">{b.label}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function DeliveryMethodSection({
//   deliveryMethod,
//   setDeliveryMethod,
//   onComplete,
//   bankName,
//   setBankName,
//   accountHolder,
//   setAccountHolder,
//   accountNumber,
//   setAccountNumber,
//   ibanRouting,
//   setIbanRouting,
//   swiftCode,
//   setSwiftCode,
// }: {
//   deliveryMethod: DeliveryMethod;
//   setDeliveryMethod: (m: DeliveryMethod) => void;
//   onComplete: () => void;
//   bankName: string;
//   setBankName: (v: string) => void;
//   accountHolder: string;
//   setAccountHolder: (v: string) => void;
//   accountNumber: string;
//   setAccountNumber: (v: string) => void;
//   ibanRouting: string;
//   setIbanRouting: (v: string) => void;
//   swiftCode: string;
//   setSwiftCode: (v: string) => void;
// }) {
//   const [bankCountry, setBankCountry] = useState('Bangladesh');
//   const [bankDocs, setBankDocs] = useState<UploadedDoc[]>([]);
//   const [bankDocType, setBankDocType] = useState('');

//   const [walletCountry, setWalletCountry] = useState('Bangladesh');
//   const [walletProvider, setWalletProvider] = useState('');
//   const [walletMobile, setWalletMobile] = useState('');
//   const [walletHolder, setWalletHolder] = useState('');

//   const [cashCountry, setCashCountry] = useState('Philippines');
//   const [pickupLocation, setPickupLocation] = useState('');
//   const [cashRecipient, setCashRecipient] = useState('');
//   const [cashMobile, setCashMobile] = useState('');
//   const [cashAddress, setCashAddress] = useState('');
//   const [cashDocType, setCashDocType] = useState('');
//   const [cashDocs, setCashDocs] = useState<UploadedDoc[]>([]);

//   const [cashDistrict, setCashDistrict] = useState('');

//   const [completed, setCompleted] = useState(false);

//   const availableDistricts =
//     districtsByCountry[cashCountry as keyof typeof districtsByCountry] || [];

//   const availableBanks =
//     banksByCountry[bankCountry as keyof typeof banksByCountry] || [];

//   useEffect(() => {
//     const banks = banksByCountry[bankCountry as keyof typeof banksByCountry];
//     if (banks?.length) setBankName(banks[0].name);
//   }, [bankCountry]);

//   useEffect(() => {
//     if (completed) return;
//     let done = false;
//     if (deliveryMethod === 'bank' && bankName && accountHolder && accountNumber)
//       done = true;
//     if (
//       deliveryMethod === 'wallet' &&
//       walletProvider &&
//       walletMobile &&
//       walletHolder
//     )
//       done = true;
//     if (
//       deliveryMethod === 'cash' &&
//       cashDistrict &&
//       cashRecipient &&
//       cashMobile &&
//       cashAddress
//     )
//       done = true;
//     if (done) {
//       setCompleted(true);
//       setTimeout(onComplete, 400);
//     }
//   }, [
//     deliveryMethod,
//     bankName,
//     accountHolder,
//     accountNumber,
//     walletProvider,
//     walletMobile,
//     walletHolder,
//     cashDistrict,
//     cashRecipient,
//     cashMobile,
//     cashAddress,
//     completed,
//     onComplete,
//   ]);

//   useEffect(() => {
//     setCashDistrict('');
//   }, [cashCountry]);

//   const cardBase =
//     'flex-1 border-2 rounded-xl p-3 sm:p-4 cursor-pointer transition-all min-w-0';
//   const inputCls =
//     'w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-600';

//   const walletIcons = [
//     { name: 'bKash', icon: '/Mobile_walet_Icons/BKash.svg' },
//     { name: 'Nagad', icon: '/Mobile_walet_Icons/Nagad.svg' },
//     { name: 'Rocket', icon: '/Mobile_walet_Icons/Rocket.svg' },
//     { name: 'Upay', icon: '/Mobile_walet_Icons/Upay.svg' },
//   ];

//   return (
//     <div>
//       <div className="flex items-center gap-2 mb-4">
//         <div className="w-7 h-7 rounded-full bg-green-900 text-green-400 flex items-center justify-center text-xs font-bold shrink-0">
//           3
//         </div>
//         <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
//           How will your recipient receive the money?
//         </h3>
//       </div>

//       <div className="flex gap-2 sm:gap-3 mb-4">
//         {[
//           {
//             id: 'bank' as DeliveryMethod,
//             Icon: Landmark,
//             label: 'Bank Account',
//             sub: 'Best for most',
//             time: '1–2 business days',
//             color: 'text-[#133000]',
//           },
//           {
//             id: 'wallet' as DeliveryMethod,
//             Icon: Smartphone,
//             label: 'Mobile Wallet',
//             sub: 'Fastest',
//             time: 'Within minutes',
//             color: 'text-green-600',
//           },
//           {
//             id: 'cash' as DeliveryMethod,
//             Icon: Wallet,
//             label: 'Cash Pickup',
//             sub: 'Convenient',
//             time: 'Instant pickup',
//             color: 'text-orange-500',
//           },
//         ].map(({ id, Icon, label, sub, time, color }) => (
//           <div
//             key={id}
//             className={`${cardBase} ${deliveryMethod === id ? 'border-green-700 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
//             onClick={() => {
//               setDeliveryMethod(deliveryMethod === id ? null : id);
//               setCompleted(false);
//             }}
//           >
//             <div className="relative flex flex-col items-center text-center gap-1">
//               <div
//                 className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 absolute top-0 left-0 ${deliveryMethod === id ? 'border-green-600 bg-green-600' : 'border-gray-300'}`}
//               >
//                 {deliveryMethod === id && (
//                   <div className="w-1.5 h-1.5 rounded-full bg-white" />
//                 )}
//               </div>
//               <Icon
//                 size={28}
//                 className={deliveryMethod === id ? color : 'text-gray-500'}
//               />
//               <p className="font-semibold text-xs sm:text-sm text-gray-800">
//                 {label}
//               </p>
//               <p
//                 className={`text-xs font-medium ${deliveryMethod === id ? color : 'text-gray-400'}`}
//               >
//                 {sub}
//               </p>
//               <p className="text-xs text-gray-400">{time}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {deliveryMethod === 'bank' && (
//         <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Bank Country
//               </label>
//               <CountrySelect value={bankCountry} onChange={setBankCountry} />
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Bank Name
//               </label>
//               <BankDropdown
//                 banks={availableBanks}
//                 value={bankName}
//                 onChange={setBankName}
//               />
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Account Holder Name <span className="text-red-400">*</span>
//               </label>
//               <div className="relative">
//                 <User
//                   size={14}
//                   className="absolute left-3 top-3 text-gray-400"
//                 />
//                 <input
//                   value={accountHolder}
//                   onChange={e => setAccountHolder(e.target.value)}
//                   placeholder="Full name"
//                   className={`${inputCls} pl-8`}
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Account Number <span className="text-red-400">*</span>
//               </label>
//               <div className="relative">
//                 <Hash
//                   size={14}
//                   className="absolute left-3 top-3 text-gray-400"
//                 />
//                 <input
//                   value={accountNumber}
//                   onChange={e => setAccountNumber(e.target.value)}
//                   placeholder="Account number"
//                   className={`${inputCls} pl-8`}
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 IBAN / Routing (Optional)
//               </label>
//               <div className="relative">
//                 <Hash
//                   size={14}
//                   className="absolute left-3 top-3 text-gray-400"
//                 />
//                 <input
//                   value={ibanRouting}
//                   onChange={e => setIbanRouting(e.target.value)}
//                   className={`${inputCls} pl-8`}
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 SWIFT / BIC (Optional)
//               </label>
//               <div className="relative">
//                 <Hash
//                   size={14}
//                   className="absolute left-3 top-3 text-gray-400"
//                 />
//                 <input
//                   value={swiftCode}
//                   onChange={e => setSwiftCode(e.target.value)}
//                   className={`${inputCls} pl-8`}
//                 />
//               </div>
//             </div>
//             <DocumentUpload
//               docType={bankDocType}
//               setDocType={setBankDocType}
//               docs={bankDocs}
//               setDocs={setBankDocs}
//             />
//           </div>
//           <div className="flex items-start gap-2 mt-2">
//             <Shield size={15} className="text-green-600 shrink-0 mt-0.5" />
//             <p className="text-xs text-gray-400">
//               Your transfer will be sent securely to the recipient's bank
//               account.
//             </p>
//           </div>
//         </div>
//       )}

//       {deliveryMethod === 'wallet' && (
//         <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Country
//               </label>
//               <CountrySelect
//                 value={walletCountry}
//                 onChange={setWalletCountry}
//               />
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Wallet Provider <span className="text-red-400">*</span>
//               </label>
//               <WalletDropdown
//                 wallets={wallets}
//                 value={walletProvider}
//                 onChange={setWalletProvider}
//               />
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Mobile Number <span className="text-red-400">*</span>
//               </label>
//               <div className="flex gap-2">
//                 <span className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 shrink-0">
//                   +880
//                 </span>
//                 <input
//                   value={walletMobile}
//                   onChange={e => setWalletMobile(e.target.value)}
//                   placeholder="Mobile number"
//                   className={inputCls}
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Account Holder Name <span className="text-red-400">*</span>
//               </label>
//               <input
//                 value={walletHolder}
//                 onChange={e => setWalletHolder(e.target.value)}
//                 placeholder="Full name"
//                 className={inputCls}
//               />
//             </div>
//           </div>
//           {/* Wallet icons — green border on selected provider */}
//           <div className="flex items-center justify-between mt-2">
//             {walletIcons.map(w => {
//               const isSelected = walletProvider
//                 .toLowerCase()
//                 .includes(w.name.toLowerCase());
//               return (
//                 <div key={w.name} className="text-center">
//                   <div
//                     className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all ${isSelected ? 'border-green-600 shadow-md shadow-green-100' : 'border-transparent'}`}
//                   >
//                     <img
//                       src={w.icon}
//                       alt={w.name}
//                       className="w-12 h-12 object-contain"
//                     />
//                   </div>
//                   <p
//                     className={`text-xs mt-0.5 ${isSelected ? 'text-green-700 font-semibold' : 'text-gray-500'}`}
//                   >
//                     {w.name}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {deliveryMethod === 'cash' && (
//         <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Country
//               </label>
//               <CountrySelect value={cashCountry} onChange={setCashCountry} />
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Pickup Location <span className="text-red-400">*</span>
//               </label>

//               <select
//                 value={cashDistrict}
//                 onChange={e => setCashDistrict(e.target.value)}
//                 className={inputCls}
//               >
//                 <option value="">Select district</option>

//                 {availableDistricts.map(district => (
//                   <option key={district} value={district}>
//                     {district}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Recipient Full Name <span className="text-red-400">*</span>
//               </label>
//               <input
//                 value={cashRecipient}
//                 onChange={e => setCashRecipient(e.target.value)}
//                 placeholder="Full name"
//                 className={inputCls}
//               />
//             </div>
//             <div>
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Mobile Number <span className="text-red-400">*</span>
//               </label>
//               <div className="relative">
//                 <Phone
//                   size={14}
//                   className="absolute left-3 top-3 text-gray-400"
//                 />
//                 <input
//                   value={cashMobile}
//                   onChange={e => setCashMobile(e.target.value)}
//                   placeholder="+1 555 000 0000"
//                   className={`${inputCls} pl-8`}
//                 />
//               </div>
//             </div>
//             <div className="sm:col-span-2">
//               <label className="text-xs text-gray-500 mb-1 block">
//                 Home Address <span className="text-red-400">*</span>
//               </label>
//               <div className="relative">
//                 <MapPin
//                   size={14}
//                   className="absolute left-3 top-3 text-gray-400"
//                 />
//                 <input
//                   value={cashAddress}
//                   onChange={e => setCashAddress(e.target.value)}
//                   placeholder="Full home address"
//                   className={`${inputCls} pl-8`}
//                 />
//               </div>
//             </div>
//             <DocumentUpload
//               docType={cashDocType}
//               setDocType={setCashDocType}
//               docs={cashDocs}
//               setDocs={setCashDocs}
//             />
//           </div>
//           <div className="flex items-start gap-2 mt-1">
//             <Shield size={15} className="text-green-600 shrink-0 mt-0.5" />
//             <p className="text-xs text-gray-400">
//               Recipient can pick up cash from thousands of locations.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function PaymentMethodSection({
//   paymentMethod,
//   setPaymentMethod,
//   onComplete,
// }: {
//   paymentMethod: string;
//   setPaymentMethod: (v: string) => void;
//   onComplete: () => void;
// }) {
//   const [selectedCard, setSelectedCard] = useState<string>('');
//   const [showAddNew, setShowAddNew] = useState(false);
//   const [completed, setCompleted] = useState(false);

//   const savedCards = mockPaymentMethods.find(m => m.type === 'card');
//   const savedBanks = mockPaymentMethods.find(m => m.type === 'bank');
//   const savedWallets = mockPaymentMethods.find(m => m.type === 'wallet');

//   const paymentMethods = [
//     {
//       id: 'bank',
//       label: 'Bank Transfer',
//       Icon: Landmark,
//       fee: 'No extra fees',
//       recommended: true,
//     },
//     {
//       id: 'card',
//       label: 'Debit / Credit',
//       Icon: CreditCard,
//       fee: 'Fee: $3.49',
//       recommended: false,
//     },
//     {
//       id: 'apple',
//       label: 'Apple Pay',
//       Icon: Smartphone,
//       fee: 'Fee: $2.99',
//       recommended: false,
//     },
//     {
//       id: 'google',
//       label: 'Google Pay',
//       Icon: Smartphone,
//       fee: 'Fee: $2.99',
//       recommended: false,
//     },
//     {
//       id: 'wallet',
//       label: 'Wallet',
//       Icon: Wallet,
//       fee: '$125.50 available',
//       recommended: false,
//     },
//   ];

//   const suggestions =
//     paymentMethod === 'card'
//       ? (savedCards?.cards ?? [])
//       : paymentMethod === 'bank'
//         ? (savedBanks?.cards ?? [])
//         : paymentMethod === 'wallet'
//           ? (savedWallets?.cards ?? [])
//           : [];

//   useEffect(() => {
//     if (completed) return;
//     const needsSuggestion = ['card', 'bank', 'wallet'].includes(paymentMethod);
//     const done = needsSuggestion ? !!selectedCard : !!paymentMethod;
//     if (done) {
//       setCompleted(true);
//       setTimeout(onComplete, 300);
//     }
//   }, [paymentMethod, selectedCard, completed, onComplete]);

//   const handleMethodChange = (id: string) => {
//     setPaymentMethod(id);
//     setSelectedCard('');
//     setCompleted(false);
//   };

//   return (
//     <div>
//       <div className="flex items-center gap-2 mb-4">
//         <div className="w-7 h-7 rounded-full bg-green-900 text-green-400 flex items-center justify-center text-xs font-bold shrink-0">
//           4
//         </div>
//         <h3 className="font-semibold text-gray-800">Payment Method</h3>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
//         {paymentMethods.map(pm => (
//           <label
//             key={pm.id}
//             className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 cursor-pointer transition ${paymentMethod === pm.id ? 'border-green-700 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
//           >
//             <input
//               type="radio"
//               name="pm"
//               value={pm.id}
//               checked={paymentMethod === pm.id}
//               onChange={() => handleMethodChange(pm.id)}
//               className="accent-green-700 shrink-0"
//             />
//             <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
//               <pm.Icon size={14} className="text-gray-600" />
//             </div>
//             <div className="min-w-0">
//               <p className="text-xs font-semibold text-gray-800 leading-tight">
//                 {pm.label}
//               </p>
//               {pm.recommended && (
//                 <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
//                   Best
//                 </span>
//               )}
//               <p className="text-xs text-gray-400">{pm.fee}</p>
//             </div>
//           </label>
//         ))}
//       </div>

//       {suggestions.length > 0 && (
//         <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3">
//           <p className="text-xs font-semibold text-gray-600">
//             Your saved{' '}
//             {paymentMethod === 'card'
//               ? 'cards'
//               : paymentMethod === 'bank'
//                 ? 'bank accounts'
//                 : 'wallets'}
//             :
//           </p>
//           <div className="space-y-2">
//             {suggestions.map((item, i) => (
//               <label
//                 key={i}
//                 className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition ${selectedCard === item.label ? 'border-green-700 bg-white' : 'border-gray-100 bg-white hover:border-gray-200'}`}
//               >
//                 <input
//                   type="radio"
//                   name="saved"
//                   checked={selectedCard === item.label}
//                   onChange={() => setSelectedCard(item.label)}
//                   className="accent-green-700 shrink-0"
//                 />
//                 <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
//                   {item.icon ? (
//                     <img
//                       src={item.icon}
//                       alt={item.label}
//                       className="w-full h-full object-contain p-1"
//                     />
//                   ) : (
//                     <CreditCard size={16} className="text-gray-500" />
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-800 truncate">
//                     {item.label}
//                   </p>
//                   <p className="text-xs text-gray-400">{item.expires}</p>
//                 </div>
//                 {item.primary && (
//                   <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium shrink-0">
//                     Primary
//                   </span>
//                 )}
//               </label>
//             ))}
//           </div>

//           <button
//             onClick={() => setShowAddNew(!showAddNew)}
//             className="flex items-center gap-2 text-sm text-green-700 font-medium hover:text-green-800 transition mt-1"
//           >
//             <Plus size={15} /> Add new{' '}
//             {paymentMethod === 'card'
//               ? 'card'
//               : paymentMethod === 'bank'
//                 ? 'bank account'
//                 : 'wallet'}
//           </button>

//           {showAddNew && (
//             <div className="border border-dashed border-green-300 rounded-xl p-4 bg-white space-y-3 mt-2">
//               <p className="text-xs font-semibold text-gray-700">
//                 Add new {paymentMethod === 'card' ? 'card' : 'bank account'}
//               </p>
//               {paymentMethod === 'card' && (
//                 <>
//                   <input
//                     placeholder="Card Number"
//                     className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
//                   />
//                   <div className="grid grid-cols-2 gap-3">
//                     <input
//                       placeholder="MM/YY"
//                       className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
//                     />
//                     <input
//                       placeholder="CVV"
//                       className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
//                     />
//                   </div>
//                   <input
//                     placeholder="Cardholder Name"
//                     className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
//                   />
//                 </>
//               )}
//               {paymentMethod === 'bank' && (
//                 <>
//                   <input
//                     placeholder="Bank Name"
//                     className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
//                   />
//                   <input
//                     placeholder="Account Number"
//                     className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
//                   />
//                   <input
//                     placeholder="IBAN / Routing (Optional)"
//                     className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
//                   />
//                   <input
//                     placeholder="SWIFT / BIC (Optional)"
//                     className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
//                   />
//                 </>
//               )}
//               <button className="w-full py-2.5 bg-green-900 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition">
//                 Save & Use
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// function FinalReviewPage({
//   fromAmount,
//   fromCurrency,
//   toAmount,
//   toCurrency,
//   rate,
//   fee,
//   total,
//   recipientName,
//   recipientMobile,
//   recipientEmail,
//   recipientCountry,
//   recipientDocType,
//   bankName,
//   accountName,
//   accountNumber,
//   ibanRouting,
//   swiftCode,
//   receivingDocType,
//   loadingRate,
//   onConfirm,
//   onBack,
// }: {
//   fromAmount: string;
//   fromCurrency: string;
//   toAmount: string;
//   toCurrency: string;
//   rate: number;
//   fee: number;
//   total: number;
//   recipientName: string;
//   recipientMobile: string;
//   recipientEmail: string;
//   recipientCountry: string;
//   recipientDocType: string;
//   bankName: string;
//   accountName: string;
//   accountNumber: string;
//   ibanRouting: string;
//   swiftCode: string;
//   receivingDocType: string;
//   deliveryMethod: DeliveryMethod;
//   paymentMethod: string;
//   loadingRate: boolean;
//   onConfirm: () => void;
//   onBack: () => void;
// }) {
//   const rcCountry = CURRENCIES.find(c => c.country === recipientCountry);
//   const fromCurr = CURRENCIES.find(c => c.code === fromCurrency);
//   const toCurr = CURRENCIES.find(c => c.code === toCurrency);

//   return (
//     <div className="p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">
//       <div className="w-full mx-auto">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-700 font-medium mb-5 transition"
//         >
//           <ChevronLeft size={16} />
//           Back
//         </button>

//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
//           Review &amp; Confirm
//         </h2>
//         <p className="text-sm text-gray-500 mb-6">
//           Please review the details before you confirm
//         </p>

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
//           <div className="lg:col-span-3 space-y-4">
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6">
//                 <div className="space-y-6">
//                   <div>
//                     <p className="text-sm font-bold text-gray-800 mb-3">
//                       Sender Details
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
//                         <User size={18} className="text-white" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold text-gray-900">
//                           John Rahman
//                         </p>
//                         <p className="text-xs text-gray-400">
//                           john.rahman@email.com
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <p className="text-sm font-bold text-gray-800 mb-3">
//                       Recipient Details
//                     </p>
//                     <div className="flex items-center gap-3 mb-3">
//                       <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
//                         <User size={18} className="text-white" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold text-gray-900">
//                           {recipientName || 'Ahmed Khan'}
//                         </p>
//                         <p className="text-xs text-gray-400">
//                           {recipientEmail || 'ahmed.khan@email.com'}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex items-start gap-2.5">
//                         <Phone
//                           size={13}
//                           className="text-gray-400 shrink-0 mt-0.5"
//                         />
//                         <span className="text-xs text-gray-500 w-24 shrink-0">
//                           Mobile
//                         </span>
//                         <span className="text-xs font-medium text-gray-800 break-all">
//                           {recipientMobile || '—'}
//                         </span>
//                       </div>
//                       <div className="flex items-start gap-2.5">
//                         <Mail
//                           size={13}
//                           className="text-gray-400 shrink-0 mt-0.5"
//                         />
//                         <span className="text-xs text-gray-500 w-24 shrink-0">
//                           Email
//                         </span>
//                         <span className="text-xs font-medium text-gray-800 break-all">
//                           {recipientEmail || '—'}
//                         </span>
//                       </div>
//                       {rcCountry && (
//                         <div className="flex items-start gap-2.5">
//                           <MapPin
//                             size={13}
//                             className="text-gray-400 shrink-0 mt-0.5"
//                           />
//                           <span className="text-xs text-gray-500 w-24 shrink-0">
//                             Country
//                           </span>
//                           <div className="flex items-center gap-1.5">
//                             <FlagImg
//                               flag={rcCountry.flag}
//                               code={rcCountry.code}
//                               size={16}
//                             />
//                             <span className="text-xs font-medium text-gray-800">
//                               {recipientCountry}
//                             </span>
//                           </div>
//                         </div>
//                       )}
//                       {recipientDocType && (
//                         <div className="flex items-start gap-2.5">
//                           <Shield
//                             size={13}
//                             className="text-gray-400 shrink-0 mt-0.5"
//                           />
//                           <span className="text-xs text-gray-500 w-24 shrink-0">
//                             Document
//                           </span>
//                           <span className="text-xs font-medium text-gray-800">
//                             {DOC_TYPES.find(d => d.value === recipientDocType)
//                               ?.label || recipientDocType}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <p className="text-sm font-bold text-gray-800 mb-3">
//                       Receiving Details
//                     </p>
//                     <div className="space-y-2">
//                       <div className="flex items-start gap-2.5">
//                         <Landmark
//                           size={13}
//                           className="text-gray-400 shrink-0 mt-0.5"
//                         />
//                         <span className="text-xs text-gray-500 w-24 shrink-0">
//                           Bank Name :
//                         </span>
//                         <span className="text-xs font-semibold text-gray-800">
//                           {bankName || 'Brac Bank PLC'}
//                         </span>
//                       </div>
//                       <div className="flex items-start gap-2.5">
//                         <User
//                           size={13}
//                           className="text-gray-400 shrink-0 mt-0.5"
//                         />
//                         <span className="text-xs text-gray-500 w-24 shrink-0">
//                           Account Name :
//                         </span>
//                         <span className="text-xs font-semibold text-gray-800">
//                           {accountName || recipientName || 'Ahmed Khan'}
//                         </span>
//                       </div>
//                       <div className="flex items-start gap-2.5">
//                         <Hash
//                           size={13}
//                           className="text-gray-400 shrink-0 mt-0.5"
//                         />
//                         <span className="text-xs text-gray-500 w-24 shrink-0">
//                           Account Number:
//                         </span>
//                         <span className="text-xs font-semibold text-gray-800 break-all">
//                           {accountNumber || '1234567890123'}
//                         </span>
//                       </div>
//                       <div className="flex items-start gap-2.5">
//                         <Hash
//                           size={13}
//                           className="text-gray-400 shrink-0 mt-0.5"
//                         />
//                         <span className="text-xs text-gray-500 w-24 shrink-0">
//                           Branch Name:
//                         </span>
//                         <span className="text-xs font-semibold text-gray-800 break-all">
//                           {ibanRouting || 'Uttara Branch'}
//                         </span>
//                       </div>
//                       <div className="flex items-start gap-2.5">
//                         <Hash
//                           size={13}
//                           className="text-gray-400 shrink-0 mt-0.5"
//                         />
//                         <span className="text-xs text-gray-500 w-24 shrink-0">
//                           IBAN / Routing :
//                         </span>
//                         <span className="text-xs font-semibold text-gray-800 break-all">
//                           {ibanRouting || '1234567890123'}
//                         </span>
//                       </div>
//                       <div className="flex items-start gap-2.5">
//                         <Hash
//                           size={13}
//                           className="text-gray-400 shrink-0 mt-0.5"
//                         />
//                         <span className="text-xs text-gray-500 w-24 shrink-0">
//                           SWIFT Code :
//                         </span>
//                         <span className="text-xs font-semibold text-gray-800 break-all">
//                           {swiftCode || '1234567890123'}
//                         </span>
//                       </div>
//                       {ibanRouting && (
//                         <div className="flex items-start gap-2.5">
//                           <Hash
//                             size={13}
//                             className="text-gray-400 shrink-0 mt-0.5"
//                           />
//                           <span className="text-xs text-gray-500 w-24 shrink-0">
//                             IBAN / Routing
//                           </span>
//                           <span className="text-xs font-semibold text-gray-800 break-all">
//                             {ibanRouting}
//                           </span>
//                         </div>
//                       )}
//                       {swiftCode && (
//                         <div className="flex items-start gap-2.5">
//                           <Hash
//                             size={13}
//                             className="text-gray-400 shrink-0 mt-0.5"
//                           />
//                           <span className="text-xs text-gray-500 w-24 shrink-0">
//                             SWIFT Code
//                           </span>
//                           <span className="text-xs font-semibold text-gray-800">
//                             {swiftCode}
//                           </span>
//                         </div>
//                       )}
//                       {receivingDocType && (
//                         <div className="flex items-start gap-2.5">
//                           <Shield
//                             size={13}
//                             className="text-gray-400 shrink-0 mt-0.5"
//                           />
//                           <span className="text-xs text-gray-500 w-24 shrink-0">
//                             Document
//                           </span>
//                           <span className="text-xs font-semibold text-gray-800">
//                             {DOC_TYPES.find(d => d.value === receivingDocType)
//                               ?.label || receivingDocType}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right column — Transfer Details */}
//                 <div>
//                   <p className="text-sm font-bold text-gray-800 mb-3">
//                     Transfer Details
//                   </p>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2.5">
//                       <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
//                         <ArrowUpRight size={14} className="text-green-600" />
//                       </div>
//                       <span className="text-sm text-gray-500 flex-1 min-w-0">
//                         You send
//                       </span>
//                       <span className="text-sm font-semibold text-gray-800 text-right">
//                         ${formatCurrency(parseFloat(fromAmount || '0'))}{' '}
//                         {fromCurrency}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2.5">
//                       <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
//                         <ArrowDownLeft size={14} className="text-green-600" />
//                       </div>
//                       <span className="text-sm text-gray-500 flex-1 min-w-0">
//                         Recipient gets
//                       </span>
//                       <span className="text-sm font-semibold text-gray-800 text-right">
//                         {toAmount} {toCurrency}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2.5">
//                       <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
//                         <ArrowLeftRight size={14} className="text-blue-600" />
//                       </div>
//                       <span className="text-sm text-gray-500 flex-1 min-w-0">
//                         Exchange rate
//                       </span>
//                       <span className="text-xs font-semibold text-gray-800 text-right">
//                         1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2.5">
//                       <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
//                         <Tag size={14} className="text-yellow-600" />
//                       </div>
//                       <span className="text-sm text-gray-500 flex-1 min-w-0">
//                         Transfer fee
//                       </span>
//                       <span className="text-sm font-semibold text-gray-800 text-right">
//                         ${fee.toFixed(2)} USD
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2.5">
//                       <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
//                         <Clock size={14} className="text-purple-600" />
//                       </div>
//                       <span className="text-sm text-gray-500 flex-1 min-w-0">
//                         Delivery time
//                       </span>
//                       <span className="text-sm font-semibold text-gray-800 text-right">
//                         1–2 business days
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Terms */}
//             <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
//               <Shield size={16} className="text-blue-500 shrink-0 mt-0.5" />
//               <p className="text-sm text-gray-600">
//                 By continuing, you agree to our{' '}
//                 <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
//                   Terms of Service
//                 </span>{' '}
//                 and{' '}
//                 <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
//                   Privacy Policy
//                 </span>
//                 .
//               </p>
//             </div>

//             {/* Confirm & Pay */}
//             <button
//               onClick={onConfirm}
//               className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 active:bg-blue-800 transition text-base shadow-lg"
//             >
//               <Shield size={18} />
//               Confirm &amp; Pay
//               <ChevronRight size={18} />
//             </button>

//             {/* Security badges */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
//               <div className="flex items-center gap-2.5">
//                 <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
//                   <Shield size={18} className="text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold text-gray-800">
//                     256-bit SSL Secure
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     Your data is encrypted and safe
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2.5">
//                 <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center shrink-0">
//                   <span className="text-white text-xs font-bold">PCI</span>
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold text-gray-800">
//                     PCI DSS Compliant
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     Secure payment processing
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2.5">
//                 <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
//                   <User size={18} className="text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-xs font-semibold text-gray-800">
//                     Trusted by Millions
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     Join millions of satisfied users
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <TransferSummary
//             fromAmount={fromAmount}
//             fromCurrency={fromCurrency}
//             toAmount={toAmount}
//             toCurrency={toCurrency}
//             rate={rate}
//             fee={fee}
//             total={total}
//             loadingRate={loadingRate}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function SendMoneyPage() {
//   const [rates, setRates] = useState<Record<string, number>>({});
//   const [loadingRate, setLoadingRate] = useState(false);
//   const [rateError, setRateError] = useState(false);
//   const [unlockedUpTo, setUnlockedUpTo] = useState<number>(1);
//   const [step, setStep] = useState<Step>(1);

//   const [fromAmount, setFromAmount] = useState('');
//   const [toAmountInput, setToAmountInput] = useState('');
//   const [lastEdited, setLastEdited] = useState<'from' | 'to'>('from');
//   const [fromCurrency, setFromCurrency] = useState('USD');
//   const [toCurrency, setToCurrency] = useState('EUR');

//   // Step 2
//   const [recipientName, setRecipientName] = useState('');
//   const [recipientMobile, setRecipientMobile] = useState('');
//   const [recipientEmail, setRecipientEmail] = useState('');
//   const [recipientCountry, setRecipientCountry] = useState('Bangladesh');
//   const [saveRecipient, setSaveRecipient] = useState(true);
//   const [step2DocType, setStep2DocType] = useState('');
//   const [step2Docs, setStep2Docs] = useState<UploadedDoc[]>([]);

//   // SendMoneyPage-এ নতুন state যোগ করো
//   const [bankName, setBankName] = useState('');
//   const [accountHolder, setAccountHolder] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');
//   const [ibanRouting, setIbanRouting] = useState('');
//   const [swiftCode, setSwiftCode] = useState('');
//   const [bankDocType, setBankDocType] = useState('');

//   // Step 3
//   const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(null);

//   // Step 4
//   const [paymentMethod, setPaymentMethod] = useState('bank');

//   const rate = rates[toCurrency] ?? 0;

//   // Bidirectional calculation
//   const toAmount = (() => {
//     if (rate <= 0) return '—';
//     if (lastEdited === 'from')
//       return (Number(fromAmount || 0) * rate).toFixed(2);
//     return toAmountInput || '—';
//   })();

//   const displayFromAmount = (() => {
//     if (lastEdited === 'to' && rate > 0 && toAmountInput) {
//       return (Number(toAmountInput) / rate).toFixed(2);
//     }
//     return fromAmount;
//   })();

//   const fee = 2.99;
//   const total = parseFloat(displayFromAmount || '0') + fee;

//   const txId = useRef(
//     '#TSM' + Math.floor(10000000 + Math.random() * 90000000),
//   ).current;

//   const fetchRates = useCallback(async (base: string) => {
//     try {
//       setLoadingRate(true);
//       setRateError(false);
//       const res = await fetch(`/api/exchange-rate?base=${base}`, {
//         cache: 'no-store',
//       });
//       if (!res.ok) throw new Error('Failed');
//       const data = await res.json();
//       setRates(data.rates || {});
//     } catch {
//       setRateError(true);
//     } finally {
//       setLoadingRate(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchRates(fromCurrency);
//   }, [fromCurrency, fetchRates]);

//   // ── AUTO-ADVANCE: Step 1 → 2 (only first time) ──
//   useEffect(() => {
//     const effectiveFrom =
//       lastEdited === 'to' && rate > 0 && toAmountInput
//         ? Number(toAmountInput) / rate
//         : Number(fromAmount);
//     if (unlockedUpTo === 1 && effectiveFrom > 0 && rate > 0) {
//       const t = setTimeout(() => {
//         setUnlockedUpTo(2);
//         setStep(2);
//       }, 600);
//       return () => clearTimeout(t);
//     }
//   }, [fromAmount, toAmountInput, lastEdited, unlockedUpTo, rate]);

//   // ── AUTO-ADVANCE: Step 2 → 3 (only first time) ──
//   useEffect(() => {
//     if (
//       unlockedUpTo === 2 &&
//       recipientName.length >= 2 &&
//       recipientMobile.length >= 6 &&
//       recipientCountry
//     ) {
//       const t = setTimeout(() => {
//         setUnlockedUpTo(3);
//         setStep(3);
//       }, 500);
//       return () => clearTimeout(t);
//     }
//   }, [unlockedUpTo, recipientName, recipientMobile, recipientCountry]);

//   const swapCurrencies = () => {
//     setFromCurrency(toCurrency);
//     setToCurrency(fromCurrency);
//     setLastEdited('from');
//     setFromAmount('');
//     setToAmountInput('');
//   };

//   const fromCurr = CURRENCIES.find(c => c.code === fromCurrency);
//   const toCurr = CURRENCIES.find(c => c.code === toCurrency);

//   // ── Step 5: Review page ──
//   if (step === 5) {
//     return (
//       <FinalReviewPage
//         fromAmount={displayFromAmount}
//         fromCurrency={fromCurrency}
//         toAmount={toAmount}
//         toCurrency={toCurrency}
//         rate={rate}
//         fee={fee}
//         total={total}
//         recipientName={recipientName}
//         recipientMobile={recipientMobile}
//         recipientEmail={recipientEmail}
//         recipientCountry={recipientCountry}
//         deliveryMethod={deliveryMethod}
//         paymentMethod={paymentMethod}
//         loadingRate={loadingRate}
//         onConfirm={() => setStep(6)}
//         onBack={() => setStep(4)}
//         recipientDocType={step2DocType}
//         bankName={bankName}
//         accountName={accountHolder}
//         accountNumber={accountNumber}
//         ibanRouting={ibanRouting}
//         swiftCode={swiftCode}
//         receivingDocType={bankDocType}
//       />
//     );
//   }

//   // ── Step 6: Success ──
//   if (step === 6) {
//     return (
//       <div className="p-3 sm:p-4 lg:p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//           <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
//             <div className="bg-gradient-to-b from-green-50 to-white px-4 sm:px-6 py-8 sm:py-10 text-center">
//               <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-xl">
//                 <CheckCircle size={36} className="text-white" />
//               </div>
//               <h2 className="text-xl sm:text-2xl font-bold mt-5 text-gray-800">
//                 Payment <span className="text-green-600">Successful!</span>
//               </h2>
//               <p className="text-gray-500 text-sm mt-2">
//                 Your transfer has been completed successfully.
//               </p>
//             </div>
//             <div className="px-4 sm:px-6 py-4">
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
//                 {[
//                   { label: 'Transfer ID', value: txId, blue: true },
//                   {
//                     label: 'Date & Time',
//                     value: new Date().toLocaleDateString('en-GB', {
//                       day: '2-digit',
//                       month: 'short',
//                       year: 'numeric',
//                     }),
//                   },
//                   { label: 'Recipient', value: recipientName || 'Ahmed Khan' },
//                   { label: 'Amount Paid', value: `$${total.toFixed(2)}` },
//                 ].map((item, i) => (
//                   <div
//                     key={i}
//                     className="text-center p-2.5 sm:p-3 bg-gray-50 rounded-xl"
//                   >
//                     <p className="text-xs text-gray-400">{item.label}</p>
//                     <p
//                       className={`text-xs sm:text-sm font-semibold mt-1 ${item.blue ? 'text-blue-600' : 'text-gray-800'}`}
//                     >
//                       {item.value}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-xl flex items-center gap-3">
//                 <Shield size={18} className="text-green-600 shrink-0" />
//                 <div>
//                   <p className="font-semibold text-sm text-green-800">
//                     Your money is on its way!
//                   </p>
//                   <p className="text-xs text-green-600">
//                     We'll notify you when the transfer is delivered.
//                   </p>
//                 </div>
//               </div>
//               <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
//                 <button className="flex-1 bg-green-900 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-green-800 transition">
//                   <Send size={15} /> Track Transfer
//                 </button>
//                 <button className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
//                   <Download size={15} /> Download Receipt
//                 </button>
//                 <button className="sm:w-auto w-full border border-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
//                   <Share2 size={15} /> Share
//                 </button>
//               </div>
//             </div>
//           </div>
//           <TransferSummary
//             fromAmount={displayFromAmount}
//             fromCurrency={fromCurrency}
//             toAmount={toAmount}
//             toCurrency={toCurrency}
//             rate={rate}
//             fee={fee}
//             total={total}
//             loadingRate={loadingRate}
//           />
//         </div>
//       </div>
//     );
//   }

//   // ── Steps 1–4 ──
//   return (
//     <div className="p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">
//       <div className="w-full mx-auto">
//         <div className="flex items-center gap-3 mb-5">
//           <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
//             <Send size={16} className="text-green-800" />
//           </div>
//           <div>
//             <h2 className="text-lg sm:text-xl font-bold text-gray-800">
//               Send Money
//             </h2>
//             <p className="text-xs text-gray-400">
//               Fast, Secure &amp; Reliable Money Transfer
//             </p>
//           </div>
//         </div>

//         <StepBar current={Math.min(step, 5) as Step} />

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
//           <div className="lg:col-span-3 space-y-4">
//             <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 space-y-6 shadow-sm">
//               {/* ── STEP 1: Amount ── */}
//               <div>
//                 <div className="flex items-center gap-2 mb-4">
//                   <div
//                     className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step >= 1 ? 'bg-green-900 text-green-400' : 'bg-gray-200 text-gray-500'}`}
//                   >
//                     {step > 1 ? <CheckCircle size={14} /> : '1'}
//                   </div>
//                   <h3 className="font-semibold text-gray-800">Amount</h3>
//                 </div>

//                 <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3">
//                   {/* You Send */}
//                   <div className="flex-1">
//                     <label className="text-xs text-gray-500 mb-1.5 block">
//                       You Send
//                     </label>
//                     <div className="flex items-stretch border border-gray-200 rounded-xl focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10 transition z-10">
//                       <input
//                         type="number"
//                         value={
//                           lastEdited === 'from'
//                             ? fromAmount
//                             : rate > 0 && toAmountInput
//                               ? (Number(toAmountInput) / rate).toFixed(2)
//                               : fromAmount
//                         }
//                         onChange={e => {
//                           setFromAmount(e.target.value);
//                           setLastEdited('from');
//                         }}
//                         placeholder="Enter amount"
//                         className="flex-1 px-3 sm:px-4 py-3 text-base sm:text-lg font-semibold outline-none bg-transparent min-w-0"
//                       />
//                       <CurrencyDropDown
//                         selected={fromCurrency}
//                         onChange={setFromCurrency}
//                       />
//                     </div>
//                   </div>

//                   <div className="flex sm:items-end justify-center sm:pb-1">
//                     <button
//                       onClick={swapCurrencies}
//                       className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-green-900 hover:border-green-900 hover:text-white transition text-gray-500"
//                     >
//                       <ArrowLeftRight size={16} />
//                     </button>
//                   </div>

//                   {/* Recipient Gets — editable */}
//                   <div className="flex-1">
//                     <label className="text-xs text-gray-500 mb-1.5 block">
//                       Recipient Gets
//                     </label>
//                     <div className="flex items-stretch border border-gray-200 rounded-xl focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10 transition z-10">
//                       {loadingRate ? (
//                         <div className="flex-1 px-3 sm:px-4 py-3 bg-gray-50 flex items-center rounded-l-xl">
//                           <RefreshCw
//                             size={14}
//                             className="animate-spin text-gray-400"
//                           />
//                         </div>
//                       ) : (
//                         <input
//                           type="number"
//                           value={
//                             lastEdited === 'to'
//                               ? toAmountInput
//                               : rate > 0 && fromAmount
//                                 ? (Number(fromAmount) * rate).toFixed(2)
//                                 : ''
//                           }
//                           onChange={e => {
//                             setToAmountInput(e.target.value);
//                             setLastEdited('to');
//                           }}
//                           placeholder="0.00"
//                           className="flex-1 px-3 sm:px-4 py-3 text-base sm:text-lg font-semibold outline-none bg-transparent min-w-0"
//                         />
//                       )}
//                       <CurrencyDropDown
//                         selected={toCurrency}
//                         onChange={setToCurrency}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-3 sm:px-4 py-2.5 bg-green-100 rounded-xl">
//                   <span className="text-xs text-gray-600 flex items-center gap-1.5">
//                     {fromCurr && (
//                       <FlagImg
//                         flag={fromCurr.flag}
//                         code={fromCurr.code}
//                         size={14}
//                       />
//                     )}
//                     {loadingRate ? (
//                       <span className="flex items-center gap-1 text-gray-400">
//                         <RefreshCw size={11} className="animate-spin" />{' '}
//                         Updating rate…
//                       </span>
//                     ) : rateError ? (
//                       <button
//                         onClick={() => fetchRates(fromCurrency)}
//                         className="text-red-500 underline flex items-center gap-1"
//                       >
//                         <RefreshCw size={11} /> Retry
//                       </button>
//                     ) : (
//                       <>
//                         1 {fromCurrency} ={' '}
//                         {toCurr && (
//                           <FlagImg
//                             flag={toCurr.flag}
//                             code={toCurr.code}
//                             size={14}
//                             className="ml-1"
//                           />
//                         )}
//                         <span className="font-semibold ml-0.5">
//                           {rate.toFixed(4)} {toCurrency}
//                         </span>
//                       </>
//                     )}
//                   </span>
//                   <span className="text-xs text-green-600 font-medium">
//                     Fee: ${fee} USD
//                   </span>
//                   <span className="text-xs text-green-600 font-medium flex items-center gap-1">
//                     <CheckCircle size={11} /> No hidden fees
//                   </span>
//                 </div>
//               </div>

//               {/* ── STEP 2: Recipient ── */}
//               <div
//                 className={
//                   unlockedUpTo < 2 ? 'opacity-40 pointer-events-none' : ''
//                 }
//               >
//                 <div className="flex items-center gap-2 mb-4">
//                   <div
//                     className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${unlockedUpTo >= 2 ? 'bg-green-900 text-green-400' : 'bg-gray-200 text-gray-500'}`}
//                   >
//                     {step > 2 ? <CheckCircle size={14} /> : '2'}
//                   </div>
//                   <h3 className="font-semibold text-gray-800">
//                     Recipient Details
//                   </h3>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1 block">
//                       Full Name <span className="text-red-400">*</span>
//                     </label>
//                     <div className="relative">
//                       <User
//                         size={14}
//                         className="absolute left-3 top-3 text-gray-400"
//                       />
//                       <input
//                         value={recipientName}
//                         onChange={e => setRecipientName(e.target.value)}
//                         placeholder="Recipient full name"
//                         className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-700"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1 block">
//                       Mobile Number <span className="text-red-400">*</span>
//                     </label>
//                     <div className="relative">
//                       <Phone
//                         size={14}
//                         className="absolute left-3 top-3 text-gray-400"
//                       />
//                       <input
//                         value={recipientMobile}
//                         onChange={e => setRecipientMobile(e.target.value)}
//                         placeholder="+880 1812-345678"
//                         className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-700"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1 block">
//                       Email (Optional)
//                     </label>
//                     <div className="relative">
//                       <Mail
//                         size={14}
//                         className="absolute left-3 top-3 text-gray-400"
//                       />
//                       <input
//                         type="email"
//                         value={recipientEmail}
//                         onChange={e => setRecipientEmail(e.target.value)}
//                         placeholder="email@example.com"
//                         className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-700"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1 block">
//                       Country <span className="text-red-400">*</span>
//                     </label>
//                     <CountrySelect
//                       value={recipientCountry}
//                       onChange={setRecipientCountry}
//                     />
//                   </div>
//                   <DocumentUpload
//                     docType={step2DocType}
//                     setDocType={setStep2DocType}
//                     docs={step2Docs}
//                     setDocs={setStep2Docs}
//                   />
//                 </div>
//                 <label className="flex items-center gap-2 mt-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={saveRecipient}
//                     onChange={e => setSaveRecipient(e.target.checked)}
//                     className="accent-green-700 w-4 h-4 rounded"
//                   />
//                   <span className="text-xs text-gray-600">
//                     Save this recipient for future transfers
//                   </span>
//                 </label>
//               </div>

//               {/* ── STEP 3: Delivery ── */}
//               <div
//                 className={
//                   unlockedUpTo < 3 ? 'opacity-40 pointer-events-none' : ''
//                 }
//               >
//                 <DeliveryMethodSection
//                   deliveryMethod={deliveryMethod}
//                   setDeliveryMethod={setDeliveryMethod}
//                   bankName={bankName}
//                   setBankName={setBankName}
//                   accountHolder={accountHolder}
//                   setAccountHolder={setAccountHolder}
//                   accountNumber={accountNumber}
//                   setAccountNumber={setAccountNumber}
//                   ibanRouting={ibanRouting}
//                   setIbanRouting={setIbanRouting}
//                   swiftCode={swiftCode}
//                   setSwiftCode={setSwiftCode}
//                   onComplete={() => {
//                     if (unlockedUpTo < 4) {
//                       setUnlockedUpTo(4);
//                       setStep(4);
//                     }
//                   }}
//                 />
//               </div>

//               <div
//                 className={
//                   unlockedUpTo < 4 ? 'opacity-40 pointer-events-none' : ''
//                 }
//               >
//                 <PaymentMethodSection
//                   paymentMethod={paymentMethod}
//                   setPaymentMethod={setPaymentMethod}
//                   onComplete={() => {
//                     if (unlockedUpTo < 5) {
//                       setUnlockedUpTo(5);
//                     }
//                   }}
//                 />

//                 {unlockedUpTo >= 5 && step === 4 && (
//                   <button
//                     onClick={() => setStep(5)}
//                     className="w-full py-3 bg-green-900 text-white rounded-xl font-semibold hover:bg-green-800 transition cursor-pointer mt-3"
//                   >
//                     Continue to Review
//                   </button>
//                 )}
//               </div>

//               {unlockedUpTo < 5 && (
//                 <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
//                   <Shield size={15} className="text-gray-300 shrink-0" />
//                   <p className="text-xs text-gray-400">
//                     Complete all steps above to proceed to final review
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <TransferSummary
//             fromAmount={displayFromAmount}
//             fromCurrency={fromCurrency}
//             toAmount={toAmount}
//             toCurrency={toCurrency}
//             rate={rate}
//             fee={fee}
//             total={total}
//             loadingRate={loadingRate}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Send,
  ArrowLeftRight,
  Shield,
  CheckCircle,
  Download,
  Share2,
  ChevronDown,
  Landmark,
  CreditCard,
  Smartphone,
  Wallet,
  User,
  Mail,
  Phone,
  Hash,
  MapPin,
  ChevronRight,
  Search,
  X,
  RefreshCw,
  Plus,
  Upload,
  Eye,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Tag,
  ChevronLeft,
  HeadphonesIcon,
} from 'lucide-react';
import { CURRENCIES } from '@/src/lib/country_api_data';
import FlagImg from '../others/FlagImg';
import CurrencyDropDown from '../others/CurrencyDropDown';
import {
  banksByCountry,
  mockPaymentMethods,
  wallets,
  districtsByCountry,
} from '@/src/lib/data';
import BankDropdown from '../others/BankDropdown';
import WalletDropdown from '@/src/components/others/WalletDropdown';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

type Step = 1 | 2 | 3 | 4 | 5 | 6;
type DeliveryMethod = 'bank' | 'wallet' | 'cash' | null;

interface UploadedDoc {
  file: File;
  preview: string;
}

const DOC_TYPES = [
  { value: 'passport', label: 'Passport' },
  { value: 'nid', label: 'National ID Card' },
  { value: 'dl', label: "Driver's License" },
  { value: 'bc', label: 'Birth Certificate' },
];

function DocumentUpload({
  docType,
  setDocType,
  docs,
  setDocs,
}: {
  docType: string;
  setDocType: (v: string) => void;
  docs: UploadedDoc[];
  setDocs: (d: UploadedDoc[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = 2 - docs.length;
    const toAdd = Array.from(files).slice(0, remaining);
    const newDocs: UploadedDoc[] = toAdd.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setDocs([...docs, ...newDocs]);
  };

  const removeDoc = (i: number) => {
    URL.revokeObjectURL(docs[i].preview);
    setDocs(docs.filter((_, idx) => idx !== i));
  };

  return (
    <div className="space-y-2 sm:col-span-2">
      <div>
        <label className="text-xs text-gray-500 mb-1 block">
          Document Type
        </label>
        <select
          value={docType}
          onChange={e => setDocType(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-600"
        >
          <option value="">Select document type</option>
          {DOC_TYPES.map(d => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
      {docType && (
        <div>
          <label className="text-xs text-gray-500 mb-1 block">
            Upload Photo <span className="text-gray-400">(max 2 photos)</span>
          </label>
          {docs.length > 0 && (
            <div className="flex gap-2 mb-2 flex-wrap">
              {docs.map((d, i) => (
                <div key={i} className="relative group">
                  <img
                    src={d.preview}
                    alt="doc"
                    className="w-[100px] h-[100px] object-cover rounded-lg border border-gray-200"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPreview(d.preview)}
                      className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center"
                    >
                      <Eye size={13} className="text-gray-700" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeDoc(i)}
                      className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <X size={13} className="text-white" />
                    </button>
                  </div>
                </div>
              ))}
              {docs.length < 2 && (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="w-[100px] h-[100px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-green-500 transition text-gray-400 hover:text-green-600"
                >
                  <Upload size={18} />
                  <span className="text-xs">Add more</span>
                </button>
              )}
            </div>
          )}
          {docs.length === 0 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl py-4 flex flex-col items-center gap-1.5 hover:border-green-500 hover:bg-green-50/30 transition"
            >
              <Upload size={20} className="text-gray-400" />
              <span className="text-xs text-gray-500">
                Click to upload photo
              </span>
              <span className="text-xs text-gray-400">PNG, JPG up to 5MB</span>
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
        </div>
      )}
      {preview && (
        <div
          className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="relative max-w-sm w-full"
            onClick={e => e.stopPropagation()}
          >
            <img src={preview} alt="preview" className="w-full rounded-xl" />
            <button
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CountrySelect({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const countries = CURRENCIES.filter(
    (c, i, arr) => arr.findIndex(x => x.country === c.country) === i,
  );
  const filtered = countries.filter(
    c =>
      c.country.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()),
  );
  const selected = countries.find(c => c.country === value || c.code === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open && inputRef.current)
      setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-600 flex items-center gap-2 text-left"
      >
        {selected ? (
          <>
            <FlagImg flag={selected.flag} code={selected.code} size={18} />
            <span className="flex-1 truncate">{selected.country}</span>
          </>
        ) : (
          <span className="text-gray-400 flex-1">Select country</span>
        )}
        <ChevronDown size={13} className="text-gray-400 shrink-0" />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 w-full min-w-[220px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 flex flex-col max-h-60">
          <div className="p-2 border-b border-gray-100 shrink-0">
            <div className="relative">
              <Search
                size={13}
                className="absolute left-2.5 top-2.5 text-gray-400"
              />
              <input
                ref={inputRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search country…"
                className="w-full pl-7 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.map(c => (
              <button
                key={c.country}
                onClick={() => {
                  onChange(c.country);
                  setOpen(false);
                  setSearch('');
                }}
                className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-gray-50 transition text-sm ${value === c.country ? 'bg-green-50' : ''}`}
              >
                <FlagImg flag={c.flag} code={c.code} size={18} />
                <span className="truncate">{c.country}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const STEPS = [
  { n: 1, label: 'Amount' },
  { n: 2, label: 'Recipient' },
  { n: 3, label: 'Receive Method' },
  { n: 4, label: 'Payment' },
  { n: 5, label: 'Review' },
];

function StepBar({ current }: { current: Step }) {
  return (
    <div className="flex items-center mb-6 overflow-x-auto pb-1">
      {STEPS.map((s, i) => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <React.Fragment key={s.n}>
            <div className="flex items-center gap-1.5 shrink-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                ${done ? 'bg-green-600 border-green-600 text-white' : active ? 'bg-white border-green-700 text-green-700' : 'bg-white border-gray-300 text-gray-400'}`}
              >
                {done ? <CheckCircle size={14} /> : s.n}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block whitespace-nowrap
                ${active ? 'text-green-700 font-semibold' : done ? 'text-green-600' : 'text-gray-400'}`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 sm:mx-2 min-w-3 transition-all ${done ? 'bg-green-500' : 'bg-gray-200'}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

interface SummaryProps {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
  rate: number;
  fee: number;
  total: number;
  loadingRate?: boolean;
}

function TransferSummary({
  fromAmount,
  fromCurrency,
  toAmount,
  toCurrency,
  rate,
  fee,
  total,
  loadingRate,
}: SummaryProps) {
  const fromCurr = CURRENCIES.find(c => c.code === fromCurrency);
  const toCurr = CURRENCIES.find(c => c.code === toCurrency);
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4 text-base">
          Transfer Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">You send</span>
            <span className="font-medium text-gray-700 flex items-center gap-1.5">
              {fromCurr && (
                <FlagImg flag={fromCurr.flag} code={fromCurr.code} size={16} />
              )}
              ${formatCurrency(parseFloat(fromAmount || '0'))} {fromCurrency}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              Connected bank account (ACH) fee
            </span>
            <span className="font-medium text-gray-700">
              ${fee.toFixed(2)} USD
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Our fee</span>
            <span className="font-medium text-gray-700">
              ${fee.toFixed(2)} USD
            </span>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800 text-sm">
                Total to pay
              </span>
              <span className="font-bold text-green-700 text-xl">
                ${formatCurrency(total)} {fromCurrency}
              </span>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 mt-2">
            <p className="text-xs text-gray-500 mb-0.5">Recipient gets</p>
            <div className="flex items-center gap-2">
              {toCurr && (
                <FlagImg flag={toCurr.flag} code={toCurr.code} size={20} />
              )}
              {loadingRate ? (
                <div className="flex items-center gap-1">
                  <RefreshCw size={14} className="animate-spin text-blue-400" />
                  <span className="text-gray-400 text-sm">Updating…</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-blue-600">
                  {toAmount} {toCurrency}
                </p>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
              {fromCurr && (
                <FlagImg flag={fromCurr.flag} code={fromCurr.code} size={14} />
              )}
              1 {fromCurrency} =
              {loadingRate ? (
                <span className="text-gray-400 ml-1">…</span>
              ) : (
                <span className="ml-1 font-medium">
                  {rate.toFixed(4)} {toCurrency}
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500">Delivery: 1–2 business days</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-2.5">
        {[
          { icon: '🛡️', text: 'No hidden fees' },
          { icon: '🔄', text: 'Guaranteed exchange rate' },
          { icon: '🔒', text: 'Secure and encrypted' },
          { icon: '👥', text: 'Trusted by millions worldwide' },
        ].map(item => (
          <div
            key={item.text}
            className="flex items-center gap-3 text-sm text-gray-600"
          >
            <span>{item.icon}</span> {item.text}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-around py-3 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        {[
          { icon: '🔒', label: '256-bit SSL' },
          { icon: '📋', label: 'PCI DSS' },
          { icon: '👥', label: 'Trusted' },
        ].map(b => (
          <div key={b.label} className="text-center">
            <span className="text-xl">{b.icon}</span>
            <p className="text-xs text-gray-500 mt-0.5">{b.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeliveryMethodSection({
  deliveryMethod,
  setDeliveryMethod,
  onComplete,
  bankName,
  setBankName,
  accountHolder,
  setAccountHolder,
  accountNumber,
  setAccountNumber,
  ibanRouting,
  setIbanRouting,
  swiftCode,
  setSwiftCode,
}: {
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (m: DeliveryMethod) => void;
  onComplete: () => void;
  bankName: string;
  setBankName: (v: string) => void;
  accountHolder: string;
  setAccountHolder: (v: string) => void;
  accountNumber: string;
  setAccountNumber: (v: string) => void;
  ibanRouting: string;
  setIbanRouting: (v: string) => void;
  swiftCode: string;
  setSwiftCode: (v: string) => void;
}) {
  const [bankCountry, setBankCountry] = useState('Bangladesh');
  const [bankDocs, setBankDocs] = useState<UploadedDoc[]>([]);
  const [bankDocType, setBankDocType] = useState('');

  const [walletCountry, setWalletCountry] = useState('Bangladesh');
  const [walletProvider, setWalletProvider] = useState('');
  const [walletMobile, setWalletMobile] = useState('');
  const [walletHolder, setWalletHolder] = useState('');

  const [cashCountry, setCashCountry] = useState('Philippines');
  const [pickupLocation, setPickupLocation] = useState('');
  const [cashRecipient, setCashRecipient] = useState('');
  const [cashMobile, setCashMobile] = useState('');
  const [cashAddress, setCashAddress] = useState('');
  const [cashDocType, setCashDocType] = useState('');
  const [cashDocs, setCashDocs] = useState<UploadedDoc[]>([]);

  const [cashDistrict, setCashDistrict] = useState('');

  const [completed, setCompleted] = useState(false);

  const availableDistricts =
    districtsByCountry[cashCountry as keyof typeof districtsByCountry] || [];

  const availableBanks =
    banksByCountry[bankCountry as keyof typeof banksByCountry] || [];

  useEffect(() => {
    const banks = banksByCountry[bankCountry as keyof typeof banksByCountry];
    if (banks?.length) setBankName(banks[0].name);
  }, [bankCountry]);

  useEffect(() => {
    if (completed) return;
    let done = false;
    if (deliveryMethod === 'bank' && bankName && accountHolder && accountNumber)
      done = true;
    if (
      deliveryMethod === 'wallet' &&
      walletProvider &&
      walletMobile &&
      walletHolder
    )
      done = true;
    if (
      deliveryMethod === 'cash' &&
      cashDistrict &&
      cashRecipient &&
      cashMobile &&
      cashAddress
    )
      done = true;
    if (done) {
      setCompleted(true);
      setTimeout(onComplete, 400);
    }
  }, [
    deliveryMethod,
    bankName,
    accountHolder,
    accountNumber,
    walletProvider,
    walletMobile,
    walletHolder,
    cashDistrict,
    cashRecipient,
    cashMobile,
    cashAddress,
    completed,
    onComplete,
  ]);

  useEffect(() => {
    setCashDistrict('');
  }, [cashCountry]);

  const cardBase =
    'flex-1 border-2 rounded-xl p-3 sm:p-4 cursor-pointer transition-all min-w-0';
  const inputCls =
    'w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-600';

  const walletIcons = [
    { name: 'bKash', icon: '/Mobile_walet_Icons/BKash.svg' },
    { name: 'Nagad', icon: '/Mobile_walet_Icons/Nagad.svg' },
    { name: 'Rocket', icon: '/Mobile_walet_Icons/Rocket.svg' },
    { name: 'Upay', icon: '/Mobile_walet_Icons/Upay.svg' },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-full bg-green-900 text-green-400 flex items-center justify-center text-xs font-bold shrink-0">
          3
        </div>
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
          How will your recipient receive the money?
        </h3>
      </div>

      <div className="flex gap-2 sm:gap-3 mb-4">
        {[
          {
            id: 'bank' as DeliveryMethod,
            Icon: Landmark,
            label: 'Bank Account',
            sub: 'Best for most',
            time: '1–2 business days',
            color: 'text-[#133000]',
          },
          {
            id: 'wallet' as DeliveryMethod,
            Icon: Smartphone,
            label: 'Mobile Wallet',
            sub: 'Fastest',
            time: 'Within minutes',
            color: 'text-green-600',
          },
          {
            id: 'cash' as DeliveryMethod,
            Icon: Wallet,
            label: 'Cash Pickup',
            sub: 'Convenient',
            time: 'Instant pickup',
            color: 'text-orange-500',
          },
        ].map(({ id, Icon, label, sub, time, color }) => (
          <div
            key={id}
            className={`${cardBase} ${deliveryMethod === id ? 'border-green-700 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            onClick={() => {
              setDeliveryMethod(deliveryMethod === id ? null : id);
              setCompleted(false);
            }}
          >
            <div className="relative flex flex-col items-center text-center gap-1">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 absolute top-0 left-0 ${deliveryMethod === id ? 'border-green-600 bg-green-600' : 'border-gray-300'}`}
              >
                {deliveryMethod === id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <Icon
                size={28}
                className={deliveryMethod === id ? color : 'text-gray-500'}
              />
              <p className="font-semibold text-xs sm:text-sm text-gray-800">
                {label}
              </p>
              <p
                className={`text-xs font-medium ${deliveryMethod === id ? color : 'text-gray-400'}`}
              >
                {sub}
              </p>
              <p className="text-xs text-gray-400">{time}</p>
            </div>
          </div>
        ))}
      </div>

      {deliveryMethod === 'bank' && (
        <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Bank Country
              </label>
              <CountrySelect value={bankCountry} onChange={setBankCountry} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Bank Name
              </label>
              <BankDropdown
                banks={availableBanks}
                value={bankName}
                onChange={setBankName}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Account Holder Name <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User
                  size={14}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  value={accountHolder}
                  onChange={e => setAccountHolder(e.target.value)}
                  placeholder="Full name"
                  className={`${inputCls} pl-8`}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Account Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Hash
                  size={14}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value)}
                  placeholder="Account number"
                  className={`${inputCls} pl-8`}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                IBAN / Routing (Optional)
              </label>
              <div className="relative">
                <Hash
                  size={14}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  value={ibanRouting}
                  onChange={e => setIbanRouting(e.target.value)}
                  className={`${inputCls} pl-8`}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                SWIFT / BIC (Optional)
              </label>
              <div className="relative">
                <Hash
                  size={14}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  value={swiftCode}
                  onChange={e => setSwiftCode(e.target.value)}
                  className={`${inputCls} pl-8`}
                />
              </div>
            </div>
            <DocumentUpload
              docType={bankDocType}
              setDocType={setBankDocType}
              docs={bankDocs}
              setDocs={setBankDocs}
            />
          </div>
          <div className="flex items-start gap-2 mt-2">
            <Shield size={15} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400">
              Your transfer will be sent securely to the recipient's bank
              account.
            </p>
          </div>
        </div>
      )}

      {deliveryMethod === 'wallet' && (
        <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Country
              </label>
              <CountrySelect
                value={walletCountry}
                onChange={setWalletCountry}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Wallet Provider <span className="text-red-400">*</span>
              </label>
              <WalletDropdown
                wallets={wallets}
                value={walletProvider}
                onChange={setWalletProvider}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Mobile Number <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                <span className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 shrink-0">
                  +880
                </span>
                <input
                  value={walletMobile}
                  onChange={e => setWalletMobile(e.target.value)}
                  placeholder="Mobile number"
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Account Holder Name <span className="text-red-400">*</span>
              </label>
              <input
                value={walletHolder}
                onChange={e => setWalletHolder(e.target.value)}
                placeholder="Full name"
                className={inputCls}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            {walletIcons.map(w => {
              const isSelected = walletProvider
                .toLowerCase()
                .includes(w.name.toLowerCase());
              return (
                <div key={w.name} className="text-center">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 transition-all ${isSelected ? 'border-green-600 shadow-md shadow-green-100' : 'border-transparent'}`}
                  >
                    <img
                      src={w.icon}
                      alt={w.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <p
                    className={`text-xs mt-0.5 ${isSelected ? 'text-green-700 font-semibold' : 'text-gray-500'}`}
                  >
                    {w.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {deliveryMethod === 'cash' && (
        <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Country
              </label>
              <CountrySelect value={cashCountry} onChange={setCashCountry} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Pickup Location <span className="text-red-400">*</span>
              </label>
              <select
                value={cashDistrict}
                onChange={e => setCashDistrict(e.target.value)}
                className={inputCls}
              >
                <option value="">Select district</option>
                {availableDistricts.map(district => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Recipient Full Name <span className="text-red-400">*</span>
              </label>
              <input
                value={cashRecipient}
                onChange={e => setCashRecipient(e.target.value)}
                placeholder="Full name"
                className={inputCls}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Mobile Number <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Phone
                  size={14}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  value={cashMobile}
                  onChange={e => setCashMobile(e.target.value)}
                  placeholder="+1 555 000 0000"
                  className={`${inputCls} pl-8`}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">
                Home Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <MapPin
                  size={14}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  value={cashAddress}
                  onChange={e => setCashAddress(e.target.value)}
                  placeholder="Full home address"
                  className={`${inputCls} pl-8`}
                />
              </div>
            </div>
            <DocumentUpload
              docType={cashDocType}
              setDocType={setCashDocType}
              docs={cashDocs}
              setDocs={setCashDocs}
            />
          </div>
          <div className="flex items-start gap-2 mt-1">
            <Shield size={15} className="text-green-600 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400">
              Recipient can pick up cash from thousands of locations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function PaymentMethodSection({
  paymentMethod,
  setPaymentMethod,
  onComplete,
}: {
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
  onComplete: () => void;
}) {
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [showAddNew, setShowAddNew] = useState(false);
  const [completed, setCompleted] = useState(false);

  const savedCards = mockPaymentMethods.find(m => m.type === 'card');
  const savedBanks = mockPaymentMethods.find(m => m.type === 'bank');
  const savedWallets = mockPaymentMethods.find(m => m.type === 'wallet');

  const paymentMethods = [
    {
      id: 'bank',
      label: 'Bank Transfer',
      Icon: Landmark,
      fee: 'No extra fees',
      recommended: true,
    },
    {
      id: 'card',
      label: 'Debit / Credit',
      Icon: CreditCard,
      fee: 'Fee: $3.49',
      recommended: false,
    },
    {
      id: 'apple',
      label: 'Apple Pay',
      Icon: Smartphone,
      fee: 'Fee: $2.99',
      recommended: false,
    },
    {
      id: 'google',
      label: 'Google Pay',
      Icon: Smartphone,
      fee: 'Fee: $2.99',
      recommended: false,
    },
    {
      id: 'wallet',
      label: 'Wallet',
      Icon: Wallet,
      fee: '$125.50 available',
      recommended: false,
    },
  ];

  const suggestions =
    paymentMethod === 'card'
      ? (savedCards?.cards ?? [])
      : paymentMethod === 'bank'
        ? (savedBanks?.cards ?? [])
        : paymentMethod === 'wallet'
          ? (savedWallets?.cards ?? [])
          : [];

  useEffect(() => {
    if (completed) return;
    const needsSuggestion = ['card', 'bank', 'wallet'].includes(paymentMethod);
    const done = needsSuggestion ? !!selectedCard : !!paymentMethod;
    if (done) {
      setCompleted(true);
      setTimeout(onComplete, 300);
    }
  }, [paymentMethod, selectedCard, completed, onComplete]);

  const handleMethodChange = (id: string) => {
    setPaymentMethod(id);
    setSelectedCard('');
    setCompleted(false);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-full bg-green-900 text-green-400 flex items-center justify-center text-xs font-bold shrink-0">
          4
        </div>
        <h3 className="font-semibold text-gray-800">Payment Method</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
        {paymentMethods.map(pm => (
          <label
            key={pm.id}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 cursor-pointer transition ${paymentMethod === pm.id ? 'border-green-700 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <input
              type="radio"
              name="pm"
              value={pm.id}
              checked={paymentMethod === pm.id}
              onChange={() => handleMethodChange(pm.id)}
              className="accent-green-700 shrink-0"
            />
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <pm.Icon size={14} className="text-gray-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 leading-tight">
                {pm.label}
              </p>
              {pm.recommended && (
                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                  Best
                </span>
              )}
              <p className="text-xs text-gray-400">{pm.fee}</p>
            </div>
          </label>
        ))}
      </div>

      {suggestions.length > 0 && (
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 space-y-3">
          <p className="text-xs font-semibold text-gray-600">
            Your saved{' '}
            {paymentMethod === 'card'
              ? 'cards'
              : paymentMethod === 'bank'
                ? 'bank accounts'
                : 'wallets'}
            :
          </p>
          <div className="space-y-2">
            {suggestions.map((item, i) => (
              <label
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition ${selectedCard === item.label ? 'border-green-700 bg-white' : 'border-gray-100 bg-white hover:border-gray-200'}`}
              >
                <input
                  type="radio"
                  name="saved"
                  checked={selectedCard === item.label}
                  onChange={() => setSelectedCard(item.label)}
                  className="accent-green-700 shrink-0"
                />
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <CreditCard size={16} className="text-gray-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-400">{item.expires}</p>
                </div>
                {item.primary && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium shrink-0">
                    Primary
                  </span>
                )}
              </label>
            ))}
          </div>

          <button
            onClick={() => setShowAddNew(!showAddNew)}
            className="flex items-center gap-2 text-sm text-green-700 font-medium hover:text-green-800 transition mt-1"
          >
            <Plus size={15} /> Add new{' '}
            {paymentMethod === 'card'
              ? 'card'
              : paymentMethod === 'bank'
                ? 'bank account'
                : 'wallet'}
          </button>

          {showAddNew && (
            <div className="border border-dashed border-green-300 rounded-xl p-4 bg-white space-y-3 mt-2">
              <p className="text-xs font-semibold text-gray-700">
                Add new {paymentMethod === 'card' ? 'card' : 'bank account'}
              </p>
              {paymentMethod === 'card' && (
                <>
                  <input
                    placeholder="Card Number"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="MM/YY"
                      className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
                    />
                    <input
                      placeholder="CVV"
                      className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
                    />
                  </div>
                  <input
                    placeholder="Cardholder Name"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
                  />
                </>
              )}
              {paymentMethod === 'bank' && (
                <>
                  <input
                    placeholder="Bank Name"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
                  />
                  <input
                    placeholder="Account Number"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
                  />
                  <input
                    placeholder="IBAN / Routing (Optional)"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
                  />
                  <input
                    placeholder="SWIFT / BIC (Optional)"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-green-600"
                  />
                </>
              )}
              <button className="w-full py-2.5 bg-green-900 text-white rounded-lg text-sm font-semibold hover:bg-green-800 transition">
                Save & Use
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FINAL REVIEW PAGE — কাজ-১: Mobile-এ Transfer Summary hidden,
// Transfer Details-এর মধ্যে summary data দেখাবে
// ─────────────────────────────────────────────────────────────
function FinalReviewPage({
  fromAmount,
  fromCurrency,
  toAmount,
  toCurrency,
  rate,
  fee,
  total,
  recipientName,
  recipientMobile,
  recipientEmail,
  recipientCountry,
  recipientDocType,
  bankName,
  accountName,
  accountNumber,
  ibanRouting,
  swiftCode,
  receivingDocType,
  loadingRate,
  onConfirm,
  onBack,
}: {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
  rate: number;
  fee: number;
  total: number;
  recipientName: string;
  recipientMobile: string;
  recipientEmail: string;
  recipientCountry: string;
  recipientDocType: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  ibanRouting: string;
  swiftCode: string;
  receivingDocType: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: string;
  loadingRate: boolean;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const rcCountry = CURRENCIES.find(c => c.country === recipientCountry);
  const fromCurr = CURRENCIES.find(c => c.code === fromCurrency);
  const toCurr = CURRENCIES.find(c => c.code === toCurrency);

  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">
      <div className="w-full mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-green-700 font-medium mb-5 transition"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          Review &amp; Confirm
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Please review the details before you confirm
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* LEFT — main card */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6">
                {/* Left column */}
                <div className="space-y-6">
                  {/* Sender */}
                  <div>
                    <p className="text-sm font-bold text-gray-800 mb-3">
                      Sender Details
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                        <User size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          John Rahman
                        </p>
                        <p className="text-xs text-gray-400">
                          john.rahman@email.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recipient */}
                  <div>
                    <p className="text-sm font-bold text-gray-800 mb-3">
                      Recipient Details
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                        <User size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {recipientName || 'Ahmed Khan'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {recipientEmail || 'ahmed.khan@email.com'}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5">
                        <Phone
                          size={13}
                          className="text-gray-400 shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-gray-500 w-24 shrink-0">
                          Mobile
                        </span>
                        <span className="text-xs font-medium text-gray-800 break-all">
                          {recipientMobile || '—'}
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Mail
                          size={13}
                          className="text-gray-400 shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-gray-500 w-24 shrink-0">
                          Email
                        </span>
                        <span className="text-xs font-medium text-gray-800 break-all">
                          {recipientEmail || '—'}
                        </span>
                      </div>
                      {rcCountry && (
                        <div className="flex items-start gap-2.5">
                          <MapPin
                            size={13}
                            className="text-gray-400 shrink-0 mt-0.5"
                          />
                          <span className="text-xs text-gray-500 w-24 shrink-0">
                            Country
                          </span>
                          <div className="flex items-center gap-1.5">
                            <FlagImg
                              flag={rcCountry.flag}
                              code={rcCountry.code}
                              size={16}
                            />
                            <span className="text-xs font-medium text-gray-800">
                              {recipientCountry}
                            </span>
                          </div>
                        </div>
                      )}
                      {recipientDocType && (
                        <div className="flex items-start gap-2.5">
                          <Shield
                            size={13}
                            className="text-gray-400 shrink-0 mt-0.5"
                          />
                          <span className="text-xs text-gray-500 w-24 shrink-0">
                            Document
                          </span>
                          <span className="text-xs font-medium text-gray-800">
                            {DOC_TYPES.find(d => d.value === recipientDocType)
                              ?.label || recipientDocType}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Receiving Details */}
                  <div>
                    <p className="text-sm font-bold text-gray-800 mb-3">
                      Receiving Details
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5">
                        <Landmark
                          size={13}
                          className="text-gray-400 shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-gray-500 w-24 shrink-0">
                          Bank Name :
                        </span>
                        <span className="text-xs font-semibold text-gray-800">
                          {bankName || 'Brac Bank PLC'}
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <User
                          size={13}
                          className="text-gray-400 shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-gray-500 w-24 shrink-0">
                          Account Name :
                        </span>
                        <span className="text-xs font-semibold text-gray-800">
                          {accountName || recipientName || 'Ahmed Khan'}
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Hash
                          size={13}
                          className="text-gray-400 shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-gray-500 w-24 shrink-0">
                          Account Number:
                        </span>
                        <span className="text-xs font-semibold text-gray-800 break-all">
                          {accountNumber || '1234567890123'}
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Hash
                          size={13}
                          className="text-gray-400 shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-gray-500 w-24 shrink-0">
                          Branch Name:
                        </span>
                        <span className="text-xs font-semibold text-gray-800 break-all">
                          {ibanRouting || 'Uttara Branch'}
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Hash
                          size={13}
                          className="text-gray-400 shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-gray-500 w-24 shrink-0">
                          IBAN / Routing :
                        </span>
                        <span className="text-xs font-semibold text-gray-800 break-all">
                          {ibanRouting || '1234567890123'}
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Hash
                          size={13}
                          className="text-gray-400 shrink-0 mt-0.5"
                        />
                        <span className="text-xs text-gray-500 w-24 shrink-0">
                          SWIFT Code :
                        </span>
                        <span className="text-xs font-semibold text-gray-800 break-all">
                          {swiftCode || '1234567890123'}
                        </span>
                      </div>
                      {receivingDocType && (
                        <div className="flex items-start gap-2.5">
                          <Shield
                            size={13}
                            className="text-gray-400 shrink-0 mt-0.5"
                          />
                          <span className="text-xs text-gray-500 w-24 shrink-0">
                            Document
                          </span>
                          <span className="text-xs font-semibold text-gray-800">
                            {DOC_TYPES.find(d => d.value === receivingDocType)
                              ?.label || receivingDocType}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right column — Transfer Details */}
                <div>
                  <p className="text-sm font-bold text-gray-800 mb-3">
                    Transfer Details
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <ArrowUpRight size={14} className="text-green-600" />
                      </div>
                      <span className="text-sm text-gray-500 flex-1 min-w-0">
                        You send
                      </span>
                      <span className="text-sm font-semibold text-gray-800 text-right">
                        ${formatCurrency(parseFloat(fromAmount || '0'))}{' '}
                        {fromCurrency}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <ArrowDownLeft size={14} className="text-green-600" />
                      </div>
                      <span className="text-sm text-gray-500 flex-1 min-w-0">
                        Recipient gets
                      </span>
                      <span className="text-sm font-semibold text-gray-800 text-right">
                        {toAmount} {toCurrency}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <ArrowLeftRight size={14} className="text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-500 flex-1 min-w-0">
                        Exchange rate
                      </span>
                      <span className="text-xs font-semibold text-gray-800 text-right">
                        1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                        <Tag size={14} className="text-yellow-600" />
                      </div>
                      <span className="text-sm text-gray-500 flex-1 min-w-0">
                        Transfer fee
                      </span>
                      <span className="text-sm font-semibold text-gray-800 text-right">
                        ${fee.toFixed(2)} USD
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                        <Clock size={14} className="text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-500 flex-1 min-w-0">
                        Delivery time
                      </span>
                      <span className="text-sm font-semibold text-gray-800 text-right">
                        1–2 business days
                      </span>
                    </div>

                    {/* ── মোবাইলে Transfer Summary data এখানে দেখাবে ── */}
                    <div className="lg:hidden mt-2 pt-3 border-t border-gray-100 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <Tag size={14} className="text-gray-500" />
                        </div>
                        <span className="text-sm text-gray-500 flex-1 min-w-0">
                          ACH fee
                        </span>
                        <span className="text-sm font-semibold text-gray-800 text-right">
                          ${fee.toFixed(2)} USD
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <Tag size={14} className="text-gray-500" />
                        </div>
                        <span className="text-sm text-gray-500 flex-1 min-w-0">
                          Our fee
                        </span>
                        <span className="text-sm font-semibold text-gray-800 text-right">
                          ${fee.toFixed(2)} USD
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-sm font-bold text-gray-800">
                          Total to pay
                        </span>
                        <span className="text-lg font-bold text-green-700">
                          ${formatCurrency(total)} {fromCurrency}
                        </span>
                      </div>
                      {/* Recipient gets box */}
                      <div className="bg-blue-50 rounded-xl p-3">
                        <p className="text-xs text-gray-500 mb-0.5">
                          Recipient gets
                        </p>
                        <div className="flex items-center gap-2">
                          {toCurr && (
                            <FlagImg
                              flag={toCurr.flag}
                              code={toCurr.code}
                              size={20}
                            />
                          )}
                          {loadingRate ? (
                            <div className="flex items-center gap-1">
                              <RefreshCw
                                size={14}
                                className="animate-spin text-blue-400"
                              />
                              <span className="text-gray-400 text-sm">
                                Updating…
                              </span>
                            </div>
                          ) : (
                            <p className="text-xl font-bold text-blue-600">
                              {toAmount} {toCurrency}
                            </p>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          {fromCurr && (
                            <FlagImg
                              flag={fromCurr.flag}
                              code={fromCurr.code}
                              size={14}
                            />
                          )}
                          1 {fromCurrency} ={' '}
                          <span className="font-medium ml-0.5">
                            {rate.toFixed(4)} {toCurrency}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          Delivery: 1–2 business days
                        </p>
                      </div>
                      {/* Trust badges */}
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        {[
                          { icon: '🛡️', text: 'No hidden fees' },
                          { icon: '🔄', text: 'Guaranteed rate' },
                          { icon: '🔒', text: 'Secure & encrypted' },
                        ].map(item => (
                          <div
                            key={item.text}
                            className="flex flex-col items-center text-center gap-0.5"
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-xs text-gray-500">
                              {item.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <Shield size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">
                By continuing, you agree to our{' '}
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                  Privacy Policy
                </span>
                .
              </p>
            </div>

            {/* Confirm & Pay */}
            <button
              onClick={onConfirm}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 active:bg-blue-800 transition text-base shadow-lg"
            >
              <Shield size={18} />
              Confirm &amp; Pay
              <ChevronRight size={18} />
            </button>

            {/* Security badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Shield size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">
                    256-bit SSL Secure
                  </p>
                  <p className="text-xs text-gray-400">
                    Your data is encrypted and safe
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">PCI</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">
                    PCI DSS Compliant
                  </p>
                  <p className="text-xs text-gray-400">
                    Secure payment processing
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <User size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">
                    Trusted by Millions
                  </p>
                  <p className="text-xs text-gray-400">
                    Join millions of satisfied users
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Transfer Summary: শুধু lg+ screen-এ দেখাবে */}
          <div className="hidden lg:block lg:col-span-2">
            <TransferSummary
              fromAmount={fromAmount}
              fromCurrency={fromCurrency}
              toAmount={toAmount}
              toCurrency={toCurrency}
              rate={rate}
              fee={fee}
              total={total}
              loadingRate={loadingRate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAYMENT SUCCESS PAGE — কাজ-২: Screenshot হুবহু, dark green
// ─────────────────────────────────────────────────────────────
function PaymentSuccessPage({
  txId,
  recipientName,
  toAmount,
  toCurrency,
  fromAmount,
  fromCurrency,
  rate,
  fee,
  total,
  paymentMethod,
  loadingRate,
}: {
  txId: string;
  recipientName: string;
  toAmount: string;
  toCurrency: string;
  fromAmount: string;
  fromCurrency: string;
  rate: number;
  fee: number;
  total: number;
  paymentMethod: string;
  loadingRate: boolean;
}) {
  const fromCurr = CURRENCIES.find(c => c.code === fromCurrency);
  const toCurr = CURRENCIES.find(c => c.code === toCurrency);
  const paymentMethodLabel =
    paymentMethod === 'bank'
      ? 'Bank Transfer (ACH)'
      : paymentMethod === 'card'
        ? 'Debit / Credit Card'
        : paymentMethod === 'apple'
          ? 'Apple Pay'
          : paymentMethod === 'google'
            ? 'Google Pay'
            : 'Wallet';

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-[#f0f4ff] p-3 sm:p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6">
          {/* LEFT — main success card */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Hero section */}
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-b from-[#e8f5e9] to-white pt-10 pb-6 px-6 flex flex-col items-center text-center">
                {/* GIF placeholder — পরে এখানে GIF বসাবে */}
                <div className="relative mb-4">
                  {/* Confetti placeholder area */}
                  <div
                    className="relative flex items-center justify-center"
                    style={{ width: 200, height: 200 }}
                  >
                    {/* Fake confetti dots */}
                    {[
                      { x: 15, y: 30, color: '#ef4444', size: 10, rotate: 20 },
                      { x: 160, y: 20, color: '#3b82f6', size: 8, rotate: -15 },
                      { x: 5, y: 90, color: '#f59e0b', size: 12, rotate: 45 },
                      { x: 170, y: 80, color: '#8b5cf6', size: 9, rotate: -30 },
                      { x: 30, y: 155, color: '#10b981', size: 11, rotate: 60 },
                      {
                        x: 155,
                        y: 150,
                        color: '#f97316',
                        size: 8,
                        rotate: -45,
                      },
                      { x: 85, y: 5, color: '#ec4899', size: 10, rotate: 15 },
                      { x: 90, y: 185, color: '#06b6d4', size: 9, rotate: -20 },
                      { x: 45, y: 60, color: '#84cc16', size: 7, rotate: 30 },
                      { x: 145, y: 55, color: '#f43f5e', size: 8, rotate: -60 },
                      { x: 40, y: 130, color: '#a78bfa', size: 11, rotate: 50 },
                      {
                        x: 148,
                        y: 125,
                        color: '#fbbf24',
                        size: 7,
                        rotate: -25,
                      },
                    ].map((c, i) => (
                      <div
                        key={i}
                        className="absolute rounded-sm"
                        style={{
                          left: c.x,
                          top: c.y,
                          width: c.size,
                          height: c.size * 0.6,
                          backgroundColor: c.color,
                          transform: `rotate(${c.rotate}deg)`,
                        }}
                      />
                    ))}
                    {/* Sparkle stars */}
                    {[
                      { x: 55, y: 18 },
                      { x: 130, y: 10 },
                      { x: 10, y: 110 },
                      { x: 178, y: 105 },
                      { x: 60, y: 170 },
                      { x: 135, y: 168 },
                    ].map((s, i) => (
                      <div
                        key={`star-${i}`}
                        className="absolute text-yellow-400 font-bold"
                        style={{ left: s.x, top: s.y, fontSize: 14 }}
                      >
                        ✦
                      </div>
                    ))}
                    {/* Green glow circle + checkmark */}
                    <div className="relative z-10">
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
                        style={{ backgroundColor: '#16a34a' }}
                      >
                        <CheckCircle
                          size={48}
                          className="text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                      {/* Glow ring */}
                      <div
                        className="absolute inset-0 rounded-full opacity-30 blur-lg"
                        style={{
                          backgroundColor: '#16a34a',
                          transform: 'scale(1.4)',
                        }}
                      />
                    </div>
                  </div>
                  {/* NOTE for developer */}
                  <p className="text-xs text-gray-400 mt-1">
                    {/* Replace the above div with: <img src="/success.gif" alt="" className="w-[200px] h-[200px]" /> */}
                  </p>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                  Payment <span style={{ color: '#16a34a' }}>Successful!</span>
                </h2>
                <p className="text-sm text-gray-500">
                  Your transfer has been completed successfully.
                </p>
              </div>

              {/* Info cards */}
              <div className="px-4 sm:px-6 pb-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    {
                      icon: (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                          <Send size={18} className="text-blue-500" />
                        </div>
                      ),
                      label: 'Transfer ID',
                      value: txId,
                      valueClass: 'text-blue-600 font-bold text-sm',
                    },
                    {
                      icon: (
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                          <Clock size={18} style={{ color: '#16a34a' }} />
                        </div>
                      ),
                      label: 'Date & Time',
                      value: `${dateStr}`,
                      value2: timeStr,
                      valueClass: 'text-gray-800 font-semibold text-sm',
                    },
                    {
                      icon: (
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                          <User size={18} className="text-purple-500" />
                        </div>
                      ),
                      label: 'Recipient',
                      value: recipientName || 'Ahmed Khan',
                      value2: `(${toAmount} ${toCurrency})`,
                      valueClass: 'text-gray-800 font-semibold text-sm',
                    },
                    {
                      icon: (
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                          <Tag size={18} className="text-orange-500" />
                        </div>
                      ),
                      label: 'Amount Paid',
                      value: `$${total.toFixed(2)}`,
                      valueClass: 'text-gray-800 font-bold text-sm',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="text-center p-3 bg-gray-50 rounded-2xl border border-gray-100"
                    >
                      {item.icon}
                      <p className="text-xs text-gray-400 mb-0.5">
                        {item.label}
                      </p>
                      <p className={item.valueClass}>{item.value}</p>
                      {item.value2 && (
                        <p className="text-xs text-gray-400">{item.value2}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Money on its way */}
                <div
                  className="flex items-center gap-3 p-4 rounded-2xl mb-5"
                  style={{
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#16a34a' }}
                  >
                    <CheckCircle size={18} className="text-white" />
                  </div>
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: '#14532d' }}
                    >
                      Your money is on its way!
                    </p>
                    <p className="text-xs" style={{ color: '#16a34a' }}>
                      We'll notify you when the transfer is delivered.
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="flex-1 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition hover:opacity-90"
                    style={{ backgroundColor: '#14532d' }}
                  >
                    <Send size={15} /> Track Your Transfer
                  </button>
                  <button className="flex-1 border-2 border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                    <Download size={15} /> Download Receipt
                  </button>
                  <button className="sm:w-auto flex-1 border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                    <Share2 size={15} /> Share Receipt
                  </button>
                </div>
              </div>
            </div>

            {/* Secure & Protected banner */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#14532d' }}
                  >
                    <Shield size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      Secure &amp; Protected Transaction
                    </p>
                    <p className="text-xs text-gray-500">
                      Your payment is encrypted and protected by bank-level
                      security.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-around sm:justify-end sm:gap-5 flex-wrap gap-3">
                  {[
                    { icon: '🔒', label: '256-bit\nSSL Secure' },
                    { icon: '📋', label: 'PCI DSS\nCompliant' },
                    { icon: '👥', label: 'Trusted by\nMillions' },
                  ].map(b => (
                    <div key={b.label} className="text-center">
                      <span className="text-2xl">{b.icon}</span>
                      <p className="text-xs text-gray-500 mt-0.5 whitespace-pre-line leading-tight">
                        {b.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Need help */}
            <div className="text-center py-2">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Need help?
              </p>
              <p className="text-xs text-gray-500 mb-2">
                Our support team is here for you.
              </p>
              <button
                className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
                style={{ color: '#16a34a' }}
              >
                <HeadphonesIcon size={16} /> Contact Support
              </button>
            </div>
          </div>

          {/* RIGHT — Transfer Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm p-5 sm:p-6 sticky top-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 text-lg">
                  Transfer Summary
                </h3>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#16a34a' }}
                >
                  <CheckCircle size={18} className="text-white" />
                </div>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  {
                    label: 'You sent',
                    value: `$${formatCurrency(parseFloat(fromAmount || '0'))} ${fromCurrency}`,
                    valueClass: 'font-semibold text-gray-800',
                  },
                  {
                    label: 'Recipient gets',
                    value: `${toAmount} ${toCurrency}`,
                    valueClass: 'font-semibold text-gray-800',
                  },
                  {
                    label: 'Exchange rate',
                    value: `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`,
                    valueClass: 'font-semibold text-gray-800 text-xs',
                  },
                  {
                    label: 'Transfer fee',
                    value: `$${fee.toFixed(2)} USD`,
                    valueClass: 'font-semibold text-gray-800',
                  },
                  {
                    label: 'Payment method',
                    value: paymentMethodLabel,
                    icon: (
                      <Landmark size={14} className="text-gray-500 shrink-0" />
                    ),
                    valueClass: 'font-semibold text-gray-800 text-xs',
                  },
                  {
                    label: 'Payment status',
                    value: 'Completed',
                    chip: true,
                    valueClass: '',
                  },
                  {
                    label: 'Delivery time',
                    value: '1–2 business days',
                    valueClass: 'font-semibold text-gray-800',
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-sm text-gray-500 shrink-0">
                      {row.label}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {row.icon}
                      {row.chip ? (
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: '#dcfce7',
                            color: '#15803d',
                          }}
                        >
                          Completed
                        </span>
                      ) : (
                        <span className={`text-right ${row.valueClass}`}>
                          {row.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="flex items-center justify-between pt-4 border-t-2"
                style={{ borderColor: '#e5e7eb' }}
              >
                <span className="font-bold text-gray-900 text-base">
                  Total paid
                </span>
                <span
                  className="font-extrabold text-xl"
                  style={{ color: '#1d4ed8' }}
                >
                  ${formatCurrency(total)} USD
                </span>
              </div>

              {/* Estimated delivery progress */}
              <div
                className="mt-4 p-4 rounded-2xl"
                style={{
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} style={{ color: '#2563eb' }} />
                  <p className="text-sm font-semibold text-gray-800">
                    Estimated Delivery
                  </p>
                </div>
                <p
                  className="text-sm font-bold mb-3"
                  style={{ color: '#16a34a' }}
                >
                  Arrives in 1–2 business days
                </p>
                {/* Progress steps */}
                <div className="flex items-center gap-1">
                  {['Payment', 'Processing', 'Delivered'].map((label, i) => (
                    <React.Fragment key={label}>
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#16a34a' }}
                        >
                          <CheckCircle size={14} className="text-white" />
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {label}
                        </span>
                      </div>
                      {i < 2 && (
                        <div
                          className="flex-1 h-0.5 mb-4"
                          style={{ backgroundColor: '#16a34a' }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN — SendMoneyPage
// ─────────────────────────────────────────────────────────────
export default function SendMoneyPage() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loadingRate, setLoadingRate] = useState(false);
  const [rateError, setRateError] = useState(false);
  const [unlockedUpTo, setUnlockedUpTo] = useState<number>(1);
  const [step, setStep] = useState<Step>(1);

  const [fromAmount, setFromAmount] = useState('');
  const [toAmountInput, setToAmountInput] = useState('');
  const [lastEdited, setLastEdited] = useState<'from' | 'to'>('from');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const [recipientName, setRecipientName] = useState('');
  const [recipientMobile, setRecipientMobile] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientCountry, setRecipientCountry] = useState('Bangladesh');
  const [saveRecipient, setSaveRecipient] = useState(true);
  const [step2DocType, setStep2DocType] = useState('');
  const [step2Docs, setStep2Docs] = useState<UploadedDoc[]>([]);

  const [bankName, setBankName] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ibanRouting, setIbanRouting] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [bankDocType, setBankDocType] = useState('');

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(null);
  const [paymentMethod, setPaymentMethod] = useState('bank');

  const rate = rates[toCurrency] ?? 0;

  const toAmount = (() => {
    if (rate <= 0) return '—';
    if (lastEdited === 'from')
      return (Number(fromAmount || 0) * rate).toFixed(2);
    return toAmountInput || '—';
  })();

  const displayFromAmount = (() => {
    if (lastEdited === 'to' && rate > 0 && toAmountInput) {
      return (Number(toAmountInput) / rate).toFixed(2);
    }
    return fromAmount;
  })();

  const fee = 2.99;
  const total = parseFloat(displayFromAmount || '0') + fee;

  const txId = useRef(
    '#TSM' + Math.floor(10000000 + Math.random() * 90000000),
  ).current;

  const fetchRates = useCallback(async (base: string) => {
    try {
      setLoadingRate(true);
      setRateError(false);
      const res = await fetch(`/api/exchange-rate?base=${base}`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setRates(data.rates || {});
    } catch {
      setRateError(true);
    } finally {
      setLoadingRate(false);
    }
  }, []);

  useEffect(() => {
    fetchRates(fromCurrency);
  }, [fromCurrency, fetchRates]);

  useEffect(() => {
    const effectiveFrom =
      lastEdited === 'to' && rate > 0 && toAmountInput
        ? Number(toAmountInput) / rate
        : Number(fromAmount);
    if (unlockedUpTo === 1 && effectiveFrom > 0 && rate > 0) {
      const t = setTimeout(() => {
        setUnlockedUpTo(2);
        setStep(2);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [fromAmount, toAmountInput, lastEdited, unlockedUpTo, rate]);

  useEffect(() => {
    if (
      unlockedUpTo === 2 &&
      recipientName.length >= 2 &&
      recipientMobile.length >= 6 &&
      recipientCountry
    ) {
      const t = setTimeout(() => {
        setUnlockedUpTo(3);
        setStep(3);
      }, 500);
      return () => clearTimeout(t);
    }
  }, [unlockedUpTo, recipientName, recipientMobile, recipientCountry]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setLastEdited('from');
    setFromAmount('');
    setToAmountInput('');
  };

  const fromCurr = CURRENCIES.find(c => c.code === fromCurrency);
  const toCurr = CURRENCIES.find(c => c.code === toCurrency);

  // Step 5: Review
  if (step === 5) {
    return (
      <FinalReviewPage
        fromAmount={displayFromAmount}
        fromCurrency={fromCurrency}
        toAmount={toAmount}
        toCurrency={toCurrency}
        rate={rate}
        fee={fee}
        total={total}
        recipientName={recipientName}
        recipientMobile={recipientMobile}
        recipientEmail={recipientEmail}
        recipientCountry={recipientCountry}
        deliveryMethod={deliveryMethod}
        paymentMethod={paymentMethod}
        loadingRate={loadingRate}
        onConfirm={() => setStep(6)}
        onBack={() => setStep(4)}
        recipientDocType={step2DocType}
        bankName={bankName}
        accountName={accountHolder}
        accountNumber={accountNumber}
        ibanRouting={ibanRouting}
        swiftCode={swiftCode}
        receivingDocType={bankDocType}
      />
    );
  }

  // Step 6: Success — নতুন PaymentSuccessPage
  if (step === 6) {
    return (
      <PaymentSuccessPage
        txId={txId}
        recipientName={recipientName}
        toAmount={toAmount}
        toCurrency={toCurrency}
        fromAmount={displayFromAmount}
        fromCurrency={fromCurrency}
        rate={rate}
        fee={fee}
        total={total}
        paymentMethod={paymentMethod}
        loadingRate={loadingRate}
      />
    );
  }

  // Steps 1–4
  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">
      <div className="w-full mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
            <Send size={16} className="text-green-800" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Send Money
            </h2>
            <p className="text-xs text-gray-400">
              Fast, Secure &amp; Reliable Money Transfer
            </p>
          </div>
        </div>

        <StepBar current={Math.min(step, 5) as Step} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 space-y-6 shadow-sm">
              {/* STEP 1 */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step >= 1 ? 'bg-green-900 text-green-400' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {step > 1 ? <CheckCircle size={14} /> : '1'}
                  </div>
                  <h3 className="font-semibold text-gray-800">Amount</h3>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1.5 block">
                      You Send
                    </label>
                    <div className="flex items-stretch border border-gray-200 rounded-xl focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10 transition z-10">
                      <input
                        type="number"
                        value={
                          lastEdited === 'from'
                            ? fromAmount
                            : rate > 0 && toAmountInput
                              ? (Number(toAmountInput) / rate).toFixed(2)
                              : fromAmount
                        }
                        onChange={e => {
                          setFromAmount(e.target.value);
                          setLastEdited('from');
                        }}
                        placeholder="Enter amount"
                        className="flex-1 px-3 sm:px-4 py-3 text-base sm:text-lg font-semibold outline-none bg-transparent min-w-0"
                      />
                      <CurrencyDropDown
                        selected={fromCurrency}
                        onChange={setFromCurrency}
                      />
                    </div>
                  </div>

                  <div className="flex sm:items-end justify-center sm:pb-1">
                    <button
                      onClick={swapCurrencies}
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-green-900 hover:border-green-900 hover:text-white transition text-gray-500"
                    >
                      <ArrowLeftRight size={16} />
                    </button>
                  </div>

                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1.5 block">
                      Recipient Gets
                    </label>
                    <div className="flex items-stretch border border-gray-200 rounded-xl focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10 transition z-10">
                      {loadingRate ? (
                        <div className="flex-1 px-3 sm:px-4 py-3 bg-gray-50 flex items-center rounded-l-xl">
                          <RefreshCw
                            size={14}
                            className="animate-spin text-gray-400"
                          />
                        </div>
                      ) : (
                        <input
                          type="number"
                          value={
                            lastEdited === 'to'
                              ? toAmountInput
                              : rate > 0 && fromAmount
                                ? (Number(fromAmount) * rate).toFixed(2)
                                : ''
                          }
                          onChange={e => {
                            setToAmountInput(e.target.value);
                            setLastEdited('to');
                          }}
                          placeholder="0.00"
                          className="flex-1 px-3 sm:px-4 py-3 text-base sm:text-lg font-semibold outline-none bg-transparent min-w-0"
                        />
                      )}
                      <CurrencyDropDown
                        selected={toCurrency}
                        onChange={setToCurrency}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-3 sm:px-4 py-2.5 bg-green-100 rounded-xl">
                  <span className="text-xs text-gray-600 flex items-center gap-1.5">
                    {fromCurr && (
                      <FlagImg
                        flag={fromCurr.flag}
                        code={fromCurr.code}
                        size={14}
                      />
                    )}
                    {loadingRate ? (
                      <span className="flex items-center gap-1 text-gray-400">
                        <RefreshCw size={11} className="animate-spin" />{' '}
                        Updating rate…
                      </span>
                    ) : rateError ? (
                      <button
                        onClick={() => fetchRates(fromCurrency)}
                        className="text-red-500 underline flex items-center gap-1"
                      >
                        <RefreshCw size={11} /> Retry
                      </button>
                    ) : (
                      <>
                        1 {fromCurrency} ={' '}
                        {toCurr && (
                          <FlagImg
                            flag={toCurr.flag}
                            code={toCurr.code}
                            size={14}
                            className="ml-1"
                          />
                        )}
                        <span className="font-semibold ml-0.5">
                          {rate.toFixed(4)} {toCurrency}
                        </span>
                      </>
                    )}
                  </span>
                  <span className="text-xs text-green-600 font-medium">
                    Fee: ${fee} USD
                  </span>
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle size={11} /> No hidden fees
                  </span>
                </div>
              </div>

              {/* STEP 2 */}
              <div
                className={
                  unlockedUpTo < 2 ? 'opacity-40 pointer-events-none' : ''
                }
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${unlockedUpTo >= 2 ? 'bg-green-900 text-green-400' : 'bg-gray-200 text-gray-500'}`}
                  >
                    {step > 2 ? <CheckCircle size={14} /> : '2'}
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Recipient Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User
                        size={14}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                      <input
                        value={recipientName}
                        onChange={e => setRecipientName(e.target.value)}
                        placeholder="Recipient full name"
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Mobile Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone
                        size={14}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                      <input
                        value={recipientMobile}
                        onChange={e => setRecipientMobile(e.target.value)}
                        placeholder="+880 1812-345678"
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Email (Optional)
                    </label>
                    <div className="relative">
                      <Mail
                        size={14}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={e => setRecipientEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Country <span className="text-red-400">*</span>
                    </label>
                    <CountrySelect
                      value={recipientCountry}
                      onChange={setRecipientCountry}
                    />
                  </div>
                  <DocumentUpload
                    docType={step2DocType}
                    setDocType={setStep2DocType}
                    docs={step2Docs}
                    setDocs={setStep2Docs}
                  />
                </div>
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveRecipient}
                    onChange={e => setSaveRecipient(e.target.checked)}
                    className="accent-green-700 w-4 h-4 rounded"
                  />
                  <span className="text-xs text-gray-600">
                    Save this recipient for future transfers
                  </span>
                </label>
              </div>

              {/* STEP 3 */}
              <div
                className={
                  unlockedUpTo < 3 ? 'opacity-40 pointer-events-none' : ''
                }
              >
                <DeliveryMethodSection
                  deliveryMethod={deliveryMethod}
                  setDeliveryMethod={setDeliveryMethod}
                  bankName={bankName}
                  setBankName={setBankName}
                  accountHolder={accountHolder}
                  setAccountHolder={setAccountHolder}
                  accountNumber={accountNumber}
                  setAccountNumber={setAccountNumber}
                  ibanRouting={ibanRouting}
                  setIbanRouting={setIbanRouting}
                  swiftCode={swiftCode}
                  setSwiftCode={setSwiftCode}
                  onComplete={() => {
                    if (unlockedUpTo < 4) {
                      setUnlockedUpTo(4);
                      setStep(4);
                    }
                  }}
                />
              </div>

              {/* STEP 4 */}
              <div
                className={
                  unlockedUpTo < 4 ? 'opacity-40 pointer-events-none' : ''
                }
              >
                <PaymentMethodSection
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  onComplete={() => {
                    if (unlockedUpTo < 5) {
                      setUnlockedUpTo(5);
                    }
                  }}
                />

                {unlockedUpTo >= 5 && step === 4 && (
                  <button
                    onClick={() => setStep(5)}
                    className="w-full py-3 bg-green-900 text-white rounded-xl font-semibold hover:bg-green-800 transition cursor-pointer mt-3"
                  >
                    Continue to Review
                  </button>
                )}
              </div>

              {unlockedUpTo < 5 && (
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <Shield size={15} className="text-gray-300 shrink-0" />
                  <p className="text-xs text-gray-400">
                    Complete all steps above to proceed to final review
                  </p>
                </div>
              )}
            </div>
          </div>

          <TransferSummary
            fromAmount={displayFromAmount}
            fromCurrency={fromCurrency}
            toAmount={toAmount}
            toCurrency={toCurrency}
            rate={rate}
            fee={fee}
            total={total}
            loadingRate={loadingRate}
          />
        </div>
      </div>
    </div>
  );
}