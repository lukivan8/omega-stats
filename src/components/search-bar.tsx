"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar() {
  const [nickname, setNickname] = useState("");
  const [server, setServer] = useState("global");
  const path = usePathname();

  return (
    <form>
      <div className="flex gap-2 justify-center items-stretch h-8 md:h-auto ">
        <select
          onChange={(e) => setServer(e.target.value)}
          className="text-white text-sm md:text-base bg-black border md:p-2 px-1 rounded"
        >
          <option value="asia">Asia</option>
          <option value="eu">EU</option>
          <option value="na">NA</option>
          <option value="oce">OCE</option>
          <option value="sa">SA</option>
        </select>
        <input
          onChange={(e) => setNickname(e.target.value)}
          className="bg-black border-solid border text-sm md:text-base border-white px-1 text-white rounded focus:outline-none md:p-2 sm:w-full w-1/2"
        />
        <Link href={nickname !== "" ? "/" + server + "/" + nickname : path}>
          <button
            type="submit"
            className="bg-black border-solid border border-white md:p-2 px-2 py-1 rounded font-bold"
          >
            <Image
              src="/icons/lens.svg"
              className="h-full md:hidden"
              alt={"go"}
              width={22}
              height={22}
            />
            <Image
              src="/icons/lens.svg"
              className="hidden md:block"
              alt={"go"}
              width={50}
              height={50}
            />
          </button>
        </Link>
      </div>
    </form>
  );
}
