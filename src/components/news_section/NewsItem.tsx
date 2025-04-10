"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Article } from "@/interface/news";
import Image from "next/image";

type Props = {
  article: Article;
};

export default function NewsItem({ article }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      layoutId={`card-${article.title}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative w-full h-64 overflow-hidden rounded-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${article.urlToImage})` }}
      />
      <motion.div
        className="absolute inset-0 bg-black opacity-50"
        initial={{ y: "100%" }}
        animate={{ y: isExpanded ? "0%" : "100%" }}
        transition={{ ease:"easeIn", stiffness: 200 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4"
        initial={{ y: "100%" }}
        animate={{ y: isExpanded ? "0%" : "100%" }}
        transition={{ ease:"easeIn", stiffness: 200 }}
      >
        <motion.h3
          className="text-white text-xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {article.title}
        </motion.h3>
      </motion.div>
    </motion.div>
  );
}
