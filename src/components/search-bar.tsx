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
      <div className="flex w-full justify-center border rounded items-center py-1 px-2 ">
        <Autocomplete
          inputChange={handleInputChange}
          suggestionClick={handleSuggestionClick}
          inputValue={inputValue}
          suggestions={suggestions}
          styles="bg-black text-base border-white px-1 text-white rounded w-full focus:outline-none md:p-2 "
        />
        <Link href={inputValue !== "" ? "/" + server + "/" + inputValue : path}>
          <button
            type="submit"
          >
            <Image
              src="/icons/lens.svg"
              alt={"go"}
              width={22}
              height={22}
            />
          </button>
        </Link>
      </div>
    </form>
  );
}
