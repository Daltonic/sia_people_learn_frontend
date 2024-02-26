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
      <hr />
      <h1 className="text-[#321463] font-semibold text-lg md:text-base">
        Comments
      </h1>
      <div className="pt-4 flex flex-col gap-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="border-solid border-2 border-slate-50 p-4 rounded-lg"
          >
            <p className="text-[#321463] font-medium">{comment.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
