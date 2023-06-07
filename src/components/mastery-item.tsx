"use client";

import { CharData } from "@/constants/chars";
import ProgressBar from "@ramonak/react-progress-bar";
import Image from "next/image";
import React from "react";
import { CharacterMastery } from "../../omega-stats-lib/src/utils/dto";

function validateCharName(charName: string): string {
  if (!CharData.hasOwnProperty(charName)) {
    return "";
  } else {
    //@ts-ignore
    return CharData[charName];
  }
}

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

  if (validCharName !== "") {
    return (
      <div className="flex justify-evenly py-2 md:px-4 px-2 items-center">
        <div className="basis-[20%] md:flex items-center gap-2">
          <Image
            width={40}
            height={40}
            src={"/omega-characters/" + validCharName + ".png"}
            alt={validCharName}
          />
          <p>{validCharName[0].toUpperCase() + validCharName.slice(1)}</p>
        </div>
        <div className="basis-[15%]">
          <p>{currentTier}</p>
        </div>

        <p className="basis-1/5">{totalXp}</p>
        <div className="basis-[25%]">
          {isNaN(progress) ? (
            <Image alt="ok" src="/star.svg" width={32} height={32} />
          ) : (
            <>
              <p className="hidden sm:block">
                {currentTierXp}/{xpToNextTier}
              </p>
              <ProgressBar
                baseBgColor="#000"
                bgColor="#fff"
                className="sm:w-3/4 w-full"
                height="10px"
                completed={progress}
                customLabel=" "
              />
            </>
          )}
        </div>
        <div className="basis-1/5 flex justify-center">
          {collected ? (
            <Image alt="ok" src="/done.svg" width={32} height={32} />
          ) : (
            <Image alt="not" src="/cross.svg" width={32} height={32} />
          )}
        </div>
      </div>
    );
  }
  return <></>;
}
