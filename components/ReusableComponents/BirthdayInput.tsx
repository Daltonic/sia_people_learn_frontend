// components/BirthdayInput.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface BirthdayInputProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const BirthdayInput: React.FC<BirthdayInputProps> = ({ selectedDate, onChange }) => {
  return (
    <div className=''>
      <label htmlFor="birthday" className="text-violet-950 font-medium">Birthday:</label>
      <DatePicker
        id="birthday"
        selected={selectedDate}
        onChange={(date: Date | null) => onChange(date)}
        showYearDropdown
        dateFormat="MM/dd/yyyy"
        placeholderText="Select a date"
        className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)] w-full justify-center mt-3 p-3 md:pl-6 py-3 rounded-lg items-start"
      />
    </div>
  );
};

export default BirthdayInput;
