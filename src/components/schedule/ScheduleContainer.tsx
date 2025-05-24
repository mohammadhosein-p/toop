import {
  FootballMatch,
  ScheduleResponse,
} from "@/interface/competitionSchedule";
import { fetchData } from "@/lib/FetchData";
import ScheduleCard from "./ScheduleCard";
import DateCarousel from "./DateCarousel";
import { format } from "date-fns";

type Props = {
  date?: string;
};

const PRIORITY_COMPETITIONS = [
  "Premier League",
  "UEFA Champions League",
  "Serie A",
  "Bundesliga",
  "Ligue 1",
  "Primera Division",
];

export default async function ScheduleContainer({ date }: Props) {
  const selectedDate = date
    ? format(new Date(date), "yyyy-MM-dd")
    : format(new Date(), "yyyy-MM-dd");
  console.log("selectedDate", selectedDate);

  let scheduleData: ScheduleResponse | null = null;
  scheduleData = await fetchData<ScheduleResponse>(
    `http://api.football-data.org/v4/matches?date=${selectedDate}`,
    ["matches", selectedDate]
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

      <DateCarousel />

      <div className="flex-1 overflow-y-auto space-y-4 pr-4 pb-3">
        {sortedCompetitions.length > 0 ? (
          sortedCompetitions.map(([competitionName, matches]) => (
            <ScheduleCard
              isPriority={PRIORITY_COMPETITIONS.includes(competitionName)}
              matches={matches}
              key={competitionName}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No matches scheduled for this date
          </div>
        )}
      </div>
    </div>
  );
}
