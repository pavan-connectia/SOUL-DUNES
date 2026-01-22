"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Horizon() {
  const containerRef = useRef(null);
  const [screenType, setScreenType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenType("mobile");
      } else if (width >= 768 && width < 1024) {
        setScreenType("tablet");
      } else {
        setScreenType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const ranges = {
    mobile: ["-10%", "300%"],
    tablet: ["-100%", "380%"],
    desktop: ["-90%", "400%"],
  };

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    ranges[screenType as keyof typeof ranges] || ranges.desktop
  );

  return (
    <section
      ref={containerRef}
      className="bg-[#57595B] pt-32 pb-32 md:pt-60 md:pb-60 px-6 md:px-12 lg:px-20 overflow-hidden relative"
    >
      <div className="max-w-360 mx-auto flex flex-col relative">
        
        <div className="flex justify-center w-full z-10 relative">
          <div className="relative w-full md:w-3/5 lg:w-2/5 aspect-4/5 rounded-[30px] overflow-hidden">
            <Image
              src="/scroll1.jpeg"
              alt="Top Horizon"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <motion.div
          style={{ y: textY }}
          className="z-20 pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center text-center px-4"
        >
          <div className="mt-20 md:mt-40 flex flex-col items-center">
            <h2 className="text-white text-3xl md:text-5xl lg:text-[60px] font-bold tracking-tighter leading-tight max-w-4xl">
              “Every horizon carries its own vocabulary — we translate it into experience.“
            </h2>
            <p className="mt-6 text-white/70 text-lg md:text-xl font-medium uppercase tracking-widest">
              Walid & Huda, Founders
            </p>
          </div>
        </motion.div>

        <div className="flex justify-start w-full z-10 mt-40">
          <div className="relative w-[70%] md:w-2/5 lg:w-1/5 aspect-square rounded-[30px] overflow-hidden shadow-2xl">
            <Image
              src="/scroll2.jpeg"
              alt="Left Horizon"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex justify-end md:justify-end w-full z-10 mt-40">
          <div className="relative w-[85%] md:w-3/5 lg:w-2/5 aspect-4/5 rounded-[30px] overflow-hidden">
            <Image
              src="/scroll3.jpeg"
              alt="Bottom Horizon"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}