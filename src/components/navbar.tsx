import React from "react";
import SearchBar from "./search-bar";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex flex-row gap-4 items-center px-8 py-3">
      <Link href={"/"} >
        <Image src="/icons/logo.svg" className="w-full" alt={"Omega Stats"} width={48} height={48}/>
      </Link>
      <SearchBar />
    </div>
  );
}
