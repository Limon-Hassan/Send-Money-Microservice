import React from "react";

const SubscribeForm = () => {
  return (
    <>
      <form className="subscribe-form position-relative z-1">
        <input
          type="email"
          className="form-control rounded-pill"
          placeholder="Enter your email"
        />
        <button type="button" className="btn position-absolute top-0 end-0">
          Subscribe
        </button>
      </form>
    </>
  );
};

export default SubscribeForm;
