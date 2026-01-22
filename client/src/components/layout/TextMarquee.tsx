"use client";
import { motion } from "framer-motion";

export const TextMarquee = () => {
  const words = "Transcend . Immersive . Elemental .";

  return (
    <div className="relative w-full overflow-hidden bg-[#f5ebd7] py-10">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex shrink-0"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20, 
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-[40px] md:text-[80px] font-bold uppercase  text-[#1a1a1a]"
            >
              {words}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};