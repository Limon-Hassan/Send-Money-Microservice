"use client";

import React, { useState } from "react";
import {
  Settings,
  Shield,
  Lock,
  Monitor,
  Bell,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SettingsPage() {
  const [twoFA, setTwoFA] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
  });
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [showPin, setShowPin] = useState(false);

  return (
    <div className="page-enter p-4 lg:p-6">
      <div className="w-full mx-auto">
        <div className="stagger-1 flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center">
            <Settings size={18} className="text-[#166634]" />
          </div>
          <h2
            className="text-xl font-bold text-gray-800"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Settings & Privacy
          </h2>
        </div>

        <div className="space-y-4">
          <div className="stagger-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                <Shield size={16} className="text-[#166634]" /> Security
              </h3>
            </div>

            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                  <Shield size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Two-Factor Authentication
                  </p>
                  <p className="text-xs text-gray-400">
                    Add extra security to your account
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium ${
                    twoFA ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {twoFA ? "Enabled" : "Disabled"}
                </span>
                <button
                  onClick={() => setTwoFA(!twoFA)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    twoFA ? "bg-[#166634]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                      twoFA ? "left-5.5 translate-x-5" : "left-0.5"
                    }`}
                    style={{ left: twoFA ? "2px" : "2px" }}
                  />
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Lock size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Password Change
                  </p>
                  <p className="text-xs text-gray-400">
                    Last changed 30 days ago
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>

            {/* Devices */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Monitor size={16} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Device Management
                  </p>
                  <p className="text-xs text-gray-400">
                    Manage trusted devices
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-medium">
                  3 Devices
                </span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>

            {/* Transaction PIN */}
            <div
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition cursor-pointer"
              onClick={() => setShowPinModal(true)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Lock size={16} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Transaction PIN
                  </p>
                  <p className="text-xs text-gray-400">
                    4-digit PIN for transactions
                  </p>
                </div>
              </div>
              <span className="text-xs text-[#166634] font-semibold">Set</span>
            </div>
          </div>

          {/* Notifications */}
          <div className="stagger-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                <Bell size={16} className="text-[#166634]" /> Notifications
              </h3>
            </div>
            {(
              [
                { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                { key: "sms", label: "SMS Notifications", desc: "Receive SMS alerts" },
                { key: "push", label: "Push Notifications", desc: "In-app notifications" },
              ] as const
            ).map((n) => (
              <div
                key={n.key}
                className="flex items-center justify-between px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {n.label}
                  </p>
                  <p className="text-xs text-gray-400">{n.desc}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [n.key]: !prev[n.key],
                    }))
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    notifications[n.key] ? "bg-[#166634]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                    style={{ left: notifications[n.key] ? "22px" : "2px" }}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Privacy */}
          <div className="stagger-4 bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <Eye size={16} className="text-[#166634]" /> Privacy
            </h3>
            <div className="space-y-2">
              {["View Privacy Policy", "Data Export Request", "Delete Account"].map((item, i) => (
                <button
                  key={item}
                  className={`w-full text-left text-sm px-4 py-3 rounded-xl border transition flex items-center justify-between ${
                    i === 2
                      ? "border-red-100 text-red-500 hover:bg-red-50"
                      : "border-gray-100 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item}
                  <ChevronRight size={14} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop"
          onClick={() => setShowPinModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="font-bold text-gray-800 mb-2"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Set Transaction PIN
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Enter a 4-digit PIN for authorizing transactions
            </p>
            <div className="flex gap-3 justify-center mb-6">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type={showPin ? "text" : "password"}
                  maxLength={1}
                  value={pin[i]}
                  onChange={(e) => {
                    const newPin = [...pin];
                    newPin[i] = e.target.value;
                    setPin(newPin);
                  }}
                  className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-[#166634] focus:outline-none focus:ring-2 focus:ring-[#166634]/20 transition"
                />
              ))}
            </div>
            <button
              onClick={() => setShowPin(!showPin)}
              className="flex items-center gap-1.5 text-xs text-gray-400 mx-auto mb-4"
            >
              {showPin ? <EyeOff size={14} /> : <Eye size={14} />}
              {showPin ? "Hide" : "Show"} PIN
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-3 bg-[#0a2012] text-white rounded-xl text-sm font-semibold hover:bg-[#166634] transition"
              >
                Set PIN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
