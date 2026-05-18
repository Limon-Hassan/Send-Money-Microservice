import React from "react";
import Link from "next/link";

const RegisterBusinessForm = () => {
  return (
    <>
      <div className="my-account-area ptb-120">
        <div className="container">
          <div className="my-account-form">
            <div className="text-center mb-4">
              <h3>Create a personal account</h3>
              <p>
                Already have an account? <a href="login.html">Login</a>
              </p>
            </div>

            <div className="d-sm-flex align-items-center justify-content-between gap-10 mb-4">
              <Link
                href="/register"
                className="btn btn-secondary w-100 mb-2 mb-sm-0"
              >
                Personal
              </Link>
              <Link href="/register-business" className="btn w-100">
                Business
              </Link>
            </div>

            <form>
              <div className="currency-input position-relative z-1">
                <label className="label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Ricky Hudson"
                />
              </div>
              <div className="currency-input position-relative z-1">
                <label className="label">Your Email</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue="info@expa.com"
                />
              </div>
              <div className="currency-input position-relative z-1">
                <label className="label">Your Phone No</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue="+1234567890"
                />
              </div>
              <div className="currency-input position-relative z-1">
                <label className="label">Your Company Name</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue="Envy Theme"
                />
              </div>
              <div className="currency-input position-relative z-1">
                <label className="label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  defaultValue="************"
                />
              </div>
              <button type="submit" className="btn btn-secondary w-100">
                Register
              </button>
            </form>

            <p className="fw-medium text-secondary my-4 login">
              <span>Or login with</span>
            </p>

            <div className="d-sm-flex align-items-center justify-content-between gap-10">
              <a
                href="https://www.google.com/"
                target="_blank"
                className="btn w-100 mb-2 mb-sm-0"
              >
                Log in With Google
              </a>
              <a
                href="https://www.facebook.com/login.php/"
                target="_blank"
                className="btn w-100"
              >
                Log in With Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterBusinessForm;
