// ─── Types ───────────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  user: string;
  from: string;
  to: string;
  amount: string;
  method: string;
  methodType: "card" | "bank" | "wallet" | "cash";
  status: "Completed" | "Pending" | "Failed" | "Refunded";
  time: string;
}

export interface KYCUser {
  name: string;
  email: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
  avatar: string;
}

export interface Alert {
  type: "high" | "warning" | "info" | "success";
  title: string;
  description: string;
  time: string;
}

export interface FraudAlert {
  type: "high" | "medium" | "low";
  title: string;
  description: string;
  time: string;
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export const statsData = [
  { label: "Total Transfer Volume", value: "$15,812,320", change: "+12.5%", positive: true, color: "green" },
  { label: "Total Transactions",    value: "24,752",      change: "+8.3%",  positive: true, color: "blue" },
  { label: "Total Revenue",         value: "$425,780",    change: "+15.7%", positive: true, color: "purple" },
  { label: "Net Profit",            value: "$235,460",    change: "+10.2%", positive: true, color: "yellow" },
  { label: "Active Users",          value: "8,642",       change: "+18.6%", positive: true, color: "cyan" },
  { label: "Pending KYC",           value: "124",         change: "-5.2%",  positive: false, color: "red" },
];

// ─── Chart Data ──────────────────────────────────────────────────────────────

export const transactionVolumeData = {
  labels: ["May 6", "May 7", "May 8", "May 9", "May 10", "May 11", "May 12"],
  datasets: [{
    label: "Volume",
    data: [310000, 420000, 380000, 510000, 470000, 620000, 892540],
    borderColor: "#16a34a",
    backgroundColor: "rgba(22,163,74,0.08)",
    fill: true,
    tension: 0.4,
    pointBackgroundColor: "#16a34a",
    pointRadius: 4,
    pointHoverRadius: 6,
  }],
};

export const transactionStatusData = {
  labels: ["Completed", "Pending", "Failed", "Refunded"],
  datasets: [{
    data: [18752, 3124, 1563, 1313],
    backgroundColor: ["#16a34a", "#f59e0b", "#ef4444", "#6366f1"],
    borderWidth: 0,
    hoverOffset: 4,
  }],
};

export const revenueOverviewData = {
  labels: ["May 1","May 3","May 5","May 7","May 9","May 11","May 12"],
  datasets: [{
    label: "Revenue",
    data: [28000, 35000, 42000, 38000, 51000, 47000, 58000],
    backgroundColor: "#16a34a",
    borderRadius: 4,
    borderSkipped: false,
  }],
};

// ─── Transactions ─────────────────────────────────────────────────────────────

export const recentTransactions: Transaction[] = [
  { id: "TSM123456789", user: "John Doe",      from: "USA",          to: "Bangladesh", amount: "$500.00",   method: "Visa Card",     methodType: "card",   status: "Completed", time: "2 min ago" },
  { id: "TSM123456788", user: "Ahmed Khan",    from: "UK",           to: "Bangladesh", amount: "$300.00",   method: "Bank Transfer", methodType: "bank",   status: "Pending",   time: "10 min ago" },
  { id: "TSM123456787", user: "Rashid Ahmed",  from: "UAE",          to: "Bangladesh", amount: "$750.00",   method: "Cash Pickup",   methodType: "cash",   status: "Completed", time: "20 min ago" },
  { id: "TSM123456786", user: "Salma Begum",   from: "Saudi Arabia", to: "BD",         amount: "$1,000.00", method: "Mobile Wallet", methodType: "wallet", status: "Pending",   time: "25 min ago" },
  { id: "TSM123456785", user: "Imran Hossain", from: "Malaysia",     to: "Bangladesh", amount: "$200.00",   method: "Bank Transfer", methodType: "bank",   status: "Failed",    time: "30 min ago" },
];

export const allTransactions: Transaction[] = [
  ...recentTransactions,
  { id: "TSM123456784", user: "Fatima Malik",  from: "Canada",       to: "Bangladesh", amount: "$850.00",   method: "Visa Card",     methodType: "card",   status: "Completed", time: "1 hr ago" },
  { id: "TSM123456783", user: "Karim Hassan",  from: "Germany",      to: "Bangladesh", amount: "$450.00",   method: "Bank Transfer", methodType: "bank",   status: "Completed", time: "2 hr ago" },
  { id: "TSM123456782", user: "Nadia Islam",   from: "Australia",    to: "Bangladesh", amount: "$320.00",   method: "Mobile Wallet", methodType: "wallet", status: "Refunded",  time: "3 hr ago" },
  { id: "TSM123456781", user: "Rahim Uddin",   from: "Italy",        to: "Bangladesh", amount: "$600.00",   method: "Cash Pickup",   methodType: "cash",   status: "Pending",   time: "4 hr ago" },
  { id: "TSM123456780", user: "Sadia Akter",   from: "France",       to: "Bangladesh", amount: "$150.00",   method: "Visa Card",     methodType: "card",   status: "Failed",    time: "5 hr ago" },
];

// ─── KYC ─────────────────────────────────────────────────────────────────────

export const kycUsers: KYCUser[] = [
  { name: "MD Arif Hossain",  email: "arif@example.com",    date: "May 12, 2025", status: "Pending",  avatar: "AH" },
  { name: "Nusrat Jahan",     email: "nusrat@example.com",  date: "May 12, 2025", status: "Pending",  avatar: "NJ" },
  { name: "Kamrul Hasan",     email: "kamrul@example.com",  date: "May 12, 2025", status: "Pending",  avatar: "KH" },
  { name: "Farzana Akter",    email: "farzana@example.com", date: "May 12, 2025", status: "Pending",  avatar: "FA" },
];

// ─── Alerts ──────────────────────────────────────────────────────────────────

export const systemAlerts: Alert[] = [
  { type: "high",    title: "High Risk Transaction",  description: "Transaction TSM123456789 flagged as high risk", time: "2 min ago" },
  { type: "warning", title: "Large Amount Transfer",  description: "$25,000 transfer to BD from USA",              time: "15 min ago" },
  { type: "info",    title: "KYC Pending",            description: "124 users pending KYC verification",           time: "1 hour ago" },
  { type: "success", title: "Exchange Rate Updated",  description: "USD/BDT rate updated: 110.25",                 time: "2 hours ago" },
];

export const fraudAlerts: FraudAlert[] = [
  { type: "high",   title: "High Risk Transaction",     description: "TRID: TSM123456789",             time: "2 min ago" },
  { type: "medium", title: "Velocity Limit Exceeded",   description: "User: john.doe@example.com",     time: "15 min ago" },
  { type: "medium", title: "Multiple Account Detected", description: "User: ahmed.khan@example.com",   time: "45 min ago" },
  { type: "low",    title: "Suspicious Location",       description: "User: 192.168.1.45",             time: "1 hour ago" },
];

// ─── Corridors ────────────────────────────────────────────────────────────────

export const topCorridors = [
  { from: "USA",          to: "Bangladesh", amount: "$4,258,650", pct: 100 },
  { from: "UAE",          to: "Bangladesh", amount: "$2,985,420", pct: 70 },
  { from: "UK",           to: "Bangladesh", amount: "$2,456,800", pct: 58 },
  { from: "Saudi Arabia", to: "Bangladesh", amount: "$1,856,540", pct: 44 },
  { from: "Malaysia",     to: "Bangladesh", amount: "$1,256,780", pct: 30 },
];

// ─── Totals ───────────────────────────────────────────────────────────────────

export const periodTotals = [
  { label: "Today",      value: "$892,540" },
  { label: "Yesterday",  value: "$745,230" },
  { label: "This Week",  value: "$4,256,540" },
  { label: "This Month", value: "$15,812,320" },
];
