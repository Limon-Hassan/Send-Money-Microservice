"use client";

import React from "react";
import { ShieldCheck, FileText, ScanFace, MapPin, CheckCircle } from "lucide-react";

export default function KYCPage() {
  const steps = [
    {
      icon: FileText,
      title: "Passport / Driving / NID Upload",
      subtitle: "NID Uploaded",
      done: true,
    },
    {
      icon: ScanFace,
      title: "Face Verification",
      subtitle: "Verified",
      done: true,
    },
    {
      icon: MapPin,
      title: "Address Verification",
      subtitle: "Verified",
      done: true,
    },
  ];

  return (
    <div className="page-enter p-4 lg:p-6">
      <div className="w-full mx-auto">
        <div className="stagger-1 flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center">
            <ShieldCheck size={18} className="text-[#166634]" />
          </div>
          <div>
            <h2
              className="text-xl font-bold text-gray-800"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              KYC & Verification
            </h2>
            <p className="text-xs text-gray-400">
              Complete your identity verification
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`stagger-${i + 2} bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 card-hover`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  step.done ? "bg-green-50" : "bg-gray-100"
                }`}
              >
                <step.icon
                  size={22}
                  className={step.done ? "text-[#166634]" : "text-gray-400"}
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">
                  {step.title}
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    step.done ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {step.subtitle}
                </p>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.done ? "bg-green-500" : "bg-gray-200"
                }`}
              >
                <CheckCircle
                  size={16}
                  className={step.done ? "text-white" : "text-gray-400"}
                />
              </div>
            </div>
          ))}

          {/* Status card */}
          <div className="stagger-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto shadow-lg shadow-green-200">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <h3
              className="text-xl font-bold text-green-700 mt-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Verification Status
            </h3>
            <div className="mt-2 inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-700 font-bold text-lg">Verified</span>
            </div>
            <p className="text-green-600 text-sm mt-2">
              Your account is fully verified.
            </p>
          </div>

          {/* Info box */}
          <div className="stagger-6 bg-white rounded-2xl border border-gray-100 p-5">
            <h4
              className="font-semibold text-gray-800 mb-3"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Why verification matters?
            </h4>
            <div className="space-y-2">
              {[
                "Protects your account from unauthorized access",
                "Enables higher transfer limits",
                "Complies with international financial regulations",
                "Faster processing of your transactions",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
