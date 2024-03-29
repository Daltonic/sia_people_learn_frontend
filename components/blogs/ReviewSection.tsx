"use client";

import React, { SyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
import { IReview, IReviews, IUser, RootState } from "@/utils/type.dt";
import { getTimestamp } from "@/utils";
import { CreateRating, ViewRating } from "../reusableComponents/Rating";
import { toast } from "react-toastify";
import { createReview } from "@/services/backend.services";
import Button from "@/components/reusableComponents/Button";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";

interface Props {
  reviewsData?: IReviews;
  productId?: string;
  productType?: "Course" | "Academy";
  showReviewForm?: boolean;
}

const ReviewSection: React.FC<Props> = ({
  reviewsData,
  productId,
  productType,
  showReviewForm = false,
}) => {
  const [reviews, setReviews] = useState<IReview[]>(reviewsData?.reviews || []);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const { setUserData } = userActions;
  const dispatch = useDispatch();

  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
        checkShowForm(sessionUser);
      }
    }
    checkShowForm(userData!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, productType, setUserData, userData]);

  const [showForm, setShowForm] = useState<boolean>(false);

  const checkShowForm = (user: IUser) => {
    if (!user) return;
    const reviewedProducts =
      productType === "Academy"
        ? user?.reviewedAcademies || []
        : user?.reviewedCourses || [];

    const reviewed = reviewedProducts.includes(productId!);

    setShowForm(showReviewForm && !reviewed);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const token = sessionStorage.getItem("accessToken") as string;

    const reviewData = {
      productId,
      productType: productType || "Course",
      comment,
      starRating: Number(rating),
    };

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await createReview(reviewData, token)
          .then((res) => {
            setShowForm(false);
            const newReview = {
              ...res,
              userId: {
                _id: userData?._id,
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                imgUrl: userData?.imgUrl,
                username: userData?.username,
              },
            };
            setReviews((prev) => [newReview, ...prev]);

            let reviewedAcademies =
              userData?.reviewedAcademies || ([] as string[]);
            let reviewedCourses = userData?.reviewedCourses || ([] as string[]);

            if (productType === "Academy") {
              reviewedAcademies = [...reviewedAcademies, productId!];
            } else {
              reviewedCourses = [...reviewedCourses, productId!];
            }

            const user = { ...userData!, reviewedAcademies, reviewedCourses };
            sessionStorage.setItem("user", JSON.stringify(user));
            setUserData(user);
            setSubmitting(false);
            resolve(res);
          })
          .catch((error) => {
            setSubmitting(false);
            reject(error);
          });
      }),
      {
        pending: `Saving your review...`,
        success: `Review saved successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  return (
    <div className="pt-6">
      {showForm && (
        <div className="py-3 md:py-6 space-y-2 md:space-y-3">
          <h1 className="text-[#321463] font-medium text-lg">
            Create a Review
          </h1>

          <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
            <CreateRating
              value={rating}
              size="small"
              handleChange={setRating}
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-violet-950 font-medium">
                Drop your comment
              </label>
              <textarea
                id="message"
                rows={4}
                cols={50}
                name="comment"
                placeholder="Great content"
                value={comment}
                onChange={(e) => setComment(e.currentTarget.value)}
                className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)] w-full justify-center mt-3 p-3 md:pl-6 py-3 rounded-lg items-start mb-2"
              />
            </div>

            <Button variant="pink" type="submit">
              {submitting ? "Creating" : "Create Review"}
            </Button>
          </form>
        </div>
      )}
      <>
        {reviews.length > 0 && (
          <>
            <h1 className="text-[#321463] font-semibold text-lg md:text-base">
              {" "}
              Reviews
            </h1>
            <div className="flex flex-col gap-2">
              {reviews.map((review) => (
                <div
                  className="border-b-2 border-[#EEEEEE] flex gap-5 items-start py-5"
                  key={review._id}
                >
                  {review.userId.imgUrl ? (
                    <Image
                      width={100}
                      height={100}
                      src={review.userId.imgUrl}
                      alt="image"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  ) : (
                    <div className="rounded-full w-10 h-10 text-white px-4 bg-[#C5165D] text-[16px] flex items-center justify-center">
                      {review.userId.firstName[0]}
                      {review.userId.lastName[0]}
                    </div>
                  )}

                  <div className="space-y-2 md:space-y-3">
                    <div className="flex gap-2 items-center">
                      <h1 className="text-[#321463] font-medium">
                        {review.userId.firstName} {review.userId.lastName}
                      </h1>
                      <p className="md:text-sm text-[#4F547B]">
                        {getTimestamp(review.createdAt)}
                      </p>
                    </div>
                    <ViewRating size="small" value={review.starRating} />

                    <p className="text-[#4F547B]">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default ReviewSection;
