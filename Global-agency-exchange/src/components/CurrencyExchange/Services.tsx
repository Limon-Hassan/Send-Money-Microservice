import React from "react";
import Image from "next/image";
import Link from "next/link";
import LiveExchangeRates from "./LiveExchangeRates";

const Services = () => {
  // Dynamic data for services
  const servicesData = [
    {
      id: 1,
      title: "Personal International Transfers",
      description:
        "Send money abroad securely with competitive exchange rates and low transparent fees. Ideal for supporting family, paying for education, or purchasing property overseas.",
      imageSrc: "/images/service1.jpg",
      features: [
        "Send to 190+ countries worldwide",
        "Lock in exchange rates for future transfers",
        "Recurring payment options available",
        "Mobile app for managing transfers on the go",
      ],
      link: "/services/details",
    },
    {
      id: 2,
      title: "Business FX Solutions",
      description:
        "Manage international payments, hedge against currency risk, and streamline your global operations with our corporate foreign exchange services.",
      imageSrc: "/images/service2.jpg",
      features: [
        "Bulk international payments",
        "Forward contracts and hedging strategies",
        "Multi-currency accounts",
        "Dedicated account management",
      ],
      link: "/services/details",
    },
    {
      id: 3,
      title: "Travel Money",
      description:
        "Order foreign currency online for home delivery or branch pickup. Get competitive rates with no hidden fees and travel with confidence.",
      imageSrc: "/images/service3.jpg",
      features: [
        "60+ currencies available",
        "Next-day delivery option",
        "Buy-back guarantee for unused currency",
        "Pre-paid multi-currency travel cards",
      ],
      link: "/services/details",
    },
    {
      id: 4,
      title: "Online Foreign Exchange",
      description:
        "Our advanced online platform and mobile app make currency exchange simple, with real-time rates and secure transactions.",
      imageSrc: "/images/service4.jpg",
      features: [
        "Real-time exchange rate alerts",
        "Secure online transaction portal",
        "Historical rate charts and analysis",
        "24/7 access to your account",
      ],
      link: "/services/details",
    },
  ];

  return (
    <>
      <div className="services-area bg-any-bg ptb-120 position-relative z-1">
        <div className="container mw-1680">
          <div className="d-flex flex-wrap gap-10 justify-content-between align-items-end mb-40">
            <h2 className="main-title ms-0 mb-0 text-white mw-920 fw-semibold">
              Currency Exchange <span>Services</span>
            </h2>
            <p className="description text-white">
              Comprehensive foreign exchange solutions tailored to meet the
              needs of individuals and businesses.{" "}
              <Link href="/services" className="text-primary">
                View All
              </Link>
            </p>
          </div>

          <div className="row g-4">
            {servicesData.slice(0, 4).map((service) => (
              <div key={service.id} className="col-lg-6">
                <Link
                  href={service.link}
                  className="services-single-item d-block text-decoration-none"
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
                    src="/images/services-shape.png"
                    className="services-shape d-none d-sm-inline-block"
                    alt="services-shape"
                    width={125}
                    height={125}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* LiveExchangeRates */}
        <LiveExchangeRates />

        <Image
          src="/images/services-shape2.png"
          className="position-absolute top-0 end-0 z-n1"
          alt="services-shape"
          width={770}
          height={868}
        />
        <Image
          src="/images/services-shape3.png"
          className="position-absolute bottom-0 start-0 end-0 z-n1 services-shape3"
          alt="services-shape"
          width={1920}
          height={800}
        />
      </div>
    </>
  );
};

export default Services;
