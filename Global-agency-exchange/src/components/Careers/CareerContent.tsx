"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  responsibilities: string[];
  applyLink: string;
}

const CareerContent = () => {
  // Dynamic job data with more listings for pagination demonstration
  const jobListings: Job[] = [
    {
      id: 1,
      title: "Product Manager",
      description:
        "Lead the development and execution of fintech products, from concept to launch, aligning features with user needs and business goals.",
      location: "Remote / Office",
      employmentType: "Full-time / Part-time",
      responsibilities: [
        "Define product roadmap and priorities",
        "Analyze metrics to improve product performance",
        "3+ years in product management, preferably fintech",
      ],
      applyLink: "/apply-now",
    },
    {
      id: 2,
      title: "Customer Support Specialist",
      description:
        "Provide exceptional support to Expa users, resolving queries related to transfers, exchange rates, and account management.",
      location: "United Kingdom - London",
      employmentType: "Full-time / Part-time",
      responsibilities: [
        "Define product roadmap and priorities",
        "Analyze metrics to improve product performance",
        "3+ years in product management, preferably fintech",
      ],
      applyLink: "/apply-now",
    },
    {
      id: 3,
      title: "Account Manager",
      description:
        "Manage and nurture relationships with Expa's business and individual clients, ensuring their needs are met and helping them maximize the value of our services.",
      location: "United States - Orlando",
      employmentType: "Full-time / Part-time",
      responsibilities: [
        "Excellent communication and interpersonal skills",
        "Strong problem-solving and organizational abilities",
        "2+ years of experience in account management",
      ],
      applyLink: "/apply-now",
    },
    {
      id: 4,
      title: "Senior Backend Developer",
      description:
        "Design and implement scalable backend systems for our payment platform, ensuring security and performance.",
      location: "Germany - Berlin",
      employmentType: "Full-time",
      responsibilities: [
        "Experience with Node.js and cloud platforms",
        "Knowledge of database design and optimization",
        "5+ years in backend development",
      ],
      applyLink: "/apply-now",
    },
    {
      id: 5,
      title: "UX/UI Designer",
      description:
        "Create intuitive and visually appealing interfaces for our mobile and web applications.",
      location: "Remote",
      employmentType: "Full-time / Contract",
      responsibilities: [
        "Proficiency in Figma and Adobe Creative Suite",
        "Strong portfolio demonstrating UX/UI skills",
        "3+ years in product design",
      ],
      applyLink: "/apply-now",
    },
    {
      id: 6,
      title: "Data Analyst",
      description:
        "Analyze user behavior and transaction data to provide insights for product improvements.",
      location: "Canada - Toronto",
      employmentType: "Full-time",
      responsibilities: [
        "Experience with SQL and data visualization tools",
        "Strong analytical and problem-solving skills",
        "2+ years in data analysis",
      ],
      applyLink: "/apply-now",
    },
    {
      id: 7,
      title: "Marketing Specialist",
      description:
        "Develop and execute marketing campaigns to increase brand awareness and user acquisition.",
      location: "United States - New York",
      employmentType: "Full-time",
      responsibilities: [
        "Experience with digital marketing channels",
        "Strong copywriting and communication skills",
        "3+ years in marketing",
      ],
      applyLink: "/apply-now",
    },
    {
      id: 8,
      title: "Compliance Officer",
      description:
        "Ensure our operations comply with financial regulations and internal policies.",
      location: "United Kingdom - London",
      employmentType: "Full-time",
      responsibilities: [
        "Knowledge of financial regulations",
        "Attention to detail and analytical skills",
        "4+ years in compliance",
      ],
      applyLink: "/apply-now",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 4; // Number of jobs to show per page

  // Calculate pagination values
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobListings.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobListings.length / jobsPerPage);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Navigate to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Navigate to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Only show pagination if there's more than one page
  const showPagination = totalPages > 1;

  return (
    <>
      <div className="current-openings-area bg-secondary ptb-120">
        <div className="container">
          <h2 className="main-title style-two mb-4 text-center text-white">
            Current Openings Take the Next Step in Your Career
          </h2>
          <div className="table-responsive current-openings-table">
            <table className="table bg-transparent align-middle">
              <tbody>
                {currentJobs.map((job) => (
                  <tr key={job.id}>
                    <td className="bg-transparent py-4">
                      <div className="mw-312">
                        <h3 className="text-white mb-3">{job.title}</h3>
                        <p>{job.description}</p>
                      </div>
                    </td>
                    <td className="bg-transparent py-4">
                      <div className="mb-3">
                        <span className="fs-20 text-body d-block mb-1">
                          Location
                        </span>
                        <p className="text-white">{job.location}</p>
                      </div>

                      <div>
                        <span className="fs-20 text-body d-block mb-1">
                          Employment Type
                        </span>
                        <p className="text-white">({job.employmentType})</p>
                      </div>
                    </td>
                    <td className="bg-transparent py-4">
                      {job.responsibilities.map((responsibility, index) => (
                        <div
                          key={index}
                          className="d-flex align-items-center gap-8 mb-2"
                        >
                          <i className="ri-checkbox-circle-fill text-primary"></i>
                          <span>{responsibility}</span>
                        </div>
                      ))}
                    </td>
                    <td className="bg-transparent py-4">
                      <Link
                        href={job.applyLink}
                        className="btn d-inline-block bg-transparent text-primary"
                      >
                        Apply Now
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination - only show if there's more than one page */}
          {showPagination && (
            <div className="pagination-area d-flex align-items-center justify-content-center mt-3">
              <button
                className="next page-numbers border-0"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <i className="ri-arrow-left-long-line"></i>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`page-numbers border-0 ${
                      currentPage === pageNumber ? "current" : ""
                    }`}
                    onClick={() => paginate(pageNumber)}
                    aria-label={`Page ${pageNumber}`}
                  >
                    {pageNumber.toString().padStart(2, "0")}
                  </button>
                )
              )}

              <button
                className="next page-numbers border-0"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <i className="ri-arrow-right-long-line"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CareerContent;
