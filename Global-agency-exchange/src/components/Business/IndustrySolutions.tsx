import React from "react";
import Image from "next/image";

const IndustrySolutions = () => {
  // Dynamic data for industry solutions
  const industrySolutions = [
    {
      id: 1,
      title: "IT services",
      description:
        "Streamline global payments and currency management for IT services and tech businesses.",
      imageSrc: "/images/common5.jpg",
      imageAlt: "IT services",
    },
    {
      id: 2,
      title: "Manufacturing",
      description:
        "Simplify international payments & currency exchange for manufacturers & suppliers worldwide.",
      imageSrc: "/images/common6.jpg",
      imageAlt: "Manufacturing",
    },
    {
      id: 3,
      title: "E-commerce & Retail",
      description:
        "Enable fast, secure, and multi-currency payments for e-commerce and retail businesses globally.",
      imageSrc: "/images/common7.jpg",
      imageAlt: "E-commerce & Retail",
    },
    {
      id: 4,
      title: "Travel & Hospitality",
      description:
        "Manage seamless international payments and payouts for travel and hospitality businesses.",
      imageSrc: "/images/common8.jpg",
      imageAlt: "Travel & Hospitality",
    },
  ];

  return (
    <>
      <div className="common-use-cases-area ptb-120">
        <div className="container">
          <div className="mb-40">
            <h2 className="main-title style-two text-center">
              Industry solutions
            </h2>
          </div>

          <div className="row g-4">
            {industrySolutions.map((solution) => (
              <div key={solution.id} className="col-lg-6">
                <div className="d-sm-flex align-items-center common-use-single-item text-center text-lg-start">
                  <div className="flex-grow-1 mb-3 mb-sm-0">
                    <h3>{solution.title}</h3>
                    <p>{solution.description}</p>
                  </div>
                  <div className="flex-shrink-0 pb-4 pb-sm-0">
                    <Image
                      src={solution.imageSrc}
                      alt={solution.imageAlt}
                      width={198}
                      height={174}
                    />
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

export default IndustrySolutions;
