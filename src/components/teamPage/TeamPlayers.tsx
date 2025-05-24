"use client";

import Link from "next/link";
import { FaUser, FaFlag, FaBirthdayCake, FaRunning } from "react-icons/fa";
import { motion } from "framer-motion";

type Player = {
  id: number;
  name: string;
  position: string;
  nationality: string;
  dateOfBirth: string;
};

type Props = {
  squad: Player[];
};

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 100,
    },
  }),
};

export default function TeamPlayers({ squad }: Props) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-emerald-800">Team Squad</h2>
        <Link
          href="/"
          className="text-emerald-500 underline hover:text-emerald-700 text-sm"
        >
          Home Page
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-emerald-200 bg-white text-sm text-left rounded-xl overflow-hidden">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="px-4 py-3 font-semibold items-center gap-2">
                <FaUser className="inline mr-2" />
                <span>Name</span>
              </th>
              <th className="px-4 py-3 font-semibold items-center gap-2">
                <FaRunning className="inline mr-2" />
                <span>Position</span>
              </th>
              <th className="px-4 py-3 font-semibold items-center gap-2">
                <FaFlag className="inline mr-2" />
                <span>Nationality</span>
              </th>
              <th className="px-4 py-3 font-semibold items-center gap-2">
                <FaBirthdayCake className="inline mr-2" />
                <span>Birthdate</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {squad.map((player, index) => (
              <motion.tr
                key={player.id}
                className="hover:bg-emerald-50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate="visible"
                custom={index}
                variants={rowVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                <td className="px-4 py-2 font-medium text-emerald-800">
                  {player.name}
                </td>
                <td className="px-4 py-2 text-gray-600">{player.position}</td>
                <td className="px-4 py-2 text-gray-600">
                  {player.nationality}
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {new Date(player.dateOfBirth).toLocaleDateString("en-GB")}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
