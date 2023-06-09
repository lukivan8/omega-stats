"use client";

import { CharData, CharType } from "@/constants/chars";
import ProgressBar from "@ramonak/react-progress-bar";
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
      <div className="flex justify-evenly py-2 md:px-4 px-3 items-center">
        <div className="basis-[20%] md:flex items-center gap-2">
          <Image
            width={40}
            height={40}
            src={"/omega-characters/" + validCharName + ".png"}
            alt={validCharName}
          />
          <p className="sm:text-base text-sm">
            {validCharName[0].toUpperCase() + validCharName.slice(1)}
          </p>
        </div>
        <div className="basis-[15%]">
          <p className="sm:text-lg text-sm">{currentTier}</p>
        </div>

        <p className="basis-1/5  sm:text-lg text-sm">{totalXp}</p>
        <div className="basis-[25%]">
          {isNaN(progress) ? (
            <Image alt="ok" src="/icons/star.svg" width={32} height={32} />
          ) : (
            <>
              <p className="hidden sm:block">
                {currentTierXp}/{xpToNextTier}
              </p>
              <ProgressBar
                baseBgColor="rgb(3, 7, ,18)"
                bgColor="#fff"
                className="sm:w-3/4 w-full border border-gray-500 rounded-[2rem]"
                height="10px"
                completed={progress}
                customLabel=" "
                animateOnRender
              />
            </>
          )}
        </div>
        <div className="basis-1/5 flex justify-center">
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
