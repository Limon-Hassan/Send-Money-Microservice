export type NavItem =
  | "dashboard"
  | "send-money"
  | "my-profile"
  | "kyc-verification"
  | "settings-privacy"
  | "payment-methods"
  | "transactions-history"
  | "logout";

export interface Transaction {
  id: string;
  to: string;
  amount: number;
  currency: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
  time: string;
}

export interface PaymentMethodItem {
  label: string;
  expires: string;
  primary: boolean;
  icon?: string;
}

export interface PaymentMethod {
  type: 'card' | 'bank' | 'wallet';
  label: string;
  detail: string;
  icon?: string;
  color: 'blue' | 'green' | 'purple';
  cards: PaymentMethodItem[];
}

export interface UserProfile {
  userId: string;
  name: string;
  phone: string;
  dob: string;
  nid: string;
  address: string;
  country: string;
  email: string;
  avatar?: string;
  walletBalance: number;
  currency: string;
  verified: boolean;
}
