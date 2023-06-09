"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar({ mainPage }: { mainPage?: boolean }) {
  const [nickname, setNickname] = useState("");
  const server = "global";
  const path = usePathname();

  return (
    <form>
      <div className="flex gap-2 justify-center items-stretch h-8 md:h-auto ">
        <input
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          className="bg-black border-solid border text-sm md:text-base border-white px-1 text-white rounded focus:outline-none md:p-2 w-[80%] "
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
              width={24}
              height={24}
            />
          </button>
        </Link>
      </div>
    </form>
  );
}
