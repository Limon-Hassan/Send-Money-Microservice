"use client";

import React, { useState } from "react";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { mockUser } from "@/lib/data";

interface HeaderProps {
  onMenuToggle: () => void;
  pageTitle: string;
}

export default function Header({ onMenuToggle, pageTitle }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30 shadow-sm">
      <button
        onClick={onMenuToggle}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition text-gray-600"
      >
        <Menu size={20} />
      </button>

      <h1
        className="text-[16px] md:text-[18px] font-semibold text-gray-800 hidden sm:block"
        style={{ fontFamily: "Syne, sans-serif" }}
      >
        {pageTitle}
      </h1>

      <div className="hidden lg:flex flex-1 max-w-xs ml-4">
        <div className="relative w-full">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800/40 transition"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition text-gray-600"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-800">
                  Notifications
                </span>
                <span className="text-xs text-[#166534] font-medium cursor-pointer">
                  Mark all read
                </span>
              </div>
              {[
                {
                  msg: "Transfer #TSM12345678 completed",
                  time: "2 min ago",
                  unread: true,
                },
                {
                  msg: "Your KYC has been verified",
                  time: "1 hour ago",
                  unread: true,
                },
                {
                  msg: "New login from Chrome, Dhaka",
                  time: "Yesterday",
                  unread: false,
                },
              ].map((n, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 flex gap-3 items-start hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition ${
                    n.unread ? "bg-green-50/50" : ""
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      n.unread ? "bg-[#166534]" : "bg-gray-300"
                    }`}
                  />
                  <div>
                    <p className="text-sm text-gray-700">{n.msg}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#166534] to-[#0a2012] flex items-center justify-center text-white text-sm font-bold">
              JR
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">
              {mockUser.name}
            </span>
            <ChevronDown size={14} className="text-gray-400 hidden md:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-sm text-gray-800">
                  {mockUser.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{mockUser.email}</p>
              </div>
              {["My Profile", "Settings", "Help"].map((item) => (
                <button
                  key={item}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition"
                >
                  {item}
                </button>
              ))}
              <div className="border-t border-gray-100">
                <button className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 transition">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {(notifOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setNotifOpen(false);
            setProfileOpen(false);
          }}
        />
      )}
    </header>
  );
}
