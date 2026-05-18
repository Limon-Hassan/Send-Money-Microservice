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

const BusinessSolutionsWeOffer = () => {
  // Define why choose items data with proper typing
  const whyChooseItems: WhyChooseItem[] = [
    {
      id: 1,
      title: "Currency Exchange",
      description: "Access competitive exchange rates with bulk savings",
      image: {
        src: "/images/why-choose1.png",
        alt: "why-choose",
        width: 312,
        height: 190,
      },
    },
    {
      id: 2,
      title: "International Paymentss",
      description:
        "Send and receive payments worldwide quickly, securely, and at competitive rates.",
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
      title: "Mass Payouts",
      description:
        "Easily distribute payments to multiple vendors, freelancers, or employees worldwide in just a few clicks.",
      bgClass: "bg-f7f7f7",
      titleClass: "text-secondary",
      image: {
        src: "/images/why-choose3.png",
        alt: "why-choose",
        width: 332,
        height: 280,
      },
    },
    {
      id: 4,
      title: "Online Payment Gateway",
      description: "Accept payments from international customers in the world.",
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
        "Protect your business from currency fluctuations with our smart FX risk management solutions.",
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
                <h2 className="main-title style-two ms-0">
                  Business solutions we offer
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

export default BusinessSolutionsWeOffer;
