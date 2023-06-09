// import { os } from "@/constants/api";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const username = searchParams.get("username");
//   if (username === null) {
//     return;
//   }
//   const res = await os.matchingPlayers(username);
//   return NextResponse.json({ res });
// }
