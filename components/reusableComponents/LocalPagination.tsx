"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {
  totalPages: number;
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
};

const LocalPagination: React.FC<Props> = ({
  totalPages,
  activePage,
  setActivePage,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (curr: number) => {
    setCurrentPage(curr);
    setActivePage(curr);
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        className={`mr-1 bg-[#C5165D] p-2 rounded-full text-white ${
          currentPage === 1 ? "cursor-not-allowed" : ""
        }`}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`mx-4 ${
            currentPage === i + 1
              ? "font-bold underline text-[#C5165D] "
              : "text-[#321463]"
          }`}
          onClick={() => handleClick(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className={`ml-1 bg-[#E5F0FD] p-2 rounded-full text-[#C5165D] ${
          currentPage === totalPages ? "cursor-not-allowed" : ""
        }`}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default LocalPagination;
