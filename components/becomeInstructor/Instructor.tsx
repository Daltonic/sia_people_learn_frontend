import Link from "next/link";
import Button from "../reusableComponents/Button";

const Instructor: React.FC = () => {
  return (
    <div className="bg-[#F7F8FB] flex justify-center py-10 px-5 sm:px-10 md:p-20 w-full">
      <div className="w-full md:w-5/6 flex flex-col md:flex-row justify-between md:items-center items-start">
        <div
          className="h-60 rounded-md sm:h-[25rem] border w-full md:w-[25rem] md:rounded-full bg-cover relative bg-[url(/images/instructors/instructor.svg)]"
        >
          <div className="hidden md:block bg-white absolute -bottom-5 -right-10 w-56 pt-10 p-5 rounded-lg">
            <p className="text-md text-[#321463] font-medium">
              “Teaching on Education platform has been an amazing experience”
            </p>
            <p className="text-xs text-[#321463] font-medium">John Doe</p>
            <p className="text-xs text-[#4F547B]">Designer, Apple Inc</p>
          </div>
        </div>
        <div className="w-4/5 md:w-[45%] mt-5 md:mt-0">
          <h1 className="text-violet-950 text-3xl md:text-2xl font-bold">
            Become an Instructor Today
          </h1>
          <p className="text-violet-950 text-base my-4">
            Use the list below to bring attention to your products key
            differentiator.
          </p>
          <Link href="/instructor">
            <Button variant="pinkoutline">Create Account</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
