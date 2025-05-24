"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { format, addDays, isToday, isTomorrow, isYesterday } from "date-fns";

export default function DateCarousel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [currDate, setCurrDate] = useState<string>(
    searchParams.get("date") || format(new Date(), "yyyy-MM-dd")
  );

  const dates = [];
  for (let i = -3; i <= 4; i++) {
    dates.push(addDays(new Date(currDate), i));
  }

  const handleDateChange = (date: Date) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("date", format(date, "yyyy-MM-dd"));

    startTransition(() => {
      router.push(`${pathname}?${newSearchParams.toString()}`);
    });
    setCurrDate(format(date, "yyyy-MM-dd"));
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d");
  };

  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-2 overflow-x-auto py-2 px-4">
        {dates.map((date, index) => {
          const formatted = format(date, "yyyy-MM-dd");
          const isSelected = formatted === currDate;

          return (
            <div key={index}>
              <motion.button
                key={date.toString()}
                onClick={() => handleDateChange(date)}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                }}
                transition={{
                  type: "spring",
                  duration: 0.3,
                }}
                className={`cursor-pointer w-20 h-10 rounded-lg text-sm font-medium whitespace-nowrap transition-colors relative ${
                  isSelected
                    ? "bg-emerald-700/80 text-white"
                    : "bg-white hover:bg-emerald-50 text-gray-800"
                }
              ${isPending ? "cursor-not-allowed" : ""}
              `}
                disabled={isPending}
              >
                {isSelected && isPending ? (
                  <span className="absolute top-4 right-9 w-2 h-2 rounded-full bg-white animate-ping pointer-events-none" />
                ) : (
                  <div>{getDateLabel(date)}</div>
                )}
              </motion.button>
            </div>
          );
        })}
      </div>

      {currDate !== format(new Date(), "yyyy-MM-dd") ? (
        <span
          onClick={() => handleDateChange(new Date())}
          className="pl-6 text-sm text-emerald-700/80 cursor-pointer hover:underline"
        >
          get back to today
        </span>
      ) : null}
    </>
  );
}
