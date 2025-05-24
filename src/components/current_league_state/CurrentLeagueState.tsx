import { Standing } from "@/interface/currentLeagueState";
import { fetchData } from "@/lib/FetchData";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CurrentLeagueItem from "./CurrentLeagueItem";

type Props = {
  standingParam?: string;
};

export default async function CurrentLeagueState({ standingParam }: Props) {
  const standing = standingParam || "PL";
  const standingResult = await fetchData<Standing>(
    `http://api.football-data.org/v4/competitions/${standing}/standings`,
    ["standing", standing]
  );
  console.log(standingResult);

  return (
    <div className="bg-white rounded-lg p-2 shadow-sm">
      <div className="flex items-center gap-4 mb-3">
        <Image
          src={standingResult.competition.emblem}
          alt={standingResult.competition.name}
          width={50}
          height={50}
          className="w-10 h-10 object-contain"
        />
        <h2 className="text-sm text-black font-bold">
          {standingResult.competition.name}
        </h2>
      </div>

      <div className="text-sm text-emerald-950">
        {standingResult.standings.map((standingGroup, index) => (
          <div key={index} className="mb-1">
            <table className="w-[90%] mx-auto mb-1">
              <thead>
                <tr className="text-center border-b">
                  <th className="pb-1 pr-2 text-left w-7">#</th>
                  <th className="pb-1 text-left ">Team</th>
                  <th className="pb-1 pl-2 w-9">won</th>
                  <th className="pb-1 pl-2 w-9">draw</th>
                  <th className="pb-1 pl-2 w-9">lost</th>
                  <th className="pb-1 pl-2 w-9">point</th>
                </tr>
              </thead>
              <tbody>
                {standingGroup.table.map((team, index) => (
                  <CurrentLeagueItem
                    key={team.team.id}
                    index={index}
                    team={team.team}
                    position={index + 1}
                    won={team.won}
                    lost={team.lost}
                    points={team.points}
                    draw={team.draw}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <Link href={"/standing"} className="mt-0 text-xs text-gray-700">
        View full table...
      </Link>
    </div>
  );
}
