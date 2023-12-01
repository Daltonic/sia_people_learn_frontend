import Button from "@/components/ReusableComponents/Button";
import Link from "next/link";
import React from "react";

const Hero: React.FC = () => {
  const backgroundImageUrl = "/images/home/heroImg.svg";

  const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: "top",
  };
  return (
    <section
      style={divStyle}
      className="h-[83vh] mx-10 rounded-2xl bg-cover"
      data-bg="images/heroImage.svg"
    >
      <div className="ml-56 py-20 w-1/3">
        <p className="text-white text-md">Innovate with Web3.</p>
        <h1 className="font-semibold text-[45px] text-white mt-8 leading-[42px]">
          Start Your Blockchain Learning Odyssey Free & Premium.
        </h1>
        <div className="flex gap-4 mt-8">
          <div className="">
           <Link href="/explore">
            <Button variant="pink">Explore Courses</Button>
            </Link>
          </div>
          <div className="">
           <Link href="/hireUs">
            <Button variant="whiteoutline">Hire Us</Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
