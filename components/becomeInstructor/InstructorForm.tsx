"use client";

import InputField from "@/components/reusableComponents/InputField";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import Button from "../reusableComponents/Button";
import TextAreaField from "../reusableComponents/TextAreaField";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import { RootState, UpgradeUserRequestBody } from "@/utils/type.dt";
import { toast } from "react-toastify";
import { upgradeUserRequest } from "@/services/backend.services";

const Instructorform: React.FC = () => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);
  const [instructorDetails, setInstructorDetails] = useState({
    specialization: "",
    linkedIn: "",
    tutorialsLinks: "",
    teachingFocus: "",
  });

  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

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
      upgradeUserTo: "instructor" as UpgradeUserRequestBody["upgradeUserTo"],
      specialty: specialization,
      linkedInProfile: linkedIn,
      tutorialTitle: teachingFocus,
      samplesLink: tutorialsLinks,
    };
    const token = sessionStorage.getItem("accessToken") as string;

    try {
      await toast.promise(
        new Promise<void>(async (resolve, reject) => {
          const status = await upgradeUserRequest(instructorInput, token);
          if (status === 200 || status === 201) {
            router.push("/(dashboard)/myCourses");
            setInstructorDetails({
              specialization: "",
              tutorialsLinks: "",
              linkedIn: "",
              teachingFocus: "",
            });
            setSubmitting(true);
            resolve();
          } else {
            setSubmitting(false);
            reject();
          }
        }),
        {
          pending: "Submitting...",
          success: "Request submitted in successfully 👌",
          error: "Encountered error 🤯",
        }
      );
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
          placeholder={userData?.firstName!}
          required={false}
          inputType="text"
        />
        <InputField
          label="Last Name"
          name="lastname"
          placeholder={userData?.lastName!}
          inputType="text"
          required={false}
        />
      </div>
      <div className="sm:flex gap-8 items-center">
        <div className="sm:w-1/2">
          <InputField
            label="Email"
            name="email"
            placeholder={userData?.email!}
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
