import BirthdayInput from "@/components/reusableComponents/BirthdayInput";
import InputField from "@/components/reusableComponents/InputField";
import React, { useState } from "react";

const EditProfileForm: React.FC = () => {
  const [birthday, setBirthday] = useState<Date | null>(null);

  const handleBirthdayChange = (date: Date | null) => {
    setBirthday(date);
  };

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
            label="Phone"
            name="Phone"
            placeholder="Enter your Phone Number"
            required
            inputType="number"
          />
        </div>
        <BirthdayInput
          selectedDate={birthday}
          onChange={handleBirthdayChange}
        />
      </div>
      <div className="sm:flex gap-8 ">
        <InputField
          label="State"
          name="state"
          placeholder="Enter your State"
          required
          inputType="text"
        />
        <InputField
          label="Country"
          name="country"
          placeholder="Enter your Country"
          required
          inputType="text"
        />
      </div>
    </form>
  );
};

export default EditProfileForm;
