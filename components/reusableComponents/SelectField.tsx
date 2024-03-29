import React, { ChangeEvent } from 'react'

interface Option {
  label: string
  value: string | number
}

interface SelectFieldProps {
  label: string
  options: Option[]
  value: string | number
  name?: string
  handleChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  onChange?: (input: string | number) => void
  defaultValue?: string
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  handleChange,
  name,
  onChange,
}) => (
  <div className="flex flex-col w-full my-4">
    <label className="text-violet-950 font-medium">{label}</label>
    <select
      className="text-slate-600 border focus:outline-none border-[color:var(--border-2,#E1DDDD)] w-full justify-center mt-3 p-3 md:pl-6 py-3 rounded-lg items-start mb-2"
      value={value}
      name={name}
      onChange={handleChange}
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

export default SelectField
