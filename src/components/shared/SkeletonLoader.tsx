import { motion } from "framer-motion";

export default function SkeletonLoader() {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 p-6">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-full bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-lg"
          >
            <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded-md mb-3 animate-pulse"></div>
            <div className="h-5 w-1/2 bg-gray-300 dark:bg-gray-600 rounded-md mb-3 animate-pulse"></div>
            <div className="h-8 w-full bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
          </motion.div>
        ))}
    </div>
  );
}
