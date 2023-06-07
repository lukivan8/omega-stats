import Image from "next/image";
import MasteryItem from "@/components/mastery-item";
import React from "react";
import { os } from "@/constants/api";
import Link from "next/link";

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

async function fetchPlayer(player: string, region: string) {
  try {
    let playerData = await os.player(player);
    return playerData;
  } catch (e) {
    return `${e}`;
  }
}

export default async function UserPage({
  params: { region, player },
}: {
  params: { region: string; player: string };
}) {
  const masteryData = await fetchMastery(player);
  const playerData = await fetchPlayer(player, region);

  //TODO: Красивый хэдер с карточкой
  //TODO: Исправить ошибку при переходе на несуществующего игрока
  if (
    typeof masteryData !== "string" &&
    typeof playerData !== "string" &&
    masteryData[0] !== undefined
  ) {
    return (
      <div>
        <Link href={"/"} className="flex items-center md:absolute m-4 left-4">
          <Image width={40} height={40} src={"/back.svg"} alt={"404"} />
        </Link>
        <div className="w-1/2 mx-auto flex justify-center my-10 gap-6">
          <h2 className="text-6xl font-bold">{playerData.username}</h2>
        </div>

        <div className="w-full flex justify-center">
          <div className="xl:w-1/2 md:w-3/4 w-full flex flex-col divide-y bg-stone-800 rounded-lg">
            <div className="flex bg-stone-300 text-black md:px-4 rounded-t-lg py-1">
              <div className="basis-1/5 ">
                <p className="sm:block hidden">Character</p>
              </div>
              <p className="basis-[15%]">Level</p>
              <p className="basis-1/5">Total</p>
              <p className="basis-[25%]">Progress</p>
              <div className="basis-1/5 flex justify-center">
                <p className="self-end">Collected</p>
              </div>
            </div>
            {masteryData.map((item, i) =>
              item.characterAssetName !== "" ? (
                <MasteryItem {...item} key={i} />
              ) : null
            )}
          </div>
        </div>
      </div>
    );
  } else if (playerData === "Error: Player not found.") {
    return (
      <div>
        <Link href={"/"} className="flex items-center absolute left-4 top-10">
          <Image width={40} height={40} src={"/back.svg"} alt={"404"} />
        </Link>
        <div className="flex flex-col md:flex-row w-full justify-center md:h-[90vh] h-screen items-center gap-10">
          <Image
            width={200}
            height={200}
            src={"/emoticons/drekar_what.png"}
            alt={"404"}
          />
          <p className="xl:text-6xl md:text-4xl text-3xl">
            This player doesn&apos;t exist
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Link href={"/"} className="flex items-center absolute left-4 top-10">
          <Image width={40} height={40} src={"/back.svg"} alt={"404"} />
        </Link>
        <div className="flex flex-col md:flex-row w-full justify-center md:h-[90vh] h-screen items-center gap-10">
          <Image
            width={200}
            height={200}
            src={"/emoticons/dubu-shock.png"}
            alt={"error"}
          />
          <p className="xl:text-6xl md:text-4xl text-3xl">
            Unexpected error occured
          </p>
        </div>
      </div>
    );
  }
}
