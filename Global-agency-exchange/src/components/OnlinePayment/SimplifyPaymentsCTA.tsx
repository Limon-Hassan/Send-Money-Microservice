import React from "react";
import Image from "next/image";
import Link from "next/link";

const SimplifyPaymentsCTA = () => {
  return (
    <>
      <div className="sending-money-worldwide-area style-two">
        <div className="container">
          <div
            className="position-relative z-1 bg-img"
            style={{
              backgroundImage: `url(/images/sending-money-bg.jpg)`,
            }}
          >
            <div className="mb-30 text-center sending-money-worldwide-content p-100 position-relative z-1">
              <h2 className="main-title style-two mx-auto fw-bold">
                Ready to Simplify Your Payments?
              </h2>

              <p className="text-secondary">
                Join millions who trust Expa with their money. Send, receive,
                and manage your finances with ease and security
              </p>

              <div className="d-flex flex-wrap justify-content-between align-items-center mt-85">
                <div className="d-flex align-items-center gap-10">
                  <i className="ri-checkbox-circle-fill text-secondary"></i>
                  <span className="text-secondary">Bank-Level Security</span>
                </div>

                <div className="d-flex align-items-center gap-10">
                  <i className="ri-checkbox-circle-fill text-secondary"></i>
                  <span className="text-secondary">Instant Transfers</span>
                </div>
                
                <div className="d-flex align-items-center gap-10">
                  <i className="ri-checkbox-circle-fill text-secondary"></i>
                  <span className="text-secondary">No Hidden Fees</span>
                </div>
              </div>

              <Link
                href="/register"
                className="contact-btn d-none d-lg-inline-block"
              >
                Create Free <br /> Account
              </Link>
            </div>

            <Image
              src="/images/worldwide.png"
              className="worldwide-img d-none d-xl-inline-block"
              alt="worldwide"
              width={413}
              height={474}
            />

            <div className="p-2 pt-0">
              <div className="footer-info-wrap rounded-0 style-two">
                <div className="row align-items-center g-4">
                  <div className="col-lg-3 col-sm-6">
                    <Link href="/" className="footer-logo">
                      <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={127}
                        height={50}
                      />
                    </Link>
                  </div>

                  <div className="col-lg-2 col-sm-6">
                    <div className="info">
                      <span className="d-block mb-1">Call us</span>
                      <a
                        href="tel:+44(0506)2587485"
                        className="text-decoration-none text-primary"
                      >
                        +44 (0506) 258 7485
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-2 col-sm-6">
                    <div className="info">
                      <span className="d-block mb-1">Email</span>
                      <a
                        href="mailto:information@expa.com"
                        className="text-decoration-none text-primary"
                      >
                        information@expa.com
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-5 col-sm-6">
                    <div className="info">
                      <span className="d-block mb-1">Address</span>
                      <p className="text-primary">
                        123 Financial Street, London, EC2A 4AB, United Kingdom
                      </p>
                    </div>
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

export default SimplifyPaymentsCTA;
