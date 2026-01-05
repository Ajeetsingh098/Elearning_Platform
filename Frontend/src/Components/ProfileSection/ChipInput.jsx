import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const ChipInput = ({ label, name, placeholder, setCourseData, courseData }) => {
  const [chips, setChips] = useState([]);

  // On mount, if courseData already has tags, sync them
  useEffect(() => {
    if (courseData[name]) {
      setChips(courseData[name]);
    }
  }, []);

  // Update parent state whenever chips change
  useEffect(() => {
    setCourseData((prev) => ({ ...prev, [name]: chips }));
  }, [chips]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const chipValue = e.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        setChips([...chips, chipValue]);
        e.target.value = "";
      }
    }
  };

  const handleDeleteChip = (index) => {
    const newChips = chips.filter((_, i) => i !== index);
    setChips(newChips);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-slate-200" htmlFor={name}>
        {label} <span className="text-pink-500">*</span>
      </label>
      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-3 py-1 text-sm text-slate-900"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:border-yellow-400 outline-none"
        />
      </div>
    </div>
  );
};

export default ChipInput;