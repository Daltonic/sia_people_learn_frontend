import InputField from "@/components/reusableComponents/InputField";
import SelectField from "@/components/reusableComponents/SelectField";
import TextAreaField from "@/components/reusableComponents/TextAreaField";
import React, { useState } from "react";

const CourseForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");

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
            placeholder="Learn Figma - UI/UX Design Essential Training"
            required
            inputType="text"
          />
          <InputField
            label="Overview"
            name="description"
            placeholder="Description"
            required
            inputType="text"
            style={{ height: "80px" }}
          />
          <TextAreaField label="Short Description" id="shortDesc" />
          <TextAreaField label="Description" id="courseDesc" />
          <div className="md:flex gap-8">
            <TextAreaField
              label="What will students learn in your course?"
              id="learn"
            />
            <TextAreaField label="Requirements" id="requirement" />
          </div>
          <div className="md:flex gap-8">
            <SelectField
              label="Course Level"
              options={[
                { label: "Beginner", value: "option1" },
                { label: "Expert", value: "option2" },
                { label: "Intermediate", value: "option3" },
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
        </form>
      </div>
  );
};

export default CourseForm;
