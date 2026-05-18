import React from "react";
import Image from "next/image";

interface PlanFeature {
  id: number;
  text: string;
}

interface Plan {
  id: number;
  name: string;
  description: string;
  price: string;
  priceSubtext: string;
  features: PlanFeature[];
  image: {
    src: string;
    alt: string;
  };
  buttonText: string;
  reversed?: boolean; // For the Premium plan which has a different layout
}

const ChooseYourPlan = () => {
  // Define plans data
  const plans: Plan[] = [
    {
      id: 1,
      name: "Standard",
      description: "For occasional transfers with standard speed",
      price: "0.99%",
      priceSubtext: "/per transfer",
      features: [
        { id: 1, text: "1-2 business days transfer time" },
        { id: 2, text: "Exchange rate margin: 0.7%" },
        { id: 3, text: "No monthly fees" },
        { id: 4, text: "Transfer tracking" },
        { id: 5, text: "Email support" },
      ],
      image: {
        src: "/images/choose-your-plan1.jpg",
        alt: "choose-your-plan",
      },
      buttonText: "Get Started",
    },
    {
      id: 2,
      name: "Premium",
      description: "For frequent transfers with priority speed",
      price: "0.69%",
      priceSubtext: "/per transfer",
      features: [
        { id: 1, text: "Same-day transfers" },
        { id: 2, text: "Exchange rate margin: 0.5%" },
        { id: 3, text: "No monthly fees" },
        { id: 4, text: "Priority transfer tracking" },
        { id: 5, text: "Dedicated phone support" },
      ],
      image: {
        src: "/images/choose-your-plan2.jpg",
        alt: "choose-your-plan",
      },
      buttonText: "Get Started",
      reversed: true,
    },
    {
      id: 3,
      name: "Business",
      description: "For businesses with high volume transfers",
      price: "Custom",
      priceSubtext: "/volume-based pricing",
      features: [
        { id: 1, text: "Instant transfers available" },
        { id: 2, text: "Preferred exchange rates" },
        { id: 3, text: "Batch processing" },
        { id: 4, text: "API access" },
        { id: 5, text: "Dedicated account manager" },
      ],
      image: {
        src: "/images/choose-your-plan3.jpg",
        alt: "choose-your-plan",
      },
      buttonText: "Contact Sales",
    },
  ];

  // Function to render a single plan
  const renderPlan = (plan: Plan) => {
    return (
      <div key={plan.id} className="choose-your-plan-single-item">
        <div
          className={`row align-items-center g-4 ${
            plan.reversed ? "flex-row-reverse" : ""
          }`}
        >
          <div className="col-lg-4">
            <div
              className={`choose-your-plan-img ${
                plan.reversed ? "text-lg-end" : ""
              }`}
            >
              <Image
                src={plan.image.src}
                alt={plan.image.alt}
                width={312}
                height={206}
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="choose-your-plan-content">
              <div className="row align-items-center g-4">
                <div className="col-lg-4 col-md-4">
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                  <h2 className="mb-0">
                    {plan.price}
                    <sub>{plan.priceSubtext}</sub>
                  </h2>
                </div>
                <div className="col-lg-5 col-md-4">
                  <ul className="p-0 m-0 list-unstyled">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.id}
                        className="d-flex align-items-center gap-10"
                      >
                        <i className="ri-checkbox-circle-fill text-primary"></i>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="d-flex justify-content-md-end">
                    <button className="btn bg-secondary text-white">
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="choose-your-plan-area bg-secondary ptb-120">
        <div className="container">
          <div className="row gy-2 mb-40">
            <div className="col-lg-4">
              <span className="top-title text-primary">Choose Your Plan</span>
            </div>
            <div className="col-lg-8">
              <h2 className="main-title style-two mw-825 text-white">
                Select the option that works best for{" "}
                <span className="text-white">your transfer</span> needs
              </h2>
            </div>
          </div>

          {plans.map((plan) => renderPlan(plan))}
        </div>
      </div>
    </>
  );
};

export default ChooseYourPlan;
