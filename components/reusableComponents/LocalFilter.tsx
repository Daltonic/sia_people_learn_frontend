'use client'

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

interface Props {
  label: string
  options: { name: string; value: string }[]
  currFilter: string
  setCurrFilter: Dispatch<SetStateAction<string>>
}

const LocalFilters: React.FC<Props> = ({
  label,
  options,
  currFilter,
  setCurrFilter,
}) => {
  const [currVal, setCurrVal] = useState<string>(options[0].value)

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget
    setCurrVal(value)
    setCurrFilter(value)
  }
  return (
    <div className="flex gap-2 items-center text-sm">
      <label className="text-violet-950 font-medium">{label}</label>
      <select
        className="text-slate-600 border focus:outline-none border-[color:var(--border-2,#E1DDDD)] w-28 justify-center p-3 py-2 rounded-lg items-start"
        value={currVal}
        name="filter"
        onChange={handleChange}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LocalFilters
