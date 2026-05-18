import React from "react";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm"; 

const Footer = () => {
  // Dynamic footer data
  const footerData = {
    stats: {
      transferFees: "0.99",
      countries: "100+",
      customerRating: "4.9/5",
    },
    contact: {
      phone: "+44 (0506) 258 7485",
      email: "information@expa.com",
      address: "123 Financial Street, London, EC2A 4AB, United Kingdom",
    },
    companyLinks: [
      { label: "About Us", href: "/about-us" },
      { label: "Exchange Rate", href: "/exchange-rate" },
      { label: "Blog & News", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact-us" },
    ],
    exploreLinks: [
      { label: "FAQ's", href: "/faqs" },
      { label: "Help", href: "/faqs" },
      { label: "Download App", href: "/services" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
    ],
    socialLinks: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/",
        icon: "ri-facebook-fill",
      },
      {
        platform: "Twitter",
        url: "https://www.twitter.com/",
        icon: "ri-twitter-x-line",
      },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/",
        icon: "ri-linkedin-fill",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/",
        icon: "ri-instagram-line",
      },
    ],
    copyright: {
      company: "Expa",
      author: "EnvyTheme",
      authorUrl: "https://envytheme.com/",
    },
  };

  return (
    <>
      <div
        className="bg-img"
        style={{
          backgroundImage: "url('/images/footer-bg.jpg')",
        }}
      >
        <div className="sending-money-worldwide-area pt-120">
          <div className="container">
            <div className="mb-40 text-center sending-money-worldwide-content mx-auto">
              <h2 className="main-title style-two text-white mx-auto">
                Start Sending Money Worldwide Today
              </h2>
              <p>
                Join over 10 million customers who trust Expa for fast, secure,
                and affordable international money transfers.
              </p>
            </div>

            <div className="row g-4 justify-content-center">
              <div className="col-lg-3 col-sm-3">
                <div className="sending-money-worldwide-single-item">
                  <h2>{footerData.stats.transferFees}</h2>
                  <span>Low Transfer Fees</span>
                </div>
              </div>
              <div className="col-lg-3 col-sm-3">
                <div className="sending-money-worldwide-single-item">
                  <h2>{footerData.stats.countries}</h2>
                  <span>Countries Supported</span>
                </div>
              </div>
              <div className="col-lg-3 col-sm-3">
                <div className="sending-money-worldwide-single-item">
                  <h2>{footerData.stats.customerRating}</h2>
                  <span>Customer Rating</span>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <Link href="/register" className="btn mt-lg-5 mt-4">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-info-area ptb-120">
          <div className="container">
            <div className="footer-info-wrap">
              <div className="row align-items-center g-4">
                <div className="col-lg-3 col-sm-6">
                  <Link href="/" className="footer-logo">
                    <Image
                      src="/images/logo.svg"
                      alt="logo"
                      width={127}
                      height={50}
                    />
                  </Link>
                </div>
                <div className="col-lg-2 col-sm-6">
                  <div className="info">
                    <span className="d-block mb-1">Call us</span>
                    <a
                      href={`tel:${footerData.contact.phone}`}
                      className="text-decoration-none text-primary"
                    >
                      {footerData.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="col-lg-2 col-sm-6">
                  <div className="info">
                    <span className="d-block mb-1">Email</span>
                    <a
                      href={`mailto:${footerData.contact.email}`}
                      className="text-decoration-none text-primary"
                    >
                      {footerData.contact.email}
                    </a>
                  </div>
                </div>
                <div className="col-lg-5 col-sm-6">
                  <div className="info">
                    <span className="d-block mb-1">Address</span>
                    <p className="text-primary">{footerData.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-area pb-120">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="footer-single-widget-two">
                  <p>
                    Trusted by millions, Expa connects people worldwide with
                    fast and fair transfers.
                  </p>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="row g-4">
                  <div className="col-lg-3 col-sm-6">
                    <div className="footer-single-widget-two">
                      <h3>Company</h3>
                      <ul className="p-0 m-0 list-unstyled import-link">
                        {footerData.companyLinks.map((link, index) => (
                          <li key={index}>
                            <Link href={link.href}>{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="footer-single-widget-two">
                      <h3>Explore</h3>
                      <ul className="p-0 m-0 list-unstyled import-link">
                        {footerData.exploreLinks.map((link, index) => (
                          <li key={index}>
                            <Link href={link.href}>{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6">
                    <NewsletterForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright-area">
          <div className="container">
            <div className="copyright-wrap">
              <div className="row align-items-center gy-2">
                <div className="col-lg-6">
                  <p className="copyright-content m-0 text-center text-lg-start">
                    Copyright @ <span>{footerData.copyright.company}</span>. All
                    Rights Reserved by{" "}
                    <a
                      href={footerData.copyright.authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {footerData.copyright.author}
                    </a>
                  </p>
                </div>
                <div className="col-lg-6">
                  <ul className="p-0 m-0 list-unstyled d-flex align-items-center justify-content-center justify-content-lg-end social-list">
                    {footerData.socialLinks.map((social, index) => (
                      <li key={index}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow us on ${social.platform}`}
                        >
                          <i className={social.icon}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
