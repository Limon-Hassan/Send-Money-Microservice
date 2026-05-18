'use client';

import React, { useState, useEffect, useMemo, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CurrencyConverterTwo from '../MoneyTransfer/CurrencyConverterTwo';
import CurrencyConverter from '../MoneyTransfer/CurrencyConverter';

// Define types for better type safety
type Currency = {
  name: string;
  code: string;
  flag: string;
};

type ExchangeRates = {
  [key: string]: number;
};

const HeroBanner = () => {
  // Currency data with explicit typing
  const currencies: Currency[] = [
    { name: 'US Dollar', code: 'USD', flag: '/images/flags/united-states.png' },
    { name: 'Euro', code: 'EUR', flag: '/images/flags/round.png' },
    {
      name: 'British Pound Sterling',
      code: 'GBP',
      flag: '/images/flags/united-kingdom.png',
    },
    { name: 'Japanese Yen', code: 'JPY', flag: '/images/flags/japan.png' },
    {
      name: 'Australian Dollar',
      code: 'AUD',
      flag: '/images/flags/australia.png',
    },
    { name: 'Chinese Yuan', code: 'CNY', flag: '/images/flags/china.png' },
    { name: 'Indian Rupee', code: 'INR', flag: '/images/flags/india.png' },
    {
      name: 'Brazilian Real',
      code: 'BRL',
      flag: '/images/flags/brazil-flag.png',
    },
    {
      name: 'South African Rand',
      code: 'ZAR',
      flag: '/images/flags/south-africa.png',
    },
    { name: 'Mexican Peso', code: 'MXN', flag: '/images/flags/mexico.png' },
    {
      name: 'UAE Dirham',
      code: 'AED',
      flag: '/images/flags/united-arab-emirates.png',
    },
    {
      name: 'Saudi Riyal',
      code: 'SAR',
      flag: '/images/flags/saudi-arabia.png',
    },
    { name: 'Swiss Franc', code: 'CHF', flag: '/images/flags/switzerland.png' },
    {
      name: 'Singapore Dollar',
      code: 'SGD',
      flag: '/images/flags/singapore.png',
    },
  ];

  // Memoize exchange rates to prevent unnecessary re-renders
  const exchangeRates = useMemo<ExchangeRates>(
    () => ({
      USD: 1,
      EUR: 0.93,
      GBP: 0.79,
      JPY: 147.65,
      AUD: 1.53,
      CNY: 7.29,
      INR: 83.28,
      BRL: 5.07,
      ZAR: 18.78,
      MXN: 17.14,
      AED: 3.67,
      SAR: 3.75,
      CHF: 0.88,
      SGD: 1.34,
    }),
    [],
  );

  // State for selected currencies and amount with explicit typing
  const [fromCurrency, setFromCurrency] = useState<Currency>(currencies[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(currencies[4]); // Australian Dollar
  const [amount, setAmount] = useState<string>('10.00');
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Calculate conversion when currencies or amount change
  useEffect(() => {
    const calculateConversion = () => {
      // Parse amount to float, default to 0 if invalid
      const parsedAmount = parseFloat(amount) || 0;

      // Calculate exchange rate
      const rate =
        exchangeRates[toCurrency.code] / exchangeRates[fromCurrency.code];
      setExchangeRate(rate.toFixed(5));

      // Calculate converted amount
      const result = parsedAmount * rate;
      setConvertedAmount(result.toFixed(6));

      // Set last updated time (in a real app, this would come from the API)
      const now = new Date();
      setLastUpdated(
        now.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
    };

    calculateConversion();
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  // Handle amount input change with proper typing
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setAmount(value);
    }
  };

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <>
      <div className="banner-area bg-any-bg position-relative z-1">
        <div className="container mw-1680">
          <div className="banner-content position-relative z-1">
            <h1>
              Global Currency{' '}
              <Image
                src="/images/money-exchange.gif"
                className="money-exchange d-none d-xxl-inline-block"
                alt="money-exchange"
                width={217}
                height={217}
              />
            </h1>

            <h1 className="text-align">Exchange</h1>

            <div className="banner-info">
              <p>
                SendMoney provides institutional-grade foreign exchange services to
                businesses and individuals with transparent pricing, deep
                liquidity, and cutting-edge technology.
              </p>

              <div className="d-flex align-items-center gap-30 gap-2 info-btn">
                <Link
                  href="/exchange-rate"
                  className="btn d-flex align-items-center"
                >
                  Start Exchange
                  <i className="ri-arrow-left-right-line"></i>
                </Link>
                <div>
                  <span className="d-block">Call us.</span>
                  <a
                    href="tel:+1(444)2587485"
                    className="text-decoration-none call"
                  >
                    +1 (444) 258 7485
                  </a>
                </div>
              </div>
            </div>

            <div className="position-relative z-0 d-flex justify-content-between counter-wrap">
              <div className="counter-single-item">
                <h2>
                  <span className="counters">0.2</span>%
                </h2>
                <p>Average Savings</p>
              </div>
              <div className="counter-single-item">
                <h2>
                  $<span className="counters">12</span>B+
                </h2>
                <p>Volume Processed</p>
              </div>
              <div className="counter-single-item">
                <h2>
                  <span className="counters">150</span>+
                </h2>
                <p>Countries Served</p>
              </div>
            </div>
            <div className="d-flex justify-content-end align-content-end">
              <CurrencyConverter />
            </div>
            {/* <form className="currency-converter-form">
              <h3>Currency Converter</h3>

              <div className="d-flex flex-column gap-20">
                <div className="col-12">
                  <div className="currency-input position-relative z-1">
                    <label className="label">Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="currency-input position-relative z-1">
                    <label className="label z-1">From this currency</label>

                    <Dropdown className="form-control">
                      <Dropdown.Toggle
                        className="border-0 w-100 p-0 d-flex align-items-center justify-content-between"
                        id="from-currency-dropdown"
                      >
                        <span>{fromCurrency.name}</span>
                        <span className="d-flex align-items-center gap-7 flag">
                          <Image
                            src={fromCurrency.flag}
                            alt={fromCurrency.name}
                            width={25}
                            height={25}
                          />{' '}
                          {fromCurrency.code}{' '}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="w-100">
                        {currencies.map((currency: Currency, index: number) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => setFromCurrency(currency)}
                            className="d-flex align-items-center justify-content-between"
                          >
                            <span>{currency.name}</span>
                            <span className="d-flex align-items-center gap-7">
                              <Image
                                src={currency.flag}
                                alt={currency.name}
                                width={25}
                                height={25}
                              />{' '}
                              {currency.code}
                            </span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                <div className="col-12">
                  <div className="currency-input position-relative z-1">
                    <label className="label z-1">To this currency</label>

                    <Dropdown className="form-control">
                      <Dropdown.Toggle
                        className="border-0 w-100 p-0 d-flex align-items-center justify-content-between"
                        id="to-currency-dropdown"
                      >
                        <span>{toCurrency.name}</span>
                        <span className="d-flex align-items-center gap-7 flag">
                          <Image
                            src={toCurrency.flag}
                            alt={toCurrency.name}
                            width={25}
                            height={25}
                          />{' '}
                          {toCurrency.code}{' '}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="w-100">
                        {currencies.map((currency: Currency, index: number) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => setToCurrency(currency)}
                            className="d-flex align-items-center justify-content-between"
                          >
                            <span>{currency.name}</span>
                            <span className="d-flex align-items-center gap-7">
                              <Image
                                src={currency.flag}
                                alt={currency.name}
                                width={25}
                                height={25}
                              />{' '}
                              {currency.code}
                            </span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap justify-content-between align-items-center currency-wrap">
                <div>
                  <p className="d-block mb-0">
                    {amount || '0.00'} {fromCurrency.name} ={' '}
                    {convertedAmount || '0.00'} {toCurrency.name}
                  </p>
                  <span className="d-block">
                    1 {fromCurrency.code} = {exchangeRate} {toCurrency.code}
                  </span>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-20">
                  <div>
                    <p className="d-block mb-0">Exchange rate</p>
                    <span className="d-block">Last updated {lastUpdated}</span>
                  </div>
                  <button
                    type="button"
                    className="btn d-flex align-items-center"
                    onClick={swapCurrencies}
                  >
                    Swap Currencies
                    <i className="ri-arrow-left-right-line"></i>
                  </button>
                </div>
              </div>
            </form> */}
            {/* <form className="currency-converter-form">
              <h3>Currency Converter</h3>

              <div className="row g-4">
                <div className="col-lg-4">
                  <div className="currency-input position-relative z-1">
                    <label className="label">Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="currency-input position-relative z-1">
                    <label className="label z-1">From this currency</label>

                    <Dropdown className="form-control">
                      <Dropdown.Toggle
                        className="border-0 w-100 p-0 d-flex align-items-center justify-content-between"
                        id="from-currency-dropdown"
                      >
                        <span>{fromCurrency.name}</span>
                        <span className="d-flex align-items-center gap-7 flag">
                          <Image
                            src={fromCurrency.flag}
                            alt={fromCurrency.name}
                            width={25}
                            height={25}
                          />{" "}
                          {fromCurrency.code}{" "}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="w-100">
                        {currencies.map((currency: Currency, index: number) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => setFromCurrency(currency)}
                            className="d-flex align-items-center justify-content-between"
                          >
                            <span>{currency.name}</span>
                            <span className="d-flex align-items-center gap-7">
                              <Image
                                src={currency.flag}
                                alt={currency.name}
                                width={25}
                                height={25}
                              />{" "}
                              {currency.code}
                            </span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="currency-input position-relative z-1">
                    <label className="label z-1">To this currency</label>

                    <Dropdown className="form-control">
                      <Dropdown.Toggle
                        className="border-0 w-100 p-0 d-flex align-items-center justify-content-between"
                        id="to-currency-dropdown"
                      >
                        <span>{toCurrency.name}</span>
                        <span className="d-flex align-items-center gap-7 flag">
                          <Image
                            src={toCurrency.flag}
                            alt={toCurrency.name}
                            width={25}
                            height={25}
                          />{" "}
                          {toCurrency.code}{" "}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="w-100">
                        {currencies.map((currency: Currency, index: number) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => setToCurrency(currency)}
                            className="d-flex align-items-center justify-content-between"
                          >
                            <span>{currency.name}</span>
                            <span className="d-flex align-items-center gap-7">
                              <Image
                                src={currency.flag}
                                alt={currency.name}
                                width={25}
                                height={25}
                              />{" "}
                              {currency.code}
                            </span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap justify-content-between align-items-center currency-wrap">
                <div>
                  <p className="d-block mb-0">
                    {amount || "0.00"} {fromCurrency.name} ={" "}
                    {convertedAmount || "0.00"} {toCurrency.name}
                  </p>
                  <span className="d-block">
                    1 {fromCurrency.code} = {exchangeRate} {toCurrency.code}
                  </span>
                </div>
                <div className="d-flex flex-wrap align-items-center gap-20">
                  <div>
                    <p className="d-block mb-0">Exchange rate</p>
                    <span className="d-block">Last updated {lastUpdated}</span>
                  </div>
                  <button
                    type="button"
                    className="btn d-flex align-items-center"
                    onClick={swapCurrencies}
                  >
                    Swap Currencies
                    <i className="ri-arrow-left-right-line"></i>
                  </button>
                </div>
              </div>
            </form> */}

            <Image
              src="/images/banner-img.jpg"
              className="position-absolute bottom-0 start-0 z-n1 banner-img d-none d-lg-inline-block"
              alt="banner-img"
              width={613}
              height={813}
            />
          </div>
        </div>

        <Image
          src="/images/banner-shape.png"
          className="banner-shape"
          alt="banner-shape"
          width={1920}
          height={800}
        />
        <Image
          src="/images/shape3.png"
          className="position-absolute top-0 end-0 d-none d-lg-inline-block"
          alt="shape3"
          width={485}
          height={480}
        />
      </div>
    </>
  );
};

export default HeroBanner;
