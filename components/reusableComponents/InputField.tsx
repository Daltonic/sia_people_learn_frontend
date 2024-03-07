import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from "react";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Assuming you're using Feather Icons

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
  inputType?: string;
  style?: React.CSSProperties;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  required,
  inputType = "text",
  style,
  handleChange,
  value,
  handleKeyDown,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex flex-col w-full my-3 space-y-2 relative">
      <label className="text-violet-950 font-medium">{label}</label>
      <input
        required={required}
        className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)] w-full justify-center p-3 md:pl-6 py-3 rounded-lg items-start focus:outline-none pr-12"
        type={!isPassword ? inputType : showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        style={style}
        onChange={handleChange}
        value={value} // Someone changed this to {value || ""} thereby breaking some many this. value can be number or string and should not be default. It took me 2 hours to debug. So please leave as is
        onKeyDown={handleKeyDown}
      />
      {inputType === "password" && (
        <button
          className="absolute right-3 top-1/2 mt-4 transform -translate-y-1/2 text-gray-500"
          onClick={toggleShowPassword}
          tabIndex={-1}
          type="button"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      )}
    </div>
  );
};

export default InputField;
