"use client";

import { formUrlQuery } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {
  totalPages: number;
};

const Pagination = ({ totalPages }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  const paginate = (page: number) => {
    setCurrentPage(page);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: page.toString(),
    });

    router.push(newUrl);
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
          onClick={() => paginate(i + 1)}
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

export default Pagination;
