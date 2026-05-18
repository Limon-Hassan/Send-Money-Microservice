import React from "react";
import Image from "next/image";
import Link from "next/link";

const SolutionsForEveryone = ({
  sectionTitle = "Solutions for Everyone",
  sectionDescription = "Whether you're an individual or a business, Expa offers tailored solutions to meet your payment needs",
  topTitleImage = {
    src: "/images/top-title-shape.png",
    alt: "top-title-shape",
  },
  buttons = [
    {
      text: "For Individuals",
      href: "/register",
      className: "btn btn-secondary rounded-0"
    },
    {
      text: "For Businesses",
      href: "/register-business",
      className: "btn btn-secondary rounded-0 bg-transparent text-secondary"
    }
  ],
  mainImage = {
    src: "/images/solutions.jpg",
    alt: "solutions",
    className: "ukiyo"
  },
  lineImage = {
    src: "/images/line.png",
    alt: "line",
    className: "line"
  },
  features = [
    {
      icon: {
        src: "/images/icon/money.png",
        alt: "money",
      },
      title: "Send money to 180+ countries"
    },
    {
      icon: {
        src: "/images/icon/split-bill.png",
        alt: "split-bill",
      },
      title: "Split bills and request money"
    },
    {
      icon: {
        src: "/images/icon/data-management.png",
        alt: "data-management",
      },
      title: "Track your spending habits"
    },
    {
      icon: {
        src: "/images/icon/notification.png",
        alt: "notification",
      },
      title: "Instant notifications"
    }
  ],
  contentTitle = "Personal Payment Solutions",
  contentDescription = "Send money abroad, split bills with friends, and manage your finances with ease. Expa makes personal payments simple, secure, and affordable.",
  ctaButton = {
    text: "Get Started for Free",
    href: "/pricing",
    className: "btn btn-secondary rounded-0"
  }
}) => {
  return (
    <>
      <div className="solutions-for-everyone-area ptb-120">
        <div className="container">
          <div className="container mb-lg-3">
            <span className="top-title style-two mb-lg-3 mb-2">
              <Image
                src={topTitleImage.src}
                alt={topTitleImage.alt}
                width={14}
                height={17}
              />
              {sectionTitle}
            </span>
            <h2 className="main-title style-two mw-1208 ms-0">
              {sectionDescription}
            </h2>
          </div>

          <div className="row align-items-center mb-40 g-4">
            <div className="col-lg-8">
              <Image
                src={lineImage.src}
                className={lineImage.className}
                alt={lineImage.alt}
                width={896}
                height={1}
              />
            </div>
            <div className="col-lg-4">
              <div className="d-flex justify-content-center justify-content-lg-end gap-10">
                {buttons.map((button, index) => (
                  <Link 
                    key={index} 
                    href={button.href} 
                    className={button.className}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <div className="solutions-img">
                <Image
                  src={mainImage.src}
                  className={mainImage.className}
                  alt={mainImage.alt}
                  width={686}
                  height={600}
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="solutions-content">
                <h3>{contentTitle}</h3>
                <div className="solutions-content-inner">
                  <p className="text-secondary">
                    {contentDescription}
                  </p>

                  <ul className="p-0 list-unstyled solutions-list">
                    {features.map((feature, index) => (
                      <li key={index}>
                        <div className="d-flex align-items-center gap-15">
                          <div className="flex-shrink-0">
                            <div className="icon">
                              <Image
                                src={feature.icon.src}
                                alt={feature.icon.alt}
                                width={24}
                                height={24}
                              />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h4 className="mb-0">{feature.title}</h4>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={ctaButton.href} 
                    className={ctaButton.className}
                  >
                    {ctaButton.text}
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

export default SolutionsForEveryone;