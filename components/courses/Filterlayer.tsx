import * as React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoFilterSharp } from "react-icons/io5";
import SearchInput from "../reusableComponents/SearchInput";

interface Props {
  searchPlaceholder: string;
  route: string;
}

const Filterlayer: React.FC<Props> = ({ searchPlaceholder, route }) => {
  return (
    <div className="md:flex-row flex flex-col md:items-center justify-between gap-5 mt-5 md:mt-16">
      <div className="text-sm flex gap-2">
        <p className=" text-slate-600">Showing </p>
        <p className="font-medium text-violet-950">250</p>
        <p className=" text-slate-600"> total results</p>
      </div>
      <SearchInput placeholder={searchPlaceholder} route={route} />
      <div className="flex items-center gap-2 md:gap-4">
        <p className="text-violet-950 text-sm font-medium">Sort by:</p>
        <button className="bg-stone-50 flex justify-between gap-5 px-2 md:px-5 py-3 rounded-lg w-fit">
          <p className="text-slate-600 text-sm">Most Popular</p>
          <RiArrowDropDownLine className="" />
        </button>
        <div className="bg-sky-100 text-pink-700 flex items-stretch gap-2.5 px-3 md:px-5 py-3 rounded-lg self-start max-md:px-5 w-fit">
          <IoFilterSharp />
          <p className=" text-sm self-center">Filter</p>
        </div>
      </div>
    </div>
  );
};

export default Filterlayer;
