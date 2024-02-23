// components/ReviewForm.js
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import { RootState } from "@/utils/type.dt";

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
  const [reviewDetails, setReviewDetails] = useState({
    comment: "",
    rating: 3,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setReviewDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { comment, rating } = reviewDetails;

    const reviewInput = {
      productId,
      productType: productType || "Course",
      comment,
      starRating: Number(rating),
    };

    const requestDetails = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(reviewInput),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/reviews/create`,
        requestDetails
      );

      if (response.status === 400) {
        const message = await response.text();
        alert(message);
      } else {
        const review = await response.json();
        console.log(review);
        alert("Your review has been created");
        setReviewDetails({
          comment: "",
          rating: 3,
        });
      }
    } catch (e: any) {
      alert(e);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="py-3 md:py-6 space-y-2 md:space-y-3">
      <h1 className="text-[#321463] font-medium text-lg">Write a Review</h1>
      <p className="text-[#321463] font-medium">What is it like to Course?</p>
      {/* <div className="text-[#E59819] flex gap-2">
        {[...Array(5)].map((_, index) => (
          <IoIosStar key={index} />
        ))}
      </div> */}
      <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
        {/* <InputField
          label="Review Title"
          name="review"
          placeholder="Great Courses"
          required
          inputType="text"
        /> */}
        <input
          type="number"
          min={1}
          max={5}
          placeholder={String(reviewDetails.rating)}
          onChange={handleChange}
          name="rating"
          value={reviewDetails.rating}
        />
        <label htmlFor="message" className="text-violet-950 font-medium">
          Review Comment
        </label>
        <textarea
          id="message"
          rows={4}
          cols={50}
          name="comment"
          placeholder="Great content"
          value={reviewDetails.comment}
          onChange={handleChange}
          className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)] w-full justify-center mt-3 p-3 md:pl-6 py-3 rounded-lg items-start mb-2"
        ></textarea>
        <Button variant="pink" type="submit">
          {submitting ? "Creating" : "Create Review"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
