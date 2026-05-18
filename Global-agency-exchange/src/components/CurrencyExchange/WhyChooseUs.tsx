import React from "react";
import Image from "next/image";

const WhyChooseUs = () => {
  // Define feature data without bgClass
  const features = [
    {
      id: 1,
      imageSrc: "/images/choose1.png",
      imageAlt: "Better Exchange Rates",
      imageWidth: 172,
      imageHeight: 150,
      title: "Better Exchange Rates",
      description:
        "Save up to 80% compared to banks with our competitive exchange rates — clear, fair, and transparent every time.",
    },
    {
      id: 2,
      imageSrc: "/images/choose2.png",
      imageAlt: "Secure & Regulated",
      imageWidth: 120,
      imageHeight: 150,
      title: "Secure & Regulated",
      description:
        "Your funds are protected with industry-leading security measures and we're fully regulated by financial authorities.",
    },
    {
      id: 3,
      imageSrc: "/images/choose3.png",
      imageAlt: "Fast Transfers",
      imageWidth: 223,
      imageHeight: 150,
      title: "Fast Transfers",
      description:
        "Most transfers are completed within 1-2 business days, with priority options available for urgent transactions.",
    },
  ];

  // Function to get background class based on feature id
  const getBgClass = (id: number) => {
    switch (id) {
      case 2:
        return "bg-primary";
      case 3:
        return "bg-f7f7f7";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="why-choose-area pb-120">
        <div className="container mw-1680">
          <div className="row align-items-xxl-center g-4">
            <div className="col-xl-5">
              <div className="why-choose-img h-100">
                <Image
                  src="/images/why-choose.jpg"
                  className="ukiyo h-100"
                  alt="why-choose"
                  width={1372}
                  height={1562}
                />
              </div>
            </div>
            <div className="col-xl-7">
              <div className="why-choose-content mb-40">
                <h2 className="main-title mb-3 mb-sm-0 mw-648 ms-0 fw-semibold">
                  Why Choose SendMoney?
                </h2>
                <p className="description ms-auto">
                  Discover why thousands of individuals and businesses trust
                  SendMoney for their currency exchange needs.
                </p>
              </div>

              <div className="why-choose-wrap">
                <div className="row g-4 justify-content-center">
                  {features.map((feature) => (
                    <div key={feature.id} className="col-lg-4 col-md-6">
                      <div
                        className={`why-choose-single-item ${getBgClass(
                          feature.id
                        )}`}
                      >
                        <Image
                          src={feature.imageSrc}
                          alt={feature.imageAlt}
                          width={feature.imageWidth}
                          height={feature.imageHeight}
                        />
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
