'use client';
import { useState, useMemo, useEffect } from 'react';
import {
  Search, Filter, ChevronLeft, ChevronRight,
  X, Send, Edit2, Trash2, ChevronDown,
  MoreVertical, Users, CheckCircle, AlertCircle, UserPlus,
} from 'lucide-react';

import { flagForCountryName } from '@/lib/countries_data';


function CountryFlag({ country, size = 'w-4 h-4' }: { country: string; size?: string }) {
  return (
    <img
      src={flagForCountryName(country)}
      alt={country}
      className={`${size} rounded-full object-cover inline-block shrink-0`}
    />
  );
}



type BeneficiaryStatus = 'Active' | 'Inactive' | 'Pending';

interface Beneficiary {
  id: string; name: string; email: string; phone: string; avatar: string;
  country: string; countryFlag: string; bankName: string; bankBranch: string;
  accountNumber: string; routingNumber: string; swiftCode: string;
  accountType: string; iban?: string; currency: string; currencyName: string;
  status: BeneficiaryStatus; addedOn: string; addedTime: string;
  dateOfBirth: string; address: string; preferredCurrency: string;
  purpose: string; relationship: string; lastTransaction: string;
  totalTransactions: number; totalReceived: string;
}

const beneficiariesData: Beneficiary[] = [
  { id: 'BEN-001', name: 'Rahim Uddin', email: 'rahim.uddin@example.com', phone: '+880 1712 345678', avatar: 'RU', country: 'Bangladesh', countryFlag: '🇧🇩', bankName: 'Eastern Bank Ltd.', bankBranch: 'Dhanmondi Branch', accountNumber: '1234 5678 9012', routingNumber: '055263', swiftCode: 'EBLDBDDH', accountType: 'Savings Account', currency: 'BDT', currencyName: 'Bangladeshi Taka', status: 'Active', addedOn: 'May 12, 2025', addedTime: '2:30 PM', dateOfBirth: 'May 20, 1990', address: 'House 12, Road 5, Dhanmondi, Dhaka 1205', preferredCurrency: 'BDT - Bangladeshi Taka', purpose: 'Family Support', relationship: 'Family', lastTransaction: 'May 12, 2025', totalTransactions: 12, totalReceived: '৳125,450.00' },
  { id: 'BEN-002', name: 'Maria Santos', email: 'maria.santos@example.com', phone: '+63 917 123 4567', avatar: 'MS', country: 'Philippines', countryFlag: '🇵🇭', bankName: 'BDO Unibank, Inc.', bankBranch: 'Makati Branch', accountNumber: '0012 3456 7890', routingNumber: 'BNORPHMM', swiftCode: 'BNORPHMM', accountType: 'Savings Account', currency: 'PHP', currencyName: 'Philippine Peso', status: 'Active', addedOn: 'May 12, 2025', addedTime: '10:15 AM', dateOfBirth: 'March 14, 1988', address: '45 Ayala Avenue, Makati City, Manila', preferredCurrency: 'PHP - Philippine Peso', purpose: 'Family Support', relationship: 'Friend', lastTransaction: 'May 11, 2025', totalTransactions: 8, totalReceived: '₱98,200.00' },
  { id: 'BEN-003', name: 'Arif Khan', email: 'arif.khan@example.com', phone: '+92 301 2345678', avatar: 'AK', country: 'Pakistan', countryFlag: '🇵🇰', bankName: 'Meezan Bank', bankBranch: 'Karachi Branch', accountNumber: 'PK12 MEZN 0001', routingNumber: '2345 6789 01', swiftCode: 'MEZNPKKA', accountType: 'Current Account', iban: 'PK12MEZN0001234567890', currency: 'PKR', currencyName: 'Pakistani Rupee', status: 'Active', addedOn: 'May 11, 2025', addedTime: '6:45 PM', dateOfBirth: 'July 8, 1992', address: 'Plot 22, Block B, Gulshan-e-Iqbal, Karachi', preferredCurrency: 'PKR - Pakistani Rupee', purpose: 'Business', relationship: 'Business Partner', lastTransaction: 'May 10, 2025', totalTransactions: 5, totalReceived: '₨145,000.00' },
  { id: 'BEN-004', name: 'Mohammad Ali', email: 'mohammad.ali@example.com', phone: '+971 60 123 4567', avatar: 'MA', country: 'UAE', countryFlag: '🇦🇪', bankName: 'Emirates NBD', bankBranch: 'Dubai Branch', accountNumber: 'AE07 0260 0012', routingNumber: '3456 7890 001', swiftCode: 'EBILAEAD', accountType: 'Current Account', iban: 'AE070260001234567890123', currency: 'AED', currencyName: 'UAE Dirham', status: 'Active', addedOn: 'May 11, 2025', addedTime: '3:20 PM', dateOfBirth: 'January 25, 1985', address: 'Villa 7, Al Barsha 1, Dubai, UAE', preferredCurrency: 'AED - UAE Dirham', purpose: 'Business', relationship: 'Business Partner', lastTransaction: 'May 9, 2025', totalTransactions: 15, totalReceived: 'AED 85,200.00' },
  { id: 'BEN-005', name: 'Ibrahim Khalil', email: 'ibrahim.khalil@example.com', phone: '+966 55 123 4567', avatar: 'IK', country: 'Saudi Arabia', countryFlag: '🇸🇦', bankName: 'Al Rajhi Bank', bankBranch: 'Riyadh Branch', accountNumber: 'SA12 8000 0123', routingNumber: '4567 8901 2345', swiftCode: 'RJHISARI', accountType: 'Savings Account', iban: 'SA128000012345678901234', currency: 'SAR', currencyName: 'Saudi Riyal', status: 'Inactive', addedOn: 'May 10, 2025', addedTime: '11:05 AM', dateOfBirth: 'April 3, 1978', address: 'Street 15, Al Olaya District, Riyadh', preferredCurrency: 'SAR - Saudi Riyal', purpose: 'Family Support', relationship: 'Relative', lastTransaction: 'April 28, 2025', totalTransactions: 3, totalReceived: 'SAR 12,500.00' },
  { id: 'BEN-006', name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '+91 98765 43210', avatar: 'PS', country: 'India', countryFlag: '🇮🇳', bankName: 'HDFC Bank', bankBranch: 'Mumbai Branch', accountNumber: '5010 1234 5678', routingNumber: 'HDFC0001234', swiftCode: 'HDFCINBB', accountType: 'Savings Account', currency: 'INR', currencyName: 'Indian Rupee', status: 'Active', addedOn: 'May 10, 2025', addedTime: '9:30 AM', dateOfBirth: 'September 12, 1993', address: 'Flat 301, Sunflower Apt, Bandra West, Mumbai', preferredCurrency: 'INR - Indian Rupee', purpose: 'Education', relationship: 'Friend', lastTransaction: 'May 10, 2025', totalTransactions: 7, totalReceived: '₹62,300.00' },
  { id: 'BEN-007', name: 'Samuel Okafor', email: 'samuel.okafor@example.com', phone: '+234 803 123 4567', avatar: 'SO', country: 'Nigeria', countryFlag: '🇳🇬', bankName: 'GTBank', bankBranch: 'Lagos Branch', accountNumber: '0123456789', routingNumber: '058152', swiftCode: 'GTBINGLA', accountType: 'Current Account', currency: 'NGN', currencyName: 'Nigerian Naira', status: 'Pending', addedOn: 'May 9, 2025', addedTime: '5:10 PM', dateOfBirth: 'February 19, 1991', address: '12 Admiralty Way, Lekki Phase 1, Lagos', preferredCurrency: 'NGN - Nigerian Naira', purpose: 'Business', relationship: 'Business Partner', lastTransaction: 'May 8, 2025', totalTransactions: 2, totalReceived: '₦85,000.00' },
  { id: 'BEN-008', name: 'Siti Aisyah', email: 'siti.aisyah@example.com', phone: '+60 12 345 6789', avatar: 'SA', country: 'Malaysia', countryFlag: '🇲🇾', bankName: 'Maybank', bankBranch: 'Kuala Lumpur Branch', accountNumber: '5143 1234 5678', routingNumber: 'MBEMYKL', swiftCode: 'MBEMYKL', accountType: 'Savings Account', currency: 'MYR', currencyName: 'Malaysian Ringgit', status: 'Active', addedOn: 'May 9, 2025', addedTime: '2:45 PM', dateOfBirth: 'June 30, 1995', address: 'No. 8, Jalan Ampang, Kuala Lumpur', preferredCurrency: 'MYR - Malaysian Ringgit', purpose: 'Family Support', relationship: 'Family', lastTransaction: 'May 9, 2025', totalTransactions: 9, totalReceived: 'MYR 18,900.00' },
  { id: 'BEN-009', name: 'David Wilson', email: 'david.wilson@example.com', phone: '+44 7700 900129', avatar: 'DW', country: 'United Kingdom', countryFlag: '🇬🇧', bankName: 'Barclays Bank', bankBranch: 'London Branch', accountNumber: 'GB29 BARC 2013', routingNumber: '123456 90', swiftCode: 'BARCGB22', accountType: 'Current Account', iban: 'GB29BARCXXXXXXXX', currency: 'GBP', currencyName: 'British Pound', status: 'Active', addedOn: 'May 8, 2025', addedTime: '11:00 AM', dateOfBirth: 'November 5, 1982', address: '14 Baker Street, London W1U 3BW', preferredCurrency: 'GBP - British Pound', purpose: 'Business', relationship: 'Business Partner', lastTransaction: 'May 7, 2025', totalTransactions: 20, totalReceived: '£42,800.00' },
  { id: 'BEN-010', name: 'Emily Johnson', email: 'emily.johnson@example.com', phone: '+1 202 555 0198', avatar: 'EJ', country: 'United States', countryFlag: '🇺🇸', bankName: 'Chase Bank', bankBranch: 'New York Branch', accountNumber: '1234 5678 9012', routingNumber: '021000021', swiftCode: 'CHASUS33', accountType: 'Checking Account', currency: 'USD', currencyName: 'US Dollar', status: 'Active', addedOn: 'May 8, 2025', addedTime: '9:15 AM', dateOfBirth: 'August 17, 1990', address: '250 West 57th Street, New York, NY', preferredCurrency: 'USD - US Dollar', purpose: 'Personal', relationship: 'Friend', lastTransaction: 'May 6, 2025', totalTransactions: 4, totalReceived: '$8,200.00' },
  { id: 'BEN-011', name: 'Karim Hassan', email: 'karim.hassan@example.com', phone: '+49 170 123 4567', avatar: 'KH', country: 'Germany', countryFlag: '🇩🇪', bankName: 'Deutsche Bank', bankBranch: 'Berlin Branch', accountNumber: 'DE89 3704 0044', routingNumber: '3704 0044', swiftCode: 'DEUTDEDB', accountType: 'Current Account', iban: 'DE89370400440532013000', currency: 'EUR', currencyName: 'Euro', status: 'Active', addedOn: 'May 7, 2025', addedTime: '4:00 PM', dateOfBirth: 'December 22, 1987', address: 'Friedrichstraße 45, 10117 Berlin', preferredCurrency: 'EUR - Euro', purpose: 'Education', relationship: 'Friend', lastTransaction: 'May 5, 2025', totalTransactions: 6, totalReceived: '€14,500.00' },
  { id: 'BEN-012', name: 'Nadia Islam', email: 'nadia.islam@example.com', phone: '+61 412 345 678', avatar: 'NI', country: 'Australia', countryFlag: '🇦🇺', bankName: 'Commonwealth Bank', bankBranch: 'Sydney Branch', accountNumber: '0625 7654 3210', routingNumber: 'BSB: 062500', swiftCode: 'CTBAAU2S', accountType: 'Savings Account', currency: 'AUD', currencyName: 'Australian Dollar', status: 'Active', addedOn: 'May 7, 2025', addedTime: '1:30 PM', dateOfBirth: 'March 8, 1994', address: '88 George Street, Sydney NSW 2000', preferredCurrency: 'AUD - Australian Dollar', purpose: 'Family Support', relationship: 'Family', lastTransaction: 'May 6, 2025', totalTransactions: 11, totalReceived: 'AUD 22,100.00' },
  { id: 'BEN-013', name: 'Omar Sheikh', email: 'omar.sheikh@example.com', phone: '+974 5012 3456', avatar: 'OS', country: 'Qatar', countryFlag: '🇶🇦', bankName: 'Qatar National Bank', bankBranch: 'Doha Branch', accountNumber: 'QA58 QNBA 0000', routingNumber: '0000 6935 0063', swiftCode: 'QNBAQAQA', accountType: 'Savings Account', iban: 'QA58QNBA0000000069350063', currency: 'QAR', currencyName: 'Qatari Riyal', status: 'Active', addedOn: 'May 6, 2025', addedTime: '8:20 AM', dateOfBirth: 'May 11, 1980', address: 'Villa 45, West Bay, Doha, Qatar', preferredCurrency: 'QAR - Qatari Riyal', purpose: 'Business', relationship: 'Business Partner', lastTransaction: 'May 4, 2025', totalTransactions: 18, totalReceived: 'QAR 95,000.00' },
  { id: 'BEN-014', name: 'Fatima Malik', email: 'fatima.malik@example.com', phone: '+1 416 555 0123', avatar: 'FM', country: 'Canada', countryFlag: '🇨🇦', bankName: 'Royal Bank of Canada', bankBranch: 'Toronto Branch', accountNumber: '1234 567 890', routingNumber: '003 00012', swiftCode: 'ROYCCAT2', accountType: 'Checking Account', currency: 'CAD', currencyName: 'Canadian Dollar', status: 'Active', addedOn: 'May 6, 2025', addedTime: '3:45 PM', dateOfBirth: 'October 29, 1989', address: '120 Queen Street West, Toronto, ON', preferredCurrency: 'CAD - Canadian Dollar', purpose: 'Education', relationship: 'Friend', lastTransaction: 'May 3, 2025', totalTransactions: 9, totalReceived: 'CAD 32,400.00' },
  { id: 'BEN-015', name: 'Yuki Tanaka', email: 'yuki.tanaka@example.com', phone: '+81 90 1234 5678', avatar: 'YT', country: 'Japan', countryFlag: '🇯🇵', bankName: 'Sumitomo Mitsui Bank', bankBranch: 'Tokyo Branch', accountNumber: '1234567', routingNumber: 'Branch: 001', swiftCode: 'SMBCJPJT', accountType: 'Savings Account', currency: 'JPY', currencyName: 'Japanese Yen', status: 'Inactive', addedOn: 'May 5, 2025', addedTime: '10:00 AM', dateOfBirth: 'July 7, 1996', address: '2-1-1 Marunouchi, Chiyoda-ku, Tokyo', preferredCurrency: 'JPY - Japanese Yen', purpose: 'Personal', relationship: 'Friend', lastTransaction: 'April 20, 2025', totalTransactions: 3, totalReceived: '¥245,000' },
  { id: 'BEN-016', name: 'Ana Pereira', email: 'ana.pereira@example.com', phone: '+351 912 345 678', avatar: 'AP', country: 'Portugal', countryFlag: '🇵🇹', bankName: 'Caixa Geral de Depósitos', bankBranch: 'Lisbon Branch', accountNumber: 'PT50 0035 0292', routingNumber: '0000 0001 7388', swiftCode: 'CGDIPTPL', accountType: 'Savings Account', iban: 'PT50003502920000000173886', currency: 'EUR', currencyName: 'Euro', status: 'Active', addedOn: 'May 5, 2025', addedTime: '2:00 PM', dateOfBirth: 'February 14, 1991', address: 'Rua Augusta 100, 1100-053 Lisboa', preferredCurrency: 'EUR - Euro', purpose: 'Family Support', relationship: 'Family', lastTransaction: 'May 2, 2025', totalTransactions: 7, totalReceived: '€18,750.00' },
  { id: 'BEN-017', name: 'Chidi Okonkwo', email: 'chidi.okonkwo@example.com', phone: '+234 805 678 9012', avatar: 'CO', country: 'Nigeria', countryFlag: '🇳🇬', bankName: 'Access Bank', bankBranch: 'Abuja Branch', accountNumber: '0987654321', routingNumber: '044150', swiftCode: 'ABNGNGLA', accountType: 'Current Account', currency: 'NGN', currencyName: 'Nigerian Naira', status: 'Active', addedOn: 'May 4, 2025', addedTime: '7:30 PM', dateOfBirth: 'August 20, 1986', address: 'Plot 1234, Wuse Zone 4, Abuja FCT', preferredCurrency: 'NGN - Nigerian Naira', purpose: 'Business', relationship: 'Business Partner', lastTransaction: 'May 1, 2025', totalTransactions: 14, totalReceived: '₦420,000.00' },
  { id: 'BEN-018', name: 'Mei Chen', email: 'mei.chen@example.com', phone: '+65 9123 4567', avatar: 'MC', country: 'Singapore', countryFlag: '🇸🇬', bankName: 'DBS Bank', bankBranch: 'Orchard Branch', accountNumber: '1234 5678 901', routingNumber: 'Bank Code: 7171', swiftCode: 'DBSSSGSG', accountType: 'Savings Account', currency: 'SGD', currencyName: 'Singapore Dollar', status: 'Active', addedOn: 'May 4, 2025', addedTime: '11:15 AM', dateOfBirth: 'April 5, 1993', address: '80 Robinson Road, Singapore 068898', preferredCurrency: 'SGD - Singapore Dollar', purpose: 'Education', relationship: 'Friend', lastTransaction: 'April 30, 2025', totalTransactions: 5, totalReceived: 'SGD 12,300.00' },
  { id: 'BEN-019', name: 'Marcus Brown', email: 'marcus.brown@example.com', phone: '+1 212 555 0134', avatar: 'MB', country: 'United States', countryFlag: '🇺🇸', bankName: 'Bank of America', bankBranch: 'Manhattan Branch', accountNumber: '9876 5432 1098', routingNumber: '026009593', swiftCode: 'BOFAUS3N', accountType: 'Checking Account', currency: 'USD', currencyName: 'US Dollar', status: 'Active', addedOn: 'May 3, 2025', addedTime: '4:50 PM', dateOfBirth: 'January 30, 1984', address: '1 Bryant Park, New York, NY 10036', preferredCurrency: 'USD - US Dollar', purpose: 'Personal', relationship: 'Friend', lastTransaction: 'April 28, 2025', totalTransactions: 6, totalReceived: '$15,600.00' },
  { id: 'BEN-020', name: 'Lena Fischer', email: 'lena.fischer@example.com', phone: '+49 160 987 6543', avatar: 'LF', country: 'Germany', countryFlag: '🇩🇪', bankName: 'Commerzbank', bankBranch: 'Frankfurt Branch', accountNumber: 'DE75 2004 0060', routingNumber: '6274 3015 06', swiftCode: 'COBADEFF', accountType: 'Current Account', iban: 'DE75200400600627430150', currency: 'EUR', currencyName: 'Euro', status: 'Inactive', addedOn: 'May 2, 2025', addedTime: '9:00 AM', dateOfBirth: 'June 18, 1990', address: 'Kaiserstraße 29, 60311 Frankfurt am Main', preferredCurrency: 'EUR - Euro', purpose: 'Medical', relationship: 'Relative', lastTransaction: 'April 15, 2025', totalTransactions: 4, totalReceived: '€9,800.00' },
];

const TOTAL = 2458;
const countryOptions = ['All Countries', 'Bangladesh', 'Philippines', 'Pakistan', 'UAE', 'Saudi Arabia', 'India', 'Nigeria', 'Malaysia', 'United Kingdom', 'United States', 'Germany', 'Australia', 'Qatar', 'Canada', 'Japan', 'Portugal', 'Singapore'];
const statusOptions = ['All Status', 'Active', 'Inactive', 'Pending'];
const currencyOptions = ['All Currencies', 'BDT', 'PHP', 'PKR', 'AED', 'SAR', 'INR', 'NGN', 'MYR', 'GBP', 'USD', 'EUR', 'AUD', 'QAR', 'CAD', 'JPY', 'SGD'];

const avatarColors: Record<string, string> = {
  RU: 'bg-blue-600', MS: 'bg-pink-600', AK: 'bg-green-600', MA: 'bg-purple-600',
  IK: 'bg-amber-500', PS: 'bg-cyan-600', SO: 'bg-red-600', SA: 'bg-emerald-600',
  DW: 'bg-violet-600', EJ: 'bg-orange-600', KH: 'bg-sky-600', NI: 'bg-lime-600',
  OS: 'bg-yellow-600', FM: 'bg-fuchsia-600', YT: 'bg-teal-600', AP: 'bg-amber-700',
  CO: 'bg-green-700', MC: 'bg-blue-700', MB: 'bg-purple-700', LF: 'bg-pink-700',
};

function Avatar({ initials, size = 'md' }: { initials: string; size?: 'sm' | 'md' | 'lg' }) {
  const bg = avatarColors[initials] ?? 'bg-slate-500';
  const sz = size === 'lg' ? 'w-12 h-12 text-sm' : size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-9 h-9 text-xs';
  return (
    <div className={`${sz} ${bg} rounded-full flex items-center justify-center text-white font-semibold shrink-0`}>
      {initials}
    </div>
  );
}

function StatusBadge({ status }: { status: BeneficiaryStatus }) {
  const map: Record<BeneficiaryStatus, string> = {
    Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
    Inactive: 'bg-gray-100    text-gray-500    dark:bg-gray-800    dark:text-gray-400',
    Pending: 'bg-amber-100   text-amber-700   dark:bg-amber-950   dark:text-amber-400',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${map[status]}`}>{status}</span>
  );
}

function DR({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start gap-3 py-2 border-b border-gray-100 dark:border-gray-700/60 last:border-0">
      <span className="text-[12px] text-gray-400 dark:text-gray-500 shrink-0">{label}</span>
      <span className="text-[12px] font-medium text-gray-800 dark:text-gray-200 text-right break-all">{value}</span>
    </div>
  );
}

const sparkData: Record<string, number[]> = {
  blue: [4, 10, 6, 14, 8, 12, 5, 15, 7, 13, 9, 16, 11, 18],
  green: [6, 12, 8, 16, 10, 14, 8, 18, 10, 16, 12, 20, 14, 22],
  amber: [20, 14, 18, 10, 16, 8, 14, 6, 12, 8, 10, 6, 8, 4],
  purple: [5, 12, 7, 16, 9, 14, 8, 18, 10, 15, 12, 20, 14, 22],
};

function Sparkline({ color, colorKey }: { color: string; colorKey: string }) {
  const pts = sparkData[colorKey] ?? sparkData.blue;
  const W = 160, H = 36, PAD = 4;
  const max = Math.max(...pts), min = Math.min(...pts), range = max - min || 1;
  const coords = pts.map((p, i) => ({
    x: PAD + (i / (pts.length - 1)) * (W - PAD * 2),
    y: PAD + (1 - (p - min) / range) * (H - PAD * 2),
  }));
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="mt-2 block">
      <polyline points={coords.map(c => `${c.x},${c.y}`).join(' ')}
        stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r="2.5" fill={color} stroke="white" strokeWidth="1" />
      ))}
    </svg>
  );
}

export default function BeneficiariesPage() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('All Countries');
  const [status, setStatus] = useState('All Status');
  const [currency, setCurrency] = useState('All Currencies');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detailId, setDetailId] = useState<string | null>(beneficiariesData[0].id);
  const [showDetail, setShowDetail] = useState(true);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileDetail, setMobileDetail] = useState(false);

  // close more dropdown on outside click
  useEffect(() => {
    const handler = () => setMoreOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const filtered = useMemo(() => beneficiariesData.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !search || b.name.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) || b.phone.includes(q) ||
      b.accountNumber.toLowerCase().includes(q);
    const matchCountry = country === 'All Countries' || b.country === country;
    const matchStatus = status === 'All Status' || b.status === status;
    const matchCurrency = currency === 'All Currencies' || b.currency === currency;
    return matchSearch && matchCountry && matchStatus && matchCurrency;
  }), [search, country, status, currency]);

  const totalPages = Math.max(1, Math.ceil(TOTAL / perPage));
  const pageRows = filtered.slice((page - 1) * perPage, page * perPage);
  const detailBen = beneficiariesData.find(b => b.id === detailId) ?? beneficiariesData[0];

  const toggleSelect = (id: string) =>
    setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleAll = () =>
    setSelected(prev => prev.size === pageRows.length ? new Set() : new Set(pageRows.map(r => r.id)));

  const openDetail = (b: Beneficiary) => {
    setDetailId(b.id); setShowDetail(true); setMobileDetail(true);
  };

  const stats = [
    { label: 'Total Beneficiaries', value: '2,458', change: '+12.5% from last week', up: true, color: '#2563eb', colorKey: 'blue', Icon: Users },
    { label: 'Active Beneficiaries', value: '2,156', change: '+10.3% from last week', up: true, color: '#16a34a', colorKey: 'green', Icon: CheckCircle },
    { label: 'Inactive Beneficiaries', value: '186', change: '-5.2% from last week', up: false, color: '#f59e0b', colorKey: 'amber', Icon: AlertCircle },
    { label: 'This Week Added', value: '45', change: '+15.8% from last week', up: true, color: '#8b5cf6', colorKey: 'purple', Icon: UserPlus },
  ];

  const selectCls = "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-[13px] text-gray-600 dark:text-gray-400 outline-none cursor-pointer";

  return (
    <div className="px-4 py-6">
      {/* header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-[13px] text-gray-400 dark:text-gray-500 mb-1">
          <span>Dashboard</span>
          <ChevronRight size={12} />
          <span className="text-gray-900 dark:text-white font-medium">Beneficiaries</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Beneficiaries</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage all receiver accounts and bank details</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-medium cursor-pointer transition-colors">
            <UserPlus size={14} /> Add Beneficiary
          </button>
        </div>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map(({ label, value, change, up, color, colorKey, Icon }) => (
          <div key={label} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1">{label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                <p className={`text-[11px] mt-1 font-medium ${up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                  {change}
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                <Icon size={18} style={{ color }} />
              </div>
            </div>
            <Sparkline color={color} colorKey={colorKey} />
          </div>
        ))}
      </div>

      {/* main layout */}
      <div className="flex gap-4 items-start">

        {/* ── TABLE PANEL ── */}
        <div className="flex-1 min-w-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">

          {/* filters */}
          <div className="flex flex-col sm:flex-row gap-2 p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 flex-1 min-w-0">
              <Search size={14} className="text-gray-400 shrink-0" />
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by name, email, phone..."
                className="bg-transparent outline-none text-[13px] text-gray-800 dark:text-gray-200 placeholder-gray-400 w-full" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <select value={country} onChange={e => { setCountry(e.target.value); setPage(1); }} className={selectCls}>
                {countryOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className={selectCls}>
                {statusOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              <select value={currency} onChange={e => { setCurrency(e.target.value); setPage(1); }} className={selectCls}>
                {currencyOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* desktop table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 w-8">
                    <input type="checkbox" className="accent-blue-600 rounded cursor-pointer"
                      checked={pageRows.length > 0 && pageRows.every(r => selected.has(r.id))} onChange={toggleAll} />
                  </th>
                  {['Beneficiary', 'Country', 'Bank Details', 'Account', 'Currency', 'Status', 'Added On', ''].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700/60">
                {pageRows.length === 0 ? (
                  <tr><td colSpan={9} className="text-center py-12 text-gray-400 text-sm">No beneficiaries found.</td></tr>
                ) : pageRows.map(b => {
                  const isSelected = selected.has(b.id);
                  const isActive = detailId === b.id && showDetail;
                  return (
                    <tr key={b.id} onClick={() => openDetail(b)}
                      className={`cursor-pointer transition-colors hover:bg-blue-50/40 dark:hover:bg-blue-900/10 ${isSelected ? 'bg-blue-50 dark:bg-blue-950/20' : isActive ? 'bg-emerald-50/40 dark:bg-emerald-900/10' : ''}`}>
                      <td className="px-4 py-3" onClick={e => { e.stopPropagation(); toggleSelect(b.id); }}>
                        <input type="checkbox" className="accent-blue-600 rounded cursor-pointer" checked={isSelected} onChange={() => { }} />
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar initials={b.avatar} />
                          <div>
                            <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{b.name}</p>
                            <p className="text-[11px] text-gray-400">{b.email}</p>
                            <p className="text-[11px] text-gray-400">{b.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-1.5">
                          <CountryFlag country={b.country} size="w-5 h-5" />
                          <span className="text-[13px] text-gray-700 dark:text-gray-300">{b.country}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <p className="text-[13px] font-medium text-gray-800 dark:text-gray-200">{b.bankName}</p>
                        <p className="text-[11px] text-gray-400">{b.bankBranch}</p>
                      </td>
                      <td className="px-3 py-3">
                        <p className="text-[12px] font-medium text-gray-800 dark:text-gray-200 font-mono">{b.accountNumber}</p>
                        <p className="text-[11px] text-gray-400">{b.routingNumber}</p>
                      </td>
                      <td className="px-3 py-3">
                        <p className="text-[13px] font-medium text-gray-800 dark:text-gray-200">{b.currency}</p>
                        <p className="text-[11px] text-gray-400">{b.currencyName}</p>
                      </td>
                      <td className="px-3 py-3"><StatusBadge status={b.status} /></td>
                      <td className="px-3 py-3">
                        <p className="text-[12px] text-gray-600 dark:text-gray-400">{b.addedOn}</p>
                        <p className="text-[11px] text-gray-400">{b.addedTime}</p>
                      </td>
                      <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                        <button className="w-7 h-7 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                          <MoreVertical size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* mobile cards */}
          <div className="lg:hidden divide-y divide-gray-100 dark:divide-gray-700">
            {pageRows.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm">No beneficiaries found.</div>
            ) : pageRows.map(b => (
              <div key={b.id} onClick={() => openDetail(b)}
                className="px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={b.avatar} />
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{b.name}</p>
                      <p className="text-[11px] text-gray-400">{b.email}</p>
                    </div>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <div className="flex items-center justify-between pl-11">
                  <div>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5">
                      <CountryFlag country={b.country} /> {b.country} · {b.currency}
                    </p>
                    <p className="text-[11px] text-gray-400 font-mono">{b.accountNumber}</p>
                  </div>
                  <p className="text-[11px] text-gray-400">{b.addedOn}</p>
                </div>
              </div>
            ))}
          </div>

          {/* pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
            <p className="text-[12px] text-gray-400">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, TOTAL)} of {TOTAL.toLocaleString()} beneficiaries</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-7 h-7 rounded-md border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 cursor-pointer">
                <ChevronLeft size={12} />
              </button>
              {[1, 2, 3].map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-md border text-[12px] cursor-pointer transition-colors ${page === p ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                  {p}
                </button>
              ))}
              <span className="text-gray-400 px-1 text-[12px]">...</span>
              <button onClick={() => setPage(totalPages)}
                className={`w-7 h-7 rounded-md border text-[12px] cursor-pointer ${page === totalPages ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400'}`}>
                {totalPages}
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-7 h-7 rounded-md border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 cursor-pointer">
                <ChevronRight size={12} />
              </button>
              <select value={perPage} onChange={e => setPerPage(Number(e.target.value))}
                className="ml-1 h-7 border border-gray-200 dark:border-gray-600 rounded-md text-[12px] px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-pointer outline-none">
                {[10, 25, 50].map(n => <option key={n} value={n}>{n}/page</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* ── DESKTOP DETAIL PANEL ── */}
        {showDetail && (
          <div className="hidden lg:block w-80 shrink-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden self-start sticky top-4 max-h-[calc(100vh-120px)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
              <span className="text-[14px] font-semibold text-gray-900 dark:text-white">Beneficiary Details</span>
              <button onClick={() => setShowDetail(false)} className="w-6 h-6 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer">
                <X size={13} />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              <DetailContent ben={detailBen} onClose={() => setShowDetail(false)} />
            </div>
          </div>
        )}
      </div>

      {/* ── MOBILE BOTTOM SHEET ── */}
      {mobileDetail && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setMobileDetail(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <span className="text-[14px] font-semibold text-gray-900 dark:text-white">Beneficiary Details</span>
              <button onClick={() => setMobileDetail(false)} className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 cursor-pointer">
                <X size={13} />
              </button>
            </div>
            <DetailContent ben={detailBen} onClose={() => setMobileDetail(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

function DetailContent({ ben, onClose }: { ben: Beneficiary; onClose: () => void }) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="p-5 space-y-5">
      {/* profile */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar initials={ben.avatar} size="lg" />
            {ben.status === 'Active' && (
              <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-800" />
            )}
          </div>
          <div>
            <p className="text-[15px] font-semibold text-gray-900 dark:text-white">{ben.name}</p>
            <p className="text-[11px] text-gray-400">{ben.email}</p>
            <p className="text-[11px] text-gray-400">{ben.phone}</p>
          </div>
        </div>
        <StatusBadge status={ben.status} />
      </div>

      {/* actions */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[12px] font-semibold cursor-pointer transition-colors">
          <Send size={12} /> Send Money
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[12px] font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
          <Edit2 size={12} /> Edit
        </button>
        <div className="relative">
          <button onClick={e => { e.stopPropagation(); setMoreOpen(v => !v); }}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-[12px] font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            More <ChevronDown size={11} />
          </button>
          {moreOpen && (
            <div className="absolute top-9 right-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-20 min-w-32.5 overflow-hidden">
              {['View History', 'Duplicate', 'Export'].map(item => (
                <button key={item} onClick={() => setMoreOpen(false)}
                  className="block w-full px-4 py-2.5 text-left text-[13px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* basic info */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Basic Information</p>
        <DR label="Full Name" value={ben.name} />
        <DR label="Date of Birth" value={ben.dateOfBirth} />
        <DR label="Country" value={
          <span className="inline-flex items-center gap-1.5 justify-end">
            <CountryFlag country={ben.country} /> {ben.country}
          </span>
        } />
        <DR label="Address" value={ben.address} />
      </div>

      {/* bank details */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Bank Details</p>
        <DR label="Bank Name" value={ben.bankName} />
        <DR label="Branch" value={ben.bankBranch} />
        <DR label="Account Number" value={ben.accountNumber} />
        <DR label="Routing Number" value={ben.routingNumber} />
        <DR label="SWIFT Code" value={ben.swiftCode} />
        <DR label="Account Type" value={ben.accountType} />
        {ben.iban && <DR label="IBAN" value={ben.iban} />}
      </div>

      {/* preferences */}
      <div>
        <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Preferences & Stats</p>
        <DR label="Preferred Currency" value={ben.preferredCurrency} />
        <DR label="Purpose" value={ben.purpose} />
        <DR label="Relationship" value={ben.relationship} />
        <DR label="Added On" value={`${ben.addedOn} ${ben.addedTime}`} />
        <DR label="Last Transaction" value={ben.lastTransaction} />
        <DR label="Total Transactions" value={String(ben.totalTransactions)} />
        <DR label="Total Received" value={ben.totalReceived} />
      </div>

      {/* remove */}
      <button className="flex items-center gap-2 text-red-500 dark:text-red-400 hover:text-red-600 text-[13px] font-medium cursor-pointer transition-colors py-1">
        <Trash2 size={13} /> Remove Beneficiary
      </button>
    </div>
  );
}