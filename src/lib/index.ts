import axios, { AxiosInstance } from "axios";

import { OSError } from "./utils/Error";

import { selectServer } from "./utils/selectServer";

import { regions } from "./utils/regions";
import {
  Leaderboard,
  LevelData,
  PlayerData,
  RankedAPIResponse,
  StrikerMastery,
} from "./utils/dto";
import { searchPlayer, searchInfo } from "./utils/searchPlayer";
import { PlayerRankedData } from "./utils/dto";

export default class OmegaStrikers {
  token: string;
  refresh: string;
  instance: AxiosInstance;

  constructor({
    token,
    refresh,
  }: {
    token: string | null;
    refresh: string | null;
  }) {
    if (token === null) {
      token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDUxM2M2NTI2OTYwZDdkNDFmZmU2MmEiLCJ1c2VyIjoiWmVuX1JLUyIsInJvbGUiOiJQbGF5ZXIiLCJpc3MiOiJvZHlzc2V5aW50ZXJhY3RpdmUuZ2ciLCJzZXNzaW9uSWQiOiIwMmMxM2VmYS0yMDA2LTRmYjUtYjZhMi1lN2I4MDljOTUxMzYiLCJwbGF0Zm9ybSI6IlN0ZWFtIiwiZW52aXJvbm1lbnQiOiJOb25lIiwiaWF0IjoxNjg2MDQyMzkwLCJleHAiOjE2ODYwNDMyOTB9.kj6Vefxwoz62j6Yu2bdNZ1uslvK5OBeQJEE-dwHpgNo";
    }
    if (refresh === null) {
      refresh =
        "20dcaac1690e78db19833b9c88c254e3f8aad9d589b5524c89d95b5dad336bc2e5e94bfd4e3d8e18";
    }
    this.token = token;
    this.refresh = refresh;

    if (!this.token || !this.refresh) {
      throw new OSError("Token or Token Refresh invalid.");
    }
    //@ts-ignore
    this.instance = axios.create({
      baseURL: "https://prometheus-proxy.odysseyinteractive.gg/api",
      headers: {
        "X-Authorization": `Bearer ${this.token}`,
        "X-Refresh-Token": this.refresh,
      },
    });
  }

  // < Leaderboard > \\
  async leaderboard(players: number, region: string): Promise<Leaderboard> {
    if (!players && !region)
      throw new OSError("Invalid players number and region.");
    if (!regions.hasOwnProperty(region.toLowerCase()))
      throw new OSError("Invalid server.");
    if (players < 1 || players > 10000)
      throw new OSError("Minimum players is 1 and Max players is 10000.");

    let { data } = await this.instance.get<Leaderboard>(
      `/v1/ranked/leaderboard/players?startRank=0&pageSize=${players}${selectServer(
        region
      )}`
    );
    return data;
  }

  // < Search Player By ID >
  // WARNING: НЕ РАБОТАЕТ С ПРОБЕЛАМИ, ПРОТЕСТИТЬ
  async search(playerName: string): Promise<string> {
    const { data } = await this.instance.get(
      `/v1/players?usernameQuery=${playerName}`
    );
    if (data.matches.length == 0) throw new OSError("Player not found.");
    const res = searchPlayer(playerName, data);
    return res;
  }

  async player(playerName: string): Promise<PlayerData> {
    const { data } = await this.instance.get(
      `/v1/players?usernameQuery=${playerName}`
    );
    if (data.matches.length == 0) throw new OSError("Player not found.");
    const res = data.matches[0];
    return res;
  }

  async matchingPlayers(name: string): Promise<PlayerData[]> {
    const { data } = await this.instance.get(
      `/v1/players?usernameQuery=${name}`
    );
    return data.matches;
  }

  // < Show Profile (Ranked) >
  async ranked(
    playerName: string,
    region: string
  ): Promise<PlayerRankedData | null> {
    try {
      const player = await this.player(playerName);
      const playerId = player.playerId;

      const { data } = await this.instance.get<RankedAPIResponse>(
        `/v1/ranked/leaderboard/search/${playerId}?entriesBefore=0&entriesAfter=0&specificRegion=${region}`
      );
      const result = data.players[0];
      return result;
    } catch (e) {
      return null;
    }
  }

  // < Show Account Level >
  async level(playerName: string): Promise<LevelData> {
    const playerId = await this.search(playerName);

    const { data } = await this.instance.get(`/v1/mastery/${playerId}/player`);
    return data;
  }

  // < Show Profile Mastery Characters >
  async mastery(playerName: string): Promise<StrikerMastery> {
    const player = await this.player(playerName);
    const playerId = player.playerId;
    const { data } = await this.instance.get(
      `/v2/mastery/${playerId}/characters`
    );
    return data;
  }
}
