import BirthdayInput from "@/components/reusableComponents/BirthdayInput";
import InputField from "@/components/reusableComponents/InputField";
import React, { useState } from "react";
import Button from "../reusableComponents/Button";
import TextAreaField from "../reusableComponents/TextAreaField";

const Instructorform: React.FC = () => {

  return (
    <form className="">
      <div className="sm:flex gap-8">
        <InputField
          label="First Name"
          name="firstname"
          placeholder="Enter your First Name"
          required
          inputType="text"
        />
        <InputField
          label="Last Name"
          name="lastname"
          placeholder="Enter your Last Name"
          required
          inputType="text"
        />
      </div>
      <div className="sm:flex gap-8 items-center">
        <div className="sm:w-1/2">
          <InputField
            label="Email"
            name="email"
            placeholder="johnDoe@email.com"
            required
            inputType="email"
          />
        </div>
        <div className="sm:w-1/2">
          <InputField
            label="Instructor Specialization"
            name="specialization"
            placeholder="Enter your area of specializationr"
            required
            inputType="text"
          />
        </div>
       
      </div>
      <div className="sm:flex gap-8">
       <InputField
          label="Previous Tutorials Links"
          name="tutorialsLinks"
          placeholder="Links to previous courses"
          required
          inputType="text"
        />
         <TextAreaField
          label="Teaching Focus"
          id="teachingFocus"
          rows={2}
        />
      </div>
      <Button variant="pink">Join Now</Button>
    </form>
  );
};

export default Instructorform;
