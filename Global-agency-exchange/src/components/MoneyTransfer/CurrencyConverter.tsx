'use client';

import React, { forwardRef } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';

interface Currency {
  code: string;
  name: string;
  flag: string;
}

interface CurrencyToggleProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currency: Currency;
}

interface MethodToggleProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  method: string;
}

const receiveMethods: string[] = [
  'Bank Transfer',
  'Paypal Transfer',
  'Payoneer Transfer',
  'Wise Transfer',
];

const CurrencyToggle = forwardRef<HTMLButtonElement, CurrencyToggleProps>(
  ({ onClick, currency }, ref) => (
    <button
      ref={ref}
      className="dropdown-toggle bg-transparent border-0 w-100 p-0"
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span className="d-flex align-items-center justify-content-between">
        <span className="d-flex align-items-center gap-2 flag">
          <img
            src={currency.flag}
            alt={currency.code}
            style={{ width: '24px', height: '24px', borderRadius: '50%' }}
          />
          {currency.code}
        </span>
      </span>
    </button>
  ),
);
CurrencyToggle.displayName = 'CurrencyToggle';

const MethodToggle = forwardRef<HTMLButtonElement, MethodToggleProps>(
  ({ onClick, method }, ref) => (
    <button
      ref={ref}
      className="dropdown-toggle bg-transparent border-0 w-100 p-0"
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span className="d-flex align-items-center justify-content-between">
        <span>{method}</span>
      </span>
    </button>
  ),
);
MethodToggle.displayName = 'MethodToggle';

const CurrencyConverter = () => {
  const {
    currencies,
    fromCurrency,
    toCurrency,
    amount,
    recipientAmount,
    exchangeRate,
    handleSendAmountChange,
    handleRecipientAmountChange,
    lastUpdated,
    loading,
    setFromCurrency,
    setToCurrency,
    swapCurrencies,
  } = useCurrencyConverter();

  const [receiveMethod, setReceiveMethod] = React.useState(receiveMethods[0]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleSendAmountChange(e.target.value);
  };

  return (
    <>
      <form className="currency-converter-form style-two">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Currency Converter</h3>
          <span className="text-white">
            <div className="position-relative d-inline-flex ping-wrapper">
              <span className="ping-animation"></span>
              <span className="ping-dot"></span>
            </div>
            <span className="text-primary fs-18 fw-semibold ms-2 me-2">
              Live
            </span>
            Rates
            {lastUpdated && (
              <small
                className="d-block"
                style={{ fontSize: '14px', color: '#fff' }}
              >
                Updated: {new Date(lastUpdated).toLocaleDateString()}
              </small>
            )}
          </span>
        </div>

        <div className="currency-input position-relative mb-3">
          <label className="label z-1">Your send</label>
          <div className="position-relative">
            <Form.Control
              type="number"
              value={amount}
              onChange={e => handleSendAmountChange(e.target.value)}
            />

            <Dropdown className="country-dropdown">
              <Dropdown.Toggle as={CurrencyToggle} currency={fromCurrency} />

              <Dropdown.Menu
                className="w-100"
                style={{ maxHeight: '260px', overflowY: 'auto' }}
              >
                {currencies.map(currency => (
                  <Dropdown.Item
                    key={currency.code}
                    onClick={() => setFromCurrency(currency)}
                    className="d-flex align-items-center gap-2"
                  >
                    <img
                      src={currency.flag}
                      alt={currency.code}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                      }}
                    />
                    <span>{currency.code}</span>
                    <span className="text-muted small">— {currency.name}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <button
            type="button"
            className="btn rounded-pill converter-btn"
            onClick={swapCurrencies}
          >
            <i className="ri-arrow-left-right-line"></i>
          </button>
        </div>

        <div className="currency-input position-relative mb-3">
          <label className="label z-1">Recipient gets</label>
          <div className="d-flex align-items-center gap-2">
            <Form.Control
              type="number"
              value={recipientAmount}
              onChange={e => handleRecipientAmountChange(e.target.value)}
            />

            <Dropdown className="country-dropdown">
              <Dropdown.Toggle as={CurrencyToggle} currency={toCurrency} />

              <Dropdown.Menu
                className="w-100"
                style={{ maxHeight: '260px', overflowY: 'auto' }}
              >
                {currencies.map(currency => (
                  <Dropdown.Item
                    key={currency.code}
                    onClick={() => setToCurrency(currency)}
                    className="d-flex align-items-center gap-2"
                  >
                    <img
                      src={currency.flag}
                      alt={currency.code}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                      }}
                    />
                    <span>{currency.code}</span>
                    <span className="text-muted small">— {currency.name}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="currency-input position-relative mb-3">
          <label className="label z-1">Receive method</label>

          <Dropdown className="form-control">
            <Dropdown.Toggle as={MethodToggle} method={receiveMethod} />

            <Dropdown.Menu className="w-100">
              {receiveMethods.map(method => (
                <Dropdown.Item
                  key={method}
                  onClick={() => setReceiveMethod(method)}
                  className="d-flex align-items-center justify-content-between "
                >
                  <span>{method}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="currency-input bg-white text-center p-3 rounded mb-3">
          <h3 className="text-secondary">
            {loading ? '...' : recipientAmount || '0.00'}
          </h3>
          <p>
            No transfer fees! Exchange rate: 1 {fromCurrency.code} ={' '}
            {exchangeRate} {toCurrency.code}
          </p>
        </div>

        <button
          onClick={() => {
            window.location.href = '/login';
          }}
          type="button"
          className="btn w-100 btn-primary"
        >
          Send Money
        </button>
      </form>
    </>
  );
};

export default CurrencyConverter;
