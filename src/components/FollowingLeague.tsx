import { fetchData } from "@/lib/FetchData";
import axios from "axios";
import Image from "next/image";

type Competition = {
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

type LeaguesResponse = {
  competitions: Competition[];
};

export default async function FollowingLeague() {
  const leagues = await fetchData<LeaguesResponse>(
    "http://api.football-data.org/v4/competitions/"
  );
  const competitionList = leagues.competitions

  return (
    <div className="h-full flex align-middle overflow-y-auto flex-col p-4 pr-0">
      <div className="text-neutral-950 font-bold">Following Leagues</div>
      <div className="flex-1 my-1 ">
        {competitionList &&
          competitionList.map((item) => (
            <div className="grid gap-1 grid-cols-6 p-2" key={item.id}>
              <Image
                src={item.emblem}
                className="col-span-1"
                width={25}
                height={25}
                alt={item.code}
              />
              <div className="col-span-5 text-green-900/70">{item.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
