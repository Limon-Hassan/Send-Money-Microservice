"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dropdown, Button } from "react-bootstrap";

const ExchangeRateHistory = () => {
  // State for form values
  const [selectedPair, setSelectedPair] = useState(
    "EUR/USD (Euro / US Dollar)"
  );
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Currency pairs data
  const currencyPairs = [
    { code: "EUR/USD", name: "Euro / US Dollar" },
    { code: "USD/JPY", name: "US Dollar / Japanese Yen" },
    { code: "GBP/USD", name: "British Pound / US Dollar" },
    { code: "AUD/USD", name: "Australian Dollar / US Dollar" },
    { code: "USD/CAD", name: "US Dollar / Canadian Dollar" },
    { code: "USD/CHF", name: "US Dollar / Swiss Franc" },
  ];

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { selectedPair, fromDate, toDate });
    // Add your API call or data processing logic here
  };

  return (
    <>
      <div className="currency-calculator-area ptb-120">
        <div className="container">
          <h2 className="main-title style-two text-center mb-40 mw-1208 mx-auto">
            View past exchange rates and analyse currency trends over time
          </h2>

          <div className="row g-4">
            <div className="col-lg-7">
              <div className="currency-calculator-img h-100">
                <Image
                  src="/images/currency-calculator-img2.jpg"
                  className="ukiyo h-100 rounded-4"
                  alt="currency-calculator-img"
                  width={1520}
                  height={854}
                />
              </div>
            </div>

            <div className="col-lg-5">
              <form
                className="currency-converter-form style-two bg-primary"
                onSubmit={handleSubmit}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0 text-secondary">
                    Historical Exchange Rates
                  </h3>
                </div>

                {/* Currency Pair Dropdown */}
                <div className="currency-input position-relative mb-3">
                  <label className="label z-1">Currency Pair</label>
                  <Dropdown className="w-100 form-control">
                    <Dropdown.Toggle
                      variant="transparent"
                      className="w-100 text-start border-0 p-0 bg-transparent"
                      id="currency-pair-dropdown"
                    >
                      <span className="d-flex align-items-center justify-content-between">
                        <span>{selectedPair}</span>
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100 p-3">
                      {currencyPairs.map((pair) => (
                        <Dropdown.Item
                          key={pair.code}
                          onClick={() =>
                            setSelectedPair(`${pair.code} (${pair.name})`)
                          }
                        >
                          {pair.code} - {pair.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                {/* From Date Input */}
                <div className="currency-input position-relative mb-3">
                  <label className="label z-1">From Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                  />
                </div>

                {/* To Date Input */}
                <div className="currency-input position-relative mb-4">
                  <label className="label z-1">To Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-100 border-secondary"
                >
                  Apply Filters
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExchangeRateHistory;
