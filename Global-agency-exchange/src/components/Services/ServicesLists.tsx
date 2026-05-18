"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ServicesLists = () => {
  // Dynamic data for services
  const servicesData = [
    {
      id: 1,
      title: 'Personal International Transfers',
      description:
        'Send money abroad securely with competitive exchange rates and low transparent fees. Ideal for supporting family, paying for education, or purchasing property overseas.',
      imageSrc: '/images/service1.jpg',
      features: [
        'Send to 190+ countries worldwide',
        'Lock in exchange rates for future transfers',
        'Recurring payment options available',
        'Mobile app for managing transfers on the go',
      ],
      link: '/services/details',
    },
    {
      id: 2,
      title: 'Business FX Solutions',
      description:
        'Manage international payments, hedge against currency risk, and streamline your global operations with our corporate foreign exchange services.',
      imageSrc: '/images/service2.jpg',
      features: [
        'Bulk international payments',
        'Forward contracts and hedging strategies',
        'Multi-currency accounts',
        'Dedicated account management',
      ],
      link: '/business',
    },
    {
      id: 3,
      title: 'Travel Money',
      description:
        'Order foreign currency online for home delivery or branch pickup. Get competitive rates with no hidden fees and travel with confidence.',
      imageSrc: '/images/service3.jpg',
      features: [
        '60+ currencies available',
        'Next-day delivery option',
        'Buy-back guarantee for unused currency',
        'Pre-paid multi-currency travel cards',
      ],
      link: '/services/details',
    },
    {
      id: 4,
      title: 'Online Foreign Exchange',
      description:
        'Our advanced online platform and mobile app make currency exchange simple, with real-time rates and secure transactions.',
      imageSrc: '/images/service4.jpg',
      features: [
        'Real-time exchange rate alerts',
        'Secure online transaction portal',
        'Historical rate charts and analysis',
        '24/7 access to your account',
      ],
      link: '/services/details',
    },
    {
      id: 5,
      title: 'Currency Hedging',
      description:
        'Protect your business from currency fluctuations with our forward contracts and hedging strategies.',
      imageSrc: '/images/service1.jpg',
      features: [
        'Forward contracts up to 24 months',
        'Flexible settlement options',
        'Expert advisory services',
        'Competitive pricing',
      ],
      link: '/services/details',
    },
    {
      id: 6,
      title: 'International Payments',
      description:
        'Streamline your international payments with our secure and efficient payment solutions.',
      imageSrc: '/images/service2.jpg',
      features: [
        'Same-day international transfers',
        'Batch payment processing',
        'Multi-currency capabilities',
        'Payment tracking and reporting',
      ],
      link: '/services/details',
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of services per page

  // Calculate pagination values
  const totalPages = Math.ceil(servicesData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = servicesData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of services area
    document.querySelector('.services-area')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Handle next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Only show pagination if there are more than itemsPerPage (4) items
  const showPagination = servicesData.length > itemsPerPage;

  return (
    <>
      <div className="services-area ptb-120 position-relative z-1">
        <div className="container mw-1680">
          <h2 className="main-title style-two mw-1270 mx-auto text-center mb-40">
            Comprehensive foreign exchange solutions tailored to meet the needs
            of individuals and businesses.
          </h2>

          <div className="row g-4">
            {currentItems.map((service) => (
              <div key={service.id} className="col-lg-6">
                <Link
                  href={service.link}
                  className="services-single-item d-block text-decoration-none bg-secondary"
                >
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    width={1396}
                    height={500}
                  />

                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <ul className="p-0 mb-0 list-unstyled info-list">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="d-flex align-items-center align-items-center gap-14"
                      >
                        <i className="ri-check-double-line"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="icon">
                    <i className="ri-add-line"></i>
                  </div>
                  <Image
                    src="/images/services-shape-white.png"
                    className="services-shape d-none d-sm-inline-block"
                    alt="services-shape"
                    width={125}
                    height={125}
                  />
                </Link>
              </div>
            ))}

            {/* Conditionally render pagination only if needed */}
            {showPagination && (
              <div className="col-lg-12">
                <div className="pagination-area d-flex align-items-center justify-content-center mt-4">
                  <button 
                    className="next page-numbers border-0"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <i className="ri-arrow-left-long-line"></i>
                  </button>

                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      className={`page-numbers border-0 ${
                        currentPage === number ? "current" : ""
                      }`}
                      onClick={() => handlePageChange(number)}
                      aria-current={currentPage === number ? "page" : undefined}
                      aria-label={`Page ${number}`}
                    >
                      {number.toString().padStart(2, '0')}
                    </button>
                  ))}

                  <button 
                    className="next page-numbers border-0"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <i className="ri-arrow-right-long-line"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesLists;