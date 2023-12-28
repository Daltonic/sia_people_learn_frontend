import Button from "@/components/ReusableComponents/Button";
import InputField from "@/components/ReusableComponents/InputField";
import React from "react";

const PasswordForm: React.FC = () => {

  return (
    <form className="">
        <InputField
          label="Current Password"
          name="currentpassword"
          placeholder="Enter your Current Password"
          required
          inputType="password"
        />
        <InputField
          label="New Password"
          name="newpassword"
          placeholder="Enter your New Password"
          required
          inputType="password"
        />
        <InputField
          label="Confirm New Password"
          name="confirmnew"
          placeholder="Enter your Confirm New Password"
          required
          inputType="number"
        />
        <Button variant="pink" type="submit">Save Password</Button>
    </form>
  );
};

export default PasswordForm;
