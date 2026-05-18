import React from "react";
import Image from "next/image";

const CommonUseCases = () => {
  // Dynamic data for common use cases
  const useCasesData = [
    {
      id: 1,
      title: "Family Support",
      description:
        "Send money to family members abroad with low fees and competitive exchange rates.",
      imageSrc: "/images/common1.jpg",
      imageAlt: "Family support",
    },
    {
      id: 2,
      title: "Education Fees",
      description:
        "Pay international tuition fees and education expenses securely.",
      imageSrc: "/images/common2.jpg",
      imageAlt: "Education fees",
    },
    {
      id: 3,
      title: "Property Purchase",
      description:
        "Transfer large sums for international property investments with confidence.",
      imageSrc: "/images/common3.jpg",
      imageAlt: "Property purchase",
    },
    {
      id: 4,
      title: "Travel Money",
      description: "Send money to yourself or others when traveling abroad.",
      imageSrc: "/images/common4.jpg",
      imageAlt: "Travel money",
    },
  ];

  return (
    <>
      <div className="common-use-cases-area ptb-120">
        <div className="container">
          <div className="mb-40">
            <h2 className="main-title style-two text-center">
              Common use cases
            </h2>
          </div>

          <div className="row g-4">
            {useCasesData.map((useCase) => (
              <div key={useCase.id} className="col-lg-6">
                <div className="d-sm-flex align-items-center common-use-single-item text-center text-lg-start">
                  <div className="flex-grow-1 mb-3 mb-sm-0">
                    <h3>{useCase.title}</h3>
                    <p>{useCase.description}</p>
                  </div>
                  <div className="flex-shrink-0 pb-4 pb-sm-0">
                    <Image
                      src={useCase.imageSrc}
                      alt={useCase.imageAlt}
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

export default CommonUseCases;
