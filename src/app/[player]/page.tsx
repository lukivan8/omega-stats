import React from "react";
import { os } from "@/constants/api";
import { NotFound, UnexpectedError } from "@/components/error-page";
import User from "@/components/user";
import {
  CharacterMastery,
  PlayerData,
  PlayerRankedData,
} from "@/lib/utils/dto";
import { regions } from "@/lib/utils/regions";

type PropType = {
  params: { region: string; player: string };
};

async function fetchMastery(
  player: string
): Promise<CharacterMastery[] | string> {
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

async function fetchPlayer(player: string): Promise<PlayerData | string> {
  try {
    let playerData = await os.player(player);
    return playerData;
  } catch (e) {
    return `${e}`;
  }
}

export default async function UserPage({ params: { player } }: PropType) {
  const masteryData = await fetchMastery(player);
  const playerData = await fetchPlayer(player);
  const rankedData: PlayerRankedData | null = await Promise.all([
    os.ranked(player, "Europe"),
    os.ranked(player, "NorthAmerica"),
    os.ranked(player, "Asia"),
    os.ranked(player, "Oceania"),
    os.ranked(player, "SouthAmerica"),
  ]).then((res) => {
    for (let item in res) {
      if (res[item] !== null) {
        return res[item];
      }
      continue;
    }
    return null;
  });

  //TODO: Красивый хэдер с карточкой

  if (typeof masteryData !== "string" && typeof playerData !== "string") {
    return (
      <div>
        <div className="mx-auto mb-6 flex w-full justify-center gap-6 sm:w-1/2">
          <h2 className="text-[2.7rem] font-bold text-primary-content sm:text-6xl">
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
