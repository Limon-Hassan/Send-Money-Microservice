import React from "react";
import Image from "next/image";

const WhyChooseUs = () => {
  // Dynamic data for operation statistics
  const operationData = {
    years: "20+",
    title: "Years in Operation",
    founded: "Founded in 2004",
  };

  // Dynamic data for reasons to choose
  const reasonsData = [
    {
      id: 1,
      text: "Multi-currency support for global operations",
    },
    {
      id: 2,
      text: "Lower fees than banks for international transfers",
    },
    {
      id: 3,
      text: "Faster processing for time-sensitive payments",
    },
    {
      id: 4,
      text: "Secure, regulated platform with compliance assurance",
    },
    {
      id: 5,
      text: "24/7 dedicated business support team",
    },
  ];

  // Dynamic content data
  const contentData = {
    title: "Why choose Expa for business",
    description:
      "Empower your business with fast, secure, and cost-effective global payment solutions. Expa helps you save more, move money faster, and operate confidently across borders.",
  };

  return (
    <>
      <div className="why-choose-business-area">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="why-choose-business-img position-relative z-1">
                <Image
                  src="/images/why-choose-business-img.jpg"
                  className="rounded-4 ukiyo"
                  alt="why-choose-business-img"
                  width={1296}
                  height={1000}
                />

                <div className="operation">
                  <h2>{operationData.years}</h2>
                  <h3>{operationData.title}</h3>
                  <span>{operationData.founded}</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="why-choose-business-content">
                <h2 className="main-title style-two">{contentData.title}</h2>

                <div className="why-choose-business-content-inner">
                  <p>{contentData.description}</p>

                  <ul className="p-0 mb-0 mt-4 list-unstyled">
                    {reasonsData.map((reason) => (
                      <li
                        key={reason.id}
                        className="d-flex align-items-center gap-8"
                      >
                        <i className="ri-checkbox-circle-fill"></i>
                        <span>{reason.text}</span>
                      </li>
                    ))}
                  </ul>
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
