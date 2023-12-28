import React from 'react';

interface Option {
 label: string;
 value: string | number;
}

interface SelectFieldProps {
 label: string;
 options: Option[];
 value: string | number;
 onChange: (value: string | number) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options, value, onChange }) => (
 <div className="flex flex-col w-full my-4">
   <label className="text-violet-950 font-medium">{label}</label>
   <select
     className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)] w-full justify-center mt-3 p-3 md:pl-6 py-3 rounded-lg items-start mb-2"
     value={value}
     onChange={(e) => onChange(e.target.value)}
   >
     {options.map((option) => (
       <option key={option.value} value={option.value}>
         {option.label}
       </option>
     ))}
   </select>
 </div>
);

export default SelectField;
