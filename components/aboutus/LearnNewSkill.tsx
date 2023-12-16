import React from "react";
import Button from "../ReusableComponents/Button";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";

const LearnNewSkill: React.FC = ({}) => {
  const backgroundImageUrl = "/images/bitcoin.svg";

  const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: "top",
  };
  return (
    <div className="flex flex-col items-center p-20">
      <div className="flex justify-between">
        <div className="w-[45%]">
          <h1 className="text-violet-950 text-5xl font-bold md:text-4xl">
            <span className="text-pink-700">Learn</span>
            <span className="text-violet-950">
              new skills when and where you like.
            </span>
          </h1>
          <p className="text-violet-950 text-base leading-7 self-stretch mt-5 max-md:max-w-full">
            Use the list below to bring attention to your product's key
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
      <div className="flex items-center justify-between w-3/4 mt-16">
        <Image
          src="/images/bitcoin.svg"
          alt=""
          width={0}
          height={0}
          className="h-full object-cover w-[40%] rounded-lg"
        />

        <div className="w-[45%] ">
          <h1 className="text-violet-950 text-2xl font-bold">
            Become an Instructor
          </h1>
          <p className="text-violet-950 text-base my-4">
            Join millions of people from around the world learning together.
            Online learning is as easy and natural as chatting.
          </p>
          <Link href="/become-instructor" >
          <Button variant="pinkoutline" >
            Apply Now
          </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between w-3/4 mt-16">
       
        <div className="w-[45%] ">
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
          src="/images/bitcoin.svg"
          alt=""
          width={0}
          height={0}
          className="h-full object-cover w-[40%] rounded-lg"
        />
      </div>
    </div>
  );
};

export default LearnNewSkill;
