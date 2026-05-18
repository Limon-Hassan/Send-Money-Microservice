import React from "react";
import Image from "next/image";
import Link from "next/link";


const BestRates = () => {
  // Dynamic data for the list items
  const listItems = [
    {
      id: 1,
      number: "01",
      title: "Real-time market monitoring"
    },
    {
      id: 2,
      number: "02",
      title: "Instant rate notifications"
    },
    {
      id: 3,
      number: "03",
      title: "Maximize your savings"
    }
  ];

  // Static content data (can be made dynamic if needed)
  const contentData = {
    title: "Best rates, right when you need them",
    description: "Send money abroad, split bills with friends, and manage your finances with ease. Expa makes personal payments simple, secure, and affordable.",
    buttonText: "Create An Account",
    buttonLink: "/register"
  };

  return (
    <>
      <div className="solutions-for-everyone-area ptb-120">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <div className="solutions-img2">
                <Image
                  src="/images/solutions2.jpg"
                  className="ukiyo rounded-4"
                  alt="solutions"
                  width={1608}
                  height={1476}
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="solutions-content">
                <h2 className="main-title style-two mw-100">
                  {contentData.title}
                </h2>

                <div className="solutions-content-inner">
                  <p className="text-secondary">
                    {contentData.description}
                  </p>

                  <ul className="p-0 list-unstyled solutions-list">
                    {listItems.map((item) => (
                      <li key={item.id}>
                        <div className="d-flex align-items-center gap-15">
                          <div className="flex-shrink-0">
                            <div className="icon bg-f7f7f7">
                              <span className="fw-semibold text-secondary">
                                {item.number}
                              </span>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h4 className="mb-0">{item.title}</h4>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Link href={contentData.buttonLink} className="btn">
                    {contentData.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestRates;