// "use client";

// import React, { useState } from "react";
// import {
//   Send,
//   ArrowLeftRight,
//   Shield,
//   CheckCircle,
//   Download,
//   Share2,
//   ChevronDown,
//   Building2,
//   CreditCard,
//   Smartphone,
// } from "lucide-react";
// import { currencies, exchangeRates, formatCurrency } from "@/lib/data";

// type Step = 1 | 2 | 3 | 4;

// export default function SendMoneyPage() {
//   const [step, setStep] = useState<Step>(1);
//   const [fromAmount, setFromAmount] = useState("1000.00");
//   const [fromCurrency, setFromCurrency] = useState("USD");
//   const [toCurrency, setToCurrency] = useState("EUR");
//   const [recipientName, setRecipientName] = useState("");
//   const [recipientEmail, setRecipientEmail] = useState("");
//   const [bankCountry, setBankCountry] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("bank");
//   const [paymentDesc, setPaymentDesc] = useState("");
//   const [fromDropdown, setFromDropdown] = useState(false);
//   const [toDropdown, setToDropdown] = useState(false);

//   const rateKey = `${fromCurrency}-${toCurrency}`;
//   const rate = exchangeRates[rateKey] || 1;
//   const toAmount = (parseFloat(fromAmount || "0") * rate).toFixed(2);
//   const fee = 2.99;
//   const total = parseFloat(fromAmount || "0") + fee;

//   const swapCurrencies = () => {
//     setFromCurrency(toCurrency);
//     setToCurrency(fromCurrency);
//   };

//   const txId = "#TSM" + Math.floor(10000000 + Math.random() * 90000000);

//   const paymentMethods = [
//     {
//       id: "bank",
//       label: "Bank Transfer (ACH)",
//       icon: Building2,
//       fee: "No extra fees",
//       recommended: true,
//     },
//     {
//       id: "card",
//       label: "Debit / Credit Card",
//       icon: CreditCard,
//       fee: "Fee: $3.49 USD",
//       recommended: false,
//     },
//     {
//       id: "apple",
//       label: "Apple Pay",
//       icon: Smartphone,
//       fee: "Fee: $2.99 USD",
//       recommended: false,
//     },
//     {
//       id: "google",
//       label: "Google Pay",
//       icon: Smartphone,
//       fee: "Fee: $2.99 USD",
//       recommended: false,
//     },
//   ];

//   if (step === 4) {
//     return (
//       <div className="page-enter p-4 lg:p-6">
//         <div className="w-full mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//             <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
//               <div className="bg-linear-to-b from-green-50 to-white px-6 py-10 text-center">
//                 <div className="relative inline-block">
//                   <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto">
//                     <CheckCircle size={40} className="text-white" />
//                   </div>
//                   {["top-0 left-4", "top-2 right-4", "-top-2 left-12", "top-0 right-12"].map((pos, i) => (
//                     <div
//                       key={i}
//                       className={`absolute w-3 h-3 rounded-sm confetti-piece`}
//                       style={{
//                         top: i % 2 === 0 ? "-8px" : "0",
//                         left: i < 2 ? "10px" : "auto",
//                         right: i >= 2 ? "10px" : "auto",
//                         background: ["#7ffe4a", "#fbbf24", "#60a5fa", "#f87171"][i],
//                         animationDelay: `${i * 0.1}s`,
//                       }}
//                     />
//                   ))}
//                 </div>
//                 <h2
//                   className="text-2xl font-bold mt-6 text-gray-800"
//                   style={{ fontFamily: "Syne, sans-serif" }}
//                 >
//                   Payment{" "}
//                   <span className="text-green-600">Successful!</span>
//                 </h2>
//                 <p className="text-gray-500 text-sm mt-2">
//                   Your transfer has been completed successfully.
//                 </p>
//               </div>

//               <div className="px-6 py-4">
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                   {[
//                     { icon: Send, label: "Transfer ID", value: txId, blue: true },
//                     { icon: null, label: "Date & Time", value: "12 May 2025\n10:30 AM" },
//                     { icon: null, label: "Recipient", value: recipientName || "Ahmed Khan" },
//                     { icon: null, label: "Amount Paid", value: `$${total.toFixed(2)} USD` },
//                   ].map((item, i) => (
//                     <div key={i} className="text-center p-3 bg-gray-50 rounded-xl">
//                       <p className="text-xs text-gray-400">{item.label}</p>
//                       <p
//                         className={`text-sm font-semibold mt-1 whitespace-pre-line ${
//                           item.blue ? "text-blue-600" : "text-gray-800"
//                         }`}
//                       >
//                         {item.value}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-4 p-4 bg-green-50 rounded-xl flex items-center gap-3">
//                   <Shield size={20} className="text-green-600 shrink-0" />
//                   <div>
//                     <p className="font-semibold text-sm text-green-800">
//                       Your money is on its way!
//                     </p>
//                     <p className="text-xs text-green-600">
//                       We&apos;ll notify you when the transfer is delivered.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-4 flex gap-3">
//                   <button className="btn-primary flex-1 bg-[#0a2012] text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
//                     <Send size={15} /> Track Your Transfer
//                   </button>
//                   <button className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
//                     <Download size={15} /> Download Receipt
//                   </button>
//                   <button className="px-4 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
//                     <Share2 size={15} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <TransferSummary
//               fromAmount={fromAmount}
//               fromCurrency={fromCurrency}
//               toAmount={toAmount}
//               toCurrency={toCurrency}
//               rate={rate}
//               fee={fee}
//               total={total}
//               showDelivery
//               paymentMethod="Bank Transfer (ACH)"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="page-enter p-4 lg:p-6">
//       <div className="w-full mx-auto">
//         <div className="stagger-1 flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center">
//             <Send size={18} className="text-[#166534]" />
//           </div>
//           <div>
//             <h2
//               className="text-xl font-bold text-gray-800"
//               style={{ fontFamily: 'Syne, sans-serif' }}
//             >
//               Send Money
//             </h2>
//             <p className="text-xs text-gray-400">
//               Fast, Secure & Reliable Money Transfer
//             </p>
//           </div>
//         </div>

//         {step === 3 && (
//           <div className="stagger-2 flex items-center gap-2 mb-6">
//             {['Amount', 'Recipient', 'Payment'].map((s, i) => {
//               const n = i + 1;
//               const done = n < 3;
//               const active = n === 3;
//               return (
//                 <React.Fragment key={s}>
//                   <div className="flex items-center gap-2">
//                     <div
//                       className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
//                         ${done ? 'step-done' : active ? 'step-active' : 'step-pending'}`}
//                     >
//                       {done ? <CheckCircle size={16} /> : n}
//                     </div>
//                     <span
//                       className={`text-xs font-medium hidden sm:block ${
//                         active
//                           ? 'text-[#0a2012]'
//                           : done
//                             ? 'text-green-600'
//                             : 'text-gray-400'
//                       }`}
//                     >
//                       {s}
//                       {done && (
//                         <span className="block text-green-500">Completed</span>
//                       )}
//                       {active && (
//                         <span className="block text-[#166534]">
//                           In Progress
//                         </span>
//                       )}
//                     </span>
//                   </div>
//                   {i < 2 && (
//                     <div
//                       className={`flex-1 h-0.5 rounded ${
//                         done ? 'bg-green-500' : 'bg-gray-200'
//                       }`}
//                     />
//                   )}
//                 </React.Fragment>
//               );
//             })}
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//           <div className="lg:col-span-3 space-y-4">
//             {(step === 1 || step === 2) && (
//               <div className="stagger-2 bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-7 h-7 rounded-full bg-[#0a2012] text-[#7ffe4a] flex items-center justify-center text-xs font-bold">
//                       1
//                     </div>
//                     <h3 className="font-semibold text-gray-800">Amount</h3>
//                   </div>
//                   <div className="flex items-stretch gap-3 md:flex-row flex-col">
//                     <div className="flex-1">
//                       <label className="text-xs text-gray-500 mb-1.5 block">
//                         You Send
//                       </label>
//                       <div className="flex items-stretch border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#166534] focus-within:ring-2 focus-within:ring-[#166534]/10 transition">
//                         <input
//                           type="number"
//                           value={fromAmount}
//                           onChange={e => setFromAmount(e.target.value)}
//                           className="flex-1 px-4 py-3 text-lg font-semibold outline-none bg-transparent"
//                         />
//                         <div className="relative">
//                           <button
//                             onClick={() => setFromDropdown(!fromDropdown)}
//                             className="h-full px-3 bg-gray-50 border-l border-gray-200 flex items-center gap-1.5 hover:bg-gray-100 transition"
//                           >
//                             <span className="text-base">
//                               {
//                                 currencies.find(c => c.code === fromCurrency)
//                                   ?.flag
//                               }
//                             </span>
//                             <span className="text-sm font-semibold text-gray-700">
//                               {fromCurrency}
//                             </span>
//                             <ChevronDown size={13} className="text-gray-400" />
//                           </button>
//                           {fromDropdown && (
//                             <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-48 overflow-y-auto">
//                               {currencies.map(c => (
//                                 <button
//                                   key={c.code}
//                                   onClick={() => {
//                                     setFromCurrency(c.code);
//                                     setFromDropdown(false);
//                                   }}
//                                   className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 transition"
//                                 >
//                                   <span>{c.flag}</span>
//                                   <span className="font-medium">{c.code}</span>
//                                   <span className="text-gray-400 text-xs">
//                                     {c.name}
//                                   </span>
//                                 </button>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-end pb-1">
//                       <button
//                         onClick={swapCurrencies}
//                         className="w-87.5 md:w-10 xl:w-10 2xl:xl:w-10 lg:xl:w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#0a2012] hover:border-[#0a2012] hover:text-white transition text-gray-500"
//                       >
//                         <ArrowLeftRight size={16} />
//                       </button>
//                     </div>

//                     <div className="flex-1">
//                       <label className="text-xs text-gray-500 mb-1.5 block">
//                         Recipient Gets
//                       </label>
//                       <div className="flex items-stretch border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#166534] focus-within:ring-2 focus-within:ring-[#166634]/10 transition">
//                         <input
//                           readOnly
//                           value={toAmount}
//                           className="flex-1 px-4 py-3 text-lg font-semibold outline-none bg-gray-50 cursor-default"
//                         />
//                         <div className="relative">
//                           <button
//                             onClick={() => setToDropdown(!toDropdown)}
//                             className="h-full px-3 bg-gray-50 border-l border-gray-200 flex items-center gap-1.5 hover:bg-gray-100 transition"
//                           >
//                             <span className="text-base">
//                               {
//                                 currencies.find(c => c.code === toCurrency)
//                                   ?.flag
//                               }
//                             </span>
//                             <span className="text-sm font-semibold text-gray-700">
//                               {toCurrency}
//                             </span>
//                             <ChevronDown size={13} className="text-gray-400" />
//                           </button>
//                           {toDropdown && (
//                             <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-48 overflow-y-auto">
//                               {currencies.map(c => (
//                                 <button
//                                   key={c.code}
//                                   onClick={() => {
//                                     setToCurrency(c.code);
//                                     setToDropdown(false);
//                                   }}
//                                   className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 transition"
//                                 >
//                                   <span>{c.flag}</span>
//                                   <span className="font-medium">{c.code}</span>
//                                   <span className="text-gray-400 text-xs">
//                                     {c.name}
//                                   </span>
//                                 </button>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-3 flex items-center justify-between px-4 py-2.5 bg-green-50 rounded-xl">
//                     <span className="text-xs text-gray-600 flex items-center gap-1.5">
//                       <TrendingUpIcon />1 {fromCurrency} = {rate.toFixed(4)}{' '}
//                       {toCurrency}
//                     </span>
//                     <span className="text-xs text-green-600 font-medium">
//                       No hidden fees
//                     </span>
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-7 h-7 rounded-full bg-[#0a2012] text-[#7ffe4a] flex items-center justify-center text-xs font-bold">
//                       2
//                     </div>
//                     <h3 className="font-semibold text-gray-800">
//                       Recipient Details
//                     </h3>
//                   </div>
//                   <div className="space-y-3">
//                     <div>
//                       <label className="text-xs text-gray-500 mb-1.5 block">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         value={recipientName}
//                         onChange={e => setRecipientName(e.target.value)}
//                         placeholder="Recipient's full name"
//                         className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-xs text-gray-500 mb-1.5 block">
//                         Email Address (Optional)
//                       </label>
//                       <input
//                         type="email"
//                         value={recipientEmail}
//                         onChange={e => setRecipientEmail(e.target.value)}
//                         placeholder="Recipient's email address"
//                         className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-xs text-gray-500 mb-1.5 block">
//                         Bank Country
//                       </label>
//                       <select
//                         value={bankCountry}
//                         onChange={e => setBankCountry(e.target.value)}
//                         className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50 cursor-pointer"
//                       >
//                         <option value="">Select country</option>
//                         <option>United States</option>
//                         <option>United Kingdom</option>
//                         <option>Germany</option>
//                         <option>Bangladesh</option>
//                         <option>UAE</option>
//                         <option>Saudi Arabia</option>
//                         <option>Canada</option>
//                         <option>Australia</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-7 h-7 rounded-full bg-[#0a2012] text-[#7ffe4a] flex items-center justify-center text-xs font-bold">
//                       3
//                     </div>
//                     <h3 className="font-semibold text-gray-800">
//                       Payment Details
//                     </h3>
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1.5 block">
//                       Payment Method
//                     </label>
//                     <select className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50 cursor-pointer">
//                       <option>Bank Transfer</option>
//                       <option>Debit / Credit Card</option>
//                       <option>Apple Pay</option>
//                       <option>Google Pay</option>
//                     </select>
//                   </div>
//                   <div className="mt-3">
//                     <label className="text-xs text-gray-500 mb-1.5 block">
//                       Reference (Optional)
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g., Invoice number, purpose of transfer"
//                       className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
//                     />
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setStep(3)}
//                   className="btn-primary w-full bg-[#0a2012] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#166534]"
//                 >
//                   <Send size={16} /> Continue to Payment
//                 </button>
//               </div>
//             )}

//             {step === 3 && (
//               <div className="stagger-3 bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
//                 <div>
//                   <div className="flex items-center gap-2 mb-4">
//                     <div className="w-7 h-7 rounded-full bg-[#0a2012] text-[#7ffe4a] flex items-center justify-center text-xs font-bold">
//                       1
//                     </div>
//                     <h3 className="font-semibold text-gray-800">
//                       Choose Payment Method
//                     </h3>
//                   </div>
//                   <div className="space-y-2">
//                     {paymentMethods.map(pm => (
//                       <label
//                         key={pm.id}
//                         className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
//                           paymentMethod === pm.id
//                             ? 'border-[#166634] bg-green-50/50'
//                             : 'border-gray-100 hover:border-gray-200'
//                         }`}
//                       >
//                         <input
//                           type="radio"
//                           name="paymentMethod"
//                           value={pm.id}
//                           checked={paymentMethod === pm.id}
//                           onChange={() => setPaymentMethod(pm.id)}
//                           className="accent-[#166634]"
//                         />
//                         <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
//                           <pm.icon size={18} className="text-gray-600" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2">
//                             <span className="text-sm font-semibold text-gray-800">
//                               {pm.label}
//                             </span>
//                             {pm.recommended && (
//                               <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
//                                 Recommended
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <span className="text-xs text-green-600 font-medium flex items-center gap-1">
//                             <Shield size={11} /> Secure
//                           </span>
//                           <span className="text-xs text-gray-400 block mt-0.5">
//                             {pm.fee}
//                           </span>
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex items-center justify-between mb-2">
//                     <p className="text-sm text-gray-600">You will pay</p>
//                     <p className="text-xl font-bold text-gray-800">
//                       {formatCurrency(total)} USD
//                     </p>
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-500 mb-1.5 block">
//                       Payment description (optional)
//                     </label>
//                     <input
//                       type="text"
//                       value={paymentDesc}
//                       onChange={e => setPaymentDesc(e.target.value)}
//                       placeholder="e.g., Rent payment, Family support, etc."
//                       maxLength={50}
//                       className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
//                     />
//                     <p className="text-xs text-gray-400 text-right mt-1">
//                       {paymentDesc.length}/50
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setStep(4)}
//                   className="btn-primary w-full bg-[#0a2012] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#166534]"
//                 >
//                   <Shield size={16} /> Pay {formatCurrency(total)} USD Securely
//                   →
//                 </button>
//                 <p className="text-xs text-center text-gray-400">
//                   🔒 Your payment is secure and encrypted
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Transfer Summary */}
//           <TransferSummary
//             fromAmount={fromAmount}
//             fromCurrency={fromCurrency}
//             toAmount={toAmount}
//             toCurrency={toCurrency}
//             rate={rate}
//             fee={fee}
//             total={total}
//           />
//         </div>
//       </div>

//       {(fromDropdown || toDropdown) && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => {
//             setFromDropdown(false);
//             setToDropdown(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// function TrendingUpIcon() {
//   return (
//     <svg
//       width="14"
//       height="14"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="text-green-600"
//     >
//       <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
//       <polyline points="17 6 23 6 23 12" />
//     </svg>
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
//   showDelivery?: boolean;
//   paymentMethod?: string;
// }

// function TransferSummary({
//   fromAmount,
//   fromCurrency,
//   toAmount,
//   toCurrency,
//   rate,
//   fee,
//   total,
//   showDelivery,
//   paymentMethod,
// }: SummaryProps) {
//   return (
//     <div className="lg:col-span-2 space-y-4">
//       <div className="stagger-3 bg-white rounded-2xl border border-gray-100 p-5">
//         <h3
//           className="font-semibold text-gray-800 mb-4 flex items-center gap-2"
//           style={{ fontFamily: "Syne, sans-serif" }}
//         >
//           <span className="w-5 h-5 text-[#166634]">
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
//               <polyline points="14 2 14 8 20 8" />
//             </svg>
//           </span>
//           Transfer Summary
//         </h3>
//         <div className="space-y-3">
//           {[
//             { label: "You send", value: `${formatCurrency(parseFloat(fromAmount || "0"))} ${fromCurrency}` },
//             { label: "Recipient gets", value: `${toAmount} ${toCurrency}` },
//             { label: "Exchange rate", value: `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}` },
//             { label: "Transfer fee", value: `$${fee.toFixed(2)} USD` },
//             { label: "Delivery time", value: "1–2 business days" },
//           ].map((row) => (
//             <div key={row.label} className="flex justify-between text-sm">
//               <span className="text-gray-500">{row.label}</span>
//               <span className="font-medium text-gray-700">{row.value}</span>
//             </div>
//           ))}

//           {showDelivery && paymentMethod && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-500">Payment method</span>
//               <span className="font-medium text-gray-700">{paymentMethod}</span>
//             </div>
//           )}

//           {showDelivery && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-500">Payment status</span>
//               <span className="badge-completed px-2 py-0.5 rounded-full text-xs font-medium">
//                 Completed
//               </span>
//             </div>
//           )}

//           <div className="border-t border-gray-100 pt-3 flex justify-between">
//             <span className="font-semibold text-gray-800">Total to pay</span>
//             <span
//               className="font-bold text-[#166634] text-lg"
//               style={{ fontFamily: "Syne, sans-serif" }}
//             >
//               {formatCurrency(total)} USD
//             </span>
//           </div>
//         </div>
//       </div>

//       {showDelivery ? (
//         <div className="bg-white rounded-2xl border border-gray-100 p-5">
//           <h4 className="font-semibold text-sm text-gray-800 mb-3 flex items-center gap-2">
//             <span className="text-blue-500">⏱</span> Estimated Delivery
//           </h4>
//           <p className="text-green-600 font-semibold text-sm mb-3">
//             Arrives in 1–2 business days
//           </p>
//           <div className="flex items-center gap-2">
//             {["Payment", "Processing", "Delivered"].map((s, i) => (
//               <React.Fragment key={s}>
//                 <div className="flex flex-col items-center">
//                   <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
//                     <CheckCircle size={14} className="text-white" />
//                   </div>
//                   <span className="text-xs text-gray-500 mt-1">{s}</span>
//                 </div>
//                 {i < 2 && <div className="flex-1 h-0.5 bg-green-400 mb-4" />}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
//           {[
//             { icon: "🛡️", text: "No hidden fees" },
//             { icon: "🔄", text: "Guaranteed exchange rate" },
//             { icon: "🔒", text: "Fully secure transaction" },
//           ].map((item) => (
//             <div key={item.text} className="flex items-center gap-3 text-sm text-gray-600">
//               <span>{item.icon}</span> {item.text}
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="bg-green-50 rounded-2xl border border-green-100 p-4">
//         <div className="flex items-start gap-2">
//           <Shield size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
//           <p className="text-xs text-green-700 leading-relaxed">
//             Your money is protected with bank-level security and encryption. TheSendMoney is
//             fully regulated and compliant with international financial regulations.
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center justify-around py-3 px-4 bg-white rounded-2xl border border-gray-100">
//         {[
//           { icon: "🔒", label: "256-bit SSL Secure" },
//           { icon: "📋", label: "PCI DSS Compliant" },
//           { icon: "👥", label: "Trusted by Millions" },
//         ].map((b) => (
//           <div key={b.label} className="text-center">
//             <span className="text-xl">{b.icon}</span>
//             <p className="text-xs text-gray-500 mt-0.5">{b.label}</p>
//           </div>
//         ))}
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
} from 'lucide-react';
import { CURRENCIES, type Currency } from '@/src/lib/country_api_data';
import FlagImg from '../others/FlagImg';
import CurrencyDropDown from '../others/CurrencyDropDown';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

type Step = 1 | 2 | 3 | 4 | 5;
type DeliveryMethod = 'bank' | 'wallet' | 'cash' | null;

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
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
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
        <div className="absolute left-0 top-full mt-1 w-full min-w-55 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 flex flex-col max-h-60">
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
                className={`text-xs font-medium hidden sm:block whitespace-nowrap ${active ? 'text-green-700 font-semibold' : done ? 'text-green-600' : 'text-gray-400'}`}
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
  showDelivery?: boolean;
  paymentMethod?: string;
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
            <span className="text-gray-500">Transfer fee</span>
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
}: {
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (m: DeliveryMethod) => void;
}) {
  const [bankCountry, setBankCountry] = useState('Bangladesh');
  const [bankName, setBankName] = useState('Brac Bank PLC');
  const [accountHolder, setAccountHolder] = useState('Ahmed Khan');
  const [accountNumber, setAccountNumber] = useState('1234567890123');
  const [iban, setIban] = useState('BD52BRAC1234567890123');
  const [swift, setSwift] = useState('BRAKBDDH');

  const [walletCountry, setWalletCountry] = useState('Bangladesh');
  const [walletProvider, setWalletProvider] = useState('');
  const [walletMobile, setWalletMobile] = useState('');
  const [walletHolder, setWalletHolder] = useState('');

  const [cashCountry, setCashCountry] = useState('Philippines');
  const [pickupLocation, setPickupLocation] = useState('');
  const [cashRecipient, setCashRecipient] = useState('');
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');

  const cardBase =
    'flex-1 border-2 rounded-xl p-3 sm:p-4 cursor-pointer transition-all min-w-0';
  const cardActive = 'border-green-700 bg-blue-50';
  const cardInactive = 'border-gray-200 bg-white hover:border-gray-300';

  const inputCls =
    'w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-600';

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
        {/* Bank */}
        <div
          className={`${cardBase} ${deliveryMethod === 'bank' ? cardActive : cardInactive}`}
          onClick={() =>
            setDeliveryMethod(deliveryMethod === 'bank' ? null : 'bank')
          }
        >
          <div className="relative flex flex-col items-center text-center gap-1">
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 absolute top-0 left-0 ${deliveryMethod === 'bank' ? 'border-green-600 bg-green-600' : 'border-gray-300'}`}
            >
              {deliveryMethod === 'bank' && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
            <Landmark
              size={28}
              className={`${deliveryMethod === 'bank' ? 'text-[#133000]' : 'text-gray-500'}`}
            />
            <p className="font-semibold text-xs sm:text-sm text-gray-800">
              Bank Account
            </p>
            <p
              className={`text-xs font-medium ${deliveryMethod === 'bank' ? 'text-green-600' : 'text-gray-400'}`}
            >
              Best for most
            </p>
            <p className="text-xs text-gray-400">1–2 business days</p>
          </div>
        </div>

        {/* Wallet */}
        <div
          className={`${cardBase} ${deliveryMethod === 'wallet' ? cardActive : cardInactive}`}
          onClick={() =>
            setDeliveryMethod(deliveryMethod === 'wallet' ? null : 'wallet')
          }
        >
          <div className="relative flex flex-col items-center text-center gap-1">
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 absolute top-0 left-0 ${deliveryMethod === 'wallet' ? 'border-green-600 bg-green-600' : 'border-gray-300'}`}
            >
              {deliveryMethod === 'wallet' && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
            <Smartphone
              size={28}
              className={`${deliveryMethod === 'wallet' ? 'text-green-600' : 'text-gray-500'}`}
            />
            <p className="font-semibold text-xs sm:text-sm text-gray-800">
              Mobile Wallet
            </p>
            <p
              className={`text-xs font-medium ${deliveryMethod === 'wallet' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              Fastest
            </p>
            <p className="text-xs text-gray-400">Within minutes</p>
          </div>
        </div>

        <div
          className={`${cardBase} ${deliveryMethod === 'cash' ? cardActive : cardInactive}`}
          onClick={() =>
            setDeliveryMethod(deliveryMethod === 'cash' ? null : 'cash')
          }
        >
          <div className="relative flex flex-col items-center text-center gap-1">
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 absolute top-0 left-0 ${deliveryMethod === 'cash' ? 'border-green-600 bg-green-600' : 'border-gray-300'}`}
            >
              {deliveryMethod === 'cash' && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
            <Wallet
              size={28}
              className={`${deliveryMethod === 'cash' ? 'text-orange-500' : 'text-gray-500'}`}
            />
            <p className="font-semibold text-xs sm:text-sm text-gray-800">
              Cash Pickup
            </p>
            <p
              className={`text-xs font-medium ${deliveryMethod === 'cash' ? 'text-orange-500' : 'text-gray-400'}`}
            >
              Convenient
            </p>
            <p className="text-xs text-gray-400">Instant pickup</p>
          </div>
        </div>
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
              <div className="relative">
                <Landmark
                  size={14}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  className={`${inputCls} pl-8`}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Account Holder Name
              </label>
              <div className="relative">
                <User
                  size={14}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  value={accountHolder}
                  onChange={e => setAccountHolder(e.target.value)}
                  className={`${inputCls} pl-8`}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Account Number
              </label>
              <div className="relative">
                <Hash
                  size={14}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value)}
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
                  value={iban}
                  onChange={e => setIban(e.target.value)}
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
                  value={swift}
                  onChange={e => setSwift(e.target.value)}
                  className={`${inputCls} pl-8`}
                />
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-2">
            <Shield size={15} className="text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-green-700">
                Secure & Reliable
              </p>
              <p className="text-xs text-gray-400">
                Your transfer will be sent securely to the recipient's bank
                account.
              </p>
            </div>
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
                Wallet Provider
              </label>
              <select
                value={walletProvider}
                onChange={e => setWalletProvider(e.target.value)}
                className={inputCls}
              >
                <option value="">Select wallet provider</option>
                <option>bKash</option>
                <option>Nagad</option>
                <option>Rocket</option>
                <option>Upay</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <span className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 shrink-0">
                  +880
                </span>
                <input
                  value={walletMobile}
                  onChange={e => setWalletMobile(e.target.value)}
                  placeholder="Enter mobile number"
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Account Holder Name
              </label>
              <input
                value={walletHolder}
                onChange={e => setWalletHolder(e.target.value)}
                placeholder="Enter account holder name"
                className={inputCls}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            {[
              {
                name: 'bKash',
                icon: '/Mobile_walet_Icons/BKash.svg',
              },
              {
                name: 'Nagad',
                icon: '/Mobile_walet_Icons/Nagad.svg',
              },
              {
                name: 'Rocket',
                icon: '/Mobile_walet_Icons/Rocket.svg',
              },
              {
                name: 'Upay',
                icon: '/Mobile_walet_Icons/Upay.svg',
              },
            ].map(w => (
              <div
                key={w.name}
                className="text-center"
              >
                <div
                  className={`w-15 h-15 rounded-xl flex items-center justify-center text-white font-bold text-sm`}
                >
                  <img
                    src={w.icon}
                    alt={w.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500">{w.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cash Details */}
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
                Pickup Location
              </label>
              <div className="relative">
                <MapPin
                  size={14}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <select
                  value={pickupLocation}
                  onChange={e => setPickupLocation(e.target.value)}
                  className={`${inputCls} pl-8`}
                >
                  <option value="">Select pickup location</option>
                  <option>Western Union</option>
                  <option>MoneyGram</option>
                  <option>Local Agent</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Recipient Full Name
              </label>
              <input
                value={cashRecipient}
                onChange={e => setCashRecipient(e.target.value)}
                placeholder="Enter recipient full name"
                className={inputCls}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Recipient ID Type
              </label>
              <select
                value={idType}
                onChange={e => setIdType(e.target.value)}
                className={inputCls}
              >
                <option value="">Select ID type</option>
                <option>Passport</option>
                <option>National ID</option>
                <option>Driver's License</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">
                Recipient ID Number
              </label>
              <input
                value={idNumber}
                onChange={e => setIdNumber(e.target.value)}
                placeholder="Enter ID number"
                className={inputCls}
              />
            </div>
          </div>
          <div className="flex items-start gap-2 mt-1">
            <Shield size={15} className="text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-green-700">
                Safe & reliable
              </p>
              <p className="text-xs text-gray-400">
                Recipient can pick up cash from thousands of locations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SendMoneyPage() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loadingRate, setLoadingRate] = useState(false);
  const [rateError, setRateError] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [fromAmount, setFromAmount] = useState('1000.00');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  const [recipientName, setRecipientName] = useState('Ahmed Khan');
  const [recipientMobile, setRecipientMobile] = useState('+880 1812-345678');
  const [recipientEmail, setRecipientEmail] = useState('ahmed.khan@email.com');
  const [recipientCountry, setRecipientCountry] = useState('Bangladesh');
  const [saveRecipient, setSaveRecipient] = useState(true);

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(null);

  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [paymentDesc, setPaymentDesc] = useState('');

  const rate = rates[toCurrency] ?? 0;
  const toAmount = rate > 0 ? (Number(fromAmount || 0) * rate).toFixed(2) : '—';
  const fee = 2.99;
  const total = parseFloat(fromAmount || '0') + fee;

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

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromCurr = CURRENCIES.find(c => c.code === fromCurrency);
  const toCurr = CURRENCIES.find(c => c.code === toCurrency);

  const paymentMethods = [
    {
      id: 'bank',
      label: 'Bank Transfer',
      icon: Landmark,
      fee: 'No extra fees',
      recommended: true,
    },
    {
      id: 'card',
      label: 'Debit / Credit',
      icon: CreditCard,
      fee: 'Fee: $3.49',
      recommended: false,
    },
    {
      id: 'apple',
      label: 'Apple Pay',
      icon: Smartphone,
      fee: 'Fee: $2.99',
      recommended: false,
    },
    {
      id: 'google',
      label: 'Google Pay',
      icon: Smartphone,
      fee: 'Fee: $2.99',
      recommended: false,
    },
    {
      id: 'wallet',
      label: 'Wallet',
      icon: Wallet,
      fee: '$125.50 available',
      recommended: false,
    },
  ];

  if (step === 5) {
    return (
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-linear-to-b from-green-50 to-white px-4 sm:px-6 py-8 sm:py-10 text-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto">
                <CheckCircle size={36} className="text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mt-5 text-gray-800">
                Payment <span className="text-green-600">Successful!</span>
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Your transfer has been completed successfully.
              </p>
            </div>
            <div className="px-4 sm:px-6 py-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {[
                  { label: 'Transfer ID', value: txId, blue: true },
                  { label: 'Date & Time', value: '12 May 2025\n10:30 AM' },
                  { label: 'Recipient', value: recipientName || 'Ahmed Khan' },
                  { label: 'Amount Paid', value: `$${total.toFixed(2)}` },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="text-center p-2.5 sm:p-3 bg-gray-50 rounded-xl"
                  >
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p
                      className={`text-xs sm:text-sm font-semibold mt-1 whitespace-pre-line ${item.blue ? 'text-blue-600' : 'text-gray-800'}`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-xl flex items-center gap-3">
                <Shield size={18} className="text-green-600 shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-green-800">
                    Your money is on its way!
                  </p>
                  <p className="text-xs text-green-600">
                    We'll notify you when the transfer is delivered.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button className="flex-1 bg-green-900 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-green-800 transition">
                  <Send size={15} /> Track Transfer
                </button>
                <button className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                  <Download size={15} /> Download Receipt
                </button>
                <button className="sm:w-auto w-full border border-gray-200 text-gray-700 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                  <Share2 size={15} /> Share
                </button>
              </div>
            </div>
          </div>
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
    );
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
            <Send size={16} className="text-green-800" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Send Money
            </h2>
            <p className="text-xs text-gray-400">
              Fast, Secure & Reliable Money Transfer
            </p>
          </div>
        </div>

        <StepBar current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
          {/* ── Main Form ── */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 space-y-6 shadow-sm">
              {/* ── STEP 1: Amount ── */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step >= 1 ? 'bg-green-900 text-green-400' : 'bg-gray-200 text-gray-500'}`}
                  >
                    1
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
                        value={fromAmount}
                        onChange={e => setFromAmount(e.target.value)}
                        disabled={step > 1}
                        className="flex-1 px-3 sm:px-4 py-3 text-base sm:text-lg font-semibold outline-none bg-transparent min-w-0 disabled:opacity-60"
                      />
                      <CurrencyDropDown
                        selected={fromCurrency}
                        onChange={setFromCurrency}
                        disabled={step > 1}
                      />
                    </div>
                  </div>

                  <div className="flex sm:items-end justify-center sm:pb-1">
                    <button
                      onClick={swapCurrencies}
                      disabled={step > 1}
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-green-900 hover:border-green-900 hover:text-white transition text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeftRight size={16} />
                    </button>
                  </div>

                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1.5 block">
                      Recipient Gets
                    </label>
                    <div className="flex items-stretch border border-gray-200 rounded-xl focus-within:border-green-700 focus-within:ring-2 focus-within:ring-green-700/10 transition z-10">
                      <div className="flex-1 px-3 sm:px-4 py-3 bg-gray-50 flex items-center rounded-xl">
                        {loadingRate ? (
                          <RefreshCw
                            size={14}
                            className="animate-spin text-gray-400"
                          />
                        ) : (
                          <span className="text-base sm:text-lg font-semibold text-gray-700">
                            {toAmount}
                          </span>
                        )}
                      </div>
                      <CurrencyDropDown
                        selected={toCurrency}
                        onChange={setToCurrency}
                        disabled={step > 1}
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
                        1 {fromCurrency} =
                        {toCurr && (
                          <FlagImg
                            flag={toCurr.flag}
                            code={toCurr.code}
                            size={14}
                            className="ml-1"
                          />
                        )}
                        <span className="font-semibold">
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

              <div className={step < 2 ? 'opacity-40 pointer-events-none' : ''}>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step >= 2 ? 'bg-green-900 text-green-400' : 'bg-gray-200 text-gray-500'}`}
                  >
                    2
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Recipient Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={14}
                        className="absolute left-3 top-3 text-gray-400"
                      />
                      <input
                        value={recipientName}
                        onChange={e => setRecipientName(e.target.value)}
                        placeholder="Ahmed Khan"
                        className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Mobile Number
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
                      Country
                    </label>
                    <CountrySelect
                      value={recipientCountry}
                      onChange={setRecipientCountry}
                    />
                  </div>
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

              {/* ── STEP 3: Receive Method ── */}
              <div className={step < 3 ? 'opacity-40 pointer-events-none' : ''}>
                <DeliveryMethodSection
                  deliveryMethod={deliveryMethod}
                  setDeliveryMethod={setDeliveryMethod}
                />
              </div>

              {/* ── STEP 4: Payment ── */}
              <div className={step < 4 ? 'opacity-40 pointer-events-none' : ''}>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step >= 4 ? 'bg-green-900 text-green-400' : 'bg-gray-200 text-gray-500'}`}
                  >
                    4
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    Payment Method
                  </h3>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
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
                        onChange={() => setPaymentMethod(pm.id)}
                        className="accent-green-700 shrink-0"
                      />
                      <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <pm.icon size={14} className="text-gray-600" />
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
              </div>

              {/* ── CTA ── */}
              {step < 4 && (
                <button
                  onClick={() => {
                    if (step === 1) setStep(2);
                    else if (step === 2) setStep(3);
                    else if (step === 3) setStep(4);
                  }}
                  className="w-full bg-green-900 text-white py-3.5 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-800 transition text-sm"
                >
                  {step === 1
                    ? 'Continue to Recipient'
                    : step === 2
                      ? 'Continue to Receive Method'
                      : 'Continue to Payment'}
                  <ChevronRight size={16} />
                </button>
              )}

              {step === 4 && (
                <>
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 block">
                      Payment description (optional)
                    </label>
                    <input
                      type="text"
                      value={paymentDesc}
                      onChange={e => setPaymentDesc(e.target.value)}
                      placeholder="e.g., Rent payment, Family support, etc."
                      maxLength={50}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-green-700"
                    />
                    <p className="text-xs text-gray-400 text-right mt-1">
                      {paymentDesc.length}/50
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(5)}
                    className="w-full bg-green-900 text-white py-3.5 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-800 transition text-sm"
                  >
                    <Shield size={16} /> Review & Continue →
                  </button>
                  <p className="text-xs text-center text-gray-400">
                    🔒 Your payment is secure and encrypted
                  </p>
                </>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
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
  );
}
