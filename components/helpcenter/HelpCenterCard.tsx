import Image from "next/image";

interface HelpItem {
    id: number; icon: string; title: string; description: string; key: number; image:string;
   }
const HelpCenterCard: React.FC<HelpItem> = (item) => {
  return (
    <div className="bg-[#F7F8FB] rounded-lg w-[22rem] p-10">
      <Image
        width={0}
        height={0}
        src={item.image}
        alt="icon"
        className="w-14 mb-4"
      />
      <p className="text-[#321463] text-lg font-medium">{item.title}</p>
      <p className="text-[#321463] text-sm">{item.description}</p>
    </div>
  );
};
export default HelpCenterCard;
