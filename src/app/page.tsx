"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  const [nickname, setNickname] = useState("");
  const [server, setServer] = useState("global");
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-5xl sm:text-6xl font-bold">Omega Stats</h1>
        <div className="flex gap-2 justify-center">
          <select
            onChange={(e) => setServer(e.target.value)}
            className="text-black bg-white border p-2 rounded"
          >
            <option value="global">Global</option>
            <option value="asia">Asia</option>
            <option value="eu">EU</option>
            <option value="na">NA</option>
            <option value="oce">OCE</option>
            <option value="sa">SA</option>
          </select>
          <input
            onChange={(e) => setNickname(e.target.value)}
            className="text-black rounded focus:outline-none p-2 sm:w-full w-1/2"
          />
          <Link href={nickname !== "" ? "/" + server + "/" + nickname : "/"}>
            <button className="bg-blue-500 p-2 rounded font-bold">GO!</button>
          </Link>
        </div>
        {/* <button className="bg-gray-800 p-2 rounded">
          <Link href={"/leaderboard"} >Leaderboard</Link>
        </button> */}
      </div>
    </div>
  );
}
