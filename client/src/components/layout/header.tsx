'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Who We Are', href: '/about' },
        { name: 'Book Now', href: '/book' },
        { name: 'Get In Touch', href: '/contact' },
        { name: 'FAQs', href: '/faqs' },
    ];

    return (
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent px-6 py-8 md:px-12 lg:px-20">
            <nav className="relative flex items-center justify-between">

                <div className="md:hidden flex items-center justify-between w-full">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-800 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
                <div className="hidden md:flex justify-center">
                    <div className="text-[#2d2d2d] text-lg font-medium leading-relaxed">

                        <div className="flex space-x-8">
                            {navLinks.slice(0, 3).map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`hover:opacity-70 transition-all
              ${isActive ? 'underline underline-offset-8 decoration-1' : ''}`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex space-x-8 mt-1">
                            {navLinks.slice(3).map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`hover:opacity-70 transition-all
              ${isActive ? 'underline underline-offset-8 decoration-1' : ''}`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                    </div>
                </div>

            </nav>

            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col space-y-4 pb-4 border-t border-black/10 pt-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-xl font-medium ${isActive ? 'text-black underline underline-offset-4' : 'text-gray-600'}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            )}
        </header>
    );
}