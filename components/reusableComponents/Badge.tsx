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
    <div className="relative bg-slate-100 flex p-3 rounded-md justify-between items-end gap-5">
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
