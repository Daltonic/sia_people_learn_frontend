import InstructorCard from "@/components/becomeInstructor/InstructorCard";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import Button from "@/components/reusableComponents/Button";
import { IUsers } from "@/utils/type.dt";
import { fetchUsers } from "@/services/backend.services";
import { GetServerSidePropsContext } from "next";

const Page: React.FC<{ usersData: IUsers }> = ({ usersData }) => {
  return (
    <Layout>
      <div>
        <div className="px-5 sm:px-10 md:px-20">
          <div className="flex flex-col items-center md:px-5 mt-10">
            <h1 className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
              Instructors
            </h1>
            <p className="text-slate-600 text-center text-md mt-3 capitalize w-full">
              Meet our dedicated instructors, experts in Blockchain and Web3
              Development.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap mt-10">
            {usersData?.users &&
              usersData.users.map((data, i: number) => (
                <Link
                  key={i}
                  className="linkCustom w-full sm:w-fit"
                  href={`/instructors/${data?._id}`}
                >
                  <InstructorCard user={data} />
                </Link>
              ))}
          </div>
        </div>
        <div className="bg-[#242239] px-5 sm:px-10 py-16 flex md:justify-center bg-[url('/images/instructors/instructorbg.svg')] bg-cover">
          <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between md:w-4/5 md:items-center">
            <div className="font-medium">
              <h4 className="text-white text-2xl">Become an Instructor at</h4>
              <p className="text-[#C5165D] text-xl">PeopleLearn</p>
            </div>
            <Link href="/signup">
              <Button variant="pink">Create Account</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.accessToken;
  try {
    const users = await fetchUsers({ userType: "instructor" }, token);

    return {
      props: {
        usersData: JSON.parse(JSON.stringify(users)),
      },
    };
  } catch (e: any) {
    console.log(e);
    return {
      props: {
        usersData: {} as IUsers,
      },
    };
  }
};
