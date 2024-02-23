import React, { useEffect, useState } from "react";
import ReviewSection from "./ReviewSection";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import DashboardHeading from "../dashboardLayout/DashboardHeading";
import { IReviews, RootState } from "@/utils/type.dt";
import EmptyComponent from "@/components/reusableComponents/EmptyComponent";
import Image from "next/image";
import { FaRegFlag } from "react-icons/fa";
import { getTimestamp } from "@/utils";
import { IoIosStar } from "react-icons/io";
import Button from "@/components/reusableComponents/Button";

interface Props {
  id: string;
  type: "Course" | "Academy" | "Book";
  name: string;
}

const ProductReviews: React.FC<Props> = ({ id, type, name }) => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);
  const [productReviews, setProductReviews] = useState<IReviews>({
    reviews: [],
    isNext: false,
    numOfPages: 0,
  });

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

  useEffect(() => {
    const fetchReviews = async () => {
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/reviews?productId=${id}&productType=${type}`,
          requestDetails
        );
        if (response.status === 400) {
          const message = await response.text();
          alert(message);
        } else {
          const { reviews, isNext, numOfPages } =
            (await response.json()) as IReviews;
          setProductReviews({
            reviews,
            isNext,
            numOfPages,
          });
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchReviews();
  }, [id, type]);

  const handleClick = (reviewId: string) => {
    const approveReview = async () => {
      const requestDetails = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/reviews/approve/${reviewId}`,
          requestDetails
        );
        if (response.status === 400) {
          const message = await response.text();
          alert(message);
        } else {
          const message = await response.text();
          alert(message);
        }

        const reviews = productReviews.reviews.map((review) =>
          review._id === reviewId ? { ...review, approved: true } : review
        );
        setProductReviews((prev) => ({ ...prev, reviews }));
      } catch (e: any) {
        console.log(e.message);
      }
    };
    approveReview();
  };

  return (
    <div>
      <DashboardHeading
        title="Product Reviews"
        description={`Read and respond to reviews about your ${type}: ${name}`}
      />

      {productReviews.reviews.length === 0 ? (
        <EmptyComponent title="There are no reviews for this Product" />
      ) : (
        <div className="flex flex-col justify-start gap2">
          {productReviews.reviews.map((review) => (
            <div
              key={review._id}
              className="border-b border-[#EEEEEE] flex gap-5 items-start py-5"
            >
              {review.userId.imgUrl ? (
                <Image
                  width={20}
                  height={10}
                  src={review.userId.imgUrl}
                  alt="image"
                  className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 object-cover rounded-full"
                />
              ) : (
                <div className="text-white bg-[#C5165D] text-[16px] flex items-center justify-center h-10 w-10 p-1 rounded-full">{`${userData?.firstName[0].toUpperCase()}${userData?.lastName[0].toUpperCase()}`}</div>
              )}

              <div className="space-y-2 md:space-y-3 ">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <h1 className="text-[#321463] font-medium">
                      {review.userId.firstName} {review.userId.lastName}
                    </h1>
                    <p className="md:text-sm text-[#4F547B]">
                      {getTimestamp(review.createdAt)}
                    </p>
                  </div>
                  <div className="text-[#6A7A99]">
                    <FaRegFlag />
                  </div>
                </div>
                <div className="text-[#E59819] flex gap-2">
                  {[...Array(5)].map((_, index) => (
                    <IoIosStar key={review.starRating} />
                  ))}
                </div>
                <p className="text-[#4F547B]  md:pr-10">{review.comment}</p>
                <div>
                  {!review.approved && (
                    <Button
                      variant="lightpurple"
                      onClick={() => handleClick(review._id)}
                    >
                      Approve
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
