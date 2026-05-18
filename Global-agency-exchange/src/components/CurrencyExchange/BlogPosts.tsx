import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogPosts = () => {
  // Define blog posts data
  const blogPosts = [
    {
      id: 1,
      date: {
        day: 10,
        month: "Sep",
      },
      author: "Sarah Johnson",
      title: "How to Protect Your Business from Currency Volatility",
      description:
        "Practical hedging strategies that businesses can use to minimize foreign exchange risk and protect their profit margins.",
      link: "/blog/details/",
    },
    {
      id: 2,
      date: {
        day: 9,
        month: "Sep",
      },
      author: "Emma Rodriguez",
      title: "Expa Launches New Mobile App with Enhanced Features",
      description:
        "Discover the new features in our updated mobile application, including rate alerts, faster transfers, and improved security.",
      link: "/blog/details/",
    },
    {
      id: 3,
      date: {
        day: 8,
        month: "Sep",
      },
      author: "James Wilson",
      title: "Summer Travel 2025: Best Practices for Currency Exchange",
      description:
        "Tips for getting the best exchange rates and avoiding hidden fees when obtaining foreign currency for your summer travels.",
      link: "/blog/details/",
    },
  ];

  return (
    <>
      <div className="blog-area ptb-120">
        <div className="container mw-1680">
          <div className="d-flex flex-wrap gap-10 justify-content-between align-items-end mb-40 pb-lg-2">
            <h2 className="main-title ms-0 mb-0 mw-920 fw-semibold">
              SendMoney Currency Blog
            </h2>
            <p className="description">
              Stay informed with the latest currency market insights, financial
              tips, and company updates.
            </p>
          </div>
        </div>

        <div className="container">
          <div className="row g-4 justify-content-center">
            {blogPosts.map((post) => (
              <div key={post.id} className="col-lg-4 col-md-6">
                <div className="blog-single-item">
                  <span className="date">
                    <span>{post.date.day}</span>
                    {post.date.month}
                  </span>
                  <p className="author text-decoration-none">
                    By: <span className="fw-medium">{post.author}</span>
                  </p>
                  <h3>
                    <Link href={post.link}>{post.title}</Link>
                  </h3>
                  <p>{post.description}</p>
                  <div className="btn-wrap">
                    <Link href={post.link} className="btn">
                      Learn More
                    </Link>
                  </div>
                  <Image
                    src="/images/shape.png"
                    className="shape d-none d-sm-inline-block"
                    alt="shape2"
                    width={90}
                    height={90}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
