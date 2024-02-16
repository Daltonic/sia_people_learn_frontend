import React from "react";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditProfileForm from "./EditProfileForm";

const EditProfile: React.FC = () => {
  return (
    <div className="">
      <div className="border-b border-[#EEEEEE] flex gap-5 items-start py-5">
        <div className="">
          <Image
            width={100}
            height={100}
            src="/images/testimonials/testimonial1.svg"
            alt="image"
            className="md:w-10 md:h-10 object-cover rounded-full"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-[#321463] font-medium">Your avatar</h1>
          <p className="md:text-sm text-[#4F547B]">
            PNG or JPG no bigger than 800px wide and tall.
          </p>
          <div className="flex gap-4">
            <div className="bg-[#F7F8FB] p-2 w-fit rounded-md">
              <IoCloudUploadOutline />
            </div>
            <div className="bg-[#F7F8FB] p-2 w-fit rounded-md">
              <RiDeleteBin6Line />
            </div>
          </div>
        </div>
      </div>
      <EditProfileForm/>
    </div>
  );
};

export default EditProfile;
