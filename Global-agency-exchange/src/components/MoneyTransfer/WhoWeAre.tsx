import React from "react";
import Image from "next/image";
import Link from "next/link";

const WhoWeAre = () => {
  return (
    <>
      <div className="who-we-are-area bg-secondary ptb-120 position-relative z-1">
        <div className="container">
          <div className="row gy-2 mb-40">
            <div className="col-lg-4">
              <span className="top-title text-primary">Who We Are</span>
            </div>
            <div className="col-lg-8">
              <h2 className="main-title style-two mw-825 text-white">
                Making global <span className="text-white">money exchange</span>{" "}
                simple, secure, and affordable for everyone
              </h2>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="d-flex flex-wrap flex-lg-nowrap mb-4 mb-lg-5">
                <Image
                  src="/images/who-we1.png"
                  className="d-none d-xl-inline-block"
                  alt="who-we"
                  width={153}
                  height={307}
                />
                <Image
                  src="/images/who-we2.png"
                  className="who-we2"
                  alt="who-we"
                  width={307}
                  height={307}
                />
                <Image
                  src="/images/who-we3.png"
                  className="d-none d-xl-inline-block who-we3 position-relative z-1"
                  alt="who-we"
                  width={307}
                  height={307}
                />
              </div>

              <div className="row g-4" style={{ color: "#aaaaaa" }}>
                <div className="col-lg-6">
                  <p>
                    <span className="text-white">Mission:</span> To make global
                    money transfers simple and inclusive by cutting unnecessary
                    fees, offering fair rates, and ensuring a smooth customer
                    experience.
                  </p>
                </div>
                <div className="col-lg-6">
                  <p>
                    <span className="text-white">Vision:</span> To build a world where sending money
                    abroad is as easy and affordable as sending a message,
                    fostering global connections and financial opportunities.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="who-we-are-content">
                <p>
                  Expa is a trusted fintech and licensed money transfer provider
                  dedicated to making cross-border payments simple, fast, and
                  affordable. With a strong presence in the digital finance
                  industry, we help millions of individuals and businesses
                  securely move money worldwide.
                </p>

                <Link href="/about-us" className="btn">
                  More About Us
                </Link>

                <h3>The principles that guide everything we do</h3>

                <div className="row gy-2">
                  <div className="col-6">
                    <ul className="p-0 m-0 list-unstyled">
                      <li className="d-flex align-items-center gap-8">
                        <i className="ri-add-line text-primary"></i>
                        <span>Transparency</span>
                      </li>
                      <li className="d-flex align-items-center gap-8">
                        <i className="ri-add-line text-primary"></i>
                        <span>Customer First</span>
                      </li>
                      <li className="d-flex align-items-center gap-8">
                        <i className="ri-add-line text-primary"></i>
                        <span>Innovation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul className="p-0 m-0 list-unstyled">
                      <li className="d-flex align-items-center gap-8">
                        <i className="ri-add-line text-primary"></i>
                        <span>Security</span>
                      </li>
                      <li className="d-flex align-items-center gap-8">
                        <i className="ri-add-line text-primary"></i>
                        <span>Global Mindset</span>
                      </li>
                      <li className="d-flex align-items-center gap-8">
                        <i className="ri-add-line text-primary"></i>
                        <span>Social Impact</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/images/who-we-are-shape.png"
          className="who-we-are-shape d-none d-xxl-inline-block"
          alt="who-we-are-shape"
          width={300}
          height={300}
        />
      </div>
    </>
  );
};

export default WhoWeAre;
