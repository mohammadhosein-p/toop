import { Standing } from "@/interface/currentLeagueState";
import { fetchData } from "@/lib/FetchData";
import Image from "next/image";
import Link from "next/link";
import React from "react";


type Props = {
  standingParam?: string;
};

export default async function CurrentLeagueState({ standingParam }: Props) {
  const standing = standingParam || "PL";
  const standingResult = await fetchData<Standing>(
    `http://api.football-data.org/v4/competitions/${standing}/standings`
  );
  console.log(standingResult)

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
        {standingResult.standings.map((standingGroup) => (
          <div key={standingGroup.type} className="mb-1 overflow-y-auto">
            <table className="w-full">
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
                {standingGroup.table.map((team) => (
                  <tr
                    key={team.team.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-1.5 pr-2">{team.position}</td>
                    <td className="py-1.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <Image
                          src={team.team.crest}
                          alt={team.team.tla}
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain"
                        />
                        <span className="truncate">{team.team.tla}</span>
                      </div>
                    </td>
                    <td className="py-1.5 text-center pl-2 text-green-500/90 font-medium">{team.won}</td>
                    <td className="py-1.5 text-center pl-2 text-yellow-500/90 font-medium">{team.draw}</td>
                    <td className="py-1.5 text-center pl-2 text-red-500/90 font-medium">{team.lost}</td>
                    <td className="py-1.5 text-center pl-2 font-medium">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <Link href={"#"} className="mt-0 text-xs text-gray-700">
        View full table...
      </Link>
    </div>
  );
}
