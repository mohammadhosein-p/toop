import ScheduleContainer from "@/components/schedule/ScheduleContainer";
import CurrentLeagueState from "@/components/current_league_state/CurrentLeagueState";
import FollowingLeague from "@/components/folllowing_league/FollowingLeague";
import { Suspense } from "react";

type Params = {
  searchParams: {
    standing?: string;
    competition?: string;
  };
};

export default function Home({ searchParams }: Params) {
  return (
    <div className="grid grid-cols-12 bg-white min-h-screen gap-4 p-4">
      <div className="col-span-3 flex flex-col gap-3">
        <div className="bg-gray-200 rounded-lg p-0 flex flex-col h-[39vh]">
          <Suspense fallback={<p>Fetching Leagues...</p>}>
            <FollowingLeague />
          </Suspense>
        </div>

        <div className="bg-gray-200 rounded-lg p-4 h-[54vh] overflow-y-auto">
          <Suspense fallback={<p>Fetching League State...</p>}>
            <CurrentLeagueState standingParam={searchParams.standing} />
          </Suspense>
        </div>
      </div>

      <div className="col-span-6 bg-gray-200 h-[95vh] rounded-lg overflow-y-hidden">
        <Suspense fallback={<p>Fetching Competitions...</p>}>
          <ScheduleContainer competitionParam={searchParams.competition} />
        </Suspense>
      </div>

      <div className="col-span-3 bg-green-200 rounded-lg p-4 overflow-auto">
        بخش راست
      </div>
    </div>
  );
}
