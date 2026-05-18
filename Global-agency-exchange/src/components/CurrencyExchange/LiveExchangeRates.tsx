"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Define TypeScript interfaces
interface ExchangeRate {
  id: number;
  pair: string;
  name: string;
  rate: number;
  change: number;
  isPositive: boolean;
  chart: string;
}

interface ApiResponse {
  rates: {
    [key: string]: number;
  };
  base: string;
  date: string;
}

const LiveExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data - replace with actual API call
  const mockExchangeRates: ExchangeRate[] = [
    {
      id: 1,
      pair: "EUR/USD",
      name: "Euro / US Dollar",
      rate: 1.0942,
      change: 0.12,
      isPositive: true,
      chart: "/images/chart1.png",
    },
    {
      id: 2,
      pair: "GBP/USD",
      name: "British Pound / US Dollar",
      rate: 1.2758,
      change: 0.08,
      isPositive: true,
      chart: "/images/chart1.png",
    },
    {
      id: 3,
      pair: "USD/JPY",
      name: "US Dollar / Japanese Yen",
      rate: 143.67,
      change: 0.05,
      isPositive: false,
      chart: "/images/chart1.png",
    },
    {
      id: 4,
      pair: "USD/CHF",
      name: "US Dollar / Swiss Franc",
      rate: 0.8784,
      change: 0.15,
      isPositive: true,
      chart: "/images/chart1.png",
    },
    {
      id: 5,
      pair: "AUD/USD",
      name: "Australian Dollar / US Dollar",
      rate: 0.6713,
      change: 0.21,
      isPositive: false,
      chart: "/images/chart1.png",
    },
  ];

  // Helper function to get currency names
  const getCurrencyName = (currency: string): string => {
    const names: { [key: string]: string } = {
      EUR: "Euro",
      GBP: "British Pound",
      JPY: "Japanese Yen",
      CHF: "Swiss Franc",
      AUD: "Australian Dollar",
      USD: "US Dollar",
    };
    return names[currency] || currency;
  };

  // Fetch exchange rates data
  const fetchExchangeRates = async (): Promise<void> => {
    try {
      setLoading(true);

      // For now, using mock data with a delay to simulate API call
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));

      setExchangeRates(mockExchangeRates);
      setLastUpdated(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch exchange rates";
      setError(errorMessage);
      console.error("Error fetching exchange rates:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchExchangeRates();

    // Set up interval to refresh data every 60 seconds
    const interval = setInterval(fetchExchangeRates, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = (): void => {
    fetchExchangeRates();
  };

  const handleExchange = (currencyPair: string): void => {
    // Handle exchange action
    console.log(`Exchange clicked for: ${currencyPair}`);
    // You can implement navigation to exchange page or open a modal
  };

  if (loading && exchangeRates.length === 0) {
    return (
      <div className="pt-120">
        <div className="container">
          <span className="exchange-title">
            <span>Live</span> Exchange Rates
          </span>
          <div className="text-center py-5">Loading exchange rates...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-120">
        <div className="container">
          <span className="exchange-title">
            <span>Live</span> Exchange Rates
          </span>

          <div className="table-border">
            <div className="d-flex justify-content-between align-items-center table-info">
              <span className="text-body">
                Last updated: {lastUpdated}
                {loading && <span className="ms-2">(Updating...)</span>}
              </span>
              <button
                type="button"
                className="bg-transparent p-0 border-0 fw-semibold"
                onClick={handleRefresh}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh Rates"}
              </button>
            </div>

            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

            <div className="exchange-table table-responsive">
              <table className="table align-middle table-striped mb-0">
                <thead>
                  <tr>
                    <th scope="col">Currency</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Change (24h)</th>
                    <th scope="col">Chart</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {exchangeRates.map((currency: ExchangeRate) => (
                    <tr key={currency.id}>
                      <td>
                        <div>
                          <h3>{currency.pair}</h3>
                          <span>{currency.name}</span>
                        </div>
                      </td>
                      <td>{currency.rate}</td>
                      <td
                        className={
                          currency.isPositive ? "text-success" : "text-danger"
                        }
                      >
                        <i
                          className={`ri-arrow-${
                            currency.isPositive ? "up" : "down"
                          }-s-fill`}
                        ></i>
                        {currency.change}%
                      </td>
                      <td>
                        <Image
                          src={currency.chart}
                          alt={`${currency.pair} chart`}
                          width={202}
                          height={25}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleExchange(currency.pair)}
                        >
                          Exchange
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-bottom"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveExchangeRates;
