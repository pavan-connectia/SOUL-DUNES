"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { TextMarquee } from "@/components/layout/TextMarquee";
import Image from "next/image";
import { motion, easeOut } from "framer-motion";

export default function Who() {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  return (
    <div className="bg-[#f5ebd7] min-h-screen flex flex-col overflow-x-hidden">
      <Header />

      <main className="grow pt-24 md:pt-40 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          
          
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 1.05 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex justify-center w-full order-1 md:order-2"
          >
            <div className="relative w-full md:w-[85%] aspect-4/5 md:h-[85vh] md:aspect-auto overflow-hidden rounded-sm shadow-sm">
              <Image
                src="/who.webp"
                alt="Dune landscape"
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>

          
          <motion.div 
            className="flex flex-col justify-center order-2 md:order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-full max-w-xl ml-0 md:ml-20">
              
              <motion.h1 
                variants={itemVariants}
                className="text-4xl lg:text-[60px] font-bold tracking-tighter text-[#1a1a1a] leading-[1.1] md:leading-[0.9] mb-8 md:mb-20"
              >
                The Sol Dunes
              </motion.h1>

              <div className="space-y-6 md:space-y-12">
                <motion.p 
                  variants={itemVariants}
                  className="text-base lg:text-[18px] leading-relaxed text-[#2d2d2d] font-medium"
                >
                  Sol Dunes is held together by a quiet league of thinkers, dreamers,
                  and doers. Each grounded in their own field, yet drawn to a shared
                  way of working. Our team blends background in design, terrain-based
                  hospitality, and soulful storytelling, yet it isn&apos;t credentials that define
                  us. It&apos;s a way of noticing.
                </motion.p>

                <motion.p 
                  variants={itemVariants}
                  className="text-base lg:text-[18px] leading-relaxed text-[#2d2d2d] font-medium"
                >
                  A way of listening to the land before shaping it. Whether orchestrating
                  guest experiences or refining the smallest visual details, the people
                  behind Sol Dunes approach each task with restraint, rigour, and
                  reverence. We believe that magic lies not in what is added, but in what
                  is sensed. And the team exists to ensure that every experience, no
                  matter how fleeting, feels entirely unrepeatable.
                </motion.p>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

     
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="py-10 md:py-16"
      >
        <TextMarquee />
      </motion.div>

      <Footer />
    </div>
  );
}