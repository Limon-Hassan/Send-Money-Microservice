import React from "react";
import Image from "next/image";

const AnimatedText = () => {
  // Define the marquee items pattern
  const marqueePattern = [
    { type: "text", content: "Better Exchange Rates" },
    { type: "image", src: "/images/monogram1.png", alt: "monogram" },
    { type: "text", content: "Fast Transfers Worldwide" },
    { type: "image", src: "/images/monogram1.png", alt: "monogram" },
    { type: "text", content: "Secure Money Transfers" },
    { type: "image", src: "/images/monogram1.png", alt: "monogram" },
    { type: "text", content: "Instant Currency Conversion" },
    { type: "image", src: "/images/monogram1.png", alt: "monogram" },
    { type: "text", content: "Trusted by Millions" },
    { type: "image", src: "/images/monogram1.png", alt: "monogram" },
  ];

  return (
    <>
      <div className="marquee-wrapper monogram-wrap py-4">
        <div className="marquee speed-300">
          {marqueePattern.map((item, index) => (
            <span key={index} className="monogram">
              {item.type === "text" ? (
                item.content
              ) : (
                <Image
                  src={item.src ?? ""}
                  alt={item.alt ?? ""}
                  width={79}
                  height={80}
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimatedText;
