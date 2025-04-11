"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Article } from "@/interface/news";
import NewsItemMaximized from "./NewsItemMaximized";

type Props = {
  article: Article;
};

export default function NewsItem({ article }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const handleCardClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setOrigin({ x: rect.left - 200 , y: rect.top + rect.height / 2 });
    setIsExpanded(false);
    setIsMaximized(true);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`relative w-full h-52 overflow-hidden rounded-lg cursor-pointer shadow-md`}
        onClick={handleCardClick}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <div className="absolute inset-0">
          {article.urlToImage ? (
            <motion.img
              src={article.urlToImage}
              alt={article.title || "News image"}
              className="absolute object-cover w-full h-full transition-opacity duration-300 opacity-100"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: isExpanded ? 0.7 : 0.3 }}
          transition={{ duration: 0.2 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ y: "100%", opacity: 0 }}
          animate={{
            y: isExpanded ? "0%" : "100%",
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h3 className="text-white text-lg font-bold mb-2 line-clamp-3">
            {article.title}
          </h3>

          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-200 text-sm line-clamp-3"
              >
                {article.description}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Maximized View */}
      <NewsItemMaximized
        isVisible={isMaximized}
        onClose={() => setIsMaximized(false)}
        article={article}
        origin={origin}
      />
    </>
  );
}
