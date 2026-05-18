import React from "react";
import Image from "next/image";

const SecurityAndBenefits = () => {
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
      <div className="works-area">
        <div className="container mw-1680">
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

export default SecurityAndBenefits;
