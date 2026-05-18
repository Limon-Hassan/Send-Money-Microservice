import React from "react";

const ForgotPasswordForm = () => {
  return (
    <>
      <div className="my-account-area ptb-120">
        <div className="container">
          <div className="my-account-form">
            <div className="text-center mb-4">
              <h3>Forgot Password</h3>
              <p>
                Please enter your email address. You will receive a link to
                create a new password via email.
              </p>
            </div>

            <form>
              <div className="currency-input position-relative z-1">
                <label className="label">Your Name</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue="hello@gmail.com"
                />
              </div>
              <button type="submit" className="btn btn-secondary w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
