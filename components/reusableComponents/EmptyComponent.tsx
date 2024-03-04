import React from "react";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

interface EmptyComponentProps {
  title?: string;
  buttonText?: string;
  link?: string; // New optional prop for link
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({
  title,
  buttonText,
  link,
}) => {
  return (
    <div className="flex flex-col items-center justify-center border-dashed border-2 border-[#EDEDED] w-full gap-5 p-10 rounded-lg">
      <Image width={200} height={200} src="/images/dashBoard/dashBoardMain/emptyFolder.svg" alt="logo" />
      <p className="mt-4 text-lg text-gray-600">{title}</p>
      {link ? (
        <Link href={link}>
            <Button variant="pink">{buttonText}</Button>
        </Link>
      ) : (
        <Button variant="pink">{buttonText}</Button>
      )}
    </div>
  );
};

export default EmptyComponent;
