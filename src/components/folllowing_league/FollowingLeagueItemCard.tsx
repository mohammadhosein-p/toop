"use client";

import { Competition } from "@/interface/followingLeague";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  item: Competition;
  index: number;
  isHome: boolean;
};

const divVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
};

export default function FollowingLeagueItemCard({
  item,
  index,
  isHome,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePreviewClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("standing", item.code);
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      custom={index}
      variants={divVariant}
      transition={{
        duration: 0.2,
        type: "spring",
      }}
      whileHover={{
        scale: 1.01,
        backgroundColor: "oklch(97.9% 0.021 166.113)",
      }}
      className="grid grid-cols-7 pr-2 gap-2 rounded-xl bg-white shadow-sm"
    >
      <div
        className={`flex col-span-${isHome ? "5" : "7"} items-center gap-3 p-3`}
      >
        <Image
          src={item.emblem}
          width={32}
          height={32}
          alt={item.code}
          className="object-contain w-8 h-8 rounded-md drop-shadow-sm"
        />
        <div className="flex flex-col truncate">
          <Link href={`/standing?league=${item.id}`}>
            <span className="text-sm font-semibold text-gray-800 hover:text-emerald-700 cursor-pointer truncate">
              {item.name}
            </span>
          </Link>
          <span className="text-xs text-gray-500">{item.area.name}</span>
        </div>
      </div>
      {isHome && (
        <button
          onClick={handlePreviewClick}
          className="col-span-2 self-center text-sm font-medium bg-emerald-500 hover:bg-emerald-600 
          text-white px-4 cursor-pointer py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Preview
        </button>
      )}
    </motion.div>
  );
}
