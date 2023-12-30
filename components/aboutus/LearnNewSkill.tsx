import React from "react";
import Button from "../ReusableComponents/Button";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";

const LearnNewSkill: React.FC = ({}) => {
  const backgroundImageUrl = "/images/instructors/instructor1.svg";

  const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: "top",
  };
  return (
    <div className="flex flex-col items-center pt-10 px-5 md:p-20">
      <div className="hidden md:flex justify-between">
        <div className="w-[45%]">
          <h1 className="text-violet-950 text-5xl font-bold md:text-4xl">
            <span className="text-pink-700">Learn</span>
            <span className="text-violet-950">
              new skills when and where you like.
            </span>
          </h1>
          <p className="text-violet-950 text-base leading-7 self-stretch mt-5 max-md:max-w-full">
            Use the list below to bring attention to your products key
            differentiator.
          </p>
          <Button variant="pink">Join Free</Button>
        </div>
        <div>
          <div
            style={divStyle}
            className="h-[55vh] border w-[20vw] rounded-xl bg-cover relative"
          >
            <div className="bg-black text-white absolute -left-40 top-28 w-54 p-5 rounded-lg">
              <div className="flex gap-2 items-center mb-2">
                <div className="bg-[#C5165D] rounded-full text-[10px] p-1 text-white">
                  <FaCheck />
                </div>
                <p className="text-xs">Hand-picked authors</p>
              </div>
              <div className="flex gap-2 items-center mb-2">
                <div className="bg-[#C5165D] rounded-full text-[10px] p-1 text-white">
                  <FaCheck />
                </div>
                <p className="text-xs">Easy to follow curriculum</p>
              </div>
              <div className="flex gap-2 items-center mb-2">
                <div className="bg-[#C5165D] rounded-full text-[10px] p-1 text-white">
                  <FaCheck />
                </div>
                <p className="text-xs">Free courses</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-[#C5165D] rounded-full text-[10px] p-1 text-white">
                  <FaCheck />
                </div>
                <p className="text-xs">Money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between md:w-3/4 md:mt-16">
        <Image
          src="/images/instructors/instructor3.svg"
          alt=""
          width={0}
          height={0}
          className="md:h-full object-cover w-full md:w-[40%] rounded-lg mb-5 md:mb-0"
        />

        <div className="md:w-[45%] ">
          <h1 className="text-violet-950 text-2xl font-bold">
            Become an Instructor
          </h1>
          <p className="text-violet-950 text-base my-4">
            Join millions of people from around the world learning together.
            Online learning is as easy and natural as chatting.
          </p>
          <Link href="/becomeinstructor" >
          <Button variant="pinkoutline" >
            Apply Now
          </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col-reverse mb-16 md:mb-0 md:flex-row items-center justify-between md:w-3/4 mt-10 gap-5 md:gap-0 md:mt-16">
       
        <div className="md:w-[45%] ">
          <h1 className="text-violet-950 text-2xl font-bold">
          Become a Student
          </h1>
          <p className="text-violet-950 text-base my-4">
            Join millions of people from around the world learning together.
            Online learning is as easy and natural as chatting.
          </p>
          <Button variant="pinkoutline"  >
            Apply Now
          </Button>
        </div>
        <Image
          src="/images/instructors/instructor4.svg"
          alt=""
          width={0}
          height={0}
          className="md:h-full object-cover w-full md:w-[40%] rounded-lg"
        />
      </div>
    </div>
  );
};

export default LearnNewSkill;
