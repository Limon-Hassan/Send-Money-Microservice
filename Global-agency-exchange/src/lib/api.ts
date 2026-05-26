const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://54.242.116.83';

export const api = {
  register: async (data: {
    fullName: string;
    email: string;
    phone: string;
    dialCode: string;
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
    console.log('Login Response:', res);
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
    console.log('KYC Init Response:', res);
    return res.json();
  },

  kycStatus: async () => {
    const res = await fetch(`${API_URL}/kyc/status`, {
      credentials: 'include',
    });
    console.log('KYC Status Response:', res);
    return res.json();
  },

  forgotPasswordRequest: async (data: { email: string }) => {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  forgotPasswordVerifyOtp: async (data: { userId: string; otp: string }) => {
    const res = await fetch(`${API_URL}/auth/forgot-password/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  forgotPasswordReset: async (data: {
    userId: string;
    resetToken: string;
    newPassword: string;
  }) => {
    const res = await fetch(`${API_URL}/auth/forgot-password/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const res = await fetch(`${API_URL}/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_URL}/auth/me`, {
      credentials: 'include',
    });
    return res.json();
  },
};
