import React from "react";
import Image from "next/image";

const ExperiencedLeadershipTeam = () => {
  // Dynamic team data
  const teamMembers = [
    {
      id: 1,
      name: "Charles Kelsey",
      position: "Head of Marketing",
      imageSrc: "/images/team7.jpg",
      linkedinUrl: "https://www.linkedin.com/in/charles-kelsey",
    },
    {
      id: 2,
      name: "Mamie Atwell",
      position: "Corporate Account Director",
      imageSrc: "/images/team8.jpg",
      linkedinUrl: "https://www.linkedin.com/in/mamie-atwell",
    },
    {
      id: 3,
      name: "Linda Taylor",
      position: "Chief Financial Officer",
      imageSrc: "/images/team5.jpg",
      linkedinUrl: "https://www.linkedin.com/in/linda-taylor",
    },
    {
      id: 4,
      name: "Marvin Graves",
      position: "Chief People Officer",
      imageSrc: "/images/team6.jpg",
      linkedinUrl: "https://www.linkedin.com/in/marvin-graves",
    },
  ];

  return (
    <>
      <div className="team-area ptb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <h2
                className="main-title style-two mx-auto text-center position-sticky"
                style={{
                  top: "100px",
                }}
              >
                Our experienced leadership team
              </h2>
            </div>

            <div className="col-lg-6">
              <div className="row g-lg-4 justify-content-center">
                {teamMembers.map((member) => (
                  <div key={member.id} className="col-sm-6">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExperiencedLeadershipTeam;
