"use client";

import { IAcademies, IWishlist, RootState } from "@/utils/type.dt";
import AcademyCard from "./AcademyCard2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWishlists } from "@/services/backend.services";

interface ComponentProps {
  data: IAcademies;
}

const AcademyLayer: React.FC<ComponentProps> = ({ data }) => {
  const [savedAcademies, setSavedAcademies] = useState<IWishlist[]>([]);

  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) return;

    const fetchSavedAcademies = async () => {
      const token = sessionStorage.getItem("accessToken") as string;

      try {
        const academies = await fetchWishlists(
          { productType: "Academy" },
          token
        );

        if (academies) {
          setSavedAcademies(academies);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchSavedAcademies();
  }, [userData]);
  return (
    <div className="flex flex-col items-stretch mt-10">
      {data.academies.map((academy) => (
        <AcademyCard
          key={academy._id}
          academy={academy}
          bookmarkedAcademies={savedAcademies}
        />
      ))}
    </div>
  );
};

export default AcademyLayer;
