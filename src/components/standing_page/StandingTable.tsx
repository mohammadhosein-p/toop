import { fetchData } from "@/lib/FetchData";
import { Standing } from "@/interface/currentLeagueState";
import React from "react";
import StandingRow from "./StandingRow";

type Props = {
  standing: string;
};

export default async function StandingTable({standing}: Props) {
  const standingResult = await fetchData<Standing>(
    `http://api.football-data.org/v4/competitions/${standing || "PL"}/standings`,
    ["standing", standing]
  );

  const tableData = standingResult.standings[0].table;

  return (
    <div className="col-span-9 rounded-xl overflow-hidden shadow-lg bg-white border border-gray-200">
      <table className="w-full text-sm table-auto border-collapse">
        <thead>
          <tr className="bg-emerald-900/70 text-white text-sm">
            <th className="pl-5 py-2 text-center">#</th>
            <th className="py-2 text-left">Team</th>
            <th className="py-2 text-center">MP</th>
            <th className="py-2 text-center">Win</th>
            <th className="py-2 text-center">Draw</th>
            <th className="py-2 text-center">Lost</th>
            <th className="py-2 text-center">GF</th>
            <th className="py-2 text-center">GA</th>
            <th className="py-2 text-center">GD</th>
            <th className="pr-4 py-2 text-center">Points</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((team, index) => (
            <StandingRow key={team.team.id} team={team} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
