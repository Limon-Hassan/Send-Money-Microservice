import React from "react"; 

const ChooseYourPlan = ({
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
      <div className="why-choose-three-area ptb-120 bg-f7f7f7">
        <div className="container">
          <h2 className="main-title style-two mw-825 text-center mx-auto mb-40">
            Why choose Expa for personal transfers?
          </h2>

          <div className="row g-4">
            {cards.map((card, index) => (
              <div key={index} className="col-lg-4">
                <div
                  className="why-choose-three-single-item bg-img rounded-4 border"
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
