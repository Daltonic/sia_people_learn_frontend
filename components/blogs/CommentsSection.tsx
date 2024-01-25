import { IPost } from "@/utils/type.dt";
import React from "react";

interface Props {
  comments: {
    _id: string;
    name: string;
    category: string;
    imageUrl: string;
    description: string;
    overview: string;
  }[];
}

const CommentsSection: React.FC<Props> = ({ comments }) => {
  return (
    <div className="pt-6">
      <h1 className="text-[#321463] font-semibold text-lg md:text-base">
        Comments
      </h1>
      <div className="pt-4 flex flex-col gap-4">
        {comments.map((comment) => (
          <div key={comment._id}>
            <p className="text-[#321463] font-medium">{comment.overview}</p>
            <p className="text-[#4F547B]">{comment.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
