"use client";

import React, { useState } from "react";
import {
  Send,
  ArrowLeftRight,
  Shield,
  CheckCircle,
  Download,
  Share2,
  ChevronDown,
  Building2,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { currencies, exchangeRates, formatCurrency } from "@/lib/data";

type Step = 1 | 2 | 3 | 4;

export default function SendMoneyPage() {
  const [step, setStep] = useState<Step>(1);
  const [fromAmount, setFromAmount] = useState("1000.00");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [bankCountry, setBankCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [paymentDesc, setPaymentDesc] = useState("");
  const [fromDropdown, setFromDropdown] = useState(false);
  const [toDropdown, setToDropdown] = useState(false);

  const rateKey = `${fromCurrency}-${toCurrency}`;
  const rate = exchangeRates[rateKey] || 1;
  const toAmount = (parseFloat(fromAmount || "0") * rate).toFixed(2);
  const fee = 2.99;
  const total = parseFloat(fromAmount || "0") + fee;

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const txId = "#TSM" + Math.floor(10000000 + Math.random() * 90000000);

  const paymentMethods = [
    {
      id: "bank",
      label: "Bank Transfer (ACH)",
      icon: Building2,
      fee: "No extra fees",
      recommended: true,
    },
    {
      id: "card",
      label: "Debit / Credit Card",
      icon: CreditCard,
      fee: "Fee: $3.49 USD",
      recommended: false,
    },
    {
      id: "apple",
      label: "Apple Pay",
      icon: Smartphone,
      fee: "Fee: $2.99 USD",
      recommended: false,
    },
    {
      id: "google",
      label: "Google Pay",
      icon: Smartphone,
      fee: "Fee: $2.99 USD",
      recommended: false,
    },
  ];

  if (step === 4) {
    return (
      <div className="page-enter p-4 lg:p-6">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-b from-green-50 to-white px-6 py-10 text-center">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  {["top-0 left-4", "top-2 right-4", "-top-2 left-12", "top-0 right-12"].map((pos, i) => (
                    <div
                      key={i}
                      className={`absolute w-3 h-3 rounded-sm confetti-piece`}
                      style={{
                        top: i % 2 === 0 ? "-8px" : "0",
                        left: i < 2 ? "10px" : "auto",
                        right: i >= 2 ? "10px" : "auto",
                        background: ["#7ffe4a", "#fbbf24", "#60a5fa", "#f87171"][i],
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <h2
                  className="text-2xl font-bold mt-6 text-gray-800"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Payment{" "}
                  <span className="text-green-600">Successful!</span>
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Your transfer has been completed successfully.
                </p>
              </div>

              <div className="px-6 py-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: Send, label: "Transfer ID", value: txId, blue: true },
                    { icon: null, label: "Date & Time", value: "12 May 2025\n10:30 AM" },
                    { icon: null, label: "Recipient", value: recipientName || "Ahmed Khan" },
                    { icon: null, label: "Amount Paid", value: `$${total.toFixed(2)} USD` },
                  ].map((item, i) => (
                    <div key={i} className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p
                        className={`text-sm font-semibold mt-1 whitespace-pre-line ${
                          item.blue ? "text-blue-600" : "text-gray-800"
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-green-50 rounded-xl flex items-center gap-3">
                  <Shield size={20} className="text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-green-800">
                      Your money is on its way!
                    </p>
                    <p className="text-xs text-green-600">
                      We&apos;ll notify you when the transfer is delivered.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="btn-primary flex-1 bg-[#0a2012] text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                    <Send size={15} /> Track Your Transfer
                  </button>
                  <button className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                    <Download size={15} /> Download Receipt
                  </button>
                  <button className="px-4 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                    <Share2 size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Summary */}
            <TransferSummary
              fromAmount={fromAmount}
              fromCurrency={fromCurrency}
              toAmount={toAmount}
              toCurrency={toCurrency}
              rate={rate}
              fee={fee}
              total={total}
              showDelivery
              paymentMethod="Bank Transfer (ACH)"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter p-4 lg:p-6">
      <div className="w-full mx-auto">
        <div className="stagger-1 flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center">
            <Send size={18} className="text-[#166534]" />
          </div>
          <div>
            <h2
              className="text-xl font-bold text-gray-800"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Send Money
            </h2>
            <p className="text-xs text-gray-400">
              Fast, Secure & Reliable Money Transfer
            </p>
          </div>
        </div>

        {step === 3 && (
          <div className="stagger-2 flex items-center gap-2 mb-6">
            {['Amount', 'Recipient', 'Payment'].map((s, i) => {
              const n = i + 1;
              const done = n < 3;
              const active = n === 3;
              return (
                <React.Fragment key={s}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${done ? 'step-done' : active ? 'step-active' : 'step-pending'}`}
                    >
                      {done ? <CheckCircle size={16} /> : n}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:block ${
                        active
                          ? 'text-[#0a2012]'
                          : done
                            ? 'text-green-600'
                            : 'text-gray-400'
                      }`}
                    >
                      {s}
                      {done && (
                        <span className="block text-green-500">Completed</span>
                      )}
                      {active && (
                        <span className="block text-[#166534]">
                          In Progress
                        </span>
                      )}
                    </span>
                  </div>
                  {i < 2 && (
                    <div
                      className={`flex-1 h-0.5 rounded ${
                        done ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-4">
            {(step === 1 || step === 2) && (
              <div className="stagger-2 bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#0a2012] text-[#7ffe4a] flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <h3 className="font-semibold text-gray-800">Amount</h3>
                  </div>
                  <div className="flex items-stretch gap-3 md:flex-row flex-col">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1.5 block">
                        You Send
                      </label>
                      <div className="flex items-stretch border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#166534] focus-within:ring-2 focus-within:ring-[#166534]/10 transition">
                        <input
                          type="number"
                          value={fromAmount}
                          onChange={e => setFromAmount(e.target.value)}
                          className="flex-1 px-4 py-3 text-lg font-semibold outline-none bg-transparent"
                        />
                        <div className="relative">
                          <button
                            onClick={() => setFromDropdown(!fromDropdown)}
                            className="h-full px-3 bg-gray-50 border-l border-gray-200 flex items-center gap-1.5 hover:bg-gray-100 transition"
                          >
                            <span className="text-base">
                              {
                                currencies.find(c => c.code === fromCurrency)
                                  ?.flag
                              }
                            </span>
                            <span className="text-sm font-semibold text-gray-700">
                              {fromCurrency}
                            </span>
                            <ChevronDown size={13} className="text-gray-400" />
                          </button>
                          {fromDropdown && (
                            <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-48 overflow-y-auto">
                              {currencies.map(c => (
                                <button
                                  key={c.code}
                                  onClick={() => {
                                    setFromCurrency(c.code);
                                    setFromDropdown(false);
                                  }}
                                  className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 transition"
                                >
                                  <span>{c.flag}</span>
                                  <span className="font-medium">{c.code}</span>
                                  <span className="text-gray-400 text-xs">
                                    {c.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end pb-1">
                      <button
                        onClick={swapCurrencies}
                        className="w-[350px] md:w-10 xl:w-10 2xl:xl:w-10 lg:xl:w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-[#0a2012] hover:border-[#0a2012] hover:text-white transition text-gray-500"
                      >
                        <ArrowLeftRight size={16} />
                      </button>
                    </div>

                    {/* To */}
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1.5 block">
                        Recipient Gets
                      </label>
                      <div className="flex items-stretch border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#166534] focus-within:ring-2 focus-within:ring-[#166634]/10 transition">
                        <input
                          readOnly
                          value={toAmount}
                          className="flex-1 px-4 py-3 text-lg font-semibold outline-none bg-gray-50 cursor-default"
                        />
                        <div className="relative">
                          <button
                            onClick={() => setToDropdown(!toDropdown)}
                            className="h-full px-3 bg-gray-50 border-l border-gray-200 flex items-center gap-1.5 hover:bg-gray-100 transition"
                          >
                            <span className="text-base">
                              {
                                currencies.find(c => c.code === toCurrency)
                                  ?.flag
                              }
                            </span>
                            <span className="text-sm font-semibold text-gray-700">
                              {toCurrency}
                            </span>
                            <ChevronDown size={13} className="text-gray-400" />
                          </button>
                          {toDropdown && (
                            <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-48 overflow-y-auto">
                              {currencies.map(c => (
                                <button
                                  key={c.code}
                                  onClick={() => {
                                    setToCurrency(c.code);
                                    setToDropdown(false);
                                  }}
                                  className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-50 transition"
                                >
                                  <span>{c.flag}</span>
                                  <span className="font-medium">{c.code}</span>
                                  <span className="text-gray-400 text-xs">
                                    {c.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rate row */}
                  <div className="mt-3 flex items-center justify-between px-4 py-2.5 bg-green-50 rounded-xl">
                    <span className="text-xs text-gray-600 flex items-center gap-1.5">
                      <TrendingUpIcon />1 {fromCurrency} = {rate.toFixed(4)}{' '}
                      {toCurrency}
                    </span>
                    <span className="text-xs text-green-600 font-medium">
                      No hidden fees
                    </span>
                  </div>
                </div>

                {/* Recipient section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#0a2012] text-[#7ffe4a] flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <h3 className="font-semibold text-gray-800">
                      Recipient Details
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={e => setRecipientName(e.target.value)}
                        placeholder="Recipient's full name"
                        className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={e => setRecipientEmail(e.target.value)}
                        placeholder="Recipient's email address"
                        className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">
                        Bank Country
                      </label>
                      <select
                        value={bankCountry}
                        onChange={e => setBankCountry(e.target.value)}
                        className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50 cursor-pointer"
                      >
                        <option value="">Select country</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Germany</option>
                        <option>Bangladesh</option>
                        <option>UAE</option>
                        <option>Saudi Arabia</option>
                        <option>Canada</option>
                        <option>Australia</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment method (step 1 form) */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#0a2012] text-[#7ffe4a] flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <h3 className="font-semibold text-gray-800">
                      Payment Details
                    </h3>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 block">
                      Payment Method
                    </label>
                    <select className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50 cursor-pointer">
                      <option>Bank Transfer</option>
                      <option>Debit / Credit Card</option>
                      <option>Apple Pay</option>
                      <option>Google Pay</option>
                    </select>
                  </div>
                  <div className="mt-3">
                    <label className="text-xs text-gray-500 mb-1.5 block">
                      Reference (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Invoice number, purpose of transfer"
                      className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep(3)}
                  className="btn-primary w-full bg-[#0a2012] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#166534]"
                >
                  <Send size={16} /> Continue to Payment
                </button>
              </div>
            )}

            {/* Step 3: Choose payment method */}
            {step === 3 && (
              <div className="stagger-3 bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-full bg-[#0a2012] text-[#7ffe4a] flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <h3 className="font-semibold text-gray-800">
                      Choose Payment Method
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {paymentMethods.map(pm => (
                      <label
                        key={pm.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
                          paymentMethod === pm.id
                            ? 'border-[#166634] bg-green-50/50'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={pm.id}
                          checked={paymentMethod === pm.id}
                          onChange={() => setPaymentMethod(pm.id)}
                          className="accent-[#166634]"
                        />
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <pm.icon size={18} className="text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-800">
                              {pm.label}
                            </span>
                            {pm.recommended && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                Recommended
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <Shield size={11} /> Secure
                          </span>
                          <span className="text-xs text-gray-400 block mt-0.5">
                            {pm.fee}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">You will pay</p>
                    <p className="text-xl font-bold text-gray-800">
                      {formatCurrency(total)} USD
                    </p>
                  </div>
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
                      className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
                    />
                    <p className="text-xs text-gray-400 text-right mt-1">
                      {paymentDesc.length}/50
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setStep(4)}
                  className="btn-primary w-full bg-[#0a2012] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#166534]"
                >
                  <Shield size={16} /> Pay {formatCurrency(total)} USD Securely
                  →
                </button>
                <p className="text-xs text-center text-gray-400">
                  🔒 Your payment is secure and encrypted
                </p>
              </div>
            )}
          </div>

          {/* Transfer Summary */}
          <TransferSummary
            fromAmount={fromAmount}
            fromCurrency={fromCurrency}
            toAmount={toAmount}
            toCurrency={toCurrency}
            rate={rate}
            fee={fee}
            total={total}
          />
        </div>
      </div>

      {/* Close dropdowns */}
      {(fromDropdown || toDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setFromDropdown(false);
            setToDropdown(false);
          }}
        />
      )}
    </div>
  );
}

function TrendingUpIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-green-600"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
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
  showDelivery,
  paymentMethod,
}: SummaryProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="stagger-3 bg-white rounded-2xl border border-gray-100 p-5">
        <h3
          className="font-semibold text-gray-800 mb-4 flex items-center gap-2"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          <span className="w-5 h-5 text-[#166634]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </span>
          Transfer Summary
        </h3>
        <div className="space-y-3">
          {[
            { label: "You send", value: `${formatCurrency(parseFloat(fromAmount || "0"))} ${fromCurrency}` },
            { label: "Recipient gets", value: `${toAmount} ${toCurrency}` },
            { label: "Exchange rate", value: `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}` },
            { label: "Transfer fee", value: `$${fee.toFixed(2)} USD` },
            { label: "Delivery time", value: "1–2 business days" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between text-sm">
              <span className="text-gray-500">{row.label}</span>
              <span className="font-medium text-gray-700">{row.value}</span>
            </div>
          ))}

          {showDelivery && paymentMethod && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment method</span>
              <span className="font-medium text-gray-700">{paymentMethod}</span>
            </div>
          )}

          {showDelivery && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment status</span>
              <span className="badge-completed px-2 py-0.5 rounded-full text-xs font-medium">
                Completed
              </span>
            </div>
          )}

          <div className="border-t border-gray-100 pt-3 flex justify-between">
            <span className="font-semibold text-gray-800">Total to pay</span>
            <span
              className="font-bold text-[#166634] text-lg"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              {formatCurrency(total)} USD
            </span>
          </div>
        </div>
      </div>

      {showDelivery ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h4 className="font-semibold text-sm text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-blue-500">⏱</span> Estimated Delivery
          </h4>
          <p className="text-green-600 font-semibold text-sm mb-3">
            Arrives in 1–2 business days
          </p>
          <div className="flex items-center gap-2">
            {["Payment", "Processing", "Delivered"].map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{s}</span>
                </div>
                {i < 2 && <div className="flex-1 h-0.5 bg-green-400 mb-4" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
          {[
            { icon: "🛡️", text: "No hidden fees" },
            { icon: "🔄", text: "Guaranteed exchange rate" },
            { icon: "🔒", text: "Fully secure transaction" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 text-sm text-gray-600">
              <span>{item.icon}</span> {item.text}
            </div>
          ))}
        </div>
      )}

      <div className="bg-green-50 rounded-2xl border border-green-100 p-4">
        <div className="flex items-start gap-2">
          <Shield size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-green-700 leading-relaxed">
            Your money is protected with bank-level security and encryption. TheSendMoney is
            fully regulated and compliant with international financial regulations.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-around py-3 px-4 bg-white rounded-2xl border border-gray-100">
        {[
          { icon: "🔒", label: "256-bit SSL Secure" },
          { icon: "📋", label: "PCI DSS Compliant" },
          { icon: "👥", label: "Trusted by Millions" },
        ].map((b) => (
          <div key={b.label} className="text-center">
            <span className="text-xl">{b.icon}</span>
            <p className="text-xs text-gray-500 mt-0.5">{b.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
