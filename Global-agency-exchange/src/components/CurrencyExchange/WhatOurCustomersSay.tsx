"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const WhatOurCustomersSay = () => {
  // Define customer statistics data
  const customerStats = [
    {
      id: 1,
      value: "4.9/5",
      label: "Average Customer Rating",
    },
    {
      id: 2,
      value: "2,500+",
      label: "5-Star Reviews",
    },
    {
      id: 3,
      value: "99%",
      label: "Customer Satisfaction",
    },
  ];

  // Define customer testimonials data
  const testimonials = [
    {
      id: 1,
      image: {
        src: "/images/customer1.png",
        alt: "customer",
      },
      quote:
        "Expa has saved our company thousands in international transaction fees. Their business platform is intuitive and their support team is always available to help with complex transfers.",
      name: "Ronald Martinez",
      position: "CFO, FilaGlobal Inc.",
    },
    {
      id: 2,
      image: {
        src: "/images/customer2.png",
        alt: "customer",
      },
      quote:
        "Switching to Expa simplified our global payroll process. We now handle cross-border payments in minutes, saving valuable time and resources.",
      name: "Sophia Chen",
      position: "Head of Operations",
    },
  ];

  // Function to render star ratings (always 5 stars in this case)
  const renderStars = () => {
    return (
      <div className="d-flex star">
        {[...Array(5)].map((_, i) => (
          <i key={i} className="ri-star-fill lh-1"></i>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="customers-area pt-120">
        <div className="container mw-1680">
          <div className="d-flex flex-wrap gap-10 justify-content-between align-items-end mb-40 pb-lg-2">
            <h2 className="main-title ms-0 mb-0 mw-920 fw-semibold">
              What Our{" "}
              <Image
                src="/images/title-img3.png"
                className="ms-lg-4 d-none d-lg-inline-block"
                alt="title-img3"
                width={185}
                height={75}
              />{" "}
              Customers Say
            </h2>
            <p className="description">
              Discover why thousands of individuals and businesses trust Expa
              with their currency exchange needs.
            </p>
          </div>

          <div className="customers-content-wrap">
            <div className="row align-items-end g-4">
              <div className="col-lg-3">
                <ul className="customers-wrap list-unstyled mx-0 mb-0">
                  {customerStats.map((stat) => (
                    <li key={stat.id}>
                      <h2>{stat.value}</h2>
                      <span>{stat.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-lg-9">
                <div className="customers-single-item">
                  <Swiper
                    navigation={true}
                    autoplay={{
                      delay: 6000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    modules={[Navigation, Autoplay]}
                    className="customers-slide"
                  >
                    {testimonials.map((testimonial) => (
                      <SwiperSlide key={testimonial.id}>
                        <div className="d-md-flex align-items-end gap-56">
                          <div className="flex-shrink-0">
                            <Image
                              src={testimonial.image.src}
                              className="customer-img"
                              alt={testimonial.image.alt}
                              width={340}
                              height={533}
                            />
                          </div>

                          <div className="flex-grow-1">
                            <div className="customers-info-wrap">
                              {renderStars()}
                              
                              <p>{testimonial.quote}</p>

                              <div className="customers-info">
                                <h3>{testimonial.name}</h3>
                                <span>{testimonial.position}</span>
                              </div>
                            </div>
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
      </div>
    </>
  );
};

export default WhatOurCustomersSay;
