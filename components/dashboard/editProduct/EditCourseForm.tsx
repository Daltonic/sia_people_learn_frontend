import InputField from "@/components/reusableComponents/InputField";
import SelectField from "@/components/reusableComponents/SelectField";
import TextAreaField from "@/components/reusableComponents/TextAreaField";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import React, { useEffect, useState } from "react";
import { RootState } from "@/utils/type.dt";

const EditCourseForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

  const handleChange = (value: any) => {
    setSelectedOption(value);
  };
  return (
    <div className="bg-white rounded-lg ">
      <h1 className="p-5 text-[#321463] font-medium border-b border-[#EDEDED] text-xl md:text-base">
        Basic Information
      </h1>
      <form action="" className="p-5">
        <InputField
          label="Title"
          name="title"
          placeholder="Enter your course title"
          required
          inputType="text"
        />
        <div className="md:flex gap-8">
          <TextAreaField label="Description" id="description" />
          <TextAreaField label="Overview" id="overview" />
        </div>
        <div className="md:flex gap-8">
          <InputField
            label="Price"
            name="price"
            placeholder="Course Price"
            required
            inputType="number"
          />
          <InputField
            label="ImageURL"
            name="imageURL"
            placeholder="Enter your ImageURL"
            required
            inputType="text"
          />
        </div>
        <div className="md:flex gap-8">
          <SelectField
            label="Course Level"
            options={[
              { label: "Beginner", value: "option1" },
              { label: "Intermediate", value: "option2" },
              { label: "Advance", value: "option3" },
            ]}
            value={selectedOption}
            onChange={handleChange}
          />
          <SelectField
            label="Audio Language"
            options={[{ label: "English", value: "option1" }]}
            value={selectedOption}
            onChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <SelectField
            label=" Product Type"
            options={[
              { label: "Select", value: "option1" },
              { label: "Course", value: "course" },
              { label: "Academy", value: "academy" },
              { label: "Book", value: "book" },
            ]}
            value={selectedOption}
            onChange={handleChange}
          />
          <SelectField
            label="Course Category*"
            options={[
              { label: "Select", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
            value={selectedOption}
            onChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <TextAreaField
            label="What will students learn in your course?"
            id="learn"
          />
          <TextAreaField label="Requirements" id="requirement" />
        </div>
      </form>
    </div>
  );
};

export default EditCourseForm;
