export interface PlayerData {
  username: string;
  playerId: string;
  logoId: string;
  title: string;
  nameplateId: string;
  emoticonId: string;
  titleId: string;
  tags: string[];
  platformIds: {};
  masteryLevel: number;
  organization: { organizationId: string; name: string; logoId: string };
}

export interface LevelData {
  timestamp: string;
  playerId: string;
  currentLevel: number;
  currentLevelXp: number;
  xpToNextLevel: number;
  totalXp: number;
}

export interface PlayerRankedData {
  username: string;
  playerId: string;
  logoId: string;
  title: string;
  nameplateId: string;
  emoticonId: string;
  titleId: string;
  tags: string[];
  platformIds: {};
  masteryLevel: number;
  organization: { organizationId: string; name: string; logoId: string };
  rank: number;
  wins: number;
  losses: number;
  games: number;
  topRole: string;
  rating: number;
  mostPlayedCharacters: CharacterData[];
  currentDivisionId: string;
  progressToNext: number;
}

export type Leaderboard = { players: PlayerRankedData[] };

export interface CharacterData {
  characterId: string;
  gamesPlayed: number;
}

export interface AdjacentRankedPlayers {
  players: PlayerRankedData[];
}

export interface UnfilteredSearchResult {
  matches: PlayerSearchResponse[];
  paging: { page: number; pageSize: 10 };
}

export interface PlayerSearchResponse {
  username: string;
  playerId: string;
  logoId: string;
  title: string;
  nameplateId: string;
  emoticonId: string;
  titleId: string;
  tags: string[];
  platformIds: any[];
  masteryLevel: 37;
  organization: object;
}

export interface StrikerMastery {
  timestamp: string;
  playerId: string;
  characterMasteries: CharacterMastery[];
}

export interface CharacterMastery {
  characterAssetName: string;
  totalXp: number;
  maxTier: number;
  idxHighestTierCollected: number;
  currentTier: number;
  currentTierXp: number;
  xpToNextTier: number;
}

export interface RankedAPIResponse {
  players: PlayerRankedData[];
  paging: { startRank: number; pageSize: number; totalItems: number };
  specificRegion: string;
}
