// app/team/[id]/page.tsx

import { Suspense } from "react";
import CurrentLeagueState from "@/components/current_league_state/CurrentLeagueState";
import { fetchData } from "@/lib/FetchData";
import TeamInfo from "@/components/teamPage/TeamInfo";
import TeamPlayers from "@/components/teamPage/TeamPlayers";
import NewsContainer from "@/components/news_section/NewsContainer";
import { TeamData } from "@/interface/team";

type Params = {
  params: { id: string };
};

export default async function TeamPage({
  // @ts-ignore
  params,
}: Params) {
  const teamId = params.id;
  const teamData = await fetchData<TeamData>(
    `https://api.football-data.org/v4/teams/${teamId}`,
    ["team", teamId]
  );
  const leagueCode =
    teamData.runningCompetitions?.filter((item) => item.type === "LEAGUE")[0]
      .code || "PL";

  return (
    <div className="grid grid-cols-12 bg-white min-h-screen gap-4 p-4">
      <div className="col-span-3 flex flex-col gap-3">
        <div className="bg-gray-200 rounded-lg p-4 h-[39vh] overflow-y-auto">
          <TeamInfo team={teamData} />
        </div>

        <div className="bg-gray-200 rounded-lg p-4 h-[54vh] overflow-y-auto">
          <Suspense
            fallback={
              <p className="text-emerald-700/80 text-center pt-10">
                Loading league table...
              </p>
            }
          >
            <CurrentLeagueState standingParam={leagueCode} />
          </Suspense>
        </div>
      </div>

      <div className="col-span-6 bg-gray-200 h-[95vh] text-black rounded-lg overflow-y-auto p-4">
        <TeamPlayers squad={teamData.squad} />
      </div>

      <div className="col-span-3 bg-gray-200 rounded-lg p-4 h-[95vh] overflow-y-auto">
        <Suspense fallback={<p>Fetching news...</p>}>
          <NewsContainer filter={teamData.name} />
        </Suspense>
      </div>
    </div>
  );
}
