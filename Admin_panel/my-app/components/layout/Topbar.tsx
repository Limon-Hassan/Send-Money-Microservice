"use client";
import { Menu, Search, Calendar, Download, Sun, Moon, Bell, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-[220px] z-10 h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 gap-3">
      {/* Mobile menu */}
      <button onClick={onMenuClick} className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex-1 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5 max-w-md">
        <Search size={15} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search for users, transactions, tickets..."
          className="bg-transparent text-sm text-gray-600 dark:text-gray-300 placeholder-gray-400 outline-none flex-1 min-w-0"
        />
        <span className="text-xs text-gray-400 hidden sm:block">Ctrl + K</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Date range */}
        <button className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors">
          <Calendar size={14} />
          <span className="whitespace-nowrap">May 6 – May 12, 2025</span>
        </button>

        {/* Export */}
        <button className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors">
          <Download size={14} />
          <span>Export</span>
          <ChevronDown size={13} />
        </button>

        {/* Dark mode */}
        <button
          onClick={toggle}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notifications */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Bell size={17} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            13
          </span>
        </button>

        {/* Admin */}
        <button className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold">
            AR
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-none">Admin Rahman</div>
            <div className="text-[10px] text-gray-500">Super Admin</div>
          </div>
          <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
