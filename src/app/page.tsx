import SearchBar from "@/components/search-bar";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function Page() {
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-5xl sm:text-6xl font-bold">Omega Stats</h1>
        <SearchBar />
        {/* <button className="bg-gray-800 p-2 rounded">
          <Link href={"/leaderboard"} >Leaderboard</Link>
        </button> */}
      </div>
    </div>
  );
}
