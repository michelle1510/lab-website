'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const textColor = isHeroVisible ? 'text-white/90' : 'text-foreground';
  const hoverStyle = isHeroVisible
    ? 'hover:[text-shadow:0_0_5px_#D4C2FC,0_0_15px_#D4C2FC]'
    : 'hover:text-secondary';

  return (
    <nav className="sticky top-0 pl-8 pt-20 h-screen z-50 bg-white/50 bg-opacity-30 backdrop-blur-lg">
      <div className={`flex flex-col gap-4 transition-colors duration-200 ${textColor}`}>
        <Link className={`transition-all ${hoverStyle}`} href="#about">About</Link>
        <Link className={`transition-all ${hoverStyle}`} href="#publications">Publications</Link>
        <Link className={`transition-all ${hoverStyle}`} href="#people">People</Link>
        <Link className={`transition-all ${hoverStyle}`} href="#contact">Contact</Link>
      </div>
    </nav>
  );
}
