"use client";

import React, { useState } from "react";
import Image from "next/image";

const PricingPlan = ({
  sectionTitle = "Simple, Transparent Pricing",
  sectionDescription = "No hidden fees, no surprise charges. Choose the plan that works best for you.",
  topTitleImage = {
    src: "/images/top-title-shape.png",
    alt: "top-title-shape",
  },
  activePlanBackgroundImage = "/images/pricing-bg.jpg",
  monthlyPlans = [
    {
      name: "Lite",
      description:
        "Great for casual users making small transfers now and then.",
      price: "Free",
      suffix: "/forever",
      note: "No hidden charges or setup fees",
      features: [
        "Transfer up to $1,000 per month",
        "1% service fee per transaction",
        "Standard exchange rates",
        "Basic customer support",
        "Multi-currency wallet access",
      ],
      isActive: false,
    },
    {
      name: "Pro",
      description: "Best for regular travelers and remote professionals.",
      price: "12.99",
      suffix: "/month",
      note: "Cancel anytime — no long-term contract",
      features: [
        "Send up to $15,000 per month",
        "0.5% low transfer fee",
        "Faster exchange rate updates",
        "Priority customer support",
        "Multi-currency and crypto wallet",
      ],
      isActive: true,
    },
    {
      name: "Elite",
      description: "Designed for high-volume transfers and global businesses.",
      price: "39.99",
      suffix: "/month",
      note: "Includes premium business tools",
      features: [
        "Unlimited global transfers",
        "0.3% transfer fee",
        "Live market exchange rates",
        "Dedicated account manager",
        "Advanced security & API integration",
      ],
      isActive: false,
    },
  ],
  yearlyPlans = [
    {
      name: "Lite",
      description:
        "Perfect for individuals who send money occasionally throughout the year.",
      price: "0.00",
      suffix: "/year",
      note: "No annual fees — forever free",
      features: [
        "Transfer up to $12,000 per year",
        "0.9% transfer fee",
        "Standard exchange rates",
        "Basic support included",
        "Multi-currency wallet access",
      ],
      isActive: false,
    },
    {
      name: "Pro",
      description:
        "Ideal for frequent senders and digital nomads who value flexibility.",
      price: "129.99",
      suffix: "/year",
      note: "Save 15% with yearly billing",
      features: [
        "Send up to $180,000 per year",
        "0.4% reduced transfer fee",
        "Faster transaction processing",
        "24/7 priority support",
        "Multi-currency and crypto wallet",
      ],
      isActive: true,
    },
    {
      name: "Elite",
      description:
        "For professionals and enterprises managing international payments at scale.",
      price: "399.99",
      suffix: "/year",
      note: "Save 25% with annual plan",
      features: [
        "Unlimited transfers worldwide",
        "0.25% fee per transaction",
        "Real-time FX rates",
        "Dedicated relationship manager",
        "Advanced reporting & API access",
        "Priority enterprise onboarding",
      ],
      isActive: false,
    },
  ],
}) => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  return (
    <>
      <div className="pricing-area ptb-120" id="price-function" style={{ display:"none" }}>
        <div className="container">
          <div className="row gy-2 mb-30">
            <div className="col-lg-4">
              <span
                className="top-title style-two"
                style={{ borderColor: "#DFDFDF" }}
              >
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
              <h2 className="main-title style-two mw-825">
                {sectionDescription}
              </h2>
            </div>
          </div>

          <div className="d-flex pricing-switch gap-15">
            <span>Monthly</span>
            <div className="form-check form-switch px-0">
              <input
                className="form-check-input mt-0"
                type="checkbox"
                role="switch"
                id="switchCheckDefault"
                checked={billingPeriod === "yearly"}
                onChange={() =>
                  setBillingPeriod(
                    billingPeriod === "monthly" ? "yearly" : "monthly"
                  )
                }
              />
            </div>
            <span>Annual (Save 20%)</span>
          </div>

          <div className="row g-4 justify-content-center mt-2 mt-lg-5">
            {(billingPeriod === "monthly" ? monthlyPlans : yearlyPlans).map(
              (plan, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div
                    className={`pricing-single-item ${
                      plan.isActive ? "active bg-img" : ""
                    }`}
                    style={{
                      backgroundImage: plan.isActive
                        ? `url(${activePlanBackgroundImage})`
                        : "none",
                    }}
                  >
                    <h4>{plan.name}</h4>
                    <p>{plan.description}</p>
                    <h2 className="price">
                      {plan.price}
                      <sub>{plan.suffix}</sub>
                    </h2>
                    <span>{plan.note}</span>

                    <ul className="px-0 list-unstyled pricing-list">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="d-flex align-items-center gap-10"
                        >
                          <i className="ri-checkbox-circle-fill"></i> {feature}
                        </li>
                      ))}
                    </ul>

                    <button className="btn btn-secondary rounded-0 w-100">
                      Get Started
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPlan;
