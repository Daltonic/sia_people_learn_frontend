"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { IoIosStar } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import Link from "next/link";
import { ICourses } from "@/utils/type.dt";

interface ComponentProps {
  data: ICourses;
}

const CourseLayer: React.FC<ComponentProps> = ({ data }) => {
  const [rating, setRating] = React.useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [data]);

  return (
    <div className="flex flex-col items-stretch mt-10">
      {data.courses.map((course) => (
        <Link
          key={course._id}
          href={`/coursedetail/${course._id}`}
          className="border-b border-[#EDEDED] py-5"
        >
          <div className="w-full">
            <div className=" flex md:flex-row flex-col">
              <div className="flex flex-col items-stretch md:w-4/5">
                <div className="">
                  <div className="flex md:flex-row flex-col items-start">
                    <div className="flex flex-col items-stretch w-full h-36 md:w-[28%]">
                      <Image
                        width={500}
                        height={500}
                        style={{ height: "100%", width: "100%" }}
                        className="rounded-md object-cover"
                        src={course.imageUrl || "/images/cardimg.svg"}
                        alt="image"
                      />
                    </div>
                    <div className="md:ml-3 flex flex-col items-stretch md:w-[70%] mt-3 md:mt-0">
                      <div className="flex flex-col gap-1.5 my-auto md:px-5 items-start">
                        <div className="flex items-center text-sm gap-3">
                          <div className="flex items-center gap-1">
                            <p className="text-[#E59819]">{course.rating}</p>
                            <div className="flex items-center">
                              {rating.map((itm, i: number) => (
                                <div key={i} className="text-[#E59819]">
                                  <IoIosStar className="text-sm text-[#E59819] mx-0.5" />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="text-[#4F547B]">
                            ({course.reviewsCount})
                          </div>
                        </div>
                        <div className="text-violet-950 text-lg font-medium capitalize self-stretch md:w-[80%]">
                          {course.name}
                        </div>
                        <div className="text-slate-600 text-sm leading-6 self-stretch line-clamp-1">
                          {course.description}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          {course.userId.imgUrl ? (
                            <Image
                              width={10}
                              height={10}
                              src={course.userId.imgUrl || "/images/courseCard/card1.svg"}
                              alt="image"
                              className="object-cover rounded-full w-8 h-8"
                            />
                          ) : (
                            <div className="rounded-full w-8 h-8 text-white px-4 bg-[#C5165D] text-sm flex items-center justify-center">
                              {course.userId.firstName[0]}
                              {course.userId.lastName[0]}
                            </div>
                          )}
                          <p className="text-sm text-[#4F547B]">
                            {course.userId.firstName} {course.userId.lastName}
                          </p>

                          <div className=" flex items-center gap-1">
                            <Image
                              width={14}
                              height={14}
                              src="/images/home/coursesCards/icons/1.svg"
                              alt="icon"
                            />
                            <p className="text-sm text-[#4F547B]">
                              {course.lessons?.length || 0} lesson
                              {course.lessons?.length !== 1 ? "s" : ""}
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
                            <div className="text-sm text-[#4F547B]">{`${Math.floor(
                              course.duration / 60
                            )}h ${Math.floor(course.duration % 60)}m`}</div>
                          </div>
                          <div className="flex items-center">
                            <div className="mr-1">
                              <Image
                                width={14}
                                height={14}
                                src="/images/home/coursesCards/icons/3.svg"
                                alt="icon"
                              />
                            </div>
                            <div className="text-sm text-[#4F547B]">
                              {course.difficulty}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col md:pl-5 my-auto items-center justify-between md:justify-normal md:items-end md:border-l md:border-[#EDEDED]">
                <div className="">
                  {course.price ? (
                    <div className="flex md:flex-col items-center gap-2 md:items-end">
                      <p className="text-sm text-[#4F547B] line-through">
                        ${course.price}
                      </p>
                      <p className="text-2xl  text-[#321463]">
                        ${course.price}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div></div>
                      <div>Free</div>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-between gap-5 mt-3">
                  <button className="text-pink-700 font-medium bg-violet-600 bg-opacity-10 justify-center h-12 px-3 rounded-lg ">
                    Add to cart
                  </button>
                  <div className="w-12 h-12 flex justify-center items-center rounded-full bg-[#F9F9F9]">
                    <FiHeart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CourseLayer;
