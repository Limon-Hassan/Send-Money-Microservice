"use client";

import React from "react";
import {
  LayoutDashboard,
  Send,
  User,
  ShieldCheck,
  Settings,
  CreditCard,
  History,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { NavItem } from "@/types";

interface SidebarProps {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const navItems: {
  id: NavItem;
  label: string;
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "send-money", label: "Send Money", icon: Send },
  { id: "my-profile", label: "My Profile", icon: User },
  { id: "kyc-verification", label: "KYC & Verification", icon: ShieldCheck },
  { id: "settings-privacy", label: "Settings & Privacy", icon: Settings },
  { id: "payment-methods", label: "Payment Methods", icon: CreditCard },
  {
    id: "transactions-history",
    label: "Transactions History",
    icon: History,
  },
];

export default function Sidebar({
  active,
  onNavigate,
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const handleNav = (id: NavItem) => {
    onNavigate(id);
    onMobileClose();
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          flex flex-col
          sidebar-transition
          bg-[#0a2012]
          shadow-2xl
          ${collapsed ? "w-[72px]" : "w-[300px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ minHeight: "100vh" }}
      >
        <div
          className={`flex items-center h-16 px-4 border-b border-white/10 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#7ffe4a] flex items-center justify-center flex-shrink-0">
                <Send size={16} className="text-[#0a2012]" />
              </div>
              <span
                className="font-display font-700 text-white text-[17px] whitespace-nowrap"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 700 }}
              >
                TheSendMoney
              </span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-[#7ffe4a] flex items-center justify-center">
              <Send size={16} className="text-[#0a2012]" />
            </div>
          )}

          {mobileOpen && !collapsed && (
            <button
              onClick={onMobileClose}
              className="md:hidden text-white/60 hover:text-white transition"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                title={collapsed ? label : undefined}
                className={`
                  nav-item w-full flex items-center gap-3 px-4 py-3 rounded-none
                  text-left transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? "active bg-[#7ffe4a]/10 text-[#7ffe4a]"
                      : "text-white/70 hover:text-white"
                  }
                  ${collapsed ? "justify-center px-0" : ""}
                `}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 transition-colors ${
                    isActive ? "text-[#7ffe4a]" : ""
                  }`}
                />
                {!collapsed && (
                  <span
                    className="text-[14px] font-medium whitespace-nowrap overflow-hidden"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {label}
                  </span>
                )}
                {!collapsed && isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7ffe4a]" />
                )}
              </button>
            );
          })}
        </nav>

     
        <div className="border-t border-white/10 py-2">
          <button
            onClick={() => handleNav("logout")}
            className={`
              nav-item w-full flex items-center gap-3 px-4 py-3
              text-red-400 hover:text-red-300 hover:bg-red-500/10
              transition-all duration-200
              ${collapsed ? "justify-center px-0" : ""}
            `}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!collapsed && (
              <span
                className="text-[14px] font-medium"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                Logout
              </span>
            )}
          </button>
        </div>

        
        <button
          onClick={onToggle}
          className="hidden md:flex absolute -right-3 top-20 w-6 h-6 rounded-full
            bg-[#166534] border-2 border-white/20 items-center justify-center
            hover:bg-[#7ffe4a] hover:border-[#7ffe4a] transition-all duration-200
            text-white hover:text-[#0a2012] shadow-lg"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>
    </>
  );
}
