import { fetchData } from "@/lib/FetchData";
import { Standing } from "@/interface/currentLeagueState";
import React from "react";
import StandingRow from "./StandingRow";
import Link from "next/link";

type Props = {
  standing: string;
};

export default async function StandingTable({ standing }: Props) {
  const standingResult = await fetchData<Standing>(
    `http://api.football-data.org/v4/competitions/${
      standing || "PL"
    }/standings`,
    ["standing", standing]
  );

  const tableData = standingResult.standings[0].table;
  const leagueName = standingResult.competition.name;

  return (
    <div className="col-span-9 rounded-xl overflow-hidden shadow-lg bg-gray-200 p-4">
      <div className="flex justify-between items-center p-4 border-b ">
        <h2 className="text-lg font-bold text-emerald-800">
          {leagueName} - League Standings
        </h2>

        <Link
          href="/"
          className="text-sm text-emerald-700 hover:text-emerald-900 hover:underline transition"
        >
          ← Back to Home
        </Link>
      </div>

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
