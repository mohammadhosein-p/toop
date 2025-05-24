import { Standing } from "@/interface/currentLeagueState";
import { fetchData } from "@/lib/FetchData";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGlobe,
  FaFlag,
  FaTrophy,
} from "react-icons/fa";
import { format } from "date-fns";
import InfoCard from "../teamPage/InfoCard";

interface Props {
  standing: string;
}

export default async function LeagueInfo({ standing }: Props) {
  const standingResult = await fetchData<Standing>(
    `http://api.football-data.org/v4/competitions/${
      standing || "PL"
    }/standings`,
    ["standing", standing]
  );

  const { competition, area, season, filters } = standingResult;

  return (
    <div className="text-gray-800 overflow-y-auto flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4 border-b pb-3">
        <Image
          src={competition.emblem}
          alt={competition.name}
          width={60}
          height={60}
          className="w-12 h-12 object-contain"
        />
        <div>
          <h2 className="text-2xl font-bold text-emerald-700">
            {competition.name}
          </h2>
          <div className="flex items-center gap-2 mt-1 text-sm text-emerald-600">
            <Image
              src={area.flag}
              alt={area.name}
              width={20}
              height={20}
              className="w-4 h-4 object-contain"
            />
            <span>{area.name}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <InfoCard
          icon={<FaCalendarAlt />}
          label="Season"
          value={`${Number(filters.season)} - ${String(
            Number(filters.season) + 1
          ).slice(-2)}`}
        />
        <InfoCard
          icon={<FaTrophy />}
          label="Matchday"
          value={season.currentMatchday}
        />
        <InfoCard
          icon={<FaCalendarAlt />}
          label="Start Date"
          value={format(new Date(season.startDate), "yyyy-MM-dd")}
        />
        <InfoCard
          icon={<FaCalendarAlt />}
          label="End Date"
          value={format(new Date(season.endDate), "yyyy-MM-dd")}
        />
        <InfoCard icon={<FaMapMarkerAlt />} label="Area" value={area.name} />
      </div>
    </div>
  );
}
