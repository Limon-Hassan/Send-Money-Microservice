"use client";
import { useState, useMemo } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
type BeneficiaryStatus = "Active" | "Inactive" | "Pending";

interface Beneficiary {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  country: string;
  countryFlag: string;
  bankName: string;
  bankBranch: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode: string;
  accountType: string;
  iban?: string;
  currency: string;
  currencyName: string;
  status: BeneficiaryStatus;
  addedOn: string;
  addedTime: string;
  dateOfBirth: string;
  address: string;
  preferredCurrency: string;
  purpose: string;
  relationship: string;
  lastTransaction: string;
  totalTransactions: number;
  totalReceived: string;
}

// ── Fake Data ─────────────────────────────────────────────────────────────────
const beneficiariesData: Beneficiary[] = [
  { id: "BEN-001", name: "Rahim Uddin", email: "rahim.uddin@example.com", phone: "+880 1712 345678", avatar: "RU", country: "Bangladesh", countryFlag: "🇧🇩", bankName: "Eastern Bank Ltd.", bankBranch: "Dhanmondi Branch", accountNumber: "1234 5678 9012", routingNumber: "055263", swiftCode: "EBLDBDDH", accountType: "Savings Account", currency: "BDT", currencyName: "Bangladeshi Taka", status: "Active", addedOn: "May 12, 2025", addedTime: "2:30 PM", dateOfBirth: "May 20, 1990", address: "House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh", preferredCurrency: "BDT - Bangladeshi Taka", purpose: "Family Support", relationship: "Family", lastTransaction: "May 12, 2025", totalTransactions: 12, totalReceived: "৳125,450.00" },
  { id: "BEN-002", name: "Maria Santos", email: "maria.santos@example.com", phone: "+63 917 123 4567", avatar: "MS", country: "Philippines", countryFlag: "🇵🇭", bankName: "BDO Unibank, Inc.", bankBranch: "Makati Branch", accountNumber: "0012 3456 7890", routingNumber: "BNORPHMM", swiftCode: "BNORPHMM", accountType: "Savings Account", currency: "PHP", currencyName: "Philippine Peso", status: "Active", addedOn: "May 12, 2025", addedTime: "10:15 AM", dateOfBirth: "March 14, 1988", address: "45 Ayala Avenue, Makati City, Metro Manila, Philippines", preferredCurrency: "PHP - Philippine Peso", purpose: "Family Support", relationship: "Friend", lastTransaction: "May 11, 2025", totalTransactions: 8, totalReceived: "₱98,200.00" },
  { id: "BEN-003", name: "Arif Khan", email: "arif.khan@example.com", phone: "+92 301 2345678", avatar: "AK", country: "Pakistan", countryFlag: "🇵🇰", bankName: "Meezan Bank", bankBranch: "Karachi Branch", accountNumber: "PK12 MEZN 0001", routingNumber: "2345 6789 01", swiftCode: "MEZNPKKA", accountType: "Current Account", iban: "PK12MEZN0001234567890", currency: "PKR", currencyName: "Pakistani Rupee", status: "Active", addedOn: "May 11, 2025", addedTime: "6:45 PM", dateOfBirth: "July 8, 1992", address: "Plot 22, Block B, Gulshan-e-Iqbal, Karachi, Pakistan", preferredCurrency: "PKR - Pakistani Rupee", purpose: "Business", relationship: "Business Partner", lastTransaction: "May 10, 2025", totalTransactions: 5, totalReceived: "₨145,000.00" },
  { id: "BEN-004", name: "Mohammad Ali", email: "mohammad.ali@example.com", phone: "+971 60 123 4567", avatar: "MA", country: "UAE", countryFlag: "🇦🇪", bankName: "Emirates NBD", bankBranch: "Dubai Branch", accountNumber: "AE07 0260 0012", routingNumber: "3456 7890 001", swiftCode: "EBILAEAD", accountType: "Current Account", iban: "AE070260001234567890123", currency: "AED", currencyName: "UAE Dirham", status: "Active", addedOn: "May 11, 2025", addedTime: "3:20 PM", dateOfBirth: "January 25, 1985", address: "Villa 7, Al Barsha 1, Dubai, United Arab Emirates", preferredCurrency: "AED - UAE Dirham", purpose: "Business", relationship: "Business Partner", lastTransaction: "May 9, 2025", totalTransactions: 15, totalReceived: "AED 85,200.00" },
  { id: "BEN-005", name: "Ibrahim Khalil", email: "ibrahim.khalil@example.com", phone: "+966 55 123 4567", avatar: "IK", country: "Saudi Arabia", countryFlag: "🇸🇦", bankName: "Al Rajhi Bank", bankBranch: "Riyadh Branch", accountNumber: "SA12 8000 0123", routingNumber: "4567 8901 2345", swiftCode: "RJHISARI", accountType: "Savings Account", iban: "SA128000012345678901234", currency: "SAR", currencyName: "Saudi Riyal", status: "Inactive", addedOn: "May 10, 2025", addedTime: "11:05 AM", dateOfBirth: "April 3, 1978", address: "Street 15, Al Olaya District, Riyadh 12214, Saudi Arabia", preferredCurrency: "SAR - Saudi Riyal", purpose: "Family Support", relationship: "Relative", lastTransaction: "April 28, 2025", totalTransactions: 3, totalReceived: "SAR 12,500.00" },
  { id: "BEN-006", name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 98765 43210", avatar: "PS", country: "India", countryFlag: "🇮🇳", bankName: "HDFC Bank", bankBranch: "Mumbai Branch", accountNumber: "5010 1234 5678", routingNumber: "IFSC: HDFC0001234", swiftCode: "HDFCINBB", accountType: "Savings Account", currency: "INR", currencyName: "Indian Rupee", status: "Active", addedOn: "May 10, 2025", addedTime: "9:30 AM", dateOfBirth: "September 12, 1993", address: "Flat 301, Sunflower Apt, Bandra West, Mumbai 400050, India", preferredCurrency: "INR - Indian Rupee", purpose: "Education", relationship: "Friend", lastTransaction: "May 10, 2025", totalTransactions: 7, totalReceived: "₹62,300.00" },
  { id: "BEN-007", name: "Samuel Okafor", email: "samuel.okafor@example.com", phone: "+234 803 123 4567", avatar: "SO", country: "Nigeria", countryFlag: "🇳🇬", bankName: "GTBank", bankBranch: "Lagos Branch", accountNumber: "0123456789", routingNumber: "Sort Code: 058152", swiftCode: "GTBINGLA", accountType: "Current Account", currency: "NGN", currencyName: "Nigerian Naira", status: "Pending", addedOn: "May 9, 2025", addedTime: "5:10 PM", dateOfBirth: "February 19, 1991", address: "12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria", preferredCurrency: "NGN - Nigerian Naira", purpose: "Business", relationship: "Business Partner", lastTransaction: "May 8, 2025", totalTransactions: 2, totalReceived: "₦85,000.00" },
  { id: "BEN-008", name: "Siti Aisyah", email: "siti.aisyah@example.com", phone: "+60 12 345 6789", avatar: "SA", country: "Malaysia", countryFlag: "🇲🇾", bankName: "Maybank", bankBranch: "Kuala Lumpur Branch", accountNumber: "5143 1234 5678", routingNumber: "SWIFT: MBEMYKL", swiftCode: "MBEMYKL", accountType: "Savings Account", currency: "MYR", currencyName: "Malaysian Ringgit", status: "Active", addedOn: "May 9, 2025", addedTime: "2:45 PM", dateOfBirth: "June 30, 1995", address: "No. 8, Jalan Ampang, Kuala Lumpur 50450, Malaysia", preferredCurrency: "MYR - Malaysian Ringgit", purpose: "Family Support", relationship: "Family", lastTransaction: "May 9, 2025", totalTransactions: 9, totalReceived: "MYR 18,900.00" },
  { id: "BEN-009", name: "David Wilson", email: "david.wilson@example.com", phone: "+44 7700 900129", avatar: "DW", country: "United Kingdom", countryFlag: "🇬🇧", bankName: "Barclays Bank", bankBranch: "London Branch", accountNumber: "GB29 BARC 2013", routingNumber: "1234 56 90", swiftCode: "BARCGB22", accountType: "Current Account", iban: "GB29BARCXXXXXXXX", currency: "GBP", currencyName: "British Pound", status: "Active", addedOn: "May 8, 2025", addedTime: "11:00 AM", dateOfBirth: "November 5, 1982", address: "14 Baker Street, Marylebone, London W1U 3BW, United Kingdom", preferredCurrency: "GBP - British Pound", purpose: "Business", relationship: "Business Partner", lastTransaction: "May 7, 2025", totalTransactions: 20, totalReceived: "£42,800.00" },
  { id: "BEN-010", name: "Emily Johnson", email: "emily.johnson@example.com", phone: "+1 202 555 0198", avatar: "EJ", country: "United States", countryFlag: "🇺🇸", bankName: "Chase Bank", bankBranch: "New York Branch", accountNumber: "1234 5678 9012", routingNumber: "Routing: 021000021", swiftCode: "CHASUS33", accountType: "Checking Account", currency: "USD", currencyName: "US Dollar", status: "Active", addedOn: "May 8, 2025", addedTime: "9:15 AM", dateOfBirth: "August 17, 1990", address: "250 West 57th Street, New York, NY 10107, USA", preferredCurrency: "USD - US Dollar", purpose: "Personal", relationship: "Friend", lastTransaction: "May 6, 2025", totalTransactions: 4, totalReceived: "$8,200.00" },
  { id: "BEN-011", name: "Karim Hassan", email: "karim.hassan@example.com", phone: "+49 170 123 4567", avatar: "KH", country: "Germany", countryFlag: "🇩🇪", bankName: "Deutsche Bank", bankBranch: "Berlin Branch", accountNumber: "DE89 3704 0044", routingNumber: "3704 0044 0532", swiftCode: "DEUTDEDB", accountType: "Current Account", iban: "DE89370400440532013000", currency: "EUR", currencyName: "Euro", status: "Active", addedOn: "May 7, 2025", addedTime: "4:00 PM", dateOfBirth: "December 22, 1987", address: "Friedrichstraße 45, 10117 Berlin, Germany", preferredCurrency: "EUR - Euro", purpose: "Education", relationship: "Friend", lastTransaction: "May 5, 2025", totalTransactions: 6, totalReceived: "€14,500.00" },
  { id: "BEN-012", name: "Nadia Islam", email: "nadia.islam@example.com", phone: "+61 412 345 678", avatar: "NI", country: "Australia", countryFlag: "🇦🇺", bankName: "Commonwealth Bank", bankBranch: "Sydney Branch", accountNumber: "0625 7654 3210", routingNumber: "BSB: 062500", swiftCode: "CTBAAU2S", accountType: "Savings Account", currency: "AUD", currencyName: "Australian Dollar", status: "Active", addedOn: "May 7, 2025", addedTime: "1:30 PM", dateOfBirth: "March 8, 1994", address: "88 George Street, Sydney NSW 2000, Australia", preferredCurrency: "AUD - Australian Dollar", purpose: "Family Support", relationship: "Family", lastTransaction: "May 6, 2025", totalTransactions: 11, totalReceived: "AUD 22,100.00" },
  { id: "BEN-013", name: "Omar Sheikh", email: "omar.sheikh@example.com", phone: "+974 5012 3456", avatar: "OS", country: "Qatar", countryFlag: "🇶🇦", bankName: "Qatar National Bank", bankBranch: "Doha Branch", accountNumber: "QA58 QNBA 0000", routingNumber: "0000 6935 0063", swiftCode: "QNBAQAQA", accountType: "Savings Account", iban: "QA58QNBA0000000069350063", currency: "QAR", currencyName: "Qatari Riyal", status: "Active", addedOn: "May 6, 2025", addedTime: "8:20 AM", dateOfBirth: "May 11, 1980", address: "Villa 45, West Bay, Doha, Qatar", preferredCurrency: "QAR - Qatari Riyal", purpose: "Business", relationship: "Business Partner", lastTransaction: "May 4, 2025", totalTransactions: 18, totalReceived: "QAR 95,000.00" },
  { id: "BEN-014", name: "Fatima Malik", email: "fatima.malik@example.com", phone: "+1 416 555 0123", avatar: "FM", country: "Canada", countryFlag: "🇨🇦", bankName: "Royal Bank of Canada", bankBranch: "Toronto Branch", accountNumber: "1234 567 890", routingNumber: "003 00012", swiftCode: "ROYCCAT2", accountType: "Checking Account", currency: "CAD", currencyName: "Canadian Dollar", status: "Active", addedOn: "May 6, 2025", addedTime: "3:45 PM", dateOfBirth: "October 29, 1989", address: "120 Queen Street West, Toronto, ON M5H 2M9, Canada", preferredCurrency: "CAD - Canadian Dollar", purpose: "Education", relationship: "Friend", lastTransaction: "May 3, 2025", totalTransactions: 9, totalReceived: "CAD 32,400.00" },
  { id: "BEN-015", name: "Yuki Tanaka", email: "yuki.tanaka@example.com", phone: "+81 90 1234 5678", avatar: "YT", country: "Japan", countryFlag: "🇯🇵", bankName: "Sumitomo Mitsui Bank", bankBranch: "Tokyo Branch", accountNumber: "1234567", routingNumber: "Branch: 001", swiftCode: "SMBCJPJT", accountType: "Savings Account", currency: "JPY", currencyName: "Japanese Yen", status: "Inactive", addedOn: "May 5, 2025", addedTime: "10:00 AM", dateOfBirth: "July 7, 1996", address: "2-1-1 Marunouchi, Chiyoda-ku, Tokyo 100-0005, Japan", preferredCurrency: "JPY - Japanese Yen", purpose: "Personal", relationship: "Friend", lastTransaction: "April 20, 2025", totalTransactions: 3, totalReceived: "¥245,000" },
  { id: "BEN-016", name: "Ana Pereira", email: "ana.pereira@example.com", phone: "+351 912 345 678", avatar: "AP", country: "Portugal", countryFlag: "🇵🇹", bankName: "Caixa Geral de Depósitos", bankBranch: "Lisbon Branch", accountNumber: "PT50 0035 0292", routingNumber: "0000 0001 7388", swiftCode: "CGDIPTPL", accountType: "Savings Account", iban: "PT50003502920000000173886", currency: "EUR", currencyName: "Euro", status: "Active", addedOn: "May 5, 2025", addedTime: "2:00 PM", dateOfBirth: "February 14, 1991", address: "Rua Augusta 100, 1100-053 Lisboa, Portugal", preferredCurrency: "EUR - Euro", purpose: "Family Support", relationship: "Family", lastTransaction: "May 2, 2025", totalTransactions: 7, totalReceived: "€18,750.00" },
  { id: "BEN-017", name: "Chidi Okonkwo", email: "chidi.okonkwo@example.com", phone: "+234 805 678 9012", avatar: "CO", country: "Nigeria", countryFlag: "🇳🇬", bankName: "Access Bank", bankBranch: "Abuja Branch", accountNumber: "0987654321", routingNumber: "Sort Code: 044150", swiftCode: "ABNGNGLA", accountType: "Current Account", currency: "NGN", currencyName: "Nigerian Naira", status: "Active", addedOn: "May 4, 2025", addedTime: "7:30 PM", dateOfBirth: "August 20, 1986", address: "Plot 1234, Wuse Zone 4, Abuja FCT, Nigeria", preferredCurrency: "NGN - Nigerian Naira", purpose: "Business", relationship: "Business Partner", lastTransaction: "May 1, 2025", totalTransactions: 14, totalReceived: "₦420,000.00" },
  { id: "BEN-018", name: "Mei Chen", email: "mei.chen@example.com", phone: "+65 9123 4567", avatar: "MC", country: "Singapore", countryFlag: "🇸🇬", bankName: "DBS Bank", bankBranch: "Orchard Branch", accountNumber: "1234 5678 901", routingNumber: "Bank Code: 7171", swiftCode: "DBSSSGSG", accountType: "Savings Account", currency: "SGD", currencyName: "Singapore Dollar", status: "Active", addedOn: "May 4, 2025", addedTime: "11:15 AM", dateOfBirth: "April 5, 1993", address: "80 Robinson Road, #02-00, Singapore 068898", preferredCurrency: "SGD - Singapore Dollar", purpose: "Education", relationship: "Friend", lastTransaction: "April 30, 2025", totalTransactions: 5, totalReceived: "SGD 12,300.00" },
  { id: "BEN-019", name: "Marcus Brown", email: "marcus.brown@example.com", phone: "+1 212 555 0134", avatar: "MB", country: "United States", countryFlag: "🇺🇸", bankName: "Bank of America", bankBranch: "Manhattan Branch", accountNumber: "9876 5432 1098", routingNumber: "Routing: 026009593", swiftCode: "BOFAUS3N", accountType: "Checking Account", currency: "USD", currencyName: "US Dollar", status: "Active", addedOn: "May 3, 2025", addedTime: "4:50 PM", dateOfBirth: "January 30, 1984", address: "1 Bryant Park, New York, NY 10036, USA", preferredCurrency: "USD - US Dollar", purpose: "Personal", relationship: "Friend", lastTransaction: "April 28, 2025", totalTransactions: 6, totalReceived: "$15,600.00" },
  { id: "BEN-020", name: "Lena Fischer", email: "lena.fischer@example.com", phone: "+49 160 987 6543", avatar: "LF", country: "Germany", countryFlag: "🇩🇪", bankName: "Commerzbank", bankBranch: "Frankfurt Branch", accountNumber: "DE75 2004 0060", routingNumber: "6274 3015 06", swiftCode: "COBADEFF", accountType: "Current Account", iban: "DE75200400600627430150", currency: "EUR", currencyName: "Euro", status: "Inactive", addedOn: "May 2, 2025", addedTime: "9:00 AM", dateOfBirth: "June 18, 1990", address: "Kaiserstraße 29, 60311 Frankfurt am Main, Germany", preferredCurrency: "EUR - Euro", purpose: "Medical", relationship: "Relative", lastTransaction: "April 15, 2025", totalTransactions: 4, totalReceived: "€9,800.00" },
];

const PAGE_SIZE = 10;
const TOTAL = 2458;
const ACTIVE = 2156;
const INACTIVE = 186;
const WEEK_ADDED = 45;

const countryOptions = ["All Countries", "Bangladesh", "Philippines", "Pakistan", "UAE", "Saudi Arabia", "India", "Nigeria", "Malaysia", "United Kingdom", "United States", "Germany", "Australia", "Qatar", "Canada", "Japan", "Portugal", "Singapore"];
const statusOptions = ["All Status", "Active", "Inactive", "Pending"];
const currencyOptions = ["All Currencies", "BDT - Bangladeshi Taka", "PHP - Philippine Peso", "PKR - Pakistani Rupee", "AED - UAE Dirham", "SAR - Saudi Riyal", "INR - Indian Rupee", "NGN - Nigerian Naira", "MYR - Malaysian Ringgit", "GBP - British Pound", "USD - US Dollar", "EUR - Euro", "AUD - Australian Dollar", "QAR - Qatari Riyal", "CAD - Canadian Dollar", "JPY - Japanese Yen", "SGD - Singapore Dollar"];

// ── Sparkline SVG ─────────────────────────────────────────────────────────────
// Each card has its own distinct data pattern matching the screenshot
const sparklineData: Record<string, number[]> = {
  blue: [4, 10, 6, 14, 8, 12, 5, 15, 7, 13, 9, 16, 11, 18],   // Total - gently rising zigzag
  green: [6, 12, 8, 16, 10, 14, 8, 18, 10, 16, 12, 20, 14, 22], // Active - rising
  orange: [20, 14, 18, 10, 16, 8, 14, 6, 12, 8, 10, 6, 8, 4],    // Inactive - falling
  purple: [5, 12, 7, 16, 9, 14, 8, 18, 10, 15, 12, 20, 14, 22],  // Week Added - rising
};

const Sparkline = ({ color, colorKey }: { color: string; colorKey: string }) => {
  const pts = sparklineData[colorKey] || sparklineData.blue;
  const W = 160, H = 36, PAD = 4;
  const max = Math.max(...pts), min = Math.min(...pts);
  const range = max - min || 1;

  const coords = pts.map((p, i) => {
    const x = PAD + (i / (pts.length - 1)) * (W - PAD * 2);
    const y = PAD + (1 - (p - min) / range) * (H - PAD * 2);
    return { x, y };
  });

  const polyline = coords.map(c => `${c.x},${c.y}`).join(" ");

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" style={{ display: "block", marginTop: 8 }}>
      {/* Sharp line connecting all points */}
      <polyline
        points={polyline}
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dot on every point */}
      {coords.map((c, i) => (
        <circle
          key={i}
          cx={c.x}
          cy={c.y}
          r="2.8"
          fill={color}
          stroke="#fff"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
};

// ── Avatar ────────────────────────────────────────────────────────────────────
const avatarColors: Record<string, string> = {
  RU: "#2563eb", MS: "#db2777", AK: "#16a34a", MA: "#9333ea", IK: "#f59e0b", PS: "#0891b2", SO: "#dc2626", SA: "#059669", DW: "#7c3aed", EJ: "#ea580c", KH: "#0284c7", NI: "#65a30d", OS: "#a16207", FM: "#c026d3", YT: "#0d9488", AP: "#b45309", CO: "#15803d", MC: "#1d4ed8", MB: "#7e22ce", LF: "#be185d",
};
const Avatar = ({ initials, size = 36 }: { initials: string; size?: number }) => {
  const color = avatarColors[initials] || "#64748b";
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: size * 0.33, flexShrink: 0 }}>
      {initials}
    </div>
  );
};

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: BeneficiaryStatus }) => {
  const map: Record<BeneficiaryStatus, { bg: string; color: string }> = {
    Active: { bg: "#dcfce7", color: "#16a34a" },
    Inactive: { bg: "#f1f5f9", color: "#64748b" },
    Pending: { bg: "#fef3c7", color: "#d97706" },
  };
  const s = map[status];
  return (
    <span style={{ padding: "2px 10px", borderRadius: 20, background: s.bg, color: s.color, fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
};

// ── Detail Row ────────────────────────────────────────────────────────────────
const DR = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "6px 0", borderBottom: "1px solid #f1f5f9" }}>
    <span style={{ fontSize: 13, color: "#64748b", flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: 13, color: "#0f172a", fontWeight: 500, textAlign: "right" }}>{value}</span>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BeneficiariesPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [status, setStatus] = useState("All Status");
  const [currency, setCurrency] = useState("All Currencies");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>(["BEN-001"]);
  const [detailId, setDetailId] = useState<string | null>("BEN-001");
  const [showDetail, setShowDetail] = useState(true);
  const [detailMore, setDetailMore] = useState(false);
  const [perPage, setPerPage] = useState(10);

  const filtered = useMemo(() => {
    return beneficiariesData.filter(b => {
      const q = search.toLowerCase();
      const matchSearch = !search || b.name.toLowerCase().includes(q) || b.email.toLowerCase().includes(q) || b.phone.includes(q) || b.accountNumber.toLowerCase().includes(q);
      const matchCountry = country === "All Countries" || b.country === country;
      const matchStatus = status === "All Status" || b.status === status;
      const matchCurrency = currency === "All Currencies" || b.currencyName.toLowerCase().includes(currency.split(" - ")[0].toLowerCase());
      return matchSearch && matchCountry && matchStatus && matchCurrency;
    });
  }, [search, country, status, currency]);

  const totalPages = Math.max(1, Math.ceil(TOTAL / perPage));
  const pageRows = beneficiariesData.slice((page - 1) * perPage, page * perPage);
  const detailBen = beneficiariesData.find(b => b.id === detailId) || beneficiariesData[0];

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const openDetail = (b: Beneficiary) => {
    setDetailId(b.id);
    setShowDetail(true);
  };

  const stats = [
    {
      label: "Total Beneficiaries", value: TOTAL.toLocaleString(), change: "+12.5% from last week", up: true, color: "#2563eb", colorKey: "blue", icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="#2563eb" strokeWidth="2" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" /></svg>
      )
    },
    {
      label: "Active Beneficiaries", value: ACTIVE.toLocaleString(), change: "+10.3% from last week", up: true, color: "#16a34a", colorKey: "green", icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="2" /><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )
    },
    {
      label: "Inactive Beneficiaries", value: INACTIVE.toLocaleString(), change: "-5.2% from last week", up: false, color: "#f59e0b", colorKey: "orange", icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="2" /><path d="M12 8v4m0 4h.01" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" /></svg>
      )
    },
    {
      label: "This Week Added", value: WEEK_ADDED.toLocaleString(), change: "+15.8% from last week", up: true, color: "#8b5cf6", colorKey: "purple", icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" /></svg>
      )
    },
  ];

  return (
    <div style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif", background: "#f8fafc", minHeight: "100vh", color: "#0f172a" }}>
      {/* Page wrapper */}
      <div style={{ padding: "24px", maxWidth: "100%", boxSizing: "border-box" }}>

        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, marginBottom: 4 }}>Beneficiaries</h1>
          <div style={{ fontSize: 13, color: "#64748b", display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ cursor: "pointer", color: "#2563eb" }}>Dashboard</span>
            <span>›</span>
            <span style={{ cursor: "pointer", color: "#2563eb" }}>Beneficiaries</span>
            <span>›</span>
            <span>Receiver List</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: "#0f172a" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: s.up ? "#16a34a" : "#ef4444", marginTop: 4, display: "flex", alignItems: "center", gap: 2 }}>
                    <span>{s.up ? "+" : ""}{s.change}</span>
                  </div>
                </div>
                <div style={{ padding: 8, background: `${s.color}15`, borderRadius: 8 }}>{s.icon}</div>
              </div>
              <Sparkline color={s.color} colorKey={s.colorKey} />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          {/* Table Panel */}
          <div style={{ flex: 1, minWidth: 0, background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", overflow: "hidden" }}>
            {/* Filters */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              {/* Search */}
              <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
                <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} width="15" height="15" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="#94a3b8" strokeWidth="2" /><path d="m21 21-4.35-4.35" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" /></svg>
                <input
                  value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Search by name, email, phone or account..."
                  style={{ width: "100%", paddingLeft: 32, paddingRight: 12, height: 36, border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box", color: "#0f172a", background: "#f8fafc" }}
                />
              </div>
              {/* Country filter */}
              <select value={country} onChange={e => { setCountry(e.target.value); setPage(1); }} style={{ height: 36, border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, padding: "0 10px", color: "#0f172a", background: "#fff", cursor: "pointer", minWidth: 130 }}>
                {countryOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              {/* Status filter */}
              <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} style={{ height: 36, border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, padding: "0 10px", color: "#0f172a", background: "#fff", cursor: "pointer", minWidth: 110 }}>
                {statusOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              {/* Currency filter */}
              <select value={currency} onChange={e => { setCurrency(e.target.value); setPage(1); }} style={{ height: 36, border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, padding: "0 10px", color: "#0f172a", background: "#fff", cursor: "pointer", minWidth: 130 }}>
                {currencyOptions.map(o => <option key={o}>{o}</option>)}
              </select>
              {/* Filter icon */}
              <button style={{ height: 36, padding: "0 12px", border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#374151" }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M22 3H2l8 9.46V19l4 2v-8.54z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Filters
              </button>
              <button style={{ height: 36, width: 36, border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="#374151" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ width: 36, padding: "10px 8px 10px 16px", textAlign: "left" }}>
                      <input type="checkbox" onChange={e => setSelected(e.target.checked ? pageRows.map(r => r.id) : [])} checked={pageRows.every(r => selected.includes(r.id))} style={{ cursor: "pointer" }} />
                    </th>
                    {["Beneficiary", "Country", "Bank Details", "Account / IBAN", "Currency", "Status", "Added On", "Actions"].map(h => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#374151", whiteSpace: "nowrap", fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((b, idx) => {
                    const isSelected = selected.includes(b.id);
                    const isActive = detailId === b.id;
                    return (
                      <tr key={b.id} onClick={() => openDetail(b)} style={{ borderBottom: "1px solid #f1f5f9", background: isSelected ? "#eff6ff" : isActive ? "#f0fdf4" : idx % 2 === 0 ? "#fff" : "#fafafa", cursor: "pointer", transition: "background 0.15s" }}>
                        <td style={{ padding: "12px 8px 12px 16px" }} onClick={e => e.stopPropagation()}>
                          <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(b.id)} style={{ cursor: "pointer" }} />
                        </td>
                        {/* Beneficiary */}
                        <td style={{ padding: "12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Avatar initials={b.avatar} />
                            <div>
                              <div style={{ fontWeight: 600, color: "#0f172a", fontSize: 13 }}>{b.name}</div>
                              <div style={{ color: "#64748b", fontSize: 11 }}>{b.email}</div>
                              <div style={{ color: "#94a3b8", fontSize: 11 }}>{b.phone}</div>
                            </div>
                          </div>
                        </td>
                        {/* Country */}
                        <td style={{ padding: "12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 18 }}>{b.countryFlag}</span>
                            <span style={{ color: "#374151" }}>{b.country}</span>
                          </div>
                        </td>
                        {/* Bank Details */}
                        <td style={{ padding: "12px" }}>
                          <div style={{ fontWeight: 500, color: "#0f172a" }}>{b.bankName}</div>
                          <div style={{ color: "#64748b", fontSize: 11 }}>{b.bankBranch}</div>
                        </td>
                        {/* Account */}
                        <td style={{ padding: "12px" }}>
                          <div style={{ fontWeight: 500, color: "#0f172a", fontFamily: "monospace" }}>{b.accountNumber}</div>
                          <div style={{ color: "#64748b", fontSize: 11 }}>{b.routingNumber}</div>
                        </td>
                        {/* Currency */}
                        <td style={{ padding: "12px" }}>
                          <div style={{ fontWeight: 500, color: "#0f172a" }}>{b.currency}</div>
                          <div style={{ color: "#64748b", fontSize: 11 }}>{b.currencyName}</div>
                        </td>
                        {/* Status */}
                        <td style={{ padding: "12px" }}><StatusBadge status={b.status} /></td>
                        {/* Added On */}
                        <td style={{ padding: "12px" }}>
                          <div style={{ color: "#374151" }}>{b.addedOn}</div>
                          <div style={{ color: "#94a3b8", fontSize: 11 }}>{b.addedTime}</div>
                        </td>
                        {/* Actions */}
                        <td style={{ padding: "12px" }} onClick={e => e.stopPropagation()}>
                          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: 4, borderRadius: 4 }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>Showing 1 to {perPage} of {TOTAL.toLocaleString()} beneficiaries</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #e2e8f0", background: page === 1 ? "#f8fafc" : "#fff", cursor: page === 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
                {[1, 2, 3].map(p => (
                  <button key={p} onClick={() => setPage(p)} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #e2e8f0", background: page === p ? "#2563eb" : "#fff", color: page === p ? "#fff" : "#374151", cursor: "pointer", fontWeight: page === p ? 600 : 400, fontSize: 13 }}>{p}</button>
                ))}
                <span style={{ color: "#64748b" }}>...</span>
                <button onClick={() => setPage(totalPages)} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #e2e8f0", background: page === totalPages ? "#2563eb" : "#fff", color: page === totalPages ? "#fff" : "#374151", cursor: "pointer", fontSize: 13 }}>{totalPages}</button>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #e2e8f0", background: page === totalPages ? "#f8fafc" : "#fff", cursor: page === totalPages ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
                <select value={perPage} onChange={e => setPerPage(Number(e.target.value))} style={{ height: 30, border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 13, padding: "0 8px", cursor: "pointer" }}>
                  {[10, 25, 50].map(n => <option key={n} value={n}>{n} / page</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          {showDetail && (
            <div style={{ width: 320, flexShrink: 0, background: "#fff", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", overflow: "hidden" }}>
              {/* Panel Header */}
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>Beneficiary Details</span>
                <button onClick={() => setShowDetail(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: 18, lineHeight: 1, padding: 2 }}>×</button>
              </div>

              <div style={{ padding: "16px 20px", overflowY: "auto", maxHeight: "calc(100vh - 300px)" }}>
                {/* Profile */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                      <Avatar initials={detailBen.avatar} size={48} />
                      <div style={{ position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: "50%", background: "#16a34a", border: "2px solid #fff" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{detailBen.name}</div>
                      <div style={{ color: "#64748b", fontSize: 12 }}>{detailBen.email}</div>
                      <div style={{ color: "#64748b", fontSize: 12 }}>{detailBen.phone}</div>
                    </div>
                  </div>
                  <StatusBadge status={detailBen.status} />
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                  <button style={{ flex: 1, height: 36, background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Send Money</button>
                  <button style={{ height: 36, padding: "0 14px", background: "#fff", color: "#374151", border: "1px solid #e2e8f0", borderRadius: 8, fontWeight: 500, fontSize: 13, cursor: "pointer" }}>Edit</button>
                  <div style={{ position: "relative" }}>
                    <button onClick={() => setDetailMore(v => !v)} style={{ height: 36, padding: "0 10px", background: "#fff", color: "#374151", border: "1px solid #e2e8f0", borderRadius: 8, fontWeight: 500, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      More <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" /></svg>
                    </button>
                    {detailMore && (
                      <div style={{ position: "absolute", top: 40, right: 0, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10, minWidth: 120, overflow: "hidden" }}>
                        {["View History", "Duplicate", "Export"].map(item => (
                          <button key={item} onClick={() => setDetailMore(false)} style={{ display: "block", width: "100%", padding: "9px 14px", textAlign: "left", background: "none", border: "none", fontSize: 13, cursor: "pointer", color: "#374151" }}>{item}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Basic Info */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "#0f172a" }}>Basic Information</div>
                  <DR label="Full Name" value={detailBen.name} />
                  <DR label="Date of Birth" value={detailBen.dateOfBirth} />
                  <DR label="Country" value={`${detailBen.countryFlag} ${detailBen.country}`} />
                  <DR label="Address" value={detailBen.address} />
                </div>

                {/* Bank Details */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "#0f172a" }}>Bank Details</div>
                  <DR label="Bank Name" value={detailBen.bankName} />
                  <DR label="Branch" value={detailBen.bankBranch} />
                  <DR label="Account Number" value={detailBen.accountNumber} />
                  <DR label="Routing Number" value={detailBen.routingNumber} />
                  <DR label="SWIFT Code" value={detailBen.swiftCode} />
                  <DR label="Account Type" value={detailBen.accountType} />
                </div>

                {/* Preferences */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, color: "#0f172a" }}>Preferences</div>
                  <DR label="Preferred Currency" value={detailBen.preferredCurrency} />
                  <DR label="Purpose" value={detailBen.purpose} />
                  <DR label="Relationship" value={detailBen.relationship} />
                  <DR label="Added On" value={`${detailBen.addedOn} ${detailBen.addedTime}`} />
                  <DR label="Last Transaction" value={detailBen.lastTransaction} />
                  <DR label="Total Transactions" value={String(detailBen.totalTransactions)} />
                  <DR label="Total Received" value={detailBen.totalReceived} />
                </div>

                {/* Remove */}
                <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 13, fontWeight: 500, padding: "8px 0" }}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" /><path d="M19 6l-1 14H6L5 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" /><path d="M10 11v6M14 11v6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" /><path d="M9 6V4h6v2" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" /></svg>
                  Remove Beneficiary
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .detail-panel { display: none !important; }
        }
        @media (max-width: 768px) {
          table th:nth-child(4), table td:nth-child(4),
          table th:nth-child(5), table td:nth-child(5),
          table th:nth-child(7), table td:nth-child(7) {
            display: none;
          }
        }
        @media (max-width: 560px) {
          table th:nth-child(3), table td:nth-child(3),
          table th:nth-child(6), table td:nth-child(6) {
            display: none;
          }
        }
        * { box-sizing: border-box; }
        input[type="checkbox"] { accent-color: #2563eb; }
        tr:hover { background: #f0f9ff !important; }
        select:focus, input:focus { outline: 2px solid #2563eb; outline-offset: -1px; }
        button:hover { opacity: 0.85; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>
    </div>
  );
}