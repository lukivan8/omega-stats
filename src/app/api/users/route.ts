import { os } from "@/constants/api";
import { PlayerData } from "@/lib/utils/dto";
import { NextResponse } from "next/server";

export async function GET(
  request: Request
): Promise<NextResponse<{ res: PlayerData[] }>> {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  if (username === null) {
    throw NextResponse.error;
  }
  const res = await os.matchingPlayers(username);
  return NextResponse.json({ res });
}
