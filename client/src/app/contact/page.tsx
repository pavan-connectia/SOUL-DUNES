"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Image from "next/image";
import { motion, easeOut } from "framer-motion";

export default function CONTACT() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
  };

  return (
    <div className="bg-[#f5ebd7] min-h-screen overflow-x-hidden">
      <Header />

      <main>
        <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/contact.jpg"
              alt="Contact Image"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-white text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tighter"
            >
              Contact us.
            </motion.h1>
          </div>
        </div>

        <section className="w-full py-20 px-6 flex flex-col items-center bg-[#A5C89E]">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl w-full text-center space-y-8 mb-16"
          >

            <motion.p 
              variants={itemVariants}
              className="text-gray-800 text-lg md:text-xl font-medium"
            >
              307, 3rd Floor, Opal Tower, Business Bay, Dubai - UAE
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-1">
              <h3 className="text-gray-900 font-bold text-xl uppercase tracking-widest">Hours</h3>
              <p className="text-gray-700 font-medium">Monday to Sunday</p>
              <p className="text-gray-700 font-medium">10 am to 10 pm</p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-gray-900 font-bold text-lg">
                <a href="tel:+971543997992" className="hover:text-white transition-colors duration-300">
                  +971 54 399 7992
                </a>
              </p>
              <p className="text-gray-900 font-bold text-lg">
                <a href="mailto:info@thesoldunes.com" className="hover:text-white transition-colors duration-300">
                  info@thesoldunes.com
                </a>
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full max-w-225 h-80 md:h-90 rounded-2xl overflow-hidden shadow-xl border border-gray-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1786520110377!2d55.271348!3d25.186641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f68347895f32b%3A0x608e0689b2767098!2sOpal%20Tower!5e0!3m2!1sen!2sae!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}