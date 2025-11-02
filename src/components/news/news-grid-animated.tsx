"use client";
import { motion } from "framer-motion";

import NewsCard from "./news-card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function NewsGridAnimated({ data }: { data: any[] }) {
  return (
    <motion.ul
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {data.map((ele, index) => (
        <motion.li
          className="shadow-xl rounded-lg overflow-hidden"
          key={index}
          variants={itemVariants}
        >
          <NewsCard data={ele} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
