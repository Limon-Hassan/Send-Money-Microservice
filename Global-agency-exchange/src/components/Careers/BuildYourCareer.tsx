import React from "react";
import Image from "next/image";
import Link from "next/link";

const BuildYourCareer = () => {
  return (
    <>
      <div className="build-your-career-area ptb-120">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <h2 className="main-title style-two">
                Build Your Career at Expa
              </h2>
              <div className="build-your-career-inner">
                <p>
                  Join our mission to make international money transfers faster,
                  cheaper, and more accessible for everyone
                </p>
                <Link href="/apply-now" className="btn">
                  Explore Open Positions
                </Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="build-your-career-img">
                <Image
                  src="/images/build-your-career-img.jpg"
                  className="rounded-4 ukiyo object-fit-contain"
                  alt="build-your-career-img"
                  width={760}
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildYourCareer;
