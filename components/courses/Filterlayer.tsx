import * as React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoFilterSharp } from "react-icons/io5";

function Filterlayer() {
  return (
    <div className="md:flex-row flex flex-col md:items-center justify-between gap-5 mt-5 md:mt-20">
      <div className="text-violet-950 text-sm grow whitespace-nowrap my-auto">
        <span className=" text-slate-600">Showing </span>
        <span className="font-medium text-violet-950">250</span>
        <span className=" text-slate-600"> total results</span>
      </div>
      <div className="flex items-center gap-2 md:gap-10">
        <div className="text-violet-950 text-sm font-medium grow whitespace-nowrap my-auto">
          Sort by:
        </div>
        <button className="bg-stone-50 flex justify-between gap-5 px-2 md:px-5 py-3 rounded-lg w-fit">
          <div className="text-slate-600 text-sm">
            Most Popular
          </div>
          <RiArrowDropDownLine  className=""/>
        </button>
        <div className="bg-sky-100 text-pink-700 flex items-stretch gap-2.5 px-3 md:px-5 py-3 rounded-lg self-start max-md:px-5 w-fit">
        <IoFilterSharp />
          <div className=" text-sm self-center grow whitespace-nowrap my-auto">
            Filter
          </div>
        </div>
      </div>
    </div>
  );
}


export default Filterlayer;