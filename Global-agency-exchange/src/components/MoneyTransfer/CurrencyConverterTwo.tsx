'use client';

import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import Image from 'next/image';

// Type definitions
interface Currency {
  code: string;
  name: string;
  flag: string;
}

interface FormData {
  sendAmount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  receiveMethod: string;
  convertedAmount: number;
  exchangeRate: number;
}

interface CurrencyToggleProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currency: Currency;
}

interface MethodToggleProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  method: string;
}

interface ExchangeRates {
  [key: string]: number;
}

const CurrencyConverterTwo = () => {
  // Currency data
  const currencies: Currency[] = [
    { code: 'USD', name: 'USA', flag: '/images/flags/united-states.png' },
    { code: 'EUR', name: 'EUR', flag: '/images/flags/round.png' },
    { code: 'GBP', name: 'GBP', flag: '/images/flags/united-kingdom.png' },
    { code: 'JPY', name: 'JPY', flag: '/images/flags/japan.png' },
    { code: 'AUD', name: 'AUD', flag: '/images/flags/australia.png' },
    { code: 'CNY', name: 'CNY', flag: '/images/flags/china.png' },
    { code: 'INR', name: 'INR', flag: '/images/flags/india.png' },
    { code: 'BRL', name: 'BRL', flag: '/images/flags/brazil-flag.png' },
    { code: 'ZAR', name: 'ZAR', flag: '/images/flags/south-africa.png' },
    { code: 'MXN', name: 'MXN', flag: '/images/flags/mexico.png' },
    {
      code: 'AED',
      name: 'AED',
      flag: '/images/flags/united-arab-emirates.png',
    },
    { code: 'SAR', name: 'SAR', flag: '/images/flags/saudi-arabia.png' },
    { code: 'CHF', name: 'CHF', flag: '/images/flags/switzerland.png' },
    { code: 'SGD', name: 'SGD', flag: '/images/flags/singapore.png' },
  ];

  // Receive methods
  const receiveMethods: string[] = [
    'Bank Transfer',
    'Paypal Transfer',
    'Payoneer Transfer',
    'Wise Transfer',
  ];

  // State management
  const [formData, setFormData] = useState<FormData>({
    sendAmount: 1000,
    fromCurrency: currencies[0],
    toCurrency: currencies[1],
    receiveMethod: receiveMethods[0],
    convertedAmount: 915.0,
    exchangeRate: 0.915,
  });

  // Calculate conversion (mock function - replace with real API)
  const calculateConversion = useCallback((): void => {
    // Mock conversion logic - replace with actual API call
    const baseRates: ExchangeRates = {
      USD: 1,
      EUR: 0.915,
      GBP: 0.79,
      JPY: 148.5,
      AUD: 1.52,
      CNY: 7.23,
      INR: 83.12,
      BRL: 4.95,
      ZAR: 18.75,
      MXN: 17.23,
      AED: 3.67,
      SAR: 3.75,
      CHF: 0.88,
      SGD: 1.35,
    };

    const fromRate = baseRates[formData.fromCurrency.code] || 1;
    const toRate = baseRates[formData.toCurrency.code] || 1;

    const newExchangeRate = toRate / fromRate;
    const newConvertedAmount = formData.sendAmount * newExchangeRate;

    setFormData(prev => ({
      ...prev,
      convertedAmount: parseFloat(newConvertedAmount.toFixed(2)),
      exchangeRate: parseFloat(newExchangeRate.toFixed(3)),
    }));
  }, [formData.sendAmount, formData.fromCurrency, formData.toCurrency]);

  // Update conversion when amount or currencies change
  useEffect(() => {
    calculateConversion();
  }, [calculateConversion]);

  // Handle currency selection
  const handleCurrencySelect = (
    currency: Currency,
    type: 'fromCurrency' | 'toCurrency',
  ): void => {
    setFormData(prev => ({
      ...prev,
      [type]: currency,
    }));
  };

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseFloat(e.target.value) || 0;
    setFormData(prev => ({
      ...prev,
      sendAmount: value,
    }));
  };

  // Swap currencies
  const handleSwapCurrencies = (): void => {
    setFormData(prev => ({
      ...prev,
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency,
    }));
  };

  // Handle receive method selection
  const handleReceiveMethodSelect = (method: string): void => {
    setFormData(prev => ({
      ...prev,
      receiveMethod: method,
    }));
  };

  // Custom dropdown toggle for currencies
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
            <Image
              src={currency.flag}
              alt={currency.code}
              width={20}
              height={15}
              style={{ objectFit: 'cover' }}
            />
            {currency.code}
          </span>
        </span>
      </button>
    ),
  );

  CurrencyToggle.displayName = 'CurrencyToggle';

  // Custom dropdown toggle for receive method
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

  return (
    <>
      <form className="currency-converter-form style-thee">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Currency Converter</h3>
          <span className="text-white">
            <span className="text-primary fs-18 fw-semibold">Live</span> Rates
          </span>
        </div>

        {/* Send Currency */}
        <div className="currency-input position-relative mb-3">
          <label className="label z-1">Your send</label>
          <div className="position-relative">
            <Form.Control
              type="number"
              value={formData.sendAmount}
              onChange={handleAmountChange}
              className="flex-grow-1"
              min="0"
              step="0.01"
            />

            <Dropdown className="country-dropdown">
              <Dropdown.Toggle
                as={CurrencyToggle}
                currency={formData.fromCurrency}
              >
                {formData.sendAmount}
              </Dropdown.Toggle>

              <Dropdown.Menu className="w-100">
                {currencies.map(currency => (
                  <Dropdown.Item
                    key={currency.code}
                    onClick={() =>
                      handleCurrencySelect(currency, 'fromCurrency')
                    }
                    className="d-flex align-items-center justify-content-between"
                  >
                    <span className="d-flex align-items-center gap-2">
                      <Image
                        src={currency.flag}
                        alt={currency.code}
                        width={20}
                        height={15}
                        style={{ objectFit: 'cover' }}
                      />
                      {currency.code} - {currency.name}
                    </span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <button
            type="button"
            className="btn rounded-pill converter-btn"
            onClick={handleSwapCurrencies}
          >
            <i className="ri-arrow-left-right-line"></i>
          </button>
        </div>

        {/* Receive Currency */}
        <div className="currency-input position-relative mb-3">
          <label className="label z-1">Recipient gets</label>
          <div className="d-flex align-items-center gap-2">
            <Form.Control
              type="text"
              value={formData.convertedAmount}
              readOnly
              className="flex-grow-1 bg-light"
            />

            <Dropdown className="country-dropdown">
              <Dropdown.Toggle
                as={CurrencyToggle}
                currency={formData.toCurrency}
              >
                {formData.convertedAmount}
              </Dropdown.Toggle>

              <Dropdown.Menu className="w-100">
                {currencies.map(currency => (
                  <Dropdown.Item
                    key={currency.code}
                    onClick={() => handleCurrencySelect(currency, 'toCurrency')}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <span className="d-flex align-items-center gap-2">
                      <Image
                        src={currency.flag}
                        alt={currency.code}
                        width={20}
                        height={15}
                        style={{ objectFit: 'cover' }}
                      />
                      {currency.code} - {currency.name}
                    </span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Receive Method */}
        <div className="currency-input position-relative mb-3">
          <label className="label z-1">Receive method</label>

          <Dropdown className="form-control">
            <Dropdown.Toggle
              as={MethodToggle}
              method={formData.receiveMethod}
            />

            <Dropdown.Menu className="w-100">
              {receiveMethods.map(method => (
                <Dropdown.Item
                  key={method}
                  onClick={() => handleReceiveMethodSelect(method)}
                  className="d-flex align-items-center justify-content-between"
                >
                  <span>{method}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Conversion Summary */}
        <div className="currency-input bg-white text-center p-3 rounded mb-3">
          <h3 className="text-secondary">{formData.convertedAmount}</h3>
          <p>
            No transfer fees! Exchange rate: 1 {formData.fromCurrency.code} ={' '}
            {formData.exchangeRate} {formData.toCurrency.code}
          </p>
        </div>

        <button type="button" className="btn w-100 btn-primary">
          Send Money
        </button>
      </form>
    </>
  );
};

export default CurrencyConverterTwo;
