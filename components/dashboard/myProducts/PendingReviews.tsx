import { IReview, IReviews } from "@/utils/type.dt";
import { useState } from "react";
import Image from "next/image";
import { getTimestamp } from "@/utils";
import { ViewRating } from "@/components/reusableComponents/Rating";
import { toast } from "react-toastify";
import { approveReview } from "@/services/backend.services";

interface Props {
  reviewsData: IReviews;
}

const PendingReviews: React.FC<Props> = ({ reviewsData }) => {
  const [reviews, setReviews] = useState<IReview[]>(reviewsData.reviews || []);
  const [showText, setShowText] = useState<boolean>(false);

  const handleApprove = async (reviewId: string) => {
    const token = sessionStorage.getItem("accessToken") as string;
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const status = await approveReview(reviewId, token);

        if (status === 200) {
          resolve();
          const remainingReviews = reviews.filter(
            (review) => review._id !== reviewId
          );
          setReviews(remainingReviews);
        } else {
          reject();
        }
      }),
      {
        pending: `Approving...`,
        success: `Review approved successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  return (
    <>
      {reviews.length > 0 && (
        <div className="mt-4">
          <h1 className="text-[#321463] font-semibold text-lg md:text-base mb-2">
            {" "}
            Pending Reviews
          </h1>
          <div className="flex flex-col gap-2">
            {reviews.map((review) => (
              <div
                className="bg-white border-b-2 border-[#EEEEEE] flex gap-5 items-start py-5 p-2 rounded-lg"
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

                <div className="space-y-2 md:space-y-3 w-full">
                  <div className="flex gap-2 items-center relative">
                    <h1 className="text-[#321463] font-medium">
                      {review.userId.firstName} {review.userId.lastName}
                    </h1>
                    <p className="md:text-sm text-[#4F547B]">
                      {getTimestamp(review.createdAt)}
                    </p>
                    <div
                      className="h-6 w-6 bg-green-900 rounded-full cursor-pointer"
                      onMouseEnter={() => setShowText(true)}
                      onMouseLeave={() => setShowText(false)}
                      onClick={() => handleApprove(review._id)}
                    />
                    {showText && <p>Click to approve</p>}
                  </div>
                  <ViewRating size="small" value={review.starRating} />

                  <p className="text-[#4F547B]">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PendingReviews;
