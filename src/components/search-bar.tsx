"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Autocomplete from "./autocomplete";
import debounce from "lodash.debounce";
import { PlayerData } from "@/lib/utils/dto";

export default function SearchBar() {
  const server = "global";
  const path = usePathname();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<PlayerData[]>([]);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleInputChange = (e: any) => {
    const input = e.target.value;
    setInputValue(input);
    axios
      .get<{ res: PlayerData[] }>("/api/users?username=" + input)
      .then((r) => {
        setSuggestions(r.data.res.slice(0, 5));
      })
      .catch((e) => {});
  };

  const handleSuggestionClick = (suggestion: PlayerData) => {
    setInputValue(suggestion.username);
    setSuggestions([]);
  };

  return (
    <div>
      <form>
        <div className="flex w-full justify-center border rounded items-center py-1 px-2 ">
          <input
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            className="text-base bg-base-100 border-white px-1 rounded w-full focus:outline-none md:p-2"
            placeholder="Username"
          />
          <Link
            className="text-xs"
            href={inputValue !== "" ? "/" + server + "/" + inputValue : path}
          >
            <button type="submit">
              <Image src="/icons/lens.svg" alt={"go"} width={22} height={22} />
            </button>
          </Link>
          <div className="relative "></div>
        </div>
      </form>
      {suggestions.length > 0 && (focused || !hovered) && (
        <ul
          onMouseOver={() => {
            setHovered(true);
          }}
          onMouseDown={() => {
            setHovered(false);
          }}
          className="p-2 absolute shadow-lg menu dropdown-content bg-base-100 rounded-box w-52"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-2 py-2 cursor-pointer text-ellipsis hover:underline"
            >
              {suggestion.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
