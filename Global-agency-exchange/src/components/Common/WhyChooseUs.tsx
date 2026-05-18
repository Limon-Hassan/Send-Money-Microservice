import React from "react";
import Image from "next/image";

// Define TypeScript interfaces
interface Feature {
  id: number;
  text: string;
  iconClass?: string;
}

interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface WhyChooseItem {
  id: number;
  title: string;
  description: string;
  bgClass?: string;
  titleClass?: string;
  contentClass?: string;
  features?: Feature[];
  image?: ImageData;
  backgroundImage?: string;
  specialImageContainer?: boolean;
}

const WhyChooseUs = () => {
  // Define why choose items data with proper typing
  const whyChooseItems: WhyChooseItem[] = [
    {
      id: 1,
      title: "Speed & Reliability",
      description: "Most transfers arrive within minutes or the same day.",
      image: {
        src: "/images/why-choose1.png",
        alt: "why-choose",
        width: 312,
        height: 190,
      },
    },
    {
      id: 2,
      title: "Real Exchange Rates",
      description:
        "We use the real mid-market rate, plus a small, transparent margin.",
      bgClass: "bg-primary",
      titleClass: "text-secondary",
      image: {
        src: "/images/why-choose2.png",
        alt: "why-choose",
        width: 294,
        height: 156,
      },
    },
    {
      id: 3,
      title: "Low, Transparent Fees",
      description:
        "We believe in complete transparency with no hidden charges or unexpected costs.",
      features: [
        { id: 1, text: "No hidden fees" },
        { id: 2, text: "See exactly what you'll pay upfront" },
        { id: 3, text: "Lower costs than traditional banks" },
      ],
      image: {
        src: "/images/why-choose3.png",
        alt: "why-choose",
        width: 332,
        height: 280,
      },
    },
    {
      id: 4,
      title: "24/7 Customer Support",
      description: "Our expert team is here to help you, day or night.",
      bgClass: "bg-f7f7f7",
      titleClass: "text-secondary",
      image: {
        src: "/images/why-choose4.png",
        alt: "why-choose",
        width: 536,
        height: 220,
      },
    },
    {
      id: 5,
      title: "Bank-Level Security",
      description:
        "Your money and data are protected with industry-leading encryption.",
      bgClass: "bg-secondary bg-img",
      titleClass: "text-white",
      contentClass: "mw-260",
      backgroundImage: "/images/why-choose-shape.png",
      features: [
        { id: 1, text: "256-bit SSL encryption", iconClass: "text-primary" },
        { id: 2, text: "Two-factor authentication", iconClass: "text-primary" },
        { id: 3, text: "Regulated and licensed", iconClass: "text-primary" },
      ],
      image: {
        src: "/images/why-choose5.png",
        alt: "why-choose",
        width: 343,
        height: 300,
      },
      specialImageContainer: true,
    },
  ];

  // Function to render a single why choose item with proper typing
  const renderWhyChooseItem = (item: WhyChooseItem) => {
    const hasFeatures = item.features && item.features.length > 0;

    return (
      <div
        className={`why-choose-single-item${hasFeatures ? "3" : "2"} h-100 ${
          item.bgClass || ""
        }`}
        style={
          item.backgroundImage
            ? { backgroundImage: `url(${item.backgroundImage})` }
            : undefined
        }
      >
        <div
          className={`why-choose-content${hasFeatures ? "3" : "2"} ${
            item.contentClass || ""
          }`}
        >
          <h3 className={item.titleClass || ""}>{item.title}</h3>
          <p>{item.description}</p>

          {hasFeatures && (
            <ul className="p-0 m-0 list-unstyled">
              {item.features!.map((feature: Feature) => (
                <li
                  key={feature.id}
                  className="d-flex gap-8 align-items-center"
                >
                  <i
                    className={`ri-checkbox-circle-fill ${
                      feature.iconClass || "text-secondary"
                    }`}
                  ></i>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {item.image &&
          (item.specialImageContainer ? (
            <div className="why-choose5 d-none d-xl-inline-block">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
              />
            </div>
          ) : (
            <div className="text-center">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
              />
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      <div className="why-choose-area ptb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="mb-40">
                <span className="top-title mb-3">Why Choose Expa</span>
                <h2 className="main-title style-two ms-0">
                  Experience the benefits that make Expa a{" "}
                  <span>global favorite</span>
                </h2>
              </div>

              <div className="row g-4">
                <div className="col-md-5">
                  {renderWhyChooseItem(whyChooseItems[0])}
                </div>
                <div className="col-md-7">
                  {renderWhyChooseItem(whyChooseItems[1])}
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              {renderWhyChooseItem(whyChooseItems[2])}
            </div>

            <div className="col-md-5">
              {renderWhyChooseItem(whyChooseItems[3])}
            </div>

            <div className="col-md-7">
              {renderWhyChooseItem(whyChooseItems[4])}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
