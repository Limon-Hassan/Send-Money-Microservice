import React from "react";
import Image from "next/image";

const CorePrinciples = () => {
  // Dynamic data for core principles
  const corePrinciples = [
    {
      id: 1,
      count: "01",
      title: "Customer First",
      description:
        "We prioritize our customers' needs in every decision we make, always striving to deliver exceptional value.",
      icon: "/images/icon/icon1.png",
      shape: "/images/shape.png",
    },
    {
      id: 2,
      count: "02",
      title: "Innovation",
      description:
        "We embrace new ideas and technologies to solve complex problems in the financial industry.",
      icon: "/images/icon/icon2.png",
      shape: "/images/shape.png",
    },
    {
      id: 3,
      count: "03",
      title: "Integrity",
      description:
        "We operate with honesty and transparency, building trust with customers and colleagues alike.",
      icon: "/images/icon/icon3.png",
      shape: "/images/shape.png",
    },
    {
      id: 4,
      count: "04",
      title: "Global Mindset",
      description:
        "We celebrate diversity and design our products for the interconnected world we live in.",
      icon: "/images/icon/icon4.png",
      shape: "/images/shape.png",
    },
  ];

  return (
    <>
      <div className="works-area ptb-120 overflow-hidden">
        <div className="container mw-1680">
          <h2 className="main-title style-two text-center mb-40 mx-auto">
            These principles guide everything we do at Expa
          </h2>

          <div className="row g-4">
            {corePrinciples.map((principle) => (
              <div key={principle.id} className="col-lg-3 col-md-6">
                <div className="works-single-item">
                  <span className="count">{principle.count}</span>
                  <Image
                    src={principle.shape}
                    className="position-absolute top-0 start-0 card-shape"
                    alt="shape"
                    width={91}
                    height={91}
                  />
                  <div className="icon">
                    <Image
                      src={principle.icon}
                      className="img"
                      alt="icon"
                      width={75}
                      height={75}
                    />
                  </div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CorePrinciples;
