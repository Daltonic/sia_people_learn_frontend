import Link from "next/link";
import Button from "../ReusableComponents/Button";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";
import { teamMembers } from "../../data/instructors";

interface TeamMember {
    id: number;
    name: string;
    role: string;
    rating: number;
    students: number;
    courses: number;
    image: string;
    socialProfile: {
      url: string;
      icon: string;
    }[];
   }
   
   interface TeamMembersProps {
    teamMembers: TeamMember[];
   }

const BestInstructors: React.FC<TeamMembersProps> = () => {
  return (
    <div className="p-20">
      <div className="md:flex justify-between items-center w-full">
        <div className=" ">
          <h2 className="text-[#321463] font-bold text-3xl md:text-2xl">
          Learn from the best instructors
          </h2>
          <p className="text-[#4F547B] text-sm">
          Lorem ipsum dolor sit amet, consectetur.
          </p>
        </div>

        <div className="">
          <Link
            href="/blog"
            className="font-medium text-sm text-center px-3 flex items-center rounded-md bg-[#6440FB12] hover:text-[#1A064F]  text-[#C5165D]-2 border-transparent hover:border-[#C5165D] hover:bg-transparent w-fit"
          >
            <Button className=""> View All İnstructors</Button>
            <GoArrowUpRight className="md:-ml-4 text-lg font-bold" />
            <i className="icon-arrow-top-right text-13 ml-10"></i>
          </Link>
        </div>
      </div>
      <div className="flex justify-between flex-wrap mt-10">
     {teamMembers.slice(0, 4).map((elm, i) => (
       <div key={i} className="w-full sm:w-64">
         <div className="relative">
            <div className="w-full h-72">
           <Image
             width={0}
             height={0}
             src={elm.image}
             alt="image"
             className="w-full h-full object-cover rounded-lg"
           />
           </div>
           <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
             {elm.socialProfile?.map((itm, i) => (
               <Link key={i} href={itm.url ? itm.url : "#"}>
                <i className={`${itm.icon} text-white`}></i>
               </Link>
             ))}
           </div>
         </div>
         <div className="mt-2">
           <h4 className="font-bold">
             <Link href={`/instructors/${elm.id}`}>
                <p className="font-medium text-[#321463] text-lg">
               {elm.name}
               </p>
             </Link>
           </h4>
           <p className="text-sm text-[#4F547B] mt-2">{elm.role}</p>
           <div className="flex items-center text-[#4F547B] text-xs mt-2">
             <div className="flex items-center mr-5">
               <div className="text-yellow-500 mr-2">★</div>
               <p className="">{elm.rating}</p>
             </div>
             <div className="flex items-center mr-5">
               <div className="text-yellow-500  mr-2">👨‍💻</div>
               <p className="">{elm.students} Students</p>
             </div>
             <div className="flex items-center">
               <div className="text-yellow-500  mr-2">🎓</div>
               <p className="">{elm.courses} Courses</p>
             </div>
           </div>
         </div>
       </div>
     ))}
   </div>
    </div>
  );
};

export default BestInstructors;
