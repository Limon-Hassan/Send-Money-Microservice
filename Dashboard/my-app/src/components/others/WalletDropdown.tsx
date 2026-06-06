'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, Search } from 'lucide-react';

interface Wallet {
  name: string;
  icon: string;
}

interface WalletDropdownProps {
  wallets: Wallet[];
  value: string;
  onChange: (value: string) => void;
}

export default function WalletDropdown({
  wallets,
  value,
  onChange,
}: WalletDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedWallet = wallets.find(wallet => wallet.name === value);

  const filteredWallets = useMemo(() => {
    return wallets.filter(wallet =>
      wallet.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [wallets, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-white flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {selectedWallet ? (
            <>
              <Image
                src={selectedWallet.icon}
                alt={selectedWallet.name}
                width={30}
                height={30}
              />
              <span className="text-sm text-gray-700">
                {selectedWallet.name}
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-400">
              Select wallet provider
            </span>
          )}
        </div>

        <ChevronDown
          size={16}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search wallet..."
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredWallets.map(wallet => (
              <button
                key={wallet.name}
                type="button"
                onClick={() => {
                  onChange(wallet.name);
                  setOpen(false);
                  setSearch('');
                }}
                className="w-full px-3 py-3 flex items-center gap-3 hover:bg-gray-50 transition"
              >
                <Image
                  src={wallet.icon}
                  alt={wallet.name}
                  width={30}
                  height={30}
                />

                <span className="text-sm text-gray-700">{wallet.name}</span>
              </button>
            ))}

            {filteredWallets.length === 0 && (
              <div className="p-4 text-sm text-gray-400 text-center">
                No wallet found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
