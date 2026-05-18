import React from "react";
import Image from "next/image";

const AdvancedSecurityMeasures = () => {
  // Define security certifications data
  const certifications = [
    {
      id: 1,
      icon: "ri-add-line",
      text: "ISO 27001 Certified",
    },
    {
      id: 2,
      icon: "ri-add-line",
      text: "PCI DSS Compliant",
    },
    {
      id: 3,
      icon: "ri-add-line",
      text: "GDPR Compliant",
    },
    {
      id: 4,
      icon: "ri-add-line",
      text: "SOC 2 Type II",
    },
  ];

  // Define security features data
  const securityFeatures = [
    {
      id: 1,
      icon: {
        src: "/images/icon/biometrics.png",
        alt: "biometrics", 
      },
      title: "Biometric Authentication",
      description:
        "Secure your account with fingerprint and facial recognition technology for enhanced protection.",
    },
    {
      id: 2,
      icon: {
        src: "/images/icon/real-time.png",
        alt: "real-time", 
      },
      title: "Real-Time Monitoring",
      description:
        "24/7 transaction monitoring systems detect and prevent fraudulent activity instantly.",
    },
    {
      id: 3,
      icon: {
        src: "/images/icon/secure-data.png",
        alt: "secure-data", 
      },
      title: "Data Protection",
      description:
        "Your personal and financial information is encrypted and stored securely in certified data centers.",
    },
  ];

  return (
    <>
      <div className="security-area">
        <div className="container mw-1680">
          <div className="security-wrap bg-any-bg position-relative z-1">
            <h2 className="main-title text-white ms-0 mb-40 fw-semibold">
              Advanced{" "}
              <Image
                src="/images/title-img2.jpg"
                className="title-img ms-lg-4 d-none d-lg-inline-block"
                alt="title-img1"
                width={136}
                height={68}
              />{" "}
              <span>Security</span> Measures
            </h2>

            <div className="row g-4">
              <div className="col-lg-6">
                <div className="security-info-wrap">
                  <h3>Our Security Certifications</h3>
                  <p>
                    Independent verification of our security practices and
                    operational standards.
                  </p>

                  <div className="d-flex flex-wrap align-items-center justify-content-center gap-20">
                    <Image
                      src="/images/regulated-img.png"
                      alt="regulated-img"
                      width={228}
                      height={116}
                    />

                    <ul className="p-0 m-0 list-unstyled secure-list">
                      {certifications.map((cert) => (
                        <li
                          key={cert.id}
                          className="d-flex align-items-center gap-7"
                        >
                          <i className={cert.icon}></i>
                          <span>{cert.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <ul className="p-0 m-0 list-unstyled security-list">
                  {securityFeatures.map((feature) => (
                    <li key={feature.id} className="d-flex">
                      <div className="flex-shrink-0">
                        <div className="icon d-flex justify-content-center align-items-center">
                          <Image
                            src={feature.icon.src}
                            alt={feature.icon.alt}
                            width={35}
                            height={35}
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Image
              src="/images/security-shape.png"
              className="security-shape"
              alt="security-shape"
              width={1620}
              height={437}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedSecurityMeasures;
