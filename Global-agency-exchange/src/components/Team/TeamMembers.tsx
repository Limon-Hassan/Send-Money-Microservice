"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  imageSrc: string;
  linkedinUrl: string;
}

const TeamMembers = () => {
  // Dynamic team data with more members for pagination demonstration
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Clarence Atkins",
      position: "Vice President",
      imageSrc: "/images/team1.jpg",
      linkedinUrl: "https://www.linkedin.com/in/clarence-atkins",
    },
    {
      id: 2,
      name: "Deanna Underwood",
      position: "International Payments Manager",
      imageSrc: "/images/team2.jpg",
      linkedinUrl: "https://www.linkedin.com/in/deanna-underwood",
    },
    {
      id: 3,
      name: "Morris Blackwell",
      position: "CEO & Founder",
      imageSrc: "/images/team3.jpg",
      linkedinUrl: "https://www.linkedin.com/in/morris-blackwell",
    },
    {
      id: 4,
      name: "Charles Kelsey",
      position: "Head of Marketing",
      imageSrc: "/images/team4.jpg",
      linkedinUrl: "https://www.linkedin.com/in/charles-kelsey",
    },
    {
      id: 5,
      name: "Mamie Atwell",
      position: "Corporate Account Director",
      imageSrc: "/images/team5.jpg",
      linkedinUrl: "https://www.linkedin.com/in/mamie-atwell",
    },
    {
      id: 6,
      name: "Linda Taylor",
      position: "Chief Financial Officer",
      imageSrc: "/images/team6.jpg",
      linkedinUrl: "https://www.linkedin.com/in/linda-taylor",
    },
    {
      id: 7,
      name: "Marvin Graves",
      position: "Chief People Officer",
      imageSrc: "/images/team7.jpg",
      linkedinUrl: "https://www.linkedin.com/in/marvin-graves",
    },
    {
      id: 8,
      name: "Sarah Johnson",
      position: "Chief Technology Officer",
      imageSrc: "/images/team8.jpg",
      linkedinUrl: "https://www.linkedin.com/in/sarah-johnson",
    },
    {
      id: 9,
      name: "Michael Chen",
      position: "Product Director",
      imageSrc: "/images/team2.jpg",
      linkedinUrl: "https://www.linkedin.com/in/michael-chen",
    },
    {
      id: 10,
      name: "Emily Rodriguez",
      position: "Head of Design",
      imageSrc: "/images/team1.jpg",
      linkedinUrl: "https://www.linkedin.com/in/emily-rodriguez",
    },
    {
      id: 11,
      name: "David Wilson",
      position: "Engineering Manager",
      imageSrc: "/images/team6.jpg",
      linkedinUrl: "https://www.linkedin.com/in/david-wilson",
    },
    {
      id: 12,
      name: "Jennifer Lee",
      position: "Operations Director",
      imageSrc: "/images/team8.jpg",
      linkedinUrl: "https://www.linkedin.com/in/jennifer-lee",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const membersPerPage = 8;

  // Calculate pagination values
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = teamMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );
  const totalPages = Math.ceil(teamMembers.length / membersPerPage);

  // Scroll to top when page changes
  useEffect(() => {
    // Smooth scroll to top of the team section
    const teamSection = document.querySelector(".team-area");
    if (teamSection) {
      teamSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  // Handle page change
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Navigate to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Navigate to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Only show pagination if there's more than one page
  const showPagination = totalPages > 1;

  return (
    <>
      <div className="team-area ptb-120">
        <div className="container">
          <h2 className="main-title style-two mx-auto text-center mb-40">
            Our experienced leadership team
          </h2>

          <div className="row g-lg-4 justify-content-center">
            {currentMembers.map((member) => (
              <div key={member.id} className="col-xl-3 col-lg-4 col-sm-6">
                <div className="team-single-item">
                  <div className="team-img">
                    <Image
                      src={member.imageSrc}
                      alt={member.name}
                      width={624}
                      height={700}
                      className="img-fluid"
                    />

                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkedin"
                      aria-label={`Connect with ${member.name} on LinkedIn`}
                    >
                      <i className="ri-linkedin-fill"></i>
                    </a>
                  </div>
                  <div className="team-content">
                    <h3>{member.name}</h3>
                    <span>{member.position}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* pagination - only show if there's more than one page */}
            {showPagination && (
              <div className="col-lg-12">
                <div className="pagination-area d-flex align-items-center justify-content-center">
                  <button
                    className="next page-numbers border-0"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <i className="ri-arrow-left-long-line"></i>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNumber) => (
                      <button
                        key={pageNumber}
                        className={`page-numbers border-0 ${
                          currentPage === pageNumber ? "current" : ""
                        }`}
                        onClick={() => paginate(pageNumber)}
                        aria-label={`Page ${pageNumber}`}
                      >
                        {pageNumber.toString().padStart(2, "0")}
                      </button>
                    )
                  )}

                  <button
                    className="next page-numbers border-0"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
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

export default TeamMembers;
