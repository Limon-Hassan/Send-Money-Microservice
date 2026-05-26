'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../lib/api';

type Step = 'email' | 'otp' | 'reset';

const ForgotPasswordForm = () => {
  const router = useRouter();

  const [step, setStep] = useState<Step>('email');

  const [email, setEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [userId, setUserId] = useState('');

  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.forgotPasswordRequest({ email });
      console.log('Forgot Password Request Response:', res);
      if (!res.userId) {
        setError(res.message || 'Something went wrong.');
        return;
      }

      setMaskedEmail(res.maskedEmail);
      setUserId(res.userId);
      setStep('otp');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.forgotPasswordVerifyOtp({ userId, otp });

      console.log('Forgot Password Verify OTP Response:', res);

      if (!res.resetToken) {
        setError(res.message || 'Invalid OTP.');
        return;
      }

      setResetToken(res.resetToken);
      setStep('reset');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.forgotPasswordReset({
        userId,
        resetToken,
        newPassword,
      });
      console.log('Password Reset Response:', res);

      setSuccess(res.message || 'Password reset successful!');

      setTimeout(() => router.push('/login'), 2000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-account-area ptb-120">
      <div className="container">
        <div className="my-account-form">
          <div className="text-center mb-4">
            <div className="d-flex justify-content-center gap-2 mb-3">
              {['Email', 'OTP', 'New Password'].map((label, i) => {
                const stepIndex = ['email', 'otp', 'reset'].indexOf(step);
                return (
                  <span
                    key={label}
                    className={`badge rounded-pill px-3 py-2 ${
                      i === stepIndex
                        ? 'bg-primary'
                        : i < stepIndex
                          ? 'bg-success'
                          : 'bg-secondary'
                    }`}
                  >
                    {i < stepIndex ? '✓' : i + 1} {label}
                  </span>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="alert alert-danger py-2 text-center">{error}</div>
          )}
          {success && (
            <div className="alert alert-success py-2 text-center">
              {success}
            </div>
          )}

          {step === 'email' && (
            <>
              <div className="text-center mb-4">
                <h3>Forgot Password</h3>
                <p>Enter your email address and we will send you an OTP.</p>
              </div>
              <form onSubmit={handleEmailSubmit}>
                <div className="currency-input position-relative z-1 mb-3">
                  <label className="label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary w-100"
                  disabled={loading}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            </>
          )}

          {step === 'otp' && (
            <>
              <div className="text-center mb-4">
                <h3>Verify OTP</h3>
                <p>
                  OTP sent to{' '}
                  <strong className="text-primary">{maskedEmail}</strong>
                </p>
              </div>
              <form onSubmit={handleOtpSubmit}>
                <div className="currency-input position-relative z-1 mb-3">
                  <label className="label">Enter OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary w-100"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  type="button"
                  className="btn btn-link w-100 mt-2"
                  onClick={() => setStep('email')}
                >
                  ← Back
                </button>
              </form>
            </>
          )}

          {step === 'reset' && (
            <>
              <div className="text-center mb-4">
                <h3>Set New Password</h3>
                <p>Choose a strong password for your account.</p>
              </div>
              <form onSubmit={handleResetSubmit}>
                <div className="currency-input position-relative z-1 mb-3">
                  <label className="label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Minimum 8 characters"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="currency-input position-relative z-1 mb-3">
                  <label className="label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary w-100"
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </>
          )}

          {step === 'email' && (
            <p className="text-center mt-3">
              Remember your password?
              <a href="/login" className="text-primary">
                Login
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
