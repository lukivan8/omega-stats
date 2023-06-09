import Image from "next/image";
import MasteryItem from "@/components/mastery-item";
import React from "react";
import { os } from "@/constants/api";
import SearchBar from "@/components/search-bar";
import Navbar from "@/components/navbar";
import { NotFound, UnexpectedError } from "@/components/error-page";

type PropType = {
  params: { region: string; player: string };
};

async function fetchMastery(player: string) {
  try {
    let masteries = await os.mastery(player);
    let res = masteries.characterMasteries.sort(
      (a, b) => b.totalXp - a.totalXp
    );
    return res;
  } catch (e) {
    return `${e}`;
  }
}

async function fetchPlayer(player: string) {
  try {
    let playerData = await os.player(player);
    return playerData;
  } catch (e) {
    return `${e}`;
  }
}

export default async function UserPage({
  params: { region, player },
}: PropType) {
  const masteryData = await fetchMastery(player);
  const playerData = await fetchPlayer(player);

  //TODO: Красивый хэдер с карточкой

  if (typeof masteryData !== "string" && typeof playerData !== "string") {
    return (
      <div>
        <div className="sm:w-1/2 w-full mx-auto flex justify-center mb-6 gap-6">
          <h2 className="sm:text-6xl text-[2.7rem] font-bold">
            {playerData.username}
          </h2>
        </div>
        {masteryData[0] !== undefined ? (
          <div className="w-full flex justify-center">
            <div className="xl:w-1/2 md:w-3/4 w-full flex flex-col divide-y bg-black ">
              <div className="flex bg-gray-200 text-black  md:px-4 md:rounded-t-lg py-1 px-3">
                <div className="basis-1/5 ">
                  <p className="sm:block hidden">Character</p>
                </div>

                <p className="basis-[15%] sm:text-base text-sm text-center">
                  Level
                </p>
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
          <div className="w-full flex justify-center">
            <p className="text-xl">This player has no games played</p>
          </div>
        )}
      </div>
    );
  } else if (playerData === "Error: Player not found.") {
    return <NotFound username={player} />;
  } else {
    return <UnexpectedError />;
  }
}
