import { Team } from "@/interface/team";
import Image from "next/image";

interface Props {
  team: Team;
}

export default function TeamInfo({ team }: Props) {
  return (
    <div className="text-sm text-gray-800 overflow-hidden">
      <div className="flex items-center gap-3 mb-0">
        <Image
          src={team.crest}
          alt={team.name}
          width={50}
          height={50}
          className="w-10 h-10 object-contain"
        />
        <h2 className="text-xl text-emerald-700 font-bold">{team.name}</h2>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <Image
          src={team.area.flag}
          alt={team.area.name}
          width={25}
          height={25}
          className="w-10 h-10 object-contain"
        />
        <h3 className="text-lg text-emerald-600 font-bold">{team.area.name}</h3>
      </div>

      <ul className="space-y-1">
        <li>
          <strong>Founded:</strong> {team.founded || "-"}
        </li>
        <li>
          <strong>Stadium:</strong> {team.venue || "-"}
        </li>
        <li>
          <strong>Coach:</strong> {team.coach.name || "-"}
        </li>
        <li>
          <strong>Colors:</strong> {team.clubColors || "-"}
        </li>
        <li>
          <strong>Address:</strong> {team.address || "-"}
        </li>
        <li>
          <strong>Website:</strong>
          <a
            href={team.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {team.website || "-"}
          </a>
        </li>
      </ul>
    </div>
  );
}
