"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Define TypeScript interfaces
interface BlogDate {
  day: number;
  month: string;
}

interface BlogPost {
  id: number;
  date: BlogDate;
  author: string;
  title: string;
  description: string;
  link: string;
}

const BlogTagsPosts = () => {
  // Define blog posts data with proper typing
  const allBlogPosts: BlogPost[] = [
    {
      id: 1,
      date: { day: 10, month: "Sep" },
      author: "Sarah Johnson",
      title: "How to Protect Your Business from Currency Volatility",
      description:
        "Practical hedging strategies that businesses can use to minimize foreign exchange risk and protect their profit margins.",
      link: "/blog/details/",
    },
    {
      id: 2,
      date: { day: 9, month: "Sep" },
      author: "Emma Rodriguez",
      title: "Expa Launches New Mobile App with Enhanced Features",
      description:
        "Discover the new features in our updated mobile application, including rate alerts, faster transfers, and improved security.",
      link: "/blog/details/",
    },
    {
      id: 3,
      date: { day: 8, month: "Sep" },
      author: "James Wilson",
      title: "Summer Travel 2025: Best Practices for Currency Exchange",
      description:
        "Tips for getting the best exchange rates and avoiding hidden fees when obtaining foreign currency for your summer travels.",
      link: "/blog/details/",
    },
  ];

  // Pagination state with proper typing
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage: number = 9; // Number of posts per page
  const blogAreaRef = useRef<HTMLDivElement>(null); // Ref for scrolling to top

  // Calculate pagination values
  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPosts: BlogPost[] = allBlogPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const totalPages: number = Math.ceil(allBlogPosts.length / postsPerPage);

  // Scroll to top of blog area
  const scrollToTop = (): void => {
    if (blogAreaRef.current) {
      blogAreaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle page change with proper typing
  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  // Handle previous page
  const goToPreviousPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  // Handle next page
  const goToNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  return (
    <>
      <div className="blog-area ptb-120" ref={blogAreaRef}>
        <div className="container">
          <h2 className="main-title style-two mx-auto mw-1208 text-center mb-40">
            Tags: <span>Currency Exchange</span>
          </h2>

          <div className="row g-4 justify-content-center">
            {currentPosts.map((post: BlogPost) => (
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

            {/* Only show pagination if there are more than 3 items (more than 1 page) */}
            {totalPages > 1 && (
              <div className="col-lg-12">
                <div className="pagination-area d-flex align-items-center justify-content-center mt-lg-4">
                  <button
                    className="next page-numbers border-0"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                  >
                    <i className="ri-arrow-left-long-line"></i>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNumber: number) => (
                      <button
                        key={pageNumber}
                        className={`page-numbers border-0 ${
                          currentPage === pageNumber ? "current" : ""
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    )
                  )}

                  <button
                    className="next page-numbers border-0"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <i className="ri-arrow-right-long-line"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogTagsPosts;
