"use client";

import { CharData, CharType } from "@/constants/chars";
import Image from "next/image";
import React from "react";
import { CharacterMastery } from "../lib/utils/dto";

function validateCharName(charName: string): string {
  if (!CharData.hasOwnProperty(charName)) {
    return "";
  } else {
    return CharData[charName as keyof CharType];
  }
}

const charNameExceptions = {
  Aimi: "Ai.Mi",
  Drekar: "Drek'ar",
};

export default function MasteryItem({
  characterAssetName,
  currentTier,
  currentTierXp,
  idxHighestTierCollected,
  maxTier,
  totalXp,
  xpToNextTier,
}: CharacterMastery) {
  const validCharName = validateCharName(characterAssetName);
  const progress = Math.round((currentTierXp / xpToNextTier) * 100);
  const collected = currentTier - idxHighestTierCollected === 1;
  let displayName;

  if (validCharName !== "") {
    displayName = validCharName[0].toUpperCase() + validCharName.slice(1);
    if (displayName in charNameExceptions) {
      displayName =
        charNameExceptions[displayName as keyof typeof charNameExceptions];
    }
    return (
      <div className="flex items-center justify-evenly px-3 py-2 text-primary-content md:px-4">
        <div className="basis-[20%] items-center gap-2 md:flex">
          <Image
            width={40}
            height={40}
            src={"/omega-characters/" + validCharName + ".png"}
            alt={validCharName}
          />
          <p className="text-sm sm:text-base">{displayName}</p>
        </div>
        <div className="flex basis-[15%] justify-center">
          <p className="text-sm sm:text-lg">{currentTier}</p>
        </div>

        <p className="basis-1/5 text-sm sm:text-lg">
          {totalXp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <div className="basis-[25%]">
          {isNaN(progress) ? (
            <Image alt="ok" src="/icons/star.svg" width={32} height={32} />
          ) : (
            <>
              <p className="hidden sm:block">
                {currentTierXp}/{xpToNextTier}
              </p>
              <progress
                className="progress-accent progress rounded"
                max={100}
                value={progress}
              />
            </>
          )}
        </div>
        <div className="flex basis-1/5 justify-center">
          {collected ? (
            <Image alt="ok" src="/icons/done.svg" width={32} height={32} />
          ) : (
            <Image alt="not" src="/icons/cross.svg" width={32} height={32} />
          )}
        </div>
      </div>
    );
  }
  return <></>;
}
