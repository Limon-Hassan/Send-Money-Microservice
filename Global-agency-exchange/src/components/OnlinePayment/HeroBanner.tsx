import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroBanner = ({
  backgroundImage = "/images/banner-bg.jpg",
  title = "Fast, Secure, & Low Cost Online Payments Worldwide",
  description = "Send, receive, and manage money globally in minutes with transparent fees up to 85% lower than banks.",
  buttonText = "Get Started for Free",
  buttonLink = "/pricing",
  features = ["Available in 100+ countries", "24/7 customer support"],
  userImages = [
    "/images/user1.jpg",
    "/images/user2.jpg",
    "/images/user3.jpg",
    "/images/user4.jpg",
  ],
  socialLinks = [
    { name: "FB", url: "https://www.facebook.com/" },
    { name: "LI", url: "https://www.linkedin.com/" },
    { name: "X", url: "https://x.com/" },
    { name: "IG", url: "https://www.instagram.com/" },
  ],
}) => {
  return (
    <>
      <div
        className="banner-area-three position-relative z-1 bg-img"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="container mw-1680 position-relative">
          <div className="banner-content-three">
            <h2>{title}</h2>

            <div className="banner-content-inner">
              <p>{description}</p>
              <Link href={buttonLink} className="btn btn-secondary">
                {buttonText}
              </Link>
            </div>

            <ul className="p-0 mb-0 list-unstyled feature-list d-flex align-items-center">
              {features.map((feature, index) => (
                <li key={index} className="d-flex align-items-center gap-10">
                  <i className="ri-checkbox-circle-fill"></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="trusted-client">
            <div className="d-flex">
              {userImages.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt="user"
                  width={54}
                  height={54}
                />
              ))}
            </div>

            <span>
              Trusted by <br /> millions worldwide
            </span>
          </div>

          <ul className="p-0 m-0 list-unstyled banner-social-link d-lg-flex align-items-center d-none">
            <li>
              <span>Follow Us</span>
            </li>
            {socialLinks.map((social, index) => (
              <li key={index}>
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;
