'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { MdEmail } from 'react-icons/md';

type Status = 'idle' | 'loading' | 'error' | 'success';

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || '';
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [status, setStatus] = useState<Status>('idle');
  const [otpError, setOtpError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setTimeout(() => inputs.current[0]?.focus(), 150);
  }, []);

  const maskedEmail = email
    ? email.replace(
        /(.{2})(.*)(@.*)/,
        (_, a, b, c) => a + '*'.repeat(b.length) + c,
      )
    : '';

  const verifyOtp = async (otpValue: string) => {
    setStatus('loading');
    setOtpError('');
    try {
      const res = await api.verifyLoginOtp({ userId, otp: otpValue });

      if (
        res.statusCode >= 400 ||
        res.error ||
        res.message?.toLowerCase().includes('invalid') ||
        res.message?.toLowerCase().includes('expired')
      ) {
        setStatus('error');
        setOtpError(res.message || 'Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        setTimeout(() => inputs.current[0]?.focus(), 100);
        return;
      }

      setStatus('success');
      setTimeout(async () => {
        try {
          const kycRes = await api.kycStatus();
          if (kycRes.status === 'verified') {
            router.push('/');
          } else {
            router.push('/kyc');
          }
        } catch {
          router.push('/');
        }
      }, 1200);
    } catch {
      setStatus('error');
      setOtpError('Something went wrong. Please try again.');
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => inputs.current[0]?.focus(), 100);
    }
  };

  const handleChange = async (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError('');
    setStatus('idle');
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    if (newOtp.every(d => d !== '') && newOtp.join('').length === 6) {
      await verifyOtp(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    if (pasted.length === 6) {
      const newOtp = pasted.split('');
      setOtp(newOtp);
      inputs.current[5]?.focus();
      await verifyOtp(pasted);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setOtpError('');
    setOtp(['', '', '', '', '', '']);
    setStatus('idle');
    try {
      await api.resendOtp({ userId });
      setTimeout(() => inputs.current[0]?.focus(), 100);
    } catch {
      setOtpError('Failed to resend OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="my-account-area ptb-120">
      <div className="container">
        <div className="my-account-form">
          <div className="text-center mb-5">
            <div className="mb-3" style={{ fontSize: '44px' }}>
              <MdEmail />
            </div>
            <h3 className="mb-2">Check your email</h3>
            <p
              className="text-muted"
              style={{ fontSize: '15px', lineHeight: '1.6' }}
            >
              New device detected. We sent a 6-digit code to{' '}
              <strong>{maskedEmail || 'your email'}</strong>
            </p>
          </div>

          <div className="d-flex justify-content-center gap-2 mb-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => {
                  inputs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                onPaste={handlePaste}
                disabled={status === 'loading' || status === 'success'}
                style={{
                  width: '52px',
                  height: '60px',
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: '600',
                  border: `2px solid ${
                    status === 'error'
                      ? '#dc3545'
                      : status === 'success'
                        ? '#198754'
                        : digit
                          ? '#333'
                          : '#dee2e6'
                  }`,
                  borderRadius: '10px',
                  outline: 'none',
                  color: '#111',
                  background: status === 'loading' ? '#f8f9fa' : '#fff',
                  transition: 'border-color 0.2s',
                }}
              />
            ))}
          </div>

          <div className="text-center mb-4" style={{ minHeight: '28px' }}>
            {status === 'loading' && (
              <div className="d-flex align-items-center justify-content-center gap-2 text-muted">
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                />
                <span style={{ fontSize: '14px' }}>Verifying...</span>
              </div>
            )}
            {status === 'success' && (
              <div className="d-flex align-items-center justify-content-center gap-2 text-success">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                  Verified! Redirecting...
                </span>
              </div>
            )}
            {status === 'error' && (
              <p className="text-danger mb-0" style={{ fontSize: '13px' }}>
                {otpError}
              </p>
            )}
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <button
              onClick={() => router.push('/login')}
              className="border-0 d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-semibold"
              style={{
                fontSize: '13px',
                backgroundColor: '#9bed68',
                color: '#1a1a1a',
                boxShadow: '0 4px 12px rgba(155, 237, 104, 0.35)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 6px 16px rgba(155, 237, 104, 0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 12px rgba(155, 237, 104, 0.35)';
              }}
            >
              <span style={{ fontSize: '15px' }}>←</span>
              Back to Login
            </button>

            <button
              onClick={handleResend}
              disabled={
                resendLoading || status === 'loading' || status === 'success'
              }
              className="border-0 d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-semibold"
              style={{
                fontSize: '13px',
                backgroundColor:
                  resendLoading || status === 'loading' || status === 'success'
                    ? '#d8f5c3'
                    : '#9bed68',
                color: '#1a1a1a',
                boxShadow:
                  resendLoading || status === 'loading' || status === 'success'
                    ? 'none'
                    : '0 4px 12px rgba(155, 237, 104, 0.35)',
                transition: 'all 0.3s ease',
                cursor:
                  resendLoading || status === 'loading' || status === 'success'
                    ? 'not-allowed'
                    : 'pointer',
                opacity:
                  resendLoading || status === 'loading' || status === 'success'
                    ? 0.7
                    : 1,
              }}
            >
              {resendLoading ? 'Sending...' : 'Resend code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
