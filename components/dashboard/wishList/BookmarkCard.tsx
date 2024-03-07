import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IWishlist } from "@/utils/type.dt";
import { ViewRating } from "@/components/reusableComponents/Rating";
import { toast } from "react-toastify";
import { deleteWishlist } from "@/services/backend.services";
import { useRouter } from "next/navigation";

interface ComponentProps {
  data: IWishlist;
  type: "Course" | "Academy";
}

const BookmarkCard: React.FC<ComponentProps> = ({ data, type }) => {
  const router = useRouter();
  const handleDelete = async (wishlistId: string) => {
    const token = sessionStorage.getItem("accessToken") as string;

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await deleteWishlist(wishlistId, token)
          .then((res: any) => {
            router.refresh();
            resolve(res);
          })
          .catch((error: any) => reject(error));
      }),
      {
        pending: `Deleting...`,
        success: `Wishlist deleted successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  return (
    <div
      className="w-full sm:w-[47%] bg-white rounded-lg border-[#EDEDED] border p-2 pb-0 shadow-[#EDEDED] shadow-md"
      style={{ height: "fit-content" }}
    >
      <div className="md:flex gap-4 relative">
        <Link
          className="md:w-1/3 py-2 linkCustom"
          href={
            type === "Academy"
              ? `/academies/${data.productId.slug}`
              : `/coursedetail/${data.productId.slug}`
          }
        >
          <Image
            width={100}
            height={100}
            className="rounded-lg object-cover h-full w-full"
            src={data.productId?.imageUrl || "/images/general/cardimg.svg"}
            alt="image"
          />
        </Link>

        <div className="my-2 p-2 space-y-3 flex-1">
          <div className="flex justify-between ">
            <div className="flex items-center md:md:text-xs gap-4">
              <ViewRating value={data.productId.rating || 0} />
              <p className="text-[#4F547B]">
                ({data.productId?.reviewsCount || 0})
              </p>
            </div>
            <div
              className="bg-white p-3 rounded-full shadow-md absolute right-0 top-0 cursor-pointer"
              onClick={() => handleDelete(data._id)}
            >
              <Image
                width={100}
                height={100}
                src="/images/dashBoard/dashBoardMain/bookmark.svg"
                alt="image"
                className="object-cover rounded-full w-4 h-4 "
              />
            </div>
          </div>

          <div className="md:text-sm font-medium text-[#321463] mt-2">
            <Link
              className="linkCustom"
              href={
                type === "Academy"
                  ? `/academies/${data.productId.slug}`
                  : `/coursedetails/${data.productId.slug}`
              }
            >
              {data.productId.name}
            </Link>
          </div>
          <div className="flex justify-between items-center my-2 border-b border-[#EDEDED] pb-1">
            {/* <div className="flex items-center">
              <div className="mr-2 md:mr-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/home/coursesCards/icons/1.svg"
                  alt="icon"
                  className="w-5 h-5  md:w-3 md:h-3"
                />
              </div>
              <p className="md:text-xs">{type === "Academy"} lesson</p>
            </div> */}

            <div className="flex items-center">
              <div className="mr-2 md:mr-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/home/coursesCards/icons/2.svg"
                  alt="icon"
                  className="w-5 h-5 md:w-3 md:h-3"
                />
              </div>
              <div className="md:text-xs ">{data.productId.duration} mins</div>
            </div>

            <div className="flex items-start">
              <div className="mr-2 md:mr-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/home/coursesCards/icons/3.svg"
                  alt="icon"
                  className="w-5 h-5  md:w-3 md:h-3"
                />
              </div>
              <div className="md:text-xs">{data.productId.difficulty}</div>
            </div>
          </div>

          <div className="flex justify-between items-center bottom-0 mb-0">
            <div className="flex items-center gap-2">
              {data.productId.userId.imgUrl ? (
                <Image
                  width={10}
                  height={10}
                  src={data.productId.userId.imgUrl}
                  alt="image"
                  className="object-cover rounded-full w-8 h-8"
                />
              ) : (
                <div className="rounded-full w-8 h-8 text-white px-4 bg-[#C5165D] text-sm flex items-center justify-center">
                  {data.productId.userId.firstName[0]}
                  {data.productId.userId.lastName[0]}
                </div>
              )}
              <p className="md:text-xs text-[#4F547B]">
                {data.productId.userId.firstName}{" "}
                {data.productId.userId.lastName}
              </p>
            </div>

            <div className="flex items-center gap-1 font-medium">
              <p className="text-lg md:text-sm text-[#321463]">
                ${data.productId.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
