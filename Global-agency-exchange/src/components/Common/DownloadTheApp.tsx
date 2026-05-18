import React from "react";
import Image from "next/image"; 

const DownloadTheApp = () => {
  return (
    <>
      <div
        className="apps-area-three bg-img ptb-120"
        style={{
          backgroundImage: "url(/images/apps-img-bg3.png)",
        }}
      >
        <div className="container">
          <div className="apps-content-three">
            <h2 className="main-title style-two ms-0">Download the Expa App</h2>
            <p>
              Download the Expa app to send, exchange, and manage money on the
              go.
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
                  target="_blank"
                >
                  <Image
                    src="/images/google-play.svg"
                    alt="google-play"
                    width={208}
                    height={81}
                  />
                </a>
                <a
                  href="https://www.apple.com/app-store/"
                  className="d-block text-decoration-none"
                  target="_blank"
                >
                  <Image
                    src="/images/app-store.svg"
                    alt="app-store"
                    width={208}
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

export default DownloadTheApp;
