import Button from "@/components/ReusableComponents/Button";
import InputField from "@/components/ReusableComponents/InputField";

const CloseAcctForm: React.FC = () => {
  return (
    <form className="">
      <h1 className="text-[#321463] font-medium">Close account</h1>
      <p className="md:text-sm text-[#4F547B]">
        Warning: If you close your account, you will be unsubscribed from all
        your 5 courses, and will lose access forever.
      </p>

      <InputField
        label="Enter Password"
        name="password"
        placeholder="Enter Password"
        required
        inputType="password"
      />
      <Button variant="pink" type="submit">
      Close Account
      </Button>
    </form>
  );
};

export default CloseAcctForm;
