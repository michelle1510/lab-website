'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#publications', label: 'Publications' },
  { href: '#people', label: 'People' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Over the dark hero the bar is see-through with light text; past it, it turns frosted with dark text.
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { rootMargin: '-64px 0px 0px 0px' },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const onDark = isHeroVisible && !menuOpen;
  const barStyle = onDark
    ? 'bg-transparent text-white/90'
    : 'bg-white/70 text-foreground shadow-sm backdrop-blur-lg';
  const hoverStyle = onDark
    ? 'hover:[text-shadow:0_0_5px_#D4C2FC,0_0_15px_#D4C2FC]'
    : 'hover:text-secondary';

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${barStyle}`}>
      <div className="flex h-16 items-center justify-end px-6 sm:px-10 lg:px-20">
        {/* Desktop links */}
        <div className="hidden gap-8 md:flex">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={`py-1 transition-all ${hoverStyle}`}>
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className={`flex size-11 items-center justify-center text-2xl transition-all md:hidden ${hoverStyle}`}
        >
          {menuOpen ? '×' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="flex flex-col gap-2 px-6 pb-4 md:hidden">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`py-2 transition-all ${hoverStyle}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
