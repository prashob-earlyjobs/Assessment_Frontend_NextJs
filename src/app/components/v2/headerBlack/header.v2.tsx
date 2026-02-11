"use client";

import { useState, useEffect, useRef } from "react";

const HeaderV2 = ({ title, onScrollStateChange }: { title: string; onScrollStateChange?: (isScrolled: boolean, title: string) => void }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Trigger shrink animation after scrolling 50px
            const scrolled = scrollY > 50;
            setIsScrolled(scrolled);
            // Notify parent component about scroll state
            if (onScrollStateChange) {
                onScrollStateChange(scrolled, title);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [title, onScrollStateChange]);

    return (
        <header 
            ref={headerRef}
            className={`pt-16 md:pt-20 bg-[#111] flex items-center justify-center transition-all duration-300 ease-in-out ${
                isScrolled ? 'h-[15vh]' : 'h-[30vh]'
            }`}
        >
            <h2 
                className={`text-white font-bold leading-tight font-figtree text-center transition-all duration-300 ease-in-out ${
                    isScrolled 
                        ? 'text-2xl md:text-3xl lg:text-4xl opacity-70' 
                        : 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl opacity-100'
                }`}
            >
                {title}
            </h2>
        </header>
    );
}

export default HeaderV2;