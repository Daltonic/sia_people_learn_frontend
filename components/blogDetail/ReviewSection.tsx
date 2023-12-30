// components/ReviewSection.js
import React from 'react';
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import Button from "@/components/ReusableComponents/Button";
// import { ReviewStruct } from "@/utils/type.dt";



const ReviewSection: React.FC = () => {
    
 return (
    <div className="pt-6">
    <h1 className="text-[#321463] font-semibold text-lg md:text-base"> Reviews</h1>
    <div className="border-b-2 border-[#EEEEEE] flex gap-5 items-start py-5">
        <Image
          width={0}
          height={0}
          src="/images/testimonials/testimonial1.svg"
          alt="image"
          className="w-12 h-12 object-cover rounded-full"
        />
      <div className="space-y-2 md:space-y-3">
        <div className="flex gap-2 items-center">
          <h1 className="text-[#321463] font-medium">
            {" "}
            Brooklyn Simmons
          </h1>
          <p className="md:text-sm text-[#4F547B]">3 Days ago</p>
        </div>
        <div className="text-[#E59819] flex gap-2">
          {[...Array(5)].map((_, index) => (
            <IoIosStar key={index} />
          ))}
        </div>
        <h1 className="text-[#321463] font-medium">
          The best LMS Design
        </h1>
        <p className="text-[#4F547B]">
          Etiam vitae leo et diam pellentesque porta. Sed eleifend
          ultricies risus, vel rutrum erat commodo ut. Praesent
          finibus congue euismod. Nullam scelerisque massa vel augue
          placerat, a tempor sem egestas. Curabitur placerat finibus
          lacus.
        </p>
        <div className="md:flex gap-5">
          <p className='text-[#C5165D] text-sm md:text-md'>Was this review helpful?</p>
          <div className="flex items-center gap-5 mt-2 md:mt-0 font-medium">
            <div>
              <button className='bg-[#C5165D] p-1 px-4 rounded-md text-white'>Yes</button>
            </div>
            <div>
              <button className='bg-[#E5F0FD] p-1 px-4 rounded-md text-[#C5165D]'>No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 );
};

export default ReviewSection;
