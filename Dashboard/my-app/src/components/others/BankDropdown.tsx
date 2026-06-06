import Image from 'next/image';
import { ChevronDown, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Bank {
  name: string;
  icon: string;
}

interface Props {
  banks: Bank[];
  value: string;
  onChange: (value: string) => void;
}

export default function BankDropdown({ banks, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selectedBank = banks.find(bank => bank.name === value);

  const filteredBanks = useMemo(() => {
    return banks.filter(bank =>
      bank.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [banks, search]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-11.5 border border-gray-200 rounded-lg bg-white px-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {selectedBank && (
            <Image
              src={selectedBank.icon}
              alt={selectedBank.name}
              width={22}
              height={22}
              className="rounded-full object-cover"
            />
          )}

          <span className="text-sm text-gray-700">{selectedBank?.name}</span>
        </div>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl">
          <div className="p-3 border-b">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search bank..."
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filteredBanks.length === 0 ? (
              <div className="p-3 text-center text-sm text-gray-500">
                No banks found.
              </div>
            ) : (
              filteredBanks.map(bank => (
                <button
                  key={bank.name}
                  type="button"
                  onClick={() => {
                    onChange(bank.name);
                    setOpen(false);
                  }}
                  className="w-full px-3 py-3 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Image
                    src={bank.icon}
                    alt={bank.name}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />

                  <span className="text-sm text-gray-700">{bank.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
