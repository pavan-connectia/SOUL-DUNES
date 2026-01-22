"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <main>
      <div className="relative w-full h-screen md:h-[118vh] overflow-hidden flex flex-col items-center">
        <Image
          src="/contact.jpg"
          alt="Contact Image"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20 z-10" />

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-12 md:top-20 z-20 w-full flex justify-center"
        >
          <Image
            src="/logo-white.png"
            alt="Sol Dunes Logo"
            width={280}
            height={190}
            className="object-contain"
          />
        </motion.div>

        <div className="relative z-20 mt-auto mb-20 md:mb-12 flex flex-col items-center text-center px-6 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white text-3xl md:text-[54px] font-bold tracking-tighter leading-[1.1] mb-10"
          >
            Across sand, sea, and skyline <br />
            ~ experiences with a soul of <br />
            their own.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <a href="https://wa.me/971543997992" target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#a6b3a0] cursor-pointer hover:bg-[#95a38f] text-[#1a1a1a] rounded-full px-12 py-8 text-xl font-medium transition-colors duration-300">
                WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </main>
  );
}