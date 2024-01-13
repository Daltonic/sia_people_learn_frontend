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
    <div className="relative bg-slate-50">
      <p>{inputText}</p>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="icon"
          width={10}
          height={10}
          className={`${className} rounded-full absolute top-1 right-1`}
          onClick={handleIconClick}
        />
      )}
    </div>
  );
};

export default Badge;
