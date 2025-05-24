"use client";
import { FootballMatch } from "@/interface/competitionSchedule";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

type Props = {
  match: FootballMatch;
};

export default function ScheduleItem({ match }: Props) {
  const [isExpanded, setExpanded] = useState(false);
  const iconControl = useAnimationControls();

  const handleToggleExpand = () => {
    iconControl.start(isExpanded ? "up" : "down");
    setExpanded((prev) => !prev);
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md pb-2 pt-3 px-3 mb-4 w-full max-w-2xl mx-auto hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between gap-4">
        <div
          className={`text-smfont-semibold ${
            match.status === "FINISHED"
              ? "bg-emerald-500 text-white"
              : "bg-emerald-50 text-emerald-800"
          } px-3 py-1 rounded-xl shadow-sm text-xs font-semibold`}
        >
          {match.status === "FINISHED"
            ? "FT"
            : new Date(match.utcDate).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
        </div>

        <motion.div
          className={`flex items-center justify-center gap-3 transition-all duration-300 ${
            isExpanded ? "w-3/4" : "w-1/2"
          }`}
        >
          <Image
            src={match.homeTeam.crest}
            alt={match.homeTeam.tla}
            width={isExpanded ? 32 : 24}
            height={isExpanded ? 32 : 24}
            className="object-contain"
          />

          <h2 className="text-sm md:text-base font-medium text-gray-700 text-center">
            <Link
              href={`/team/${match.homeTeam.id}`}
              className="hover:underline"
            >
              {isExpanded ? match.homeTeam.name : match.homeTeam.shortName}
            </Link>
            <span className="text-gray-400 mx-1">vs</span>
            <Link
              href={`/team/${match.awayTeam.id}`}
              className="hover:underline"
            >
              {isExpanded ? match.awayTeam.name : match.awayTeam.shortName}
            </Link>
          </h2>

          <Image
            src={match.awayTeam.crest}
            alt={match.awayTeam.tla}
            width={isExpanded ? 32 : 24}
            height={isExpanded ? 32 : 24}
            className="object-contain"
          />
        </motion.div>

        <motion.button
          onClick={handleToggleExpand}
          className="text-xl p-2 rounded-full hover:bg-gray-100 transition"
          initial="up"
          animate={iconControl}
          variants={{
            down: { rotate: "0deg" },
            up: { rotate: "180deg" },
          }}
          transition={{ duration: 0.125 }}
          aria-label="Toggle details"
        >
          <IoIosArrowUp className="text-gray-600" />
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden mt-4 text-sm text-gray-800"
      >
        <div className="border-t pt-4 space-y-2 text-sm">
          {match.status === "FINISHED" && (
            <>
              <p className="text-center text-base font-medium text-emerald-700">
                Final Score: {match.score.fullTime.home} -{" "}
                {match.score.fullTime.away}
              </p>
              <p className="text-center text-xs text-gray-500">
                Half Time: {match.score.halfTime.home} -{" "}
                {match.score.halfTime.away}
              </p>
            </>
          )}
          <p>
            <strong className="text-emerald-600">Match Day:</strong>{" "}
            {match.matchday}
          </p>
          <p>
            <strong className="text-emerald-600">Group:</strong>{" "}
            {match.group || "N/A"}
          </p>
          <p>
            <strong className="text-emerald-600">Stage:</strong>{" "}
            {match.stage || "N/A"}
          </p>
          <p>
            <strong className="text-emerald-600">Season:</strong>{" "}
            {new Date(match.season.startDate).getFullYear()} -{" "}
            {new Date(match.season.endDate).getFullYear()}
          </p>

          {match.referees.length > 0 && (
            <div>
              <strong className="text-emerald-600">Referees:</strong>
              <ul className="list-disc list-inside mt-1 text-gray-700 text-xs">
                {match.referees.map((referee) => (
                  <li key={referee.id}>
                    {referee.name}{" "}
                    <span className="text-gray-400">({referee.type})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.li>
  );
}
