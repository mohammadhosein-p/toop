import ScheduleContainer from "@/components/schedule/ScheduleContainer";
import CurrentLeagueState from "@/components/current_league_state/CurrentLeagueState";
import FollowingLeague from "@/components/folllowing_league/FollowingLeague";
import { Suspense } from "react";
import NewsContainer from "@/components/news_section/NewsContainer";

interface PageProps {
  searchParams?: {
    standing?: string;
    date?: string;
  };
}

export default function Home({ searchParams }: PageProps) {
  const standing =
    typeof searchParams?.standing === "string"
      ? searchParams.standing
      : undefined;
  const date = typeof searchParams?.date === "string" ? searchParams.date : "";

  return (
    <div className="grid grid-cols-12 bg-white min-h-screen gap-4 p-4">
      <div className="col-span-3 flex flex-col gap-3">
        <div className="bg-gray-200 rounded-lg p-0 flex flex-col h-[39vh]">
          <Suspense
            fallback={
              <p className="text-emerald-700/80 mx-auto pt-10">
                Fetching Leagues...
              </p>
            }
          >
            <FollowingLeague isHome={true} />
          </Suspense>
        </div>

        <div className="bg-gray-200 rounded-lg p-4 h-[54vh] overflow-y-auto">
          <Suspense
            fallback={
              <p className="text-emerald-700/80 mx-auto pt-10">
                Fetching League State...
              </p>
            }
          >
            <CurrentLeagueState standingParam={standing} />
          </Suspense>
        </div>
      </div>

      <div className="col-span-6 bg-gray-200 h-[95vh] rounded-lg overflow-y-hidden">
        <Suspense
          fallback={
            <p className="text-emerald-700/80 mx-auto pt-10">
              Fetching Competitions...
            </p>
          }
        >
          <ScheduleContainer date={date} />
        </Suspense>
      </div>

      <div className="col-span-3 bg-gray-200 rounded-lg p-4 h-[95vh] overflow-y-auto">
        <Suspense
          fallback={
            <p className="text-emerald-700/80 mx-auto pt-10">
              Fetching news...
            </p>
          }
        >
          <NewsContainer />
        </Suspense>
      </div>
    </div>
  );
}
