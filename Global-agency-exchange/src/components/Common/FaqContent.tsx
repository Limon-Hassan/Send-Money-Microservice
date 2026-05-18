"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FaqContent = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  // Corrected FAQ data with appropriate answers
  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How do I create a Expa account?",
      answer:
        "Creating a Expa account is quick and simple. Just click 'Sign Up', enter your basic details, and verify your email or phone number. Once verified, you can add a payment method and start sending or receiving money instantly.",
    },
    {
      id: 2,
      question: "How long do international transfers take?",
      answer:
        "International transfer times vary by destination. Most transfers complete within 1-3 business days. Factors like the destination country, currency, and payment method can affect timing. You'll always see the estimated delivery time before confirming your transfer.",
    },
    {
      id: 3,
      question: "What are the fees for using Expa?",
      answer:
        "Expa offers transparent, competitive fees. Most transfers have a small fixed fee plus a percentage of the amount sent. Premium accounts enjoy reduced fees. We always display the exact fee before you confirm your transfer, so there are no surprises.",
    },
    {
      id: 4,
      question: "What documents do I need to verify my account?",
      answer:
        "To verify your account, you'll need a government-issued ID (passport, driver's license, or national ID) and proof of address (utility bill, bank statement, or official government letter). For business accounts, additional business registration documents are required.",
    },
    {
      id: 5,
      question: "Are there any limits on how much I can send?",
      answer:
        "Yes, there are limits based on your account verification level. Standard accounts can send up to $2,000 per day and $10,000 per month. Verified accounts have higher limits. Business accounts have custom limits based on their specific needs and verification status.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <>
      <div className="faq-area ptb-120">
        <div className="container position-relative z-1">
          <div className="mb-40 text-center">
            <span className="top-title style-two mb-lg-3 mb-2">
              <Image
                src="/images/top-title-shape.png"
                alt="top-title-shape"
                width={14}
                height={17}
              />
              Frequently Asked Questions
            </span>
            <h2 className="main-title style-two mw-1100 mx-auto">
              Find answers to common questions about Expa&apos;s payment services
            </h2>
          </div>

          <div className="faq-content mx-auto">
            <div className="accordion faq-wrapper">
              {faqData.map((item, index) => (
                <div
                  key={item.id}
                  className="accordion-item border-0 rounded-0"
                >
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button text-secondary ${
                        openIndex === index ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={openIndex === index}
                      aria-controls={`faq-collapse-${item.id}`}
                    >
                      {item.question}
                    </button>
                  </h2>
                  <div
                    id={`faq-collapse-${item.id}`}
                    className={`accordion-collapse collapse ${
                      openIndex === index ? "show" : ""
                    }`}
                    aria-labelledby={`faq-heading-${item.id}`}
                  >
                    <div className="accordion-body">
                      <p>
                        <span className="fw-semibold text-secondary">Ans:</span>{" "}
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Image
            src="/images/faq-bg-shape.png"
            className="position-absolute top-50 start-0 translate-middle-y z-n1"
            alt="faq-bg-shape"
            width={760}
            height={826}
          />
        </div>
      </div>
    </>
  );
};

export default FaqContent;
