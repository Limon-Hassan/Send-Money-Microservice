import React from "react";
import Image from "next/image";

const HowItWorks = ({
  sectionTitle = "How Expa Works",
  sectionDescription = "Send, receive, and manage your money in just a few simple steps",
  topTitleImage = {
    src: "/images/top-title-shape2.png",
    alt: "top-title-shape",
  },
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
      title: "Add Funds",
      description:
        "Link your bank account or card securely. Your financial information is encrypted protected.",
    },
    {
      stepNumber: "Step -03",
      image: {
        src: "/images/icon/send2.png",
        alt: "send2",
      },
      title: "Send & Pay",
      description:
        "Choose a recipient, enter the amount, and send your payment. It's that simple.",
    },
    {
      stepNumber: "Step -04",
      image: {
        src: "/images/icon/track.png",
        alt: "track",
      },
      title: "Track & Manage",
      description:
        "View your transaction history and manage your finances from your dashboard.",
    },
  ],
}) => {
  return (
    <>
      <div className="how-expa-works-area bg-secondary pt-120">
        <div className="container mw-1680">
          <div className="row gy-2 mb-40">
            <div className="col-lg-4">
              <span className="top-title style-two text-white">
                <Image
                  src={topTitleImage.src}
                  alt={topTitleImage.alt}
                  width={14}
                  height={17}
                />
                {sectionTitle}
              </span>
            </div>
            <div className="col-lg-8">
              <h2 className="main-title style-two mw-825 text-white">
                {sectionDescription}
              </h2>
            </div>
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
