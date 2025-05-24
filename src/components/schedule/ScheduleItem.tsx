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
      className="bg-white rounded-xl shadow-sm p-4 pb-2 mb-3 w-full max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center justify-between gap-4">
        {match.status === "FINISHED" ? (
          <p className="px-2 py-1 text-gray-950 bg-emerald-500 font-light text-xs rounded-xl">
            FT
          </p>
        ) : (
          <motion.p
            transition={{
              ease: "easeIn",
              duration: 0.3,
            }}
            className="text-sm text-gray-500 min-w-fit"
          >
            {new Date(match.utcDate).toLocaleString("en-US", {
              day: isExpanded ? "numeric" : undefined,
              month: isExpanded ? "short" : undefined,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </motion.p>
        )}

        <motion.div
          className={`flex h-8 items-center gap-3 transition-all duration-300 justify-center ${
            isExpanded ? "w-3/4" : "w-1/2"
          }`}
          transition={{
            duration: 0.3,
          }}
        >
          <motion.div layout transition={{ duration: 0.3 }}>
            <Image
              src={match.homeTeam.crest}
              alt={match.homeTeam.tla}
              width={isExpanded ? 32 : 24}
              height={isExpanded ? 32 : 24}
              className="rounded"
            />
          </motion.div>

          <motion.h2
            transition={{ duration: 0.3 }}
            className={`text-sm md:text-base font-medium text-gray-800 whitespace-nowrap text-center`}
          >
            <Link
              href={`/team/${match.homeTeam.id}`}
              className="hover:underline"
            >
              {isExpanded ? match.homeTeam.name : match.homeTeam.shortName}
            </Link>
            <span className="text-gray-400"> vs </span>
            <Link
              href={`/team/${match.awayTeam.id}`}
              className="hover:underline"
            >
              {isExpanded ? match.awayTeam.name : match.awayTeam.shortName}
            </Link>
          </motion.h2>

          <motion.div layout transition={{ duration: 0.3 }}>
            <Image
              src={match.awayTeam.crest}
              alt={match.awayTeam.tla}
              width={isExpanded ? 32 : 24}
              height={isExpanded ? 32 : 24}
              className="rounded"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="text-lg cursor-pointer text-gray-600 hover:text-black transition-colors p-1 rounded-full"
          onClick={handleToggleExpand}
          initial="up"
          animate={iconControl}
          whileHover={{
            backgroundColor: "gray",
            color: "white",
            opacity: 0.8,
          }}
          variants={{
            down: { rotate: "0deg" },
            up: { rotate: "180deg" },
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          <IoIosArrowUp />
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden mt-3 text-sm text-emerald-900"
      >
        <div className="border-t pt-3 space-y-1">
          {match.status === "FINISHED" && (
            <>
              <h2 className="w-full pr-6 flex justify-center">
                <p className="text-black opacity-50 mr-1">FT:</p>{" "}
                {match.score.fullTime.home} - {match.score.fullTime.away}
              </h2>
              <h3 className="w-full pr-6 flex justify-center">
                <p className="text-black opacity-40 mr-1">HT:</p>{" "}
                {match.score.halfTime.home} - {match.score.halfTime.away}
              </h3>
            </>
          )}
          <p>
            <strong>Match Day:</strong> {match.matchday}
          </p>
          <p>
            <strong>Group:</strong> {match.group || "none"}
          </p>
          <p>
            <strong>Stage:</strong> {match.stage || "none"}
          </p>
          <p>
            <strong>Season:</strong>{" "}
            {new Date(match.season.startDate).getFullYear()} -{" "}
            {new Date(match.season.endDate).getFullYear()}
          </p>
          {match.referees.length > 0 && (
            <div>
              <strong>Referees:</strong>
              <ul className="list-disc list-inside text-xs mt-1 text-emerald-800">
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
