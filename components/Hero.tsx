'use client';

import Aurora from '@/app/anim/Aurora';
import DecryptedText from '@/components/DecryptedText';
import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-16"
      aria-label="Hero"
    >
      {/* Aurora BG */}
      <div className="absolute inset-0 w-full h-full">
        <Aurora
          colorStops={['#2e0068', '#7c3aed', '#a855f7']}
          blend={0.45}
          amplitude={1.2}
          speed={0.8}
        />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #09090b 100%)',
        }}
      />

      {/* Floating orb decorations */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >

        {/* Avatar — circular with purple ring (agilarrachman style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-32 mb-12 relative inline-block animate-float"
        >
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #7c3aed, #a855f7, #c084fc, #7c3aed)',
              padding: '3px',
              borderRadius: '9999px',
              filter: 'blur(1px)',
              transform: 'scale(1.06)',
              opacity: 0.7,
            }}
          />
          {/* Border ring */}
          
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-zinc-900 overflow-hidden">
                <Image
                  src="/dit1.jpeg"
                  alt="Foto profil Raditya"
                  width={144}
                  height={144}
                  priority
                  className="object-cover w-full h-full"
                />
              </div>
          
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-8 w-screen ml-[calc(50%-50vw)]"
        >
          I build digital <span className="gradient-text">experiences</span>
        </motion.h1>

        {/* Subtitle with decrypted text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-300 mb-2"
        >
          Hi, I&apos;m{' '}
          <span className="text-white">
            <DecryptedText
              text="Raden Muhammad Raditya Rahman"
              animateOn="view"
              revealDirection="start"
              sequential
              speed={100}
              maxIterations={8}
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-zinc-400 text-base sm:text-lg max-w-4xl mx-auto mb-10 leading-relaxed"
        >
          A Software Engineering Technology student at IPB University with a strong focus on web development and data analytics. Passionate about exploring new tech trends, I hone my skills through collaborative projects to craft impactful digital experiences. I am highly adaptable, eager to embrace challenges, and driven to deliver the best results.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-sm sm:max-w-none mx-auto"
        >
          <a
            id="hero-cta-contact"
            href="#contact"
            className="group relative w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5 flex items-center justify-center"
          >
            <span className="relative z-10">Get In Touch</span>
          </a>
          <a
            id="hero-cta-cv"
            href="/cv.pdf"
            download
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-zinc-300 font-bold text-sm hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Download CV
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 mb-8 flex flex-col items-center gap-2 text-zinc-500 text-xs"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <svg className="w-4 h-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
