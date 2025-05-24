
export type Competition = {
  id: number;
  area: {
    id: number;
    name: string;
    code: string;
    flag: string;
  };
  code: string;
  currentSeason: {
    currentMatchDay: number;
    endDate: string;
    id: number;
    startDate: string;
    winner: null | string;
  };
  emblem: string;
  lastUpdate: string;
  name: string;
};

export type LeaguesResponse = {
  competitions: Competition[];
};
