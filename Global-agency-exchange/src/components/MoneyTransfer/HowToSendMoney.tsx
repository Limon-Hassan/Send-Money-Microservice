import React from "react";
import Image from "next/image";

const HowToSendMoney = () => {
  // Define steps data without styleClass
  const steps = [
    {
      id: 1,
      title: "Create & Verify Your Account",
      description:
        "Sign up in minutes and complete our quick verification process to get started.",
      features: [
        { id: 1, text: "Free account registration" },
        { id: 2, text: "Secure ID verification" },
        { id: 3, text: "No credit check required" },
      ],
      icon: {
        src: "/images/icon/add-user.png",
        alt: "add-user",
      },
    },
    {
      id: 2,
      title: "Set Up Your Transfer",
      description:
        "Enter transfer details including amount, destination, and recipient information.",
      features: [
        { id: 1, text: "Choose from 60+ currencies" },
        { id: 2, text: "Select delivery method" },
        { id: 3, text: "Lock in your exchange rate" },
      ],
      icon: {
        src: "/images/icon/transfer-data.png",
        alt: "transfer-data",
      },
    },
    {
      id: 3,
      title: "Pay & Send",
      description:
        "Pay for your transfer securely & we'll handle the rest. Track your transfer in real-time.",
      features: [
        { id: 1, text: "Multiple payment options" },
        { id: 2, text: "Bank-level security" },
        { id: 3, text: "24/7 transaction tracking" },
      ],
      icon: {
        src: "/images/icon/send.png",
        alt: "send",
      },
    },
  ];

  // Function to get style class based on step id
  const getStyleClass = (id: number) => {
    return id === 2 ? "style-two" : "";
  };

  return (
    <>
      <div className="sending-money-area pb-120">
        <div className="container">
          <div className="row gy-2 mb-40">
            <div className="col-lg-4">
              <span className="top-title">How to Send Money</span>
            </div>
            <div className="col-lg-8">
              <h2 className="main-title style-two mw-825">
                <span>Sending money</span> abroad with Expa is fast, secure, and
                hassle-free
              </h2>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {steps.map((step) => (
              <div key={step.id} className="col-lg-4 col-md-6">
                <div
                  className={`sending-money-single-item ${getStyleClass(
                    step.id
                  )}`}
                >
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>

                  <ul className="p-0 m-0 list-unstyled">
                    {step.features.map((feature) => (
                      <li
                        key={feature.id}
                        className="d-flex align-items-center gap-8"
                      >
                        <i className="ri-checkbox-circle-fill text-secondary"></i>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="btn z-1">
                    <Image
                      src={step.icon.src}
                      alt={step.icon.alt}
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

export default HowToSendMoney;
