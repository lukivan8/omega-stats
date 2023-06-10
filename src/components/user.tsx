"use client";
import {
  CharacterData,
  CharacterMastery,
  RankedPlayerData,
} from "@/lib/utils/dto";
import React, { useState } from "react";
import MasteryItem from "./mastery-item";

type PropType = {
  masteryData: CharacterMastery[];
  rankedData: RankedPlayerData | string;
};

type Tabs = "mastery" | "statistic";

export default function User({ masteryData, rankedData }: PropType) {
  const [currentTab, setCurrentTab] = useState<Tabs>("mastery");

  return (
    <>
      <div className="w-full text-white text-lg flex justify-center ">
        <div className="md:w-1/2 w-full flex justify-around border-b">
          <div
            className="basis-1/2 text-center hover:bg-gray-900 hover:cursor-pointer select-none"
            onClick={() => setCurrentTab("statistic")}
          >
            Statistics
          </div>
          <div
            className="basis-1/2 text-center hover:bg-gray-900 hover:cursor-pointer select-none"
            onClick={() => setCurrentTab("mastery")}
          >
            Mastery
          </div>
        </div>
      </div>
      {currentTab === "mastery" ? (
        <Mastery masteryData={masteryData} />
      ) : (
        <Statistics rankedData={rankedData} />
      )}
    </>
  );
}

function Mastery({ masteryData }: { masteryData: CharacterMastery[] }) {
  return masteryData.length > 0 ? (
    <div className="w-full flex justify-center mt-2">
      <div className="xl:w-1/2 md:w-3/4 w-full flex flex-col divide-y bg-black ">
        <div className="flex bg-gray-200 text-black  md:px-4 md:rounded-t-lg py-1 px-3">
          <div className="basis-1/5 ">
            <p className="sm:block hidden">Character</p>
          </div>

          <p className="basis-[15%] sm:text-base text-sm text-center">Level</p>
          <p className="basis-1/5 sm:text-base text-sm">Total XP</p>
          <p className="basis-[25%] sm:text-base text-sm">Progress</p>
          <div className="basis-1/5 flex justify-center">
            <p className="self-end sm:text-base text-sm">Collected</p>
          </div>
        </div>
        {masteryData.map((item, i) =>
          item.characterAssetName !== "" ? (
            <MasteryItem {...item} key={i} />
          ) : null
        )}
      </div>
    </div>
  ) : (
    <div className="w-full flex justify-center mt-2">
      <p className="text-xl">This player has no games played</p>
    </div>
  );
}

function Statistics({ rankedData }: { rankedData: RankedPlayerData | string }) {
  return <p>WIP</p>;
}
