import Button from "../ReusableComponents/Button";

const Instructor: React.FC = () => {
  const backgroundImageUrl = "/images/bitcoin.svg";

  const divStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: "top",
  };
  return (
    <div className="bg-[#F7F8FB] flex justify-center p-20 w-full">
        <div className="w-5/6 flex justify-between items-center">
      <div
        style={divStyle}
        className="h-[25rem] border w-[25rem] rounded-full bg-cover relative"
      >
        <div className=" bg-white absolute -bottom-5 -right-10 w-56 pt-10 p-5 rounded-lg">
          <p className="text-md text-[#321463] font-medium">“Teaching on Education platform has been an amazing experience”</p>
          <p className="text-xs text-[#321463] font-medium">John Doe</p>
          <p className="text-xs text-[#4F547B]">Designer, Apple Inc</p>
        </div>
      </div>
        <div className="w-[45%] ">
          <h1 className="text-violet-950 text-2xl font-bold">
          Become an Instructor Today
          </h1>
          <p className="text-violet-950 text-base my-4">
          Use the list below to bring attention to your product's key differentiator.
          </p>
          <Button variant="pinkoutline"  >
          Join Our Team
          </Button>
        </div>
        </div>
    </div>
  );
};

export default Instructor;
