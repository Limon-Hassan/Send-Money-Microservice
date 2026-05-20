'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import { MdEmail, MdOutlineTextsms } from 'react-icons/md';

type Channel = 'email' | 'phone';
type Step = 'channel' | 'otp';
type Status = 'idle' | 'loading' | 'error' | 'success';

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const userId = searchParams.get('userId') || '';

  const [step, setStep] = useState<Step>('channel');
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [channelLoading, setChannelLoading] = useState<Channel | null>(null);
  const [channelError, setChannelError] = useState('');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [status, setStatus] = useState<Status>('idle');
  const [otpError, setOtpError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => inputs.current[0]?.focus(), 150);
    }
  }, [step]);

  const handleChannelSelect = async (channel: Channel) => {
    setChannelLoading(channel);
    setChannelError('');
    try {
      const res = await api.sendOtp({ userId, channel });
      console.log('res otp channel', res);
      if (
        res.message?.includes('failed') ||
        res.message?.includes('not found')
      ) {
        console.log('res otp channel error', res);
        setChannelError(res.message);
        setChannelLoading(null);
        return;
      }
      setSelectedChannel(channel);
      setStep('otp');
    } catch {
      setChannelError('Something went wrong. Please try again.');
    } finally {
      setChannelLoading(null);
    }
  };

  const verifyOtp = async (otpValue: string) => {
    setStatus('loading');
    setOtpError('');
    try {
      const res = await api.verifyOtp({ userId, otp: otpValue });
      console.log('res otp submit', res);

      if (
        res.message?.includes('failed') ||
        res.message?.includes('Invalid') ||
        res.message?.includes('expired')
      ) {
        setStatus('error');
        setOtpError(res.message);
        setOtp(['', '', '', '', '', '']);
        setTimeout(() => inputs.current[0]?.focus(), 100);
        return;
      }
      if (res.ok) {
        setStatus('success');
        setTimeout(() => router.push('/login'), 1200);
      }
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

  const maskedEmail = email
    ? email.replace(
        /(.{2})(.*)(@.*)/,
        (_, a, b, c) => a + '*'.repeat(b.length) + c,
      )
    : '';

  if (step === 'channel') {
    return (
      <div className="my-account-area ptb-120">
        <div className="container">
          <div className="my-account-form">
            <div className="text-center mb-5">
              <div className="mb-3" style={{ fontSize: '44px' }}>
                <FaRegCircleQuestion />
              </div>
              <h3 className="mb-2">Please select a channel</h3>
              <p
                className="text-muted"
                style={{ fontSize: '15px', lineHeight: '1.6' }}
              >
                Choose how you&apos;d like to receive your one-time password
              </p>
            </div>

            {channelError && (
              <div className="alert alert-danger mb-4" role="alert">
                {channelError}
              </div>
            )}

            <div className="d-flex flex-column gap-3">
              <button
                onClick={() => handleChannelSelect('email')}
                disabled={channelLoading !== null}
                className="btn w-100 text-start p-0"
                style={{
                  border: '1.5px solid #dee2e6',
                  borderRadius: '12px',
                  background: '#fff',
                  opacity: channelLoading === 'phone' ? 0.5 : 1,
                  transition: 'border-color 0.2s, opacity 0.2s',
                }}
                onMouseEnter={e => {
                  if (!channelLoading)
                    (e.currentTarget as HTMLElement).style.borderColor = '#333';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    '#dee2e6';
                }}
              >
                <div className="d-flex align-items-center gap-3 p-4">
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      background: '#f8f9fa',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0,
                    }}
                  >
                    <MdEmail />
                  </div>
                  <div className="flex-grow-1">
                    <div
                      style={{
                        fontWeight: '600',
                        fontSize: '15px',
                        color: '#111',
                        marginBottom: '3px',
                      }}
                    >
                      OTP via Gmail
                    </div>
                    <div className="text-muted" style={{ fontSize: '13px' }}>
                      Send code to {maskedEmail}
                    </div>
                  </div>
                  <div>
                    {channelLoading === 'email' ? (
                      <div
                        className="spinner-border spinner-border-sm text-secondary"
                        role="status"
                      />
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#bbb"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleChannelSelect('phone')}
                disabled={channelLoading !== null}
                className="btn w-100 text-start p-0"
                style={{
                  border: '1.5px solid #dee2e6',
                  borderRadius: '12px',
                  background: '#fff',
                  opacity: channelLoading === 'email' ? 0.5 : 1,
                  transition: 'border-color 0.2s, opacity 0.2s',
                }}
                onMouseEnter={e => {
                  if (!channelLoading)
                    (e.currentTarget as HTMLElement).style.borderColor = '#333';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    '#dee2e6';
                }}
              >
                <div className="d-flex align-items-center gap-3 p-4">
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      background: '#f8f9fa',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0,
                    }}
                  >
                    <MdOutlineTextsms />
                  </div>
                  <div className="flex-grow-1">
                    <div
                      style={{
                        fontWeight: '600',
                        fontSize: '15px',
                        color: '#111',
                        marginBottom: '3px',
                      }}
                    >
                      OTP via SMS
                    </div>
                    <div className="text-muted" style={{ fontSize: '13px' }}>
                      Send code to your mobile number
                    </div>
                  </div>
                  <div>
                    {channelLoading === 'phone' ? (
                      <div
                        className="spinner-border spinner-border-sm text-secondary"
                        role="status"
                      />
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#bbb"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-account-area ptb-120">
      <div className="container">
        <div className="my-account-form">
          <div className="text-center mb-5">
            <div className="mb-3" style={{ fontSize: '44px' }}>
              {selectedChannel === 'email' ? <MdEmail /> : <MdOutlineTextsms />}
            </div>
            <h3 className="mb-2">Enter your code</h3>
            <p className="text-muted" style={{ fontSize: '15px' }}>
              {selectedChannel === 'email' ? (
                <>
                  <strong>{maskedEmail}</strong> তে code পাঠানো হয়েছে
                </>
              ) : (
                <>
                  তোমার <strong>mobile number</strong> এ code পাঠানো হয়েছে
                </>
              )}
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
              onClick={() => {
                setStep('channel');
                setOtp(['', '', '', '', '', '']);
                setStatus('idle');
                setOtpError('');
                setChannelError('');
              }}
              className="border-0 d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-semibold transition-all"
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
              Change method
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
              onMouseEnter={e => {
                if (
                  !(
                    resendLoading ||
                    status === 'loading' ||
                    status === 'success'
                  )
                ) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow =
                    '0 6px 16px rgba(155, 237, 104, 0.45)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  resendLoading || status === 'loading' || status === 'success'
                    ? 'none'
                    : '0 4px 12px rgba(155, 237, 104, 0.35)';
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
