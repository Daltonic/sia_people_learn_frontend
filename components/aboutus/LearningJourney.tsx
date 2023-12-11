import React from "react";
import { learningJourney } from "../../data/learningPath";
import Image from "next/image";

interface LearningJourneyProps {
  title: string;
  description: string;
}

interface LearningJourneyItem {
  id: number;
  title: string;
  text: string;
  imageSrc: string;
  delay: number;
}

const LearningJourney: React.FC<LearningJourneyProps> = ({
  title,
  description,
}) => {
  return (
    <section className="h-full mb-40 ">
    <div className="bg-black px-16 h-80 py-20 flex items-center flex-col">
          <div className="text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
            <p className="text-md mt-3 capitalize w-full">{description}</p>
          </div>
        <div className="flex gap-8 mt-10 -bottom-20">
          {learningJourney.map((elm: LearningJourneyItem) => (
            <div key={elm.id} >
              <div data-aos="fade-right" data-aos-duration={elm.delay * 250}className="bg-white shadow-md shadow-slate-200 w-64 h-64 flex flex-col items-center text-center px-8 py-10 rounded-md">
                <div>
                  <Image
                    width={60}
                    height={60}
                    src={elm.imageSrc}
                    alt={elm.title}
                  />
                </div>
                <div className="mt-5">
                  <h5 className="text-violet-950 text-lg font-medium">{elm.title}</h5>
                  <p className="text-slate-600 text-sm mt-2">{elm.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
    </section>
  );
};

export default LearningJourney;
