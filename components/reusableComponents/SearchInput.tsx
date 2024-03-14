"use client";

import { formUrlQuery, removeKeysFromQuery } from "@/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface Props {
  placeholder: string;
  route: string;
}

const SearchInput: React.FC<Props> = ({ route, placeholder }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState<string>(query || "");

  useEffect(() => {
    const delaydebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delaydebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pathname, route, query, router]);

  return (
    <div className="flex gap-5 items-center border border-[#E1DDDD] text-[#4F547B] rounded-md p-3 md:p-2 w-full mb-0 md:w-96">
      <CiSearch className="text-[#4F547B] text-xl" />
      <input
        type="text"
        placeholder={placeholder}
        className="focus:outline-none w-full text-sm bg-transparent"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
