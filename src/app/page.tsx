import CurrentLeagueState from "@/components/CurrentLeagueState";
import FollowingLeague from "@/components/FollowingLeague";

type Params = {
  searchParams: {
    standing?: string;
  };
};

export default function Home({ searchParams }: Params) {
  return (
    <div className="grid grid-cols-12 bg-white min-h-screen gap-4 p-4">
      <div className="col-span-3 flex flex-col gap-4">
        <div className="bg-gray-200 pb-2 rounded-lg p-0 flex flex-col h-[40vh]">
          <FollowingLeague />
        </div>

        <div className="bg-gray-200 rounded-lg p-4 max-h-[53vh] overflow-y-auto">
          <CurrentLeagueState standingParam={searchParams.standing} />
        </div>
      </div>

      <div className="col-span-6 bg-green-100 rounded-lg p-4 overflow-auto">
        بخش وسط
      </div>

      <div className="col-span-3 bg-green-200 rounded-lg p-4 overflow-auto">
        بخش راست
      </div>
    </div>
  );
}
