import React from "react";
import { learningJourney } from "../../data/learningPath";
import LearningJourneyItem from "./LearningJourneyItem";

interface LearningJourneyProps {
 id: number;
 title: string;
 text: string;
 imageSrc: string;
 delay: number;
}

const LearningJourney: React.FC = ({
}) => {
 return (
   <section className="h-full mb-40 ">
   <div className="bg-black px-16 h-80 py-20 flex items-center flex-col">
         <div className="text-white text-center">
           <h2 className="text-3xl md:text-4xl font-bold">Start your Learning Journey Today!</h2>
           <p className="text-md mt-3 capitalize w-full">Your learning description</p>
         </div>
       <div className="flex gap-8 mt-10 -bottom-20">
         {learningJourney.map((item: LearningJourneyProps, i: number) => (
           <LearningJourneyItem key={i} item={item} />
         ))}
       </div>
   </div>
   </section>
 );
};

export default LearningJourney;
