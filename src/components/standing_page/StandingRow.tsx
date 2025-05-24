"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Table } from "@/interface/currentLeagueState";
import Link from "next/link";

type Props = {
  team: Table;
  index: number;
};

export default function StandingRow({ team, index }: Props) {
  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.02,
      backgroundColor: "#ecfdf5",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.tr
      key={team.team.id}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={rowVariants}
      className="border-b border-emerald-100 bg-white text-gray-700"
    >
      <td className="pl-3 py-2 text-center font-medium text-emerald-700">
        {team.position}
      </td>
      <td className="p-2 flex items-center gap-3">
        <Link href={`/team/${team.team.id}`} className="flex flex-row gap-1 hover:underline">
          <Image
            src={team.team.crest}
            alt={team.team.name}
            className="h-6 w-6"
            height={24}
            width={24}
          />
          <span className="text-gray-800 font-medium">
            {team.team.shortName}
          </span>
        </Link>
      </td>
      <td className="p-2 text-center">{team.playedGames}</td>
      <td className="p-2 text-center">{team.won}</td>
      <td className="p-2 text-center">{team.draw}</td>
      <td className="p-2 text-center">{team.lost}</td>
      <td className="p-2 text-center">{team.goalsFor}</td>
      <td className="p-2 text-center">{team.goalsAgainst}</td>
      <td className="p-2 text-center">{team.goalDifference}</td>
      <td className="p-2 text-center font-bold text-emerald-600">
        {team.points}
      </td>
    </motion.tr>
  );
}
