import React from "react";
import Image from "next/image";
import Link from "next/link";
import CurrencyConverter from "./CurrencyConverter";

const HeroBanner = () => {
  return (
    <>
      <div className="banner-area-two position-relative z-1 ptb-120">
        <div className="container mw-1680">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="banner-content-two">
                <h1>
                  <span>Global</span> Money Transfers{" "}
                  <span>Made Simple & Secure</span>
                </h1>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="banner-content-two mw-460">
                <div className="d-sm-flex align-items-center gap-15 mb-3 mb-md-4">
                  <div className="d-flex align-items-center user-img mb-2 mb-sm-0">
                    <Image
                      src="/images/user1.jpg"
                      className="rounded-circle img ms-0"
                      alt="user"
                      width={52}
                      height={52}
                    />
                    <Image
                      src="/images/user2.jpg"
                      className="rounded-circle img"
                      alt="user"
                      width={52}
                      height={52}
                    />
                    <Image
                      src="/images/user3.jpg"
                      className="rounded-circle img"
                      alt="user"
                      width={52}
                      height={52}
                    />
                    <Image
                      src="/images/plush.png"
                      className="rounded-circle img me-0"
                      alt="plush"
                      width={52}
                      height={52}
                    />
                  </div>

                  <div>
                    <div className="d-flex align-content-center mb-1">
                      <i className="ri-star-fill text-warning"></i>
                      <i className="ri-star-fill text-warning"></i>
                      <i className="ri-star-fill text-warning"></i>
                      <i className="ri-star-fill text-warning"></i>
                      <i className="ri-star-fill text-warning"></i>
                      <span className="text-secondary ms-2">10k+ reviews</span>
                    </div>
                    <span>Trusted by millions worldwide</span>
                  </div>
                </div>

                <p>
                  Transfer money worldwide in just minutes with ultra-low fees
                  and unbeatable exchange rates. Trusted by over 10 million
                  customers for secure international payments.
                </p>

                <Link href="/send-money" className="btn mt-4">
                  Send Money Now
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-110"></div>

          <div className="row g-4">
            <div className="col-lg-5">
              <CurrencyConverter />
            </div>

            <div className="col-lg-7">
              <div className="banner-img2 h-100 position-relative z-n1">
                <Image
                  src="/images/banner-img2.jpg"
                  className="h-100 object-fit-cover ukiyo"
                  alt="banner-img"
                  width={1022}
                  height={547}
                />

                <div className="d-sm-flex gap-10 banner-info">
                  <div className="info-single-item">
                    <span className="d-block">Call us</span>
                    <a href="tel:+44(0506)2587485" className="call">
                      +44 (0506) 258 7485
                    </a>
                  </div>
                  <div className="info-single-item">
                    <span className="d-block">Email</span>
                    <a href="mailto:information@expa.com" className="call">
                      information@expa.com
                    </a>
                  </div>
                </div>

                <Image
                  src="/images/banner-shape2.png"
                  className="banner-shape2 d-none d-lg-inline-block"
                  alt="banner-shape2"
                  width={250}
                  height={394}
                />
                <span className="banner-shape-blur d-none d-lg-inline-block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
