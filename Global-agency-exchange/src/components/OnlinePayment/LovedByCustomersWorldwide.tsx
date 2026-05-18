"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const LovedByCustomersWorldwide = ({
  sectionTitle = "Loved by Customers Worldwide",
  sectionDescription = "Join millions of users who have transformed their financial experience with Expa",
  topTitleImage = {
    src: "/images/top-title-shape.png",
    alt: "top-title-shape",
  },
  ratings = {
    averageRating: "4.9/5",
    happyCustomers: "99%",
  },
  backgroundImage = "/images/images/customers-shape.png",
  testimonials = [
    {
      id: 1,
      stars: 4,
      text: "The business account has transformed how we pay our international contractors. What used to take days now happens in hours, and our team can focus on work instead of banking logistics.",
      author: "Kevin Sherman",
      role: "Startup Founder",
    },
    {
      id: 2,
      stars: 5,
      text: "I've been using Expa for over a year now and it's completely changed how I manage my finances across countries. The exchange rates are fair and transfers are instant.",
      author: "Sarah Johnson",
      role: "Digital Nomad",
    },
    {
      id: 3,
      stars: 5,
      text: "As a small business owner, the cost savings compared to traditional banks are incredible. We've cut our international payment fees by over 80%.",
      author: "Michael Chen",
      role: "E-commerce Owner",
    },
  ],
  swiperSettings = {
    navigation: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    modules: [Navigation, Autoplay],
    className: "customers-slide2",
  },
}) => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`ri-${i <= rating ? "star-fill" : "star-line"}`}
        ></i>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="customers-area ptb-120">
        <div className="container">
          <div className="mb-40">
            <span className="top-title style-two mb-lg-3 mb-2">
              <Image
                src={topTitleImage.src}
                alt={topTitleImage.alt}
                width={14}
                height={17}
              />
              {sectionTitle}
            </span>
            <h2 className="main-title style-two mw-1208 ms-0">
              {sectionDescription}
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-lg-4">
              <div className="customers-rating-wrap">
                <div className="customers-rating">
                  <h2>{ratings.averageRating}</h2>
                  <span>Average Rating</span>
                </div>
                <div className="customers-rating text-end">
                  <h2>{ratings.happyCustomers}</h2>
                  <span>Happy Customers</span>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div
                className="bg-secondary bg-img"
                style={{
                  backgroundImage: `url('${backgroundImage}')`,
                  backgroundSize: "contain",
                }}
              >
                <Swiper {...swiperSettings}>
                  {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      <div className="customers-single-item-three">
                        <div className="d-flex gap-1 justify-content-center star">
                          {renderStars(testimonial.stars)}
                        </div>
                        <p>{testimonial.text}</p>

                        <div className="info">
                          <h3>{testimonial.author}</h3>
                          <span>{testimonial.role}</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LovedByCustomersWorldwide;
