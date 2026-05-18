import React from "react";

const FunFacts = ({
  stats = [
    {
      number: 20,
      suffix: "+",
      title: "Years in Operation",
      subtitle: "Founded in 2004",
    },
    {
      number: 5,
      suffix: "M+",
      title: "Active Users",
      subtitle: "Global community",
    },
    {
      number: 180,
      suffix: "+",
      title: "Countries Served",
      subtitle: "Global coverage",
    },
    {
      number: 10,
      suffix: "B+",
      title: "Processed",
      subtitle: "In transactions",
    },
  ],
}) => {
  return (
    <>
      <div className="counter-area ptb-120">
        <div className="container">
          <div className="row justify-content-center g-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-md-3 col-6">
                <div className="counter-single-item-three">
                  <h2>
                    <span className="counters">{stat.number}</span>
                    {stat.suffix}
                  </h2>
                  <p>{stat.title}</p>
                  <span>{stat.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FunFacts;
