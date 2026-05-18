import React from "react";
import Image from "next/image"; 

const MobileApp = () => {
  return (
    <>
      <div
        className="apps-area-three bg-img ptb-120"
        style={{
          backgroundImage: "url(/images/apps-img-bg2.png)",
        }}
      >
        <div className="container">
          <div className="apps-content-three">
            <h2 className="main-title style-two ms-0">
              Banking in Your Pocket
            </h2>
            <p>
              With the Expa app, your financial world fits in your pocket. Send
              money internationally, pay bills, track spending, and more—all
              from your phone.
            </p>

            <div className="apps-content-inner">
              <div className="apps-info">
                <h3>Instant Transfers</h3>
                <p>Send money to friends and family in seconds, not days</p>
              </div>
              <div className="apps-info">
                <h3>Bank-Grade Security</h3>
                <p>Your money and data are protected with advanced security</p>
              </div>
              <div className="apps-info">
                <h3>Smart Budgeting</h3>
                <p>Track spending and set budgets with visual reports</p>
              </div>

              <div className="d-flex align-items-center gap-10 mt-45">
                <a
                  href="https://play.google.com/store/games?device=windows"
                  className="d-block text-decoration-none"
                >
                  <Image
                    src="/images/google-play2.svg"
                    alt="google-play2"
                    width={198}
                    height={81}
                  />
                </a>
                <a
                  href="https://www.apple.com/app-store/"
                  className="d-block text-decoration-none"
                  target="_blank"
                >
                  <Image
                    src="/images/app-store2.svg"
                    alt="app-store2"
                    width={200}
                    height={81}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileApp;
