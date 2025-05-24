import FollowingLeague from "@/components/folllowing_league/FollowingLeague";
import LeagueInfoCard from "@/components/standing_page/LeagueInfoCard";
import StandingTable from "@/components/standing_page/StandingTable";
import React, { Suspense } from "react";

type Props = {
  searchParams: {
    league: string;
  };
};  

export default async function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const league =
    typeof searchParams?.league === "string" ? searchParams.league : "";

  return (
    <div className="grid grid-cols-12 bg-white min-h-screen gap-4 p-4">
      <div className="col-span-3  flex-col flex gap-3">
        <div className="h-[40vh] rounded-lg bg-gray-200 overflow-y-auto">
          <LeagueInfoCard standing={league} />
        </div>
        <div className="bg-gray-200 rounded-lg p-0 flex flex-col h-[53vh]">
          <Suspense
            fallback={
              <p className="mx-auto text-emerald-900/70 text-4xl">
                Fetching Leagues...
              </p>
            }
          >
            <FollowingLeague isHome={false} />
          </Suspense>
        </div>
      </div>
      <div className="col-span-9 rounded-lg h-[95vh] overflow-y-auto overflow-x-hidden">
        <StandingTable standing={league} />
      </div>
    </div>
  );
}
