import InstructorCard from "@/components/becomeInstructor/InstructorCard"
import { teamMembers } from "../../data/instructors";
import Layout from "@/components/layout/Layout";

const Page: React.FC = () => {
  return (
    <Layout>
    <div className="px-20">
     <div className="flex flex-col items-center md:px-5 mt-10">
        <h1 className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
        Instructors
        </h1>
        <p className="text-slate-600 text-center text-md mt-3 capitalize w-full">
        We're on a mission to deliver engaging, curated courses at a reasonable price.
        </p>
      </div>
      <div className="flex justify-between flex-wrap mt-10">
        {teamMembers.slice(0, 12).map((data, i: number) => (
          <InstructorCard data={data} key={i} />
        ))}
      </div>
    </div>
    </Layout>
  )
}



export default Page
