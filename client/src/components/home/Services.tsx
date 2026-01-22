"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

// Data for the top accordion section
const services = [
    {
        title: "Desert Escapes",
        description: "Immerse yourself in the golden silence of the dunes with curated stays and private desert camps.",
    },
    {
        title: "Adrenaline Rides",
        description: "Thrill-seeking adventures across the shifting sands, from dune bashing to quad biking.",
    },
    {
        title: "City & Cultural Journeys",
        description: "Where heritage meets horizon, the UAE's cities revealed in contrast and depth.",
    },
    {
        title: "Water & Skyline Experiences",
        description: "Explore the coastlines and modern marvels from a perspective of luxury and calm.",
    },
];

// Data for the detailed categories section
const categories = [
    {
        title: "Desert Escapes",
        image: "/service2.jpeg",
        subItems: [
            {
                name: "Basic",
                features: [
                    "Pick-Drop By 4×4 From Your Location",
                    "4×4 Dune Bashing",
                    "Sand Boarding",
                    "Sun Set Photography",
                    "Short Camel Ride",
                    "Arabic Coffee and Fresh Dates",
                    "Hubbly Bubblee (Sheesha)",
                    "Traditional Costumes",
                    "Unlimited Soft Drinks, Tea, Coffee, Water",
                    "Henna Painting",
                    "2 Belly Dance Shows",
                    "2 Fire Shows",
                    "2 Tanura Dance Shows",
                    "BBQ & Buffet Dinner (Veg & Non-Veg Both Available)"
                ],
            },
            {
                name: "Premium",
                features: [
                    "Pick-Drop By 4×4 From Your Location",
                    "4×4 Dune Bashing",
                    "Sand Boarding",
                    "Sun Set Photography",
                    "Short Camel Ride",
                    "Arabic Coffee and Fresh Dates",
                    "Hubbly Bubble (Sheesha)",
                    "Traditional Costumes",
                    "Unlimited Soft Drinks, Tea, Coffee, Water",
                    "Henna Painting",
                    "2 Belly Dance Shows",
                    "2 Fire Shows",
                    "2 Tanura Dance Shows",
                    "BBQ & Buffet Dinner (Veg & Non-Veg Available)",
                    "VIP Sitting Area Inside the Camp",
                    "Dinner Served On Your Table"
                ]
            },
        ],
    },
    {
        title: "Cultural & City Tours",
        image: "/service1.jpeg",
        subItems: [
            {
                name: "Dubai",
                features: [
                    "Pick & Drop From Your Location",
                    "Zabeel Palace – Info & Photo Stop",
                    "Dubai Frame – Info & Photo Stop",
                    "Bastakiya & Old Houses",
                    "Abra Ride Across Dubai Creek",
                    "Spice & Gold Souq",
                    "Jumeirah Mosque Drive Through",
                    "Islamic Art Center",
                    "Burj Al Arab – Info & Photo Stop",
                    "Atlantis The Palm – Photo Stop",
                ],
            },
            {
                name: "Abu Dhabi",
                features: [
                    "Abu Dhabi Grand Mosque",
                    "YAS Mall – Ferrari World",
                    "Dates’ Market",
                    "Heritage Village",
                    "Marjan Gallery",
                    "Emirates Palace"
                ]
            },
        ],
    },
    {
        title: "Cruises & Yachts",
        image: "/service3.jpeg",
        subItems: [
            {
                name: "Dhow Cruise",
                features: [
                    "Pick Up and Drop Off in Dubai",
                    "2 Hours of Cruising",
                    "Welcome Drink & Dinner Buffet",
                    "Unlimited Soft Drinks & Water",
                    "Traditional Dhow Experience",
                    "Live Entertainment / Tanura Show",
                ],
            },
            { name: "Yachts", features: ["Explore our specialized private yacht charters for bespoke sea experiences."] },
        ],
    },
];

export default function Services() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [activeSub, setActiveSub] = useState<string>("");

    const toggleSub = (key: string) => {
        setActiveSub(activeSub === key ? "" : key);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="bg-[#f5ebd7] overflow-hidden">

            <section className="py-12 px-6 md:py-24 md:px-12 lg:px-20">
                <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                    
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 flex flex-col pt-4 md:h-[110vh]"
                    >
                        <h2 className="text-[60px] md:text-[80px] lg:text-[100px] font-bold tracking-tighter text-[#1a1a1a] mb-12 leading-none">
                            Services
                        </h2>
                        
                        <div className="border-t border-[#1a1a1a]/30">
                            {services.map((service, index) => (
                                <div key={index} className="border-b border-[#1a1a1a]/30">
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full py-6 md:py-8 flex justify-between items-center text-left group"
                                    >
                                        <span className="text-xl md:text-2xl font-medium text-[#1a1a1a] transition-colors group-hover:text-black/60">
                                            {service.title}
                                        </span>
                                        {openIndex === index ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-60 pb-8" : "max-h-0"}`}>
                                        <p className="text-lg md:text-xl text-[#1a1a1a]/80 max-w-md leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="hidden md:block mt-auto pb-2">
                            <a href="https://wa.me/971543997992" target="_blank">
                                <Button className="w-full bg-[#a6b3a0] hover:bg-[#95a38f] text-[#1a1a1a] rounded-full py-8 text-xl font-medium transition-transform active:scale-95">
                                    Book Now
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 w-full"
                    >
                        <div className="relative w-full h-[60vh] md:h-[110vh] overflow-hidden rounded-[40px]">
                            <Image src="/service.jpeg" alt="Our Services" fill className="object-cover" priority />
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-12 px-6 md:py-24 md:px-12 lg:px-20 bg-black/2">
                <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {categories.map((cat, catIdx) => (
                        <motion.div 
                            key={catIdx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                            className="flex flex-col"
                        >
                            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[40px] mb-8 shadow-xl">
                                <Image src={cat.image} alt={cat.title} fill className="object-cover" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-[#1a1a1a] mb-8">
                                {cat.title}
                            </h3>

                            <div className="space-y-0">
                                {cat.subItems.map((sub, subIdx) => {
                                    const key = `${catIdx}-${subIdx}`;
                                    const isOpen = activeSub === key;
                                    return (
                                        <div key={subIdx} className="border-t border-black/10 last:border-b">
                                            <button
                                                onClick={() => toggleSub(key)}
                                                className={`w-full py-4 px-2 flex justify-between items-center text-left transition-all ${isOpen ? "bg-black/3" : ""}`}
                                            >
                                                <span className="text-md font-semibold text-[#1a1a1a]">{sub.name}</span>
                                                {isOpen ? <ChevronUp className="w-5 h-5 opacity-60" /> : <ChevronDown className="w-5 h-5 opacity-60" />}
                                            </button>

                                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-200 py-6 opacity-100" : "max-h-0 opacity-0"}`}>
                                                <ul className="pl-6 space-y-3">
                                                    {sub.features.map((feature, fIdx) => (
                                                        <li key={fIdx} className="text-[#2d2d2d] text-sm md:text-md leading-snug flex items-start">
                                                            <span className="mr-3 mt-1.5 block w-1.5 h-1.5 rounded-full bg-[#a6b3a0] shrink-0" />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

        
            <section className="py-12 px-6 md:py-24 md:px-30 lg:px-50">
                <div className="max-w-360 mx-auto">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
                    >
                        {Array.from({ length: 18 }, (_, i) => i + 1).map((num) => (
                            <motion.div 
                                key={num} 
                                variants={itemVariants}
                                className="relative aspect-2/2 w-full overflow-hidden  group cursor-pointer"
                            >
                                <Image 
                                    src={`/service/s${num}.jpeg`} 
                                    alt={`Gallery image ${num}`} 
                                    fill 
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}