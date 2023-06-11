import SearchBar from "@/components/search-bar";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function Page() {
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="flex flex-col items-stretch gap-5">
        <h1 className="text-[2.7rem] sm:text-6xl font-bold text-primary-content">
          Ωmega Stats
        </h1>
        <SearchBar mainPage />
        {/* <button className="bg-gray-800 p-2 rounded">
          <Link href={"/leaderboard"} >Leaderboard</Link>
        </button> */}
      </div>
    </div>
  );
}
