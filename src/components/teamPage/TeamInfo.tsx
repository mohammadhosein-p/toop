import { Team } from "@/interface/team";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaLandmark,
  FaPalette,
  FaGlobe,
  FaUserTie,
  FaCalendarAlt,
} from "react-icons/fa";
import InfoCard from "./InfoCard";

interface Props {
  team: Team;
}

export default function TeamInfo({ team }: Props) {
  return (
    <div className="text-gray-800 overflow-hidden flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4 border-b pb-3">
        <Image
          src={team.crest}
          alt={team.name}
          width={60}
          height={60}
          className="w-12 h-12 object-contain"
        />
        <div>
          <h2 className="text-2xl font-bold text-emerald-700">{team.name}</h2>
          <div className="flex items-center gap-2 mt-1 text-sm text-emerald-600">
            <Image
              src={team.area.flag}
              alt={team.area.name}
              width={20}
              height={20}
              className="w-4 h-4 object-contain"
            />
            <span>{team.area.name}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <InfoCard
          icon={<FaCalendarAlt />}
          label="Founded"
          value={team.founded}
        />
        <InfoCard icon={<FaLandmark />} label="Stadium" value={team.venue} />
        <InfoCard icon={<FaUserTie />} label="Coach" value={team.coach?.name} />
        <InfoCard icon={<FaPalette />} label="Colors" value={team.clubColors} />
        <InfoCard
          icon={<FaMapMarkerAlt />}
          label="Address"
          value={team.address}
        />
        <InfoCard
          icon={<FaGlobe />}
          label="Website"
          value={
            <div className="break-words">
              <a
                href={team.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition-colors"
              >
                go to website
              </a>
            </div>
          }
        />
      </div>
    </div>
  );
}
