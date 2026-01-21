import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#f5ebd7] py-24 px-6 md:px-12 lg:px-20 text-[#2d2d2d]">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">

                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-bold mb-8 tracking-tight">Location</h3>
                        <div className="text-[19px]  leading-relaxed">
                            <p>307, 3rd Floor, Opal Tower,</p>
                            <p>Business Bay, Dubai - UAE</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <h3 className="text-4xl font-bold mb-8 tracking-tight">Hours</h3>
                        <div className="text-[19px]  leading-relaxed">
                            <p>Monday to Friday</p>
                            <p>10 am — 10 pm</p>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col items-center">
                        <h3 className="text-4xl font-bold mb-8 tracking-tight">Contact</h3>
                        <div className="text-[19px]  leading-relaxed">
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
                    </div>

                </div>

                <div className="mt-20 flex justify-center">
                    <a
                        href="https://www.instagram.com/thesoldunes/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-105 active:scale-95"
                        aria-label="Follow us on Instagram"
                    >
                        <svg
                            viewBox="0 0 100 100"
                            className="w-24 h-24 drop-shadow-md"
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
                    </a>
                </div>

                <div className="flex md:hidden flex-col items-center text-center">
                    <h3 className="text-4xl font-bold mb-8 tracking-tight">Contact</h3>
                    <div className="text-[19px]  leading-relaxed">
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
                </div>

            </div>
        </footer>
    );
}