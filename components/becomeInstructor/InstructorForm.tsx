import InputField from "@/components/reusableComponents/InputField";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Button from "../reusableComponents/Button";
import TextAreaField from "../reusableComponents/TextAreaField";
import { useRouter } from "next/navigation";
import { _useContext } from "@/context/Context";

const Instructorform: React.FC = () => {
  const { user } = _useContext();
  const [instructorDetails, setInstructorDetails] = useState({
    specialization: "",
    linkedIn: "",
    tutorialsLinks: "",
    teachingFocus: "",
  });

  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;

    setInstructorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const { specialization, linkedIn, tutorialsLinks, teachingFocus } =
      instructorDetails;
    const instructorInput = {
      upgradeUserTo: "instructor",
      specialty: specialization,
      linkedInProfile: linkedIn,
      tutorialTitle: teachingFocus,
      samplesLink: tutorialsLinks,
    };

    try {
      const requestDetails = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(instructorInput),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/users/requestUpgrade`,
        requestDetails
      );

      if (response.status === 400) {
        alert("Something went wrong");
      }

      const { msg } = await response.json();
      alert(msg);
      router.push("/(dashboard)/dashboard");
      setInstructorDetails({
        specialization: "",
        tutorialsLinks: "",
        linkedIn: "",
        teachingFocus: "",
      });
    } catch (e: any) {
      console.log(e.message);
      alert(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="sm:flex gap-8">
        <InputField
          label="First Name"
          name="firstname"
          placeholder={user?.firstName!}
          required={false}
          inputType="text"
        />
        <InputField
          label="Last Name"
          name="lastname"
          placeholder={user?.lastName!}
          inputType="text"
          required={false}
        />
      </div>
      <div className="sm:flex gap-8 items-center">
        <div className="sm:w-1/2">
          <InputField
            label="Email"
            name="email"
            placeholder={user?.email!}
            required={false}
            inputType="email"
          />
        </div>
        <div className="sm:w-1/2">
          <InputField
            label="Instructor Specialization"
            name="specialization"
            placeholder="Enter your area of specialization"
            required
            inputType="text"
            value={instructorDetails.specialization}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="sm:flex gap-8">
        <div className="sm:w-1/2">
          <InputField
            label="Previous Tutorials Links"
            name="tutorialsLinks"
            placeholder="Links to previous courses"
            required
            inputType="text"
            value={instructorDetails.tutorialsLinks}
            handleChange={handleChange}
          />
        </div>
        <div className="sm:w-1/2">
          <InputField
            label="Instructor LinkedIn Url"
            name="linkedIn"
            placeholder="Enter your LinkedIn Url"
            required
            inputType="text"
            value={instructorDetails.linkedIn}
            handleChange={handleChange}
          />
        </div>
      </div>
      <TextAreaField
        label="Teaching Focus"
        id="teachingFocus"
        rows={3}
        name="teachingFocus"
        value={instructorDetails.teachingFocus}
        handleChange={handleChange}
      />
      <Button variant="pink" disabled={submitting}>
        {submitting ? "Submitting" : "Join Now"}
      </Button>
    </form>
  );
};

export default Instructorform;
