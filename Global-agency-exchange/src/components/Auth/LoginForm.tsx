import React from "react";
import Link from "next/link";

const LoginForm = () => {
  return (
    <>
      <div className="my-account-area ptb-120">
        <div className="container">
          <div className="my-account-form">
            <div className="text-center mb-4">
              <h3>Login in</h3>
              <p>
                Don&apos;t have an account? <Link href="/register">Register</Link>
              </p>
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
                <label className="label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  defaultValue="************"
                />
              </div>
              <button type="submit" className="btn btn-secondary w-100">
                Log in
              </button>
            </form>

            <Link
              href="/forgot-password"
              className="text-decoration-none my-4 d-block text-center"
            >
              Forgot password?
            </Link>

            <p className="fw-medium text-secondary mb-4 login">
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
                href="https://www.facebook.com/"
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

export default LoginForm;
