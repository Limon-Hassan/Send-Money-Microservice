import React from "react";
import Link from "next/link";

interface Props {
  homePageText: string;
  homePageUrl: string;
  pageTitle: string;
  phoneNumber: string;
  email: string;
}

function PageBanner({
  homePageText,
  homePageUrl,
  pageTitle,
  phoneNumber,
  email,
}: Props) {
  return (
    <>
      <div
        className="page-banner-area bg-img"
        style={{
          backgroundImage: `url('/images/page-bg.jpg')`,
        }}
      >
        <div className="container mw-1680">
          <div className="page-banner-content">
            <h2>{pageTitle}</h2>
          </div>
          <div className="page-banner-info flex-wrap d-flex justify-content-between align-items-center gap-10">
            <ul className="p-0 m-0 list-unstyled d-flex align-items-center">
              <li>
                <Link href={homePageUrl} className="text-decoration-none">
                  {homePageText}
                </Link>
              </li>
              <li className="active">{pageTitle}</li>
            </ul>

            <div className="d-flex flex-wrap align-items-center gap-112">
              <div className="d-flex align-items-center info">
                <div className="flex-shrink-0">
                  <i className="ri-phone-fill"></i>
                </div>
                <div className="flex-grow-1">
                  <span>Call us</span>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-decoration-none d-block"
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>
              <div className="d-flex align-items-center info">
                <div className="flex-shrink-0">
                  <i className="ri-mail-open-fill"></i>
                </div>
                <div className="flex-grow-1">
                  <span>Email</span>
                  <a
                    href={`mailto:${email}`}
                    className="text-decoration-none d-block"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageBanner;
