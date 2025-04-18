import { LeaguesResponse } from "@/interface/followingLeague";
import { fetchData } from "@/lib/FetchData";
import Image from "next/image";

export default async function FollowingLeague() {
  const leagues = await fetchData<LeaguesResponse>(
    "http://api.football-data.org/v4/competitions/"
  );
  const competitionList = leagues.competitions

  return (
    <div className="flex-1 overflow-y-auto pr-1">
      <div className="p-4 font-bold text-green-800">Following competitions</div>
      {competitionList?.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 p-2 pl-6 rounded-lg hover:bg-gray-50 
                 active:bg-gray-200 transition-all duration-200 cursor-pointer"
        >
          <Image
            src={item.emblem}
            width={26}
            height={26}
            alt={item.code}
            className="flex-shrink-0 object-contain drop-shadow-sm"
          />
          <span className="text-sm font-medium text-gray-700 truncate">
            {item.name}
            <span className="block text-xs text-gray-400 mt-0.5">
              {item.area.name}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
