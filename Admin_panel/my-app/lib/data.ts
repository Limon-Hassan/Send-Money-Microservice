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

export const beneficiaryStatusOptions = ['All Status', 'Active', 'Inactive', 'Pending'];

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

// report & analytics fake data here


// ── Reports & Analytics Fake Data ─────────────────────────────────────────────

// Stat cards
export const reportStatCards = [
  { label: 'Total Transactions', value: '24,752', change: '+12.5%', positive: true, sub: 'vs last 7 days', color: 'blue' },
  { label: 'Total Cash Pickups', value: '8,642', change: '+8.3%', positive: true, sub: 'vs last 7 days', color: 'orange' },
  { label: 'Total Revenue (Fees)', value: '$425,780', change: '+15.7%', positive: true, sub: 'vs last 7 days', color: 'green' },
  { label: 'Total Payouts', value: '$4,256,540', change: '+10.2%', positive: true, sub: 'vs last 7 days', color: 'teal' },
  { label: 'Pending Transactions', value: '1,248', change: '+5.2%', positive: true, sub: 'vs last 7 days', color: 'yellow' },
  { label: 'Failed Transactions', value: '156', change: '-3.1%', positive: false, sub: 'vs last 7 days', color: 'red' },
  { label: 'Active Users', value: '12,856', change: '+9.4%', positive: true, sub: 'vs last 7 days', color: 'purple' },
  { label: 'Active Agents', value: '214', change: '+6.7%', positive: true, sub: 'vs last 7 days', color: 'pink' },
];

// Daily Transaction Volume (May 6–12)
export const dailyVolumeData = {
  labels: ['May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'],
  values: [2100, 3200, 2800, 3800, 3400, 4600, 4900],
};

// Monthly Revenue Trend (Nov–May)
export const monthlyRevenueData = {
  labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
  revenue: [180000, 220000, 160000, 290000, 340000, 410000, 425780],
  fees: [12000, 15000, 11000, 19000, 23000, 28000, 30000],
};

// Status Distribution (donut)
export const statusDistribution = [
  { label: 'Completed', value: 18752, pct: 75.8, color: '#16a34a' },
  { label: 'Pending', value: 3124, pct: 12.6, color: '#f59e0b' },
  { label: 'Failed', value: 1563, pct: 6.3, color: '#ef4444' },
  { label: 'Refunded', value: 1313, pct: 5.3, color: '#6366f1' },
];

// Recent Transactions (analytics view)
export interface AnalyticsTransaction {
  id: string;
  sender: string;
  recipient: string;
  sendCountry: string;
  sendFlag: string;
  receiveCountry: string;
  receiveFlag: string;
  amount: string;
  currency: string;
  rate: string;
  fee: string;
  netPayout: string;
  status: 'Completed' | 'Pending' | 'Failed';
  dateTime: string;
}

export const analyticsRecentTransactions: AnalyticsTransaction[] = [
  { id: 'TXN-2505124789', sender: 'John Doe', recipient: 'Rahim Uddin', sendCountry: 'United Kingdom', sendFlag: '🇬🇧', receiveCountry: 'Bangladesh', receiveFlag: '🇧🇩', amount: '£500.00', currency: 'GBP', rate: '165.2500', fee: '£3.50', netPayout: '৳62,625.00', status: 'Completed', dateTime: 'May 12, 2025 10:30 AM' },
  { id: 'TXN-2505124788', sender: 'Ahmed Khan', recipient: 'Maria Santos', sendCountry: 'United States', sendFlag: '🇺🇸', receiveCountry: 'Philippines', receiveFlag: '🇵🇭', amount: '$300.00', currency: 'USD', rate: '122.2500', fee: '$2.50', netPayout: '₱36,675.00', status: 'Pending', dateTime: 'May 12, 2025 09:15 AM' },
  { id: 'TXN-2505124787', sender: 'Rashid Ahmed', recipient: 'Sabir Hossain', sendCountry: 'United Kingdom', sendFlag: '🇬🇧', receiveCountry: 'Bangladesh', receiveFlag: '🇧🇩', amount: '£28.00', currency: 'GBP', rate: '165.2500', fee: '£4.00', netPayout: '৳123,937.50', status: 'Completed', dateTime: 'May 12, 2025 08:45 AM' },
  { id: 'TXN-2505124786', sender: 'Imran Hossain', recipient: 'Mohammed Ali', sendCountry: 'Saudi Arabia', sendFlag: '🇸🇦', receiveCountry: 'Bangladesh', receiveFlag: '🇧🇩', amount: 'SAR 1,000.00', currency: 'SAR', rate: '28.5600', fee: 'SAR 8.00', netPayout: '৳30,560.00', status: 'Failed', dateTime: 'May 12, 2025 08:20 AM' },
  { id: 'TXN-2505124785', sender: 'Fatima Ali', recipient: 'Arif Khan', sendCountry: 'United Arab Emirates', sendFlag: '🇦🇪', receiveCountry: 'Pakistan', receiveFlag: '🇵🇰', amount: 'AED 1,250.00', currency: 'AED', rate: '33.2800', fee: 'AED 6.00', netPayout: 'Rs. 162,100.00', status: 'Pending', dateTime: 'May 12, 2025 07:55 AM' },
];

// Top Sending Corridors
export const topSendingCorridors = [
  { corridor: 'UK → Bangladesh', transactions: 5248, volume: '£2,456,780' },
  { corridor: 'USA → Bangladesh', transactions: 4125, volume: '$1,856,230' },
  { corridor: 'UAE → Pakistan', transactions: 2856, volume: 'AED 3,125,450' },
  { corridor: 'Saudi Arabia → Bangladesh', transactions: 1985, volume: 'SAR 2,145,600' },
  { corridor: 'Canada → India', transactions: 1256, volume: 'CAD 856,230' },
];

// Top Agents by Transactions
export const topAgents = [
  { name: 'Abul Hasan', branch: 'Gulshan Branch', avatar: 'AH', transactions: 1256, completionRate: '98.5%' },
  { name: 'Kamal Hossain', branch: 'Uttara Branch', avatar: 'KH', transactions: 985, completionRate: '97.2%' },
  { name: 'Juan Dela Cruz', branch: 'Manila Branch', avatar: 'JD', transactions: 874, completionRate: '96.1%' },
  { name: 'Amit Kumar', branch: 'Mumbai Branch', avatar: 'AK', transactions: 763, completionRate: '95.7%' },
  { name: 'Rashed Alom', branch: 'Sylhet Branch', avatar: 'RA', transactions: 654, completionRate: '95.4%' },
];

// Revenue Summary
export const revenueSummary = [
  { label: 'Total Fees Collected', value: '$425,780' },
  { label: 'Transaction Count', value: '24,752' },
  { label: 'Average Fee per Transaction', value: '$17.20' },
  { label: 'Total Payouts', value: '$4,256,540' },
  { label: 'Net Revenue', value: '$425,780' },
];

// Quick Reports list
export const quickReports = [
  { label: 'Transaction Report', icon: 'doc' },
  { label: 'Cash Pickup Report', icon: 'cash' },
  { label: 'Agent Performance Report', icon: 'agent' },
  { label: 'Revenue & Finance Report', icon: 'revenue' },
  { label: 'Compliance Report', icon: 'compliance' },
  { label: 'Customer Report', icon: 'customer' },
  { label: 'System Activity Report', icon: 'system' },
];

// Report Schedules
export const reportSchedules = [
  { label: 'Daily Transaction Report', sub: 'Every day at 06:00 AM', active: true },
  { label: 'Weekly Summary Report', sub: 'Every Monday at 09:00 AM', active: true },
  { label: 'Monthly Revenue Report', sub: '1st of every month at 10:00 AM', active: true },
  { label: 'Compliance Summary Report', sub: 'Every Friday at 06:00 PM', active: false },
];

// Recent Exports
export const recentExports = [
  { name: 'Transaction_Report_May_12_2025.xlsx', date: 'May 12, 2025 10:30 AM', type: 'xlsx' },
  { name: 'Revenue_Report_April_2025.pdf', date: 'May 12, 2025 09:15 AM', type: 'pdf' },
  { name: 'Agent_Performance_May_2025.xlsx', date: 'May 12, 2025 08:45 AM', type: 'xlsx' },
];

export const countryTransactionData = [
  { country: 'Bangladesh', value: 9800, pct: 100 },
  { country: 'India', value: 5200, pct: 53 },
  { country: 'Pakistan', value: 3600, pct: 37 },
  { country: 'Philippines', value: 2400, pct: 24 },
  { country: 'Nigeria', value: 1800, pct: 18 },
  { country: 'Nepal', value: 1200, pct: 12 },
];

//here KYC fake data

export type KycStatus = 'Approved' | 'Pending' | 'Rejected' | 'Under Review' | 'Expired';
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
      { type: 'NID', label: 'National ID (NID)', status: 'Verified', uploadedAt: '2025-01-12' },
      { type: 'Passport', label: 'Passport', status: 'Verified', uploadedAt: '2025-01-12' },
      { type: 'Utility Bill', label: 'Utility Bill', status: 'Verified', uploadedAt: '2025-01-14' },
      { type: 'Business Doc', label: 'Business Document', status: 'Missing', uploadedAt: null },
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
      { type: 'NID', label: 'National ID (NID)', status: 'Verified', uploadedAt: '2025-11-28' },
      { type: 'Passport', label: 'Passport', status: 'Missing', uploadedAt: null },
      { type: 'Utility Bill', label: 'Utility Bill', status: 'Missing', uploadedAt: null },
      { type: 'Business Doc', label: 'Business Document', status: 'Missing', uploadedAt: null },
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
      { type: 'NID', label: 'National ID (NID)', status: 'Failed', uploadedAt: '2025-10-05' },
      { type: 'Passport', label: 'Passport', status: 'Missing', uploadedAt: null },
      { type: 'Utility Bill', label: 'Utility Bill', status: 'Missing', uploadedAt: null },
      { type: 'Business Doc', label: 'Business Document', status: 'Missing', uploadedAt: null },
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
      { type: 'NID', label: 'National ID (NID)', status: 'Verified', uploadedAt: '2026-01-03' },
      { type: 'Passport', label: 'Passport', status: 'Verified', uploadedAt: '2026-01-03' },
      { type: 'Utility Bill', label: 'Utility Bill', status: 'Verified', uploadedAt: '2026-01-04' },
      { type: 'Business Doc', label: 'Business Document', status: 'Verified', uploadedAt: '2026-01-05' },
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
    reviewerNote: 'Utility bill address does not match NID address. Manual review required.',
    documents: [
      { type: 'NID', label: 'National ID (NID)', status: 'Verified', uploadedAt: '2026-02-10' },
      { type: 'Passport', label: 'Passport', status: 'Verified', uploadedAt: '2026-02-10' },
      { type: 'Utility Bill', label: 'Utility Bill', status: 'Pending', uploadedAt: '2026-02-11' },
      { type: 'Business Doc', label: 'Business Document', status: 'Missing', uploadedAt: null },
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
      { type: 'NID', label: 'National ID (NID)', status: 'Verified', uploadedAt: '2024-03-01' },
      { type: 'Passport', label: 'Passport', status: 'Verified', uploadedAt: '2024-03-01' },
      { type: 'Utility Bill', label: 'Utility Bill', status: 'Verified', uploadedAt: '2024-03-02' },
      { type: 'Business Doc', label: 'Business Document', status: 'Missing', uploadedAt: null },
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
    reviewerNote: 'Tier 3 approved. Medium risk due to high transaction volume.',
    documents: [
      { type: 'NID', label: 'National ID (NID)', status: 'Verified', uploadedAt: '2025-08-15' },
      { type: 'Passport', label: 'Passport', status: 'Verified', uploadedAt: '2025-08-15' },
      { type: 'Utility Bill', label: 'Utility Bill', status: 'Verified', uploadedAt: '2025-08-16' },
      { type: 'Business Doc', label: 'Business Document', status: 'Verified', uploadedAt: '2025-08-17' },
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
      { type: 'NID', label: 'National ID (NID)', status: 'Pending', uploadedAt: '2026-03-20' },
      { type: 'Passport', label: 'Passport', status: 'Missing', uploadedAt: null },
      { type: 'Utility Bill', label: 'Utility Bill', status: 'Missing', uploadedAt: null },
      { type: 'Business Doc', label: 'Business Document', status: 'Missing', uploadedAt: null },
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
export type CurrencyCode = 'GBP' | 'USD' | 'EUR' | 'BDT' | 'PKR' | 'INR' | 'PHP' | 'NGN' | 'NPR';

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
  avatarColor: 'blue' | 'purple' | 'green' | 'amber' | 'red' | 'teal' | 'pink' | 'indigo' | 'rose';
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
    id: 'W-10001', customerId: 'C-10041', name: 'Rahul Ahmed', initials: 'RA',
    avatarColor: 'blue', email: 'rahul.ahmed@gmail.com', status: 'Active',
    totalBalanceGBP: 4731.15, lastActivity: '2026-06-17',
    wallets: [
      { code: 'GBP', flag: '🇬🇧', name: 'British Pound',      balance: 2450.75, onHold: 120.00, dailyLimit: 5000,   monthlyLimit: 50000,  dailyUsed: 820,   monthlyUsed: 12400 },
      { code: 'USD', flag: '🇺🇸', name: 'US Dollar',          balance: 1280.40, onHold: 0,      dailyLimit: 6000,   monthlyLimit: 60000,  dailyUsed: 300,   monthlyUsed: 4500  },
      { code: 'EUR', flag: '🇪🇺', name: 'Euro',               balance: 980.30,  onHold: 50.00,  dailyLimit: 5500,   monthlyLimit: 55000,  dailyUsed: 0,     monthlyUsed: 1200  },
      { code: 'BDT', flag: '🇧🇩', name: 'Bangladeshi Taka',   balance: 125450,  onHold: 0,      dailyLimit: 500000, monthlyLimit: 5000000,dailyUsed: 45000, monthlyUsed: 280000},
    ],
  },
  {
    id: 'W-10002', customerId: 'C-10042', name: 'Nadia Islam', initials: 'NI',
    avatarColor: 'purple', email: 'nadia.islam@yahoo.com', status: 'Active',
    totalBalanceGBP: 850.20, lastActivity: '2026-06-16',
    wallets: [
      { code: 'GBP', flag: '🇬🇧', name: 'British Pound', balance: 850.20, onHold: 0,      dailyLimit: 2000,  monthlyLimit: 20000,  dailyUsed: 200,  monthlyUsed: 1800 },
      { code: 'INR', flag: '🇮🇳', name: 'Indian Rupee',  balance: 45200,  onHold: 1000,   dailyLimit: 200000,monthlyLimit: 2000000,dailyUsed: 15000,monthlyUsed: 90000},
    ],
  },
  {
    id: 'W-10003', customerId: 'C-10043', name: 'Karim Hossain', initials: 'KH',
    avatarColor: 'red', email: 'karim.hossain@hotmail.com', status: 'Frozen',
    totalBalanceGBP: 0, lastActivity: '2025-10-05',
    wallets: [
      { code: 'GBP', flag: '🇬🇧', name: 'British Pound', balance: 0, onHold: 0, dailyLimit: 0, monthlyLimit: 0, dailyUsed: 0, monthlyUsed: 0 },
    ],
  },
  {
    id: 'W-10004', customerId: 'C-10044', name: 'Farida Begum', initials: 'FB',
    avatarColor: 'green', email: 'farida.begum@gmail.com', status: 'Active',
    totalBalanceGBP: 9350.85, lastActivity: '2026-06-18',
    wallets: [
      { code: 'GBP', flag: '🇬🇧', name: 'British Pound',    balance: 5120.60, onHold: 500,  dailyLimit: 10000, monthlyLimit: 100000, dailyUsed: 2000, monthlyUsed: 35000 },
      { code: 'USD', flag: '🇺🇸', name: 'US Dollar',        balance: 2800.00, onHold: 0,    dailyLimit: 12000, monthlyLimit: 120000, dailyUsed: 800,  monthlyUsed: 12000 },
      { code: 'PKR', flag: '🇵🇰', name: 'Pakistani Rupee',  balance: 180000,  onHold: 5000, dailyLimit: 800000,monthlyLimit: 8000000,dailyUsed: 50000,monthlyUsed: 420000},
    ],
  },
  {
    id: 'W-10005', customerId: 'C-10045', name: 'Tariq Mahmud', initials: 'TM',
    avatarColor: 'amber', email: 'tariq.mahmud@gmail.com', status: 'Active',
    totalBalanceGBP: 2140.00, lastActivity: '2026-06-15',
    wallets: [
      { code: 'GBP', flag: '🇬🇧', name: 'British Pound', balance: 1200.00, onHold: 200, dailyLimit: 3000,  monthlyLimit: 30000,  dailyUsed: 500,  monthlyUsed: 8000  },
      { code: 'USD', flag: '🇺🇸', name: 'US Dollar',     balance: 940.00,  onHold: 0,   dailyLimit: 4000,  monthlyLimit: 40000,  dailyUsed: 940,  monthlyUsed: 5500  },
    ],
  },
  {
    id: 'W-10006', customerId: 'C-10046', name: 'Sadia Rahman', initials: 'SR',
    avatarColor: 'teal', email: 'sadia.rahman@gmail.com', status: 'Active',
    totalBalanceGBP: 8130.25, lastActivity: '2026-06-18',
    wallets: [
      { code: 'GBP', flag: '🇬🇧', name: 'British Pound', balance: 4350.80, onHold: 0,   dailyLimit: 8000,  monthlyLimit: 80000,  dailyUsed: 1200, monthlyUsed: 22000 },
      { code: 'EUR', flag: '🇪🇺', name: 'Euro',          balance: 2800.00, onHold: 150, dailyLimit: 7000,  monthlyLimit: 70000,  dailyUsed: 0,    monthlyUsed: 9000  },
      { code: 'PHP', flag: '🇵🇭', name: 'Philippine Peso',balance: 95000,  onHold: 0,   dailyLimit: 400000,monthlyLimit: 4000000,dailyUsed: 15000,monthlyUsed: 180000},
    ],
  },
  {
    id: 'W-10007', customerId: 'C-10047', name: 'Imran Khan', initials: 'IK',
    avatarColor: 'pink', email: 'imran.khan@gmail.com', status: 'Active',
    totalBalanceGBP: 14200.00, lastActivity: '2026-06-17',
    wallets: [
      { code: 'GBP', flag: '🇬🇧', name: 'British Pound',  balance: 8900.00, onHold: 1000, dailyLimit: 15000, monthlyLimit: 150000, dailyUsed: 3500, monthlyUsed: 62000 },
      { code: 'USD', flag: '🇺🇸', name: 'US Dollar',      balance: 4200.00, onHold: 0,    dailyLimit: 18000, monthlyLimit: 180000, dailyUsed: 1200, monthlyUsed: 28000 },
      { code: 'EUR', flag: '🇪🇺', name: 'Euro',           balance: 2100.00, onHold: 200,  dailyLimit: 12000, monthlyLimit: 120000, dailyUsed: 0,    monthlyUsed: 15000 },
      { code: 'NGN', flag: '🇳🇬', name: 'Nigerian Naira', balance: 1850000, onHold: 0,    dailyLimit: 5000000,monthlyLimit: 50000000,dailyUsed: 200000,monthlyUsed: 1200000},
    ],
  },
  {
    id: 'W-10008', customerId: 'C-10048', name: 'Mitu Akter', initials: 'MA',
    avatarColor: 'indigo', email: 'mitu.akter@gmail.com', status: 'Suspended',
    totalBalanceGBP: 320.50, lastActivity: '2026-03-20',
    wallets: [
      { code: 'GBP', flag: '🇬🇧', name: 'British Pound', balance: 320.50, onHold: 320.50, dailyLimit: 0, monthlyLimit: 0, dailyUsed: 0, monthlyUsed: 0 },
    ],
  },
  {
    id: 'W-10009', customerId: 'C-10049', name: 'David Osei', initials: 'DO',
    avatarColor: 'rose', email: 'david.osei@gmail.com', status: 'Active',
    totalBalanceGBP: 6750.00, lastActivity: '2026-06-18',
    wallets: [
      { code: 'GBP', flag: '🇬🇧', name: 'British Pound',  balance: 3200.00, onHold: 400,  dailyLimit: 8000,   monthlyLimit: 80000,   dailyUsed: 1500, monthlyUsed: 28000  },
      { code: 'USD', flag: '🇺🇸', name: 'US Dollar',      balance: 2100.00, onHold: 0,    dailyLimit: 10000,  monthlyLimit: 100000,  dailyUsed: 600,  monthlyUsed: 11000  },
      { code: 'NGN', flag: '🇳🇬', name: 'Nigerian Naira', balance: 1450000, onHold: 50000,dailyLimit: 3000000,monthlyLimit: 30000000, dailyUsed: 80000,monthlyUsed: 650000 },
      { code: 'NPR', flag: '🇳🇵', name: 'Nepali Rupee',   balance: 85000,   onHold: 0,    dailyLimit: 300000, monthlyLimit: 3000000,  dailyUsed: 12000,monthlyUsed: 95000  },
    ],
  },
];



// transaction details fake data

// ============ TRANSACTION TYPES ============
export type TransactionType = 'Send Money' | 'Receive' | 'Top Up' | 'Withdraw' | 'Refund' | 'Exchange' | 'Fee';
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded' | 'Cancelled' | 'On Hold';

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
    id: 'TXN-26061801', customerId: 'C-10041', customerName: 'Rahul Ahmed',
    customerInitials: 'RA', customerAvatarColor: 'blue',
    type: 'Send Money', status: 'Completed',
    amount: 520.00, currency: 'GBP', fee: 3.50, feeCurrency: 'GBP',
    recipient: 'Kamal Hossain', recipientCountry: 'Bangladesh', recipientFlag: '🇧🇩',
    reference: 'TXN-26061801', channel: 'Mobile',
    note: 'Family support', createdAt: '2026-06-18T10:22:00', completedAt: '2026-06-18T10:24:33',
  },
  {
    id: 'TXN-26061802', customerId: 'C-10044', customerName: 'Farida Begum',
    customerInitials: 'FB', customerAvatarColor: 'green',
    type: 'Send Money', status: 'Completed',
    amount: 1200.00, currency: 'GBP', fee: 5.00, feeCurrency: 'GBP',
    recipient: 'Ali Hassan', recipientCountry: 'Pakistan', recipientFlag: '🇵🇰',
    reference: 'TXN-26061802', channel: 'Web',
    createdAt: '2026-06-18T09:45:00', completedAt: '2026-06-18T09:47:12',
  },
  {
    id: 'TXN-26061803', customerId: 'C-10046', customerName: 'Sadia Rahman',
    customerInitials: 'SR', customerAvatarColor: 'teal',
    type: 'Top Up', status: 'Completed',
    amount: 1500.00, currency: 'GBP', fee: 0, feeCurrency: 'GBP',
    reference: 'TXN-26061803', channel: 'Mobile',
    createdAt: '2026-06-18T09:10:00', completedAt: '2026-06-18T09:10:45',
  },
  {
    id: 'TXN-26061804', customerId: 'C-10042', customerName: 'Nadia Islam',
    customerInitials: 'NI', customerAvatarColor: 'purple',
    type: 'Send Money', status: 'Pending',
    amount: 420.00, currency: 'GBP', fee: 3.00, feeCurrency: 'GBP',
    recipient: 'Priya Singh', recipientCountry: 'India', recipientFlag: '🇮🇳',
    reference: 'TXN-26061804', channel: 'Web',
    createdAt: '2026-06-18T08:55:00',
  },
  {
    id: 'TXN-26061805', customerId: 'C-10047', customerName: 'Imran Khan',
    customerInitials: 'IK', customerAvatarColor: 'pink',
    type: 'Exchange', status: 'Completed',
    amount: 2000.00, currency: 'GBP', fee: 8.00, feeCurrency: 'GBP',
    fromCurrency: 'GBP', toCurrency: 'USD', exchangeRate: 1.2701,
    reference: 'TXN-26061805', channel: 'Web',
    createdAt: '2026-06-18T08:30:00', completedAt: '2026-06-18T08:30:22',
  },
  {
    id: 'TXN-26061806', customerId: 'C-10045', customerName: 'Tariq Mahmud',
    customerInitials: 'TM', customerAvatarColor: 'amber',
    type: 'Withdraw', status: 'On Hold',
    amount: 800.00, currency: 'GBP', fee: 2.00, feeCurrency: 'GBP',
    reference: 'TXN-26061806', channel: 'Mobile',
    note: 'Manual review required — high value withdrawal',
    createdAt: '2026-06-18T08:15:00',
  },
  {
    id: 'TXN-26061807', customerId: 'C-10041', customerName: 'Rahul Ahmed',
    customerInitials: 'RA', customerAvatarColor: 'blue',
    type: 'Fee', status: 'Completed',
    amount: 3.50, currency: 'GBP', fee: 0, feeCurrency: 'GBP',
    reference: 'TXN-26061801-FEE', channel: 'API',
    note: 'Fee for TXN-26061801',
    createdAt: '2026-06-18T10:24:33', completedAt: '2026-06-18T10:24:33',
  },
  {
    id: 'TXN-26061808', customerId: 'C-10044', customerName: 'Farida Begum',
    customerInitials: 'FB', customerAvatarColor: 'green',
    type: 'Receive', status: 'Completed',
    amount: 950.00, currency: 'GBP', fee: 0, feeCurrency: 'GBP',
    recipient: 'From: UK Business Account', recipientCountry: 'United Kingdom', recipientFlag: '🇬🇧',
    reference: 'TXN-26061808', channel: 'API',
    createdAt: '2026-06-18T07:50:00', completedAt: '2026-06-18T07:52:10',
  },
  {
    id: 'TXN-26061809', customerId: 'C-10043', customerName: 'Karim Hossain',
    customerInitials: 'KH', customerAvatarColor: 'red',
    type: 'Send Money', status: 'Failed',
    amount: 350.00, currency: 'GBP', fee: 2.50, feeCurrency: 'GBP',
    recipient: 'Unknown', recipientCountry: 'Nigeria', recipientFlag: '🇳🇬',
    reference: 'TXN-26061809', channel: 'Web',
    note: 'Failed: KYC rejected — transaction blocked',
    createdAt: '2026-06-18T07:30:00',
  },
  {
    id: 'TXN-26061810', customerId: 'C-10046', customerName: 'Sadia Rahman',
    customerInitials: 'SR', customerAvatarColor: 'teal',
    type: 'Send Money', status: 'Completed',
    amount: 780.00, currency: 'GBP', fee: 3.50, feeCurrency: 'GBP',
    recipient: 'Marie Dupont', recipientCountry: 'France', recipientFlag: '🇫🇷',
    reference: 'TXN-26061810', channel: 'Mobile',
    createdAt: '2026-06-17T18:45:00', completedAt: '2026-06-17T18:47:30',
  },
  {
    id: 'TXN-26061811', customerId: 'C-10047', customerName: 'Imran Khan',
    customerInitials: 'IK', customerAvatarColor: 'pink',
    type: 'Refund', status: 'Refunded',
    amount: 620.00, currency: 'GBP', fee: 0, feeCurrency: 'GBP',
    reference: 'TXN-26061811', channel: 'Admin',
    note: 'Refund for failed transfer TXN-26060922',
    createdAt: '2026-06-17T17:20:00', completedAt: '2026-06-17T17:22:00',
  },
  {
    id: 'TXN-26061812', customerId: 'C-10042', customerName: 'Nadia Islam',
    customerInitials: 'NI', customerAvatarColor: 'purple',
    type: 'Top Up', status: 'Cancelled',
    amount: 200.00, currency: 'GBP', fee: 0, feeCurrency: 'GBP',
    reference: 'TXN-26061812', channel: 'Web',
    note: 'Cancelled by customer',
    createdAt: '2026-06-17T16:10:00',
  },
  {
    id: 'TXN-26061813', customerId: 'C-10049', customerName: 'David Osei',
    customerInitials: 'DO', customerAvatarColor: 'rose',
    type: 'Send Money', status: 'Completed',
    amount: 1500.00, currency: 'GBP', fee: 5.50, feeCurrency: 'GBP',
    recipient: 'Emeka Osei', recipientCountry: 'Nigeria', recipientFlag: '🇳🇬',
    reference: 'TXN-26061813', channel: 'Mobile',
    createdAt: '2026-06-17T15:30:00', completedAt: '2026-06-17T15:33:20',
  },
  {
    id: 'TXN-26061814', customerId: 'C-10041', customerName: 'Rahul Ahmed',
    customerInitials: 'RA', customerAvatarColor: 'blue',
    type: 'Withdraw', status: 'Completed',
    amount: 300.00, currency: 'GBP', fee: 1.50, feeCurrency: 'GBP',
    reference: 'TXN-26061814', channel: 'Web',
    createdAt: '2026-06-17T14:00:00', completedAt: '2026-06-17T14:02:45',
  },
  {
    id: 'TXN-26061815', customerId: 'C-10045', customerName: 'Tariq Mahmud',
    customerInitials: 'TM', customerAvatarColor: 'amber',
    type: 'Exchange', status: 'Pending',
    amount: 500.00, currency: 'USD', fee: 4.00, feeCurrency: 'USD',
    fromCurrency: 'USD', toCurrency: 'BDT', exchangeRate: 110.25,
    reference: 'TXN-26061815', channel: 'Mobile',
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
    id: 'TXN-26061901', customerId: 'C-10047', customerName: 'Imran Khan',
    customerInitials: 'IK', customerAvatarColor: 'pink',
    amount: 4500.00, currency: 'GBP', fee: 12.00,
    recipient: 'Mohammed Al-Rashid', recipientCountry: 'Saudi Arabia', recipientFlag: '🇸🇦',
    method: 'Bank Transfer', priority: 'Critical', escalation: 'Escalated',
    submittedAt: '2026-06-18T06:15:00', estimatedCompletion: '2026-06-18T08:15:00',
    waitingMins: 142, reason: 'Large value — awaiting compliance review',
    channel: 'Web',
  },
  {
    id: 'TXN-26061902', customerId: 'C-10044', customerName: 'Farida Begum',
    customerInitials: 'FB', customerAvatarColor: 'green',
    amount: 2800.00, currency: 'GBP', fee: 8.50,
    recipient: 'Nasrin Akter', recipientCountry: 'Bangladesh', recipientFlag: '🇧🇩',
    method: 'bKash', priority: 'Critical', escalation: 'Under Review',
    submittedAt: '2026-06-18T07:00:00', estimatedCompletion: '2026-06-18T09:00:00',
    waitingMins: 97, reason: 'Duplicate transaction flag — manual check required',
    channel: 'Mobile',
  },
  {
    id: 'TXN-26061903', customerId: 'C-10041', customerName: 'Rahul Ahmed',
    customerInitials: 'RA', customerAvatarColor: 'blue',
    amount: 1200.00, currency: 'GBP', fee: 5.00,
    recipient: 'Sunita Sharma', recipientCountry: 'India', recipientFlag: '🇮🇳',
    method: 'Bank Transfer', priority: 'High', escalation: 'None',
    submittedAt: '2026-06-18T07:45:00', estimatedCompletion: '2026-06-18T09:45:00',
    waitingMins: 52, reason: 'KYC tier 2 — secondary approval needed',
    channel: 'Web',
  },
  {
    id: 'TXN-26061904', customerId: 'C-10049', customerName: 'David Osei',
    customerInitials: 'DO', customerAvatarColor: 'rose',
    amount: 950.00, currency: 'GBP', fee: 4.50,
    recipient: 'Grace Mensah', recipientCountry: 'Ghana', recipientFlag: '🇬🇭',
    method: 'Mobile Money', priority: 'High', escalation: 'None',
    submittedAt: '2026-06-18T08:10:00', estimatedCompletion: '2026-06-18T09:30:00',
    waitingMins: 37, reason: 'New corridor — first Ghana transfer',
    channel: 'Mobile',
  },
  {
    id: 'TXN-26061905', customerId: 'C-10042', customerName: 'Nadia Islam',
    customerInitials: 'NI', customerAvatarColor: 'purple',
    amount: 420.00, currency: 'GBP', fee: 3.00,
    recipient: 'Priya Singh', recipientCountry: 'India', recipientFlag: '🇮🇳',
    method: 'Bank Transfer', priority: 'Normal', escalation: 'None',
    submittedAt: '2026-06-18T08:30:00', estimatedCompletion: '2026-06-18T09:30:00',
    waitingMins: 27, reason: 'Awaiting bank confirmation',
    channel: 'Web',
  },
  {
    id: 'TXN-26061906', customerId: 'C-10046', customerName: 'Sadia Rahman',
    customerInitials: 'SR', customerAvatarColor: 'teal',
    amount: 680.00, currency: 'GBP', fee: 3.50,
    recipient: 'Marie Dupont', recipientCountry: 'France', recipientFlag: '🇫🇷',
    method: 'Bank Transfer', priority: 'Normal', escalation: 'None',
    submittedAt: '2026-06-18T08:45:00', estimatedCompletion: '2026-06-18T10:00:00',
    waitingMins: 12, reason: 'Standard processing queue',
    channel: 'Mobile',
  },
  {
    id: 'TXN-26061907', customerId: 'C-10045', customerName: 'Tariq Mahmud',
    customerInitials: 'TM', customerAvatarColor: 'amber',
    amount: 800.00, currency: 'GBP', fee: 2.00,
    recipient: 'Self — GBP Wallet', recipientCountry: 'United Kingdom', recipientFlag: '🇬🇧',
    method: 'Wallet Transfer', priority: 'High', escalation: 'Escalated',
    submittedAt: '2026-06-18T08:15:00', estimatedCompletion: '2026-06-18T09:15:00',
    waitingMins: 42, reason: 'On hold — suspicious activity flag',
    channel: 'Admin',
  },
  {
    id: 'TXN-26061908', customerId: 'C-10041', customerName: 'Rahul Ahmed',
    customerInitials: 'RA', customerAvatarColor: 'blue',
    amount: 320.00, currency: 'GBP', fee: 2.50,
    recipient: 'Kamal Hossain', recipientCountry: 'Bangladesh', recipientFlag: '🇧🇩',
    method: 'Nagad', priority: 'Normal', escalation: 'None',
    submittedAt: '2026-06-18T08:50:00', estimatedCompletion: '2026-06-18T09:20:00',
    waitingMins: 7, reason: 'Awaiting Nagad API confirmation',
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
  totalFees: 1240.50,
};

export const completedTransactions: CompletedTransaction[] = [
  {
    id: 'TXN-26061801', customerId: 'C-10041', customerName: 'Rahul Ahmed',
    customerInitials: 'RA', customerAvatarColor: 'blue',
    amount: 520.00, currency: 'GBP', fee: 3.50,
    recipient: 'Kamal Hossain', recipientCountry: 'Bangladesh', recipientFlag: '🇧🇩',
    method: 'bKash', channel: 'Mobile',
    completedAt: '2026-06-18T10:24:33', processingMins: 2,
    receiptId: 'RCP-26061801',
  },
  {
    id: 'TXN-26061802', customerId: 'C-10044', customerName: 'Farida Begum',
    customerInitials: 'FB', customerAvatarColor: 'green',
    amount: 1200.00, currency: 'GBP', fee: 5.00,
    recipient: 'Ali Hassan', recipientCountry: 'Pakistan', recipientFlag: '🇵🇰',
    method: 'Bank Transfer', channel: 'Web',
    completedAt: '2026-06-18T09:47:12', processingMins: 2,
    receiptId: 'RCP-26061802',
  },
  {
    id: 'TXN-26061803', customerId: 'C-10046', customerName: 'Sadia Rahman',
    customerInitials: 'SR', customerAvatarColor: 'teal',
    amount: 1500.00, currency: 'GBP', fee: 0,
    recipient: 'GBP Wallet', recipientCountry: 'United Kingdom', recipientFlag: '🇬🇧',
    method: 'Wallet Top Up', channel: 'Mobile',
    completedAt: '2026-06-18T09:10:45', processingMins: 1,
    receiptId: 'RCP-26061803',
  },
  {
    id: 'TXN-26061805', customerId: 'C-10047', customerName: 'Imran Khan',
    customerInitials: 'IK', customerAvatarColor: 'pink',
    amount: 2000.00, currency: 'GBP', fee: 8.00,
    recipient: 'USD Wallet', recipientCountry: 'United Kingdom', recipientFlag: '🇬🇧',
    method: 'Exchange', channel: 'Web',
    completedAt: '2026-06-18T08:30:22', processingMins: 1,
    receiptId: 'RCP-26061805',
  },
  {
    id: 'TXN-26061808', customerId: 'C-10044', customerName: 'Farida Begum',
    customerInitials: 'FB', customerAvatarColor: 'green',
    amount: 950.00, currency: 'GBP', fee: 0,
    recipient: 'From: UK Business Account', recipientCountry: 'United Kingdom', recipientFlag: '🇬🇧',
    method: 'Bank Transfer', channel: 'API',
    completedAt: '2026-06-18T07:52:10', processingMins: 2,
    receiptId: 'RCP-26061808',
  },
  {
    id: 'TXN-26061810', customerId: 'C-10046', customerName: 'Sadia Rahman',
    customerInitials: 'SR', customerAvatarColor: 'teal',
    amount: 780.00, currency: 'GBP', fee: 3.50,
    recipient: 'Marie Dupont', recipientCountry: 'France', recipientFlag: '🇫🇷',
    method: 'Bank Transfer', channel: 'Mobile',
    completedAt: '2026-06-17T18:47:30', processingMins: 3,
    receiptId: 'RCP-26061810',
  },
  {
    id: 'TXN-26061813', customerId: 'C-10049', customerName: 'David Osei',
    customerInitials: 'DO', customerAvatarColor: 'rose',
    amount: 1500.00, currency: 'GBP', fee: 5.50,
    recipient: 'Emeka Osei', recipientCountry: 'Nigeria', recipientFlag: '🇳🇬',
    method: 'Mobile Money', channel: 'Mobile',
    completedAt: '2026-06-17T15:33:20', processingMins: 3,
    receiptId: 'RCP-26061813',
  },
  {
    id: 'TXN-26061814', customerId: 'C-10041', customerName: 'Rahul Ahmed',
    customerInitials: 'RA', customerAvatarColor: 'blue',
    amount: 300.00, currency: 'GBP', fee: 1.50,
    recipient: 'Bank Withdrawal', recipientCountry: 'United Kingdom', recipientFlag: '🇬🇧',
    method: 'Bank Transfer', channel: 'Web',
    completedAt: '2026-06-17T14:02:45', processingMins: 3,
    receiptId: 'RCP-26061814',
  },
  {
    id: 'TXN-26061816', customerId: 'C-10045', customerName: 'Tariq Mahmud',
    customerInitials: 'TM', customerAvatarColor: 'amber',
    amount: 450.00, currency: 'GBP', fee: 2.50,
    recipient: 'Ayesha Tariq', recipientCountry: 'Pakistan', recipientFlag: '🇵🇰',
    method: 'Bank Transfer', channel: 'Web',
    completedAt: '2026-06-17T12:15:00', processingMins: 4,
    receiptId: 'RCP-26061816',
  },
  {
    id: 'TXN-26061817', customerId: 'C-10042', customerName: 'Nadia Islam',
    customerInitials: 'NI', customerAvatarColor: 'purple',
    amount: 200.00, currency: 'GBP', fee: 0,
    recipient: 'GBP Wallet', recipientCountry: 'United Kingdom', recipientFlag: '🇬🇧',
    method: 'Wallet Top Up', channel: 'Mobile',
    completedAt: '2026-06-17T11:05:00', processingMins: 1,
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
    id: 'TXN-26061809', customerId: 'C-10043', customerName: 'Karim Hossain',
    customerInitials: 'KH', customerAvatarColor: 'red',
    customerEmail: 'karim.hossain@hotmail.com',
    amount: 350.00, currency: 'GBP', fee: 2.50,
    recipient: 'Unknown', recipientCountry: 'Nigeria', recipientFlag: '🇳🇬',
    method: 'Bank Transfer', channel: 'Web',
    failedAt: '2026-06-18T07:30:00',
    failureReason: 'KYC Rejected',
    failureDetail: 'Customer KYC status is Rejected. Transaction blocked by compliance engine.',
    retryCount: 0, canRetry: false, notified: true,
  },
  {
    id: 'TXN-26061820', customerId: 'C-10045', customerName: 'Tariq Mahmud',
    customerInitials: 'TM', customerAvatarColor: 'amber',
    customerEmail: 'tariq.mahmud@gmail.com',
    amount: 1800.00, currency: 'GBP', fee: 6.00,
    recipient: 'Mehmet Yilmaz', recipientCountry: 'Turkey', recipientFlag: '🇹🇷',
    method: 'Bank Transfer', channel: 'Web',
    failedAt: '2026-06-18T06:45:00',
    failureReason: 'Limit Exceeded',
    failureDetail: 'Daily transfer limit of £1,500 exceeded. Customer must upgrade KYC tier.',
    retryCount: 1, canRetry: true, notified: true,
  },
  {
    id: 'TXN-26061821', customerId: 'C-10042', customerName: 'Nadia Islam',
    customerInitials: 'NI', customerAvatarColor: 'purple',
    customerEmail: 'nadia.islam@yahoo.com',
    amount: 550.00, currency: 'GBP', fee: 3.00,
    recipient: 'Anjali Patel', recipientCountry: 'India', recipientFlag: '🇮🇳',
    method: 'Bank Transfer', channel: 'Mobile',
    failedAt: '2026-06-18T05:55:00',
    failureReason: 'Insufficient Funds',
    failureDetail: 'Available GBP wallet balance £420.00 is less than required £553.00 (amount + fee).',
    retryCount: 2, canRetry: true, notified: false,
  },
  {
    id: 'TXN-26061822', customerId: 'C-10047', customerName: 'Imran Khan',
    customerInitials: 'IK', customerAvatarColor: 'pink',
    customerEmail: 'imran.khan@gmail.com',
    amount: 3200.00, currency: 'GBP', fee: 9.50,
    recipient: 'Ahmed Al-Farsi', recipientCountry: 'UAE', recipientFlag: '🇦🇪',
    method: 'Bank Transfer', channel: 'API',
    failedAt: '2026-06-17T22:10:00',
    failureReason: 'Fraud Detected',
    failureDetail: 'Transaction flagged by fraud detection engine. Unusual pattern: 3rd high-value transfer in 6 hours.',
    retryCount: 0, canRetry: false, notified: true,
  },
  {
    id: 'TXN-26061823', customerId: 'C-10049', customerName: 'David Osei',
    customerInitials: 'DO', customerAvatarColor: 'rose',
    customerEmail: 'david.osei@gmail.com',
    amount: 420.00, currency: 'GBP', fee: 3.00,
    recipient: 'Kwame Mensah', recipientCountry: 'Ghana', recipientFlag: '🇬🇭',
    method: 'Mobile Money', channel: 'Mobile',
    failedAt: '2026-06-17T20:30:00',
    failureReason: 'Network Error',
    failureDetail: 'Mobile Money provider API timeout. Transaction could not be confirmed within 30s window.',
    retryCount: 1, canRetry: true, notified: false,
  },
  {
    id: 'TXN-26061824', customerId: 'C-10041', customerName: 'Rahul Ahmed',
    customerInitials: 'RA', customerAvatarColor: 'blue',
    customerEmail: 'rahul.ahmed@gmail.com',
    amount: 780.00, currency: 'GBP', fee: 4.00,
    recipient: 'Ravi Kumar', recipientCountry: 'India', recipientFlag: '🇮🇳',
    method: 'Bank Transfer', channel: 'Web',
    failedAt: '2026-06-17T18:00:00',
    failureReason: 'Bank Declined',
    failureDetail: 'Recipient bank HDFC returned error code 05 — Do not honour. Customer should verify account details.',
    retryCount: 1, canRetry: true, notified: true,
  },
  {
    id: 'TXN-26061825', customerId: 'C-10046', customerName: 'Sadia Rahman',
    customerInitials: 'SR', customerAvatarColor: 'teal',
    customerEmail: 'sadia.rahman@gmail.com',
    amount: 290.00, currency: 'GBP', fee: 2.00,
    recipient: 'Pierre Martin', recipientCountry: 'France', recipientFlag: '🇫🇷',
    method: 'Bank Transfer', channel: 'Mobile',
    failedAt: '2026-06-17T15:20:00',
    failureReason: 'Invalid Account',
    failureDetail: 'IBAN FR7630006000011234567890189 returned as invalid by recipient bank.',
    retryCount: 0, canRetry: true, notified: false,
  },
  {
    id: 'TXN-26061826', customerId: 'C-10044', customerName: 'Farida Begum',
    customerInitials: 'FB', customerAvatarColor: 'green',
    customerEmail: 'farida.begum@gmail.com',
    amount: 2100.00, currency: 'GBP', fee: 7.00,
    recipient: 'Hassan Al-Maktoum', recipientCountry: 'UAE', recipientFlag: '🇦🇪',
    method: 'Bank Transfer', channel: 'Web',
    failedAt: '2026-06-17T12:45:00',
    failureReason: 'Compliance Block',
    failureDetail: 'Destination account flagged in OFAC sanctions list. Transfer permanently blocked.',
    retryCount: 0, canRetry: false, notified: true,
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
  status: 'Completed' | 'Pending' | 'Failed' | 'Refunded' | 'Cancelled' | 'On Hold';
  type: 'Send Money' | 'Receive' | 'Top Up' | 'Withdraw' | 'Refund' | 'Exchange' | 'Fee';
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
    amount: 520.00, currency: 'GBP', fee: 3.50,
    totalCharged: 523.50,
    reference: 'TXN-26061801',
    channel: 'Mobile',
    ipAddress: '82.14.201.55',
    deviceInfo: 'iPhone 15 Pro · iOS 17.4 · TheSendMoney App v2.1',
    customerId: 'C-10041', customerName: 'Rahul Ahmed',
    customerInitials: 'RA', customerAvatarColor: 'blue',
    customerEmail: 'rahul.ahmed@gmail.com',
    customerPhone: '+880 1711-234567',
    customerKyc: 'Tier 2 — Approved',
    recipientName: 'Kamal Hossain',
    recipientFlag: '🇧🇩', recipientCountry: 'Bangladesh',
    recipientBank: 'Dutch-Bangla Bank Ltd',
    recipientAccount: '•••• •••• 4821',
    recipientPhone: '+880 1812-345678',
    timeline: [
      { label: 'Transaction Initiated',   description: 'Customer submitted transfer via mobile app',       timestamp: '2026-06-18T10:22:00', status: 'completed' },
      { label: 'KYC & Compliance Check',  description: 'Identity verified — Tier 2 KYC passed',           timestamp: '2026-06-18T10:22:08', status: 'completed' },
      { label: 'Payment Processing',      description: 'Deducted £523.50 from GBP wallet',                timestamp: '2026-06-18T10:22:15', status: 'completed' },
      { label: 'Bank Transfer Initiated', description: 'Sent to Dutch-Bangla Bank via SWIFT',             timestamp: '2026-06-18T10:22:45', status: 'completed' },
      { label: 'Recipient Notified',      description: 'SMS and email sent to recipient',                 timestamp: '2026-06-18T10:23:10', status: 'completed' },
      { label: 'Transaction Completed',   description: 'Funds confirmed received by recipient bank',      timestamp: '2026-06-18T10:24:33', status: 'completed' },
    ],
    auditLog: [
      { action: 'Transaction created',          performedBy: 'Rahul Ahmed',   role: 'Customer', timestamp: '2026-06-18T10:22:00' },
      { action: 'KYC check passed',             performedBy: 'System',        role: 'System',   timestamp: '2026-06-18T10:22:08', note: 'Onfido API — identity match confirmed' },
      { action: 'Funds debited from wallet',    performedBy: 'System',        role: 'System',   timestamp: '2026-06-18T10:22:15' },
      { action: 'SWIFT transfer initiated',     performedBy: 'System',        role: 'System',   timestamp: '2026-06-18T10:22:45', note: 'SWIFT code: DBBLBDDH' },
      { action: 'Recipient SMS sent',           performedBy: 'System',        role: 'System',   timestamp: '2026-06-18T10:23:10' },
      { action: 'Transaction marked complete',  performedBy: 'System',        role: 'System',   timestamp: '2026-06-18T10:24:33' },
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
    amount: 3200.00, currency: 'GBP', fee: 9.50,
    totalCharged: 0,
    reference: 'TXN-26061822',
    channel: 'API',
    ipAddress: '194.55.12.88',
    deviceInfo: 'API Client · TheSendMoney API v3',
    customerId: 'C-10047', customerName: 'Imran Khan',
    customerInitials: 'IK', customerAvatarColor: 'pink',
    customerEmail: 'imran.khan@gmail.com',
    customerPhone: '+44 7900-112233',
    customerKyc: 'Tier 3 — Approved',
    recipientName: 'Ahmed Al-Farsi',
    recipientFlag: '🇦🇪', recipientCountry: 'UAE',
    recipientBank: 'Emirates NBD',
    recipientAccount: '•••• •••• 9902',
    timeline: [
      { label: 'Transaction Initiated',  description: 'API request received',                              timestamp: '2026-06-17T22:10:00', status: 'completed' },
      { label: 'KYC Check',             description: 'Tier 3 KYC passed',                                 timestamp: '2026-06-17T22:10:04', status: 'completed' },
      { label: 'Fraud Detection',       description: 'Flagged — unusual high-value pattern detected',     timestamp: '2026-06-17T22:10:09', status: 'failed'    },
      { label: 'Transaction Blocked',   description: 'Blocked by fraud engine — funds not debited',       timestamp: '2026-06-17T22:10:10', status: 'failed'    },
      { label: 'Customer Notified',     description: 'Email alert sent to customer',                      timestamp: '2026-06-17T22:10:30', status: 'completed' },
    ],
    auditLog: [
      { action: 'API transaction received',     performedBy: 'API Client',     role: 'API',     timestamp: '2026-06-17T22:10:00' },
      { action: 'KYC check passed',             performedBy: 'System',         role: 'System',  timestamp: '2026-06-17T22:10:04' },
      { action: 'Fraud flag triggered',         performedBy: 'System',         role: 'System',  timestamp: '2026-06-17T22:10:09', note: 'Rule: 3+ high-value transfers in 6h' },
      { action: 'Transaction blocked',          performedBy: 'System',         role: 'System',  timestamp: '2026-06-17T22:10:10' },
      { action: 'Admin alerted',                performedBy: 'System',         role: 'System',  timestamp: '2026-06-17T22:10:15', note: 'Fraud team notified via Slack' },
      { action: 'Case reviewed',                performedBy: 'Sarah Johnson',  role: 'Admin',   timestamp: '2026-06-17T22:45:00', note: 'Confirmed fraud block — no further action' },
    ],
    createdAt: '2026-06-17T22:10:00',
    updatedAt: '2026-06-17T22:45:00',
    note: 'Blocked by fraud detection. Admin reviewed and confirmed.',
  },
  {
    id: 'TXN-26061805',
    status: 'Completed',
    type: 'Exchange',
    amount: 2000.00, currency: 'GBP', fee: 8.00,
    exchangeRate: 1.2701, fromCurrency: 'GBP', toCurrency: 'USD',
    convertedAmount: 2540.20,
    totalCharged: 2008.00,
    reference: 'TXN-26061805',
    channel: 'Web',
    ipAddress: '88.201.44.12',
    deviceInfo: 'Chrome 124 · Windows 11 · Desktop',
    customerId: 'C-10047', customerName: 'Imran Khan',
    customerInitials: 'IK', customerAvatarColor: 'pink',
    customerEmail: 'imran.khan@gmail.com',
    customerPhone: '+44 7900-112233',
    customerKyc: 'Tier 3 — Approved',
    recipientName: 'USD Wallet (Self)',
    recipientFlag: '🇺🇸', recipientCountry: 'Internal',
    timeline: [
      { label: 'Exchange Initiated',   description: 'Customer requested GBP → USD exchange',              timestamp: '2026-06-18T08:30:00', status: 'completed' },
      { label: 'Rate Locked',          description: 'Rate 1 GBP = 1.2701 USD locked for 30s',            timestamp: '2026-06-18T08:30:02', status: 'completed' },
      { label: 'GBP Debited',          description: '£2,008.00 deducted from GBP wallet',                timestamp: '2026-06-18T08:30:10', status: 'completed' },
      { label: 'USD Credited',         description: '$2,540.20 added to USD wallet',                      timestamp: '2026-06-18T08:30:22', status: 'completed' },
    ],
    auditLog: [
      { action: 'Exchange request created',  performedBy: 'Imran Khan',  role: 'Customer', timestamp: '2026-06-18T08:30:00' },
      { action: 'Exchange rate locked',      performedBy: 'System',      role: 'System',   timestamp: '2026-06-18T08:30:02', note: 'Rate source: Wise FX feed' },
      { action: 'GBP wallet debited',        performedBy: 'System',      role: 'System',   timestamp: '2026-06-18T08:30:10' },
      { action: 'USD wallet credited',       performedBy: 'System',      role: 'System',   timestamp: '2026-06-18T08:30:22' },
      { action: 'Exchange completed',        performedBy: 'System',      role: 'System',   timestamp: '2026-06-18T08:30:22' },
    ],
    createdAt: '2026-06-18T08:30:00',
    updatedAt: '2026-06-18T08:30:22',
    completedAt: '2026-06-18T08:30:22',
  },
];

// transaction refund review fake data

// ============ REFUND REQUESTS ============
export type RefundStatus = 'Pending' | 'Approved' | 'Rejected' | 'Processed' | 'Partial';
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
  totalRefundedAmount: 12480.50,
  avgProcessingHours: 4.2,
  approvalRate: 68.5,
};

export const refundRequests: RefundRequest[] = [
  {
    id: 'REF-26061801', originalTxId: 'TXN-26061805',
    customerId: 'C-10047', customerName: 'Imran Khan',
    customerInitials: 'IK', customerAvatarColor: 'pink',
    customerEmail: 'imran.khan@gmail.com',
    originalAmount: 2000.00, requestedRefund: 2000.00, approvedRefund: null,
    currency: 'GBP', reason: 'Transaction Error',
    reasonDetail: 'Exchange rate applied was incorrect. Customer was charged £2,000 but should have been £1,850.',
    status: 'Pending', requestedAt: '2026-06-18T09:00:00', processedAt: null,
    adminNote: '', channel: 'Web',
  },
  {
    id: 'REF-26061802', originalTxId: 'TXN-26061810',
    customerId: 'C-10046', customerName: 'Sadia Rahman',
    customerInitials: 'SR', customerAvatarColor: 'teal',
    customerEmail: 'sadia.rahman@gmail.com',
    originalAmount: 780.00, requestedRefund: 780.00, approvedRefund: null,
    currency: 'GBP', reason: 'Service Not Received',
    reasonDetail: 'Transfer to France was initiated but recipient confirms no funds received after 48 hours.',
    status: 'Pending', requestedAt: '2026-06-18T08:30:00', processedAt: null,
    adminNote: '', channel: 'Mobile',
  },
  {
    id: 'REF-26061803', originalTxId: 'TXN-26061802',
    customerId: 'C-10044', customerName: 'Farida Begum',
    customerInitials: 'FB', customerAvatarColor: 'green',
    customerEmail: 'farida.begum@gmail.com',
    originalAmount: 1200.00, requestedRefund: 1200.00, approvedRefund: 1200.00,
    currency: 'GBP', reason: 'Duplicate Payment',
    reasonDetail: 'Customer accidentally submitted the same transaction twice within 2 minutes.',
    status: 'Approved', requestedAt: '2026-06-17T14:00:00', processedAt: '2026-06-17T16:30:00',
    adminNote: 'Verified duplicate — full refund approved.', channel: 'Web',
  },
  {
    id: 'REF-26061804', originalTxId: 'TXN-26061801',
    customerId: 'C-10041', customerName: 'Rahul Ahmed',
    customerInitials: 'RA', customerAvatarColor: 'blue',
    customerEmail: 'rahul.ahmed@gmail.com',
    originalAmount: 520.00, requestedRefund: 520.00, approvedRefund: 520.00,
    currency: 'GBP', reason: 'Unauthorized Transaction',
    reasonDetail: 'Customer reports transaction was made without their consent. Possible account compromise.',
    status: 'Processed', requestedAt: '2026-06-17T10:00:00', processedAt: '2026-06-17T14:00:00',
    adminNote: 'Security team verified — full refund processed. Account security review initiated.',
    channel: 'Web',
  },
  {
    id: 'REF-26061805', originalTxId: 'TXN-26061813',
    customerId: 'C-10049', customerName: 'David Osei',
    customerInitials: 'DO', customerAvatarColor: 'rose',
    customerEmail: 'david.osei@gmail.com',
    originalAmount: 1500.00, requestedRefund: 750.00, approvedRefund: 750.00,
    currency: 'GBP', reason: 'Wrong Amount',
    reasonDetail: 'Customer intended to send £750 but accidentally entered £1,500.',
    status: 'Partial', requestedAt: '2026-06-17T16:00:00', processedAt: '2026-06-17T18:00:00',
    adminNote: 'Partial refund of £750 approved — recipient confirmed receiving £750 excess.',
    channel: 'Mobile',
  },
  {
    id: 'REF-26061806', originalTxId: 'TXN-26061814',
    customerId: 'C-10041', customerName: 'Rahul Ahmed',
    customerInitials: 'RA', customerAvatarColor: 'blue',
    customerEmail: 'rahul.ahmed@gmail.com',
    originalAmount: 300.00, requestedRefund: 300.00, approvedRefund: null,
    currency: 'GBP', reason: 'Customer Request',
    reasonDetail: 'Customer changed mind and wants to cancel the withdrawal.',
    status: 'Rejected', requestedAt: '2026-06-17T15:00:00', processedAt: '2026-06-17T15:45:00',
    adminNote: 'Transaction already processed and funds disbursed. Refund not possible at this stage.',
    channel: 'Mobile',
  },
  {
    id: 'REF-26061807', originalTxId: 'TXN-26061816',
    customerId: 'C-10045', customerName: 'Tariq Mahmud',
    customerInitials: 'TM', customerAvatarColor: 'amber',
    customerEmail: 'tariq.mahmud@gmail.com',
    originalAmount: 450.00, requestedRefund: 450.00, approvedRefund: null,
    currency: 'GBP', reason: 'Service Not Received',
    reasonDetail: 'Recipient in Pakistan has not received the funds despite transaction showing completed.',
    status: 'Pending', requestedAt: '2026-06-18T07:00:00', processedAt: null,
    adminNote: '', channel: 'Web',
  },
  {
    id: 'REF-26061808', originalTxId: 'TXN-26061817',
    customerId: 'C-10042', customerName: 'Nadia Islam',
    customerInitials: 'NI', customerAvatarColor: 'purple',
    customerEmail: 'nadia.islam@yahoo.com',
    originalAmount: 200.00, requestedRefund: 200.00, approvedRefund: null,
    currency: 'GBP', reason: 'Customer Request',
    reasonDetail: 'Customer requests refund of top-up amount as they no longer need the service.',
    status: 'Pending', requestedAt: '2026-06-18T06:30:00', processedAt: null,
    adminNote: '', channel: 'Mobile',
  },
];


// wallet fake data end

// ============ COMPANY WALLET ============
export type WalletAccountType = 'Operating' | 'Settlement' | 'Reserve' | 'Float';
export type DepositSource = 'Bank Transfer' | 'SWIFT' | 'SEPA' | 'Faster Payments' | 'CHAPS';
export type WithdrawalType = 'Internal Transfer' | 'Settlement Payout' | 'Partner Payment' | 'Fee Withdrawal';
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
    id: 'CWA-001', name: 'GBP Operating Account', type: 'Operating',
    currency: 'GBP', flag: '🇬🇧', bankName: 'Barclays Bank',
    accountNumber: 'GB29 BARC 2013 1234', balance: 485000,
    reserved: 120000, available: 365000, minThreshold: 100000,
    maxCapacity: 1000000, lastUpdated: '2026-06-18T10:30:00', status: 'Healthy',
  },
  {
    id: 'CWA-002', name: 'USD Settlement Account', type: 'Settlement',
    currency: 'USD', flag: '🇺🇸', bankName: 'JP Morgan Chase',
    accountNumber: 'US12 CHAS 0021 5678', balance: 320000,
    reserved: 85000, available: 235000, minThreshold: 75000,
    maxCapacity: 800000, lastUpdated: '2026-06-18T10:15:00', status: 'Healthy',
  },
  {
    id: 'CWA-003', name: 'BDT Float Account', type: 'Float',
    currency: 'BDT', flag: '🇧🇩', bankName: 'Dutch-Bangla Bank',
    accountNumber: 'BD45 DBBL 1234 5678', balance: 12500000,
    reserved: 8000000, available: 4500000, minThreshold: 5000000,
    maxCapacity: 50000000, lastUpdated: '2026-06-18T09:45:00', status: 'Low',
  },
  {
    id: 'CWA-004', name: 'EUR Reserve Account', type: 'Reserve',
    currency: 'EUR', flag: '🇪🇺', bankName: 'Deutsche Bank',
    accountNumber: 'DE89 3704 0044 0532', balance: 95000,
    reserved: 20000, available: 75000, minThreshold: 50000,
    maxCapacity: 500000, lastUpdated: '2026-06-18T09:00:00', status: 'Healthy',
  },
  {
    id: 'CWA-005', name: 'PKR Float Account', type: 'Float',
    currency: 'PKR', flag: '🇵🇰', bankName: 'Meezan Bank',
    accountNumber: 'PK12 MEZN 0001 2345', balance: 8200000,
    reserved: 7500000, available: 700000, minThreshold: 3000000,
    maxCapacity: 30000000, lastUpdated: '2026-06-18T08:30:00', status: 'Critical',
  },
  {
    id: 'CWA-006', name: 'INR Settlement Account', type: 'Settlement',
    currency: 'INR', flag: '🇮🇳', bankName: 'HDFC Bank',
    accountNumber: 'IN34 HDFC 0001 2345', balance: 18500000,
    reserved: 6000000, available: 12500000, minThreshold: 5000000,
    maxCapacity: 80000000, lastUpdated: '2026-06-18T10:00:00', status: 'Healthy',
  },
];

// ── Corridor Balances ──
export const corridorBalances: CorridorBalance[] = [
  { id: 'COR-001', from: 'UK', fromFlag: '🇬🇧', to: 'Bangladesh', toFlag: '🇧🇩', currency: 'BDT', balance: 4500000,  dailyVolume: 2800000,  utilizationPct: 62, status: 'Low'      },
  { id: 'COR-002', from: 'UK', fromFlag: '🇬🇧', to: 'Pakistan',   toFlag: '🇵🇰', currency: 'PKR', balance: 700000,   dailyVolume: 1200000,  utilizationPct: 91, status: 'Critical' },
  { id: 'COR-003', from: 'UK', fromFlag: '🇬🇧', to: 'India',      toFlag: '🇮🇳', currency: 'INR', balance: 12500000, dailyVolume: 4500000,  utilizationPct: 36, status: 'Healthy'  },
  { id: 'COR-004', from: 'UK', fromFlag: '🇬🇧', to: 'Nigeria',    toFlag: '🇳🇬', currency: 'NGN', balance: 3200000,  dailyVolume: 1800000,  utilizationPct: 56, status: 'Healthy'  },
  { id: 'COR-005', from: 'UK', fromFlag: '🇬🇧', to: 'Philippines',toFlag: '🇵🇭', currency: 'PHP', balance: 1800000,  dailyVolume: 950000,   utilizationPct: 53, status: 'Healthy'  },
  { id: 'COR-006', from: 'UK', fromFlag: '🇬🇧', to: 'UAE',        toFlag: '🇦🇪', currency: 'AED', balance: 520000,   dailyVolume: 680000,   utilizationPct: 78, status: 'Low'      },
];

// ── Company Deposits ──
export const companyDeposits: CompanyDeposit[] = [
  {
    id: 'DEP-26061801', accountId: 'CWA-001', accountName: 'GBP Operating Account',
    currency: 'GBP', amount: 150000, source: 'Faster Payments',
    senderBank: 'HSBC UK', senderRef: 'HSBC-TRF-2026061801',
    receivedAt: '2026-06-18T09:15:00', confirmedAt: '2026-06-18T09:18:00',
    status: 'Confirmed', note: 'Monthly liquidity top-up from HSBC operating account',
  },
  {
    id: 'DEP-26061802', accountId: 'CWA-002', accountName: 'USD Settlement Account',
    currency: 'USD', amount: 80000, source: 'SWIFT',
    senderBank: 'Bank of America', senderRef: 'BOA-SWIFT-20260618',
    receivedAt: '2026-06-18T08:30:00', confirmedAt: '2026-06-18T10:00:00',
    status: 'Confirmed', note: 'USD float replenishment for US corridor',
  },
  {
    id: 'DEP-26061803', accountId: 'CWA-003', accountName: 'BDT Float Account',
    currency: 'BDT', amount: 5000000, source: 'Bank Transfer',
    senderBank: 'Dutch-Bangla Bank', senderRef: 'DBBL-INT-06180001',
    receivedAt: '2026-06-18T07:00:00', confirmedAt: null,
    status: 'Pending', note: 'BDT float top-up — pending bank confirmation',
  },
  {
    id: 'DEP-26061804', accountId: 'CWA-005', accountName: 'PKR Float Account',
    currency: 'PKR', amount: 3000000, source: 'SWIFT',
    senderBank: 'Meezan Bank Pakistan', senderRef: 'MEZN-2026061804',
    receivedAt: '2026-06-17T14:00:00', confirmedAt: '2026-06-17T16:30:00',
    status: 'Confirmed', note: 'Emergency PKR top-up — critical threshold reached',
  },
  {
    id: 'DEP-26061805', accountId: 'CWA-001', accountName: 'GBP Operating Account',
    currency: 'GBP', amount: 200000, source: 'CHAPS',
    senderBank: 'Lloyds Bank', senderRef: 'LLYD-CHAPS-20260617',
    receivedAt: '2026-06-17T11:00:00', confirmedAt: '2026-06-17T11:45:00',
    status: 'Confirmed', note: 'Weekly CHAPS settlement from Lloyds treasury',
  },
  {
    id: 'DEP-26061806', accountId: 'CWA-004', accountName: 'EUR Reserve Account',
    currency: 'EUR', amount: 25000, source: 'SEPA',
    senderBank: 'Deutsche Bank', senderRef: 'DB-SEPA-2026061701',
    receivedAt: '2026-06-17T09:00:00', confirmedAt: '2026-06-17T09:30:00',
    status: 'Confirmed', note: 'EUR reserve top-up via SEPA',
  },
  {
    id: 'DEP-26061807', accountId: 'CWA-006', accountName: 'INR Settlement Account',
    currency: 'INR', amount: 3000000, source: 'SWIFT',
    senderBank: 'HDFC Bank India', senderRef: 'HDFC-SWIFT-0618001',
    receivedAt: '2026-06-16T08:00:00', confirmedAt: null,
    status: 'Failed', note: 'Failed — incorrect SWIFT routing number',
  },
];

// ── Company Withdrawals ──
export const companyWithdrawals: CompanyWithdrawal[] = [
  {
    id: 'WDR-26061801', accountId: 'CWA-001', accountName: 'GBP Operating Account',
    currency: 'GBP', amount: 85000, type: 'Settlement Payout',
    destinationBank: 'Dutch-Bangla Bank', destinationAccount: 'BD45 DBBL 1234',
    corridor: 'UK → Bangladesh', initiatedBy: 'System (Auto-Settlement)',
    initiatedAt: '2026-06-18T10:00:00', processedAt: '2026-06-18T10:05:00',
    status: 'Completed', note: 'Daily Bangladesh corridor settlement payout',
  },
  {
    id: 'WDR-26061802', accountId: 'CWA-001', accountName: 'GBP Operating Account',
    currency: 'GBP', amount: 42000, type: 'Settlement Payout',
    destinationBank: 'Meezan Bank', destinationAccount: 'PK12 MEZN 0001',
    corridor: 'UK → Pakistan', initiatedBy: 'System (Auto-Settlement)',
    initiatedAt: '2026-06-18T09:30:00', processedAt: '2026-06-18T09:35:00',
    status: 'Completed', note: 'Pakistan corridor settlement payout',
  },
  {
    id: 'WDR-26061803', accountId: 'CWA-002', accountName: 'USD Settlement Account',
    currency: 'USD', amount: 15000, type: 'Internal Transfer',
    destinationBank: 'JP Morgan Chase', destinationAccount: 'US12 CHAS 0021',
    initiatedBy: 'Sarah Johnson (Admin)',
    initiatedAt: '2026-06-18T08:45:00', processedAt: null,
    status: 'Pending', note: 'Internal transfer to EUR reserve account',
  },
  {
    id: 'WDR-26061804', accountId: 'CWA-001', accountName: 'GBP Operating Account',
    currency: 'GBP', amount: 28000, type: 'Settlement Payout',
    destinationBank: 'HDFC Bank', destinationAccount: 'IN34 HDFC 0001',
    corridor: 'UK → India', initiatedBy: 'System (Auto-Settlement)',
    initiatedAt: '2026-06-17T22:00:00', processedAt: '2026-06-17T22:08:00',
    status: 'Completed', note: 'India corridor nightly settlement',
  },
  {
    id: 'WDR-26061805', accountId: 'CWA-001', accountName: 'GBP Operating Account',
    currency: 'GBP', amount: 5000, type: 'Fee Withdrawal',
    destinationBank: 'Barclays Bank', destinationAccount: 'GB29 BARC 9999',
    initiatedBy: 'Finance Team',
    initiatedAt: '2026-06-17T18:00:00', processedAt: '2026-06-17T18:10:00',
    status: 'Completed', note: 'Monthly fee collection to revenue account',
  },
  {
    id: 'WDR-26061806', accountId: 'CWA-006', accountName: 'INR Settlement Account',
    currency: 'INR', amount: 2500000, type: 'Settlement Payout',
    destinationBank: 'Axis Bank India', destinationAccount: 'IN99 AXIS 0001',
    corridor: 'UK → India', initiatedBy: 'System (Auto-Settlement)',
    initiatedAt: '2026-06-17T16:00:00', processedAt: null,
    status: 'Failed', note: 'Failed — recipient bank API timeout',
  },
  {
    id: 'WDR-26061807', accountId: 'CWA-002', accountName: 'USD Settlement Account',
    currency: 'USD', amount: 22000, type: 'Partner Payment',
    destinationBank: 'Western Union Partner', destinationAccount: 'WU-PART-9988',
    initiatedBy: 'Operations Team',
    initiatedAt: '2026-06-17T14:30:00', processedAt: '2026-06-17T15:00:00',
    status: 'Completed', note: 'Monthly partner commission payout',
  },
  {
    id: 'WDR-26061808', accountId: 'CWA-001', accountName: 'GBP Operating Account',
    currency: 'GBP', amount: 12000, type: 'Internal Transfer',
    destinationBank: 'Barclays Bank', destinationAccount: 'GB29 BARC 0044',
    initiatedBy: 'Ahmed Khan (Admin)',
    initiatedAt: '2026-06-17T11:00:00', processedAt: null,
    status: 'Cancelled', note: 'Cancelled — duplicate request',
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
    id: 'RATE-001', baseCurrency: 'GBP', baseCurrencyName: 'British Pound', baseFlag: '🇬🇧',
    quoteCurrency: 'USD', quoteCurrencyName: 'US Dollar', quoteFlag: '🇺🇸',
    liveRate: 1.2567, liveChange: 0.0034, liveChangePct: 0.27,
    ourRate: 1.2486, spread: 0.0081, spreadPct: 0.65,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active', autoUpdate: true, priority: 'High',
  },
  {
    id: 'RATE-002', baseCurrency: 'GBP', baseCurrencyName: 'British Pound', baseFlag: '🇬🇧',
    quoteCurrency: 'EUR', quoteCurrencyName: 'Euro', quoteFlag: '🇪🇺',
    liveRate: 1.1678, liveChange: -0.0021, liveChangePct: -0.18,
    ourRate: 1.1603, spread: 0.0075, spreadPct: 0.64,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active', autoUpdate: true, priority: 'High',
  },
  {
    id: 'RATE-003', baseCurrency: 'GBP', baseCurrencyName: 'British Pound', baseFlag: '🇬🇧',
    quoteCurrency: 'BDT', quoteCurrencyName: 'Bangladeshi Taka', quoteFlag: '🇧🇩',
    liveRate: 154.8500, liveChange: 0.3200, liveChangePct: 0.21,
    ourRate: 153.6200, spread: 1.2300, spreadPct: 0.79,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active', autoUpdate: true, priority: 'High',
  },
  {
    id: 'RATE-004', baseCurrency: 'USD', baseCurrencyName: 'US Dollar', baseFlag: '🇺🇸',
    quoteCurrency: 'BDT', quoteCurrencyName: 'Bangladeshi Taka', quoteFlag: '🇧🇩',
    liveRate: 123.2500, liveChange: 0.1500, liveChangePct: 0.12,
    ourRate: 122.3800, spread: 0.8700, spreadPct: 0.71,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active', autoUpdate: true, priority: 'Medium',
  },
  {
    id: 'RATE-005', baseCurrency: 'EUR', baseCurrencyName: 'Euro', baseFlag: '🇪🇺',
    quoteCurrency: 'USD', quoteCurrencyName: 'US Dollar', quoteFlag: '🇺🇸',
    liveRate: 1.0763, liveChange: 0.0015, liveChangePct: 0.14,
    ourRate: 1.0695, spread: 0.0068, spreadPct: 0.63,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active', autoUpdate: true, priority: 'Medium',
  },
  {
    id: 'RATE-006', baseCurrency: 'EUR', baseCurrencyName: 'Euro', baseFlag: '🇪🇺',
    quoteCurrency: 'BDT', quoteCurrencyName: 'Bangladeshi Taka', quoteFlag: '🇧🇩',
    liveRate: 132.2800, liveChange: -0.2100, liveChangePct: -0.16,
    ourRate: 131.3200, spread: 0.9600, spreadPct: 0.73,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active', autoUpdate: true, priority: 'Medium',
  },
  {
    id: 'RATE-007', baseCurrency: 'USD', baseCurrencyName: 'US Dollar', baseFlag: '🇺🇸',
    quoteCurrency: 'EUR', quoteCurrencyName: 'Euro', quoteFlag: '🇪🇺',
    liveRate: 0.9289, liveChange: -0.0012, liveChangePct: -0.13,
    ourRate: 0.9232, spread: 0.0057, spreadPct: 0.61,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active', autoUpdate: true, priority: 'Low',
  },
  {
    id: 'RATE-008', baseCurrency: 'AUD', baseCurrencyName: 'Australian Dollar', baseFlag: '🇦🇺',
    quoteCurrency: 'USD', quoteCurrencyName: 'US Dollar', quoteFlag: '🇺🇸',
    liveRate: 0.6642, liveChange: 0.0023, liveChangePct: 0.35,
    ourRate: 0.6600, spread: 0.0042, spreadPct: 0.63,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active', autoUpdate: true, priority: 'Low',
  },
  {
    id: 'RATE-009', baseCurrency: 'GBP', baseCurrencyName: 'British Pound', baseFlag: '🇬🇧',
    quoteCurrency: 'PKR', quoteCurrencyName: 'Pakistani Rupee', quoteFlag: '🇵🇰',
    liveRate: 349.1200, liveChange: 0.8800, liveChangePct: 0.25,
    ourRate: 346.8900, spread: 2.2300, spreadPct: 0.64,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active', autoUpdate: true, priority: 'Medium',
  },
  {
    id: 'RATE-010', baseCurrency: 'GBP', baseCurrencyName: 'British Pound', baseFlag: '🇬🇧',
    quoteCurrency: 'INR', quoteCurrencyName: 'Indian Rupee', quoteFlag: '🇮🇳',
    liveRate: 105.6200, liveChange: -0.1400, liveChangePct: -0.13,
    ourRate: 104.9300, spread: 0.6900, spreadPct: 0.65,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active', autoUpdate: true, priority: 'Medium',
  },
  {
    id: 'RATE-011', baseCurrency: 'GBP', baseCurrencyName: 'British Pound', baseFlag: '🇬🇧',
    quoteCurrency: 'AED', quoteCurrencyName: 'UAE Dirham', quoteFlag: '🇦🇪',
    liveRate: 4.6180, liveChange: 0.0090, liveChangePct: 0.20,
    ourRate: 4.5880, spread: 0.0300, spreadPct: 0.65,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active', autoUpdate: true, priority: 'Low',
  },
  {
    id: 'RATE-012', baseCurrency: 'USD', baseCurrencyName: 'US Dollar', baseFlag: '🇺🇸',
    quoteCurrency: 'PHP', quoteCurrencyName: 'Philippine Peso', quoteFlag: '🇵🇭',
    liveRate: 56.2400, liveChange: 0.1100, liveChangePct: 0.20,
    ourRate: 55.8800, spread: 0.3600, spreadPct: 0.64,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Active', autoUpdate: true, priority: 'Low',
  },
  {
    id: 'RATE-013', baseCurrency: 'USD', baseCurrencyName: 'US Dollar', baseFlag: '🇺🇸',
    quoteCurrency: 'NGN', quoteCurrencyName: 'Nigerian Naira', quoteFlag: '🇳🇬',
    liveRate: 1542.5000, liveChange: -3.2000, liveChangePct: -0.21,
    ourRate: 1532.6000, spread: 9.9000, spreadPct: 0.64,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Paused', autoUpdate: false, priority: 'Low',
  },
  {
    id: 'RATE-014', baseCurrency: 'GBP', baseCurrencyName: 'British Pound', baseFlag: '🇬🇧',
    quoteCurrency: 'CAD', quoteCurrencyName: 'Canadian Dollar', quoteFlag: '🇨🇦',
    liveRate: 1.7235, liveChange: 0.0028, liveChangePct: 0.16,
    ourRate: 1.7124, spread: 0.0111, spreadPct: 0.64,
    source: 'Xe.com', lastUpdated: 'May 12, 2025 2:30 PM', nextUpdate: 'May 12, 2025 2:31 PM',
    status: 'Inactive', autoUpdate: false, priority: 'Low',
  },
];

// ── Rate Movement (GBP/USD) chart series ──
export const rateMovement1D: RatePoint[] = [
  { time: '12 AM', rate: 1.2543 }, { time: '03 AM', rate: 1.2521 },
  { time: '06 AM', rate: 1.2538 }, { time: '09 AM', rate: 1.2575 },
  { time: '12 PM', rate: 1.2560 }, { time: '03 PM', rate: 1.2592 },
  { time: '06 PM', rate: 1.2548 }, { time: '09 PM', rate: 1.2567 },
];

export const rateMovement7D: RatePoint[] = [
  { time: 'May 6', rate: 1.2356 }, { time: 'May 7', rate: 1.2421 },
  { time: 'May 8', rate: 1.2398 }, { time: 'May 9', rate: 1.2512 },
  { time: 'May 10', rate: 1.2487 }, { time: 'May 11', rate: 1.2654 },
  { time: 'May 12', rate: 1.2567 },
];

export const rateMovement30D: RatePoint[] = [
  { time: 'Apr 13', rate: 1.2210 }, { time: 'Apr 18', rate: 1.2345 },
  { time: 'Apr 23', rate: 1.2289 }, { time: 'Apr 28', rate: 1.2456 },
  { time: 'May 3', rate: 1.2598 }, { time: 'May 8', rate: 1.2398 },
  { time: 'May 12', rate: 1.2567 },
];

// ── Rate Summary (for GBP/USD selected pair) ──
export const rateSummary = {
  todaysHigh: 1.2589,
  todaysLow: 1.2432,
  sevenDayHigh: 1.2654,
  sevenDayLow: 1.2356,
  thirtyDayHigh: 1.2789,
  thirtyDayLow: 1.2210,
  average7d: 1.2486,
  volatility7d: 0.87,
};

export const rateBaseCurrencyOptions = ['All Base Currencies', 'GBP', 'USD', 'EUR', 'AUD'];
export const rateQuoteCurrencyOptions = [
  'All Quote Currencies', 'USD', 'EUR', 'BDT', 'PKR', 'INR', 'AED', 'PHP', 'NGN', 'CAD',
];
export const rateStatusOptions = ['All Status', 'Active', 'Inactive', 'Paused'];

export const RATE_PAGE_SIZE = 8;
export const RATE_TOTAL = 28;


// menual override 

// ============ MANUAL RATE OVERRIDE ============
export type OverrideStatus = 'Active' | 'Expired' | 'Reverted' | 'Scheduled';
export type OverrideDuration = '1 Hour' | '4 Hours' | '12 Hours' | '24 Hours' | 'Until Reverted';

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
    baseCurrency: 'GBP', baseFlag: '🇬🇧', quoteCurrency: 'BDT', quoteFlag: '🇧🇩',
    liveRate: 154.8500, overrideRate: 153.0000, diffPct: -1.20,
    reason: 'Market volatility spike — capping rate to protect margin during BDT liquidity crunch.',
    duration: '12 Hours', status: 'Active',
    setBy: 'Sarah Johnson', setByInitials: 'SJ',
    setAt: '2025-05-12T11:00:00', expiresAt: '2025-05-12T23:00:00',
    autoRevert: true,
  },
  {
    id: 'OVR-002',
    baseCurrency: 'USD', baseFlag: '🇺🇸', quoteCurrency: 'PKR', quoteFlag: '🇵🇰',
    liveRate: 278.4500, overrideRate: 280.0000, diffPct: 0.56,
    reason: 'Promotional rate boost for Eid remittance campaign — approved by Marketing.',
    duration: '24 Hours', status: 'Active',
    setBy: 'Ahmed Khan', setByInitials: 'AK',
    setAt: '2025-05-12T08:30:00', expiresAt: '2025-05-13T08:30:00',
    autoRevert: true,
  },
  {
    id: 'OVR-003',
    baseCurrency: 'GBP', baseFlag: '🇬🇧', quoteCurrency: 'PKR', quoteFlag: '🇵🇰',
    liveRate: 349.1200, overrideRate: 345.0000, diffPct: -1.18,
    reason: 'Compliance hold — provider feed flagged as unreliable, using last verified rate.',
    duration: 'Until Reverted', status: 'Active',
    setBy: 'Sarah Johnson', setByInitials: 'SJ',
    setAt: '2025-05-12T13:15:00', expiresAt: null,
    autoRevert: false,
  },
  {
    id: 'OVR-004',
    baseCurrency: 'EUR', baseFlag: '🇪🇺', quoteCurrency: 'BDT', quoteFlag: '🇧🇩',
    liveRate: 132.2800, overrideRate: 131.5000, diffPct: -0.59,
    reason: 'Competitor price match for high-volume corporate client.',
    duration: '4 Hours', status: 'Expired',
    setBy: 'Imran Hossain', setByInitials: 'IH',
    setAt: '2025-05-11T09:00:00', expiresAt: '2025-05-11T13:00:00',
    autoRevert: true,
  },
  {
    id: 'OVR-005',
    baseCurrency: 'GBP', baseFlag: '🇬🇧', quoteCurrency: 'USD', quoteFlag: '🇺🇸',
    liveRate: 1.2567, overrideRate: 1.2600, diffPct: 0.26,
    reason: 'Manual correction — provider rate lagged by 4 minutes during high volatility window.',
    duration: '1 Hour', status: 'Reverted',
    setBy: 'Ahmed Khan', setByInitials: 'AK',
    setAt: '2025-05-10T16:20:00', expiresAt: '2025-05-10T17:20:00',
    autoRevert: true,
  },
  {
    id: 'OVR-006',
    baseCurrency: 'USD', baseFlag: '🇺🇸', quoteCurrency: 'NGN', quoteFlag: '🇳🇬',
    liveRate: 1542.5000, overrideRate: 1500.0000, diffPct: -2.76,
    reason: 'Scheduled override for upcoming Nigerian bank holiday liquidity adjustment.',
    duration: '24 Hours', status: 'Scheduled',
    setBy: 'Sarah Johnson', setByInitials: 'SJ',
    setAt: '2025-05-12T14:00:00', expiresAt: '2025-05-13T14:00:00',
    autoRevert: true,
  },
];

// ── Override Activity Log ──
export const overrideLog: OverrideLogEntry[] = [
  {
    id: 'LOG-001', action: 'Created', pairLabel: 'GBP / BDT', pairFlags: '🇬🇧🇧🇩',
    rate: 153.0000, performedBy: 'Sarah Johnson', performedByInitials: 'SJ',
    timestamp: '2025-05-12T11:00:00',
    note: 'Override created — market volatility protection',
  },
  {
    id: 'LOG-002', action: 'Created', pairLabel: 'USD / PKR', pairFlags: '🇺🇸🇵🇰',
    rate: 280.0000, performedBy: 'Ahmed Khan', performedByInitials: 'AK',
    timestamp: '2025-05-12T08:30:00',
    note: 'Promotional campaign rate applied',
  },
  {
    id: 'LOG-003', action: 'Created', pairLabel: 'GBP / PKR', pairFlags: '🇬🇧🇵🇰',
    rate: 345.0000, performedBy: 'Sarah Johnson', performedByInitials: 'SJ',
    timestamp: '2025-05-12T13:15:00',
    note: 'Compliance hold on unreliable provider feed',
  },
  {
    id: 'LOG-004', action: 'Reverted', pairLabel: 'GBP / USD', pairFlags: '🇬🇧🇺🇸',
    rate: 1.2567, performedBy: 'System (Auto)', performedByInitials: 'SY',
    timestamp: '2025-05-10T17:20:00',
    note: 'Auto-reverted to live rate after 1 hour expiry',
  },
  {
    id: 'LOG-005', action: 'Created', pairLabel: 'GBP / USD', pairFlags: '🇬🇧🇺🇸',
    rate: 1.2600, performedBy: 'Ahmed Khan', performedByInitials: 'AK',
    timestamp: '2025-05-10T16:20:00',
    note: 'Manual correction for provider lag',
  },
  {
    id: 'LOG-006', action: 'Expired', pairLabel: 'EUR / BDT', pairFlags: '🇪🇺🇧🇩',
    rate: 131.5000, performedBy: 'System (Auto)', performedByInitials: 'SY',
    timestamp: '2025-05-11T13:00:00',
    note: 'Override expired after 4 hours, reverted to live rate',
  },
  {
    id: 'LOG-007', action: 'Created', pairLabel: 'EUR / BDT', pairFlags: '🇪🇺🇧🇩',
    rate: 131.5000, performedBy: 'Imran Hossain', performedByInitials: 'IH',
    timestamp: '2025-05-11T09:00:00',
    note: 'Competitor price match approved',
  },
  {
    id: 'LOG-008', action: 'Updated', pairLabel: 'USD / PKR', pairFlags: '🇺🇸🇵🇰',
    rate: 280.0000, performedBy: 'Ahmed Khan', performedByInitials: 'AK',
    timestamp: '2025-05-12T09:10:00',
    note: 'Duration extended from 12 to 24 hours',
  },
];

export const overrideDurationOptions: OverrideDuration[] = [
  '1 Hour', '4 Hours', '12 Hours', '24 Hours', 'Until Reverted',
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
    id: 'SPR-001', baseCurrency: 'GBP', baseFlag: '🇬🇧', quoteCurrency: 'USD', quoteFlag: '🇺🇸',
    currentSpreadPct: 0.65, minSpreadPct: 0.40, maxSpreadPct: 0.90, defaultSpreadPct: 0.65,
    monthlyVolume: 4256780, volumeCurrency: 'GBP', status: 'Active',
    lastUpdated: 'May 10, 2025', updatedBy: 'Sarah Johnson',
  },
  {
    id: 'SPR-002', baseCurrency: 'GBP', baseFlag: '🇬🇧', quoteCurrency: 'EUR', quoteFlag: '🇪🇺',
    currentSpreadPct: 0.64, minSpreadPct: 0.40, maxSpreadPct: 0.90, defaultSpreadPct: 0.60,
    monthlyVolume: 2856420, volumeCurrency: 'GBP', status: 'Active',
    lastUpdated: 'May 9, 2025', updatedBy: 'Ahmed Khan',
  },
  {
    id: 'SPR-003', baseCurrency: 'GBP', baseFlag: '🇬🇧', quoteCurrency: 'BDT', quoteFlag: '🇧🇩',
    currentSpreadPct: 0.79, minSpreadPct: 0.50, maxSpreadPct: 1.00, defaultSpreadPct: 0.75,
    monthlyVolume: 6125400, volumeCurrency: 'GBP', status: 'Active',
    lastUpdated: 'May 12, 2025', updatedBy: 'Sarah Johnson',
  },
  {
    id: 'SPR-004', baseCurrency: 'USD', baseFlag: '🇺🇸', quoteCurrency: 'BDT', quoteFlag: '🇧🇩',
    currentSpreadPct: 0.71, minSpreadPct: 0.50, maxSpreadPct: 1.00, defaultSpreadPct: 0.70,
    monthlyVolume: 3856230, volumeCurrency: 'USD', status: 'Active',
    lastUpdated: 'May 8, 2025', updatedBy: 'Imran Hossain',
  },
  {
    id: 'SPR-005', baseCurrency: 'EUR', baseFlag: '🇪🇺', quoteCurrency: 'USD', quoteFlag: '🇺🇸',
    currentSpreadPct: 0.63, minSpreadPct: 0.40, maxSpreadPct: 0.90, defaultSpreadPct: 0.60,
    monthlyVolume: 1985600, volumeCurrency: 'EUR', status: 'Active',
    lastUpdated: 'May 7, 2025', updatedBy: 'Ahmed Khan',
  },
  {
    id: 'SPR-006', baseCurrency: 'EUR', baseFlag: '🇪🇺', quoteCurrency: 'BDT', quoteFlag: '🇧🇩',
    currentSpreadPct: 0.73, minSpreadPct: 0.50, maxSpreadPct: 1.00, defaultSpreadPct: 0.70,
    monthlyVolume: 1456780, volumeCurrency: 'EUR', status: 'Active',
    lastUpdated: 'May 6, 2025', updatedBy: 'Sarah Johnson',
  },
  {
    id: 'SPR-007', baseCurrency: 'USD', baseFlag: '🇺🇸', quoteCurrency: 'EUR', quoteFlag: '🇪🇺',
    currentSpreadPct: 0.57, minSpreadPct: 0.40, maxSpreadPct: 0.90, defaultSpreadPct: 0.60,
    monthlyVolume: 985450, volumeCurrency: 'USD', status: 'Active',
    lastUpdated: 'May 5, 2025', updatedBy: 'Imran Hossain',
  },
  {
    id: 'SPR-008', baseCurrency: 'GBP', baseFlag: '🇬🇧', quoteCurrency: 'PKR', quoteFlag: '🇵🇰',
    currentSpreadPct: 0.64, minSpreadPct: 0.50, maxSpreadPct: 1.00, defaultSpreadPct: 0.70,
    monthlyVolume: 2256800, volumeCurrency: 'GBP', status: 'Active',
    lastUpdated: 'May 11, 2025', updatedBy: 'Sarah Johnson',
  },
  {
    id: 'SPR-009', baseCurrency: 'USD', baseFlag: '🇺🇸', quoteCurrency: 'PKR', quoteFlag: '🇵🇰',
    currentSpreadPct: 1.23, minSpreadPct: 0.50, maxSpreadPct: 1.00, defaultSpreadPct: 0.75,
    monthlyVolume: 1685200, volumeCurrency: 'USD', status: 'Active',
    lastUpdated: 'May 12, 2025', updatedBy: 'Ahmed Khan',
  },
  {
    id: 'SPR-010', baseCurrency: 'USD', baseFlag: '🇺🇸', quoteCurrency: 'NGN', quoteFlag: '🇳🇬',
    currentSpreadPct: 0.97, minSpreadPct: 0.50, maxSpreadPct: 1.00, defaultSpreadPct: 0.80,
    monthlyVolume: 856420, volumeCurrency: 'USD', status: 'Inactive',
    lastUpdated: 'Apr 28, 2025', updatedBy: 'Imran Hossain',
  },
  {
    id: 'SPR-011', baseCurrency: 'GBP', baseFlag: '🇬🇧', quoteCurrency: 'INR', quoteFlag: '🇮🇳',
    currentSpreadPct: 0.65, minSpreadPct: 0.40, maxSpreadPct: 0.90, defaultSpreadPct: 0.65,
    monthlyVolume: 1985200, volumeCurrency: 'GBP', status: 'Active',
    lastUpdated: 'May 10, 2025', updatedBy: 'Sarah Johnson',
  },
  {
    id: 'SPR-012', baseCurrency: 'GBP', baseFlag: '🇬🇧', quoteCurrency: 'AED', quoteFlag: '🇦🇪',
    currentSpreadPct: 0.65, minSpreadPct: 0.40, maxSpreadPct: 0.90, defaultSpreadPct: 0.65,
    monthlyVolume: 685200, volumeCurrency: 'GBP', status: 'Active',
    lastUpdated: 'May 4, 2025', updatedBy: 'Ahmed Khan',
  },
];

// ── Customer Tier-based spread discounts ──
export const customerTiers: CustomerTier[] = [
  { tier: 'Standard', monthlyVolumeThreshold: 0, spreadDiscountPct: 0, customerCount: 8642, color: 'gray' },
  { tier: 'Silver', monthlyVolumeThreshold: 5000, spreadDiscountPct: 10, customerCount: 2156, color: 'blue' },
  { tier: 'Gold', monthlyVolumeThreshold: 20000, spreadDiscountPct: 20, customerCount: 654, color: 'amber' },
  { tier: 'Platinum', monthlyVolumeThreshold: 50000, spreadDiscountPct: 35, customerCount: 128, color: 'purple' },
];

// ── Spread Change Log ──
export const spreadChangeLog: SpreadChangeLogEntry[] = [
  {
    id: 'SCL-001', pairLabel: 'USD / PKR', pairFlags: '🇺🇸🇵🇰',
    fromPct: 0.75, toPct: 1.23,
    changedBy: 'Ahmed Khan', changedByInitials: 'AK',
    timestamp: '2025-05-12T10:30:00',
    note: 'Increased due to high volatility in PKR corridor and provider liquidity risk.',
  },
  {
    id: 'SCL-002', pairLabel: 'GBP / BDT', pairFlags: '🇬🇧🇧🇩',
    fromPct: 0.75, toPct: 0.79,
    changedBy: 'Sarah Johnson', changedByInitials: 'SJ',
    timestamp: '2025-05-12T09:00:00',
    note: 'Adjusted to reflect increased operational cost in BDT settlement.',
  },
  {
    id: 'SCL-003', pairLabel: 'GBP / PKR', pairFlags: '🇬🇧🇵🇰',
    fromPct: 0.70, toPct: 0.64,
    changedBy: 'Sarah Johnson', changedByInitials: 'SJ',
    timestamp: '2025-05-11T15:20:00',
    note: 'Reduced spread to stay competitive against market rate aggregators.',
  },
  {
    id: 'SCL-004', pairLabel: 'USD / BDT', pairFlags: '🇺🇸🇧🇩',
    fromPct: 0.68, toPct: 0.71,
    changedBy: 'Imran Hossain', changedByInitials: 'IH',
    timestamp: '2025-05-08T11:45:00',
    note: 'Minor adjustment after monthly margin review.',
  },
  {
    id: 'SCL-005', pairLabel: 'USD / NGN', pairFlags: '🇺🇸🇳🇬',
    fromPct: 0.80, toPct: 0.97,
    changedBy: 'Imran Hossain', changedByInitials: 'IH',
    timestamp: '2025-04-28T14:10:00',
    note: 'Pair deactivated pending compliance review — spread frozen at last value.',
  },
  {
    id: 'SCL-006', pairLabel: 'EUR / USD', pairFlags: '🇪🇺🇺🇸',
    fromPct: 0.60, toPct: 0.57,
    changedBy: 'Ahmed Khan', changedByInitials: 'AK',
    timestamp: '2025-05-05T08:30:00',
    note: 'Reduced as part of Q2 competitive pricing initiative.',
  },
];

export const spreadStatusOptions = ['All Status', 'Active', 'Inactive'];


// payment overview data =>

// ============ PAYMENT METHODS ============
export type PaymentMethodType = 'Bank Transfer' | 'Mobile Wallet' | 'Cash Pickup' | 'Card Payments';
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
    icon: '🏦', iconBg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    activeMethods: 32, status: 'Active' as PaymentMethodStatus,
    countries: 8, secondaryLabel: 'Banks', secondaryValue: 156,
  },
  {
    type: 'Mobile Wallet' as PaymentMethodType,
    icon: '📱', iconBg: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
    activeMethods: 18, status: 'Active' as PaymentMethodStatus,
    countries: 6, secondaryLabel: 'Transactions', secondaryValue: 2_450_000,
  },
  {
    type: 'Cash Pickup' as PaymentMethodType,
    icon: '👁', iconBg: 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400',
    activeMethods: 24, status: 'Active' as PaymentMethodStatus,
    countries: 12, secondaryLabel: 'Transactions', secondaryValue: 1_120_000,
  },
  {
    type: 'Card Payments' as PaymentMethodType,
    icon: '💳', iconBg: 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
    activeMethods: 12, status: 'Active' as PaymentMethodStatus,
    countries: 4, secondaryLabel: 'Transactions', secondaryValue: 892_000,
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
    id: 'PM-001', name: 'HSBC Bank Transfer', type: 'Bank Transfer',
    icon: '🏦', iconBg: 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400',
    provider: 'HSBC', providerLogo: '🔴',
    countries: ['United Kingdom', 'United States', 'UAE', 'Singapore', 'Hong Kong', 'France', 'Germany', 'Canada'],
    countryCount: 8, currencies: ['GBP', 'USD', 'EUR', 'BDT'], status: 'Active',
    transactions: 245680, transactionFeePct: 0.50, minTransaction: 10, maxTransaction: 100000,
    dailyLimit: 250000, limitCurrency: 'GBP', connectedOn: 'Jan 10, 2024 09:00 AM',
    weeklyTransactions: 18540, weeklyVolume: 8245600, weeklyVolumeCurrency: 'GBP', successRatePct: 99.1,
    weeklyTransactionsChangePct: 8.2, weeklyVolumeChangePct: 6.5, successRateChangePct: 0.4,
  },
  {
    id: 'PM-002', name: 'bKash', type: 'Mobile Wallet',
    icon: '📱', iconBg: 'bg-pink-50 dark:bg-pink-950 text-pink-600 dark:text-pink-400',
    provider: 'bKash Limited', providerLogo: '🇵🇭',
    countries: ['Bangladesh'], countryCount: 1, currencies: ['BDT'], status: 'Active',
    transactions: 1245780, transactionFeePct: 1.50, minTransaction: 10, maxTransaction: 50000,
    dailyLimit: 200000, limitCurrency: 'BDT', connectedOn: 'Jan 15, 2024 10:30 AM',
    weeklyTransactions: 124580, weeklyVolume: 245680000, weeklyVolumeCurrency: 'BDT', successRatePct: 98.45,
    weeklyTransactionsChangePct: 12.5, weeklyVolumeChangePct: 8.3, successRateChangePct: 1.2,
  },
  {
    id: 'PM-003', name: 'Nagad', type: 'Mobile Wallet',
    icon: '🟠', iconBg: 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400',
    provider: 'Nagad Limited', providerLogo: '🟠',
    countries: ['Bangladesh'], countryCount: 1, currencies: ['BDT'], status: 'Active',
    transactions: 856230, transactionFeePct: 1.20, minTransaction: 10, maxTransaction: 45000,
    dailyLimit: 180000, limitCurrency: 'BDT', connectedOn: 'Feb 2, 2024 11:00 AM',
    weeklyTransactions: 78540, weeklyVolume: 156280000, weeklyVolumeCurrency: 'BDT', successRatePct: 97.8,
    weeklyTransactionsChangePct: 9.4, weeklyVolumeChangePct: 7.1, successRateChangePct: 0.8,
  },
  {
    id: 'PM-004', name: 'Rocket', type: 'Mobile Wallet',
    icon: '🚀', iconBg: 'bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400',
    provider: 'Rocket (DBBL)', providerLogo: '🚀',
    countries: ['Bangladesh'], countryCount: 1, currencies: ['BDT'], status: 'Active',
    transactions: 342680, transactionFeePct: 1.30, minTransaction: 10, maxTransaction: 40000,
    dailyLimit: 150000, limitCurrency: 'BDT', connectedOn: 'Feb 18, 2024 02:15 PM',
    weeklyTransactions: 28450, weeklyVolume: 52860000, weeklyVolumeCurrency: 'BDT', successRatePct: 96.9,
    weeklyTransactionsChangePct: 4.6, weeklyVolumeChangePct: 3.9, successRateChangePct: -0.3,
  },
  {
    id: 'PM-005', name: 'Cash Pickup (Agent)', type: 'Cash Pickup',
    icon: '👥', iconBg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    provider: 'Global Agent Network', providerLogo: '🌐',
    countries: ['Bangladesh', 'Pakistan', 'India', 'Philippines', 'Nigeria', 'UAE', 'Saudi Arabia', 'Malaysia', 'Nepal', 'Sri Lanka', 'Kenya', 'Ghana'],
    countryCount: 12, currencies: ['USD', 'EUR', 'BDT'], status: 'Active',
    transactions: 1123450, transactionFeePct: 2.00, minTransaction: 20, maxTransaction: 5000,
    dailyLimit: 50000, limitCurrency: 'USD', connectedOn: 'Jan 5, 2024 08:45 AM',
    weeklyTransactions: 96420, weeklyVolume: 18560000, weeklyVolumeCurrency: 'USD', successRatePct: 95.6,
    weeklyTransactionsChangePct: 6.8, weeklyVolumeChangePct: 5.2, successRateChangePct: 0.5,
  },
  {
    id: 'PM-006', name: 'Visa Card', type: 'Card Payments',
    icon: '💳', iconBg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    provider: 'Visa', providerLogo: '🔵',
    countries: ['United Kingdom', 'United States', 'Eurozone', 'UAE'], countryCount: 4,
    currencies: ['USD', 'EUR', 'GBP'], status: 'Active',
    transactions: 512410, transactionFeePct: 2.50, minTransaction: 10, maxTransaction: 25000,
    dailyLimit: 50000, limitCurrency: 'USD', connectedOn: 'Jan 8, 2024 01:00 PM',
    weeklyTransactions: 42850, weeklyVolume: 7856200, weeklyVolumeCurrency: 'USD', successRatePct: 97.4,
    weeklyTransactionsChangePct: 5.9, weeklyVolumeChangePct: 4.8, successRateChangePct: 0.6,
  },
  {
    id: 'PM-007', name: 'Mastercard', type: 'Card Payments',
    icon: '💳', iconBg: 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400',
    provider: 'Mastercard', providerLogo: '🟠',
    countries: ['United Kingdom', 'United States', 'Eurozone', 'UAE'], countryCount: 4,
    currencies: ['USD', 'EUR', 'GBP'], status: 'Active',
    transactions: 379240, transactionFeePct: 2.50, minTransaction: 10, maxTransaction: 25000,
    dailyLimit: 50000, limitCurrency: 'USD', connectedOn: 'Jan 8, 2024 01:10 PM',
    weeklyTransactions: 31250, weeklyVolume: 5642300, weeklyVolumeCurrency: 'USD', successRatePct: 96.8,
    weeklyTransactionsChangePct: 4.2, weeklyVolumeChangePct: 3.6, successRateChangePct: 0.3,
  },
  {
    id: 'PM-008', name: 'Bank of America Transfer', type: 'Bank Transfer',
    icon: '🏦', iconBg: 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400',
    provider: 'Bank of America', providerLogo: '🔷',
    countries: ['United States', 'Canada'], countryCount: 2, currencies: ['USD'], status: 'Inactive',
    transactions: 0, transactionFeePct: 0.60, minTransaction: 10, maxTransaction: 100000,
    dailyLimit: 200000, limitCurrency: 'USD', connectedOn: 'Mar 1, 2024 10:00 AM',
    weeklyTransactions: 0, weeklyVolume: 0, weeklyVolumeCurrency: 'USD', successRatePct: 0,
    weeklyTransactionsChangePct: 0, weeklyVolumeChangePct: 0, successRateChangePct: 0,
  },
  {
    id: 'PM-009', name: 'Barclays Transfer', type: 'Bank Transfer',
    icon: '🏦', iconBg: 'bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400',
    provider: 'Barclays', providerLogo: '🔵',
    countries: ['United Kingdom'], countryCount: 1, currencies: ['GBP'], status: 'Active',
    transactions: 186420, transactionFeePct: 0.45, minTransaction: 10, maxTransaction: 100000,
    dailyLimit: 250000, limitCurrency: 'GBP', connectedOn: 'Jan 12, 2024 09:30 AM',
    weeklyTransactions: 15420, weeklyVolume: 6842300, weeklyVolumeCurrency: 'GBP', successRatePct: 99.3,
    weeklyTransactionsChangePct: 7.1, weeklyVolumeChangePct: 5.9, successRateChangePct: 0.2,
  },
  {
    id: 'PM-010', name: 'Easypaisa', type: 'Mobile Wallet',
    icon: '📲', iconBg: 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400',
    provider: 'Telenor Microfinance Bank', providerLogo: '🟢',
    countries: ['Pakistan'], countryCount: 1, currencies: ['PKR'], status: 'Active',
    transactions: 425600, transactionFeePct: 1.40, minTransaction: 10, maxTransaction: 30000,
    dailyLimit: 120000, limitCurrency: 'PKR', connectedOn: 'Feb 22, 2024 03:30 PM',
    weeklyTransactions: 35840, weeklyVolume: 68420000, weeklyVolumeCurrency: 'PKR', successRatePct: 96.2,
    weeklyTransactionsChangePct: 5.4, weeklyVolumeChangePct: 4.1, successRateChangePct: -0.2,
  },
  {
    id: 'PM-011', name: 'GCash', type: 'Mobile Wallet',
    icon: '🔵', iconBg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    provider: 'Globe Fintech Innovations', providerLogo: '🔵',
    countries: ['Philippines'], countryCount: 1, currencies: ['PHP'], status: 'Active',
    transactions: 612400, transactionFeePct: 1.10, minTransaction: 10, maxTransaction: 50000,
    dailyLimit: 150000, limitCurrency: 'PHP', connectedOn: 'Jan 28, 2024 12:00 PM',
    weeklyTransactions: 52680, weeklyVolume: 48560000, weeklyVolumeCurrency: 'PHP', successRatePct: 97.9,
    weeklyTransactionsChangePct: 6.2, weeklyVolumeChangePct: 5.0, successRateChangePct: 0.5,
  },
  {
    id: 'PM-012', name: 'Cash Pickup (Western Union Partner)', type: 'Cash Pickup',
    icon: '👥', iconBg: 'bg-yellow-50 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400',
    provider: 'Western Union Network', providerLogo: '🟡',
    countries: ['Nigeria', 'Ghana', 'Kenya'], countryCount: 3, currencies: ['NGN', 'GHS', 'KES'], status: 'Active',
    transactions: 286400, transactionFeePct: 2.20, minTransaction: 20, maxTransaction: 3000,
    dailyLimit: 30000, limitCurrency: 'USD', connectedOn: 'Mar 5, 2024 09:00 AM',
    weeklyTransactions: 24560, weeklyVolume: 4256000, weeklyVolumeCurrency: 'USD', successRatePct: 94.8,
    weeklyTransactionsChangePct: 3.8, weeklyVolumeChangePct: 2.9, successRateChangePct: -0.6,
  },
];

export const paymentMethodTypeOptions: PaymentMethodType[] = [
  'Bank Transfer', 'Mobile Wallet', 'Cash Pickup', 'Card Payments',
];
export const paymentCountryOptions = ['All Countries', 'Bangladesh', 'Pakistan', 'United Kingdom', 'United States', 'Philippines', 'Nigeria', 'UAE'];
export const paymentCurrencyOptions = ['All Currencies', 'GBP', 'USD', 'EUR', 'BDT', 'PKR', 'PHP'];
export const paymentStatusOptions = ['All Status', 'Active', 'Inactive'];

export const PAYMENT_TOTAL = 86;
export const PAYMENT_PAGE_SIZE = 8;