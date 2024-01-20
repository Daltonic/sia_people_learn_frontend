// components/ReviewForm.js
import React from "react";
import { IoIosStar } from "react-icons/io";
import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";

const ReviewForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="py-3 md:py-6 space-y-2 md:space-y-3">
      <h1 className="text-[#321463] font-medium text-lg">Write a Review</h1>
      <p className="text-[#321463] font-medium">What is it like to Course?</p>
      <div className="text-[#E59819] flex gap-2">
        {[...Array(5)].map((_, index) => (
          <IoIosStar key={index} />
        ))}
      </div>
      <form action="">
        <InputField
          label="Review Title"
          name="review"
          placeholder="Great Courses"
          required
          inputType="text"
        />
        <label htmlFor="message" className="text-violet-950 font-medium">
          Review Content
        </label>
        <textarea
          id="message"
          rows={4}
          cols={50}
          className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)] w-full justify-center mt-3 p-3 md:pl-6 py-3 rounded-lg items-start mb-2"
        ></textarea>
        <Button variant="pink" onSubmit={handleSubmit}>
          Submit Review
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
