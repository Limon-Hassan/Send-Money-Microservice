import React from "react";
import Image from "next/image";

const MoneyTransferFeatures = () => {
  // Dynamic data for money transfer features
  const featuresData = [
    {
      id: 1,
      title: "International Money Transfer",
      description:
        "Send money abroad to friends and family with competitive exchange rates & low fees.",
      features: [
        "Send to 190+ countries",
        "Typically arrives in 1-2 days",
        "No hidden fees",
      ],
      icon: {
        src: "/images/icon/add-user.png",
        alt: "add-user",
      },
    },
    {
      id: 2,
      title: "Travel Money",
      description:
        "Order foreign currency online for home delivery with competitive rates.",
      features: [
        "60+ currencies available",
        "Next-day delivery option",
        "Buy-back guarantee",
      ],
      icon: {
        src: "/images/icon/flight-takeoff.png",
        alt: "flight-takeoff",
      },
      styleClass: "style-two",
    },
    {
      id: 3,
      title: "Rate Alerts",
      description:
        "Set up custom alerts to notify you when your desired exchange rate is reached.",
      features: [
        "Email & push notifications",
        "Set your target rate",
        "Free service",
      ],
      icon: {
        src: "/images/icon/notification2.png",
        alt: "notification",
      },
    },
  ];

  return (
    <>
      <div className="sending-money-area ptb-120">
        <div className="container">
          <h2 className="main-title style-two text-center mb-40 mw-1208 mx-auto">
            Fast, secure, and low-cost international money transfers for your
            personal needs
          </h2>

          <div className="row g-4 justify-content-center">
            {featuresData.map((feature) => (
              <div key={feature.id} className="col-lg-4 col-md-6">
                <div
                  className={`sending-money-single-item ${
                    feature.styleClass || ""
                  }`}
                >
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>

                  <ul className="p-0 m-0 list-unstyled">
                    {feature.features.map((item, index) => (
                      <li
                        key={index}
                        className="d-flex align-items-center gap-8"
                      >
                        <i className="ri-checkbox-circle-fill text-secondary"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="btn z-1">
                    <Image
                      src={feature.icon.src}
                      alt={feature.icon.alt}
                      width={35}
                      height={35}
                    />
                  </span>
                  <Image
                    src="/images/shape.png"
                    className="shape"
                    alt="shape"
                    width={91}
                    height={91}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoneyTransferFeatures;
