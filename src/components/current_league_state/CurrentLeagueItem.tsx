"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Props = {
  team: {
    id: number;
    crest: string;
    tla: string;
  };
  position: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  index: number;
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      type: "spring",
    },
  }),
};

export default function CurrentLeagueItem({
  team,
  draw,
  lost,
  points,
  won,
  position,
  index,
}: Props) {
  const router = useRouter();

  return (
    <motion.tr
      initial="hidden"
      animate="visible"
      custom={index}
      variants={rowVariants}
      whileHover={{
        scale: 1.04,
        backgroundColor: "oklch(97.9% 0.021 166.113)",
      }}
      onClick={() => router.push(`/team/${team.id}`)}
      className="border-b cursor-pointer border-gray-100 last:border-0"
    >
      <td className="py-1.5 pr-2 text-gray-700">{position}</td>
      <td className="py-1.5">
        <div className="flex items-center gap-1.5 truncate">
          <Image
            src={team.crest}
            alt={team.tla}
            width={16}
            height={16}
            className="w-4 h-4 object-contain"
          />
          <span className="truncate">{team.tla}</span>
        </div>
      </td>
      {[won, draw, lost, points].map((value, idx) => (
        <td
          key={idx}
          className={`py-1.5 text-center pl-2 font-medium ${
            idx === 0
              ? "text-green-500/90"
              : idx === 1
              ? "text-yellow-500/90"
              : idx === 2
              ? "text-red-500/90"
              : "text-gray-800"
          }`}
        >
          {value}
        </td>
      ))}
    </motion.tr>
  );
}
