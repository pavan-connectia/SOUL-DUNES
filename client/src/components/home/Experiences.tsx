"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Experiences() {
  return (
    <section className="bg-[#f5ebd7] py-12 px-6 md:py-24 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 lg:gap-x-24 items-start">
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2 flex flex-col pt-4 md:pt-12"
        >
          <h2 className="text-[50px] md:text-[80px] lg:text-[110px] font-bold leading-[0.9] tracking-tighter text-[#1a1a1a] mb-8 md:mb-12">
            Experiences <br /> that breathe <br /> beyond <br /> itineraries.
          </h2>
          <p className="text-lg md:text-xl text-[#1a1a1a] font-medium mb-6">
            Where the itinerary yields to atmosphere.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1 w-full"
        >
          <div className="relative w-full ml-0 lg:ml-20 lg:w-[80%] h-[50vh] md:h-[85vh] overflow-hidden rounded-[40px] md:rounded-[60px]">
            <Image src="/Experiences.jpeg" alt="Dune landscape" fill className="object-cover" priority />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="order-3 md:col-span-2 w-full flex justify-center md:justify-end"
        >
          <Button className="w-full md:w-2/4 bg-[#a6b3a0] hover:bg-[#95a38f] text-[#1a1a1a] rounded-full py-8 text-xl font-medium transition-colors">
            Book Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}