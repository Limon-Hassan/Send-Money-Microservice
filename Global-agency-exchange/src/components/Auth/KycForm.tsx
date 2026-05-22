'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import SumsubWebSdk from '@sumsub/websdk-react';

type KycStatus = 'not_started' | 'pending' | 'verified' | 'rejected';

const KycForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<
    'loading' | 'start' | 'sdk' | 'done' | 'rejected' | 'error'
  >('loading');
  const [accessToken, setAccessToken] = useState('');
  const [status, setStatus] = useState<KycStatus>('not_started');
  const [error, setError] = useState('');

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await api.kycStatus();
      const s: KycStatus = res.status;
      setStatus(s);

      if (s === 'verified') {
        setStep('done');
      } else if (s === 'rejected') {
        setStep('rejected');
      } else {
        setStep('start');
      }
    } catch {
      setStep('start');
    }
  };

  const handleStart = async () => {
    setStep('loading');
    setError('');
    try {
      const res = await api.kycInit();
      if (!res.token) {
        setError('Failed to initialize KYC. Please try again.');
        setStep('start');
        return;
      }
      setAccessToken(res.token);
      setStep('sdk');
    } catch {
      setError('Something went wrong. Please try again.');
      setStep('start');
    }
  };

  const handleMessage = (type: string, payload: any) => {
    console.log('Sumsub event:', type, payload);
    if (type === 'idCheck.onApplicantStatusChanged') {
      if (payload?.reviewResult?.reviewAnswer === 'GREEN') {
        setStep('done');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else if (payload?.reviewResult?.reviewAnswer === 'RED') {
        setStep('rejected');
      }
    }
  };

  const handleError = (error: any) => {
    console.error('Sumsub error:', error);
    setError('Verification error occurred.');
    setStep('start');
  };

  // Loading
  if (step === 'loading') {
    return (
      <div className="my-account-area ptb-120">
        <div className="container">
          <div className="my-account-form text-center">
            <div className="spinner-border text-secondary mb-3" role="status" />
            <p className="text-muted">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Already verified
  if (step === 'done') {
    return (
      <div className="my-account-area ptb-120">
        <div className="container">
          <div className="my-account-form text-center">
            <div className="mb-4" style={{ fontSize: '56px' }}>
              ✅
            </div>
            <h3 className="mb-2">Identity Verified!</h3>
            <p className="text-muted mb-4">
              Your identity has been successfully verified.
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => router.push('/dashboard')}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Rejected
  if (step === 'rejected') {
    return (
      <div className="my-account-area ptb-120">
        <div className="container">
          <div className="my-account-form text-center">
            <div className="mb-4" style={{ fontSize: '56px' }}>
              ❌
            </div>
            <h3 className="mb-2">Verification Failed</h3>
            <p className="text-muted mb-4">
              Your identity verification was not successful. Please try again.
            </p>
            <button className="btn btn-secondary" onClick={handleStart}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SDK active
  if (step === 'sdk') {
    return (
      <div className="my-account-area ptb-120">
        <div className="container">
          <div className="my-account-form">
            <div className="text-center mb-4">
              <h3>Identity Verification</h3>
              <p className="text-muted" style={{ fontSize: '14px' }}>
                Please complete the verification steps below
              </p>
            </div>
            <SumsubWebSdk
              accessToken={accessToken}
              expirationHandler={async () => {
                const res = await api.kycInit();
                return res.token;
              }}
              config={{
                lang: 'en',
                uiConf: {
                  customCssStr: `
                    .step {border-radius: 8px;}
                    .submit-btn {background: #000; color: #fff;}
                  `,
                },
              }}
              options={{ addViewportTag: false, adaptIframeHeight: true }}
              onMessage={handleMessage}
              onError={handleError}
            />
          </div>
        </div>
      </div>
    );
  }

  // Start screen
  return (
    <div className="my-account-area ptb-120">
      <div className="container">
        <div className="my-account-form text-center">
          <div className="mb-4" style={{ fontSize: '56px' }}>
            🪪
          </div>
          <h3 className="mb-2">Verify Your Identity</h3>
          <p
            className="text-muted mb-4"
            style={{ fontSize: '15px', lineHeight: '1.7' }}
          >
            To comply with regulations, we need to verify your identity.
            <br />
            Please have your passport or national ID ready.
          </p>

          {error && (
            <div className="alert alert-danger mb-4" role="alert">
              {error}
            </div>
          )}

          {/* What you need */}
          <div className="d-flex flex-column gap-2 mb-4 text-start">
            {[
              { icon: '📄', text: 'Valid passport or national ID' },
              { icon: '📷', text: 'Camera access for selfie' },
              { icon: '💡', text: 'Good lighting conditions' },
              { icon: '⏱️', text: 'Takes about 2-3 minutes' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#333',
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>

          <button className="btn btn-secondary w-100" onClick={handleStart}>
            Start Verification
          </button>

          <p className="text-muted mt-3" style={{ fontSize: '12px' }}>
            Your data is encrypted and processed securely by Sumsub
          </p>
        </div>
      </div>
    </div>
  );
};

export default KycForm;
