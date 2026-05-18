import React from "react";
import Image from "next/image";

const GlobalTransfers = () => {
  // Define country data for the first marquee
  const countries1 = [
    { id: 1, src: "/images/countrys/united-states.svg", alt: "United States" },
    { id: 2, src: "/images/countrys/germany.svg", alt: "Germany" },
    { id: 3, src: "/images/countrys/england.svg", alt: "England" },
    { id: 4, src: "/images/countrys/australia.svg", alt: "Australia" },
    { id: 5, src: "/images/countrys/canada.svg", alt: "Canada" },
    { id: 6, src: "/images/countrys/spain.svg", alt: "Spain" },
    { id: 7, src: "/images/countrys/japan.svg", alt: "Japan" },
    { id: 8, src: "/images/countrys/new-zealand.svg", alt: "New Zealand" },
    { id: 9, src: "/images/countrys/greece.svg", alt: "Greece" },
    { id: 10, src: "/images/countrys/united-states.svg", alt: "United States" },
    { id: 11, src: "/images/countrys/germany.svg", alt: "Germany" },
    { id: 12, src: "/images/countrys/england.svg", alt: "England" },
    { id: 13, src: "/images/countrys/australia.svg", alt: "Australia" },
    { id: 14, src: "/images/countrys/canada.svg", alt: "Canada" },
  ];

  // Define country data for the second marquee
  const countries2 = [
    { id: 1, src: "/images/countrys/south-africa.svg", alt: "South Africa" },
    { id: 2, src: "/images/countrys/chile.svg", alt: "Chile" },
    { id: 3, src: "/images/countrys/finland.svg", alt: "Finland" },
    { id: 4, src: "/images/countrys/china.svg", alt: "China" },
    { id: 5, src: "/images/countrys/france.svg", alt: "France" },
    { id: 6, src: "/images/countrys/malaysia.svg", alt: "Malaysia" },
    { id: 7, src: "/images/countrys/iceland.svg", alt: "Iceland" },
    { id: 8, src: "/images/countrys/uruguay.svg", alt: "Uruguay" },
    { id: 9, src: "/images/countrys/denmark.svg", alt: "Denmark" },
    { id: 10, src: "/images/countrys/iraq.svg", alt: "Iraq" },
    { id: 11, src: "/images/countrys/south-africa.svg", alt: "South Africa" },
    { id: 12, src: "/images/countrys/chile.svg", alt: "Chile" },
    { id: 13, src: "/images/countrys/finland.svg", alt: "Finland" },
    { id: 14, src: "/images/countrys/china.svg", alt: "China" },
    { id: 15, src: "/images/countrys/france.svg", alt: "France" },
  ];

  return (
    <>
      <div className="reliable-area ptb-120">
        <div className="container">
          <div className="mb-40">
            <h2 className="main-title style-two mw-100 mx-auto text-center">
              Send money to these popular destinations with low fees and fast
              transfer times
            </h2>
          </div>
        </div>

        <div className="marquee-wrapper monogram-wrap">
          <div className="marquee speed-300">
            {countries1.map((country) => (
              <span key={country.id} className="monogram">
                <Image
                  src={country.src}
                  className="mx-0"
                  alt={country.alt}
                  width={160}
                  height={70}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="marquee-wrapper style-two monogram-wrap">
          <div className="marquee speed-300">
            {countries2.map((country) => (
              <span key={country.id} className="monogram">
                <Image
                  src={country.src}
                  className="mx-0"
                  alt={country.alt}
                  width={160}
                  height={70}
                />
              </span>
            ))}
          </div>
        </div>

        <Image
          src="/images/frequently-bg.png"
          className="position-absolute top-0 end-0 start-0 z-n1 mx-auto frequently-bg"
          alt="frequently-bg"
          width={760}
          height={826}
        />
      </div>
    </>
  );
};

export default GlobalTransfers;
