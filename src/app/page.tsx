import SearchBar from "@/components/search-bar";

import React from "react";

export default function Page() {
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <div className="flex flex-col items-stretch gap-5">
        <h1 className="text-[2.7rem] font-bold text-primary-content sm:text-6xl">
          Ωmega Stats
        </h1>
        <SearchBar mainPage />
      </div>
    </div>
  );
}
