import { useState } from "react";
import { accordion } from "../../data/accordion";
import { FaMinus, FaPlus } from "react-icons/fa";

interface AccordionItem {
  title: string;
  content: string;
}

const FrequentlyAsked: React.FC<{ items: AccordionItem[] }> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-[#F7F8FB] p-20 mt-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Frequently Asked Questions.
        </h1>
        <p className="text-md mt-3 capitalize text-[#4F547B]">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco
        </p>
      </div>
      <div className="space-y-3 flex flex-col items-center p-5">
        {accordion.map((item, index) => (
          <div key={index} className="rounded-md bg-white w-3/4 p-4">
            <div className="flex center-end h-fit gap-10">
              <div>
              <button
                onClick={() => handleClick(index)}
                className="w-10 p-1 h-10 rounded-full flex justify-center items-center text-[#C5165D] bg-[#E5F0FD]"
              >
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </button>
              
              </div>
              <div>
                <p className="text-violet-950 font-medium"> {item.title}</p>
                <div className="mt-4 text-[#4F547B] text-sm">
              {openIndex === index && <p>{item.content}</p>}
            </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAsked;
