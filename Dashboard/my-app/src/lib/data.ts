import { Transaction, UserProfile, PaymentMethod } from '@/types';

export const mockUser: UserProfile = {
  userId: 'TSM-1002456',
  name: 'John Rahman',
  phone: '+880 1812-345678',
  dob: '15 Jun 1990',
  nid: 'NID: 1234 5678 9012',
  address: 'House 12, Road 5, Dhanmondi, Dhaka, Bangladesh',
  country: 'Bangladesh',
  email: 'johnrahman@gmail.com',
  walletBalance: 1250.0,
  currency: 'USD',
  verified: true,
};

export const mockTransactions: Transaction[] = [
  {
    id: '#TSM12345678',
    to: 'Ahmed Khan',
    amount: 500.0,
    currency: 'USD',
    status: 'Completed',
    date: '12 May 2025',
    time: '10:30 AM',
  },
  {
    id: '#TSM12345677',
    to: 'Rahim Uddin',
    amount: 300.0,
    currency: 'USD',
    status: 'Completed',
    date: '11 May 2025',
    time: '08:15 AM',
  },
  {
    id: '#TSM12345676',
    to: 'Salma Begum',
    amount: 200.0,
    currency: 'USD',
    status: 'Pending',
    date: '10 May 2025',
    time: '04:20 PM',
  },
  {
    id: '#TSM12345675',
    to: 'Rashed Ali',
    amount: 150.0,
    currency: 'USD',
    status: 'Completed',
    date: '09 May 2025',
    time: '02:10 PM',
  },
  {
    id: '#TSM12345674',
    to: 'Nadia Islam',
    amount: 750.0,
    currency: 'USD',
    status: 'Failed',
    date: '08 May 2025',
    time: '11:45 AM',
  },
  {
    id: '#TSM12345673',
    to: 'Karim Hossain',
    amount: 420.0,
    currency: 'USD',
    status: 'Completed',
    date: '07 May 2025',
    time: '09:00 AM',
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    type: 'card',
    label: 'Credit / Debit Card',
    detail: '2 Cards Added',
    icon: '/banks/credit_card.png',
    color: 'blue',
    cards: [
      {
        label: 'Visa •••• 4242',
        expires: '12/27',
        icon: '/banks/visa_card.png',
        primary: true,
      },
      {
        label: 'Mastercard •••• 8888',
        expires: '08/26',
        icon: '/banks/master_card.png',
        primary: false,
      },
    ],
  },

  {
    type: 'bank',
    label: 'Bank Account',
    detail: '4 Accounts Added',
    color: 'green',
    cards: [
      {
        label: 'Dutch-Bangla Bank •••• 1234',
        expires: 'Checking',
        icon: '/banks/duch_bank.svg',
        primary: true,
      },
      {
        label: 'BRAC Bank •••• 5678',
        expires: 'Savings',
        icon: '/banks/brac_bank.jpg',
        primary: true,
      },
      {
        label: 'Islami Bank •••• 9012',
        expires: 'Current',
        icon: '/banks/islami-ban.png',
        primary: false,
      },
      {
        label: 'Pubali Bank •••• 9056',
        expires: 'Current',
        icon: '/banks/pubali_bank.jpg',
        primary: false,
      },
    ],
  },

  {
    type: 'wallet',
    label: 'Wallet',
    detail: '$450.00 Balance',
    color: 'purple',
    cards: [
      {
        label: 'TheSendMoney Wallet',
        expires: '$450.00 available',
        primary: true,
      },
    ],
  },
];

export const currencies = [
  { code: 'USD', flag: '🇺🇸', name: 'US Dollar' },
  { code: 'EUR', flag: '🇪🇺', name: 'Euro' },
  { code: 'GBP', flag: '🇬🇧', name: 'British Pound' },
  { code: 'BDT', flag: '🇧🇩', name: 'Bangladeshi Taka' },
  { code: 'AED', flag: '🇦🇪', name: 'UAE Dirham' },
  { code: 'SAR', flag: '🇸🇦', name: 'Saudi Riyal' },
  { code: 'CAD', flag: '🇨🇦', name: 'Canadian Dollar' },
  { code: 'AUD', flag: '🇦🇺', name: 'Australian Dollar' },
];

export const exchangeRates: Record<string, number> = {
  'USD-EUR': 0.9205,
  'USD-GBP': 0.7892,
  'USD-BDT': 110.5,
  'USD-AED': 3.6725,
  'USD-SAR': 3.75,
  'USD-CAD': 1.3612,
  'USD-AUD': 1.5234,
  'EUR-USD': 1.0863,
  'GBP-USD': 1.2672,
};

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export const banksByCountry = {
  Bangladesh: [
    {
      id: 1,
      name: 'BRAC Bank PLC',
      icon: '/banks/brac_bank.jpg',
    },
    {
      id: 2,
      name: 'Dutch-Bangla Bank',
      icon: '/banks/duch_bank.svg',
    },
    {
      id: 3,
      name: 'Islami Bank Bangladesh',
      icon: '/banks/islami-ban.png',
    },
    {
      id: 4,
      name: 'Pubali Bank',
      icon: '/banks/pubali_bank.jpg',
    },
    {
      id: 5,
      name: 'City Bank',
      icon: '/banks/city-bank.png',
    },
  ],

  India: [
    {
      id: 1,
      name: 'State Bank of India',
      icon: '/banks/sbi.png',
    },
    {
      id: 2,
      name: 'HDFC Bank',
      icon: '/banks/hdfc.png',
    },
    {
      id: 3,
      name: 'ICICI Bank',
      icon: '/banks/icici.png',
    },
    {
      id: 4,
      name: 'Axis Bank',
      icon: '/banks/axis.png',
    },
    {
      id: 5,
      name: 'Punjab National Bank',
      icon: '/banks/pnb.png',
    },
  ],

  Pakistan: [
    {
      id: 1,
      name: 'HBL Bank',
      icon: '/banks/hbl.png',
    },
    {
      id: 2,
      name: 'UBL Bank',
      icon: '/banks/ubl.png',
    },
    {
      id: 3,
      name: 'Meezan Bank',
      icon: '/banks/meezan.png',
    },
    {
      id: 4,
      name: 'MCB Bank',
      icon: '/banks/mcb.png',
    },
    {
      id: 5,
      name: 'Bank Alfalah',
      icon: '/banks/alfalah.png',
    },
  ],

  USA: [
    {
      id: 1,
      name: 'Bank of America',
      icon: '/banks/boa.png',
    },
    {
      id: 2,
      name: 'Chase Bank',
      icon: '/banks/chase.png',
    },
    {
      id: 3,
      name: 'Wells Fargo',
      icon: '/banks/wellsfargo.png',
    },
    {
      id: 4,
      name: 'Citibank',
      icon: '/banks/citi.png',
    },
    {
      id: 5,
      name: 'Capital One',
      icon: '/banks/capitalone.png',
    },
  ],

  UK: [
    {
      id: 1,
      name: 'HSBC',
      icon: '/banks/hsbc.png',
    },
    {
      id: 2,
      name: 'Barclays',
      icon: '/banks/barclays.png',
    },
    {
      id: 3,
      name: 'Lloyds Bank',
      icon: '/banks/lloyds.png',
    },
    {
      id: 4,
      name: 'NatWest',
      icon: '/banks/natwest.png',
    },
    {
      id: 5,
      name: 'Santander UK',
      icon: '/banks/santander.png',
    },
  ],
};

export const wallets = [
  {
    name: 'bKash',
    icon: '/Mobile_walet_Icons/BKash.svg',
  },
  {
    name: 'Nagad',
    icon: '/Mobile_walet_Icons/Nagad.svg',
  },
  {
    name: 'Rocket',
    icon: '/Mobile_walet_Icons/Rocket.svg',
  },
  {
    name: 'Upay',
    icon: '/Mobile_walet_Icons/Upay.svg',
  },
];
