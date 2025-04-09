import {
  FootballMatch,
  ScheduleResponse,
} from "@/interface/competitionSchedule";
import { fetchData } from "@/lib/FetchData";

type Props = {
  competitionParam?: string;
};

const PRIORITY_COMPETITIONS = [
  "Premier League",
  "UEFA Champions League",
  "Serie A",
];

export default async function Competitions({ competitionParam }: Props) {
  const scheduleData = await fetchData<ScheduleResponse>(
    `http://api.football-data.org/v4/matches?date=2025-04-12`
  );

  const matchesByCompetition: { [key: string]: FootballMatch[] } = {};

  if (scheduleData?.resultSet?.count > 0 && scheduleData.matches) {
    scheduleData.matches.forEach((match) => {
      const competitionName = match.competition?.name || "Other Competitions";
      if (!matchesByCompetition[competitionName]) {
        matchesByCompetition[competitionName] = [];
      }
      matchesByCompetition[competitionName].push(match);
    });
  }

  const sortedCompetitions = Object.entries(matchesByCompetition).sort(
    (a, b) => {
      const aIndex = PRIORITY_COMPETITIONS.indexOf(a[0]);
      const bIndex = PRIORITY_COMPETITIONS.indexOf(b[0]);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a[0].localeCompare(b[0]);
    }
  );

  return (
    <div className="flex flex-col h-full space-y-4 pl-4 pt-4">
      <h1 className="text-2xl font-bold text-emerald-900">Competitions</h1>

      <div className="flex-1 overflow-y-auto space-y-4 pr-4">
        {sortedCompetitions.map(([competitionName, matches]) => {
          const isPriority = PRIORITY_COMPETITIONS.includes(competitionName);

          return (
            <div
              key={competitionName}
              className={`border rounded-lg p-4 ${
                isPriority ? "bg-emerald-50" : "bg-gray-50"
              }`}
            >
              <h2
                className={`text-xl font-semibold mb-3 ${
                  isPriority ? "text-emerald-700" : "text-gray-700"
                }`}
              >
                {competitionName}
              </h2>
              <ul className="space-y-2">
                {matches.map((match) => (
                  <li
                    key={match.id}
                    className="flex items-center justify-between p-2 bg-white rounded shadow-sm"
                  >
                    <span className="font-medium">
                      {match.homeTeam?.name || "TBD"}
                    </span>
                    <span className="mx-2 text-gray-500">vs</span>
                    <span className="font-medium">
                      {match.awayTeam?.name || "TBD"}
                    </span>
                    <span className="text-sm text-gray-500 ml-auto">
                      {new Date(match.utcDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
