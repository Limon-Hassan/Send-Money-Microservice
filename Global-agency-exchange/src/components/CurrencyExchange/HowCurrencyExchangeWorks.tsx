import React from "react";
import Image from "next/image";

const HowCurrencyExchangeWorks = () => {
  // Dynamic data for currency exchange steps
  const exchangeSteps = [
    {
      id: 1,
      title: "Create Account",
      description:
        "Sign up in minutes with our secure verification process. Complete your profile with the required documentation.",
      icon: "/images/icon/icon1.png",
    },
    {
      id: 2,
      title: "Get Quote",
      description:
        "Select your currencies and amount. View our competitive real-time exchange rates with no hidden fees.",
      icon: "/images/icon/icon2.png",
    },
    {
      id: 3,
      title: "Lock Rate",
      description:
        "Secure your preferred exchange rate. Rates are guaranteed for a specific period depending on the amount.",
      icon: "/images/icon/icon3.png",
    },
    {
      id: 4,
      title: "Transfer Funds",
      description:
        "Send your money securely. Most transfers are completed within 1-2 business days with full tracking.",
      icon: "/images/icon/icon4.png",
    },
  ];

  // Dynamic data for global features
  const globalFeatures = [
    {
      id: 1,
      title: "Secure Transactions",
      description:
        "Bank-level encryption and regulatory compliance ensure your funds and data are always protected.",
      icon: "/images/icon/credit-card.png",
    },
    {
      id: 2,
      title: "Low Fees",
      description:
        "Transparent pricing with no hidden charges. Save up to 85% compared to traditional banks.",
      icon: "/images/icon/low-price.png",
    },
    {
      id: 3,
      title: "Global Reach",
      description:
        "Access to 130+ currencies and 190+ countries. Send money worldwide with competitive rates.",
      icon: "/images/icon/global-network.png",
    },
  ];

  return (
    <>
      <div className="works-area ptb-120 overflow-hidden">
        <div className="container mw-1680">
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-40 gap-10">
            <h2 className="main-title ms-0 mb-0 fw-semibold">
              How Expa Currency Exchange Works
            </h2>
            <p className="description">
              Our streamlined process makes international currency exchange
              fast, secure, and cost-effective for both individuals and
              businesses.
            </p>
          </div>

          <div className="row g-4">
            {exchangeSteps.map((step) => (
              <div key={step.id} className="col-lg-3 col-md-6">
                <div className="works-single-item">
                  <span className="count">0{step.id}</span>
                  <Image
                    src="/images/shape.png"
                    className="position-absolute top-0 start-0 card-shape"
                    alt="shape"
                    width={90}
                    height={90}
                  />
                  <div className="icon">
                    <Image
                      src={step.icon}
                      className="img"
                      alt={step.title}
                      width={75}
                      height={75}
                    />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="global-reach-wrap bg-img mt-4"
            style={{
              backgroundImage: "url(/images/global-reach-bg.jpg)",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="global-content-wrap">
              <div className="d-flex flex-wrap gap-20 justify-content-between">
                {globalFeatures.map((feature) => (
                  <div key={feature.id} className="global-reach-single-item">
                    <div className="d-flex align-items-center mb-3 gap-20">
                      <div className="flex-shrink-0">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          width={35}
                          height={35}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <h3 className="mb-0">{feature.title}</h3>
                      </div>
                    </div>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowCurrencyExchangeWorks;
