
import OmegaStrikers from "omega-strikers"
import React from "react";

async function getLeaderboard() {
  const os = new OmegaStrikers({ token: null, refresh: null })
  let res = await os.leaderboard(100, "global")
  return res;
}

export default async function Leaderboard() {
  const lb = await getLeaderboard()
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex-basis-1/5 bg-gray-800"></div>
        
      </div>
      {lb[0].logoId}
    </div>
  )
}