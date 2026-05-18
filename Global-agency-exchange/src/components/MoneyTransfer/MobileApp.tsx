import React from "react";
import Image from "next/image";

const MobileApp = () => {
  // Define app features data
  const appFeatures = [
    { id: 1, text: "Send money in minutes, not days" },
    { id: 2, text: "Track transfers in real-time" },
    { id: 3, text: "Get exchange rate alerts" },
    { id: 4, text: "Biometric login for security" },
    { id: 5, text: "Manage beneficiaries easily" },
    { id: 6, text: "24/7 customer support" },
  ];

  // Split features into two columns
  const featuresColumn1 = appFeatures.slice(0, 3);
  const featuresColumn2 = appFeatures.slice(3, 6);

  // Define app store data
  const appStores = [
    {
      id: 1,
      name: "Google Play",
      url: "https://play.google.com/store/games?device=windows&pli=1",
      image: {
        src: "/images/google-play.svg",
        alt: "google-play",
      },
    },
    {
      id: 2,
      name: "App Store",
      url: "https://www.apple.com/app-store/",
      image: {
        src: "/images/app-store.svg",
        alt: "app-store",
      },
    },
  ];

  // Define counter items data
  const counterItems = [
    { id: 1, value: "4.9/5", label: "App Store Rating" },
    { id: 2, value: "50K+", label: "Happy Users" },
  ];

  // Define user images data
  const userImages = [
    { id: 1, src: "/images/user1.jpg", alt: "user" },
    { id: 2, src: "/images/user2.jpg", alt: "user" },
    { id: 3, src: "/images/user3.jpg", alt: "user" },
    { id: 4, src: "/images/user4.jpg", alt: "user" },
  ];

  return (
    <>
      <div className="expa-mobile-app-area position-relative z-1 ptb-120">
        <div className="container">
          <div className="row gy-2">
            <div className="col-lg-4">
              <span className="top-title">Expa Mobile App</span>
            </div>
            <div className="col-lg-8">
              <h2 className="main-title style-two mw-825 ms-0 mb-40">
                <span>Send money</span> anywhere with our award-winning mobile
                application
              </h2>

              <div className="mobile-app-content">
                <p>
                  Manage your international transfers on the go with our
                  easy-to-use mobile app. Send money to over 100 countries with
                  just a few taps.
                </p>
                <div className="row gy-2">
                  <div className="col-lg-6">
                    <ul className="p-0 m-0 list-unstyled">
                      {featuresColumn1.map((feature) => (
                        <li
                          key={feature.id}
                          className="d-flex align-items-center gap-10"
                        >
                          <i className="ri-checkbox-circle-fill"></i>
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="p-0 m-0 list-unstyled">
                      {featuresColumn2.map((feature) => (
                        <li
                          key={feature.id}
                          className="d-flex align-items-center gap-10"
                        >
                          <i className="ri-checkbox-circle-fill"></i>
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="d-flex gap-10 mobile-app-btn">
                  {appStores.map((store) => (
                    <a
                      key={store.id}
                      href={store.url}
                      className="d-inline-block"
                    >
                      <Image
                        src={store.image.src}
                        alt={store.image.alt}
                        width={208}
                        height={81}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-120"></div>

          <div
            className="mobile-app-wrap bg-img position-relative z-1"
            style={{
              backgroundImage: `url('/images/counter-bg.jpg')`,
            }}
          >
            <div className="row">
              <div className="col-xxl-5 col-lg-4 d-none d-lg-inline-block">
                <div className="mobile-app-img">
                  <Image
                    src="/images/mobile-app.png"
                    alt="mobile-app"
                    width={574}
                    height={798}
                  />
                </div>
              </div>
              <div className="col-xxl-7 col-lg-8">
                <div className="mobile-app-content-bottom">
                  <div className="d-sm-flex align-items-center gap-50">
                    <div className="flex-shrink-0 text-center mb-3 mb-sm-0">
                      {counterItems.map((item) => (
                        <div key={item.id} className="counter-single-item2">
                          <h2>{item.value}</h2>
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-sm-flex align-items-center gap-15 mb-3 mb-md-4">
                        <div className="d-flex align-items-center user-img mb-2 mb-sm-0">
                          {userImages.map((user, index) => (
                            <Image
                              key={user.id}
                              src={user.src}
                              className={`rounded-circle img ${
                                index === 0 ? "ms-0" : ""
                              } ${
                                index === userImages.length - 1 ? "me-0" : ""
                              }`}
                              alt={user.alt}
                              width={52}
                              height={52}
                            />
                          ))}
                        </div>

                        <div>
                          <div className="d-flex align-content-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className="ri-star-fill text-warning"
                              ></i>
                            ))}
                          </div>
                          <span>10k+ reviews</span>
                        </div>
                      </div>
                      <h3>Powerful Features</h3>
                      <p>
                        Everything you need for international money transfers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="expa-mobile-app-shape d-none d-xl-inline-block"></div>
      </div>
    </>
  );
};

export default MobileApp;
