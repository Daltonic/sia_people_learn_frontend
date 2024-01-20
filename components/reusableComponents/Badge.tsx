import Image from "next/image";
import { useState } from "react";

interface BadgeProps {
  inputText: string;
  imageUrl?: string;
  className?: string;
  handleIconClick?: () => void;
  imagePosition?: "left" | "right";
}

const Badge: React.FC<BadgeProps> = ({
  inputText,
  imageUrl,
  className,
  handleIconClick,
  imagePosition,
}) => {
  const position = imagePosition || "right";
  return (
    <div className="relative border-[#EDEDED] border flex p-3 rounded-md justify-between items-center gap-3">
      {imageUrl && position === "left" && (
        <Image
          src={imageUrl}
          alt="icon"
          width={14}
          height={14}
          className={`${className} `}
          onClick={handleIconClick}
        />
      )}
      <p className="text-sm text-slate-500">{inputText}</p>
      <div>
        {imageUrl && position === "right" && (
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
