import React from "react";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  // Dynamic data for Company section
  const companyLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Exchange Rate", href: "/exchange-rate" },
    { label: "Blog & News", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  // Dynamic data for Explore section
  const exploreLinks = [
    { label: "FAQ's", href: "/faqs" },
    { label: "Help", href: "/faqs" },
    { label: "Download App", href: "services.html", external: true },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ];

  // Dynamic data for Social links
  const socialLinks = [
    {
      platform: "Facebook",
      href: "https://www.facebook.com/",
      icon: "ri-facebook-fill",
    },
    {
      platform: "Twitter",
      href: "https://www.twitter.com/",
      icon: "ri-twitter-x-line",
    },
    {
      platform: "LinkedIn",
      href: "https://www.linkedin.com/",
      icon: "ri-linkedin-fill",
    },
    {
      platform: "Instagram",
      href: "https://www.instagram.com/",
      icon: "ri-instagram-line",
    },
  ];

  // Dynamic copyright data
  const copyrightData = {
    year: new Date().getFullYear(),
    companyName: "Expa",
    developerName: "EnvyTheme",
    developerUrl: "https://envytheme.com/",
  };

  return (
    <>
      <div className="footer-area ptb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="footer-single-widget-two">
                <p>
                  Trusted by millions, Expa connects people worldwide with fast
                  and fair transfers.
                </p>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row g-4">
                <div className="col-lg-3 col-sm-6">
                  <div className="footer-single-widget-two">
                    <h3>Company</h3>
                    <ul className="p-0 m-0 list-unstyled import-link">
                      {companyLinks.map((link, index) => (
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
                      {exploreLinks.map((link, index) => (
                        <li key={index}>
                          {link.external ? (
                            <a href={link.href}>{link.label}</a>
                          ) : (
                            <Link href={link.href}>{link.label}</Link>
                          )}
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
                <p className="copyright-content style-three m-0 text-center">
                  Copyright @<span>{copyrightData.companyName}</span>. All
                  Rights Reserved by{" "}
                  <a
                    href={copyrightData.developerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {copyrightData.developerName}
                  </a>
                </p>
              </div>
              <div className="col-lg-6">
                <ul className="p-0 m-0 list-unstyled d-flex align-items-center justify-content-center justify-content-lg-end social-list">
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      <a
                        href={social.href}
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
    </>
  );
};

export default Footer;
