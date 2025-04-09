
interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}
interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}
interface Competition {
  id: number;
  name: string;
  code: string;
  type: "LEAGUE" | "CUP" | "OTHER";
  emblem: string;
}
interface Score {
  winner: null | "HOME_TEAM" | "AWAY_TEAM" | "DRAW";
  duration: "REGULAR" | "EXTRA_TIME" | "PENALTY_SHOOTOUT";
  fullTime: {
    home: number | null;
    away: number | null;
  };
  halfTime: {
    home: number | null;
    away: number | null;
  };
}
interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: null | Team;
}
interface Referee {
  id: number;
  name: string;
  type:
    | "REFEREE"
    | "ASSISTANT_REFEREE_N1"
    | "ASSISTANT_REFEREE_N2"
    | "FOURTH_OFFICIAL"
    | "VIDEO_ASSISTANT_REFEREE"
    | "ADDITIONAL_ASSISTANT_REFEREE_N1"
    | "ADDITIONAL_ASSISTANT_REFEREE_N2";
  nationality: string | null;
}
interface Odds {
  msg: string;
}
export interface FootballMatch {
  area: Area;
  awayTeam: Team;
  competition: Competition;
  group: null | string;
  homeTeam: Team;
  id: number;
  lastUpdated: string;
  matchday: number;
  odds: Odds;
  referees: Referee[];
  score: Score;
  season: Season;
  stage:
    | "REGULAR_SEASON"
    | "GROUP_STAGE"
    | "KNOCKOUT"
    | "FINAL"
    | "PRELIMINARY"
    | "QUALIFYING"
    | "PLAYOFFS";
  status:
    | "SCHEDULED"
    | "TIMED"
    | "IN_PLAY"
    | "PAUSED"
    | "FINISHED"
    | "SUSPENDED"
    | "POSTPONED"
    | "CANCELLED"
    | "AWARDED";
  utcDate: string;
}
export interface ScheduleResponse {
  filters: {
    dateFrom: string;
    dateTo: string;
  };
  matches: FootballMatch[],
  resultSet: {
    competitions: string;
    count: number;
    first: string;
    last: string;
  }
}
