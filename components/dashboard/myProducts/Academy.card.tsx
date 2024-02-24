"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import Dropdown from "@/components/reusableComponents/Dropdown";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { deleteAcademy, submitAcademy } from "@/services/backend.services";
import { useDispatch } from "react-redux";
import { genericActions } from "@/store/slices/genericSlice";
import { IAcademy } from "@/utils/type.dt";

interface ComponentProps {
  data: IAcademy;
}

const AcademyCard: React.FC<ComponentProps> = ({ data }) => {
  const [rating, setRating] = useState<string[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { setDeleteModal, setData } = genericActions;
  const [academy, setAcademy] = useState<IAcademy>(data);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [academy.rating]);

  const handleSubmit = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await submitAcademy(academy._id)
          .then((res: any) => {
            setAcademy(res);
            resolve(res);
          })
          .catch((error: any) => reject(error));
      }),
      {
        pending: `Submitting...`,
        success: `Academy submitted successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  const onDelete = () => {
    dispatch(setData({ ...academy }));
    dispatch(setDeleteModal("scale-100"));
  };

  const handleDelete = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const status = await deleteAcademy(academy._id);

        if (status === 200) {
          router.push("/(dashboard)/myProducts");
          resolve();
        } else {
          reject();
        }
      }),
      {
        pending: `Deleting...`,
        success: `Academy deleted successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  return (
    <div
      className="bg-white rounded-lg w-full sm:w-80 md:w-48 h-54
    border-[#EDEDED] border-1 p-2 shadow-[#EDEDED] shadow"
    >
      <div className="">
        <div className="h-28 relative">
          <Image
            width={100}
            height={100}
            className="rounded-lg object-cover h-full w-full"
            src={academy.imageUrl || "/images/general/cardimg.svg"}
            alt="image"
          />

          <div className="absolute top-1 right-2">
            <Dropdown>
              <Link
                href={`/academy/edit/${String(academy._id)}`}
                className="p-1 hover:bg-gray-100 w-full text-left"
              >
                Edit
              </Link>
              <Link
                href={{
                  pathname: `/academy/courses`,
                  query: { academyId: academy._id },
                }}
                className="p-1 hover:bg-gray-100 w-full text-left"
              >
                Add Courses
              </Link>
              {!academy.submitted && (
                <button
                  onClick={handleSubmit}
                  className="p-1 hover:bg-gray-100 w-full text-left"
                >
                  Submit
                </button>
              )}

              <button
                onClick={onDelete}
                className="p-1 hover:bg-gray-100 w-full text-left"
              >
                Delete
              </button>
            </Dropdown>
          </div>
        </div>
        <div className="my-2 p-2 space-y-2">
          <div className="flex items-center justify-between md:md:text-xs gap-4">
            <p className="text-[#4F547B]">{academy.userId.firstName}</p>

            <div className="flex items-center gap-1">
              <p className="text-[#E59819]">{academy.rating}</p>
              <div className="flex items-center">
                {rating.map((itm, i: number) => (
                  <div key={i} className="text-[#E59819]">
                    <IoIosStar />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link className="linkCustom" href={`/academy/${academy._id}`}>
            <div className="md:text-sm font-medium text-[#321463] mt-2 line-clamp-2">
              {academy.name}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AcademyCard;
