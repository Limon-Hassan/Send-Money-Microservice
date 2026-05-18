import React from "react";
import Image from "next/image";

const WhyWorkWithUs = () => {
  // Dynamic data for reasons to work with the company
  const reasons = [
    {
      id: 1,
      title: "Innovative Environment",
      description:
        "Work on cutting-edge solutions in currency exchange and payments.",
      points: [
        "Work on cutting-edge fintech solutions shaping global payments.",
        "Collaborate with talented teams using the latest technology.",
        "Contribute to products that impact millions of users worldwide.",
      ],
    },
    {
      id: 2,
      title: "Career Growth",
      description:
        "Opportunities for learning, mentorship, and professional advancement.",
      points: [
        "Access training programs and skill development opportunities.",
        "Benefit from mentorship and guidance from industry experts.",
        "Explore clear paths for promotions and professional advancement.",
      ],
    },
    {
      id: 3,
      title: "Inclusive Culture",
      description:
        "Collaborate with a diverse, supportive, and passionate team.",
      points: [
        "Collaborate in a diverse and supportive team environment.",
        "Share ideas freely and be encouraged to innovate.",
        "Celebrate different perspectives and foster mutual respect.",
      ],
    },
  ];

  return (
    <>
      <div className="sending-money-area pb-120">
        <div className="container">
          <h2 className="main-title style-two text-center mb-40 mw-1208 mx-auto">
            Why work with us
          </h2>

          <div className="row g-4 justify-content-center">
            {reasons.map((reason) => (
              <div key={reason.id} className="col-lg-4 col-md-6">
                <div className="sending-money-single-item style-two">
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>

                  <ul className="p-0 m-0 list-unstyled">
                    {reason.points.map((point, index) => (
                      <li
                        key={index}
                        className="d-flex align-items-center gap-8"
                      >
                        <i className="ri-checkbox-circle-fill text-secondary"></i>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="btn z-1">
                    <span className="text-primary fs-24">
                      {reason.id.toString().padStart(2, "0")}
                    </span>
                  </span>
                  <Image
                    src="/images/shape.png"
                    className="shape"
                    alt="Decorative shape"
                    width={91}
                    height={91}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyWorkWithUs;
