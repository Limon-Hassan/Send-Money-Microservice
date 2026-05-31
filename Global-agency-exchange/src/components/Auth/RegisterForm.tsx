'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { TbWorld } from 'react-icons/tb';

const COUNTRIES = [
  { name: 'Bangladesh', flag: '🇧🇩', currency: 'BDT', code: '+880' },
  { name: 'United States', flag: '🇺🇸', currency: 'USD', code: '+1' },
  { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', code: '+44' },
  { name: 'European Union', flag: '🇪🇺', currency: 'EUR', code: '+32' },
  { name: 'India', flag: '🇮🇳', currency: 'INR', code: '+91' },
  { name: 'Pakistan', flag: '🇵🇰', currency: 'PKR', code: '+92' },
  { name: 'Canada', flag: '🇨🇦', currency: 'CAD', code: '+1' },
  { name: 'Australia', flag: '🇦🇺', currency: 'AUD', code: '+61' },
  { name: 'UAE', flag: '🇦🇪', currency: 'AED', code: '+971' },
  { name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', code: '+966' },
  { name: 'Singapore', flag: '🇸🇬', currency: 'SGD', code: '+65' },
  { name: 'Malaysia', flag: '🇲🇾', currency: 'MYR', code: '+60' },
  { name: 'Japan', flag: '🇯🇵', currency: 'JPY', code: '+81' },
  { name: 'China', flag: '🇨🇳', currency: 'CNY', code: '+86' },
  { name: 'South Korea', flag: '🇰🇷', currency: 'KRW', code: '+82' },
  { name: 'Turkey', flag: '🇹🇷', currency: 'TRY', code: '+90' },
  { name: 'Brazil', flag: '🇧🇷', currency: 'BRL', code: '+55' },
  { name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', code: '+27' },
  { name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', code: '+234' },
  { name: 'Ghana', flag: '🇬🇭', currency: 'GHS', code: '+233' },
  { name: 'Kenya', flag: '🇰🇪', currency: 'KES', code: '+254' },
  { name: 'Switzerland', flag: '🇨🇭', currency: 'CHF', code: '+41' },
  { name: 'Sweden', flag: '🇸🇪', currency: 'SEK', code: '+46' },
  { name: 'Norway', flag: '🇳🇴', currency: 'NOK', code: '+47' },
  { name: 'New Zealand', flag: '🇳🇿', currency: 'NZD', code: '+64' },
  { name: 'Mexico', flag: '🇲🇽', currency: 'MXN', code: '+52' },
  { name: 'Philippines', flag: '🇵🇭', currency: 'PHP', code: '+63' },
  { name: 'Indonesia', flag: '🇮🇩', currency: 'IDR', code: '+62' },
  { name: 'Thailand', flag: '🇹🇭', currency: 'THB', code: '+66' },
  { name: 'Sri Lanka', flag: '🇱🇰', currency: 'LKR', code: '+94' },
  { name: 'Nepal', flag: '🇳🇵', currency: 'NPR', code: '+977' },
  { name: 'Qatar', flag: '🇶🇦', currency: 'QAR', code: '+974' },
  { name: 'Kuwait', flag: '🇰🇼', currency: 'KWD', code: '+965' },
  { name: 'Bahrain', flag: '🇧🇭', currency: 'BHD', code: '+973' },
  { name: 'Oman', flag: '🇴🇲', currency: 'OMR', code: '+968' },
];

type Country = (typeof COUNTRIES)[0];

const RegisterForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    country: '',
    currency: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  const [phoneCodeSearch, setPhoneCodeSearch] = useState('');
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const [selectedPhoneCountry, setSelectedPhoneCountry] =
    useState<Country | null>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  const filteredCountries = COUNTRIES.filter(
    c =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.currency.toLowerCase().includes(countrySearch.toLowerCase()),
  );

  const filteredPhoneCodes = COUNTRIES.filter(
    c =>
      c.name.toLowerCase().includes(phoneCodeSearch.toLowerCase()) ||
      c.code.includes(phoneCodeSearch),
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node))
        setShowCountryDropdown(false);
      if (phoneRef.current && !phoneRef.current.contains(e.target as Node))
        setShowPhoneDropdown(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setCountrySearch('');
    setShowCountryDropdown(false);
    setFormData(prev => ({
      ...prev,
      country: country.name,
      currency: country.currency,
    }));
  };

  const handlePhoneCodeSelect = (country: Country) => {
    setSelectedPhoneCountry(country);
    setPhoneCodeSearch('');
    setShowPhoneDropdown(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhoneCountry) {
      setError('Please select a phone country code.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await api.register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        dialCode: selectedPhoneCountry.code,
        password: formData.password,
        currency: formData.currency,
      });

      if (!res.userId) {
        setError(res.message || 'Registration failed');
        return;
      }

      router.push(
        `/verify-otp?email=${encodeURIComponent(formData.email)}&userId=${res.userId}`,
      );
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
            <h3>Create a personal account</h3>
            <p>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>

          <div className="d-sm-flex align-items-center justify-content-between gap-10 mb-4">
            <Link href="/register" className="btn w-100 mb-2 mb-sm-0">
              Personal
            </Link>
            <Link href="/register-business" className="btn w-100 btn-secondary">
              Business
            </Link>
          </div>

          {error && (
            <div className="alert alert-danger mb-3" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="currency-input position-relative z-1">
              <label className="label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="currency-input position-relative z-1">
              <label className="label">Your Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div
              className="currency-input position-relative z-1"
              ref={phoneRef}
            >
              <div className="d-flex gap-2">
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => setShowPhoneDropdown(v => !v)}
                    style={{
                      height: '58px',
                      minWidth: '100px',
                      border: '1px solid #dee2e6',
                      borderRadius: '8px',
                      background: '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '0 12px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#111',
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>
                      {selectedPhoneCountry ? (
                        selectedPhoneCountry.flag
                      ) : (
                        <TbWorld />
                      )}
                    </span>
                    <span style={{ color: '#444' }}>
                      {selectedPhoneCountry ? selectedPhoneCountry.code : '+?'}
                    </span>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#888"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginLeft: 'auto' }}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {showPhoneDropdown && (
                    <div className="phone-dropdown">
                      <div
                        style={{
                          padding: '10px 12px',
                          borderBottom: '1px solid #f0f0f0',
                        }}
                      >
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Search country or code..."
                          value={phoneCodeSearch}
                          onChange={e => setPhoneCodeSearch(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {filteredPhoneCodes.length === 0 ? (
                          <div
                            className="text-muted text-center py-3"
                            style={{ fontSize: '13px' }}
                          >
                            No result
                          </div>
                        ) : (
                          filteredPhoneCodes.map(c => (
                            <div
                              key={c.name}
                              onClick={() => handlePhoneCodeSelect(c)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '9px 14px',
                                cursor: 'pointer',
                                background:
                                  selectedPhoneCountry?.name === c.name
                                    ? '#f0f4ff'
                                    : '#fff',
                                fontSize: '13px',
                              }}
                              onMouseEnter={e =>
                                (e.currentTarget.style.background = '#f5f5f5')
                              }
                              onMouseLeave={e =>
                                (e.currentTarget.style.background =
                                  selectedPhoneCountry?.name === c.name
                                    ? '#f0f4ff'
                                    : '#fff')
                              }
                            >
                              <span style={{ fontSize: '18px' }}>{c.flag}</span>
                              <span style={{ flex: 1, color: '#111' }}>
                                {c.name}
                              </span>
                              <span
                                style={{
                                  fontWeight: '600',
                                  color: '#555',
                                  fontSize: '12px',
                                }}
                              >
                                {c.code}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ position: 'relative', flex: 1 }}>
                  <label
                    style={{
                      position: 'absolute',
                      top: formData.phoneNumber ? '6px' : '50%',
                      left: '12px',
                      transform: formData.phoneNumber
                        ? 'translateY(0)'
                        : 'translateY(-50%)',
                      fontSize: formData.phoneNumber ? '11px' : '14px',
                      color: formData.phoneNumber ? '#0d6efd' : '#888',
                      transition: 'all .2s ease',
                      pointerEvents: 'none',
                      fontWeight: '500',
                      zIndex: 1,
                    }}
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control"
                    placeholder=""
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    onFocus={e => {
                      const label = e.currentTarget
                        .previousElementSibling as HTMLElement;
                      if (label) {
                        label.style.top = '6px';
                        label.style.fontSize = '11px';
                        label.style.color = '#0d6efd';
                      }
                    }}
                    onBlur={e => {
                      if (!e.currentTarget.value) {
                        const label = e.currentTarget
                          .previousElementSibling as HTMLElement;
                        if (label) {
                          label.style.top = '50%';
                          label.style.fontSize = '14px';
                          label.style.color = '#888';
                        }
                      }
                    }}
                    style={{
                      height: '58px',
                      paddingTop: formData.phoneNumber ? '20px' : '0',
                      paddingBottom: formData.phoneNumber ? '6px' : '0',
                    }}
                  />
                </div>
              </div>

              {selectedPhoneCountry && formData.phoneNumber && (
                <small
                  className="text-muted mt-1 d-block"
                  style={{ fontSize: '12px' }}
                >
                  Full number:
                  <strong>
                    {selectedPhoneCountry.code}
                    {formData.phoneNumber}
                  </strong>
                </small>
              )}
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

            <div
              className="currency-input position-relative z-1"
              ref={countryRef}
            >
              <label className="label">Country & Currency</label>
              <div className="d-flex gap-2">
                <div className="position-relative flex-grow-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={
                      selectedCountry
                        ? selectedCountry.name
                        : 'Search country...'
                    }
                    value={countrySearch}
                    onChange={e => {
                      setCountrySearch(e.target.value);
                      setShowCountryDropdown(true);
                    }}
                    onFocus={() => setShowCountryDropdown(true)}
                    style={{ paddingLeft: selectedCountry ? '36px' : '12px' }}
                  />
                  {selectedCountry && !countrySearch && (
                    <span
                      style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '18px',
                        pointerEvents: 'none',
                      }}
                    >
                      {selectedCountry.flag}
                    </span>
                  )}
                </div>

                {/* Currency badge */}
                <div
                  style={{
                    minWidth: '64px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '13px',
                    color: selectedCountry ? '#111' : '#aaa',
                    background: selectedCountry ? '#f8f9fa' : '#fff',
                    padding: '0 12px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {selectedCountry ? selectedCountry.currency : 'CCY'}
                </div>
              </div>

              {/* Country dropdown */}
              {showCountryDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: '#fff',
                    border: '1px solid #dee2e6',
                    borderRadius: '10px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    zIndex: 9999,
                    maxHeight: '220px',
                    overflowY: 'auto',
                    marginTop: '4px',
                  }}
                >
                  {filteredCountries.length === 0 ? (
                    <div
                      className="text-muted text-center py-3"
                      style={{ fontSize: '14px' }}
                    >
                      No country found
                    </div>
                  ) : (
                    filteredCountries.map(c => (
                      <div
                        key={c.name}
                        onClick={() => handleCountrySelect(c)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 16px',
                          cursor: 'pointer',
                          background:
                            selectedCountry?.name === c.name
                              ? '#f8f9fa'
                              : '#fff',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e =>
                          (e.currentTarget.style.background = '#f5f5f5')
                        }
                        onMouseLeave={e =>
                          (e.currentTarget.style.background =
                            selectedCountry?.name === c.name
                              ? '#f8f9fa'
                              : '#fff')
                        }
                      >
                        <span style={{ fontSize: '22px', lineHeight: 1 }}>
                          {c.flag}
                        </span>
                        <span
                          style={{ flex: 1, fontSize: '14px', color: '#111' }}
                        >
                          {c.name}
                        </span>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#666',
                            background: '#f0f0f0',
                            padding: '2px 8px',
                            borderRadius: '4px',
                          }}
                        >
                          {c.currency}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-secondary w-100"
              disabled={loading || !selectedCountry || !selectedPhoneCountry}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>

            {(!selectedCountry || !selectedPhoneCountry) && (
              <p
                className="text-muted text-center mt-2"
                style={{ fontSize: '12px' }}
              >
                Please select country and phone code to continue
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
