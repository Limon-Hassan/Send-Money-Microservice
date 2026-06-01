"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { NavItem } from "@/types";

interface LogoutPageProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LogoutPage({ onCancel, onConfirm }: LogoutPageProps) {
  return (
    <div className="page-enter p-4 lg:p-6 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-sm w-full">
        <div className="stagger-1 bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="6" y="4" width="24" height="40" rx="4" fill="#6366f1" opacity="0.2" />
                <rect x="8" y="6" width="20" height="36" rx="3" fill="#6366f1" opacity="0.4" />
                <rect x="10" y="8" width="16" height="32" rx="2" fill="#6366f1" />
                <path
                  d="M30 20 L44 24 L30 28"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M44 24 H22"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <h2
            className="text-xl font-bold text-gray-800 mb-2"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Are you sure you want to logout?
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            You will be signed out from this device.
          </p>

          <div className="space-y-3">
            <button
              onClick={onConfirm}
              className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
            <button
              onClick={onCancel}
              className="w-full py-4 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="stagger-2 mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <div className="w-8 h-8 rounded-lg bg-[#0a2012] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7ffe4a" strokeWidth="2">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </div>
            <p
              className="text-sm font-semibold"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Thank you for using TheSendMoney
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Fast • Secure • Reliable Money Transfer
          </p>
        </div>
      </div>
    </div>
  );
}
