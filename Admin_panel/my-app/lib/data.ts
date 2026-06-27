export interface Transaction {
  id: string;
  user: string;
  from: string;
  to: string;
  amount: string;
  method: string;
  methodType: 'card' | 'bank' | 'wallet' | 'cash';
  status: 'Completed' | 'Pending' | 'Failed' | 'Refunded';
  time: string;
}

export interface KYCUser {
  name: string;
  email: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  avatar: string;
}

export interface Alert {
  type: 'high' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  time: string;
}

export interface FraudAlert {
  type: 'high' | 'mediums' | 'medium' | 'low';
  title: string;
  description: string;
  time: string;
}

export const statsData = [
  {
    label: 'Total Transfer Volume',
    value: '$15,812,320',
    change: '+12.5%',
    positive: true,
    color: 'green',
  },
  {
    label: 'Total Transactions',
    value: '24,752',
    change: '+8.3%',
    positive: true,
    color: 'blue',
  },
  {
    label: 'Total Revenue',
    value: '$425,780',
    change: '+15.7%',
    positive: true,
    color: 'purple',
  },
  {
    label: 'Net Profit',
    value: '$235,460',
    change: '+10.2%',
    positive: true,
    color: 'yellow',
  },
  {
    label: 'Active Users',
    value: '8,642',
    change: '+18.6%',
    positive: true,
    color: 'cyan',
  },
  {
    label: 'Pending KYC',
    value: '124',
    change: '-5.2%',
    positive: false,
    color: 'red',
  },
];

export const transactionVolumeData = {
  labels: ['May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'],
  datasets: [
    {
      label: 'Volume',
      data: [310000, 420000, 380000, 510000, 470000, 620000, 892540],
      borderColor: '#16a34a',
      backgroundColor: 'rgba(22,163,74,0.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#16a34a',
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

export const transactionStatusData = {
  labels: ['Completed', 'Pending', 'Failed', 'Refunded'],
  datasets: [
    {
      data: [18752, 3124, 1563, 1313],
      backgroundColor: ['#16a34a', '#f59e0b', '#ef4444', '#6366f1'],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
};

export const revenueOverviewData = {
  labels: ['May 1', 'May 3', 'May 5', 'May 7', 'May 9', 'May 11', 'May 12'],
  datasets: [
    {
      label: 'Revenue',
      data: [28000, 50000, 22000, 45000, 10000, 58000, 38000],
      backgroundColor: '#16a34a',
      borderRadius: 0,
      borderSkipped: false,
      barPercentage: 0.45,
      categoryPercentage: 0.7,
    },
    {
      label: 'Fees',
      data: [15000, 20000, 30000, 18000, 25000, 22000, 20000],
      backgroundColor: '#86efac',
      borderRadius: 0,
      borderSkipped: false,
      barPercentage: 0.45,
      categoryPercentage: 0.7,
    },
  ],
};

export const recentTransactions: Transaction[] = [
  {
    id: 'TSM123456789',
    user: 'John Doe',
    from: 'USA',
    to: 'Bangladesh',
    amount: '$500.00',
    method: 'Visa Card',
    methodType: 'card',
    status: 'Completed',
    time: '2 min ago',
  },
  {
    id: 'TSM123456788',
    user: 'Ahmed Khan',
    from: 'UK',
    to: 'Bangladesh',
    amount: '$300.00',
    method: 'Bank Transfer',
    methodType: 'bank',
    status: 'Pending',
    time: '10 min ago',
  },
  {
    id: 'TSM123456787',
    user: 'Rashid Ahmed',
    from: 'UAE',
    to: 'Bangladesh',
    amount: '$750.00',
    method: 'Cash Pickup',
    methodType: 'cash',
    status: 'Completed',
    time: '20 min ago',
  },
  {
    id: 'TSM123456786',
    user: 'Salma Begum',
    from: 'Saudi Arabia',
    to: 'BD',
    amount: '$1,000.00',
    method: 'Mobile Wallet',
    methodType: 'wallet',
    status: 'Pending',
    time: '25 min ago',
  },
  {
    id: 'TSM123456785',
    user: 'Imran Hossain',
    from: 'Malaysia',
    to: 'Bangladesh',
    amount: '$200.00',
    method: 'Bank Transfer',
    methodType: 'bank',
    status: 'Failed',
    time: '30 min ago',
  },
];

export const allTransactions: Transaction[] = [
  ...recentTransactions,
  {
    id: 'TSM123456784',
    user: 'Fatima Malik',
    from: 'Canada',
    to: 'Bangladesh',
    amount: '$850.00',
    method: 'Visa Card',
    methodType: 'card',
    status: 'Completed',
    time: '1 hr ago',
  },
  {
    id: 'TSM123456783',
    user: 'Karim Hassan',
    from: 'Germany',
    to: 'Bangladesh',
    amount: '$450.00',
    method: 'Bank Transfer',
    methodType: 'bank',
    status: 'Completed',
    time: '2 hr ago',
  },
  {
    id: 'TSM123456782',
    user: 'Nadia Islam',
    from: 'Australia',
    to: 'Bangladesh',
    amount: '$320.00',
    method: 'Mobile Wallet',
    methodType: 'wallet',
    status: 'Refunded',
    time: '3 hr ago',
  },
  {
    id: 'TSM123456781',
    user: 'Rahim Uddin',
    from: 'Italy',
    to: 'Bangladesh',
    amount: '$600.00',
    method: 'Cash Pickup',
    methodType: 'cash',
    status: 'Pending',
    time: '4 hr ago',
  },
  {
    id: 'TSM123456780',
    user: 'Sadia Akter',
    from: 'France',
    to: 'Bangladesh',
    amount: '$150.00',
    method: 'Visa Card',
    methodType: 'card',
    status: 'Failed',
    time: '5 hr ago',
  },
];

export const kycUsers: KYCUser[] = [
  {
    name: 'MD Arif Hossain',
    email: 'arif@example.com',
    date: 'May 12, 2025',
    status: 'Pending',
    avatar: 'AH',
  },
  {
    name: 'Nusrat Jahan',
    email: 'nusrat@example.com',
    date: 'May 12, 2025',
    status: 'Pending',
    avatar: 'NJ',
  },
  {
    name: 'Kamrul Hasan',
    email: 'kamrul@example.com',
    date: 'May 12, 2025',
    status: 'Pending',
    avatar: 'KH',
  },
  {
    name: 'Farzana Akter',
    email: 'farzana@example.com',
    date: 'May 12, 2025',
    status: 'Pending',
    avatar: 'FA',
  },
];

export const systemAlerts: Alert[] = [
  {
    type: 'high',
    title: 'High Risk Transaction',
    description: 'Transaction TSM123456789 flagged as high risk',
    time: '2 min ago',
  },
  {
    type: 'warning',
    title: 'Large Amount Transfer',
    description: '$25,000 transfer to BD from USA',
    time: '15 min ago',
  },
  {
    type: 'info',
    title: 'KYC Pending',
    description: '124 users pending KYC verification',
    time: '1 hour ago',
  },
  {
    type: 'success',
    title: 'Exchange Rate Updated',
    description: 'USD/BDT rate updated: 110.25',
    time: '2 hours ago',
  },
];

export const fraudAlerts: FraudAlert[] = [
  {
    type: 'high',
    title: 'High Risk Transaction',
    description: 'TRID: TSM123456789',
    time: '2 min ago',
  },
  {
    type: 'medium',
    title: 'Velocity Limit Exceeded',
    description: 'User: john.doe@example.com',
    time: '15 min ago',
  },
  {
    type: 'mediums',
    title: 'Multiple Account Detected',
    description: 'User: ahmed.khan@example.com',
    time: '45 min ago',
  },
  {
    type: 'low',
    title: 'Suspicious Location',
    description: 'User: 192.168.1.45',
    time: '1 hour ago',
  },
];

export const topCorridors = [
  { from: 'USA', to: 'Bangladesh', amount: '$4,258,650', pct: 100 },
  { from: 'UAE', to: 'Bangladesh', amount: '$2,985,420', pct: 70 },
  { from: 'UK', to: 'Bangladesh', amount: '$2,456,800', pct: 58 },
  { from: 'Saudi Arabia', to: 'Bangladesh', amount: '$1,856,540', pct: 44 },
  { from: 'Malaysia', to: 'Bangladesh', amount: '$1,256,780', pct: 30 },
];

export const periodTotals = [
  { label: 'Today', value: '$892,540' },
  { label: 'Yesterday', value: '$745,230' },
  { label: 'This Week', value: '$4,256,540' },
  { label: 'This Month', value: '$15,812,320' },
];

//users

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  avatar: string;
  customerId: string;
  joinedDate: string;
  lastLogin: string;
  country: string;
  countryFlag: string;
  kyc: {
    status: 'Verified' | 'Pending' | 'Rejected';
    identityProof: string;
    addressProof: string;
    selfieVerification: string;
    amlScreening: string;
    verifiedOn: string;
  };
  wallets: {
    currency: string;
    flag: string;
    balance: string;
    symbol: string;
  }[];
  quickStats: {
    totalTransactions: number;
    totalSent: string;
    totalReceived: string;
    averageTransaction: string;
    successRate: string;
  };
  recentTransactions: {
    id: string;
    type: string;
    to: string;
    toFlag: string;
    amount: string;
    fee: string;
    status: 'Completed' | 'Pending' | 'Failed' | 'Refunded';
    date: string;
  }[];
  documents: {
    title: string;
    type: string;
    status: 'Verified' | 'Pending' | 'Rejected';
    uploadedOn: string;
    icon: 'passport' | 'bill' | 'selfie';
  }[];
}

export const customersData: Customer[] = [
  {
    id: '1',
    name: 'John Rahman',
    email: 'john.rahman@example.com',
    phone: '+44 7700 900123',
    status: 'Verified',
    avatar: 'JR',
    customerId: 'CUS-25051901',
    joinedDate: 'May 19, 2025',
    lastLogin: 'May 19, 2025 10:30 AM',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    kyc: {
      status: 'Verified',
      identityProof: 'Passport',
      addressProof: 'Utility Bill',
      selfieVerification: 'Verified',
      amlScreening: 'Passed',
      verifiedOn: 'May 19, 2025',
    },
    wallets: [
      { currency: 'GBP Wallet', flag: '🇬🇧', balance: '£2,450.75', symbol: '£' },
      { currency: 'USD Wallet', flag: '🇺🇸', balance: '$1,280.40', symbol: '$' },
      { currency: 'EUR Wallet', flag: '🇪🇺', balance: '€980.30', symbol: '€' },
      {
        currency: 'BDT Settlement',
        flag: '🇧🇩',
        balance: '৳125,450.00',
        symbol: '৳',
      },
    ],
    quickStats: {
      totalTransactions: 24,
      totalSent: '£15,750.00',
      totalReceived: '£15,210.00',
      averageTransaction: '£656.25',
      successRate: '95.8%',
    },
    recentTransactions: [
      {
        id: 'TXN-25051901',
        type: 'Send Money',
        to: 'Bangladesh',
        toFlag: '🇧🇩',
        amount: '£520.00',
        fee: '£3.50',
        status: 'Completed',
        date: 'May 19, 2025',
      },
      {
        id: 'TXN-25051890',
        type: 'Send Money',
        to: 'India',
        toFlag: '🇮🇳',
        amount: '£750.00',
        fee: '£4.00',
        status: 'Completed',
        date: 'May 18, 2025',
      },
      {
        id: 'TXN-25051875',
        type: 'Send Money',
        to: 'Pakistan',
        toFlag: '🇵🇰',
        amount: '£320.00',
        fee: '£2.50',
        status: 'Completed',
        date: 'May 17, 2025',
      },
      {
        id: 'TXN-25051860',
        type: 'Top Up',
        to: 'GBP Wallet',
        toFlag: '🇬🇧',
        amount: '£500.00',
        fee: '£0.00',
        status: 'Completed',
        date: 'May 16, 2025',
      },
      {
        id: 'TXN-25051845',
        type: 'Withdraw',
        to: 'Bank Transfer',
        toFlag: '🏦',
        amount: '£300.00',
        fee: '£1.50',
        status: 'Completed',
        date: 'May 15, 2025',
      },
    ],
    documents: [
      {
        title: 'Passport',
        type: 'ID Proof',
        status: 'Verified',
        uploadedOn: 'May 19, 2025',
        icon: 'passport',
      },
      {
        title: 'Utility Bill',
        type: 'Address Proof',
        status: 'Verified',
        uploadedOn: 'May 19, 2025',
        icon: 'bill',
      },
      {
        title: 'Selfie',
        type: 'Selfie Verification',
        status: 'Verified',
        uploadedOn: 'May 19, 2025',
        icon: 'selfie',
      },
    ],
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+44 7700 900124',
    status: 'Pending',
    avatar: 'PS',
    customerId: 'CUS-25051902',
    joinedDate: 'May 18, 2025',
    lastLogin: 'May 18, 2025 03:15 PM',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    kyc: {
      status: 'Pending',
      identityProof: 'National ID',
      addressProof: 'Bank Statement',
      selfieVerification: 'Pending',
      amlScreening: 'In Progress',
      verifiedOn: '—',
    },
    wallets: [
      { currency: 'GBP Wallet', flag: '🇬🇧', balance: '£850.20', symbol: '£' },
      {
        currency: 'INR Wallet',
        flag: '🇮🇳',
        balance: '₹45,200.00',
        symbol: '₹',
      },
    ],
    quickStats: {
      totalTransactions: 8,
      totalSent: '£3,200.00',
      totalReceived: '£3,050.00',
      averageTransaction: '£400.00',
      successRate: '87.5%',
    },
    recentTransactions: [
      {
        id: 'TXN-25051810',
        type: 'Send Money',
        to: 'India',
        toFlag: '🇮🇳',
        amount: '£420.00',
        fee: '£3.00',
        status: 'Pending',
        date: 'May 18, 2025',
      },
      {
        id: 'TXN-25051795',
        type: 'Top Up',
        to: 'GBP Wallet',
        toFlag: '🇬🇧',
        amount: '£200.00',
        fee: '£0.00',
        status: 'Completed',
        date: 'May 17, 2025',
      },
    ],
    documents: [
      {
        title: 'National ID',
        type: 'ID Proof',
        status: 'Pending',
        uploadedOn: 'May 18, 2025',
        icon: 'passport',
      },
      {
        title: 'Bank Statement',
        type: 'Address Proof',
        status: 'Pending',
        uploadedOn: 'May 18, 2025',
        icon: 'bill',
      },
    ],
  },
  {
    id: '3',
    name: 'Ahmed Khan',
    email: 'ahmed.khan@example.com',
    phone: '+44 7700 900125',
    status: 'Verified',
    avatar: 'AK',
    customerId: 'CUS-25051903',
    joinedDate: 'May 15, 2025',
    lastLogin: 'May 19, 2025 08:45 AM',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    kyc: {
      status: 'Verified',
      identityProof: 'Passport',
      addressProof: 'Council Tax Bill',
      selfieVerification: 'Verified',
      amlScreening: 'Passed',
      verifiedOn: 'May 15, 2025',
    },
    wallets: [
      { currency: 'GBP Wallet', flag: '🇬🇧', balance: '£5,120.60', symbol: '£' },
      { currency: 'USD Wallet', flag: '🇺🇸', balance: '$2,800.00', symbol: '$' },
      {
        currency: 'PKR Wallet',
        flag: '🇵🇰',
        balance: '₨180,000.00',
        symbol: '₨',
      },
    ],
    quickStats: {
      totalTransactions: 42,
      totalSent: '£28,500.00',
      totalReceived: '£27,900.00',
      averageTransaction: '£678.57',
      successRate: '97.6%',
    },
    recentTransactions: [
      {
        id: 'TXN-25051920',
        type: 'Send Money',
        to: 'Pakistan',
        toFlag: '🇵🇰',
        amount: '£1,200.00',
        fee: '£5.00',
        status: 'Completed',
        date: 'May 19, 2025',
      },
      {
        id: 'TXN-25051905',
        type: 'Send Money',
        to: 'Bangladesh',
        toFlag: '🇧🇩',
        amount: '£680.00',
        fee: '£3.50',
        status: 'Completed',
        date: 'May 18, 2025',
      },
      {
        id: 'TXN-25051888',
        type: 'Withdraw',
        to: 'Bank Transfer',
        toFlag: '🏦',
        amount: '£500.00',
        fee: '£2.00',
        status: 'Completed',
        date: 'May 17, 2025',
      },
    ],
    documents: [
      {
        title: 'Passport',
        type: 'ID Proof',
        status: 'Verified',
        uploadedOn: 'May 15, 2025',
        icon: 'passport',
      },
      {
        title: 'Council Tax Bill',
        type: 'Address Proof',
        status: 'Verified',
        uploadedOn: 'May 15, 2025',
        icon: 'bill',
      },
      {
        title: 'Selfie',
        type: 'Selfie Verification',
        status: 'Verified',
        uploadedOn: 'May 15, 2025',
        icon: 'selfie',
      },
    ],
  },
  {
    id: '4',
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    phone: '+44 7700 900126',
    status: 'Verified',
    avatar: 'MS',
    customerId: 'CUS-25051904',
    joinedDate: 'May 10, 2025',
    lastLogin: 'May 19, 2025 11:20 AM',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    kyc: {
      status: 'Verified',
      identityProof: 'Driving License',
      addressProof: 'Utility Bill',
      selfieVerification: 'Verified',
      amlScreening: 'Passed',
      verifiedOn: 'May 10, 2025',
    },
    wallets: [
      { currency: 'GBP Wallet', flag: '🇬🇧', balance: '£3,780.45', symbol: '£' },
      { currency: 'EUR Wallet', flag: '🇪🇺', balance: '€1,450.00', symbol: '€' },
      {
        currency: 'PHP Wallet',
        flag: '🇵🇭',
        balance: '₱95,000.00',
        symbol: '₱',
      },
    ],
    quickStats: {
      totalTransactions: 31,
      totalSent: '£18,200.00',
      totalReceived: '£17,600.00',
      averageTransaction: '£587.10',
      successRate: '93.5%',
    },
    recentTransactions: [
      {
        id: 'TXN-25051930',
        type: 'Send Money',
        to: 'Philippines',
        toFlag: '🇵🇭',
        amount: '£950.00',
        fee: '£4.50',
        status: 'Completed',
        date: 'May 19, 2025',
      },
      {
        id: 'TXN-25051915',
        type: 'Top Up',
        to: 'GBP Wallet',
        toFlag: '🇬🇧',
        amount: '£1,000.00',
        fee: '£0.00',
        status: 'Completed',
        date: 'May 18, 2025',
      },
      {
        id: 'TXN-25051900',
        type: 'Send Money',
        to: 'Philippines',
        toFlag: '🇵🇭',
        amount: '£620.00',
        fee: '£3.50',
        status: 'Failed',
        date: 'May 17, 2025',
      },
    ],
    documents: [
      {
        title: 'Driving License',
        type: 'ID Proof',
        status: 'Verified',
        uploadedOn: 'May 10, 2025',
        icon: 'passport',
      },
      {
        title: 'Utility Bill',
        type: 'Address Proof',
        status: 'Verified',
        uploadedOn: 'May 10, 2025',
        icon: 'bill',
      },
      {
        title: 'Selfie',
        type: 'Selfie Verification',
        status: 'Verified',
        uploadedOn: 'May 10, 2025',
        icon: 'selfie',
      },
    ],
  },
  {
    id: '5',
    name: 'James Okafor',
    email: 'james.okafor@example.com',
    phone: '+44 7700 900127',
    status: 'Rejected',
    avatar: 'JO',
    customerId: 'CUS-25051905',
    joinedDate: 'May 8, 2025',
    lastLogin: 'May 12, 2025 02:00 PM',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    kyc: {
      status: 'Rejected',
      identityProof: 'Rejected',
      addressProof: 'Rejected',
      selfieVerification: 'Failed',
      amlScreening: 'Failed',
      verifiedOn: '—',
    },
    wallets: [
      { currency: 'GBP Wallet', flag: '🇬🇧', balance: '£0.00', symbol: '£' },
    ],
    quickStats: {
      totalTransactions: 2,
      totalSent: '£0.00',
      totalReceived: '£0.00',
      averageTransaction: '£0.00',
      successRate: '0%',
    },
    recentTransactions: [
      {
        id: 'TXN-25051820',
        type: 'Top Up',
        to: 'GBP Wallet',
        toFlag: '🇬🇧',
        amount: '£100.00',
        fee: '£0.00',
        status: 'Failed',
        date: 'May 8, 2025',
      },
    ],
    documents: [
      {
        title: 'Passport',
        type: 'ID Proof',
        status: 'Rejected',
        uploadedOn: 'May 8, 2025',
        icon: 'passport',
      },
    ],
  },
  {
    id: '6',
    name: 'Fatima Ali',
    email: 'fatima.ali@example.com',
    phone: '+44 7700 900128',
    status: 'Pending',
    avatar: 'FA',
    customerId: 'CUS-25051906',
    joinedDate: 'May 17, 2025',
    lastLogin: 'May 19, 2025 09:05 AM',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    kyc: {
      status: 'Pending',
      identityProof: 'Passport',
      addressProof: 'Pending',
      selfieVerification: 'Pending',
      amlScreening: 'In Progress',
      verifiedOn: '—',
    },
    wallets: [
      { currency: 'GBP Wallet', flag: '🇬🇧', balance: '£1,200.00', symbol: '£' },
      { currency: 'USD Wallet', flag: '🇺🇸', balance: '$450.00', symbol: '$' },
    ],
    quickStats: {
      totalTransactions: 5,
      totalSent: '£2,100.00',
      totalReceived: '£2,000.00',
      averageTransaction: '£420.00',
      successRate: '80.0%',
    },
    recentTransactions: [
      {
        id: 'TXN-25051940',
        type: 'Send Money',
        to: 'Bangladesh',
        toFlag: '🇧🇩',
        amount: '£380.00',
        fee: '£2.50',
        status: 'Pending',
        date: 'May 19, 2025',
      },
    ],
    documents: [
      {
        title: 'Passport',
        type: 'ID Proof',
        status: 'Verified',
        uploadedOn: 'May 17, 2025',
        icon: 'passport',
      },
      {
        title: 'Utility Bill',
        type: 'Address Proof',
        status: 'Pending',
        uploadedOn: 'May 17, 2025',
        icon: 'bill',
      },
    ],
  },
  {
    id: '7',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    phone: '+44 7700 900129',
    status: 'Verified',
    avatar: 'DW',
    customerId: 'CUS-25051907',
    joinedDate: 'Apr 30, 2025',
    lastLogin: 'May 19, 2025 07:30 AM',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    kyc: {
      status: 'Verified',
      identityProof: 'Passport',
      addressProof: 'Bank Statement',
      selfieVerification: 'Verified',
      amlScreening: 'Passed',
      verifiedOn: 'Apr 30, 2025',
    },
    wallets: [
      { currency: 'GBP Wallet', flag: '🇬🇧', balance: '£8,900.00', symbol: '£' },
      { currency: 'USD Wallet', flag: '🇺🇸', balance: '$4,200.00', symbol: '$' },
      { currency: 'EUR Wallet', flag: '🇪🇺', balance: '€2,100.00', symbol: '€' },
    ],
    quickStats: {
      totalTransactions: 68,
      totalSent: '£52,300.00',
      totalReceived: '£51,100.00',
      averageTransaction: '£769.12',
      successRate: '98.5%',
    },
    recentTransactions: [
      {
        id: 'TXN-25051950',
        type: 'Send Money',
        to: 'India',
        toFlag: '🇮🇳',
        amount: '£2,000.00',
        fee: '£6.00',
        status: 'Completed',
        date: 'May 19, 2025',
      },
      {
        id: 'TXN-25051935',
        type: 'Send Money',
        to: 'Nigeria',
        toFlag: '🇳🇬',
        amount: '£1,500.00',
        fee: '£5.50',
        status: 'Completed',
        date: 'May 18, 2025',
      },
      {
        id: 'TXN-25051920',
        type: 'Withdraw',
        to: 'Bank Transfer',
        toFlag: '🏦',
        amount: '£3,000.00',
        fee: '£5.00',
        status: 'Completed',
        date: 'May 17, 2025',
      },
    ],
    documents: [
      {
        title: 'Passport',
        type: 'ID Proof',
        status: 'Verified',
        uploadedOn: 'Apr 30, 2025',
        icon: 'passport',
      },
      {
        title: 'Bank Statement',
        type: 'Address Proof',
        status: 'Verified',
        uploadedOn: 'Apr 30, 2025',
        icon: 'bill',
      },
      {
        title: 'Selfie',
        type: 'Selfie Verification',
        status: 'Verified',
        uploadedOn: 'Apr 30, 2025',
        icon: 'selfie',
      },
    ],
  },
  {
    id: '8',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    phone: '+44 7700 900130',
    status: 'Verified',
    avatar: 'SM',
    customerId: 'CUS-25051908',
    joinedDate: 'May 5, 2025',
    lastLogin: 'May 19, 2025 12:00 PM',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    kyc: {
      status: 'Verified',
      identityProof: 'Driving License',
      addressProof: 'Council Tax Bill',
      selfieVerification: 'Verified',
      amlScreening: 'Passed',
      verifiedOn: 'May 5, 2025',
    },
    wallets: [
      { currency: 'GBP Wallet', flag: '🇬🇧', balance: '£4,350.80', symbol: '£' },
      { currency: 'EUR Wallet', flag: '🇪🇺', balance: '€2,800.00', symbol: '€' },
    ],
    quickStats: {
      totalTransactions: 19,
      totalSent: '£11,400.00',
      totalReceived: '£11,100.00',
      averageTransaction: '£600.00',
      successRate: '94.7%',
    },
    recentTransactions: [
      {
        id: 'TXN-25051960',
        type: 'Send Money',
        to: 'France',
        toFlag: '🇫🇷',
        amount: '£780.00',
        fee: '£3.50',
        status: 'Completed',
        date: 'May 19, 2025',
      },
      {
        id: 'TXN-25051945',
        type: 'Top Up',
        to: 'GBP Wallet',
        toFlag: '🇬🇧',
        amount: '£1,500.00',
        fee: '£0.00',
        status: 'Completed',
        date: 'May 18, 2025',
      },
    ],
    documents: [
      {
        title: 'Driving License',
        type: 'ID Proof',
        status: 'Verified',
        uploadedOn: 'May 5, 2025',
        icon: 'passport',
      },
      {
        title: 'Council Tax Bill',
        type: 'Address Proof',
        status: 'Verified',
        uploadedOn: 'May 5, 2025',
        icon: 'bill',
      },
      {
        title: 'Selfie',
        type: 'Selfie Verification',
        status: 'Verified',
        uploadedOn: 'May 5, 2025',
        icon: 'selfie',
      },
    ],
  },
];


// ============================================================
// CUSTOMERS — DOCUMENTS — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type CustDocType = "National ID" | "Passport" | "Driving License" | "Proof of Address" | "Selfie Match" | "Source of Funds";
export type CustDocStatus = "Verified" | "Pending Review" | "Rejected" | "Expired";

export interface CustomerDocumentRecord {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  docType: CustDocType;
  fileName: string;
  fileSizeKb: number;
  status: CustDocStatus;
  uploadedAt: string;
  reviewedBy: string | null;
  expiresAt: string | null;
  rejectionReason: string | null;
}

export const custDocStatusBadge: Record<CustDocStatus, string> = {
  Verified: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  "Pending Review": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  Expired: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export const custDocStatusDot: Record<CustDocStatus, string> = {
  Verified: "bg-green-500",
  "Pending Review": "bg-amber-500",
  Rejected: "bg-red-500",
  Expired: "bg-slate-400",
};

export const custDocTypeOptions: CustDocType[] = [
  "National ID",
  "Passport",
  "Driving License",
  "Proof of Address",
  "Selfie Match",
  "Source of Funds",
];

export const custDocStatusOptions: CustDocStatus[] = ["Verified", "Pending Review", "Rejected", "Expired"];

export interface CustDocStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "verified" | "pending" | "rejected";
}

export const custDocStats: CustDocStat[] = [
  { id: "doc-stat-total", label: "Total Documents", value: "1,284", icon: "total" },
  { id: "doc-stat-verified", label: "Verified", value: "1,062", icon: "verified" },
  { id: "doc-stat-pending", label: "Pending Review", value: "164", icon: "pending" },
  { id: "doc-stat-rejected", label: "Rejected / Expired", value: "58", icon: "rejected" },
];

export const customerDocumentsData: CustomerDocumentRecord[] = [
  {
    id: "doc-1",
    customerId: "CUST_4821",
    customerName: "Kamal Hossain",
    customerAvatar: "https://i.pravatar.cc/40?img=21",
    docType: "National ID",
    fileName: "nid_front_back.pdf",
    fileSizeKb: 842,
    status: "Verified",
    uploadedAt: "May 10, 2025",
    reviewedBy: "Admin Rahman",
    expiresAt: null,
    rejectionReason: null,
  },
  {
    id: "doc-2",
    customerId: "CUST_4821",
    customerName: "Kamal Hossain",
    customerAvatar: "https://i.pravatar.cc/40?img=21",
    docType: "Selfie Match",
    fileName: "selfie_verification.jpg",
    fileSizeKb: 312,
    status: "Verified",
    uploadedAt: "May 10, 2025",
    reviewedBy: "Admin Rahman",
    expiresAt: null,
    rejectionReason: null,
  },
  {
    id: "doc-3",
    customerId: "CUST_3390",
    customerName: "Nusrat Jahan",
    customerAvatar: "https://i.pravatar.cc/40?img=22",
    docType: "Passport",
    fileName: "passport_scan.pdf",
    fileSizeKb: 1204,
    status: "Pending Review",
    uploadedAt: "May 12, 2025",
    reviewedBy: null,
    expiresAt: "Mar 2030",
    rejectionReason: null,
  },
  {
    id: "doc-4",
    customerId: "CUST_3390",
    customerName: "Nusrat Jahan",
    customerAvatar: "https://i.pravatar.cc/40?img=22",
    docType: "Proof of Address",
    fileName: "utility_bill_april.pdf",
    fileSizeKb: 540,
    status: "Pending Review",
    uploadedAt: "May 12, 2025",
    reviewedBy: null,
    expiresAt: null,
    rejectionReason: null,
  },
  {
    id: "doc-5",
    customerId: "CUST_5512",
    customerName: "Rahim Auto Parts Ltd.",
    customerAvatar: "https://i.pravatar.cc/40?img=23",
    docType: "Source of Funds",
    fileName: "bank_statement_q1.pdf",
    fileSizeKb: 2048,
    status: "Rejected",
    uploadedAt: "May 8, 2025",
    reviewedBy: "Compliance Team",
    expiresAt: null,
    rejectionReason: "Document is blurry and account holder name does not match registered business name.",
  },
  {
    id: "doc-6",
    customerId: "CUST_2207",
    customerName: "Sultana Begum",
    customerAvatar: "https://i.pravatar.cc/40?img=24",
    docType: "National ID",
    fileName: "nid_card.jpg",
    fileSizeKb: 488,
    status: "Expired",
    uploadedAt: "Jan 15, 2023",
    reviewedBy: "System",
    expiresAt: "Jan 15, 2025",
    rejectionReason: null,
  },
  {
    id: "doc-7",
    customerId: "CUST_6650",
    customerName: "Bashundhara Traders",
    customerAvatar: "https://i.pravatar.cc/40?img=25",
    docType: "Driving License",
    fileName: "driving_license.pdf",
    fileSizeKb: 690,
    status: "Verified",
    uploadedAt: "Apr 28, 2025",
    reviewedBy: "Admin Rahman",
    expiresAt: "Apr 2029",
    rejectionReason: null,
  },
  {
    id: "doc-8",
    customerId: "CUST_8841",
    customerName: "Tanvir Ahmed",
    customerAvatar: "https://i.pravatar.cc/40?img=26",
    docType: "Proof of Address",
    fileName: "address_proof.pdf",
    fileSizeKb: 720,
    status: "Pending Review",
    uploadedAt: "May 13, 2025",
    reviewedBy: null,
    expiresAt: null,
    rejectionReason: null,
  },
];

export const customerDocumentsTotalCount = 1284;





// ============================================================
// CUSTOMERS — NOTES — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type CustNoteCategory = "General" | "Risk" | "Support" | "Compliance" | "Sales";

export interface CustomerNoteRecord {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  category: CustNoteCategory;
  content: string;
  authorName: string;
  authorAvatar: string;
  isPinned: boolean;
  createdAt: string;
}

export const custNoteCategoryBadge: Record<CustNoteCategory, string> = {
  General: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  Risk: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  Support: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Compliance: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  Sales: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
};

export const custNoteCategoryOptions: CustNoteCategory[] = ["General", "Risk", "Support", "Compliance", "Sales"];

export interface CustNoteStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "pinned" | "risk" | "customers";
}

export const custNoteStats: CustNoteStat[] = [
  { id: "note-stat-total", label: "Total Notes", value: "342", icon: "total" },
  { id: "note-stat-pinned", label: "Pinned Notes", value: "18", icon: "pinned" },
  { id: "note-stat-risk", label: "Risk Flags", value: "12", icon: "risk" },
  { id: "note-stat-customers", label: "Customers with Notes", value: "186", icon: "customers" },
];

export const customerNotesData: CustomerNoteRecord[] = [
  {
    id: "note-1",
    customerId: "CUST_4821",
    customerName: "Kamal Hossain",
    customerAvatar: "https://i.pravatar.cc/40?img=21",
    category: "Support",
    content: "Customer called regarding a delayed transfer to a Dubai recipient. Issue was on the partner bank's side; resolved within 2 hours. Customer was satisfied with the follow-up call.",
    authorName: "Admin Rahman",
    authorAvatar: "https://i.pravatar.cc/40?img=12",
    isPinned: false,
    createdAt: "May 12, 2025 — 10:15 AM",
  },
  {
    id: "note-2",
    customerId: "CUST_3390",
    customerName: "Nusrat Jahan",
    customerAvatar: "https://i.pravatar.cc/40?img=22",
    category: "Risk",
    content: "Unusual transaction velocity detected — 6 transfers within 1 hour, each just under the manual review threshold. Flagged for AML monitoring. Customer profile does not indicate business use.",
    authorName: "Compliance Team",
    authorAvatar: "https://i.pravatar.cc/40?img=30",
    isPinned: true,
    createdAt: "May 11, 2025 — 4:42 PM",
  },
  {
    id: "note-3",
    customerId: "CUST_5512",
    customerName: "Rahim Auto Parts Ltd.",
    customerAvatar: "https://i.pravatar.cc/40?img=23",
    category: "Compliance",
    content: "Source of funds document rejected twice due to name mismatch. Customer has been asked to provide a document that matches their registered business name exactly.",
    authorName: "Compliance Team",
    authorAvatar: "https://i.pravatar.cc/40?img=30",
    isPinned: true,
    createdAt: "May 8, 2025 — 11:20 AM",
  },
  {
    id: "note-4",
    customerId: "CUST_2207",
    customerName: "Sultana Begum",
    customerAvatar: "https://i.pravatar.cc/40?img=24",
    category: "General",
    content: "Customer prefers communication in Bengali. Updated language preference on the account.",
    authorName: "Admin Rahman",
    authorAvatar: "https://i.pravatar.cc/40?img=12",
    isPinned: false,
    createdAt: "May 6, 2025 — 9:05 AM",
  },
  {
    id: "note-5",
    customerId: "CUST_6650",
    customerName: "Bashundhara Traders",
    customerAvatar: "https://i.pravatar.cc/40?img=25",
    category: "Sales",
    content: "High-volume merchant — averaging $45K in monthly transaction value. Reached out about upgrading to the Enhanced KYC tier for a higher transaction limit; awaiting response.",
    authorName: "Operations",
    authorAvatar: "https://i.pravatar.cc/40?img=16",
    isPinned: false,
    createdAt: "May 4, 2025 — 2:30 PM",
  },
  {
    id: "note-6",
    customerId: "CUST_8841",
    customerName: "Tanvir Ahmed",
    customerAvatar: "https://i.pravatar.cc/40?img=26",
    category: "Risk",
    content: "Customer disputed a card payment claiming it was unauthorized. Refund processed pending investigation. Monitoring account for further disputes.",
    authorName: "Admin Rahman",
    authorAvatar: "https://i.pravatar.cc/40?img=12",
    isPinned: false,
    createdAt: "May 2, 2025 — 5:55 PM",
  },
  {
    id: "note-7",
    customerId: "CUST_4821",
    customerName: "Kamal Hossain",
    customerAvatar: "https://i.pravatar.cc/40?img=21",
    category: "General",
    content: "Long-time customer (since 2021). Generally low-risk, consistent usage pattern, no prior incidents.",
    authorName: "Operations",
    authorAvatar: "https://i.pravatar.cc/40?img=16",
    isPinned: false,
    createdAt: "Apr 28, 2025 — 3:10 PM",
  },
];

export const customerNotesTotalCount = 342;






// ============================================================
// CUSTOMERS — BLACKLIST — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type BlacklistEntryType = "Customer Account" | "Phone Number" | "National ID" | "Device" | "Bank Account";
export type BlacklistReason = "Fraud" | "AML / Sanctions Match" | "Chargeback Abuse" | "Multiple Accounts" | "Suspicious Activity" | "Other";
export type BlacklistStatus = "Active" | "Under Review" | "Lifted";

export interface BlacklistEntry {
  id: string;
  entryType: BlacklistEntryType;
  identifier: string; // e.g. CUST_8841, +8801XXXXXXXXX, NID number
  relatedCustomerName: string | null;
  reason: BlacklistReason;
  notes: string;
  status: BlacklistStatus;
  blacklistedBy: string;
  blacklistedAt: string;
  reviewDate: string | null;
}

export const blacklistStatusBadge: Record<BlacklistStatus, string> = {
  Active: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  "Under Review": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Lifted: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
};

export const blacklistStatusDot: Record<BlacklistStatus, string> = {
  Active: "bg-red-500",
  "Under Review": "bg-amber-500",
  Lifted: "bg-green-500",
};

export const blacklistReasonBadge: Record<BlacklistReason, string> = {
  Fraud: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  "AML / Sanctions Match": "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  "Chargeback Abuse": "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  "Multiple Accounts": "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  "Suspicious Activity": "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  Other: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export const blacklistEntryTypeOptions: BlacklistEntryType[] = [
  "Customer Account",
  "Phone Number",
  "National ID",
  "Device",
  "Bank Account",
];

export const blacklistReasonOptions: BlacklistReason[] = [
  "Fraud",
  "AML / Sanctions Match",
  "Chargeback Abuse",
  "Multiple Accounts",
  "Suspicious Activity",
  "Other",
];

export const blacklistStatusOptions: BlacklistStatus[] = ["Active", "Under Review", "Lifted"];

export interface BlacklistStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "active" | "review" | "lifted";
}

export const blacklistStats: BlacklistStat[] = [
  { id: "bl-stat-total", label: "Total Entries", value: "47", icon: "total" },
  { id: "bl-stat-active", label: "Active Blacklist", value: "38", icon: "active" },
  { id: "bl-stat-review", label: "Under Review", value: "6", icon: "review" },
  { id: "bl-stat-lifted", label: "Lifted", value: "3", icon: "lifted" },
];

export const blacklistData: BlacklistEntry[] = [
  {
    id: "bl-1",
    entryType: "Customer Account",
    identifier: "CUST_9921",
    relatedCustomerName: "Jasim Uddin",
    reason: "Fraud",
    notes: "Used stolen card details to fund wallet on three separate occasions. Account permanently restricted.",
    status: "Active",
    blacklistedBy: "Compliance Team",
    blacklistedAt: "Apr 22, 2025",
    reviewDate: null,
  },
  {
    id: "bl-2",
    entryType: "Phone Number",
    identifier: "+8801911223344",
    relatedCustomerName: null,
    reason: "Suspicious Activity",
    notes: "Number associated with 14 failed OTP attempts across different accounts within 24 hours.",
    status: "Active",
    blacklistedBy: "System (Auto-flagged)",
    blacklistedAt: "May 9, 2025",
    reviewDate: "Jun 9, 2025",
  },
  {
    id: "bl-3",
    entryType: "National ID",
    identifier: "1992XXXXXXXXX481",
    relatedCustomerName: "Forhad Khan",
    reason: "AML / Sanctions Match",
    notes: "Name partially matched a watchlist entry. Confirmed after manual review — high confidence match.",
    status: "Active",
    blacklistedBy: "Compliance Team",
    blacklistedAt: "Mar 30, 2025",
    reviewDate: null,
  },
  {
    id: "bl-4",
    entryType: "Customer Account",
    identifier: "CUST_7732",
    relatedCustomerName: "Mehedi Hasan",
    reason: "Chargeback Abuse",
    notes: "Filed 5 chargebacks in 2 months, all disputed and ruled in merchant's favor. Pattern indicates abuse.",
    status: "Under Review",
    blacklistedBy: "Admin Rahman",
    blacklistedAt: "May 5, 2025",
    reviewDate: "May 20, 2025",
  },
  {
    id: "bl-5",
    entryType: "Device",
    identifier: "DEVICE_a93f7c21",
    relatedCustomerName: null,
    reason: "Multiple Accounts",
    notes: "Same device fingerprint used to register 8 different customer accounts within one week.",
    status: "Active",
    blacklistedBy: "System (Auto-flagged)",
    blacklistedAt: "Apr 18, 2025",
    reviewDate: null,
  },
  {
    id: "bl-6",
    entryType: "Bank Account",
    identifier: "BANK_AC_4456****2210",
    relatedCustomerName: "Liton Das",
    reason: "Fraud",
    notes: "Linked bank account flagged by partner bank for involvement in a prior fraud investigation.",
    status: "Under Review",
    blacklistedBy: "Compliance Team",
    blacklistedAt: "May 1, 2025",
    reviewDate: "May 15, 2025",
  },
  {
    id: "bl-7",
    entryType: "Phone Number",
    identifier: "+8801755667788",
    relatedCustomerName: "Shirin Akter",
    reason: "Other",
    notes: "Customer requested voluntary account closure and number blacklist after identity theft concern. Lifted after identity was re-verified.",
    status: "Lifted",
    blacklistedBy: "Admin Rahman",
    blacklistedAt: "Feb 12, 2025",
    reviewDate: null,
  },
  {
    id: "bl-8",
    entryType: "Customer Account",
    identifier: "CUST_6603",
    relatedCustomerName: "Anwar Ali",
    reason: "Suspicious Activity",
    notes: "Initial flag was a false positive from a velocity rule misconfiguration. Reviewed and cleared.",
    status: "Lifted",
    blacklistedBy: "System (Auto-flagged)",
    blacklistedAt: "Jan 28, 2025",
    reviewDate: null,
  },
];

export const blacklistTotalCount = blacklistData.length;




// ============================================================
// CUSTOMERS — ADD CUSTOMER — DATA, TYPES & CONSTANTS
// Standalone data for the Add Customer form (Customers section)
// ============================================================

export type AddCustKycTier = "Tier 1 (Basic)" | "Tier 2 (Standard)" | "Tier 3 (Enhanced)";
export type AddCustIdType = "Passport" | "National ID" | "Driving License";
export type AddCustAddressProofType = "Utility Bill" | "Bank Statement" | "Council Tax Bill" | "Tenancy Agreement";
export type AddCustInitialStatus = "Active" | "Pending Verification" | "Restricted";

export interface AddCustCountryOption {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

export const addCustCountryOptions: AddCustCountryOption[] = [
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩", dialCode: "+880" },
  { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰", dialCode: "+92" },
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", dialCode: "+971" },
  { code: "PH", name: "Philippines", flag: "🇵🇭", dialCode: "+63" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", dialCode: "+234" },
];

export const addCustIdTypeOptions: AddCustIdType[] = ["Passport", "National ID", "Driving License"];
export const addCustAddressProofOptions: AddCustAddressProofType[] = [
  "Utility Bill",
  "Bank Statement",
  "Council Tax Bill",
  "Tenancy Agreement",
];

export const addCustKycTierOptions: AddCustKycTier[] = ["Tier 1 (Basic)", "Tier 2 (Standard)", "Tier 3 (Enhanced)"];

export const addCustKycTierDescription: Record<AddCustKycTier, string> = {
  "Tier 1 (Basic)": "Phone verification only · Transaction limit: $500/month",
  "Tier 2 (Standard)": "ID + Selfie verification · Transaction limit: $10,000/month",
  "Tier 3 (Enhanced)": "Full document set + source of funds · Unlimited transactions",
};

export interface AddCustCurrencyOption {
  code: string;
  label: string;
  flag: string;
}

export const addCustCurrencyOptions: AddCustCurrencyOption[] = [
  { code: "GBP", label: "GBP Wallet", flag: "🇬🇧" },
  { code: "USD", label: "USD Wallet", flag: "🇺🇸" },
  { code: "EUR", label: "EUR Wallet", flag: "🇪🇺" },
  { code: "BDT", label: "BDT Settlement", flag: "🇧🇩" },
  { code: "INR", label: "INR Wallet", flag: "🇮🇳" },
  { code: "PKR", label: "PKR Wallet", flag: "🇵🇰" },
];

export const addCustInitialStatusOptions: AddCustInitialStatus[] = ["Active", "Pending Verification", "Restricted"];

export const addCustGenderOptions: string[] = ["Male", "Female", "Other", "Prefer not to say"];

export const addCustReferralSourceOptions: string[] = [
  "Friend / Family Referral",
  "Social Media",
  "Google Search",
  "Agent / Branch",
  "Advertisement",
  "Other",
];

// ---------- Recently added customers (preview list at bottom of form) ----------

export interface AddCustRecentEntry {
  id: string;
  name: string;
  email: string;
  country: string;
  countryFlag: string;
  kycTier: AddCustKycTier;
  status: AddCustInitialStatus;
  createdAt: string;
}

export const addCustRecentEntries: AddCustRecentEntry[] = [
  {
    id: "new-1",
    name: "Yusuf Karim",
    email: "yusuf.karim@example.com",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    kycTier: "Tier 2 (Standard)",
    status: "Pending Verification",
    createdAt: "May 19, 2025 — 2:40 PM",
  },
  {
    id: "new-2",
    name: "Amara Chowdhury",
    email: "amara.c@example.com",
    country: "Bangladesh",
    countryFlag: "🇧🇩",
    kycTier: "Tier 1 (Basic)",
    status: "Active",
    createdAt: "May 19, 2025 — 11:05 AM",
  },
];





//all transitions

export type TxStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded';
export type TxMethod =
  | 'Visa Card'
  | 'Mastercard'
  | 'Bank Transfer'
  | 'Cash Pickup'
  | 'Mobile Wallet'
  | 'bKash'
  | 'Nagad';
export type TxMethodType = 'card' | 'bank' | 'cash' | 'wallet';

export interface TxSender {
  name: string;
  email: string;
  avatar: string;
  country: string;
  flag: string;
  phone: string;
}

export interface TxReceiver {
  name: string;
  country: string;
  flag: string;
  phone: string;
}

export interface TxTimeline {
  label: string;
  date: string;
  time: string;
}

export interface AllTransaction {
  id: string;
  sender: TxSender;
  receiver: TxReceiver;
  amount: string;
  amountLocal: string;
  fee: string;
  exchangeRate: string;
  totalDebit: string;
  method: TxMethod;
  methodType: TxMethodType;
  purpose: string;
  status: TxStatus;
  date: string;
  time: string;
  timeAgo: string;
  timeline: TxTimeline[];
}

export const txStatCards = [
  {
    label: 'Total Transactions',
    value: '24,752',
    change: '+12.5% from last week',
    positive: true,
    icon: '≡',
    color: '#2563eb',
    sparkColor: '#3b82f6',
    spark: [18, 12, 22, 10, 20, 8, 15, 6, 18, 4],
  },
  {
    label: 'Completed',
    value: '18,752',
    change: '+10.2% from last week',
    positive: true,
    icon: '✓',
    color: '#16a34a',
    sparkColor: '#22c55e',
    spark: [5, 10, 8, 15, 12, 20, 18, 22, 19, 25],
  },
  {
    label: 'Pending',
    value: '3,124',
    change: '+8.3% from last week',
    positive: true,
    icon: '⏱',
    color: '#f59e0b',
    sparkColor: '#fbbf24',
    spark: [10, 8, 12, 9, 14, 11, 15, 10, 13, 12],
  },
  {
    label: 'Failed',
    value: '1,583',
    change: '-5.6% from last week',
    positive: false,
    icon: '✕',
    color: '#ef4444',
    sparkColor: '#f87171',
    spark: [14, 12, 10, 13, 9, 11, 8, 10, 7, 9],
  },
  {
    label: 'Refunded',
    value: '1,313',
    change: '+3.1% from last week',
    positive: true,
    icon: '↺',
    color: '#8b5cf6',
    sparkColor: '#a78bfa',
    spark: [4, 6, 5, 8, 6, 9, 7, 10, 8, 11],
  },
];

export const allTransactionsData: AllTransaction[] = [
  // ── Page 1 ───────────────────────────────────────────────────────────────
  {
    id: 'TXN-2505124789',
    sender: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'JD',
      country: 'United Kingdom',
      flag: '🇬🇧',
      phone: '+44 7700 900123',
    },
    receiver: {
      name: 'Rahim Uddin',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1712 345678',
    },
    amount: '£500.00',
    amountLocal: '৳72,500.00',
    fee: '£3.50',
    exchangeRate: '1 GBP = ৳145.00',
    totalDebit: '£503.50',
    method: 'Visa Card',
    methodType: 'card',
    purpose: 'Family Support',
    status: 'Completed',
    date: 'May 12, 2025',
    time: '2:32 PM',
    timeAgo: '2 min ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '2:31 PM' },
      { label: 'Payment Confirmed', date: 'May 12, 2025', time: '2:31 PM' },
      { label: 'Processing', date: 'May 12, 2025', time: '2:31 PM' },
      { label: 'Completed', date: 'May 12, 2025', time: '2:32 PM' },
    ],
  },
  {
    id: 'TXN-2505124788',
    sender: {
      name: 'Ahmed Khan',
      email: 'ahmed.khan@example.com',
      avatar: 'AK',
      country: 'United Kingdom',
      flag: '🇬🇧',
      phone: '+44 7700 900125',
    },
    receiver: {
      name: 'Maria Santos',
      country: 'Philippines',
      flag: '🇵🇭',
      phone: '+63 917 123 4567',
    },
    amount: '£300.00',
    amountLocal: '₱16,800.00',
    fee: '£2.50',
    exchangeRate: '1 GBP = ₱56.00',
    totalDebit: '£302.50',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Education',
    status: 'Pending',
    date: 'May 12, 2025',
    time: '2:22 PM',
    timeAgo: '10 min ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '2:22 PM' },
      { label: 'Payment Confirmed', date: 'May 12, 2025', time: '2:23 PM' },
    ],
  },
  {
    id: 'TXN-2505124787',
    sender: {
      name: 'Rashid Ahmed',
      email: 'rashid.ahmed@example.com',
      avatar: 'RA',
      country: 'UAE',
      flag: '🇦🇪',
      phone: '+971 50 123 4567',
    },
    receiver: {
      name: 'Sabbir Hossain',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1812 345678',
    },
    amount: '£750.00',
    amountLocal: '৳91,500.00',
    fee: '£4.50',
    exchangeRate: '1 GBP = ৳122.00',
    totalDebit: '£754.50',
    method: 'Cash Pickup',
    methodType: 'cash',
    purpose: 'Medical',
    status: 'Completed',
    date: 'May 12, 2025',
    time: '2:12 PM',
    timeAgo: '20 min ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '2:10 PM' },
      { label: 'Payment Confirmed', date: 'May 12, 2025', time: '2:11 PM' },
      { label: 'Processing', date: 'May 12, 2025', time: '2:11 PM' },
      { label: 'Completed', date: 'May 12, 2025', time: '2:12 PM' },
    ],
  },
  {
    id: 'TXN-2505124786',
    sender: {
      name: 'Sarina Begum',
      email: 'sarina.begum@example.com',
      avatar: 'SB',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      phone: '+966 50 123 4567',
    },
    receiver: {
      name: 'Mohammad Ali',
      country: 'India',
      flag: '🇮🇳',
      phone: '+91 98765 43210',
    },
    amount: '£1,000.00',
    amountLocal: '₹83,200.00',
    fee: '£5.00',
    exchangeRate: '1 GBP = ₹83.20',
    totalDebit: '£1,005.00',
    method: 'Mobile Wallet',
    methodType: 'wallet',
    purpose: 'Business',
    status: 'Pending',
    date: 'May 12, 2025',
    time: '2:07 PM',
    timeAgo: '25 min ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '2:07 PM' },
    ],
  },
  {
    id: 'TXN-2505124785',
    sender: {
      name: 'Imran Hossain',
      email: 'imran.hossain@example.com',
      avatar: 'IH',
      country: 'Malaysia',
      flag: '🇲🇾',
      phone: '+60 12 345 6789',
    },
    receiver: {
      name: 'Arif Khan',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1912 345678',
    },
    amount: '£200.00',
    amountLocal: '৳18,200.00',
    fee: '£2.00',
    exchangeRate: '1 GBP = ৳91.00',
    totalDebit: '£202.00',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Personal',
    status: 'Failed',
    date: 'May 12, 2025',
    time: '2:02 PM',
    timeAgo: '30 min ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '2:02 PM' },
      { label: 'Payment Failed', date: 'May 12, 2025', time: '2:03 PM' },
    ],
  },
  {
    id: 'TXN-2505124784',
    sender: {
      name: 'Fatima Ali',
      email: 'fatima.ali@example.com',
      avatar: 'FA',
      country: 'United Kingdom',
      flag: '🇬🇧',
      phone: '+44 7700 900128',
    },
    receiver: {
      name: 'Nusrat Jahan',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1612 345678',
    },
    amount: '£150.00',
    amountLocal: '৳21,750.00',
    fee: '£1.50',
    exchangeRate: '1 GBP = ৳145.00',
    totalDebit: '£151.50',
    method: 'bKash',
    methodType: 'wallet',
    purpose: 'Family Support',
    status: 'Completed',
    date: 'May 12, 2025',
    time: '1:47 PM',
    timeAgo: '45 min ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '1:45 PM' },
      { label: 'Payment Confirmed', date: 'May 12, 2025', time: '1:46 PM' },
      { label: 'Completed', date: 'May 12, 2025', time: '1:47 PM' },
    ],
  },
  {
    id: 'TXN-2505124783',
    sender: {
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      avatar: 'DW',
      country: 'United Kingdom',
      flag: '🇬🇧',
      phone: '+44 7700 900129',
    },
    receiver: {
      name: 'Sujon Das',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1512 345678',
    },
    amount: '£250.00',
    amountLocal: '৳36,500.00',
    fee: '£2.50',
    exchangeRate: '1 GBP = ৳146.00',
    totalDebit: '£252.50',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Education',
    status: 'Refunded',
    date: 'May 12, 2025',
    time: '1:32 PM',
    timeAgo: '1 hour ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '1:30 PM' },
      { label: 'Payment Confirmed', date: 'May 12, 2025', time: '1:31 PM' },
      { label: 'Refunded', date: 'May 12, 2025', time: '1:32 PM' },
    ],
  },
  {
    id: 'TXN-2505124782',
    sender: {
      name: 'Sophie Martin',
      email: 'sophie.martin@example.com',
      avatar: 'SM',
      country: 'United Kingdom',
      flag: '🇬🇧',
      phone: '+44 7700 900130',
    },
    receiver: {
      name: 'Tanvir Hasan',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1412 345678',
    },
    amount: '£400.00',
    amountLocal: '৳58,400.00',
    fee: '£3.00',
    exchangeRate: '1 GBP = ৳146.00',
    totalDebit: '£403.00',
    method: 'Nagad',
    methodType: 'wallet',
    purpose: 'Medical',
    status: 'Completed',
    date: 'May 12, 2025',
    time: '1:32 PM',
    timeAgo: '1 hour ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '1:30 PM' },
      { label: 'Payment Confirmed', date: 'May 12, 2025', time: '1:31 PM' },
      { label: 'Completed', date: 'May 12, 2025', time: '1:32 PM' },
    ],
  },
  {
    id: 'TXN-2505124781',
    sender: {
      name: 'James Okafor',
      email: 'james.okafor@example.com',
      avatar: 'JO',
      country: 'UAE',
      flag: '🇦🇪',
      phone: '+971 55 987 6543',
    },
    receiver: {
      name: 'Ibrahim Khalil',
      country: 'UAE',
      flag: '🇦🇪',
      phone: '+971 50 876 5432',
    },
    amount: 'AED 1,200.00',
    amountLocal: '৳36,000.00',
    fee: 'AED 6.00',
    exchangeRate: '1 AED = ৳30.00',
    totalDebit: 'AED 1,206.00',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Business',
    status: 'Completed',
    date: 'May 12, 2025',
    time: '1:32 PM',
    timeAgo: '1 hour ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '1:30 PM' },
      { label: 'Completed', date: 'May 12, 2025', time: '1:32 PM' },
    ],
  },
  {
    id: 'TXN-2505124780',
    sender: {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      avatar: 'PS',
      country: 'United Kingdom',
      flag: '🇬🇧',
      phone: '+44 7700 900124',
    },
    receiver: {
      name: 'Shakil Ahmed',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1312 345678',
    },
    amount: '$600.00',
    amountLocal: '৳54,600.00',
    fee: '$3.50',
    exchangeRate: '1 USD = ৳91.00',
    totalDebit: '$603.50',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Family Support',
    status: 'Pending',
    date: 'May 12, 2025',
    time: '12:32 PM',
    timeAgo: '2 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '12:32 PM' },
    ],
  },
  // ── Page 2 ───────────────────────────────────────────────────────────────
  {
    id: 'TXN-2505124779',
    sender: {
      name: 'Karim Hassan',
      email: 'karim.hassan@example.com',
      avatar: 'KH',
      country: 'Germany',
      flag: '🇩🇪',
      phone: '+49 170 123 4567',
    },
    receiver: {
      name: 'Rubel Hossain',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1711 234567',
    },
    amount: '€450.00',
    amountLocal: '৳53,550.00',
    fee: '€3.00',
    exchangeRate: '1 EUR = ৳119.00',
    totalDebit: '€453.00',
    method: 'Visa Card',
    methodType: 'card',
    purpose: 'Family Support',
    status: 'Completed',
    date: 'May 12, 2025',
    time: '11:55 AM',
    timeAgo: '3 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '11:53 AM' },
      { label: 'Payment Confirmed', date: 'May 12, 2025', time: '11:54 AM' },
      { label: 'Completed', date: 'May 12, 2025', time: '11:55 AM' },
    ],
  },
  {
    id: 'TXN-2505124778',
    sender: {
      name: 'Nadia Islam',
      email: 'nadia.islam@example.com',
      avatar: 'NI',
      country: 'Australia',
      flag: '🇦🇺',
      phone: '+61 412 345 678',
    },
    receiver: {
      name: 'Kamal Uddin',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1811 234567',
    },
    amount: 'AUD 320.00',
    amountLocal: '৳23,040.00',
    fee: 'AUD 2.00',
    exchangeRate: '1 AUD = ৳72.00',
    totalDebit: 'AUD 322.00',
    method: 'Mobile Wallet',
    methodType: 'wallet',
    purpose: 'Medical',
    status: 'Refunded',
    date: 'May 12, 2025',
    time: '11:20 AM',
    timeAgo: '3 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '11:18 AM' },
      { label: 'Payment Confirmed', date: 'May 12, 2025', time: '11:19 AM' },
      { label: 'Refunded', date: 'May 12, 2025', time: '11:20 AM' },
    ],
  },
  {
    id: 'TXN-2505124777',
    sender: {
      name: 'Rahim Uddin',
      email: 'rahim.uddin2@example.com',
      avatar: 'RU',
      country: 'Italy',
      flag: '🇮🇹',
      phone: '+39 320 123 4567',
    },
    receiver: {
      name: 'Selim Hossain',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1911 234567',
    },
    amount: '€600.00',
    amountLocal: '৳71,400.00',
    fee: '€4.00',
    exchangeRate: '1 EUR = ৳119.00',
    totalDebit: '€604.00',
    method: 'Cash Pickup',
    methodType: 'cash',
    purpose: 'Personal',
    status: 'Pending',
    date: 'May 12, 2025',
    time: '10:45 AM',
    timeAgo: '4 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '10:45 AM' },
    ],
  },
  {
    id: 'TXN-2505124776',
    sender: {
      name: 'Sadia Akter',
      email: 'sadia.akter@example.com',
      avatar: 'SA',
      country: 'France',
      flag: '🇫🇷',
      phone: '+33 6 12 34 56 78',
    },
    receiver: {
      name: 'Milon Das',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1611 234567',
    },
    amount: '€150.00',
    amountLocal: '৳17,850.00',
    fee: '€1.50',
    exchangeRate: '1 EUR = ৳119.00',
    totalDebit: '€151.50',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Education',
    status: 'Failed',
    date: 'May 12, 2025',
    time: '10:10 AM',
    timeAgo: '5 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 12, 2025', time: '10:10 AM' },
      { label: 'Payment Failed', date: 'May 12, 2025', time: '10:11 AM' },
    ],
  },
  {
    id: 'TXN-2505124775',
    sender: {
      name: 'Fatima Malik',
      email: 'fatima.malik@example.com',
      avatar: 'FM',
      country: 'Canada',
      flag: '🇨🇦',
      phone: '+1 416 555 0123',
    },
    receiver: {
      name: 'Jamal Hossain',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1511 234567',
    },
    amount: 'CAD 850.00',
    amountLocal: '৳68,000.00',
    fee: 'CAD 5.00',
    exchangeRate: '1 CAD = ৳80.00',
    totalDebit: 'CAD 855.00',
    method: 'Visa Card',
    methodType: 'card',
    purpose: 'Business',
    status: 'Completed',
    date: 'May 11, 2025',
    time: '9:30 PM',
    timeAgo: '5 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '9:28 PM' },
      { label: 'Payment Confirmed', date: 'May 11, 2025', time: '9:29 PM' },
      { label: 'Completed', date: 'May 11, 2025', time: '9:30 PM' },
    ],
  },
  {
    id: 'TXN-2505124774',
    sender: {
      name: 'Omar Sheikh',
      email: 'omar.sheikh@example.com',
      avatar: 'OS',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      phone: '+966 55 234 5678',
    },
    receiver: {
      name: 'Nurul Islam',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1411 234567',
    },
    amount: 'SAR 1,500.00',
    amountLocal: '৳45,000.00',
    fee: 'SAR 8.00',
    exchangeRate: '1 SAR = ৳30.00',
    totalDebit: 'SAR 1,508.00',
    method: 'bKash',
    methodType: 'wallet',
    purpose: 'Family Support',
    status: 'Completed',
    date: 'May 11, 2025',
    time: '8:15 PM',
    timeAgo: '6 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '8:13 PM' },
      { label: 'Payment Confirmed', date: 'May 11, 2025', time: '8:14 PM' },
      { label: 'Completed', date: 'May 11, 2025', time: '8:15 PM' },
    ],
  },
  {
    id: 'TXN-2505124773',
    sender: {
      name: 'Ling Wei',
      email: 'ling.wei@example.com',
      avatar: 'LW',
      country: 'Malaysia',
      flag: '🇲🇾',
      phone: '+60 16 234 5678',
    },
    receiver: {
      name: 'Rasel Ahmed',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1311 234567',
    },
    amount: 'MYR 900.00',
    amountLocal: '৳22,500.00',
    fee: 'MYR 5.00',
    exchangeRate: '1 MYR = ৳25.00',
    totalDebit: 'MYR 905.00',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Medical',
    status: 'Pending',
    date: 'May 11, 2025',
    time: '7:45 PM',
    timeAgo: '7 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '7:45 PM' },
    ],
  },
  {
    id: 'TXN-2505124772',
    sender: {
      name: 'Ana Pereira',
      email: 'ana.pereira@example.com',
      avatar: 'AP',
      country: 'Portugal',
      flag: '🇵🇹',
      phone: '+351 912 345 678',
    },
    receiver: {
      name: 'Monir Hossain',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1211 234567',
    },
    amount: '€280.00',
    amountLocal: '৳33,320.00',
    fee: '€2.00',
    exchangeRate: '1 EUR = ৳119.00',
    totalDebit: '€282.00',
    method: 'Nagad',
    methodType: 'wallet',
    purpose: 'Family Support',
    status: 'Completed',
    date: 'May 11, 2025',
    time: '6:55 PM',
    timeAgo: '8 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '6:53 PM' },
      { label: 'Payment Confirmed', date: 'May 11, 2025', time: '6:54 PM' },
      { label: 'Completed', date: 'May 11, 2025', time: '6:55 PM' },
    ],
  },
  {
    id: 'TXN-2505124771',
    sender: {
      name: 'Marcus Brown',
      email: 'marcus.brown@example.com',
      avatar: 'MB',
      country: 'USA',
      flag: '🇺🇸',
      phone: '+1 212 555 0134',
    },
    receiver: {
      name: 'Shafiq Rahman',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1711 999888',
    },
    amount: '$750.00',
    amountLocal: '৳68,250.00',
    fee: '$4.00',
    exchangeRate: '1 USD = ৳91.00',
    totalDebit: '$754.00',
    method: 'Mastercard',
    methodType: 'card',
    purpose: 'Personal',
    status: 'Failed',
    date: 'May 11, 2025',
    time: '5:30 PM',
    timeAgo: '9 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '5:30 PM' },
      { label: 'Payment Failed', date: 'May 11, 2025', time: '5:31 PM' },
    ],
  },
  {
    id: 'TXN-2505124770',
    sender: {
      name: 'Yuki Tanaka',
      email: 'yuki.tanaka@example.com',
      avatar: 'YT',
      country: 'Japan',
      flag: '🇯🇵',
      phone: '+81 90 1234 5678',
    },
    receiver: {
      name: 'Bellal Uddin',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1811 888777',
    },
    amount: '¥65,000',
    amountLocal: '৳52,000.00',
    fee: '¥350',
    exchangeRate: '¥1 = ৳0.80',
    totalDebit: '¥65,350',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Education',
    status: 'Completed',
    date: 'May 11, 2025',
    time: '4:10 PM',
    timeAgo: '10 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '4:08 PM' },
      { label: 'Payment Confirmed', date: 'May 11, 2025', time: '4:09 PM' },
      { label: 'Completed', date: 'May 11, 2025', time: '4:10 PM' },
    ],
  },
  // ── Page 3 ───────────────────────────────────────────────────────────────
  {
    id: 'TXN-2505124769',
    sender: {
      name: 'Elena Kovacs',
      email: 'elena.kovacs@example.com',
      avatar: 'EK',
      country: 'Hungary',
      flag: '🇭🇺',
      phone: '+36 30 123 4567',
    },
    receiver: {
      name: 'Hasan Ali',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1711 777666',
    },
    amount: '€320.00',
    amountLocal: '৳38,080.00',
    fee: '€2.50',
    exchangeRate: '1 EUR = ৳119.00',
    totalDebit: '€322.50',
    method: 'Visa Card',
    methodType: 'card',
    purpose: 'Personal',
    status: 'Completed',
    date: 'May 11, 2025',
    time: '3:45 PM',
    timeAgo: '11 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '3:43 PM' },
      { label: 'Completed', date: 'May 11, 2025', time: '3:45 PM' },
    ],
  },
  {
    id: 'TXN-2505124768',
    sender: {
      name: 'Carlos Mendez',
      email: 'carlos.m@example.com',
      avatar: 'CM',
      country: 'Spain',
      flag: '🇪🇸',
      phone: '+34 612 345 678',
    },
    receiver: {
      name: 'Sumaiya Islam',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1611 777666',
    },
    amount: '€500.00',
    amountLocal: '৳59,500.00',
    fee: '€3.50',
    exchangeRate: '1 EUR = ৳119.00',
    totalDebit: '€503.50',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Business',
    status: 'Pending',
    date: 'May 11, 2025',
    time: '3:10 PM',
    timeAgo: '12 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '3:10 PM' },
    ],
  },
  {
    id: 'TXN-2505124767',
    sender: {
      name: 'Aisha Diallo',
      email: 'aisha.diallo@example.com',
      avatar: 'AD',
      country: 'France',
      flag: '🇫🇷',
      phone: '+33 7 12 34 56 78',
    },
    receiver: {
      name: 'Tariq Hossain',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1511 777666',
    },
    amount: '€175.00',
    amountLocal: '৳20,825.00',
    fee: '€1.50',
    exchangeRate: '1 EUR = ৳119.00',
    totalDebit: '€176.50',
    method: 'bKash',
    methodType: 'wallet',
    purpose: 'Family Support',
    status: 'Completed',
    date: 'May 11, 2025',
    time: '2:25 PM',
    timeAgo: '13 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '2:23 PM' },
      { label: 'Completed', date: 'May 11, 2025', time: '2:25 PM' },
    ],
  },
  {
    id: 'TXN-2505124766',
    sender: {
      name: 'Tom Bradley',
      email: 'tom.bradley@example.com',
      avatar: 'TB',
      country: 'USA',
      flag: '🇺🇸',
      phone: '+1 310 555 0145',
    },
    receiver: {
      name: 'Rezaul Karim',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1411 777666',
    },
    amount: '$1,200.00',
    amountLocal: '৳1,09,200.00',
    fee: '$6.00',
    exchangeRate: '1 USD = ৳91.00',
    totalDebit: '$1,206.00',
    method: 'Mastercard',
    methodType: 'card',
    purpose: 'Business',
    status: 'Completed',
    date: 'May 11, 2025',
    time: '1:50 PM',
    timeAgo: '13 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '1:48 PM' },
      { label: 'Payment Confirmed', date: 'May 11, 2025', time: '1:49 PM' },
      { label: 'Completed', date: 'May 11, 2025', time: '1:50 PM' },
    ],
  },
  {
    id: 'TXN-2505124765',
    sender: {
      name: 'Hina Qureshi',
      email: 'hina.q@example.com',
      avatar: 'HQ',
      country: 'United Kingdom',
      flag: '🇬🇧',
      phone: '+44 7811 234567',
    },
    receiver: {
      name: 'Babul Akter',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1311 777666',
    },
    amount: '£380.00',
    amountLocal: '৳55,100.00',
    fee: '£2.80',
    exchangeRate: '1 GBP = ৳145.00',
    totalDebit: '£382.80',
    method: 'Nagad',
    methodType: 'wallet',
    purpose: 'Medical',
    status: 'Refunded',
    date: 'May 11, 2025',
    time: '12:30 PM',
    timeAgo: '14 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '12:28 PM' },
      { label: 'Payment Confirmed', date: 'May 11, 2025', time: '12:29 PM' },
      { label: 'Refunded', date: 'May 11, 2025', time: '12:30 PM' },
    ],
  },
  {
    id: 'TXN-2505124764',
    sender: {
      name: 'Pavel Novak',
      email: 'pavel.novak@example.com',
      avatar: 'PN',
      country: 'Czech Republic',
      flag: '🇨🇿',
      phone: '+420 601 234 567',
    },
    receiver: {
      name: 'Nasreen Akter',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1211 777666',
    },
    amount: '€230.00',
    amountLocal: '৳27,370.00',
    fee: '€2.00',
    exchangeRate: '1 EUR = ৳119.00',
    totalDebit: '€232.00',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Personal',
    status: 'Completed',
    date: 'May 11, 2025',
    time: '11:15 AM',
    timeAgo: '15 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '11:13 AM' },
      { label: 'Completed', date: 'May 11, 2025', time: '11:15 AM' },
    ],
  },
  {
    id: 'TXN-2505124763',
    sender: {
      name: 'Mei Chen',
      email: 'mei.chen@example.com',
      avatar: 'MC',
      country: 'Singapore',
      flag: '🇸🇬',
      phone: '+65 9123 4567',
    },
    receiver: {
      name: 'Sabbir Khan',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1711 666555',
    },
    amount: 'SGD 550.00',
    amountLocal: '৳44,550.00',
    fee: 'SGD 3.50',
    exchangeRate: '1 SGD = ৳81.00',
    totalDebit: 'SGD 553.50',
    method: 'Mobile Wallet',
    methodType: 'wallet',
    purpose: 'Education',
    status: 'Pending',
    date: 'May 11, 2025',
    time: '10:30 AM',
    timeAgo: '16 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '10:30 AM' },
    ],
  },
  {
    id: 'TXN-2505124762',
    sender: {
      name: 'Ali Hassan',
      email: 'ali.hassan@example.com',
      avatar: 'AH2',
      country: 'UAE',
      flag: '🇦🇪',
      phone: '+971 52 345 6789',
    },
    receiver: {
      name: 'Roksana Begum',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1811 666555',
    },
    amount: 'AED 800.00',
    amountLocal: '৳24,000.00',
    fee: 'AED 4.00',
    exchangeRate: '1 AED = ৳30.00',
    totalDebit: 'AED 804.00',
    method: 'Cash Pickup',
    methodType: 'cash',
    purpose: 'Family Support',
    status: 'Failed',
    date: 'May 11, 2025',
    time: '9:45 AM',
    timeAgo: '17 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '9:45 AM' },
      { label: 'Payment Failed', date: 'May 11, 2025', time: '9:46 AM' },
    ],
  },
  {
    id: 'TXN-2505124761',
    sender: {
      name: 'Lena Fischer',
      email: 'lena.f@example.com',
      avatar: 'LF',
      country: 'Germany',
      flag: '🇩🇪',
      phone: '+49 160 987 6543',
    },
    receiver: {
      name: 'Tarek Miah',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1911 666555',
    },
    amount: '€410.00',
    amountLocal: '৳48,790.00',
    fee: '€3.00',
    exchangeRate: '1 EUR = ৳119.00',
    totalDebit: '€413.00',
    method: 'Visa Card',
    methodType: 'card',
    purpose: 'Business',
    status: 'Completed',
    date: 'May 11, 2025',
    time: '8:50 AM',
    timeAgo: '18 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '8:48 AM' },
      { label: 'Completed', date: 'May 11, 2025', time: '8:50 AM' },
    ],
  },
  {
    id: 'TXN-2505124760',
    sender: {
      name: 'Hamid Sultani',
      email: 'hamid.s@example.com',
      avatar: 'HS',
      country: 'Afghanistan',
      flag: '🇦🇫',
      phone: '+93 70 123 4567',
    },
    receiver: {
      name: 'Masum Billah',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1611 666555',
    },
    amount: '$350.00',
    amountLocal: '৳31,850.00',
    fee: '$2.50',
    exchangeRate: '1 USD = ৳91.00',
    totalDebit: '$352.50',
    method: 'bKash',
    methodType: 'wallet',
    purpose: 'Personal',
    status: 'Completed',
    date: 'May 11, 2025',
    time: '7:20 AM',
    timeAgo: '19 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '7:18 AM' },
      { label: 'Completed', date: 'May 11, 2025', time: '7:20 AM' },
    ],
  },
  // ── Page 4 ───────────────────────────────────────────────────────────────
  {
    id: 'TXN-2505124759',
    sender: {
      name: 'Robert Kim',
      email: 'robert.kim@example.com',
      avatar: 'RK',
      country: 'South Korea',
      flag: '🇰🇷',
      phone: '+82 10 1234 5678',
    },
    receiver: {
      name: 'Arifa Khatun',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1511 555444',
    },
    amount: 'KRW 680,000',
    amountLocal: '৳54,400.00',
    fee: 'KRW 3,500',
    exchangeRate: 'KRW 1,000 = ৳80.00',
    totalDebit: 'KRW 683,500',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Education',
    status: 'Completed',
    date: 'May 11, 2025',
    time: '6:00 AM',
    timeAgo: '20 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 11, 2025', time: '5:58 AM' },
      { label: 'Completed', date: 'May 11, 2025', time: '6:00 AM' },
    ],
  },
  {
    id: 'TXN-2505124758',
    sender: {
      name: 'Olivia Grant',
      email: 'olivia.g@example.com',
      avatar: 'OG',
      country: 'Canada',
      flag: '🇨🇦',
      phone: '+1 604 555 0167',
    },
    receiver: {
      name: 'Mamun Rashid',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1411 555444',
    },
    amount: 'CAD 600.00',
    amountLocal: '৳48,000.00',
    fee: 'CAD 4.00',
    exchangeRate: '1 CAD = ৳80.00',
    totalDebit: 'CAD 604.00',
    method: 'Mastercard',
    methodType: 'card',
    purpose: 'Family Support',
    status: 'Pending',
    date: 'May 10, 2025',
    time: '11:30 PM',
    timeAgo: '21 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 10, 2025', time: '11:30 PM' },
    ],
  },
  {
    id: 'TXN-2505124757',
    sender: {
      name: 'Ibrahim Al-Rashid',
      email: 'ibrahim.ar@example.com',
      avatar: 'IR',
      country: 'Qatar',
      flag: '🇶🇦',
      phone: '+974 5012 3456',
    },
    receiver: {
      name: 'Limon Hossain',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1311 555444',
    },
    amount: 'QAR 1,800.00',
    amountLocal: '৳54,000.00',
    fee: 'QAR 9.00',
    exchangeRate: '1 QAR = ৳30.00',
    totalDebit: 'QAR 1,809.00',
    method: 'Cash Pickup',
    methodType: 'cash',
    purpose: 'Medical',
    status: 'Completed',
    date: 'May 10, 2025',
    time: '10:15 PM',
    timeAgo: '22 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 10, 2025', time: '10:13 PM' },
      { label: 'Completed', date: 'May 10, 2025', time: '10:15 PM' },
    ],
  },
  {
    id: 'TXN-2505124756',
    sender: {
      name: 'Mina Johansson',
      email: 'mina.j@example.com',
      avatar: 'MJ',
      country: 'Sweden',
      flag: '🇸🇪',
      phone: '+46 70 123 4567',
    },
    receiver: {
      name: 'Kohinoor Begum',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1211 555444',
    },
    amount: 'SEK 3,200.00',
    amountLocal: '৳35,200.00',
    fee: 'SEK 18.00',
    exchangeRate: 'SEK 1 = ৳11.00',
    totalDebit: 'SEK 3,218.00',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Personal',
    status: 'Refunded',
    date: 'May 10, 2025',
    time: '9:00 PM',
    timeAgo: '23 hours ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 10, 2025', time: '8:58 PM' },
      { label: 'Refunded', date: 'May 10, 2025', time: '9:00 PM' },
    ],
  },
  {
    id: 'TXN-2505124755',
    sender: {
      name: 'Chidi Okonkwo',
      email: 'chidi.o@example.com',
      avatar: 'CO',
      country: 'Nigeria',
      flag: '🇳🇬',
      phone: '+234 803 123 4567',
    },
    receiver: {
      name: 'Zahir Uddin',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1711 444333',
    },
    amount: '$480.00',
    amountLocal: '৳43,680.00',
    fee: '$3.20',
    exchangeRate: '1 USD = ৳91.00',
    totalDebit: '$483.20',
    method: 'Mobile Wallet',
    methodType: 'wallet',
    purpose: 'Business',
    status: 'Completed',
    date: 'May 10, 2025',
    time: '8:10 PM',
    timeAgo: '1 day ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 10, 2025', time: '8:08 PM' },
      { label: 'Completed', date: 'May 10, 2025', time: '8:10 PM' },
    ],
  },
  {
    id: 'TXN-2505124754',
    sender: {
      name: 'Sara Lindqvist',
      email: 'sara.l@example.com',
      avatar: 'SL',
      country: 'Norway',
      flag: '🇳🇴',
      phone: '+47 912 34 567',
    },
    receiver: {
      name: 'Shakila Akter',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1811 444333',
    },
    amount: 'NOK 3,000.00',
    amountLocal: '৳33,000.00',
    fee: 'NOK 16.00',
    exchangeRate: 'NOK 1 = ৳11.00',
    totalDebit: 'NOK 3,016.00',
    method: 'Visa Card',
    methodType: 'card',
    purpose: 'Family Support',
    status: 'Failed',
    date: 'May 10, 2025',
    time: '7:00 PM',
    timeAgo: '1 day ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 10, 2025', time: '7:00 PM' },
      { label: 'Payment Failed', date: 'May 10, 2025', time: '7:01 PM' },
    ],
  },
  {
    id: 'TXN-2505124753',
    sender: {
      name: 'Reza Tehrani',
      email: 'reza.t@example.com',
      avatar: 'RT',
      country: 'Iran',
      flag: '🇮🇷',
      phone: '+98 912 345 6789',
    },
    receiver: {
      name: 'Dulal Hossain',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1911 444333',
    },
    amount: '$220.00',
    amountLocal: '৳20,020.00',
    fee: '$2.00',
    exchangeRate: '1 USD = ৳91.00',
    totalDebit: '$222.00',
    method: 'Nagad',
    methodType: 'wallet',
    purpose: 'Education',
    status: 'Completed',
    date: 'May 10, 2025',
    time: '5:45 PM',
    timeAgo: '1 day ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 10, 2025', time: '5:43 PM' },
      { label: 'Completed', date: 'May 10, 2025', time: '5:45 PM' },
    ],
  },
  {
    id: 'TXN-2505124752',
    sender: {
      name: 'Grace Osei',
      email: 'grace.osei@example.com',
      avatar: 'GO',
      country: 'Ghana',
      flag: '🇬🇭',
      phone: '+233 24 123 4567',
    },
    receiver: {
      name: 'Alim Uddin',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1611 444333',
    },
    amount: '$310.00',
    amountLocal: '৳28,210.00',
    fee: '$2.50',
    exchangeRate: '1 USD = ৳91.00',
    totalDebit: '$312.50',
    method: 'Bank Transfer',
    methodType: 'bank',
    purpose: 'Medical',
    status: 'Pending',
    date: 'May 10, 2025',
    time: '4:20 PM',
    timeAgo: '1 day ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 10, 2025', time: '4:20 PM' },
    ],
  },
  {
    id: 'TXN-2505124751',
    sender: {
      name: 'Tomás García',
      email: 'tomas.g@example.com',
      avatar: 'TG',
      country: 'Mexico',
      flag: '🇲🇽',
      phone: '+52 55 1234 5678',
    },
    receiver: {
      name: 'Nasim Uddin',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1511 444333',
    },
    amount: '$560.00',
    amountLocal: '৳50,960.00',
    fee: '$3.50',
    exchangeRate: '1 USD = ৳91.00',
    totalDebit: '$563.50',
    method: 'Cash Pickup',
    methodType: 'cash',
    purpose: 'Personal',
    status: 'Completed',
    date: 'May 10, 2025',
    time: '3:00 PM',
    timeAgo: '1 day ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 10, 2025', time: '2:58 PM' },
      { label: 'Completed', date: 'May 10, 2025', time: '3:00 PM' },
    ],
  },
  {
    id: 'TXN-2505124750',
    sender: {
      name: 'Amara Diarra',
      email: 'amara.d@example.com',
      avatar: 'AM',
      country: 'Senegal',
      flag: '🇸🇳',
      phone: '+221 77 123 4567',
    },
    receiver: {
      name: 'Rahela Begum',
      country: 'Bangladesh',
      flag: '🇧🇩',
      phone: '+880 1411 444333',
    },
    amount: '€190.00',
    amountLocal: '৳22,610.00',
    fee: '€1.80',
    exchangeRate: '1 EUR = ৳119.00',
    totalDebit: '€191.80',
    method: 'bKash',
    methodType: 'wallet',
    purpose: 'Family Support',
    status: 'Completed',
    date: 'May 10, 2025',
    time: '1:30 PM',
    timeAgo: '1 day ago',
    timeline: [
      { label: 'Transaction Created', date: 'May 10, 2025', time: '1:28 PM' },
      { label: 'Completed', date: 'May 10, 2025', time: '1:30 PM' },
    ],
  },
];

export const txStatusOptions = [
  'All Status',
  'Completed',
  'Pending',
  'Failed',
  'Refunded',
];

export const txCountryOptions = [
  'All Countries',
  'United Kingdom',
  'UAE',
  'Saudi Arabia',
  'Malaysia',
  'Germany',
  'Australia',
  'Italy',
  'France',
  'Canada',
  'USA',
  'Japan',
  'Singapore',
  'Qatar',
  'South Korea',
  'Norway',
  'Sweden',
  'Nigeria',
  'Ghana',
  'Portugal',
  'Spain',
  'Hungary',
  'Czech Republic',
  'Mexico',
  'Senegal',
  'Afghanistan',
  'Iran',
];

export const txMethodOptions = [
  'All Methods',
  'Visa Card',
  'Mastercard',
  'Bank Transfer',
  'Cash Pickup',
  'Mobile Wallet',
  'bKash',
  'Nagad',
];

export const TX_TOTAL = 2475;
export const TX_PAGE_SIZE = 10;

// Beneficials fake data here

export type BeneficiaryStatus = 'Active' | 'Inactive' | 'Pending';

export interface Beneficiary {
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
  accountType: 'Savings Account' | 'Current Account' | 'Checking Account';
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

export const beneficiariesData: Beneficiary[] = [
  {
    id: 'BEN-001',
    name: 'Rahim Uddin',
    email: 'rahim.uddin@example.com',
    phone: '+880 1712 345678',
    avatar: 'RU',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    bankName: 'Eastern Bank Ltd.',
    bankBranch: 'Dhanmondi Branch',
    accountNumber: '1234 5678 9012',
    routingNumber: '055263',
    swiftCode: 'EBLDBDDH',
    accountType: 'Savings Account',
    currency: 'BDT',
    currencyName: 'Bangladeshi Taka',
    status: 'Active',
    addedOn: 'May 12, 2025',
    addedTime: '2:30 PM',
    dateOfBirth: 'May 20, 1990',
    address: 'House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh',
    preferredCurrency: 'BDT - Bangladeshi Taka',
    purpose: 'Family Support',
    relationship: 'Family',
    lastTransaction: 'May 12, 2025',
    totalTransactions: 12,
    totalReceived: '৳125,450.00',
  },
  {
    id: 'BEN-002',
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    phone: '+63 917 123 4567',
    avatar: 'MS',
    country: 'Philippines',
    countryFlag: '🇵🇭',
    bankName: 'BDO Unibank, Inc.',
    bankBranch: 'Makati Branch',
    accountNumber: '0012 3456 7890',
    routingNumber: 'BNORPHMM',
    swiftCode: 'BNORPHMM',
    accountType: 'Savings Account',
    currency: 'PHP',
    currencyName: 'Philippine Peso',
    status: 'Active',
    addedOn: 'May 12, 2025',
    addedTime: '10:15 AM',
    dateOfBirth: 'March 14, 1988',
    address: '45 Ayala Avenue, Makati City, Metro Manila, Philippines',
    preferredCurrency: 'PHP - Philippine Peso',
    purpose: 'Family Support',
    relationship: 'Friend',
    lastTransaction: 'May 11, 2025',
    totalTransactions: 8,
    totalReceived: '₱98,200.00',
  },
  {
    id: 'BEN-003',
    name: 'Arif Khan',
    email: 'arif.khan@example.com',
    phone: '+92 301 2345678',
    avatar: 'AK',
    country: 'Pakistan',
    countryFlag: '🇵🇰',
    bankName: 'Meezan Bank',
    bankBranch: 'Karachi Branch',
    accountNumber: 'PK12 MEZN 0001',
    routingNumber: '2345 6789 01',
    swiftCode: 'MEZNPKKA',
    accountType: 'Current Account',
    iban: 'PK12MEZN0001234567890',
    currency: 'PKR',
    currencyName: 'Pakistani Rupee',
    status: 'Active',
    addedOn: 'May 11, 2025',
    addedTime: '6:45 PM',
    dateOfBirth: 'July 8, 1992',
    address: 'Plot 22, Block B, Gulshan-e-Iqbal, Karachi, Pakistan',
    preferredCurrency: 'PKR - Pakistani Rupee',
    purpose: 'Business',
    relationship: 'Business Partner',
    lastTransaction: 'May 10, 2025',
    totalTransactions: 5,
    totalReceived: '₨145,000.00',
  },
  {
    id: 'BEN-004',
    name: 'Mohammad Ali',
    email: 'mohammad.ali@example.com',
    phone: '+971 60 123 4567',
    avatar: 'MA',
    country: 'UAE',
    countryFlag: '🇦🇪',
    bankName: 'Emirates NBD',
    bankBranch: 'Dubai Branch',
    accountNumber: 'AE07 0260 0012',
    routingNumber: '3456 7890 001',
    swiftCode: 'EBILAEAD',
    accountType: 'Current Account',
    iban: 'AE070260001234567890123',
    currency: 'AED',
    currencyName: 'UAE Dirham',
    status: 'Active',
    addedOn: 'May 11, 2025',
    addedTime: '3:20 PM',
    dateOfBirth: 'January 25, 1985',
    address: 'Villa 7, Al Barsha 1, Dubai, United Arab Emirates',
    preferredCurrency: 'AED - UAE Dirham',
    purpose: 'Business',
    relationship: 'Business Partner',
    lastTransaction: 'May 9, 2025',
    totalTransactions: 15,
    totalReceived: 'AED 85,200.00',
  },
  {
    id: 'BEN-005',
    name: 'Ibrahim Khalil',
    email: 'ibrahim.khalil@example.com',
    phone: '+966 55 123 4567',
    avatar: 'IK',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    bankName: 'Al Rajhi Bank',
    bankBranch: 'Riyadh Branch',
    accountNumber: 'SA12 8000 0123',
    routingNumber: '4567 8901 2345',
    swiftCode: 'RJHISARI',
    accountType: 'Savings Account',
    iban: 'SA128000012345678901234',
    currency: 'SAR',
    currencyName: 'Saudi Riyal',
    status: 'Inactive',
    addedOn: 'May 10, 2025',
    addedTime: '11:05 AM',
    dateOfBirth: 'April 3, 1978',
    address: 'Street 15, Al Olaya District, Riyadh 12214, Saudi Arabia',
    preferredCurrency: 'SAR - Saudi Riyal',
    purpose: 'Family Support',
    relationship: 'Relative',
    lastTransaction: 'April 28, 2025',
    totalTransactions: 3,
    totalReceived: 'SAR 12,500.00',
  },
  {
    id: 'BEN-006',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    avatar: 'PS',
    country: 'India',
    countryFlag: '🇮🇳',
    bankName: 'HDFC Bank',
    bankBranch: 'Mumbai Branch',
    accountNumber: '5010 1234 5678',
    routingNumber: 'IFSC: HDFC0001234',
    swiftCode: 'HDFCINBB',
    accountType: 'Savings Account',
    currency: 'INR',
    currencyName: 'Indian Rupee',
    status: 'Active',
    addedOn: 'May 10, 2025',
    addedTime: '9:30 AM',
    dateOfBirth: 'September 12, 1993',
    address: 'Flat 301, Sunflower Apt, Bandra West, Mumbai 400050, India',
    preferredCurrency: 'INR - Indian Rupee',
    purpose: 'Education',
    relationship: 'Friend',
    lastTransaction: 'May 10, 2025',
    totalTransactions: 7,
    totalReceived: '₹62,300.00',
  },
  {
    id: 'BEN-007',
    name: 'Samuel Okafor',
    email: 'samuel.okafor@example.com',
    phone: '+234 803 123 4567',
    avatar: 'SO',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    bankName: 'GTBank',
    bankBranch: 'Lagos Branch',
    accountNumber: '0123456789',
    routingNumber: 'Sort Code: 058152',
    swiftCode: 'GTBINGLA',
    accountType: 'Current Account',
    currency: 'NGN',
    currencyName: 'Nigerian Naira',
    status: 'Pending',
    addedOn: 'May 9, 2025',
    addedTime: '5:10 PM',
    dateOfBirth: 'February 19, 1991',
    address: '12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria',
    preferredCurrency: 'NGN - Nigerian Naira',
    purpose: 'Business',
    relationship: 'Business Partner',
    lastTransaction: 'May 8, 2025',
    totalTransactions: 2,
    totalReceived: '₦85,000.00',
  },
  {
    id: 'BEN-008',
    name: 'Siti Aisyah',
    email: 'siti.aisyah@example.com',
    phone: '+60 12 345 6789',
    avatar: 'SA',
    country: 'Malaysia',
    countryFlag: '🇲🇾',
    bankName: 'Maybank',
    bankBranch: 'Kuala Lumpur Branch',
    accountNumber: '5143 1234 5678',
    routingNumber: 'SWIFT: MBEMYKL',
    swiftCode: 'MBEMYKL',
    accountType: 'Savings Account',
    currency: 'MYR',
    currencyName: 'Malaysian Ringgit',
    status: 'Active',
    addedOn: 'May 9, 2025',
    addedTime: '2:45 PM',
    dateOfBirth: 'June 30, 1995',
    address: 'No. 8, Jalan Ampang, Kuala Lumpur 50450, Malaysia',
    preferredCurrency: 'MYR - Malaysian Ringgit',
    purpose: 'Family Support',
    relationship: 'Family',
    lastTransaction: 'May 9, 2025',
    totalTransactions: 9,
    totalReceived: 'MYR 18,900.00',
  },
  {
    id: 'BEN-009',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    phone: '+44 7700 900129',
    avatar: 'DW',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    bankName: 'Barclays Bank',
    bankBranch: 'London Branch',
    accountNumber: 'GB29 BARC 2013',
    routingNumber: '1234 56 90',
    swiftCode: 'BARCGB22',
    accountType: 'Current Account',
    iban: 'GB29BARCXXXXXXXX',
    currency: 'GBP',
    currencyName: 'British Pound',
    status: 'Active',
    addedOn: 'May 8, 2025',
    addedTime: '11:00 AM',
    dateOfBirth: 'November 5, 1982',
    address: '14 Baker Street, Marylebone, London W1U 3BW, United Kingdom',
    preferredCurrency: 'GBP - British Pound',
    purpose: 'Business',
    relationship: 'Business Partner',
    lastTransaction: 'May 7, 2025',
    totalTransactions: 20,
    totalReceived: '£42,800.00',
  },
  {
    id: 'BEN-010',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    phone: '+1 202 555 0198',
    avatar: 'EJ',
    country: 'United States',
    countryFlag: '🇺🇸',
    bankName: 'Chase Bank',
    bankBranch: 'New York Branch',
    accountNumber: '1234 5678 9012',
    routingNumber: 'Routing: 021000021',
    swiftCode: 'CHASUS33',
    accountType: 'Checking Account',
    currency: 'USD',
    currencyName: 'US Dollar',
    status: 'Active',
    addedOn: 'May 8, 2025',
    addedTime: '9:15 AM',
    dateOfBirth: 'August 17, 1990',
    address: '250 West 57th Street, New York, NY 10107, USA',
    preferredCurrency: 'USD - US Dollar',
    purpose: 'Personal',
    relationship: 'Friend',
    lastTransaction: 'May 6, 2025',
    totalTransactions: 4,
    totalReceived: '$8,200.00',
  },
  {
    id: 'BEN-011',
    name: 'Karim Hassan',
    email: 'karim.hassan@example.com',
    phone: '+49 170 123 4567',
    avatar: 'KH',
    country: 'Germany',
    countryFlag: '🇩🇪',
    bankName: 'Deutsche Bank',
    bankBranch: 'Berlin Branch',
    accountNumber: 'DE89 3704 0044',
    routingNumber: '3704 0044 0532',
    swiftCode: 'DEUTDEDB',
    accountType: 'Current Account',
    iban: 'DE89370400440532013000',
    currency: 'EUR',
    currencyName: 'Euro',
    status: 'Active',
    addedOn: 'May 7, 2025',
    addedTime: '4:00 PM',
    dateOfBirth: 'December 22, 1987',
    address: 'Friedrichstraße 45, 10117 Berlin, Germany',
    preferredCurrency: 'EUR - Euro',
    purpose: 'Education',
    relationship: 'Friend',
    lastTransaction: 'May 5, 2025',
    totalTransactions: 6,
    totalReceived: '€14,500.00',
  },
  {
    id: 'BEN-012',
    name: 'Nadia Islam',
    email: 'nadia.islam@example.com',
    phone: '+61 412 345 678',
    avatar: 'NI',
    country: 'Australia',
    countryFlag: '🇦🇺',
    bankName: 'Commonwealth Bank',
    bankBranch: 'Sydney Branch',
    accountNumber: '0625 7654 3210',
    routingNumber: 'BSB: 062500',
    swiftCode: 'CTBAAU2S',
    accountType: 'Savings Account',
    currency: 'AUD',
    currencyName: 'Australian Dollar',
    status: 'Active',
    addedOn: 'May 7, 2025',
    addedTime: '1:30 PM',
    dateOfBirth: 'March 8, 1994',
    address: '88 George Street, Sydney NSW 2000, Australia',
    preferredCurrency: 'AUD - Australian Dollar',
    purpose: 'Family Support',
    relationship: 'Family',
    lastTransaction: 'May 6, 2025',
    totalTransactions: 11,
    totalReceived: 'AUD 22,100.00',
  },
  {
    id: 'BEN-013',
    name: 'Omar Sheikh',
    email: 'omar.sheikh@example.com',
    phone: '+974 5012 3456',
    avatar: 'OS',
    country: 'Qatar',
    countryFlag: '🇶🇦',
    bankName: 'Qatar National Bank',
    bankBranch: 'Doha Branch',
    accountNumber: 'QA58 QNBA 0000',
    routingNumber: '0000 6935 0063',
    swiftCode: 'QNBAQAQA',
    accountType: 'Savings Account',
    iban: 'QA58QNBA0000000069350063',
    currency: 'QAR',
    currencyName: 'Qatari Riyal',
    status: 'Active',
    addedOn: 'May 6, 2025',
    addedTime: '8:20 AM',
    dateOfBirth: 'May 11, 1980',
    address: 'Villa 45, West Bay, Doha, Qatar',
    preferredCurrency: 'QAR - Qatari Riyal',
    purpose: 'Business',
    relationship: 'Business Partner',
    lastTransaction: 'May 4, 2025',
    totalTransactions: 18,
    totalReceived: 'QAR 95,000.00',
  },
  {
    id: 'BEN-014',
    name: 'Fatima Malik',
    email: 'fatima.malik@example.com',
    phone: '+1 416 555 0123',
    avatar: 'FM',
    country: 'Canada',
    countryFlag: '🇨🇦',
    bankName: 'Royal Bank of Canada',
    bankBranch: 'Toronto Branch',
    accountNumber: '1234 567 890',
    routingNumber: '003 00012',
    swiftCode: 'ROYCCAT2',
    accountType: 'Checking Account',
    currency: 'CAD',
    currencyName: 'Canadian Dollar',
    status: 'Active',
    addedOn: 'May 6, 2025',
    addedTime: '3:45 PM',
    dateOfBirth: 'October 29, 1989',
    address: '120 Queen Street West, Toronto, ON M5H 2M9, Canada',
    preferredCurrency: 'CAD - Canadian Dollar',
    purpose: 'Education',
    relationship: 'Friend',
    lastTransaction: 'May 3, 2025',
    totalTransactions: 9,
    totalReceived: 'CAD 32,400.00',
  },
  {
    id: 'BEN-015',
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@example.com',
    phone: '+81 90 1234 5678',
    avatar: 'YT',
    country: 'Japan',
    countryFlag: '🇯🇵',
    bankName: 'Sumitomo Mitsui Bank',
    bankBranch: 'Tokyo Branch',
    accountNumber: '1234567',
    routingNumber: 'Branch: 001',
    swiftCode: 'SMBCJPJT',
    accountType: 'Savings Account',
    currency: 'JPY',
    currencyName: 'Japanese Yen',
    status: 'Inactive',
    addedOn: 'May 5, 2025',
    addedTime: '10:00 AM',
    dateOfBirth: 'July 7, 1996',
    address: '2-1-1 Marunouchi, Chiyoda-ku, Tokyo 100-0005, Japan',
    preferredCurrency: 'JPY - Japanese Yen',
    purpose: 'Personal',
    relationship: 'Friend',
    lastTransaction: 'April 20, 2025',
    totalTransactions: 3,
    totalReceived: '¥245,000',
  },
  {
    id: 'BEN-016',
    name: 'Ana Pereira',
    email: 'ana.pereira@example.com',
    phone: '+351 912 345 678',
    avatar: 'AP',
    country: 'Portugal',
    countryFlag: '🇵🇹',
    bankName: 'Caixa Geral de Depósitos',
    bankBranch: 'Lisbon Branch',
    accountNumber: 'PT50 0035 0292',
    routingNumber: '0000 0001 7388',
    swiftCode: 'CGDIPTPL',
    accountType: 'Savings Account',
    iban: 'PT50003502920000000173886',
    currency: 'EUR',
    currencyName: 'Euro',
    status: 'Active',
    addedOn: 'May 5, 2025',
    addedTime: '2:00 PM',
    dateOfBirth: 'February 14, 1991',
    address: 'Rua Augusta 100, 1100-053 Lisboa, Portugal',
    preferredCurrency: 'EUR - Euro',
    purpose: 'Family Support',
    relationship: 'Family',
    lastTransaction: 'May 2, 2025',
    totalTransactions: 7,
    totalReceived: '€18,750.00',
  },
  {
    id: 'BEN-017',
    name: 'Chidi Okonkwo',
    email: 'chidi.okonkwo@example.com',
    phone: '+234 805 678 9012',
    avatar: 'CO',
    country: 'Nigeria',
    countryFlag: '🇳🇬',
    bankName: 'Access Bank',
    bankBranch: 'Abuja Branch',
    accountNumber: '0987654321',
    routingNumber: 'Sort Code: 044150',
    swiftCode: 'ABNGNGLA',
    accountType: 'Current Account',
    currency: 'NGN',
    currencyName: 'Nigerian Naira',
    status: 'Active',
    addedOn: 'May 4, 2025',
    addedTime: '7:30 PM',
    dateOfBirth: 'August 20, 1986',
    address: 'Plot 1234, Wuse Zone 4, Abuja FCT, Nigeria',
    preferredCurrency: 'NGN - Nigerian Naira',
    purpose: 'Business',
    relationship: 'Business Partner',
    lastTransaction: 'May 1, 2025',
    totalTransactions: 14,
    totalReceived: '₦420,000.00',
  },
  {
    id: 'BEN-018',
    name: 'Mei Chen',
    email: 'mei.chen@example.com',
    phone: '+65 9123 4567',
    avatar: 'MC',
    country: 'Singapore',
    countryFlag: '🇸🇬',
    bankName: 'DBS Bank',
    bankBranch: 'Orchard Branch',
    accountNumber: '1234 5678 901',
    routingNumber: 'Bank Code: 7171',
    swiftCode: 'DBSSSGSG',
    accountType: 'Savings Account',
    currency: 'SGD',
    currencyName: 'Singapore Dollar',
    status: 'Active',
    addedOn: 'May 4, 2025',
    addedTime: '11:15 AM',
    dateOfBirth: 'April 5, 1993',
    address: '80 Robinson Road, #02-00, Singapore 068898',
    preferredCurrency: 'SGD - Singapore Dollar',
    purpose: 'Education',
    relationship: 'Friend',
    lastTransaction: 'April 30, 2025',
    totalTransactions: 5,
    totalReceived: 'SGD 12,300.00',
  },
  {
    id: 'BEN-019',
    name: 'Marcus Brown',
    email: 'marcus.brown@example.com',
    phone: '+1 212 555 0134',
    avatar: 'MB',
    country: 'United States',
    countryFlag: '🇺🇸',
    bankName: 'Bank of America',
    bankBranch: 'Manhattan Branch',
    accountNumber: '9876 5432 1098',
    routingNumber: 'Routing: 026009593',
    swiftCode: 'BOFAUS3N',
    accountType: 'Checking Account',
    currency: 'USD',
    currencyName: 'US Dollar',
    status: 'Active',
    addedOn: 'May 3, 2025',
    addedTime: '4:50 PM',
    dateOfBirth: 'January 30, 1984',
    address: '1 Bryant Park, New York, NY 10036, USA',
    preferredCurrency: 'USD - US Dollar',
    purpose: 'Personal',
    relationship: 'Friend',
    lastTransaction: 'April 28, 2025',
    totalTransactions: 6,
    totalReceived: '$15,600.00',
  },
  {
    id: 'BEN-020',
    name: 'Lena Fischer',
    email: 'lena.fischer@example.com',
    phone: '+49 160 987 6543',
    avatar: 'LF',
    country: 'Germany',
    countryFlag: '🇩🇪',
    bankName: 'Commerzbank',
    bankBranch: 'Frankfurt Branch',
    accountNumber: 'DE75 2004 0060',
    routingNumber: '6274 3015 06',
    swiftCode: 'COBADEFF',
    accountType: 'Current Account',
    iban: 'DE75200400600627430150 6',
    currency: 'EUR',
    currencyName: 'Euro',
    status: 'Inactive',
    addedOn: 'May 2, 2025',
    addedTime: '9:00 AM',
    dateOfBirth: 'June 18, 1990',
    address: 'Kaiserstraße 29, 60311 Frankfurt am Main, Germany',
    preferredCurrency: 'EUR - Euro',
    purpose: 'Medical',
    relationship: 'Relative',
    lastTransaction: 'April 15, 2025',
    totalTransactions: 4,
    totalReceived: '€9,800.00',
  },
];

export const beneficiaryCountryOptions = [
  'All Countries',
  'Bangladesh',
  'Philippines',
  'Pakistan',
  'UAE',
  'Saudi Arabia',
  'India',
  'Nigeria',
  'Malaysia',
  'United Kingdom',
  'United States',
  'Germany',
  'Australia',
  'Qatar',
  'Canada',
  'Japan',
  'Portugal',
  'Singapore',
];

export const beneficiaryStatusOptions = [
  'All Status',
  'Active',
  'Inactive',
  'Pending',
];

export const beneficiaryCurrencyOptions = [
  'All Currencies',
  'BDT - Bangladeshi Taka',
  'PHP - Philippine Peso',
  'PKR - Pakistani Rupee',
  'AED - UAE Dirham',
  'SAR - Saudi Riyal',
  'INR - Indian Rupee',
  'NGN - Nigerian Naira',
  'MYR - Malaysian Ringgit',
  'GBP - British Pound',
  'USD - US Dollar',
  'EUR - Euro',
  'AUD - Australian Dollar',
  'QAR - Qatari Riyal',
  'CAD - Canadian Dollar',
  'JPY - Japanese Yen',
  'SGD - Singapore Dollar',
];

export const BENEFICIARY_TOTAL = 2458;
export const BENEFICIARY_ACTIVE = 2156;
export const BENEFICIARY_INACTIVE = 186;
export const BENEFICIARY_WEEK_ADDED = 45;
export const BENEFICIARY_PAGE_SIZE = 10;





// ============================================================
// BENEFICIARIES — SENDER — DATA, TYPES & CONSTANTS
// New "Sender" section under Beneficiaries (alongside Receiver List / Add Beneficiary)
// ============================================================

export type SenderStatus = "Active" | "Suspended" | "Pending Verification";
export type SenderKycStatus = "Verified" | "Pending" | "Rejected";

export interface SenderLinkedBeneficiary {
  id: string;
  name: string;
  relationship: string;
  country: string;
  countryFlag: string;
  totalSent: string;
  lastSentOn: string;
}

export interface SenderTransfer {
  id: string;
  beneficiaryName: string;
  beneficiaryFlag: string;
  amount: string;
  fee: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
}

export interface SenderRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  customerId: string;
  country: string;
  countryFlag: string;
  status: SenderStatus;
  kycStatus: SenderKycStatus;
  joinedDate: string;
  lastSentOn: string;
  totalBeneficiaries: number;
  totalSent: string;
  totalTransfers: number;
  avgTransferAmount: string;
  preferredCorridor: string; // e.g. "UK → Bangladesh"
  linkedBeneficiaries: SenderLinkedBeneficiary[];
  recentTransfers: SenderTransfer[];
}

// ---------- Badge style maps ----------

export const senderStatusBadge: Record<SenderStatus, string> = {
  Active: "bg-green-50 text-green-700 border border-green-200",
  Suspended: "bg-red-50 text-red-700 border border-red-200",
  "Pending Verification": "bg-yellow-50 text-yellow-700 border border-yellow-200",
};

export const senderKycBadge: Record<SenderKycStatus, string> = {
  Verified: "bg-green-50 text-green-700 border border-green-200",
  Pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Rejected: "bg-red-50 text-red-700 border border-red-200",
};

export const senderTransferStatusBadge: Record<SenderTransfer["status"], string> = {
  Completed: "bg-green-50 text-green-700 border border-green-200",
  Pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Failed: "bg-red-50 text-red-700 border border-red-200",
};

export const senderStatusOptions: SenderStatus[] = ["Active", "Suspended", "Pending Verification"];
export const senderKycStatusOptions: SenderKycStatus[] = ["Verified", "Pending", "Rejected"];

// ---------- Stat summary ----------

export interface SenderStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "active" | "volume" | "avgBeneficiaries";
}

export const senderStats: SenderStat[] = [
  { id: "sender-stat-total", label: "Total Senders", value: "1,486", icon: "total" },
  { id: "sender-stat-active", label: "Active Senders", value: "1,312", icon: "active" },
  { id: "sender-stat-volume", label: "Total Sent (This Month)", value: "£284,650", icon: "volume" },
  { id: "sender-stat-avg", label: "Avg Beneficiaries / Sender", value: "2.4", icon: "avgBeneficiaries" },
];

// ---------- Main data ----------

export const senderAvatarColors: string[] = [
  "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500",
  "bg-pink-500", "bg-teal-500", "bg-indigo-500", "bg-rose-500",
];

export const sendersData: SenderRecord[] = [
  {
    id: "snd-1",
    name: "John Rahman",
    email: "john.rahman@example.com",
    phone: "+44 7700 900123",
    avatar: "JR",
    customerId: "CUS-25051901",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    status: "Active",
    kycStatus: "Verified",
    joinedDate: "May 19, 2025",
    lastSentOn: "May 19, 2025",
    totalBeneficiaries: 3,
    totalSent: "£15,750.00",
    totalTransfers: 24,
    avgTransferAmount: "£656.25",
    preferredCorridor: "UK → Bangladesh",
    linkedBeneficiaries: [
      { id: "ben-1", name: "Karim Rahman", relationship: "Father", country: "Bangladesh", countryFlag: "🇧🇩", totalSent: "£8,200.00", lastSentOn: "May 19, 2025" },
      { id: "ben-2", name: "Anita Sharma", relationship: "Friend", country: "India", countryFlag: "🇮🇳", totalSent: "£4,550.00", lastSentOn: "May 18, 2025" },
      { id: "ben-3", name: "Bilal Hussain", relationship: "Cousin", country: "Pakistan", countryFlag: "🇵🇰", totalSent: "£3,000.00", lastSentOn: "May 17, 2025" },
    ],
    recentTransfers: [
      { id: "trf-1", beneficiaryName: "Karim Rahman", beneficiaryFlag: "🇧🇩", amount: "£520.00", fee: "£3.50", status: "Completed", date: "May 19, 2025" },
      { id: "trf-2", beneficiaryName: "Anita Sharma", beneficiaryFlag: "🇮🇳", amount: "£750.00", fee: "£4.00", status: "Completed", date: "May 18, 2025" },
      { id: "trf-3", beneficiaryName: "Bilal Hussain", beneficiaryFlag: "🇵🇰", amount: "£320.00", fee: "£2.50", status: "Completed", date: "May 17, 2025" },
    ],
  },
  {
    id: "snd-2",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+44 7700 900124",
    avatar: "PS",
    customerId: "CUS-25051902",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    status: "Pending Verification",
    kycStatus: "Pending",
    joinedDate: "May 18, 2025",
    lastSentOn: "May 18, 2025",
    totalBeneficiaries: 1,
    totalSent: "£3,200.00",
    totalTransfers: 8,
    avgTransferAmount: "£400.00",
    preferredCorridor: "UK → India",
    linkedBeneficiaries: [
      { id: "ben-4", name: "Rohan Sharma", relationship: "Brother", country: "India", countryFlag: "🇮🇳", totalSent: "£3,200.00", lastSentOn: "May 18, 2025" },
    ],
    recentTransfers: [
      { id: "trf-4", beneficiaryName: "Rohan Sharma", beneficiaryFlag: "🇮🇳", amount: "£420.00", fee: "£3.00", status: "Pending", date: "May 18, 2025" },
    ],
  },
  {
    id: "snd-3",
    name: "Ahmed Khan",
    email: "ahmed.khan@example.com",
    phone: "+44 7700 900125",
    avatar: "AK",
    customerId: "CUS-25051903",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    status: "Active",
    kycStatus: "Verified",
    joinedDate: "May 15, 2025",
    lastSentOn: "May 19, 2025",
    totalBeneficiaries: 2,
    totalSent: "£28,500.00",
    totalTransfers: 42,
    avgTransferAmount: "£678.57",
    preferredCorridor: "UK → Pakistan",
    linkedBeneficiaries: [
      { id: "ben-5", name: "Imran Khan", relationship: "Father", country: "Pakistan", countryFlag: "🇵🇰", totalSent: "£18,400.00", lastSentOn: "May 19, 2025" },
      { id: "ben-6", name: "Sadia Begum", relationship: "Sister", country: "Bangladesh", countryFlag: "🇧🇩", totalSent: "£10,100.00", lastSentOn: "May 18, 2025" },
    ],
    recentTransfers: [
      { id: "trf-5", beneficiaryName: "Imran Khan", beneficiaryFlag: "🇵🇰", amount: "£1,200.00", fee: "£5.00", status: "Completed", date: "May 19, 2025" },
      { id: "trf-6", beneficiaryName: "Sadia Begum", beneficiaryFlag: "🇧🇩", amount: "£680.00", fee: "£3.50", status: "Completed", date: "May 18, 2025" },
    ],
  },
  {
    id: "snd-4",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    phone: "+44 7700 900126",
    avatar: "MS",
    customerId: "CUS-25051904",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    status: "Active",
    kycStatus: "Verified",
    joinedDate: "May 10, 2025",
    lastSentOn: "May 19, 2025",
    totalBeneficiaries: 2,
    totalSent: "£18,200.00",
    totalTransfers: 31,
    avgTransferAmount: "£587.10",
    preferredCorridor: "UK → Philippines",
    linkedBeneficiaries: [
      { id: "ben-7", name: "Carlos Santos", relationship: "Father", country: "Philippines", countryFlag: "🇵🇭", totalSent: "£12,500.00", lastSentOn: "May 19, 2025" },
      { id: "ben-8", name: "Liza Santos", relationship: "Mother", country: "Philippines", countryFlag: "🇵🇭", totalSent: "£5,700.00", lastSentOn: "May 17, 2025" },
    ],
    recentTransfers: [
      { id: "trf-7", beneficiaryName: "Carlos Santos", beneficiaryFlag: "🇵🇭", amount: "£950.00", fee: "£4.50", status: "Completed", date: "May 19, 2025" },
      { id: "trf-8", beneficiaryName: "Liza Santos", beneficiaryFlag: "🇵🇭", amount: "£620.00", fee: "£3.50", status: "Failed", date: "May 17, 2025" },
    ],
  },
  {
    id: "snd-5",
    name: "James Okafor",
    email: "james.okafor@example.com",
    phone: "+44 7700 900127",
    avatar: "JO",
    customerId: "CUS-25051905",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    status: "Suspended",
    kycStatus: "Rejected",
    joinedDate: "May 8, 2025",
    lastSentOn: "May 8, 2025",
    totalBeneficiaries: 0,
    totalSent: "£0.00",
    totalTransfers: 0,
    avgTransferAmount: "£0.00",
    preferredCorridor: "—",
    linkedBeneficiaries: [],
    recentTransfers: [],
  },
  {
    id: "snd-6",
    name: "Fatima Ali",
    email: "fatima.ali@example.com",
    phone: "+44 7700 900128",
    avatar: "FA",
    customerId: "CUS-25051906",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    status: "Pending Verification",
    kycStatus: "Pending",
    joinedDate: "May 17, 2025",
    lastSentOn: "May 19, 2025",
    totalBeneficiaries: 1,
    totalSent: "£2,100.00",
    totalTransfers: 5,
    avgTransferAmount: "£420.00",
    preferredCorridor: "UK → Bangladesh",
    linkedBeneficiaries: [
      { id: "ben-9", name: "Hasan Ali", relationship: "Husband", country: "Bangladesh", countryFlag: "🇧🇩", totalSent: "£2,100.00", lastSentOn: "May 19, 2025" },
    ],
    recentTransfers: [
      { id: "trf-9", beneficiaryName: "Hasan Ali", beneficiaryFlag: "🇧🇩", amount: "£380.00", fee: "£2.50", status: "Pending", date: "May 19, 2025" },
    ],
  },
  {
    id: "snd-7",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+44 7700 900129",
    avatar: "DW",
    customerId: "CUS-25051907",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    status: "Active",
    kycStatus: "Verified",
    joinedDate: "Apr 30, 2025",
    lastSentOn: "May 19, 2025",
    totalBeneficiaries: 3,
    totalSent: "£52,300.00",
    totalTransfers: 68,
    avgTransferAmount: "£769.12",
    preferredCorridor: "UK → India",
    linkedBeneficiaries: [
      { id: "ben-10", name: "Deepak Mehta", relationship: "Business Partner", country: "India", countryFlag: "🇮🇳", totalSent: "£28,000.00", lastSentOn: "May 19, 2025" },
      { id: "ben-11", name: "Chidi Okonkwo", relationship: "Friend", country: "Nigeria", countryFlag: "🇳🇬", totalSent: "£15,300.00", lastSentOn: "May 18, 2025" },
      { id: "ben-12", name: "Grace Wilson", relationship: "Sister", country: "United Kingdom", countryFlag: "🇬🇧", totalSent: "£9,000.00", lastSentOn: "May 17, 2025" },
    ],
    recentTransfers: [
      { id: "trf-10", beneficiaryName: "Deepak Mehta", beneficiaryFlag: "🇮🇳", amount: "£2,000.00", fee: "£6.00", status: "Completed", date: "May 19, 2025" },
      { id: "trf-11", beneficiaryName: "Chidi Okonkwo", beneficiaryFlag: "🇳🇬", amount: "£1,500.00", fee: "£5.50", status: "Completed", date: "May 18, 2025" },
    ],
  },
  {
    id: "snd-8",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    phone: "+44 7700 900130",
    avatar: "SM",
    customerId: "CUS-25051908",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    status: "Active",
    kycStatus: "Verified",
    joinedDate: "May 5, 2025",
    lastSentOn: "May 19, 2025",
    totalBeneficiaries: 1,
    totalSent: "£11,400.00",
    totalTransfers: 19,
    avgTransferAmount: "£600.00",
    preferredCorridor: "UK → France",
    linkedBeneficiaries: [
      { id: "ben-13", name: "Lucie Martin", relationship: "Daughter", country: "France", countryFlag: "🇫🇷", totalSent: "£11,400.00", lastSentOn: "May 19, 2025" },
    ],
    recentTransfers: [
      { id: "trf-12", beneficiaryName: "Lucie Martin", beneficiaryFlag: "🇫🇷", amount: "£780.00", fee: "£3.50", status: "Completed", date: "May 19, 2025" },
    ],
  },
];

export const sendersTotalCount = 1486;










//here KYC fake data

export type KycStatus =
  | 'Approved'
  | 'Pending'
  | 'Rejected'
  | 'Under Review'
  | 'Expired';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type KycTier = 'Tier 1' | 'Tier 2' | 'Tier 3';
export type DocumentStatus = 'Verified' | 'Missing' | 'Failed' | 'Pending';

export interface KycDocument {
  type: 'NID' | 'Passport' | 'Utility Bill' | 'Business Doc';
  label: string;
  status: DocumentStatus;
  uploadedAt: string | null;
}

export interface ApiVerification {
  identityMatch: 'Passed' | 'Failed' | 'Pending';
  faceLiveness: 'Passed' | 'Failed' | 'Pending';
  sanctionsCheck: 'Clear' | 'Flagged' | 'Pending';
  documentAuthenticity: 'Authentic' | 'Invalid' | 'Pending';
  provider: string;
  checkedAt: string | null;
}

export interface KycCustomer {
  id: string;
  name: string;
  initials: string;
  avatarColor: 'blue' | 'purple' | 'green' | 'amber' | 'red' | 'teal' | 'pink';
  email: string;
  phone: string;
  nationality: string;
  occupation: string;
  sourceOfFunds: string;
  status: KycStatus;
  tier: KycTier;
  risk: RiskLevel;
  submittedAt: string;
  expiresAt: string | null;
  reviewerNote: string;
  documents: KycDocument[];
  apiVerification: ApiVerification;
}

// ============ KYC STATS ============
export const kycStats = {
  totalSubmitted: 1284,
  approved: 892,
  pending: 213,
  rejected: 98,
  underReview: 50,
  expired: 31,
  highRisk: 31,
  approvalRate: 69.5,
  rejectRate: 7.6,
  newToday: 18,
  flaggedToday: 3,
};

// ============ KYC FAKE DATA ============
export const kycCustomers: KycCustomer[] = [
  {
    id: 'C-10041',
    name: 'Rahul Ahmed',
    initials: 'RA',
    avatarColor: 'blue',
    email: 'rahul.ahmed@gmail.com',
    phone: '+880 1711-234567',
    nationality: 'Bangladeshi',
    occupation: 'Software Engineer',
    sourceOfFunds: 'Employment',
    status: 'Approved',
    tier: 'Tier 2',
    risk: 'Low',
    submittedAt: '2025-01-12',
    expiresAt: '2027-01-12',
    reviewerNote: 'All documents verified successfully via third-party API.',
    documents: [
      {
        type: 'NID',
        label: 'National ID (NID)',
        status: 'Verified',
        uploadedAt: '2025-01-12',
      },
      {
        type: 'Passport',
        label: 'Passport',
        status: 'Verified',
        uploadedAt: '2025-01-12',
      },
      {
        type: 'Utility Bill',
        label: 'Utility Bill',
        status: 'Verified',
        uploadedAt: '2025-01-14',
      },
      {
        type: 'Business Doc',
        label: 'Business Document',
        status: 'Missing',
        uploadedAt: null,
      },
    ],
    apiVerification: {
      identityMatch: 'Passed',
      faceLiveness: 'Passed',
      sanctionsCheck: 'Clear',
      documentAuthenticity: 'Authentic',
      provider: 'Onfido',
      checkedAt: '2025-01-12',
    },
  },
  {
    id: 'C-10042',
    name: 'Nadia Islam',
    initials: 'NI',
    avatarColor: 'purple',
    email: 'nadia.islam@yahoo.com',
    phone: '+880 1812-345678',
    nationality: 'Bangladeshi',
    occupation: 'Teacher',
    sourceOfFunds: 'Employment',
    status: 'Pending',
    tier: 'Tier 1',
    risk: 'Medium',
    submittedAt: '2025-11-28',
    expiresAt: null,
    reviewerNote: 'Awaiting passport and utility bill upload.',
    documents: [
      {
        type: 'NID',
        label: 'National ID (NID)',
        status: 'Verified',
        uploadedAt: '2025-11-28',
      },
      {
        type: 'Passport',
        label: 'Passport',
        status: 'Missing',
        uploadedAt: null,
      },
      {
        type: 'Utility Bill',
        label: 'Utility Bill',
        status: 'Missing',
        uploadedAt: null,
      },
      {
        type: 'Business Doc',
        label: 'Business Document',
        status: 'Missing',
        uploadedAt: null,
      },
    ],
    apiVerification: {
      identityMatch: 'Pending',
      faceLiveness: 'Pending',
      sanctionsCheck: 'Pending',
      documentAuthenticity: 'Pending',
      provider: 'Onfido',
      checkedAt: null,
    },
  },
  {
    id: 'C-10043',
    name: 'Karim Hossain',
    initials: 'KH',
    avatarColor: 'red',
    email: 'karim.hossain@hotmail.com',
    phone: '+880 1913-456789',
    nationality: 'Bangladeshi',
    occupation: 'Businessman',
    sourceOfFunds: 'Business Income',
    status: 'Rejected',
    tier: 'Tier 1',
    risk: 'High',
    submittedAt: '2025-10-05',
    expiresAt: null,
    reviewerNote: 'Document authenticity check failed. Suspected forged NID.',
    documents: [
      {
        type: 'NID',
        label: 'National ID (NID)',
        status: 'Failed',
        uploadedAt: '2025-10-05',
      },
      {
        type: 'Passport',
        label: 'Passport',
        status: 'Missing',
        uploadedAt: null,
      },
      {
        type: 'Utility Bill',
        label: 'Utility Bill',
        status: 'Missing',
        uploadedAt: null,
      },
      {
        type: 'Business Doc',
        label: 'Business Document',
        status: 'Missing',
        uploadedAt: null,
      },
    ],
    apiVerification: {
      identityMatch: 'Failed',
      faceLiveness: 'Failed',
      sanctionsCheck: 'Flagged',
      documentAuthenticity: 'Invalid',
      provider: 'Onfido',
      checkedAt: '2025-10-05',
    },
  },
  {
    id: 'C-10044',
    name: 'Farida Begum',
    initials: 'FB',
    avatarColor: 'green',
    email: 'farida.begum@gmail.com',
    phone: '+880 1615-567890',
    nationality: 'Bangladeshi',
    occupation: 'Business Owner',
    sourceOfFunds: 'Business Income',
    status: 'Approved',
    tier: 'Tier 3',
    risk: 'Low',
    submittedAt: '2026-01-03',
    expiresAt: '2028-01-03',
    reviewerNote: 'Full Tier 3 verification complete. All documents authentic.',
    documents: [
      {
        type: 'NID',
        label: 'National ID (NID)',
        status: 'Verified',
        uploadedAt: '2026-01-03',
      },
      {
        type: 'Passport',
        label: 'Passport',
        status: 'Verified',
        uploadedAt: '2026-01-03',
      },
      {
        type: 'Utility Bill',
        label: 'Utility Bill',
        status: 'Verified',
        uploadedAt: '2026-01-04',
      },
      {
        type: 'Business Doc',
        label: 'Business Document',
        status: 'Verified',
        uploadedAt: '2026-01-05',
      },
    ],
    apiVerification: {
      identityMatch: 'Passed',
      faceLiveness: 'Passed',
      sanctionsCheck: 'Clear',
      documentAuthenticity: 'Authentic',
      provider: 'Jumio',
      checkedAt: '2026-01-05',
    },
  },
  {
    id: 'C-10045',
    name: 'Tariq Mahmud',
    initials: 'TM',
    avatarColor: 'amber',
    email: 'tariq.mahmud@gmail.com',
    phone: '+880 1755-678901',
    nationality: 'Bangladeshi',
    occupation: 'Freelancer',
    sourceOfFunds: 'Freelance Income',
    status: 'Under Review',
    tier: 'Tier 2',
    risk: 'Medium',
    submittedAt: '2026-02-10',
    expiresAt: null,
    reviewerNote:
      'Utility bill address does not match NID address. Manual review required.',
    documents: [
      {
        type: 'NID',
        label: 'National ID (NID)',
        status: 'Verified',
        uploadedAt: '2026-02-10',
      },
      {
        type: 'Passport',
        label: 'Passport',
        status: 'Verified',
        uploadedAt: '2026-02-10',
      },
      {
        type: 'Utility Bill',
        label: 'Utility Bill',
        status: 'Pending',
        uploadedAt: '2026-02-11',
      },
      {
        type: 'Business Doc',
        label: 'Business Document',
        status: 'Missing',
        uploadedAt: null,
      },
    ],
    apiVerification: {
      identityMatch: 'Passed',
      faceLiveness: 'Passed',
      sanctionsCheck: 'Clear',
      documentAuthenticity: 'Pending',
      provider: 'Onfido',
      checkedAt: '2026-02-10',
    },
  },
  {
    id: 'C-10046',
    name: 'Sadia Rahman',
    initials: 'SR',
    avatarColor: 'teal',
    email: 'sadia.rahman@gmail.com',
    phone: '+880 1833-789012',
    nationality: 'Bangladeshi',
    occupation: 'Doctor',
    sourceOfFunds: 'Employment',
    status: 'Expired',
    tier: 'Tier 2',
    risk: 'Low',
    submittedAt: '2024-03-01',
    expiresAt: '2026-03-01',
    reviewerNote: 'KYC expired. Customer needs to re-submit documents.',
    documents: [
      {
        type: 'NID',
        label: 'National ID (NID)',
        status: 'Verified',
        uploadedAt: '2024-03-01',
      },
      {
        type: 'Passport',
        label: 'Passport',
        status: 'Verified',
        uploadedAt: '2024-03-01',
      },
      {
        type: 'Utility Bill',
        label: 'Utility Bill',
        status: 'Verified',
        uploadedAt: '2024-03-02',
      },
      {
        type: 'Business Doc',
        label: 'Business Document',
        status: 'Missing',
        uploadedAt: null,
      },
    ],
    apiVerification: {
      identityMatch: 'Passed',
      faceLiveness: 'Passed',
      sanctionsCheck: 'Clear',
      documentAuthenticity: 'Authentic',
      provider: 'Jumio',
      checkedAt: '2024-03-01',
    },
  },
  {
    id: 'C-10047',
    name: 'Imran Khan',
    initials: 'IK',
    avatarColor: 'pink',
    email: 'imran.khan@gmail.com',
    phone: '+880 1944-890123',
    nationality: 'Bangladeshi',
    occupation: 'Remittance Agent',
    sourceOfFunds: 'Business Income',
    status: 'Approved',
    tier: 'Tier 3',
    risk: 'Medium',
    submittedAt: '2025-08-15',
    expiresAt: '2027-08-15',
    reviewerNote:
      'Tier 3 approved. Medium risk due to high transaction volume.',
    documents: [
      {
        type: 'NID',
        label: 'National ID (NID)',
        status: 'Verified',
        uploadedAt: '2025-08-15',
      },
      {
        type: 'Passport',
        label: 'Passport',
        status: 'Verified',
        uploadedAt: '2025-08-15',
      },
      {
        type: 'Utility Bill',
        label: 'Utility Bill',
        status: 'Verified',
        uploadedAt: '2025-08-16',
      },
      {
        type: 'Business Doc',
        label: 'Business Document',
        status: 'Verified',
        uploadedAt: '2025-08-17',
      },
    ],
    apiVerification: {
      identityMatch: 'Passed',
      faceLiveness: 'Passed',
      sanctionsCheck: 'Clear',
      documentAuthenticity: 'Authentic',
      provider: 'Jumio',
      checkedAt: '2025-08-15',
    },
  },
  {
    id: 'C-10048',
    name: 'Mitu Akter',
    initials: 'MA',
    avatarColor: 'blue',
    email: 'mitu.akter@gmail.com',
    phone: '+880 1677-901234',
    nationality: 'Bangladeshi',
    occupation: 'Housewife',
    sourceOfFunds: 'Family Support',
    status: 'Pending',
    tier: 'Tier 1',
    risk: 'Low',
    submittedAt: '2026-03-20',
    expiresAt: null,
    reviewerNote: 'NID uploaded. Waiting for API verification queue.',
    documents: [
      {
        type: 'NID',
        label: 'National ID (NID)',
        status: 'Pending',
        uploadedAt: '2026-03-20',
      },
      {
        type: 'Passport',
        label: 'Passport',
        status: 'Missing',
        uploadedAt: null,
      },
      {
        type: 'Utility Bill',
        label: 'Utility Bill',
        status: 'Missing',
        uploadedAt: null,
      },
      {
        type: 'Business Doc',
        label: 'Business Document',
        status: 'Missing',
        uploadedAt: null,
      },
    ],
    apiVerification: {
      identityMatch: 'Pending',
      faceLiveness: 'Pending',
      sanctionsCheck: 'Pending',
      documentAuthenticity: 'Pending',
      provider: 'Onfido',
      checkedAt: null,
    },
  },
];

// start wallet fake data here

export type WalletStatus = 'Active' | 'Frozen' | 'Suspended';
export type CurrencyCode =
  | 'GBP'
  | 'USD'
  | 'EUR'
  | 'BDT'
  | 'PKR'
  | 'INR'
  | 'PHP'
  | 'NGN'
  | 'NPR';

export interface WalletCurrency {
  code: CurrencyCode;
  flag: string;
  name: string;
  balance: number;
  onHold: number;
  dailyLimit: number;
  monthlyLimit: number;
  dailyUsed: number;
  monthlyUsed: number;
}

export interface CustomerWallet {
  id: string;
  customerId: string;
  name: string;
  initials: string;
  avatarColor:
    | 'blue'
    | 'purple'
    | 'green'
    | 'amber'
    | 'red'
    | 'teal'
    | 'pink'
    | 'indigo'
    | 'rose';
  email: string;
  status: WalletStatus;
  totalBalanceGBP: number;
  lastActivity: string;
  wallets: WalletCurrency[];
}

// ============ WALLET STATS ============
export const walletStats = {
  totalWallets: 3840,
  activeWallets: 3512,
  frozenWallets: 218,
  suspendedWallets: 110,
  totalBalanceGBP: 2847500,
  totalBalanceUSD: 3601200,
  topUpToday: 142300,
  withdrawToday: 98700,
};

// ============ WALLET FAKE DATA ============
export const customerWallets: CustomerWallet[] = [
  {
    id: 'W-10001',
    customerId: 'C-10041',
    name: 'Rahul Ahmed',
    initials: 'RA',
    avatarColor: 'blue',
    email: 'rahul.ahmed@gmail.com',
    status: 'Active',
    totalBalanceGBP: 4731.15,
    lastActivity: '2026-06-17',
    wallets: [
      {
        code: 'GBP',
        flag: '🇬🇧',
        name: 'British Pound',
        balance: 2450.75,
        onHold: 120.0,
        dailyLimit: 5000,
        monthlyLimit: 50000,
        dailyUsed: 820,
        monthlyUsed: 12400,
      },
      {
        code: 'USD',
        flag: '🇺🇸',
        name: 'US Dollar',
        balance: 1280.4,
        onHold: 0,
        dailyLimit: 6000,
        monthlyLimit: 60000,
        dailyUsed: 300,
        monthlyUsed: 4500,
      },
      {
        code: 'EUR',
        flag: '🇪🇺',
        name: 'Euro',
        balance: 980.3,
        onHold: 50.0,
        dailyLimit: 5500,
        monthlyLimit: 55000,
        dailyUsed: 0,
        monthlyUsed: 1200,
      },
      {
        code: 'BDT',
        flag: '🇧🇩',
        name: 'Bangladeshi Taka',
        balance: 125450,
        onHold: 0,
        dailyLimit: 500000,
        monthlyLimit: 5000000,
        dailyUsed: 45000,
        monthlyUsed: 280000,
      },
    ],
  },
  {
    id: 'W-10002',
    customerId: 'C-10042',
    name: 'Nadia Islam',
    initials: 'NI',
    avatarColor: 'purple',
    email: 'nadia.islam@yahoo.com',
    status: 'Active',
    totalBalanceGBP: 850.2,
    lastActivity: '2026-06-16',
    wallets: [
      {
        code: 'GBP',
        flag: '🇬🇧',
        name: 'British Pound',
        balance: 850.2,
        onHold: 0,
        dailyLimit: 2000,
        monthlyLimit: 20000,
        dailyUsed: 200,
        monthlyUsed: 1800,
      },
      {
        code: 'INR',
        flag: '🇮🇳',
        name: 'Indian Rupee',
        balance: 45200,
        onHold: 1000,
        dailyLimit: 200000,
        monthlyLimit: 2000000,
        dailyUsed: 15000,
        monthlyUsed: 90000,
      },
    ],
  },
  {
    id: 'W-10003',
    customerId: 'C-10043',
    name: 'Karim Hossain',
    initials: 'KH',
    avatarColor: 'red',
    email: 'karim.hossain@hotmail.com',
    status: 'Frozen',
    totalBalanceGBP: 0,
    lastActivity: '2025-10-05',
    wallets: [
      {
        code: 'GBP',
        flag: '🇬🇧',
        name: 'British Pound',
        balance: 0,
        onHold: 0,
        dailyLimit: 0,
        monthlyLimit: 0,
        dailyUsed: 0,
        monthlyUsed: 0,
      },
    ],
  },
  {
    id: 'W-10004',
    customerId: 'C-10044',
    name: 'Farida Begum',
    initials: 'FB',
    avatarColor: 'green',
    email: 'farida.begum@gmail.com',
    status: 'Active',
    totalBalanceGBP: 9350.85,
    lastActivity: '2026-06-18',
    wallets: [
      {
        code: 'GBP',
        flag: '🇬🇧',
        name: 'British Pound',
        balance: 5120.6,
        onHold: 500,
        dailyLimit: 10000,
        monthlyLimit: 100000,
        dailyUsed: 2000,
        monthlyUsed: 35000,
      },
      {
        code: 'USD',
        flag: '🇺🇸',
        name: 'US Dollar',
        balance: 2800.0,
        onHold: 0,
        dailyLimit: 12000,
        monthlyLimit: 120000,
        dailyUsed: 800,
        monthlyUsed: 12000,
      },
      {
        code: 'PKR',
        flag: '🇵🇰',
        name: 'Pakistani Rupee',
        balance: 180000,
        onHold: 5000,
        dailyLimit: 800000,
        monthlyLimit: 8000000,
        dailyUsed: 50000,
        monthlyUsed: 420000,
      },
    ],
  },
  {
    id: 'W-10005',
    customerId: 'C-10045',
    name: 'Tariq Mahmud',
    initials: 'TM',
    avatarColor: 'amber',
    email: 'tariq.mahmud@gmail.com',
    status: 'Active',
    totalBalanceGBP: 2140.0,
    lastActivity: '2026-06-15',
    wallets: [
      {
        code: 'GBP',
        flag: '🇬🇧',
        name: 'British Pound',
        balance: 1200.0,
        onHold: 200,
        dailyLimit: 3000,
        monthlyLimit: 30000,
        dailyUsed: 500,
        monthlyUsed: 8000,
      },
      {
        code: 'USD',
        flag: '🇺🇸',
        name: 'US Dollar',
        balance: 940.0,
        onHold: 0,
        dailyLimit: 4000,
        monthlyLimit: 40000,
        dailyUsed: 940,
        monthlyUsed: 5500,
      },
    ],
  },
  {
    id: 'W-10006',
    customerId: 'C-10046',
    name: 'Sadia Rahman',
    initials: 'SR',
    avatarColor: 'teal',
    email: 'sadia.rahman@gmail.com',
    status: 'Active',
    totalBalanceGBP: 8130.25,
    lastActivity: '2026-06-18',
    wallets: [
      {
        code: 'GBP',
        flag: '🇬🇧',
        name: 'British Pound',
        balance: 4350.8,
        onHold: 0,
        dailyLimit: 8000,
        monthlyLimit: 80000,
        dailyUsed: 1200,
        monthlyUsed: 22000,
      },
      {
        code: 'EUR',
        flag: '🇪🇺',
        name: 'Euro',
        balance: 2800.0,
        onHold: 150,
        dailyLimit: 7000,
        monthlyLimit: 70000,
        dailyUsed: 0,
        monthlyUsed: 9000,
      },
      {
        code: 'PHP',
        flag: '🇵🇭',
        name: 'Philippine Peso',
        balance: 95000,
        onHold: 0,
        dailyLimit: 400000,
        monthlyLimit: 4000000,
        dailyUsed: 15000,
        monthlyUsed: 180000,
      },
    ],
  },
  {
    id: 'W-10007',
    customerId: 'C-10047',
    name: 'Imran Khan',
    initials: 'IK',
    avatarColor: 'pink',
    email: 'imran.khan@gmail.com',
    status: 'Active',
    totalBalanceGBP: 14200.0,
    lastActivity: '2026-06-17',
    wallets: [
      {
        code: 'GBP',
        flag: '🇬🇧',
        name: 'British Pound',
        balance: 8900.0,
        onHold: 1000,
        dailyLimit: 15000,
        monthlyLimit: 150000,
        dailyUsed: 3500,
        monthlyUsed: 62000,
      },
      {
        code: 'USD',
        flag: '🇺🇸',
        name: 'US Dollar',
        balance: 4200.0,
        onHold: 0,
        dailyLimit: 18000,
        monthlyLimit: 180000,
        dailyUsed: 1200,
        monthlyUsed: 28000,
      },
      {
        code: 'EUR',
        flag: '🇪🇺',
        name: 'Euro',
        balance: 2100.0,
        onHold: 200,
        dailyLimit: 12000,
        monthlyLimit: 120000,
        dailyUsed: 0,
        monthlyUsed: 15000,
      },
      {
        code: 'NGN',
        flag: '🇳🇬',
        name: 'Nigerian Naira',
        balance: 1850000,
        onHold: 0,
        dailyLimit: 5000000,
        monthlyLimit: 50000000,
        dailyUsed: 200000,
        monthlyUsed: 1200000,
      },
    ],
  },
  {
    id: 'W-10008',
    customerId: 'C-10048',
    name: 'Mitu Akter',
    initials: 'MA',
    avatarColor: 'indigo',
    email: 'mitu.akter@gmail.com',
    status: 'Suspended',
    totalBalanceGBP: 320.5,
    lastActivity: '2026-03-20',
    wallets: [
      {
        code: 'GBP',
        flag: '🇬🇧',
        name: 'British Pound',
        balance: 320.5,
        onHold: 320.5,
        dailyLimit: 0,
        monthlyLimit: 0,
        dailyUsed: 0,
        monthlyUsed: 0,
      },
    ],
  },
  {
    id: 'W-10009',
    customerId: 'C-10049',
    name: 'David Osei',
    initials: 'DO',
    avatarColor: 'rose',
    email: 'david.osei@gmail.com',
    status: 'Active',
    totalBalanceGBP: 6750.0,
    lastActivity: '2026-06-18',
    wallets: [
      {
        code: 'GBP',
        flag: '🇬🇧',
        name: 'British Pound',
        balance: 3200.0,
        onHold: 400,
        dailyLimit: 8000,
        monthlyLimit: 80000,
        dailyUsed: 1500,
        monthlyUsed: 28000,
      },
      {
        code: 'USD',
        flag: '🇺🇸',
        name: 'US Dollar',
        balance: 2100.0,
        onHold: 0,
        dailyLimit: 10000,
        monthlyLimit: 100000,
        dailyUsed: 600,
        monthlyUsed: 11000,
      },
      {
        code: 'NGN',
        flag: '🇳🇬',
        name: 'Nigerian Naira',
        balance: 1450000,
        onHold: 50000,
        dailyLimit: 3000000,
        monthlyLimit: 30000000,
        dailyUsed: 80000,
        monthlyUsed: 650000,
      },
      {
        code: 'NPR',
        flag: '🇳🇵',
        name: 'Nepali Rupee',
        balance: 85000,
        onHold: 0,
        dailyLimit: 300000,
        monthlyLimit: 3000000,
        dailyUsed: 12000,
        monthlyUsed: 95000,
      },
    ],
  },
];

// transaction details fake data

// ============ TRANSACTION TYPES ============
export type TransactionType =
  | 'Send Money'
  | 'Receive'
  | 'Top Up'
  | 'Withdraw'
  | 'Refund'
  | 'Exchange'
  | 'Fee';
export type TransactionStatus =
  | 'Completed'
  | 'Pending'
  | 'Failed'
  | 'Refunded'
  | 'Cancelled'
  | 'On Hold';

export interface TransactionHistory {
  id: string;
  customerId: string;
  customerName: string;
  customerInitials: string;
  customerAvatarColor: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  fee: number;
  feeCurrency: string;
  exchangeRate?: number;
  fromCurrency?: string;
  toCurrency?: string;
  recipient?: string;
  recipientCountry?: string;
  recipientFlag?: string;
  reference: string;
  channel: 'Web' | 'Mobile' | 'API' | 'Admin';
  note?: string;
  createdAt: string;
  completedAt?: string;
}

// ============ TRANSACTION STATS ============
export const transactionStats = {
  totalToday: 284,
  volumeToday: 142300,
  completedToday: 241,
  pendingNow: 28,
  failedToday: 9,
  refundedToday: 6,
  successRate: 94.7,
  avgAmount: 501.06,
};

// ============ TRANSACTION FAKE DATA ============
export const transactions: TransactionHistory[] = [
  {
    id: 'TXN-26061801',
    customerId: 'C-10041',
    customerName: 'Rahul Ahmed',
    customerInitials: 'RA',
    customerAvatarColor: 'blue',
    type: 'Send Money',
    status: 'Completed',
    amount: 520.0,
    currency: 'GBP',
    fee: 3.5,
    feeCurrency: 'GBP',
    recipient: 'Kamal Hossain',
    recipientCountry: 'Bangladesh',
    recipientFlag: '🇧🇩',
    reference: 'TXN-26061801',
    channel: 'Mobile',
    note: 'Family support',
    createdAt: '2026-06-18T10:22:00',
    completedAt: '2026-06-18T10:24:33',
  },
  {
    id: 'TXN-26061802',
    customerId: 'C-10044',
    customerName: 'Farida Begum',
    customerInitials: 'FB',
    customerAvatarColor: 'green',
    type: 'Send Money',
    status: 'Completed',
    amount: 1200.0,
    currency: 'GBP',
    fee: 5.0,
    feeCurrency: 'GBP',
    recipient: 'Ali Hassan',
    recipientCountry: 'Pakistan',
    recipientFlag: '🇵🇰',
    reference: 'TXN-26061802',
    channel: 'Web',
    createdAt: '2026-06-18T09:45:00',
    completedAt: '2026-06-18T09:47:12',
  },
  {
    id: 'TXN-26061803',
    customerId: 'C-10046',
    customerName: 'Sadia Rahman',
    customerInitials: 'SR',
    customerAvatarColor: 'teal',
    type: 'Top Up',
    status: 'Completed',
    amount: 1500.0,
    currency: 'GBP',
    fee: 0,
    feeCurrency: 'GBP',
    reference: 'TXN-26061803',
    channel: 'Mobile',
    createdAt: '2026-06-18T09:10:00',
    completedAt: '2026-06-18T09:10:45',
  },
  {
    id: 'TXN-26061804',
    customerId: 'C-10042',
    customerName: 'Nadia Islam',
    customerInitials: 'NI',
    customerAvatarColor: 'purple',
    type: 'Send Money',
    status: 'Pending',
    amount: 420.0,
    currency: 'GBP',
    fee: 3.0,
    feeCurrency: 'GBP',
    recipient: 'Priya Singh',
    recipientCountry: 'India',
    recipientFlag: '🇮🇳',
    reference: 'TXN-26061804',
    channel: 'Web',
    createdAt: '2026-06-18T08:55:00',
  },
  {
    id: 'TXN-26061805',
    customerId: 'C-10047',
    customerName: 'Imran Khan',
    customerInitials: 'IK',
    customerAvatarColor: 'pink',
    type: 'Exchange',
    status: 'Completed',
    amount: 2000.0,
    currency: 'GBP',
    fee: 8.0,
    feeCurrency: 'GBP',
    fromCurrency: 'GBP',
    toCurrency: 'USD',
    exchangeRate: 1.2701,
    reference: 'TXN-26061805',
    channel: 'Web',
    createdAt: '2026-06-18T08:30:00',
    completedAt: '2026-06-18T08:30:22',
  },
  {
    id: 'TXN-26061806',
    customerId: 'C-10045',
    customerName: 'Tariq Mahmud',
    customerInitials: 'TM',
    customerAvatarColor: 'amber',
    type: 'Withdraw',
    status: 'On Hold',
    amount: 800.0,
    currency: 'GBP',
    fee: 2.0,
    feeCurrency: 'GBP',
    reference: 'TXN-26061806',
    channel: 'Mobile',
    note: 'Manual review required — high value withdrawal',
    createdAt: '2026-06-18T08:15:00',
  },
  {
    id: 'TXN-26061807',
    customerId: 'C-10041',
    customerName: 'Rahul Ahmed',
    customerInitials: 'RA',
    customerAvatarColor: 'blue',
    type: 'Fee',
    status: 'Completed',
    amount: 3.5,
    currency: 'GBP',
    fee: 0,
    feeCurrency: 'GBP',
    reference: 'TXN-26061801-FEE',
    channel: 'API',
    note: 'Fee for TXN-26061801',
    createdAt: '2026-06-18T10:24:33',
    completedAt: '2026-06-18T10:24:33',
  },
  {
    id: 'TXN-26061808',
    customerId: 'C-10044',
    customerName: 'Farida Begum',
    customerInitials: 'FB',
    customerAvatarColor: 'green',
    type: 'Receive',
    status: 'Completed',
    amount: 950.0,
    currency: 'GBP',
    fee: 0,
    feeCurrency: 'GBP',
    recipient: 'From: UK Business Account',
    recipientCountry: 'United Kingdom',
    recipientFlag: '🇬🇧',
    reference: 'TXN-26061808',
    channel: 'API',
    createdAt: '2026-06-18T07:50:00',
    completedAt: '2026-06-18T07:52:10',
  },
  {
    id: 'TXN-26061809',
    customerId: 'C-10043',
    customerName: 'Karim Hossain',
    customerInitials: 'KH',
    customerAvatarColor: 'red',
    type: 'Send Money',
    status: 'Failed',
    amount: 350.0,
    currency: 'GBP',
    fee: 2.5,
    feeCurrency: 'GBP',
    recipient: 'Unknown',
    recipientCountry: 'Nigeria',
    recipientFlag: '🇳🇬',
    reference: 'TXN-26061809',
    channel: 'Web',
    note: 'Failed: KYC rejected — transaction blocked',
    createdAt: '2026-06-18T07:30:00',
  },
  {
    id: 'TXN-26061810',
    customerId: 'C-10046',
    customerName: 'Sadia Rahman',
    customerInitials: 'SR',
    customerAvatarColor: 'teal',
    type: 'Send Money',
    status: 'Completed',
    amount: 780.0,
    currency: 'GBP',
    fee: 3.5,
    feeCurrency: 'GBP',
    recipient: 'Marie Dupont',
    recipientCountry: 'France',
    recipientFlag: '🇫🇷',
    reference: 'TXN-26061810',
    channel: 'Mobile',
    createdAt: '2026-06-17T18:45:00',
    completedAt: '2026-06-17T18:47:30',
  },
  {
    id: 'TXN-26061811',
    customerId: 'C-10047',
    customerName: 'Imran Khan',
    customerInitials: 'IK',
    customerAvatarColor: 'pink',
    type: 'Refund',
    status: 'Refunded',
    amount: 620.0,
    currency: 'GBP',
    fee: 0,
    feeCurrency: 'GBP',
    reference: 'TXN-26061811',
    channel: 'Admin',
    note: 'Refund for failed transfer TXN-26060922',
    createdAt: '2026-06-17T17:20:00',
    completedAt: '2026-06-17T17:22:00',
  },
  {
    id: 'TXN-26061812',
    customerId: 'C-10042',
    customerName: 'Nadia Islam',
    customerInitials: 'NI',
    customerAvatarColor: 'purple',
    type: 'Top Up',
    status: 'Cancelled',
    amount: 200.0,
    currency: 'GBP',
    fee: 0,
    feeCurrency: 'GBP',
    reference: 'TXN-26061812',
    channel: 'Web',
    note: 'Cancelled by customer',
    createdAt: '2026-06-17T16:10:00',
  },
  {
    id: 'TXN-26061813',
    customerId: 'C-10049',
    customerName: 'David Osei',
    customerInitials: 'DO',
    customerAvatarColor: 'rose',
    type: 'Send Money',
    status: 'Completed',
    amount: 1500.0,
    currency: 'GBP',
    fee: 5.5,
    feeCurrency: 'GBP',
    recipient: 'Emeka Osei',
    recipientCountry: 'Nigeria',
    recipientFlag: '🇳🇬',
    reference: 'TXN-26061813',
    channel: 'Mobile',
    createdAt: '2026-06-17T15:30:00',
    completedAt: '2026-06-17T15:33:20',
  },
  {
    id: 'TXN-26061814',
    customerId: 'C-10041',
    customerName: 'Rahul Ahmed',
    customerInitials: 'RA',
    customerAvatarColor: 'blue',
    type: 'Withdraw',
    status: 'Completed',
    amount: 300.0,
    currency: 'GBP',
    fee: 1.5,
    feeCurrency: 'GBP',
    reference: 'TXN-26061814',
    channel: 'Web',
    createdAt: '2026-06-17T14:00:00',
    completedAt: '2026-06-17T14:02:45',
  },
  {
    id: 'TXN-26061815',
    customerId: 'C-10045',
    customerName: 'Tariq Mahmud',
    customerInitials: 'TM',
    customerAvatarColor: 'amber',
    type: 'Exchange',
    status: 'Pending',
    amount: 500.0,
    currency: 'USD',
    fee: 4.0,
    feeCurrency: 'USD',
    fromCurrency: 'USD',
    toCurrency: 'BDT',
    exchangeRate: 110.25,
    reference: 'TXN-26061815',
    channel: 'Mobile',
    createdAt: '2026-06-17T13:20:00',
  },
];

// transaction pending review fake data

// ============ PENDING TRANSACTIONS ============
export type PriorityLevel = 'Critical' | 'High' | 'Normal';
export type EscalationStatus = 'None' | 'Escalated' | 'Under Review';

export interface PendingTransaction {
  id: string;
  customerId: string;
  customerName: string;
  customerInitials: string;
  customerAvatarColor: string;
  amount: number;
  currency: string;
  fee: number;
  recipient: string;
  recipientCountry: string;
  recipientFlag: string;
  method: string;
  priority: PriorityLevel;
  escalation: EscalationStatus;
  submittedAt: string;
  estimatedCompletion: string;
  waitingMins: number;
  reason: string;
  channel: 'Web' | 'Mobile' | 'API' | 'Admin';
}

export const pendingStats = {
  totalPending: 213,
  criticalCount: 12,
  highCount: 45,
  normalCount: 156,
  avgWaitMins: 28,
  oldestMins: 142,
  totalVolume: 284500,
  escalatedCount: 8,
};

export const pendingTransactions: PendingTransaction[] = [
  {
    id: 'TXN-26061901',
    customerId: 'C-10047',
    customerName: 'Imran Khan',
    customerInitials: 'IK',
    customerAvatarColor: 'pink',
    amount: 4500.0,
    currency: 'GBP',
    fee: 12.0,
    recipient: 'Mohammed Al-Rashid',
    recipientCountry: 'Saudi Arabia',
    recipientFlag: '🇸🇦',
    method: 'Bank Transfer',
    priority: 'Critical',
    escalation: 'Escalated',
    submittedAt: '2026-06-18T06:15:00',
    estimatedCompletion: '2026-06-18T08:15:00',
    waitingMins: 142,
    reason: 'Large value — awaiting compliance review',
    channel: 'Web',
  },
  {
    id: 'TXN-26061902',
    customerId: 'C-10044',
    customerName: 'Farida Begum',
    customerInitials: 'FB',
    customerAvatarColor: 'green',
    amount: 2800.0,
    currency: 'GBP',
    fee: 8.5,
    recipient: 'Nasrin Akter',
    recipientCountry: 'Bangladesh',
    recipientFlag: '🇧🇩',
    method: 'bKash',
    priority: 'Critical',
    escalation: 'Under Review',
    submittedAt: '2026-06-18T07:00:00',
    estimatedCompletion: '2026-06-18T09:00:00',
    waitingMins: 97,
    reason: 'Duplicate transaction flag — manual check required',
    channel: 'Mobile',
  },
  {
    id: 'TXN-26061903',
    customerId: 'C-10041',
    customerName: 'Rahul Ahmed',
    customerInitials: 'RA',
    customerAvatarColor: 'blue',
    amount: 1200.0,
    currency: 'GBP',
    fee: 5.0,
    recipient: 'Sunita Sharma',
    recipientCountry: 'India',
    recipientFlag: '🇮🇳',
    method: 'Bank Transfer',
    priority: 'High',
    escalation: 'None',
    submittedAt: '2026-06-18T07:45:00',
    estimatedCompletion: '2026-06-18T09:45:00',
    waitingMins: 52,
    reason: 'KYC tier 2 — secondary approval needed',
    channel: 'Web',
  },
  {
    id: 'TXN-26061904',
    customerId: 'C-10049',
    customerName: 'David Osei',
    customerInitials: 'DO',
    customerAvatarColor: 'rose',
    amount: 950.0,
    currency: 'GBP',
    fee: 4.5,
    recipient: 'Grace Mensah',
    recipientCountry: 'Ghana',
    recipientFlag: '🇬🇭',
    method: 'Mobile Money',
    priority: 'High',
    escalation: 'None',
    submittedAt: '2026-06-18T08:10:00',
    estimatedCompletion: '2026-06-18T09:30:00',
    waitingMins: 37,
    reason: 'New corridor — first Ghana transfer',
    channel: 'Mobile',
  },
  {
    id: 'TXN-26061905',
    customerId: 'C-10042',
    customerName: 'Nadia Islam',
    customerInitials: 'NI',
    customerAvatarColor: 'purple',
    amount: 420.0,
    currency: 'GBP',
    fee: 3.0,
    recipient: 'Priya Singh',
    recipientCountry: 'India',
    recipientFlag: '🇮🇳',
    method: 'Bank Transfer',
    priority: 'Normal',
    escalation: 'None',
    submittedAt: '2026-06-18T08:30:00',
    estimatedCompletion: '2026-06-18T09:30:00',
    waitingMins: 27,
    reason: 'Awaiting bank confirmation',
    channel: 'Web',
  },
  {
    id: 'TXN-26061906',
    customerId: 'C-10046',
    customerName: 'Sadia Rahman',
    customerInitials: 'SR',
    customerAvatarColor: 'teal',
    amount: 680.0,
    currency: 'GBP',
    fee: 3.5,
    recipient: 'Marie Dupont',
    recipientCountry: 'France',
    recipientFlag: '🇫🇷',
    method: 'Bank Transfer',
    priority: 'Normal',
    escalation: 'None',
    submittedAt: '2026-06-18T08:45:00',
    estimatedCompletion: '2026-06-18T10:00:00',
    waitingMins: 12,
    reason: 'Standard processing queue',
    channel: 'Mobile',
  },
  {
    id: 'TXN-26061907',
    customerId: 'C-10045',
    customerName: 'Tariq Mahmud',
    customerInitials: 'TM',
    customerAvatarColor: 'amber',
    amount: 800.0,
    currency: 'GBP',
    fee: 2.0,
    recipient: 'Self — GBP Wallet',
    recipientCountry: 'United Kingdom',
    recipientFlag: '🇬🇧',
    method: 'Wallet Transfer',
    priority: 'High',
    escalation: 'Escalated',
    submittedAt: '2026-06-18T08:15:00',
    estimatedCompletion: '2026-06-18T09:15:00',
    waitingMins: 42,
    reason: 'On hold — suspicious activity flag',
    channel: 'Admin',
  },
  {
    id: 'TXN-26061908',
    customerId: 'C-10041',
    customerName: 'Rahul Ahmed',
    customerInitials: 'RA',
    customerAvatarColor: 'blue',
    amount: 320.0,
    currency: 'GBP',
    fee: 2.5,
    recipient: 'Kamal Hossain',
    recipientCountry: 'Bangladesh',
    recipientFlag: '🇧🇩',
    method: 'Nagad',
    priority: 'Normal',
    escalation: 'None',
    submittedAt: '2026-06-18T08:50:00',
    estimatedCompletion: '2026-06-18T09:20:00',
    waitingMins: 7,
    reason: 'Awaiting Nagad API confirmation',
    channel: 'Mobile',
  },
];

// transaction compliance review fake data

// ============ COMPLETED TRANSACTIONS ============
export interface CompletedTransaction {
  id: string;
  customerId: string;
  customerName: string;
  customerInitials: string;
  customerAvatarColor: string;
  amount: number;
  currency: string;
  fee: number;
  recipient: string;
  recipientCountry: string;
  recipientFlag: string;
  method: string;
  channel: 'Web' | 'Mobile' | 'API' | 'Admin';
  completedAt: string;
  processingMins: number;
  receiptId: string;
}

export const completedStats = {
  totalCompleted: 241,
  totalVolume: 284500,
  avgProcessingMins: 4,
  successRate: 94.7,
  topCorridor: 'UK → Bangladesh',
  totalFees: 1240.5,
};

export const completedTransactions: CompletedTransaction[] = [
  {
    id: 'TXN-26061801',
    customerId: 'C-10041',
    customerName: 'Rahul Ahmed',
    customerInitials: 'RA',
    customerAvatarColor: 'blue',
    amount: 520.0,
    currency: 'GBP',
    fee: 3.5,
    recipient: 'Kamal Hossain',
    recipientCountry: 'Bangladesh',
    recipientFlag: '🇧🇩',
    method: 'bKash',
    channel: 'Mobile',
    completedAt: '2026-06-18T10:24:33',
    processingMins: 2,
    receiptId: 'RCP-26061801',
  },
  {
    id: 'TXN-26061802',
    customerId: 'C-10044',
    customerName: 'Farida Begum',
    customerInitials: 'FB',
    customerAvatarColor: 'green',
    amount: 1200.0,
    currency: 'GBP',
    fee: 5.0,
    recipient: 'Ali Hassan',
    recipientCountry: 'Pakistan',
    recipientFlag: '🇵🇰',
    method: 'Bank Transfer',
    channel: 'Web',
    completedAt: '2026-06-18T09:47:12',
    processingMins: 2,
    receiptId: 'RCP-26061802',
  },
  {
    id: 'TXN-26061803',
    customerId: 'C-10046',
    customerName: 'Sadia Rahman',
    customerInitials: 'SR',
    customerAvatarColor: 'teal',
    amount: 1500.0,
    currency: 'GBP',
    fee: 0,
    recipient: 'GBP Wallet',
    recipientCountry: 'United Kingdom',
    recipientFlag: '🇬🇧',
    method: 'Wallet Top Up',
    channel: 'Mobile',
    completedAt: '2026-06-18T09:10:45',
    processingMins: 1,
    receiptId: 'RCP-26061803',
  },
  {
    id: 'TXN-26061805',
    customerId: 'C-10047',
    customerName: 'Imran Khan',
    customerInitials: 'IK',
    customerAvatarColor: 'pink',
    amount: 2000.0,
    currency: 'GBP',
    fee: 8.0,
    recipient: 'USD Wallet',
    recipientCountry: 'United Kingdom',
    recipientFlag: '🇬🇧',
    method: 'Exchange',
    channel: 'Web',
    completedAt: '2026-06-18T08:30:22',
    processingMins: 1,
    receiptId: 'RCP-26061805',
  },
  {
    id: 'TXN-26061808',
    customerId: 'C-10044',
    customerName: 'Farida Begum',
    customerInitials: 'FB',
    customerAvatarColor: 'green',
    amount: 950.0,
    currency: 'GBP',
    fee: 0,
    recipient: 'From: UK Business Account',
    recipientCountry: 'United Kingdom',
    recipientFlag: '🇬🇧',
    method: 'Bank Transfer',
    channel: 'API',
    completedAt: '2026-06-18T07:52:10',
    processingMins: 2,
    receiptId: 'RCP-26061808',
  },
  {
    id: 'TXN-26061810',
    customerId: 'C-10046',
    customerName: 'Sadia Rahman',
    customerInitials: 'SR',
    customerAvatarColor: 'teal',
    amount: 780.0,
    currency: 'GBP',
    fee: 3.5,
    recipient: 'Marie Dupont',
    recipientCountry: 'France',
    recipientFlag: '🇫🇷',
    method: 'Bank Transfer',
    channel: 'Mobile',
    completedAt: '2026-06-17T18:47:30',
    processingMins: 3,
    receiptId: 'RCP-26061810',
  },
  {
    id: 'TXN-26061813',
    customerId: 'C-10049',
    customerName: 'David Osei',
    customerInitials: 'DO',
    customerAvatarColor: 'rose',
    amount: 1500.0,
    currency: 'GBP',
    fee: 5.5,
    recipient: 'Emeka Osei',
    recipientCountry: 'Nigeria',
    recipientFlag: '🇳🇬',
    method: 'Mobile Money',
    channel: 'Mobile',
    completedAt: '2026-06-17T15:33:20',
    processingMins: 3,
    receiptId: 'RCP-26061813',
  },
  {
    id: 'TXN-26061814',
    customerId: 'C-10041',
    customerName: 'Rahul Ahmed',
    customerInitials: 'RA',
    customerAvatarColor: 'blue',
    amount: 300.0,
    currency: 'GBP',
    fee: 1.5,
    recipient: 'Bank Withdrawal',
    recipientCountry: 'United Kingdom',
    recipientFlag: '🇬🇧',
    method: 'Bank Transfer',
    channel: 'Web',
    completedAt: '2026-06-17T14:02:45',
    processingMins: 3,
    receiptId: 'RCP-26061814',
  },
  {
    id: 'TXN-26061816',
    customerId: 'C-10045',
    customerName: 'Tariq Mahmud',
    customerInitials: 'TM',
    customerAvatarColor: 'amber',
    amount: 450.0,
    currency: 'GBP',
    fee: 2.5,
    recipient: 'Ayesha Tariq',
    recipientCountry: 'Pakistan',
    recipientFlag: '🇵🇰',
    method: 'Bank Transfer',
    channel: 'Web',
    completedAt: '2026-06-17T12:15:00',
    processingMins: 4,
    receiptId: 'RCP-26061816',
  },
  {
    id: 'TXN-26061817',
    customerId: 'C-10042',
    customerName: 'Nadia Islam',
    customerInitials: 'NI',
    customerAvatarColor: 'purple',
    amount: 200.0,
    currency: 'GBP',
    fee: 0,
    recipient: 'GBP Wallet',
    recipientCountry: 'United Kingdom',
    recipientFlag: '🇬🇧',
    method: 'Wallet Top Up',
    channel: 'Mobile',
    completedAt: '2026-06-17T11:05:00',
    processingMins: 1,
    receiptId: 'RCP-26061817',
  },
];

// transaction failed review fake data

// ============ FAILED TRANSACTIONS ============
export type FailureReason =
  | 'Insufficient Funds'
  | 'KYC Rejected'
  | 'Bank Declined'
  | 'Fraud Detected'
  | 'Invalid Account'
  | 'Limit Exceeded'
  | 'Network Error'
  | 'Compliance Block';

export interface FailedTransaction {
  id: string;
  customerId: string;
  customerName: string;
  customerInitials: string;
  customerAvatarColor: string;
  customerEmail: string;
  amount: number;
  currency: string;
  fee: number;
  recipient: string;
  recipientCountry: string;
  recipientFlag: string;
  method: string;
  channel: 'Web' | 'Mobile' | 'API' | 'Admin';
  failedAt: string;
  failureReason: FailureReason;
  failureDetail: string;
  retryCount: number;
  canRetry: boolean;
  notified: boolean;
}

export const failedStats = {
  totalFailed: 98,
  failedToday: 9,
  rejectRate: 7.6,
  retrySuccess: 34,
  topReason: 'Bank Declined',
  totalLostVolume: 48200,
  notNotified: 12,
};

export const failedTransactions: FailedTransaction[] = [
  {
    id: 'TXN-26061809',
    customerId: 'C-10043',
    customerName: 'Karim Hossain',
    customerInitials: 'KH',
    customerAvatarColor: 'red',
    customerEmail: 'karim.hossain@hotmail.com',
    amount: 350.0,
    currency: 'GBP',
    fee: 2.5,
    recipient: 'Unknown',
    recipientCountry: 'Nigeria',
    recipientFlag: '🇳🇬',
    method: 'Bank Transfer',
    channel: 'Web',
    failedAt: '2026-06-18T07:30:00',
    failureReason: 'KYC Rejected',
    failureDetail:
      'Customer KYC status is Rejected. Transaction blocked by compliance engine.',
    retryCount: 0,
    canRetry: false,
    notified: true,
  },
  {
    id: 'TXN-26061820',
    customerId: 'C-10045',
    customerName: 'Tariq Mahmud',
    customerInitials: 'TM',
    customerAvatarColor: 'amber',
    customerEmail: 'tariq.mahmud@gmail.com',
    amount: 1800.0,
    currency: 'GBP',
    fee: 6.0,
    recipient: 'Mehmet Yilmaz',
    recipientCountry: 'Turkey',
    recipientFlag: '🇹🇷',
    method: 'Bank Transfer',
    channel: 'Web',
    failedAt: '2026-06-18T06:45:00',
    failureReason: 'Limit Exceeded',
    failureDetail:
      'Daily transfer limit of £1,500 exceeded. Customer must upgrade KYC tier.',
    retryCount: 1,
    canRetry: true,
    notified: true,
  },
  {
    id: 'TXN-26061821',
    customerId: 'C-10042',
    customerName: 'Nadia Islam',
    customerInitials: 'NI',
    customerAvatarColor: 'purple',
    customerEmail: 'nadia.islam@yahoo.com',
    amount: 550.0,
    currency: 'GBP',
    fee: 3.0,
    recipient: 'Anjali Patel',
    recipientCountry: 'India',
    recipientFlag: '🇮🇳',
    method: 'Bank Transfer',
    channel: 'Mobile',
    failedAt: '2026-06-18T05:55:00',
    failureReason: 'Insufficient Funds',
    failureDetail:
      'Available GBP wallet balance £420.00 is less than required £553.00 (amount + fee).',
    retryCount: 2,
    canRetry: true,
    notified: false,
  },
  {
    id: 'TXN-26061822',
    customerId: 'C-10047',
    customerName: 'Imran Khan',
    customerInitials: 'IK',
    customerAvatarColor: 'pink',
    customerEmail: 'imran.khan@gmail.com',
    amount: 3200.0,
    currency: 'GBP',
    fee: 9.5,
    recipient: 'Ahmed Al-Farsi',
    recipientCountry: 'UAE',
    recipientFlag: '🇦🇪',
    method: 'Bank Transfer',
    channel: 'API',
    failedAt: '2026-06-17T22:10:00',
    failureReason: 'Fraud Detected',
    failureDetail:
      'Transaction flagged by fraud detection engine. Unusual pattern: 3rd high-value transfer in 6 hours.',
    retryCount: 0,
    canRetry: false,
    notified: true,
  },
  {
    id: 'TXN-26061823',
    customerId: 'C-10049',
    customerName: 'David Osei',
    customerInitials: 'DO',
    customerAvatarColor: 'rose',
    customerEmail: 'david.osei@gmail.com',
    amount: 420.0,
    currency: 'GBP',
    fee: 3.0,
    recipient: 'Kwame Mensah',
    recipientCountry: 'Ghana',
    recipientFlag: '🇬🇭',
    method: 'Mobile Money',
    channel: 'Mobile',
    failedAt: '2026-06-17T20:30:00',
    failureReason: 'Network Error',
    failureDetail:
      'Mobile Money provider API timeout. Transaction could not be confirmed within 30s window.',
    retryCount: 1,
    canRetry: true,
    notified: false,
  },
  {
    id: 'TXN-26061824',
    customerId: 'C-10041',
    customerName: 'Rahul Ahmed',
    customerInitials: 'RA',
    customerAvatarColor: 'blue',
    customerEmail: 'rahul.ahmed@gmail.com',
    amount: 780.0,
    currency: 'GBP',
    fee: 4.0,
    recipient: 'Ravi Kumar',
    recipientCountry: 'India',
    recipientFlag: '🇮🇳',
    method: 'Bank Transfer',
    channel: 'Web',
    failedAt: '2026-06-17T18:00:00',
    failureReason: 'Bank Declined',
    failureDetail:
      'Recipient bank HDFC returned error code 05 — Do not honour. Customer should verify account details.',
    retryCount: 1,
    canRetry: true,
    notified: true,
  },
  {
    id: 'TXN-26061825',
    customerId: 'C-10046',
    customerName: 'Sadia Rahman',
    customerInitials: 'SR',
    customerAvatarColor: 'teal',
    customerEmail: 'sadia.rahman@gmail.com',
    amount: 290.0,
    currency: 'GBP',
    fee: 2.0,
    recipient: 'Pierre Martin',
    recipientCountry: 'France',
    recipientFlag: '🇫🇷',
    method: 'Bank Transfer',
    channel: 'Mobile',
    failedAt: '2026-06-17T15:20:00',
    failureReason: 'Invalid Account',
    failureDetail:
      'IBAN FR7630006000011234567890189 returned as invalid by recipient bank.',
    retryCount: 0,
    canRetry: true,
    notified: false,
  },
  {
    id: 'TXN-26061826',
    customerId: 'C-10044',
    customerName: 'Farida Begum',
    customerInitials: 'FB',
    customerAvatarColor: 'green',
    customerEmail: 'farida.begum@gmail.com',
    amount: 2100.0,
    currency: 'GBP',
    fee: 7.0,
    recipient: 'Hassan Al-Maktoum',
    recipientCountry: 'UAE',
    recipientFlag: '🇦🇪',
    method: 'Bank Transfer',
    channel: 'Web',
    failedAt: '2026-06-17T12:45:00',
    failureReason: 'Compliance Block',
    failureDetail:
      'Destination account flagged in OFAC sanctions list. Transfer permanently blocked.',
    retryCount: 0,
    canRetry: false,
    notified: true,
  },
];

// ============ TRANSACTION DETAILS ============
export interface AuditLogEntry {
  action: string;
  performedBy: string;
  role: 'System' | 'Admin' | 'Customer' | 'API';
  timestamp: string;
  note?: string;
}

export interface TimelineStep {
  label: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'active' | 'pending' | 'failed';
}

export interface TransactionDetail {
  id: string;
  status:
    | 'Completed'
    | 'Pending'
    | 'Failed'
    | 'Refunded'
    | 'Cancelled'
    | 'On Hold';
  type:
    | 'Send Money'
    | 'Receive'
    | 'Top Up'
    | 'Withdraw'
    | 'Refund'
    | 'Exchange'
    | 'Fee';
  amount: number;
  currency: string;
  fee: number;
  exchangeRate?: number;
  fromCurrency?: string;
  toCurrency?: string;
  convertedAmount?: number;
  totalCharged: number;
  reference: string;
  channel: 'Web' | 'Mobile' | 'API' | 'Admin';
  ipAddress: string;
  deviceInfo: string;
  customerId: string;
  customerName: string;
  customerInitials: string;
  customerAvatarColor: string;
  customerEmail: string;
  customerPhone: string;
  customerKyc: string;
  recipientName: string;
  recipientFlag: string;
  recipientCountry: string;
  recipientBank?: string;
  recipientAccount?: string;
  recipientPhone?: string;
  timeline: TimelineStep[];
  auditLog: AuditLogEntry[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  note?: string;
}

export const transactionDetails: TransactionDetail[] = [
  {
    id: 'TXN-26061801',
    status: 'Completed',
    type: 'Send Money',
    amount: 520.0,
    currency: 'GBP',
    fee: 3.5,
    totalCharged: 523.5,
    reference: 'TXN-26061801',
    channel: 'Mobile',
    ipAddress: '82.14.201.55',
    deviceInfo: 'iPhone 15 Pro · iOS 17.4 · TheSendMoney App v2.1',
    customerId: 'C-10041',
    customerName: 'Rahul Ahmed',
    customerInitials: 'RA',
    customerAvatarColor: 'blue',
    customerEmail: 'rahul.ahmed@gmail.com',
    customerPhone: '+880 1711-234567',
    customerKyc: 'Tier 2 — Approved',
    recipientName: 'Kamal Hossain',
    recipientFlag: '🇧🇩',
    recipientCountry: 'Bangladesh',
    recipientBank: 'Dutch-Bangla Bank Ltd',
    recipientAccount: '•••• •••• 4821',
    recipientPhone: '+880 1812-345678',
    timeline: [
      {
        label: 'Transaction Initiated',
        description: 'Customer submitted transfer via mobile app',
        timestamp: '2026-06-18T10:22:00',
        status: 'completed',
      },
      {
        label: 'KYC & Compliance Check',
        description: 'Identity verified — Tier 2 KYC passed',
        timestamp: '2026-06-18T10:22:08',
        status: 'completed',
      },
      {
        label: 'Payment Processing',
        description: 'Deducted £523.50 from GBP wallet',
        timestamp: '2026-06-18T10:22:15',
        status: 'completed',
      },
      {
        label: 'Bank Transfer Initiated',
        description: 'Sent to Dutch-Bangla Bank via SWIFT',
        timestamp: '2026-06-18T10:22:45',
        status: 'completed',
      },
      {
        label: 'Recipient Notified',
        description: 'SMS and email sent to recipient',
        timestamp: '2026-06-18T10:23:10',
        status: 'completed',
      },
      {
        label: 'Transaction Completed',
        description: 'Funds confirmed received by recipient bank',
        timestamp: '2026-06-18T10:24:33',
        status: 'completed',
      },
    ],
    auditLog: [
      {
        action: 'Transaction created',
        performedBy: 'Rahul Ahmed',
        role: 'Customer',
        timestamp: '2026-06-18T10:22:00',
      },
      {
        action: 'KYC check passed',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-18T10:22:08',
        note: 'Onfido API — identity match confirmed',
      },
      {
        action: 'Funds debited from wallet',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-18T10:22:15',
      },
      {
        action: 'SWIFT transfer initiated',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-18T10:22:45',
        note: 'SWIFT code: DBBLBDDH',
      },
      {
        action: 'Recipient SMS sent',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-18T10:23:10',
      },
      {
        action: 'Transaction marked complete',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-18T10:24:33',
      },
    ],
    createdAt: '2026-06-18T10:22:00',
    updatedAt: '2026-06-18T10:24:33',
    completedAt: '2026-06-18T10:24:33',
    note: 'Family support — monthly remittance',
  },
  {
    id: 'TXN-26061822',
    status: 'Failed',
    type: 'Send Money',
    amount: 3200.0,
    currency: 'GBP',
    fee: 9.5,
    totalCharged: 0,
    reference: 'TXN-26061822',
    channel: 'API',
    ipAddress: '194.55.12.88',
    deviceInfo: 'API Client · TheSendMoney API v3',
    customerId: 'C-10047',
    customerName: 'Imran Khan',
    customerInitials: 'IK',
    customerAvatarColor: 'pink',
    customerEmail: 'imran.khan@gmail.com',
    customerPhone: '+44 7900-112233',
    customerKyc: 'Tier 3 — Approved',
    recipientName: 'Ahmed Al-Farsi',
    recipientFlag: '🇦🇪',
    recipientCountry: 'UAE',
    recipientBank: 'Emirates NBD',
    recipientAccount: '•••• •••• 9902',
    timeline: [
      {
        label: 'Transaction Initiated',
        description: 'API request received',
        timestamp: '2026-06-17T22:10:00',
        status: 'completed',
      },
      {
        label: 'KYC Check',
        description: 'Tier 3 KYC passed',
        timestamp: '2026-06-17T22:10:04',
        status: 'completed',
      },
      {
        label: 'Fraud Detection',
        description: 'Flagged — unusual high-value pattern detected',
        timestamp: '2026-06-17T22:10:09',
        status: 'failed',
      },
      {
        label: 'Transaction Blocked',
        description: 'Blocked by fraud engine — funds not debited',
        timestamp: '2026-06-17T22:10:10',
        status: 'failed',
      },
      {
        label: 'Customer Notified',
        description: 'Email alert sent to customer',
        timestamp: '2026-06-17T22:10:30',
        status: 'completed',
      },
    ],
    auditLog: [
      {
        action: 'API transaction received',
        performedBy: 'API Client',
        role: 'API',
        timestamp: '2026-06-17T22:10:00',
      },
      {
        action: 'KYC check passed',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-17T22:10:04',
      },
      {
        action: 'Fraud flag triggered',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-17T22:10:09',
        note: 'Rule: 3+ high-value transfers in 6h',
      },
      {
        action: 'Transaction blocked',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-17T22:10:10',
      },
      {
        action: 'Admin alerted',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-17T22:10:15',
        note: 'Fraud team notified via Slack',
      },
      {
        action: 'Case reviewed',
        performedBy: 'Sarah Johnson',
        role: 'Admin',
        timestamp: '2026-06-17T22:45:00',
        note: 'Confirmed fraud block — no further action',
      },
    ],
    createdAt: '2026-06-17T22:10:00',
    updatedAt: '2026-06-17T22:45:00',
    note: 'Blocked by fraud detection. Admin reviewed and confirmed.',
  },
  {
    id: 'TXN-26061805',
    status: 'Completed',
    type: 'Exchange',
    amount: 2000.0,
    currency: 'GBP',
    fee: 8.0,
    exchangeRate: 1.2701,
    fromCurrency: 'GBP',
    toCurrency: 'USD',
    convertedAmount: 2540.2,
    totalCharged: 2008.0,
    reference: 'TXN-26061805',
    channel: 'Web',
    ipAddress: '88.201.44.12',
    deviceInfo: 'Chrome 124 · Windows 11 · Desktop',
    customerId: 'C-10047',
    customerName: 'Imran Khan',
    customerInitials: 'IK',
    customerAvatarColor: 'pink',
    customerEmail: 'imran.khan@gmail.com',
    customerPhone: '+44 7900-112233',
    customerKyc: 'Tier 3 — Approved',
    recipientName: 'USD Wallet (Self)',
    recipientFlag: '🇺🇸',
    recipientCountry: 'Internal',
    timeline: [
      {
        label: 'Exchange Initiated',
        description: 'Customer requested GBP → USD exchange',
        timestamp: '2026-06-18T08:30:00',
        status: 'completed',
      },
      {
        label: 'Rate Locked',
        description: 'Rate 1 GBP = 1.2701 USD locked for 30s',
        timestamp: '2026-06-18T08:30:02',
        status: 'completed',
      },
      {
        label: 'GBP Debited',
        description: '£2,008.00 deducted from GBP wallet',
        timestamp: '2026-06-18T08:30:10',
        status: 'completed',
      },
      {
        label: 'USD Credited',
        description: '$2,540.20 added to USD wallet',
        timestamp: '2026-06-18T08:30:22',
        status: 'completed',
      },
    ],
    auditLog: [
      {
        action: 'Exchange request created',
        performedBy: 'Imran Khan',
        role: 'Customer',
        timestamp: '2026-06-18T08:30:00',
      },
      {
        action: 'Exchange rate locked',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-18T08:30:02',
        note: 'Rate source: Wise FX feed',
      },
      {
        action: 'GBP wallet debited',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-18T08:30:10',
      },
      {
        action: 'USD wallet credited',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-18T08:30:22',
      },
      {
        action: 'Exchange completed',
        performedBy: 'System',
        role: 'System',
        timestamp: '2026-06-18T08:30:22',
      },
    ],
    createdAt: '2026-06-18T08:30:00',
    updatedAt: '2026-06-18T08:30:22',
    completedAt: '2026-06-18T08:30:22',
  },
];

// transaction refund review fake data

// ============ REFUND REQUESTS ============
export type RefundStatus =
  | 'Pending'
  | 'Approved'
  | 'Rejected'
  | 'Processed'
  | 'Partial';
export type RefundReason =
  | 'Transaction Error'
  | 'Duplicate Payment'
  | 'Service Not Received'
  | 'Unauthorized Transaction'
  | 'Wrong Amount'
  | 'Customer Request';

export interface RefundRequest {
  id: string;
  originalTxId: string;
  customerId: string;
  customerName: string;
  customerInitials: string;
  customerAvatarColor: string;
  customerEmail: string;
  originalAmount: number;
  requestedRefund: number;
  approvedRefund: number | null;
  currency: string;
  reason: RefundReason;
  reasonDetail: string;
  status: RefundStatus;
  requestedAt: string;
  processedAt: string | null;
  adminNote: string;
  channel: 'Web' | 'Mobile' | 'API' | 'Admin';
}

export const refundStats = {
  totalRequests: 47,
  pendingRequests: 18,
  approvedToday: 6,
  rejectedToday: 3,
  totalRefundedAmount: 12480.5,
  avgProcessingHours: 4.2,
  approvalRate: 68.5,
};

export const refundRequests: RefundRequest[] = [
  {
    id: 'REF-26061801',
    originalTxId: 'TXN-26061805',
    customerId: 'C-10047',
    customerName: 'Imran Khan',
    customerInitials: 'IK',
    customerAvatarColor: 'pink',
    customerEmail: 'imran.khan@gmail.com',
    originalAmount: 2000.0,
    requestedRefund: 2000.0,
    approvedRefund: null,
    currency: 'GBP',
    reason: 'Transaction Error',
    reasonDetail:
      'Exchange rate applied was incorrect. Customer was charged £2,000 but should have been £1,850.',
    status: 'Pending',
    requestedAt: '2026-06-18T09:00:00',
    processedAt: null,
    adminNote: '',
    channel: 'Web',
  },
  {
    id: 'REF-26061802',
    originalTxId: 'TXN-26061810',
    customerId: 'C-10046',
    customerName: 'Sadia Rahman',
    customerInitials: 'SR',
    customerAvatarColor: 'teal',
    customerEmail: 'sadia.rahman@gmail.com',
    originalAmount: 780.0,
    requestedRefund: 780.0,
    approvedRefund: null,
    currency: 'GBP',
    reason: 'Service Not Received',
    reasonDetail:
      'Transfer to France was initiated but recipient confirms no funds received after 48 hours.',
    status: 'Pending',
    requestedAt: '2026-06-18T08:30:00',
    processedAt: null,
    adminNote: '',
    channel: 'Mobile',
  },
  {
    id: 'REF-26061803',
    originalTxId: 'TXN-26061802',
    customerId: 'C-10044',
    customerName: 'Farida Begum',
    customerInitials: 'FB',
    customerAvatarColor: 'green',
    customerEmail: 'farida.begum@gmail.com',
    originalAmount: 1200.0,
    requestedRefund: 1200.0,
    approvedRefund: 1200.0,
    currency: 'GBP',
    reason: 'Duplicate Payment',
    reasonDetail:
      'Customer accidentally submitted the same transaction twice within 2 minutes.',
    status: 'Approved',
    requestedAt: '2026-06-17T14:00:00',
    processedAt: '2026-06-17T16:30:00',
    adminNote: 'Verified duplicate — full refund approved.',
    channel: 'Web',
  },
  {
    id: 'REF-26061804',
    originalTxId: 'TXN-26061801',
    customerId: 'C-10041',
    customerName: 'Rahul Ahmed',
    customerInitials: 'RA',
    customerAvatarColor: 'blue',
    customerEmail: 'rahul.ahmed@gmail.com',
    originalAmount: 520.0,
    requestedRefund: 520.0,
    approvedRefund: 520.0,
    currency: 'GBP',
    reason: 'Unauthorized Transaction',
    reasonDetail:
      'Customer reports transaction was made without their consent. Possible account compromise.',
    status: 'Processed',
    requestedAt: '2026-06-17T10:00:00',
    processedAt: '2026-06-17T14:00:00',
    adminNote:
      'Security team verified — full refund processed. Account security review initiated.',
    channel: 'Web',
  },
  {
    id: 'REF-26061805',
    originalTxId: 'TXN-26061813',
    customerId: 'C-10049',
    customerName: 'David Osei',
    customerInitials: 'DO',
    customerAvatarColor: 'rose',
    customerEmail: 'david.osei@gmail.com',
    originalAmount: 1500.0,
    requestedRefund: 750.0,
    approvedRefund: 750.0,
    currency: 'GBP',
    reason: 'Wrong Amount',
    reasonDetail:
      'Customer intended to send £750 but accidentally entered £1,500.',
    status: 'Partial',
    requestedAt: '2026-06-17T16:00:00',
    processedAt: '2026-06-17T18:00:00',
    adminNote:
      'Partial refund of £750 approved — recipient confirmed receiving £750 excess.',
    channel: 'Mobile',
  },
  {
    id: 'REF-26061806',
    originalTxId: 'TXN-26061814',
    customerId: 'C-10041',
    customerName: 'Rahul Ahmed',
    customerInitials: 'RA',
    customerAvatarColor: 'blue',
    customerEmail: 'rahul.ahmed@gmail.com',
    originalAmount: 300.0,
    requestedRefund: 300.0,
    approvedRefund: null,
    currency: 'GBP',
    reason: 'Customer Request',
    reasonDetail: 'Customer changed mind and wants to cancel the withdrawal.',
    status: 'Rejected',
    requestedAt: '2026-06-17T15:00:00',
    processedAt: '2026-06-17T15:45:00',
    adminNote:
      'Transaction already processed and funds disbursed. Refund not possible at this stage.',
    channel: 'Mobile',
  },
  {
    id: 'REF-26061807',
    originalTxId: 'TXN-26061816',
    customerId: 'C-10045',
    customerName: 'Tariq Mahmud',
    customerInitials: 'TM',
    customerAvatarColor: 'amber',
    customerEmail: 'tariq.mahmud@gmail.com',
    originalAmount: 450.0,
    requestedRefund: 450.0,
    approvedRefund: null,
    currency: 'GBP',
    reason: 'Service Not Received',
    reasonDetail:
      'Recipient in Pakistan has not received the funds despite transaction showing completed.',
    status: 'Pending',
    requestedAt: '2026-06-18T07:00:00',
    processedAt: null,
    adminNote: '',
    channel: 'Web',
  },
  {
    id: 'REF-26061808',
    originalTxId: 'TXN-26061817',
    customerId: 'C-10042',
    customerName: 'Nadia Islam',
    customerInitials: 'NI',
    customerAvatarColor: 'purple',
    customerEmail: 'nadia.islam@yahoo.com',
    originalAmount: 200.0,
    requestedRefund: 200.0,
    approvedRefund: null,
    currency: 'GBP',
    reason: 'Customer Request',
    reasonDetail:
      'Customer requests refund of top-up amount as they no longer need the service.',
    status: 'Pending',
    requestedAt: '2026-06-18T06:30:00',
    processedAt: null,
    adminNote: '',
    channel: 'Mobile',
  },
];

// wallet fake data end

// ============ COMPANY WALLET ============
export type WalletAccountType =
  | 'Operating'
  | 'Settlement'
  | 'Reserve'
  | 'Float';
export type DepositSource =
  | 'Bank Transfer'
  | 'SWIFT'
  | 'SEPA'
  | 'Faster Payments'
  | 'CHAPS';
export type WithdrawalType =
  | 'Internal Transfer'
  | 'Settlement Payout'
  | 'Partner Payment'
  | 'Fee Withdrawal';
export type CorridorStatus = 'Healthy' | 'Low' | 'Critical';

export interface CompanyWalletAccount {
  id: string;
  name: string;
  type: WalletAccountType;
  currency: string;
  flag: string;
  bankName: string;
  accountNumber: string;
  balance: number;
  reserved: number;
  available: number;
  minThreshold: number;
  maxCapacity: number;
  lastUpdated: string;
  status: CorridorStatus;
}

export interface CorridorBalance {
  id: string;
  from: string;
  fromFlag: string;
  to: string;
  toFlag: string;
  currency: string;
  balance: number;
  dailyVolume: number;
  utilizationPct: number;
  status: CorridorStatus;
}

export interface CompanyDeposit {
  id: string;
  accountId: string;
  accountName: string;
  currency: string;
  amount: number;
  source: DepositSource;
  senderBank: string;
  senderRef: string;
  receivedAt: string;
  confirmedAt: string | null;
  status: 'Confirmed' | 'Pending' | 'Failed';
  note: string;
}

export interface CompanyWithdrawal {
  id: string;
  accountId: string;
  accountName: string;
  currency: string;
  amount: number;
  type: WithdrawalType;
  destinationBank: string;
  destinationAccount: string;
  corridor?: string;
  initiatedBy: string;
  initiatedAt: string;
  processedAt: string | null;
  status: 'Completed' | 'Pending' | 'Failed' | 'Cancelled';
  note: string;
}

// ── Company Wallet Accounts ──
export const companyWalletAccounts: CompanyWalletAccount[] = [
  {
    id: 'CWA-001',
    name: 'GBP Operating Account',
    type: 'Operating',
    currency: 'GBP',
    flag: '🇬🇧',
    bankName: 'Barclays Bank',
    accountNumber: 'GB29 BARC 2013 1234',
    balance: 485000,
    reserved: 120000,
    available: 365000,
    minThreshold: 100000,
    maxCapacity: 1000000,
    lastUpdated: '2026-06-18T10:30:00',
    status: 'Healthy',
  },
  {
    id: 'CWA-002',
    name: 'USD Settlement Account',
    type: 'Settlement',
    currency: 'USD',
    flag: '🇺🇸',
    bankName: 'JP Morgan Chase',
    accountNumber: 'US12 CHAS 0021 5678',
    balance: 320000,
    reserved: 85000,
    available: 235000,
    minThreshold: 75000,
    maxCapacity: 800000,
    lastUpdated: '2026-06-18T10:15:00',
    status: 'Healthy',
  },
  {
    id: 'CWA-003',
    name: 'BDT Float Account',
    type: 'Float',
    currency: 'BDT',
    flag: '🇧🇩',
    bankName: 'Dutch-Bangla Bank',
    accountNumber: 'BD45 DBBL 1234 5678',
    balance: 12500000,
    reserved: 8000000,
    available: 4500000,
    minThreshold: 5000000,
    maxCapacity: 50000000,
    lastUpdated: '2026-06-18T09:45:00',
    status: 'Low',
  },
  {
    id: 'CWA-004',
    name: 'EUR Reserve Account',
    type: 'Reserve',
    currency: 'EUR',
    flag: '🇪🇺',
    bankName: 'Deutsche Bank',
    accountNumber: 'DE89 3704 0044 0532',
    balance: 95000,
    reserved: 20000,
    available: 75000,
    minThreshold: 50000,
    maxCapacity: 500000,
    lastUpdated: '2026-06-18T09:00:00',
    status: 'Healthy',
  },
  {
    id: 'CWA-005',
    name: 'PKR Float Account',
    type: 'Float',
    currency: 'PKR',
    flag: '🇵🇰',
    bankName: 'Meezan Bank',
    accountNumber: 'PK12 MEZN 0001 2345',
    balance: 8200000,
    reserved: 7500000,
    available: 700000,
    minThreshold: 3000000,
    maxCapacity: 30000000,
    lastUpdated: '2026-06-18T08:30:00',
    status: 'Critical',
  },
  {
    id: 'CWA-006',
    name: 'INR Settlement Account',
    type: 'Settlement',
    currency: 'INR',
    flag: '🇮🇳',
    bankName: 'HDFC Bank',
    accountNumber: 'IN34 HDFC 0001 2345',
    balance: 18500000,
    reserved: 6000000,
    available: 12500000,
    minThreshold: 5000000,
    maxCapacity: 80000000,
    lastUpdated: '2026-06-18T10:00:00',
    status: 'Healthy',
  },
];

// ── Corridor Balances ──
export const corridorBalances: CorridorBalance[] = [
  {
    id: 'COR-001',
    from: 'UK',
    fromFlag: '🇬🇧',
    to: 'Bangladesh',
    toFlag: '🇧🇩',
    currency: 'BDT',
    balance: 4500000,
    dailyVolume: 2800000,
    utilizationPct: 62,
    status: 'Low',
  },
  {
    id: 'COR-002',
    from: 'UK',
    fromFlag: '🇬🇧',
    to: 'Pakistan',
    toFlag: '🇵🇰',
    currency: 'PKR',
    balance: 700000,
    dailyVolume: 1200000,
    utilizationPct: 91,
    status: 'Critical',
  },
  {
    id: 'COR-003',
    from: 'UK',
    fromFlag: '🇬🇧',
    to: 'India',
    toFlag: '🇮🇳',
    currency: 'INR',
    balance: 12500000,
    dailyVolume: 4500000,
    utilizationPct: 36,
    status: 'Healthy',
  },
  {
    id: 'COR-004',
    from: 'UK',
    fromFlag: '🇬🇧',
    to: 'Nigeria',
    toFlag: '🇳🇬',
    currency: 'NGN',
    balance: 3200000,
    dailyVolume: 1800000,
    utilizationPct: 56,
    status: 'Healthy',
  },
  {
    id: 'COR-005',
    from: 'UK',
    fromFlag: '🇬🇧',
    to: 'Philippines',
    toFlag: '🇵🇭',
    currency: 'PHP',
    balance: 1800000,
    dailyVolume: 950000,
    utilizationPct: 53,
    status: 'Healthy',
  },
  {
    id: 'COR-006',
    from: 'UK',
    fromFlag: '🇬🇧',
    to: 'UAE',
    toFlag: '🇦🇪',
    currency: 'AED',
    balance: 520000,
    dailyVolume: 680000,
    utilizationPct: 78,
    status: 'Low',
  },
];

// ── Company Deposits ──
export const companyDeposits: CompanyDeposit[] = [
  {
    id: 'DEP-26061801',
    accountId: 'CWA-001',
    accountName: 'GBP Operating Account',
    currency: 'GBP',
    amount: 150000,
    source: 'Faster Payments',
    senderBank: 'HSBC UK',
    senderRef: 'HSBC-TRF-2026061801',
    receivedAt: '2026-06-18T09:15:00',
    confirmedAt: '2026-06-18T09:18:00',
    status: 'Confirmed',
    note: 'Monthly liquidity top-up from HSBC operating account',
  },
  {
    id: 'DEP-26061802',
    accountId: 'CWA-002',
    accountName: 'USD Settlement Account',
    currency: 'USD',
    amount: 80000,
    source: 'SWIFT',
    senderBank: 'Bank of America',
    senderRef: 'BOA-SWIFT-20260618',
    receivedAt: '2026-06-18T08:30:00',
    confirmedAt: '2026-06-18T10:00:00',
    status: 'Confirmed',
    note: 'USD float replenishment for US corridor',
  },
  {
    id: 'DEP-26061803',
    accountId: 'CWA-003',
    accountName: 'BDT Float Account',
    currency: 'BDT',
    amount: 5000000,
    source: 'Bank Transfer',
    senderBank: 'Dutch-Bangla Bank',
    senderRef: 'DBBL-INT-06180001',
    receivedAt: '2026-06-18T07:00:00',
    confirmedAt: null,
    status: 'Pending',
    note: 'BDT float top-up — pending bank confirmation',
  },
  {
    id: 'DEP-26061804',
    accountId: 'CWA-005',
    accountName: 'PKR Float Account',
    currency: 'PKR',
    amount: 3000000,
    source: 'SWIFT',
    senderBank: 'Meezan Bank Pakistan',
    senderRef: 'MEZN-2026061804',
    receivedAt: '2026-06-17T14:00:00',
    confirmedAt: '2026-06-17T16:30:00',
    status: 'Confirmed',
    note: 'Emergency PKR top-up — critical threshold reached',
  },
  {
    id: 'DEP-26061805',
    accountId: 'CWA-001',
    accountName: 'GBP Operating Account',
    currency: 'GBP',
    amount: 200000,
    source: 'CHAPS',
    senderBank: 'Lloyds Bank',
    senderRef: 'LLYD-CHAPS-20260617',
    receivedAt: '2026-06-17T11:00:00',
    confirmedAt: '2026-06-17T11:45:00',
    status: 'Confirmed',
    note: 'Weekly CHAPS settlement from Lloyds treasury',
  },
  {
    id: 'DEP-26061806',
    accountId: 'CWA-004',
    accountName: 'EUR Reserve Account',
    currency: 'EUR',
    amount: 25000,
    source: 'SEPA',
    senderBank: 'Deutsche Bank',
    senderRef: 'DB-SEPA-2026061701',
    receivedAt: '2026-06-17T09:00:00',
    confirmedAt: '2026-06-17T09:30:00',
    status: 'Confirmed',
    note: 'EUR reserve top-up via SEPA',
  },
  {
    id: 'DEP-26061807',
    accountId: 'CWA-006',
    accountName: 'INR Settlement Account',
    currency: 'INR',
    amount: 3000000,
    source: 'SWIFT',
    senderBank: 'HDFC Bank India',
    senderRef: 'HDFC-SWIFT-0618001',
    receivedAt: '2026-06-16T08:00:00',
    confirmedAt: null,
    status: 'Failed',
    note: 'Failed — incorrect SWIFT routing number',
  },
];

// ── Company Withdrawals ──
export const companyWithdrawals: CompanyWithdrawal[] = [
  {
    id: 'WDR-26061801',
    accountId: 'CWA-001',
    accountName: 'GBP Operating Account',
    currency: 'GBP',
    amount: 85000,
    type: 'Settlement Payout',
    destinationBank: 'Dutch-Bangla Bank',
    destinationAccount: 'BD45 DBBL 1234',
    corridor: 'UK → Bangladesh',
    initiatedBy: 'System (Auto-Settlement)',
    initiatedAt: '2026-06-18T10:00:00',
    processedAt: '2026-06-18T10:05:00',
    status: 'Completed',
    note: 'Daily Bangladesh corridor settlement payout',
  },
  {
    id: 'WDR-26061802',
    accountId: 'CWA-001',
    accountName: 'GBP Operating Account',
    currency: 'GBP',
    amount: 42000,
    type: 'Settlement Payout',
    destinationBank: 'Meezan Bank',
    destinationAccount: 'PK12 MEZN 0001',
    corridor: 'UK → Pakistan',
    initiatedBy: 'System (Auto-Settlement)',
    initiatedAt: '2026-06-18T09:30:00',
    processedAt: '2026-06-18T09:35:00',
    status: 'Completed',
    note: 'Pakistan corridor settlement payout',
  },
  {
    id: 'WDR-26061803',
    accountId: 'CWA-002',
    accountName: 'USD Settlement Account',
    currency: 'USD',
    amount: 15000,
    type: 'Internal Transfer',
    destinationBank: 'JP Morgan Chase',
    destinationAccount: 'US12 CHAS 0021',
    initiatedBy: 'Sarah Johnson (Admin)',
    initiatedAt: '2026-06-18T08:45:00',
    processedAt: null,
    status: 'Pending',
    note: 'Internal transfer to EUR reserve account',
  },
  {
    id: 'WDR-26061804',
    accountId: 'CWA-001',
    accountName: 'GBP Operating Account',
    currency: 'GBP',
    amount: 28000,
    type: 'Settlement Payout',
    destinationBank: 'HDFC Bank',
    destinationAccount: 'IN34 HDFC 0001',
    corridor: 'UK → India',
    initiatedBy: 'System (Auto-Settlement)',
    initiatedAt: '2026-06-17T22:00:00',
    processedAt: '2026-06-17T22:08:00',
    status: 'Completed',
    note: 'India corridor nightly settlement',
  },
  {
    id: 'WDR-26061805',
    accountId: 'CWA-001',
    accountName: 'GBP Operating Account',
    currency: 'GBP',
    amount: 5000,
    type: 'Fee Withdrawal',
    destinationBank: 'Barclays Bank',
    destinationAccount: 'GB29 BARC 9999',
    initiatedBy: 'Finance Team',
    initiatedAt: '2026-06-17T18:00:00',
    processedAt: '2026-06-17T18:10:00',
    status: 'Completed',
    note: 'Monthly fee collection to revenue account',
  },
  {
    id: 'WDR-26061806',
    accountId: 'CWA-006',
    accountName: 'INR Settlement Account',
    currency: 'INR',
    amount: 2500000,
    type: 'Settlement Payout',
    destinationBank: 'Axis Bank India',
    destinationAccount: 'IN99 AXIS 0001',
    corridor: 'UK → India',
    initiatedBy: 'System (Auto-Settlement)',
    initiatedAt: '2026-06-17T16:00:00',
    processedAt: null,
    status: 'Failed',
    note: 'Failed — recipient bank API timeout',
  },
  {
    id: 'WDR-26061807',
    accountId: 'CWA-002',
    accountName: 'USD Settlement Account',
    currency: 'USD',
    amount: 22000,
    type: 'Partner Payment',
    destinationBank: 'Western Union Partner',
    destinationAccount: 'WU-PART-9988',
    initiatedBy: 'Operations Team',
    initiatedAt: '2026-06-17T14:30:00',
    processedAt: '2026-06-17T15:00:00',
    status: 'Completed',
    note: 'Monthly partner commission payout',
  },
  {
    id: 'WDR-26061808',
    accountId: 'CWA-001',
    accountName: 'GBP Operating Account',
    currency: 'GBP',
    amount: 12000,
    type: 'Internal Transfer',
    destinationBank: 'Barclays Bank',
    destinationAccount: 'GB29 BARC 0044',
    initiatedBy: 'Ahmed Khan (Admin)',
    initiatedAt: '2026-06-17T11:00:00',
    processedAt: null,
    status: 'Cancelled',
    note: 'Cancelled — duplicate request',
  },
];

export const walletOverviewStats = {
  totalBalance: 900000,
  totalBalanceCurrency: 'GBP',
  totalReserved: 205000,
  totalAvailable: 695000,
  dailyInflow: 455000,
  dailyOutflow: 177000,
  criticalAccounts: 1,
  lowAccounts: 2,
};

// exchange rates fake data

// ============ EXCHANGE RATES ============
export type RateStatus = 'Active' | 'Inactive' | 'Paused';
export type RatePriority = 'High' | 'Medium' | 'Low';
export type RateSourceStatus = 'Connected' | 'Disconnected' | 'Syncing';

export interface CurrencyRate {
  id: string;
  baseCurrency: string;
  baseCurrencyName: string;
  baseFlag: string;
  quoteCurrency: string;
  quoteCurrencyName: string;
  quoteFlag: string;
  liveRate: number;
  liveChange: number;
  liveChangePct: number;
  ourRate: number;
  spread: number;
  spreadPct: number;
  source: string;
  lastUpdated: string;
  nextUpdate: string;
  status: RateStatus;
  autoUpdate: boolean;
  priority: RatePriority;
}

export interface RatePoint {
  time: string;
  rate: number;
}

// ── Exchange Rate Overview Stats ──
export const exchangeRateStats = {
  totalCurrencyPairs: 28,
  activePairs: 28,
  lastUpdated: 'May 12, 2025 2:30 PM',
  autoRefreshSeconds: 45,
  baseCurrency: 'GBP',
  baseCurrencyName: 'British Pound',
  averageSpreadPct: 0.65,
  rateSource: 'Xe.com',
  rateSourceStatus: 'Connected' as RateSourceStatus,
};

// ── Currency Rates Table ──
export const currencyRates: CurrencyRate[] = [
  {
    id: 'RATE-001',
    baseCurrency: 'GBP',
    baseCurrencyName: 'British Pound',
    baseFlag: '🇬🇧',
    quoteCurrency: 'USD',
    quoteCurrencyName: 'US Dollar',
    quoteFlag: '🇺🇸',
    liveRate: 1.2567,
    liveChange: 0.0034,
    liveChangePct: 0.27,
    ourRate: 1.2486,
    spread: 0.0081,
    spreadPct: 0.65,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active',
    autoUpdate: true,
    priority: 'High',
  },
  {
    id: 'RATE-002',
    baseCurrency: 'GBP',
    baseCurrencyName: 'British Pound',
    baseFlag: '🇬🇧',
    quoteCurrency: 'EUR',
    quoteCurrencyName: 'Euro',
    quoteFlag: '🇪🇺',
    liveRate: 1.1678,
    liveChange: -0.0021,
    liveChangePct: -0.18,
    ourRate: 1.1603,
    spread: 0.0075,
    spreadPct: 0.64,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active',
    autoUpdate: true,
    priority: 'High',
  },
  {
    id: 'RATE-003',
    baseCurrency: 'GBP',
    baseCurrencyName: 'British Pound',
    baseFlag: '🇬🇧',
    quoteCurrency: 'BDT',
    quoteCurrencyName: 'Bangladeshi Taka',
    quoteFlag: '🇧🇩',
    liveRate: 154.85,
    liveChange: 0.32,
    liveChangePct: 0.21,
    ourRate: 153.62,
    spread: 1.23,
    spreadPct: 0.79,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active',
    autoUpdate: true,
    priority: 'High',
  },
  {
    id: 'RATE-004',
    baseCurrency: 'USD',
    baseCurrencyName: 'US Dollar',
    baseFlag: '🇺🇸',
    quoteCurrency: 'BDT',
    quoteCurrencyName: 'Bangladeshi Taka',
    quoteFlag: '🇧🇩',
    liveRate: 123.25,
    liveChange: 0.15,
    liveChangePct: 0.12,
    ourRate: 122.38,
    spread: 0.87,
    spreadPct: 0.71,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active',
    autoUpdate: true,
    priority: 'Medium',
  },
  {
    id: 'RATE-005',
    baseCurrency: 'EUR',
    baseCurrencyName: 'Euro',
    baseFlag: '🇪🇺',
    quoteCurrency: 'USD',
    quoteCurrencyName: 'US Dollar',
    quoteFlag: '🇺🇸',
    liveRate: 1.0763,
    liveChange: 0.0015,
    liveChangePct: 0.14,
    ourRate: 1.0695,
    spread: 0.0068,
    spreadPct: 0.63,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active',
    autoUpdate: true,
    priority: 'Medium',
  },
  {
    id: 'RATE-006',
    baseCurrency: 'EUR',
    baseCurrencyName: 'Euro',
    baseFlag: '🇪🇺',
    quoteCurrency: 'BDT',
    quoteCurrencyName: 'Bangladeshi Taka',
    quoteFlag: '🇧🇩',
    liveRate: 132.28,
    liveChange: -0.21,
    liveChangePct: -0.16,
    ourRate: 131.32,
    spread: 0.96,
    spreadPct: 0.73,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active',
    autoUpdate: true,
    priority: 'Medium',
  },
  {
    id: 'RATE-007',
    baseCurrency: 'USD',
    baseCurrencyName: 'US Dollar',
    baseFlag: '🇺🇸',
    quoteCurrency: 'EUR',
    quoteCurrencyName: 'Euro',
    quoteFlag: '🇪🇺',
    liveRate: 0.9289,
    liveChange: -0.0012,
    liveChangePct: -0.13,
    ourRate: 0.9232,
    spread: 0.0057,
    spreadPct: 0.61,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active',
    autoUpdate: true,
    priority: 'Low',
  },
  {
    id: 'RATE-008',
    baseCurrency: 'AUD',
    baseCurrencyName: 'Australian Dollar',
    baseFlag: '🇦🇺',
    quoteCurrency: 'USD',
    quoteCurrencyName: 'US Dollar',
    quoteFlag: '🇺🇸',
    liveRate: 0.6642,
    liveChange: 0.0023,
    liveChangePct: 0.35,
    ourRate: 0.66,
    spread: 0.0042,
    spreadPct: 0.63,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active',
    autoUpdate: true,
    priority: 'Low',
  },
  {
    id: 'RATE-009',
    baseCurrency: 'GBP',
    baseCurrencyName: 'British Pound',
    baseFlag: '🇬🇧',
    quoteCurrency: 'PKR',
    quoteCurrencyName: 'Pakistani Rupee',
    quoteFlag: '🇵🇰',
    liveRate: 349.12,
    liveChange: 0.88,
    liveChangePct: 0.25,
    ourRate: 346.89,
    spread: 2.23,
    spreadPct: 0.64,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active',
    autoUpdate: true,
    priority: 'Medium',
  },
  {
    id: 'RATE-010',
    baseCurrency: 'GBP',
    baseCurrencyName: 'British Pound',
    baseFlag: '🇬🇧',
    quoteCurrency: 'INR',
    quoteCurrencyName: 'Indian Rupee',
    quoteFlag: '🇮🇳',
    liveRate: 105.62,
    liveChange: -0.14,
    liveChangePct: -0.13,
    ourRate: 104.93,
    spread: 0.69,
    spreadPct: 0.65,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active',
    autoUpdate: true,
    priority: 'Medium',
  },
  {
    id: 'RATE-011',
    baseCurrency: 'GBP',
    baseCurrencyName: 'British Pound',
    baseFlag: '🇬🇧',
    quoteCurrency: 'AED',
    quoteCurrencyName: 'UAE Dirham',
    quoteFlag: '🇦🇪',
    liveRate: 4.618,
    liveChange: 0.009,
    liveChangePct: 0.2,
    ourRate: 4.588,
    spread: 0.03,
    spreadPct: 0.65,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active',
    autoUpdate: true,
    priority: 'Low',
  },
  {
    id: 'RATE-012',
    baseCurrency: 'USD',
    baseCurrencyName: 'US Dollar',
    baseFlag: '🇺🇸',
    quoteCurrency: 'PHP',
    quoteCurrencyName: 'Philippine Peso',
    quoteFlag: '🇵🇭',
    liveRate: 56.24,
    liveChange: 0.11,
    liveChangePct: 0.2,
    ourRate: 55.88,
    spread: 0.36,
    spreadPct: 0.64,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active',
    autoUpdate: true,
    priority: 'Low',
  },
  {
    id: 'RATE-013',
    baseCurrency: 'USD',
    baseCurrencyName: 'US Dollar',
    baseFlag: '🇺🇸',
    quoteCurrency: 'NGN',
    quoteCurrencyName: 'Nigerian Naira',
    quoteFlag: '🇳🇬',
    liveRate: 1542.5,
    liveChange: -3.2,
    liveChangePct: -0.21,
    ourRate: 1532.6,
    spread: 9.9,
    spreadPct: 0.64,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Paused',
    autoUpdate: false,
    priority: 'Low',
  },
  {
    id: 'RATE-014',
    baseCurrency: 'GBP',
    baseCurrencyName: 'British Pound',
    baseFlag: '🇬🇧',
    quoteCurrency: 'CAD',
    quoteCurrencyName: 'Canadian Dollar',
    quoteFlag: '🇨🇦',
    liveRate: 1.7235,
    liveChange: 0.0028,
    liveChangePct: 0.16,
    ourRate: 1.7124,
    spread: 0.0111,
    spreadPct: 0.64,
    source: 'Xe.com',
    lastUpdated: 'May 12, 2025 2:30 PM',
    nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Inactive',
    autoUpdate: false,
    priority: 'Low',
  },
];

// ── Rate Movement (GBP/USD) chart series ──
export const rateMovement1D: RatePoint[] = [
  { time: '12 AM', rate: 1.2543 },
  { time: '03 AM', rate: 1.2521 },
  { time: '06 AM', rate: 1.2538 },
  { time: '09 AM', rate: 1.2575 },
  { time: '12 PM', rate: 1.256 },
  { time: '03 PM', rate: 1.2592 },
  { time: '06 PM', rate: 1.2548 },
  { time: '09 PM', rate: 1.2567 },
];

export const rateMovement7D: RatePoint[] = [
  { time: 'May 6', rate: 1.2356 },
  { time: 'May 7', rate: 1.2421 },
  { time: 'May 8', rate: 1.2398 },
  { time: 'May 9', rate: 1.2512 },
  { time: 'May 10', rate: 1.2487 },
  { time: 'May 11', rate: 1.2654 },
  { time: 'May 12', rate: 1.2567 },
];

export const rateMovement30D: RatePoint[] = [
  { time: 'Apr 13', rate: 1.221 },
  { time: 'Apr 18', rate: 1.2345 },
  { time: 'Apr 23', rate: 1.2289 },
  { time: 'Apr 28', rate: 1.2456 },
  { time: 'May 3', rate: 1.2598 },
  { time: 'May 8', rate: 1.2398 },
  { time: 'May 12', rate: 1.2567 },
];

// ── Rate Summary (for GBP/USD selected pair) ──
export const rateSummary = {
  todaysHigh: 1.2589,
  todaysLow: 1.2432,
  sevenDayHigh: 1.2654,
  sevenDayLow: 1.2356,
  thirtyDayHigh: 1.2789,
  thirtyDayLow: 1.221,
  average7d: 1.2486,
  volatility7d: 0.87,
};

export const rateBaseCurrencyOptions = [
  'All Base Currencies',
  'GBP',
  'USD',
  'EUR',
  'AUD',
];
export const rateQuoteCurrencyOptions = [
  'All Quote Currencies',
  'USD',
  'EUR',
  'BDT',
  'PKR',
  'INR',
  'AED',
  'PHP',
  'NGN',
  'CAD',
];
export const rateStatusOptions = ['All Status', 'Active', 'Inactive', 'Paused'];

export const RATE_PAGE_SIZE = 8;
export const RATE_TOTAL = 28;

// menual override

// ============ MANUAL RATE OVERRIDE ============
export type OverrideStatus = 'Active' | 'Expired' | 'Reverted' | 'Scheduled';
export type OverrideDuration =
  | '1 Hour'
  | '4 Hours'
  | '12 Hours'
  | '24 Hours'
  | 'Until Reverted';

export interface RateOverride {
  id: string;
  baseCurrency: string;
  baseFlag: string;
  quoteCurrency: string;
  quoteFlag: string;
  liveRate: number;
  overrideRate: number;
  diffPct: number;
  reason: string;
  duration: OverrideDuration;
  status: OverrideStatus;
  setBy: string;
  setByInitials: string;
  setAt: string;
  expiresAt: string | null;
  autoRevert: boolean;
}

export interface OverrideLogEntry {
  id: string;
  action: 'Created' | 'Reverted' | 'Expired' | 'Updated';
  pairLabel: string;
  pairFlags: string;
  rate: number;
  performedBy: string;
  performedByInitials: string;
  timestamp: string;
  note: string;
}

// ── Manual Override Stats ──
export const overrideStats = {
  activeOverrides: 3,
  expiringSoon: 1,
  totalOverridesToday: 5,
  avgOverrideDurationHours: 6.4,
};

// ── Active / Scheduled / Past Overrides ──
export const rateOverrides: RateOverride[] = [
  {
    id: 'OVR-001',
    baseCurrency: 'GBP',
    baseFlag: '🇬🇧',
    quoteCurrency: 'BDT',
    quoteFlag: '🇧🇩',
    liveRate: 154.85,
    overrideRate: 153.0,
    diffPct: -1.2,
    reason:
      'Market volatility spike — capping rate to protect margin during BDT liquidity crunch.',
    duration: '12 Hours',
    status: 'Active',
    setBy: 'Sarah Johnson',
    setByInitials: 'SJ',
    setAt: '2025-05-12T11:00:00',
    expiresAt: '2025-05-12T23:00:00',
    autoRevert: true,
  },
  {
    id: 'OVR-002',
    baseCurrency: 'USD',
    baseFlag: '🇺🇸',
    quoteCurrency: 'PKR',
    quoteFlag: '🇵🇰',
    liveRate: 278.45,
    overrideRate: 280.0,
    diffPct: 0.56,
    reason:
      'Promotional rate boost for Eid remittance campaign — approved by Marketing.',
    duration: '24 Hours',
    status: 'Active',
    setBy: 'Ahmed Khan',
    setByInitials: 'AK',
    setAt: '2025-05-12T08:30:00',
    expiresAt: '2025-05-13T08:30:00',
    autoRevert: true,
  },
  {
    id: 'OVR-003',
    baseCurrency: 'GBP',
    baseFlag: '🇬🇧',
    quoteCurrency: 'PKR',
    quoteFlag: '🇵🇰',
    liveRate: 349.12,
    overrideRate: 345.0,
    diffPct: -1.18,
    reason:
      'Compliance hold — provider feed flagged as unreliable, using last verified rate.',
    duration: 'Until Reverted',
    status: 'Active',
    setBy: 'Sarah Johnson',
    setByInitials: 'SJ',
    setAt: '2025-05-12T13:15:00',
    expiresAt: null,
    autoRevert: false,
  },
  {
    id: 'OVR-004',
    baseCurrency: 'EUR',
    baseFlag: '🇪🇺',
    quoteCurrency: 'BDT',
    quoteFlag: '🇧🇩',
    liveRate: 132.28,
    overrideRate: 131.5,
    diffPct: -0.59,
    reason: 'Competitor price match for high-volume corporate client.',
    duration: '4 Hours',
    status: 'Expired',
    setBy: 'Imran Hossain',
    setByInitials: 'IH',
    setAt: '2025-05-11T09:00:00',
    expiresAt: '2025-05-11T13:00:00',
    autoRevert: true,
  },
  {
    id: 'OVR-005',
    baseCurrency: 'GBP',
    baseFlag: '🇬🇧',
    quoteCurrency: 'USD',
    quoteFlag: '🇺🇸',
    liveRate: 1.2567,
    overrideRate: 1.26,
    diffPct: 0.26,
    reason:
      'Manual correction — provider rate lagged by 4 minutes during high volatility window.',
    duration: '1 Hour',
    status: 'Reverted',
    setBy: 'Ahmed Khan',
    setByInitials: 'AK',
    setAt: '2025-05-10T16:20:00',
    expiresAt: '2025-05-10T17:20:00',
    autoRevert: true,
  },
  {
    id: 'OVR-006',
    baseCurrency: 'USD',
    baseFlag: '🇺🇸',
    quoteCurrency: 'NGN',
    quoteFlag: '🇳🇬',
    liveRate: 1542.5,
    overrideRate: 1500.0,
    diffPct: -2.76,
    reason:
      'Scheduled override for upcoming Nigerian bank holiday liquidity adjustment.',
    duration: '24 Hours',
    status: 'Scheduled',
    setBy: 'Sarah Johnson',
    setByInitials: 'SJ',
    setAt: '2025-05-12T14:00:00',
    expiresAt: '2025-05-13T14:00:00',
    autoRevert: true,
  },
];

// ── Override Activity Log ──
export const overrideLog: OverrideLogEntry[] = [
  {
    id: 'LOG-001',
    action: 'Created',
    pairLabel: 'GBP / BDT',
    pairFlags: '🇬🇧🇧🇩',
    rate: 153.0,
    performedBy: 'Sarah Johnson',
    performedByInitials: 'SJ',
    timestamp: '2025-05-12T11:00:00',
    note: 'Override created — market volatility protection',
  },
  {
    id: 'LOG-002',
    action: 'Created',
    pairLabel: 'USD / PKR',
    pairFlags: '🇺🇸🇵🇰',
    rate: 280.0,
    performedBy: 'Ahmed Khan',
    performedByInitials: 'AK',
    timestamp: '2025-05-12T08:30:00',
    note: 'Promotional campaign rate applied',
  },
  {
    id: 'LOG-003',
    action: 'Created',
    pairLabel: 'GBP / PKR',
    pairFlags: '🇬🇧🇵🇰',
    rate: 345.0,
    performedBy: 'Sarah Johnson',
    performedByInitials: 'SJ',
    timestamp: '2025-05-12T13:15:00',
    note: 'Compliance hold on unreliable provider feed',
  },
  {
    id: 'LOG-004',
    action: 'Reverted',
    pairLabel: 'GBP / USD',
    pairFlags: '🇬🇧🇺🇸',
    rate: 1.2567,
    performedBy: 'System (Auto)',
    performedByInitials: 'SY',
    timestamp: '2025-05-10T17:20:00',
    note: 'Auto-reverted to live rate after 1 hour expiry',
  },
  {
    id: 'LOG-005',
    action: 'Created',
    pairLabel: 'GBP / USD',
    pairFlags: '🇬🇧🇺🇸',
    rate: 1.26,
    performedBy: 'Ahmed Khan',
    performedByInitials: 'AK',
    timestamp: '2025-05-10T16:20:00',
    note: 'Manual correction for provider lag',
  },
  {
    id: 'LOG-006',
    action: 'Expired',
    pairLabel: 'EUR / BDT',
    pairFlags: '🇪🇺🇧🇩',
    rate: 131.5,
    performedBy: 'System (Auto)',
    performedByInitials: 'SY',
    timestamp: '2025-05-11T13:00:00',
    note: 'Override expired after 4 hours, reverted to live rate',
  },
  {
    id: 'LOG-007',
    action: 'Created',
    pairLabel: 'EUR / BDT',
    pairFlags: '🇪🇺🇧🇩',
    rate: 131.5,
    performedBy: 'Imran Hossain',
    performedByInitials: 'IH',
    timestamp: '2025-05-11T09:00:00',
    note: 'Competitor price match approved',
  },
  {
    id: 'LOG-008',
    action: 'Updated',
    pairLabel: 'USD / PKR',
    pairFlags: '🇺🇸🇵🇰',
    rate: 280.0,
    performedBy: 'Ahmed Khan',
    performedByInitials: 'AK',
    timestamp: '2025-05-12T09:10:00',
    note: 'Duration extended from 12 to 24 hours',
  },
];

export const overrideDurationOptions: OverrideDuration[] = [
  '1 Hour',
  '4 Hours',
  '12 Hours',
  '24 Hours',
  'Until Reverted',
];

// spread Management

// ============ SPREAD MANAGEMENT ============
export type SpreadRuleStatus = 'Active' | 'Inactive';
export type CustomerTierName = 'Standard' | 'Silver' | 'Gold' | 'Platinum';

export interface SpreadRule {
  id: string;
  baseCurrency: string;
  baseFlag: string;
  quoteCurrency: string;
  quoteFlag: string;
  currentSpreadPct: number;
  minSpreadPct: number;
  maxSpreadPct: number;
  defaultSpreadPct: number;
  monthlyVolume: number;
  volumeCurrency: string;
  status: SpreadRuleStatus;
  lastUpdated: string;
  updatedBy: string;
}

export interface CustomerTier {
  tier: CustomerTierName;
  monthlyVolumeThreshold: number;
  spreadDiscountPct: number;
  customerCount: number;
  color: string;
}

export interface SpreadChangeLogEntry {
  id: string;
  pairLabel: string;
  pairFlags: string;
  fromPct: number;
  toPct: number;
  changedBy: string;
  changedByInitials: string;
  timestamp: string;
  note: string;
}

// ── Spread Management Stats ──
export const spreadStats = {
  averageSpreadPct: 0.65,
  highestSpreadPair: 'PKR Float Pairs',
  highestSpreadPct: 1.23,
  lowestSpreadPair: 'USD / EUR',
  lowestSpreadPct: 0.57,
  pairsNeedingReview: 2,
};

// ── Spread Rules (per currency pair) ──
export const spreadRules: SpreadRule[] = [
  {
    id: 'SPR-001',
    baseCurrency: 'GBP',
    baseFlag: '🇬🇧',
    quoteCurrency: 'USD',
    quoteFlag: '🇺🇸',
    currentSpreadPct: 0.65,
    minSpreadPct: 0.4,
    maxSpreadPct: 0.9,
    defaultSpreadPct: 0.65,
    monthlyVolume: 4256780,
    volumeCurrency: 'GBP',
    status: 'Active',
    lastUpdated: 'May 10, 2025',
    updatedBy: 'Sarah Johnson',
  },
  {
    id: 'SPR-002',
    baseCurrency: 'GBP',
    baseFlag: '🇬🇧',
    quoteCurrency: 'EUR',
    quoteFlag: '🇪🇺',
    currentSpreadPct: 0.64,
    minSpreadPct: 0.4,
    maxSpreadPct: 0.9,
    defaultSpreadPct: 0.6,
    monthlyVolume: 2856420,
    volumeCurrency: 'GBP',
    status: 'Active',
    lastUpdated: 'May 9, 2025',
    updatedBy: 'Ahmed Khan',
  },
  {
    id: 'SPR-003',
    baseCurrency: 'GBP',
    baseFlag: '🇬🇧',
    quoteCurrency: 'BDT',
    quoteFlag: '🇧🇩',
    currentSpreadPct: 0.79,
    minSpreadPct: 0.5,
    maxSpreadPct: 1.0,
    defaultSpreadPct: 0.75,
    monthlyVolume: 6125400,
    volumeCurrency: 'GBP',
    status: 'Active',
    lastUpdated: 'May 12, 2025',
    updatedBy: 'Sarah Johnson',
  },
  {
    id: 'SPR-004',
    baseCurrency: 'USD',
    baseFlag: '🇺🇸',
    quoteCurrency: 'BDT',
    quoteFlag: '🇧🇩',
    currentSpreadPct: 0.71,
    minSpreadPct: 0.5,
    maxSpreadPct: 1.0,
    defaultSpreadPct: 0.7,
    monthlyVolume: 3856230,
    volumeCurrency: 'USD',
    status: 'Active',
    lastUpdated: 'May 8, 2025',
    updatedBy: 'Imran Hossain',
  },
  {
    id: 'SPR-005',
    baseCurrency: 'EUR',
    baseFlag: '🇪🇺',
    quoteCurrency: 'USD',
    quoteFlag: '🇺🇸',
    currentSpreadPct: 0.63,
    minSpreadPct: 0.4,
    maxSpreadPct: 0.9,
    defaultSpreadPct: 0.6,
    monthlyVolume: 1985600,
    volumeCurrency: 'EUR',
    status: 'Active',
    lastUpdated: 'May 7, 2025',
    updatedBy: 'Ahmed Khan',
  },
  {
    id: 'SPR-006',
    baseCurrency: 'EUR',
    baseFlag: '🇪🇺',
    quoteCurrency: 'BDT',
    quoteFlag: '🇧🇩',
    currentSpreadPct: 0.73,
    minSpreadPct: 0.5,
    maxSpreadPct: 1.0,
    defaultSpreadPct: 0.7,
    monthlyVolume: 1456780,
    volumeCurrency: 'EUR',
    status: 'Active',
    lastUpdated: 'May 6, 2025',
    updatedBy: 'Sarah Johnson',
  },
  {
    id: 'SPR-007',
    baseCurrency: 'USD',
    baseFlag: '🇺🇸',
    quoteCurrency: 'EUR',
    quoteFlag: '🇪🇺',
    currentSpreadPct: 0.57,
    minSpreadPct: 0.4,
    maxSpreadPct: 0.9,
    defaultSpreadPct: 0.6,
    monthlyVolume: 985450,
    volumeCurrency: 'USD',
    status: 'Active',
    lastUpdated: 'May 5, 2025',
    updatedBy: 'Imran Hossain',
  },
  {
    id: 'SPR-008',
    baseCurrency: 'GBP',
    baseFlag: '🇬🇧',
    quoteCurrency: 'PKR',
    quoteFlag: '🇵🇰',
    currentSpreadPct: 0.64,
    minSpreadPct: 0.5,
    maxSpreadPct: 1.0,
    defaultSpreadPct: 0.7,
    monthlyVolume: 2256800,
    volumeCurrency: 'GBP',
    status: 'Active',
    lastUpdated: 'May 11, 2025',
    updatedBy: 'Sarah Johnson',
  },
  {
    id: 'SPR-009',
    baseCurrency: 'USD',
    baseFlag: '🇺🇸',
    quoteCurrency: 'PKR',
    quoteFlag: '🇵🇰',
    currentSpreadPct: 1.23,
    minSpreadPct: 0.5,
    maxSpreadPct: 1.0,
    defaultSpreadPct: 0.75,
    monthlyVolume: 1685200,
    volumeCurrency: 'USD',
    status: 'Active',
    lastUpdated: 'May 12, 2025',
    updatedBy: 'Ahmed Khan',
  },
  {
    id: 'SPR-010',
    baseCurrency: 'USD',
    baseFlag: '🇺🇸',
    quoteCurrency: 'NGN',
    quoteFlag: '🇳🇬',
    currentSpreadPct: 0.97,
    minSpreadPct: 0.5,
    maxSpreadPct: 1.0,
    defaultSpreadPct: 0.8,
    monthlyVolume: 856420,
    volumeCurrency: 'USD',
    status: 'Inactive',
    lastUpdated: 'Apr 28, 2025',
    updatedBy: 'Imran Hossain',
  },
  {
    id: 'SPR-011',
    baseCurrency: 'GBP',
    baseFlag: '🇬🇧',
    quoteCurrency: 'INR',
    quoteFlag: '🇮🇳',
    currentSpreadPct: 0.65,
    minSpreadPct: 0.4,
    maxSpreadPct: 0.9,
    defaultSpreadPct: 0.65,
    monthlyVolume: 1985200,
    volumeCurrency: 'GBP',
    status: 'Active',
    lastUpdated: 'May 10, 2025',
    updatedBy: 'Sarah Johnson',
  },
  {
    id: 'SPR-012',
    baseCurrency: 'GBP',
    baseFlag: '🇬🇧',
    quoteCurrency: 'AED',
    quoteFlag: '🇦🇪',
    currentSpreadPct: 0.65,
    minSpreadPct: 0.4,
    maxSpreadPct: 0.9,
    defaultSpreadPct: 0.65,
    monthlyVolume: 685200,
    volumeCurrency: 'GBP',
    status: 'Active',
    lastUpdated: 'May 4, 2025',
    updatedBy: 'Ahmed Khan',
  },
];

// ── Customer Tier-based spread discounts ──
export const customerTiers: CustomerTier[] = [
  {
    tier: 'Standard',
    monthlyVolumeThreshold: 0,
    spreadDiscountPct: 0,
    customerCount: 8642,
    color: 'gray',
  },
  {
    tier: 'Silver',
    monthlyVolumeThreshold: 5000,
    spreadDiscountPct: 10,
    customerCount: 2156,
    color: 'blue',
  },
  {
    tier: 'Gold',
    monthlyVolumeThreshold: 20000,
    spreadDiscountPct: 20,
    customerCount: 654,
    color: 'amber',
  },
  {
    tier: 'Platinum',
    monthlyVolumeThreshold: 50000,
    spreadDiscountPct: 35,
    customerCount: 128,
    color: 'purple',
  },
];

// ── Spread Change Log ──
export const spreadChangeLog: SpreadChangeLogEntry[] = [
  {
    id: 'SCL-001',
    pairLabel: 'USD / PKR',
    pairFlags: '🇺🇸🇵🇰',
    fromPct: 0.75,
    toPct: 1.23,
    changedBy: 'Ahmed Khan',
    changedByInitials: 'AK',
    timestamp: '2025-05-12T10:30:00',
    note: 'Increased due to high volatility in PKR corridor and provider liquidity risk.',
  },
  {
    id: 'SCL-002',
    pairLabel: 'GBP / BDT',
    pairFlags: '🇬🇧🇧🇩',
    fromPct: 0.75,
    toPct: 0.79,
    changedBy: 'Sarah Johnson',
    changedByInitials: 'SJ',
    timestamp: '2025-05-12T09:00:00',
    note: 'Adjusted to reflect increased operational cost in BDT settlement.',
  },
  {
    id: 'SCL-003',
    pairLabel: 'GBP / PKR',
    pairFlags: '🇬🇧🇵🇰',
    fromPct: 0.7,
    toPct: 0.64,
    changedBy: 'Sarah Johnson',
    changedByInitials: 'SJ',
    timestamp: '2025-05-11T15:20:00',
    note: 'Reduced spread to stay competitive against market rate aggregators.',
  },
  {
    id: 'SCL-004',
    pairLabel: 'USD / BDT',
    pairFlags: '🇺🇸🇧🇩',
    fromPct: 0.68,
    toPct: 0.71,
    changedBy: 'Imran Hossain',
    changedByInitials: 'IH',
    timestamp: '2025-05-08T11:45:00',
    note: 'Minor adjustment after monthly margin review.',
  },
  {
    id: 'SCL-005',
    pairLabel: 'USD / NGN',
    pairFlags: '🇺🇸🇳🇬',
    fromPct: 0.8,
    toPct: 0.97,
    changedBy: 'Imran Hossain',
    changedByInitials: 'IH',
    timestamp: '2025-04-28T14:10:00',
    note: 'Pair deactivated pending compliance review — spread frozen at last value.',
  },
  {
    id: 'SCL-006',
    pairLabel: 'EUR / USD',
    pairFlags: '🇪🇺🇺🇸',
    fromPct: 0.6,
    toPct: 0.57,
    changedBy: 'Ahmed Khan',
    changedByInitials: 'AK',
    timestamp: '2025-05-05T08:30:00',
    note: 'Reduced as part of Q2 competitive pricing initiative.',
  },
];

export const spreadStatusOptions = ['All Status', 'Active', 'Inactive'];

// payment overview data =>

// ============ PAYMENT METHODS ============
export type PaymentMethodType =
  | 'Bank Transfer'
  | 'Mobile Wallet'
  | 'Cash Pickup'
  | 'Card Payments';
export type PaymentMethodStatus = 'Active' | 'Inactive';

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentMethodType;
  icon: string;
  iconBg: string;
  provider: string;
  providerLogo: string;
  countries: string[];
  countryCount: number;
  currencies: string[];
  status: PaymentMethodStatus;
  transactions: number;
  transactionFeePct: number;
  minTransaction: number;
  maxTransaction: number;
  dailyLimit: number;
  limitCurrency: string;
  connectedOn: string;
  weeklyTransactions: number;
  weeklyVolume: number;
  weeklyVolumeCurrency: string;
  successRatePct: number;
  weeklyTransactionsChangePct: number;
  weeklyVolumeChangePct: number;
  successRateChangePct: number;
}

// ── Overview category stats ──
export const paymentCategoryStats = [
  {
    type: 'Bank Transfer' as PaymentMethodType,
    icon: '🏦',
    iconBg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    activeMethods: 32,
    status: 'Active' as PaymentMethodStatus,
    countries: 8,
    secondaryLabel: 'Banks',
    secondaryValue: 156,
  },
  {
    type: 'Mobile Wallet' as PaymentMethodType,
    icon: '📱',
    iconBg:
      'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
    activeMethods: 18,
    status: 'Active' as PaymentMethodStatus,
    countries: 6,
    secondaryLabel: 'Transactions',
    secondaryValue: 2_450_000,
  },
  {
    type: 'Cash Pickup' as PaymentMethodType,
    icon: '👁',
    iconBg:
      'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400',
    activeMethods: 24,
    status: 'Active' as PaymentMethodStatus,
    countries: 12,
    secondaryLabel: 'Transactions',
    secondaryValue: 1_120_000,
  },
  {
    type: 'Card Payments' as PaymentMethodType,
    icon: '💳',
    iconBg:
      'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
    activeMethods: 12,
    status: 'Active' as PaymentMethodStatus,
    countries: 4,
    secondaryLabel: 'Transactions',
    secondaryValue: 892_000,
  },
];

export const paymentOverviewStats = {
  totalMethods: 86,
  totalCountries: 24,
  totalTransactionsThisWeek: 124_580,
  totalVolumeThisWeek: 245_680_000,
  volumeCurrency: '৳',
};

// ── All Payment Methods ──
export const paymentMethods: PaymentMethod[] = [
  {
    id: 'PM-001',
    name: 'HSBC Bank Transfer',
    type: 'Bank Transfer',
    icon: '🏦',
    iconBg: 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400',
    provider: 'HSBC',
    providerLogo: '🔴',
    countries: [
      'United Kingdom',
      'United States',
      'UAE',
      'Singapore',
      'Hong Kong',
      'France',
      'Germany',
      'Canada',
    ],
    countryCount: 8,
    currencies: ['GBP', 'USD', 'EUR', 'BDT'],
    status: 'Active',
    transactions: 245680,
    transactionFeePct: 0.5,
    minTransaction: 10,
    maxTransaction: 100000,
    dailyLimit: 250000,
    limitCurrency: 'GBP',
    connectedOn: 'Jan 10, 2024 09:00 AM',
    weeklyTransactions: 18540,
    weeklyVolume: 8245600,
    weeklyVolumeCurrency: 'GBP',
    successRatePct: 99.1,
    weeklyTransactionsChangePct: 8.2,
    weeklyVolumeChangePct: 6.5,
    successRateChangePct: 0.4,
  },
  {
    id: 'PM-002',
    name: 'bKash',
    type: 'Mobile Wallet',
    icon: '📱',
    iconBg: 'bg-pink-50 dark:bg-pink-950 text-pink-600 dark:text-pink-400',
    provider: 'bKash Limited',
    providerLogo: '🇵🇭',
    countries: ['Bangladesh'],
    countryCount: 1,
    currencies: ['BDT'],
    status: 'Active',
    transactions: 1245780,
    transactionFeePct: 1.5,
    minTransaction: 10,
    maxTransaction: 50000,
    dailyLimit: 200000,
    limitCurrency: 'BDT',
    connectedOn: 'Jan 15, 2024 10:30 AM',
    weeklyTransactions: 124580,
    weeklyVolume: 245680000,
    weeklyVolumeCurrency: 'BDT',
    successRatePct: 98.45,
    weeklyTransactionsChangePct: 12.5,
    weeklyVolumeChangePct: 8.3,
    successRateChangePct: 1.2,
  },
  {
    id: 'PM-003',
    name: 'Nagad',
    type: 'Mobile Wallet',
    icon: '🟠',
    iconBg:
      'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400',
    provider: 'Nagad Limited',
    providerLogo: '🟠',
    countries: ['Bangladesh'],
    countryCount: 1,
    currencies: ['BDT'],
    status: 'Active',
    transactions: 856230,
    transactionFeePct: 1.2,
    minTransaction: 10,
    maxTransaction: 45000,
    dailyLimit: 180000,
    limitCurrency: 'BDT',
    connectedOn: 'Feb 2, 2024 11:00 AM',
    weeklyTransactions: 78540,
    weeklyVolume: 156280000,
    weeklyVolumeCurrency: 'BDT',
    successRatePct: 97.8,
    weeklyTransactionsChangePct: 9.4,
    weeklyVolumeChangePct: 7.1,
    successRateChangePct: 0.8,
  },
  {
    id: 'PM-004',
    name: 'Rocket',
    type: 'Mobile Wallet',
    icon: '🚀',
    iconBg:
      'bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400',
    provider: 'Rocket (DBBL)',
    providerLogo: '🚀',
    countries: ['Bangladesh'],
    countryCount: 1,
    currencies: ['BDT'],
    status: 'Active',
    transactions: 342680,
    transactionFeePct: 1.3,
    minTransaction: 10,
    maxTransaction: 40000,
    dailyLimit: 150000,
    limitCurrency: 'BDT',
    connectedOn: 'Feb 18, 2024 02:15 PM',
    weeklyTransactions: 28450,
    weeklyVolume: 52860000,
    weeklyVolumeCurrency: 'BDT',
    successRatePct: 96.9,
    weeklyTransactionsChangePct: 4.6,
    weeklyVolumeChangePct: 3.9,
    successRateChangePct: -0.3,
  },
  {
    id: 'PM-005',
    name: 'Cash Pickup (Agent)',
    type: 'Cash Pickup',
    icon: '👥',
    iconBg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    provider: 'Global Agent Network',
    providerLogo: '🌐',
    countries: [
      'Bangladesh',
      'Pakistan',
      'India',
      'Philippines',
      'Nigeria',
      'UAE',
      'Saudi Arabia',
      'Malaysia',
      'Nepal',
      'Sri Lanka',
      'Kenya',
      'Ghana',
    ],
    countryCount: 12,
    currencies: ['USD', 'EUR', 'BDT'],
    status: 'Active',
    transactions: 1123450,
    transactionFeePct: 2.0,
    minTransaction: 20,
    maxTransaction: 5000,
    dailyLimit: 50000,
    limitCurrency: 'USD',
    connectedOn: 'Jan 5, 2024 08:45 AM',
    weeklyTransactions: 96420,
    weeklyVolume: 18560000,
    weeklyVolumeCurrency: 'USD',
    successRatePct: 95.6,
    weeklyTransactionsChangePct: 6.8,
    weeklyVolumeChangePct: 5.2,
    successRateChangePct: 0.5,
  },
  {
    id: 'PM-006',
    name: 'Visa Card',
    type: 'Card Payments',
    icon: '💳',
    iconBg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    provider: 'Visa',
    providerLogo: '🔵',
    countries: ['United Kingdom', 'United States', 'Eurozone', 'UAE'],
    countryCount: 4,
    currencies: ['USD', 'EUR', 'GBP'],
    status: 'Active',
    transactions: 512410,
    transactionFeePct: 2.5,
    minTransaction: 10,
    maxTransaction: 25000,
    dailyLimit: 50000,
    limitCurrency: 'USD',
    connectedOn: 'Jan 8, 2024 01:00 PM',
    weeklyTransactions: 42850,
    weeklyVolume: 7856200,
    weeklyVolumeCurrency: 'USD',
    successRatePct: 97.4,
    weeklyTransactionsChangePct: 5.9,
    weeklyVolumeChangePct: 4.8,
    successRateChangePct: 0.6,
  },
  {
    id: 'PM-007',
    name: 'Mastercard',
    type: 'Card Payments',
    icon: '💳',
    iconBg:
      'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400',
    provider: 'Mastercard',
    providerLogo: '🟠',
    countries: ['United Kingdom', 'United States', 'Eurozone', 'UAE'],
    countryCount: 4,
    currencies: ['USD', 'EUR', 'GBP'],
    status: 'Active',
    transactions: 379240,
    transactionFeePct: 2.5,
    minTransaction: 10,
    maxTransaction: 25000,
    dailyLimit: 50000,
    limitCurrency: 'USD',
    connectedOn: 'Jan 8, 2024 01:10 PM',
    weeklyTransactions: 31250,
    weeklyVolume: 5642300,
    weeklyVolumeCurrency: 'USD',
    successRatePct: 96.8,
    weeklyTransactionsChangePct: 4.2,
    weeklyVolumeChangePct: 3.6,
    successRateChangePct: 0.3,
  },
  {
    id: 'PM-008',
    name: 'Bank of America Transfer',
    type: 'Bank Transfer',
    icon: '🏦',
    iconBg: 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
    provider: 'Bank of America',
    providerLogo: '🔷',
    countries: ['United States', 'Canada'],
    countryCount: 2,
    currencies: ['USD'],
    status: 'Inactive',
    transactions: 0,
    transactionFeePct: 0.6,
    minTransaction: 10,
    maxTransaction: 100000,
    dailyLimit: 200000,
    limitCurrency: 'USD',
    connectedOn: 'Mar 1, 2024 10:00 AM',
    weeklyTransactions: 0,
    weeklyVolume: 0,
    weeklyVolumeCurrency: 'USD',
    successRatePct: 0,
    weeklyTransactionsChangePct: 0,
    weeklyVolumeChangePct: 0,
    successRateChangePct: 0,
  },
  {
    id: 'PM-009',
    name: 'Barclays Transfer',
    type: 'Bank Transfer',
    icon: '🏦',
    iconBg: 'bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400',
    provider: 'Barclays',
    providerLogo: '🔵',
    countries: ['United Kingdom'],
    countryCount: 1,
    currencies: ['GBP'],
    status: 'Active',
    transactions: 186420,
    transactionFeePct: 0.45,
    minTransaction: 10,
    maxTransaction: 100000,
    dailyLimit: 250000,
    limitCurrency: 'GBP',
    connectedOn: 'Jan 12, 2024 09:30 AM',
    weeklyTransactions: 15420,
    weeklyVolume: 6842300,
    weeklyVolumeCurrency: 'GBP',
    successRatePct: 99.3,
    weeklyTransactionsChangePct: 7.1,
    weeklyVolumeChangePct: 5.9,
    successRateChangePct: 0.2,
  },
  {
    id: 'PM-010',
    name: 'Easypaisa',
    type: 'Mobile Wallet',
    icon: '📲',
    iconBg: 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400',
    provider: 'Telenor Microfinance Bank',
    providerLogo: '🟢',
    countries: ['Pakistan'],
    countryCount: 1,
    currencies: ['PKR'],
    status: 'Active',
    transactions: 425600,
    transactionFeePct: 1.4,
    minTransaction: 10,
    maxTransaction: 30000,
    dailyLimit: 120000,
    limitCurrency: 'PKR',
    connectedOn: 'Feb 22, 2024 03:30 PM',
    weeklyTransactions: 35840,
    weeklyVolume: 68420000,
    weeklyVolumeCurrency: 'PKR',
    successRatePct: 96.2,
    weeklyTransactionsChangePct: 5.4,
    weeklyVolumeChangePct: 4.1,
    successRateChangePct: -0.2,
  },
  {
    id: 'PM-011',
    name: 'GCash',
    type: 'Mobile Wallet',
    icon: '🔵',
    iconBg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    provider: 'Globe Fintech Innovations',
    providerLogo: '🔵',
    countries: ['Philippines'],
    countryCount: 1,
    currencies: ['PHP'],
    status: 'Active',
    transactions: 612400,
    transactionFeePct: 1.1,
    minTransaction: 10,
    maxTransaction: 50000,
    dailyLimit: 150000,
    limitCurrency: 'PHP',
    connectedOn: 'Jan 28, 2024 12:00 PM',
    weeklyTransactions: 52680,
    weeklyVolume: 48560000,
    weeklyVolumeCurrency: 'PHP',
    successRatePct: 97.9,
    weeklyTransactionsChangePct: 6.2,
    weeklyVolumeChangePct: 5.0,
    successRateChangePct: 0.5,
  },
  {
    id: 'PM-012',
    name: 'Cash Pickup (Western Union Partner)',
    type: 'Cash Pickup',
    icon: '👥',
    iconBg:
      'bg-yellow-50 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400',
    provider: 'Western Union Network',
    providerLogo: '🟡',
    countries: ['Nigeria', 'Ghana', 'Kenya'],
    countryCount: 3,
    currencies: ['NGN', 'GHS', 'KES'],
    status: 'Active',
    transactions: 286400,
    transactionFeePct: 2.2,
    minTransaction: 20,
    maxTransaction: 3000,
    dailyLimit: 30000,
    limitCurrency: 'USD',
    connectedOn: 'Mar 5, 2024 09:00 AM',
    weeklyTransactions: 24560,
    weeklyVolume: 4256000,
    weeklyVolumeCurrency: 'USD',
    successRatePct: 94.8,
    weeklyTransactionsChangePct: 3.8,
    weeklyVolumeChangePct: 2.9,
    successRateChangePct: -0.6,
  },
];

export const paymentMethodTypeOptions: PaymentMethodType[] = [
  'Bank Transfer',
  'Mobile Wallet',
  'Cash Pickup',
  'Card Payments',
];
export const paymentCountryOptions = [
  'All Countries',
  'Bangladesh',
  'Pakistan',
  'United Kingdom',
  'United States',
  'Philippines',
  'Nigeria',
  'UAE',
];
export const paymentCurrencyOptions = [
  'All Currencies',
  'GBP',
  'USD',
  'EUR',
  'BDT',
  'PKR',
  'PHP',
];
export const paymentStatusOptions = ['All Status', 'Active', 'Inactive'];

export const PAYMENT_TOTAL = 86;
export const PAYMENT_PAGE_SIZE = 8;

// cash pickup fake data

// ============ CASH PICKUP — DASHBOARD ============
export type CashPickupStatus =
  | 'Pending'
  | 'Approved'
  | 'Completed'
  | 'Cancelled';

export interface CashPickupRequest {
  id: string;
  senderName: string;
  recipientName: string;
  country: string;
  countryFlag: string;
  city: string;
  mobile: string;
  amount: number;
  currency: string;
  pickupDate: string;
  agentName: string;
  status: CashPickupStatus;
}

export interface ActivityFeedItem {
  id: string;
  type: 'created' | 'approved' | 'completed' | 'cancelled';
  title: string;
  subtitle: string;
  timeAgo: string;
}

export interface TopAgentThisWeek {
  name: string;
  initials: string;
  requests: number;
  barPct: number;
}

// ── Dashboard summary stats (with sparkline series) ──
export const cashPickupDashboardStats = {
  dateRangeLabel: 'May 6 - May 12, 2025',
  totalRequests: 1248,
  totalChangePct: 12.5,
  pendingRequests: 286,
  pendingChangePct: 8.3,
  approvedRequests: 452,
  approvedChangePct: 15.7,
  completedRequests: 428,
  completedChangePct: 10.2,
  cancelledRequests: 82,
  cancelledChangePct: 5.2,
};

export const cashPickupSparklines = {
  total: [1020, 1055, 1040, 1090, 1110, 1130, 1160, 1180, 1205, 1248],
  pending: [240, 255, 248, 260, 270, 265, 275, 280, 278, 286],
  approved: [360, 375, 368, 390, 400, 410, 420, 435, 440, 452],
  completed: [340, 350, 348, 365, 375, 385, 395, 405, 415, 428],
  cancelled: [70, 72, 75, 73, 78, 76, 80, 78, 81, 82],
};

// ── Request Summary donut (right sidebar top) ──
export const requestSummaryDonut = [
  { label: 'Pending', value: 286, pct: 22.9, color: '#f59e0b' },
  { label: 'Approved', value: 452, pct: 36.2, color: '#16a34a' },
  { label: 'Completed', value: 428, pct: 34.3, color: '#7c3aed' },
  { label: 'Cancelled', value: 82, pct: 6.6, color: '#ef4444' },
];
export const requestSummaryTotal = 1248;

// ── Today's Activity feed ──
export const todaysActivity: ActivityFeedItem[] = [
  {
    id: 'ACT-001',
    type: 'created',
    title: 'New Request',
    subtitle: 'TXN-2505124789 created',
    timeAgo: '2 min ago',
  },
  {
    id: 'ACT-002',
    type: 'approved',
    title: 'Request Approved',
    subtitle: 'TXN-2505124788 approved',
    timeAgo: '10 min ago',
  },
  {
    id: 'ACT-003',
    type: 'completed',
    title: 'Request Completed',
    subtitle: 'TXN-2505124787 completed',
    timeAgo: '25 min ago',
  },
  {
    id: 'ACT-004',
    type: 'cancelled',
    title: 'Request Cancelled',
    subtitle: 'TXN-2505124784 cancelled',
    timeAgo: '1 hour ago',
  },
];

// ── Top Agents (This Week) — shown on dashboard widget only ──
export const topAgentsThisWeek: TopAgentThisWeek[] = [
  { name: 'Abul Hasan', initials: 'AH', requests: 128, barPct: 100 },
  { name: 'Kamal Hossain', initials: 'KH', requests: 96, barPct: 75 },
  { name: 'Juan Dela Cruz', initials: 'JD', requests: 74, barPct: 58 },
  { name: 'Amit Kumar', initials: 'AK', requests: 58, barPct: 45 },
  { name: 'Rashed Alom', initials: 'RA', requests: 42, barPct: 33 },
];

// ── Requests Overview (weekly line chart) ──
export const requestsOverviewWeekly = {
  labels: ['May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'],
  values: [180, 205, 195, 230, 215, 260, 286],
  changePct: 12.5,
};

// ── Requests by Country (donut) ──
export const requestsByCountry = [
  { country: 'Bangladesh', value: 680, pct: 54.5, color: '#16a34a' },
  { country: 'Philippines', value: 220, pct: 17.6, color: '#3b82f6' },
  { country: 'India', value: 180, pct: 14.4, color: '#f59e0b' },
  { country: 'UAE', value: 96, pct: 7.7, color: '#7c3aed' },
  { country: 'Others', value: 72, pct: 5.8, color: '#ec4899' },
];
export const requestsByCountryTotal = 1248;

// ── Requests by Status (bar chart) ──
export const requestsByStatus = {
  labels: ['Pending', 'Approved', 'Completed', 'Cancelled'],
  values: [286, 452, 428, 82],
  colors: ['#f59e0b', '#16a34a', '#16a34a', '#ef4444'],
};

// ── Recent Pickup Requests (table) ──
export const recentPickupRequests: CashPickupRequest[] = [
  {
    id: 'TXN-2505124789',
    senderName: 'John Doe',
    recipientName: 'Rahim Uddin',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Dhaka',
    mobile: '+880 1712 345678',
    amount: 25000.0,
    currency: 'BDT',
    pickupDate: 'May 12, 2025',
    agentName: 'Abul Hasan',
    status: 'Pending',
  },
  {
    id: 'TXN-2505124788',
    senderName: 'Ahmed Khan',
    recipientName: 'Maria Santos',
    country: 'Philippines',
    countryFlag: '🇵🇭',
    city: 'Manila',
    mobile: '+63 917 123 4567',
    amount: 15000.0,
    currency: 'PHP',
    pickupDate: 'May 12, 2025',
    agentName: 'Juan Dela Cruz',
    status: 'Approved',
  },
  {
    id: 'TXN-2505124787',
    senderName: 'Rashid Ahmed',
    recipientName: 'Sabbir Hossain',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Chittagong',
    mobile: '+880 1812 345679',
    amount: 30000.0,
    currency: 'BDT',
    pickupDate: 'May 12, 2025',
    agentName: 'Kamal Hossain',
    status: 'Completed',
  },
  {
    id: 'TXN-2505124786',
    senderName: 'Imran Hossain',
    recipientName: 'Mohammad Ali',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Kolkata',
    mobile: '+91 98765 43210',
    amount: 12500.0,
    currency: 'INR',
    pickupDate: 'May 11, 2025',
    agentName: 'Amit Kumar',
    status: 'Completed',
  },
  {
    id: 'TXN-2505124785',
    senderName: 'Fatima Ali',
    recipientName: 'Arif Khan',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Sylhet',
    mobile: '+880 1912 345680',
    amount: 18000.0,
    currency: 'BDT',
    pickupDate: 'May 11, 2025',
    agentName: 'Abul Hasan',
    status: 'Pending',
  },
  {
    id: 'TXN-2505124784',
    senderName: 'David Wilson',
    recipientName: 'Nusrat Jahan',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Rajshahi',
    mobile: '+880 1612 345681',
    amount: 22000.0,
    currency: 'BDT',
    pickupDate: 'May 10, 2025',
    agentName: 'Kamal Hossain',
    status: 'Cancelled',
  },
  {
    id: 'TXN-2505124783',
    senderName: 'Sophia Martin',
    recipientName: 'Tanvir Hasan',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Barishal',
    mobile: '+880 1512 345682',
    amount: 28000.0,
    currency: 'BDT',
    pickupDate: 'May 10, 2025',
    agentName: 'Abul Hasan',
    status: 'Approved',
  },
  {
    id: 'TXN-2505124782',
    senderName: 'James Okafor',
    recipientName: 'Ibrahim Khalil',
    country: 'UAE',
    countryFlag: '🇦🇪',
    city: 'Dubai',
    mobile: '+971 50 123 4567',
    amount: 1200.0,
    currency: 'AED',
    pickupDate: 'May 9, 2025',
    agentName: 'Rashed Alom',
    status: 'Completed',
  },
];

export const cashPickupCountryOptions = [
  'All Countries',
  'Bangladesh',
  'Philippines',
  'India',
  'UAE',
];
export const cashPickupStatusOptions = [
  'All Status',
  'Pending',
  'Approved',
  'Completed',
  'Cancelled',
];
export const cashPickupAgentOptions = [
  'All Agents',
  'Abul Hasan',
  'Kamal Hossain',
  'Juan Dela Cruz',
  'Amit Kumar',
  'Rashed Alom',
];

export const CASH_PICKUP_TOTAL = 1248;
export const CASH_PICKUP_PAGE_SIZE = 8;

// cash pickup all requests data =>

// ============ CASH PICKUP — ALL REQUESTS ============

export const allPickupRequests: CashPickupRequest[] = [
  ...recentPickupRequests,
  {
    id: 'TXN-2505124781',
    senderName: 'Karim Hassan',
    recipientName: 'Rubel Hossain',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Khulna',
    mobile: '+880 1711 234567',
    amount: 16500.0,
    currency: 'BDT',
    pickupDate: 'May 9, 2025',
    agentName: 'Kamal Hossain',
    status: 'Completed',
  },
  {
    id: 'TXN-2505124780',
    senderName: 'Nadia Islam',
    recipientName: 'Selim Ahmed',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Dhaka',
    mobile: '+880 1811 234567',
    amount: 9800.0,
    currency: 'BDT',
    pickupDate: 'May 9, 2025',
    agentName: 'Abul Hasan',
    status: 'Pending',
  },
  {
    id: 'TXN-2505124779',
    senderName: 'Liza Fernandez',
    recipientName: 'Carlos Reyes',
    country: 'Philippines',
    countryFlag: '🇵🇭',
    city: 'Cebu',
    mobile: '+63 918 234 5678',
    amount: 8200.0,
    currency: 'PHP',
    pickupDate: 'May 8, 2025',
    agentName: 'Juan Dela Cruz',
    status: 'Approved',
  },
  {
    id: 'TXN-2505124778',
    senderName: 'Rajesh Mehta',
    recipientName: 'Sunita Sharma',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Mumbai',
    mobile: '+91 98123 45678',
    amount: 21000.0,
    currency: 'INR',
    pickupDate: 'May 8, 2025',
    agentName: 'Amit Kumar',
    status: 'Completed',
  },
  {
    id: 'TXN-2505124777',
    senderName: 'Mohammed Al-Rashid',
    recipientName: 'Hassan Al-Maktoum',
    country: 'UAE',
    countryFlag: '🇦🇪',
    city: 'Abu Dhabi',
    mobile: '+971 52 234 5678',
    amount: 2400.0,
    currency: 'AED',
    pickupDate: 'May 7, 2025',
    agentName: 'Rashed Alom',
    status: 'Cancelled',
  },
  {
    id: 'TXN-2505124776',
    senderName: 'Sumon Mia',
    recipientName: 'Roksana Begum',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Comilla',
    mobile: '+880 1911 234567',
    amount: 14200.0,
    currency: 'BDT',
    pickupDate: 'May 7, 2025',
    agentName: 'Kamal Hossain',
    status: 'Pending',
  },
  {
    id: 'TXN-2505124775',
    senderName: 'Maria Lopez',
    recipientName: 'Jose Santos',
    country: 'Philippines',
    countryFlag: '🇵🇭',
    city: 'Davao',
    mobile: '+63 920 345 6789',
    amount: 11500.0,
    currency: 'PHP',
    pickupDate: 'May 6, 2025',
    agentName: 'Juan Dela Cruz',
    status: 'Completed',
  },
  {
    id: 'TXN-2505124774',
    senderName: 'Priya Patel',
    recipientName: 'Ramesh Gupta',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Delhi',
    mobile: '+91 99887 65432',
    amount: 17800.0,
    currency: 'INR',
    pickupDate: 'May 6, 2025',
    agentName: 'Amit Kumar',
    status: 'Approved',
  },
  {
    id: 'TXN-2505124773',
    senderName: 'Ibrahim Khalil',
    recipientName: 'Omar Sheikh',
    country: 'UAE',
    countryFlag: '🇦🇪',
    city: 'Sharjah',
    mobile: '+971 56 345 6789',
    amount: 3200.0,
    currency: 'AED',
    pickupDate: 'May 5, 2025',
    agentName: 'Rashed Alom',
    status: 'Completed',
  },
  {
    id: 'TXN-2505124772',
    senderName: 'Habibur Rahman',
    recipientName: 'Jamal Uddin',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Rangpur',
    mobile: '+880 1612 345678',
    amount: 19500.0,
    currency: 'BDT',
    pickupDate: 'May 5, 2025',
    agentName: 'Abul Hasan',
    status: 'Pending',
  },
  {
    id: 'TXN-2505124771',
    senderName: 'Anita Cruz',
    recipientName: 'Mark Villanueva',
    country: 'Philippines',
    countryFlag: '🇵🇭',
    city: 'Quezon City',
    mobile: '+63 917 456 7890',
    amount: 6700.0,
    currency: 'PHP',
    pickupDate: 'May 4, 2025',
    agentName: 'Juan Dela Cruz',
    status: 'Cancelled',
  },
  {
    id: 'TXN-2505124770',
    senderName: 'Vikram Singh',
    recipientName: 'Anjali Verma',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Bangalore',
    mobile: '+91 90123 45678',
    amount: 24500.0,
    currency: 'INR',
    pickupDate: 'May 4, 2025',
    agentName: 'Amit Kumar',
    status: 'Approved',
  },
];

export const ALL_REQUESTS_TOTAL = 1248;
export const ALL_REQUESTS_PAGE_SIZE = 10;

// cash pickup pending requests

// ============ CASH PICKUP — PENDING REQUESTS ============
export type PendingPriority = 'High' | 'Normal';

export interface PendingPickupRequest extends CashPickupRequest {
  submittedAt: string;
  waitingMins: number;
  priority: PendingPriority;
}

// Pending-status requests with SLA tracking fields for the Pending Requests page.
export const pendingPickupRequests: PendingPickupRequest[] = [
  {
    id: 'TXN-2505124789',
    senderName: 'John Doe',
    recipientName: 'Rahim Uddin',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Dhaka',
    mobile: '+880 1712 345678',
    amount: 25000.0,
    currency: 'BDT',
    pickupDate: 'May 12, 2025',
    agentName: 'Abul Hasan',
    status: 'Pending',
    submittedAt: '2025-05-12T14:02:00',
    waitingMins: 28,
    priority: 'Normal',
  },
  {
    id: 'TXN-2505124785',
    senderName: 'Fatima Ali',
    recipientName: 'Arif Khan',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Sylhet',
    mobile: '+880 1912 345680',
    amount: 18000.0,
    currency: 'BDT',
    pickupDate: 'May 11, 2025',
    agentName: 'Abul Hasan',
    status: 'Pending',
    submittedAt: '2025-05-12T11:40:00',
    waitingMins: 110,
    priority: 'Normal',
  },
  {
    id: 'TXN-2505124780',
    senderName: 'Nadia Islam',
    recipientName: 'Selim Ahmed',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Dhaka',
    mobile: '+880 1811 234567',
    amount: 9800.0,
    currency: 'BDT',
    pickupDate: 'May 9, 2025',
    agentName: 'Abul Hasan',
    status: 'Pending',
    submittedAt: '2025-05-12T12:55:00',
    waitingMins: 55,
    priority: 'Normal',
  },
  {
    id: 'TXN-2505124776',
    senderName: 'Sumon Mia',
    recipientName: 'Roksana Begum',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Comilla',
    mobile: '+880 1911 234567',
    amount: 14200.0,
    currency: 'BDT',
    pickupDate: 'May 7, 2025',
    agentName: 'Kamal Hossain',
    status: 'Pending',
    submittedAt: '2025-05-12T10:10:00',
    waitingMins: 220,
    priority: 'High',
  },
  {
    id: 'TXN-2505124772',
    senderName: 'Habibur Rahman',
    recipientName: 'Jamal Uddin',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Rangpur',
    mobile: '+880 1612 345678',
    amount: 19500.0,
    currency: 'BDT',
    pickupDate: 'May 5, 2025',
    agentName: 'Abul Hasan',
    status: 'Pending',
    submittedAt: '2025-05-12T13:30:00',
    waitingMins: 40,
    priority: 'Normal',
  },
  {
    id: 'TXN-2505124762',
    senderName: 'Tariq Mahmud',
    recipientName: 'Ayesha Tariq',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Dhaka',
    mobile: '+880 1511 234567',
    amount: 32500.0,
    currency: 'BDT',
    pickupDate: 'May 12, 2025',
    agentName: 'Kamal Hossain',
    status: 'Pending',
    submittedAt: '2025-05-12T08:15:00',
    waitingMins: 315,
    priority: 'High',
  },
  {
    id: 'TXN-2505124758',
    senderName: 'Meera Pillai',
    recipientName: 'Vikram Singh',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Bangalore',
    mobile: '+91 90123 98765',
    amount: 28800.0,
    currency: 'INR',
    pickupDate: 'May 12, 2025',
    agentName: 'Amit Kumar',
    status: 'Pending',
    submittedAt: '2025-05-12T13:55:00',
    waitingMins: 15,
    priority: 'Normal',
  },
];

export const pendingStatsCashPickup = {
  totalPending: 286,
  highPriority: 18,
  avgWaitMins: 64,
  oldestWaitMins: 315,
};

// ============ CASH PICKUP — APPROVED REQUESTS ============
export interface ApprovedPickupRequest extends CashPickupRequest {
  approvedBy: string;
  approvedAt: string;
  scheduledPickupDate: string;
}

export const approvedPickupRequests: ApprovedPickupRequest[] = [
  {
    id: 'TXN-2505124788',
    senderName: 'Ahmed Khan',
    recipientName: 'Maria Santos',
    country: 'Philippines',
    countryFlag: '🇵🇭',
    city: 'Manila',
    mobile: '+63 917 123 4567',
    amount: 15000.0,
    currency: 'PHP',
    pickupDate: 'May 12, 2025',
    agentName: 'Juan Dela Cruz',
    status: 'Approved',
    approvedBy: 'Sarah Johnson',
    approvedAt: '2025-05-12T10:15:00',
    scheduledPickupDate: 'May 13, 2025',
  },
  {
    id: 'TXN-2505124783',
    senderName: 'Sophia Martin',
    recipientName: 'Tanvir Hasan',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Barishal',
    mobile: '+880 1512 345682',
    amount: 28000.0,
    currency: 'BDT',
    pickupDate: 'May 10, 2025',
    agentName: 'Abul Hasan',
    status: 'Approved',
    approvedBy: 'Ahmed Khan',
    approvedAt: '2025-05-11T09:30:00',
    scheduledPickupDate: 'May 12, 2025',
  },
  {
    id: 'TXN-2505124779',
    senderName: 'Liza Fernandez',
    recipientName: 'Carlos Reyes',
    country: 'Philippines',
    countryFlag: '🇵🇭',
    city: 'Cebu',
    mobile: '+63 918 234 5678',
    amount: 8200.0,
    currency: 'PHP',
    pickupDate: 'May 8, 2025',
    agentName: 'Juan Dela Cruz',
    status: 'Approved',
    approvedBy: 'Sarah Johnson',
    approvedAt: '2025-05-08T14:05:00',
    scheduledPickupDate: 'May 9, 2025',
  },
  {
    id: 'TXN-2505124774',
    senderName: 'Priya Patel',
    recipientName: 'Ramesh Gupta',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Delhi',
    mobile: '+91 99887 65432',
    amount: 17800.0,
    currency: 'INR',
    pickupDate: 'May 6, 2025',
    agentName: 'Amit Kumar',
    status: 'Approved',
    approvedBy: 'Imran Hossain',
    approvedAt: '2025-05-06T11:20:00',
    scheduledPickupDate: 'May 7, 2025',
  },
  {
    id: 'TXN-2505124770',
    senderName: 'Vikram Singh',
    recipientName: 'Anjali Verma',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Bangalore',
    mobile: '+91 90123 45678',
    amount: 24500.0,
    currency: 'INR',
    pickupDate: 'May 4, 2025',
    agentName: 'Amit Kumar',
    status: 'Approved',
    approvedBy: 'Sarah Johnson',
    approvedAt: '2025-05-04T16:40:00',
    scheduledPickupDate: 'May 5, 2025',
  },
];

export const approvedStatsCashPickup = {
  totalApproved: 452,
  scheduledToday: 38,
  awaitingPickup: 64,
  avgApprovalMins: 22,
};

// ============ CASH PICKUP — COMPLETED REQUESTS ============
export interface CompletedPickupRequest extends CashPickupRequest {
  completedAt: string;
  receiptId: string;
  collectedBy: string;
}

export const completedPickupRequests: CompletedPickupRequest[] = [
  {
    id: 'TXN-2505124787',
    senderName: 'Rashid Ahmed',
    recipientName: 'Sabbir Hossain',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Chittagong',
    mobile: '+880 1812 345679',
    amount: 30000.0,
    currency: 'BDT',
    pickupDate: 'May 12, 2025',
    agentName: 'Kamal Hossain',
    status: 'Completed',
    completedAt: '2025-05-12T11:05:00',
    receiptId: 'RCP-2505124787',
    collectedBy: 'Sabbir Hossain',
  },
  {
    id: 'TXN-2505124786',
    senderName: 'Imran Hossain',
    recipientName: 'Mohammad Ali',
    country: 'India',
    countryFlag: '🇮🇳',
    city: 'Kolkata',
    mobile: '+91 98765 43210',
    amount: 12500.0,
    currency: 'INR',
    pickupDate: 'May 11, 2025',
    agentName: 'Amit Kumar',
    status: 'Completed',
    completedAt: '2025-05-11T15:30:00',
    receiptId: 'RCP-2505124786',
    collectedBy: 'Mohammad Ali',
  },
  {
    id: 'TXN-2505124782',
    senderName: 'James Okafor',
    recipientName: 'Ibrahim Khalil',
    country: 'UAE',
    countryFlag: '🇦🇪',
    city: 'Dubai',
    mobile: '+971 50 123 4567',
    amount: 1200.0,
    currency: 'AED',
    pickupDate: 'May 9, 2025',
    agentName: 'Rashed Alom',
    status: 'Completed',
    completedAt: '2025-05-09T13:45:00',
    receiptId: 'RCP-2505124782',
    collectedBy: 'Ibrahim Khalil',
  },
  {
    id: 'TXN-2505124781',
    senderName: 'Karim Hassan',
    recipientName: 'Rubel Hossain',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Khulna',
    mobile: '+880 1711 234567',
    amount: 16500.0,
    currency: 'BDT',
    pickupDate: 'May 9, 2025',
    agentName: 'Kamal Hossain',
    status: 'Completed',
    completedAt: '2025-05-09T10:20:00',
    receiptId: 'RCP-2505124781',
    collectedBy: 'Rubel Hossain',
  },
  {
    id: 'TXN-2505124775',
    senderName: 'Maria Lopez',
    recipientName: 'Jose Santos',
    country: 'Philippines',
    countryFlag: '🇵🇭',
    city: 'Davao',
    mobile: '+63 920 345 6789',
    amount: 11500.0,
    currency: 'PHP',
    pickupDate: 'May 6, 2025',
    agentName: 'Juan Dela Cruz',
    status: 'Completed',
    completedAt: '2025-05-06T17:10:00',
    receiptId: 'RCP-2505124775',
    collectedBy: 'Jose Santos',
  },
  {
    id: 'TXN-2505124773',
    senderName: 'Ibrahim Khalil',
    recipientName: 'Omar Sheikh',
    country: 'UAE',
    countryFlag: '🇦🇪',
    city: 'Sharjah',
    mobile: '+971 56 345 6789',
    amount: 3200.0,
    currency: 'AED',
    pickupDate: 'May 5, 2025',
    agentName: 'Rashed Alom',
    status: 'Completed',
    completedAt: '2025-05-05T12:00:00',
    receiptId: 'RCP-2505124773',
    collectedBy: 'Omar Sheikh',
  },
];

export const completedStatsCashPickup = {
  totalCompleted: 428,
  totalVolumeBDT: 5860400,
  avgCompletionMins: 18,
  successRatePct: 98.4,
};

// ============ CASH PICKUP — CANCELLED REQUESTS ============
export type CancelReason =
  | 'Customer Request'
  | 'KYC Failed'
  | 'Duplicate Request'
  | 'Incorrect Details'
  | 'Fraud Suspected'
  | 'Agent Unavailable';

export type PickupRefundStatus = 'Not Applicable' | 'Pending' | 'Refunded';

export interface CancelledPickupRequest extends CashPickupRequest {
  cancelledBy: string;
  cancelledAt: string;
  cancelReason: CancelReason;
  refundStatus: PickupRefundStatus;
}

export const cancelledPickupRequests: CancelledPickupRequest[] = [
  {
    id: 'TXN-2505124784',
    senderName: 'David Wilson',
    recipientName: 'Nusrat Jahan',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Rajshahi',
    mobile: '+880 1612 345681',
    amount: 22000.0,
    currency: 'BDT',
    pickupDate: 'May 10, 2025',
    agentName: 'Kamal Hossain',
    status: 'Cancelled',
    cancelledBy: 'Sarah Johnson',
    cancelledAt: '2025-05-10T14:20:00',
    cancelReason: 'KYC Failed',
    refundStatus: 'Refunded',
  },
  {
    id: 'TXN-2505124777',
    senderName: 'Mohammed Al-Rashid',
    recipientName: 'Hassan Al-Maktoum',
    country: 'UAE',
    countryFlag: '🇦🇪',
    city: 'Abu Dhabi',
    mobile: '+971 52 234 5678',
    amount: 2400.0,
    currency: 'AED',
    pickupDate: 'May 7, 2025',
    agentName: 'Rashed Alom',
    status: 'Cancelled',
    cancelledBy: 'Imran Hossain',
    cancelledAt: '2025-05-07T11:35:00',
    cancelReason: 'Fraud Suspected',
    refundStatus: 'Pending',
  },
  {
    id: 'TXN-2505124771',
    senderName: 'Anita Cruz',
    recipientName: 'Mark Villanueva',
    country: 'Philippines',
    countryFlag: '🇵🇭',
    city: 'Quezon City',
    mobile: '+63 917 456 7890',
    amount: 6700.0,
    currency: 'PHP',
    pickupDate: 'May 4, 2025',
    agentName: 'Juan Dela Cruz',
    status: 'Cancelled',
    cancelledBy: 'Customer',
    cancelledAt: '2025-05-04T09:50:00',
    cancelReason: 'Customer Request',
    refundStatus: 'Refunded',
  },
  {
    id: 'TXN-2505124768',
    senderName: 'Hina Qureshi',
    recipientName: 'Babul Akter',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Sylhet',
    mobile: '+880 1811 666555',
    amount: 18900.0,
    currency: 'BDT',
    pickupDate: 'May 3, 2025',
    agentName: 'Abul Hasan',
    status: 'Cancelled',
    cancelledBy: 'Sarah Johnson',
    cancelledAt: '2025-05-03T16:05:00',
    cancelReason: 'Duplicate Request',
    refundStatus: 'Refunded',
  },
  {
    id: 'TXN-2505124759',
    senderName: 'Robert Kim',
    recipientName: 'Arifa Khatun',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Dhaka',
    mobile: '+880 1511 555444',
    amount: 8400.0,
    currency: 'BDT',
    pickupDate: 'May 1, 2025',
    agentName: 'Kamal Hossain',
    status: 'Cancelled',
    cancelledBy: 'Ahmed Khan',
    cancelledAt: '2025-05-01T10:15:00',
    cancelReason: 'Incorrect Details',
    refundStatus: 'Refunded',
  },
  {
    id: 'TXN-2505124751',
    senderName: 'Tomás García',
    recipientName: 'Nasim Uddin',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    city: 'Dhaka',
    mobile: '+880 1511 444333',
    amount: 51200.0,
    currency: 'BDT',
    pickupDate: 'Apr 28, 2025',
    agentName: 'Abul Hasan',
    status: 'Cancelled',
    cancelledBy: 'System',
    cancelledAt: '2025-04-28T19:40:00',
    cancelReason: 'Agent Unavailable',
    refundStatus: 'Pending',
  },
];

export const cancelledStatsCashPickup = {
  totalCancelled: 82,
  cancellationRatePct: 6.6,
  topReason: 'KYC Failed',
  refundsPending: 14,
};

export const cancelReasonOptions: CancelReason[] = [
  'Customer Request',
  'KYC Failed',
  'Duplicate Request',
  'Incorrect Details',
  'Fraud Suspected',
  'Agent Unavailable',
];

// management fake data

// ============ MANAGEMENT OVERVIEW ============
export interface ManagementCategoryStat {
  key: 'countries' | 'agents' | 'rates' | 'fees';
  title: string;
  icon: string;
  iconBg: string;
  value: number;
  subLabel: string;
  status: 'Active' | 'Inactive';
  metricA: { label: string; value: number };
  metricB: { label: string; value: number };
}

export const managementCategoryStats: ManagementCategoryStat[] = [
  {
    key: 'countries',
    title: 'Countries & Corridors',
    icon: '🌐',
    iconBg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    value: 45,
    subLabel: 'Active Countries',
    status: 'Active',
    metricA: { label: 'Countries', value: 28 },
    metricB: { label: 'Corridors', value: 128 },
  },
  {
    key: 'agents',
    title: 'Agents & Branches',
    icon: '👥',
    iconBg:
      'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
    value: 214,
    subLabel: 'Active Agents',
    status: 'Active',
    metricA: { label: 'Agents', value: 88 },
    metricB: { label: 'Branches', value: 326 },
  },
  {
    key: 'rates',
    title: 'Exchange Rates',
    icon: '💲',
    iconBg:
      'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
    value: 58,
    subLabel: 'Currency Pairs',
    status: 'Active',
    metricA: { label: 'Auto Update', value: 12 },
    metricB: { label: 'Manual Override', value: 8 },
  },
  {
    key: 'fees',
    title: 'Fees & Charges',
    icon: '💳',
    iconBg: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
    value: 36,
    subLabel: 'Active Fee Rules',
    status: 'Active',
    metricA: { label: 'Corridor Fees', value: 18 },
    metricB: { label: 'Promotions', value: 15 },
  },
];

export const managementDateRangeLabel = 'May 6 - May 12, 2025';

// ── Popular Corridors ──
export const popularCorridorsManagement = [
  {
    sendingCountry: 'United Kingdom',
    sendingFlag: '🇬🇧',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'GBP → BDT',
    transactions: 12458,
    status: 'Active',
  },
  {
    sendingCountry: 'United States',
    sendingFlag: '🇺🇸',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'USD → BDT',
    transactions: 18256,
    status: 'Active',
  },
  {
    sendingCountry: 'Canada',
    sendingFlag: '🇨🇦',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'CAD → BDT',
    transactions: 2145,
    status: 'Active',
  },
  {
    sendingCountry: 'Australia',
    sendingFlag: '🇦🇺',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'AUD → BDT',
    transactions: 1987,
    status: 'Active',
  },
  {
    sendingCountry: 'Malaysia',
    sendingFlag: '🇲🇾',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'MYR → BDT',
    transactions: 1254,
    status: 'Active',
  },
];

// ── Country Distribution (by region) ──
export const countryDistributionByRegion = [
  { region: 'Asia', countries: 16, pct: 36 },
  { region: 'Europe', countries: 14, pct: 31 },
  { region: 'North America', countries: 7, pct: 16 },
  { region: 'Oceania', countries: 4, pct: 9 },
  { region: 'Others', countries: 4, pct: 8 },
];

// ── Country Map Points (for the interactive world distribution map) ──
// x,y are positioned on a 1000x500 stylized world map viewBox.
export const countryMapPoints = [
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    x: 478,
    y: 118,
    transactions: 12458,
    region: 'Europe',
  },
  {
    name: 'United States',
    flag: '🇺🇸',
    x: 225,
    y: 165,
    transactions: 18256,
    region: 'North America',
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    x: 230,
    y: 95,
    transactions: 2145,
    region: 'North America',
  },
  {
    name: 'Bangladesh',
    flag: '🇧🇩',
    x: 728,
    y: 228,
    transactions: 24580,
    region: 'Asia',
  },
  {
    name: 'India',
    flag: '🇮🇳',
    x: 695,
    y: 232,
    transactions: 9840,
    region: 'Asia',
  },
  {
    name: 'Pakistan',
    flag: '🇵🇰',
    x: 672,
    y: 212,
    transactions: 5230,
    region: 'Asia',
  },
  {
    name: 'Malaysia',
    flag: '🇲🇾',
    x: 738,
    y: 282,
    transactions: 1254,
    region: 'Asia',
  },
  {
    name: 'Philippines',
    flag: '🇵🇭',
    x: 788,
    y: 258,
    transactions: 3420,
    region: 'Asia',
  },
  {
    name: 'UAE',
    flag: '🇦🇪',
    x: 618,
    y: 218,
    transactions: 4180,
    region: 'Asia',
  },
  {
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    x: 598,
    y: 212,
    transactions: 2860,
    region: 'Asia',
  },
  {
    name: 'Nigeria',
    flag: '🇳🇬',
    x: 498,
    y: 278,
    transactions: 1620,
    region: 'Others',
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    x: 828,
    y: 388,
    transactions: 1987,
    region: 'Oceania',
  },
];

// ── Top Agents (By Transactions) ──
export const topAgentsManagement = [
  {
    agentName: 'BRAC Bank',
    transactions: 12458,
    volume: 245680,
    volumeCurrency: '£',
  },
  {
    agentName: 'Eastern Bank Ltd.',
    transactions: 9254,
    volume: 185420,
    volumeCurrency: '£',
  },
  {
    agentName: 'Islami Bank',
    transactions: 6985,
    volume: 125780,
    volumeCurrency: '£',
  },
  {
    agentName: 'City Bank',
    transactions: 5421,
    volume: 98450,
    volumeCurrency: '£',
  },
  { agentName: 'DBBL', transactions: 4125, volume: 78650, volumeCurrency: '£' },
];

// ── Recent Exchange Rates (management widget) ──
export const recentExchangeRatesManagement = [
  {
    from: 'GBP',
    to: 'BDT',
    buyRate: 165.25,
    sellRate: 165.95,
    updated: '2 min ago',
  },
  {
    from: 'USD',
    to: 'BDT',
    buyRate: 122.25,
    sellRate: 122.85,
    updated: '2 min ago',
  },
  {
    from: 'EUR',
    to: 'BDT',
    buyRate: 134.55,
    sellRate: 135.18,
    updated: '2 min ago',
  },
  {
    from: 'CAD',
    to: 'BDT',
    buyRate: 88.12,
    sellRate: 88.52,
    updated: '5 min ago',
  },
  {
    from: 'AUD',
    to: 'BDT',
    buyRate: 79.85,
    sellRate: 80.25,
    updated: '5 min ago',
  },
];

// ── Active Fees (management widget) ──
export const activeFeesManagement = [
  { corridor: 'UK → Bangladesh', feeType: 'Fixed', charge: '£3.00' },
  { corridor: 'UK → Bangladesh', feeType: '%', charge: '1.50%' },
  { corridor: 'USA → Bangladesh', feeType: 'Fixed', charge: '$2.99' },
  { corridor: 'USA → Bangladesh', feeType: '%', charge: '1.25%' },
  { corridor: 'Canada → Bangladesh', feeType: 'Fixed', charge: 'C$2.50' },
];

// ── Branch Status Overview ──
export const branchStatusOverview = [
  { status: 'Active', branches: 256, pct: 78.52, color: '#16a34a' },
  { status: 'Inactive', branches: 48, pct: 14.72, color: '#f59e0b' },
  { status: 'Maintenance', branches: 15, pct: 4.6, color: '#3b82f6' },
  { status: 'Closed', branches: 7, pct: 2.15, color: '#ef4444' },
];

// ── Quick Actions (management) ──
export const managementQuickActions = [
  {
    label: 'Add Country',
    icon: '🌐',
    color: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
  },
  {
    label: 'Add Corridor',
    icon: '🔁',
    color:
      'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
  },
  {
    label: 'Add Agent',
    icon: '👤',
    color:
      'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
  },
  {
    label: 'Add Branch',
    icon: '🏦',
    color: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
  },
  {
    label: 'Add Exchange Rate',
    icon: '💲',
    color: 'bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400',
  },
  {
    label: 'Add Fee Rule',
    icon: '🧾',
    color: 'bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400',
  },
];

// ── Permissions by Role ──
export const permissionsByRole = [
  {
    role: 'Super Admin',
    pct: 100,
    color: '#3b82f6',
    description: 'All Permissions',
  },
  {
    role: 'Operations Manager',
    pct: 70,
    color: '#f59e0b',
    description: 'Countries, Agents, Rates',
  },
  {
    role: 'Finance Manager',
    pct: 55,
    color: '#22c55e',
    description: 'Rates, Fees & Charges',
  },
  {
    role: 'Branch Manager',
    pct: 35,
    color: '#8b5cf6',
    description: 'Branch Operations',
  },
];

// ── System Summary ──
export const managementSystemSummary = {
  totalUsers: 142,
  activeUsers: 98,
  totalRoles: 6,
  systemStatus: 'Healthy' as const,
};

// ============ MANAGEMENT — COUNTRIES & CORRIDORS ============
export type CountryStatus = 'Active' | 'Inactive';
export type CorridorStatusMgmt = 'Active' | 'Inactive' | 'Suspended';

export interface ManagedCountry {
  id: string;
  name: string;
  flag: string;
  region:
    | 'Asia'
    | 'Europe'
    | 'North America'
    | 'South America'
    | 'Africa'
    | 'Oceania';
  currency: string;
  corridorCount: number;
  status: CountryStatus;
  addedOn: string;
}

export interface ManagedCorridor {
  id: string;
  sendingCountry: string;
  sendingFlag: string;
  receivingCountry: string;
  receivingFlag: string;
  currencyPair: string;
  transactions: number;
  volume: number;
  volumeCurrency: string;
  feeRulesCount: number;
  status: CorridorStatusMgmt;
}

// ── Stats ──
export const countriesCorridorsStats = {
  totalCountries: 28,
  activeCountries: 26,
  totalCorridors: 128,
  activeCorridors: 119,
};

// ── Countries ──
export const managedCountries: ManagedCountry[] = [
  {
    id: 'CTY-001',
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Europe',
    currency: 'GBP',
    corridorCount: 18,
    status: 'Active',
    addedOn: 'Jan 10, 2023',
  },
  {
    id: 'CTY-002',
    name: 'United States',
    flag: '🇺🇸',
    region: 'North America',
    currency: 'USD',
    corridorCount: 22,
    status: 'Active',
    addedOn: 'Jan 10, 2023',
  },
  {
    id: 'CTY-003',
    name: 'Bangladesh',
    flag: '🇧🇩',
    region: 'Asia',
    currency: 'BDT',
    corridorCount: 24,
    status: 'Active',
    addedOn: 'Jan 10, 2023',
  },
  {
    id: 'CTY-004',
    name: 'Canada',
    flag: '🇨🇦',
    region: 'North America',
    currency: 'CAD',
    corridorCount: 9,
    status: 'Active',
    addedOn: 'Feb 14, 2023',
  },
  {
    id: 'CTY-005',
    name: 'Australia',
    flag: '🇦🇺',
    region: 'Oceania',
    currency: 'AUD',
    corridorCount: 6,
    status: 'Active',
    addedOn: 'Mar 2, 2023',
  },
  {
    id: 'CTY-006',
    name: 'Malaysia',
    flag: '🇲🇾',
    region: 'Asia',
    currency: 'MYR',
    corridorCount: 5,
    status: 'Active',
    addedOn: 'Mar 20, 2023',
  },
  {
    id: 'CTY-007',
    name: 'India',
    flag: '🇮🇳',
    region: 'Asia',
    currency: 'INR',
    corridorCount: 11,
    status: 'Active',
    addedOn: 'Apr 5, 2023',
  },
  {
    id: 'CTY-008',
    name: 'Pakistan',
    flag: '🇵🇰',
    region: 'Asia',
    currency: 'PKR',
    corridorCount: 8,
    status: 'Active',
    addedOn: 'Apr 18, 2023',
  },
  {
    id: 'CTY-009',
    name: 'UAE',
    flag: '🇦🇪',
    region: 'Asia',
    currency: 'AED',
    corridorCount: 10,
    status: 'Active',
    addedOn: 'May 1, 2023',
  },
  {
    id: 'CTY-010',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    region: 'Asia',
    currency: 'SAR',
    corridorCount: 7,
    status: 'Active',
    addedOn: 'May 22, 2023',
  },
  {
    id: 'CTY-011',
    name: 'Philippines',
    flag: '🇵🇭',
    region: 'Asia',
    currency: 'PHP',
    corridorCount: 6,
    status: 'Active',
    addedOn: 'Jun 8, 2023',
  },
  {
    id: 'CTY-012',
    name: 'Nigeria',
    flag: '🇳🇬',
    region: 'Africa',
    currency: 'NGN',
    corridorCount: 4,
    status: 'Active',
    addedOn: 'Jun 30, 2023',
  },
  {
    id: 'CTY-013',
    name: 'Germany',
    flag: '🇩🇪',
    region: 'Europe',
    currency: 'EUR',
    corridorCount: 5,
    status: 'Active',
    addedOn: 'Jul 15, 2023',
  },
  {
    id: 'CTY-014',
    name: 'France',
    flag: '🇫🇷',
    region: 'Europe',
    currency: 'EUR',
    corridorCount: 3,
    status: 'Inactive',
    addedOn: 'Aug 2, 2023',
  },
  {
    id: 'CTY-015',
    name: 'Qatar',
    flag: '🇶🇦',
    region: 'Asia',
    currency: 'QAR',
    corridorCount: 2,
    status: 'Inactive',
    addedOn: 'Sep 10, 2023',
  },
];

// ── Corridors ──
export const managedCorridors: ManagedCorridor[] = [
  {
    id: 'COR-101',
    sendingCountry: 'United Kingdom',
    sendingFlag: '🇬🇧',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'GBP → BDT',
    transactions: 12458,
    volume: 4256780,
    volumeCurrency: '£',
    feeRulesCount: 2,
    status: 'Active',
  },
  {
    id: 'COR-102',
    sendingCountry: 'United States',
    sendingFlag: '🇺🇸',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'USD → BDT',
    transactions: 18256,
    volume: 5856230,
    volumeCurrency: '$',
    feeRulesCount: 2,
    status: 'Active',
  },
  {
    id: 'COR-103',
    sendingCountry: 'Canada',
    sendingFlag: '🇨🇦',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'CAD → BDT',
    transactions: 2145,
    volume: 856230,
    volumeCurrency: 'C$',
    feeRulesCount: 1,
    status: 'Active',
  },
  {
    id: 'COR-104',
    sendingCountry: 'Australia',
    sendingFlag: '🇦🇺',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'AUD → BDT',
    transactions: 1987,
    volume: 685200,
    volumeCurrency: 'A$',
    feeRulesCount: 1,
    status: 'Active',
  },
  {
    id: 'COR-105',
    sendingCountry: 'Malaysia',
    sendingFlag: '🇲🇾',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'MYR → BDT',
    transactions: 1254,
    volume: 425600,
    volumeCurrency: 'RM',
    feeRulesCount: 1,
    status: 'Active',
  },
  {
    id: 'COR-106',
    sendingCountry: 'United Kingdom',
    sendingFlag: '🇬🇧',
    receivingCountry: 'Pakistan',
    receivingFlag: '🇵🇰',
    currencyPair: 'GBP → PKR',
    transactions: 4180,
    volume: 1256400,
    volumeCurrency: '£',
    feeRulesCount: 2,
    status: 'Active',
  },
  {
    id: 'COR-107',
    sendingCountry: 'UAE',
    sendingFlag: '🇦🇪',
    receivingCountry: 'Pakistan',
    receivingFlag: '🇵🇰',
    currencyPair: 'AED → PKR',
    transactions: 2856,
    volume: 985600,
    volumeCurrency: 'AED',
    feeRulesCount: 1,
    status: 'Active',
  },
  {
    id: 'COR-108',
    sendingCountry: 'United Kingdom',
    sendingFlag: '🇬🇧',
    receivingCountry: 'India',
    receivingFlag: '🇮🇳',
    currencyPair: 'GBP → INR',
    transactions: 5230,
    volume: 1685400,
    volumeCurrency: '£',
    feeRulesCount: 2,
    status: 'Active',
  },
  {
    id: 'COR-109',
    sendingCountry: 'Saudi Arabia',
    sendingFlag: '🇸🇦',
    receivingCountry: 'India',
    receivingFlag: '🇮🇳',
    currencyPair: 'SAR → INR',
    transactions: 2145,
    volume: 685200,
    volumeCurrency: 'SAR',
    feeRulesCount: 1,
    status: 'Active',
  },
  {
    id: 'COR-110',
    sendingCountry: 'United States',
    sendingFlag: '🇺🇸',
    receivingCountry: 'Philippines',
    receivingFlag: '🇵🇭',
    currencyPair: 'USD → PHP',
    transactions: 3420,
    volume: 985600,
    volumeCurrency: '$',
    feeRulesCount: 1,
    status: 'Active',
  },
  {
    id: 'COR-111',
    sendingCountry: 'United Kingdom',
    sendingFlag: '🇬🇧',
    receivingCountry: 'Nigeria',
    receivingFlag: '🇳🇬',
    currencyPair: 'GBP → NGN',
    transactions: 1620,
    volume: 425800,
    volumeCurrency: '£',
    feeRulesCount: 1,
    status: 'Suspended',
  },
  {
    id: 'COR-112',
    sendingCountry: 'Germany',
    sendingFlag: '🇩🇪',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'EUR → BDT',
    transactions: 856,
    volume: 285600,
    volumeCurrency: '€',
    feeRulesCount: 1,
    status: 'Active',
  },
  {
    id: 'COR-113',
    sendingCountry: 'France',
    sendingFlag: '🇫🇷',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'EUR → BDT',
    transactions: 320,
    volume: 98500,
    volumeCurrency: '€',
    feeRulesCount: 1,
    status: 'Inactive',
  },
  {
    id: 'COR-114',
    sendingCountry: 'Qatar',
    sendingFlag: '🇶🇦',
    receivingCountry: 'Bangladesh',
    receivingFlag: '🇧🇩',
    currencyPair: 'QAR → BDT',
    transactions: 145,
    volume: 45200,
    volumeCurrency: 'QAR',
    feeRulesCount: 1,
    status: 'Inactive',
  },
];

export const regionOptions = [
  'All Regions',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Africa',
  'Oceania',
];

// ============ MANAGEMENT — AGENTS & BRANCHES ============
export type ManagedAgentStatus = 'Active' | 'Inactive' | 'Suspended';
export type ManagedBranchStatus =
  | 'Active'
  | 'Inactive'
  | 'Maintenance'
  | 'Closed';
export type BranchType = 'Main' | 'Sub Branch' | 'Partner';

export interface ManagedAgent {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  country: string;
  flag: string;
  status: ManagedAgentStatus;
  commissionRatePct: number;
  totalTransactions: number;
  volume: number;
  volumeCurrency: string;
  joinedDate: string;
}

export interface ManagedBranch {
  id: string;
  name: string;
  code: string;
  country: string;
  flag: string;
  city: string;
  manager: string;
  type: BranchType;
  agentsCount: number;
  status: ManagedBranchStatus;
  openedDate: string;
}

// ── Stats ──
export const agentsBranchesStats = {
  totalAgents: 88,
  activeAgents: 79,
  totalBranches: 326,
  activeBranches: 256,
};

// ── Agents ──
export const managedAgents: ManagedAgent[] = [
  {
    id: 'AGT-001',
    name: 'BRAC Bank',
    email: 'agent@bracbank.com',
    phone: '+880 2 9844080',
    branch: 'Dhanmondi Branch',
    country: 'Bangladesh',
    flag: '🇧🇩',
    status: 'Active',
    commissionRatePct: 1.2,
    totalTransactions: 12458,
    volume: 245680,
    volumeCurrency: '£',
    joinedDate: 'Jan 10, 2023',
  },
  {
    id: 'AGT-002',
    name: 'Eastern Bank Ltd.',
    email: 'agent@ebl.com',
    phone: '+880 2 9883301',
    branch: 'Gulshan Branch',
    country: 'Bangladesh',
    flag: '🇧🇩',
    status: 'Active',
    commissionRatePct: 1.1,
    totalTransactions: 9254,
    volume: 185420,
    volumeCurrency: '£',
    joinedDate: 'Feb 14, 2023',
  },
  {
    id: 'AGT-003',
    name: 'Islami Bank',
    email: 'agent@islamibank.com',
    phone: '+880 2 9560099',
    branch: 'Motijheel Branch',
    country: 'Bangladesh',
    flag: '🇧🇩',
    status: 'Active',
    commissionRatePct: 1.0,
    totalTransactions: 6985,
    volume: 125780,
    volumeCurrency: '£',
    joinedDate: 'Mar 2, 2023',
  },
  {
    id: 'AGT-004',
    name: 'City Bank',
    email: 'agent@citybank.com',
    phone: '+880 2 9667444',
    branch: 'Uttara Branch',
    country: 'Bangladesh',
    flag: '🇧🇩',
    status: 'Active',
    commissionRatePct: 1.0,
    totalTransactions: 5421,
    volume: 98450,
    volumeCurrency: '£',
    joinedDate: 'Mar 20, 2023',
  },
  {
    id: 'AGT-005',
    name: 'DBBL',
    email: 'agent@dbbl.com',
    phone: '+880 2 9883301',
    branch: 'Banani Branch',
    country: 'Bangladesh',
    flag: '🇧🇩',
    status: 'Active',
    commissionRatePct: 0.9,
    totalTransactions: 4125,
    volume: 78650,
    volumeCurrency: '£',
    joinedDate: 'Apr 5, 2023',
  },
  {
    id: 'AGT-006',
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@agent.com',
    phone: '+63 917 123 4567',
    branch: 'Manila Branch',
    country: 'Philippines',
    flag: '🇵🇭',
    status: 'Active',
    commissionRatePct: 1.3,
    totalTransactions: 3845,
    volume: 56200,
    volumeCurrency: '£',
    joinedDate: 'Apr 18, 2023',
  },
  {
    id: 'AGT-007',
    name: 'Amit Kumar',
    email: 'amit.kumar@agent.com',
    phone: '+91 98765 43210',
    branch: 'Mumbai Branch',
    country: 'India',
    flag: '🇮🇳',
    status: 'Active',
    commissionRatePct: 1.1,
    totalTransactions: 3210,
    volume: 48500,
    volumeCurrency: '£',
    joinedDate: 'May 1, 2023',
  },
  {
    id: 'AGT-008',
    name: 'Rashed Alom',
    email: 'rashed.alom@agent.com',
    phone: '+971 50 123 4567',
    branch: 'Dubai Branch',
    country: 'UAE',
    flag: '🇦🇪',
    status: 'Active',
    commissionRatePct: 1.4,
    totalTransactions: 2856,
    volume: 42100,
    volumeCurrency: '£',
    joinedDate: 'May 22, 2023',
  },
  {
    id: 'AGT-009',
    name: 'Kamal Hossain',
    email: 'kamal.hossain@agent.com',
    phone: '+880 1812 345679',
    branch: 'Chittagong Branch',
    country: 'Bangladesh',
    flag: '🇧🇩',
    status: 'Suspended',
    commissionRatePct: 1.0,
    totalTransactions: 1250,
    volume: 18600,
    volumeCurrency: '£',
    joinedDate: 'Jun 8, 2023',
  },
  {
    id: 'AGT-010',
    name: 'Abul Hasan',
    email: 'abul.hasan@agent.com',
    phone: '+880 1711 234567',
    branch: 'Sylhet Branch',
    country: 'Bangladesh',
    flag: '🇧🇩',
    status: 'Active',
    commissionRatePct: 1.0,
    totalTransactions: 2845,
    volume: 36400,
    volumeCurrency: '£',
    joinedDate: 'Jun 30, 2023',
  },
  {
    id: 'AGT-011',
    name: 'Hassan Travels Agency',
    email: 'contact@hassantravels.com',
    phone: '+966 55 123 4567',
    branch: 'Riyadh Branch',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    status: 'Inactive',
    commissionRatePct: 0.8,
    totalTransactions: 420,
    volume: 8200,
    volumeCurrency: '£',
    joinedDate: 'Jul 15, 2023',
  },
  {
    id: 'AGT-012',
    name: 'Global Exchange Co.',
    email: 'info@globalexchange.com',
    phone: '+60 12 345 6789',
    branch: 'Kuala Lumpur Branch',
    country: 'Malaysia',
    flag: '🇲🇾',
    status: 'Active',
    commissionRatePct: 1.2,
    totalTransactions: 1654,
    volume: 24800,
    volumeCurrency: '£',
    joinedDate: 'Aug 2, 2023',
  },
];

// ── Branches ──
export const managedBranches: ManagedBranch[] = [
  {
    id: 'BRN-001',
    name: 'Dhanmondi Branch',
    code: 'DHK-001',
    country: 'Bangladesh',
    flag: '🇧🇩',
    city: 'Dhaka',
    manager: 'Nasreen Akter',
    type: 'Main',
    agentsCount: 12,
    status: 'Active',
    openedDate: 'Jan 10, 2023',
  },
  {
    id: 'BRN-002',
    name: 'Gulshan Branch',
    code: 'DHK-002',
    country: 'Bangladesh',
    flag: '🇧🇩',
    city: 'Dhaka',
    manager: 'Tariq Mahmud',
    type: 'Sub Branch',
    agentsCount: 9,
    status: 'Active',
    openedDate: 'Feb 14, 2023',
  },
  {
    id: 'BRN-003',
    name: 'Motijheel Branch',
    code: 'DHK-003',
    country: 'Bangladesh',
    flag: '🇧🇩',
    city: 'Dhaka',
    manager: 'Sadia Rahman',
    type: 'Sub Branch',
    agentsCount: 8,
    status: 'Active',
    openedDate: 'Mar 2, 2023',
  },
  {
    id: 'BRN-004',
    name: 'Chittagong Branch',
    code: 'CTG-001',
    country: 'Bangladesh',
    flag: '🇧🇩',
    city: 'Chittagong',
    manager: 'Imran Khan',
    type: 'Main',
    agentsCount: 10,
    status: 'Active',
    openedDate: 'Mar 20, 2023',
  },
  {
    id: 'BRN-005',
    name: 'Sylhet Branch',
    code: 'SYL-001',
    country: 'Bangladesh',
    flag: '🇧🇩',
    city: 'Sylhet',
    manager: 'Mitu Akter',
    type: 'Sub Branch',
    agentsCount: 6,
    status: 'Active',
    openedDate: 'Apr 5, 2023',
  },
  {
    id: 'BRN-006',
    name: 'Manila Branch',
    code: 'MNL-001',
    country: 'Philippines',
    flag: '🇵🇭',
    city: 'Manila',
    manager: 'Maria Santos',
    type: 'Main',
    agentsCount: 7,
    status: 'Active',
    openedDate: 'Apr 18, 2023',
  },
  {
    id: 'BRN-007',
    name: 'Mumbai Branch',
    code: 'MUM-001',
    country: 'India',
    flag: '🇮🇳',
    city: 'Mumbai',
    manager: 'Rajesh Mehta',
    type: 'Main',
    agentsCount: 8,
    status: 'Active',
    openedDate: 'May 1, 2023',
  },
  {
    id: 'BRN-008',
    name: 'Dubai Branch',
    code: 'DXB-001',
    country: 'UAE',
    flag: '🇦🇪',
    city: 'Dubai',
    manager: 'Ibrahim Khalil',
    type: 'Main',
    agentsCount: 5,
    status: 'Active',
    openedDate: 'May 22, 2023',
  },
  {
    id: 'BRN-009',
    name: 'Riyadh Branch',
    code: 'RUH-001',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    city: 'Riyadh',
    manager: 'Omar Sheikh',
    type: 'Partner',
    agentsCount: 3,
    status: 'Maintenance',
    openedDate: 'Jun 8, 2023',
  },
  {
    id: 'BRN-010',
    name: 'Kuala Lumpur Branch',
    code: 'KUL-001',
    country: 'Malaysia',
    flag: '🇲🇾',
    city: 'Kuala Lumpur',
    manager: 'Siti Aisyah',
    type: 'Partner',
    agentsCount: 4,
    status: 'Active',
    openedDate: 'Jun 30, 2023',
  },
  {
    id: 'BRN-011',
    name: 'Khulna Branch',
    code: 'KHL-001',
    country: 'Bangladesh',
    flag: '🇧🇩',
    city: 'Khulna',
    manager: 'Rubel Hossain',
    type: 'Sub Branch',
    agentsCount: 4,
    status: 'Inactive',
    openedDate: 'Jul 15, 2023',
  },
  {
    id: 'BRN-012',
    name: 'Rajshahi Branch',
    code: 'RAJ-001',
    country: 'Bangladesh',
    flag: '🇧🇩',
    city: 'Rajshahi',
    manager: 'Nusrat Jahan',
    type: 'Sub Branch',
    agentsCount: 3,
    status: 'Closed',
    openedDate: 'Aug 2, 2023',
  },
];

export const agentStatusOptions = [
  'All Status',
  'Active',
  'Inactive',
  'Suspended',
];
export const branchStatusOptionsManagement = [
  'All Status',
  'Active',
  'Inactive',
  'Maintenance',
  'Closed',
];
export const branchTypeOptions = ['Main', 'Sub Branch', 'Partner'];

// ============ MANAGEMENT — FEES & CHARGES ============
export type FeeRuleStatus = 'Active' | 'Inactive';
export type FeeChargeType = 'Fixed' | 'Percentage';
export type PromotionStatus = 'Active' | 'Scheduled' | 'Expired';

export interface ManagedFeeRule {
  id: string;
  corridor: string;
  sendingFlag: string;
  receivingFlag: string;
  chargeType: FeeChargeType;
  amount: number;
  currency: string;
  minFee: number;
  maxFee: number;
  status: FeeRuleStatus;
  updatedOn: string;
}

export interface ManagedPromotion {
  id: string;
  title: string;
  description: string;
  discountPct: number;
  corridor: string;
  startDate: string;
  endDate: string;
  usageCount: number;
  usageLimit: number;
  status: PromotionStatus;
}

// ── Stats ──
export const feesChargesStats = {
  totalFeeRules: 36,
  activeFeeRules: 30,
  corridorFees: 18,
  promotions: 15,
};

// ── Fee Rules ──
export const managedFeeRules: ManagedFeeRule[] = [
  {
    id: 'FEE-001',
    corridor: 'UK → Bangladesh',
    sendingFlag: '🇬🇧',
    receivingFlag: '🇧🇩',
    chargeType: 'Fixed',
    amount: 3.0,
    currency: 'GBP',
    minFee: 3.0,
    maxFee: 3.0,
    status: 'Active',
    updatedOn: 'May 10, 2025',
  },
  {
    id: 'FEE-002',
    corridor: 'UK → Bangladesh',
    sendingFlag: '🇬🇧',
    receivingFlag: '🇧🇩',
    chargeType: 'Percentage',
    amount: 1.5,
    currency: 'GBP',
    minFee: 1.0,
    maxFee: 25.0,
    status: 'Active',
    updatedOn: 'May 10, 2025',
  },
  {
    id: 'FEE-003',
    corridor: 'USA → Bangladesh',
    sendingFlag: '🇺🇸',
    receivingFlag: '🇧🇩',
    chargeType: 'Fixed',
    amount: 2.99,
    currency: 'USD',
    minFee: 2.99,
    maxFee: 2.99,
    status: 'Active',
    updatedOn: 'May 9, 2025',
  },
  {
    id: 'FEE-004',
    corridor: 'USA → Bangladesh',
    sendingFlag: '🇺🇸',
    receivingFlag: '🇧🇩',
    chargeType: 'Percentage',
    amount: 1.25,
    currency: 'USD',
    minFee: 1.0,
    maxFee: 20.0,
    status: 'Active',
    updatedOn: 'May 9, 2025',
  },
  {
    id: 'FEE-005',
    corridor: 'Canada → Bangladesh',
    sendingFlag: '🇨🇦',
    receivingFlag: '🇧🇩',
    chargeType: 'Fixed',
    amount: 2.5,
    currency: 'CAD',
    minFee: 2.5,
    maxFee: 2.5,
    status: 'Active',
    updatedOn: 'May 8, 2025',
  },
  {
    id: 'FEE-006',
    corridor: 'UK → Pakistan',
    sendingFlag: '🇬🇧',
    receivingFlag: '🇵🇰',
    chargeType: 'Fixed',
    amount: 3.5,
    currency: 'GBP',
    minFee: 3.5,
    maxFee: 3.5,
    status: 'Active',
    updatedOn: 'May 7, 2025',
  },
  {
    id: 'FEE-007',
    corridor: 'UAE → Pakistan',
    sendingFlag: '🇦🇪',
    receivingFlag: '🇵🇰',
    chargeType: 'Percentage',
    amount: 1.8,
    currency: 'AED',
    minFee: 5.0,
    maxFee: 40.0,
    status: 'Active',
    updatedOn: 'May 6, 2025',
  },
  {
    id: 'FEE-008',
    corridor: 'UK → India',
    sendingFlag: '🇬🇧',
    receivingFlag: '🇮🇳',
    chargeType: 'Fixed',
    amount: 3.2,
    currency: 'GBP',
    minFee: 3.2,
    maxFee: 3.2,
    status: 'Active',
    updatedOn: 'May 5, 2025',
  },
  {
    id: 'FEE-009',
    corridor: 'Saudi Arabia → India',
    sendingFlag: '🇸🇦',
    receivingFlag: '🇮🇳',
    chargeType: 'Percentage',
    amount: 1.6,
    currency: 'SAR',
    minFee: 4.0,
    maxFee: 35.0,
    status: 'Active',
    updatedOn: 'May 4, 2025',
  },
  {
    id: 'FEE-010',
    corridor: 'USA → Philippines',
    sendingFlag: '🇺🇸',
    receivingFlag: '🇵🇭',
    chargeType: 'Fixed',
    amount: 2.75,
    currency: 'USD',
    minFee: 2.75,
    maxFee: 2.75,
    status: 'Active',
    updatedOn: 'May 3, 2025',
  },
  {
    id: 'FEE-011',
    corridor: 'UK → Nigeria',
    sendingFlag: '🇬🇧',
    receivingFlag: '🇳🇬',
    chargeType: 'Percentage',
    amount: 2.0,
    currency: 'GBP',
    minFee: 3.0,
    maxFee: 30.0,
    status: 'Inactive',
    updatedOn: 'Apr 28, 2025',
  },
  {
    id: 'FEE-012',
    corridor: 'Germany → Bangladesh',
    sendingFlag: '🇩🇪',
    receivingFlag: '🇧🇩',
    chargeType: 'Fixed',
    amount: 3.0,
    currency: 'EUR',
    minFee: 3.0,
    maxFee: 3.0,
    status: 'Active',
    updatedOn: 'Apr 25, 2025',
  },
];

// ── Promotions ──
export const managedPromotions: ManagedPromotion[] = [
  {
    id: 'PRM-001',
    title: 'Eid Special — Zero Fee',
    description: 'Zero transfer fee for all UK to Bangladesh transfers',
    discountPct: 100,
    corridor: 'UK → Bangladesh',
    startDate: 'May 1, 2025',
    endDate: 'May 15, 2025',
    usageCount: 8420,
    usageLimit: 10000,
    status: 'Active',
  },
  {
    id: 'PRM-002',
    title: 'New Customer Discount',
    description: '50% off transfer fee for first-time senders',
    discountPct: 50,
    corridor: 'All Corridors',
    startDate: 'Apr 1, 2025',
    endDate: 'Jun 30, 2025',
    usageCount: 1245,
    usageLimit: 5000,
    status: 'Active',
  },
  {
    id: 'PRM-003',
    title: 'Weekend Cashback',
    discountPct: 20,
    description: '20% fee cashback on weekend transfers',
    corridor: 'USA → Bangladesh',
    startDate: 'May 3, 2025',
    endDate: 'May 31, 2025',
    usageCount: 856,
    usageLimit: 2000,
    status: 'Active',
  },
  {
    id: 'PRM-004',
    title: 'Summer Send Bonus',
    description: '15% discount for transfers above £500',
    discountPct: 15,
    corridor: 'UK → India',
    startDate: 'Jun 1, 2025',
    endDate: 'Aug 31, 2025',
    usageCount: 0,
    usageLimit: 3000,
    status: 'Scheduled',
  },
  {
    id: 'PRM-005',
    title: 'Ramadan Fee Waiver',
    description: 'Fee waived for all Pakistan corridors',
    discountPct: 100,
    corridor: 'UK → Pakistan',
    startDate: 'Feb 28, 2025',
    endDate: 'Mar 30, 2025',
    usageCount: 4280,
    usageLimit: 4280,
    status: 'Expired',
  },
  {
    id: 'PRM-006',
    title: 'Loyalty Reward Tier 2',
    description: '10% discount for Gold tier customers',
    discountPct: 10,
    corridor: 'All Corridors',
    startDate: 'Jan 1, 2025',
    endDate: 'Dec 31, 2025',
    usageCount: 2150,
    usageLimit: 20000,
    status: 'Active',
  },
];

export const feeRuleStatusOptions = ['All Status', 'Active', 'Inactive'];
export const promotionStatusOptions = [
  'All Status',
  'Active',
  'Scheduled',
  'Expired',
];
export const feeChargeTypeOptions: FeeChargeType[] = ['Fixed', 'Percentage'];

// agent data

// ============ AGENTS & PARTNERS — AGENT LIST ============
export type PartnerAgentStatus = 'Active' | 'Pending' | 'Inactive';

export interface PartnerAgent {
  id: string;
  code: string;
  name: string;
  country: string;
  flag: string;
  contact: string;
  status: PartnerAgentStatus;
  totalVolume: number;
  transactions: number;
  commission: number;
}

export interface TopPerformingAgent {
  rank: number;
  name: string;
  code: string;
  avatarColor: string;
  volume: number;
  changePct: number;
}

export interface AgentActivityItem {
  id: string;
  type: 'approved' | 'volume' | 'commission' | 'document' | 'branch';
  text: string;
  timeAgo: string;
}

// ── Header stats ──
export const agentPartnerStats = {
  dateRangeLabel: 'May 19, 2025 - May 19, 2025',
  totalAgents: 245,
  totalAgentsChangeNote: '+18 this month',
  activeAgents: 198,
  activeAgentsPctOfTotal: 80.8,
  totalTransactions: 12540,
  totalTransactionsChangePct: 24.5,
  totalVolume: 4850000,
  totalVolumeChangePct: 28.3,
  totalCommission: 128450,
  totalCommissionChangePct: 19.6,
};

// ── Agent List table ──
export const partnerAgents: PartnerAgent[] = [
  {
    id: 'AGT-1001',
    code: 'AGT-1001',
    name: 'Rahman Global Services',
    country: 'Bangladesh',
    flag: '🇧🇩',
    contact: '+880 1712 345678',
    status: 'Active',
    totalVolume: 620450,
    transactions: 1254,
    commission: 15512,
  },
  {
    id: 'AGT-1002',
    code: 'AGT-1002',
    name: 'Quick Remit UK',
    country: 'United Kingdom',
    flag: '🇬🇧',
    contact: '+44 7700 900123',
    status: 'Active',
    totalVolume: 512300,
    transactions: 985,
    commission: 12805,
  },
  {
    id: 'AGT-1003',
    code: 'AGT-1003',
    name: 'Trust Transfer Ltd.',
    country: 'United Kingdom',
    flag: '🇬🇧',
    contact: '+44 7700 900124',
    status: 'Active',
    totalVolume: 398750,
    transactions: 754,
    commission: 9968,
  },
  {
    id: 'AGT-1004',
    code: 'AGT-1004',
    name: 'Green World Remit',
    country: 'Pakistan',
    flag: '🇵🇰',
    contact: '+92 300 1234567',
    status: 'Active',
    totalVolume: 284600,
    transactions: 612,
    commission: 7115,
  },
  {
    id: 'AGT-1005',
    code: 'AGT-1005',
    name: 'Skyline Transfers',
    country: 'India',
    flag: '🇮🇳',
    contact: '+91 98765 43210',
    status: 'Active',
    totalVolume: 245300,
    transactions: 498,
    commission: 6132,
  },
  {
    id: 'AGT-1006',
    code: 'AGT-1006',
    name: 'Bismillah Exchange',
    country: 'Bangladesh',
    flag: '🇧🇩',
    contact: '+880 1687 654321',
    status: 'Pending',
    totalVolume: 142200,
    transactions: 320,
    commission: 3550,
  },
  {
    id: 'AGT-1007',
    code: 'AGT-1007',
    name: 'Secure Remit BD',
    country: 'Bangladesh',
    flag: '🇧🇩',
    contact: '+880 1555 667788',
    status: 'Inactive',
    totalVolume: 98450,
    transactions: 210,
    commission: 2461,
  },
  {
    id: 'AGT-1008',
    code: 'AGT-1008',
    name: 'Remit Expert',
    country: 'United Kingdom',
    flag: '🇬🇧',
    contact: '+44 7700 900125',
    status: 'Active',
    totalVolume: 85600,
    transactions: 168,
    commission: 2140,
  },
  {
    id: 'AGT-1009',
    code: 'AGT-1009',
    name: 'Horizon Money Transfer',
    country: 'UAE',
    flag: '🇦🇪',
    contact: '+971 50 123 4567',
    status: 'Active',
    totalVolume: 156800,
    transactions: 342,
    commission: 3920,
  },
  {
    id: 'AGT-1010',
    code: 'AGT-1010',
    name: 'Asia Pacific Exchange',
    country: 'Malaysia',
    flag: '🇲🇾',
    contact: '+60 12 345 6789',
    status: 'Active',
    totalVolume: 112400,
    transactions: 256,
    commission: 2810,
  },
  {
    id: 'AGT-1011',
    code: 'AGT-1011',
    name: 'Continental Transfers',
    country: 'Philippines',
    flag: '🇵🇭',
    contact: '+63 917 123 4567',
    status: 'Pending',
    totalVolume: 64200,
    transactions: 145,
    commission: 1605,
  },
  {
    id: 'AGT-1012',
    code: 'AGT-1012',
    name: 'Reliable Money Services',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    contact: '+966 55 123 4567',
    status: 'Active',
    totalVolume: 189500,
    transactions: 410,
    commission: 4738,
  },
];

// ── Top Performing Agents (sidebar widget) ──
export const topPerformingAgents: TopPerformingAgent[] = [
  {
    rank: 1,
    name: 'Rahman Global Services',
    code: 'AGT-1001',
    avatarColor: 'bg-orange-500',
    volume: 620450,
    changePct: 32.5,
    id: '',
    ticketsResolved: 0,
    maxScale: 0,
  },
  {
    rank: 2,
    name: 'Quick Remit UK',
    code: 'AGT-1002',
    avatarColor: 'bg-gray-400',
    volume: 512300,
    changePct: 20.1,
    id: '',
    ticketsResolved: 0,
    maxScale: 0,
  },
  {
    rank: 3,
    name: 'Trust Transfer Ltd.',
    code: 'AGT-1003',
    avatarColor: 'bg-amber-700',
    volume: 398750,
    changePct: 24.7,
    id: '',
    ticketsResolved: 0,
    maxScale: 0,
  },
  {
    rank: 4,
    name: 'Green World Remit',
    code: 'AGT-1004',
    avatarColor: 'bg-blue-600',
    volume: 284600,
    changePct: 18.9,
    id: '',
    ticketsResolved: 0,
    maxScale: 0,
  },
  {
    rank: 5,
    name: 'Skyline Transfers',
    code: 'AGT-1005',
    avatarColor: 'bg-blue-900',
    volume: 245300,
    changePct: 15.3,
    id: '',
    ticketsResolved: 0,
    maxScale: 0,
  },
];

// ── Recent Activities (sidebar widget) ──
export const agentRecentActivities: AgentActivityItem[] = [
  {
    id: 'ACT-1',
    type: 'approved',
    text: 'New agent Rahman Global Services has been approved',
    timeAgo: '2 hours ago',
  },
  {
    id: 'ACT-2',
    type: 'volume',
    text: 'Quick Remit UK completed £512,300 volume',
    timeAgo: '5 hours ago',
  },
  {
    id: 'ACT-3',
    type: 'commission',
    text: 'Commission of £2,450 paid to Trust Transfer Ltd.',
    timeAgo: '1 day ago',
  },
  {
    id: 'ACT-4',
    type: 'document',
    text: 'Agent Green World Remit updated their documents',
    timeAgo: '2 days ago',
  },
  {
    id: 'ACT-5',
    type: 'branch',
    text: 'New branch added by Skyline Transfers',
    timeAgo: '2 days ago',
  },
];

// ── Volume Overview (bottom-left line chart) ──
export const agentVolumeOverview = {
  labels: [
    'May 13',
    'May 14',
    'May 15',
    'May 16',
    'May 17',
    'May 18',
    'May 19',
  ],
  values: [420000, 680000, 710000, 980000, 860000, 1080000, 950000],
};

// ── Commission Overview (bottom-middle donut) ──
export const commissionOverview = {
  total: 128450,
  paid: 98750,
  paidPct: 76.9,
  pending: 29700,
  pendingPct: 23.1,
};

// ── Agent Status (bottom-right donut) ──
export const agentStatusOverview = {
  total: 245,
  active: 198,
  activePct: 80.8,
  pending: 32,
  pendingPct: 13.1,
  inactive: 15,
  inactivePct: 6.1,
};

export const agentCountryOptionsPartner = [
  'All Countries',
  'Bangladesh',
  'United Kingdom',
  'Pakistan',
  'India',
  'UAE',
  'Malaysia',
  'Philippines',
  'Saudi Arabia',
];
export const agentStatusOptionsPartner = [
  'All Status',
  'Active',
  'Pending',
  'Inactive',
];

// ============ AGENTS & PARTNERS — INLINE TAB DATA ============
// Used by the Agent List page's in-page tabs (Branches / Partner List / Commission)

export interface AgentBranchRow {
  id: string;
  name: string;
  code: string;
  country: string;
  flag: string;
  manager: string;
  agentsCount: number;
  status: 'Active' | 'Inactive';
}

export interface PartnerRow {
  id: string;
  name: string;
  type: 'Bank' | 'Mobile Wallet' | 'Money Transfer Operator' | 'Aggregator';
  country: string;
  flag: string;
  commissionRatePct: number;
  status: 'Active' | 'Pending' | 'Inactive';
}

export interface CommissionRow {
  id: string;
  agentName: string;
  agentCode: string;
  period: string;
  volume: number;
  ratePct: number;
  commission: number;
  status: 'Paid' | 'Pending';
}

export const agentBranches: AgentBranchRow[] = [
  {
    id: 'BR-01',
    name: 'Dhaka Main Branch',
    code: 'DHK-001',
    country: 'Bangladesh',
    flag: '🇧🇩',
    manager: 'Nasreen Akter',
    agentsCount: 24,
    status: 'Active',
  },
  {
    id: 'BR-02',
    name: 'London Branch',
    code: 'LDN-001',
    country: 'United Kingdom',
    flag: '🇬🇧',
    manager: 'James Wilson',
    agentsCount: 18,
    status: 'Active',
  },
  {
    id: 'BR-03',
    name: 'Karachi Branch',
    code: 'KHI-001',
    country: 'Pakistan',
    flag: '🇵🇰',
    manager: 'Ahsan Raza',
    agentsCount: 12,
    status: 'Active',
  },
  {
    id: 'BR-04',
    name: 'Mumbai Branch',
    code: 'MUM-001',
    country: 'India',
    flag: '🇮🇳',
    manager: 'Rajesh Mehta',
    agentsCount: 10,
    status: 'Active',
  },
  {
    id: 'BR-05',
    name: 'Chittagong Branch',
    code: 'CTG-001',
    country: 'Bangladesh',
    flag: '🇧🇩',
    manager: 'Imran Khan',
    agentsCount: 8,
    status: 'Inactive',
  },
];

export const agentPartnersList: PartnerRow[] = [
  {
    id: 'PTR-01',
    name: 'BRAC Bank',
    type: 'Bank',
    country: 'Bangladesh',
    flag: '🇧🇩',
    commissionRatePct: 1.2,
    status: 'Active',
  },
  {
    id: 'PTR-02',
    name: 'bKash',
    type: 'Mobile Wallet',
    country: 'Bangladesh',
    flag: '🇧🇩',
    commissionRatePct: 1.5,
    status: 'Active',
  },
  {
    id: 'PTR-03',
    name: 'Western Union',
    type: 'Money Transfer Operator',
    country: 'United States',
    flag: '🇺🇸',
    commissionRatePct: 0.9,
    status: 'Active',
  },
  {
    id: 'PTR-04',
    name: 'Wise',
    type: 'Aggregator',
    country: 'United Kingdom',
    flag: '🇬🇧',
    commissionRatePct: 0.7,
    status: 'Pending',
  },
  {
    id: 'PTR-05',
    name: 'Easypaisa',
    type: 'Mobile Wallet',
    country: 'Pakistan',
    flag: '🇵🇰',
    commissionRatePct: 1.4,
    status: 'Active',
  },
];

export const agentCommissionRows: CommissionRow[] = [
  {
    id: 'CMS-01',
    agentName: 'Rahman Global Services',
    agentCode: 'AGT-1001',
    period: 'May 2025',
    volume: 620450,
    ratePct: 2.5,
    commission: 15512,
    status: 'Paid',
  },
  {
    id: 'CMS-02',
    agentName: 'Quick Remit UK',
    agentCode: 'AGT-1002',
    period: 'May 2025',
    volume: 512300,
    ratePct: 2.5,
    commission: 12805,
    status: 'Paid',
  },
  {
    id: 'CMS-03',
    agentName: 'Trust Transfer Ltd.',
    agentCode: 'AGT-1003',
    period: 'May 2025',
    volume: 398750,
    ratePct: 2.5,
    commission: 9968,
    status: 'Pending',
  },
  {
    id: 'CMS-04',
    agentName: 'Green World Remit',
    agentCode: 'AGT-1004',
    period: 'May 2025',
    volume: 284600,
    ratePct: 2.5,
    commission: 7115,
    status: 'Pending',
  },
  {
    id: 'CMS-05',
    agentName: 'Skyline Transfers',
    agentCode: 'AGT-1005',
    period: 'May 2025',
    volume: 245300,
    ratePct: 2.5,
    commission: 6132,
    status: 'Paid',
  },
];

// ============ AGENTS & PARTNERS — BRANCHES (standalone page) ============
export type PartnerBranchStatus = 'Active' | 'Inactive' | 'Maintenance';
export type PartnerBranchType = 'Main Branch' | 'Sub Branch' | 'Partner Branch';

export interface PartnerBranch {
  id: string;
  name: string;
  code: string;
  country: string;
  flag: string;
  city: string;
  address: string;
  manager: string;
  managerPhone: string;
  type: PartnerBranchType;
  agentsCount: number;
  monthlyVolume: number;
  volumeCurrency: string;
  status: PartnerBranchStatus;
  openedDate: string;
}

// ── Stats ──
export const partnerBranchesStats = {
  totalBranches: 326,
  activeBranches: 256,
  totalCountries: 18,
  totalMonthlyVolume: 8560400,
};

// ── Branches ──
export const partnerBranches: PartnerBranch[] = [
  {
    id: 'PBR-001',
    name: 'Dhaka Main Branch',
    code: 'DHK-001',
    country: 'Bangladesh',
    flag: '🇧🇩',
    city: 'Dhaka',
    address: 'House 12, Road 5, Dhanmondi',
    manager: 'Nasreen Akter',
    managerPhone: '+880 1712 111222',
    type: 'Main Branch',
    agentsCount: 24,
    monthlyVolume: 1856400,
    volumeCurrency: '£',
    status: 'Active',
    openedDate: 'Jan 10, 2023',
  },
  {
    id: 'PBR-002',
    name: 'London Branch',
    code: 'LDN-001',
    country: 'United Kingdom',
    flag: '🇬🇧',
    city: 'London',
    address: '14 Baker Street, Marylebone',
    manager: 'James Wilson',
    managerPhone: '+44 7700 900100',
    type: 'Main Branch',
    agentsCount: 18,
    monthlyVolume: 2456800,
    volumeCurrency: '£',
    status: 'Active',
    openedDate: 'Feb 14, 2023',
  },
  {
    id: 'PBR-003',
    name: 'Karachi Branch',
    code: 'KHI-001',
    country: 'Pakistan',
    flag: '🇵🇰',
    city: 'Karachi',
    address: 'Gulshan-e-Iqbal Block 7',
    manager: 'Ahsan Raza',
    managerPhone: '+92 300 1112223',
    type: 'Main Branch',
    agentsCount: 12,
    monthlyVolume: 985600,
    volumeCurrency: '£',
    status: 'Active',
    openedDate: 'Mar 2, 2023',
  },
  {
    id: 'PBR-004',
    name: 'Mumbai Branch',
    code: 'MUM-001',
    country: 'India',
    flag: '🇮🇳',
    city: 'Mumbai',
    address: 'Bandra West, Mumbai 400050',
    manager: 'Rajesh Mehta',
    managerPhone: '+91 98765 11122',
    type: 'Main Branch',
    agentsCount: 10,
    monthlyVolume: 765200,
    volumeCurrency: '£',
    status: 'Active',
    openedDate: 'Mar 20, 2023',
  },
  {
    id: 'PBR-005',
    name: 'Chittagong Branch',
    code: 'CTG-001',
    country: 'Bangladesh',
    flag: '🇧🇩',
    city: 'Chittagong',
    address: 'Agrabad Commercial Area',
    manager: 'Imran Khan',
    managerPhone: '+880 1812 111333',
    type: 'Sub Branch',
    agentsCount: 8,
    monthlyVolume: 425600,
    volumeCurrency: '£',
    status: 'Active',
    openedDate: 'Apr 5, 2023',
  },
  {
    id: 'PBR-006',
    name: 'Gulshan Branch',
    code: 'DHK-002',
    country: 'Bangladesh',
    flag: '🇧🇩',
    city: 'Dhaka',
    address: 'Gulshan Avenue, Dhaka 1212',
    manager: 'Tariq Mahmud',
    managerPhone: '+880 1912 222444',
    type: 'Sub Branch',
    agentsCount: 9,
    monthlyVolume: 512300,
    volumeCurrency: '£',
    status: 'Active',
    openedDate: 'Apr 18, 2023',
  },
  {
    id: 'PBR-007',
    name: 'Manchester Branch',
    code: 'MAN-001',
    country: 'United Kingdom',
    flag: '🇬🇧',
    city: 'Manchester',
    address: 'Market Street, Manchester',
    manager: 'Sophie Clark',
    managerPhone: '+44 7700 900200',
    type: 'Sub Branch',
    agentsCount: 6,
    monthlyVolume: 386700,
    volumeCurrency: '£',
    status: 'Active',
    openedDate: 'May 1, 2023',
  },
  {
    id: 'PBR-008',
    name: 'Dubai Branch',
    code: 'DXB-001',
    country: 'UAE',
    flag: '🇦🇪',
    city: 'Dubai',
    address: 'Al Barsha 1, Dubai',
    manager: 'Ibrahim Khalil',
    managerPhone: '+971 50 111 2233',
    type: 'Partner Branch',
    agentsCount: 5,
    monthlyVolume: 298500,
    volumeCurrency: '£',
    status: 'Active',
    openedDate: 'May 22, 2023',
  },
  {
    id: 'PBR-009',
    name: 'Kuala Lumpur Branch',
    code: 'KUL-001',
    country: 'Malaysia',
    flag: '🇲🇾',
    city: 'Kuala Lumpur',
    address: 'Jalan Ampang, KL 50450',
    manager: 'Siti Aisyah',
    managerPhone: '+60 12 345 6789',
    type: 'Partner Branch',
    agentsCount: 4,
    monthlyVolume: 186400,
    volumeCurrency: '£',
    status: 'Maintenance',
    openedDate: 'Jun 8, 2023',
  },
  {
    id: 'PBR-010',
    name: 'Manila Branch',
    code: 'MNL-001',
    country: 'Philippines',
    flag: '🇵🇭',
    city: 'Manila',
    address: 'Ayala Avenue, Makati City',
    manager: 'Maria Santos',
    managerPhone: '+63 917 123 4567',
    type: 'Partner Branch',
    agentsCount: 7,
    monthlyVolume: 245800,
    volumeCurrency: '£',
    status: 'Active',
    openedDate: 'Jun 30, 2023',
  },
  {
    id: 'PBR-011',
    name: 'Khulna Branch',
    code: 'KHL-001',
    country: 'Bangladesh',
    flag: '🇧🇩',
    city: 'Khulna',
    address: 'Khan Jahan Ali Road',
    manager: 'Rubel Hossain',
    managerPhone: '+880 1611 333555',
    type: 'Sub Branch',
    agentsCount: 4,
    monthlyVolume: 156200,
    volumeCurrency: '£',
    status: 'Inactive',
    openedDate: 'Jul 15, 2023',
  },
  {
    id: 'PBR-012',
    name: 'Riyadh Branch',
    code: 'RUH-001',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    city: 'Riyadh',
    address: 'Al Olaya District',
    manager: 'Omar Sheikh',
    managerPhone: '+966 55 123 4567',
    type: 'Partner Branch',
    agentsCount: 3,
    monthlyVolume: 142600,
    volumeCurrency: '£',
    status: 'Active',
    openedDate: 'Aug 2, 2023',
  },
];

export const partnerBranchStatusOptions = [
  'All Status',
  'Active',
  'Inactive',
  'Maintenance',
];
export const partnerBranchTypeOptions = [
  'All Types',
  'Main Branch',
  'Sub Branch',
  'Partner Branch',
];

// ============ AGENTS & PARTNERS — PARTNER LIST (standalone page) ============
export type BusinessPartnerStatus = 'Active' | 'Pending' | 'Inactive';
export type BusinessPartnerType =
  | 'Bank'
  | 'Mobile Wallet'
  | 'Money Transfer Operator'
  | 'Aggregator'
  | 'Cash Pickup Network';

export interface BusinessPartner {
  id: string;
  name: string;
  type: BusinessPartnerType;
  country: string;
  flag: string;
  contactPerson: string;
  email: string;
  phone: string;
  commissionRatePct: number;
  integrationType: 'API' | 'Manual' | 'File-based';
  monthlyVolume: number;
  volumeCurrency: string;
  status: BusinessPartnerStatus;
  partnerSince: string;
}

// ── Stats ──
export const businessPartnersStats = {
  totalPartners: 64,
  activePartners: 52,
  pendingPartners: 8,
  totalMonthlyVolume: 12450600,
};

// ── Partners ──
export const businessPartners: BusinessPartner[] = [
  {
    id: 'PTN-001',
    name: 'BRAC Bank',
    type: 'Bank',
    country: 'Bangladesh',
    flag: '🇧🇩',
    contactPerson: 'Nasreen Akter',
    email: 'partnerships@bracbank.com',
    phone: '+880 2 9844080',
    commissionRatePct: 1.2,
    integrationType: 'API',
    monthlyVolume: 2856400,
    volumeCurrency: '£',
    status: 'Active',
    partnerSince: 'Jan 2023',
  },
  {
    id: 'PTN-002',
    name: 'bKash',
    type: 'Mobile Wallet',
    country: 'Bangladesh',
    flag: '🇧🇩',
    contactPerson: 'Tariq Mahmud',
    email: 'partners@bkash.com',
    phone: '+880 2 9560099',
    commissionRatePct: 1.5,
    integrationType: 'API',
    monthlyVolume: 3245800,
    volumeCurrency: '£',
    status: 'Active',
    partnerSince: 'Jan 2023',
  },
  {
    id: 'PTN-003',
    name: 'Western Union',
    type: 'Money Transfer Operator',
    country: 'United States',
    flag: '🇺🇸',
    contactPerson: 'Michael Brown',
    email: 'corp@westernunion.com',
    phone: '+1 720 332 7100',
    commissionRatePct: 0.9,
    integrationType: 'API',
    monthlyVolume: 4856200,
    volumeCurrency: '£',
    status: 'Active',
    partnerSince: 'Feb 2023',
  },
  {
    id: 'PTN-004',
    name: 'Wise',
    type: 'Aggregator',
    country: 'United Kingdom',
    flag: '🇬🇧',
    contactPerson: 'Sophie Clark',
    email: 'partnerships@wise.com',
    phone: '+44 20 3695 9100',
    commissionRatePct: 0.7,
    integrationType: 'API',
    monthlyVolume: 1856400,
    volumeCurrency: '£',
    status: 'Pending',
    partnerSince: 'Mar 2023',
  },
  {
    id: 'PTN-005',
    name: 'Easypaisa',
    type: 'Mobile Wallet',
    country: 'Pakistan',
    flag: '🇵🇰',
    contactPerson: 'Ahsan Raza',
    email: 'partners@easypaisa.com.pk',
    phone: '+92 21 111 003 007',
    commissionRatePct: 1.4,
    integrationType: 'API',
    monthlyVolume: 985600,
    volumeCurrency: '£',
    status: 'Active',
    partnerSince: 'Mar 2023',
  },
  {
    id: 'PTN-006',
    name: 'GCash',
    type: 'Mobile Wallet',
    country: 'Philippines',
    flag: '🇵🇭',
    contactPerson: 'Maria Santos',
    email: 'business@gcash.com',
    phone: '+63 2 8845 2222',
    commissionRatePct: 1.1,
    integrationType: 'API',
    monthlyVolume: 745800,
    volumeCurrency: '£',
    status: 'Active',
    partnerSince: 'Apr 2023',
  },
  {
    id: 'PTN-007',
    name: 'Global Agent Network',
    type: 'Cash Pickup Network',
    country: 'UAE',
    flag: '🇦🇪',
    contactPerson: 'Ibrahim Khalil',
    email: 'ops@globalagentnetwork.com',
    phone: '+971 4 123 4567',
    commissionRatePct: 2.0,
    integrationType: 'Manual',
    monthlyVolume: 568200,
    volumeCurrency: '£',
    status: 'Active',
    partnerSince: 'May 2023',
  },
  {
    id: 'PTN-008',
    name: 'Nagad',
    type: 'Mobile Wallet',
    country: 'Bangladesh',
    flag: '🇧🇩',
    contactPerson: 'Imran Khan',
    email: 'partners@nagad.com.bd',
    phone: '+880 2 9555000',
    commissionRatePct: 1.2,
    integrationType: 'API',
    monthlyVolume: 1245600,
    volumeCurrency: '£',
    status: 'Active',
    partnerSince: 'May 2023',
  },
  {
    id: 'PTN-009',
    name: 'Riya Money Transfer',
    type: 'Money Transfer Operator',
    country: 'United States',
    flag: '🇺🇸',
    contactPerson: 'David Lee',
    email: 'partner@riya.com',
    phone: '+1 213 689 8900',
    commissionRatePct: 0.8,
    integrationType: 'File-based',
    monthlyVolume: 425800,
    volumeCurrency: '£',
    status: 'Inactive',
    partnerSince: 'Jun 2023',
  },
  {
    id: 'PTN-010',
    name: 'Al Rajhi Bank',
    type: 'Bank',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    contactPerson: 'Omar Sheikh',
    email: 'corporate@alrajhibank.com.sa',
    phone: '+966 11 211 6000',
    commissionRatePct: 1.0,
    integrationType: 'API',
    monthlyVolume: 685400,
    volumeCurrency: '£',
    status: 'Active',
    partnerSince: 'Jun 2023',
  },
  {
    id: 'PTN-011',
    name: 'Remitly',
    type: 'Aggregator',
    country: 'United Kingdom',
    flag: '🇬🇧',
    contactPerson: 'Emma Watson',
    email: 'partnerships@remitly.com',
    phone: '+44 20 3322 4500',
    commissionRatePct: 0.75,
    integrationType: 'API',
    monthlyVolume: 1456200,
    volumeCurrency: '£',
    status: 'Pending',
    partnerSince: 'Jul 2023',
  },
  {
    id: 'PTN-012',
    name: 'Maybank',
    type: 'Bank',
    country: 'Malaysia',
    flag: '🇲🇾',
    contactPerson: 'Siti Aisyah',
    email: 'partnerships@maybank.com',
    phone: '+60 3 7844 3696',
    commissionRatePct: 1.1,
    integrationType: 'Manual',
    monthlyVolume: 365800,
    volumeCurrency: '£',
    status: 'Active',
    partnerSince: 'Aug 2023',
  },
];

export const businessPartnerTypeOptions = [
  'All Types',
  'Bank',
  'Mobile Wallet',
  'Money Transfer Operator',
  'Aggregator',
  'Cash Pickup Network',
];
export const businessPartnerStatusOptions = [
  'All Status',
  'Active',
  'Pending',
  'Inactive',
];

// ============ AGENTS & PARTNERS — COMMISSION (standalone page) ============
export type CommissionPayoutStatus =
  | 'Paid'
  | 'Pending'
  | 'Processing'
  | 'Failed';
export type CommissionPeriod = 'Weekly' | 'Monthly' | 'Quarterly';

export interface CommissionRecord {
  id: string;
  agentName: string;
  agentCode: string;
  country: string;
  flag: string;
  period: string;
  periodType: CommissionPeriod;
  volume: number;
  ratePct: number;
  commission: number;
  bonus: number;
  totalPayout: number;
  status: CommissionPayoutStatus;
  paidOn: string | null;
  paymentMethod: string;
}

// ── Stats ──
export const commissionPageStats = {
  totalCommissionThisMonth: 128450,
  paidCommission: 98750,
  pendingCommission: 29700,
  avgCommissionRatePct: 1.18,
};

// ── Commission Records ──
export const commissionRecords: CommissionRecord[] = [
  {
    id: 'CMR-001',
    agentName: 'Rahman Global Services',
    agentCode: 'AGT-1001',
    country: 'Bangladesh',
    flag: '🇧🇩',
    period: 'May 2025',
    periodType: 'Monthly',
    volume: 620450,
    ratePct: 2.5,
    commission: 15512,
    bonus: 500,
    totalPayout: 16012,
    status: 'Paid',
    paidOn: 'Jun 1, 2025',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'CMR-002',
    agentName: 'Quick Remit UK',
    agentCode: 'AGT-1002',
    country: 'United Kingdom',
    flag: '🇬🇧',
    period: 'May 2025',
    periodType: 'Monthly',
    volume: 512300,
    ratePct: 2.5,
    commission: 12805,
    bonus: 0,
    totalPayout: 12805,
    status: 'Paid',
    paidOn: 'Jun 1, 2025',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'CMR-003',
    agentName: 'Trust Transfer Ltd.',
    agentCode: 'AGT-1003',
    country: 'United Kingdom',
    flag: '🇬🇧',
    period: 'May 2025',
    periodType: 'Monthly',
    volume: 398750,
    ratePct: 2.5,
    commission: 9968,
    bonus: 0,
    totalPayout: 9968,
    status: 'Pending',
    paidOn: null,
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'CMR-004',
    agentName: 'Green World Remit',
    agentCode: 'AGT-1004',
    country: 'Pakistan',
    flag: '🇵🇰',
    period: 'May 2025',
    periodType: 'Monthly',
    volume: 284600,
    ratePct: 2.5,
    commission: 7115,
    bonus: 200,
    totalPayout: 7315,
    status: 'Pending',
    paidOn: null,
    paymentMethod: 'Wire Transfer',
  },
  {
    id: 'CMR-005',
    agentName: 'Skyline Transfers',
    agentCode: 'AGT-1005',
    country: 'India',
    flag: '🇮🇳',
    period: 'May 2025',
    periodType: 'Monthly',
    volume: 245300,
    ratePct: 2.5,
    commission: 6132,
    bonus: 0,
    totalPayout: 6132,
    status: 'Paid',
    paidOn: 'Jun 1, 2025',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'CMR-006',
    agentName: 'Bismillah Exchange',
    agentCode: 'AGT-1006',
    country: 'Bangladesh',
    flag: '🇧🇩',
    period: 'May 2025',
    periodType: 'Monthly',
    volume: 142200,
    ratePct: 2.5,
    commission: 3550,
    bonus: 0,
    totalPayout: 3550,
    status: 'Processing',
    paidOn: null,
    paymentMethod: 'bKash',
  },
  {
    id: 'CMR-007',
    agentName: 'Secure Remit BD',
    agentCode: 'AGT-1007',
    country: 'Bangladesh',
    flag: '🇧🇩',
    period: 'May 2025',
    periodType: 'Monthly',
    volume: 98450,
    ratePct: 2.5,
    commission: 2461,
    bonus: 0,
    totalPayout: 2461,
    status: 'Failed',
    paidOn: null,
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'CMR-008',
    agentName: 'Remit Expert',
    agentCode: 'AGT-1008',
    country: 'United Kingdom',
    flag: '🇬🇧',
    period: 'May 2025',
    periodType: 'Monthly',
    volume: 85600,
    ratePct: 2.5,
    commission: 2140,
    bonus: 0,
    totalPayout: 2140,
    status: 'Paid',
    paidOn: 'Jun 1, 2025',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'CMR-009',
    agentName: 'Horizon Money Transfer',
    agentCode: 'AGT-1009',
    country: 'UAE',
    flag: '🇦🇪',
    period: 'May 2025',
    periodType: 'Monthly',
    volume: 156800,
    ratePct: 2.5,
    commission: 3920,
    bonus: 100,
    totalPayout: 4020,
    status: 'Pending',
    paidOn: null,
    paymentMethod: 'Wire Transfer',
  },
  {
    id: 'CMR-010',
    agentName: 'Asia Pacific Exchange',
    agentCode: 'AGT-1010',
    country: 'Malaysia',
    flag: '🇲🇾',
    period: 'May 2025',
    periodType: 'Monthly',
    volume: 112400,
    ratePct: 2.5,
    commission: 2810,
    bonus: 0,
    totalPayout: 2810,
    status: 'Paid',
    paidOn: 'Jun 1, 2025',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'CMR-011',
    agentName: 'Continental Transfers',
    agentCode: 'AGT-1011',
    country: 'Philippines',
    flag: '🇵🇭',
    period: 'May 2025',
    periodType: 'Monthly',
    volume: 64200,
    ratePct: 2.5,
    commission: 1605,
    bonus: 0,
    totalPayout: 1605,
    status: 'Pending',
    paidOn: null,
    paymentMethod: 'GCash',
  },
  {
    id: 'CMR-012',
    agentName: 'Reliable Money Services',
    agentCode: 'AGT-1012',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    period: 'May 2025',
    periodType: 'Monthly',
    volume: 189500,
    ratePct: 2.5,
    commission: 4738,
    bonus: 0,
    totalPayout: 4738,
    status: 'Paid',
    paidOn: 'Jun 1, 2025',
    paymentMethod: 'Bank Transfer',
  },
];

export const commissionStatusOptions = [
  'All Status',
  'Paid',
  'Pending',
  'Processing',
  'Failed',
];
export const commissionPeriodOptions = ['May 2025', 'April 2025', 'March 2025'];

// ============================================================
// BANKING & CARD PAYMENT MANAGEMENT — append to lib/data.ts
// ============================================================

export interface BankingCardStat {
  id: string;
  label: string;
  value: string;
  change: number; // positive or negative percent
  changeLabel: string; // e.g. "vs last month"
  linkLabel: string;
  linkHref: string;
}

export const bankingCardStats: BankingCardStat[] = [
  {
    id: 'active-banks',
    label: 'Active Banks',
    value: '48',
    change: 12.5,
    changeLabel: 'vs last month',
    linkLabel: 'View All Banks',
    linkHref: '/banking-cards/international-banks',
  },
  {
    id: 'bank-corridors',
    label: 'Bank Corridors',
    value: '36',
    change: 8.3,
    changeLabel: 'vs last month',
    linkLabel: 'View Corridors',
    linkHref: '/banking-cards/bank-corridors',
  },
  {
    id: 'card-gateways',
    label: 'Card Gateways',
    value: '6',
    change: 20,
    changeLabel: 'vs last month',
    linkLabel: 'View Gateways',
    linkHref: '/banking-cards/card-gateways',
  },
  {
    id: 'total-card-transactions',
    label: 'Total Card Transactions',
    value: '12,458',
    change: 15.7,
    changeLabel: 'vs last month',
    linkLabel: 'View Transactions',
    linkHref: '/banking-cards/transactions',
  },
  {
    id: 'failed-transactions',
    label: 'Failed Transactions',
    value: '156',
    change: -3.4,
    changeLabel: 'vs last month',
    linkLabel: 'View Failures',
    linkHref: '/banking-cards/failures',
  },
  {
    id: 'total-payout-volume',
    label: 'Total Payout Volume',
    value: '$4.25M',
    change: 18.6,
    changeLabel: 'vs last month',
    linkLabel: 'View Reports',
    linkHref: '/banking-cards/reports',
  },
];

export type BankStatus = 'Active' | 'Inactive';

export interface InternationalBankAccount {
  id: string;
  bankName: string;
  country: string;
  countryFlag: string; // emoji flag
  swiftBic: string;
  currency: string;
  accountHolder: string;
  status: BankStatus;
  isDefault: boolean;
  dailyLimit: string;
}

export const internationalBankAccounts: InternationalBankAccount[] = [
  {
    id: 'bnk-001',
    bankName: 'HSBC Bank PLC',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    swiftBic: 'MIDLGB22',
    currency: 'GBP',
    accountHolder: 'SendMoney UK Ltd',
    status: 'Active',
    isDefault: true,
    dailyLimit: '£500,000',
  },
  {
    id: 'bnk-002',
    bankName: 'DBBL Bank Ltd.',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    swiftBic: 'DBBLBDDH',
    currency: 'BDT',
    accountHolder: 'SendMoney BD Ltd',
    status: 'Active',
    isDefault: true,
    dailyLimit: '৳50,000,000',
  },
  {
    id: 'bnk-003',
    bankName: 'JPMorgan Chase',
    country: 'United States',
    countryFlag: '🇺🇸',
    swiftBic: 'CHASUS33',
    currency: 'USD',
    accountHolder: 'SendMoney USA Inc',
    status: 'Active',
    isDefault: false,
    dailyLimit: '$1,000,000',
  },
  {
    id: 'bnk-004',
    bankName: 'Standard Chartered',
    country: 'Singapore',
    countryFlag: '🇸🇬',
    swiftBic: 'SCBLSG22',
    currency: 'SGD',
    accountHolder: 'SendMoney SG Pte Ltd',
    status: 'Inactive',
    isDefault: false,
    dailyLimit: '$300,000',
  },
  {
    id: 'bnk-005',
    bankName: 'Emirates NBD',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    swiftBic: 'EBILAEAD',
    currency: 'AED',
    accountHolder: 'SendMoney UAE LLC',
    status: 'Active',
    isDefault: true,
    dailyLimit: 'AED 2,000,000',
  },
  {
    id: 'bnk-006',
    bankName: 'ICICI Bank',
    country: 'India',
    countryFlag: '🇮🇳',
    swiftBic: 'ICICINBB',
    currency: 'INR',
    accountHolder: 'SendMoney India Pvt Ltd',
    status: 'Active',
    isDefault: false,
    dailyLimit: '₹25,000,000',
  },
  {
    id: 'bnk-007',
    bankName: 'Commonwealth Bank',
    country: 'Australia',
    countryFlag: '🇦🇺',
    swiftBic: 'CTBAAU2S',
    currency: 'AUD',
    accountHolder: 'SendMoney AU Pty Ltd',
    status: 'Inactive',
    isDefault: false,
    dailyLimit: 'A$500,000',
  },
];

export type GatewayStatus = 'Active' | 'Inactive';
export type GatewayMode = 'Live' | 'Sandbox';

export interface CardGateway {
  id: string;
  name: string;
  description: string;
  status: GatewayStatus;
  mode: GatewayMode;
  currencies: string[];
  feePercent: number;
  feeFixed: string;
  threeDsEnabled: boolean;
}

export const cardGateways: CardGateway[] = [
  {
    id: 'gw-stripe',
    name: 'Stripe',
    description: 'Stripe Payments',
    status: 'Active',
    mode: 'Live',
    currencies: ['USD', 'EUR', 'GBP', 'AUD'],
    feePercent: 2.5,
    feeFixed: '$0.30',
    threeDsEnabled: true,
  },
  {
    id: 'gw-adyen',
    name: 'Adyen',
    description: 'Adyen Payments',
    status: 'Active',
    mode: 'Live',
    currencies: ['EUR', 'USD', 'GBP', 'AED'],
    feePercent: 2.2,
    feeFixed: '€0.25',
    threeDsEnabled: true,
  },
  {
    id: 'gw-paypal',
    name: 'PayPal',
    description: 'PayPal Payments',
    status: 'Inactive',
    mode: 'Live',
    currencies: ['USD'],
    feePercent: 3.4,
    feeFixed: '$0.35',
    threeDsEnabled: false,
  },
  {
    id: 'gw-checkout',
    name: 'Checkout.com',
    description: 'Checkout.com',
    status: 'Active',
    mode: 'Sandbox',
    currencies: ['USD', 'EUR', 'GBP'],
    feePercent: 2.6,
    feeFixed: '$0.30',
    threeDsEnabled: true,
  },
  {
    id: 'gw-razorpay',
    name: 'Razorpay',
    description: 'Razorpay Payments',
    status: 'Active',
    mode: 'Live',
    currencies: ['INR'],
    feePercent: 2.0,
    feeFixed: '₹2.00',
    threeDsEnabled: true,
  },
  {
    id: 'gw-worldpay',
    name: 'Worldpay',
    description: 'Worldpay Payments',
    status: 'Inactive',
    mode: 'Sandbox',
    currencies: ['GBP', 'EUR', 'AED'],
    feePercent: 2.8,
    feeFixed: '£0.20',
    threeDsEnabled: false,
  },
];

export interface CardPaymentRule {
  id: string;
  currency: string;
  minLimit: string;
  maxLimit: string;
  feePercent: number;
  fixedFee: string;
  threeDsEnabled: boolean;
  appliesToGateway: string;
  status: 'Active' | 'Inactive';
}

export const cardPaymentRules: CardPaymentRule[] = [
  {
    id: 'rule-usd',
    currency: 'USD',
    minLimit: '$10',
    maxLimit: '$10,000',
    feePercent: 2.5,
    fixedFee: '$0.30',
    threeDsEnabled: true,
    appliesToGateway: 'Stripe',
    status: 'Active',
  },
  {
    id: 'rule-gbp',
    currency: 'GBP',
    minLimit: '£10',
    maxLimit: '£10,000',
    feePercent: 2.4,
    fixedFee: '£0.30',
    threeDsEnabled: true,
    appliesToGateway: 'Stripe',
    status: 'Active',
  },
  {
    id: 'rule-eur',
    currency: 'EUR',
    minLimit: '€10',
    maxLimit: '€10,000',
    feePercent: 2.2,
    fixedFee: '€0.25',
    threeDsEnabled: true,
    appliesToGateway: 'Adyen',
    status: 'Active',
  },
  {
    id: 'rule-aud',
    currency: 'AUD',
    minLimit: 'A$10',
    maxLimit: 'A$10,000',
    feePercent: 2.6,
    fixedFee: 'A$0.30',
    threeDsEnabled: true,
    appliesToGateway: 'Stripe',
    status: 'Active',
  },
  {
    id: 'rule-aed',
    currency: 'AED',
    minLimit: 'AED 50',
    maxLimit: 'AED 50,000',
    feePercent: 2.3,
    fixedFee: 'AED 1.00',
    threeDsEnabled: true,
    appliesToGateway: 'Adyen',
    status: 'Active',
  },
  {
    id: 'rule-inr',
    currency: 'INR',
    minLimit: '₹100',
    maxLimit: '₹500,000',
    feePercent: 2.0,
    fixedFee: '₹2.00',
    threeDsEnabled: true,
    appliesToGateway: 'Razorpay',
    status: 'Active',
  },
  {
    id: 'rule-sgd',
    currency: 'SGD',
    minLimit: 'S$10',
    maxLimit: 'S$10,000',
    feePercent: 2.7,
    fixedFee: 'S$0.30',
    threeDsEnabled: false,
    appliesToGateway: 'Checkout.com',
    status: 'Inactive',
  },
];

export const cardPaymentRulesTotalCount = 7;

export const cardPaymentRuleCurrencyFilterOptions: string[] = [
  'All Currencies',
  'USD',
  'GBP',
  'EUR',
  'AUD',
  'AED',
  'INR',
  'SGD',
];

export type FraudFilterType =
  | 'Velocity'
  | 'Geo-blocking'
  | 'Blacklist'
  | 'Amount Threshold'
  | 'Device Fingerprint';
export type FraudFilterAction = 'Block' | 'Flag for Review' | 'Require 3DS';
export type FraudRiskLevel = 'High' | 'Medium' | 'Low';
export type FraudFilterStatus = 'Active' | 'Inactive';

export interface FraudFilter {
  id: string;
  name: string;
  type: FraudFilterType;
  triggerCondition: string;
  action: FraudFilterAction;
  riskLevel: FraudRiskLevel;
  triggeredCount: number;
  status: FraudFilterStatus;
}

export const fraudFilters: FraudFilter[] = [
  {
    id: 'ff-001',
    name: 'High Velocity Card Use',
    type: 'Velocity',
    triggerCondition: '> 5 transactions in 10 min',
    action: 'Block',
    riskLevel: 'High',
    triggeredCount: 42,
    status: 'Active',
  },
  {
    id: 'ff-002',
    name: 'Blocked Country List',
    type: 'Geo-blocking',
    triggerCondition: 'Card issued in restricted country',
    action: 'Block',
    riskLevel: 'High',
    triggeredCount: 18,
    status: 'Active',
  },
  {
    id: 'ff-003',
    name: 'Known Fraud BIN List',
    type: 'Blacklist',
    triggerCondition: 'BIN matches blacklist',
    action: 'Block',
    riskLevel: 'High',
    triggeredCount: 9,
    status: 'Active',
  },
  {
    id: 'ff-004',
    name: 'Large Transaction Review',
    type: 'Amount Threshold',
    triggerCondition: 'Amount > $5,000',
    action: 'Flag for Review',
    riskLevel: 'Medium',
    triggeredCount: 63,
    status: 'Active',
  },
  {
    id: 'ff-005',
    name: 'New Device Check',
    type: 'Device Fingerprint',
    triggerCondition: 'Unrecognized device fingerprint',
    action: 'Require 3DS',
    riskLevel: 'Medium',
    triggeredCount: 121,
    status: 'Active',
  },
  {
    id: 'ff-006',
    name: 'Mismatched Billing Address',
    type: 'Blacklist',
    triggerCondition: 'Billing address ≠ card country',
    action: 'Flag for Review',
    riskLevel: 'Low',
    triggeredCount: 35,
    status: 'Inactive',
  },
  {
    id: 'ff-007',
    name: 'Rapid Retry Attempts',
    type: 'Velocity',
    triggerCondition: '> 3 failed attempts in 5 min',
    action: 'Block',
    riskLevel: 'Medium',
    triggeredCount: 27,
    status: 'Active',
  },
];

export const fraudFiltersTotalCount = 24;

export const fraudFilterTypeOptions: string[] = [
  'All Types',
  'Velocity',
  'Geo-blocking',
  'Blacklist',
  'Amount Threshold',
  'Device Fingerprint',
];

export const fraudFilterRiskLevelOptions: string[] = [
  'All Risk Levels',
  'High',
  'Medium',
  'Low',
];

export type TransactionLimitScope = 'Per Transaction' | 'Daily' | 'Monthly';
export type TransactionLimitAppliesTo =
  | 'All Customers'
  | 'New Customers'
  | 'Verified Customers'
  | 'Agent Channel';
export type TransactionLimitStatus = 'Active' | 'Inactive';

export interface TransactionLimit {
  id: string;
  name: string;
  scope: TransactionLimitScope;
  currency: string;
  minAmount: string;
  maxAmount: string;
  appliesTo: TransactionLimitAppliesTo;
  status: TransactionLimitStatus;
}

export const transactionLimits: TransactionLimit[] = [
  {
    id: 'tl-001',
    name: 'Standard Per-Transaction Cap',
    scope: 'Per Transaction',
    currency: 'USD',
    minAmount: '$10',
    maxAmount: '$10,000',
    appliesTo: 'All Customers',
    status: 'Active',
  },
  {
    id: 'tl-002',
    name: 'New Customer Daily Limit',
    scope: 'Daily',
    currency: 'USD',
    minAmount: '$10',
    maxAmount: '$1,000',
    appliesTo: 'New Customers',
    status: 'Active',
  },
  {
    id: 'tl-003',
    name: 'Verified Customer Daily Limit',
    scope: 'Daily',
    currency: 'USD',
    minAmount: '$10',
    maxAmount: '$25,000',
    appliesTo: 'Verified Customers',
    status: 'Active',
  },
  {
    id: 'tl-004',
    name: 'Standard Monthly Limit',
    scope: 'Monthly',
    currency: 'USD',
    minAmount: '$10',
    maxAmount: '$100,000',
    appliesTo: 'All Customers',
    status: 'Active',
  },
  {
    id: 'tl-005',
    name: 'Agent Channel Per-Transaction',
    scope: 'Per Transaction',
    currency: 'GBP',
    minAmount: '£10',
    maxAmount: '£5,000',
    appliesTo: 'Agent Channel',
    status: 'Active',
  },
  {
    id: 'tl-006',
    name: 'New Customer Monthly Limit',
    scope: 'Monthly',
    currency: 'GBP',
    minAmount: '£10',
    maxAmount: '£5,000',
    appliesTo: 'New Customers',
    status: 'Inactive',
  },
  {
    id: 'tl-007',
    name: 'Verified Customer Monthly Limit',
    scope: 'Monthly',
    currency: 'AED',
    minAmount: 'AED 50',
    maxAmount: 'AED 200,000',
    appliesTo: 'Verified Customers',
    status: 'Active',
  },
];

export const transactionLimitsTotalCount = 18;

export const transactionLimitScopeOptions: string[] = [
  'All Scopes',
  'Per Transaction',
  'Daily',
  'Monthly',
];

export const transactionLimitAppliesToOptions: string[] = [
  'All Audiences',
  'All Customers',
  'New Customers',
  'Verified Customers',
  'Agent Channel',
];

export type BankVerificationLabel =
  | 'Verified'
  | 'Pending'
  | 'Rejected'
  | 'Not Submitted';

export interface BankVerificationStatusItem {
  label: BankVerificationLabel;
  count: number;
  percent: number;
  color: string;
}

export const bankVerificationStatus: BankVerificationStatusItem[] = [
  { label: 'Verified', count: 34, percent: 70.8, color: '#22c55e' },
  { label: 'Pending', count: 8, percent: 16.7, color: '#f59e0b' },
  { label: 'Rejected', count: 3, percent: 6.3, color: '#ef4444' },
  { label: 'Not Submitted', count: 3, percent: 6.3, color: '#9ca3af' },
];

export const bankVerificationTotal = 48;

export interface BankVerificationListItem {
  id: string;
  bankName: string;
  country: string;
  countryFlag: string;
  status: BankVerificationLabel;
}

export const bankVerificationList: BankVerificationListItem[] = [
  {
    id: 'bv-001',
    bankName: 'HSBC Bank PLC',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    status: 'Verified',
  },
  {
    id: 'bv-002',
    bankName: 'DBBL Bank Ltd.',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    status: 'Verified',
  },
  {
    id: 'bv-003',
    bankName: 'JPMorgan Chase',
    country: 'United States',
    countryFlag: '🇺🇸',
    status: 'Pending',
  },
  {
    id: 'bv-004',
    bankName: 'Standard Chartered',
    country: 'Singapore',
    countryFlag: '🇸🇬',
    status: 'Verified',
  },
];

export interface BankVerificationRecord {
  id: string;
  bankName: string;
  country: string;
  countryFlag: string;
  swiftBic: string;
  status: BankVerificationLabel;
  submittedDate: string;
  verifiedDate: string | null;
  reviewer: string | null;
  documentsCount: number;
}

export const bankVerificationRecords: BankVerificationRecord[] = [
  {
    id: 'bvr-001',
    bankName: 'HSBC Bank PLC',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    swiftBic: 'MIDLGB22',
    status: 'Verified',
    submittedDate: '12 Jan 2026',
    verifiedDate: '18 Jan 2026',
    reviewer: 'Sarah Ahmed',
    documentsCount: 5,
  },
  {
    id: 'bvr-002',
    bankName: 'DBBL Bank Ltd.',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    swiftBic: 'DBBLBDDH',
    status: 'Verified',
    submittedDate: '08 Jan 2026',
    verifiedDate: '15 Jan 2026',
    reviewer: 'Tanvir Rahman',
    documentsCount: 4,
  },
  {
    id: 'bvr-003',
    bankName: 'JPMorgan Chase',
    country: 'United States',
    countryFlag: '🇺🇸',
    swiftBic: 'CHASUS33',
    status: 'Pending',
    submittedDate: '02 Feb 2026',
    verifiedDate: null,
    reviewer: null,
    documentsCount: 3,
  },
  {
    id: 'bvr-004',
    bankName: 'Standard Chartered',
    country: 'Singapore',
    countryFlag: '🇸🇬',
    swiftBic: 'SCBLSG22',
    status: 'Verified',
    submittedDate: '20 Dec 2025',
    verifiedDate: '28 Dec 2025',
    reviewer: 'Sarah Ahmed',
    documentsCount: 6,
  },
  {
    id: 'bvr-005',
    bankName: 'Emirates NBD',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    swiftBic: 'EBILAEAD',
    status: 'Verified',
    submittedDate: '14 Dec 2025',
    verifiedDate: '22 Dec 2025',
    reviewer: 'Tanvir Rahman',
    documentsCount: 5,
  },
  {
    id: 'bvr-006',
    bankName: 'ICICI Bank',
    country: 'India',
    countryFlag: '🇮🇳',
    swiftBic: 'ICICINBB',
    status: 'Pending',
    submittedDate: '05 Feb 2026',
    verifiedDate: null,
    reviewer: null,
    documentsCount: 2,
  },
  {
    id: 'bvr-007',
    bankName: 'Commonwealth Bank',
    country: 'Australia',
    countryFlag: '🇦🇺',
    swiftBic: 'CTBAAU2S',
    status: 'Rejected',
    submittedDate: '10 Jan 2026',
    verifiedDate: null,
    reviewer: 'Sarah Ahmed',
    documentsCount: 1,
  },
  {
    id: 'bvr-008',
    bankName: 'Banco Santander',
    country: 'Spain',
    countryFlag: '🇪🇸',
    swiftBic: 'BSCHESMM',
    status: 'Not Submitted',
    submittedDate: '—',
    verifiedDate: null,
    reviewer: null,
    documentsCount: 0,
  },
];

export const bankVerificationTotalCount = 48;

export const bankVerificationStatusFilterOptions: string[] = [
  'All Status',
  'Verified',
  'Pending',
  'Rejected',
  'Not Submitted',
];

export type SettlementFrequency = 'Daily' | 'Weekly' | 'Monthly';
export type SettlementRuleStatus = 'Active' | 'Inactive';

export interface SettlementRule {
  id: string;
  bankName: string;
  country: string;
  countryFlag: string;
  currency: string;
  frequency: SettlementFrequency;
  cutoffTime: string;
  minSettlementAmount: string;
  autoSettle: boolean;
  status: SettlementRuleStatus;
}

export const settlementRules: SettlementRule[] = [
  {
    id: 'set-001',
    bankName: 'HSBC Bank PLC',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    currency: 'GBP',
    frequency: 'Daily',
    cutoffTime: '5:00 PM GMT',
    minSettlementAmount: '£1,000',
    autoSettle: true,
    status: 'Active',
  },
  {
    id: 'set-002',
    bankName: 'DBBL Bank Ltd.',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    currency: 'BDT',
    frequency: 'Daily',
    cutoffTime: '6:00 PM BST',
    minSettlementAmount: '৳50,000',
    autoSettle: true,
    status: 'Active',
  },
  {
    id: 'set-003',
    bankName: 'JPMorgan Chase',
    country: 'United States',
    countryFlag: '🇺🇸',
    currency: 'USD',
    frequency: 'Daily',
    cutoffTime: '4:00 PM EST',
    minSettlementAmount: '$2,000',
    autoSettle: false,
    status: 'Active',
  },
  {
    id: 'set-004',
    bankName: 'Standard Chartered',
    country: 'Singapore',
    countryFlag: '🇸🇬',
    currency: 'SGD',
    frequency: 'Weekly',
    cutoffTime: '3:00 PM SGT',
    minSettlementAmount: 'S$5,000',
    autoSettle: false,
    status: 'Inactive',
  },
  {
    id: 'set-005',
    bankName: 'Emirates NBD',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    currency: 'AED',
    frequency: 'Daily',
    cutoffTime: '2:00 PM GST',
    minSettlementAmount: 'AED 3,000',
    autoSettle: true,
    status: 'Active',
  },
  {
    id: 'set-006',
    bankName: 'ICICI Bank',
    country: 'India',
    countryFlag: '🇮🇳',
    currency: 'INR',
    frequency: 'Weekly',
    cutoffTime: '5:30 PM IST',
    minSettlementAmount: '₹50,000',
    autoSettle: false,
    status: 'Active',
  },
  {
    id: 'set-007',
    bankName: 'Commonwealth Bank',
    country: 'Australia',
    countryFlag: '🇦🇺',
    currency: 'AUD',
    frequency: 'Monthly',
    cutoffTime: '4:00 PM AEST',
    minSettlementAmount: 'A$10,000',
    autoSettle: false,
    status: 'Inactive',
  },
];

export const settlementRulesTotalCount = 36;

export const settlementFrequencyFilterOptions: string[] = [
  'All Frequencies',
  'Daily',
  'Weekly',
  'Monthly',
];

export const gatewayModeFilterOptions: string[] = [
  'All Modes',
  'Live',
  'Sandbox',
];

export const cardGatewaysTotalCount = 6;

export type BankCorridorStatus = 'Active' | 'Inactive';

export interface BankCorridor {
  id: string;
  fromCountry: string;
  fromFlag: string;
  toCountry: string;
  toFlag: string;
  fromCurrency: string;
  toCurrency: string;
  settlementBank: string;
  feePercent: number;
  status: BankCorridorStatus;
  isDefault: boolean;
  dailyVolumeLimit: string;
}

export const bankCorridors: BankCorridor[] = [
  {
    id: 'crd-001',
    fromCountry: 'United Kingdom',
    fromFlag: '🇬🇧',
    toCountry: 'Bangladesh',
    toFlag: '🇧🇩',
    fromCurrency: 'GBP',
    toCurrency: 'BDT',
    settlementBank: 'HSBC Bank PLC',
    feePercent: 1.2,
    status: 'Active',
    isDefault: true,
    dailyVolumeLimit: '£2,000,000',
  },
  {
    id: 'crd-002',
    fromCountry: 'United States',
    fromFlag: '🇺🇸',
    toCountry: 'Bangladesh',
    toFlag: '🇧🇩',
    fromCurrency: 'USD',
    toCurrency: 'BDT',
    settlementBank: 'JPMorgan Chase',
    feePercent: 1.5,
    status: 'Active',
    isDefault: true,
    dailyVolumeLimit: '$1,500,000',
  },
  {
    id: 'crd-003',
    fromCountry: 'United Arab Emirates',
    fromFlag: '🇦🇪',
    toCountry: 'Pakistan',
    toFlag: '🇵🇰',
    fromCurrency: 'AED',
    toCurrency: 'PKR',
    settlementBank: 'Emirates NBD',
    feePercent: 1.1,
    status: 'Active',
    isDefault: false,
    dailyVolumeLimit: 'AED 3,000,000',
  },
  {
    id: 'crd-004',
    fromCountry: 'Saudi Arabia',
    fromFlag: '🇸🇦',
    toCountry: 'India',
    toFlag: '🇮🇳',
    fromCurrency: 'SAR',
    toCurrency: 'INR',
    settlementBank: 'ICICI Bank',
    feePercent: 1.3,
    status: 'Active',
    isDefault: false,
    dailyVolumeLimit: 'SAR 4,000,000',
  },
  {
    id: 'crd-005',
    fromCountry: 'Singapore',
    fromFlag: '🇸🇬',
    toCountry: 'Indonesia',
    toFlag: '🇮🇩',
    fromCurrency: 'SGD',
    toCurrency: 'IDR',
    settlementBank: 'Standard Chartered',
    feePercent: 1.4,
    status: 'Inactive',
    isDefault: false,
    dailyVolumeLimit: 'S$500,000',
  },
  {
    id: 'crd-006',
    fromCountry: 'Australia',
    fromFlag: '🇦🇺',
    toCountry: 'Philippines',
    toFlag: '🇵🇭',
    fromCurrency: 'AUD',
    toCurrency: 'PHP',
    settlementBank: 'Commonwealth Bank',
    feePercent: 1.6,
    status: 'Active',
    isDefault: false,
    dailyVolumeLimit: 'A$800,000',
  },
  {
    id: 'crd-007',
    fromCountry: 'United Kingdom',
    fromFlag: '🇬🇧',
    toCountry: 'Nigeria',
    toFlag: '🇳🇬',
    fromCurrency: 'GBP',
    toCurrency: 'NGN',
    settlementBank: 'HSBC Bank PLC',
    feePercent: 1.8,
    status: 'Inactive',
    isDefault: false,
    dailyVolumeLimit: '£300,000',
  },
];

export const corridorTotalCount = 36;

export const corridorCountryFilterOptions: string[] = [
  'All Countries',
  'United Kingdom',
  'United States',
  'United Arab Emirates',
  'Saudi Arabia',
  'Singapore',
  'Australia',
];

export const corridorCurrencyFilterOptions: string[] = [
  'All Currencies',
  'GBP',
  'USD',
  'AED',
  'SAR',
  'SGD',
  'AUD',
];

export interface TopBankCorridor {
  id: string;
  fromCountry: string;
  fromFlag: string;
  toCountry: string;
  toFlag: string;
  fromCurrency: string;
  toCurrency: string;
  volume: string;
  status: 'Active' | 'Inactive';
}

export const topBankCorridors: TopBankCorridor[] = [
  {
    id: 'cor-001',
    fromCountry: 'UK',
    fromFlag: '🇬🇧',
    toCountry: 'Bangladesh',
    toFlag: '🇧🇩',
    fromCurrency: 'GBP',
    toCurrency: 'BDT',
    volume: '$2,456,780',
    status: 'Active',
  },
  {
    id: 'cor-002',
    fromCountry: 'USA',
    fromFlag: '🇺🇸',
    toCountry: 'Bangladesh',
    toFlag: '🇧🇩',
    fromCurrency: 'USD',
    toCurrency: 'BDT',
    volume: '$1,856,230',
    status: 'Active',
  },
  {
    id: 'cor-003',
    fromCountry: 'UAE',
    fromFlag: '🇦🇪',
    toCountry: 'Pakistan',
    toFlag: '🇵🇰',
    fromCurrency: 'AED',
    toCurrency: 'PKR',
    volume: '$1,256,540',
    status: 'Active',
  },
  {
    id: 'cor-004',
    fromCountry: 'Saudi Arabia',
    fromFlag: '🇸🇦',
    toCountry: 'India',
    toFlag: '🇮🇳',
    fromCurrency: 'SAR',
    toCurrency: 'INR',
    volume: '$995,420',
    status: 'Active',
  },
  {
    id: 'cor-005',
    fromCountry: 'Singapore',
    fromFlag: '🇸🇬',
    toCountry: 'Indonesia',
    toFlag: '🇮🇩',
    fromCurrency: 'SGD',
    toCurrency: 'IDR',
    volume: '$754,820',
    status: 'Active',
  },
];

export const countryFilterOptions: string[] = [
  'All Countries',
  'United Kingdom',
  'Bangladesh',
  'United States',
  'Singapore',
  'United Arab Emirates',
  'India',
  'Australia',
];

export const currencyFilterOptions: string[] = [
  'All Currencies',
  'GBP',
  'BDT',
  'USD',
  'SGD',
  'AED',
  'INR',
  'AUD',
];

export const bankStatusFilterOptions: string[] = [
  'All Status',
  'Active',
  'Inactive',
];

// ============ KYC & COMPLIANCE — OVERVIEW ============
export type AlertRiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type AlertStatus = 'New' | 'Under Review' | 'Escalated' | 'Cleared';
export type FraudCaseStatus = 'Investigating' | 'Open' | 'Resolved';
export type InvestigationStage =
  | 'Investigating'
  | 'Open'
  | 'Confirmed Fraud'
  | 'False Positive';

export interface AmlAlertRow {
  id: string;
  transactionNo: string;
  customerName: string;
  country: string;
  flag: string;
  amount: number;
  currency: string;
  riskScore: number;
  riskLevel: AlertRiskLevel;
  alertType: string;
  status: AlertStatus;
  assignedOfficer: string;
  reviewDate: string;
}

export interface FraudCaseRow {
  id: string;
  customerName: string;
  fraudType: string;
  riskScore: number;
  status: FraudCaseStatus;
}

export interface AuditLogRow {
  id: string;
  time: string;
  user: string;
  action: string;
  module: string;
  ipAddress: string;
}

export interface RiskAssessmentRow {
  category: AlertRiskLevel;
  customers: number;
  pct: number;
  trendPct: number;
  trendUp: boolean;
}

// ── Header date range ──
export const complianceDateRangeLabel = 'May 6 - May 12, 2025';

// ── Top 7 stat cards (with sparkline series) ──
export const complianceOverviewStats = {
  amlAlerts: 156,
  amlAlertsChangePct: 18.4,
  fraudAlerts: 89,
  fraudAlertsChangePct: 12.7,
  highRiskCustomers: 234,
  highRiskCustomersChangePct: 9.3,
  openInvestigations: 42,
  openInvestigationsChangePct: 5.6,
  complianceCases: 67,
  complianceCasesChangePct: 14.2,
  auditEventsToday: 1248,
  auditEventsTodayChangePct: 22.8,
  riskReviewsDue: 28,
  riskReviewsDueChangePct: -8.3,
};

export const complianceSparklines = {
  amlAlerts: [110, 118, 114, 125, 130, 128, 138, 142, 148, 156],
  fraudAlerts: [62, 68, 65, 72, 75, 70, 78, 82, 85, 89],
  highRiskCustomers: [190, 198, 195, 205, 210, 208, 218, 224, 228, 234],
  openInvestigations: [32, 35, 33, 38, 36, 40, 38, 41, 39, 42],
  complianceCases: [50, 55, 52, 58, 60, 57, 62, 64, 65, 67],
  auditEventsToday: [820, 880, 850, 950, 980, 1020, 1080, 1120, 1180, 1248],
  riskReviewsDue: [38, 36, 37, 34, 33, 32, 31, 30, 29, 28],
};

// ── Alert Distribution donut ──
export const alertDistributionDonut = [
  { label: 'AML Alerts', value: 156, pct: 63.7, color: '#2563eb' },
  { label: 'Fraud Alerts', value: 89, pct: 36.3, color: '#f59e0b' },
  { label: 'Risk Alerts', value: 45, pct: 18.4, color: '#16a34a' },
  { label: 'Other Alerts', value: 23, pct: 9.4, color: '#7c3aed' },
];
export const alertDistributionTotal = 245;

// ── Risk Level Distribution donut ──
export const riskLevelDistributionDonut = [
  { label: 'Low Risk', value: 656, pct: 52.6, color: '#16a34a' },
  { label: 'Medium Risk', value: 352, pct: 28.2, color: '#f59e0b' },
  { label: 'High Risk', value: 168, pct: 13.5, color: '#ef4444' },
  { label: 'Critical Risk', value: 72, pct: 5.7, color: '#7c2d12' },
];
export const riskLevelDistributionTotal = 1248;

// ── Case Status Overview donut ──
export const caseStatusOverviewDonut = [
  { label: 'Open', value: 42, pct: 38.5, color: '#2563eb' },
  { label: 'Under Review', value: 28, pct: 25.7, color: '#f59e0b' },
  { label: 'Escalated', value: 15, pct: 13.8, color: '#ef4444' },
  { label: 'Closed', value: 24, pct: 22.0, color: '#16a34a' },
];
export const caseStatusOverviewTotal = 109;

// ── Investigation Status donut ──
export const investigationStatusDonut = [
  { label: 'Investigating', value: 34, pct: 38.2, color: '#2563eb' },
  { label: 'Open', value: 24, pct: 27.0, color: '#f59e0b' },
  { label: 'Confirmed Fraud', value: 18, pct: 20.2, color: '#ef4444' },
  { label: 'False Positive', value: 13, pct: 14.6, color: '#16a34a' },
];
export const investigationStatusTotal = 89;

// ── Recent AML Alerts table ──
export const recentAmlAlerts: AmlAlertRow[] = [
  {
    id: 'AML-A-250512-001',
    transactionNo: 'TXN-2505124789',
    customerName: 'Rahim Uddin',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 25000.0,
    currency: 'BDT',
    riskScore: 85,
    riskLevel: 'High',
    alertType: 'Structuring',
    status: 'New',
    assignedOfficer: 'Nusrat Jahan',
    reviewDate: 'May 13, 2025',
  },
  {
    id: 'AML-A-250512-002',
    transactionNo: 'TXN-2505124788',
    customerName: 'Maria Santos',
    country: 'Philippines',
    flag: '🇵🇭',
    amount: 15000.0,
    currency: 'PHP',
    riskScore: 72,
    riskLevel: 'Medium',
    alertType: 'High Amount',
    status: 'Under Review',
    assignedOfficer: 'Arif Khan',
    reviewDate: 'May 13, 2025',
  },
  {
    id: 'AML-A-250512-003',
    transactionNo: 'TXN-2505124787',
    customerName: 'Sabir Hossain',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 30000.0,
    currency: 'BDT',
    riskScore: 91,
    riskLevel: 'High',
    alertType: 'Round Tripping',
    status: 'Escalated',
    assignedOfficer: 'Kamrul Hasan',
    reviewDate: 'May 14, 2025',
  },
  {
    id: 'AML-A-250512-004',
    transactionNo: 'TXN-2505124786',
    customerName: 'David Wilson',
    country: 'United Kingdom',
    flag: '🇬🇧',
    amount: 12500.0,
    currency: 'GBP',
    riskScore: 45,
    riskLevel: 'Low',
    alertType: 'Unusual Pattern',
    status: 'Under Review',
    assignedOfficer: 'Fatima Ali',
    reviewDate: 'May 13, 2025',
  },
  {
    id: 'AML-A-250512-005',
    transactionNo: 'TXN-2505124785',
    customerName: 'Imran Hossain',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 18000.0,
    currency: 'BDT',
    riskScore: 65,
    riskLevel: 'Medium',
    alertType: 'Multiple Txns',
    status: 'New',
    assignedOfficer: 'Nusrat Jahan',
    reviewDate: 'May 12, 2025',
  },
];

// ── Recent Fraud Cases table ──
export const recentFraudCases: FraudCaseRow[] = [
  {
    id: 'FRAUD-C-250512-001',
    customerName: 'Ahmed Khan',
    fraudType: 'Duplicate Transaction',
    riskScore: 89,
    status: 'Investigating',
  },
  {
    id: 'FRAUD-C-250512-002',
    customerName: 'Fatima Ali',
    fraudType: 'Account Takeover',
    riskScore: 95,
    status: 'Open',
  },
  {
    id: 'FRAUD-C-250512-003',
    customerName: 'John Doe',
    fraudType: 'Payment Fraud',
    riskScore: 78,
    status: 'Investigating',
  },
  {
    id: 'FRAUD-C-250512-004',
    customerName: 'Sophie Martin',
    fraudType: 'Velocity Fraud',
    riskScore: 66,
    status: 'Open',
  },
  {
    id: 'FRAUD-C-250512-005',
    customerName: 'Rashed Alam',
    fraudType: 'False Information',
    riskScore: 40,
    status: 'Investigating',
  },
];

// ── Recent Audit Logs table ──
export const recentAuditLogs: AuditLogRow[] = [
  {
    id: 'LOG-001',
    time: 'May 12, 2025 10:30 AM',
    user: 'Nusrat Jahan',
    action: 'Approve Transaction',
    module: 'Transactions',
    ipAddress: '192.168.1.45',
  },
  {
    id: 'LOG-002',
    time: 'May 12, 2025 10:25 AM',
    user: 'Arif Khan',
    action: 'Update Exchange Rate',
    module: 'Exchange Rates',
    ipAddress: '192.168.1.32',
  },
  {
    id: 'LOG-003',
    time: 'May 12, 2025 10:20 AM',
    user: 'Kamrul Hasan',
    action: 'Add Pickup Request',
    module: 'Pickup Requests',
    ipAddress: '192.168.1.28',
  },
  {
    id: 'LOG-004',
    time: 'May 12, 2025 10:15 AM',
    user: 'Fatima Ali',
    action: 'Login',
    module: 'Authentication',
    ipAddress: '192.168.1.45',
  },
  {
    id: 'LOG-005',
    time: 'May 12, 2025 10:05 AM',
    user: 'Nusrat Jahan',
    action: 'Edit Customer',
    module: 'Customers',
    ipAddress: '192.168.1.46',
  },
];

// ── Sanctions Screening (sidebar widget) ──
export const sanctionsScreening = {
  screenedTransactions: 8642,
  hitsFound: 3,
  cleared: 8639,
  hitRatePct: 0.03,
};

// ── PEP Screening (sidebar widget) ──
export const pepScreening = {
  screenedCustomers: 2451,
  pepMatches: 7,
  cleared: 2444,
  matchRatePct: 0.29,
};

// ── Risk Assessment Summary table ──
export const riskAssessmentSummary: RiskAssessmentRow[] = [
  { category: 'Low', customers: 656, pct: 52.6, trendPct: 5.2, trendUp: true },
  {
    category: 'Medium',
    customers: 352,
    pct: 28.2,
    trendPct: 3.1,
    trendUp: true,
  },
  {
    category: 'High',
    customers: 168,
    pct: 13.5,
    trendPct: 1.8,
    trendUp: false,
  },
  {
    category: 'Critical',
    customers: 72,
    pct: 5.7,
    trendPct: 0.6,
    trendUp: false,
  },
];

export const COMPLIANCE_TABS = [
  'Recent AML Alerts',
  'Recent Fraud Alerts',
  'Open Investigations',
  'Risk Reviews Due',
] as const;

// ============ KYC & COMPLIANCE — AML MONITORING (standalone page) ============
export interface AmlMonitoringAlert {
  id: string;
  transactionNo: string;
  customerName: string;
  customerId: string;
  country: string;
  flag: string;
  amount: number;
  currency: string;
  riskScore: number;
  riskLevel: AlertRiskLevel;
  alertType: string;
  ruleTriggered: string;
  status: AlertStatus;
  assignedOfficer: string;
  createdAt: string;
  reviewDate: string;
}

// ── Stats ──
export const amlMonitoringStats = {
  totalAlerts: 156,
  newAlerts: 38,
  underReview: 64,
  escalated: 22,
  cleared: 32,
  avgRiskScore: 61.4,
};

// ── Alert type / rule options ──
export const amlAlertTypeOptions = [
  'All Types',
  'Structuring',
  'High Amount',
  'Round Tripping',
  'Unusual Pattern',
  'Multiple Txns',
  'Velocity Breach',
];
export const amlRiskLevelOptions = [
  'All Levels',
  'Low',
  'Medium',
  'High',
  'Critical',
];
export const amlStatusOptionsFull = [
  'All Status',
  'New',
  'Under Review',
  'Escalated',
  'Cleared',
];

// ── Full AML alert list ──
export const amlMonitoringAlerts: AmlMonitoringAlert[] = [
  {
    id: 'AML-A-250512-001',
    transactionNo: 'TXN-2505124789',
    customerName: 'Rahim Uddin',
    customerId: 'CUS-10041',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 25000.0,
    currency: 'BDT',
    riskScore: 85,
    riskLevel: 'High',
    alertType: 'Structuring',
    ruleTriggered: 'Multiple sub-threshold deposits within 24h',
    status: 'New',
    assignedOfficer: 'Nusrat Jahan',
    createdAt: 'May 12, 2025 2:30 PM',
    reviewDate: 'May 13, 2025',
  },
  {
    id: 'AML-A-250512-002',
    transactionNo: 'TXN-2505124788',
    customerName: 'Maria Santos',
    customerId: 'CUS-10042',
    country: 'Philippines',
    flag: '🇵🇭',
    amount: 15000.0,
    currency: 'PHP',
    riskScore: 72,
    riskLevel: 'Medium',
    alertType: 'High Amount',
    ruleTriggered: 'Single transaction exceeds £10,000 equivalent',
    status: 'Under Review',
    assignedOfficer: 'Arif Khan',
    createdAt: 'May 12, 2025 11:15 AM',
    reviewDate: 'May 13, 2025',
  },
  {
    id: 'AML-A-250512-003',
    transactionNo: 'TXN-2505124787',
    customerName: 'Sabir Hossain',
    customerId: 'CUS-10043',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 30000.0,
    currency: 'BDT',
    riskScore: 91,
    riskLevel: 'High',
    alertType: 'Round Tripping',
    ruleTriggered: 'Funds returned to originating account within 48h',
    status: 'Escalated',
    assignedOfficer: 'Kamrul Hasan',
    createdAt: 'May 12, 2025 10:05 AM',
    reviewDate: 'May 14, 2025',
  },
  {
    id: 'AML-A-250512-004',
    transactionNo: 'TXN-2505124786',
    customerName: 'David Wilson',
    customerId: 'CUS-10044',
    country: 'United Kingdom',
    flag: '🇬🇧',
    amount: 12500.0,
    currency: 'GBP',
    riskScore: 45,
    riskLevel: 'Low',
    alertType: 'Unusual Pattern',
    ruleTriggered: 'Transaction time outside normal customer behavior',
    status: 'Under Review',
    assignedOfficer: 'Fatima Ali',
    createdAt: 'May 11, 2025 6:45 PM',
    reviewDate: 'May 13, 2025',
  },
  {
    id: 'AML-A-250512-005',
    transactionNo: 'TXN-2505124785',
    customerName: 'Imran Hossain',
    customerId: 'CUS-10045',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 18000.0,
    currency: 'BDT',
    riskScore: 65,
    riskLevel: 'Medium',
    alertType: 'Multiple Txns',
    ruleTriggered: '5+ transactions within 1 hour window',
    status: 'New',
    assignedOfficer: 'Nusrat Jahan',
    createdAt: 'May 11, 2025 4:20 PM',
    reviewDate: 'May 12, 2025',
  },
  {
    id: 'AML-A-250511-006',
    transactionNo: 'TXN-2505124784',
    customerName: 'Karim Hassan',
    customerId: 'CUS-10046',
    country: 'Germany',
    flag: '🇩🇪',
    amount: 9800.0,
    currency: 'EUR',
    riskScore: 38,
    riskLevel: 'Low',
    alertType: 'Velocity Breach',
    ruleTriggered: 'Transaction count exceeded weekly limit',
    status: 'Cleared',
    assignedOfficer: 'Arif Khan',
    createdAt: 'May 11, 2025 1:30 PM',
    reviewDate: 'May 11, 2025',
  },
  {
    id: 'AML-A-250511-007',
    transactionNo: 'TXN-2505124783',
    customerName: 'Farida Begum',
    customerId: 'CUS-10047',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 42000.0,
    currency: 'BDT',
    riskScore: 88,
    riskLevel: 'High',
    alertType: 'High Amount',
    ruleTriggered: 'Single transaction exceeds tier limit',
    status: 'Escalated',
    assignedOfficer: 'Kamrul Hasan',
    createdAt: 'May 11, 2025 9:30 AM',
    reviewDate: 'May 13, 2025',
  },
  {
    id: 'AML-A-250510-008',
    transactionNo: 'TXN-2505124782',
    customerName: 'James Okafor',
    customerId: 'CUS-10048',
    country: 'Nigeria',
    flag: '🇳🇬',
    amount: 7200.0,
    currency: 'NGN',
    riskScore: 55,
    riskLevel: 'Medium',
    alertType: 'Unusual Pattern',
    ruleTriggered: 'New recipient added to high-frequency sender',
    status: 'Cleared',
    assignedOfficer: 'Fatima Ali',
    createdAt: 'May 10, 2025 3:15 PM',
    reviewDate: 'May 11, 2025',
  },
  {
    id: 'AML-A-250510-009',
    transactionNo: 'TXN-2505124781',
    customerName: 'Tariq Mahmud',
    customerId: 'CUS-10049',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 33500.0,
    currency: 'BDT',
    riskScore: 79,
    riskLevel: 'High',
    alertType: 'Structuring',
    ruleTriggered: 'Cash equivalent deposits split across agents',
    status: 'Under Review',
    assignedOfficer: 'Nusrat Jahan',
    createdAt: 'May 10, 2025 11:00 AM',
    reviewDate: 'May 12, 2025',
  },
  {
    id: 'AML-A-250509-010',
    transactionNo: 'TXN-2505124780',
    customerName: 'Priya Sharma',
    customerId: 'CUS-10050',
    country: 'India',
    flag: '🇮🇳',
    amount: 5600.0,
    currency: 'INR',
    riskScore: 29,
    riskLevel: 'Low',
    alertType: 'Multiple Txns',
    ruleTriggered: 'Repeated low-value transactions',
    status: 'Cleared',
    assignedOfficer: 'Arif Khan',
    createdAt: 'May 9, 2025 5:20 PM',
    reviewDate: 'May 10, 2025',
  },
  {
    id: 'AML-A-250509-011',
    transactionNo: 'TXN-2505124779',
    customerName: 'Mohammed Al-Rashid',
    customerId: 'CUS-10051',
    country: 'UAE',
    flag: '🇦🇪',
    amount: 28400.0,
    currency: 'AED',
    riskScore: 70,
    riskLevel: 'Medium',
    alertType: 'Round Tripping',
    ruleTriggered: 'Circular fund movement detected across 3 accounts',
    status: 'New',
    assignedOfficer: 'Kamrul Hasan',
    createdAt: 'May 9, 2025 2:10 PM',
    reviewDate: 'May 10, 2025',
  },
  {
    id: 'AML-A-250508-012',
    transactionNo: 'TXN-2505124778',
    customerName: 'Sumon Mia',
    customerId: 'CUS-10052',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 95000.0,
    currency: 'BDT',
    riskScore: 96,
    riskLevel: 'Critical',
    alertType: 'High Amount',
    ruleTriggered:
      'Transaction exceeds 90th percentile of customer history by 10x',
    status: 'Escalated',
    assignedOfficer: 'Nusrat Jahan',
    createdAt: 'May 8, 2025 9:45 AM',
    reviewDate: 'May 9, 2025',
  },
];

// ============ KYC & COMPLIANCE — FRAUD DETECTION (standalone page) ============
export type FraudDetectionStatus =
  | 'Open'
  | 'Investigating'
  | 'Confirmed Fraud'
  | 'False Positive'
  | 'Resolved';
export type FraudDetectionMethod =
  | 'ML Model'
  | 'Rule Engine'
  | 'Manual Flag'
  | 'Customer Report';

export interface FraudDetectionCase {
  id: string;
  transactionNo: string;
  customerName: string;
  customerId: string;
  country: string;
  flag: string;
  amount: number;
  currency: string;
  fraudScore: number;
  fraudType: string;
  detectionMethod: FraudDetectionMethod;
  status: FraudDetectionStatus;
  assignedAnalyst: string;
  detectedAt: string;
  channel: 'Web' | 'Mobile' | 'API' | 'Agent';
}

// ── Stats ──
export const fraudDetectionStats = {
  totalCases: 89,
  openCases: 24,
  investigating: 34,
  confirmedFraud: 18,
  falsePositive: 13,
  blockedAmount: 284600,
};

// ── Filter options ──
export const fraudTypeOptions = [
  'All Types',
  'Duplicate Transaction',
  'Account Takeover',
  'Payment Fraud',
  'Velocity Fraud',
  'False Information',
  'Identity Theft',
  'Synthetic Identity',
];
export const fraudDetectionMethodOptions = [
  'All Methods',
  'ML Model',
  'Rule Engine',
  'Manual Flag',
  'Customer Report',
];
export const fraudDetectionStatusOptions = [
  'All Status',
  'Open',
  'Investigating',
  'Confirmed Fraud',
  'False Positive',
  'Resolved',
];

// ── Fraud cases ──
export const fraudDetectionCases: FraudDetectionCase[] = [
  {
    id: 'FRAUD-C-250512-001',
    transactionNo: 'TXN-2505124720',
    customerName: 'Ahmed Khan',
    customerId: 'CUS-10061',
    country: 'United Kingdom',
    flag: '🇬🇧',
    amount: 1850.0,
    currency: 'GBP',
    fraudScore: 89,
    fraudType: 'Duplicate Transaction',
    detectionMethod: 'ML Model',
    status: 'Investigating',
    assignedAnalyst: 'Sarah Johnson',
    detectedAt: 'May 12, 2025 10:30 AM',
    channel: 'Mobile',
  },
  {
    id: 'FRAUD-C-250512-002',
    transactionNo: 'TXN-2505124721',
    customerName: 'Fatima Ali',
    customerId: 'CUS-10062',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 3200.0,
    currency: 'GBP',
    fraudScore: 95,
    fraudType: 'Account Takeover',
    detectionMethod: 'Rule Engine',
    status: 'Open',
    assignedAnalyst: 'Ahmed Khan',
    detectedAt: 'May 12, 2025 10:25 AM',
    channel: 'Web',
  },
  {
    id: 'FRAUD-C-250512-003',
    transactionNo: 'TXN-2505124722',
    customerName: 'John Doe',
    customerId: 'CUS-10063',
    country: 'United States',
    flag: '🇺🇸',
    amount: 980.0,
    currency: 'USD',
    fraudScore: 78,
    fraudType: 'Payment Fraud',
    detectionMethod: 'ML Model',
    status: 'Investigating',
    assignedAnalyst: 'Imran Hossain',
    detectedAt: 'May 12, 2025 10:20 AM',
    channel: 'API',
  },
  {
    id: 'FRAUD-C-250512-004',
    transactionNo: 'TXN-2505124723',
    customerName: 'Sophie Martin',
    customerId: 'CUS-10064',
    country: 'France',
    flag: '🇫🇷',
    amount: 650.0,
    currency: 'EUR',
    fraudScore: 66,
    fraudType: 'Velocity Fraud',
    detectionMethod: 'Rule Engine',
    status: 'Open',
    assignedAnalyst: 'Sarah Johnson',
    detectedAt: 'May 12, 2025 10:15 AM',
    channel: 'Mobile',
  },
  {
    id: 'FRAUD-C-250512-005',
    transactionNo: 'TXN-2505124724',
    customerName: 'Rashed Alam',
    customerId: 'CUS-10065',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 4500.0,
    currency: 'BDT',
    fraudScore: 40,
    fraudType: 'False Information',
    detectionMethod: 'Manual Flag',
    status: 'Investigating',
    assignedAnalyst: 'Ahmed Khan',
    detectedAt: 'May 12, 2025 10:05 AM',
    channel: 'Agent',
  },
  {
    id: 'FRAUD-C-250511-006',
    transactionNo: 'TXN-2505124710',
    customerName: 'Hassan Al-Maktoum',
    customerId: 'CUS-10066',
    country: 'UAE',
    flag: '🇦🇪',
    amount: 5800.0,
    currency: 'AED',
    fraudScore: 91,
    fraudType: 'Identity Theft',
    detectionMethod: 'ML Model',
    status: 'Confirmed Fraud',
    assignedAnalyst: 'Imran Hossain',
    detectedAt: 'May 11, 2025 8:40 PM',
    channel: 'Web',
  },
  {
    id: 'FRAUD-C-250511-007',
    transactionNo: 'TXN-2505124711',
    customerName: 'Maria Santos',
    customerId: 'CUS-10067',
    country: 'Philippines',
    flag: '🇵🇭',
    amount: 320.0,
    currency: 'PHP',
    fraudScore: 22,
    fraudType: 'Velocity Fraud',
    detectionMethod: 'Rule Engine',
    status: 'False Positive',
    assignedAnalyst: 'Sarah Johnson',
    detectedAt: 'May 11, 2025 5:15 PM',
    channel: 'Mobile',
  },
  {
    id: 'FRAUD-C-250511-008',
    transactionNo: 'TXN-2505124712',
    customerName: 'David Wilson',
    customerId: 'CUS-10068',
    country: 'United Kingdom',
    flag: '🇬🇧',
    amount: 2100.0,
    currency: 'GBP',
    fraudScore: 84,
    fraudType: 'Synthetic Identity',
    detectionMethod: 'ML Model',
    status: 'Confirmed Fraud',
    assignedAnalyst: 'Ahmed Khan',
    detectedAt: 'May 11, 2025 2:30 PM',
    channel: 'Web',
  },
  {
    id: 'FRAUD-C-250510-009',
    transactionNo: 'TXN-2505124700',
    customerName: 'Omar Sheikh',
    customerId: 'CUS-10069',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    amount: 7600.0,
    currency: 'SAR',
    fraudScore: 73,
    fraudType: 'Payment Fraud',
    detectionMethod: 'Customer Report',
    status: 'Investigating',
    assignedAnalyst: 'Imran Hossain',
    detectedAt: 'May 10, 2025 11:50 AM',
    channel: 'API',
  },
  {
    id: 'FRAUD-C-250510-010',
    transactionNo: 'TXN-2505124701',
    customerName: 'Nadia Islam',
    customerId: 'CUS-10070',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 1200.0,
    currency: 'BDT',
    fraudScore: 15,
    fraudType: 'False Information',
    detectionMethod: 'Manual Flag',
    status: 'Resolved',
    assignedAnalyst: 'Sarah Johnson',
    detectedAt: 'May 10, 2025 9:00 AM',
    channel: 'Agent',
  },
  {
    id: 'FRAUD-C-250509-011',
    transactionNo: 'TXN-2505124690',
    customerName: 'Karim Hossain',
    customerId: 'CUS-10071',
    country: 'Bangladesh',
    flag: '🇧🇩',
    amount: 12400.0,
    currency: 'BDT',
    fraudScore: 97,
    fraudType: 'Account Takeover',
    detectionMethod: 'ML Model',
    status: 'Confirmed Fraud',
    assignedAnalyst: 'Ahmed Khan',
    detectedAt: 'May 9, 2025 4:10 PM',
    channel: 'Mobile',
  },
  {
    id: 'FRAUD-C-250508-012',
    transactionNo: 'TXN-2505124680',
    customerName: 'Lena Fischer',
    customerId: 'CUS-10072',
    country: 'Germany',
    flag: '🇩🇪',
    amount: 540.0,
    currency: 'EUR',
    fraudScore: 31,
    fraudType: 'Duplicate Transaction',
    detectionMethod: 'Rule Engine',
    status: 'False Positive',
    assignedAnalyst: 'Imran Hossain',
    detectedAt: 'May 8, 2025 1:25 PM',
    channel: 'Web',
  },
];

// ============ KYC & COMPLIANCE — AUDIT LOGS (standalone page) ============
export type AuditLogSeverity = 'Info' | 'Warning' | 'Critical';
export type AuditLogModule =
  | 'Transactions'
  | 'Exchange Rates'
  | 'Pickup Requests'
  | 'Authentication'
  | 'Customers'
  | 'Agents'
  | 'Payment Methods'
  | 'KYC'
  | 'Settings'
  | 'Wallets';

export interface AuditLogDetail {
  id: string;
  time: string;
  user: string;
  userRole: string;
  action: string;
  module: AuditLogModule;
  ipAddress: string;
  severity: AuditLogSeverity;
  details: string;
  recordId: string | null;
}

// ── Stats ──
export const auditLogsStats = {
  totalEventsToday: 1248,
  criticalEvents: 12,
  failedLogins: 8,
  uniqueUsers: 34,
};

// ── Filter options ──
export const auditModuleOptions = [
  'All Modules',
  'Transactions',
  'Exchange Rates',
  'Pickup Requests',
  'Authentication',
  'Customers',
  'Agents',
  'Payment Methods',
  'KYC',
  'Settings',
  'Wallets',
];
export const auditSeverityOptions = [
  'All Severity',
  'Info',
  'Warning',
  'Critical',
];

// ── Audit log entries ──
export const auditLogDetails: AuditLogDetail[] = [
  {
    id: 'LOG-001',
    time: 'May 12, 2025 10:30 AM',
    user: 'Nusrat Jahan',
    userRole: 'Compliance Officer',
    action: 'Approve Transaction',
    module: 'Transactions',
    ipAddress: '192.168.1.45',
    severity: 'Info',
    details: 'Approved transaction TXN-2505124789 after AML review',
    recordId: 'TXN-2505124789',
  },
  {
    id: 'LOG-002',
    time: 'May 12, 2025 10:25 AM',
    user: 'Arif Khan',
    userRole: 'Finance Manager',
    action: 'Update Exchange Rate',
    module: 'Exchange Rates',
    ipAddress: '192.168.1.32',
    severity: 'Info',
    details: 'Updated GBP/BDT rate from 164.98 to 165.25',
    recordId: 'RATE-001',
  },
  {
    id: 'LOG-003',
    time: 'May 12, 2025 10:20 AM',
    user: 'Kamrul Hasan',
    userRole: 'Operations Manager',
    action: 'Add Pickup Request',
    module: 'Pickup Requests',
    ipAddress: '192.168.1.28',
    severity: 'Info',
    details: 'Created new cash pickup request for customer CUS-10041',
    recordId: 'TXN-2505124790',
  },
  {
    id: 'LOG-004',
    time: 'May 12, 2025 10:15 AM',
    user: 'Fatima Ali',
    userRole: 'Compliance Officer',
    action: 'Login',
    module: 'Authentication',
    ipAddress: '192.168.1.45',
    severity: 'Info',
    details: 'Successful login from registered device',
    recordId: null,
  },
  {
    id: 'LOG-005',
    time: 'May 12, 2025 10:05 AM',
    user: 'Nusrat Jahan',
    userRole: 'Compliance Officer',
    action: 'Edit Customer',
    module: 'Customers',
    ipAddress: '192.168.1.46',
    severity: 'Info',
    details: 'Updated phone number for customer CUS-10044',
    recordId: 'CUS-10044',
  },
  {
    id: 'LOG-006',
    time: 'May 12, 2025 9:50 AM',
    user: 'Unknown',
    userRole: '—',
    action: 'Failed Login Attempt',
    module: 'Authentication',
    ipAddress: '203.0.113.55',
    severity: 'Warning',
    details: 'Three consecutive failed login attempts for admin@sendmoney.com',
    recordId: null,
  },
  {
    id: 'LOG-007',
    time: 'May 12, 2025 9:40 AM',
    user: 'Ahmed Khan',
    userRole: 'Super Admin',
    action: 'Delete Agent',
    module: 'Agents',
    ipAddress: '192.168.1.12',
    severity: 'Critical',
    details: 'Permanently removed agent AGT-1099 from the system',
    recordId: 'AGT-1099',
  },
  {
    id: 'LOG-008',
    time: 'May 12, 2025 9:30 AM',
    user: 'Sarah Johnson',
    userRole: 'Risk Analyst',
    action: 'Override Exchange Rate',
    module: 'Exchange Rates',
    ipAddress: '192.168.1.50',
    severity: 'Warning',
    details: 'Manual override applied to GBP/PKR rate — 12h duration',
    recordId: 'OVR-003',
  },
  {
    id: 'LOG-009',
    time: 'May 12, 2025 9:15 AM',
    user: 'Imran Hossain',
    userRole: 'Compliance Officer',
    action: 'Approve KYC',
    module: 'KYC',
    ipAddress: '192.168.1.33',
    severity: 'Info',
    details: 'Approved Tier 2 KYC verification for customer CUS-10049',
    recordId: 'CUS-10049',
  },
  {
    id: 'LOG-010',
    time: 'May 12, 2025 9:00 AM',
    user: 'Tariq Mahmud',
    userRole: 'Operations Manager',
    action: 'Add Payment Method',
    module: 'Payment Methods',
    ipAddress: '192.168.1.41',
    severity: 'Info',
    details: 'Added new mobile wallet integration: Easypaisa',
    recordId: 'PM-013',
  },
  {
    id: 'LOG-011',
    time: 'May 12, 2025 8:50 AM',
    user: 'Ahmed Khan',
    userRole: 'Super Admin',
    action: 'Change System Setting',
    module: 'Settings',
    ipAddress: '192.168.1.12',
    severity: 'Critical',
    details: 'Changed default transaction fee policy for all corridors',
    recordId: 'SET-007',
  },
  {
    id: 'LOG-012',
    time: 'May 12, 2025 8:35 AM',
    user: 'Kamal Hossain',
    userRole: 'Branch Manager',
    action: 'Withdraw Funds',
    module: 'Wallets',
    ipAddress: '192.168.1.19',
    severity: 'Warning',
    details: 'Large withdrawal of £12,000 from GBP Operating Account',
    recordId: 'WDR-26061802',
  },
  {
    id: 'LOG-013',
    time: 'May 11, 2025 6:45 PM',
    user: 'Fatima Ali',
    userRole: 'Compliance Officer',
    action: 'Reject Transaction',
    module: 'Transactions',
    ipAddress: '192.168.1.45',
    severity: 'Warning',
    details: 'Rejected transaction TXN-2505124777 — sanctions list match',
    recordId: 'TXN-2505124777',
  },
  {
    id: 'LOG-014',
    time: 'May 11, 2025 5:20 PM',
    user: 'Unknown',
    userRole: '—',
    action: 'Failed Login Attempt',
    module: 'Authentication',
    ipAddress: '198.51.100.23',
    severity: 'Warning',
    details: 'Login attempt from unrecognized IP address',
    recordId: null,
  },
  {
    id: 'LOG-015',
    time: 'May 11, 2025 4:10 PM',
    user: 'Nusrat Jahan',
    userRole: 'Compliance Officer',
    action: 'Escalate Alert',
    module: 'KYC',
    ipAddress: '192.168.1.46',
    severity: 'Critical',
    details: 'Escalated AML alert AML-A-250511-007 to senior review',
    recordId: 'AML-A-250511-007',
  },
];

// ============ KYC & COMPLIANCE — RISK MANAGEMENT (standalone page) ============
export type RiskRuleStatus = 'Active' | 'Inactive';
export type RiskRuleCategory =
  | 'Transaction Behavior'
  | 'Geographic'
  | 'Identity'
  | 'Velocity'
  | 'Account Activity';

export interface RiskRule {
  id: string;
  name: string;
  category: RiskRuleCategory;
  description: string;
  weight: number;
  triggerCount: number;
  status: RiskRuleStatus;
  lastUpdated: string;
}

export interface CustomerRiskScore {
  id: string;
  customerName: string;
  customerId: string;
  country: string;
  flag: string;
  riskScore: number;
  riskLevel: AlertRiskLevel;
  kycTier: string;
  lastAssessed: string;
  topFactor: string;
  trend: 'up' | 'down' | 'stable';
}

// ── Stats ──
export const riskManagementStats = {
  totalScored: 1248,
  lowRisk: 656,
  mediumRisk: 352,
  highRisk: 168,
  criticalRisk: 72,
  avgRiskScore: 34.2,
};

export const riskRuleCategoryOptions = [
  'All Categories',
  'Transaction Behavior',
  'Geographic',
  'Identity',
  'Velocity',
  'Account Activity',
];
export const riskRuleStatusOptions = ['All Status', 'Active', 'Inactive'];
export const riskLevelOptionsFull = [
  'All Levels',
  'Low',
  'Medium',
  'High',
  'Critical',
];

// ── Risk Rules ──
export const riskRules: RiskRule[] = [
  {
    id: 'RR-001',
    name: 'High-Value Single Transaction',
    category: 'Transaction Behavior',
    description: 'Flags transactions exceeding £10,000 in a single transfer',
    weight: 25,
    triggerCount: 142,
    status: 'Active',
    lastUpdated: 'May 1, 2025',
  },
  {
    id: 'RR-002',
    name: 'Sanctioned Country Corridor',
    category: 'Geographic',
    description:
      'Flags transfers to or from countries on the sanctions watchlist',
    weight: 40,
    triggerCount: 8,
    status: 'Active',
    lastUpdated: 'Apr 28, 2025',
  },
  {
    id: 'RR-003',
    name: 'Mismatched Identity Document',
    category: 'Identity',
    description:
      'Flags customers whose ID document name does not match account name',
    weight: 30,
    triggerCount: 23,
    status: 'Active',
    lastUpdated: 'Apr 20, 2025',
  },
  {
    id: 'RR-004',
    name: 'Velocity Breach (24h)',
    category: 'Velocity',
    description: 'Flags more than 5 transactions within a 24-hour window',
    weight: 20,
    triggerCount: 96,
    status: 'Active',
    lastUpdated: 'May 5, 2025',
  },
  {
    id: 'RR-005',
    name: 'Dormant Account Reactivation',
    category: 'Account Activity',
    description: 'Flags large transactions on accounts dormant for 90+ days',
    weight: 18,
    triggerCount: 34,
    status: 'Active',
    lastUpdated: 'Apr 15, 2025',
  },
  {
    id: 'RR-006',
    name: 'Rapid Fund In-Out',
    category: 'Transaction Behavior',
    description: 'Flags funds withdrawn within 1 hour of deposit',
    weight: 22,
    triggerCount: 57,
    status: 'Active',
    lastUpdated: 'May 8, 2025',
  },
  {
    id: 'RR-007',
    name: 'Multiple Failed KYC Attempts',
    category: 'Identity',
    description: 'Flags customers with 3+ failed KYC verification attempts',
    weight: 28,
    triggerCount: 15,
    status: 'Active',
    lastUpdated: 'Apr 22, 2025',
  },
  {
    id: 'RR-008',
    name: 'New Account High Volume',
    category: 'Account Activity',
    description:
      'Flags accounts under 7 days old with transaction volume above £5,000',
    weight: 24,
    triggerCount: 41,
    status: 'Inactive',
    lastUpdated: 'Mar 30, 2025',
  },
  {
    id: 'RR-009',
    name: 'IP Geolocation Mismatch',
    category: 'Geographic',
    description:
      'Flags logins from IP locations inconsistent with registered country',
    weight: 15,
    triggerCount: 68,
    status: 'Active',
    lastUpdated: 'May 3, 2025',
  },
  {
    id: 'RR-010',
    name: 'Structuring Pattern Detection',
    category: 'Transaction Behavior',
    description:
      'Flags multiple sub-threshold transactions that sum above reporting limit',
    weight: 35,
    triggerCount: 19,
    status: 'Active',
    lastUpdated: 'May 9, 2025',
  },
];

// ── Customer Risk Scores ──
export const customerRiskScores: CustomerRiskScore[] = [
  {
    id: 'CRS-001',
    customerName: 'Sumon Mia',
    customerId: 'CUS-10052',
    country: 'Bangladesh',
    flag: '🇧🇩',
    riskScore: 96,
    riskLevel: 'Critical',
    kycTier: 'Tier 1',
    lastAssessed: 'May 12, 2025',
    topFactor: 'High-Value Single Transaction',
    trend: 'up',
  },
  {
    id: 'CRS-002',
    customerName: 'Karim Hossain',
    customerId: 'CUS-10043',
    country: 'Bangladesh',
    flag: '🇧🇩',
    riskScore: 91,
    riskLevel: 'High',
    kycTier: 'Tier 1',
    lastAssessed: 'May 12, 2025',
    topFactor: 'Round Tripping Pattern',
    trend: 'up',
  },
  {
    id: 'CRS-003',
    customerName: 'Hassan Al-Maktoum',
    customerId: 'CUS-10066',
    country: 'UAE',
    flag: '🇦🇪',
    riskScore: 88,
    riskLevel: 'High',
    kycTier: 'Tier 2',
    lastAssessed: 'May 11, 2025',
    topFactor: 'Mismatched Identity Document',
    trend: 'stable',
  },
  {
    id: 'CRS-004',
    customerName: 'Farida Begum',
    customerId: 'CUS-10047',
    country: 'Bangladesh',
    flag: '🇧🇩',
    riskScore: 79,
    riskLevel: 'High',
    kycTier: 'Tier 2',
    lastAssessed: 'May 11, 2025',
    topFactor: 'Structuring Pattern Detection',
    trend: 'down',
  },
  {
    id: 'CRS-005',
    customerName: 'Mohammed Al-Rashid',
    customerId: 'CUS-10051',
    country: 'UAE',
    flag: '🇦🇪',
    riskScore: 70,
    riskLevel: 'Medium',
    kycTier: 'Tier 2',
    lastAssessed: 'May 10, 2025',
    topFactor: 'Rapid Fund In-Out',
    trend: 'up',
  },
  {
    id: 'CRS-006',
    customerName: 'Maria Santos',
    customerId: 'CUS-10042',
    country: 'Philippines',
    flag: '🇵🇭',
    riskScore: 72,
    riskLevel: 'Medium',
    kycTier: 'Tier 1',
    lastAssessed: 'May 10, 2025',
    topFactor: 'Velocity Breach (24h)',
    trend: 'stable',
  },
  {
    id: 'CRS-007',
    customerName: 'David Wilson',
    customerId: 'CUS-10044',
    country: 'United Kingdom',
    flag: '🇬🇧',
    riskScore: 45,
    riskLevel: 'Low',
    kycTier: 'Tier 3',
    lastAssessed: 'May 9, 2025',
    topFactor: 'IP Geolocation Mismatch',
    trend: 'down',
  },
  {
    id: 'CRS-008',
    customerName: 'Karim Hassan',
    customerId: 'CUS-10046',
    country: 'Germany',
    flag: '🇩🇪',
    riskScore: 38,
    riskLevel: 'Low',
    kycTier: 'Tier 3',
    lastAssessed: 'May 9, 2025',
    topFactor: 'New Account High Volume',
    trend: 'stable',
  },
  {
    id: 'CRS-009',
    customerName: 'Priya Sharma',
    customerId: 'CUS-10050',
    country: 'India',
    flag: '🇮🇳',
    riskScore: 29,
    riskLevel: 'Low',
    kycTier: 'Tier 2',
    lastAssessed: 'May 8, 2025',
    topFactor: 'None — clean profile',
    trend: 'down',
  },
  {
    id: 'CRS-010',
    customerName: 'James Okafor',
    customerId: 'CUS-10048',
    country: 'Nigeria',
    flag: '🇳🇬',
    riskScore: 55,
    riskLevel: 'Medium',
    kycTier: 'Tier 1',
    lastAssessed: 'May 8, 2025',
    topFactor: 'Dormant Account Reactivation',
    trend: 'up',
  },
  {
    id: 'CRS-011',
    customerName: 'Tariq Mahmud',
    customerId: 'CUS-10049',
    country: 'Bangladesh',
    flag: '🇧🇩',
    riskScore: 65,
    riskLevel: 'Medium',
    kycTier: 'Tier 2',
    lastAssessed: 'May 7, 2025',
    topFactor: 'Multiple Failed KYC Attempts',
    trend: 'stable',
  },
  {
    id: 'CRS-012',
    customerName: 'Sadia Rahman',
    customerId: 'CUS-10046b',
    country: 'Bangladesh',
    flag: '🇧🇩',
    riskScore: 18,
    riskLevel: 'Low',
    kycTier: 'Tier 3',
    lastAssessed: 'May 6, 2025',
    topFactor: 'None — clean profile',
    trend: 'down',
  },
];

// ============ KYC & COMPLIANCE — COMPLIANCE CASES (standalone page) ============
export type ComplianceCaseStatus =
  | 'Open'
  | 'Under Review'
  | 'Escalated'
  | 'Closed';
export type ComplianceCasePriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type ComplianceCaseType =
  | 'AML Review'
  | 'Sanctions Match'
  | 'PEP Review'
  | 'Fraud Escalation'
  | 'Regulatory Inquiry'
  | 'Suspicious Activity Report';

export interface ComplianceCase {
  id: string;
  title: string;
  caseType: ComplianceCaseType;
  customerName: string;
  customerId: string;
  country: string;
  flag: string;
  priority: ComplianceCasePriority;
  status: ComplianceCaseStatus;
  assignedOfficer: string;
  relatedAlerts: number;
  openedDate: string;
  dueDate: string;
  lastUpdated: string;
}

// ── Stats ──
export const complianceCasesStats = {
  totalCases: 67,
  openCases: 18,
  underReview: 24,
  escalated: 13,
  closed: 12,
  overdueCases: 5,
};

// ── Filter options ──
export const complianceCaseTypeOptions = [
  'All Types',
  'AML Review',
  'Sanctions Match',
  'PEP Review',
  'Fraud Escalation',
  'Regulatory Inquiry',
  'Suspicious Activity Report',
];
export const compliancePriorityOptions = [
  'All Priority',
  'Low',
  'Medium',
  'High',
  'Urgent',
];
export const complianceCaseStatusOptions = [
  'All Status',
  'Open',
  'Under Review',
  'Escalated',
  'Closed',
];

// ── Compliance Cases ──
export const complianceCases: ComplianceCase[] = [
  {
    id: 'CMP-C-001',
    title: 'Structuring pattern across 3 agents',
    caseType: 'AML Review',
    customerName: 'Sumon Mia',
    customerId: 'CUS-10052',
    country: 'Bangladesh',
    flag: '🇧🇩',
    priority: 'Urgent',
    status: 'Escalated',
    assignedOfficer: 'Nusrat Jahan',
    relatedAlerts: 4,
    openedDate: 'May 8, 2025',
    dueDate: 'May 13, 2025',
    lastUpdated: 'May 12, 2025',
  },
  {
    id: 'CMP-C-002',
    title: 'Potential OFAC sanctions match',
    caseType: 'Sanctions Match',
    customerName: 'Hassan Al-Maktoum',
    customerId: 'CUS-10066',
    country: 'UAE',
    flag: '🇦🇪',
    priority: 'Urgent',
    status: 'Under Review',
    assignedOfficer: 'Arif Khan',
    relatedAlerts: 1,
    openedDate: 'May 9, 2025',
    dueDate: 'May 12, 2025',
    lastUpdated: 'May 12, 2025',
  },
  {
    id: 'CMP-C-003',
    title: 'Politically exposed person verification',
    caseType: 'PEP Review',
    customerName: 'Mohammed Al-Rashid',
    customerId: 'CUS-10051',
    country: 'UAE',
    flag: '🇦🇪',
    priority: 'High',
    status: 'Open',
    assignedOfficer: 'Kamrul Hasan',
    relatedAlerts: 2,
    openedDate: 'May 10, 2025',
    dueDate: 'May 17, 2025',
    lastUpdated: 'May 11, 2025',
  },
  {
    id: 'CMP-C-004',
    title: 'Confirmed account takeover escalation',
    caseType: 'Fraud Escalation',
    customerName: 'Fatima Ali',
    customerId: 'CUS-10062',
    country: 'Bangladesh',
    flag: '🇧🇩',
    priority: 'Urgent',
    status: 'Escalated',
    assignedOfficer: 'Sarah Johnson',
    relatedAlerts: 3,
    openedDate: 'May 11, 2025',
    dueDate: 'May 13, 2025',
    lastUpdated: 'May 12, 2025',
  },
  {
    id: 'CMP-C-005',
    title: 'Regulator information request — FCA',
    caseType: 'Regulatory Inquiry',
    customerName: 'N/A',
    customerId: '—',
    country: 'United Kingdom',
    flag: '🇬🇧',
    priority: 'High',
    status: 'Under Review',
    assignedOfficer: 'Nusrat Jahan',
    relatedAlerts: 0,
    openedDate: 'May 7, 2025',
    dueDate: 'May 21, 2025',
    lastUpdated: 'May 10, 2025',
  },
  {
    id: 'CMP-C-006',
    title: 'SAR filing — round tripping detected',
    caseType: 'Suspicious Activity Report',
    customerName: 'Karim Hossain',
    customerId: 'CUS-10043',
    country: 'Bangladesh',
    flag: '🇧🇩',
    priority: 'High',
    status: 'Escalated',
    assignedOfficer: 'Arif Khan',
    relatedAlerts: 2,
    openedDate: 'May 8, 2025',
    dueDate: 'May 15, 2025',
    lastUpdated: 'May 11, 2025',
  },
  {
    id: 'CMP-C-007',
    title: 'High-value transaction review',
    caseType: 'AML Review',
    customerName: 'Farida Begum',
    customerId: 'CUS-10047',
    country: 'Bangladesh',
    flag: '🇧🇩',
    priority: 'Medium',
    status: 'Open',
    assignedOfficer: 'Kamrul Hasan',
    relatedAlerts: 1,
    openedDate: 'May 11, 2025',
    dueDate: 'May 18, 2025',
    lastUpdated: 'May 11, 2025',
  },
  {
    id: 'CMP-C-008',
    title: 'Customer self-declared PEP status',
    caseType: 'PEP Review',
    customerName: 'Omar Sheikh',
    customerId: 'CUS-10069',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    priority: 'Medium',
    status: 'Under Review',
    assignedOfficer: 'Sarah Johnson',
    relatedAlerts: 0,
    openedDate: 'May 6, 2025',
    dueDate: 'May 20, 2025',
    lastUpdated: 'May 9, 2025',
  },
  {
    id: 'CMP-C-009',
    title: 'Synthetic identity fraud confirmed',
    caseType: 'Fraud Escalation',
    customerName: 'David Wilson',
    customerId: 'CUS-10068',
    country: 'United Kingdom',
    flag: '🇬🇧',
    priority: 'High',
    status: 'Closed',
    assignedOfficer: 'Ahmed Khan',
    relatedAlerts: 2,
    openedDate: 'May 3, 2025',
    dueDate: 'May 10, 2025',
    lastUpdated: 'May 8, 2025',
  },
  {
    id: 'CMP-C-010',
    title: 'Annual compliance audit data request',
    caseType: 'Regulatory Inquiry',
    customerName: 'N/A',
    customerId: '—',
    country: 'Bangladesh',
    flag: '🇧🇩',
    priority: 'Low',
    status: 'Closed',
    assignedOfficer: 'Nusrat Jahan',
    relatedAlerts: 0,
    openedDate: 'Apr 28, 2025',
    dueDate: 'May 12, 2025',
    lastUpdated: 'May 5, 2025',
  },
  {
    id: 'CMP-C-011',
    title: 'Velocity breach SAR consideration',
    caseType: 'Suspicious Activity Report',
    customerName: 'Imran Hossain',
    customerId: 'CUS-10045',
    country: 'Bangladesh',
    flag: '🇧🇩',
    priority: 'Medium',
    status: 'Open',
    assignedOfficer: 'Arif Khan',
    relatedAlerts: 1,
    openedDate: 'May 9, 2025',
    dueDate: 'May 16, 2025',
    lastUpdated: 'May 10, 2025',
  },
  {
    id: 'CMP-C-012',
    title: 'Sanctions list false positive resolved',
    caseType: 'Sanctions Match',
    customerName: 'James Okafor',
    customerId: 'CUS-10048',
    country: 'Nigeria',
    flag: '🇳🇬',
    priority: 'Low',
    status: 'Closed',
    assignedOfficer: 'Kamrul Hasan',
    relatedAlerts: 1,
    openedDate: 'May 4, 2025',
    dueDate: 'May 9, 2025',
    lastUpdated: 'May 7, 2025',
  },
];

// ============ KYC & COMPLIANCE — FRAUD INVESTIGATIONS (standalone page) ============
export type InvestigationStageType =
  | 'Evidence Collection'
  | 'Customer Interview'
  | 'Forensic Analysis'
  | 'Final Reporting';
export type InvestigationOutcome =
  | 'Pending'
  | 'Confirmed Fraud'
  | 'Cleared'
  | 'Inconclusive';
export type InvestigationPriorityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface InvestigationTimelineStep {
  label: string;
  date: string;
  completed: boolean;
}

export interface FraudInvestigation {
  id: string;
  linkedCaseId: string;
  customerName: string;
  customerId: string;
  country: string;
  flag: string;
  investigator: string;
  stage: InvestigationStageType;
  outcome: InvestigationOutcome;
  priority: InvestigationPriorityLevel;
  evidenceCount: number;
  amountInvolved: number;
  currency: string;
  openedDate: string;
  targetCloseDate: string;
  findings: string;
  timeline: InvestigationTimelineStep[];
}

// ── Stats ──
export const fraudInvestigationsStats = {
  totalInvestigations: 34,
  activeInvestigations: 21,
  evidencePending: 9,
  confirmedOutcomes: 18,
  avgResolutionDays: 6.4,
};

// ── Filter options ──
export const investigationStageOptions = [
  'All Stages',
  'Evidence Collection',
  'Customer Interview',
  'Forensic Analysis',
  'Final Reporting',
];
export const investigationOutcomeOptions = [
  'All Outcomes',
  'Pending',
  'Confirmed Fraud',
  'Cleared',
  'Inconclusive',
];
export const investigationPriorityOptions = [
  'All Priority',
  'Low',
  'Medium',
  'High',
  'Critical',
];

// ── Investigations ──
export const fraudInvestigations: FraudInvestigation[] = [
  {
    id: 'INV-2025-001',
    linkedCaseId: 'FRAUD-C-250512-002',
    customerName: 'Fatima Ali',
    customerId: 'CUS-10062',
    country: 'Bangladesh',
    flag: '🇧🇩',
    investigator: 'Sarah Johnson',
    stage: 'Forensic Analysis',
    outcome: 'Pending',
    priority: 'Critical',
    evidenceCount: 7,
    amountInvolved: 3200,
    currency: 'GBP',
    openedDate: 'May 12, 2025',
    targetCloseDate: 'May 16, 2025',
    findings:
      'Device fingerprint mismatch detected; login originated from previously unseen device and IP range inconsistent with customer history.',
    timeline: [
      { label: 'Investigation Opened', date: 'May 12, 2025', completed: true },
      { label: 'Evidence Collection', date: 'May 12, 2025', completed: true },
      { label: 'Customer Interview', date: 'May 13, 2025', completed: true },
      { label: 'Forensic Analysis', date: 'May 14, 2025', completed: false },
      { label: 'Final Reporting', date: 'May 16, 2025', completed: false },
    ],
  },
  {
    id: 'INV-2025-002',
    linkedCaseId: 'FRAUD-C-250511-006',
    customerName: 'Hassan Al-Maktoum',
    customerId: 'CUS-10066',
    country: 'UAE',
    flag: '🇦🇪',
    investigator: 'Ahmed Khan',
    stage: 'Final Reporting',
    outcome: 'Confirmed Fraud',
    priority: 'Critical',
    evidenceCount: 12,
    amountInvolved: 5800,
    currency: 'AED',
    openedDate: 'May 11, 2025',
    targetCloseDate: 'May 15, 2025',
    findings:
      'Synthetic identity confirmed via document forensics; fabricated employment letter and altered passport scan identified.',
    timeline: [
      { label: 'Investigation Opened', date: 'May 11, 2025', completed: true },
      { label: 'Evidence Collection', date: 'May 11, 2025', completed: true },
      { label: 'Customer Interview', date: 'May 12, 2025', completed: true },
      { label: 'Forensic Analysis', date: 'May 13, 2025', completed: true },
      { label: 'Final Reporting', date: 'May 14, 2025', completed: true },
    ],
  },
  {
    id: 'INV-2025-003',
    linkedCaseId: 'FRAUD-C-250512-001',
    customerName: 'Ahmed Khan',
    customerId: 'CUS-10061',
    country: 'United Kingdom',
    flag: '🇬🇧',
    investigator: 'Imran Hossain',
    stage: 'Customer Interview',
    outcome: 'Pending',
    priority: 'High',
    evidenceCount: 4,
    amountInvolved: 1850,
    currency: 'GBP',
    openedDate: 'May 12, 2025',
    targetCloseDate: 'May 17, 2025',
    findings:
      'Duplicate transaction detected within 90 seconds; awaiting customer confirmation on whether transaction was intentional.',
    timeline: [
      { label: 'Investigation Opened', date: 'May 12, 2025', completed: true },
      { label: 'Evidence Collection', date: 'May 12, 2025', completed: true },
      { label: 'Customer Interview', date: 'May 13, 2025', completed: false },
      { label: 'Forensic Analysis', date: 'May 15, 2025', completed: false },
      { label: 'Final Reporting', date: 'May 17, 2025', completed: false },
    ],
  },
  {
    id: 'INV-2025-004',
    linkedCaseId: 'FRAUD-C-250509-011',
    customerName: 'Karim Hossain',
    customerId: 'CUS-10071',
    country: 'Bangladesh',
    flag: '🇧🇩',
    investigator: 'Sarah Johnson',
    stage: 'Final Reporting',
    outcome: 'Confirmed Fraud',
    priority: 'Critical',
    evidenceCount: 15,
    amountInvolved: 12400,
    currency: 'BDT',
    openedDate: 'May 9, 2025',
    targetCloseDate: 'May 13, 2025',
    findings:
      'Account takeover confirmed via SIM swap correlation; unauthorized password reset traced to compromised mobile carrier account.',
    timeline: [
      { label: 'Investigation Opened', date: 'May 9, 2025', completed: true },
      { label: 'Evidence Collection', date: 'May 9, 2025', completed: true },
      { label: 'Customer Interview', date: 'May 10, 2025', completed: true },
      { label: 'Forensic Analysis', date: 'May 11, 2025', completed: true },
      { label: 'Final Reporting', date: 'May 12, 2025', completed: true },
    ],
  },
  {
    id: 'INV-2025-005',
    linkedCaseId: 'FRAUD-C-250511-007',
    customerName: 'Maria Santos',
    customerId: 'CUS-10067',
    country: 'Philippines',
    flag: '🇵🇭',
    investigator: 'Ahmed Khan',
    stage: 'Evidence Collection',
    outcome: 'Inconclusive',
    priority: 'Low',
    evidenceCount: 2,
    amountInvolved: 320,
    currency: 'PHP',
    openedDate: 'May 11, 2025',
    targetCloseDate: 'May 18, 2025',
    findings:
      'Velocity rule triggered on legitimate batch payroll disbursement; pattern consistent with verified business use case.',
    timeline: [
      { label: 'Investigation Opened', date: 'May 11, 2025', completed: true },
      { label: 'Evidence Collection', date: 'May 12, 2025', completed: false },
      { label: 'Customer Interview', date: 'May 14, 2025', completed: false },
      { label: 'Forensic Analysis', date: 'May 16, 2025', completed: false },
      { label: 'Final Reporting', date: 'May 18, 2025', completed: false },
    ],
  },
  {
    id: 'INV-2025-006',
    linkedCaseId: 'FRAUD-C-250510-009',
    customerName: 'Omar Sheikh',
    customerId: 'CUS-10069',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    investigator: 'Imran Hossain',
    stage: 'Forensic Analysis',
    outcome: 'Pending',
    priority: 'Medium',
    evidenceCount: 6,
    amountInvolved: 7600,
    currency: 'SAR',
    openedDate: 'May 10, 2025',
    targetCloseDate: 'May 16, 2025',
    findings:
      'Customer-reported unauthorized transaction; reviewing transaction authorization logs and device session data.',
    timeline: [
      { label: 'Investigation Opened', date: 'May 10, 2025', completed: true },
      { label: 'Evidence Collection', date: 'May 11, 2025', completed: true },
      { label: 'Customer Interview', date: 'May 12, 2025', completed: true },
      { label: 'Forensic Analysis', date: 'May 14, 2025', completed: false },
      { label: 'Final Reporting', date: 'May 16, 2025', completed: false },
    ],
  },
  {
    id: 'INV-2025-007',
    linkedCaseId: 'FRAUD-C-250508-012',
    customerName: 'Lena Fischer',
    customerId: 'CUS-10072',
    country: 'Germany',
    flag: '🇩🇪',
    investigator: 'Sarah Johnson',
    stage: 'Final Reporting',
    outcome: 'Cleared',
    priority: 'Low',
    evidenceCount: 5,
    amountInvolved: 540,
    currency: 'EUR',
    openedDate: 'May 8, 2025',
    targetCloseDate: 'May 12, 2025',
    findings:
      'Duplicate transaction flag resulted from network retry on customer mobile app; single legitimate charge confirmed.',
    timeline: [
      { label: 'Investigation Opened', date: 'May 8, 2025', completed: true },
      { label: 'Evidence Collection', date: 'May 8, 2025', completed: true },
      { label: 'Customer Interview', date: 'May 9, 2025', completed: true },
      { label: 'Forensic Analysis', date: 'May 10, 2025', completed: true },
      { label: 'Final Reporting', date: 'May 11, 2025', completed: true },
    ],
  },
  {
    id: 'INV-2025-008',
    linkedCaseId: 'FRAUD-C-250512-004',
    customerName: 'Sophie Martin',
    customerId: 'CUS-10064',
    country: 'France',
    flag: '🇫🇷',
    investigator: 'Ahmed Khan',
    stage: 'Customer Interview',
    outcome: 'Pending',
    priority: 'Medium',
    evidenceCount: 3,
    amountInvolved: 650,
    currency: 'EUR',
    openedDate: 'May 12, 2025',
    targetCloseDate: 'May 19, 2025',
    findings:
      'Velocity fraud rule triggered on weekend; gathering merchant correlation data before customer follow-up.',
    timeline: [
      { label: 'Investigation Opened', date: 'May 12, 2025', completed: true },
      { label: 'Evidence Collection', date: 'May 12, 2025', completed: true },
      { label: 'Customer Interview', date: 'May 14, 2025', completed: false },
      { label: 'Forensic Analysis', date: 'May 16, 2025', completed: false },
      { label: 'Final Reporting', date: 'May 19, 2025', completed: false },
    ],
  },
];

// ============ KYC & COMPLIANCE — ESCALATIONS (standalone page) ============
export type EscalationLevel =
  | 'Level 1 - Team Lead'
  | 'Level 2 - Senior Manager'
  | 'Level 3 - Executive'
  | 'Level 4 - Regulatory';
export type EscalationStatusType =
  | 'Pending Response'
  | 'Acknowledged'
  | 'In Progress'
  | 'Resolved';
export type EscalationSourceType =
  | 'AML Alert'
  | 'Fraud Case'
  | 'Compliance Case'
  | 'Sanctions Hit'
  | 'PEP Match';

export interface EscalationItem {
  id: string;
  sourceType: EscalationSourceType;
  sourceId: string;
  title: string;
  customerName: string;
  customerId: string;
  country: string;
  flag: string;
  escalatedBy: string;
  escalatedTo: string;
  level: EscalationLevel;
  status: EscalationStatusType;
  escalatedDate: string;
  dueDate: string;
  reason: string;
}

// ── Stats ──
export const escalationsStats = {
  totalEscalations: 28,
  pendingResponse: 9,
  inProgress: 11,
  resolved: 8,
  overdue: 4,
  avgResponseHours: 14.6,
};

// ── Filter options ──
export const escalationSourceOptions = [
  'All Sources',
  'AML Alert',
  'Fraud Case',
  'Compliance Case',
  'Sanctions Hit',
  'PEP Match',
];
export const escalationLevelOptions = [
  'All Levels',
  'Level 1 - Team Lead',
  'Level 2 - Senior Manager',
  'Level 3 - Executive',
  'Level 4 - Regulatory',
];
export const escalationStatusOptions = [
  'All Status',
  'Pending Response',
  'Acknowledged',
  'In Progress',
  'Resolved',
];

// ── Escalations ──
export const escalationItems: EscalationItem[] = [
  {
    id: 'ESC-001',
    sourceType: 'AML Alert',
    sourceId: 'AML-A-250512-003',
    title: 'Round tripping pattern requires senior sign-off',
    customerName: 'Sabir Hossain',
    customerId: 'CUS-10043',
    country: 'Bangladesh',
    flag: '🇧🇩',
    escalatedBy: 'Kamrul Hasan',
    escalatedTo: 'Nusrat Jahan',
    level: 'Level 2 - Senior Manager',
    status: 'Pending Response',
    escalatedDate: 'May 12, 2025',
    dueDate: 'May 13, 2025',
    reason:
      'Risk score above 90 — requires manager approval before account action.',
  },
  {
    id: 'ESC-002',
    sourceType: 'Sanctions Hit',
    sourceId: 'CMP-C-002',
    title: 'Potential OFAC match — urgent review needed',
    customerName: 'Hassan Al-Maktoum',
    customerId: 'CUS-10066',
    country: 'UAE',
    flag: '🇦🇪',
    escalatedBy: 'Arif Khan',
    escalatedTo: 'Ahmed Khan',
    level: 'Level 3 - Executive',
    status: 'In Progress',
    escalatedDate: 'May 9, 2025',
    dueDate: 'May 12, 2025',
    reason:
      'Name match against OFAC SDN list requires executive review prior to fund release.',
  },
  {
    id: 'ESC-003',
    sourceType: 'Fraud Case',
    sourceId: 'FRAUD-C-250512-002',
    title: 'Confirmed account takeover — customer notification required',
    customerName: 'Fatima Ali',
    customerId: 'CUS-10062',
    country: 'Bangladesh',
    flag: '🇧🇩',
    escalatedBy: 'Sarah Johnson',
    escalatedTo: 'Imran Hossain',
    level: 'Level 2 - Senior Manager',
    status: 'Acknowledged',
    escalatedDate: 'May 12, 2025',
    dueDate: 'May 13, 2025',
    reason:
      'Confirmed fraud case requires customer communication plan approval.',
  },
  {
    id: 'ESC-004',
    sourceType: 'Compliance Case',
    sourceId: 'CMP-C-005',
    title: 'FCA information request — legal review needed',
    customerName: 'N/A',
    customerId: '—',
    country: 'United Kingdom',
    flag: '🇬🇧',
    escalatedBy: 'Nusrat Jahan',
    escalatedTo: 'Ahmed Khan',
    level: 'Level 4 - Regulatory',
    status: 'In Progress',
    escalatedDate: 'May 10, 2025',
    dueDate: 'May 21, 2025',
    reason:
      'Regulator inquiry requires legal counsel involvement before formal response.',
  },
  {
    id: 'ESC-005',
    sourceType: 'PEP Match',
    sourceId: 'CMP-C-003',
    title: 'High-profile PEP onboarding decision',
    customerName: 'Mohammed Al-Rashid',
    customerId: 'CUS-10051',
    country: 'UAE',
    flag: '🇦🇪',
    escalatedBy: 'Kamrul Hasan',
    escalatedTo: 'Nusrat Jahan',
    level: 'Level 2 - Senior Manager',
    status: 'Resolved',
    escalatedDate: 'May 6, 2025',
    dueDate: 'May 10, 2025',
    reason:
      'PEP status confirmed — enhanced due diligence approved and account activated with monitoring flag.',
  },
  {
    id: 'ESC-006',
    sourceType: 'AML Alert',
    sourceId: 'AML-A-250511-007',
    title: 'High amount structuring — SAR consideration',
    customerName: 'Farida Begum',
    customerId: 'CUS-10047',
    country: 'Bangladesh',
    flag: '🇧🇩',
    escalatedBy: 'Arif Khan',
    escalatedTo: 'Nusrat Jahan',
    level: 'Level 2 - Senior Manager',
    status: 'Pending Response',
    escalatedDate: 'May 11, 2025',
    dueDate: 'May 12, 2025',
    reason:
      'Pattern consistent with structuring; senior officer decision needed on SAR filing.',
  },
  {
    id: 'ESC-007',
    sourceType: 'Fraud Case',
    sourceId: 'FRAUD-C-250509-011',
    title: 'SIM swap fraud — law enforcement referral',
    customerName: 'Karim Hossain',
    customerId: 'CUS-10071',
    country: 'Bangladesh',
    flag: '🇧🇩',
    escalatedBy: 'Sarah Johnson',
    escalatedTo: 'Ahmed Khan',
    level: 'Level 3 - Executive',
    status: 'Resolved',
    escalatedDate: 'May 9, 2025',
    dueDate: 'May 11, 2025',
    reason:
      'Confirmed account takeover via SIM swap — referred to law enforcement, case closed internally.',
  },
  {
    id: 'ESC-008',
    sourceType: 'Sanctions Hit',
    sourceId: 'CMP-C-012',
    title: 'False positive sanctions match — clearance needed',
    customerName: 'James Okafor',
    customerId: 'CUS-10048',
    country: 'Nigeria',
    flag: '🇳🇬',
    escalatedBy: 'Kamrul Hasan',
    escalatedTo: 'Arif Khan',
    level: 'Level 1 - Team Lead',
    status: 'Resolved',
    escalatedDate: 'May 5, 2025',
    dueDate: 'May 7, 2025',
    reason:
      'Name similarity match cleared after secondary identity verification — no further action required.',
  },
  {
    id: 'ESC-009',
    sourceType: 'Compliance Case',
    sourceId: 'CMP-C-006',
    title: 'SAR filing decision — round tripping',
    customerName: 'Karim Hossain',
    customerId: 'CUS-10043',
    country: 'Bangladesh',
    flag: '🇧🇩',
    escalatedBy: 'Arif Khan',
    escalatedTo: 'Nusrat Jahan',
    level: 'Level 2 - Senior Manager',
    status: 'In Progress',
    escalatedDate: 'May 11, 2025',
    dueDate: 'May 15, 2025',
    reason:
      'Senior officer reviewing transaction pattern to determine SAR filing requirement.',
  },
  {
    id: 'ESC-010',
    sourceType: 'AML Alert',
    sourceId: 'AML-A-250512-001',
    title: 'New customer high-value structuring alert',
    customerName: 'Rahim Uddin',
    customerId: 'CUS-10041',
    country: 'Bangladesh',
    flag: '🇧🇩',
    escalatedBy: 'Nusrat Jahan',
    escalatedTo: 'Kamrul Hasan',
    level: 'Level 1 - Team Lead',
    status: 'Pending Response',
    escalatedDate: 'May 12, 2025',
    dueDate: 'May 13, 2025',
    reason:
      'First escalation for newly onboarded customer flagged on day 2 of account activity.',
  },
];

// ============ KYC & COMPLIANCE — SANCTIONS LIST (standalone page) ============
export type SanctionEntityType = 'Individual' | 'Entity' | 'Vessel';
export type SanctionListSource =
  | 'OFAC SDN'
  | 'UN Consolidated'
  | 'EU Sanctions'
  | 'UK HMT'
  | 'Interpol';
export type SanctionEntryStatus = 'Active' | 'Removed';
export type ScreeningHitStatus =
  | 'Pending Review'
  | 'Confirmed Match'
  | 'False Positive'
  | 'Cleared';

export interface SanctionedEntity {
  id: string;
  name: string;
  aliases: string[];
  type: SanctionEntityType;
  country: string;
  flag: string;
  listSource: SanctionListSource;
  dateAdded: string;
  status: SanctionEntryStatus;
  reason: string;
}

export interface SanctionScreeningHit {
  id: string;
  customerName: string;
  customerId: string;
  matchedEntity: string;
  matchScore: number;
  listSource: SanctionListSource;
  transactionNo: string | null;
  status: ScreeningHitStatus;
  screenedAt: string;
  reviewedBy: string | null;
}

// ── Stats ──
export const sanctionsListStats = {
  totalEntities: 18642,
  activeHitsThisWeek: 3,
  listsMonitored: 5,
  lastSyncTime: 'May 12, 2025 6:00 AM',
};

// ── Filter options ──
export const sanctionTypeOptions = [
  'All Types',
  'Individual',
  'Entity',
  'Vessel',
];
export const sanctionListSourceOptions = [
  'All Lists',
  'OFAC SDN',
  'UN Consolidated',
  'EU Sanctions',
  'UK HMT',
  'Interpol',
];
export const screeningHitStatusOptions = [
  'All Status',
  'Pending Review',
  'Confirmed Match',
  'False Positive',
  'Cleared',
];

// ── Sanctioned entities (sample from larger watchlist) ──
export const sanctionedEntities: SanctionedEntity[] = [
  {
    id: 'SDN-10234',
    name: 'Aliyev Trading FZE',
    aliases: ['Aliyev Trade Co.', 'AT Holdings'],
    type: 'Entity',
    country: 'UAE',
    flag: '🇦🇪',
    listSource: 'OFAC SDN',
    dateAdded: 'Mar 14, 2024',
    status: 'Active',
    reason:
      'Sanctioned for facilitating prohibited financial transactions on behalf of designated persons.',
  },
  {
    id: 'UN-58821',
    name: 'Karim Al-Bashir',
    aliases: ['K. Bashir', 'Abu Karim'],
    type: 'Individual',
    country: 'Sudan',
    flag: '🇸🇩',
    listSource: 'UN Consolidated',
    dateAdded: 'Jan 8, 2023',
    status: 'Active',
    reason:
      'Listed for involvement in financing activities linked to designated armed groups.',
  },
  {
    id: 'EU-30214',
    name: 'Vostok Maritime Ltd.',
    aliases: ['Vostok Shipping'],
    type: 'Entity',
    country: 'Russia',
    flag: '🇷🇺',
    listSource: 'EU Sanctions',
    dateAdded: 'Jun 2, 2024',
    status: 'Active',
    reason:
      'Sanctioned for supporting circumvention of EU trade restrictions via shipping operations.',
  },
  {
    id: 'OFAC-77410',
    name: 'Mohammed Al-Rashid',
    aliases: ['M. Al Rasheed', 'Abu Mohammed'],
    type: 'Individual',
    country: 'Syria',
    flag: '🇸🇾',
    listSource: 'OFAC SDN',
    dateAdded: 'Sep 19, 2022',
    status: 'Active',
    reason:
      'Designated for ties to entities involved in proliferation financing.',
  },
  {
    id: 'HMT-19283',
    name: 'Northline Commodities Plc',
    aliases: [],
    type: 'Entity',
    country: 'United Kingdom',
    flag: '🇬🇧',
    listSource: 'UK HMT',
    dateAdded: 'Nov 5, 2023',
    status: 'Removed',
    reason:
      'Delisted following successful appeal and confirmation of no continuing risk.',
  },
  {
    id: 'INT-44120',
    name: 'MV Sea Falcon',
    aliases: ['Sea Falcon II'],
    type: 'Vessel',
    country: 'Panama',
    flag: '🇵🇦',
    listSource: 'Interpol',
    dateAdded: 'Feb 21, 2024',
    status: 'Active',
    reason:
      'Vessel flagged for suspected use in sanctions evasion shipping routes.',
  },
  {
    id: 'UN-60192',
    name: 'Hassan Al-Maktoum',
    aliases: ['H. Al-Maktoum', 'Hassan M.'],
    type: 'Individual',
    country: 'UAE',
    flag: '🇦🇪',
    listSource: 'UN Consolidated',
    dateAdded: 'Apr 30, 2025',
    status: 'Active',
    reason:
      'Added pending investigation into cross-border fund movement linked to designated network.',
  },
  {
    id: 'EU-31002',
    name: 'Baltic Energy Trading',
    aliases: ['Baltic Energy Co.'],
    type: 'Entity',
    country: 'Belarus',
    flag: '🇧🇾',
    listSource: 'EU Sanctions',
    dateAdded: 'Jul 11, 2024',
    status: 'Active',
    reason:
      'Sanctioned for involvement in restricted energy sector transactions.',
  },
];

// ── Screening Hits (customers matched against sanctions lists) ──
export const sanctionScreeningHits: SanctionScreeningHit[] = [
  {
    id: 'HIT-001',
    customerName: 'Hassan Al-Maktoum',
    customerId: 'CUS-10066',
    matchedEntity: 'Hassan Al-Maktoum (UN-60192)',
    matchScore: 96,
    listSource: 'UN Consolidated',
    transactionNo: 'TXN-2505124777',
    status: 'Confirmed Match',
    screenedAt: 'May 9, 2025 11:35 AM',
    reviewedBy: 'Imran Hossain',
  },
  {
    id: 'HIT-002',
    customerName: 'Mohammad Aliyev',
    customerId: 'CUS-10081',
    matchedEntity: 'Aliyev Trading FZE (SDN-10234)',
    matchScore: 78,
    listSource: 'OFAC SDN',
    transactionNo: 'TXN-2505124795',
    status: 'Pending Review',
    screenedAt: 'May 12, 2025 9:20 AM',
    reviewedBy: null,
  },
  {
    id: 'HIT-003',
    customerName: 'James Okafor',
    customerId: 'CUS-10048',
    matchedEntity: 'J. Okafor (similar name, OFAC SDN list)',
    matchScore: 62,
    listSource: 'OFAC SDN',
    transactionNo: 'TXN-2505124777',
    status: 'False Positive',
    screenedAt: 'May 7, 2025 2:10 PM',
    reviewedBy: 'Kamrul Hasan',
  },
  {
    id: 'HIT-004',
    customerName: 'Sara Bashir',
    customerId: 'CUS-10090',
    matchedEntity: 'Karim Al-Bashir (UN-58821) — surname match',
    matchScore: 55,
    listSource: 'UN Consolidated',
    transactionNo: null,
    status: 'Cleared',
    screenedAt: 'May 5, 2025 4:45 PM',
    reviewedBy: 'Arif Khan',
  },
  {
    id: 'HIT-005',
    customerName: 'Northline Commodities (Customer Reference)',
    customerId: 'CUS-10095',
    matchedEntity: 'Northline Commodities Plc (HMT-19283) — delisted',
    matchScore: 88,
    listSource: 'UK HMT',
    transactionNo: 'TXN-2505124700',
    status: 'False Positive',
    screenedAt: 'May 11, 2025 8:15 AM',
    reviewedBy: 'Sarah Johnson',
  },
  {
    id: 'HIT-006',
    customerName: 'Vostok Trading Bangladesh',
    customerId: 'CUS-10101',
    matchedEntity: 'Vostok Maritime Ltd. (EU-30214) — name similarity',
    matchScore: 71,
    listSource: 'EU Sanctions',
    transactionNo: 'TXN-2505124710',
    status: 'Pending Review',
    screenedAt: 'May 12, 2025 10:00 AM',
    reviewedBy: null,
  },
];

// ============ KYC & COMPLIANCE — PEP LIST (standalone page) ============
export type PepCategory =
  | 'Head of State'
  | 'Government Official'
  | 'Judiciary'
  | 'Military Official'
  | 'Family Member'
  | 'Close Associate';
export type PepRiskLevel = 'Low' | 'Medium' | 'High';
export type PepEntryStatus = 'Active Monitoring' | 'Cleared' | 'Removed';
export type PepMatchStatus =
  | 'Pending Review'
  | 'Confirmed PEP'
  | 'False Positive'
  | 'Approved with EDD';

export interface PepEntity {
  id: string;
  name: string;
  position: string;
  category: PepCategory;
  country: string;
  flag: string;
  riskLevel: PepRiskLevel;
  status: PepEntryStatus;
  dateAdded: string;
  notes: string;
}

export interface PepScreeningMatch {
  id: string;
  customerName: string;
  customerId: string;
  matchedPep: string;
  relationship: string;
  matchScore: number;
  riskLevel: PepRiskLevel;
  status: PepMatchStatus;
  screenedAt: string;
  reviewedBy: string | null;
}

// ── Stats ──
export const pepListStats = {
  totalPepEntities: 4218,
  activeMonitoring: 2451,
  pendingMatches: 7,
  highRiskCount: 312,
};

// ── Filter options ──
export const pepCategoryOptions = [
  'All Categories',
  'Head of State',
  'Government Official',
  'Judiciary',
  'Military Official',
  'Family Member',
  'Close Associate',
];
export const pepRiskLevelOptions = ['All Risk Levels', 'Low', 'Medium', 'High'];
export const pepMatchStatusOptions = [
  'All Status',
  'Pending Review',
  'Confirmed PEP',
  'False Positive',
  'Approved with EDD',
];

// ── PEP Entities ──
export const pepEntities: PepEntity[] = [
  {
    id: 'PEP-10041',
    name: 'Mohammed Al-Rashid',
    position: 'Deputy Minister of Finance',
    category: 'Government Official',
    country: 'UAE',
    flag: '🇦🇪',
    riskLevel: 'High',
    status: 'Active Monitoring',
    dateAdded: 'Jan 15, 2023',
    notes:
      'Senior government finance official with signing authority over public funds.',
  },
  {
    id: 'PEP-10042',
    name: 'Lt. Gen. Faisal Ahmed',
    position: 'Chief of Army Staff',
    category: 'Military Official',
    country: 'Bangladesh',
    flag: '🇧🇩',
    riskLevel: 'High',
    status: 'Active Monitoring',
    dateAdded: 'Mar 2, 2023',
    notes:
      'Senior military command position with significant institutional influence.',
  },
  {
    id: 'PEP-10043',
    name: 'Justice Anwara Begum',
    position: 'Supreme Court Justice',
    category: 'Judiciary',
    country: 'Bangladesh',
    flag: '🇧🇩',
    riskLevel: 'Medium',
    status: 'Active Monitoring',
    dateAdded: 'Apr 18, 2023',
    notes:
      'Sitting judiciary member, monitored per standard PEP judiciary category policy.',
  },
  {
    id: 'PEP-10044',
    name: 'Amara Al-Rashid',
    position: 'Spouse of Deputy Minister of Finance',
    category: 'Family Member',
    country: 'UAE',
    flag: '🇦🇪',
    riskLevel: 'Medium',
    status: 'Active Monitoring',
    dateAdded: 'Jan 15, 2023',
    notes:
      'Immediate family member of PEP-10041, monitored per family-member PEP policy.',
  },
  {
    id: 'PEP-10045',
    name: 'Hassan Al-Maktoum',
    position: 'Former Royal Court Advisor',
    category: 'Close Associate',
    country: 'UAE',
    flag: '🇦🇪',
    riskLevel: 'High',
    status: 'Active Monitoring',
    dateAdded: 'Apr 30, 2025',
    notes:
      'Close associate designation pending review of continuing institutional ties.',
  },
  {
    id: 'PEP-10046',
    name: 'President Carlos Mendoza (Ret.)',
    position: 'Former Head of State',
    category: 'Head of State',
    country: 'Philippines',
    flag: '🇵🇭',
    riskLevel: 'High',
    status: 'Active Monitoring',
    dateAdded: 'Sep 10, 2022',
    notes:
      'Former head of state — lifetime PEP monitoring per regulatory guidance.',
  },
  {
    id: 'PEP-10047',
    name: 'Omar Sheikh',
    position: 'Provincial Governor',
    category: 'Government Official',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    riskLevel: 'Medium',
    status: 'Active Monitoring',
    dateAdded: 'May 6, 2025',
    notes:
      'Recently appointed provincial governor, newly added to monitoring list.',
  },
  {
    id: 'PEP-10048',
    name: "Judge Patrick O'Brien",
    position: 'Retired High Court Judge',
    category: 'Judiciary',
    country: 'United Kingdom',
    flag: '🇬🇧',
    riskLevel: 'Low',
    status: 'Removed',
    dateAdded: 'Feb 1, 2020',
    notes:
      'Removed from active monitoring after 5-year post-office cooling period elapsed.',
  },
];

// ── PEP Screening Matches ──
export const pepScreeningMatches: PepScreeningMatch[] = [
  {
    id: 'PEPM-001',
    customerName: 'Omar Sheikh',
    customerId: 'CUS-10069',
    matchedPep: 'Omar Sheikh — Provincial Governor (PEP-10047)',
    relationship: 'Self',
    matchScore: 94,
    riskLevel: 'Medium',
    status: 'Approved with EDD',
    screenedAt: 'May 6, 2025 10:00 AM',
    reviewedBy: 'Nusrat Jahan',
  },
  {
    id: 'PEPM-002',
    customerName: 'Mohammed Al-Rashid',
    customerId: 'CUS-10051',
    matchedPep: 'Mohammed Al-Rashid — Deputy Minister of Finance (PEP-10041)',
    relationship: 'Self',
    matchScore: 98,
    riskLevel: 'High',
    status: 'Confirmed PEP',
    screenedAt: 'May 4, 2025 2:15 PM',
    reviewedBy: 'Ahmed Khan',
  },
  {
    id: 'PEPM-003',
    customerName: 'Amara Rashid',
    customerId: 'CUS-10102',
    matchedPep: 'Amara Al-Rashid — Spouse of Deputy Minister (PEP-10044)',
    relationship: 'Possible spouse match',
    matchScore: 81,
    riskLevel: 'Medium',
    status: 'Pending Review',
    screenedAt: 'May 12, 2025 9:40 AM',
    reviewedBy: null,
  },
  {
    id: 'PEPM-004',
    customerName: 'Hassan Al-Maktoum',
    customerId: 'CUS-10066',
    matchedPep: 'Hassan Al-Maktoum — Former Royal Court Advisor (PEP-10045)',
    relationship: 'Self',
    matchScore: 91,
    riskLevel: 'High',
    status: 'Pending Review',
    screenedAt: 'May 12, 2025 9:15 AM',
    reviewedBy: null,
  },
  {
    id: 'PEPM-005',
    customerName: 'Faisal Ahmed',
    customerId: 'CUS-10110',
    matchedPep: 'Lt. Gen. Faisal Ahmed — Chief of Army Staff (PEP-10042)',
    relationship: 'Name similarity only',
    matchScore: 58,
    riskLevel: 'Low',
    status: 'False Positive',
    screenedAt: 'May 8, 2025 4:30 PM',
    reviewedBy: 'Kamrul Hasan',
  },
  {
    id: 'PEPM-006',
    customerName: 'Patrick OBrien',
    customerId: 'CUS-10118',
    matchedPep: "Judge Patrick O'Brien — Retired (PEP-10048, removed)",
    relationship: 'Name match — delisted PEP',
    matchScore: 76,
    riskLevel: 'Low',
    status: 'False Positive',
    screenedAt: 'May 3, 2025 11:00 AM',
    reviewedBy: 'Arif Khan',
  },
  {
    id: 'PEPM-007',
    customerName: 'Carlos Mendoza Jr.',
    customerId: 'CUS-10125',
    matchedPep:
      'President Carlos Mendoza (Ret.) — possible relative (PEP-10046)',
    relationship: 'Possible family match',
    matchScore: 69,
    riskLevel: 'Medium',
    status: 'Pending Review',
    screenedAt: 'May 11, 2025 1:50 PM',
    reviewedBy: null,
  },
];

// ============================================================
// REPORTS & ANALYTICS — OVERVIEW DASHBOARD — append to lib/data.ts
// ============================================================

export interface ReportsOverviewStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: number[];
  trendColor: string;
}

export const reportsOverviewStats: ReportsOverviewStat[] = [
  {
    id: 'total-transactions',
    label: 'Total Transactions',
    value: '24,752',
    change: 12.5,
    changeLabel: 'vs last 7 days',
    trend: [4, 6, 5, 7, 6, 8, 7, 9, 8, 10],
    trendColor: '#3b82f6',
  },
  {
    id: 'total-cash-pickups',
    label: 'Total Cash Pickups',
    value: '8,642',
    change: 8.3,
    changeLabel: 'vs last 7 days',
    trend: [5, 6, 5, 7, 6, 7, 8, 7, 9, 8],
    trendColor: '#f59e0b',
  },
  {
    id: 'total-revenue-fees',
    label: 'Total Revenue (Fees)',
    value: '$425,780',
    change: 15.7,
    changeLabel: 'vs last 7 days',
    trend: [3, 5, 4, 6, 5, 7, 6, 8, 7, 9],
    trendColor: '#a855f7',
  },
  {
    id: 'total-payouts',
    label: 'Total Payouts',
    value: '$4,256,540',
    change: 10.2,
    changeLabel: 'vs last 7 days',
    trend: [4, 5, 6, 5, 7, 6, 8, 7, 9, 8],
    trendColor: '#22c55e',
  },
  {
    id: 'pending-transactions',
    label: 'Pending Transactions',
    value: '1,248',
    change: 5.2,
    changeLabel: 'vs last 7 days',
    trend: [6, 7, 6, 8, 7, 8, 7, 9, 8, 9],
    trendColor: '#f97316',
  },
  {
    id: 'failed-transactions',
    label: 'Failed Transactions',
    value: '156',
    change: -3.1,
    changeLabel: 'vs last 7 days',
    trend: [8, 7, 8, 6, 7, 6, 5, 6, 5, 4],
    trendColor: '#ef4444',
  },
  {
    id: 'active-users',
    label: 'Active Users',
    value: '12,856',
    change: 9.4,
    changeLabel: 'vs last 7 days',
    trend: [4, 5, 5, 6, 6, 7, 7, 8, 8, 9],
    trendColor: '#3b82f6',
  },
  {
    id: 'active-agents',
    label: 'Active Agents',
    value: '214',
    change: 6.7,
    changeLabel: 'vs last 7 days',
    trend: [5, 6, 5, 7, 6, 7, 8, 7, 8, 9],
    trendColor: '#a855f7',
  },
];

export const dailyTransactionVolume = {
  labels: ['May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'],
  values: [1800, 2900, 2400, 4100, 3200, 4600, 3900],
};

export const monthlyRevenueTrend = {
  labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
  values: [210000, 245000, 280000, 410000, 320000, 350000, 425780],
};

export const statusDistribution: {
  label: string;
  count: number;
  percent: number;
  color: string;
}[] = [
  { label: 'Completed', count: 18752, percent: 75.8, color: '#22c55e' },
  { label: 'Pending', count: 3124, percent: 12.6, color: '#f59e0b' },
  { label: 'Failed', count: 1563, percent: 6.3, color: '#ef4444' },
  { label: 'Refunded', count: 1313, percent: 5.3, color: '#3b82f6' },
];
export const statusDistributionTotal = 24752;

export type ReportTxnStatus = 'Completed' | 'Pending' | 'Failed';

export interface ReportTransaction {
  id: string;
  transactionNo: string;
  sender: string;
  recipient: string;
  sendCountry: string;
  sendCountryFlag: string;
  receiveCountry: string;
  receiveCountryFlag: string;
  amount: string;
  currency: string;
  rate: string;
  fee: string;
  netPayout: string;
  status: ReportTxnStatus;
  dateTime: string;
}

export const reportTransactions: ReportTransaction[] = [
  {
    id: 'rt-001',
    transactionNo: 'TXN-2505124789',
    sender: 'John Doe',
    recipient: 'Rahim Uddin',
    sendCountry: 'United Kingdom',
    sendCountryFlag: '🇬🇧',
    receiveCountry: 'Bangladesh',
    receiveCountryFlag: '🇧🇩',
    amount: '£500.00',
    currency: 'GBP',
    rate: '165.2500',
    fee: '£3.50',
    netPayout: '৳82,625.00',
    status: 'Completed',
    dateTime: 'May 12, 2025 10:30 AM',
  },
  {
    id: 'rt-002',
    transactionNo: 'TXN-2505124788',
    sender: 'Ahmed Khan',
    recipient: 'Maria Santos',
    sendCountry: 'United States',
    sendCountryFlag: '🇺🇸',
    receiveCountry: 'Philippines',
    receiveCountryFlag: '🇵🇭',
    amount: '$300.00',
    currency: 'USD',
    rate: '122.2500',
    fee: '$2.50',
    netPayout: '₱36,675.00',
    status: 'Pending',
    dateTime: 'May 12, 2025 09:15 AM',
  },
  {
    id: 'rt-003',
    transactionNo: 'TXN-2505124787',
    sender: 'Rashid Ahmed',
    recipient: 'Sabir Hossain',
    sendCountry: 'United Kingdom',
    sendCountryFlag: '🇬🇧',
    receiveCountry: 'Bangladesh',
    receiveCountryFlag: '🇧🇩',
    amount: '£750.00',
    currency: 'GBP',
    rate: '165.2500',
    fee: '£4.00',
    netPayout: '৳123,937.50',
    status: 'Completed',
    dateTime: 'May 12, 2025 08:45 AM',
  },
  {
    id: 'rt-004',
    transactionNo: 'TXN-2505124786',
    sender: 'Imran Hossain',
    recipient: 'Mohammed Ali',
    sendCountry: 'Saudi Arabia',
    sendCountryFlag: '🇸🇦',
    receiveCountry: 'Bangladesh',
    receiveCountryFlag: '🇧🇩',
    amount: 'SAR 1,000.00',
    currency: 'SAR',
    rate: '28.5600',
    fee: 'SAR 8.00',
    netPayout: '৳30,560.00',
    status: 'Failed',
    dateTime: 'May 12, 2025 09:20 AM',
  },
  {
    id: 'rt-005',
    transactionNo: 'TXN-2505124785',
    sender: 'Fatima Ali',
    recipient: 'Arif Khan',
    sendCountry: 'United Arab Emirates',
    sendCountryFlag: '🇦🇪',
    receiveCountry: 'Pakistan',
    receiveCountryFlag: '🇵🇰',
    amount: 'AED 1,250.00',
    currency: 'AED',
    rate: '33.2800',
    fee: 'AED 6.00',
    netPayout: 'Rs.102,100.00',
    status: 'Pending',
    dateTime: 'May 12, 2025 07:55 AM',
  },
];
export const reportTransactionsTotalCount = 24752;

export const reportTxnCountryFilterOptions: string[] = [
  'All Countries',
  'United Kingdom',
  'United States',
  'Saudi Arabia',
  'United Arab Emirates',
];
export const reportTxnCurrencyFilterOptions: string[] = [
  'All Currencies',
  'GBP',
  'USD',
  'SAR',
  'AED',
];
export const reportTxnStatusFilterOptions: string[] = [
  'All Status',
  'Completed',
  'Pending',
  'Failed',
];
export const reportTxnAgentFilterOptions: string[] = [
  'All Agents',
  'Abul Hasan',
  'Kamal Hossain',
  'Juan Dela Cruz',
  'Amit Kumar',
  'Rashed Alam',
];

export interface QuickReportLink {
  id: string;
  name: string;
}

export const quickReports: QuickReportLink[] = [
  { id: 'qr-001', name: 'Transaction Report' },
  { id: 'qr-002', name: 'Cash Pickup Report' },
  { id: 'qr-003', name: 'Agent Performance Report' },
  { id: 'qr-004', name: 'Revenue & Finance Report' },
  { id: 'qr-005', name: 'Compliance Report' },
  { id: 'qr-006', name: 'Customer Report' },
  { id: 'qr-007', name: 'System Activity Report' },
];

export interface TopSendingCorridor {
  id: string;
  corridor: string;
  fromFlag: string;
  toFlag: string;
  transactions: number;
  totalVolume: string;
}

export const topSendingCorridors: TopSendingCorridor[] = [
  {
    id: 'tsc-001',
    corridor: 'UK → Bangladesh',
    fromFlag: '🇬🇧',
    toFlag: '🇧🇩',
    transactions: 5248,
    totalVolume: '£2,456,780',
  },
  {
    id: 'tsc-002',
    corridor: 'USA → Bangladesh',
    fromFlag: '🇺🇸',
    toFlag: '🇧🇩',
    transactions: 4125,
    totalVolume: '$1,856,230',
  },
  {
    id: 'tsc-003',
    corridor: 'UAE → Pakistan',
    fromFlag: '🇦🇪',
    toFlag: '🇵🇰',
    transactions: 2856,
    totalVolume: 'AED 3,125,450',
  },
  {
    id: 'tsc-004',
    corridor: 'Saudi Arabia → Bangladesh',
    fromFlag: '🇸🇦',
    toFlag: '🇧🇩',
    transactions: 1985,
    totalVolume: 'SAR 2,165,600',
  },
  {
    id: 'tsc-005',
    corridor: 'Canada → India',
    fromFlag: '🇨🇦',
    toFlag: '🇮🇳',
    transactions: 1256,
    totalVolume: 'CAD 856,230',
  },
];

export interface TopAgentPerformance {
  id: string;
  name: string;
  branch: string;
  transactions: number;
  completionRate: number;
}

export const topAgentsByTransactions: TopAgentPerformance[] = [
  {
    id: 'tap-001',
    name: 'Abul Hasan',
    branch: 'Gulshan Branch',
    transactions: 1256,
    completionRate: 98.5,
  },
  {
    id: 'tap-002',
    name: 'Kamal Hossain',
    branch: 'Uttara Branch',
    transactions: 985,
    completionRate: 97.2,
  },
  {
    id: 'tap-003',
    name: 'Juan Dela Cruz',
    branch: 'Manila Branch',
    transactions: 874,
    completionRate: 96.1,
  },
  {
    id: 'tap-004',
    name: 'Amit Kumar',
    branch: 'Mumbai Branch',
    transactions: 763,
    completionRate: 95.7,
  },
  {
    id: 'tap-005',
    name: 'Rashed Alam',
    branch: 'Sylhet Branch',
    transactions: 654,
    completionRate: 95.4,
  },
];

export interface RevenueSummaryItem {
  label: string;
  value: string;
}

export const revenueSummaryThisMonth: RevenueSummaryItem[] = [
  { label: 'Total Fees Collected', value: '$425,780' },
  { label: 'Transaction Count', value: '24,752' },
  { label: 'Average Fee per Transaction', value: '$17.20' },
  { label: 'Total Payouts', value: '$4,256,540' },
  { label: 'Net Revenue', value: '$425,780' },
];

export interface ReportSchedule {
  id: string;
  name: string;
  cadence: string;
  enabled: boolean;
}

export const reportSchedules: ReportSchedule[] = [
  {
    id: 'rs-001',
    name: 'Daily Transaction Report',
    cadence: 'Every day at 08:00 AM',
    enabled: true,
  },
  {
    id: 'rs-002',
    name: 'Weekly Summary Report',
    cadence: 'Every Monday at 09:00 AM',
    enabled: true,
  },
  {
    id: 'rs-003',
    name: 'Monthly Revenue Report',
    cadence: '1st of every month at 10:00 AM',
    enabled: true,
  },
  {
    id: 'rs-004',
    name: 'Compliance Summary Report',
    cadence: 'Every Friday at 06:00 PM',
    enabled: false,
  },
];

export type ExportFileType = 'xlsx' | 'pdf';

export interface RecentExportItem {
  id: string;
  fileName: string;
  fileType: ExportFileType;
  exportedAt: string;
}

export const recentExports: RecentExportItem[] = [
  {
    id: 're-001',
    fileName: 'Transaction_Report_May_12_2025.xlsx',
    fileType: 'xlsx',
    exportedAt: 'May 12, 2025 10:30 AM',
  },
  {
    id: 're-002',
    fileName: 'Revenue_Report_April_2025.pdf',
    fileType: 'pdf',
    exportedAt: 'May 12, 2025 09:15 AM',
  },
  {
    id: 're-003',
    fileName: 'Agent_Performance_May_2025.xlsx',
    fileType: 'xlsx',
    exportedAt: 'May 12, 2025 08:45 AM',
  },
];

// ============================================================
// STANDALONE TRANSACTIONS PAGE
// ============================================================

export interface TransactionsPageStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const transactionsPageStats: TransactionsPageStat[] = [
  {
    id: 'total-txns',
    label: 'Total Transactions',
    value: '24,752',
    change: 12.5,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'completed-txns',
    label: 'Completed',
    value: '18,752',
    change: 14.1,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'pending-txns',
    label: 'Pending',
    value: '3,124',
    change: 5.2,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'failed-txns',
    label: 'Failed',
    value: '1,563',
    change: -3.1,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'total-volume',
    label: 'Total Volume',
    value: '$4,682,320',
    change: 11.4,
    changeLabel: 'vs last 7 days',
  },
];

// ============================================================
// STANDALONE CASH PICKUPS REPORT PAGE
// ============================================================

export interface CashPickupReportStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const cashPickupReportStats: CashPickupReportStat[] = [
  {
    id: 'total-pickups',
    label: 'Total Cash Pickups',
    value: '8,642',
    change: 8.3,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'completed-pickups',
    label: 'Completed',
    value: '7,218',
    change: 9.6,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'pending-pickups',
    label: 'Pending',
    value: '1,108',
    change: 4.1,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'expired-pickups',
    label: 'Expired',
    value: '316',
    change: -2.4,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'avg-pickup-amount',
    label: 'Average Pickup Amount',
    value: '$184.50',
    change: 3.7,
    changeLabel: 'vs last 7 days',
  },
];

export type CashPickupReportStatus = 'Completed' | 'Pending' | 'Expired';

export interface CashPickupReportRow {
  id: string;
  pickupId: string;
  customerName: string;
  agentName: string;
  branch: string;
  country: string;
  countryFlag: string;
  amount: string;
  currency: string;
  status: CashPickupReportStatus;
  requestedDate: string;
}

export const cashPickupReportRows: CashPickupReportRow[] = [
  {
    id: 'cpr-001',
    pickupId: 'CP-250512-001',
    customerName: 'Rahim Uddin',
    agentName: 'Abul Hasan',
    branch: 'Gulshan Branch',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    amount: '25,000.00',
    currency: 'BDT',
    status: 'Completed',
    requestedDate: 'May 12, 2025 10:30 AM',
  },
  {
    id: 'cpr-002',
    pickupId: 'CP-250512-002',
    customerName: 'Maria Santos',
    agentName: 'Juan Dela Cruz',
    branch: 'Manila Branch',
    country: 'Philippines',
    countryFlag: '🇵🇭',
    amount: '15,000.00',
    currency: 'PHP',
    status: 'Pending',
    requestedDate: 'May 12, 2025 09:15 AM',
  },
  {
    id: 'cpr-003',
    pickupId: 'CP-250512-003',
    customerName: 'Sabir Hossain',
    agentName: 'Kamal Hossain',
    branch: 'Uttara Branch',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    amount: '30,000.00',
    currency: 'BDT',
    status: 'Completed',
    requestedDate: 'May 12, 2025 08:45 AM',
  },
  {
    id: 'cpr-004',
    pickupId: 'CP-250512-004',
    customerName: 'Mohammed Ali',
    agentName: 'Amit Kumar',
    branch: 'Mumbai Branch',
    country: 'India',
    countryFlag: '🇮🇳',
    amount: '12,500.00',
    currency: 'INR',
    status: 'Expired',
    requestedDate: 'May 11, 2025 04:20 PM',
  },
  {
    id: 'cpr-005',
    pickupId: 'CP-250512-005',
    customerName: 'Arif Khan',
    agentName: 'Rashed Alam',
    branch: 'Sylhet Branch',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    amount: '18,000.00',
    currency: 'BDT',
    status: 'Pending',
    requestedDate: 'May 12, 2025 07:55 AM',
  },
];
export const cashPickupReportTotalCount = 8642;

export const cashPickupCountryFilterOptions: string[] = [
  'All Countries',
  'Bangladesh',
  'Philippines',
  'India',
];
export const cashPickupStatusFilterOptions: string[] = [
  'All Status',
  'Completed',
  'Pending',
  'Expired',
];
export const cashPickupAgentFilterOptions: string[] = [
  'All Agents',
  'Abul Hasan',
  'Kamal Hossain',
  'Juan Dela Cruz',
  'Amit Kumar',
  'Rashed Alam',
];

// ============================================================
// STANDALONE AGENTS PERFORMANCE REPORT PAGE
// ============================================================

export interface AgentPerformanceStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const agentPerformanceStats: AgentPerformanceStat[] = [
  {
    id: 'active-agents',
    label: 'Active Agents',
    value: '214',
    change: 6.7,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'avg-completion-rate',
    label: 'Avg. Completion Rate',
    value: '96.4%',
    change: 1.8,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'total-txns-processed',
    label: 'Total Transactions Processed',
    value: '18,420',
    change: 9.1,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'avg-processing-time',
    label: 'Avg. Processing Time',
    value: '4.2 min',
    change: -5.6,
    changeLabel: 'vs last 7 days',
  },
];

export type AgentPerformanceStatus = 'Active' | 'Inactive';

export interface AgentPerformanceRow {
  id: string;
  agentName: string;
  branch: string;
  country: string;
  countryFlag: string;
  totalTransactions: number;
  totalVolume: string;
  completionRate: number;
  avgProcessingTime: string;
  rating: number;
  status: AgentPerformanceStatus;
}

export const agentPerformanceRows: AgentPerformanceRow[] = [
  {
    id: 'apr-001',
    agentName: 'Abul Hasan',
    branch: 'Gulshan Branch',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    totalTransactions: 1256,
    totalVolume: '$245,680',
    completionRate: 98.5,
    avgProcessingTime: '3.2 min',
    rating: 4.9,
    status: 'Active',
  },
  {
    id: 'apr-002',
    agentName: 'Kamal Hossain',
    branch: 'Uttara Branch',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    totalTransactions: 985,
    totalVolume: '$185,620',
    completionRate: 97.2,
    avgProcessingTime: '3.8 min',
    rating: 4.7,
    status: 'Active',
  },
  {
    id: 'apr-003',
    agentName: 'Juan Dela Cruz',
    branch: 'Manila Branch',
    country: 'Philippines',
    countryFlag: '🇵🇭',
    totalTransactions: 874,
    totalVolume: '$156,230',
    completionRate: 96.1,
    avgProcessingTime: '4.5 min',
    rating: 4.6,
    status: 'Active',
  },
  {
    id: 'apr-004',
    agentName: 'Amit Kumar',
    branch: 'Mumbai Branch',
    country: 'India',
    countryFlag: '🇮🇳',
    totalTransactions: 763,
    totalVolume: '$132,540',
    completionRate: 95.7,
    avgProcessingTime: '4.9 min',
    rating: 4.5,
    status: 'Active',
  },
  {
    id: 'apr-005',
    agentName: 'Rashed Alam',
    branch: 'Sylhet Branch',
    country: 'Bangladesh',
    countryFlag: '🇧🇩',
    totalTransactions: 654,
    totalVolume: '$98,750',
    completionRate: 95.4,
    avgProcessingTime: '5.1 min',
    rating: 4.4,
    status: 'Active',
  },
  {
    id: 'apr-006',
    agentName: 'Sophie Martin',
    branch: 'Toronto Branch',
    country: 'Canada',
    countryFlag: '🇨🇦',
    totalTransactions: 412,
    totalVolume: '$76,340',
    completionRate: 92.8,
    avgProcessingTime: '6.0 min',
    rating: 4.1,
    status: 'Inactive',
  },
];
export const agentPerformanceTotalCount = 214;

export const agentPerformanceCountryFilterOptions: string[] = [
  'All Countries',
  'Bangladesh',
  'Philippines',
  'India',
  'Canada',
];
export const agentPerformanceStatusFilterOptions: string[] = [
  'All Status',
  'Active',
  'Inactive',
];

// ============================================================
// STANDALONE REVENUE & FINANCE REPORT PAGE
// ============================================================

export interface RevenueFinanceStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const revenueFinanceStats: RevenueFinanceStat[] = [
  {
    id: 'total-revenue',
    label: 'Total Revenue (Fees)',
    value: '$425,780',
    change: 15.7,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'total-payouts',
    label: 'Total Payouts',
    value: '$4,256,540',
    change: 10.2,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'net-revenue',
    label: 'Net Revenue',
    value: '$425,780',
    change: 15.7,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'avg-fee',
    label: 'Avg. Fee per Transaction',
    value: '$17.20',
    change: 2.4,
    changeLabel: 'vs last 7 days',
  },
];

export interface RevenueBreakdownRow {
  id: string;
  date: string;
  transactions: number;
  grossVolume: string;
  feesCollected: string;
  payouts: string;
  netRevenue: string;
}

export const revenueBreakdownRows: RevenueBreakdownRow[] = [
  {
    id: 'rb-001',
    date: 'May 12, 2025',
    transactions: 3842,
    grossVolume: '$682,450',
    feesCollected: '$64,230',
    payouts: '$618,220',
    netRevenue: '$64,230',
  },
  {
    id: 'rb-002',
    date: 'May 11, 2025',
    transactions: 3615,
    grossVolume: '$645,120',
    feesCollected: '$60,810',
    payouts: '$584,310',
    netRevenue: '$60,810',
  },
  {
    id: 'rb-003',
    date: 'May 10, 2025',
    transactions: 3920,
    grossVolume: '$701,860',
    feesCollected: '$66,540',
    payouts: '$635,320',
    netRevenue: '$66,540',
  },
  {
    id: 'rb-004',
    date: 'May 9, 2025',
    transactions: 3104,
    grossVolume: '$558,310',
    feesCollected: '$52,680',
    payouts: '$505,630',
    netRevenue: '$52,680',
  },
  {
    id: 'rb-005',
    date: 'May 8, 2025',
    transactions: 2918,
    grossVolume: '$521,940',
    feesCollected: '$49,210',
    payouts: '$472,730',
    netRevenue: '$49,210',
  },
  {
    id: 'rb-006',
    date: 'May 7, 2025',
    transactions: 3654,
    grossVolume: '$652,780',
    feesCollected: '$61,520',
    payouts: '$591,260',
    netRevenue: '$61,520',
  },
  {
    id: 'rb-007',
    date: 'May 6, 2025',
    transactions: 3699,
    grossVolume: '$659,870',
    feesCollected: '$62,310',
    payouts: '$597,560',
    netRevenue: '$62,310',
  },
];
export const revenueBreakdownTotalCount = 24752;

export interface RevenueByCurrencyRow {
  id: string;
  currency: string;
  transactions: number;
  feesCollected: string;
  percentOfTotal: number;
}

export const revenueByCurrency: RevenueByCurrencyRow[] = [
  {
    id: 'rc-gbp',
    currency: 'GBP',
    transactions: 6240,
    feesCollected: '£32,450',
    percentOfTotal: 28.4,
  },
  {
    id: 'rc-usd',
    currency: 'USD',
    transactions: 5860,
    feesCollected: '$28,920',
    percentOfTotal: 25.3,
  },
  {
    id: 'rc-bdt',
    currency: 'BDT',
    transactions: 4920,
    feesCollected: '৳18,640',
    percentOfTotal: 16.3,
  },
  {
    id: 'rc-aed',
    currency: 'AED',
    transactions: 3580,
    feesCollected: 'AED 14,210',
    percentOfTotal: 12.4,
  },
  {
    id: 'rc-sar',
    currency: 'SAR',
    transactions: 2310,
    feesCollected: 'SAR 9,860',
    percentOfTotal: 8.6,
  },
  {
    id: 'rc-cad',
    currency: 'CAD',
    transactions: 1842,
    feesCollected: 'CAD 7,420',
    percentOfTotal: 6.5,
  },
];

// ============================================================
// STANDALONE COMPLIANCE REPORTS PAGE (Reports & Analytics)
// ============================================================

export interface ComplianceReportsStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const complianceReportsPageStats: ComplianceReportsStat[] = [
  {
    id: 'total-reports',
    label: 'Total Reports Generated',
    value: '342',
    change: 9.8,
    changeLabel: 'vs last month',
  },
  {
    id: 'pending-reviews',
    label: 'Pending Reviews',
    value: '18',
    change: 4.2,
    changeLabel: 'vs last month',
  },
  {
    id: 'regulatory-filings',
    label: 'Regulatory Filings',
    value: '56',
    change: 11.6,
    changeLabel: 'vs last month',
  },
  {
    id: 'overdue-reports',
    label: 'Overdue Reports',
    value: '3',
    change: -25.0,
    changeLabel: 'vs last month',
  },
];

export type ComplianceReportType =
  | 'AML Summary'
  | 'Sanctions Filing'
  | 'Regulatory Submission'
  | 'Internal Audit'
  | 'Risk Assessment';
export type ComplianceReportStatus =
  | 'Filed'
  | 'Pending Review'
  | 'Overdue'
  | 'Draft';

export interface ComplianceReportRow {
  id: string;
  reportName: string;
  type: ComplianceReportType;
  period: string;
  generatedDate: string;
  generatedBy: string;
  status: ComplianceReportStatus;
}

export const complianceReportRows: ComplianceReportRow[] = [
  {
    id: 'cr-001',
    reportName: 'Monthly AML Summary - April 2025',
    type: 'AML Summary',
    period: 'April 2025',
    generatedDate: 'May 2, 2025',
    generatedBy: 'Nusrat Jahan',
    status: 'Filed',
  },
  {
    id: 'cr-002',
    reportName: 'Sanctions Screening Filing Q1',
    type: 'Sanctions Filing',
    period: 'Q1 2025',
    generatedDate: 'Apr 10, 2025',
    generatedBy: 'Arif Khan',
    status: 'Filed',
  },
  {
    id: 'cr-003',
    reportName: 'Central Bank Regulatory Submission',
    type: 'Regulatory Submission',
    period: 'April 2025',
    generatedDate: 'May 5, 2025',
    generatedBy: 'Kamrul Hasan',
    status: 'Pending Review',
  },
  {
    id: 'cr-004',
    reportName: 'Internal Audit Findings - March',
    type: 'Internal Audit',
    period: 'March 2025',
    generatedDate: 'Apr 28, 2025',
    generatedBy: 'Fatima Ali',
    status: 'Overdue',
  },
  {
    id: 'cr-005',
    reportName: 'Quarterly Risk Assessment',
    type: 'Risk Assessment',
    period: 'Q1 2025',
    generatedDate: 'Apr 15, 2025',
    generatedBy: 'Nusrat Jahan',
    status: 'Filed',
  },
  {
    id: 'cr-006',
    reportName: 'May AML Summary (Draft)',
    type: 'AML Summary',
    period: 'May 2025',
    generatedDate: 'May 12, 2025',
    generatedBy: 'Arif Khan',
    status: 'Draft',
  },
];
export const complianceReportRowsTotalCount = 342;

export const complianceReportTypeFilterOptions: string[] = [
  'All Types',
  'AML Summary',
  'Sanctions Filing',
  'Regulatory Submission',
  'Internal Audit',
  'Risk Assessment',
];
export const complianceReportStatusFilterOptions: string[] = [
  'All Status',
  'Filed',
  'Pending Review',
  'Overdue',
  'Draft',
];

// ============================================================
// STANDALONE CUSTOMER REPORTS PAGE (Reports & Analytics)
// ============================================================

export interface CustomerReportsStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const customerReportsPageStats: CustomerReportsStat[] = [
  {
    id: 'total-customers',
    label: 'Total Customers',
    value: '48,620',
    change: 7.4,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'new-customers',
    label: 'New Customers',
    value: '1,284',
    change: 18.6,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'active-customers',
    label: 'Active Customers',
    value: '32,150',
    change: 5.9,
    changeLabel: 'vs last 7 days',
  },
  {
    id: 'kyc-verified',
    label: 'KYC Verified',
    value: '44,980',
    change: 4.2,
    changeLabel: 'vs last 7 days',
  },
];

export type CustomerKycStatus = 'Verified' | 'Pending' | 'Unverified';
export type CustomerSegment = 'New' | 'Regular' | 'VIP';

export interface CustomerReportRow {
  id: string;
  customerId: string;
  customerName: string;
  country: string;
  countryFlag: string;
  totalTransactions: number;
  totalVolume: string;
  kycStatus: CustomerKycStatus;
  segment: CustomerSegment;
  registrationDate: string;
}

export const customerReportRows: CustomerReportRow[] = [
  {
    id: 'cur-001',
    customerId: 'CUS-100245',
    customerName: 'John Doe',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    totalTransactions: 86,
    totalVolume: '£12,450',
    kycStatus: 'Verified',
    segment: 'VIP',
    registrationDate: 'Jan 14, 2024',
  },
  {
    id: 'cur-002',
    customerId: 'CUS-100246',
    customerName: 'Ahmed Khan',
    country: 'United States',
    countryFlag: '🇺🇸',
    totalTransactions: 42,
    totalVolume: '$8,620',
    kycStatus: 'Verified',
    segment: 'Regular',
    registrationDate: 'Mar 2, 2024',
  },
  {
    id: 'cur-003',
    customerId: 'CUS-100247',
    customerName: 'Rashid Ahmed',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    totalTransactions: 15,
    totalVolume: '£3,140',
    kycStatus: 'Verified',
    segment: 'Regular',
    registrationDate: 'Sep 18, 2024',
  },
  {
    id: 'cur-004',
    customerId: 'CUS-100248',
    customerName: 'Imran Hossain',
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    totalTransactions: 5,
    totalVolume: 'SAR 4,800',
    kycStatus: 'Pending',
    segment: 'New',
    registrationDate: 'Apr 28, 2025',
  },
  {
    id: 'cur-005',
    customerId: 'CUS-100249',
    customerName: 'Fatima Ali',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    totalTransactions: 3,
    totalVolume: 'AED 2,150',
    kycStatus: 'Unverified',
    segment: 'New',
    registrationDate: 'May 9, 2025',
  },
  {
    id: 'cur-006',
    customerId: 'CUS-100250',
    customerName: 'Sophie Martin',
    country: 'Canada',
    countryFlag: '🇨🇦',
    totalTransactions: 124,
    totalVolume: 'CAD 28,640',
    kycStatus: 'Verified',
    segment: 'VIP',
    registrationDate: 'Jun 5, 2023',
  },
];
export const customerReportRowsTotalCount = 48620;

export const customerReportCountryFilterOptions: string[] = [
  'All Countries',
  'United Kingdom',
  'United States',
  'Saudi Arabia',
  'United Arab Emirates',
  'Canada',
];
export const customerReportKycFilterOptions: string[] = [
  'All KYC Status',
  'Verified',
  'Pending',
  'Unverified',
];
export const customerReportSegmentFilterOptions: string[] = [
  'All Segments',
  'New',
  'Regular',
  'VIP',
];

// ============================================================
// STANDALONE SYSTEM ACTIVITY PAGE (Reports & Analytics)
// ============================================================

export interface SystemActivityStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const systemActivityStats: SystemActivityStat[] = [
  {
    id: 'total-events-today',
    label: 'Total Events Today',
    value: '1,248',
    change: 22.8,
    changeLabel: 'vs yesterday',
  },
  {
    id: 'active-sessions',
    label: 'Active Sessions',
    value: '186',
    change: 6.3,
    changeLabel: 'vs yesterday',
  },
  {
    id: 'failed-logins',
    label: 'Failed Login Attempts',
    value: '14',
    change: -18.0,
    changeLabel: 'vs yesterday',
  },
  {
    id: 'system-uptime',
    label: 'System Uptime',
    value: '99.98%',
    change: 0.02,
    changeLabel: 'vs last 30 days',
  },
];

export type SystemActivityResult = 'Success' | 'Failed';

export interface SystemActivityRow {
  id: string;
  time: string;
  user: string;
  action: string;
  module: string;
  ipAddress: string;
  result: SystemActivityResult;
}

export const systemActivityRows: SystemActivityRow[] = [
  {
    id: 'sa-001',
    time: 'May 12, 2025 10:30 AM',
    user: 'Nusrat Jahan',
    action: 'Approve Transaction',
    module: 'Transactions',
    ipAddress: '192.168.1.45',
    result: 'Success',
  },
  {
    id: 'sa-002',
    time: 'May 12, 2025 10:25 AM',
    user: 'Arif Khan',
    action: 'Update Exchange Rate',
    module: 'Exchange Rates',
    ipAddress: '192.168.1.32',
    result: 'Success',
  },
  {
    id: 'sa-003',
    time: 'May 12, 2025 10:20 AM',
    user: 'Kamrul Hasan',
    action: 'Add Pickup Request',
    module: 'Pickup Requests',
    ipAddress: '192.168.1.28',
    result: 'Success',
  },
  {
    id: 'sa-004',
    time: 'May 12, 2025 10:15 AM',
    user: 'Unknown',
    action: 'Login Attempt',
    module: 'Authentication',
    ipAddress: '203.0.113.54',
    result: 'Failed',
  },
  {
    id: 'sa-005',
    time: 'May 12, 2025 10:10 AM',
    user: 'Fatima Ali',
    action: 'Login',
    module: 'Authentication',
    ipAddress: '192.168.1.45',
    result: 'Success',
  },
  {
    id: 'sa-006',
    time: 'May 12, 2025 10:05 AM',
    user: 'Nusrat Jahan',
    action: 'Edit Customer',
    module: 'Customers',
    ipAddress: '192.168.1.45',
    result: 'Success',
  },
  {
    id: 'sa-007',
    time: 'May 12, 2025 09:58 AM',
    user: 'System',
    action: 'Scheduled Backup',
    module: 'System',
    ipAddress: '127.0.0.1',
    result: 'Success',
  },
];
export const systemActivityRowsTotalCount = 1248;

export const systemActivityModuleFilterOptions: string[] = [
  'All Modules',
  'Transactions',
  'Exchange Rates',
  'Pickup Requests',
  'Authentication',
  'Customers',
  'System',
];
export const systemActivityResultFilterOptions: string[] = [
  'All Results',
  'Success',
  'Failed',
];

// ============================================================
// STANDALONE CUSTOM REPORTS PAGE (Reports & Analytics)
// ============================================================

export interface CustomReportsStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const customReportsPageStats: CustomReportsStat[] = [
  {
    id: 'total-custom-reports',
    label: 'Total Custom Reports',
    value: '36',
    change: 12.5,
    changeLabel: 'vs last month',
  },
  {
    id: 'scheduled-reports',
    label: 'Scheduled Reports',
    value: '14',
    change: 7.7,
    changeLabel: 'vs last month',
  },
  {
    id: 'shared-reports',
    label: 'Shared with Team',
    value: '21',
    change: 16.7,
    changeLabel: 'vs last month',
  },
  {
    id: 'most-used',
    label: 'Most Used Report',
    value: 'Daily Revenue',
    change: 0,
    changeLabel: 'this month',
  },
];

export const customReportDataSources: string[] = [
  'Transactions',
  'Cash Pickups',
  'Agents Performance',
  'Revenue & Finance',
  'Customers',
  'Compliance',
];

export const customReportAvailableFields: Record<string, string[]> = {
  Transactions: [
    'Transaction No.',
    'Sender',
    'Recipient',
    'Amount',
    'Currency',
    'Status',
    'Date',
  ],
  'Cash Pickups': [
    'Pickup ID',
    'Customer',
    'Agent',
    'Branch',
    'Amount',
    'Status',
  ],
  'Agents Performance': [
    'Agent Name',
    'Branch',
    'Transactions',
    'Completion Rate',
    'Rating',
  ],
  'Revenue & Finance': [
    'Date',
    'Gross Volume',
    'Fees Collected',
    'Payouts',
    'Net Revenue',
  ],
  Customers: [
    'Customer ID',
    'Customer Name',
    'Country',
    'KYC Status',
    'Segment',
  ],
  Compliance: ['Report Name', 'Type', 'Period', 'Status', 'Generated By'],
};

export type CustomReportFrequency = 'One-time' | 'Daily' | 'Weekly' | 'Monthly';

export interface CustomReportRow {
  id: string;
  reportName: string;
  dataSource: string;
  createdBy: string;
  createdDate: string;
  lastRun: string;
  frequency: CustomReportFrequency;
  shared: boolean;
}

export const customReportRows: CustomReportRow[] = [
  {
    id: 'cur-001',
    reportName: 'Daily Revenue',
    dataSource: 'Revenue & Finance',
    createdBy: 'Nusrat Jahan',
    createdDate: 'Mar 2, 2025',
    lastRun: 'May 12, 2025 06:00 AM',
    frequency: 'Daily',
    shared: true,
  },
  {
    id: 'cur-002',
    reportName: 'High-Value Transactions (>$1000)',
    dataSource: 'Transactions',
    createdBy: 'Arif Khan',
    createdDate: 'Feb 18, 2025',
    lastRun: 'May 11, 2025 09:00 PM',
    frequency: 'Weekly',
    shared: true,
  },
  {
    id: 'cur-003',
    reportName: 'Top Performing Agents',
    dataSource: 'Agents Performance',
    createdBy: 'Kamrul Hasan',
    createdDate: 'Jan 25, 2025',
    lastRun: 'May 1, 2025 08:00 AM',
    frequency: 'Monthly',
    shared: false,
  },
  {
    id: 'cur-004',
    reportName: 'New Customer Signups',
    dataSource: 'Customers',
    createdBy: 'Fatima Ali',
    createdDate: 'Apr 5, 2025',
    lastRun: 'May 12, 2025 07:00 AM',
    frequency: 'Daily',
    shared: true,
  },
  {
    id: 'cur-005',
    reportName: 'Branch-wise Cash Pickup Volume',
    dataSource: 'Cash Pickups',
    createdBy: 'Nusrat Jahan',
    createdDate: 'Mar 28, 2025',
    lastRun: 'May 10, 2025 05:00 PM',
    frequency: 'Weekly',
    shared: false,
  },
  {
    id: 'cur-006',
    reportName: 'AML Filing Status Snapshot',
    dataSource: 'Compliance',
    createdBy: 'Arif Khan',
    createdDate: 'May 1, 2025',
    lastRun: 'May 9, 2025 10:00 AM',
    frequency: 'One-time',
    shared: false,
  },
];
export const customReportRowsTotalCount = 36;

export const customReportDataSourceFilterOptions: string[] = [
  'All Data Sources',
  ...customReportDataSources,
];
export const customReportFrequencyFilterOptions: string[] = [
  'All Frequencies',
  'One-time',
  'Daily',
  'Weekly',
  'Monthly',
];

// ============================================================
// STANDALONE SCHEDULED REPORTS PAGE (Reports & Analytics)
// ============================================================

export interface ScheduledReportsStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const scheduledReportsPageStats: ScheduledReportsStat[] = [
  {
    id: 'total-scheduled',
    label: 'Total Scheduled Reports',
    value: '14',
    change: 7.7,
    changeLabel: 'vs last month',
  },
  {
    id: 'active-schedules',
    label: 'Active Schedules',
    value: '11',
    change: 10.0,
    changeLabel: 'vs last month',
  },
  {
    id: 'paused-schedules',
    label: 'Paused Schedules',
    value: '3',
    change: -14.3,
    changeLabel: 'vs last month',
  },
  {
    id: 'running-today',
    label: 'Running Today',
    value: '5',
    change: 25.0,
    changeLabel: 'vs yesterday',
  },
];

export type ScheduledReportFrequency = 'Daily' | 'Weekly' | 'Monthly';

export interface ScheduledReportRow {
  id: string;
  reportName: string;
  dataSource: string;
  frequency: ScheduledReportFrequency;
  cadence: string;
  nextRun: string;
  recipients: string[];
  enabled: boolean;
}

export const scheduledReportRows: ScheduledReportRow[] = [
  {
    id: 'sch-001',
    reportName: 'Daily Transaction Report',
    dataSource: 'Transactions',
    frequency: 'Daily',
    cadence: 'Every day at 08:00 AM',
    nextRun: 'May 13, 2025 08:00 AM',
    recipients: ['Nusrat Jahan', 'Arif Khan'],
    enabled: true,
  },
  {
    id: 'sch-002',
    reportName: 'Weekly Summary Report',
    dataSource: 'Revenue & Finance',
    frequency: 'Weekly',
    cadence: 'Every Monday at 09:00 AM',
    nextRun: 'May 19, 2025 09:00 AM',
    recipients: ['Kamrul Hasan'],
    enabled: true,
  },
  {
    id: 'sch-003',
    reportName: 'Monthly Revenue Report',
    dataSource: 'Revenue & Finance',
    frequency: 'Monthly',
    cadence: '1st of every month at 10:00 AM',
    nextRun: 'Jun 1, 2025 10:00 AM',
    recipients: ['Nusrat Jahan', 'Fatima Ali'],
    enabled: true,
  },
  {
    id: 'sch-004',
    reportName: 'Compliance Summary Report',
    dataSource: 'Compliance',
    frequency: 'Weekly',
    cadence: 'Every Friday at 06:00 PM',
    nextRun: 'May 16, 2025 06:00 PM',
    recipients: ['Arif Khan'],
    enabled: false,
  },
  {
    id: 'sch-005',
    reportName: 'Agent Performance Digest',
    dataSource: 'Agents Performance',
    frequency: 'Weekly',
    cadence: 'Every Sunday at 07:00 AM',
    nextRun: 'May 18, 2025 07:00 AM',
    recipients: ['Kamrul Hasan', 'Rashed Alam'],
    enabled: true,
  },
  {
    id: 'sch-006',
    reportName: 'Customer Growth Report',
    dataSource: 'Customers',
    frequency: 'Monthly',
    cadence: '1st of every month at 09:00 AM',
    nextRun: 'Jun 1, 2025 09:00 AM',
    recipients: ['Fatima Ali'],
    enabled: false,
  },
];
export const scheduledReportRowsTotalCount = 14;

export const scheduledReportFrequencyFilterOptions: string[] = [
  'All Frequencies',
  'Daily',
  'Weekly',
  'Monthly',
];
export const scheduledReportStatusFilterOptions: string[] = [
  'All Status',
  'Active',
  'Paused',
];

// ============================================================
// STANDALONE SAVED REPORTS PAGE (Reports & Analytics)
// ============================================================

export interface SavedReportsStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const savedReportsPageStats: SavedReportsStat[] = [
  {
    id: 'total-saved',
    label: 'Total Saved Reports',
    value: '128',
    change: 14.3,
    changeLabel: 'vs last month',
  },
  {
    id: 'favorites',
    label: 'Favorites',
    value: '23',
    change: 9.5,
    changeLabel: 'vs last month',
  },
  {
    id: 'shared-with-me',
    label: 'Shared with Me',
    value: '17',
    change: 6.3,
    changeLabel: 'vs last month',
  },
  {
    id: 'storage-used',
    label: 'Storage Used',
    value: '2.4 GB',
    change: 11.1,
    changeLabel: 'vs last month',
  },
];

export type SavedReportFileType = 'xlsx' | 'pdf' | 'csv';

export interface SavedReportRow {
  id: string;
  reportName: string;
  dataSource: string;
  savedBy: string;
  savedDate: string;
  fileType: SavedReportFileType;
  fileSize: string;
  favorite: boolean;
}

export const savedReportRows: SavedReportRow[] = [
  {
    id: 'svd-001',
    reportName: 'Transaction_Report_May_12_2025',
    dataSource: 'Transactions',
    savedBy: 'Nusrat Jahan',
    savedDate: 'May 12, 2025 10:30 AM',
    fileType: 'xlsx',
    fileSize: '1.2 MB',
    favorite: true,
  },
  {
    id: 'svd-002',
    reportName: 'Revenue_Report_April_2025',
    dataSource: 'Revenue & Finance',
    savedBy: 'Arif Khan',
    savedDate: 'May 12, 2025 09:15 AM',
    fileType: 'pdf',
    fileSize: '845 KB',
    favorite: true,
  },
  {
    id: 'svd-003',
    reportName: 'Agent_Performance_May_2025',
    dataSource: 'Agents Performance',
    savedBy: 'Kamrul Hasan',
    savedDate: 'May 12, 2025 08:45 AM',
    fileType: 'xlsx',
    fileSize: '980 KB',
    favorite: false,
  },
  {
    id: 'svd-004',
    reportName: 'Customer_Growth_Q1_2025',
    dataSource: 'Customers',
    savedBy: 'Fatima Ali',
    savedDate: 'Apr 30, 2025 03:20 PM',
    fileType: 'csv',
    fileSize: '620 KB',
    favorite: false,
  },
  {
    id: 'svd-005',
    reportName: 'Cash_Pickup_Summary_April_2025',
    dataSource: 'Cash Pickups',
    savedBy: 'Nusrat Jahan',
    savedDate: 'May 1, 2025 11:05 AM',
    fileType: 'xlsx',
    fileSize: '1.5 MB',
    favorite: true,
  },
  {
    id: 'svd-006',
    reportName: 'Compliance_Filing_Q1_2025',
    dataSource: 'Compliance',
    savedBy: 'Arif Khan',
    savedDate: 'Apr 12, 2025 02:40 PM',
    fileType: 'pdf',
    fileSize: '2.1 MB',
    favorite: false,
  },
];
export const savedReportRowsTotalCount = 128;

export const savedReportDataSourceFilterOptions: string[] = [
  'All Data Sources',
  'Transactions',
  'Revenue & Finance',
  'Agents Performance',
  'Customers',
  'Cash Pickups',
  'Compliance',
];
export const savedReportFileTypeFilterOptions: string[] = [
  'All File Types',
  'xlsx',
  'pdf',
  'csv',
];

// ============================================================
// STANDALONE REPORT TEMPLATES PAGE (Reports & Analytics)
// ============================================================

export interface ReportTemplatesStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const reportTemplatesPageStats: ReportTemplatesStat[] = [
  {
    id: 'total-templates',
    label: 'Total Templates',
    value: '22',
    change: 4.8,
    changeLabel: 'vs last month',
  },
  {
    id: 'system-templates',
    label: 'System Templates',
    value: '12',
    change: 0,
    changeLabel: 'built-in',
  },
  {
    id: 'custom-templates',
    label: 'Custom Templates',
    value: '10',
    change: 11.1,
    changeLabel: 'vs last month',
  },
  {
    id: 'most-used-template',
    label: 'Most Used Template',
    value: 'Daily Transaction',
    change: 0,
    changeLabel: 'this month',
  },
];

export type ReportTemplateCategory =
  | 'Transactions'
  | 'Finance'
  | 'Agents'
  | 'Compliance'
  | 'Customers';
export type ReportTemplateOwner = 'System' | 'Custom';

export interface ReportTemplateRow {
  id: string;
  templateName: string;
  category: ReportTemplateCategory;
  owner: ReportTemplateOwner;
  fieldsCount: number;
  usageCount: number;
  lastUsed: string;
}

export const reportTemplateRows: ReportTemplateRow[] = [
  {
    id: 'tpl-001',
    templateName: 'Daily Transaction Summary',
    category: 'Transactions',
    owner: 'System',
    fieldsCount: 8,
    usageCount: 312,
    lastUsed: 'May 12, 2025',
  },
  {
    id: 'tpl-002',
    templateName: 'Monthly Revenue Breakdown',
    category: 'Finance',
    owner: 'System',
    fieldsCount: 6,
    usageCount: 248,
    lastUsed: 'May 1, 2025',
  },
  {
    id: 'tpl-003',
    templateName: 'Agent Productivity Scorecard',
    category: 'Agents',
    owner: 'System',
    fieldsCount: 7,
    usageCount: 156,
    lastUsed: 'May 10, 2025',
  },
  {
    id: 'tpl-004',
    templateName: 'AML Alert Digest',
    category: 'Compliance',
    owner: 'System',
    fieldsCount: 9,
    usageCount: 98,
    lastUsed: 'May 9, 2025',
  },
  {
    id: 'tpl-005',
    templateName: 'High-Value Customer Watchlist',
    category: 'Customers',
    owner: 'Custom',
    fieldsCount: 5,
    usageCount: 41,
    lastUsed: 'May 8, 2025',
  },
  {
    id: 'tpl-006',
    templateName: 'Corridor Volume Comparison',
    category: 'Finance',
    owner: 'Custom',
    fieldsCount: 6,
    usageCount: 27,
    lastUsed: 'Apr 30, 2025',
  },
  {
    id: 'tpl-007',
    templateName: 'Failed Transaction Root Cause',
    category: 'Transactions',
    owner: 'Custom',
    fieldsCount: 7,
    usageCount: 19,
    lastUsed: 'Apr 22, 2025',
  },
];
export const reportTemplateRowsTotalCount = 22;

export const reportTemplateCategoryFilterOptions: string[] = [
  'All Categories',
  'Transactions',
  'Finance',
  'Agents',
  'Compliance',
  'Customers',
];
export const reportTemplateOwnerFilterOptions: string[] = [
  'All Owners',
  'System',
  'Custom',
];

// ============================================================
// SUPPORT — SUPPORT OVERVIEW — append to lib/data.ts
// ============================================================

export interface SupportOverviewStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: number[];
  trendColor: string;
}

export const supportOverviewStats: SupportOverviewStat[] = [
  {
    id: 'total-tickets',
    label: 'Total Tickets',
    value: '1,248',
    change: 12.5,
    changeLabel: 'vs last 7 days',
    trend: [4, 6, 5, 8, 7, 9, 8, 10, 9, 11],
    trendColor: '#3b82f6',
  },
  {
    id: 'open-tickets',
    label: 'Open Tickets',
    value: '286',
    change: 8.3,
    changeLabel: 'vs last 7 days',
    trend: [5, 6, 6, 7, 6, 8, 7, 9, 8, 9],
    trendColor: '#f97316',
  },
  {
    id: 'pending-replies',
    label: 'Pending Replies',
    value: '156',
    change: 6.7,
    changeLabel: 'vs last 7 days',
    trend: [6, 7, 6, 8, 7, 8, 9, 8, 9, 10],
    trendColor: '#a855f7',
  },
  {
    id: 'resolved-today',
    label: 'Resolved Today',
    value: '142',
    change: 15.2,
    changeLabel: 'vs yesterday',
    trend: [3, 5, 4, 6, 5, 7, 6, 8, 7, 9],
    trendColor: '#22c55e',
  },
  {
    id: 'avg-response-time',
    label: 'Avg. Response Time',
    value: '18m 24s',
    change: -5.3,
    changeLabel: 'vs last 7 days',
    trend: [9, 8, 9, 7, 8, 6, 7, 5, 6, 5],
    trendColor: '#3b82f6',
  },
  {
    id: 'live-chats-active',
    label: 'Live Chats Active',
    value: '24',
    change: 9.1,
    changeLabel: 'vs now',
    trend: [4, 5, 5, 6, 6, 7, 7, 8, 8, 9],
    trendColor: '#a855f7',
  },
  {
    id: 'unread-announcements',
    label: 'Unread Announcements',
    value: '5',
    change: 0,
    changeLabel: 'No change',
    trend: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    trendColor: '#f97316',
  },
];

export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketStatus =
  | 'Open'
  | 'In Progress'
  | 'Pending Reply'
  | 'Resolved'
  | 'Closed';

export interface SupportTicket {
  id: string;
  ticketId: string;
  customerName: string;
  category: string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: string;
  updated: string;
}

export const recentSupportTickets: SupportTicket[] = [
  {
    id: 'tkt-001',
    ticketId: 'TKT-250512-001',
    customerName: 'Rahim Uddin',
    category: 'Transaction Issue',
    subject: 'Payment not received yet',
    priority: 'High',
    status: 'Open',
    assignedTo: 'Nusrat Jahan',
    updated: '2 min ago',
  },
  {
    id: 'tkt-002',
    ticketId: 'TKT-250512-002',
    customerName: 'Maria Santos',
    category: 'Cash Pickup Delay',
    subject: 'Delayed pickup at agent point',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Arif Khan',
    updated: '10 min ago',
  },
  {
    id: 'tkt-003',
    ticketId: 'TKT-250512-003',
    customerName: 'John Doe',
    category: 'Account Verification',
    subject: 'Document verification issue',
    priority: 'High',
    status: 'Pending Reply',
    assignedTo: 'Fatima Ali',
    updated: '15 min ago',
  },
  {
    id: 'tkt-004',
    ticketId: 'TKT-250512-004',
    customerName: 'David Wilson',
    category: 'Payment Failure',
    subject: 'Transaction failed but amount...',
    priority: 'Critical',
    status: 'In Progress',
    assignedTo: 'Kamrul Hasan',
    updated: '25 min ago',
  },
  {
    id: 'tkt-005',
    ticketId: 'TKT-250512-005',
    customerName: 'Imran Hossain',
    category: 'Technical Issue',
    subject: 'Unable to login to account',
    priority: 'Low',
    status: 'Open',
    assignedTo: 'Nasir Uddin',
    updated: '30 min ago',
  },
  {
    id: 'tkt-006',
    ticketId: 'TKT-250512-006',
    customerName: 'Sophia Martin',
    category: 'Cash Pickup Delay',
    subject: 'Agent not available',
    priority: 'Medium',
    status: 'Pending Reply',
    assignedTo: 'Arif Khan',
    updated: '45 min ago',
  },
  {
    id: 'tkt-007',
    ticketId: 'TKT-250512-007',
    customerName: 'Ahmed Khan',
    category: 'Transaction Issue',
    subject: 'Wrong amount deducted',
    priority: 'High',
    status: 'Open',
    assignedTo: 'Nusrat Jahan',
    updated: '1 hour ago',
  },
  {
    id: 'tkt-008',
    ticketId: 'TKT-250512-008',
    customerName: 'Fatima Ali',
    category: 'Account Verification',
    subject: 'KYC verification pending',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Fatima Ali',
    updated: '1 hour ago',
  },
];
export const recentSupportTicketsTotalCount = 1248;

export const supportTicketStatusTabs: {
  label: string;
  count: number | null;
}[] = [
  { label: 'All', count: null },
  { label: 'Open', count: 286 },
  { label: 'In Progress', count: 156 },
  { label: 'Pending Reply', count: 78 },
  { label: 'Resolved', count: 583 },
  { label: 'Closed', count: 145 },
];

export const supportTicketCategoryFilterOptions: string[] = [
  'All Categories',
  'Transaction Issue',
  'Cash Pickup Delay',
  'Account Verification',
  'Payment Failure',
  'Technical Issue',
];
export const supportTicketPriorityFilterOptions: string[] = [
  'All Priorities',
  'Low',
  'Medium',
  'High',
  'Critical',
];
export const supportTicketAgentFilterOptions: string[] = [
  'All Agents',
  'Nusrat Jahan',
  'Arif Khan',
  'Fatima Ali',
  'Kamrul Hasan',
  'Nasir Uddin',
];

export interface LiveChatItem {
  id: string;
  customerName: string;
  messagePreview: string;
  timeAgo: string;
  unreadCount: number;
}

export const activeLiveChats: LiveChatItem[] = [
  {
    id: 'lc-001',
    customerName: 'Rahim Uddin',
    messagePreview: "I haven't received my payment yet...",
    timeAgo: '2 min',
    unreadCount: 2,
  },
  {
    id: 'lc-002',
    customerName: 'Maria Santos',
    messagePreview: 'How long will it take for pickup?',
    timeAgo: '3 min',
    unreadCount: 1,
  },
  {
    id: 'lc-003',
    customerName: 'John Doe',
    messagePreview: 'I need help with verification',
    timeAgo: '5 min',
    unreadCount: 1,
  },
  {
    id: 'lc-004',
    customerName: 'David Wilson',
    messagePreview: 'Payment failed but amount deducted',
    timeAgo: '7 min',
    unreadCount: 0,
  },
  {
    id: 'lc-005',
    customerName: 'Imran Hossain',
    messagePreview: 'Agent not available at location',
    timeAgo: '10 min',
    unreadCount: 0,
  },
];
export const activeLiveChatsCount = 24;

export type AnnouncementPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface AnnouncementItem {
  id: string;
  title: string;
  description: string;
  priority: AnnouncementPriority;
  date: string;
}

export const recentAnnouncements: AnnouncementItem[] = [
  {
    id: 'ann-001',
    title: 'Exchange Rate Update',
    description: 'New exchange rates are effective from today',
    priority: 'High',
    date: 'May 12, 2025',
  },
  {
    id: 'ann-002',
    title: 'System Maintenance',
    description: 'Scheduled maintenance on May 15, 2025',
    priority: 'Critical',
    date: 'May 11, 2025',
  },
  {
    id: 'ann-003',
    title: 'New Agent Branch Added',
    description: 'BRAC Bank - Sylhet Branch is now active',
    priority: 'Medium',
    date: 'May 10, 2025',
  },
  {
    id: 'ann-004',
    title: 'Eid Holiday Notice',
    description: 'Our offices will be closed on Eid days',
    priority: 'Low',
    date: 'May 9, 2025',
  },
];

export const ticketsByCategory: {
  label: string;
  count: number;
  percent: number;
  color: string;
}[] = [
  { label: 'Transaction Issue', count: 450, percent: 36.1, color: '#3b82f6' },
  { label: 'Cash Pickup Delay', count: 280, percent: 22.4, color: '#f97316' },
  {
    label: 'Account Verification',
    count: 210,
    percent: 16.9,
    color: '#22c55e',
  },
  { label: 'Payment Failure', count: 160, percent: 12.8, color: '#a855f7' },
  { label: 'Technical Issue', count: 148, percent: 11.9, color: '#9ca3af' },
];
export const ticketsByCategoryTotal = 1248;

export const ticketsByPriority: {
  label: string;
  count: number;
  percent: number;
  color: string;
}[] = [
  { label: 'Critical', count: 148, percent: 11.9, color: '#ef4444' },
  { label: 'High', count: 320, percent: 25.6, color: '#f97316' },
  { label: 'Medium', count: 420, percent: 33.7, color: '#f59e0b' },
  { label: 'Low', count: 360, percent: 28.8, color: '#22c55e' },
];
export const ticketsByPriorityTotal = 1248;

export interface SlaPerformanceSummary {
  metPercent: number;
  metCount: number;
  breachedCount: number;
  avgResponseTime: string;
  avgResolutionTime: string;
}

export const slaPerformanceThisWeek: SlaPerformanceSummary = {
  metPercent: 78,
  metCount: 978,
  breachedCount: 270,
  avgResponseTime: '18m 24s',
  avgResolutionTime: '4h 32m',
};

export interface SlaTrendMetric {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: number[];
}

export const slaOverviewThisWeek: SlaTrendMetric[] = [
  {
    label: 'First Response Time',
    value: '18m 24s',
    change: 5.3,
    changeLabel: 'vs last week',
    trend: [22, 20, 21, 19, 20, 18, 18],
  },
  {
    label: 'Resolution Time',
    value: '4h 32m',
    change: 8.7,
    changeLabel: 'vs last week',
    trend: [5.2, 5.0, 4.8, 4.6, 4.7, 4.4, 4.5],
  },
];

export const ticketActivityThisWeek = {
  labels: ['May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'],
  created: [180, 165, 195, 175, 210, 230, 150],
  resolved: [160, 170, 150, 180, 175, 200, 140],
};

export interface TopPerformingAgent {
  id: string;
  name: string;
  ticketsResolved: number;
  maxScale: number;
}

export const topPerformingSupportAgents: TopPerformingAgent[] = [
  {
    id: 'tpa-001',
    name: 'Nusrat Jahan',
    ticketsResolved: 245,
    maxScale: 250,
    rank: 0,
    code: '',
    avatarColor: '',
    volume: 0,
    changePct: 0,
  },
  {
    id: 'tpa-002',
    name: 'Arif Khan',
    ticketsResolved: 198,
    maxScale: 250,
    rank: 0,
    code: '',
    avatarColor: '',
    volume: 0,
    changePct: 0,
  },
  {
    id: 'tpa-003',
    name: 'Fatima Ali',
    ticketsResolved: 176,
    maxScale: 250,
    rank: 0,
    code: '',
    avatarColor: '',
    volume: 0,
    changePct: 0,
  },
  {
    id: 'tpa-004',
    name: 'Kamrul Hasan',
    ticketsResolved: 154,
    maxScale: 250,
    rank: 0,
    code: '',
    avatarColor: '',
    volume: 0,
    changePct: 0,
  },
  {
    id: 'tpa-005',
    name: 'Nasir Uddin',
    ticketsResolved: 120,
    maxScale: 250,
    rank: 0,
    code: '',
    avatarColor: '',
    volume: 0,
    changePct: 0,
  },
];





// ============================================================
// SUPPORT — SUPPORT TICKETS PAGE — append to lib/data.ts
// ============================================================

export type TicketPriority2 = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketStatus2 =
  | 'Open'
  | 'In Progress'
  | 'Pending Reply'
  | 'Resolved'
  | 'Closed';

export interface SupportTicketFull {
  id: string;
  ticketId: string;
  customerName: string;
  customerAvatar: string;
  category: string;
  subject: string;
  priority: TicketPriority2;
  status: TicketStatus2;
  assignedTo: string;
  assignedAvatar: string;
  updated: string;
  createdAt: string;
}

// Full ticket list for the Support Tickets table (paginated, 10/page)
export const allSupportTickets: SupportTicketFull[] = [
  {
    id: 'tkt-001',
    ticketId: 'TKT-250512-001',
    customerName: 'Rahim Uddin',
    customerAvatar: 'https://i.pravatar.cc/40?img=1',
    category: 'Transaction Issue',
    subject: 'Payment not received yet',
    priority: 'High',
    status: 'Open',
    assignedTo: 'Nusrat Jahan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=11',
    updated: '2 min ago',
    createdAt: 'May 12, 2025',
  },
  {
    id: 'tkt-002',
    ticketId: 'TKT-250512-002',
    customerName: 'Maria Santos',
    customerAvatar: 'https://i.pravatar.cc/40?img=2',
    category: 'Cash Pickup Delay',
    subject: 'Delayed pickup at agent point',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Arif Khan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=12',
    updated: '10 min ago',
    createdAt: 'May 12, 2025',
  },
  {
    id: 'tkt-003',
    ticketId: 'TKT-250512-003',
    customerName: 'John Doe',
    customerAvatar: 'https://i.pravatar.cc/40?img=3',
    category: 'Account Verification',
    subject: 'Document verification issue',
    priority: 'High',
    status: 'Pending Reply',
    assignedTo: 'Fatima Ali',
    assignedAvatar: 'https://i.pravatar.cc/40?img=13',
    updated: '15 min ago',
    createdAt: 'May 12, 2025',
  },
  {
    id: 'tkt-004',
    ticketId: 'TKT-250512-004',
    customerName: 'David Wilson',
    customerAvatar: 'https://i.pravatar.cc/40?img=4',
    category: 'Payment Failure',
    subject: 'Transaction failed but amount deducted',
    priority: 'Critical',
    status: 'In Progress',
    assignedTo: 'Kamrul Hasan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=14',
    updated: '25 min ago',
    createdAt: 'May 12, 2025',
  },
  {
    id: 'tkt-005',
    ticketId: 'TKT-250512-005',
    customerName: 'Imran Hossain',
    customerAvatar: 'https://i.pravatar.cc/40?img=5',
    category: 'Technical Issue',
    subject: 'Unable to login to account',
    priority: 'Low',
    status: 'Open',
    assignedTo: 'Nasir Uddin',
    assignedAvatar: 'https://i.pravatar.cc/40?img=15',
    updated: '30 min ago',
    createdAt: 'May 12, 2025',
  },
  {
    id: 'tkt-006',
    ticketId: 'TKT-250512-006',
    customerName: 'Sophia Martin',
    customerAvatar: 'https://i.pravatar.cc/40?img=6',
    category: 'Cash Pickup Delay',
    subject: 'Agent not available at location',
    priority: 'Medium',
    status: 'Pending Reply',
    assignedTo: 'Arif Khan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=12',
    updated: '45 min ago',
    createdAt: 'May 12, 2025',
  },
  {
    id: 'tkt-007',
    ticketId: 'TKT-250512-007',
    customerName: 'Ahmed Khan',
    customerAvatar: 'https://i.pravatar.cc/40?img=7',
    category: 'Transaction Issue',
    subject: 'Wrong amount deducted',
    priority: 'High',
    status: 'Open',
    assignedTo: 'Nusrat Jahan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=11',
    updated: '1 hour ago',
    createdAt: 'May 12, 2025',
  },
  {
    id: 'tkt-008',
    ticketId: 'TKT-250512-008',
    customerName: 'Fatima Ali',
    customerAvatar: 'https://i.pravatar.cc/40?img=8',
    category: 'Account Verification',
    subject: 'KYC verification pending',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Fatima Ali',
    assignedAvatar: 'https://i.pravatar.cc/40?img=13',
    updated: '1 hour ago',
    createdAt: 'May 11, 2025',
  },
  {
    id: 'tkt-009',
    ticketId: 'TKT-250511-009',
    customerName: 'Lisa Chen',
    customerAvatar: 'https://i.pravatar.cc/40?img=9',
    category: 'Technical Issue',
    subject: 'App crashes on opening',
    priority: 'Medium',
    status: 'Closed',
    assignedTo: 'Nasir Uddin',
    assignedAvatar: 'https://i.pravatar.cc/40?img=15',
    updated: '2 hours ago',
    createdAt: 'May 11, 2025',
  },
  {
    id: 'tkt-010',
    ticketId: 'TKT-250511-010',
    customerName: 'Karim Sheikh',
    customerAvatar: 'https://i.pravatar.cc/40?img=10',
    category: 'Payment Failure',
    subject: 'Refund not processed',
    priority: 'Critical',
    status: 'Open',
    assignedTo: 'Kamrul Hasan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=14',
    updated: '3 hours ago',
    createdAt: 'May 11, 2025',
  },
  {
    id: 'tkt-011',
    ticketId: 'TKT-250511-011',
    customerName: 'Nadia Islam',
    customerAvatar: 'https://i.pravatar.cc/40?img=16',
    category: 'Cash Pickup Delay',
    subject: 'Pickup location closed early',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Arif Khan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=12',
    updated: '4 hours ago',
    createdAt: 'May 11, 2025',
  },
  {
    id: 'tkt-012',
    ticketId: 'TKT-250511-012',
    customerName: 'Robert Taylor',
    customerAvatar: 'https://i.pravatar.cc/40?img=17',
    category: 'Transaction Issue',
    subject: 'Duplicate transaction charged',
    priority: 'High',
    status: 'Pending Reply',
    assignedTo: 'Nusrat Jahan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=11',
    updated: '5 hours ago',
    createdAt: 'May 11, 2025',
  },
  {
    id: 'tkt-013',
    ticketId: 'TKT-250511-013',
    customerName: 'Priya Sharma',
    customerAvatar: 'https://i.pravatar.cc/40?img=18',
    category: 'Account Verification',
    subject: 'Phone number not verified',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Fatima Ali',
    assignedAvatar: 'https://i.pravatar.cc/40?img=13',
    updated: '6 hours ago',
    createdAt: 'May 10, 2025',
  },
  {
    id: 'tkt-014',
    ticketId: 'TKT-250510-014',
    customerName: 'Tanvir Ahmed',
    customerAvatar: 'https://i.pravatar.cc/40?img=19',
    category: 'Technical Issue',
    subject: 'OTP not received on mobile',
    priority: 'High',
    status: 'Open',
    assignedTo: 'Nasir Uddin',
    assignedAvatar: 'https://i.pravatar.cc/40?img=15',
    updated: '8 hours ago',
    createdAt: 'May 10, 2025',
  },
  {
    id: 'tkt-015',
    ticketId: 'TKT-250510-015',
    customerName: 'Emily Clark',
    customerAvatar: 'https://i.pravatar.cc/40?img=20',
    category: 'Payment Failure',
    subject: 'Card declined during payment',
    priority: 'Medium',
    status: 'Closed',
    assignedTo: 'Kamrul Hasan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=14',
    updated: '10 hours ago',
    createdAt: 'May 10, 2025',
  },
  {
    id: 'tkt-016',
    ticketId: 'TKT-250510-016',
    customerName: 'Mohammad Ali',
    customerAvatar: 'https://i.pravatar.cc/40?img=21',
    category: 'Cash Pickup Delay',
    subject: 'Agent requesting extra fee',
    priority: 'Critical',
    status: 'In Progress',
    assignedTo: 'Arif Khan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=12',
    updated: '12 hours ago',
    createdAt: 'May 10, 2025',
  },
  {
    id: 'tkt-017',
    ticketId: 'TKT-250509-017',
    customerName: 'Sarah Johnson',
    customerAvatar: 'https://i.pravatar.cc/40?img=22',
    category: 'Transaction Issue',
    subject: 'Transaction stuck in pending',
    priority: 'High',
    status: 'Pending Reply',
    assignedTo: 'Nusrat Jahan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=11',
    updated: '1 day ago',
    createdAt: 'May 9, 2025',
  },
  {
    id: 'tkt-018',
    ticketId: 'TKT-250509-018',
    customerName: 'Jamal Hossain',
    customerAvatar: 'https://i.pravatar.cc/40?img=23',
    category: 'Account Verification',
    subject: 'NID upload failing repeatedly',
    priority: 'Medium',
    status: 'Resolved',
    assignedTo: 'Fatima Ali',
    assignedAvatar: 'https://i.pravatar.cc/40?img=13',
    updated: '1 day ago',
    createdAt: 'May 9, 2025',
  },
  {
    id: 'tkt-019',
    ticketId: 'TKT-250509-019',
    customerName: 'Olivia Brown',
    customerAvatar: 'https://i.pravatar.cc/40?img=24',
    category: 'Technical Issue',
    subject: 'Notification not working',
    priority: 'Low',
    status: 'Open',
    assignedTo: 'Nasir Uddin',
    assignedAvatar: 'https://i.pravatar.cc/40?img=15',
    updated: '1 day ago',
    createdAt: 'May 9, 2025',
  },
  {
    id: 'tkt-020',
    ticketId: 'TKT-250508-020',
    customerName: 'Hasan Mahmud',
    customerAvatar: 'https://i.pravatar.cc/40?img=25',
    category: 'Payment Failure',
    subject: 'Wallet balance not updated',
    priority: 'Critical',
    status: 'Closed',
    assignedTo: 'Kamrul Hasan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=14',
    updated: '2 days ago',
    createdAt: 'May 8, 2025',
  },
];

export const allSupportTicketsTotalCount = 1248;
export const supportTicketsPerPage = 10;

export const supportTicketStatusTabsFull: {
  label: string;
  status: TicketStatus2 | 'All';
  count: number | null;
}[] = [
  { label: 'All', status: 'All', count: null },
  { label: 'Open', status: 'Open', count: 286 },
  { label: 'In Progress', status: 'In Progress', count: 156 },
  { label: 'Pending Reply', status: 'Pending Reply', count: 78 },
  { label: 'Resolved', status: 'Resolved', count: 583 },
  { label: 'Closed', status: 'Closed', count: 145 },
];

export const supportTicketCategoryOptions: string[] = [
  'All Categories',
  'Transaction Issue',
  'Cash Pickup Delay',
  'Account Verification',
  'Payment Failure',
  'Technical Issue',
];

export const supportTicketPriorityOptions: string[] = [
  'All Priorities',
  'Low',
  'Medium',
  'High',
  'Critical',
];

export const supportTicketAgentOptions: string[] = [
  'All Agents',
  'Nusrat Jahan',
  'Arif Khan',
  'Fatima Ali',
  'Kamrul Hasan',
  'Nasir Uddin',
];

// Color helpers (for badges) — used directly in the page component
export const priorityBadgeStyles: Record<TicketPriority2, string> = {
  Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Medium:
    'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  High: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
  Critical: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};

export const statusBadgeStyles: Record<TicketStatus2, string> = {
  Open: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  'In Progress':
    'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  'Pending Reply':
    'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  Resolved:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Closed:
    'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
};





// ============================================================
// SUPPORT — LIVE CHAT PAGE — append to lib/data.ts
// ============================================================

export type ChatMessageSender = 'customer' | 'agent';

export interface ChatMessage {
  id: string;
  sender: ChatMessageSender;
  text: string;
  time: string;
}

export type LiveChatStatus = 'Active' | 'Waiting' | 'Closed';

export interface LiveChatConversation {
  id: string;
  customerName: string;
  customerAvatar: string;
  lastMessage: string;
  timeAgo: string;
  unreadCount: number;
  status: LiveChatStatus;
  agentName: string;
  agentAvatar: string;
  category: string;
  messages: ChatMessage[];
}

export const liveChatConversations: LiveChatConversation[] = [
  {
    id: 'chat-001',
    customerName: 'Rahim Uddin',
    customerAvatar: 'https://i.pravatar.cc/40?img=1',
    lastMessage: "I haven't received my payment yet...",
    timeAgo: '2 min',
    unreadCount: 2,
    status: 'Active',
    agentName: 'Nusrat Jahan',
    agentAvatar: 'https://i.pravatar.cc/40?img=11',
    category: 'Transaction Issue',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'Hi, I sent money 2 hours ago but the receiver still hasn’t got it.',
        time: '10:02 AM',
      },
      {
        id: 'm2',
        sender: 'agent',
        text: 'Hello Rahim, sorry for the trouble. Can you share your transaction ID?',
        time: '10:03 AM',
      },
      {
        id: 'm3',
        sender: 'customer',
        text: 'Sure, it’s TXN-99021345.',
        time: '10:04 AM',
      },
      {
        id: 'm4',
        sender: 'customer',
        text: "I haven't received my payment yet...",
        time: '10:05 AM',
      },
    ],
  },
  {
    id: 'chat-002',
    customerName: 'Maria Santos',
    customerAvatar: 'https://i.pravatar.cc/40?img=2',
    lastMessage: 'How long will it take for pickup?',
    timeAgo: '3 min',
    unreadCount: 1,
    status: 'Active',
    agentName: 'Arif Khan',
    agentAvatar: 'https://i.pravatar.cc/40?img=12',
    category: 'Cash Pickup Delay',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'Hi, I want to pick up cash at the Gulshan branch.',
        time: '9:40 AM',
      },
      {
        id: 'm2',
        sender: 'agent',
        text: 'Hi Maria! The branch is open until 6 PM today.',
        time: '9:41 AM',
      },
      {
        id: 'm3',
        sender: 'customer',
        text: 'How long will it take for pickup?',
        time: '9:42 AM',
      },
    ],
  },
  {
    id: 'chat-003',
    customerName: 'John Doe',
    customerAvatar: 'https://i.pravatar.cc/40?img=3',
    lastMessage: 'I need help with verification',
    timeAgo: '5 min',
    unreadCount: 1,
    status: 'Active',
    agentName: 'Fatima Ali',
    agentAvatar: 'https://i.pravatar.cc/40?img=13',
    category: 'Account Verification',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'My document upload keeps failing.',
        time: '9:20 AM',
      },
      {
        id: 'm2',
        sender: 'agent',
        text: 'Could you tell me which document you are trying to upload?',
        time: '9:21 AM',
      },
      {
        id: 'm3',
        sender: 'customer',
        text: 'I need help with verification',
        time: '9:23 AM',
      },
    ],
  },
  {
    id: 'chat-004',
    customerName: 'David Wilson',
    customerAvatar: 'https://i.pravatar.cc/40?img=4',
    lastMessage: 'Payment failed but amount deducted',
    timeAgo: '7 min',
    unreadCount: 0,
    status: 'Waiting',
    agentName: 'Kamrul Hasan',
    agentAvatar: 'https://i.pravatar.cc/40?img=14',
    category: 'Payment Failure',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'Payment failed but amount deducted from my card.',
        time: '9:10 AM',
      },
      {
        id: 'm2',
        sender: 'agent',
        text: 'I understand, let me check this for you right away.',
        time: '9:11 AM',
      },
    ],
  },
  {
    id: 'chat-005',
    customerName: 'Imran Hossain',
    customerAvatar: 'https://i.pravatar.cc/40?img=5',
    lastMessage: 'Agent not available at location',
    timeAgo: '10 min',
    unreadCount: 0,
    status: 'Waiting',
    agentName: 'Nasir Uddin',
    agentAvatar: 'https://i.pravatar.cc/40?img=15',
    category: 'Cash Pickup Delay',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'The agent point shown on the app is closed.',
        time: '8:55 AM',
      },
      {
        id: 'm2',
        sender: 'customer',
        text: 'Agent not available at location',
        time: '8:57 AM',
      },
    ],
  },
  {
    id: 'chat-006',
    customerName: 'Sophia Martin',
    customerAvatar: 'https://i.pravatar.cc/40?img=6',
    lastMessage: 'Thank you, issue resolved!',
    timeAgo: '32 min',
    unreadCount: 0,
    status: 'Closed',
    agentName: 'Arif Khan',
    agentAvatar: 'https://i.pravatar.cc/40?img=12',
    category: 'Technical Issue',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'My app keeps logging me out.',
        time: '8:10 AM',
      },
      {
        id: 'm2',
        sender: 'agent',
        text: 'Please update the app to the latest version and try again.',
        time: '8:12 AM',
      },
      {
        id: 'm3',
        sender: 'customer',
        text: 'Thank you, issue resolved!',
        time: '8:20 AM',
      },
    ],
  },
  {
    id: 'chat-007',
    customerName: 'Ahmed Khan',
    customerAvatar: 'https://i.pravatar.cc/40?img=7',
    lastMessage: 'Wrong amount was deducted from my account',
    timeAgo: '1 hour',
    unreadCount: 0,
    status: 'Closed',
    agentName: 'Nusrat Jahan',
    agentAvatar: 'https://i.pravatar.cc/40?img=11',
    category: 'Transaction Issue',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'Wrong amount was deducted from my account',
        time: '7:30 AM',
      },
      {
        id: 'm2',
        sender: 'agent',
        text: 'We have refunded the extra amount, please check your balance.',
        time: '7:40 AM',
      },
    ],
  },
];

export const liveChatActiveCount = 24;

export const liveChatStatusTabs: {
  label: string;
  status: LiveChatStatus | 'All';
  count: number | null;
}[] = [
  { label: 'All Chats', status: 'All', count: null },
  { label: 'Active', status: 'Active', count: 24 },
  { label: 'Waiting', status: 'Waiting', count: 9 },
  { label: 'Closed', status: 'Closed', count: 132 },
];

export const liveChatStatusBadgeStyles: Record<LiveChatStatus, string> = {
  Active:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Waiting:
    'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  Closed: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
};

export const quickReplySuggestions: string[] = [
  'Thank you for reaching out, we are checking this now.',
  'Could you please share your transaction ID?',
  'We have escalated this to our technical team.',
  'Is there anything else I can help you with?',
];





// ============================================================
// SUPPORT — ANNOUNCEMENTS PAGE — append to lib/data.ts
// ============================================================

export type AnnouncementPriority2 = 'Low' | 'Medium' | 'High' | 'Critical';
export type AnnouncementStatus = 'Published' | 'Scheduled' | 'Draft';
export type AnnouncementAudience =
  | 'All Users'
  | 'Customers'
  | 'Agents'
  | 'Agents & Admins';

export interface AnnouncementFull {
  id: string;
  title: string;
  description: string;
  priority: AnnouncementPriority2;
  status: AnnouncementStatus;
  audience: AnnouncementAudience;
  author: string;
  authorAvatar: string;
  date: string;
  views: number;
}

export const allAnnouncements: AnnouncementFull[] = [
  {
    id: 'ann-001',
    title: 'Exchange Rate Update',
    description:
      'New exchange rates are effective from today across all corridors. Please inform customers during transactions.',
    priority: 'High',
    status: 'Published',
    audience: 'All Users',
    author: 'Nusrat Jahan',
    authorAvatar: 'https://i.pravatar.cc/40?img=11',
    date: 'May 12, 2025',
    views: 1842,
  },
  {
    id: 'ann-002',
    title: 'System Maintenance',
    description:
      'Scheduled maintenance on May 15, 2025 from 1 AM to 4 AM. Some services may be temporarily unavailable.',
    priority: 'Critical',
    status: 'Scheduled',
    audience: 'All Users',
    author: 'Kamrul Hasan',
    authorAvatar: 'https://i.pravatar.cc/40?img=14',
    date: 'May 11, 2025',
    views: 2310,
  },
  {
    id: 'ann-003',
    title: 'New Agent Branch Added',
    description:
      'BRAC Bank - Sylhet Branch is now active for cash pickup and remittance services.',
    priority: 'Medium',
    status: 'Published',
    audience: 'Customers',
    author: 'Arif Khan',
    authorAvatar: 'https://i.pravatar.cc/40?img=12',
    date: 'May 10, 2025',
    views: 956,
  },
  {
    id: 'ann-004',
    title: 'Eid Holiday Notice',
    description:
      'Our offices will be closed on Eid days. Support will run on limited hours via live chat only.',
    priority: 'Low',
    status: 'Published',
    audience: 'All Users',
    author: 'Fatima Ali',
    authorAvatar: 'https://i.pravatar.cc/40?img=13',
    date: 'May 9, 2025',
    views: 1430,
  },
  {
    id: 'ann-005',
    title: 'New SLA Policy Rollout',
    description:
      'Updated SLA targets for first response and resolution time take effect from next Monday. Review the new policy doc.',
    priority: 'High',
    status: 'Draft',
    audience: 'Agents & Admins',
    author: 'Nasir Uddin',
    authorAvatar: 'https://i.pravatar.cc/40?img=15',
    date: 'May 8, 2025',
    views: 0,
  },
  {
    id: 'ann-006',
    title: 'Mobile App v2.4 Released',
    description:
      'Faster transactions, improved KYC flow, and bug fixes. Encourage customers to update the app.',
    priority: 'Medium',
    status: 'Published',
    audience: 'Customers',
    author: 'Nusrat Jahan',
    authorAvatar: 'https://i.pravatar.cc/40?img=11',
    date: 'May 7, 2025',
    views: 3120,
  },
  {
    id: 'ann-007',
    title: 'Agent Training Session',
    description:
      'Mandatory training session on the new ticketing workflow scheduled for May 20, 2025 at 10 AM.',
    priority: 'Medium',
    status: 'Scheduled',
    audience: 'Agents',
    author: 'Arif Khan',
    authorAvatar: 'https://i.pravatar.cc/40?img=12',
    date: 'May 6, 2025',
    views: 412,
  },
  {
    id: 'ann-008',
    title: 'Fraud Alert: Fake Agent Calls',
    description:
      'Customers are reporting fraudulent calls asking for OTP. Remind customers to never share OTP with anyone.',
    priority: 'Critical',
    status: 'Published',
    audience: 'All Users',
    author: 'Fatima Ali',
    authorAvatar: 'https://i.pravatar.cc/40?img=13',
    date: 'May 5, 2025',
    views: 4280,
  },
];

export const allAnnouncementsTotalCount = 48;

export const announcementStatusTabs: {
  label: string;
  status: AnnouncementStatus | 'All';
  count: number | null;
}[] = [
  { label: 'All', status: 'All', count: null },
  { label: 'Published', status: 'Published', count: 32 },
  { label: 'Scheduled', status: 'Scheduled', count: 9 },
  { label: 'Draft', status: 'Draft', count: 7 },
];

export const announcementPriorityOptions: string[] = [
  'All Priorities',
  'Low',
  'Medium',
  'High',
  'Critical',
];

export const announcementAudienceOptions: string[] = [
  'All Audiences',
  'All Users',
  'Customers',
  'Agents',
  'Agents & Admins',
];

export const announcementPriorityBadgeStyles: Record<
  AnnouncementPriority2,
  string
> = {
  Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Medium:
    'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  High: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
  Critical: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};

export const announcementStatusBadgeStyles: Record<AnnouncementStatus, string> =
  {
    Published:
      'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    Scheduled:
      'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    Draft: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
};
  












// ============================================================
// SUPPORT — KNOWLEDGE BASE PAGE — append to lib/data.ts
// ============================================================

export type KbArticleStatus = 'Published' | 'Draft' | 'Archived';

export interface KbCategory {
  id: string;
  name: string;
  icon: string; // lucide icon name used in the page
  articleCount: number;
  color: string;
}

export const kbCategories: KbCategory[] = [
  {
    id: 'cat-001',
    name: 'Getting Started',
    icon: 'Rocket',
    articleCount: 12,
    color:
      'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  },
  {
    id: 'cat-002',
    name: 'Transactions',
    icon: 'ArrowLeftRight',
    articleCount: 24,
    color:
      'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  {
    id: 'cat-003',
    name: 'Account & Verification',
    icon: 'ShieldCheck',
    articleCount: 18,
    color:
      'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  },
  {
    id: 'cat-004',
    name: 'Cash Pickup',
    icon: 'Wallet',
    articleCount: 9,
    color:
      'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
  },
  {
    id: 'cat-005',
    name: 'Payments & Refunds',
    icon: 'CreditCard',
    articleCount: 15,
    color:
      'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400',
  },
  {
    id: 'cat-006',
    name: 'Technical Support',
    icon: 'Wrench',
    articleCount: 21,
    color:
      'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  },
];

export interface KbArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  status: KbArticleStatus;
  author: string;
  authorAvatar: string;
  updated: string;
  views: number;
  helpfulPercent: number;
}

export const kbArticles: KbArticle[] = [
  {
    id: 'art-001',
    title: 'How to send your first money transfer',
    excerpt:
      'A step-by-step guide for new customers to complete their first transaction safely.',
    category: 'Getting Started',
    status: 'Published',
    author: 'Nusrat Jahan',
    authorAvatar: 'https://i.pravatar.cc/40?img=11',
    updated: '2 days ago',
    views: 5230,
    helpfulPercent: 94,
  },
  {
    id: 'art-002',
    title: 'Why is my transaction showing as pending?',
    excerpt:
      'Common reasons transactions stay pending and what customers should do.',
    category: 'Transactions',
    status: 'Published',
    author: 'Arif Khan',
    authorAvatar: 'https://i.pravatar.cc/40?img=12',
    updated: '4 days ago',
    views: 8120,
    helpfulPercent: 89,
  },
  {
    id: 'art-003',
    title: 'KYC verification requirements explained',
    excerpt:
      'List of accepted documents and how the verification process works.',
    category: 'Account & Verification',
    status: 'Published',
    author: 'Fatima Ali',
    authorAvatar: 'https://i.pravatar.cc/40?img=13',
    updated: '1 week ago',
    views: 6410,
    helpfulPercent: 91,
  },
  {
    id: 'art-004',
    title: 'Finding the nearest cash pickup agent',
    excerpt:
      'How customers can locate and confirm an active agent point near them.',
    category: 'Cash Pickup',
    status: 'Published',
    author: 'Kamrul Hasan',
    authorAvatar: 'https://i.pravatar.cc/40?img=14',
    updated: '5 days ago',
    views: 3870,
    helpfulPercent: 87,
  },
  {
    id: 'art-005',
    title: 'Refund policy for failed transactions',
    excerpt:
      'Timeline and process for refunds when a payment fails after deduction.',
    category: 'Payments & Refunds',
    status: 'Published',
    author: 'Nasir Uddin',
    authorAvatar: 'https://i.pravatar.cc/40?img=15',
    updated: '3 days ago',
    views: 4590,
    helpfulPercent: 92,
  },
  {
    id: 'art-006',
    title: 'App keeps crashing — troubleshooting steps',
    excerpt:
      'Basic fixes agents can suggest before escalating to the technical team.',
    category: 'Technical Support',
    status: 'Draft',
    author: 'Nusrat Jahan',
    authorAvatar: 'https://i.pravatar.cc/40?img=11',
    updated: '1 day ago',
    views: 0,
    helpfulPercent: 0,
  },
  {
    id: 'art-007',
    title: 'Understanding daily and monthly transfer limits',
    excerpt: 'Limits vary by verification tier — full breakdown here.',
    category: 'Transactions',
    status: 'Published',
    author: 'Arif Khan',
    authorAvatar: 'https://i.pravatar.cc/40?img=12',
    updated: '6 days ago',
    views: 2980,
    helpfulPercent: 85,
  },
  {
    id: 'art-008',
    title: 'How to reset a forgotten password',
    excerpt: 'Quick steps for password recovery via email or SMS OTP.',
    category: 'Getting Started',
    status: 'Published',
    author: 'Fatima Ali',
    authorAvatar: 'https://i.pravatar.cc/40?img=13',
    updated: '2 weeks ago',
    views: 7340,
    helpfulPercent: 96,
  },
  {
    id: 'art-009',
    title: 'Old fee structure (deprecated)',
    excerpt: 'Archived article kept for historical reference only.',
    category: 'Payments & Refunds',
    status: 'Archived',
    author: 'Kamrul Hasan',
    authorAvatar: 'https://i.pravatar.cc/40?img=14',
    updated: '3 months ago',
    views: 410,
    helpfulPercent: 62,
  },
];

export const kbArticlesTotalCount = 99;

export const kbStatusTabs: {
  label: string;
  status: KbArticleStatus | 'All';
  count: number | null;
}[] = [
  { label: 'All Articles', status: 'All', count: null },
  { label: 'Published', status: 'Published', count: 78 },
  { label: 'Draft', status: 'Draft', count: 14 },
  { label: 'Archived', status: 'Archived', count: 7 },
];

export const kbStatusBadgeStyles: Record<KbArticleStatus, string> = {
  Published:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Draft: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  Archived:
    'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};

export const kbCategoryFilterOptions: string[] = [
  'All Categories',
  'Getting Started',
  'Transactions',
  'Account & Verification',
  'Cash Pickup',
  'Payments & Refunds',
  'Technical Support',
];

export interface KbStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const kbOverviewStats: KbStat[] = [
  { label: 'Total Articles', value: '99', change: 6.2, changeLabel: 'vs last month' },
  { label: 'Total Views', value: '38.9K', change: 14.8, changeLabel: 'vs last month' },
  { label: 'Avg. Helpful Rate', value: '90%', change: 3.1, changeLabel: 'vs last month' },
  { label: 'Categories', value: '6', change: 0, changeLabel: 'No change' },
];







// ============================================================
// SUPPORT — QUICK REPLIES PAGE — append to lib/data.ts
// ============================================================

export type QuickReplyCategory =
  | 'Greetings'
  | 'Transactions'
  | 'Verification'
  | 'Closing'
  | 'Apology'
  | 'Escalation';

export interface QuickReplyItem {
  id: string;
  shortcut: string;
  title: string;
  message: string;
  category: QuickReplyCategory;
  usageCount: number;
  createdBy: string;
  createdByAvatar: string;
  updated: string;
}

export const quickReplyItems: QuickReplyItem[] = [
  {
    id: 'qr-001',
    shortcut: '/greet',
    title: 'Standard Greeting',
    message:
      'Hello! Thank you for contacting support. How can I help you today?',
    category: 'Greetings',
    usageCount: 1240,
    createdBy: 'Nusrat Jahan',
    createdByAvatar: 'https://i.pravatar.cc/40?img=11',
    updated: '3 days ago',
  },
  {
    id: 'qr-002',
    shortcut: '/txnid',
    title: 'Ask for Transaction ID',
    message:
      'Could you please share your transaction ID so I can look into this for you?',
    category: 'Transactions',
    usageCount: 980,
    createdBy: 'Arif Khan',
    createdByAvatar: 'https://i.pravatar.cc/40?img=12',
    updated: '5 days ago',
  },
  {
    id: 'qr-003',
    shortcut: '/kyc',
    title: 'KYC Document Request',
    message:
      'To proceed, please upload a clear photo of your NID or passport from the verification page.',
    category: 'Verification',
    usageCount: 745,
    createdBy: 'Fatima Ali',
    createdByAvatar: 'https://i.pravatar.cc/40?img=13',
    updated: '1 week ago',
  },
  {
    id: 'qr-004',
    shortcut: '/sorry',
    title: 'Apology for Delay',
    message:
      'I’m really sorry for the delay and inconvenience this has caused you. Let me resolve this right away.',
    category: 'Apology',
    usageCount: 612,
    createdBy: 'Kamrul Hasan',
    createdByAvatar: 'https://i.pravatar.cc/40?img=14',
    updated: '4 days ago',
  },
  {
    id: 'qr-005',
    shortcut: '/escalate',
    title: 'Escalation Notice',
    message:
      'I’ve escalated this issue to our technical team. You will receive an update within 24 hours.',
    category: 'Escalation',
    usageCount: 389,
    createdBy: 'Nasir Uddin',
    createdByAvatar: 'https://i.pravatar.cc/40?img=15',
    updated: '2 days ago',
  },
  {
    id: 'qr-006',
    shortcut: '/close',
    title: 'Closing the Ticket',
    message:
      'Glad we could resolve this for you! Feel free to reach out if you need anything else. Have a great day!',
    category: 'Closing',
    usageCount: 1530,
    createdBy: 'Nusrat Jahan',
    createdByAvatar: 'https://i.pravatar.cc/40?img=11',
    updated: '6 days ago',
  },
  {
    id: 'qr-007',
    shortcut: '/pickup',
    title: 'Cash Pickup Instructions',
    message:
      'You can collect your cash with a valid ID and the transaction reference number at any active agent point.',
    category: 'Transactions',
    usageCount: 530,
    createdBy: 'Arif Khan',
    createdByAvatar: 'https://i.pravatar.cc/40?img=12',
    updated: '1 week ago',
  },
  {
    id: 'qr-008',
    shortcut: '/refund',
    title: 'Refund Timeline',
    message:
      'Your refund has been initiated and should reflect in your account within 3-5 business days.',
    category: 'Transactions',
    usageCount: 467,
    createdBy: 'Fatima Ali',
    createdByAvatar: 'https://i.pravatar.cc/40?img=13',
    updated: '3 days ago',
  },
];

export const quickReplyItemsTotalCount = 42;

export const quickReplyCategoryTabs: {
  label: string;
  category: QuickReplyCategory | 'All';
  count: number | null;
}[] = [
  { label: 'All', category: 'All', count: null },
  { label: 'Greetings', category: 'Greetings', count: 6 },
  { label: 'Transactions', category: 'Transactions', count: 14 },
  { label: 'Verification', category: 'Verification', count: 8 },
  { label: 'Apology', category: 'Apology', count: 5 },
  { label: 'Escalation', category: 'Escalation', count: 4 },
  { label: 'Closing', category: 'Closing', count: 5 },
];

export const quickReplyCategoryBadgeStyles: Record<
  QuickReplyCategory,
  string
> = {
  Greetings:
    'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  Transactions:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Verification:
    'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  Apology:
    'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  Escalation: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
  Closing:
    'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
};




// ============================================================
// SUPPORT — SLA MANAGEMENT PAGE — append to lib/data.ts
// ============================================================

export interface SlaStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: number[];
  trendColor: string;
}

export const slaManagementStats: SlaStat[] = [
  {
    id: 'sla-met',
    label: 'SLA Met',
    value: '78%',
    change: 4.2,
    changeLabel: 'vs last week',
    trend: [70, 72, 74, 73, 76, 77, 78],
    trendColor: '#22c55e',
  },
  {
    id: 'sla-breached',
    label: 'SLA Breached',
    value: '22%',
    change: -3.1,
    changeLabel: 'vs last week',
    trend: [30, 28, 27, 28, 25, 24, 22],
    trendColor: '#ef4444',
  },
  {
    id: 'avg-first-response',
    label: 'Avg. First Response',
    value: '18m 24s',
    change: -5.3,
    changeLabel: 'vs last week',
    trend: [22, 21, 20, 19, 19, 18, 18],
    trendColor: '#3b82f6',
  },
  {
    id: 'avg-resolution',
    label: 'Avg. Resolution Time',
    value: '4h 32m',
    change: -8.7,
    changeLabel: 'vs last week',
    trend: [5.2, 5.0, 4.9, 4.7, 4.6, 4.5, 4.5],
    trendColor: '#a855f7',
  },
];

export type SlaPolicyPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface SlaPolicy {
  id: string;
  name: string;
  priority: SlaPolicyPriority;
  firstResponseTarget: string;
  resolutionTarget: string;
  businessHoursOnly: boolean;
  appliesTo: string;
  isActive: boolean;
  complianceRate: number;
}

export const slaPolicies: SlaPolicy[] = [
  {
    id: 'pol-001',
    name: 'Critical Priority SLA',
    priority: 'Critical',
    firstResponseTarget: '5 min',
    resolutionTarget: '1 hour',
    businessHoursOnly: false,
    appliesTo: 'All Categories',
    isActive: true,
    complianceRate: 82,
  },
  {
    id: 'pol-002',
    name: 'High Priority SLA',
    priority: 'High',
    firstResponseTarget: '15 min',
    resolutionTarget: '4 hours',
    businessHoursOnly: false,
    appliesTo: 'Transaction Issue, Payment Failure',
    isActive: true,
    complianceRate: 76,
  },
  {
    id: 'pol-003',
    name: 'Medium Priority SLA',
    priority: 'Medium',
    firstResponseTarget: '30 min',
    resolutionTarget: '8 hours',
    businessHoursOnly: true,
    appliesTo: 'Cash Pickup Delay, Account Verification',
    isActive: true,
    complianceRate: 81,
  },
  {
    id: 'pol-004',
    name: 'Low Priority SLA',
    priority: 'Low',
    firstResponseTarget: '1 hour',
    resolutionTarget: '24 hours',
    businessHoursOnly: true,
    appliesTo: 'Technical Issue',
    isActive: true,
    complianceRate: 91,
  },
  {
    id: 'pol-005',
    name: 'Weekend Coverage SLA',
    priority: 'Medium',
    firstResponseTarget: '45 min',
    resolutionTarget: '12 hours',
    businessHoursOnly: false,
    appliesTo: 'All Categories',
    isActive: false,
    complianceRate: 68,
  },
];

export const slaPolicyPriorityBadgeStyles: Record<SlaPolicyPriority, string> =
  {
    Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    Medium:
      'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    High: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
    Critical: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
  };

export interface SlaBreachAlert {
  id: string;
  ticketId: string;
  customerName: string;
  priority: SlaPolicyPriority;
  breachType: 'First Response' | 'Resolution';
  overdueBy: string;
  assignedTo: string;
  assignedAvatar: string;
}

export const slaBreachAlerts: SlaBreachAlert[] = [
  {
    id: 'breach-001',
    ticketId: 'TKT-250512-004',
    customerName: 'David Wilson',
    priority: 'Critical',
    breachType: 'First Response',
    overdueBy: '12 min',
    assignedTo: 'Kamrul Hasan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=14',
  },
  {
    id: 'breach-002',
    ticketId: 'TKT-250512-007',
    customerName: 'Ahmed Khan',
    priority: 'High',
    breachType: 'Resolution',
    overdueBy: '48 min',
    assignedTo: 'Nusrat Jahan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=11',
  },
  {
    id: 'breach-003',
    ticketId: 'TKT-250511-010',
    customerName: 'Karim Sheikh',
    priority: 'Critical',
    breachType: 'Resolution',
    overdueBy: '2 hours',
    assignedTo: 'Kamrul Hasan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=14',
  },
  {
    id: 'breach-004',
    ticketId: 'TKT-250510-016',
    customerName: 'Mohammad Ali',
    priority: 'Critical',
    breachType: 'First Response',
    overdueBy: '35 min',
    assignedTo: 'Arif Khan',
    assignedAvatar: 'https://i.pravatar.cc/40?img=12',
  },
];

export const slaTrendThisWeek = {
  labels: ['May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'],
  met: [72, 74, 73, 76, 77, 79, 78],
  breached: [28, 26, 27, 24, 23, 21, 22],
};



// ============================================================
// SUPPORT — SUPPORT AGENTS PAGE — append to lib/data.ts
// ============================================================

export type AgentStatus = 'Online' | 'Away' | 'Offline';
export type AgentRole = 'Agent' | 'Senior Agent' | 'Team Lead' | 'Admin';

export interface SupportAgentFull {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: AgentRole;
  status: AgentStatus;
  department: string;
  ticketsAssigned: number;
  ticketsResolved: number;
  avgResponseTime: string;
  csatScore: number;
  joined: string;
}

export const supportAgentsFull: SupportAgentFull[] = [
  {
    id: 'agt-001',
    name: 'Nusrat Jahan',
    avatar: 'https://i.pravatar.cc/64?img=11',
    email: 'nusrat.jahan@support.com',
    role: 'Team Lead',
    status: 'Online',
    department: 'Transactions',
    ticketsAssigned: 312,
    ticketsResolved: 245,
    avgResponseTime: '12m 40s',
    csatScore: 96,
    joined: 'Jan 2023',
  },
  {
    id: 'agt-002',
    name: 'Arif Khan',
    avatar: 'https://i.pravatar.cc/64?img=12',
    email: 'arif.khan@support.com',
    role: 'Senior Agent',
    status: 'Online',
    department: 'Cash Pickup',
    ticketsAssigned: 248,
    ticketsResolved: 198,
    avgResponseTime: '15m 10s',
    csatScore: 93,
    joined: 'Mar 2023',
  },
  {
    id: 'agt-003',
    name: 'Fatima Ali',
    avatar: 'https://i.pravatar.cc/64?img=13',
    email: 'fatima.ali@support.com',
    role: 'Senior Agent',
    status: 'Away',
    department: 'Account Verification',
    ticketsAssigned: 210,
    ticketsResolved: 176,
    avgResponseTime: '18m 02s',
    csatScore: 90,
    joined: 'Jun 2023',
  },
  {
    id: 'agt-004',
    name: 'Kamrul Hasan',
    avatar: 'https://i.pravatar.cc/64?img=14',
    email: 'kamrul.hasan@support.com',
    role: 'Agent',
    status: 'Online',
    department: 'Payment Failure',
    ticketsAssigned: 185,
    ticketsResolved: 154,
    avgResponseTime: '21m 35s',
    csatScore: 87,
    joined: 'Sep 2023',
  },
  {
    id: 'agt-005',
    name: 'Nasir Uddin',
    avatar: 'https://i.pravatar.cc/64?img=15',
    email: 'nasir.uddin@support.com',
    role: 'Agent',
    status: 'Offline',
    department: 'Technical Support',
    ticketsAssigned: 150,
    ticketsResolved: 120,
    avgResponseTime: '24m 18s',
    csatScore: 84,
    joined: 'Nov 2023',
  },
  {
    id: 'agt-006',
    name: 'Sumaiya Akter',
    avatar: 'https://i.pravatar.cc/64?img=25',
    email: 'sumaiya.akter@support.com',
    role: 'Agent',
    status: 'Online',
    department: 'Transactions',
    ticketsAssigned: 134,
    ticketsResolved: 108,
    avgResponseTime: '19m 45s',
    csatScore: 88,
    joined: 'Jan 2024',
  },
  {
    id: 'agt-007',
    name: 'Tareq Anwar',
    avatar: 'https://i.pravatar.cc/64?img=33',
    email: 'tareq.anwar@support.com',
    role: 'Admin',
    status: 'Online',
    department: 'Management',
    ticketsAssigned: 0,
    ticketsResolved: 0,
    avgResponseTime: '-',
    csatScore: 0,
    joined: 'Jan 2022',
  },
  {
    id: 'agt-008',
    name: 'Rina Begum',
    avatar: 'https://i.pravatar.cc/64?img=44',
    email: 'rina.begum@support.com',
    role: 'Agent',
    status: 'Away',
    department: 'Cash Pickup',
    ticketsAssigned: 96,
    ticketsResolved: 79,
    avgResponseTime: '22m 50s',
    csatScore: 85,
    joined: 'Apr 2024',
  },
];

export const supportAgentsTotalCount = 24;

export const agentStatusTabs: {
  label: string;
  status: AgentStatus | 'All';
  count: number | null;
}[] = [
  { label: 'All Agents', status: 'All', count: null },
  { label: 'Online', status: 'Online', count: 14 },
  { label: 'Away', status: 'Away', count: 4 },
  { label: 'Offline', status: 'Offline', count: 6 },
];

export const agentStatusBadgeStyles: Record<AgentStatus, string> = {
  Online:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Away: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  Offline:
    'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
};

export const agentStatusDotColor: Record<AgentStatus, string> = {
  Online: 'bg-emerald-500',
  Away: 'bg-amber-500',
  Offline: 'bg-slate-400',
};

export const agentRoleOptions: string[] = [
  'All Roles',
  'Agent',
  'Senior Agent',
  'Team Lead',
  'Admin',
];

export const agentDepartmentOptions: string[] = [
  'All Departments',
  'Transactions',
  'Cash Pickup',
  'Account Verification',
  'Payment Failure',
  'Technical Support',
  'Management',
];

export interface SupportAgentOverviewStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const supportAgentOverviewStats: SupportAgentOverviewStat[] = [
  { label: 'Total Agents', value: '24', change: 4.3, changeLabel: 'vs last month' },
  { label: 'Online Now', value: '14', change: 0, changeLabel: 'Live' },
  { label: 'Avg. CSAT Score', value: '89%', change: 2.1, changeLabel: 'vs last month' },
  { label: 'Avg. Response Time', value: '18m 24s', change: -5.3, changeLabel: 'vs last month' },
];








// ============================================================
// SUPPORT — DEPARTMENTS PAGE — append to lib/data.ts
// ============================================================

export interface DepartmentAgentMini {
  name: string;
  avatar: string;
}

export interface SupportDepartment {
  id: string;
  name: string;
  description: string;
  manager: string;
  managerAvatar: string;
  agentCount: number;
  agents: DepartmentAgentMini[];
  openTickets: number;
  resolvedThisWeek: number;
  avgResponseTime: string;
  isActive: boolean;
  color: string;
}

export const supportDepartments: SupportDepartment[] = [
  {
    id: 'dep-001',
    name: 'Transactions',
    description: 'Handles payment, transfer, and transaction-related issues.',
    manager: 'Nusrat Jahan',
    managerAvatar: 'https://i.pravatar.cc/40?img=11',
    agentCount: 6,
    agents: [
      { name: 'Nusrat Jahan', avatar: 'https://i.pravatar.cc/40?img=11' },
      { name: 'Sumaiya Akter', avatar: 'https://i.pravatar.cc/40?img=25' },
      { name: 'Tareq Anwar', avatar: 'https://i.pravatar.cc/40?img=33' },
    ],
    openTickets: 86,
    resolvedThisWeek: 245,
    avgResponseTime: '12m 40s',
    isActive: true,
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  },
  {
    id: 'dep-002',
    name: 'Cash Pickup',
    description: 'Manages agent point availability and pickup delays.',
    manager: 'Arif Khan',
    managerAvatar: 'https://i.pravatar.cc/40?img=12',
    agentCount: 5,
    agents: [
      { name: 'Arif Khan', avatar: 'https://i.pravatar.cc/40?img=12' },
      { name: 'Rina Begum', avatar: 'https://i.pravatar.cc/40?img=44' },
    ],
    openTickets: 54,
    resolvedThisWeek: 198,
    avgResponseTime: '15m 10s',
    isActive: true,
    color:
      'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
  },
  {
    id: 'dep-003',
    name: 'Account Verification',
    description: 'KYC document review and identity verification support.',
    manager: 'Fatima Ali',
    managerAvatar: 'https://i.pravatar.cc/40?img=13',
    agentCount: 4,
    agents: [{ name: 'Fatima Ali', avatar: 'https://i.pravatar.cc/40?img=13' }],
    openTickets: 41,
    resolvedThisWeek: 176,
    avgResponseTime: '18m 02s',
    isActive: true,
    color:
      'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  },
  {
    id: 'dep-004',
    name: 'Payment Failure',
    description: 'Resolves failed transactions, deductions, and refunds.',
    manager: 'Kamrul Hasan',
    managerAvatar: 'https://i.pravatar.cc/40?img=14',
    agentCount: 4,
    agents: [{ name: 'Kamrul Hasan', avatar: 'https://i.pravatar.cc/40?img=14' }],
    openTickets: 38,
    resolvedThisWeek: 154,
    avgResponseTime: '21m 35s',
    isActive: true,
    color: 'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400',
  },
  {
    id: 'dep-005',
    name: 'Technical Support',
    description: 'App, login, and technical issue troubleshooting.',
    manager: 'Nasir Uddin',
    managerAvatar: 'https://i.pravatar.cc/40?img=15',
    agentCount: 3,
    agents: [{ name: 'Nasir Uddin', avatar: 'https://i.pravatar.cc/40?img=15' }],
    openTickets: 29,
    resolvedThisWeek: 120,
    avgResponseTime: '24m 18s',
    isActive: true,
    color:
      'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  },
  {
    id: 'dep-006',
    name: 'Management',
    description: 'Oversight, escalation handling, and reporting.',
    manager: 'Tareq Anwar',
    managerAvatar: 'https://i.pravatar.cc/40?img=33',
    agentCount: 2,
    agents: [{ name: 'Tareq Anwar', avatar: 'https://i.pravatar.cc/40?img=33' }],
    openTickets: 4,
    resolvedThisWeek: 12,
    avgResponseTime: '-',
    isActive: false,
    color:
      'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  },
];

export const supportDepartmentsTotalCount = 6;

export interface DepartmentOverviewStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const departmentOverviewStats: DepartmentOverviewStat[] = [
  { label: 'Total Departments', value: '6', change: 0, changeLabel: 'No change' },
  { label: 'Total Agents Assigned', value: '24', change: 4.3, changeLabel: 'vs last month' },
  { label: 'Open Tickets', value: '252', change: -6.8, changeLabel: 'vs last week' },
  { label: 'Resolved This Week', value: '905', change: 9.4, changeLabel: 'vs last week' },
];









// ============================================================
// SUPPORT — TICKET CATEGORIES PAGE — append to lib/data.ts
// ============================================================

export interface TicketCategoryFull {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name used in the page
  color: string;
  totalTickets: number;
  openTickets: number;
  avgResolutionTime: string;
  defaultPriority: 'Low' | 'Medium' | 'High' | 'Critical';
  defaultSlaPolicy: string;
  isActive: boolean;
}

export const ticketCategoriesFull: TicketCategoryFull[] = [
  {
    id: 'tc-001',
    name: 'Transaction Issue',
    description: 'Delays, failures, or discrepancies in money transfers.',
    icon: 'ArrowLeftRight',
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    totalTickets: 450,
    openTickets: 86,
    avgResolutionTime: '4h 10m',
    defaultPriority: 'High',
    defaultSlaPolicy: 'High Priority SLA',
    isActive: true,
  },
  {
    id: 'tc-002',
    name: 'Cash Pickup Delay',
    description: 'Agent point unavailability or delayed cash collection.',
    icon: 'Wallet',
    color:
      'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
    totalTickets: 280,
    openTickets: 54,
    avgResolutionTime: '3h 25m',
    defaultPriority: 'Medium',
    defaultSlaPolicy: 'Medium Priority SLA',
    isActive: true,
  },
  {
    id: 'tc-003',
    name: 'Account Verification',
    description: 'KYC, document upload, and identity verification issues.',
    icon: 'ShieldCheck',
    color:
      'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
    totalTickets: 210,
    openTickets: 41,
    avgResolutionTime: '6h 50m',
    defaultPriority: 'Medium',
    defaultSlaPolicy: 'Medium Priority SLA',
    isActive: true,
  },
  {
    id: 'tc-004',
    name: 'Payment Failure',
    description: 'Failed transactions with amount deducted or stuck.',
    icon: 'CreditCard',
    color: 'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400',
    totalTickets: 160,
    openTickets: 38,
    avgResolutionTime: '2h 40m',
    defaultPriority: 'Critical',
    defaultSlaPolicy: 'Critical Priority SLA',
    isActive: true,
  },
  {
    id: 'tc-005',
    name: 'Technical Issue',
    description: 'App crashes, login problems, and OTP delivery failures.',
    icon: 'Wrench',
    color:
      'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    totalTickets: 148,
    openTickets: 29,
    avgResolutionTime: '8h 15m',
    defaultPriority: 'Low',
    defaultSlaPolicy: 'Low Priority SLA',
    isActive: true,
  },
  {
    id: 'tc-006',
    name: 'Refund Request',
    description: 'Customer-initiated refund and reversal requests.',
    icon: 'Undo2',
    color:
      'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    totalTickets: 92,
    openTickets: 15,
    avgResolutionTime: '5h 05m',
    defaultPriority: 'Medium',
    defaultSlaPolicy: 'Medium Priority SLA',
    isActive: true,
  },
  {
    id: 'tc-007',
    name: 'General Inquiry',
    description: 'Miscellaneous questions not covered by other categories.',
    icon: 'HelpCircle',
    color:
      'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
    totalTickets: 64,
    openTickets: 7,
    avgResolutionTime: '10h 30m',
    defaultPriority: 'Low',
    defaultSlaPolicy: 'Low Priority SLA',
    isActive: false,
  },
];

export const ticketCategoriesTotalCount = 7;

export interface TicketCategoryOverviewStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const ticketCategoryOverviewStats: TicketCategoryOverviewStat[] = [
  { label: 'Total Categories', value: '7', change: 0, changeLabel: 'No change' },
  { label: 'Total Tickets', value: '1,404', change: 12.5, changeLabel: 'vs last month' },
  { label: 'Open Tickets', value: '270', change: -4.2, changeLabel: 'vs last week' },
  { label: 'Avg. Resolution Time', value: '5h 50m', change: -6.1, changeLabel: 'vs last week' },
];

export const ticketCategoryPriorityBadgeStyles: Record<
  'Low' | 'Medium' | 'High' | 'Critical',
  string
> = {
  Low: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Medium:
    'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  High: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
  Critical: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};












// ============================================================
// SYSTEM MANAGEMENT — SYSTEM OVERVIEW — append to lib/data.ts
// ============================================================

export interface SystemOverviewStat {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: number[];
  trendColor: string;
  isInverse?: boolean; // true when a decrease is good (e.g. failed calls)
}

export const systemOverviewStats: SystemOverviewStat[] = [
  {
    id: 'active-admin-users',
    label: 'Active Admin Users',
    value: '124',
    change: 8.7,
    changeLabel: 'vs last 7 days',
    trend: [4, 5, 5, 6, 6, 7, 7, 8, 8, 9],
    trendColor: '#3b82f6',
  },
  {
    id: 'total-roles',
    label: 'Total Roles',
    value: '18',
    change: 5.6,
    changeLabel: 'vs last 7 days',
    trend: [3, 4, 4, 5, 5, 5, 6, 6, 6, 7],
    trendColor: '#a855f7',
  },
  {
    id: 'api-requests-today',
    label: 'API Requests Today',
    value: '24,568',
    change: 12.4,
    changeLabel: 'vs yesterday',
    trend: [6, 7, 6, 8, 7, 9, 8, 10, 9, 11],
    trendColor: '#22c55e',
  },
  {
    id: 'failed-api-calls',
    label: 'Failed API Calls',
    value: '156',
    change: -3.2,
    changeLabel: 'vs yesterday',
    trend: [9, 8, 8, 7, 8, 6, 7, 6, 5, 6],
    trendColor: '#ef4444',
    isInverse: true,
  },
  {
    id: 'security-alerts',
    label: 'Security Alerts',
    value: '7',
    change: 16.7,
    changeLabel: 'vs last 7 days',
    trend: [2, 3, 2, 4, 3, 5, 4, 6, 5, 7],
    trendColor: '#f97316',
    isInverse: true,
  },
  {
    id: 'system-uptime',
    label: 'System Uptime',
    value: '99.98%',
    change: 0.02,
    changeLabel: 'vs last 7 days',
    trend: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    trendColor: '#22c55e',
  },
];

export type AdminUserRole =
  | 'Super Admin'
  | 'Admin'
  | 'Operations Manager'
  | 'Finance Manager'
  | 'Compliance Officer'
  | 'Support Agent';

export type AdminUserStatus = 'Active' | 'Inactive' | 'Suspended';

export interface RecentAdminUser {
  id: string;
  userId: string;
  fullName: string;
  username: string;
  role: AdminUserRole;
  branch: string;
  status: AdminUserStatus;
  lastLogin: string;
  createdAt: string;
}

export const recentAdminUsers: RecentAdminUser[] = [
  {
    id: 'usr-001',
    userId: 'USR-250512-001',
    fullName: 'Abu Hasan',
    username: 'abuhasan',
    role: 'Super Admin',
    branch: 'Head Office',
    status: 'Active',
    lastLogin: 'May 12, 2025 10:30 AM',
    createdAt: 'Apr 10, 2025',
  },
  {
    id: 'usr-002',
    userId: 'USR-250512-002',
    fullName: 'Nusrat Jahan',
    username: 'nusrat.jahan',
    role: 'Admin',
    branch: 'Dhaka Branch',
    status: 'Active',
    lastLogin: 'May 12, 2025 09:15 AM',
    createdAt: 'Apr 15, 2025',
  },
  {
    id: 'usr-003',
    userId: 'USR-250512-003',
    fullName: 'Arif Khan',
    username: 'arif.khan',
    role: 'Operations Manager',
    branch: 'Chittagong Branch',
    status: 'Active',
    lastLogin: 'May 12, 2025 08:45 AM',
    createdAt: 'Apr 18, 2025',
  },
  {
    id: 'usr-004',
    userId: 'USR-250512-004',
    fullName: 'Fatima Ali',
    username: 'fatima.ali',
    role: 'Finance Manager',
    branch: 'Head Office',
    status: 'Active',
    lastLogin: 'May 12, 2025 07:50 AM',
    createdAt: 'Apr 20, 2025',
  },
  {
    id: 'usr-005',
    userId: 'USR-250512-005',
    fullName: 'Kamal Hossain',
    username: 'kamal.hossain',
    role: 'Compliance Officer',
    branch: 'Head Office',
    status: 'Active',
    lastLogin: 'May 11, 2025 11:20 PM',
    createdAt: 'Apr 22, 2025',
  },
  {
    id: 'usr-006',
    userId: 'USR-250512-006',
    fullName: 'Sophie Martin',
    username: 'sophie.martin',
    role: 'Support Agent',
    branch: 'Sylhet Branch',
    status: 'Inactive',
    lastLogin: 'May 10, 2025 04:10 PM',
    createdAt: 'Apr 25, 2025',
  },
  {
    id: 'usr-007',
    userId: 'USR-250512-007',
    fullName: 'David Wilson',
    username: 'david.wilson',
    role: 'Operations Manager',
    branch: 'USA Office',
    status: 'Active',
    lastLogin: 'May 12, 2025 06:30 AM',
    createdAt: 'Apr 28, 2025',
  },
  {
    id: 'usr-008',
    userId: 'USR-250512-008',
    fullName: 'Imran Hossain',
    username: 'imran.hossain',
    role: 'Support Agent',
    branch: 'Rajshahi Branch',
    status: 'Suspended',
    lastLogin: 'May 8, 2025 02:15 PM',
    createdAt: 'May 1, 2025',
  },
];

export const recentAdminUsersTotalCount = 124;

export const adminUserRoleFilterOptions: string[] = [
  'All Roles',
  'Super Admin',
  'Admin',
  'Operations Manager',
  'Finance Manager',
  'Compliance Officer',
  'Support Agent',
];

export const adminUserRoleBadgeStyles: Record<AdminUserRole, string> = {
  'Super Admin':
    'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  Admin: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  'Operations Manager':
    'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
  'Finance Manager':
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  'Compliance Officer':
    'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  'Support Agent':
    'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400',
};

export const adminUserStatusBadgeStyles: Record<AdminUserStatus, string> = {
  Active:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Inactive:
    'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  Suspended: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};

export interface SystemSecurityItem {
  id: string;
  label: string;
  sublabel: string;
  value: string;
  type: 'ring' | 'number';
  numberColor?: string;
}

export const systemSecurityOverview: SystemSecurityItem[] = [
  {
    id: 'sec-2fa',
    label: 'Two-Factor Authentication',
    sublabel: 'Enabled for 98 users',
    value: '78',
    type: 'ring',
  },
  {
    id: 'sec-failed-logins',
    label: 'Login Attempts (Failed)',
    sublabel: 'Last 24 hours',
    value: '24',
    type: 'number',
    numberColor: 'text-red-500',
  },
  {
    id: 'sec-active-sessions',
    label: 'Active Sessions',
    sublabel: 'Currently active',
    value: '86',
    type: 'number',
    numberColor: 'text-slate-700 dark:text-slate-200',
  },
  {
    id: 'sec-ip-restrictions',
    label: 'IP Restrictions',
    sublabel: 'Whitelisted IPs',
    value: '12',
    type: 'number',
    numberColor: 'text-slate-700 dark:text-slate-200',
  },
  {
    id: 'sec-password-expiry',
    label: 'Password Expiry Alerts',
    sublabel: 'Expiring in 7 days',
    value: '9',
    type: 'number',
    numberColor: 'text-amber-500',
  },
  {
    id: 'sec-suspicious',
    label: 'Suspicious Activities',
    sublabel: 'Detected activities',
    value: '3',
    type: 'number',
    numberColor: 'text-red-500',
  },
];

export const roleDistribution: {
  label: string;
  count: number;
  percent: number;
  color: string;
}[] = [
  { label: 'Super Admin', count: 2, percent: 11.1, color: '#ec4899' },
  { label: 'Admin', count: 3, percent: 16.7, color: '#a855f7' },
  { label: 'Operations Manager', count: 4, percent: 22.2, color: '#3b82f6' },
  { label: 'Finance Manager', count: 2, percent: 11.1, color: '#22c55e' },
  { label: 'Compliance Officer', count: 2, percent: 11.1, color: '#f59e0b' },
  { label: 'Support Agent', count: 5, percent: 27.8, color: '#ef4444' },
];
export const roleDistributionTotal = 18;

export const apiRequestsThisWeek = {
  labels: ['May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'],
  requests: [21000, 24500, 19800, 26200, 22100, 25800, 24568],
};

export interface TopApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  requests: number;
  maxScale: number;
}

export const topApiEndpointsThisWeek: TopApiEndpoint[] = [
  { method: 'POST', path: '/api/v1/transactions', requests: 8256, maxScale: 8256 },
  { method: 'GET', path: '/api/v1/customers', requests: 6425, maxScale: 8256 },
  { method: 'POST', path: '/api/v1/pickups', requests: 4812, maxScale: 8256 },
  { method: 'GET', path: '/api/v1/exchange-rates', requests: 2985, maxScale: 8256 },
  { method: 'POST', path: '/api/v1/auth/login', requests: 1245, maxScale: 8256 },
];

export type SystemHealthStatus = 'Healthy' | 'Degraded' | 'Down' | 'Success';

export interface SystemHealthItem {
  label: string;
  status: SystemHealthStatus;
}

export const systemHealthChecks: SystemHealthItem[] = [
  { label: 'Database', status: 'Healthy' },
  { label: 'Server', status: 'Healthy' },
  { label: 'API Services', status: 'Healthy' },
  { label: 'File Storage', status: 'Healthy' },
  { label: 'Backup Status', status: 'Success' },
];

export const systemHealthStatusColor: Record<SystemHealthStatus, string> = {
  Healthy: 'bg-emerald-500',
  Degraded: 'bg-amber-500',
  Down: 'bg-red-500',
  Success: 'bg-blue-500',
};

export type PermissionLevel = 'full' | 'view' | 'none';

export interface RolePermissionRow {
  module: string;
  superAdmin: PermissionLevel;
  admin: PermissionLevel;
  operations: PermissionLevel;
  finance: PermissionLevel;
  compliance: PermissionLevel;
  support: PermissionLevel;
}

export const rolePermissionMatrix: RolePermissionRow[] = [
  {
    module: 'Dashboard',
    superAdmin: 'full',
    admin: 'full',
    operations: 'full',
    finance: 'full',
    compliance: 'full',
    support: 'full',
  },
  {
    module: 'Transactions',
    superAdmin: 'full',
    admin: 'full',
    operations: 'full',
    finance: 'full',
    compliance: 'view',
    support: 'none',
  },
  {
    module: 'Cash Pickups',
    superAdmin: 'full',
    admin: 'full',
    operations: 'full',
    finance: 'view',
    compliance: 'view',
    support: 'none',
  },
  {
    module: 'AML Monitoring',
    superAdmin: 'full',
    admin: 'full',
    operations: 'full',
    finance: 'full',
    compliance: 'view',
    support: 'none',
  },
  {
    module: 'Support Tickets',
    superAdmin: 'full',
    admin: 'full',
    operations: 'full',
    finance: 'full',
    compliance: 'full',
    support: 'view',
  },
];

export interface RecentSystemActivity {
  id: string;
  activity: string;
  user: string;
  module: string;
  ipAddress: string;
  time: string;
}

export const recentSystemActivities: RecentSystemActivity[] = [
  {
    id: 'act-001',
    activity: 'User Login',
    user: 'Nusrat Jahan',
    module: 'Authentication',
    ipAddress: '192.168.1.45',
    time: 'May 12, 10:30 AM',
  },
  {
    id: 'act-002',
    activity: 'Update Exchange Rate',
    user: 'Arif Khan',
    module: 'Exchange Rates',
    ipAddress: '192.168.1.32',
    time: 'May 12, 10:25 AM',
  },
  {
    id: 'act-003',
    activity: 'Create Pickup Request',
    user: 'Fatima Ali',
    module: 'Cash Pickups',
    ipAddress: '192.168.1.28',
    time: 'May 12, 10:20 AM',
  },
  {
    id: 'act-004',
    activity: 'Approve Transaction',
    user: 'Kamal Hossain',
    module: 'Transactions',
    ipAddress: '192.168.1.22',
    time: 'May 12, 10:15 AM',
  },
  {
    id: 'act-005',
    activity: 'User Logout',
    user: 'David Wilson',
    module: 'Authentication',
    ipAddress: '192.168.1.35',
    time: 'May 12, 10:10 AM',
  },
];

export type SystemAlertType = 'error' | 'warning' | 'info' | 'success';

export interface SystemAlertItem {
  id: string;
  message: string;
  type: SystemAlertType;
  timeAgo: string;
}

export const systemAlertsRecent: SystemAlertItem[] = [
  {
    id: 'alert-001',
    message: 'Multiple failed login attempts detected',
    type: 'error',
    timeAgo: '10 min ago',
  },
  {
    id: 'alert-002',
    message: 'High number of failed transactions',
    type: 'warning',
    timeAgo: '25 min ago',
  },
  {
    id: 'alert-003',
    message: 'API rate limit exceeded for IP 203.0.113.45',
    type: 'warning',
    timeAgo: '1 hour ago',
  },
  {
    id: 'alert-004',
    message: 'Database backup completed successfully',
    type: 'success',
    timeAgo: '2 hours ago',
  },
  {
    id: 'alert-005',
    message: 'System update scheduled for May 15, 2025',
    type: 'info',
    timeAgo: '1 day ago',
  },
];







// ============================================================
// SYSTEM MANAGEMENT — ADMIN USERS PAGE — append to lib/data.ts
// ============================================================

export type AdminUserRole2 =
  | 'Super Admin'
  | 'Admin'
  | 'Operations Manager'
  | 'Finance Manager'
  | 'Compliance Officer'
  | 'Support Agent';

export type AdminUserStatus2 = 'Active' | 'Inactive' | 'Suspended';

export interface AdminUserFull {
  id: string;
  userId: string;
  fullName: string;
  username: string;
  email: string;
  avatar: string;
  role: AdminUserRole2;
  branch: string;
  status: AdminUserStatus2;
  twoFactorEnabled: boolean;
  lastLogin: string;
  createdAt: string;
}

export const allAdminUsers: AdminUserFull[] = [
  {
    id: 'usr-001',
    userId: 'USR-250512-001',
    fullName: 'Abu Hasan',
    username: 'abuhasan',
    email: 'abu.hasan@company.com',
    avatar: 'https://i.pravatar.cc/40?img=51',
    role: 'Super Admin',
    branch: 'Head Office',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'May 12, 2025 10:30 AM',
    createdAt: 'Apr 10, 2025',
  },
  {
    id: 'usr-002',
    userId: 'USR-250512-002',
    fullName: 'Nusrat Jahan',
    username: 'nusrat.jahan',
    email: 'nusrat.jahan@company.com',
    avatar: 'https://i.pravatar.cc/40?img=11',
    role: 'Admin',
    branch: 'Dhaka Branch',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'May 12, 2025 09:15 AM',
    createdAt: 'Apr 15, 2025',
  },
  {
    id: 'usr-003',
    userId: 'USR-250512-003',
    fullName: 'Arif Khan',
    username: 'arif.khan',
    email: 'arif.khan@company.com',
    avatar: 'https://i.pravatar.cc/40?img=12',
    role: 'Operations Manager',
    branch: 'Chittagong Branch',
    status: 'Active',
    twoFactorEnabled: false,
    lastLogin: 'May 12, 2025 08:45 AM',
    createdAt: 'Apr 18, 2025',
  },
  {
    id: 'usr-004',
    userId: 'USR-250512-004',
    fullName: 'Fatima Ali',
    username: 'fatima.ali',
    email: 'fatima.ali@company.com',
    avatar: 'https://i.pravatar.cc/40?img=13',
    role: 'Finance Manager',
    branch: 'Head Office',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'May 12, 2025 07:50 AM',
    createdAt: 'Apr 20, 2025',
  },
  {
    id: 'usr-005',
    userId: 'USR-250512-005',
    fullName: 'Kamal Hossain',
    username: 'kamal.hossain',
    email: 'kamal.hossain@company.com',
    avatar: 'https://i.pravatar.cc/40?img=14',
    role: 'Compliance Officer',
    branch: 'Head Office',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'May 11, 2025 11:20 PM',
    createdAt: 'Apr 22, 2025',
  },
  {
    id: 'usr-006',
    userId: 'USR-250512-006',
    fullName: 'Sophie Martin',
    username: 'sophie.martin',
    email: 'sophie.martin@company.com',
    avatar: 'https://i.pravatar.cc/40?img=6',
    role: 'Support Agent',
    branch: 'Sylhet Branch',
    status: 'Inactive',
    twoFactorEnabled: false,
    lastLogin: 'May 10, 2025 04:10 PM',
    createdAt: 'Apr 25, 2025',
  },
  {
    id: 'usr-007',
    userId: 'USR-250512-007',
    fullName: 'David Wilson',
    username: 'david.wilson',
    email: 'david.wilson@company.com',
    avatar: 'https://i.pravatar.cc/40?img=4',
    role: 'Operations Manager',
    branch: 'USA Office',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'May 12, 2025 06:30 AM',
    createdAt: 'Apr 28, 2025',
  },
  {
    id: 'usr-008',
    userId: 'USR-250512-008',
    fullName: 'Imran Hossain',
    username: 'imran.hossain',
    email: 'imran.hossain@company.com',
    avatar: 'https://i.pravatar.cc/40?img=5',
    role: 'Support Agent',
    branch: 'Rajshahi Branch',
    status: 'Suspended',
    twoFactorEnabled: false,
    lastLogin: 'May 8, 2025 02:15 PM',
    createdAt: 'May 1, 2025',
  },
  {
    id: 'usr-009',
    userId: 'USR-250511-009',
    fullName: 'Maria Santos',
    username: 'maria.santos',
    email: 'maria.santos@company.com',
    avatar: 'https://i.pravatar.cc/40?img=2',
    role: 'Finance Manager',
    branch: 'USA Office',
    status: 'Active',
    twoFactorEnabled: true,
    lastLogin: 'May 11, 2025 03:40 PM',
    createdAt: 'May 2, 2025',
  },
  {
    id: 'usr-010',
    userId: 'USR-250511-010',
    fullName: 'John Doe',
    username: 'john.doe',
    email: 'john.doe@company.com',
    avatar: 'https://i.pravatar.cc/40?img=3',
    role: 'Compliance Officer',
    branch: 'UK Office',
    status: 'Active',
    twoFactorEnabled: false,
    lastLogin: 'May 11, 2025 01:25 PM',
    createdAt: 'May 3, 2025',
  },
];

export const allAdminUsersTotalCount = 124;

export const adminUserStatusTabsFull: {
  label: string;
  status: AdminUserStatus2 | 'All';
  count: number | null;
}[] = [
  { label: 'All', status: 'All', count: null },
  { label: 'Active', status: 'Active', count: 102 },
  { label: 'Inactive', status: 'Inactive', count: 14 },
  { label: 'Suspended', status: 'Suspended', count: 8 },
];

export const adminUserRoleOptionsFull: string[] = [
  'All Roles',
  'Super Admin',
  'Admin',
  'Operations Manager',
  'Finance Manager',
  'Compliance Officer',
  'Support Agent',
];

export const adminUserBranchOptions: string[] = [
  'All Branches',
  'Head Office',
  'Dhaka Branch',
  'Chittagong Branch',
  'Sylhet Branch',
  'Rajshahi Branch',
  'USA Office',
  'UK Office',
];

export const adminUserRoleBadgeStylesFull: Record<AdminUserRole2, string> = {
  'Super Admin':
    'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  Admin: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  'Operations Manager':
    'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
  'Finance Manager':
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  'Compliance Officer':
    'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  'Support Agent':
    'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400',
};

export const adminUserStatusBadgeStylesFull: Record<AdminUserStatus2, string> = {
  Active:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Inactive:
    'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  Suspended: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};

export interface AdminUserOverviewStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const adminUserOverviewStats: AdminUserOverviewStat[] = [
  { label: 'Total Admin Users', value: '124', change: 8.7, changeLabel: 'vs last month' },
  { label: 'Active Users', value: '102', change: 4.1, changeLabel: 'vs last month' },
  { label: '2FA Enabled', value: '98', change: 12.3, changeLabel: 'vs last month' },
  { label: 'Suspended Accounts', value: '8', change: -2.5, changeLabel: 'vs last month' },
];








// ============================================================
// SYSTEM MANAGEMENT — ROLES & PERMISSIONS PAGE — append to lib/data.ts
// ============================================================

export type PermissionLevel2 = 'full' | 'view' | 'none';

export interface RoleModulePermission {
  module: string;
  level: PermissionLevel2;
}

export interface SystemRole {
  id: string;
  name: string;
  description: string;
  color: string;
  userCount: number;
  isSystemRole: boolean; // system roles can't be deleted
  permissions: RoleModulePermission[];
}

const defaultModules = [
  'Dashboard',
  'Transactions',
  'Cash Pickups',
  'AML Monitoring',
  'Support Tickets',
  'Admin Users',
  'System Settings',
];

export const systemRoles: SystemRole[] = [
  {
    id: 'role-001',
    name: 'Super Admin',
    description: 'Full unrestricted access to all modules and settings.',
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
    userCount: 2,
    isSystemRole: true,
    permissions: defaultModules.map((m) => ({ module: m, level: 'full' as const })),
  },
  {
    id: 'role-002',
    name: 'Admin',
    description: 'Broad access excluding critical system configuration.',
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
    userCount: 3,
    isSystemRole: true,
    permissions: [
      { module: 'Dashboard', level: 'full' },
      { module: 'Transactions', level: 'full' },
      { module: 'Cash Pickups', level: 'full' },
      { module: 'AML Monitoring', level: 'full' },
      { module: 'Support Tickets', level: 'full' },
      { module: 'Admin Users', level: 'view' },
      { module: 'System Settings', level: 'none' },
    ],
  },
  {
    id: 'role-003',
    name: 'Operations Manager',
    description: 'Manages day-to-day transaction and pickup operations.',
    color:
      'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
    userCount: 4,
    isSystemRole: false,
    permissions: [
      { module: 'Dashboard', level: 'full' },
      { module: 'Transactions', level: 'full' },
      { module: 'Cash Pickups', level: 'full' },
      { module: 'AML Monitoring', level: 'full' },
      { module: 'Support Tickets', level: 'full' },
      { module: 'Admin Users', level: 'none' },
      { module: 'System Settings', level: 'none' },
    ],
  },
  {
    id: 'role-004',
    name: 'Finance Manager',
    description: 'Oversees financial reports, transactions, and refunds.',
    color:
      'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    userCount: 2,
    isSystemRole: false,
    permissions: [
      { module: 'Dashboard', level: 'full' },
      { module: 'Transactions', level: 'full' },
      { module: 'Cash Pickups', level: 'view' },
      { module: 'AML Monitoring', level: 'full' },
      { module: 'Support Tickets', level: 'full' },
      { module: 'Admin Users', level: 'none' },
      { module: 'System Settings', level: 'none' },
    ],
  },
  {
    id: 'role-005',
    name: 'Compliance Officer',
    description: 'Monitors AML flags and ensures regulatory compliance.',
    color:
      'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    userCount: 2,
    isSystemRole: false,
    permissions: [
      { module: 'Dashboard', level: 'full' },
      { module: 'Transactions', level: 'view' },
      { module: 'Cash Pickups', level: 'view' },
      { module: 'AML Monitoring', level: 'full' },
      { module: 'Support Tickets', level: 'full' },
      { module: 'Admin Users', level: 'none' },
      { module: 'System Settings', level: 'none' },
    ],
  },
  {
    id: 'role-006',
    name: 'Support Agent',
    description: 'Handles customer support tickets and live chat.',
    color: 'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400',
    userCount: 5,
    isSystemRole: false,
    permissions: [
      { module: 'Dashboard', level: 'full' },
      { module: 'Transactions', level: 'none' },
      { module: 'Cash Pickups', level: 'none' },
      { module: 'AML Monitoring', level: 'none' },
      { module: 'Support Tickets', level: 'view' },
      { module: 'Admin Users', level: 'none' },
      { module: 'System Settings', level: 'none' },
    ],
  },
];

export const systemRolesTotalCount = 18;

export const permissionModulesList: string[] = defaultModules;

export const permissionLevelLabels: Record<PermissionLevel2, string> = {
  full: 'Full Access',
  view: 'View Only',
  none: 'No Access',
};

export const permissionLevelOrder: PermissionLevel2[] = ['none', 'view', 'full'];

export interface RoleOverviewStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const roleOverviewStats: RoleOverviewStat[] = [
  { label: 'Total Roles', value: '18', change: 5.6, changeLabel: 'vs last month' },
  { label: 'System Roles', value: '2', change: 0, changeLabel: 'Protected' },
  { label: 'Custom Roles', value: '16', change: 8.1, changeLabel: 'vs last month' },
  { label: 'Users Assigned', value: '124', change: 8.7, changeLabel: 'vs last month' },
];








// ============================================================
// SYSTEM MANAGEMENT — SYSTEM SETTINGS PAGE — append to lib/data.ts
// ============================================================

export interface SystemGeneralSettings {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  defaultLanguage: string;
  timezone: string;
  dateFormat: string;
  maintenanceMode: boolean;
}

export const defaultGeneralSettings: SystemGeneralSettings = {
  platformName: 'RemitFlow',
  supportEmail: 'support@remitflow.com',
  supportPhone: '+880 1700-000000',
  defaultLanguage: 'English',
  timezone: 'Asia/Dhaka (GMT+6)',
  dateFormat: 'MMM DD, YYYY',
  maintenanceMode: false,
};

export interface SystemRegionalSettings {
  baseCurrency: string;
  supportedCurrencies: string[];
  defaultCountry: string;
  decimalSeparator: string;
  thousandSeparator: string;
}

export const defaultRegionalSettings: SystemRegionalSettings = {
  baseCurrency: 'USD',
  supportedCurrencies: ['USD', 'BDT', 'GBP', 'EUR', 'AED'],
  defaultCountry: 'Bangladesh',
  decimalSeparator: '.',
  thousandSeparator: ',',
};

export interface SystemTransactionSettings {
  minTransferAmount: number;
  maxTransferAmount: number;
  dailyLimit: number;
  transactionFeePercent: number;
  autoApproveBelow: number;
}

export const defaultTransactionSettings: SystemTransactionSettings = {
  minTransferAmount: 10,
  maxTransferAmount: 10000,
  dailyLimit: 25000,
  transactionFeePercent: 1.5,
  autoApproveBelow: 500,
};

export interface IntegrationSetting {
  id: string;
  name: string;
  description: string;
  status: 'Connected' | 'Not Connected';
  icon: string;
}

export const integrationSettings: IntegrationSetting[] = [
  {
    id: 'int-001',
    name: 'Stripe Payments',
    description: 'Process card payments and payouts.',
    status: 'Connected',
    icon: 'CreditCard',
  },
  {
    id: 'int-002',
    name: 'Twilio SMS Gateway',
    description: 'Send OTP and transaction SMS alerts.',
    status: 'Connected',
    icon: 'MessageSquare',
  },
  {
    id: 'int-003',
    name: 'SendGrid Email',
    description: 'Transactional and marketing emails.',
    status: 'Connected',
    icon: 'Mail',
  },
  {
    id: 'int-004',
    name: 'Google Maps API',
    description: 'Agent location and pickup map services.',
    status: 'Not Connected',
    icon: 'MapPin',
  },
];

export const generalSettingsOptions = {
  languages: ['English', 'Bengali', 'Spanish', 'Arabic', 'French'],
  timezones: [
    'Asia/Dhaka (GMT+6)',
    'America/New_York (GMT-5)',
    'Europe/London (GMT+0)',
    'Asia/Dubai (GMT+4)',
  ],
  dateFormats: ['MMM DD, YYYY', 'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'],
};

export const regionalSettingsOptions = {
  currencies: ['USD', 'BDT', 'GBP', 'EUR', 'AED', 'INR', 'SAR'],
  countries: [
    'Bangladesh',
    'United States',
    'United Kingdom',
    'United Arab Emirates',
    'India',
  ],
};







// ============================================================
// SYSTEM MANAGEMENT — SECURITY SETTINGS PAGE — append to lib/data.ts
// ============================================================

export interface PasswordPolicySettings {
  minLength: number;
  requireUppercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
  expiryDays: number;
  preventReuse: number;
}

export const defaultPasswordPolicy: PasswordPolicySettings = {
  minLength: 8,
  requireUppercase: true,
  requireNumber: true,
  requireSpecialChar: true,
  expiryDays: 90,
  preventReuse: 5,
};

export interface AuthSecuritySettings {
  enforceTwoFactor: boolean;
  sessionTimeoutMinutes: number;
  maxLoginAttempts: number;
  lockoutDurationMinutes: number;
  rememberDeviceDays: number;
}

export const defaultAuthSecuritySettings: AuthSecuritySettings = {
  enforceTwoFactor: false,
  sessionTimeoutMinutes: 30,
  maxLoginAttempts: 5,
  lockoutDurationMinutes: 15,
  rememberDeviceDays: 30,
};

export interface IpWhitelistEntry {
  id: string;
  ipAddress: string;
  label: string;
  addedBy: string;
  addedOn: string;
}

export const ipWhitelistEntries: IpWhitelistEntry[] = [
  {
    id: 'ip-001',
    ipAddress: '203.0.113.45',
    label: 'Head Office Network',
    addedBy: 'Abu Hasan',
    addedOn: 'Apr 12, 2025',
  },
  {
    id: 'ip-002',
    ipAddress: '198.51.100.22',
    label: 'Dhaka Branch VPN',
    addedBy: 'Nusrat Jahan',
    addedOn: 'Apr 18, 2025',
  },
  {
    id: 'ip-003',
    ipAddress: '192.0.2.10',
    label: 'Remote Admin (Home)',
    addedBy: 'Abu Hasan',
    addedOn: 'May 2, 2025',
  },
];

export interface ActiveSessionEntry {
  id: string;
  userName: string;
  userAvatar: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

export const activeSessionsList: ActiveSessionEntry[] = [
  {
    id: 'sess-001',
    userName: 'Abu Hasan',
    userAvatar: 'https://i.pravatar.cc/40?img=51',
    device: 'Chrome on Windows',
    location: 'Dhaka, Bangladesh',
    ipAddress: '203.0.113.45',
    lastActive: 'Active now',
    isCurrent: true,
  },
  {
    id: 'sess-002',
    userName: 'Nusrat Jahan',
    userAvatar: 'https://i.pravatar.cc/40?img=11',
    device: 'Safari on macOS',
    location: 'Dhaka, Bangladesh',
    ipAddress: '198.51.100.22',
    lastActive: '5 min ago',
    isCurrent: false,
  },
  {
    id: 'sess-003',
    userName: 'Arif Khan',
    userAvatar: 'https://i.pravatar.cc/40?img=12',
    device: 'Chrome on Android',
    location: 'Chittagong, Bangladesh',
    ipAddress: '192.0.2.88',
    lastActive: '22 min ago',
    isCurrent: false,
  },
  {
    id: 'sess-004',
    userName: 'David Wilson',
    userAvatar: 'https://i.pravatar.cc/40?img=4',
    device: 'Edge on Windows',
    location: 'New York, USA',
    ipAddress: '198.51.100.77',
    lastActive: '1 hour ago',
    isCurrent: false,
  },
];

export interface SecurityOverviewStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const securityOverviewStats: SecurityOverviewStat[] = [
  { label: '2FA Enabled', value: '98 / 124', change: 12.3, changeLabel: 'vs last month' },
  { label: 'Active Sessions', value: '86', change: 4.5, changeLabel: 'vs yesterday' },
  { label: 'Whitelisted IPs', value: '12', change: 0, changeLabel: 'No change' },
  { label: 'Failed Logins (24h)', value: '24', change: -8.2, changeLabel: 'vs yesterday' },
];



// ============================================================
// SYSTEM MANAGEMENT — NOTIFICATION SETTINGS PAGE — append to lib/data.ts
// ============================================================

export type NotificationChannel = 'email' | 'sms' | 'push' | 'inApp';

export interface NotificationChannelConfig {
  id: NotificationChannel;
  label: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export const notificationChannels: NotificationChannelConfig[] = [
  {
    id: 'email',
    label: 'Email Notifications',
    description: 'Send notifications via email to users and admins.',
    icon: 'Mail',
    enabled: true,
  },
  {
    id: 'sms',
    label: 'SMS Notifications',
    description: 'Send critical alerts via SMS for urgent events.',
    icon: 'MessageSquare',
    enabled: true,
  },
  {
    id: 'push',
    label: 'Push Notifications',
    description: 'Mobile app push notifications for real-time updates.',
    icon: 'Bell',
    enabled: false,
  },
  {
    id: 'inApp',
    label: 'In-App Notifications',
    description: 'Notification bell and toast alerts within the dashboard.',
    icon: 'Monitor',
    enabled: true,
  },
];

export type NotificationEventCategory =
  | 'Transactions'
  | 'Security'
  | 'Support'
  | 'System';

export interface NotificationEventRule {
  id: string;
  event: string;
  category: NotificationEventCategory;
  description: string;
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
}

export const notificationEventRules: NotificationEventRule[] = [
  {
    id: 'evt-001',
    event: 'New Transaction Created',
    category: 'Transactions',
    description: 'Triggered when a customer initiates a new transfer.',
    channels: { email: true, sms: false, push: false, inApp: true },
  },
  {
    id: 'evt-002',
    event: 'Transaction Failed',
    category: 'Transactions',
    description: 'Triggered when a transaction fails to process.',
    channels: { email: true, sms: true, push: false, inApp: true },
  },
  {
    id: 'evt-003',
    event: 'Large Transaction Alert',
    category: 'Transactions',
    description: 'Triggered when a transaction exceeds the configured limit.',
    channels: { email: true, sms: true, push: true, inApp: true },
  },
  {
    id: 'evt-004',
    event: 'Failed Login Attempt',
    category: 'Security',
    description: 'Triggered after repeated failed login attempts.',
    channels: { email: true, sms: false, push: false, inApp: true },
  },
  {
    id: 'evt-005',
    event: 'New Admin User Added',
    category: 'Security',
    description: 'Triggered when a new admin account is created.',
    channels: { email: true, sms: false, push: false, inApp: true },
  },
  {
    id: 'evt-006',
    event: 'Suspicious Activity Detected',
    category: 'Security',
    description: 'Triggered by the fraud detection engine.',
    channels: { email: true, sms: true, push: true, inApp: true },
  },
  {
    id: 'evt-007',
    event: 'New Support Ticket',
    category: 'Support',
    description: 'Triggered when a customer opens a new ticket.',
    channels: { email: false, sms: false, push: false, inApp: true },
  },
  {
    id: 'evt-008',
    event: 'SLA Breach Warning',
    category: 'Support',
    description: 'Triggered when a ticket is close to breaching SLA.',
    channels: { email: true, sms: false, push: false, inApp: true },
  },
  {
    id: 'evt-009',
    event: 'Scheduled Maintenance',
    category: 'System',
    description: 'Triggered before planned system maintenance windows.',
    channels: { email: true, sms: false, push: false, inApp: true },
  },
  {
    id: 'evt-010',
    event: 'Backup Completed',
    category: 'System',
    description: 'Triggered after a successful database backup.',
    channels: { email: false, sms: false, push: false, inApp: true },
  },
];

export const notificationEventCategoryTabs: {
  label: string;
  category: NotificationEventCategory | 'All';
}[] = [
  { label: 'All', category: 'All' },
  { label: 'Transactions', category: 'Transactions' },
  { label: 'Security', category: 'Security' },
  { label: 'Support', category: 'Support' },
  { label: 'System', category: 'System' },
];

export const notificationCategoryBadgeStyles: Record<
  NotificationEventCategory,
  string
> = {
  Transactions:
    'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  Security: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
  Support:
    'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  System:
    'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
};

export interface NotificationOverviewStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const notificationOverviewStats: NotificationOverviewStat[] = [
  { label: 'Active Channels', value: '3 / 4', change: 0, changeLabel: 'No change' },
  { label: 'Event Rules', value: '10', change: 0, changeLabel: 'No change' },
  { label: 'Sent Today', value: '4,820', change: 9.4, changeLabel: 'vs yesterday' },
  { label: 'Delivery Success Rate', value: '98.6%', change: 0.4, changeLabel: 'vs last week' },
];



// ============================================================
// SYSTEM MANAGEMENT — ACTIVITY LOGS PAGE — append to lib/data.ts
// ============================================================

export type ActivityLogSeverity = 'info' | 'warning' | 'critical';
export type ActivityLogModule =
  | 'Authentication'
  | 'Transactions'
  | 'Cash Pickups'
  | 'Admin Users'
  | 'System Settings'
  | 'Support Tickets'
  | 'Exchange Rates';

export interface ActivityLogEntry {
  id: string;
  activity: string;
  module: ActivityLogModule;
  user: string;
  userAvatar: string;
  ipAddress: string;
  device: string;
  severity: ActivityLogSeverity;
  details: string;
  time: string;
}

export const activityLogsFull: ActivityLogEntry[] = [
  {
    id: 'log-001',
    activity: 'User Login',
    module: 'Authentication',
    user: 'Nusrat Jahan',
    userAvatar: 'https://i.pravatar.cc/40?img=11',
    ipAddress: '192.168.1.45',
    device: 'Chrome on Windows',
    severity: 'info',
    details: 'Successful login from registered device.',
    time: 'May 12, 2025 10:30 AM',
  },
  {
    id: 'log-002',
    activity: 'Update Exchange Rate',
    module: 'Exchange Rates',
    user: 'Arif Khan',
    userAvatar: 'https://i.pravatar.cc/40?img=12',
    ipAddress: '192.168.1.32',
    device: 'Safari on macOS',
    severity: 'info',
    details: 'USD/BDT rate updated from 117.20 to 117.45.',
    time: 'May 12, 2025 10:25 AM',
  },
  {
    id: 'log-003',
    activity: 'Create Pickup Request',
    module: 'Cash Pickups',
    user: 'Fatima Ali',
    userAvatar: 'https://i.pravatar.cc/40?img=13',
    ipAddress: '192.168.1.28',
    device: 'Chrome on Windows',
    severity: 'info',
    details: 'New pickup request created for TXN-99021345.',
    time: 'May 12, 2025 10:20 AM',
  },
  {
    id: 'log-004',
    activity: 'Approve Transaction',
    module: 'Transactions',
    user: 'Kamal Hossain',
    userAvatar: 'https://i.pravatar.cc/40?img=14',
    ipAddress: '192.168.1.22',
    device: 'Chrome on Android',
    severity: 'info',
    details: 'Transaction TXN-99021200 approved manually.',
    time: 'May 12, 2025 10:15 AM',
  },
  {
    id: 'log-005',
    activity: 'Failed Login Attempt',
    module: 'Authentication',
    user: 'Unknown',
    userAvatar: 'https://i.pravatar.cc/40?img=60',
    ipAddress: '203.0.113.200',
    device: 'Chrome on Linux',
    severity: 'warning',
    details: 'Incorrect password entered 3 times for user "admin".',
    time: 'May 12, 2025 09:55 AM',
  },
  {
    id: 'log-006',
    activity: 'User Logout',
    module: 'Authentication',
    user: 'David Wilson',
    userAvatar: 'https://i.pravatar.cc/40?img=4',
    ipAddress: '198.51.100.77',
    device: 'Edge on Windows',
    severity: 'info',
    details: 'Session ended by user.',
    time: 'May 12, 2025 09:40 AM',
  },
  {
    id: 'log-007',
    activity: 'New Admin User Added',
    module: 'Admin Users',
    user: 'Abu Hasan',
    userAvatar: 'https://i.pravatar.cc/40?img=51',
    ipAddress: '203.0.113.45',
    device: 'Chrome on Windows',
    severity: 'warning',
    details: 'Created new admin account "maria.santos".',
    time: 'May 12, 2025 09:10 AM',
  },
  {
    id: 'log-008',
    activity: 'Maintenance Mode Enabled',
    module: 'System Settings',
    user: 'Abu Hasan',
    userAvatar: 'https://i.pravatar.cc/40?img=51',
    ipAddress: '203.0.113.45',
    device: 'Chrome on Windows',
    severity: 'critical',
    details: 'Platform set to maintenance mode for scheduled update.',
    time: 'May 12, 2025 08:45 AM',
  },
  {
    id: 'log-009',
    activity: 'Ticket Escalated',
    module: 'Support Tickets',
    user: 'Nasir Uddin',
    userAvatar: 'https://i.pravatar.cc/40?img=15',
    ipAddress: '192.168.1.50',
    device: 'Chrome on Windows',
    severity: 'warning',
    details: 'TKT-250512-004 escalated to technical team.',
    time: 'May 12, 2025 08:20 AM',
  },
  {
    id: 'log-010',
    activity: 'Suspicious Activity Detected',
    module: 'Authentication',
    user: 'System',
    userAvatar: 'https://i.pravatar.cc/40?img=65',
    ipAddress: '203.0.113.200',
    device: 'Unknown',
    severity: 'critical',
    details: 'Multiple failed login attempts from a new location.',
    time: 'May 12, 2025 07:55 AM',
  },
  {
    id: 'log-011',
    activity: 'Password Changed',
    module: 'Authentication',
    user: 'Sophie Martin',
    userAvatar: 'https://i.pravatar.cc/40?img=6',
    ipAddress: '192.168.1.61',
    device: 'Chrome on Android',
    severity: 'info',
    details: 'User updated their account password.',
    time: 'May 11, 2025 06:30 PM',
  },
  {
    id: 'log-012',
    activity: 'Transaction Refunded',
    module: 'Transactions',
    user: 'Kamal Hossain',
    userAvatar: 'https://i.pravatar.cc/40?img=14',
    ipAddress: '192.168.1.22',
    device: 'Chrome on Android',
    severity: 'info',
    details: 'Refund processed for TXN-99020987.',
    time: 'May 11, 2025 04:10 PM',
  },
];

export const activityLogsTotalCount = 1840;

export const activityLogModuleOptions: string[] = [
  'All Modules',
  'Authentication',
  'Transactions',
  'Cash Pickups',
  'Admin Users',
  'System Settings',
  'Support Tickets',
  'Exchange Rates',
];

export const activityLogSeverityTabs: {
  label: string;
  severity: ActivityLogSeverity | 'All';
  count: number | null;
}[] = [
  { label: 'All', severity: 'All', count: null },
  { label: 'Info', severity: 'info', count: 1620 },
  { label: 'Warning', severity: 'warning', count: 184 },
  { label: 'Critical', severity: 'critical', count: 36 },
];

export const activityLogSeverityBadgeStyles: Record<
  ActivityLogSeverity,
  string
> = {
  info: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  warning:
    'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  critical: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};

export const activityLogModuleBadgeStyles: Record<ActivityLogModule, string> = {
  Authentication:
    'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  Transactions:
    'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  'Cash Pickups':
    'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400',
  'Admin Users':
    'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400',
  'System Settings':
    'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  'Support Tickets':
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  'Exchange Rates':
    'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
};

export interface ActivityLogOverviewStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const activityLogOverviewStats: ActivityLogOverviewStat[] = [
  { label: 'Total Events Today', value: '342', change: 6.8, changeLabel: 'vs yesterday' },
  { label: 'Warning Events', value: '184', change: -3.1, changeLabel: 'vs last 7 days' },
  { label: 'Critical Events', value: '36', change: 12.4, changeLabel: 'vs last 7 days' },
  { label: 'Unique Active Users', value: '58', change: 4.2, changeLabel: 'vs yesterday' },
];



// ============================================================
// SYSTEM MANAGEMENT — LOGIN ATTEMPTS PAGE — append to lib/data.ts
// ============================================================

export type LoginAttemptResult = 'Success' | 'Failed' | 'Blocked';

export interface LoginAttemptEntry {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  ipAddress: string;
  location: string;
  device: string;
  result: LoginAttemptResult;
  reason: string;
  time: string;
  isIpBlocked: boolean;
}

export const loginAttemptsFull: LoginAttemptEntry[] = [
  {
    id: 'la-001',
    username: 'nusrat.jahan',
    fullName: 'Nusrat Jahan',
    avatar: 'https://i.pravatar.cc/40?img=11',
    ipAddress: '192.168.1.45',
    location: 'Dhaka, Bangladesh',
    device: 'Chrome on Windows',
    result: 'Success',
    reason: 'Valid credentials',
    time: 'May 12, 2025 10:30 AM',
    isIpBlocked: false,
  },
  {
    id: 'la-002',
    username: 'admin',
    fullName: 'Unknown',
    avatar: 'https://i.pravatar.cc/40?img=60',
    ipAddress: '203.0.113.200',
    location: 'Unknown Location',
    device: 'Chrome on Linux',
    result: 'Failed',
    reason: 'Incorrect password',
    time: 'May 12, 2025 09:55 AM',
    isIpBlocked: false,
  },
  {
    id: 'la-003',
    username: 'admin',
    fullName: 'Unknown',
    avatar: 'https://i.pravatar.cc/40?img=60',
    ipAddress: '203.0.113.200',
    location: 'Unknown Location',
    device: 'Chrome on Linux',
    result: 'Failed',
    reason: 'Incorrect password',
    time: 'May 12, 2025 09:54 AM',
    isIpBlocked: false,
  },
  {
    id: 'la-004',
    username: 'admin',
    fullName: 'Unknown',
    avatar: 'https://i.pravatar.cc/40?img=60',
    ipAddress: '203.0.113.200',
    location: 'Unknown Location',
    device: 'Chrome on Linux',
    result: 'Blocked',
    reason: 'Too many failed attempts — IP temporarily blocked',
    time: 'May 12, 2025 09:53 AM',
    isIpBlocked: true,
  },
  {
    id: 'la-005',
    username: 'arif.khan',
    fullName: 'Arif Khan',
    avatar: 'https://i.pravatar.cc/40?img=12',
    ipAddress: '192.168.1.32',
    location: 'Chittagong, Bangladesh',
    device: 'Safari on macOS',
    result: 'Success',
    reason: 'Valid credentials',
    time: 'May 12, 2025 08:45 AM',
    isIpBlocked: false,
  },
  {
    id: 'la-006',
    username: 'fatima.ali',
    fullName: 'Fatima Ali',
    avatar: 'https://i.pravatar.cc/40?img=13',
    ipAddress: '192.168.1.28',
    location: 'Dhaka, Bangladesh',
    device: 'Chrome on Windows',
    result: 'Success',
    reason: 'Valid credentials',
    time: 'May 12, 2025 07:50 AM',
    isIpBlocked: false,
  },
  {
    id: 'la-007',
    username: 'sophie.martin',
    fullName: 'Sophie Martin',
    avatar: 'https://i.pravatar.cc/40?img=6',
    ipAddress: '198.51.100.90',
    location: 'Sylhet, Bangladesh',
    device: 'Chrome on Android',
    result: 'Failed',
    reason: 'Account inactive',
    time: 'May 11, 2025 04:10 PM',
    isIpBlocked: false,
  },
  {
    id: 'la-008',
    username: 'imran.hossain',
    fullName: 'Imran Hossain',
    avatar: 'https://i.pravatar.cc/40?img=5',
    ipAddress: '198.51.100.95',
    location: 'Rajshahi, Bangladesh',
    device: 'Chrome on Windows',
    result: 'Failed',
    reason: 'Account suspended',
    time: 'May 11, 2025 02:15 PM',
    isIpBlocked: false,
  },
  {
    id: 'la-009',
    username: 'unknown_user_22',
    fullName: 'Unknown',
    avatar: 'https://i.pravatar.cc/40?img=61',
    ipAddress: '45.33.12.88',
    location: 'Unknown Location',
    device: 'Unknown Browser',
    result: 'Blocked',
    reason: 'Suspicious bot-like activity detected',
    time: 'May 11, 2025 01:30 PM',
    isIpBlocked: true,
  },
  {
    id: 'la-010',
    username: 'david.wilson',
    fullName: 'David Wilson',
    avatar: 'https://i.pravatar.cc/40?img=4',
    ipAddress: '198.51.100.77',
    location: 'New York, USA',
    device: 'Edge on Windows',
    result: 'Success',
    reason: 'Valid credentials',
    time: 'May 11, 2025 11:20 AM',
    isIpBlocked: false,
  },
  {
    id: 'la-011',
    username: 'kamal.hossain',
    fullName: 'Kamal Hossain',
    avatar: 'https://i.pravatar.cc/40?img=14',
    ipAddress: '192.168.1.22',
    location: 'Dhaka, Bangladesh',
    device: 'Chrome on Android',
    result: 'Success',
    reason: 'Valid credentials',
    time: 'May 11, 2025 09:05 AM',
    isIpBlocked: false,
  },
  {
    id: 'la-012',
    username: 'maria.santos',
    fullName: 'Maria Santos',
    avatar: 'https://i.pravatar.cc/40?img=2',
    ipAddress: '198.51.100.150',
    location: 'Miami, USA',
    device: 'Safari on iPhone',
    result: 'Failed',
    reason: 'Incorrect OTP',
    time: 'May 10, 2025 06:40 PM',
    isIpBlocked: false,
  },
];

export const loginAttemptsTotalCount = 3120;

export const loginAttemptResultTabs: {
  label: string;
  result: LoginAttemptResult | 'All';
  count: number | null;
}[] = [
  { label: 'All', result: 'All', count: null },
  { label: 'Success', result: 'Success', count: 2860 },
  { label: 'Failed', result: 'Failed', count: 224 },
  { label: 'Blocked', result: 'Blocked', count: 36 },
];

export const loginAttemptResultBadgeStyles: Record<LoginAttemptResult, string> = {
  Success:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  Failed: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  Blocked: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};

export interface LoginAttemptOverviewStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const loginAttemptOverviewStats: LoginAttemptOverviewStat[] = [
  { label: 'Total Attempts (24h)', value: '432', change: 5.4, changeLabel: 'vs yesterday' },
  { label: 'Failed Attempts', value: '24', change: -8.2, changeLabel: 'vs yesterday' },
  { label: 'Blocked IPs', value: '6', change: 20.0, changeLabel: 'vs yesterday' },
  { label: 'Success Rate', value: '94.4%', change: 1.2, changeLabel: 'vs yesterday' },
];




// ============================================================
// SYSTEM MANAGEMENT — SYSTEM HEALTH PAGE — append to lib/data.ts
// ============================================================

export type ServiceHealthStatus = 'Healthy' | 'Degraded' | 'Down';

export interface SystemServiceHealth {
  id: string;
  name: string;
  description: string;
  status: ServiceHealthStatus;
  uptime: string;
  responseTime: string;
  lastChecked: string;
  icon: string;
}

export const systemServicesHealth: SystemServiceHealth[] = [
  {
    id: 'svc-001',
    name: 'Database (Primary)',
    description: 'PostgreSQL primary cluster',
    status: 'Healthy',
    uptime: '99.99%',
    responseTime: '12ms',
    lastChecked: '30 sec ago',
    icon: 'Database',
  },
  {
    id: 'svc-002',
    name: 'Application Server',
    description: 'Main API and web server cluster',
    status: 'Healthy',
    uptime: '99.98%',
    responseTime: '85ms',
    lastChecked: '30 sec ago',
    icon: 'Server',
  },
  {
    id: 'svc-003',
    name: 'API Services',
    description: 'Public and internal REST API gateway',
    status: 'Healthy',
    uptime: '99.97%',
    responseTime: '142ms',
    lastChecked: '30 sec ago',
    icon: 'Code2',
  },
  {
    id: 'svc-004',
    name: 'File Storage',
    description: 'Document and media object storage',
    status: 'Healthy',
    uptime: '100%',
    responseTime: '64ms',
    lastChecked: '1 min ago',
    icon: 'HardDrive',
  },
  {
    id: 'svc-005',
    name: 'Background Jobs',
    description: 'Queue processor for async tasks',
    status: 'Degraded',
    uptime: '98.40%',
    responseTime: '2.1s',
    lastChecked: '1 min ago',
    icon: 'Workflow',
  },
  {
    id: 'svc-006',
    name: 'SMS Gateway',
    description: 'Twilio SMS delivery service',
    status: 'Healthy',
    uptime: '99.92%',
    responseTime: '320ms',
    lastChecked: '2 min ago',
    icon: 'MessageSquare',
  },
  {
    id: 'svc-007',
    name: 'Email Service',
    description: 'SendGrid transactional email delivery',
    status: 'Healthy',
    uptime: '99.95%',
    responseTime: '210ms',
    lastChecked: '2 min ago',
    icon: 'Mail',
  },
  {
    id: 'svc-008',
    name: 'Cache Layer (Redis)',
    description: 'Session and query caching',
    status: 'Healthy',
    uptime: '99.99%',
    responseTime: '3ms',
    lastChecked: '30 sec ago',
    icon: 'Zap',
  },
];

export interface ResourceUsageMetric {
  id: string;
  label: string;
  usedPercent: number;
  detail: string;
  color: string;
}

export const resourceUsageMetrics: ResourceUsageMetric[] = [
  {
    id: 'res-cpu',
    label: 'CPU Usage',
    usedPercent: 42,
    detail: '4.2 / 10 cores',
    color: '#3b82f6',
  },
  {
    id: 'res-memory',
    label: 'Memory Usage',
    usedPercent: 68,
    detail: '21.7 / 32 GB',
    color: '#a855f7',
  },
  {
    id: 'res-disk',
    label: 'Disk Usage',
    usedPercent: 54,
    detail: '540 / 1000 GB',
    color: '#f97316',
  },
  {
    id: 'res-bandwidth',
    label: 'Bandwidth Usage',
    usedPercent: 31,
    detail: '3.1 / 10 TB',
    color: '#22c55e',
  },
];

export interface UptimeHistoryPoint {
  label: string;
  uptime: number;
}

export const uptimeHistoryThisWeek: UptimeHistoryPoint[] = [
  { label: 'May 6', uptime: 100 },
  { label: 'May 7', uptime: 99.9 },
  { label: 'May 8', uptime: 100 },
  { label: 'May 9', uptime: 98.2 },
  { label: 'May 10', uptime: 100 },
  { label: 'May 11', uptime: 100 },
  { label: 'May 12', uptime: 99.98 },
];

export interface SystemIncident {
  id: string;
  title: string;
  status: 'Resolved' | 'Monitoring' | 'Investigating';
  impact: 'Minor' | 'Major' | 'Critical';
  startedAt: string;
  resolvedAt: string | null;
  affectedServices: string[];
}

export const recentSystemIncidents: SystemIncident[] = [
  {
    id: 'inc-001',
    title: 'Background job queue processing delay',
    status: 'Monitoring',
    impact: 'Minor',
    startedAt: 'May 12, 2025 09:10 AM',
    resolvedAt: null,
    affectedServices: ['Background Jobs'],
  },
  {
    id: 'inc-002',
    title: 'Elevated API response times',
    status: 'Resolved',
    impact: 'Minor',
    startedAt: 'May 9, 2025 03:20 PM',
    resolvedAt: 'May 9, 2025 04:05 PM',
    affectedServices: ['API Services', 'Application Server'],
  },
  {
    id: 'inc-003',
    title: 'Database failover during maintenance',
    status: 'Resolved',
    impact: 'Major',
    startedAt: 'May 5, 2025 02:00 AM',
    resolvedAt: 'May 5, 2025 02:45 AM',
    affectedServices: ['Database (Primary)'],
  },
];

export interface SystemHealthOverviewStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const systemHealthOverviewStats: SystemHealthOverviewStat[] = [
  { label: 'Overall Uptime', value: '99.98%', change: 0.02, changeLabel: 'vs last 7 days' },
  { label: 'Services Healthy', value: '7 / 8', change: 0, changeLabel: '1 degraded' },
  { label: 'Avg. Response Time', value: '118ms', change: -4.5, changeLabel: 'vs last 7 days' },
  { label: 'Open Incidents', value: '1', change: 0, changeLabel: 'Monitoring' },
];



// ============================================================
// SYSTEM MANAGEMENT — BACKUP & RECOVERY PAGE — append to lib/data.ts
// ============================================================

export type BackupStatus = 'Success' | 'In Progress' | 'Failed';
export type BackupType = 'Full' | 'Incremental' | 'Database Only';

export interface BackupEntry {
  id: string;
  name: string;
  type: BackupType;
  status: BackupStatus;
  sizeGb: number;
  startedAt: string;
  duration: string;
  triggeredBy: string;
  storageLocation: string;
}

export const backupHistory: BackupEntry[] = [
  {
    id: 'bkp-001',
    name: 'Daily Full Backup',
    type: 'Full',
    status: 'Success',
    sizeGb: 48.2,
    startedAt: 'May 12, 2025 02:00 AM',
    duration: '24 min',
    triggeredBy: 'Scheduled',
    storageLocation: 'AWS S3 (ap-southeast-1)',
  },
  {
    id: 'bkp-002',
    name: 'Hourly Incremental Backup',
    type: 'Incremental',
    status: 'Success',
    sizeGb: 2.1,
    startedAt: 'May 12, 2025 10:00 AM',
    duration: '3 min',
    triggeredBy: 'Scheduled',
    storageLocation: 'AWS S3 (ap-southeast-1)',
  },
  {
    id: 'bkp-003',
    name: 'Hourly Incremental Backup',
    type: 'Incremental',
    status: 'Success',
    sizeGb: 1.8,
    startedAt: 'May 12, 2025 09:00 AM',
    duration: '2 min',
    triggeredBy: 'Scheduled',
    storageLocation: 'AWS S3 (ap-southeast-1)',
  },
  {
    id: 'bkp-004',
    name: 'Pre-deployment Backup',
    type: 'Database Only',
    status: 'Success',
    sizeGb: 12.5,
    startedAt: 'May 11, 2025 11:30 PM',
    duration: '8 min',
    triggeredBy: 'Abu Hasan (Manual)',
    storageLocation: 'AWS S3 (ap-southeast-1)',
  },
  {
    id: 'bkp-005',
    name: 'Daily Full Backup',
    type: 'Full',
    status: 'Failed',
    sizeGb: 0,
    startedAt: 'May 11, 2025 02:00 AM',
    duration: '4 min',
    triggeredBy: 'Scheduled',
    storageLocation: 'AWS S3 (ap-southeast-1)',
  },
  {
    id: 'bkp-006',
    name: 'Daily Full Backup',
    type: 'Full',
    status: 'Success',
    sizeGb: 47.6,
    startedAt: 'May 10, 2025 02:00 AM',
    duration: '23 min',
    triggeredBy: 'Scheduled',
    storageLocation: 'AWS S3 (ap-southeast-1)',
  },
  {
    id: 'bkp-007',
    name: 'Daily Full Backup',
    type: 'Full',
    status: 'Success',
    sizeGb: 46.9,
    startedAt: 'May 9, 2025 02:00 AM',
    duration: '22 min',
    triggeredBy: 'Scheduled',
    storageLocation: 'AWS S3 (ap-southeast-1)',
  },
];

export const backupStatusBadgeStyles: Record<BackupStatus, string> = {
  Success:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  'In Progress':
    'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  Failed: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
};

export const backupTypeBadgeStyles: Record<BackupType, string> = {
  Full: 'bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400',
  Incremental:
    'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  'Database Only':
    'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
};

export interface BackupScheduleConfig {
  fullBackupFrequency: string;
  incrementalFrequency: string;
  retentionDays: number;
  storageProvider: string;
  autoBackupEnabled: boolean;
}

export const defaultBackupSchedule: BackupScheduleConfig = {
  fullBackupFrequency: 'Daily at 2:00 AM',
  incrementalFrequency: 'Every hour',
  retentionDays: 30,
  storageProvider: 'AWS S3 (ap-southeast-1)',
  autoBackupEnabled: true,
};

export const backupFrequencyOptions: string[] = [
  'Every 6 hours',
  'Daily at 2:00 AM',
  'Daily at 12:00 AM',
  'Weekly (Sunday)',
];

export const incrementalFrequencyOptions: string[] = [
  'Every 15 minutes',
  'Every 30 minutes',
  'Every hour',
  'Every 6 hours',
];

export interface RestorePoint {
  id: string;
  label: string;
  date: string;
  sizeGb: number;
  type: BackupType;
}

export const availableRestorePoints: RestorePoint[] = [
  { id: 'rp-001', label: 'May 12, 2025 — 2:00 AM', date: 'Today', sizeGb: 48.2, type: 'Full' },
  { id: 'rp-002', label: 'May 11, 2025 — 11:30 PM', date: 'Yesterday', sizeGb: 12.5, type: 'Database Only' },
  { id: 'rp-003', label: 'May 10, 2025 — 2:00 AM', date: '2 days ago', sizeGb: 47.6, type: 'Full' },
  { id: 'rp-004', label: 'May 9, 2025 — 2:00 AM', date: '3 days ago', sizeGb: 46.9, type: 'Full' },
];

export interface BackupOverviewStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
}

export const backupOverviewStats: BackupOverviewStat[] = [
  { label: 'Last Backup', value: '8h ago', change: 0, changeLabel: 'Success' },
  { label: 'Total Backups (30d)', value: '184', change: 4.2, changeLabel: 'vs last month' },
  { label: 'Storage Used', value: '1.2 TB', change: 6.8, changeLabel: 'vs last month' },
  { label: 'Failed Backups (30d)', value: '2', change: -50, changeLabel: 'vs last month' },
];




// ============================================================
// API OVERVIEW — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

// ---------- Types ----------

export interface OverviewStatCard {
  id: string;
  label: string;
  sublabel: string;
  value: string;
  change: string;
  changeDirection: "up" | "down";
  changeTone: "good" | "bad"; // good = green, bad = red (independent of direction, e.g. failed requests down is good)
  icon: "requests" | "success" | "failed" | "response" | "keys" | "blocked" | "webhook";
  sparkline: number[]; // 7-10 points, relative values
  sparkColor: "blue" | "green" | "red" | "purple" | "indigo" | "amber" | "sky";
}

export type OverviewVolumeRange = "This Week" | "This Month" | "Last 7 Days" | "Last 30 Days";

export interface OverviewVolumePoint {
  label: string; // e.g. "May 6"
  value: number;
}

export interface OverviewEndpointUsageItem {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  count: number;
}

export type OverviewHealthStatus = "Healthy" | "Warning" | "Down";

export interface OverviewHealthItem {
  id: string;
  name: string;
  status: OverviewHealthStatus;
}

export type OverviewEnvLiveStatus = "Live" | "Test";

export interface OverviewEnvStatusItem {
  id: string;
  name: "Production" | "Sandbox";
  liveStatus: OverviewEnvLiveStatus;
  uptime: string;
}

export type OverviewKeyEnvironment = "Production" | "Sandbox";
export type OverviewKeyStatus = "Active" | "Suspended" | "Revoked";

export interface OverviewRecentApiKey {
  id: string;
  keyId: string;
  keyName: string;
  owner: string;
  moduleAccess: string;
  environment: OverviewKeyEnvironment;
  status: OverviewKeyStatus;
  rateLimit: string;
  createdAt: string;
}

export type OverviewLogTab = "API Logs" | "Failed Requests" | "Security Alerts" | "IP Activity";

export interface OverviewLogEntry {
  id: string;
  requestId: string;
  dateTime: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  statusCode: number;
  responseTimeMs: number;
  ipAddress: string;
  apiKeyId: string;
}

export type OverviewWebhookStatus = "Delivered" | "Failed" | "Pending";

export interface OverviewRecentWebhookEvent {
  id: string;
  eventName: string;
  timestamp: string;
  status: OverviewWebhookStatus;
}

export interface OverviewQuickAction {
  id: string;
  label: string;
  icon: "generate-key" | "add-webhook" | "create-endpoint" | "view-logs";
}

// ---------- Badge style maps ----------

export const overviewKeyStatusBadge: Record<OverviewKeyStatus, string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Suspended: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  Revoked: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
};

export const overviewKeyEnvBadge: Record<OverviewKeyEnvironment, string> = {
  Production: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Sandbox: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
};

export const overviewHealthStatusBadge: Record<OverviewHealthStatus, string> = {
  Healthy: "text-green-600 dark:text-green-400",
  Warning: "text-amber-600 dark:text-amber-400",
  Down: "text-red-600 dark:text-red-400",
};

export const overviewHealthDotColor: Record<OverviewHealthStatus, string> = {
  Healthy: "bg-green-500",
  Warning: "bg-amber-500",
  Down: "bg-red-500",
};

export const overviewWebhookStatusBadge: Record<OverviewWebhookStatus, string> = {
  Delivered: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Failed: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
};

export const overviewMethodBadge: Record<"GET" | "POST" | "PUT" | "DELETE", string> = {
  GET: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  POST: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  PUT: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const overviewStatusCodeColor = (code: number): string => {
  if (code >= 200 && code < 300) return "text-green-600 dark:text-green-400";
  if (code >= 400 && code < 500) return "text-amber-600 dark:text-amber-400";
  if (code >= 500) return "text-red-600 dark:text-red-400";
  return "text-slate-600 dark:text-slate-300";
};

// ---------- Stat cards ----------

export const overviewStatCards: OverviewStatCard[] = [
  {
    id: "total-requests",
    label: "Total API Requests",
    sublabel: "Today",
    value: "128,568",
    change: "18.6%",
    changeDirection: "up",
    changeTone: "good",
    icon: "requests",
    sparkline: [12, 18, 14, 22, 19, 28, 24, 32, 29, 38],
    sparkColor: "blue",
  },
  {
    id: "successful-requests",
    label: "Successful Requests",
    sublabel: "Today",
    value: "117,256",
    change: "17.2%",
    changeDirection: "up",
    changeTone: "good",
    icon: "success",
    sparkline: [10, 16, 13, 20, 18, 26, 23, 30, 28, 36],
    sparkColor: "green",
  },
  {
    id: "failed-requests",
    label: "Failed Requests",
    sublabel: "Today",
    value: "11,312",
    change: "8.4%",
    changeDirection: "down",
    changeTone: "good",
    icon: "failed",
    sparkline: [30, 26, 28, 22, 24, 18, 20, 14, 16, 10],
    sparkColor: "red",
  },
  {
    id: "avg-response-time",
    label: "Average Response Time",
    sublabel: "Today",
    value: "245 ms",
    change: "12.9%",
    changeDirection: "up",
    changeTone: "bad",
    icon: "response",
    sparkline: [14, 18, 16, 22, 20, 26, 24, 30, 27, 32],
    sparkColor: "purple",
  },
  {
    id: "active-api-keys",
    label: "Active API Keys",
    sublabel: "Total",
    value: "86",
    change: "6.2%",
    changeDirection: "up",
    changeTone: "good",
    icon: "keys",
    sparkline: [20, 22, 21, 24, 23, 26, 25, 28, 27, 30],
    sparkColor: "indigo",
  },
  {
    id: "blocked-ips",
    label: "Blocked IPs",
    sublabel: "Total",
    value: "24",
    change: "11.7%",
    changeDirection: "down",
    changeTone: "good",
    icon: "blocked",
    sparkline: [32, 30, 28, 26, 24, 22, 20, 18, 16, 14],
    sparkColor: "amber",
  },
  {
    id: "webhook-events",
    label: "Webhook Events",
    sublabel: "Triggered Today",
    value: "7,856",
    change: "21.3%",
    changeDirection: "up",
    changeTone: "good",
    icon: "webhook",
    sparkline: [14, 20, 17, 24, 21, 28, 25, 32, 29, 36],
    sparkColor: "sky",
  },
];

// ---------- Request volume (line chart) ----------

export const overviewVolumeData: OverviewVolumePoint[] = [
  { label: "May 6", value: 18000 },
  { label: "May 7", value: 32000 },
  { label: "May 8", value: 22000 },
  { label: "May 9", value: 26000 },
  { label: "May 10", value: 21000 },
  { label: "May 11", value: 34000 },
  { label: "May 12", value: 40000 },
];

// ---------- Success vs Failure (donut) ----------

export const overviewSuccessCount = 117256;
export const overviewFailedCount = 11312;
export const overviewSuccessRate = "91.2%";

// ---------- Endpoint usage (top 10) ----------

export const overviewEndpointUsageData: OverviewEndpointUsageItem[] = [
  { id: "eu-1", method: "POST", path: "/transactions/create", count: 24568 },
  { id: "eu-2", method: "GET", path: "/transactions/{id}", count: 18265 },
  { id: "eu-3", method: "POST", path: "/card/payment", count: 15324 },
  { id: "eu-4", method: "GET", path: "/banks/payout", count: 9856 },
  { id: "eu-5", method: "GET", path: "/customers", count: 8456 },
  { id: "eu-6", method: "POST", path: "/auth/login", count: 7245 },
  { id: "eu-7", method: "GET", path: "/reports/summary", count: 6534 },
  { id: "eu-8", method: "GET", path: "/pickup/assign", count: 5632 },
  { id: "eu-9", method: "PUT", path: "/transactions/status", count: 4856 },
  { id: "eu-10", method: "GET", path: "/agents", count: 3842 },
];

// ---------- System health ----------

export const overviewHealthData: OverviewHealthItem[] = [
  { id: "sh-1", name: "API Server", status: "Healthy" },
  { id: "sh-2", name: "Database", status: "Healthy" },
  { id: "sh-3", name: "Gateway Service", status: "Healthy" },
  { id: "sh-4", name: "Queue Service", status: "Warning" },
  { id: "sh-5", name: "Webhook Service", status: "Healthy" },
  { id: "sh-6", name: "Monitoring", status: "Healthy" },
];

// ---------- Environment status ----------

export const overviewEnvStatusData: OverviewEnvStatusItem[] = [
  { id: "env-prod", name: "Production", liveStatus: "Live", uptime: "99.98%" },
  { id: "env-sandbox", name: "Sandbox", liveStatus: "Test", uptime: "99.12%" },
];

export const overviewEnvLastUpdated = "May 12, 2025 10:30 AM";

// ---------- Recent API keys ----------

export const overviewRecentApiKeysData: OverviewRecentApiKey[] = [
  {
    id: "key-1",
    keyId: "KEY_8f3a9b2d1c",
    keyName: "Transaction Service",
    owner: "System",
    moduleAccess: "Transactions",
    environment: "Production",
    status: "Active",
    rateLimit: "100/min",
    createdAt: "May 12, 2025",
  },
  {
    id: "key-2",
    keyId: "KEY_7c2b4e9a3f",
    keyName: "Banking Integration",
    owner: "Admin Rahman",
    moduleAccess: "Banking, Payouts",
    environment: "Production",
    status: "Active",
    rateLimit: "80/min",
    createdAt: "May 10, 2025",
  },
  {
    id: "key-3",
    keyId: "KEY_5d6e7f1a9b",
    keyName: "Card Payment Gateway",
    owner: "Finance Team",
    moduleAccess: "Cards, Payments",
    environment: "Production",
    status: "Active",
    rateLimit: "120/min",
    createdAt: "May 9, 2025",
  },
  {
    id: "key-4",
    keyId: "KEY_2a4b6c8d3e",
    keyName: "Reports Service",
    owner: "System",
    moduleAccess: "Reports",
    environment: "Sandbox",
    status: "Active",
    rateLimit: "50/min",
    createdAt: "May 8, 2025",
  },
  {
    id: "key-5",
    keyId: "KEY_1e3f5a7b9c",
    keyName: "Customer Sync",
    owner: "Operations",
    moduleAccess: "Customers",
    environment: "Sandbox",
    status: "Suspended",
    rateLimit: "60/min",
    createdAt: "May 5, 2025",
  },
];

// ---------- API logs (tabbed table) ----------

export const overviewLogsData: OverviewLogEntry[] = [
  {
    id: "log-1",
    requestId: "REQ_9f8a7b6c5d",
    dateTime: "May 12, 2025 10:30:14 AM",
    method: "POST",
    endpoint: "/api/v1/transactions/create",
    statusCode: 200,
    responseTimeMs: 245,
    ipAddress: "192.168.1.45",
    apiKeyId: "KEY_8f3a9b2d1c",
  },
  {
    id: "log-2",
    requestId: "REQ_7e6d5c4b3a",
    dateTime: "May 12, 2025 10:30:10 AM",
    method: "GET",
    endpoint: "/api/v1/transactions/12345",
    statusCode: 200,
    responseTimeMs: 120,
    ipAddress: "192.168.1.22",
    apiKeyId: "KEY_8f3a9b2d1c",
  },
  {
    id: "log-3",
    requestId: "REQ_5b4a3c2d1e",
    dateTime: "May 12, 2025 10:30:08 AM",
    method: "POST",
    endpoint: "/api/v1/card/payment",
    statusCode: 400,
    responseTimeMs: 310,
    ipAddress: "203.0.113.25",
    apiKeyId: "KEY_5d6e7f1a9b",
  },
  {
    id: "log-4",
    requestId: "REQ_2d1c3b4a5f",
    dateTime: "May 12, 2025 10:30:06 AM",
    method: "GET",
    endpoint: "/api/v1/reports/summary",
    statusCode: 200,
    responseTimeMs: 180,
    ipAddress: "192.168.1.78",
    apiKeyId: "KEY_2a4b6c8d3e",
  },
  {
    id: "log-5",
    requestId: "REQ_1a2b3c4d5e",
    dateTime: "May 12, 2025 10:30:04 AM",
    method: "POST",
    endpoint: "/api/v1/banks/payout",
    statusCode: 500,
    responseTimeMs: 890,
    ipAddress: "198.51.100.14",
    apiKeyId: "KEY_7c2b4e9a3f",
  },
];

export const overviewLogsTotalCount = 1250;

// ---------- Recent webhook events ----------

export const overviewRecentWebhookEventsData: OverviewRecentWebhookEvent[] = [
  { id: "wh-1", eventName: "transaction.completed", timestamp: "May 12, 2025 10:29 AM", status: "Delivered" },
  { id: "wh-2", eventName: "pickup.approved", timestamp: "May 12, 2025 10:29 AM", status: "Delivered" },
  { id: "wh-3", eventName: "card.payment.success", timestamp: "May 12, 2025 10:28 AM", status: "Delivered" },
  { id: "wh-4", eventName: "aml.alert.created", timestamp: "May 12, 2025 10:27 AM", status: "Failed" },
  { id: "wh-5", eventName: "transaction.failed", timestamp: "May 12, 2025 10:27 AM", status: "Delivered" },
];

// ---------- Quick actions ----------

export const overviewQuickActionsData: OverviewQuickAction[] = [
  { id: "qa-1", label: "Generate API Key", icon: "generate-key" },
  { id: "qa-2", label: "Add Webhook", icon: "add-webhook" },
  { id: "qa-3", label: "Create Endpoint", icon: "create-endpoint" },
  { id: "qa-4", label: "View Logs", icon: "view-logs" },
];

export const overviewLogTabs: OverviewLogTab[] = ["API Logs", "Failed Requests", "Security Alerts", "IP Activity"];






// ============================================================
// API KEYS — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type ApiKeysEnvironment = "Production" | "Sandbox";
export type ApiKeysStatus = "Active" | "Suspended" | "Revoked";

export interface ApiKeysModuleScope {
  id: string;
  name: string;
}

export interface ApiKeyRecord {
  id: string;
  keyId: string; // public identifier shown in tables, e.g. KEY_8f3a9b2d1c
  keyName: string;
  owner: string;
  ownerAvatar: string;
  moduleAccess: string[];
  environment: ApiKeysEnvironment;
  status: ApiKeysStatus;
  rateLimit: string;
  lastUsed: string;
  createdAt: string;
  expiresAt: string | null;
  secretPreview: string; // masked, e.g. sk_live_••••••••a1c2
  secretFull: string; // full fake secret for "reveal"
  totalRequests: number;
}

// ---------- Badge style maps ----------

export const apiKeysStatusBadge: Record<ApiKeysStatus, string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Suspended: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Revoked: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const apiKeysEnvBadge: Record<ApiKeysEnvironment, string> = {
  Production: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Sandbox: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
};

export const apiKeysStatusDot: Record<ApiKeysStatus, string> = {
  Active: "bg-green-500",
  Suspended: "bg-amber-500",
  Revoked: "bg-red-500",
};

// ---------- Available module scopes (for Generate/Edit key form) ----------

export const apiKeysAvailableModules: ApiKeysModuleScope[] = [
  { id: "mod-1", name: "Transactions" },
  { id: "mod-2", name: "Payouts" },
  { id: "mod-3", name: "Banking" },
  { id: "mod-4", name: "Cards" },
  { id: "mod-5", name: "Payments" },
  { id: "mod-6", name: "Customers" },
  { id: "mod-7", name: "Reports" },
  { id: "mod-8", name: "Agents" },
  { id: "mod-9", name: "Pickup" },
  { id: "mod-10", name: "Webhooks" },
];

export const apiKeysRateLimitOptions: string[] = [
  "30/min",
  "50/min",
  "60/min",
  "80/min",
  "100/min",
  "120/min",
  "200/min",
];

// ---------- Stat summary ----------

export interface ApiKeysStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "active" | "production" | "sandbox";
}

export const apiKeysStats: ApiKeysStat[] = [
  { id: "stat-total", label: "Total API Keys", value: "86", icon: "total" },
  { id: "stat-active", label: "Active Keys", value: "71", icon: "active" },
  { id: "stat-production", label: "Production Keys", value: "52", icon: "production" },
  { id: "stat-sandbox", label: "Sandbox Keys", value: "34", icon: "sandbox" },
];

// ---------- Main data ----------

export const apiKeysData: ApiKeyRecord[] = [
  {
    id: "akr-1",
    keyId: "KEY_8f3a9b2d1c",
    keyName: "Transaction Service",
    owner: "System",
    ownerAvatar: "https://i.pravatar.cc/40?img=11",
    moduleAccess: ["Transactions"],
    environment: "Production",
    status: "Active",
    rateLimit: "100/min",
    lastUsed: "2 minutes ago",
    createdAt: "May 12, 2025",
    expiresAt: null,
    secretPreview: "sk_live_••••••••••••a1c2",
    secretFull: "sk_live_8f3a9b2d1c4e7f6a9b0c1d2e3f4a5b6c7d8e9f0a1c2",
    totalRequests: 482190,
  },
  {
    id: "akr-2",
    keyId: "KEY_7c2b4e9a3f",
    keyName: "Banking Integration",
    owner: "Admin Rahman",
    ownerAvatar: "https://i.pravatar.cc/40?img=12",
    moduleAccess: ["Banking", "Payouts"],
    environment: "Production",
    status: "Active",
    rateLimit: "80/min",
    lastUsed: "10 minutes ago",
    createdAt: "May 10, 2025",
    expiresAt: "May 10, 2026",
    secretPreview: "sk_live_••••••••••••9f3a",
    secretFull: "sk_live_7c2b4e9a3f6d8e1a2b3c4d5e6f7a8b9c0d1e2f9f3a",
    totalRequests: 215430,
  },
  {
    id: "akr-3",
    keyId: "KEY_5d6e7f1a9b",
    keyName: "Card Payment Gateway",
    owner: "Finance Team",
    ownerAvatar: "https://i.pravatar.cc/40?img=13",
    moduleAccess: ["Cards", "Payments"],
    environment: "Production",
    status: "Active",
    rateLimit: "120/min",
    lastUsed: "1 hour ago",
    createdAt: "May 9, 2025",
    expiresAt: null,
    secretPreview: "sk_live_••••••••••••7b21",
    secretFull: "sk_live_5d6e7f1a9b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7b21",
    totalRequests: 396712,
  },
  {
    id: "akr-4",
    keyId: "KEY_2a4b6c8d3e",
    keyName: "Reports Service",
    owner: "System",
    ownerAvatar: "https://i.pravatar.cc/40?img=14",
    moduleAccess: ["Reports"],
    environment: "Sandbox",
    status: "Active",
    rateLimit: "50/min",
    lastUsed: "3 hours ago",
    createdAt: "May 8, 2025",
    expiresAt: "Aug 8, 2025",
    secretPreview: "sk_test_••••••••••••4d8e",
    secretFull: "sk_test_2a4b6c8d3e5f6a7b8c9d0e1f2a3b4c5d6e7f4d8e",
    totalRequests: 18230,
  },
  {
    id: "akr-5",
    keyId: "KEY_1e3f5a7b9c",
    keyName: "Customer Sync",
    owner: "Operations",
    ownerAvatar: "https://i.pravatar.cc/40?img=15",
    moduleAccess: ["Customers"],
    environment: "Sandbox",
    status: "Suspended",
    rateLimit: "60/min",
    lastUsed: "2 days ago",
    createdAt: "May 5, 2025",
    expiresAt: null,
    secretPreview: "sk_test_••••••••••••c3f1",
    secretFull: "sk_test_1e3f5a7b9c2d4e6f8a0b1c2d3e4f5a6b7c8d9c3f1",
    totalRequests: 7421,
  },
  {
    id: "akr-6",
    keyId: "KEY_9b1c3d5e7f",
    keyName: "Agent Mobile App",
    owner: "Mobile Team",
    ownerAvatar: "https://i.pravatar.cc/40?img=16",
    moduleAccess: ["Agents", "Pickup"],
    environment: "Production",
    status: "Active",
    rateLimit: "100/min",
    lastUsed: "30 minutes ago",
    createdAt: "May 3, 2025",
    expiresAt: null,
    secretPreview: "sk_live_••••••••••••b5e9",
    secretFull: "sk_live_9b1c3d5e7f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5e9",
    totalRequests: 154892,
  },
  {
    id: "akr-7",
    keyId: "KEY_4f6a8b0c2d",
    keyName: "Legacy Webhook Relay",
    owner: "DevOps",
    ownerAvatar: "https://i.pravatar.cc/40?img=17",
    moduleAccess: ["Webhooks"],
    environment: "Production",
    status: "Revoked",
    rateLimit: "30/min",
    lastUsed: "45 days ago",
    createdAt: "Feb 14, 2025",
    expiresAt: "May 1, 2025",
    secretPreview: "sk_live_••••••••••••e0a4",
    secretFull: "sk_live_4f6a8b0c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6e0a4",
    totalRequests: 92103,
  },
  {
    id: "akr-8",
    keyId: "KEY_3c5e7a9b1d",
    keyName: "Internal Analytics",
    owner: "Data Team",
    ownerAvatar: "https://i.pravatar.cc/40?img=18",
    moduleAccess: ["Reports", "Transactions"],
    environment: "Sandbox",
    status: "Active",
    rateLimit: "50/min",
    lastUsed: "5 hours ago",
    createdAt: "Apr 28, 2025",
    expiresAt: "Oct 28, 2025",
    secretPreview: "sk_test_••••••••••••d7c6",
    secretFull: "sk_test_3c5e7a9b1d2e3f4a5b6c7d8e9f0a1b2c3d4e5d7c6",
    totalRequests: 4109,
  },
];

export const apiKeysTotalCount = apiKeysData.length;





// ============================================================
// ACCESS SCOPES — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type ScopesPermissionLevel = "Read" | "Write" | "Full Access";
export type ScopesModuleName =
  | "Transactions"
  | "Payouts"
  | "Banking"
  | "Cards"
  | "Payments"
  | "Customers"
  | "Reports"
  | "Agents"
  | "Webhooks"
  | "Settings";

export interface AccessScopeRecord {
  id: string;
  scopeKey: string; // e.g. "transactions:read"
  name: string;
  description: string;
  module: ScopesModuleName;
  permissionLevel: ScopesPermissionLevel;
  isSystemScope: boolean; // system scopes can't be deleted
  assignedKeysCount: number;
  createdAt: string;
}

// ---------- Badge style maps ----------

export const scopesPermissionBadge: Record<ScopesPermissionLevel, string> = {
  Read: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Write: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  "Full Access": "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
};

export const scopesModuleColor: Record<ScopesModuleName, string> = {
  Transactions: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  Payouts: "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
  Banking: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
  Cards: "bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
  Payments: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400",
  Customers: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  Reports: "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
  Agents: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  Webhooks: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  Settings: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export const scopesModuleOptions: ScopesModuleName[] = [
  "Transactions",
  "Payouts",
  "Banking",
  "Cards",
  "Payments",
  "Customers",
  "Reports",
  "Agents",
  "Webhooks",
  "Settings",
];

export const scopesPermissionOptions: ScopesPermissionLevel[] = ["Read", "Write", "Full Access"];

// ---------- Stat summary ----------

export interface AccessScopesStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "read" | "write" | "full";
}

export const accessScopesStats: AccessScopesStat[] = [
  { id: "as-stat-total", label: "Total Scopes", value: "24", icon: "total" },
  { id: "as-stat-read", label: "Read Scopes", value: "10", icon: "read" },
  { id: "as-stat-write", label: "Write Scopes", value: "9", icon: "write" },
  { id: "as-stat-full", label: "Full Access Scopes", value: "5", icon: "full" },
];

// ---------- Main data ----------

export const accessScopesData: AccessScopeRecord[] = [
  {
    id: "scope-1",
    scopeKey: "transactions:read",
    name: "View Transactions",
    description: "Allows reading transaction records, statuses, and history.",
    module: "Transactions",
    permissionLevel: "Read",
    isSystemScope: true,
    assignedKeysCount: 18,
    createdAt: "Jan 10, 2025",
  },
  {
    id: "scope-2",
    scopeKey: "transactions:write",
    name: "Create Transactions",
    description: "Allows creating and updating transaction records.",
    module: "Transactions",
    permissionLevel: "Write",
    isSystemScope: true,
    assignedKeysCount: 9,
    createdAt: "Jan 10, 2025",
  },
  {
    id: "scope-3",
    scopeKey: "transactions:full",
    name: "Full Transaction Access",
    description: "Complete control over transactions including void and refund.",
    module: "Transactions",
    permissionLevel: "Full Access",
    isSystemScope: false,
    assignedKeysCount: 3,
    createdAt: "Feb 2, 2025",
  },
  {
    id: "scope-4",
    scopeKey: "payouts:read",
    name: "View Payouts",
    description: "Allows reading payout batches and statuses.",
    module: "Payouts",
    permissionLevel: "Read",
    isSystemScope: true,
    assignedKeysCount: 12,
    createdAt: "Jan 12, 2025",
  },
  {
    id: "scope-5",
    scopeKey: "payouts:write",
    name: "Initiate Payouts",
    description: "Allows creating and scheduling payout batches.",
    module: "Payouts",
    permissionLevel: "Write",
    isSystemScope: true,
    assignedKeysCount: 6,
    createdAt: "Jan 12, 2025",
  },
  {
    id: "scope-6",
    scopeKey: "banking:read",
    name: "View Bank Accounts",
    description: "Allows reading linked bank account details.",
    module: "Banking",
    permissionLevel: "Read",
    isSystemScope: true,
    assignedKeysCount: 8,
    createdAt: "Jan 14, 2025",
  },
  {
    id: "scope-7",
    scopeKey: "banking:write",
    name: "Manage Bank Accounts",
    description: "Allows adding, updating, or removing linked bank accounts.",
    module: "Banking",
    permissionLevel: "Write",
    isSystemScope: false,
    assignedKeysCount: 4,
    createdAt: "Feb 18, 2025",
  },
  {
    id: "scope-8",
    scopeKey: "cards:read",
    name: "View Cards",
    description: "Allows reading card metadata (masked card numbers only).",
    module: "Cards",
    permissionLevel: "Read",
    isSystemScope: true,
    assignedKeysCount: 11,
    createdAt: "Jan 16, 2025",
  },
  {
    id: "scope-9",
    scopeKey: "cards:write",
    name: "Issue & Manage Cards",
    description: "Allows issuing new cards and updating card settings.",
    module: "Cards",
    permissionLevel: "Write",
    isSystemScope: false,
    assignedKeysCount: 2,
    createdAt: "Mar 1, 2025",
  },
  {
    id: "scope-10",
    scopeKey: "payments:read",
    name: "View Payments",
    description: "Allows reading payment records and receipts.",
    module: "Payments",
    permissionLevel: "Read",
    isSystemScope: true,
    assignedKeysCount: 15,
    createdAt: "Jan 18, 2025",
  },
  {
    id: "scope-11",
    scopeKey: "payments:full",
    name: "Full Payment Access",
    description: "Complete control over payments including capture and reversal.",
    module: "Payments",
    permissionLevel: "Full Access",
    isSystemScope: false,
    assignedKeysCount: 3,
    createdAt: "Mar 5, 2025",
  },
  {
    id: "scope-12",
    scopeKey: "customers:read",
    name: "View Customers",
    description: "Allows reading customer profiles and KYC status.",
    module: "Customers",
    permissionLevel: "Read",
    isSystemScope: true,
    assignedKeysCount: 14,
    createdAt: "Jan 20, 2025",
  },
  {
    id: "scope-13",
    scopeKey: "customers:write",
    name: "Manage Customers",
    description: "Allows creating, updating, or suspending customer profiles.",
    module: "Customers",
    permissionLevel: "Write",
    isSystemScope: false,
    assignedKeysCount: 5,
    createdAt: "Feb 22, 2025",
  },
  {
    id: "scope-14",
    scopeKey: "reports:read",
    name: "View Reports",
    description: "Allows reading generated reports and analytics summaries.",
    module: "Reports",
    permissionLevel: "Read",
    isSystemScope: true,
    assignedKeysCount: 10,
    createdAt: "Jan 22, 2025",
  },
  {
    id: "scope-15",
    scopeKey: "agents:read",
    name: "View Agents",
    description: "Allows reading agent profiles and pickup assignment data.",
    module: "Agents",
    permissionLevel: "Read",
    isSystemScope: true,
    assignedKeysCount: 7,
    createdAt: "Jan 24, 2025",
  },
  {
    id: "scope-16",
    scopeKey: "agents:write",
    name: "Manage Agents",
    description: "Allows creating and updating agent assignments and territories.",
    module: "Agents",
    permissionLevel: "Write",
    isSystemScope: false,
    assignedKeysCount: 2,
    createdAt: "Mar 8, 2025",
  },
  {
    id: "scope-17",
    scopeKey: "webhooks:read",
    name: "View Webhooks",
    description: "Allows reading webhook configurations and delivery logs.",
    module: "Webhooks",
    permissionLevel: "Read",
    isSystemScope: true,
    assignedKeysCount: 9,
    createdAt: "Jan 26, 2025",
  },
  {
    id: "scope-18",
    scopeKey: "webhooks:write",
    name: "Manage Webhooks",
    description: "Allows creating, updating, and deleting webhook endpoints.",
    module: "Webhooks",
    permissionLevel: "Write",
    isSystemScope: false,
    assignedKeysCount: 6,
    createdAt: "Feb 28, 2025",
  },
  {
    id: "scope-19",
    scopeKey: "settings:read",
    name: "View Settings",
    description: "Allows reading system and integration settings.",
    module: "Settings",
    permissionLevel: "Read",
    isSystemScope: true,
    assignedKeysCount: 5,
    createdAt: "Jan 28, 2025",
  },
  {
    id: "scope-20",
    scopeKey: "settings:full",
    name: "Full Settings Access",
    description: "Complete control over system configuration and integrations.",
    module: "Settings",
    permissionLevel: "Full Access",
    isSystemScope: true,
    assignedKeysCount: 1,
    createdAt: "Jan 28, 2025",
  },
];

export const accessScopesTotalCount = accessScopesData.length;






// ============================================================
// ENDPOINTS — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type EndpointsMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type EndpointsStatus = "Active" | "Beta" | "Deprecated";
export type EndpointsModuleName =
  | "Transactions"
  | "Payouts"
  | "Banking"
  | "Cards"
  | "Payments"
  | "Customers"
  | "Reports"
  | "Agents"
  | "Webhooks"
  | "Auth";

export interface EndpointRecord {
  id: string;
  method: EndpointsMethod;
  path: string;
  name: string;
  description: string;
  module: EndpointsModuleName;
  status: EndpointsStatus;
  requiredScope: string;
  rateLimit: string;
  avgResponseMs: number;
  callsToday: number;
  lastCalled: string;
  versionTag: string;
}

// ---------- Badge style maps ----------

export const endpointsMethodBadge: Record<EndpointsMethod, string> = {
  GET: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  POST: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  PUT: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  PATCH: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const endpointsStatusBadge: Record<EndpointsStatus, string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Beta: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  Deprecated: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const endpointsStatusDot: Record<EndpointsStatus, string> = {
  Active: "bg-green-500",
  Beta: "bg-purple-500",
  Deprecated: "bg-red-500",
};

export const endpointsMethodOptions: EndpointsMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];
export const endpointsStatusOptions: EndpointsStatus[] = ["Active", "Beta", "Deprecated"];
export const endpointsModuleOptions: EndpointsModuleName[] = [
  "Transactions",
  "Payouts",
  "Banking",
  "Cards",
  "Payments",
  "Customers",
  "Reports",
  "Agents",
  "Webhooks",
  "Auth",
];
export const endpointsRateLimitOptions: string[] = ["30/min", "50/min", "60/min", "80/min", "100/min", "120/min"];

// ---------- Stat summary ----------

export interface EndpointsStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "active" | "beta" | "deprecated";
}

export const endpointsStats: EndpointsStat[] = [
  { id: "ep-stat-total", label: "Total Endpoints", value: "48", icon: "total" },
  { id: "ep-stat-active", label: "Active Endpoints", value: "39", icon: "active" },
  { id: "ep-stat-beta", label: "Beta Endpoints", value: "6", icon: "beta" },
  { id: "ep-stat-deprecated", label: "Deprecated", value: "3", icon: "deprecated" },
];

// ---------- Main data ----------

export const endpointsData: EndpointRecord[] = [
  {
    id: "ep-1",
    method: "POST",
    path: "/api/v1/transactions/create",
    name: "Create Transaction",
    description: "Initiates a new remittance transaction between sender and recipient.",
    module: "Transactions",
    status: "Active",
    requiredScope: "transactions:write",
    rateLimit: "100/min",
    avgResponseMs: 245,
    callsToday: 24568,
    lastCalled: "2 minutes ago",
    versionTag: "v1",
  },
  {
    id: "ep-2",
    method: "GET",
    path: "/api/v1/transactions/{id}",
    name: "Get Transaction",
    description: "Retrieves the full details and status of a single transaction.",
    module: "Transactions",
    status: "Active",
    requiredScope: "transactions:read",
    rateLimit: "120/min",
    avgResponseMs: 120,
    callsToday: 18265,
    lastCalled: "5 minutes ago",
    versionTag: "v1",
  },
  {
    id: "ep-3",
    method: "PUT",
    path: "/api/v1/transactions/status",
    name: "Update Transaction Status",
    description: "Updates the lifecycle status of an existing transaction.",
    module: "Transactions",
    status: "Active",
    requiredScope: "transactions:write",
    rateLimit: "100/min",
    avgResponseMs: 180,
    callsToday: 4856,
    lastCalled: "12 minutes ago",
    versionTag: "v1",
  },
  {
    id: "ep-4",
    method: "POST",
    path: "/api/v1/card/payment",
    name: "Card Payment",
    description: "Processes a card payment against a transaction.",
    module: "Cards",
    status: "Active",
    requiredScope: "cards:write",
    rateLimit: "80/min",
    avgResponseMs: 310,
    callsToday: 15324,
    lastCalled: "1 minute ago",
    versionTag: "v1",
  },
  {
    id: "ep-5",
    method: "GET",
    path: "/api/v1/banks/payout",
    name: "List Payouts",
    description: "Returns a paginated list of payout batches.",
    module: "Payouts",
    status: "Active",
    requiredScope: "payouts:read",
    rateLimit: "60/min",
    avgResponseMs: 890,
    callsToday: 9856,
    lastCalled: "8 minutes ago",
    versionTag: "v1",
  },
  {
    id: "ep-6",
    method: "GET",
    path: "/api/v1/customers",
    name: "List Customers",
    description: "Returns a paginated list of customer profiles.",
    module: "Customers",
    status: "Active",
    requiredScope: "customers:read",
    rateLimit: "100/min",
    avgResponseMs: 150,
    callsToday: 8456,
    lastCalled: "3 minutes ago",
    versionTag: "v1",
  },
  {
    id: "ep-7",
    method: "POST",
    path: "/api/v1/auth/login",
    name: "Authenticate",
    description: "Exchanges credentials for an access token.",
    module: "Auth",
    status: "Active",
    requiredScope: "auth:write",
    rateLimit: "30/min",
    avgResponseMs: 95,
    callsToday: 7245,
    lastCalled: "Just now",
    versionTag: "v1",
  },
  {
    id: "ep-8",
    method: "GET",
    path: "/api/v1/reports/summary",
    name: "Reports Summary",
    description: "Returns aggregated summary metrics for a given date range.",
    module: "Reports",
    status: "Active",
    requiredScope: "reports:read",
    rateLimit: "50/min",
    avgResponseMs: 410,
    callsToday: 6534,
    lastCalled: "20 minutes ago",
    versionTag: "v1",
  },
  {
    id: "ep-9",
    method: "GET",
    path: "/api/v1/pickup/assign",
    name: "Assign Pickup",
    description: "Assigns a pending cash-pickup transaction to a field agent.",
    module: "Agents",
    status: "Active",
    requiredScope: "agents:write",
    rateLimit: "60/min",
    avgResponseMs: 200,
    callsToday: 5632,
    lastCalled: "15 minutes ago",
    versionTag: "v1",
  },
  {
    id: "ep-10",
    method: "GET",
    path: "/api/v1/agents",
    name: "List Agents",
    description: "Returns a list of field agents and their current status.",
    module: "Agents",
    status: "Active",
    requiredScope: "agents:read",
    rateLimit: "100/min",
    avgResponseMs: 140,
    callsToday: 3842,
    lastCalled: "30 minutes ago",
    versionTag: "v1",
  },
  {
    id: "ep-11",
    method: "POST",
    path: "/api/v2/transactions/bulk-create",
    name: "Bulk Create Transactions",
    description: "Creates multiple transactions in a single batched request.",
    module: "Transactions",
    status: "Beta",
    requiredScope: "transactions:write",
    rateLimit: "30/min",
    avgResponseMs: 620,
    callsToday: 412,
    lastCalled: "2 hours ago",
    versionTag: "v2",
  },
  {
    id: "ep-12",
    method: "POST",
    path: "/api/v2/payments/instant-settle",
    name: "Instant Settlement",
    description: "Triggers an instant settlement flow for eligible payment partners.",
    module: "Payments",
    status: "Beta",
    requiredScope: "payments:full",
    rateLimit: "30/min",
    avgResponseMs: 540,
    callsToday: 189,
    lastCalled: "4 hours ago",
    versionTag: "v2",
  },
  {
    id: "ep-13",
    method: "PATCH",
    path: "/api/v2/customers/{id}/risk-flag",
    name: "Update Risk Flag",
    description: "Updates the AML/risk flag classification on a customer profile.",
    module: "Customers",
    status: "Beta",
    requiredScope: "customers:write",
    rateLimit: "50/min",
    avgResponseMs: 175,
    callsToday: 92,
    lastCalled: "6 hours ago",
    versionTag: "v2",
  },
  {
    id: "ep-14",
    method: "DELETE",
    path: "/api/v1/cards/{id}",
    name: "Deactivate Card",
    description: "Permanently deactivates a card and revokes all associated tokens.",
    module: "Cards",
    status: "Active",
    requiredScope: "cards:write",
    rateLimit: "60/min",
    avgResponseMs: 130,
    callsToday: 256,
    lastCalled: "1 hour ago",
    versionTag: "v1",
  },
  {
    id: "ep-15",
    method: "GET",
    path: "/api/v0/transactions/legacy-list",
    name: "Legacy Transaction List",
    description: "Deprecated listing endpoint kept for backward compatibility only.",
    module: "Transactions",
    status: "Deprecated",
    requiredScope: "transactions:read",
    rateLimit: "20/min",
    avgResponseMs: 980,
    callsToday: 38,
    lastCalled: "3 days ago",
    versionTag: "v0",
  },
  {
    id: "ep-16",
    method: "GET",
    path: "/api/v0/banks/payout-status",
    name: "Legacy Payout Status",
    description: "Deprecated payout status check, replaced by /api/v1/banks/payout.",
    module: "Payouts",
    status: "Deprecated",
    requiredScope: "payouts:read",
    rateLimit: "20/min",
    avgResponseMs: 760,
    callsToday: 14,
    lastCalled: "9 days ago",
    versionTag: "v0",
  },
  {
    id: "ep-17",
    method: "POST",
    path: "/api/v0/webhooks/register",
    name: "Legacy Webhook Registration",
    description: "Deprecated webhook registration flow, replaced by Webhooks module UI.",
    module: "Webhooks",
    status: "Deprecated",
    requiredScope: "webhooks:write",
    rateLimit: "10/min",
    avgResponseMs: 410,
    callsToday: 3,
    lastCalled: "21 days ago",
    versionTag: "v0",
  },
];

export const endpointsTotalCount = endpointsData.length;











// ============================================================
// WEBHOOKS — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type WebhooksStatus = "Active" | "Paused" | "Failing";
export type WebhooksEnvironment = "Production" | "Sandbox";

export interface WebhookDeliveryLog {
  id: string;
  eventName: string;
  timestamp: string;
  statusCode: number;
  success: boolean;
  responseTimeMs: number;
}

export interface WebhookRecord {
  id: string;
  name: string;
  url: string;
  description: string;
  events: string[];
  environment: WebhooksEnvironment;
  status: WebhooksStatus;
  secretPreview: string;
  secretFull: string;
  successRate: number; // 0-100
  totalDeliveries: number;
  failedDeliveries: number;
  lastTriggered: string;
  createdAt: string;
  retryEnabled: boolean;
  recentDeliveries: WebhookDeliveryLog[];
}

// ---------- Badge style maps ----------

export const webhooksStatusBadge: Record<WebhooksStatus, string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Paused: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  Failing: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const webhooksStatusDot: Record<WebhooksStatus, string> = {
  Active: "bg-green-500",
  Paused: "bg-slate-400",
  Failing: "bg-red-500",
};

export const webhooksEnvBadge: Record<WebhooksEnvironment, string> = {
  Production: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Sandbox: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
};

export const webhooksDeliveryStatusColor = (success: boolean): string =>
  success ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";

// ---------- Available events (for create/edit form) ----------

export const webhooksAvailableEvents: string[] = [
  "transaction.created",
  "transaction.completed",
  "transaction.failed",
  "payout.initiated",
  "payout.completed",
  "payout.failed",
  "card.payment.success",
  "card.payment.failed",
  "customer.created",
  "customer.updated",
  "pickup.assigned",
  "pickup.approved",
  "aml.alert.created",
];

export const webhooksEnvOptions: WebhooksEnvironment[] = ["Production", "Sandbox"];
export const webhooksStatusOptions: WebhooksStatus[] = ["Active", "Paused", "Failing"];

// ---------- Stat summary ----------

export interface WebhooksStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "active" | "failing" | "rate";
}

export const webhooksStats: WebhooksStat[] = [
  { id: "wh-stat-total", label: "Total Webhooks", value: "16", icon: "total" },
  { id: "wh-stat-active", label: "Active Webhooks", value: "12", icon: "active" },
  { id: "wh-stat-failing", label: "Failing Webhooks", value: "2", icon: "failing" },
  { id: "wh-stat-rate", label: "Avg Success Rate", value: "97.4%", icon: "rate" },
];

// ---------- Main data ----------

export const webhooksData: WebhookRecord[] = [
  {
    id: "wh-1",
    name: "Core Transaction Sync",
    url: "https://hooks.fintrack.io/v1/transactions",
    description: "Notifies the internal ledger service of every transaction lifecycle change.",
    events: ["transaction.created", "transaction.completed", "transaction.failed"],
    environment: "Production",
    status: "Active",
    secretPreview: "whsec_••••••••••••a1c2",
    secretFull: "whsec_8f3a9b2d1c4e7f6a9b0c1d2e3f4a5b6c7d8e9f0a1c2",
    successRate: 99.6,
    totalDeliveries: 48210,
    failedDeliveries: 193,
    lastTriggered: "2 minutes ago",
    createdAt: "Mar 2, 2025",
    retryEnabled: true,
    recentDeliveries: [
      { id: "d-1", eventName: "transaction.completed", timestamp: "May 12, 2025 10:29 AM", statusCode: 200, success: true, responseTimeMs: 145 },
      { id: "d-2", eventName: "transaction.created", timestamp: "May 12, 2025 10:28 AM", statusCode: 200, success: true, responseTimeMs: 132 },
      { id: "d-3", eventName: "transaction.failed", timestamp: "May 12, 2025 10:27 AM", statusCode: 200, success: true, responseTimeMs: 158 },
    ],
  },
  {
    id: "wh-2",
    name: "Payout Notifier",
    url: "https://api.partnerbank.com/webhooks/payouts",
    description: "Sends payout status updates to the partner banking integration.",
    events: ["payout.initiated", "payout.completed", "payout.failed"],
    environment: "Production",
    status: "Active",
    secretPreview: "whsec_••••••••••••9f3a",
    secretFull: "whsec_7c2b4e9a3f6d8e1a2b3c4d5e6f7a8b9c0d1e2f9f3a",
    successRate: 98.1,
    totalDeliveries: 12480,
    failedDeliveries: 237,
    lastTriggered: "8 minutes ago",
    createdAt: "Mar 5, 2025",
    retryEnabled: true,
    recentDeliveries: [
      { id: "d-4", eventName: "payout.completed", timestamp: "May 12, 2025 10:22 AM", statusCode: 200, success: true, responseTimeMs: 210 },
      { id: "d-5", eventName: "payout.initiated", timestamp: "May 12, 2025 10:10 AM", statusCode: 200, success: true, responseTimeMs: 198 },
    ],
  },
  {
    id: "wh-3",
    name: "AML Alert Forwarder",
    url: "https://compliance.fintrack.io/hooks/aml",
    description: "Forwards AML risk alerts to the compliance monitoring system.",
    events: ["aml.alert.created"],
    environment: "Production",
    status: "Failing",
    secretPreview: "whsec_••••••••••••e0a4",
    secretFull: "whsec_4f6a8b0c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6e0a4",
    successRate: 64.2,
    totalDeliveries: 980,
    failedDeliveries: 351,
    lastTriggered: "27 minutes ago",
    createdAt: "Apr 18, 2025",
    retryEnabled: true,
    recentDeliveries: [
      { id: "d-6", eventName: "aml.alert.created", timestamp: "May 12, 2025 10:03 AM", statusCode: 503, success: false, responseTimeMs: 5200 },
      { id: "d-7", eventName: "aml.alert.created", timestamp: "May 12, 2025 09:58 AM", statusCode: 503, success: false, responseTimeMs: 5100 },
      { id: "d-8", eventName: "aml.alert.created", timestamp: "May 12, 2025 09:40 AM", statusCode: 200, success: true, responseTimeMs: 310 },
    ],
  },
  {
    id: "wh-4",
    name: "Card Payment Receipts",
    url: "https://receipts.fintrack.io/webhooks/cards",
    description: "Triggers receipt generation when a card payment succeeds or fails.",
    events: ["card.payment.success", "card.payment.failed"],
    environment: "Production",
    status: "Active",
    secretPreview: "whsec_••••••••••••b5e9",
    secretFull: "whsec_9b1c3d5e7f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5e9",
    successRate: 99.9,
    totalDeliveries: 31290,
    failedDeliveries: 31,
    lastTriggered: "1 minute ago",
    createdAt: "Feb 27, 2025",
    retryEnabled: true,
    recentDeliveries: [
      { id: "d-9", eventName: "card.payment.success", timestamp: "May 12, 2025 10:30 AM", statusCode: 200, success: true, responseTimeMs: 120 },
    ],
  },
  {
    id: "wh-5",
    name: "Customer CRM Sync",
    url: "https://crm.fintrack.io/api/hooks/customers",
    description: "Keeps customer profile changes in sync with the CRM platform.",
    events: ["customer.created", "customer.updated"],
    environment: "Production",
    status: "Active",
    secretPreview: "whsec_••••••••••••c3f1",
    secretFull: "whsec_1e3f5a7b9c2d4e6f8a0b1c2d3e4f5a6b7c8d9c3f1",
    successRate: 97.8,
    totalDeliveries: 9650,
    failedDeliveries: 212,
    lastTriggered: "15 minutes ago",
    createdAt: "Jan 30, 2025",
    retryEnabled: false,
    recentDeliveries: [
      { id: "d-10", eventName: "customer.updated", timestamp: "May 12, 2025 10:15 AM", statusCode: 200, success: true, responseTimeMs: 175 },
    ],
  },
  {
    id: "wh-6",
    name: "Agent Pickup Dispatcher",
    url: "https://dispatch.fintrack.io/hooks/pickup",
    description: "Notifies the agent mobile app dispatcher when a pickup is assigned or approved.",
    events: ["pickup.assigned", "pickup.approved"],
    environment: "Production",
    status: "Active",
    secretPreview: "whsec_••••••••••••d7c6",
    secretFull: "whsec_3c5e7a9b1d2e3f4a5b6c7d8e9f0a1b2c3d4e5d7c6",
    successRate: 99.2,
    totalDeliveries: 14820,
    failedDeliveries: 118,
    lastTriggered: "4 minutes ago",
    createdAt: "Apr 5, 2025",
    retryEnabled: true,
    recentDeliveries: [
      { id: "d-11", eventName: "pickup.assigned", timestamp: "May 12, 2025 10:26 AM", statusCode: 200, success: true, responseTimeMs: 140 },
    ],
  },
  {
    id: "wh-7",
    name: "Staging Test Hook",
    url: "https://webhook.site/staging-test-endpoint",
    description: "Used by the QA team to verify webhook payload formats before release.",
    events: ["transaction.completed", "payout.completed"],
    environment: "Sandbox",
    status: "Paused",
    secretPreview: "whsec_••••••••••••f2a8",
    secretFull: "whsec_2a4b6c8d3e5f6a7b8c9d0e1f2a3b4c5d6e7f4d8e",
    successRate: 100,
    totalDeliveries: 312,
    failedDeliveries: 0,
    lastTriggered: "6 days ago",
    createdAt: "May 1, 2025",
    retryEnabled: false,
    recentDeliveries: [
      { id: "d-12", eventName: "transaction.completed", timestamp: "May 6, 2025 02:14 PM", statusCode: 200, success: true, responseTimeMs: 95 },
    ],
  },
];

export const webhooksTotalCount = webhooksData.length;








// ============================================================
// RATE LIMITING — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type RateLimitTargetType = "API Key" | "Endpoint" | "Module" | "Global";
export type RateLimitWindow = "Per Second" | "Per Minute" | "Per Hour" | "Per Day";
export type RateLimitStatus = "Active" | "Paused";

export interface RateLimitRule {
  id: string;
  name: string;
  targetType: RateLimitTargetType;
  targetLabel: string; // e.g. "KEY_8f3a9b2d1c", "/api/v1/transactions/create", "Transactions", "Global Default"
  limit: number;
  window: RateLimitWindow;
  burstAllowance: number;
  currentUsage: number; // current usage within window, used to compute utilization %
  status: RateLimitStatus;
  throttledToday: number;
  createdAt: string;
}

// ---------- Badge style maps ----------

export const rateLimitStatusBadge: Record<RateLimitStatus, string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Paused: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export const rateLimitStatusDot: Record<RateLimitStatus, string> = {
  Active: "bg-green-500",
  Paused: "bg-slate-400",
};

export const rateLimitTargetBadge: Record<RateLimitTargetType, string> = {
  "API Key": "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Endpoint: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  Module: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Global: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const rateLimitUtilizationColor = (pct: number): string => {
  if (pct >= 90) return "bg-red-500";
  if (pct >= 70) return "bg-amber-500";
  return "bg-green-500";
};

export const rateLimitTargetTypeOptions: RateLimitTargetType[] = ["API Key", "Endpoint", "Module", "Global"];
export const rateLimitWindowOptions: RateLimitWindow[] = ["Per Second", "Per Minute", "Per Hour", "Per Day"];

// ---------- Stat summary ----------

export interface RateLimitStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "active" | "throttled" | "utilization";
}

export const rateLimitStats: RateLimitStat[] = [
  { id: "rl-stat-total", label: "Total Rules", value: "14", icon: "total" },
  { id: "rl-stat-active", label: "Active Rules", value: "12", icon: "active" },
  { id: "rl-stat-throttled", label: "Throttled Requests Today", value: "1,284", icon: "throttled" },
  { id: "rl-stat-utilization", label: "Avg Utilization", value: "58%", icon: "utilization" },
];

// ---------- Main data ----------

export const rateLimitRulesData: RateLimitRule[] = [
  {
    id: "rl-1",
    name: "Transaction Service Key Limit",
    targetType: "API Key",
    targetLabel: "KEY_8f3a9b2d1c · Transaction Service",
    limit: 100,
    window: "Per Minute",
    burstAllowance: 20,
    currentUsage: 78,
    status: "Active",
    throttledToday: 142,
    createdAt: "May 12, 2025",
  },
  {
    id: "rl-2",
    name: "Banking Integration Key Limit",
    targetType: "API Key",
    targetLabel: "KEY_7c2b4e9a3f · Banking Integration",
    limit: 80,
    window: "Per Minute",
    burstAllowance: 15,
    currentUsage: 62,
    status: "Active",
    throttledToday: 38,
    createdAt: "May 10, 2025",
  },
  {
    id: "rl-3",
    name: "Card Payment Endpoint Limit",
    targetType: "Endpoint",
    targetLabel: "POST /api/v1/card/payment",
    limit: 120,
    window: "Per Minute",
    burstAllowance: 30,
    currentUsage: 109,
    status: "Active",
    throttledToday: 415,
    createdAt: "Apr 28, 2025",
  },
  {
    id: "rl-4",
    name: "Auth Login Throttle",
    targetType: "Endpoint",
    targetLabel: "POST /api/v1/auth/login",
    limit: 30,
    window: "Per Minute",
    burstAllowance: 5,
    currentUsage: 29,
    status: "Active",
    throttledToday: 612,
    createdAt: "Jan 20, 2025",
  },
  {
    id: "rl-5",
    name: "Reports Module Limit",
    targetType: "Module",
    targetLabel: "Reports",
    limit: 50,
    window: "Per Minute",
    burstAllowance: 10,
    currentUsage: 11,
    status: "Active",
    throttledToday: 2,
    createdAt: "Mar 14, 2025",
  },
  {
    id: "rl-6",
    name: "Customer Sync Sandbox Limit",
    targetType: "API Key",
    targetLabel: "KEY_1e3f5a7b9c · Customer Sync",
    limit: 60,
    window: "Per Minute",
    burstAllowance: 10,
    currentUsage: 4,
    status: "Paused",
    throttledToday: 0,
    createdAt: "May 5, 2025",
  },
  {
    id: "rl-7",
    name: "Webhooks Module Limit",
    targetType: "Module",
    targetLabel: "Webhooks",
    limit: 200,
    window: "Per Minute",
    burstAllowance: 40,
    currentUsage: 64,
    status: "Active",
    throttledToday: 0,
    createdAt: "Feb 10, 2025",
  },
  {
    id: "rl-8",
    name: "Global Default Limit",
    targetType: "Global",
    targetLabel: "All Unassigned Traffic",
    limit: 1000,
    window: "Per Minute",
    burstAllowance: 100,
    currentUsage: 412,
    status: "Active",
    throttledToday: 75,
    createdAt: "Jan 1, 2025",
  },
  {
    id: "rl-9",
    name: "Agent Mobile App Burst Limit",
    targetType: "API Key",
    targetLabel: "KEY_9b1c3d5e7f · Agent Mobile App",
    limit: 100,
    window: "Per Minute",
    burstAllowance: 25,
    currentUsage: 96,
    status: "Active",
    throttledToday: 0,
    createdAt: "May 3, 2025",
  },
  {
    id: "rl-10",
    name: "Payout Endpoint Daily Cap",
    targetType: "Endpoint",
    targetLabel: "GET /api/v1/banks/payout",
    limit: 5000,
    window: "Per Day",
    burstAllowance: 200,
    currentUsage: 1840,
    status: "Active",
    throttledToday: 0,
    createdAt: "Mar 22, 2025",
  },
];

export const rateLimitTotalCount = rateLimitRulesData.length;







// ============================================================
// LOGS & MONITORING — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type MonitorLogLevel = "Info" | "Warning" | "Error" | "Critical";
export type MonitorLogMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface MonitorLogEntry {
  id: string;
  requestId: string;
  timestamp: string;
  level: MonitorLogLevel;
  method: MonitorLogMethod;
  endpoint: string;
  statusCode: number;
  responseTimeMs: number;
  ipAddress: string;
  apiKeyId: string;
  message: string;
  requestHeaders: Record<string, string>;
  responseBodyPreview: string;
}

export interface MonitorTrafficPoint {
  label: string; // hour or date label
  requests: number;
  errors: number;
}

export interface MonitorResponseBucket {
  label: string; // e.g. "0-100ms"
  count: number;
}

// ---------- Badge style maps ----------

export const monitorLevelBadge: Record<MonitorLogLevel, string> = {
  Info: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Warning: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Error: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  Critical: "bg-red-200 text-red-800 dark:bg-red-500/20 dark:text-red-300",
};

export const monitorLevelDot: Record<MonitorLogLevel, string> = {
  Info: "bg-blue-500",
  Warning: "bg-amber-500",
  Error: "bg-red-500",
  Critical: "bg-red-700",
};

export const monitorMethodBadge: Record<MonitorLogMethod, string> = {
  GET: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  POST: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  PUT: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  PATCH: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  DELETE: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const monitorStatusCodeColor = (code: number): string => {
  if (code >= 200 && code < 300) return "text-green-600 dark:text-green-400";
  if (code >= 400 && code < 500) return "text-amber-600 dark:text-amber-400";
  if (code >= 500) return "text-red-600 dark:text-red-400";
  return "text-slate-600 dark:text-slate-300";
};

export const monitorLevelOptions: MonitorLogLevel[] = ["Info", "Warning", "Error", "Critical"];
export const monitorMethodOptions: MonitorLogMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

// ---------- Stat summary ----------

export interface MonitorStat {
  id: string;
  label: string;
  value: string;
  change: string;
  changeDirection: "up" | "down";
  changeTone: "good" | "bad";
  icon: "logs" | "errorRate" | "responseTime" | "alerts";
}

export const monitorStats: MonitorStat[] = [
  {
    id: "mon-stat-logs",
    label: "Total Logs Today",
    value: "128,568",
    change: "18.6%",
    changeDirection: "up",
    changeTone: "good",
    icon: "logs",
  },
  {
    id: "mon-stat-error-rate",
    label: "Error Rate",
    value: "8.8%",
    change: "2.1%",
    changeDirection: "down",
    changeTone: "good",
    icon: "errorRate",
  },
  {
    id: "mon-stat-response-time",
    label: "Avg Response Time",
    value: "245 ms",
    change: "12.9%",
    changeDirection: "up",
    changeTone: "bad",
    icon: "responseTime",
  },
  {
    id: "mon-stat-alerts",
    label: "Active Alerts",
    value: "3",
    change: "1",
    changeDirection: "up",
    changeTone: "bad",
    icon: "alerts",
  },
];

// ---------- Traffic & error chart (24h) ----------

export const monitorTrafficData: MonitorTrafficPoint[] = [
  { label: "12 AM", requests: 3200, errors: 180 },
  { label: "3 AM", requests: 2100, errors: 95 },
  { label: "6 AM", requests: 2800, errors: 130 },
  { label: "9 AM", requests: 7400, errors: 410 },
  { label: "12 PM", requests: 9800, errors: 520 },
  { label: "3 PM", requests: 11200, errors: 980 },
  { label: "6 PM", requests: 8600, errors: 460 },
  { label: "9 PM", requests: 5400, errors: 290 },
];

// ---------- Response time distribution ----------

export const monitorResponseDistribution: MonitorResponseBucket[] = [
  { label: "0-100ms", count: 48210 },
  { label: "100-250ms", count: 39850 },
  { label: "250-500ms", count: 22640 },
  { label: "500-1000ms", count: 11920 },
  { label: "1000ms+", count: 5948 },
];

// ---------- Main log entries ----------

export const monitorLogsData: MonitorLogEntry[] = [
  {
    id: "mlog-1",
    requestId: "REQ_9f8a7b6c5d",
    timestamp: "May 12, 2025 10:30:14 AM",
    level: "Info",
    method: "POST",
    endpoint: "/api/v1/transactions/create",
    statusCode: 200,
    responseTimeMs: 245,
    ipAddress: "192.168.1.45",
    apiKeyId: "KEY_8f3a9b2d1c",
    message: "Transaction created successfully.",
    requestHeaders: { "Content-Type": "application/json", "X-Api-Version": "v1", Authorization: "Bearer ••••a1c2" },
    responseBodyPreview: '{ "status": "success", "transaction_id": "TXN_5021..." }',
  },
  {
    id: "mlog-2",
    requestId: "REQ_5b4a3c2d1e",
    timestamp: "May 12, 2025 10:30:08 AM",
    level: "Warning",
    method: "POST",
    endpoint: "/api/v1/card/payment",
    statusCode: 400,
    responseTimeMs: 310,
    ipAddress: "203.0.113.25",
    apiKeyId: "KEY_5d6e7f1a9b",
    message: "Validation failed: missing required field 'card_token'.",
    requestHeaders: { "Content-Type": "application/json", "X-Api-Version": "v1" },
    responseBodyPreview: '{ "error": "validation_error", "field": "card_token" }',
  },
  {
    id: "mlog-3",
    requestId: "REQ_1a2b3c4d5e",
    timestamp: "May 12, 2025 10:30:04 AM",
    level: "Error",
    method: "POST",
    endpoint: "/api/v1/banks/payout",
    statusCode: 500,
    responseTimeMs: 890,
    ipAddress: "198.51.100.14",
    apiKeyId: "KEY_7c2b4e9a3f",
    message: "Upstream banking partner timeout while processing payout.",
    requestHeaders: { "Content-Type": "application/json", "X-Api-Version": "v1" },
    responseBodyPreview: '{ "error": "upstream_timeout", "retry_after": 30 }',
  },
  {
    id: "mlog-4",
    requestId: "REQ_3c2d1e9f8a",
    timestamp: "May 12, 2025 10:29:55 AM",
    level: "Critical",
    method: "POST",
    endpoint: "/api/v1/aml/screen",
    statusCode: 503,
    responseTimeMs: 5200,
    ipAddress: "10.0.4.12",
    apiKeyId: "KEY_4f6a8b0c2d",
    message: "AML screening service unreachable after 3 retries.",
    requestHeaders: { "Content-Type": "application/json", "X-Api-Version": "v1" },
    responseBodyPreview: '{ "error": "service_unavailable" }',
  },
  {
    id: "mlog-5",
    requestId: "REQ_7e6d5c4b3a",
    timestamp: "May 12, 2025 10:29:48 AM",
    level: "Info",
    method: "GET",
    endpoint: "/api/v1/transactions/12345",
    statusCode: 200,
    responseTimeMs: 120,
    ipAddress: "192.168.1.22",
    apiKeyId: "KEY_8f3a9b2d1c",
    message: "Transaction fetched successfully.",
    requestHeaders: { "Content-Type": "application/json", "X-Api-Version": "v1" },
    responseBodyPreview: '{ "status": "completed", "amount": 250.00 }',
  },
  {
    id: "mlog-6",
    requestId: "REQ_2d1c3b4a5f",
    timestamp: "May 12, 2025 10:29:40 AM",
    level: "Info",
    method: "GET",
    endpoint: "/api/v1/reports/summary",
    statusCode: 200,
    responseTimeMs: 180,
    ipAddress: "192.168.1.78",
    apiKeyId: "KEY_2a4b6c8d3e",
    message: "Report summary generated.",
    requestHeaders: { "Content-Type": "application/json", "X-Api-Version": "v1" },
    responseBodyPreview: '{ "total_transactions": 24568, "success_rate": 91.2 }',
  },
  {
    id: "mlog-7",
    requestId: "REQ_6f5e4d3c2b",
    timestamp: "May 12, 2025 10:29:31 AM",
    level: "Warning",
    method: "GET",
    endpoint: "/api/v1/customers",
    statusCode: 429,
    responseTimeMs: 45,
    ipAddress: "203.0.113.88",
    apiKeyId: "KEY_9b1c3d5e7f",
    message: "Rate limit exceeded for this API key.",
    requestHeaders: { "Content-Type": "application/json", "X-Api-Version": "v1" },
    responseBodyPreview: '{ "error": "rate_limit_exceeded", "retry_after": 12 }',
  },
  {
    id: "mlog-8",
    requestId: "REQ_8a9b0c1d2e",
    timestamp: "May 12, 2025 10:29:22 AM",
    level: "Error",
    method: "POST",
    endpoint: "/api/v1/auth/login",
    statusCode: 401,
    responseTimeMs: 88,
    ipAddress: "203.0.113.91",
    apiKeyId: "KEY_3c5e7a9b1d",
    message: "Authentication failed: invalid credentials.",
    requestHeaders: { "Content-Type": "application/json", "X-Api-Version": "v1" },
    responseBodyPreview: '{ "error": "invalid_credentials" }',
  },
  {
    id: "mlog-9",
    requestId: "REQ_4d5e6f7a8b",
    timestamp: "May 12, 2025 10:29:15 AM",
    level: "Info",
    method: "GET",
    endpoint: "/api/v1/agents",
    statusCode: 200,
    responseTimeMs: 140,
    ipAddress: "192.168.1.31",
    apiKeyId: "KEY_9b1c3d5e7f",
    message: "Agent list fetched successfully.",
    requestHeaders: { "Content-Type": "application/json", "X-Api-Version": "v1" },
    responseBodyPreview: '{ "agents_count": 142 }',
  },
  {
    id: "mlog-10",
    requestId: "REQ_0e1f2a3b4c",
    timestamp: "May 12, 2025 10:29:02 AM",
    level: "Critical",
    method: "PUT",
    endpoint: "/api/v1/transactions/status",
    statusCode: 500,
    responseTimeMs: 1340,
    ipAddress: "10.0.4.19",
    apiKeyId: "KEY_8f3a9b2d1c",
    message: "Database deadlock detected while updating transaction status.",
    requestHeaders: { "Content-Type": "application/json", "X-Api-Version": "v1" },
    responseBodyPreview: '{ "error": "internal_server_error" }',
  },
];

export const monitorLogsTotalCount = 84210;

// ---------- Active alerts ----------

export type MonitorAlertSeverity = "Warning" | "Critical";

export interface MonitorAlert {
  id: string;
  title: string;
  description: string;
  severity: MonitorAlertSeverity;
  triggeredAt: string;
}

export const monitorAlertsData: MonitorAlert[] = [
  {
    id: "alert-1",
    title: "Elevated error rate on AML screening",
    description: "Error rate for /api/v1/aml/screen has exceeded 15% over the last 10 minutes.",
    severity: "Critical",
    triggeredAt: "5 minutes ago",
  },
  {
    id: "alert-2",
    title: "High response time on payout endpoint",
    description: "Average response time for /api/v1/banks/payout is above 800ms.",
    severity: "Warning",
    triggeredAt: "18 minutes ago",
  },
  {
    id: "alert-3",
    title: "Repeated 429s from a single API key",
    description: "KEY_9b1c3d5e7f has triggered rate limit responses 40+ times in the last hour.",
    severity: "Warning",
    triggeredAt: "42 minutes ago",
  },
];





// ============================================================
// API SECURITY SETTINGS — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type ApiSecurityTabId = "General" | "Authentication" | "IP Access" | "Webhook Security" | "Audit & Compliance";

export const apiSecurityTabs: ApiSecurityTabId[] = ["General", "Authentication", "IP Access", "Webhook Security", "Audit & Compliance"];

// ---------- General security toggles ----------

export interface ApiSecurityToggleSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  critical?: boolean; // if true, disabling shows extra warning
}

export const apiSecurityGeneralSettings: ApiSecurityToggleSetting[] = [
  {
    id: "force-https",
    label: "Enforce HTTPS Only",
    description: "Reject any API request that does not use TLS encryption.",
    enabled: true,
    critical: true,
  },
  {
    id: "cors-restrict",
    label: "Restrict CORS to Allowed Origins",
    description: "Only allow cross-origin requests from explicitly whitelisted domains.",
    enabled: true,
  },
  {
    id: "hide-server-headers",
    label: "Hide Server Identification Headers",
    description: "Strip framework and server version headers from API responses.",
    enabled: true,
  },
  {
    id: "auto-block-suspicious",
    label: "Auto-block Suspicious Traffic Patterns",
    description: "Automatically block IPs that exhibit credential stuffing or scraping patterns.",
    enabled: false,
  },
];

export const apiSecurityAllowedOrigins: string[] = [
  "https://app.fintrack.io",
  "https://admin.fintrack.io",
  "https://partner.bankco.com",
];

// ---------- Authentication settings ----------

export interface ApiSecurityAuthSettings {
  accessTokenExpiryMinutes: number;
  refreshTokenExpiryDays: number;
  rotateRefreshTokens: boolean;
  requireRequestSigning: boolean;
  signatureAlgorithm: "HMAC-SHA256" | "HMAC-SHA512" | "RSA-SHA256";
  require2faForKeyGeneration: boolean;
  maxFailedAuthAttempts: number;
}

export const apiSecurityAuthDefaults: ApiSecurityAuthSettings = {
  accessTokenExpiryMinutes: 60,
  refreshTokenExpiryDays: 30,
  rotateRefreshTokens: true,
  requireRequestSigning: false,
  signatureAlgorithm: "HMAC-SHA256",
  require2faForKeyGeneration: true,
  maxFailedAuthAttempts: 5,
};

export const apiSecuritySignatureAlgorithmOptions: ApiSecurityAuthSettings["signatureAlgorithm"][] = [
  "HMAC-SHA256",
  "HMAC-SHA512",
  "RSA-SHA256",
];

// ---------- IP access control ----------

export interface ApiSecurityIpRule {
  id: string;
  label: string;
  ipRange: string;
  appliesTo: string; // e.g. "All Keys" or a specific key name
  addedAt: string;
}

export interface ApiSecurityIpSettings {
  enforceAllowlist: boolean;
  blockUnknownIps: boolean;
}

export const apiSecurityIpSettingsDefaults: ApiSecurityIpSettings = {
  enforceAllowlist: false,
  blockUnknownIps: true,
};

export const apiSecurityIpAllowlist: ApiSecurityIpRule[] = [
  { id: "ip-1", label: "HQ Office Network", ipRange: "203.0.113.0/24", appliesTo: "All Keys", addedAt: "Jan 15, 2025" },
  { id: "ip-2", label: "Banking Partner VPN", ipRange: "198.51.100.14/32", appliesTo: "Banking Integration", addedAt: "Mar 2, 2025" },
  { id: "ip-3", label: "DevOps Bastion Host", ipRange: "10.0.4.0/28", appliesTo: "All Keys", addedAt: "Apr 9, 2025" },
];

// ---------- Webhook security ----------

export interface ApiSecurityWebhookSettings {
  signPayloads: boolean;
  verifyTlsCertificates: boolean;
  autoRotateSecretsDays: number;
  retryOnFailure: boolean;
}

export const apiSecurityWebhookDefaults: ApiSecurityWebhookSettings = {
  signPayloads: true,
  verifyTlsCertificates: true,
  autoRotateSecretsDays: 90,
  retryOnFailure: true,
};

export const apiSecurityRotationDaysOptions: number[] = [30, 60, 90, 180, 365];

// ---------- Audit & compliance ----------

export interface ApiSecurityAuditSettings {
  logRetentionDays: number;
  maskPiiInLogs: boolean;
  logFullRequestBody: boolean;
  notifyOnKeyRevocation: boolean;
}

export const apiSecurityAuditDefaults: ApiSecurityAuditSettings = {
  logRetentionDays: 180,
  maskPiiInLogs: true,
  logFullRequestBody: false,
  notifyOnKeyRevocation: true,
};

export const apiSecurityRetentionDaysOptions: number[] = [30, 90, 180, 365, 730];

// ---------- Recent security events (read-only feed) ----------

export type ApiSecurityEventSeverity = "Info" | "Warning" | "Critical";

export interface ApiSecurityEvent {
  id: string;
  message: string;
  severity: ApiSecurityEventSeverity;
  timestamp: string;
}

export const apiSecurityEventBadge: Record<ApiSecurityEventSeverity, string> = {
  Info: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Warning: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Critical: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const apiSecurityRecentEvents: ApiSecurityEvent[] = [
  { id: "sec-ev-1", message: "Request signing requirement disabled by Admin Rahman", severity: "Warning", timestamp: "2 hours ago" },
  { id: "sec-ev-2", message: "Webhook signing secret auto-rotated for 4 endpoints", severity: "Info", timestamp: "6 hours ago" },
  { id: "sec-ev-3", message: "5 consecutive failed auth attempts from 203.0.113.91 — temporarily blocked", severity: "Critical", timestamp: "Yesterday" },
  { id: "sec-ev-4", message: "New IP range added to allowlist: 10.0.4.0/28", severity: "Info", timestamp: "2 days ago" },
];













// ============================================================
// SANDBOX / PRODUCTION — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type EnvManagerEnvironment = "Production" | "Sandbox";
export type EnvManagerHealthStatus = "Operational" | "Degraded" | "Maintenance";

export interface EnvManagerSnapshot {
  id: string;
  environment: EnvManagerEnvironment;
  baseUrl: string;
  health: EnvManagerHealthStatus;
  uptime: string;
  activeKeys: number;
  activeWebhooks: number;
  requestsToday: number;
  avgResponseMs: number;
  lastDeployedAt: string;
  versionTag: string;
  maintenanceMode: boolean;
}

// ---------- Badge style maps ----------

export const envManagerHealthBadge: Record<EnvManagerHealthStatus, string> = {
  Operational: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Degraded: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Maintenance: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export const envManagerHealthDot: Record<EnvManagerHealthStatus, string> = {
  Operational: "bg-green-500",
  Degraded: "bg-amber-500",
  Maintenance: "bg-slate-400",
};

export const envManagerEnvBadge: Record<EnvManagerEnvironment, string> = {
  Production: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Sandbox: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
};

// ---------- Environment snapshots ----------

export const envManagerSnapshots: EnvManagerSnapshot[] = [
  {
    id: "env-snap-prod",
    environment: "Production",
    baseUrl: "https://api.fintrack.io/v1",
    health: "Operational",
    uptime: "99.98%",
    activeKeys: 52,
    activeWebhooks: 12,
    requestsToday: 128568,
    avgResponseMs: 245,
    lastDeployedAt: "May 10, 2025 — 2:14 PM",
    versionTag: "v1.8.2",
    maintenanceMode: false,
  },
  {
    id: "env-snap-sandbox",
    environment: "Sandbox",
    baseUrl: "https://sandbox-api.fintrack.io/v1",
    health: "Operational",
    uptime: "99.12%",
    activeKeys: 34,
    activeWebhooks: 4,
    requestsToday: 3820,
    avgResponseMs: 310,
    lastDeployedAt: "May 12, 2025 — 9:02 AM",
    versionTag: "v1.9.0-rc.3",
    maintenanceMode: false,
  },
];

// ---------- Config / feature flag differences between environments ----------

export type EnvManagerFlagState = "On" | "Off" | "Partial";

export interface EnvManagerConfigDiff {
  id: string;
  key: string;
  description: string;
  productionValue: string;
  sandboxValue: string;
  isDifferent: boolean;
}

export const envManagerConfigDiffs: EnvManagerConfigDiff[] = [
  {
    id: "cfg-1",
    key: "rate_limit_default",
    description: "Default per-key rate limit applied when no custom rule exists.",
    productionValue: "100/min",
    sandboxValue: "300/min",
    isDifferent: true,
  },
  {
    id: "cfg-2",
    key: "webhook_retry_attempts",
    description: "Number of automatic retry attempts for failed webhook deliveries.",
    productionValue: "5",
    sandboxValue: "5",
    isDifferent: false,
  },
  {
    id: "cfg-3",
    key: "require_request_signing",
    description: "Whether incoming requests must include a valid HMAC signature.",
    productionValue: "Enabled",
    sandboxValue: "Disabled",
    isDifferent: true,
  },
  {
    id: "cfg-4",
    key: "transaction_amount_cap",
    description: "Maximum transaction amount allowed per request.",
    productionValue: "$50,000",
    sandboxValue: "Unlimited",
    isDifferent: true,
  },
  {
    id: "cfg-5",
    key: "log_retention_days",
    description: "Number of days request logs are retained.",
    productionValue: "180 days",
    sandboxValue: "30 days",
    isDifferent: true,
  },
  {
    id: "cfg-6",
    key: "card_payment_provider",
    description: "Payment processor used for card transactions.",
    productionValue: "Stripe (live)",
    sandboxValue: "Stripe (test)",
    isDifferent: true,
  },
];

// ---------- Pending changes ready to promote from Sandbox → Production ----------

export type EnvManagerChangeType = "Endpoint" | "Scope" | "Webhook" | "Config";

export interface EnvManagerPendingChange {
  id: string;
  type: EnvManagerChangeType;
  label: string;
  detail: string;
  testedInSandbox: boolean;
}

export const envManagerPendingChanges: EnvManagerPendingChange[] = [
  {
    id: "chg-1",
    type: "Endpoint",
    label: "POST /api/v2/transactions/bulk-create",
    detail: "New bulk transaction creation endpoint, currently Beta in sandbox.",
    testedInSandbox: true,
  },
  {
    id: "chg-2",
    type: "Webhook",
    label: "Instant Settlement Notifier",
    detail: "New webhook for the v2 instant settlement flow.",
    testedInSandbox: true,
  },
  {
    id: "chg-3",
    type: "Scope",
    label: "payments:instant-settle",
    detail: "New scope required for the instant settlement endpoint.",
    testedInSandbox: false,
  },
  {
    id: "chg-4",
    type: "Config",
    label: "webhook_retry_attempts → 7",
    detail: "Proposed increase to webhook retry attempts after sandbox testing.",
    testedInSandbox: true,
  },
];

export const envManagerChangeTypeBadge: Record<EnvManagerChangeType, string> = {
  Endpoint: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  Scope: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  Webhook: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  Config: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
};









// ============================================================
// THIRD PARTY SERVICES — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type ThirdPartyCategory = "Payments" | "Messaging" | "Identity Verification" | "Storage" | "Analytics" | "Banking";
export type ThirdPartyStatus = "Connected" | "Disconnected" | "Error";

export interface ThirdPartyCredentialField {
  key: string;
  label: string;
  valuePreview: string; // masked
  valueFull: string;
}

export interface ThirdPartyService {
  id: string;
  name: string;
  provider: string;
  category: ThirdPartyCategory;
  description: string;
  status: ThirdPartyStatus;
  lastSynced: string;
  monthlyUsage: number;
  monthlyUsageLabel: string; // e.g. "12,480 calls"
  iconLetter: string;
  iconColor: string; // tailwind bg/text classes
  credentials: ThirdPartyCredentialField[];
  docsUrl: string;
}

// ---------- Badge style maps ----------

export const thirdPartyStatusBadge: Record<ThirdPartyStatus, string> = {
  Connected: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Disconnected: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  Error: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const thirdPartyStatusDot: Record<ThirdPartyStatus, string> = {
  Connected: "bg-green-500",
  Disconnected: "bg-slate-400",
  Error: "bg-red-500",
};

export const thirdPartyCategoryColor: Record<ThirdPartyCategory, string> = {
  Payments: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  Messaging: "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
  "Identity Verification": "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  Storage: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  Analytics: "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",
  Banking: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
};

export const thirdPartyCategoryOptions: ThirdPartyCategory[] = [
  "Payments",
  "Messaging",
  "Identity Verification",
  "Storage",
  "Analytics",
  "Banking",
];

// ---------- Stat summary ----------

export interface ThirdPartyStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "connected" | "error" | "categories";
}

export const thirdPartyStats: ThirdPartyStat[] = [
  { id: "tp-stat-total", label: "Total Integrations", value: "9", icon: "total" },
  { id: "tp-stat-connected", label: "Connected", value: "7", icon: "connected" },
  { id: "tp-stat-error", label: "Errors", value: "1", icon: "error" },
  { id: "tp-stat-categories", label: "Categories", value: "6", icon: "categories" },
];

// ---------- Main data ----------

export const thirdPartyServicesData: ThirdPartyService[] = [
  {
    id: "tp-1",
    name: "Stripe",
    provider: "Stripe Inc.",
    category: "Payments",
    description: "Card payment processing and instant settlement.",
    status: "Connected",
    lastSynced: "2 minutes ago",
    monthlyUsage: 82,
    monthlyUsageLabel: "31,290 calls",
    iconLetter: "S",
    iconColor: "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    credentials: [
      { key: "publishable_key", label: "Publishable Key", valuePreview: "pk_live_••••••••a1c2", valueFull: "pk_live_51H8f3a9b2d1c4e7f6a9b0c1d2e3f4a5a1c2" },
      { key: "secret_key", label: "Secret Key", valuePreview: "sk_live_••••••••9f3a", valueFull: "sk_live_51H7c2b4e9a3f6d8e1a2b3c4d5e6f7a8b9f3a" },
    ],
    docsUrl: "https://stripe.com/docs/api",
  },
  {
    id: "tp-2",
    name: "Twilio",
    provider: "Twilio Inc.",
    category: "Messaging",
    description: "SMS and voice notifications for OTPs and transaction alerts.",
    status: "Connected",
    lastSynced: "10 minutes ago",
    monthlyUsage: 64,
    monthlyUsageLabel: "48,210 messages",
    iconLetter: "T",
    iconColor: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    credentials: [
      { key: "account_sid", label: "Account SID", valuePreview: "AC••••••••••••7b21", valueFull: "AC5d6e7f1a9b3c4d5e6f7a8b9c0d1e2f3a4b7b21" },
      { key: "auth_token", label: "Auth Token", valuePreview: "••••••••••••4d8e", valueFull: "2a4b6c8d3e5f6a7b8c9d0e1f2a3b4c5d6e7f4d8e" },
    ],
    docsUrl: "https://www.twilio.com/docs",
  },
  {
    id: "tp-3",
    name: "Plaid",
    provider: "Plaid Inc.",
    category: "Banking",
    description: "Bank account linking and balance verification for payouts.",
    status: "Connected",
    lastSynced: "5 minutes ago",
    monthlyUsage: 45,
    monthlyUsageLabel: "9,650 link calls",
    iconLetter: "P",
    iconColor: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    credentials: [
      { key: "client_id", label: "Client ID", valuePreview: "plaid_••••••••c3f1", valueFull: "plaid_1e3f5a7b9c2d4e6f8a0b1c2d3e4f5a6b7c8dc3f1" },
      { key: "secret", label: "Secret", valuePreview: "••••••••••••b5e9", valueFull: "9b1c3d5e7f1a2b3c4d5e6f7a8b9c0d1e2f3ab5e9" },
    ],
    docsUrl: "https://plaid.com/docs",
  },
  {
    id: "tp-4",
    name: "Onfido",
    provider: "Onfido Ltd.",
    category: "Identity Verification",
    description: "KYC document verification and facial biometric matching.",
    status: "Connected",
    lastSynced: "1 hour ago",
    monthlyUsage: 38,
    monthlyUsageLabel: "2,140 verifications",
    iconLetter: "O",
    iconColor: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    credentials: [
      { key: "api_token", label: "API Token", valuePreview: "onf_••••••••e0a4", valueFull: "onf_4f6a8b0c2d3e4f5a6b7c8d9e0f1a2b3c4d5ee0a4" },
    ],
    docsUrl: "https://documentation.onfido.com",
  },
  {
    id: "tp-5",
    name: "Amazon S3",
    provider: "Amazon Web Services",
    category: "Storage",
    description: "Object storage for KYC documents, receipts, and report exports.",
    status: "Connected",
    lastSynced: "20 minutes ago",
    monthlyUsage: 56,
    monthlyUsageLabel: "1.2 TB stored",
    iconLetter: "A",
    iconColor: "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    credentials: [
      { key: "access_key_id", label: "Access Key ID", valuePreview: "AKIA••••••••d7c6", valueFull: "AKIA3C5E7A9B1D2E3F4A5B6C7D8E9F0A1B2Cd7c6" },
      { key: "secret_access_key", label: "Secret Access Key", valuePreview: "••••••••••••f2a8", valueFull: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEf2a8" },
    ],
    docsUrl: "https://docs.aws.amazon.com/s3",
  },
  {
    id: "tp-6",
    name: "Segment",
    provider: "Twilio Segment",
    category: "Analytics",
    description: "Event tracking pipeline forwarding usage data to the analytics warehouse.",
    status: "Connected",
    lastSynced: "30 minutes ago",
    monthlyUsage: 71,
    monthlyUsageLabel: "892,400 events",
    iconLetter: "Sg",
    iconColor: "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400",
    credentials: [
      { key: "write_key", label: "Write Key", valuePreview: "seg_••••••••9c3a", valueFull: "seg_7c2b4e9a3f6d8e1a2b3c4d5e6f7a8b9c0d1e9c3a" },
    ],
    docsUrl: "https://segment.com/docs",
  },
  {
    id: "tp-7",
    name: "SendGrid",
    provider: "Twilio SendGrid",
    category: "Messaging",
    description: "Transactional email delivery for receipts and account notifications.",
    status: "Connected",
    lastSynced: "8 minutes ago",
    monthlyUsage: 33,
    monthlyUsageLabel: "62,180 emails",
    iconLetter: "Sg",
    iconColor: "bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
    credentials: [
      { key: "api_key", label: "API Key", valuePreview: "SG.••••••••b9a1", valueFull: "SG.8f3a9b2d1c4e7f6a9b0c1d2e3f4a5b6c7d8eb9a1" },
    ],
    docsUrl: "https://docs.sendgrid.com",
  },
  {
    id: "tp-8",
    name: "ComplyAdvantage",
    provider: "ComplyAdvantage Ltd.",
    category: "Identity Verification",
    description: "Real-time AML and sanctions list screening for customer onboarding.",
    status: "Error",
    lastSynced: "27 minutes ago",
    monthlyUsage: 18,
    monthlyUsageLabel: "980 screenings",
    iconLetter: "C",
    iconColor: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    credentials: [
      { key: "api_key", label: "API Key", valuePreview: "ca_••••••••e0a4", valueFull: "ca_4f6a8b0c2d3e4f5a6b7c8d9e0f1a2b3c4d5ee0a4" },
    ],
    docsUrl: "https://docs.complyadvantage.com",
  },
  {
    id: "tp-9",
    name: "Datadog",
    provider: "Datadog Inc.",
    category: "Analytics",
    description: "Infrastructure and application performance monitoring.",
    status: "Disconnected",
    lastSynced: "Never",
    monthlyUsage: 0,
    monthlyUsageLabel: "Not connected",
    iconLetter: "D",
    iconColor: "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    credentials: [
      { key: "api_key", label: "API Key", valuePreview: "Not configured", valueFull: "" },
    ],
    docsUrl: "https://docs.datadoghq.com",
  },
];

export const thirdPartyServicesTotalCount = thirdPartyServicesData.length;











// ============================================================
// CALLBACK URLS — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type CallbackUrlType = "OAuth Redirect" | "Success Redirect" | "Failure Redirect" | "Cancel Redirect";
export type CallbackUrlEnvironment = "Production" | "Sandbox";
export type CallbackUrlVerificationStatus = "Verified" | "Unverified" | "Failed";

export interface CallbackUrlRecord {
  id: string;
  url: string;
  label: string;
  type: CallbackUrlType;
  associatedKeyId: string;
  associatedKeyName: string;
  environment: CallbackUrlEnvironment;
  verificationStatus: CallbackUrlVerificationStatus;
  isDefault: boolean;
  lastVerifiedAt: string;
  createdAt: string;
}

// ---------- Badge style maps ----------

export const callbackUrlTypeBadge: Record<CallbackUrlType, string> = {
  "OAuth Redirect": "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  "Success Redirect": "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  "Failure Redirect": "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  "Cancel Redirect": "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export const callbackUrlVerificationBadge: Record<CallbackUrlVerificationStatus, string> = {
  Verified: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Unverified: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Failed: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const callbackUrlVerificationDot: Record<CallbackUrlVerificationStatus, string> = {
  Verified: "bg-green-500",
  Unverified: "bg-amber-500",
  Failed: "bg-red-500",
};

export const callbackUrlEnvBadge: Record<CallbackUrlEnvironment, string> = {
  Production: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Sandbox: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
};

export const callbackUrlTypeOptions: CallbackUrlType[] = ["OAuth Redirect", "Success Redirect", "Failure Redirect", "Cancel Redirect"];
export const callbackUrlEnvOptions: CallbackUrlEnvironment[] = ["Production", "Sandbox"];

// ---------- Available keys (for create/edit form dropdown) ----------

export const callbackUrlAvailableKeys: { id: string; name: string }[] = [
  { id: "KEY_8f3a9b2d1c", name: "Transaction Service" },
  { id: "KEY_7c2b4e9a3f", name: "Banking Integration" },
  { id: "KEY_5d6e7f1a9b", name: "Card Payment Gateway" },
  { id: "KEY_2a4b6c8d3e", name: "Reports Service" },
  { id: "KEY_9b1c3d5e7f", name: "Agent Mobile App" },
];

// ---------- Stat summary ----------

export interface CallbackUrlStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "verified" | "unverified" | "apps";
}

export const callbackUrlStats: CallbackUrlStat[] = [
  { id: "cb-stat-total", label: "Total Callback URLs", value: "11", icon: "total" },
  { id: "cb-stat-verified", label: "Verified", value: "8", icon: "verified" },
  { id: "cb-stat-unverified", label: "Unverified", value: "2", icon: "unverified" },
  { id: "cb-stat-apps", label: "Apps Using Callbacks", value: "5", icon: "apps" },
];

// ---------- Main data ----------

export const callbackUrlsData: CallbackUrlRecord[] = [
  {
    id: "cb-1",
    url: "https://app.fintrack.io/oauth/callback",
    label: "Main App OAuth Callback",
    type: "OAuth Redirect",
    associatedKeyId: "KEY_8f3a9b2d1c",
    associatedKeyName: "Transaction Service",
    environment: "Production",
    verificationStatus: "Verified",
    isDefault: true,
    lastVerifiedAt: "2 days ago",
    createdAt: "Mar 1, 2025",
  },
  {
    id: "cb-2",
    url: "https://app.fintrack.io/payment/success",
    label: "Payment Success Redirect",
    type: "Success Redirect",
    associatedKeyId: "KEY_5d6e7f1a9b",
    associatedKeyName: "Card Payment Gateway",
    environment: "Production",
    verificationStatus: "Verified",
    isDefault: true,
    lastVerifiedAt: "5 days ago",
    createdAt: "Mar 1, 2025",
  },
  {
    id: "cb-3",
    url: "https://app.fintrack.io/payment/failure",
    label: "Payment Failure Redirect",
    type: "Failure Redirect",
    associatedKeyId: "KEY_5d6e7f1a9b",
    associatedKeyName: "Card Payment Gateway",
    environment: "Production",
    verificationStatus: "Verified",
    isDefault: true,
    lastVerifiedAt: "5 days ago",
    createdAt: "Mar 1, 2025",
  },
  {
    id: "cb-4",
    url: "https://app.fintrack.io/payment/cancel",
    label: "Payment Cancel Redirect",
    type: "Cancel Redirect",
    associatedKeyId: "KEY_5d6e7f1a9b",
    associatedKeyName: "Card Payment Gateway",
    environment: "Production",
    verificationStatus: "Verified",
    isDefault: false,
    lastVerifiedAt: "5 days ago",
    createdAt: "Mar 1, 2025",
  },
  {
    id: "cb-5",
    url: "https://partner.bankco.com/oauth/redirect",
    label: "Banking Partner OAuth",
    type: "OAuth Redirect",
    associatedKeyId: "KEY_7c2b4e9a3f",
    associatedKeyName: "Banking Integration",
    environment: "Production",
    verificationStatus: "Verified",
    isDefault: false,
    lastVerifiedAt: "1 week ago",
    createdAt: "Feb 20, 2025",
  },
  {
    id: "cb-6",
    url: "https://app.fintrack.io/reports/export-complete",
    label: "Report Export Complete",
    type: "Success Redirect",
    associatedKeyId: "KEY_2a4b6c8d3e",
    associatedKeyName: "Reports Service",
    environment: "Sandbox",
    verificationStatus: "Verified",
    isDefault: false,
    lastVerifiedAt: "3 days ago",
    createdAt: "Apr 5, 2025",
  },
  {
    id: "cb-7",
    url: "https://agents.fintrack.io/pickup/confirmed",
    label: "Agent Pickup Confirmation",
    type: "Success Redirect",
    associatedKeyId: "KEY_9b1c3d5e7f",
    associatedKeyName: "Agent Mobile App",
    environment: "Production",
    verificationStatus: "Verified",
    isDefault: true,
    lastVerifiedAt: "1 day ago",
    createdAt: "May 3, 2025",
  },
  {
    id: "cb-8",
    url: "https://staging.fintrack.io/oauth/callback",
    label: "Staging OAuth Callback",
    type: "OAuth Redirect",
    associatedKeyId: "KEY_8f3a9b2d1c",
    associatedKeyName: "Transaction Service",
    environment: "Sandbox",
    verificationStatus: "Unverified",
    isDefault: false,
    lastVerifiedAt: "Never",
    createdAt: "May 14, 2025",
  },
  {
    id: "cb-9",
    url: "https://new-partner-app.example.com/callback",
    label: "New Partner Integration",
    type: "OAuth Redirect",
    associatedKeyId: "KEY_7c2b4e9a3f",
    associatedKeyName: "Banking Integration",
    environment: "Sandbox",
    verificationStatus: "Failed",
    isDefault: false,
    lastVerifiedAt: "6 hours ago",
    createdAt: "May 18, 2025",
  },
  {
    id: "cb-10",
    url: "https://app.fintrack.io/agents/pickup/cancel",
    label: "Agent Pickup Cancel Redirect",
    type: "Cancel Redirect",
    associatedKeyId: "KEY_9b1c3d5e7f",
    associatedKeyName: "Agent Mobile App",
    environment: "Production",
    verificationStatus: "Verified",
    isDefault: false,
    lastVerifiedAt: "1 day ago",
    createdAt: "May 3, 2025",
  },
  {
    id: "cb-11",
    url: "https://staging.fintrack.io/reports/export-failed",
    label: "Report Export Failed (Staging)",
    type: "Failure Redirect",
    associatedKeyId: "KEY_2a4b6c8d3e",
    associatedKeyName: "Reports Service",
    environment: "Sandbox",
    verificationStatus: "Unverified",
    isDefault: false,
    lastVerifiedAt: "Never",
    createdAt: "May 20, 2025",
  },
];

export const callbackUrlsTotalCount = callbackUrlsData.length;









// ============================================================
// EVENT SUBSCRIPTIONS — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type SubsEventCategory = "Transactions" | "Payouts" | "Cards" | "Customers" | "Compliance" | "Agents";
export type SubsChannel = "Webhook" | "Email" | "In-App";
export type SubsStatus = "Active" | "Paused";

export interface SubsEventDefinition {
  id: string;
  eventKey: string; // e.g. "transaction.completed"
  name: string;
  description: string;
  category: SubsEventCategory;
  subscriberCount: number;
}

export interface EventSubscriptionRecord {
  id: string;
  eventKey: string;
  eventName: string;
  subscriberId: string; // API key id or "admin-team"
  subscriberName: string;
  channel: SubsChannel;
  destination: string; // webhook URL, email address, or "Dashboard"
  status: SubsStatus;
  lastTriggered: string;
  createdAt: string;
}

// ---------- Badge style maps ----------

export const subsCategoryColor: Record<SubsEventCategory, string> = {
  Transactions: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  Payouts: "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
  Cards: "bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
  Customers: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  Compliance: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  Agents: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
};

export const subsChannelBadge: Record<SubsChannel, string> = {
  Webhook: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Email: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  "In-App": "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400",
};

export const subsStatusBadge: Record<SubsStatus, string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Paused: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export const subsStatusDot: Record<SubsStatus, string> = {
  Active: "bg-green-500",
  Paused: "bg-slate-400",
};

export const subsCategoryOptions: SubsEventCategory[] = ["Transactions", "Payouts", "Cards", "Customers", "Compliance", "Agents"];
export const subsChannelOptions: SubsChannel[] = ["Webhook", "Email", "In-App"];

// ---------- Available subscribers (for create form) ----------

export const subsAvailableSubscribers: { id: string; name: string }[] = [
  { id: "KEY_8f3a9b2d1c", name: "Transaction Service" },
  { id: "KEY_7c2b4e9a3f", name: "Banking Integration" },
  { id: "KEY_5d6e7f1a9b", name: "Card Payment Gateway" },
  { id: "KEY_2a4b6c8d3e", name: "Reports Service" },
  { id: "admin-team", name: "Admin Team (Dashboard)" },
  { id: "compliance-team", name: "Compliance Team" },
];

// ---------- Stat summary ----------

export interface SubsStat {
  id: string;
  label: string;
  value: string;
  icon: "events" | "active" | "subscribers" | "top";
}

export const subsStats: SubsStat[] = [
  { id: "subs-stat-events", label: "Available Events", value: "13", icon: "events" },
  { id: "subs-stat-active", label: "Active Subscriptions", value: "9", icon: "active" },
  { id: "subs-stat-subscribers", label: "Unique Subscribers", value: "6", icon: "subscribers" },
  { id: "subs-stat-top", label: "Most Subscribed Event", value: "transaction.completed", icon: "top" },
];

// ---------- Event catalog ----------

export const subsEventCatalog: SubsEventDefinition[] = [
  { id: "ev-1", eventKey: "transaction.created", name: "Transaction Created", description: "Fires when a new transaction is initiated.", category: "Transactions", subscriberCount: 3 },
  { id: "ev-2", eventKey: "transaction.completed", name: "Transaction Completed", description: "Fires when a transaction settles successfully.", category: "Transactions", subscriberCount: 4 },
  { id: "ev-3", eventKey: "transaction.failed", name: "Transaction Failed", description: "Fires when a transaction fails or is reversed.", category: "Transactions", subscriberCount: 2 },
  { id: "ev-4", eventKey: "payout.initiated", name: "Payout Initiated", description: "Fires when a payout batch begins processing.", category: "Payouts", subscriberCount: 2 },
  { id: "ev-5", eventKey: "payout.completed", name: "Payout Completed", description: "Fires when a payout batch finishes successfully.", category: "Payouts", subscriberCount: 2 },
  { id: "ev-6", eventKey: "card.payment.success", name: "Card Payment Success", description: "Fires when a card payment is authorized and captured.", category: "Cards", subscriberCount: 1 },
  { id: "ev-7", eventKey: "card.payment.failed", name: "Card Payment Failed", description: "Fires when a card payment is declined.", category: "Cards", subscriberCount: 1 },
  { id: "ev-8", eventKey: "customer.created", name: "Customer Created", description: "Fires when a new customer profile is created.", category: "Customers", subscriberCount: 1 },
  { id: "ev-9", eventKey: "customer.updated", name: "Customer Updated", description: "Fires when a customer profile is modified.", category: "Customers", subscriberCount: 1 },
  { id: "ev-10", eventKey: "aml.alert.created", name: "AML Alert Created", description: "Fires when a transaction is flagged for AML review.", category: "Compliance", subscriberCount: 2 },
  { id: "ev-11", eventKey: "kyc.verification.failed", name: "KYC Verification Failed", description: "Fires when an identity verification attempt fails.", category: "Compliance", subscriberCount: 1 },
  { id: "ev-12", eventKey: "pickup.assigned", name: "Pickup Assigned", description: "Fires when a cash-pickup transaction is assigned to an agent.", category: "Agents", subscriberCount: 1 },
  { id: "ev-13", eventKey: "pickup.approved", name: "Pickup Approved", description: "Fires when an agent confirms a cash pickup.", category: "Agents", subscriberCount: 1 },
];

// ---------- Active subscriptions ----------

export const eventSubscriptionsData: EventSubscriptionRecord[] = [
  {
    id: "sub-1",
    eventKey: "transaction.completed",
    eventName: "Transaction Completed",
    subscriberId: "KEY_8f3a9b2d1c",
    subscriberName: "Transaction Service",
    channel: "Webhook",
    destination: "https://hooks.fintrack.io/v1/transactions",
    status: "Active",
    lastTriggered: "2 minutes ago",
    createdAt: "Mar 2, 2025",
  },
  {
    id: "sub-2",
    eventKey: "transaction.created",
    eventName: "Transaction Created",
    subscriberId: "KEY_8f3a9b2d1c",
    subscriberName: "Transaction Service",
    channel: "Webhook",
    destination: "https://hooks.fintrack.io/v1/transactions",
    status: "Active",
    lastTriggered: "3 minutes ago",
    createdAt: "Mar 2, 2025",
  },
  {
    id: "sub-3",
    eventKey: "transaction.failed",
    eventName: "Transaction Failed",
    subscriberId: "admin-team",
    subscriberName: "Admin Team (Dashboard)",
    channel: "In-App",
    destination: "Dashboard Notifications",
    status: "Active",
    lastTriggered: "1 hour ago",
    createdAt: "Mar 4, 2025",
  },
  {
    id: "sub-4",
    eventKey: "payout.completed",
    eventName: "Payout Completed",
    subscriberId: "KEY_7c2b4e9a3f",
    subscriberName: "Banking Integration",
    channel: "Webhook",
    destination: "https://api.partnerbank.com/webhooks/payouts",
    status: "Active",
    lastTriggered: "8 minutes ago",
    createdAt: "Mar 5, 2025",
  },
  {
    id: "sub-5",
    eventKey: "payout.initiated",
    eventName: "Payout Initiated",
    subscriberId: "admin-team",
    subscriberName: "Admin Team (Dashboard)",
    channel: "Email",
    destination: "finance-ops@fintrack.io",
    status: "Active",
    lastTriggered: "8 minutes ago",
    createdAt: "Mar 5, 2025",
  },
  {
    id: "sub-6",
    eventKey: "card.payment.success",
    eventName: "Card Payment Success",
    subscriberId: "KEY_5d6e7f1a9b",
    subscriberName: "Card Payment Gateway",
    channel: "Webhook",
    destination: "https://receipts.fintrack.io/webhooks/cards",
    status: "Active",
    lastTriggered: "1 minute ago",
    createdAt: "Feb 27, 2025",
  },
  {
    id: "sub-7",
    eventKey: "aml.alert.created",
    eventName: "AML Alert Created",
    subscriberId: "compliance-team",
    subscriberName: "Compliance Team",
    channel: "Email",
    destination: "aml-alerts@fintrack.io",
    status: "Active",
    lastTriggered: "27 minutes ago",
    createdAt: "Apr 18, 2025",
  },
  {
    id: "sub-8",
    eventKey: "aml.alert.created",
    eventName: "AML Alert Created",
    subscriberId: "compliance-team",
    subscriberName: "Compliance Team",
    channel: "Webhook",
    destination: "https://compliance.fintrack.io/hooks/aml",
    status: "Active",
    lastTriggered: "27 minutes ago",
    createdAt: "Apr 18, 2025",
  },
  {
    id: "sub-9",
    eventKey: "pickup.assigned",
    eventName: "Pickup Assigned",
    subscriberId: "KEY_2a4b6c8d3e",
    subscriberName: "Reports Service",
    channel: "Webhook",
    destination: "https://dispatch.fintrack.io/hooks/pickup",
    status: "Active",
    lastTriggered: "4 minutes ago",
    createdAt: "Apr 5, 2025",
  },
  {
    id: "sub-10",
    eventKey: "kyc.verification.failed",
    eventName: "KYC Verification Failed",
    subscriberId: "compliance-team",
    subscriberName: "Compliance Team",
    channel: "In-App",
    destination: "Dashboard Notifications",
    status: "Paused",
    lastTriggered: "3 days ago",
    createdAt: "Apr 22, 2025",
  },
];

export const eventSubscriptionsTotalCount = eventSubscriptionsData.length;









// ============================================================
// API SETTINGS — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type ApiSettingsTabId = "General" | "Versioning" | "Response Defaults" | "Documentation";

export const apiSettingsTabs: ApiSettingsTabId[] = ["General", "Versioning", "Response Defaults", "Documentation"];

// ---------- General settings ----------

export interface ApiSettingsGeneral {
  platformName: string;
  supportEmail: string;
  defaultTimezone: string;
  defaultDateFormat: string;
  maintenanceBannerEnabled: boolean;
  maintenanceBannerMessage: string;
  publicStatusPageEnabled: boolean;
}

export const apiSettingsGeneralDefaults: ApiSettingsGeneral = {
  platformName: "FinTrack API Platform",
  supportEmail: "api-support@fintrack.io",
  defaultTimezone: "UTC",
  defaultDateFormat: "YYYY-MM-DD",
  maintenanceBannerEnabled: false,
  maintenanceBannerMessage: "Scheduled maintenance on May 20, 2025 from 2:00–4:00 AM UTC.",
  publicStatusPageEnabled: true,
};

export const apiSettingsTimezoneOptions: string[] = ["UTC", "Asia/Dhaka", "America/New_York", "Europe/London", "Asia/Singapore"];
export const apiSettingsDateFormatOptions: string[] = ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY", "DD MMM YYYY"];

// ---------- Versioning ----------

export type ApiVersionStatus = "Current" | "Supported" | "Deprecated" | "Sunset";

export interface ApiVersionRecord {
  id: string;
  version: string;
  status: ApiVersionStatus;
  releasedAt: string;
  sunsetDate: string | null;
  adoptionPercent: number;
}

export const apiSettingsVersionBadge: Record<ApiVersionStatus, string> = {
  Current: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Supported: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Deprecated: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Sunset: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const apiSettingsVersions: ApiVersionRecord[] = [
  { id: "ver-2", version: "v2", status: "Current", releasedAt: "Apr 15, 2025", sunsetDate: null, adoptionPercent: 18 },
  { id: "ver-1", version: "v1", status: "Supported", releasedAt: "Jan 1, 2024", sunsetDate: null, adoptionPercent: 79 },
  { id: "ver-0", version: "v0", status: "Deprecated", releasedAt: "Jun 1, 2023", sunsetDate: "Aug 1, 2025", adoptionPercent: 3 },
];

export interface ApiSettingsVersioningConfig {
  defaultVersion: string;
  enforceVersionHeader: boolean;
  deprecationNoticeDays: number;
}

export const apiSettingsVersioningDefaults: ApiSettingsVersioningConfig = {
  defaultVersion: "v2",
  enforceVersionHeader: true,
  deprecationNoticeDays: 90,
};

// ---------- Response defaults ----------

export type ApiSettingsResponseFormat = "JSON" | "XML";
export type ApiSettingsCasingStyle = "camelCase" | "snake_case";

export interface ApiSettingsResponseConfig {
  defaultFormat: ApiSettingsResponseFormat;
  casingStyle: ApiSettingsCasingStyle;
  defaultPageSize: number;
  maxPageSize: number;
  includeRequestIdHeader: boolean;
  prettyPrintJson: boolean;
}

export const apiSettingsResponseDefaults: ApiSettingsResponseConfig = {
  defaultFormat: "JSON",
  casingStyle: "snake_case",
  defaultPageSize: 25,
  maxPageSize: 250,
  includeRequestIdHeader: true,
  prettyPrintJson: false,
};

export const apiSettingsPageSizeOptions: number[] = [10, 25, 50, 100];
export const apiSettingsMaxPageSizeOptions: number[] = [100, 250, 500, 1000];

// ---------- Documentation ----------

export interface ApiSettingsDocumentation {
  docsUrl: string;
  changelogUrl: string;
  statusPageUrl: string;
  termsOfServiceUrl: string;
  supportPortalUrl: string;
  showCodeSamples: boolean;
  defaultCodeLanguage: string;
}

export const apiSettingsDocumentationDefaults: ApiSettingsDocumentation = {
  docsUrl: "https://docs.fintrack.io",
  changelogUrl: "https://docs.fintrack.io/changelog",
  statusPageUrl: "https://status.fintrack.io",
  termsOfServiceUrl: "https://fintrack.io/terms",
  supportPortalUrl: "https://support.fintrack.io",
  showCodeSamples: true,
  defaultCodeLanguage: "cURL",
};

export const apiSettingsCodeLanguageOptions: string[] = ["cURL", "Node.js", "Python", "PHP", "Java", "Go"];












// ============================================================
// GATEWAY SETTINGS — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type GatewaySettingsTabId = "General" | "Caching" | "Timeouts & Retries" | "Load Balancing";

export const gatewaySettingsTabs: GatewaySettingsTabId[] = ["General", "Caching", "Timeouts & Retries", "Load Balancing"];

// ---------- General ----------

export interface GatewayGeneralConfig {
  gatewayName: string;
  listenProtocol: "HTTPS" | "HTTP";
  maxRequestBodyMb: number;
  enableGzipCompression: boolean;
  enableRequestLogging: boolean;
  stripUpstreamHeaders: boolean;
}

export const gatewayGeneralDefaults: GatewayGeneralConfig = {
  gatewayName: "fintrack-api-gateway-primary",
  listenProtocol: "HTTPS",
  maxRequestBodyMb: 10,
  enableGzipCompression: true,
  enableRequestLogging: true,
  stripUpstreamHeaders: true,
};

export const gatewayMaxBodySizeOptions: number[] = [1, 5, 10, 25, 50, 100];

// ---------- Caching ----------

export interface GatewayCachingConfig {
  enableResponseCaching: boolean;
  defaultTtlSeconds: number;
  cacheByQueryParams: boolean;
  cacheableMethodsOnlyGet: boolean;
  bypassCacheHeader: string;
}

export const gatewayCachingDefaults: GatewayCachingConfig = {
  enableResponseCaching: true,
  defaultTtlSeconds: 60,
  cacheByQueryParams: true,
  cacheableMethodsOnlyGet: true,
  bypassCacheHeader: "X-Bypass-Cache",
};

export const gatewayTtlOptions: number[] = [10, 30, 60, 300, 900, 3600];

export interface GatewayCacheStat {
  id: string;
  label: string;
  value: string;
}

export const gatewayCacheStats: GatewayCacheStat[] = [
  { id: "cache-hit-rate", label: "Cache Hit Rate", value: "76.4%" },
  { id: "cache-size", label: "Current Cache Size", value: "1.4 GB" },
  { id: "cache-entries", label: "Cached Entries", value: "48,210" },
];

// ---------- Timeouts & Retries ----------

export interface GatewayTimeoutsConfig {
  connectTimeoutMs: number;
  readTimeoutMs: number;
  maxRetries: number;
  retryOnStatusCodes: string;
  circuitBreakerEnabled: boolean;
  circuitBreakerErrorThresholdPercent: number;
  circuitBreakerCooldownSeconds: number;
}

export const gatewayTimeoutsDefaults: GatewayTimeoutsConfig = {
  connectTimeoutMs: 3000,
  readTimeoutMs: 15000,
  maxRetries: 2,
  retryOnStatusCodes: "502, 503, 504",
  circuitBreakerEnabled: true,
  circuitBreakerErrorThresholdPercent: 50,
  circuitBreakerCooldownSeconds: 30,
};

// ---------- Load Balancing ----------

export type GatewayLbStrategy = "Round Robin" | "Least Connections" | "Weighted" | "IP Hash";
export type GatewayUpstreamHealth = "Healthy" | "Degraded" | "Down";

export interface GatewayUpstreamServer {
  id: string;
  host: string;
  weight: number;
  health: GatewayUpstreamHealth;
  activeConnections: number;
}

export const gatewayLbStrategyOptions: GatewayLbStrategy[] = ["Round Robin", "Least Connections", "Weighted", "IP Hash"];

export const gatewayUpstreamHealthBadge: Record<GatewayUpstreamHealth, string> = {
  Healthy: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Degraded: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Down: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const gatewayUpstreamHealthDot: Record<GatewayUpstreamHealth, string> = {
  Healthy: "bg-green-500",
  Degraded: "bg-amber-500",
  Down: "bg-red-500",
};

export const gatewayUpstreamServers: GatewayUpstreamServer[] = [
  { id: "up-1", host: "10.0.2.11:8080", weight: 50, health: "Healthy", activeConnections: 142 },
  { id: "up-2", host: "10.0.2.12:8080", weight: 30, health: "Healthy", activeConnections: 98 },
  { id: "up-3", host: "10.0.2.13:8080", weight: 20, health: "Degraded", activeConnections: 64 },
];

export interface GatewayLbConfig {
  strategy: GatewayLbStrategy;
  healthCheckIntervalSeconds: number;
  healthCheckPath: string;
}

export const gatewayLbDefaults: GatewayLbConfig = {
  strategy: "Weighted",
  healthCheckIntervalSeconds: 15,
  healthCheckPath: "/health",
};












// ============================================================
// IP WHITELIST — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type IpRuleAction = "Allow" | "Block";
export type IpRuleScope = "Global" | "API Key";
export type IpRuleStatus = "Active" | "Disabled";

export interface IpWhitelistRule {
  id: string;
  label: string;
  cidr: string;
  action: IpRuleAction;
  scope: IpRuleScope;
  scopedKeyName: string | null; // set when scope === "API Key"
  status: IpRuleStatus;
  hitsToday: number;
  lastMatched: string;
  expiresAt: string | null;
  createdAt: string;
}

// ---------- Badge style maps ----------

export const ipRuleActionBadge: Record<IpRuleAction, string> = {
  Allow: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Block: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const ipRuleStatusBadge: Record<IpRuleStatus, string> = {
  Active: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Disabled: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export const ipRuleStatusDot: Record<IpRuleStatus, string> = {
  Active: "bg-blue-500",
  Disabled: "bg-slate-400",
};

export const ipRuleScopeOptions: IpRuleScope[] = ["Global", "API Key"];
export const ipRuleActionOptions: IpRuleAction[] = ["Allow", "Block"];

export const ipRuleAvailableKeys: { id: string; name: string }[] = [
  { id: "KEY_8f3a9b2d1c", name: "Transaction Service" },
  { id: "KEY_7c2b4e9a3f", name: "Banking Integration" },
  { id: "KEY_5d6e7f1a9b", name: "Card Payment Gateway" },
  { id: "KEY_9b1c3d5e7f", name: "Agent Mobile App" },
];

// ---------- Stat summary ----------

export interface IpWhitelistStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "allow" | "block" | "blockedToday";
}

export const ipWhitelistStats: IpWhitelistStat[] = [
  { id: "ip-stat-total", label: "Total Rules", value: "12", icon: "total" },
  { id: "ip-stat-allow", label: "Allow Rules", value: "7", icon: "allow" },
  { id: "ip-stat-block", label: "Block Rules", value: "5", icon: "block" },
  { id: "ip-stat-blocked-today", label: "Requests Blocked Today", value: "284", icon: "blockedToday" },
];

// ---------- Main data ----------

export const ipWhitelistRulesData: IpWhitelistRule[] = [
  {
    id: "ipr-1",
    label: "HQ Office Network",
    cidr: "203.0.113.0/24",
    action: "Allow",
    scope: "Global",
    scopedKeyName: null,
    status: "Active",
    hitsToday: 4820,
    lastMatched: "1 minute ago",
    expiresAt: null,
    createdAt: "Jan 15, 2025",
  },
  {
    id: "ipr-2",
    label: "Banking Partner VPN",
    cidr: "198.51.100.14/32",
    action: "Allow",
    scope: "API Key",
    scopedKeyName: "Banking Integration",
    status: "Active",
    hitsToday: 1240,
    lastMatched: "8 minutes ago",
    expiresAt: null,
    createdAt: "Mar 2, 2025",
  },
  {
    id: "ipr-3",
    label: "DevOps Bastion Host",
    cidr: "10.0.4.0/28",
    action: "Allow",
    scope: "Global",
    scopedKeyName: null,
    status: "Active",
    hitsToday: 312,
    lastMatched: "4 minutes ago",
    expiresAt: null,
    createdAt: "Apr 9, 2025",
  },
  {
    id: "ipr-4",
    label: "Card Gateway Test Lab",
    cidr: "192.168.50.0/24",
    action: "Allow",
    scope: "API Key",
    scopedKeyName: "Card Payment Gateway",
    status: "Active",
    hitsToday: 96,
    lastMatched: "1 hour ago",
    expiresAt: "Aug 1, 2025",
    createdAt: "May 1, 2025",
  },
  {
    id: "ipr-5",
    label: "Agent Field Devices (BD)",
    cidr: "103.94.0.0/16",
    action: "Allow",
    scope: "API Key",
    scopedKeyName: "Agent Mobile App",
    status: "Active",
    hitsToday: 5620,
    lastMatched: "Just now",
    expiresAt: null,
    createdAt: "Mar 20, 2025",
  },
  {
    id: "ipr-6",
    label: "Known Credential Stuffing Range",
    cidr: "45.155.205.0/24",
    action: "Block",
    scope: "Global",
    scopedKeyName: null,
    status: "Active",
    hitsToday: 178,
    lastMatched: "12 minutes ago",
    expiresAt: null,
    createdAt: "Feb 11, 2025",
  },
  {
    id: "ipr-7",
    label: "Flagged Scraper Bot Network",
    cidr: "185.220.101.0/24",
    action: "Block",
    scope: "Global",
    scopedKeyName: null,
    status: "Active",
    hitsToday: 64,
    lastMatched: "2 hours ago",
    expiresAt: null,
    createdAt: "Apr 30, 2025",
  },
  {
    id: "ipr-8",
    label: "Suspicious Login Attempts (TOR exit)",
    cidr: "199.87.154.255/32",
    action: "Block",
    scope: "Global",
    scopedKeyName: null,
    status: "Active",
    hitsToday: 32,
    lastMatched: "Yesterday",
    expiresAt: "Jun 1, 2025",
    createdAt: "May 18, 2025",
  },
  {
    id: "ipr-9",
    label: "Former Contractor Range",
    cidr: "203.0.114.0/24",
    action: "Block",
    scope: "API Key",
    scopedKeyName: "Transaction Service",
    status: "Disabled",
    hitsToday: 0,
    lastMatched: "3 weeks ago",
    expiresAt: null,
    createdAt: "Jan 5, 2025",
  },
  {
    id: "ipr-10",
    label: "QA Load Test Range",
    cidr: "172.16.0.0/20",
    action: "Allow",
    scope: "API Key",
    scopedKeyName: "Transaction Service",
    status: "Disabled",
    hitsToday: 0,
    lastMatched: "2 months ago",
    expiresAt: null,
    createdAt: "Dec 1, 2024",
  },
];

export const ipWhitelistTotalCount = ipWhitelistRulesData.length;














// ============================================================
// ERROR CODES — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type ErrCodeCategory = "Authentication" | "Validation" | "Rate Limiting" | "Permissions" | "Server" | "Payment" | "Compliance";
export type ErrCodeStatusRange = "4xx" | "5xx";

export interface ApiErrorCodeRecord {
  id: string;
  errorCode: string; // e.g. "invalid_api_key"
  httpStatus: number;
  message: string;
  description: string;
  category: ErrCodeCategory;
  commonCauses: string[];
  resolution: string;
  isCustom: boolean;
}

// ---------- Badge style maps ----------

export const errCodeCategoryColor: Record<ErrCodeCategory, string> = {
  Authentication: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  Validation: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  "Rate Limiting": "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  Permissions: "bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400",
  Server: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  Payment: "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
  Compliance: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
};

export const errCodeStatusColor = (status: number): string => {
  if (status >= 500) return "text-red-600 dark:text-red-400";
  if (status >= 400) return "text-amber-600 dark:text-amber-400";
  return "text-slate-600 dark:text-slate-300";
};

export const errCodeStatusBadgeBg = (status: number): string => {
  if (status >= 500) return "bg-red-100 dark:bg-red-500/10";
  if (status >= 400) return "bg-amber-100 dark:bg-amber-500/10";
  return "bg-slate-100 dark:bg-slate-800";
};

export const errCodeCategoryOptions: ErrCodeCategory[] = [
  "Authentication",
  "Validation",
  "Rate Limiting",
  "Permissions",
  "Server",
  "Payment",
  "Compliance",
];

export const errCodeStatusOptions: number[] = [400, 401, 403, 404, 409, 422, 429, 500, 502, 503, 504];

// ---------- Stat summary ----------

export interface ErrCodeStat {
  id: string;
  label: string;
  value: string;
  icon: "total" | "client" | "server" | "custom";
}

export const errCodeStats: ErrCodeStat[] = [
  { id: "err-stat-total", label: "Total Error Codes", value: "18", icon: "total" },
  { id: "err-stat-client", label: "4xx Client Errors", value: "14", icon: "client" },
  { id: "err-stat-server", label: "5xx Server Errors", value: "4", icon: "server" },
  { id: "err-stat-custom", label: "Custom Codes", value: "2", icon: "custom" },
];

// ---------- Main data ----------

export const apiErrorCodesData: ApiErrorCodeRecord[] = [
  {
    id: "err-1",
    errorCode: "invalid_api_key",
    httpStatus: 401,
    message: "Invalid or missing API key.",
    description: "The request did not include a valid API key in the Authorization header.",
    category: "Authentication",
    commonCauses: ["API key was revoked or expired", "Wrong environment key used (sandbox key on production)", "Authorization header malformed"],
    resolution: "Verify the API key is active and matches the target environment. Regenerate the key if necessary.",
    isCustom: false,
  },
  {
    id: "err-2",
    errorCode: "invalid_credentials",
    httpStatus: 401,
    message: "Authentication failed: invalid credentials.",
    description: "The username/password or client credentials provided could not be verified.",
    category: "Authentication",
    commonCauses: ["Incorrect client secret", "Account locked after failed attempts"],
    resolution: "Confirm credentials are correct. Use the password reset flow if the account is locked.",
    isCustom: false,
  },
  {
    id: "err-3",
    errorCode: "token_expired",
    httpStatus: 401,
    message: "Access token has expired.",
    description: "The bearer token used for this request is no longer valid.",
    category: "Authentication",
    commonCauses: ["Token lifetime exceeded", "Clock drift between client and server"],
    resolution: "Use the refresh token to obtain a new access token.",
    isCustom: false,
  },
  {
    id: "err-4",
    errorCode: "validation_error",
    httpStatus: 422,
    message: "One or more fields failed validation.",
    description: "The request body contains fields that do not meet the required format or constraints.",
    category: "Validation",
    commonCauses: ["Missing required field", "Field value out of allowed range", "Incorrect data type"],
    resolution: "Check the `errors` array in the response for the specific field and constraint that failed.",
    isCustom: false,
  },
  {
    id: "err-5",
    errorCode: "missing_required_field",
    httpStatus: 400,
    message: "A required field is missing from the request.",
    description: "The request body is missing one or more fields marked as required in the endpoint schema.",
    category: "Validation",
    commonCauses: ["Field omitted from JSON body", "Field name misspelled"],
    resolution: "Compare the request payload against the endpoint's documented schema.",
    isCustom: false,
  },
  {
    id: "err-6",
    errorCode: "malformed_request",
    httpStatus: 400,
    message: "The request body could not be parsed.",
    description: "The request body is not valid JSON or does not match the expected content type.",
    category: "Validation",
    commonCauses: ["Invalid JSON syntax", "Wrong Content-Type header"],
    resolution: "Ensure the body is valid JSON and the Content-Type header is set to application/json.",
    isCustom: false,
  },
  {
    id: "err-7",
    errorCode: "rate_limit_exceeded",
    httpStatus: 429,
    message: "Rate limit exceeded for this API key.",
    description: "The number of requests from this API key has exceeded the configured rate limit window.",
    category: "Rate Limiting",
    commonCauses: ["Too many requests in a short period", "Missing client-side request throttling"],
    resolution: "Implement exponential backoff. Check the `Retry-After` header for the wait duration.",
    isCustom: false,
  },
  {
    id: "err-8",
    errorCode: "concurrent_request_limit",
    httpStatus: 429,
    message: "Too many concurrent requests.",
    description: "This API key has too many in-flight requests at once.",
    category: "Rate Limiting",
    commonCauses: ["Parallel batch processing without concurrency control"],
    resolution: "Limit concurrent requests per key, or request a higher concurrency allowance.",
    isCustom: false,
  },
  {
    id: "err-9",
    errorCode: "insufficient_scope",
    httpStatus: 403,
    message: "This API key does not have the required scope.",
    description: "The API key used does not include the scope needed to perform this action.",
    category: "Permissions",
    commonCauses: ["Key was issued with read-only access", "Scope was revoked after key creation"],
    resolution: "Request the required scope be added to the API key, or use a key with broader access.",
    isCustom: false,
  },
  {
    id: "err-10",
    errorCode: "resource_forbidden",
    httpStatus: 403,
    message: "Access to this resource is forbidden.",
    description: "The authenticated key does not own or have access to the requested resource.",
    category: "Permissions",
    commonCauses: ["Attempting to access another merchant's transaction", "Resource belongs to a different environment"],
    resolution: "Verify the resource ID belongs to your account and environment.",
    isCustom: false,
  },
  {
    id: "err-11",
    errorCode: "resource_not_found",
    httpStatus: 404,
    message: "The requested resource could not be found.",
    description: "No resource exists with the given identifier.",
    category: "Validation",
    commonCauses: ["Typo in resource ID", "Resource was deleted", "Wrong environment"],
    resolution: "Double check the ID and confirm you're querying the correct environment.",
    isCustom: false,
  },
  {
    id: "err-12",
    errorCode: "duplicate_request",
    httpStatus: 409,
    message: "A request with this idempotency key was already processed.",
    description: "The idempotency key provided matches a previous request that already completed.",
    category: "Validation",
    commonCauses: ["Client retried a request without changing the idempotency key", "Duplicate submission from UI double-click"],
    resolution: "Use a new idempotency key for genuinely new requests, or fetch the original result.",
    isCustom: false,
  },
  {
    id: "err-13",
    errorCode: "card_declined",
    httpStatus: 402,
    message: "The card was declined by the issuing bank.",
    description: "The card payment processor rejected the transaction.",
    category: "Payment",
    commonCauses: ["Insufficient funds", "Card flagged for fraud", "Incorrect CVV or expiry"],
    resolution: "Ask the customer to verify card details or use an alternative payment method.",
    isCustom: false,
  },
  {
    id: "err-14",
    errorCode: "transaction_amount_exceeds_limit",
    httpStatus: 422,
    message: "Transaction amount exceeds the configured limit.",
    description: "The requested transaction amount is above the maximum allowed for this account tier.",
    category: "Payment",
    commonCauses: ["Account not yet verified for higher limits", "Amount cap configured too low for this use case"],
    resolution: "Complete additional verification or request a limit increase from support.",
    isCustom: false,
  },
  {
    id: "err-15",
    errorCode: "aml_review_required",
    httpStatus: 423,
    message: "Transaction held for AML compliance review.",
    description: "The transaction was flagged by automated screening and requires manual review before completing.",
    category: "Compliance",
    commonCauses: ["Recipient matched a watchlist pattern", "Unusual transaction velocity"],
    resolution: "Wait for compliance review to complete, or contact the compliance team for status.",
    isCustom: false,
  },
  {
    id: "err-16",
    errorCode: "kyc_incomplete",
    httpStatus: 403,
    message: "Customer KYC verification is incomplete.",
    description: "The customer associated with this request has not completed required identity verification.",
    category: "Compliance",
    commonCauses: ["Customer onboarding flow was abandoned", "Document verification still pending"],
    resolution: "Direct the customer to complete the KYC flow before retrying the transaction.",
    isCustom: false,
  },
  {
    id: "err-17",
    errorCode: "internal_server_error",
    httpStatus: 500,
    message: "An unexpected error occurred.",
    description: "Something went wrong on our end while processing the request.",
    category: "Server",
    commonCauses: ["Unhandled exception in application logic", "Database connectivity issue"],
    resolution: "Retry the request. If the issue persists, contact support with the request ID.",
    isCustom: false,
  },
  {
    id: "err-18",
    errorCode: "upstream_timeout",
    httpStatus: 504,
    message: "A required upstream service timed out.",
    description: "A third-party or internal dependency did not respond within the allotted time.",
    category: "Server",
    commonCauses: ["Banking partner API slowness", "Network partition between services"],
    resolution: "Retry with exponential backoff. Check the relevant service's status page.",
    isCustom: false,
  },
  {
    id: "err-19",
    errorCode: "custom_settlement_window_closed",
    httpStatus: 422,
    message: "Settlement window is closed for this payout batch.",
    description: "Custom error: this payout was submitted after the daily settlement cutoff.",
    category: "Payment",
    commonCauses: ["Payout submitted after the configured cutoff time"],
    resolution: "Resubmit the payout in the next settlement window, or request an off-cycle settlement.",
    isCustom: true,
  },
  {
    id: "err-20",
    errorCode: "custom_agent_offline",
    httpStatus: 409,
    message: "Assigned agent is currently offline.",
    description: "Custom error: the field agent assigned to this pickup is not currently available.",
    category: "Validation",
    commonCauses: ["Agent app lost connectivity", "Agent ended shift before pickup was completed"],
    resolution: "Reassign the pickup to another available agent.",
    isCustom: true,
  },
];

export const apiErrorCodesTotalCount = apiErrorCodesData.length;











// ============================================================
// PLATFORM SETTINGS (final sidebar "Settings" item — platform-wide config)
// DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type PlatformSettingsTabId =
  | "General"
  | "Branding & Theme"
  | "Verification & KYC"
  | "Two-Factor Authentication"
  | "Localization"
  | "Email & SMS";

export const platformSettingsTabs: PlatformSettingsTabId[] = [
  "General",
  "Branding & Theme",
  "Verification & KYC",
  "Two-Factor Authentication",
  "Localization",
  "Email & SMS",
];

// ---------- General ----------

export interface PlatformGeneralConfig {
  platformName: string;
  legalEntityName: string;
  supportEmail: string;
  supportPhone: string;
  maintenanceModeEnabled: boolean;
  maintenanceMessage: string;
  newRegistrationsEnabled: boolean;
}

export const platformGeneralDefaults: PlatformGeneralConfig = {
  platformName: "FinTrack",
  legalEntityName: "FinTrack Financial Services Ltd.",
  supportEmail: "support@fintrack.io",
  supportPhone: "+880 9610-001122",
  maintenanceModeEnabled: false,
  maintenanceMessage: "FinTrack is currently undergoing scheduled maintenance. We'll be back shortly.",
  newRegistrationsEnabled: true,
};

// ---------- Branding & Theme ----------

export type PlatformThemeMode = "Light" | "Dark" | "System";

export interface PlatformBrandingConfig {
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  defaultThemeMode: PlatformThemeMode;
  allowUserThemeOverride: boolean;
  loginPageTagline: string;
}

export const platformBrandingDefaults: PlatformBrandingConfig = {
  logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=FinTrack&backgroundColor=2563eb",
  faviconUrl: "https://api.dicebear.com/7.x/initials/svg?seed=FT&backgroundColor=2563eb",
  primaryColor: "#2563eb",
  defaultThemeMode: "System",
  allowUserThemeOverride: true,
  loginPageTagline: "Move money. Manage trust.",
};

export const platformThemeModeOptions: PlatformThemeMode[] = ["Light", "Dark", "System"];
export const platformBrandColorOptions: string[] = ["#2563eb", "#7c3aed", "#16a34a", "#d97706", "#dc2626", "#0891b2"];

// ---------- Verification & KYC ----------

export type PlatformKycLevel = "Basic" | "Standard" | "Enhanced";

export interface PlatformKycTier {
  id: string;
  level: PlatformKycLevel;
  transactionLimit: string;
  requiredDocuments: string[];
  autoApprovalEnabled: boolean;
}

export const platformKycTiers: PlatformKycTier[] = [
  {
    id: "kyc-basic",
    level: "Basic",
    transactionLimit: "$500 / month",
    requiredDocuments: ["Phone Number Verification"],
    autoApprovalEnabled: true,
  },
  {
    id: "kyc-standard",
    level: "Standard",
    transactionLimit: "$10,000 / month",
    requiredDocuments: ["Government ID", "Selfie Match"],
    autoApprovalEnabled: true,
  },
  {
    id: "kyc-enhanced",
    level: "Enhanced",
    transactionLimit: "Unlimited",
    requiredDocuments: ["Government ID", "Selfie Match", "Proof of Address", "Source of Funds Declaration"],
    autoApprovalEnabled: false,
  },
];

export interface PlatformVerificationConfig {
  kycRequiredForSignup: boolean;
  amlScreeningEnabled: boolean;
  sanctionsListProvider: string;
  manualReviewThresholdAmount: string;
  documentExpiryReminderDays: number;
}

export const platformVerificationDefaults: PlatformVerificationConfig = {
  kycRequiredForSignup: true,
  amlScreeningEnabled: true,
  sanctionsListProvider: "ComplyAdvantage",
  manualReviewThresholdAmount: "$5,000",
  documentExpiryReminderDays: 30,
};

export const platformSanctionsProviderOptions: string[] = ["ComplyAdvantage", "Refinitiv World-Check", "Dow Jones Risk & Compliance"];

// ---------- Two-Factor Authentication (platform-wide policy) ----------

export type Platform2faMethod = "Authenticator App" | "SMS" | "Email";

export interface PlatformTwoFactorPolicy {
  enforceForAllAdmins: boolean;
  enforceForAllCustomers: boolean;
  allowedMethods: Record<Platform2faMethod, boolean>;
  gracePeriodDays: number;
  rememberDeviceDays: number;
}

export const platform2faDefaults: PlatformTwoFactorPolicy = {
  enforceForAllAdmins: true,
  enforceForAllCustomers: false,
  allowedMethods: { "Authenticator App": true, SMS: true, Email: false },
  gracePeriodDays: 7,
  rememberDeviceDays: 30,
};

export const platform2faMethodOptions: Platform2faMethod[] = ["Authenticator App", "SMS", "Email"];

// ---------- Localization ----------

export interface PlatformLocalizationConfig {
  defaultLanguage: string;
  supportedLanguages: string[];
  defaultCurrency: string;
  defaultTimezone: string;
  defaultDateFormat: string;
}

export const platformLocalizationDefaults: PlatformLocalizationConfig = {
  defaultLanguage: "English (US)",
  supportedLanguages: ["English (US)", "Bengali (বাংলা)", "Hindi (हिन्दी)"],
  defaultCurrency: "BDT",
  defaultTimezone: "Asia/Dhaka",
  defaultDateFormat: "DD MMM YYYY",
};

export const platformLanguageOptions: string[] = [
  "English (US)",
  "English (UK)",
  "Bengali (বাংলা)",
  "Hindi (हिन्दी)",
  "Arabic (العربية)",
  "Urdu (اردو)",
];
export const platformCurrencyOptions: string[] = ["BDT", "USD", "EUR", "GBP", "INR", "AED"];
export const platformTimezoneOptions: string[] = ["Asia/Dhaka", "UTC", "America/New_York", "Europe/London", "Asia/Singapore"];
export const platformDateFormatOptions: string[] = ["DD MMM YYYY", "YYYY-MM-DD", "MM/DD/YYYY", "DD/MM/YYYY"];

// ---------- Email & SMS ----------

export interface PlatformEmailSmsConfig {
  smtpHost: string;
  smtpPort: number;
  senderName: string;
  senderEmail: string;
  smsProvider: string;
  smsSenderId: string;
  transactionalEmailsEnabled: boolean;
  marketingEmailsEnabled: boolean;
}

export const platformEmailSmsDefaults: PlatformEmailSmsConfig = {
  smtpHost: "smtp.fintrack.io",
  smtpPort: 587,
  senderName: "FinTrack",
  senderEmail: "no-reply@fintrack.io",
  smsProvider: "Twilio",
  smsSenderId: "FINTRACK",
  transactionalEmailsEnabled: true,
  marketingEmailsEnabled: false,
};

export const platformSmsProviderOptions: string[] = ["Twilio", "Vonage", "Local Gateway (SSL Wireless)"];

export const platformKycBadge: Record<PlatformKycLevel, string> = {
  Basic: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  Standard: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Enhanced: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
};








// ============================================================
// REVENUE — DATA, TYPES & CONSTANTS
// Append this block into lib/data.ts
// ============================================================

export type RevenueViewMode = "Monthly" | "Yearly";
export type RevenueTrendDirection = "up" | "down";

export interface RevenueStatCard {
  id: string;
  label: string;
  value: string;
  change: string;
  changeDirection: RevenueTrendDirection;
  changeTone: "good" | "bad";
  icon: "total" | "net" | "expense" | "growth";
}

export const revenueStatCards: RevenueStatCard[] = [
  { id: "rev-stat-total", label: "Total Revenue", value: "$842,650", change: "14.2%", changeDirection: "up", changeTone: "good", icon: "total" },
  { id: "rev-stat-net", label: "Net Income", value: "$612,940", change: "11.8%", changeDirection: "up", changeTone: "good", icon: "net" },
  { id: "rev-stat-expense", label: "Total Expenses & Refunds", value: "$229,710", change: "6.4%", changeDirection: "up", changeTone: "bad", icon: "expense" },
  { id: "rev-stat-growth", label: "YoY Growth Rate", value: "18.6%", change: "3.1%", changeDirection: "up", changeTone: "good", icon: "growth" },
];

// ---------- Monthly revenue trend (current year) ----------

export interface RevenueTrendPoint {
  label: string;
  income: number;
  expense: number;
}

export const revenueMonthlyTrend: RevenueTrendPoint[] = [
  { label: "Jan", income: 58200, expense: 16400 },
  { label: "Feb", income: 61500, expense: 17200 },
  { label: "Mar", income: 67800, expense: 18900 },
  { label: "Apr", income: 64200, expense: 19800 },
  { label: "May", income: 71300, expense: 20100 },
  { label: "Jun", income: 75600, expense: 21400 },
  { label: "Jul", income: 69900, expense: 19600 },
  { label: "Aug", income: 78200, expense: 22300 },
  { label: "Sep", income: 82400, expense: 23800 },
  { label: "Oct", income: 79100, expense: 21900 },
  { label: "Nov", income: 85700, expense: 24600 },
  { label: "Dec", income: 91750, expense: 23710 },
];

// ---------- Yearly revenue trend (last 6 years) ----------

export const revenueYearlyTrend: RevenueTrendPoint[] = [
  { label: "2020", income: 412000, expense: 138000 },
  { label: "2021", income: 498000, expense: 152000 },
  { label: "2022", income: 587000, expense: 171000 },
  { label: "2023", income: 671000, expense: 196000 },
  { label: "2024", income: 738000, expense: 214000 },
  { label: "2025", income: 842650, expense: 229710 },
];

// ---------- Revenue by source (donut chart) ----------

export type RevenueSourceCategory = "Transaction Fees" | "Card Payments" | "Payout Fees" | "FX Margin" | "API Subscriptions" | "Other";

export interface RevenueSourceItem {
  id: string;
  category: RevenueSourceCategory;
  amount: number;
  percentage: number;
  color: string; // hex for chart
}

export const revenueBySource: RevenueSourceItem[] = [
  { id: "src-1", category: "Transaction Fees", amount: 312400, percentage: 37.1, color: "#3b82f6" },
  { id: "src-2", category: "Card Payments", amount: 198750, percentage: 23.6, color: "#22c55e" },
  { id: "src-3", category: "Payout Fees", amount: 142880, percentage: 17.0, color: "#a855f7" },
  { id: "src-4", category: "FX Margin", amount: 96420, percentage: 11.4, color: "#f59e0b" },
  { id: "src-5", category: "API Subscriptions", amount: 64600, percentage: 7.7, color: "#0ea5e9" },
  { id: "src-6", category: "Other", amount: 27600, percentage: 3.2, color: "#94a3b8" },
];

// ---------- Revenue by region ----------

export interface RevenueByRegion {
  id: string;
  region: string;
  amount: number;
  percentage: number;
  trendDirection: RevenueTrendDirection;
  trendPercent: string;
}

export const revenueByRegion: RevenueByRegion[] = [
  { id: "reg-1", region: "Bangladesh", amount: 486200, percentage: 57.7, trendDirection: "up", trendPercent: "12.4%" },
  { id: "reg-2", region: "Middle East (UAE, KSA)", amount: 156800, percentage: 18.6, trendDirection: "up", trendPercent: "21.3%" },
  { id: "reg-3", region: "Southeast Asia", amount: 98400, percentage: 11.7, trendDirection: "up", trendPercent: "8.9%" },
  { id: "reg-4", region: "Europe", amount: 64250, percentage: 7.6, trendDirection: "down", trendPercent: "2.1%" },
  { id: "reg-5", region: "North America", amount: 37000, percentage: 4.4, trendDirection: "up", trendPercent: "15.6%" },
];

// ---------- Recent revenue transactions ----------

export type RevenueTxnType = "Transaction Fee" | "Card Payment" | "Payout Fee" | "FX Margin" | "Subscription" | "Refund";
export type RevenueTxnStatus = "Completed" | "Pending" | "Refunded";

export interface RevenueTransaction {
  id: string;
  txnId: string;
  type: RevenueTxnType;
  customer: string;
  amount: number;
  status: RevenueTxnStatus;
  date: string;
}

export const revenueTxnTypeBadge: Record<RevenueTxnType, string> = {
  "Transaction Fee": "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  "Card Payment": "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  "Payout Fee": "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  "FX Margin": "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Subscription: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  Refund: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const revenueTxnStatusBadge: Record<RevenueTxnStatus, string> = {
  Completed: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  Refunded: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export const revenueRecentTransactions: RevenueTransaction[] = [
  { id: "rt-1", txnId: "TXN_5f8a3b2d1c", type: "Transaction Fee", customer: "Kamal Hossain", amount: 4.5, status: "Completed", date: "May 12, 2025 10:30 AM" },
  { id: "rt-2", txnId: "TXN_7c2b4e9a3f", type: "Card Payment", customer: "Nusrat Jahan", amount: 12.8, status: "Completed", date: "May 12, 2025 10:24 AM" },
  { id: "rt-3", txnId: "TXN_5d6e7f1a9b", type: "Payout Fee", customer: "Rahim Auto Parts Ltd.", amount: 28.0, status: "Completed", date: "May 12, 2025 10:18 AM" },
  { id: "rt-4", txnId: "TXN_2a4b6c8d3e", type: "FX Margin", customer: "Sultana Begum", amount: 9.4, status: "Pending", date: "May 12, 2025 10:11 AM" },
  { id: "rt-5", txnId: "TXN_1e3f5a7b9c", type: "Subscription", customer: "Bashundhara Traders", amount: 199.0, status: "Completed", date: "May 12, 2025 9:54 AM" },
  { id: "rt-6", txnId: "TXN_9b1c3d5e7f", type: "Refund", customer: "Tanvir Ahmed", amount: -15.5, status: "Refunded", date: "May 12, 2025 9:42 AM" },
  { id: "rt-7", txnId: "TXN_4f6a8b0c2d", type: "Card Payment", customer: "Farzana Akter", amount: 6.2, status: "Completed", date: "May 12, 2025 9:30 AM" },
];

export const revenueTxnTotalCount = 18420;