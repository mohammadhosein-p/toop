import { fetchData } from "@/lib/FetchData";
import axios from "axios";
import React from "react";

type Table = {
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

type Standing = {
  area: {
    code: string;
    flag: string;
    id: number;
    name: string;
  };
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
  };
  standings: {
    stage: string;
    type: string;
    group: string | null;
    table: Table[];
  }[];
};

type Props = {
  standingParam?: string;
};

export default async function CurrentLeagueState({ standingParam }: Props) {
  const standing = standingParam || "PL";
  const standingResult = await fetchData<Standing>(
    `http://api.football-data.org/v4/competitions/${standing}/standings`
  );

  return (
    <div className="overflow-y-auto">
      <h1>{standingResult.competition.name}</h1>
      {standingResult.standings.map((standingGroup) => (
        <div key={standingGroup.type}>
          <h2>{standingGroup.type}</h2>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {standingGroup.table.map((team) => (
                <tr key={team.team.id}>
                  <td>{team.position}</td>
                  <td>{team.team.name}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
