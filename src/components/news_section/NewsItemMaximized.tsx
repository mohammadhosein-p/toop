"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Article } from "@/interface/news";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  article: Article;
  origin: { x: number; y: number };
};

export default function NewsItemMaximized({
  isVisible,
  onClose,
  article,
  origin,
}: Props) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isFullImage, setFullImage] = useState(false);

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center"
            initial={{
              opacity: 0,
              scale: 0.8,
              x: origin.x - windowSize.width / 2,
              y: origin.y - windowSize.height / 2,
            }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.8,
              x: origin.x - windowSize.width / 2,
              y: origin.y - windowSize.height / 2,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Prevent backdrop click from closing when clicking inside modal */}
            <div
              className="bg-white max-w-6xl w-full mx-4 rounded-2xl overflow-hidden relative shadow-2xl h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => {
                  isFullImage ? setFullImage(false) : onClose();
                }}
                className="absolute top-4 right-4 z-50 bg-black/70 text-white p-1 rounded-full text-xl cursor-pointer hover:bg-black"
              >
                {isFullImage ? <IoIosArrowBack /> : <IoClose />}
              </motion.button>

              <div className="flex h-full w-full">
                {article.urlToImage && (
                  <motion.img
                    onClick={() => setFullImage((prev) => !prev)}
                    src={article.urlToImage}
                    alt={article.title}
                    className={`h-full mx-auto cursor-pointer`}
                    initial={false}
                    animate={{
                      height: isFullImage ? "100%" : "auto",
                      width: isFullImage ? "100%" : "60%",
                      objectFit: isFullImage ? "contain" : "cover",
                    }}
                    layout
                    transition={{ duration: 0.5 }}
                  />
                )}

                {!isFullImage && (
                  <motion.div
                    initial={false}
                    animate={{ width: "40%", padding: "1.5rem" }}
                    transition={{ duration: 0.125 }}
                    className="overflow-hidden flex flex-col"
                  >
                    <a href={article.url} target="_blank">
                      <h2 className="hover:text-emerald-600 transition-all hover:underline cursor-pointer text-2xl text-emerald-900 font-bold mb-4">
                        {article.title}
                      </h2>
                    </a>

                    <div
                      className="overflow-y-auto text-sm text-gray-600 pr-2"
                      style={{ maxHeight: "calc(90vh - 100px)" }}
                    >
                      <p className="text-emerald-700/80 text-lg my-1 mb-2">
                        {article.description}
                      </p>
                      <p>{article.content?.split("…")[0]}...</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
