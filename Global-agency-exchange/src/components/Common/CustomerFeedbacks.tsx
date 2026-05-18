"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const CustomerFeedbacks = () => {
  // Dynamic data for customer feedbacks
  const feedbacksData = [
    {
      id: 1,
      name: "Kevin Sherman",
      role: "Startup Founder",
      content:
        "The business account has transformed how we pay our international contractors. What used to take days now happens in hours, and our team can focus on work instead of banking logistics.",
      rating: 4,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Freelance Designer",
      content:
        "I've been using Expa for over a year now to receive payments from international clients. The exchange rates are fantastic and transfers are always fast and reliable.",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "E-commerce Manager",
      content:
        "As an online retailer, we need to make frequent international payments. Expa has simplified our process and saved us thousands in fees compared to traditional banks.",
      rating: 5,
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      role: "Digital Nomad",
      content:
        "Managing finances across multiple countries used to be a nightmare. With Expa, I can easily move money between my accounts and always get the best exchange rates.",
      rating: 4,
    },
  ];

  // Function to render star ratings based on rating value
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={i <= rating ? "ri-star-fill" : "ri-star-line"}
        ></i>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="customers-area pt-120">
        <div className="container">
          <div className="row g-0">
            <div className="col-lg-4 d-none d-lg-inline-block">
              <div className="bg-secondary h-100 rounded-start-4 position-relative">
                <Image
                  src="/images/customer3.png"
                  className="position-absolute bottom-0 mx-auto start-0 end-0"
                  alt="customer"
                  width={330}
                  height={513}
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div
                className="bg-secondary bg-img rounded-end-4"
                style={{
                  backgroundImage: 'url("/images/customers-shape.png")',
                  backgroundSize: "contain",
                }}
              >
                <Swiper
                  navigation={true}
                  autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[Navigation, Autoplay]}
                  className="customers-slide2"
                >
                  {feedbacksData.map((feedback) => (
                    <SwiperSlide key={feedback.id}>
                      <div className="customers-single-item-three">
                        <div className="d-flex gap-1 justify-content-center star">
                          {renderStars(feedback.rating)}
                        </div>
                        <p>“{feedback.content}”</p>

                        <div className="info">
                          <h3>{feedback.name}</h3>
                          <span>{feedback.role}</span>
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

export default CustomerFeedbacks;
