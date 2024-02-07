import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchAndFilterBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingOption, setRatingOption] = useState("all");
  const [sortOption, setSortOption] = useState("ascending");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRatingOption(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="md:flex justify-between items-center my-3 md:my-6">
      <div className="flex gap-5 items-center border border-[#E1DDDD] text-[#4F547B] rounded-md p-3 md:p-2 w-full mb-5 md:mb-0 md:w-96">
        <CiSearch className=" text-[#4F547B] text-xl" />
        <input
          type="text"
          placeholder="Search..."
          className="focus:outline-none"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex md:gap-5 items-center justify-between md:justify-normal">
        <select
          value={ratingOption}
          onChange={handleRatingChange}
          className="border border-[#E1DDDD] text-[#4F547B] rounded-md p-3 md:p-2"
        >
          <option value="all">Categories</option>
          <option value="high">High Rating</option>
          <option value="low">Low Rating</option>
        </select>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border border-[#E1DDDD] text-[#4F547B] rounded-md p-3 md:p-2"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;
