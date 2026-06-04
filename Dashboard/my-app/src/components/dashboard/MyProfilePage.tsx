'use client';

import React, { useState } from 'react';
import { Edit2, Camera, Save, X, User } from 'lucide-react';
import { mockUser } from '@/src/lib/data';

export default function MyProfilePage() {
  const [editing, setEditing] = useState<string | null>(null);
  const [values, setValues] = useState({ ...mockUser });

  const fields = [
    { id: 'userId', label: 'User ID', editable: false },
    { id: 'name', label: 'Name', editable: true },
    { id: 'phone', label: 'Phone', editable: true },
    { id: 'dob', label: 'Date of Birth', editable: true },
    { id: 'nid', label: 'Smart Card / NID / Passport', editable: true },
    { id: 'address', label: 'Address', editable: true },
    { id: 'country', label: 'Country', editable: true },
    { id: 'email', label: 'Email', editable: true },
  ];

  return (
    <div className="page-enter p-4 lg:p-6">
      <div className="w-full mx-auto">
        <div className="stagger-1 flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center">
            <User size={18} className="text-[#166634]" />
          </div>
          <h2
            className="text-xl font-bold text-gray-800"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            My Profile
          </h2>
        </div>

        <div className="stagger-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Avatar section */}
          <div className="bg-gradient-to-r from-[#0a2012] to-[#166634] px-6 py-8 flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7ffe4a] to-[#4ade80] flex items-center justify-center text-3xl font-bold text-[#0a2012] shadow-xl">
                JR
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition">
                <Camera size={14} className="text-gray-600" />
              </button>
            </div>
            <h3
              className="text-white font-bold text-lg mt-3"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {values.name}
            </h3>
            <span className="text-[#7ffe4a] text-xs font-medium mt-1 flex items-center gap-1">
              ✓ Verified Account
            </span>
          </div>

          {/* Fields */}
          <div className="divide-y divide-gray-50">
            {fields.map((field, i) => {
              const val = values[field.id as keyof typeof values];
              const isEditing = editing === field.id;

              return (
                <div
                  key={field.id}
                  className={`flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition stagger-${Math.min(i + 3, 6)}`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-[#0a2012] text-[#7ffe4a] flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 font-medium">
                        {field.label}
                      </p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={String(val)}
                          onChange={e =>
                            setValues(v => ({
                              ...v,
                              [field.id]: e.target.value,
                            }))
                          }
                          className="mt-1 w-full text-sm border border-[#166634] rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#166634]/20"
                          autoFocus
                        />
                      ) : (
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {String(val)}
                        </p>
                      )}
                    </div>
                  </div>

                  {field.editable && (
                    <div className="ml-3 flex items-center gap-1 flex-shrink-0">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => setEditing(null)}
                            className="p-1.5 rounded-lg hover:bg-green-100 text-green-600 transition"
                            title="Save"
                          >
                            <Save size={14} />
                          </button>
                          <button
                            onClick={() => setEditing(null)}
                            className="p-1.5 rounded-lg hover:bg-red-100 text-red-400 transition"
                            title="Cancel"
                          >
                            <X size={14} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditing(field.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#166634] transition"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
