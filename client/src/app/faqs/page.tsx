"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { motion, easeOut } from "framer-motion";

export default function FAQS() {
  const faqData = [
    {
      question: "How long does a desert safari really take door-to-door?",
      answer: "Most websites list 6 hours, but in reality, with hotel pick-up and drop-off it can stretch closer to 7-8 hours. Guests planning evening dinner reservations or late flights should account for this extra buffer."
    },
    {
      question: "What happens if the weather changes suddenly?",
      answer: "Rain in the desert is rare but possible. On such days, dune bashing may be modified or replaced with camp-based activities for safety. Camps continue to operate, and entertainment/dining is not cancelled but the driving portion may be shorter."
    },
    {
      question: "Is alcohol available at the camps?",
      answer: "Yes, some camps serve alcohol at an additional cost. It is never included in the package price, and regulations mean service stops at a fixed time. Guests should carry cash or card for bar purchases, as not all vendors accept digital payments."
    },
    {
      question: "Do I need travel insurance for a desert safari?",
      answer: "While vehicles and camps are insured, travellers are still advised to have general travel insurance. This covers medical emergencies, especially for guests with pre-existing conditions, since camp clinics are basic and the nearest hospitals can be 30-40 minutes away."
    },
    {
      question: "Can dietary needs (vegan, gluten-free, halal) be accommodated?",
      answer: "Yes, but only with advance notice. Standard buffets are halal by default and include vegetarian options, but strict vegan, gluten-free, or allergy-specific meals need to be flagged at the time of booking to be prepared separately."
    },
    {
      question: "How do refund or reschedule’s work if I miss my pick-up?",
      answer: "Pick-up times are strict due to convoy schedules. If a guest misses the transfer, the safari usually counts as a \"no-show\" with no refund. Rescheduling is possible only if arranged at least 24 hours prior. Always keep your phone handy and confirm pick-up details in advance."
    }
  ];

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
      transition: { duration: 0.6, ease: easeOut } 
    },
  };

  return (
    <div className="bg-[#f5ebd7] min-h-screen overflow-x-hidden">
      <Header />
      
      <main className="px-6 md:px-12 lg:px-20 py-24 md:py-40">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-[#2d2d2d] mb-20 tracking-tighter"
        >
          FAQs
        </motion.h1>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16"
        >
          {faqData.map((faq, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="flex flex-col gap-4 group"
            >
              <h3 className="text-[22px] font-bold leading-[1.2] text-[#2d2d2d] tracking-tight group-hover:text-black transition-colors duration-300">
                {faq.question}
              </h3>
              <p className="text-[#3a3a3a] text-[16px] leading-relaxed font-medium opacity-80">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}