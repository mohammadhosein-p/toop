import { LeaguesResponse } from "@/interface/followingLeague";
import { fetchData } from "@/lib/FetchData";
import FollowingLeagueItemCard from "./FollowingLeagueItemCard";

interface Props {
  isHome: boolean;
}

export default async function FollowingLeague({ isHome }: Props) {
  const leagues = await fetchData<LeaguesResponse>(
    "http://api.football-data.org/v4/competitions/",
    ["competitions"]
  );
  const competitionList = leagues.competitions;

  return (
    <div className="flex-1 overflow-y-auto pr-1">
      <div className="p-4 text-lg font-semibold text-emerald-700">
        All Competitions
      </div>

      <div className="space-y-1.5 px-2 pb-4">
        {competitionList?.map((item, index) => (
          <FollowingLeagueItemCard
            isHome={isHome}
            areaName={item.area.name}
            code={item.code}
            emblem={item.emblem}
            name={item.name}
            id={item.id}
            index={index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
