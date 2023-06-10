import React from "react";
import { os } from "@/constants/api";
import { NotFound, UnexpectedError } from "@/components/error-page";
import User from "@/components/user";

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

async function fetchRanked(playerName: string, region: string) {
  try {
    let data = await os.ranked(playerName, region);
    return data;
  } catch (e) {
    return `${e}`;
  }
}

export default async function UserPage({
  params: { region, player },
}: PropType) {
  const masteryData = await fetchMastery(player);
  const playerData = await fetchPlayer(player);
  const rankedData = await fetchRanked(player, region);
  console.log(rankedData);

  //TODO: Красивый хэдер с карточкой

  if (typeof masteryData !== "string" && typeof playerData !== "string") {
    return (
      <div>
        <div className="sm:w-1/2 w-full mx-auto flex justify-center mb-6 gap-6">
          <h2 className="sm:text-6xl text-[2.7rem] font-bold">
            {playerData.username}
          </h2>
        </div>
        <User masteryData={masteryData} rankedData={rankedData} />
      </div>
    );
  } else if (playerData === "Error: Player not found.") {
    return <NotFound username={player} />;
  } else {
    return <UnexpectedError />;
  }
}
