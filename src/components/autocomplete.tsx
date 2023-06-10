"use client";

import { PlayerData } from "@/lib/utils/dto";

import React, { ChangeEvent, useState } from "react";

type PropType = {
  inputValue: string;
  inputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  suggestions: PlayerData[];
  suggestionClick: Function;
};

const Autocomplete = ({
  inputValue,
  inputChange,
  suggestions,
  suggestionClick,
}: PropType) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative ">
      <input
        value={inputValue}
        onChange={inputChange}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        className="bg-black border-solid border text-sm md:text-base border-white px-1 p-2 text-white rounded focus:outline-none md:p-2 "
      />
      {suggestions.length > 0 && focused && (
        <ul className="absolute w-full mt-1 py-2 bg-black border border-gray-300 rounded-lg shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => suggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-900 text-ellipsis"
            >
              {suggestion.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
