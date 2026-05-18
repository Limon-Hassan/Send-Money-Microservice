import React from "react";
import Image from "next/image";

// Define interface for testimonial data
interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  testimonial: string;
  rating: number;
}

const TestimonialsContent = () => {
  // Typed testimonial data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Matthew Mendoza",
      role: "Sends to Mexico",
      image: "/images/user5.jpg",
      testimonial:
        "I've tried several money transfer services, but Expa stands out for its transparency. No hidden fees, and I always know exactly how much will be received on the other end.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sam Cooley",
      role: "Business Owner",
      image: "/images/user6.jpg",
      testimonial:
        "I run a small import business and use Expa for all my international payments. The business dashboard makes it easy to track expenses and manage multiple recipients.",
      rating: 5,
    },
    {
      id: 3,
      name: "Kevin Sherman",
      role: "Sends to Philippines",
      image: "/images/user7.jpg",
      testimonial:
        "I was hesitant to try online money transfer, but Expa made the process so simple. Their customer support team guided me through my first transfer to the Philippines.",
      rating: 5,
    },
    {
      id: 4,
      name: "Betty Hadley",
      role: "Freelance Designer",
      image: "/images/user8.jpg",
      testimonial:
        "As a freelancer working with international clients, Expa makes it easy to receive payments from around the world. The app is intuitive and transfers are always fast.",
      rating: 4,
    },
    {
      id: 5,
      name: "Dorothy Stolz",
      role: "Sends to Spain",
      image: "/images/user9.jpg",
      testimonial:
        "I've been using Expa for over a year to send money to my family in Spain. The low fees and great exchange rates save me hundreds of dollars compared to my bank.",
      rating: 5,
    },
    {
      id: 6,
      name: "Kevin Sherman",
      role: "Sends to Philippines",
      image: "/images/user7.jpg",
      testimonial:
        "I was hesitant to try online money transfer, but Expa made the process so simple. Their customer support team guided me through my first transfer to the Philippines.",
      rating: 5,
    },
    {
      id: 7,
      name: "Betty Hadley",
      role: "Freelance Designer",
      image: "/images/user8.jpg",
      testimonial:
        "As a freelancer working with international clients, Expa makes it easy to receive payments from around the world. The app is intuitive and transfers are always fast.",
      rating: 4,
    },
    {
      id: 8,
      name: "Dorothy Stolz",
      role: "Sends to Spain",
      image: "/images/user9.jpg",
      testimonial:
        "I've been using Expa for over a year to send money to my family in Spain. The low fees and great exchange rates save me hundreds of dollars compared to my bank.",
      rating: 5,
    },
    {
      id: 9,
      name: "Matthew Mendoza",
      role: "Sends to Mexico",
      image: "/images/user5.jpg",
      testimonial:
        "I've tried several money transfer services, but Expa stands out for its transparency. No hidden fees, and I always know exactly how much will be received on the other end.",
      rating: 5,
    },
    {
      id: 10,
      name: "Sam Cooley",
      role: "Business Owner",
      image: "/images/user6.jpg",
      testimonial:
        "I run a small import business and use Expa for all my international payments. The business dashboard makes it easy to track expenses and manage multiple recipients.",
      rating: 5,
    },
  ];

  // Function to render star ratings with proper typing
  const renderStars = (rating: number): React.ReactElement => {
    const stars: React.ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`ri-star${i <= rating ? "-fill" : "-line"} lh-1`}
        ></i>
      );
    }
    return <div className="d-flex star">{stars}</div>;
  };

  return (
    <>
      <div className="customers-area-two ptb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="position-sticky top-120">
                <h2 className="main-title style-two ms-0">
                  Join millions who rely on Expa for simple, safe{" "}
                  <span>international transfers</span>
                </h2>
              </div>
            </div>
            <div className="col-lg-5">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`customers-single-item-two ${
                    index % 2 === 1 ? "bg-secondary" : ""
                  } position-sticky`}
                  style={{ top: `${120 + index * 10}px` }}
                >
                  {renderStars(testimonial.rating)}
                  <p><q>{testimonial.testimonial}</q></p>

                  <div className="d-flex align-items-center gap-15">
                    <div className="flex-shrink-0">
                      <Image
                        src={testimonial.image}
                        className="rounded-circle"
                        alt={testimonial.name}
                        width={75}
                        height={75}
                      />
                    </div>
                    <div className="flex-grow-1">
                      <div className="customers-info">
                        <h3>{testimonial.name}</h3>
                        <span>{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialsContent;
