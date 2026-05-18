"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Define TypeScript interface for FAQ items
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FaqContent = () => {
  // State to track which accordion item is open
  const [openAccordionId, setOpenAccordionId] = useState<number>(1);

  // Dynamic FAQ data
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How long does a transfer take with Expa?",
      answer:
        "Transfer times vary depending on the destination country and payment method. Most transfers are completed within minutes, but some can take 1-2 business days. You can track your transfer in real-time through your Expa account.",
    },
    {
      id: 2,
      question: "What documents do I need to verify my account?",
      answer:
        "Building Permit: Required for new construction, additions, renovations, or major structural changes. Zoning Approval: Ensures your project complies with local land-use regulations (e.g., residential, commercial, industrial). Some projects require both.",
    },
    {
      id: 3,
      question: "How do your fees work?",
      answer:
        "Registering to vote or updating your voter information is the official process that ensures you are eligible to participate in elections and that your personal details are accurate in the voter rolls. This process typically requires providing proof of identity, residency, and age. It can be done online, in person, or by mail, depending on your local election authority.",
    },
    {
      id: 4,
      question: "What payment methods can I use?",
      answer:
        "Municipal and city government services are public services provided by local government authorities to meet the needs of residents and maintain community well-being. These services vary by city but generally include essential, regulatory, and recreational functions.",
    },
    {
      id: 5,
      question: "Is my money safe with Expa?",
      answer:
        "We repair a wide range of appliances including refrigerators washing machines dryers dishwashers ovens microwaves air conditioners and more. If you are unsure whether we service your specific appliance feel free to contact",
    },
  ];

  // Toggle accordion function
  const toggleAccordion = (id: number) => {
    setOpenAccordionId(openAccordionId === id ? 0 : id);
  };

  return (
    <>
      <div className="faq-area ptb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="faq-img">
                <Image
                  src="/images/faq.jpg"
                  className="mb-4 ukiyo"
                  alt="faq"
                  width={848}
                  height={900}
                />
                <p>
                  Do you still need help?{" "}
                  <Link
                    href="/contact-us"
                    className="text-primary text-decoration-none"
                  >
                    Contact our specialists
                  </Link>{" "}
                  - we&apos;re happy to help!
                </p>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="faq-content">
                <div className="mb-40">
                  <span className="top-title mb-lg-3 mb-2">
                    Frequently Asked Questions
                  </span>
                  <h2 className="main-title style-two ms-0">
                    <span>Quick answers</span> to common questions about Expa
                    services
                  </h2>
                </div>

                <div className="accordion faq-wrapper">
                  {faqItems.map((item) => (
                    <div key={item.id} className="accordion-item border-0">
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button text-secondary ${
                            openAccordionId === item.id ? "" : "collapsed"
                          }`}
                          type="button"
                          onClick={() => toggleAccordion(item.id)}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${
                          openAccordionId === item.id ? "show" : ""
                        }`}
                      >
                        <div className="accordion-body">
                          <p>
                            <span className="fw-semibold text-secondary">
                              Ans:
                            </span>{" "}
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqContent;
