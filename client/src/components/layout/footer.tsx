"use client";
import { motion, easeOut } from 'framer-motion';

export default function Footer() {
    
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
                ease: easeOut
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <footer className="bg-[#f5ebd7] py-24 px-6 md:px-12 lg:px-20 text-[#2d2d2d]">
            <motion.div 
                className="max-w-7xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">

                    <motion.div variants={itemVariants} className="flex flex-col items-center">
                        <h3 className="text-4xl font-bold mb-8 tracking-tight">Location</h3>
                        <div className="text-[19px] leading-relaxed opacity-80">
                            <p>307, 3rd Floor, Opal Tower,</p>
                            <p>Business Bay, Dubai - UAE</p>
                        </div>
                    </motion.div>

                    
                    <motion.div variants={itemVariants} className="flex flex-col items-center">
                        <h3 className="text-4xl font-bold mb-8 tracking-tight">Hours</h3>
                        <div className="text-[19px] leading-relaxed opacity-80">
                            <p>Monday to Friday</p>
                            <p>10 am — 10 pm</p>
                        </div>
                    </motion.div>

                  
                    <motion.div variants={itemVariants} className="hidden md:flex flex-col items-center">
                        <h3 className="text-4xl font-bold mb-8 tracking-tight">Contact</h3>
                        <div className="text-[19px] leading-relaxed opacity-80">
                            <p>
                                <a href="mailto:info@thesoldunes.com" className="hover:text-black transition-colors">
                                    info@thesoldunes.com
                                </a>
                            </p>
                            <p>
                                <a href="tel:+971543997992" className="hover:text-black transition-colors">
                                    +971 54 399 7992
                                </a>
                            </p>
                        </div>
                    </motion.div>

                </div>

              
                <motion.div 
                    variants={itemVariants}
                    className="mt-20 flex justify-center"
                >
                    <motion.a
                        href="https://www.instagram.com/thesoldunes/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        className="drop-shadow-xl"
                        aria-label="Follow us on Instagram"
                    >
                        <svg
                            viewBox="0 0 100 100"
                            className="w-20 h-20 md:w-24 md:h-24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <radialGradient id="instaGradient" r="150%" cx="30%" cy="107%">
                                    <stop stopColor="#fdf497" offset="0" />
                                    <stop stopColor="#fdf497" offset="0.05" />
                                    <stop stopColor="#fd5949" offset="0.45" />
                                    <stop stopColor="#d6249f" offset="0.6" />
                                    <stop stopColor="#285AEB" offset="0.9" />
                                </radialGradient>
                            </defs>
                            <rect width="100" height="100" rx="24" fill="url(#instaGradient)" />
                            <g fill="none" stroke="#fff" strokeWidth="6">
                                <rect x="22" y="22" width="56" height="56" rx="16" />
                                <circle cx="50" cy="50" r="14" />
                                <circle cx="72" cy="28" r="2" fill="#fff" stroke="none" />
                            </g>
                        </svg>
                    </motion.a>
                </motion.div>

          
                <motion.div 
                    variants={itemVariants}
                    className="flex md:hidden flex-col items-center text-center mt-16"
                >
                    <h3 className="text-4xl font-bold mb-8 tracking-tight">Contact</h3>
                    <div className="text-[19px] leading-relaxed opacity-80">
                        <p>
                            <a href="mailto:info@thesoldunes.com" className="hover:opacity-60 transition-opacity">
                                info@thesoldunes.com
                            </a>
                        </p>
                        <p>
                            <a href="tel:+971543997992" className="hover:opacity-60 transition-opacity">
                                +971 54 399 7992
                            </a>
                        </p>
                    </div>
                </motion.div>



            </motion.div>
        </footer>
    );
}