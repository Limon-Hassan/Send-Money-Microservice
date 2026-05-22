const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://54.242.116.83';

export const api = {
  register: async (data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    currency: string;
  }) => {
    const res = await fetch(`${API_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  sendOtp: async (data: { userId: string; channel: 'email' | 'phone' }) => {
    const res = await fetch(`${API_URL}/user/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  verifyOtp: async (data: { userId: string; otp: string }) => {
    const res = await fetch(`${API_URL}/user/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  resendOtp: async (data: { userId: string }) => {
    const res = await fetch(`${API_URL}/user/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (data: { email: string; password: string }) => {
    let dataToSend = { emailOrPhone: data.email, password: data.password };
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(dataToSend),
    });
    return res.json();
  },

  verifyLoginOtp: async (data: { userId: string; otp: string }) => {
    const res = await fetch(`${API_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return res.json();
  },

  kycInit: async () => {
    const res = await fetch(`${API_URL}/kyc/init`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    return res.json();
  },

  kycStatus: async () => {
    const res = await fetch(`${API_URL}/kyc/status`, {
      credentials: 'include',
    });
    return res.json();
  },
};
