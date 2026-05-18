import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

const Footer = () => {
  // Define contact information data
  const contactInfo = [
    {
      id: 1,
      type: 'address',
      value: '123 Financial Street, London, EC2A 4AB, United Kingdom',
    },
    {
      id: 2,
      type: 'phone',
      value: '+44 (0506) 258 7485',
      link: 'tel:+44(0506)2587485',
    },
    {
      id: 3,
      type: 'email',
      value: 'information@expa.com',
      link: 'mailto:information@expa.com',
    },
  ];

  // Define company links data
  const companyLinks = [
    { id: 1, text: 'About Us', href: '/about-us' },
    { id: 2, text: 'Exchange Rate', href: '/exchange-rate' },
    { id: 3, text: 'Blog & News', href: '/blog' },
    { id: 4, text: 'Careers', href: '/careers' },
    { id: 5, text: 'Contact Us', href: '/contact-us' },
  ];

  // Define explore links data
  const exploreLinks = [
    { id: 1, text: "FAQ's", href: '/faqs' },
    { id: 2, text: 'Help', href: '/faqs' },
    { id: 3, text: 'Blog & News', href: '/blog' },
    { id: 4, text: 'Privacy Policy', href: '/privacy-policy' },
    { id: 5, text: 'Terms & Conditions', href: '/terms-conditions' },
  ];

  // Define social media links data
  const socialLinks = [
    { id: 1, icon: 'ri-facebook-fill', href: 'https://www.facebook.com/' },
    { id: 2, icon: 'ri-twitter-x-line', href: 'https://www.twitter.com/' },
    { id: 3, icon: 'ri-linkedin-fill', href: 'https://www.linkedin.com/' },
    { id: 4, icon: 'ri-instagram-line', href: 'https://www.instagram.com/' },
  ];

  return (
    <>
      <div className="footer-area pt-120 pb-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 col-sm-6">
              <div className="footer-single-widget">
                <div className="logo-wrap">
                  <Image
                    src="/images/logo-black.svg"
                    className="d-block"
                    alt="logo-black"
                    width={127}
                    height={50}
                  />
                  <Image
                    src="/images/logo.svg"
                    className="d-none"
                    alt="logo"
                    width={127}
                    height={50}
                  />
                </div>

                <p>
                  Trusted by millions, Expa connects people worldwide with fast
                  and fair transfers.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="footer-single-widget">
                <h3>Contact Info</h3>

                <ul className="p-0 m-0 list-unstyled contact-list">
                  {contactInfo.map(info => (
                    <li key={info.id}>
                      {info.type === 'address' ? (
                        <p>{info.value}</p>
                      ) : (
                        <>
                          <p className="mb-0">
                            {info.type === 'phone' ? 'Call us' : 'Email'}
                          </p>
                          <a
                            href={info.link}
                            className="text-decoration-none fw-bold"
                          >
                            {info.value}
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="footer-single-widget">
                <h3>Company</h3>

                <ul className="p-0 m-0 list-unstyled import-link">
                  {companyLinks.map(link => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className="d-flex align-items-center text-decoration-none"
                      >
                        <i className="ri-arrow-right-double-line"></i>
                        <span>{link.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="footer-single-widget">
                <h3>Explore</h3>

                <ul className="p-0 m-0 list-unstyled import-link">
                  {exploreLinks.map(link => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className="d-flex align-items-center text-decoration-none"
                      >
                        <i className="ri-arrow-right-double-line"></i>
                        <span>{link.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-120"></div>

          <div className="subscribe-content bg-primary">
            <div className="row align-items-center g-4">
              <div className="col-lg-3">
                <p className="text-center text-lg-start">
                  Subscribe to our newsletter for market updates and exclusive
                  offers.
                </p>
              </div>

              <div className="col-lg-6">
                <SubscribeForm />
              </div>

              <div className="col-lg-3">
                <ul className="p-0 m-0 list-unstyled d-flex align-items-center justify-content-center justify-content-lg-end social-list">
                  {socialLinks.map(social => (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={social.icon}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="copyright-content mb-0 text-center">
            Copyright @<span>SendMoney</span>. All Rights Reserved by{' '}
            <a
              href="https://www.codexiva.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Codexiva
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
