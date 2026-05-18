"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Define TypeScript interface for partner data
interface Partner {
  id: number;
  name: string;
  image: string;
  width: number;
  height: number;
}

const Partners = () => {
  // Dynamic partner data
  const partners: Partner[] = [
    {
      id: 1,
      name: "Partner 1",
      image: "/images/partner1.png",
      width: 130,
      height: 50,
    },
    {
      id: 2,
      name: "Partner 2",
      image: "/images/partner2.png",
      width: 167,
      height: 50,
    },
    {
      id: 3,
      name: "Partner 3",
      image: "/images/partner3.png",
      width: 165,
      height: 50,
    },
    {
      id: 4,
      name: "Partner 4",
      image: "/images/partner4.png",
      width: 137,
      height: 50,
    },
    {
      id: 5,
      name: "Partner 5",
      image: "/images/partner5.png",
      width: 154,
      height: 50,
    },
    {
      id: 6,
      name: "Partner 6",
      image: "/images/partner6.png",
      width: 162,
      height: 50,
    },
    {
      id: 7,
      name: "Partner 7",
      image: "/images/partner7.png",
      width: 139,
      height: 50,
    },
    {
      id: 8,
      name: "Partner 3",
      image: "/images/partner3.png",
      width: 165,
      height: 50,
    },
    {
      id: 9,
      name: "Partner 4",
      image: "/images/partner4.png",
      width: 137,
      height: 50,
    },
    {
      id: 10,
      name: "Partner 5",
      image: "/images/partner5.png",
      width: 154,
      height: 50,
    },
  ];

  return (
    <>
      <div className="partner-area">
        <div className="container mw-1680">
          <div className="row align-items-center g-4">
            <div className="col-lg-1 text-center text-lg-start">
              <span className="text-secondary">Trusted by</span>
            </div>
            <div className="col-lg-11">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                  },
                  475: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  992: {
                    slidesPerView: 5,
                  },
                  1200: {
                    slidesPerView: 6,
                  },
                  1600: {
                    slidesPerView: 7,
                  },
                }}
                modules={[Autoplay]}
                className="partner-slide"
              >
                {partners.map((partner) => (
                  <SwiperSlide key={partner.id}>
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      width={partner.width}
                      height={partner.height}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners;
