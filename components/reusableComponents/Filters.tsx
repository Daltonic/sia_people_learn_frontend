"use client";

import { formUrlQuery } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface Props {
  label: string;
  options: { name: string; value: string }[];
  type: "filter" | "difficulty";
}

const Filters: React.FC<Props> = ({ label, options, type }) => {
  const [currVal, setCurrVal] = useState<string>(options[0].value);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setCurrVal(value);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: type,
      value,
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="flex gap-2 items-center flex-1 text-sm">
      <label className="text-violet-950 font-medium ">{label}</label>
      <select
        className="text-slate-600 border focus:outline-none border-[color:var(--border-2,#E1DDDD)] w-28 justify-center mt-3 p-3 py-1.5 rounded-lg items-start mb-2"
        value={currVal}
        name="filter"
        onChange={handleChange}
        defaultValue={options[0].value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
