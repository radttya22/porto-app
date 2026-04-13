'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#tech', label: 'Tech' },
  { href: '#work', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 px-0"
      aria-label="Main navigation"
    >
      <div
        className={`rounded-full border shadow-lg shadow-black/30 transition-all duration-500 ${
          scrolled
            ? 'border-white/15 bg-zinc-900/90 shadow-xl backdrop-blur-xl'
            : 'border-white/10 bg-zinc-900/75 backdrop-blur-lg'
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-2 px-3 sm:gap-3 sm:px-5">
          <a
            href="#home"
            className="shrink-0 flex items-center gap-2 text-sm font-bold text-white sm:text-base mr-2"
            aria-label="Home"
          >
            <span className="hidden sm:inline-block">Raden M Raditya</span>
          </a>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-1 overflow-x-auto whitespace-nowrap pr-0.5 no-scrollbar sm:gap-2">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative shrink-0 rounded-full px-3 py-2 text-xs font-semibold transition-colors duration-200 sm:px-3.5 sm:text-sm ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full border border-purple-400/30 bg-purple-500/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
