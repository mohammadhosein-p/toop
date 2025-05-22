// components/league/LeagueInfoCard.tsx
import React from "react";
import { Standing } from "@/interface/currentLeagueState";
import { fetchData } from "@/lib/FetchData";
import Image from "next/image";
import { format } from "date-fns";

type Props = {
  standing: string;
};

export default async function LeagueInfoCard({standing}: Props) {
  const standingResult = await fetchData<Standing>(
    `http://api.football-data.org/v4/competitions/${standing || "PL"}/standings`,
    ["standing", standing]
  );
  console.log(standingResult);

  const { competition, area, season, filters } = standingResult;

  return (
    <div className="bg-gray-100 text-black rounded-lg p-4 h-full flex flex-col gap-5">
      <div>
        <div className="flex flex-row items-center gap-3">
          <Image
            src={competition.emblem}
            alt={competition.name}
            width={50}
            height={50}
          />
          <h2 className="text-xl text-emerald-900 font-bold">
            {competition.name}
          </h2>
        </div>
        <div className="pl-5 flex flex-row items-center mt-1 gap-3">
          <Image
            src={area.flag}
            alt={competition.name}
            width={30}
            height={30}
          />
          <p className="text-lg text-gray-700">{area.name}</p>
        </div>
      </div>
      <div className="text-sm text-gray-500 flex flex-col gap-1">
        <p>
          Season: {Number(filters.season)} -{" "}
          {String(Number(filters.season) + 1).slice(-2)}
        </p>
        <p>Matchday: {season.currentMatchday}</p>
        <p>Starts: {format(new Date(season.startDate), "yyyy-MM-dd")}</p>
        <p>Ends: {format(new Date(season.endDate), "yyyy-MM-dd")}</p>
      </div>
    </div>
  );
}
