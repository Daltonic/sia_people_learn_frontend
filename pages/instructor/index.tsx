import InstructorCard from "@/components/becomeInstructor/InstructorCard";
import { teamMembers } from "../../data/instructors";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

const Page: React.FC = () => {
  return (
    <Layout>
      <div className="px-5 md:px-20">
        <div className="flex flex-col items-center md:px-5 mt-10">
          <h1 className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
            Instructors
          </h1>
          <p className="text-slate-600 text-center text-md mt-3 capitalize w-full">
            We are on a mission to deliver engaging, curated courses at a
            reasonable price.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between flex-wrap mt-10">
          {teamMembers.slice(0, 12).map((data, i: number) => (
            <Link key={i} className="linkCustom w-full md:w-fit" href={`/instructors/${data.id}`}>
              <InstructorCard data={data} />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
