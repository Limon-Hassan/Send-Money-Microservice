import { Transaction, UserProfile, PaymentMethod } from "@/types";

export const mockUser: UserProfile = {
  userId: "TSM-1002456",
  name: "John Rahman",
  phone: "+880 1812-345678",
  dob: "15 Jun 1990",
  nid: "NID: 1234 5678 9012",
  address: "House 12, Road 5, Dhanmondi, Dhaka, Bangladesh",
  country: "Bangladesh",
  email: "johnrahman@gmail.com",
  walletBalance: 1250.0,
  currency: "USD",
  verified: true,
};

export const mockTransactions: Transaction[] = [
  {
    id: "#TSM12345678",
    to: "Ahmed Khan",
    amount: 500.0,
    currency: "USD",
    status: "Completed",
    date: "12 May 2025",
    time: "10:30 AM",
  },
  {
    id: "#TSM12345677",
    to: "Rahim Uddin",
    amount: 300.0,
    currency: "USD",
    status: "Completed",
    date: "11 May 2025",
    time: "08:15 AM",
  },
  {
    id: "#TSM12345676",
    to: "Salma Begum",
    amount: 200.0,
    currency: "USD",
    status: "Pending",
    date: "10 May 2025",
    time: "04:20 PM",
  },
  {
    id: "#TSM12345675",
    to: "Rashed Ali",
    amount: 150.0,
    currency: "USD",
    status: "Completed",
    date: "09 May 2025",
    time: "02:10 PM",
  },
  {
    id: "#TSM12345674",
    to: "Nadia Islam",
    amount: 750.0,
    currency: "USD",
    status: "Failed",
    date: "08 May 2025",
    time: "11:45 AM",
  },
  {
    id: "#TSM12345673",
    to: "Karim Hossain",
    amount: 420.0,
    currency: "USD",
    status: "Completed",
    date: "07 May 2025",
    time: "09:00 AM",
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  { type: "credit-card", label: "Credit / Debit Card", count: "2 Cards Added" },
  { type: "bank", label: "Bank Account", count: "3 Accounts Added" },
  { type: "wallet", label: "Wallet", count: "$450.00 Balance" },
];

export const currencies = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar" },
  { code: "EUR", flag: "🇪🇺", name: "Euro" },
  { code: "GBP", flag: "🇬🇧", name: "British Pound" },
  { code: "BDT", flag: "🇧🇩", name: "Bangladeshi Taka" },
  { code: "AED", flag: "🇦🇪", name: "UAE Dirham" },
  { code: "SAR", flag: "🇸🇦", name: "Saudi Riyal" },
  { code: "CAD", flag: "🇨🇦", name: "Canadian Dollar" },
  { code: "AUD", flag: "🇦🇺", name: "Australian Dollar" },
];

export const exchangeRates: Record<string, number> = {
  "USD-EUR": 0.9205,
  "USD-GBP": 0.7892,
  "USD-BDT": 110.5,
  "USD-AED": 3.6725,
  "USD-SAR": 3.75,
  "USD-CAD": 1.3612,
  "USD-AUD": 1.5234,
  "EUR-USD": 1.0863,
  "GBP-USD": 1.2672,
};

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
