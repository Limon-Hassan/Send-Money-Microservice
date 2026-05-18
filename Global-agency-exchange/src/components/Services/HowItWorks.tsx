import React from "react";
import Image from "next/image";

const HowItWorks = ({
  steps = [
    {
      stepNumber: "Step -01",
      image: {
        src: "/images/icon/star.png",
        alt: "star",
      },
      title: "Create an Account",
      description:
        "Sign up in minutes with your email and phone number. Verification is quick and secure.",
    },
    {
      stepNumber: "Step -02",
      image: {
        src: "/images/icon/add.png",
        alt: "add",
      },
      title: "Get Quote",
      description:
        "Select your currencies and view our competitive rates.",
    },
    {
      stepNumber: "Step -03",
      image: {
        src: "/images/icon/send2.png",
        alt: "send2",
      },
      title: "Lock Rate",
      description:
        "Secure your preferred exchange rate for your transfer.",
    },
    {
      stepNumber: "Step -04",
      image: {
        src: "/images/icon/track.png",
        alt: "track",
      },
      title: "Transfer Funds",
      description:
        "Send your money securely with full tracking.",
    },
  ],
}) => {
  return (
    <>
      <div className="how-expa-works-area bg-secondary ptb-120">
        <div className="container mw-1680">
          <div className="mb-40">
            <h2 className="main-title style-two mw-825 text-white text-center">
              How it works
            </h2>
          </div>

          <div className="row g-4">
            {steps.map((step, index) => (
              <div key={index} className="col-lg-6 col-xl-3">
                <div className="how-expa-works-single-item">
                  <span className="step">{step.stepNumber}</span>
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    width={100}
                    height={100}
                  />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
