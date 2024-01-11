import LearningJourneyItem from "@/components/aboutus/LearningJourneyItem";
import PageHeading from "@/components/becomeInstructor/PageHeading";
import Tabs from "@/components/becomeInstructor/Tabs";
import Footer from "@/components/layout/footers/Footer";
import Header from "@/components/layout/headers/Header";
import { learningJourney } from "../../data/learningPath";
import React from "react";
import Instructor from "@/components/becomeInstructor/Instructor";
import BestInstructors from "@/components/becomeInstructor/BestInstructors";
import { _useContext } from "@/context/Context";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();
  const { user } = _useContext();

  if (!user) {
    router.push("/login");
  }
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-16">
        <PageHeading />
        <Tabs />
        <div className="flex flex-col md:flex-row md:justify-between items-center px-5 sm:px-10 md:px-20">
          {learningJourney.map((item, i: number) => (
            <LearningJourneyItem key={i} item={item} />
          ))}
        </div>
        <Instructor />
        <BestInstructors />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
