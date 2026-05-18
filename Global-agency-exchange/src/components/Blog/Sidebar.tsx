import React from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  // Dynamic data for categories
  const categories = [
    { name: "Currency Exchange", count: 3, link: "/blog/categories" },
    { name: "Money Transfer", count: 4, link: "/blog/categories" },
    { name: "Online Payments", count: 2, link: "/blog/categories" },
    { name: "Market Analysis", count: 7, link: "/blog/categories" },
    { name: "Currency Tips", count: 5, link: "/blog/categories" },
    { name: "Global Economy", count: 4, link: "/blog/categories" },
    { name: "Company News", count: 2, link: "/blog/categories" },
  ];

  // Dynamic data for popular posts
  const popularPosts = [
    {
      id: 1,
      title: "US Inflation Data and Its Impact on Currency Markets",
      date: "Sep 15, 2025",
      image: "/images/blog2.jpg",
      link: "/blog/details",
    },
    {
      id: 2,
      title: "How to Avoid Currency Exchange Scams: A Complete Guide",
      date: "Sep 14, 2025",
      image: "/images/blog3.jpg",
      link: "/blog/details",
    },
    {
      id: 3,
      title: "Buying Property Abroad: Currency Strategies for Success",
      date: "Sep 13, 2025",
      image: "/images/blog4.jpg",
      link: "/blog/details",
    },
  ];

  // Dynamic data for popular tags
  const tags = [
    { name: "Currency Exchange", link: "/blog/tags" },
    { name: "Money Transfer", link: "/blog/tags" },
    { name: "USD", link: "/blog/tags" },
    { name: "Online Payment", link: "/blog/tags" },
    { name: "Currency", link: "/blog/tags" },
    { name: "Business", link: "/blog/tags" },
    { name: "Travel Money", link: "/blog/tags" },
    { name: "Economy", link: "/blog/tags" },
  ];

  return (
    <>
      <div className="blog-sidebar-wrap">
        <div className="blog-sidebar-widget">
          <h3 className="mb-15">Search</h3>
          <form className="search-form position-relative">
            <input
              type="text"
              className="form-control border-white"
              placeholder="Search here..."
            />
            <button
              type="submit"
              className="border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y mx-2"
            >
              <i className="ri-search-line"></i>
            </button>
          </form>
        </div>

        <div className="blog-sidebar-widget">
          <h3 className="mb-15">Categories</h3>
          <ul className="p-0 m-0 list-unstyled category-list">
            {categories.slice(0, 5).map((category, index) => (
              <li key={index}>
                <Link
                  href={category.link}
                  className="d-flex justify-content-between align-items-center text-decoration-none"
                >
                  <span>{category.name}</span>
                  <span>{category.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="blog-sidebar-widget">
          <h3 className="mb-15">Popular Posts</h3>
          <div className="p-0 m-0 list-unstyled recent-posts-list">
            {popularPosts.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={post.link}
                className="d-flex text-decoration-none align-items-center recent-posts-item"
              >
                <div className="flex-shrink-0">
                  <Image src={post.image} alt="blog" width={75} height={75} />
                </div>
                <div className="flex-grow-1">
                  <h4 className="title">{post.title}</h4>
                  <span className="fa-14 text-body fw-normal">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="blog-sidebar-widget">
          <h3 className="mb-15">Popular Tags</h3>
          <div className="d-flex flex-wrap gap-10 tags-list">
            {tags.slice(0, 8).map((tag, index) => (
              <Link key={index} href={tag.link} className="tag">
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
