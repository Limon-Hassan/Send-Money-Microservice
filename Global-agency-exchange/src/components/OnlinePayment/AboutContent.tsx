import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutContent = () => {
  return (
    <>
      <div className="about-area-three">
        <div className="container mb-40">
          <span className="top-title style-two mb-lg-3 mb-2">
            <Image
              src="/images/top-title-shape.png"
              alt="top-title-shape"
              width={14}
              height={17}
            />
            About Expa
          </span>
          <h2 className="main-title style-two mw-1208 ms-0">
            We&apos;re building the future of global payments, making financial
            services accessible to everyone.
          </h2>
        </div>

        <div className="container mw-1680">
          <div className="about-img-three mb-4 mb-lg-0">
            <Image
              src="/images/about.jpg"
              className="ukiyo"
              alt="about"
              width={1620}
              height={650}
            />
          </div>
        </div>

        <div className="container mb-40">
          <div className="row align-items-end g-4">
            <div className="col-lg-7">
              <div className="about-content-three">
                <p>
                  Expa is a modern online payment platform designed to make
                  global money transfers simple, safe, and affordable. We
                  empower individuals and businesses to send, receive, and
                  manage money seamlessly across borders with complete
                  transparency.
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="about-content-info-three position-relative z-1">
                <h3>Mission & Vision</h3>
                <p>
                  Our mission is to provide secure, affordable, and accessible
                  payment solutions for everyone, everywhere. We envision a
                  world where money moves as easily as information — instant,
                  borderless, and stress-free.
                </p>

                <Link href="/about-us" className="about-btn">
                  Learn More <br /> About Us
                </Link>

                <Image
                  src="/images/about2.png"
                  className="position-absolute bottom-0 end-0 pe-xl-5 d-none d-lg-inline-block"
                  alt="about2"
                  width={182}
                  height={220}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContent;
