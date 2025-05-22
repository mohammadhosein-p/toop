import FollowingLeague from "@/components/folllowing_league/FollowingLeague";
import LeagueInfoCard from "@/components/standing_page/LeagueInfoCard";
import StandingTable from "@/components/standing_page/StandingTable";
import React, { Suspense } from "react";

type Props = {
  searchParams: {
    league: string;
  }
};

export default function page({searchParams: { league }}: Props) {
  return (
    <div className="grid grid-cols-12 bg-white min-h-screen gap-4 p-4">
      <div className="col-span-3 flex-col flex gap-3">
        <div className="h-[33vh]">
          <LeagueInfoCard standing={league} />
        </div>
        <div className="bg-gray-200 rounded-lg p-0 flex flex-col h-[60vh]">
          <Suspense
            fallback={
              <p className="mx-auto text-emerald-900/70 text-4xl">Fetching Leagues...</p>
            }
          >
            <FollowingLeague />
          </Suspense>
        </div>
      </div>
      <div className="col-span-9 rounded-lg h-[95vh] overflow-y-auto overflow-x-hidden">
        <StandingTable standing={league} />
      </div>
    </div>
  );
}
