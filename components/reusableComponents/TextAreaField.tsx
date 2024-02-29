import { ChangeEvent } from 'react'

interface TextAreaProps {
  label: string
  id: string
  rows?: number
  cols?: number
  className?: string
  name?: string
  value?: string
  placeholder?: string
  required?: boolean
  handleChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const TextAreaField: React.FC<TextAreaProps> = ({
  label,
  id,
  rows = 3,
  cols = 50,
  className,
  name,
  value,
  placeholder,
  handleChange,
  required = false,
}) => (
  <div className="flex flex-col w-full my-4 space-y-2">
    <label htmlFor={id} className="text-violet-950 font-medium">
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      rows={rows}
      cols={cols}
      placeholder={placeholder || ''}
      required={required}
      className={`text-slate-600 border border-[color:var(--border-2,#E1DDDD)] w-full justify-center p-3 md:pl-6 py-3 rounded-lg items-start mb-2 focus:outline-none ${className}`}
    ></textarea>
  </div>
)
export default TextAreaField
