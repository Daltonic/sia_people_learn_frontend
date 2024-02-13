import { categories } from "@/data/blogs";
import { formUrlQuery, removeKeysFromQuery } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const CategoryFilters: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState("All Categories");

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (category: string) => {
    if (category === "All Categories") {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
      router.push(newUrl, { scroll: false });
    } else {
      setCurrentCategory(category);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="flex md:justify-center flex-wrap md:gap-3">
      {categories.map((elm, i: number) => (
        <button
          key={i}
          className={`rounded-md p-3 md:p-4 text-[#4F547B] ${
            currentCategory === elm
              ? "bg-[#6440FB12] is-active text-[#C5165D]"
              : ""
          }`}
          data-tab-target=".-tab-item-1"
          type="button"
          onClick={() => handleClick(elm)}
        >
          {elm}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters;
