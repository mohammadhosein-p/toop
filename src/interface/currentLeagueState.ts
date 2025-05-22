export type Table = {
  draw: number;
  goalDifference: number;
  goalsAgainst: number;
  goalsFor: number;
  lost: number;
  playedGames: number;
  points: number;
  position: number;
  won: number;
  team: {
    crest: string;
    id: number;
    name: string;
    shortName: string;
    tla: string;
  };
};

export type Standing = {
  area: {
    code: string;
    flag: string;
    id: number;
    name: string;
  };
  filters: {
    season: string;
  }
  competition: {
    code: string;
    emblem: string;
    id: number;
    name: string;
  };
  season: {
    currentMatchday: number;
    id: number;
    endDate: string;
    startDate: string;
  };
  standings: {
    stage: string;
    type: string;
    group: string | null;
    table: Table[];
  }[];
};
