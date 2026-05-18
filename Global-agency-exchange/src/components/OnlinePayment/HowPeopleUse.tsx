import React from "react";

const HowPeopleUse = ({
  title = "How people use Expa",
  useCases = [
    {
      number: "01",
      title: "International Freelancers",
      description:
        "Receive payments from clients worldwide with low conversion fees and transparent pricing.",
    },
    {
      number: "02",
      title: "Small Businesses",
      description:
        "Pay international suppliers and contractors without the high fees of traditional banks.",
    },
    {
      number: "03",
      title: "E-commerce Stores",
      description:
        "Accept payments from global customers and withdraw funds to your local bank account.",
    },
    {
      number: "04",
      title: "Expatriates",
      description:
        "Send money back home to support family with secure, fast transfers at excellent exchange rates.",
    },
  ],
}) => {
  return (
    <>
      <div className="how-people-use-expa-area pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-xl-4">
              <h2 className="main-title style-two mw-1208 ms-0">{title}</h2>
            </div>
            <div className="col-xl-8">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="d-md-flex how-people-use-single-item"
                >
                  <div className="flex-shrink-0">
                    <div className="d-md-flex gap-77">
                      <span className="sl">{useCase.number}</span>
                      <h3>{useCase.title}</h3>
                    </div>
                  </div>
                  <div className="flex-grow-1">{useCase.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowPeopleUse;
