import Button from "@/components/reusableComponents/Button";
import InputField from "@/components/reusableComponents/InputField";
import Link from "next/link";

const InstructorForm: React.FC = () => {
  return (
    <form className="">
      <h1 className="text-[#321463] font-medium">Become an Instructor</h1>
      <p className="md:text-sm text-[#4F547B] mb-10">
        Become an instructor and earn from your course sales by clicking this
        button
      </p>

      <Link href="/becomeinstructor">
        <Button variant="pink" type="submit">
          Join Our Team
        </Button>
      </Link>
    </form>
  );
};

export default InstructorForm;
