"use client";

import React, { useState, useEffect } from "react";

// Define interface for exchange rate data
interface ExchangeRateData {
  period: string;
  high: number;
  low: number;
  average: number;
  change: number;
}

const EurUsdExchangeRateHistory = () => {
  // State for exchange rate data with proper type
  const [exchangeData, setExchangeData] = useState<ExchangeRateData[]>([]);

  // State for loading status
  const [isLoading, setIsLoading] = useState(true);

  // Format change percentage with proper type
  const formatChange = (value: number): string => {
    return `${value > 0 ? "+" : ""}${value}%`;
  };

  // Simulate API fetch with useEffect
  useEffect(() => {
    // Simulate API call delay
    const fetchData = setTimeout(() => {
      // Mock data for EUR/USD exchange rate history
      const mockData: ExchangeRateData[] = [
        {
          period: "Last 7 days",
          high: 0.8546,
          low: 0.8498,
          average: 0.8528,
          change: -0.23,
        },
        {
          period: "Last 30 days",
          high: 0.8613,
          low: 0.8498,
          average: 0.8555,
          change: -0.27,
        },
        {
          period: "Last 60 days",
          high: 0.8755,
          low: 0.8494,
          average: 0.8574,
          change: -0.85,
        },
        {
          period: "Last 90 days",
          high: 0.8754,
          low: 0.8471,
          average: 0.8573,
          change: -1.56,
        },
      ];

      setExchangeData(mockData);
      setIsLoading(false);
    }, 800); // Simulate 800ms loading time

    return () => clearTimeout(fetchData);
  }, []);

  return (
    <>
      <div className="ptb-120 live-exchange-rates bg-f9f9f9">
        <div className="container">
          <h2 className="main-title style-two text-center mb-40">
            EUR/USD exchange rate history (Jan - Dec 2025)
          </h2>

          <div className="table-border border-0">
            <div className="exchange-table table-responsive">
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading exchange rate data...</p>
                </div>
              ) : (
                <table className="table align-middle table-striped mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="bg-any-bg">
                        1 USD to Euro
                      </th>
                      {exchangeData.map((data, index) => (
                        <th key={index} scope="col" className="bg-any-bg">
                          {data.period}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h3>High</h3>
                      </td>
                      {exchangeData.map((data, index) => (
                        <td key={index}>{data.high.toFixed(4)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>
                        <h3>Low</h3>
                      </td>
                      {exchangeData.map((data, index) => (
                        <td key={index}>{data.low.toFixed(4)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>
                        <h3>Average</h3>
                      </td>
                      {exchangeData.map((data, index) => (
                        <td key={index}>{data.average.toFixed(4)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>
                        <h3>Change</h3>
                      </td>
                      {exchangeData.map((data, index) => (
                        <td
                          key={index}
                          className={
                            data.change >= 0 ? "text-success" : "text-danger"
                          }
                        >
                          {formatChange(data.change)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EurUsdExchangeRateHistory;
