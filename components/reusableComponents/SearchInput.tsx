import React from 'react';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

interface SearchInputProps {
  onSearchChange: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="flex gap-5 items-center border border-[#E1DDDD] text-[#4F547B] rounded-md p-3 md:p-2 w-full mb-5 md:mb-0 md:w-96">
      <CiSearch className="text-[#4F547B] text-xl" />
      <input
        type="text"
        placeholder="Search..."
        className="focus:outline-none"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchInput;
