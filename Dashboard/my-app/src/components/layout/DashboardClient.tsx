'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/src/components/layout/Sidebar';
import Header from '@/src/components/layout/Header';
import DashboardPage from '@/src/components/dashboard/DashboardPage';
import SendMoneyPage from '@/src/components/dashboard/SendMoneyPage';
import MyProfilePage from '@/src/components/dashboard/MyProfilePage';
import KYCPage from '@/src/components/dashboard/KYCPage';
import SettingsPage from '@/src/components/dashboard/SettingsPage';
import PaymentMethodsPage from '@/src/components/dashboard/PaymentMethodsPage';
import TransactionsPage from '@/src/components/dashboard/TransactionsPage';
import LogoutPage from '@/src/components/dashboard/LogoutPage';
import { NavItem } from '@/types';

const pageTitles: Record<NavItem, string> = {
  dashboard: 'Dashboard',
  'send-money': 'Send Money',
  'my-profile': 'My Profile',
  'kyc-verification': 'KYC & Verification',
  'settings-privacy': 'Settings & Privacy',
  'payment-methods': 'Payment Methods',
  'transactions-history': 'Transactions History',
  logout: 'Logout',
};

export default function DashboardClient() {
  const [activePage, setActivePage] = useState<NavItem>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleNavigate = (page: NavItem) => {
    setActivePage(page);
    setRenderKey(k => k + 1);
    setMobileOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'send-money':
        return <SendMoneyPage />;
      case 'my-profile':
        return <MyProfilePage />;
      case 'kyc-verification':
        return <KYCPage />;
      case 'settings-privacy':
        return <SettingsPage />;
      case 'payment-methods':
        return <PaymentMethodsPage />;
      case 'transactions-history':
        return <TransactionsPage />;
      case 'logout':
        return (
          <LogoutPage
            onCancel={() => handleNavigate('dashboard')}
            onConfirm={() => handleNavigate('dashboard')}
          />
        );
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  const sidebarWidth = collapsed ? 72 : 300;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        active={activePage}
        onNavigate={handleNavigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div
        className="flex flex-col min-h-screen flex-1 overflow-hidden"
        style={{
          marginLeft: isDesktop ? sidebarWidth : 0,
          transition: 'margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Header
          onMenuToggle={() => setMobileOpen(true)}
          pageTitle={pageTitles[activePage]}
        />
        <main className="flex-1 overflow-auto" key={renderKey}>
          {renderPage()}
        </main>

        <footer className="text-center py-3 text-xs text-gray-400 border-t border-gray-100 bg-white flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded bg-[#0a2012] flex items-center justify-center">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7ffe4a"
              strokeWidth="2.5"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </div>
          TheSendMoney &copy; 2025 — Fast • Secure • Reliable
        </footer>
      </div>
    </div>
  );
}
