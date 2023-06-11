"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { PlayerData } from "@/lib/utils/dto";

export default function SearchBar({ mainPage }: { mainPage?: boolean }) {
  const server = "global";
  const path = usePathname();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<PlayerData[]>([]);

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
    <div className="dropdown">
      {/* Search bar */}
      <form>
        <div className="flex w-full justify-center border rounded items-center py-1 px-2 ">
          <input
            value={inputValue}
            onChange={handleInputChange}
            className="text-base bg-base-100 border-white px-1 rounded w-full focus:outline-none md:p-2"
            placeholder={mainPage ? "Username | ex: Bells" : "Username"}
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
      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="relative">
          <ul
            tabIndex={0}
            className="p-2 w-full absolute shadow-lg menu z-10 dropdown-content bg-base-100 rounded-box"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-2 py-2 mt-[2px] bg-base-100 cursor-pointer hover:bg-neutral-focus"
              >
                {suggestion.username}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
