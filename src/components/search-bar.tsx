"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { PlayerData } from "@/lib/utils/dto";

export default function SearchBar({ mainPage }: { mainPage?: boolean }) {
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
        <div className="flex w-full items-center justify-center rounded border px-2 py-1 ">
          <input
            value={inputValue}
            onChange={handleInputChange}
            className="w-full rounded border-white bg-base-100 px-1 text-base focus:outline-none md:p-2"
            placeholder={mainPage ? "Username | ex: Bells" : "Username"}
          />
          <Link
            className="text-xs"
            href={inputValue !== "" ? "/" + inputValue : path}
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
            className="dropdown-content menu rounded-box absolute z-10 w-full bg-base-100 p-2 shadow-lg"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="mt-[2px] cursor-pointer bg-base-100 px-2 py-2 hover:bg-neutral-focus"
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
