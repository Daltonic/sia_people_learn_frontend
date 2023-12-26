import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "pink" | "pinkoutline" | "whiteoutline" | "lightpurple";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  ...rest
}) => {
  // Define the button's default styles
  let buttonClasses =
    "font-medium text-center px-5 w-fit md:px-5 py-2 md:py-2 rounded-md ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-105 duration-300 text-md";

  // Apply different styles based on the variant prop
  switch (variant) {
    case "pink":
      buttonClasses +=
        " bg-[#C5165D] text-white hover:text-[#C5165D] border-2 border-transparent hover:border-[#C5165D] hover:bg-transparent ";
      break;
    case "pinkoutline":
      buttonClasses +=
        " border-2 border-[#C5165D] text-[#C5165D] hover:bg-[#C5165D] hover:text-white ";
      break;
    case "whiteoutline":
      buttonClasses +=
        " border-2 border-white text-white hover:bg-[#C5165D] hover:text-white hover:border-transparent";
      break;
    case "lightpurple":
      buttonClasses +=
        " bg-[#6440FB12] text-[#1A064F] text-sm hover:text-[#C5165D] border-2 border-transparent hover:border-[#C5165D] hover:bg-transparent ";
      break;
  }

  return (
    <button className={buttonClasses} {...rest}>
      {children}
    </button>
  );
};

export default Button;
