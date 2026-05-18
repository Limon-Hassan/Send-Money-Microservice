import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutContent = () => {
  return (
    <>
      <div className="exchange-area pt-120">
        <div className="container mw-1680">
          <div className="d-flex flex-wrap gap-10 align-items-end justify-content-between mb-40">
            <h2 className="main-title style-two ms-0 mb-0 mw-920 fw-semibold ms-155">
              About Expa{" "}
              <Image
                src="/images/title-img1.jpg"
                className="title-img ms-lg-4 d-none d-lg-inline-block"
                alt="title-img"
                width={136}
                height={68}
              />{" "}
              Currency Exchange
            </h2>
            <p className="description">
              Trusted by individuals and businesses worldwide for secure,
              transparent, and cost-effective currency exchange solutions.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4">
              <div className="exchange-experience">
                <div className="top-content">
                  <h3>20+</h3>
                  <span>Years of experience</span>
                </div>
                <div className="bottom-content">
                  <div className="d-flex align-items-center user-img">
                    <Image
                      src="/images/user1.jpg"
                      className="rounded-circle img ms-0"
                      alt="user"
                      width={50}
                      height={50}
                    />
                    <Image
                      src="/images/user2.jpg"
                      className="rounded-circle img"
                      alt="user"
                      width={50}
                      height={50}
                    />
                    <Image
                      src="/images/user3.jpg"
                      className="rounded-circle img"
                      alt="user"
                      width={50}
                      height={50}
                    />
                    <div className="d-inline-block text-decoration-none w-100 img me-0">
                      <Image
                        src="/images/plush.png"
                        className="rounded-circle"
                        alt="plush"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>

                  <p>
                    Behind Expa is a team of dedicated professionals passionate
                    about building trust and providing outstanding service.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="exchange-content">
                <p>
                  At Expa, we believe exchanging money should be simple, secure,
                  and transparent. Our mission is to make currency exchange and
                  money transfers accessible to everyone—whether you’re
                  traveling abroad, supporting loved ones, or running an
                  international business.
                </p>

                <div className="row g-4">
                  <div className="col-lg-4">
                    <Link href="/register/" className="btn">
                      Create A Free Account
                    </Link>

                    <div className="info-wrap">
                      <div className="d-flex info">
                        <div className="flex-shrink-0">
                          <i className="ri-phone-fill"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="border-bottom d-inline-block">
                            <span>Call Us</span>
                            <a
                              href="tel:+44(0506)2587485"
                              className="text-decoration-none d-block"
                            >
                              +44 (0506) 258 7485
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex info">
                        <div className="flex-shrink-0">
                          <i className="ri-mail-open-line"></i>
                        </div>
                        <div className="flex-grow-1">
                          <span>Email</span>
                          <a
                            href="mailto:information@expa.com"
                            className="text-decoration-none d-block"
                          >
                            information@expa.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8 text-center text-lg-end">
                    <Image
                      src="/images/exchange-shape1.png"
                      className="d-none d-xxl-inline-block"
                      alt="exchange-shape"
                      width={306}
                      height={307}
                    />
                    <Image
                      src="/images/exchange-img.jpg"
                      className="rounded-circle"
                      alt="exchange-img"
                      width={307}
                      height={307}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContent;
