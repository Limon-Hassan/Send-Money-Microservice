"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BarChart2, Users, ShieldCheck, Wallet, Users2, Ban,
  List, Clock, CheckCircle, XCircle, AlertTriangle,
  Building2, Smartphone, MapPin, CreditCard,
  Globe, GitBranch, RefreshCw, DollarSign,
  Search, Flag, FileText, AlertOctagon,
  Ticket, MessageSquare, Megaphone,
  LineChart, UserCog, Lock, Settings, Cpu,
  HelpCircle, ChevronDown, ChevronRight, X
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const nav = [
  { section: "MAIN", items: [
    { href: "/dashboard",   label: "Dashboard",  icon: LayoutDashboard },
    { href: "/analytics",   label: "Analytics",  icon: BarChart2 },
  ]},
  { section: "CUSTOMERS", items: [
    { href: "/users",        label: "Users",            icon: Users },
    { href: "/kyc",          label: "KYC Verification", icon: ShieldCheck, badge: 124 },
    { href: "/wallets",      label: "User Wallets",      icon: Wallet },
    { href: "/beneficiaries",label: "Beneficiaries",    icon: Users2 },
    { href: "/blacklist",    label: "Blacklist",         icon: Ban },
  ]},
  { section: "TRANSACTIONS", items: [
    { href: "/transactions/all",       label: "All Transactions", icon: List },
    { href: "/transactions/pending",   label: "Pending",          icon: Clock, badge: 31 },
    { href: "/transactions/completed", label: "Completed",        icon: CheckCircle },
    { href: "/transactions/failed",    label: "Failed / Refunded",icon: XCircle },
    { href: "/transactions/disputes",  label: "Disputes",         icon: AlertTriangle },
  ]},
  { section: "PAYMENT METHODS", items: [
    { href: "/payments/bank-transfer",  label: "Bank Transfer",  icon: Building2 },
    { href: "/payments/mobile-wallet",  label: "Mobile Wallet",  icon: Smartphone },
    { href: "/payments/cash-pickup",    label: "Cash Pickup",    icon: MapPin },
    { href: "/payments/card-payments",  label: "Card Payments",  icon: CreditCard },
  ]},
  { section: "MANAGEMENT", items: [
    { href: "/management/countries",     label: "Countries & Corridors", icon: Globe },
    { href: "/management/agents",        label: "Agents & Branches",     icon: GitBranch },
    { href: "/management/exchange-rates",label: "Exchange Rates",        icon: RefreshCw },
    { href: "/management/fees",          label: "Fees & Charges",        icon: DollarSign },
  ]},
  { section: "COMPLIANCE", items: [
    { href: "/compliance/aml",   label: "AML Monitoring",  icon: Search, badge: 8 },
    { href: "/compliance/fraud", label: "Fraud Detection", icon: Flag },
    { href: "/compliance/audit", label: "Audit Logs",      icon: FileText },
    { href: "/compliance/risk",  label: "Risk Management", icon: AlertOctagon },
  ]},
  { section: "SUPPORT", items: [
    { href: "/support/tickets",       label: "Support Tickets",  icon: Ticket, badge: 12 },
    { href: "/support/live-chat",     label: "Live Chat",         icon: MessageSquare },
    { href: "/support/announcements", label: "Announcements",     icon: Megaphone },
  ]},
  { section: "REPORTS", items: [
    { href: "/reports", label: "Reports & Analytics", icon: LineChart },
  ]},
  { section: "SYSTEM", items: [
    { href: "/system/admin-users", label: "Admin Users",       icon: UserCog },
    { href: "/system/roles",       label: "Roles & Permissions",icon: Lock },
    { href: "/system/settings",    label: "System Settings",   icon: Settings },
    { href: "/system/api-management",label: "API Management",  icon: Cpu },
  ]},
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      <aside className={clsx(
        "fixed top-0 left-0 h-full z-30 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 w-[220px]",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-white leading-none">TheSendMoney</div>
              <div className="text-[10px] text-gray-500">Admin Panel</div>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {nav.map((group) => (
            <div key={group.section} className="mb-1">
              <p className="px-2 py-1 text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {group.section}
              </p>
              {group.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      "flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors mb-0.5",
                      active
                        ? "bg-brand text-white font-medium"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                    )}
                  >
                    <item.icon size={15} className="flex-shrink-0" />
                    <span className="flex-1 truncate">{item.label}</span>
                    {"badge" in item && item.badge && (
                      <span className={clsx(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                        active ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-gray-200 dark:border-gray-800">
          <Link href="/support/tickets" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand">
            <HelpCircle size={15} />
            <div>
              <div className="font-medium text-gray-700 dark:text-gray-300 text-xs">Need Help?</div>
              <div className="text-[10px]">Contact Support</div>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
