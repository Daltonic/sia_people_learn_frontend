import Button from "@/components/ReusableComponents/Button";
import InputField from "@/components/ReusableComponents/InputField";

const SocialProfileForm: React.FC = () => {
  return (
    <form className="">
      <div className="md:flex gap-8">
        <InputField
          label="Twitter"
          name="twitter"
          placeholder="Enter your Twitter Profile URL"
          required
          inputType="text"
        />
        <InputField
          label="Facebook"
          name="facebook"
          placeholder="Enter your Facebook Profile URL"
          required
          inputType="text"
        />
      </div>
      <div className="md:flex gap-8">
        <InputField
          label="Instagram"
          name="instagram"
          placeholder="Enter your Instagram Profile URL"
          required
          inputType="text"
        />
        <InputField
          label="LinkedIn"
          name="linkedIn"
          placeholder="Enter your LinkedIn Profile URL"
          required
          inputType="text"
        />
      </div>
      <Button variant="pink" type="submit">Save Social Profile</Button>
    </form>
  );
};

export default SocialProfileForm;
