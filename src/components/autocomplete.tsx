"use client";

import { PlayerData } from "@/lib/utils/dto";

import React, { ChangeEvent, useState } from "react";

type PropType = {
  inputValue: string;
  inputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  suggestions: PlayerData[];
  suggestionClick: Function;
  styles: string;
};

const Autocomplete = ({
  inputValue,
  inputChange,
  suggestions,
  suggestionClick,
  styles,
}: PropType) => {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
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
          className={styles}
          placeholder="Username"
        />
      </div>
      {suggestions.length > 0 && (focused || !hovered) && (
        <ul
          onMouseOver={() => {
            setHovered(true);
          }}
          onMouseDown={() => {
            setHovered(false);
          }}
          className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => suggestionClick(suggestion)}
              className="px-2 py-2 cursor-pointer text-ellipsis hover:underline"
            >
              {suggestion.username}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Autocomplete;
