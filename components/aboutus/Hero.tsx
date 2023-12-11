import Image from "next/image";
import Button from "../ReusableComponents/Button";

const Hero: React.FC = () => {
  
  return (
    <div>
    <div className="text-center w-full mb-16 p-5 bg-[#F9F9F9] h-96 flex flex-col justify-center">
    <h1 className="text-3xl md:text-4xl font-bold">About Us</h1>
    <p className="text-md mt-3 capitalize w-full">
      We're on a mission to deliver engaging, curated courses at a
      reasonable price.
    </p>
  </div>
  <div className="flex justify-center w-full">
    <div className="flex justify-between my-16 px-20">
      <div className="flex w-[45%] items-start gap-5">
          <Image
            src="/images/bitcoin.svg"
            alt=""
            width={0} height={0}
            className="h-full object-cover w-1/2"
          />
        <div className="w-1/2 h-full flex flex-col gap-5">
          <Image className="h-full object-cover w-full"  src="/images/bitcoin.svg" width={150} height={200} alt=""></Image>
          <Image className="h-full object-cover w-full"  src="/images/bitcoin.svg" width={150} height={200} alt="" ></Image>
        </div>
      </div>
      <div className="flex flex-col px-5 w-[45%]">
        <div className="text-violet-950 text-3xl font-bold leading-10">
          Welcome to Educrat Enhance your skills with best Online courses
        </div>
        <div className="text-violet-950 text-base mt-3">
          You can start and finish one of these popular courses in under a
          day - for free! Check out the list below.. Take the course for
          free
        </div>
        <div className="text-slate-600 text-base my-5">
          Neque convallis a cras semper auctor. Libero id faucibus nisl
          tincidunt egetnvallis a cras semper auctonvallis a cras semper
          aucto. Neque convallis a cras semper auctor. Liberoe convallis a
          cras semper atincidunt egetnval
        </div>
        <Button variant="pink" style={{ width: "16rem", padding: "10px" }}>
          Start Learning For Free{" "}
        </Button>
      </div>
    </div>
  </div>
  </div>
  );
};

export default Hero;
