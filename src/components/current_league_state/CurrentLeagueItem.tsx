"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

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
};

export default function CurrentLeagueItem({
  team,
  draw,
  lost,
  points,
  won,
  position,
}: Props) {
  return (
    <motion.tr
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.25,
          },
        },
      }}
      transition={{
        type: "spring"
      }}  
      key={team.id}
      whileHover={{
        scale: 1.1,
        backgroundColor: "oklch(97.9% 0.021 166.113)",
      }}
      className="border-b border-gray-100 last:border-0"
    >
      <motion.td
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ type: "spring", stiffness: 200 }}
        className="py-1.5 pr-2"
      >
        {position}
      </motion.td>
      <motion.td
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ type: "spring", stiffness: 200 }}
        className="py-1.5"
      >
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
      </motion.td>

      {/* ستون‌های دیگر (انیمیشن از راست) */}
      {[won, draw, lost, points].map((value, index) => (
        <motion.td
          key={index}
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`py-1.5 text-center pl-2 font-medium ${
            index === 0
              ? "text-green-500/90"
              : index === 1
              ? "text-yellow-500/90"
              : index === 2
              ? "text-red-500/90"
              : ""
          }`}
        >
          {value}
        </motion.td>
      ))}
    </motion.tr>
  );
}
