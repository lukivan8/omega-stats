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
    <form>
      <div className="flex gap-2 justify-center items-stretch h-8 md:h-auto ">
        <Autocomplete
          inputChange={handleInputChange}
          suggestionClick={handleSuggestionClick}
          inputValue={inputValue}
          suggestions={suggestions}
        />
        <Link href={inputValue !== "" ? "/" + server + "/" + inputValue : path}>
          <button
            className="bg-black border-solid border border-white p-2 rounded font-bold"
            type="submit"
          >
            <Image
              src="/icons/lens.svg"
              className="md:hidden"
              alt={"go"}
              width={20}
              height={20}
            />
            <Image
              src="/icons/lens.svg"
              className="hidden md:block"
              alt={"go"}
              width={24}
              height={24}
            />
          </button>
        </Link>
      </div>
    </form>
  );
}
