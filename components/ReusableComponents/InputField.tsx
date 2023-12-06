import React from 'react';

interface InputFieldProps {
 label: string;
 name: string;
 placeholder: string;
 required: boolean;
 inputType?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, placeholder, required, inputType = 'text'}) => (
 <div className="flex flex-col w-full my-4">
   <label className="text-violet-950 font-medium">{label}</label>
   <input
    required={required}
    className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)] w-full justify-center mt-3 p-3 md:pl-6 py-3 rounded-lg items-start"
    type={inputType}
    name={name}
    placeholder={placeholder}
  />
 </div>
);

export default InputField;
