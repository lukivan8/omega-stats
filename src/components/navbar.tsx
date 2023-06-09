import React from "react";
import SearchBar from "./search-bar";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex md:flex-row flex-col gap-4 items-center px-8 justify-between py-3">
      <Link href={"/"} className="font-bold md:text-4xl text-3xl">
        Omega Stats
      </Link>
      <SearchBar />
    </div>
  );
}
