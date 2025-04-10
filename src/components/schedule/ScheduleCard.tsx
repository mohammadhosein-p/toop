"use client";

import { FootballMatch } from "@/interface/competitionSchedule";
import { motion } from "framer-motion";
import React from "react";
import ScheduleItem from "./ScheduleItem";
import Image from "next/image";

type Props = {
  isPriority: boolean;
  matches: FootballMatch[];
};

export default function ScheduleCard({ isPriority, matches }: Props) {
  return (
    <div
      key={matches[0].competition.name}
      className={`border rounded-lg p-4 ${
        isPriority ? "bg-emerald-50" : "bg-gray-50"
      }`}
    >
      <div className="flex flex-row gap-3 items-center justify-left mb-2">
        <Image
          src={matches[0].competition.emblem}
          alt={matches[0].competition.name}
          width={50}
          height={50}
          className="w-10 h-10"
        />
        <h2
          className={`text-xl font-semibold mb-0 ${
            isPriority ? "text-emerald-700" : "text-gray-700"
          }`}
        >
          {matches[0].competition.name}
        </h2>
      </div>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        transition={{
          duration: 0.125,
          ease: "easeIn",
        }}
        className="space-y-2"
      >
        {matches.map((match) => (
          <ScheduleItem key={match.id} match={match} />
        ))}
      </motion.ul>
    </div>
  );
}
