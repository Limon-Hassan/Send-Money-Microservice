import React from "react";
import Image from "next/image";

const ChooseYourPlan = ({
  sectionTitle = "Choose Your Plan",
  sectionDescription = "We're redefining online payments with a focus on security, convenience, and transparency",
  topTitleImage = {
    src: "/images/top-title-shape.png",
    alt: "top-title-shape",
    width: 14,
    height: 17,
  },
  cards = [
    {
      backgroundImage: "/images/why-choose6.jpg",
      title: "Global Transactions",
      description:
        "Send and receive money across borders with minimal fees. Exchange currencies at real-time rates with no hidden charges.",
    },
    {
      backgroundImage: "/images/why-choose7.jpg",
      title: "Bank-Grade Security",
      description:
        "Your money and data are protected with encryption, multi-factor authentication, and continuous fraud monitoring.",
    },
    {
      backgroundImage: "/images/why-choose8.jpg",
      title: "All-in-One App",
      description:
        "Manage everything from sending money to paying bills in one simple, powerful app. Available on iOS and Android devices.",
    },
  ],
}) => {
  return (
    <>
      <div className="why-choose-three-area ptb-120">
        <div className="container">
          <div className="row gy-2 mb-40">
            <div className="col-lg-4">
              <span className="top-title style-two">
                <Image
                  src={topTitleImage.src}
                  alt={topTitleImage.alt}
                  width={topTitleImage.width}
                  height={topTitleImage.height}
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

          <div className="row g-4">
            {cards.map((card, index) => (
              <div key={index} className="col-lg-4">
                <div
                  className="why-choose-three-single-item bg-img"
                  style={{
                    backgroundImage: `url(${card.backgroundImage})`,
                  }}
                >
                  <div
                    className={`why-choose-contents ${
                      index === 1 ? "style-two" : ""
                    }`}
                  >
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseYourPlan;
