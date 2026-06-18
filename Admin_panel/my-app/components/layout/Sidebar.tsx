"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  UserCheck,
  Wallet,
  RefreshCw,
  CreditCard,
  ShoppingBag,
  Building2,
  UsersRound,
  Landmark,
  Shield,
  TrendingUp,
  BarChart2,
  Headphones,
  MonitorCog,
  Settings,
  ChevronDown,
  Send,
  LucideIcon,
} from "lucide-react";
import clsx from "clsx";


type SubItem = {
  href: string;
  label: string;
};

type NavItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  sub?: SubItem[];
};

type NavGroup = {
  section: string;
  items: NavItem[];
};


const nav: NavGroup[] = [
  {
    section: "",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    ],
  },
  {
    section: "CORE OPERATIONS",
    items: [
      {
        label: "Customers",
        icon: Users,
        sub: [
          { href: "/customers", label: "Customer List" },
          { href: "/customers/add", label: "Add Customer" },
          { href: "/customers/kyc", label: "KYC Status" },
          { href: "/customers/wallets", label: "Wallet Balance" },
          { href: "/customers/transactions", label: "Transaction History" },
          { href: "/customers/documents", label: "Documents" },
          { href: "/customers/notes", label: "Notes" },
        ],
      },
      {
        label: "Transactions",
        icon: ArrowLeftRight,
        sub: [
          { href: "/transactions/all", label: "All Transactions" },
          { href: "/transactions/pending", label: "Pending" },
          { href: "/transactions/completed", label: "Completed" },
          { href: "/transactions/failed", label: "Failed" },
          { href: "/transactions/refund", label: "Refund Requests" },
          { href: "/transactions/details", label: "Transaction Details" },
        ],
      },
      {
        label: "Beneficiaries",
        icon: UserCheck,
        sub: [
          { href: "/beneficiaries", label: "Receiver List" },
          { href: "/beneficiaries/add", label: "Add Beneficiary" },
        ],
      },
      {
        label: "Wallets",
        icon: Wallet,
        sub: [
          { href: "/wallets", label: "Wallet Overview" },
          { href: "/wallets/deposits", label: "Deposit History" },
          { href: "/wallets/withdrawals", label: "Withdrawal History" },
        ],
      },
      {
        label: "Exchange Rates",
        icon: RefreshCw,
        sub: [
          { href: "/exchange-rates", label: "Live Rates" },
          { href: "/exchange-rates/override", label: "Manual Override" },
          { href: "/exchange-rates/spread", label: "Spread Management" },
        ],
      },
      {
        label: "Payment Methods",
        icon: CreditCard,
        sub: [
          { href: "/payment-methods", label: "Overview" },
          { href: "/payment-methods/bank-transfer", label: "Bank Transfer" },
          { href: "/payment-methods/mobile-wallet", label: "Mobile Wallet" },
          { href: "/payment-methods/cash-pickup", label: "Cash Pickup" },
          { href: "/payment-methods/card-payments", label: "Card Payments" },
        ],
      },
    ],
  },
  {
    section: "OPERATIONS",
    items: [
      {
        label: "Cash Pickup",
        icon: ShoppingBag,
        sub: [
          { href: "/cash-pickup", label: "Dashboard" },
          { href: "/cash-pickup/all", label: "All Requests" },
          { href: "/cash-pickup/add", label: "Add New Request" },
          { href: "/cash-pickup/pending", label: "Pending Requests" },
          { href: "/cash-pickup/approved", label: "Approved Requests" },
          { href: "/cash-pickup/completed", label: "Completed Requests" },
          { href: "/cash-pickup/cancelled", label: "Cancelled Requests" },
          { href: "/cash-pickup/agents", label: "Agents" },
        ],
      },
      {
        label: "Management",
        icon: Building2,
        sub: [
          { href: "/management", label: "Overview" },
          { href: "/management/countries", label: "Countries & Corridors" },
          { href: "/management/agents", label: "Agents & Branches" },
          { href: "/management/rates", label: "Exchange Rates" },
          { href: "/management/fees", label: "Fees & Charges" },
        ],
      },
      {
        label: "Agents & Partners",
        icon: UsersRound,
        sub: [
          { href: "/agents", label: "Agent List" },
          { href: "/agents/add", label: "Add Agent" },
          { href: "/agents/branches", label: "Branches" },
          { href: "/agents/partners", label: "Partner List" },
          { href: "/agents/commission", label: "Commission" },
        ],
      },
    ],
  },
  {
    section: "FINANCE & RISK",
    items: [
      {
        label: "Banking & Cards",
        icon: Landmark,
        sub: [
          { href: "/banking", label: "International Banks" },
          { href: "/banking/corridors", label: "Bank Corridors" },
          { href: "/banking/verification", label: "Bank Verification" },
          { href: "/banking/settlement", label: "Settlement Rules" },
          { href: "/banking/gateways", label: "Card Gateways" },
          { href: "/banking/card-rules", label: "Card Payment Rules" },
          { href: "/banking/fraud-filters", label: "Fraud Filters" },
          { href: "/banking/limits", label: "Transaction Limits" },
        ],
      },
      {
        label: "KYC & Compliance",
        icon: Shield,
        sub: [
          { href: "/compliance", label: "Overview" },
          { href: "/compliance/aml", label: "AML Monitoring" },
          { href: "/compliance/fraud", label: "Fraud Detection" },
          { href: "/compliance/audit", label: "Audit Logs" },
          { href: "/compliance/risk", label: "Risk Management" },
          { href: "/compliance/cases", label: "Compliance Cases" },
          { href: "/compliance/investigations", label: "Fraud Investigations" },
          { href: "/compliance/escalations", label: "Escalations" },
          { href: "/compliance/sanctions", label: "Sanctions List" },
          { href: "/compliance/pep", label: "PEP List" },
        ],
      },
      {
        label: "Revenue",
        icon: TrendingUp,
        href: "/revenue",
      },
    ],
  },
  {
    section: "ANALYTICS & SUPPORT",
    items: [
      {
        label: "Reports & Analytics",
        icon: BarChart2,
        sub: [
          { href: "/reports", label: "Overview Dashboard" },
          { href: "/reports/transactions", label: "Transactions" },
          { href: "/reports/cash-pickups", label: "Cash Pickups" },
          { href: "/reports/agents", label: "Agents Performance" },
          { href: "/reports/revenue", label: "Revenue & Finance" },
          { href: "/reports/compliance", label: "Compliance Reports" },
          { href: "/reports/customers", label: "Customer Reports" },
          { href: "/reports/system", label: "System Activity" },
          { href: "/reports/custom", label: "Custom Reports" },
          { href: "/reports/scheduled", label: "Scheduled Reports" },
          { href: "/reports/saved", label: "Saved Reports" },
          { href: "/reports/templates", label: "Report Templates" },
        ],
      },
      {
        label: "Support",
        icon: Headphones,
        sub: [
          { href: "/support", label: "Overview" },
          { href: "/support/tickets", label: "Support Tickets" },
          { href: "/support/live-chat", label: "Live Chat" },
          { href: "/support/announcements", label: "Announcements" },
          { href: "/support/knowledge-base", label: "Knowledge Base" },
          { href: "/support/quick-replies", label: "Quick Replies" },
          { href: "/support/sla", label: "SLA Management" },
          { href: "/support/agents", label: "Support Agents" },
          { href: "/support/departments", label: "Departments" },
          { href: "/support/categories", label: "Ticket Categories" },
        ],
      },
      {
        label: "CMS Management",
        icon: MonitorCog,
        sub: [
          { href: "/cms", label: "Pages" },
          { href: "/cms/banners", label: "Banners" },
          { href: "/cms/notifications", label: "Notifications" },
          { href: "/cms/email-templates", label: "Email Templates" },
          { href: "/cms/sms-templates", label: "SMS Templates" },
          { href: "/cms/promotions", label: "Promotions" },
        ],
      },
    ],
  },
  {
    section: "SYSTEM",
    items: [
      {
        label: "System Management",
        icon: Settings,
        sub: [
          { href: "/system", label: "System Overview" },
          { href: "/system/admin-users", label: "Admin Users" },
          { href: "/system/roles", label: "Roles & Permissions" },
          { href: "/system/settings", label: "System Settings" },
          { href: "/system/security", label: "Security Settings" },
          { href: "/system/notifications", label: "Notification Settings" },
          { href: "/system/activity-logs", label: "Activity Logs" },
          { href: "/system/login-attempts", label: "Login Attempts" },
          { href: "/system/health", label: "System Health" },
          { href: "/system/backup", label: "Backup & Recovery" },
        ],
      },
      {
        label: "API Management",
        icon: MonitorCog,
        sub: [
          { href: "/api", label: "Overview Dashboard" },
          { href: "/api/keys", label: "API Keys" },
          { href: "/api/scopes", label: "Access Scopes" },
          { href: "/api/endpoints", label: "Endpoints" },
          { href: "/api/webhooks", label: "Webhooks" },
          { href: "/api/rate-limiting", label: "Rate Limiting" },
          { href: "/api/logs", label: "Logs & Monitoring" },
          { href: "/api/security", label: "Security Settings" },
          { href: "/api/sandbox", label: "Sandbox / Production" },
          { href: "/api/third-party", label: "Third Party Services" },
          { href: "/api/callbacks", label: "Callback URLs" },
          { href: "/api/events", label: "Event Subscriptions" },
          { href: "/api/settings", label: "API Settings" },
          { href: "/api/gateway", label: "Gateway Settings" },
          { href: "/api/whitelist", label: "IP Whitelist" },
          { href: "/api/error-codes", label: "Error Codes" },
        ],
      },
      {
        label: "Settings",
        icon: Settings,
        href: "/settings",
      },
    ],
  },
];


interface SidebarProps {
  open: boolean;
  onClose: () => void;
}


export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("sidebar-expanded");
      if (saved) {
        setExpanded(JSON.parse(saved));
        return;
      }
    } catch { }

    
    const autoOpen: Record<string, boolean> = {};
    nav.forEach(group => {
      group.items.forEach(item => {
        if (item.sub) {
          const isActive = item.sub.some(s =>
            pathname === s.href || pathname.startsWith(s.href + '/')
          );
          if (isActive) autoOpen[item.label] = true;
        }
      });
    });
    setExpanded(autoOpen);
  }, []);  

  const toggle = (label: string) =>
    setExpanded((prev) => {
      const next = { ...prev, [label]: !prev[label] };
      try {
        sessionStorage.setItem("sidebar-expanded", JSON.stringify(next));
      } catch { }
      return next;
    });

  const isParentActive = (item: NavItem): boolean => {
    if (item.href) return pathname === item.href || pathname.startsWith(item.href + "/");
    if (item.sub) return item.sub.some((s) => pathname === s.href || pathname.startsWith(s.href + "/"));
    return false;
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 z-30 flex flex-col h-full w-55 select-none",
          "bg-[#0a2012] dark:bg-[#0d1b2e]",
          "transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >

        <div className="flex items-center gap-2.5 px-4 py-3.75 shrink-0">
          <div className="w-9 h-9 rounded-[10px] bg-[#2563eb] flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/50">
            <Send size={17} className="text-white -rotate-12" />
          </div>
          <div className="leading-none">
            <p className="text-[13.5px] font-bold text-white tracking-tight">TheSendMoney</p>
            <p className="text-[10px] text-white/40 mt-0.75">Send Smarter</p>
          </div>
        </div>

        <div className="h-px bg-white/6 mx-0 mb-1" />

        <nav
          className="flex-1 overflow-y-auto py-1
            [&::-webkit-scrollbar]:hidden
            [-ms-overflow-style:none]
            scrollbar-none"
        >
          {nav.map((group) => (
            <div key={group.section || "__top__"} className="mb-0.5">

              {group.section && (
                <p className="px-4 pt-3.5 pb-1 text-[10px] font-semibold tracking-[0.12em] uppercase text-white">
                  {group.section}
                </p>
              )}

              {group.items.map((item) => {
                const parentActive = isParentActive(item);
                const isOpen = expanded[item.label] ?? false;

                if (!item.sub) {
                  const active =
                    !!item.href &&
                    (pathname === item.href || pathname.startsWith(item.href + "/"));

                  return (
                    <Link
                      key={item.label}
                      href={item.href!}
                      onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                      className={clsx(
                        "relative flex items-center gap-2.5 px-4 py-2 text-[13px] transition-all duration-150 cursor-pointer",
                        active
                          ? "text-white font-semibold"
                          : "text-white/60 hover:text-white/90 hover:bg-white/4"
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1.75 bottom-1.75 w-0.75 rounded-r-full bg-white/80" />
                      )}
                      <item.icon
                        size={16}
                        strokeWidth={active ? 2.2 : 1.8}
                        className="shrink-0"
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                }

                return (
                  <div key={item.label}>
                    <button
                      onClick={() => toggle(item.label)}
                      className={clsx(
                        "relative w-full flex items-center gap-2.5 px-4 py-2",
                        "text-[13px] text-left transition-all duration-150",
                        parentActive
                          ? "text-white font-semibold"
                          : "text-white/80 hover:text-white/90 hover:bg-white/4"
                      )}
                    >
                      {parentActive && (
                        <span className="absolute left-0 top-1.75 bottom-1.75 w-0.75 rounded-r-full bg-white/80" />
                      )}
                      <item.icon
                        size={16}
                        strokeWidth={parentActive ? 2.2 : 1.8}
                        className="shrink-0"
                      />
                      <span className="flex-1 ">{item.label}</span>
                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        className={clsx(
                          "shrink-0 text-white transition-transform duration-300",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <div
                      className={clsx(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isOpen ? "max-h-150 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      {item.sub!.map((sub) => {
                        const subActive =
                          pathname === sub.href ||
                          pathname.startsWith(sub.href + "/");

                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => { if (window.innerWidth < 1024) onClose() }}
                            className={clsx(
                              "flex items-center gap-2 pl-10.5 pr-4 py-[6.5px]",
                              "text-[13px] transition-all duration-300 ease-in-out ",
                              subActive
                                ? "text-white font-medium"
                                : "text-white/60 hover:text-white/75 hover:bg-white/3"
                            )}
                          >
                            <span
                              className={clsx(
                                "w-1.25 h-1.25 rounded-full shrink-0 transition-colors duration-300 ease-in-out",
                                subActive ? "bg-white/90" : "bg-white/20"
                              )}
                            />
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          <div className="h-4" />
        </nav>

        <div className="shrink-0 border-t border-white/[0.07]">

          <div className="flex items-center gap-2.5 px-4 py-2.5">
            <div className="w-8 h-8 rounded-full bg-white/[0.07] flex items-center justify-center shrink-0">
              <Headphones size={15} className="text-white/50" />
            </div>
            <div className="leading-none">
              <p className="text-[11.5px] font-semibold text-white/75">Need Help?</p>
              <p className="text-[10px] text-white/35 mt-0.5">Contact Support</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2.75 border-t border-white/6">
            <div className="w-8.5 h-8.5 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0 shadow-md shadow-blue-900/40">
              <span className="text-white text-[11px] font-bold">AC</span>
            </div>
            <div className="flex-1 min-w-0 leading-none">
              <p className="text-[12px] font-semibold text-white truncate">Amar Chowdhury</p>
              <p className="text-[10px] text-white/35 mt-0.5">Super Admin</p>
            </div>
            <button className="text-white/25 hover:text-white/65 transition-colors shrink-0 ml-auto">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}