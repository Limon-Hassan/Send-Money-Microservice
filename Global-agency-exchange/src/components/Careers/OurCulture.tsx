import React from "react";
import Image from "next/image";

interface CultureData {
  title: string;
  paragraphs: string[];
  culturePoints: string[];
}

const OurCulture = () => {
  // Dynamic culture data
  const cultureData: CultureData = {
    title: "Our Culture",
    paragraphs: [
      "At Expa, we're building more than just a money transfer service—we're creating a diverse, inclusive, and innovative environment where talented people can do their best work.",
      "We believe that great ideas can come from anywhere, and we encourage collaboration across teams and departments to solve complex challenges in the financial industry.",
    ],
    culturePoints: [
      "Focus on innovation and continuous learning",
      "Diverse and inclusive workplace",
      "Flat hierarchy with open communication",
      "Impact-driven work that helps millions",
      "Global team with local expertise",
    ],
  };

  return (
    <>
      <div className="build-your-career-area pb-120">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="build-your-career-img">
                <Image
                  src="/images/build-your-career-img2.jpg"
                  className="rounded-4 ukiyo"
                  alt="Team collaboration in modern office environment"
                  width={1296}
                  height={900}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="build-your-career-content">
                <h2 className="main-title style-two">{cultureData.title}</h2>

                {/* Render paragraphs dynamically */}
                {cultureData.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                <div className="build-your-career-inner">
                  <ul className="p-0 mb-0 list-unstyled build-your-career-list">
                    {/* Render list items dynamically */}
                    {cultureData.culturePoints.map((point, index) => (
                      <li
                        key={index}
                        className="d-flex align-items-center gap-8"
                      >
                        <i className="ri-checkbox-circle-fill text-secondary"></i>
                        <span>{point}</span>
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

export default OurCulture;
