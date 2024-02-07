import Link from "next/link";
import Button from "../reusableComponents/Button";
import { GoArrowUpRight } from "react-icons/go";
import { teamMembers } from "../../data/instructors";
import InstructorCard from "./InstructorCard";

const BestInstructors: React.FC = () => {
  return (
    <div className="md:p-20 sm:p-10 p-5">
      <div className="flex flex-col gap-3 md:flex-row justify-between md:items-center w-full">
        <div className="space-y-2 md:space-y-0 ">
          <h2 className="text-[#321463] font-bold text-3xl md:text-2xl">
            Learn from the best instructors
          </h2>
          <p className="text-[#4F547B] text-sm">
            Master Web3 and Blockchain with top-notch instructors at Dapp
            Mentors Academy.
          </p>
        </div>

        <div className="">
          <Link
            href="/instructor"
            className="font-medium text-sm text-center py-2 px-3 flex items-center rounded-md bg-[#6440FB12] hover:text-[#1A064F]  text-[#C5165D] border-transparent hover:border-[#C5165D] hover:bg-transparent w-fit"
          >
            <Button className=""> View All instructors</Button>
            <GoArrowUpRight className="md:-ml-4 text-lg font-bold" />
            <i className="icon-arrow-top-right text-13 ml-10"></i>
          </Link>
        </div>
      </div>
      <div className="flex justify-between flex-wrap mt-10">
        {teamMembers.slice(0, 4).map((data, i: number) => (
          <InstructorCard user={data} key={i} />
        ))}
      </div>
    </div>
  );
};

export default BestInstructors;
