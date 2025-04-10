"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { format, addDays, isToday, isTomorrow, isYesterday } from "date-fns";

export default function DateCarousel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentDate =
    searchParams.get("date") || format(new Date(), "yyyy-MM-dd");

  const dates = [];
  for (let i = -3; i <= 4; i++) {
    dates.push(addDays(new Date(currentDate), i));
  }

  const handleDateChange = (date: Date) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("date", format(date, "yyyy-MM-dd"));

    startTransition(() => {
      router.push(`${pathname}?${newSearchParams.toString()}`);
    });
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  return (
    <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto py-2 px-4">
      {dates.map((date) => {
        const formatted = format(date, "yyyy-MM-dd");
        const isSelected = formatted === currentDate;

        return (
          <motion.button
            key={date.toString()}
            onClick={() => handleDateChange(date)}
            whileHover={{
              scale: 1.1,
              y: -5,
            }}
            transition={{
              type: "spring",
              duration: .3
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors relative ${
              isSelected
                ? "bg-emerald-700/80 text-white"
                : "bg-white hover:bg-emerald-50 text-gray-800"
            }`}
          >
            {getDateLabel(date)}
            {isPending && isSelected && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white animate-ping"></span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
