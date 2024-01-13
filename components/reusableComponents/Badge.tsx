import Image from "next/image";

interface BadgeProps {
  inputText: string;
  imageUrl?: string;
  className?: string;
  handleIconClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  inputText,
  imageUrl,
  className,
  handleIconClick,
}) => {
  return (
    <div className=" bg-slate-100 flex p-3 rounded-md justify-between items-end gap-5">
      <p className="text-xs text-slate-500">{inputText}</p>
      <div>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="icon"
          width={14}
          height={14}
          className={`${className} `}
          onClick={handleIconClick}
        />
      )}
      </div>
    </div>
  );
};

export default Badge;
