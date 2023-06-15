"use client";
import { CharacterMastery, PlayerRankedData } from "@/lib/utils/dto";
import React, { useState } from "react";
import MasteryItem from "./mastery-item";
import Image from "next/image";

type PropType = {
  masteryData: CharacterMastery[];
  rankedData: PlayerRankedData | null;
};

type Tabs = "mastery" | "statistic";

export default function User({ masteryData, rankedData }: PropType) {
  const [currentTab, setCurrentTab] = useState<Tabs>("mastery");

  return (
    <>
      <div className="flex w-full justify-center text-lg ">
        <div className="tabs">
          {currentTab === "mastery" ? (
            <>
              <div
                className="tab-bordered tab tab-lg hover:cursor-pointer"
                onClick={() => setCurrentTab("statistic")}
              >
                Ranked
              </div>
              <div
                className="tab-bordered tab tab-active tab-lg hover:cursor-pointer"
                onClick={() => setCurrentTab("mastery")}
              >
                Mastery
              </div>
            </>
          ) : (
            <>
              <div
                className="tab-bordered tab tab-active tab-lg hover:cursor-pointer"
                onClick={() => setCurrentTab("statistic")}
              >
                Ranked
              </div>
              <div
                className="tab-bordered tab tab-lg hover:cursor-pointer"
                onClick={() => setCurrentTab("mastery")}
              >
                Mastery
              </div>
            </>
          )}
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
    <div className="mt-2 flex w-full justify-center">
      <div className="flex w-full flex-col divide-y divide-dotted md:w-3/4 xl:w-1/2 ">
        <div className="flex bg-neutral px-3  py-1 text-neutral-content md:rounded-t-lg md:px-4">
          <div className="basis-1/5 ">
            <p className="hidden sm:block">Character</p>
          </div>

          <p className="basis-[15%] text-center text-sm sm:text-base">Level</p>
          <p className="basis-1/5 text-sm sm:text-base">Total XP</p>
          <p className="basis-[25%] text-sm sm:text-base">Progress</p>
          <div className="flex basis-1/5 justify-center">
            <p className="self-end text-sm sm:text-base">Collected</p>
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
    <div className="mt-2 flex w-full justify-center">
      <p className="text-xl">This player has no games played</p>
    </div>
  );
}

function Statistics({ rankedData }: { rankedData: PlayerRankedData | null }) {
  if (rankedData === null) {
    return (
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col items-center md:w-1/2">
          <div className="card w-full bg-base-100 shadow-xl md:w-3/4">
            <div className="card-body">
              <h2 className="card-title">
                <Image
                  src="/emotes/EmoticonData_BlobSad.png"
                  alt=""
                  width={50}
                  height={50}
                />
                This player isn&apos;t in top 10,000 players of his region
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col items-center md:w-1/2">
        <div className="card w-full bg-base-100 shadow-xl md:w-3/4">
          <div className="card-body">
            <h2 className="card-title">
              <Image
                src="/icons/developing.webp"
                alt=""
                width={30}
                height={30}
              />
              Under construction
            </h2>
            <p>I already started working on ranked statistics</p>
            <p>Pump them up before release to share with your friends!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
