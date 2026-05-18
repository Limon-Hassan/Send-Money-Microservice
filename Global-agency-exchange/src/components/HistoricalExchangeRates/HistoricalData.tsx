"use client";

import React, { useState } from "react";

// Define interface for historical data items
interface HistoricalDataItem {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  change: string;
  direction: "up" | "down";
}

const HistoricalData: React.FC = () => {
  // Sample historical data with proper typing
  const initialData: HistoricalDataItem[] = [
    {
      date: "Jun 30, 2025",
      open: "1.0915",
      high: "1.0945",
      low: "1.0882",
      close: "1.0942",
      change: "+0.25%",
      direction: "up",
    },
    {
      date: "Jun 29, 2025",
      open: "1.0920",
      high: "1.0932",
      low: "1.0865",
      close: "1.0915",
      change: "-0.05%",
      direction: "down",
    },
    {
      date: "Jun 28, 2025",
      open: "1.0950",
      high: "1.0975",
      low: "1.0890",
      close: "1.0920",
      change: "-0.27%",
      direction: "down",
    },
    {
      date: "Jun 27, 2025",
      open: "1.0905",
      high: "1.0968",
      low: "1.0885",
      close: "1.0950",
      change: "+0.41%",
      direction: "up",
    },
    {
      date: "Jun 26, 2025",
      open: "1.0870",
      high: "1.0920",
      low: "1.0855",
      close: "1.0905",
      change: "+0.32%",
      direction: "up",
    },
    {
      date: "Jun 25, 2025",
      open: "1.0955",
      high: "1.0965",
      low: "1.0840",
      close: "1.0870",
      change: "-0.78%",
      direction: "down",
    },
    {
      date: "Jun 24, 2025",
      open: "1.0980",
      high: "1.0995",
      low: "1.0920",
      close: "1.0955",
      change: "-0.23%",
      direction: "down",
    },
    {
      date: "Jun 23, 2025",
      open: "1.0925",
      high: "1.1005",
      low: "1.0905",
      close: "1.0980",
      change: "+0.50%",
      direction: "up",
    },
    {
      date: "Jun 22, 2025",
      open: "1.0900",
      high: "1.0950",
      low: "1.0880",
      close: "1.0925",
      change: "+0.18%",
      direction: "up",
    },
    {
      date: "Jun 21, 2025",
      open: "1.0925",
      high: "1.0940",
      low: "1.0875",
      close: "1.0900",
      change: "-0.23%",
      direction: "down",
    },
    {
      date: "Jun 20, 2025",
      open: "1.0890",
      high: "1.0935",
      low: "1.0860",
      close: "1.0925",
      change: "+0.32%",
      direction: "up",
    },
    {
      date: "Jun 19, 2025",
      open: "1.0855",
      high: "1.0900",
      low: "1.0840",
      close: "1.0890",
      change: "+0.41%",
      direction: "up",
    },
  ];

  // State for pagination with proper typing
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(9); // Number of items per page

  // Calculate pagination values with proper typing
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: HistoricalDataItem[] = initialData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages: number = Math.ceil(initialData.length / itemsPerPage);

  // Handle page change with proper typing
  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  // Handle previous page with proper typing
  const goToPreviousPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page with proper typing
  const goToNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle download functions with proper typing
  const handleDownloadCSV = (): void => {
    alert(
      "Downloading CSV... (In a real app, this would generate and download a CSV file)"
    );
  };

  const handleDownloadPDF = (): void => {
    alert(
      "Downloading PDF... (In a real app, this would generate and download a PDF file)"
    );
  };

  return (
    <>
      <div className="ptb-120 live-exchange-rates">
        <div className="container">
          <h2 className="main-title style-two text-center mb-40">
            Historical Data
          </h2>

          <div className="table-border border-0">
            <div className="exchange-table table-responsive mb-30">
              <table className="table align-middle table-striped mb-0">
                <thead>
                  <tr>
                    <th scope="col" className="bg-any-bg">
                      Date
                    </th>
                    <th scope="col" className="bg-any-bg">
                      Open
                    </th>
                    <th scope="col" className="bg-any-bg">
                      High
                    </th>
                    <th scope="col" className="bg-any-bg">
                      Low
                    </th>
                    <th scope="col" className="bg-any-bg">
                      Close
                    </th>
                    <th scope="col" className="bg-any-bg">
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(
                    (item: HistoricalDataItem, index: number) => (
                      <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.open}</td>
                        <td>{item.high}</td>
                        <td>{item.low}</td>
                        <td>{item.close}</td>
                        <td
                          className={
                            item.direction === "up"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          <i
                            className={`ri-arrow-${item.direction}-s-fill`}
                          ></i>{" "}
                          {item.change}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between flex-wrap gap-10">
              <div className="pagination-area d-flex">
                <button
                  className="next page-numbers border-0"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  <i className="ri-arrow-left-long-line"></i>
                </button>

                {/* Generate page numbers */}
                {Array.from(
                  { length: totalPages },
                  (_, i: number) => i + 1
                ).map((pageNumber: number) => (
                  <button
                    key={pageNumber}
                    className={`page-numbers border-0 ${
                      currentPage === pageNumber ? "current" : ""
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  className="next page-numbers border-0"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  <i className="ri-arrow-right-long-line"></i>
                </button>
              </div>

              <div className="d-flex gap-10">
                <button className="btn" onClick={handleDownloadCSV}>
                  Download CSV
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoricalData;
