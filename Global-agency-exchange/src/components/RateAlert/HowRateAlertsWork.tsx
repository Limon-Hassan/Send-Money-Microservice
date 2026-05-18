import React from "react";
import Image from "next/image";

const HowRateAlertsWork = () => {
  // Dynamic data configuration
  const rateAlertSteps = [
    {
      title: "Create account",
      description: "Create your free account to start sending money worldwide.",
      features: [
        "Sign up with email or phone",
        "Verify your identity",
        "Secure your account",
      ],
      icon: "/images/icon/add-user.png",
      iconAlt: "add-user",
    },
    {
      title: "Set desired rate",
      description:
        "Set your preferred exchange rate to get notified when it’s available.",
      features: [
        "Select currency pair",
        "Enter target rate",
        "Save your alert",
      ],
      icon: "/images/icon/transfer-data.png",
      iconAlt: "transfer-data",
      specialStyle: true, // Flag for special styling
    },
    {
      title: "Get notified",
      description:
        "Get instant notifications when your target rate is reached.",
      features: [
        "Choose notification method",
        "Receive alerts via email or SMS",
        "Stay updated in real-time",
      ],
      icon: "/images/icon/notification2.png",
      iconAlt: "notification2",
    },
  ];

  return (
    <>
      <div className="sending-money-area pb-120">
        <div className="container">
          <h2 className="main-title style-two text-center mb-40 mw-1208 mx-auto">
            How rate alerts work
          </h2>

          <div className="row g-4 justify-content-center">
            {rateAlertSteps.map((step, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div
                  className={`sending-money-single-item ${
                    step.specialStyle ? "style-two" : ""
                  }`}
                >
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>

                  <ul className="p-0 m-0 list-unstyled">
                    {step.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="d-flex align-items-center gap-8"
                      >
                        <i className="ri-checkbox-circle-fill text-secondary"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="btn z-1">
                    <Image
                      src={step.icon}
                      alt={step.iconAlt}
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

export default HowRateAlertsWork;
