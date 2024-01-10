import Button from "@/components/reusableComponents/Button";
import { useState } from "react";

const NotificationsForm: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  const handleSwitchChange = () => {
    setIsOn(!isOn);
  };

  const handleSaveChangesClick = () => {
    // Save changes logic here
  };

  return (
    <div className="">
      <h1 className="font-medium text-[#321463]">
        Notifications - Choose when and how to be notified
      </h1>
      <p className="text-[#4F547B] text-sm">
        Select push and email notifications you&apos;d like to receive
      </p>

      <form className="space-y-10 mt-10">
        <div className="relative border-b border-[#EDEDED] pb-2 ">
          <h1 className="font-medium text-[#321463]">
            Choose when and how to be notified
          </h1>
          <div className="flex justify-between items-center mt-2">
            <div>
              <label
                htmlFor="subscriptions"
                className="font-medium text-[#321463]"
              >
                Subscriptions
              </label>
              <p className="text-[#4F547B] text-sm pr-5 sm:pr-0">
                Notify me about activities on my account and notify me about
                news letter
              </p>
            </div>
            <input
              name="pubscriptions"
              type="checkbox"
              id="toggle"
              checked={isOn}
              onChange={handleSwitchChange}
              className="hidden"
            />
            <label
              htmlFor="toggle"
              className="toggle-label block pl-0.5 w-12 h-5 bg-[#C5165D] rounded-full cursor-pointer"
            >
              <div
                className={`toggle-thumb absolute w-5 h-5 bg-white rounded-full transition-transform ${
                  isOn ? "transform translate-x-full" : ""
                }`}
              ></div>
            </label>
          </div>
        </div>

        <div className="relative border-b border-[#EDEDED] pb-2">
          <h1 className="font-medium text-[#321463]">Email notifications</h1>
          <div className="flex justify-between items-center mt-2">
            <div>
              <label
                htmlFor="subscriptions"
                className="font-medium text-[#321463]"
              >
                I want to recive news letter
              </label>
              <p className="text-[#4F547B] text-sm pr-5 sm:pr-0">
                Notify me about activities on my account and notify me about
                news letter
              </p>
            </div>
            <input
              name="pubscriptions"
              type="checkbox"
              id="toggle"
              checked={isOn}
              onChange={handleSwitchChange}
              className="hidden"
            />
            <label
              htmlFor="toggle"
              className="toggle-label block pl-0.5 w-12 h-5 bg-[#C5165D] rounded-full cursor-pointer"
            >
              <div
                className={`toggle-thumb absolute w-5 h-5 bg-white rounded-full transition-transform ${
                  isOn ? "transform translate-x-full" : ""
                }`}
              ></div>
            </label>
          </div>
        </div>

        <Button variant="pink" onClick={handleSaveChangesClick}>  Save Changes</Button>
      </form>
    </div>
  );
};

export default NotificationsForm;
