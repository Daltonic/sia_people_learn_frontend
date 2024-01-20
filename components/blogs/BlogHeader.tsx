import React from "react";

interface Props {
  headerHead: string;
  headerBody: string;
}

const BlogHeader: React.FC<Props> = ({ headerBody, headerHead }) => {
  return (
    <div className="mb-10 md:mb-16 px-5 sm:px-0">
      <h1 className="font-bold text-[#321463] text-3xl">{headerHead}</h1>
      <p className="text-[#4F547B] text-lg">{headerBody}</p>
    </div>
  );
};

export default BlogHeader;
