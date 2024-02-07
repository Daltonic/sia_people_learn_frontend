import React from 'react';
import { GoArrowUpRight } from 'react-icons/go';

interface AllButtonProps {
  children: React.ReactNode;
}

const AllButton: React.FC<AllButtonProps> = ({ children }) => {
  return (
    <button
      className="font-medium text-sm text-center p-3 flex gap-5 hover:-translate-y-0.5 delay-150 duration-300 items-center rounded-md bg-[#6440FB12] text-[#1A064F] hover:text-[#C5165D] border-2 border-transparent hover:border-[#C5165D] hover:bg-transparent w-fit"
    >
      <span className="">{children}</span>
      <GoArrowUpRight className="md:-ml-4 text-lg font-bold" />
    </button>
  );
};

export default AllButton;
