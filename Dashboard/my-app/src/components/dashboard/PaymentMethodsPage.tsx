'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Building2,
  Wallet,
  Plus,
  ChevronRight,
  Trash2,
  Star,
} from 'lucide-react';

export default function PaymentMethodsPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [addType, setAddType] = useState<'card' | 'bank' | 'wallet'>('card');

  const methods: Array<{
    type: 'card' | 'bank' | 'wallet';
    icon: typeof CreditCard;
    label: string;
    detail: string;
    color: 'blue' | 'green' | 'purple';
    cards: Array<{ label: string; expires: string; primary: boolean }>;
  }> = [
    {
      type: 'card',
      icon: CreditCard,
      label: 'Credit / Debit Card',
      detail: '2 Cards Added',
      color: 'blue',
      cards: [
        { label: 'Visa •••• 4242', expires: '12/27', primary: true },
        { label: 'Mastercard •••• 8888', expires: '08/26', primary: false },
      ],
    },
    {
      type: 'bank',
      icon: Building2,
      label: 'Bank Account',
      detail: '3 Accounts Added',
      color: 'green',
      cards: [
        {
          label: 'Dutch-Bangla Bank •••• 1234',
          expires: 'Checking',
          primary: true,
        },
        { label: 'BRAC Bank •••• 5678', expires: 'Savings', primary: false },
        { label: 'Islami Bank •••• 9012', expires: 'Current', primary: false },
      ],
    },
    {
      type: 'wallet',
      icon: Wallet,
      label: 'Wallet',
      detail: '$450.00 Balance',
      color: 'purple',
      cards: [
        {
          label: 'TheSendMoney Wallet',
          expires: '$450.00 available',
          primary: true,
        },
      ],
    },
  ];

  const colorMap = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-700',
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      badge: 'bg-green-100 text-green-700',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-700',
    },
  };

  return (
    <div className="page-enter p-4 lg:p-6">
      <div className="w-full mx-auto">
        <div className="stagger-1 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center">
              <CreditCard size={18} className="text-[#166634]" />
            </div>
            <h2
              className="text-xl font-bold text-gray-800"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Payment Methods
            </h2>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="btn-primary flex items-center gap-2 bg-[#0a2012] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#166634]"
          >
            <Plus size={15} /> Add New
          </button>
        </div>

        <div className="space-y-4">
          {methods.map((method, mi) => {
            const colors = colorMap[method.color];
            return (
              <div
                key={method.type}
                className={`stagger-${mi + 2} bg-white rounded-2xl border border-gray-100 overflow-hidden`}
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}
                    >
                      <method.icon size={18} className={colors.text} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {method.label}
                      </p>
                      <p className="text-xs text-gray-400">{method.detail}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>

                <div className="divide-y divide-gray-50">
                  {method.cards.map((card, ci) => (
                    <div
                      key={ci}
                      className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-5 rounded bg-gradient-to-r from-gray-700 to-gray-900 opacity-80" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {card.label}
                          </p>
                          <p className="text-xs text-gray-400">
                            {card.expires}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {card.primary && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}
                          >
                            Primary
                          </span>
                        )}
                        {!card.primary && (
                          <button className="p-1 text-gray-300 hover:text-yellow-400 transition">
                            <Star size={13} />
                          </button>
                        )}
                        <button className="p-1 text-gray-300 hover:text-red-400 transition">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add payment method modal */}
      {showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop"
          onClick={() => setShowAdd(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-96 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h3
              className="font-bold text-gray-800 mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Add Payment Method
            </h3>
            <div className="flex gap-2 mb-5">
              {(['card', 'bank', 'wallet'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setAddType(t)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
                    addType === t
                      ? 'bg-[#0a2012] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t === 'card' ? 'Card' : t === 'bank' ? 'Bank' : 'Wallet'}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {addType === 'card' && (
                <>
                  <input
                    placeholder="Card Number"
                    className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      placeholder="MM/YY"
                      className="input-field px-4 py-3 rounded-xl text-sm bg-gray-50"
                    />
                    <input
                      placeholder="CVV"
                      className="input-field px-4 py-3 rounded-xl text-sm bg-gray-50"
                    />
                  </div>
                  <input
                    placeholder="Cardholder Name"
                    className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
                  />
                </>
              )}
              {addType === 'bank' && (
                <>
                  <input
                    placeholder="Bank Name"
                    className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
                  />
                  <input
                    placeholder="Account Number"
                    className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
                  />
                  <input
                    placeholder="Routing Number"
                    className="input-field w-full px-4 py-3 rounded-xl text-sm bg-gray-50"
                  />
                </>
              )}
              {addType === 'wallet' && (
                <div className="py-4 text-center text-gray-500 text-sm">
                  Your TheSendMoney wallet is already set up.
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 py-3 bg-[#0a2012] text-white rounded-xl text-sm font-semibold hover:bg-[#166634] transition"
              >
                Add Method
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
