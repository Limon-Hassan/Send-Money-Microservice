import React from "react";
import Image from "next/image";
import Link from "next/link";

const ServiceDetailsContent = () => {
  return (
    <>
      <div className="personal-international-area pt-120 position-relative z-1 overflow-hidden">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="personal-international-content">
                <h2 className="main-title style-two">
                  Personal international transfers
                </h2>
                <p>
                  Send money abroad securely with competitive exchange rates and
                  low transparent fees. Ideal for supporting family, paying for
                  education, or purchasing property overseas.
                </p>

                <div className="d-flex justify-content-between align-items-center gap-15 mt-4">
                  <div className="international-item">
                    <h2>0.5%</h2>
                    <span className="text-secondary">Average Fee</span>
                  </div>
                  <div className="international-item">
                    <h2>1-2 Days</h2>
                    <span className="text-secondary">Transfer Speed</span>
                  </div>
                  <div className="international-item">
                    <h2>190+</h2>
                    <span className="text-secondary">Countries</span>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-wrap mt-40">
                  <Link href="/pricing" className="btn">
                    Get Started
                  </Link>
                  <button type="button" className="btn btn-secondary">
                    Download App
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="personal-international h-100">
                <Image
                  src="/images/personal-international.jpg"
                  className="ukiyo h-100 object-fit-cover"
                  alt="personal-international"
                  width={1370}
                  height={814}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetailsContent;
