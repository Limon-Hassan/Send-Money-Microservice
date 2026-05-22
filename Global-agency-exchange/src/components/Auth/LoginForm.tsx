'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.login(formData);
      if (res.requiresOtp) {
        router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
        return;
      }

      if (res.statusCode >= 400 || res.error) {
        setError(res.message || 'Login failed');
        return;
      }

      if (res.accessToken) {
        localStorage.setItem('accessToken', res.accessToken);
      }

      router.push('/kyc');
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
            <h3>Login</h3>
            <p>
              Don&apos;t have an account? <Link href="/register">Register</Link>
            </p>
          </div>

          {error && (
            <div className="alert alert-danger mb-3" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="currency-input position-relative z-1">
              <label className="label">Email or Phone</label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="currency-input position-relative z-1">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-secondary w-100"
              disabled={loading}
            >
              {loading ? (
                <span className="d-flex align-items-center justify-content-center gap-2">
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />
                  Logging in...
                </span>
              ) : (
                'Log in'
              )}
            </button>
          </form>

          <Link
            href="/forgot-password"
            className="text-decoration-none my-4 d-block text-center"
          >
            Forgot password?
          </Link>

          <p className="fw-medium text-secondary mb-4 login">
            <span>Or login with</span>
          </p>

          <div className="d-sm-flex align-items-center justify-content-between gap-10">
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
              className="btn w-100 mb-2 mb-sm-0"
            >
              Log in With Google
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="btn w-100"
            >
              Log in With Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
