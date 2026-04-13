'use client';

import '@/app/globals.css';
import { useScroll, useSpring, motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import WorkSection from '@/components/WorkSection';
import Contact from '@/components/Contact';

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[999] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #7c3aed, #a855f7, #c084fc)',
        transformOrigin: '0%',
      }}
    />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <ScrollProgressBar />
      <Navbar />

      {/* Subtle fixed grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <main className="relative z-10">
        <Hero />

        <hr className="section-divider mx-4 sm:mx-8 lg:mx-16" />

        <TechStack />

        <hr className="section-divider mx-4 sm:mx-8 lg:mx-16" />

        <WorkSection />

        <hr className="section-divider mx-4 sm:mx-8 lg:mx-16" />

        <Contact />
      </main>
    </div>
  );
}
