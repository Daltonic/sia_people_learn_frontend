"use client";
import React, { useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import Image from "next/image";
import { CourseStruct, IAcademy } from "@/utils/type.dt";
import { FiEdit2 } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ComponentProps {
  academy: IAcademy;
}

const AcademyHead: React.FC<ComponentProps> = ({ academy }) => {
  const router = useRouter();
  const [rating, setRating] = React.useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [academy]);

  const handleSubmit = () => {
    const submitAcademy = async () => {
      const requestDetails = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies/submit/${academy._id}`,
          requestDetails
        );

        if (response.status === 400) {
          alert("Something went wrong");
        }

        const message = await response.text();
        console.log(message);
        alert(message);
        router.push("/(dashboard)/myProducts");
      } catch (e: any) {
        console.log(e.message);
        alert(e.message);
      }
    };

    submitAcademy();
  };

  const handleDelete = () => {
    const deleteAcademy = async () => {
      const requestDetails = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies/delete/${academy._id}`,
          requestDetails
        );

        if (response.status === 400) {
          alert("Something went wrong");
        }

        const message = await response.text();
        console.log(message);
        alert(message);
        router.push("/(dashboard)/myProducts");
      } catch (e: any) {
        console.log(e.message);
        alert(e.message);
      }
    };

    deleteAcademy();
  };

  return (
    <div className="flex flex-col items-start w-full md:w-[60%]">
      <div className="flex items-center justify-between gap-5 max-md:justify-center w-full">
        <div className="flex items-center justify-between gap-5 max-md:justify-center">
          <h1 className="text-violet-950 text-xs font-medium bg-pink-700 px-4 py-2 rounded-full">
            BEST SELLER
          </h1>
          <p className="text-white text-xs font-medium bg-pink-700 px-4 py-2 rounded-full">
            POPULAR
          </p>
        </div>
        <div className="flex items-center justify-between gap-5 max-md:justify-center">
          <Link href={`/academy/edit/${String(academy._id)}`}>
            <button className="text-white flex gap-2 items-center text-xs font-medium bg-green-400 px-4 py-2 rounded-full">
              Edit
              <FiEdit2 />
            </button>
          </Link>

          <button
            onClick={handleSubmit}
            className="text-white flex gap-2 items-center text-xs font-medium bg-pink-400 px-4 py-2 rounded-full"
          >
            Submit
            <FaRegCheckCircle />
          </button>
          <button
            onClick={handleDelete}
            className="text-white flex gap-2 items-center text-xs font-medium bg-pink-400 px-4 py-2 rounded-full"
          >
            Delete
            <FaRegCheckCircle />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 md:gap-5 mt-3 md:mt-0">
        <div className="text-violet-950 text-2xl md:text-3xl font-medium md:leading-10 capitalize self-stretch w-full max-md:max-w-full md:mt-4">
          {academy.description}
        </div>
        <div className="text-[#4F547B] text-base leading-7 self-stretch w-full max-md:max-w-full md:mt-2">
          {academy.name}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:text-sm gap-3">
          <div className="flex items-center gap-2">
            <p className="text-[#E59819]">{academy.rating}</p>
            <div className="flex items-center">
              {rating.map((itm, i: number) => (
                <div key={i} className="text-[#E59819]">
                  <IoIosStar className="md:text-sm text-[#E59819] mx-0.5" />
                </div>
              ))}
            </div>
            <div className="text-[#4F547B]">({academy.reviews.length})</div>
          </div>
          <div className=" flex items-center gap-1">
            <Image
              width={14}
              height={14}
              src="/images/home/coursesCards/icons/4.svg"
              alt="icon"
            />
            <p className="md:text-sm text-[#4F547B]">
              {academy.courses.length} courses in this academy
            </p>
          </div>

          <div className="flex items-center">
            <div className="mr-1">
              <Image
                width={14}
                height={14}
                src="/images/home/coursesCards/icons/2.svg"
                alt="icon"
              />
            </div>
            <div className="md:text-sm text-[#4F547B]">
              Last updated 11/2021
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 mt-2 md:mt-0">
          <Image
            width={0}
            height={0}
            src={
              academy.userId.imgUrl
                ? academy.userId.imgUrl
                : "/images/shape.svg"
            }
            alt="image"
            className="object-cover rounded-full w-10 h-10"
          />
          <p className="md:text-sm text-[#4F547B]">{`${academy.userId.firstName}`}</p>
        </div>
      </div>
    </div>
  );
};

export default AcademyHead;
