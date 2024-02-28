import React, { SyntheticEvent, useEffect, useState } from "react";
import Button from "@/components/reusableComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import { RootState } from "@/utils/type.dt";
import { CreateRating } from "../reusableComponents/Rating";
import { toast } from "react-toastify";
import { createReview } from "@/services/backend.services";

interface Props {
  productId?: string;
  productType?: "Course" | "Academy";
}

const ReviewForm: React.FC<Props> = ({ productId, productType }) => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(4);

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
            console.log(res);
            setComment("");
            setRating(4);
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
    <div className="py-3 md:py-6 space-y-2 md:space-y-3">
      <h1 className="text-[#321463] font-medium text-lg">Create a Review</h1>

      <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
        <CreateRating value={rating} size="small" handleChange={setRating} />
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
  );
};

export default ReviewForm;
