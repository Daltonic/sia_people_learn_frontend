import React from "react";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import Button from "@/components/reusableComponents/Button";
import { FaRegFlag } from "react-icons/fa";
// import { ReviewStruct } from "@/utils/type.dt";

const ReviewSection: React.FC = () => {
  return (
    <div>
      <div className="border-b border-[#EEEEEE] flex gap-5 items-start py-5">
        <div className="">
          <Image
            width={20}
            height={10}
            src="/images/testimonials/testimonial1.svg"
            alt="image"
            className="w-56 h-10 md:w-20 md:h-10 object-cover rounded-full"
          />
        </div>
        <div className="space-y-2 md:space-y-3 ">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <h1 className="text-[#321463] font-medium"> Brooklyn Simmons</h1>
              <p className="md:text-sm text-[#4F547B]">3 Days ago</p>
            </div>
            <div className="text-[#6A7A99]">
              <FaRegFlag />
            </div>
          </div>
          <div className="text-[#E59819] flex gap-2">
            {[...Array(5)].map((_, index) => (
              <IoIosStar key={index} />
            ))}
          </div>
          <h1 className="text-[#321463] font-medium">The best LMS Design</h1>
          <p className="text-[#4F547B]  md:pr-10">
            Etiam vitae leo et diam pellentesque porta. Sed eleifend ultricies
            risus, vel rutrum erat commodo ut. Praesent finibus congue euismod.
            Nullam scelerisque massa vel augue placerat, a tempor sem egestas.
            Curabitur placerat finibus lacus.
          </p>
          <div>
            <Button variant="lightpurple">Respond</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
