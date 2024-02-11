"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface Props {
  label: string;
  options: { name: string; value: string }[];
  currFilter: string;
  setCurrFilter: Dispatch<SetStateAction<string>>;
}

const LocalFilters: React.FC<Props> = ({
  label,
  options,
  currFilter,
  setCurrFilter,
}) => {
  const [currVal, setCurrVal] = useState<string>(options[0].value);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setCurrVal(value);
    setCurrFilter(value);
  };
  return (
    <div className="flex w-full my-4  gap-2 items-center">
      <label className="text-violet-950 font-medium w-full">{label}</label>
      <select
        className="text-slate-600 border focus:outline-none border-[color:var(--border-2,#E1DDDD)] w-full justify-center mt-3 p-3 py-1.5 rounded-lg items-start mb-2"
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

export default LocalFilters;
