import LeaderboardPlayer from "@/components/leaderboard";
import OmegaStrikers from "omega-strikers"

async function getLeaderboard() {
  const os = new OmegaStrikers({ token: null, refresh: null })
  const res = await os.leaderboard(26, "eu")
  const data = res.players
  return data;
}

export default async function Leaderboard() {
  const lb = await getLeaderboard()
  return (
    <div className="flex flex-col divide-y">
      <div className="flex flex-row bg-gray-700">
        <div className="basis-16">Rank</div>
        <div className="basis-1/5">Striker</div>
        <div className="basis-1/5">Division</div>
        <div className="basis-1/5">Winrate</div>
        <div className="basis-1/5">Main role</div>
      </div>
      {lb.map((data, i) => <LeaderboardPlayer key={i} player={data} />)}
    </div>
  )
}