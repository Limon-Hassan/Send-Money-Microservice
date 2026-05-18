import React from "react";

const NewsletterForm = () => {
  return (
    <>
      <div className="footer-single-widget-two mw-311">
        <h3>Newsletter</h3>
        <span>
          Subscribe to our newsletter for market updates and exclusive offers.
        </span>

        <form className="subscribe-form position-relative z-1 style-two">
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Enter your email"
          />
          <button
            type="button"
            className="btn position-absolute position-absolute top-50 end-0 translate-middle-y"
          >
            <i className="ri-send-plane-2-fill"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default NewsletterForm;
