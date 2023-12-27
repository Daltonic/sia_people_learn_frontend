import Button from "../ReusableComponents/Button";

const Instructor: React.FC = () => {
  const backgroundImageUrl = "/images/bitcoin.svg";

  const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: "top",
  };
  return (
    <div className="bg-[#F7F8FB] flex justify-center py-10 px-5 md:p-20 w-full">
      <div className="md:w-5/6 flex flex-col md:flex-row justify-between md:items-center items-start">
        <div
          style={divStyle}
          className="h-[25rem] border w-[20rem] md:w-[25rem] md:rounded-full bg-cover relative"
        >
          <div className="hidden md:block bg-white absolute -bottom-5 -right-10 w-56 pt-10 p-5 rounded-lg">
            <p className="text-md text-[#321463] font-medium">
              “Teaching on Education platform has been an amazing experience”
            </p>
            <p className="text-xs text-[#321463] font-medium">John Doe</p>
            <p className="text-xs text-[#4F547B]">Designer, Apple Inc</p>
          </div>
        </div>
        <div className="w-4/5 md:w-[45%] mt-5 md:mt-0">
          <h1 className="text-violet-950 text-3xl md:text-2xl font-bold">
            Become an Instructor Today
          </h1>
          <p className="text-violet-950 text-base my-4">
            Use the list below to bring attention to your products key
            differentiator.
          </p>
          <Button variant="pinkoutline">Join Our Team</Button>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
