import React from "react";
import Image from "next/image"; 

const CurrencyExchangeCTA = () => {
  return (
    <>
      <div className="apps-area bg-any-bg ptb-120 position-relative z-1">
        <div className="container mw-1680">
          <div className="apps-content text-center">
            <h3>Start Saving on Your</h3>
            <h2>Currency Exchange</h2>
            <p>
              Join thousands of satisfied customers who save time and money with
              Expa&apos;s secure, transparent, and cost-effective currency
              solutions.z
            </p>

            <div className="d-flex flex-wrap align-items-center gap-10 justify-content-center">
              <button className="btn">Create Free Account</button>
              <button className="btn">Download the app</button>
            </div>

            <div className="mw-1075 d-flex flex-wrap gap-10 justify-content-between">
              <div className="d-flex align-items-center gap-6">
                <i className="ri-checkbox-circle-fill"></i>
                <span>No obligation, no hidden fees</span>
              </div>
              <div className="d-flex align-items-center gap-6">
                <i className="ri-checkbox-circle-fill"></i>
                <span>Set up takes less than 5 minutes</span>
              </div>
              <div className="d-flex align-items-center gap-6">
                <i className="ri-checkbox-circle-fill"></i>
                <span>Get started with no minimum amount</span>
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/images/shape2.png"
          className="position-absolute end-0 bottom-0 d-none d-lg-inline-block"
          alt="shape2"
          width={640}
          height={538}
        />
      </div>
    </>
  );
};

export default CurrencyExchangeCTA;
