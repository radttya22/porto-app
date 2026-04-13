'use client';

import { motion } from 'motion/react';
import {
  FaCss3Alt,
  FaFigma,
  FaGit,
  FaGithub,
  FaHtml5,
  FaJs,
  FaLaravel,
  FaNode,
  FaPhp,
  FaPython,
  FaReact,
  FaRProject,
  FaUnity
} from 'react-icons/fa';
import { SiMysql, SiNextdotjs, SiPostgresql, SiTailwindcss, SiTypescript } from 'react-icons/si';
import SectionReveal from './SectionReveal';
import { FaCss } from 'react-icons/fa6';

// ── Tech stack with React Icons ────────────────────────────────────────
const techs = [
  { name: 'Laravel', icon: FaLaravel, color: '#FF2D20' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'React.js', icon: FaReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
  { name: 'PHP', icon: FaPhp, color: '#777BB4' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  { name: 'MySQL', icon: SiMysql, color: '#00758F' },
  { name: 'CSS', icon: FaCss3Alt, color: '#4c26e3' },
  { name: 'R Project', icon: FaRProject, color: '#0f5186' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'HTML', icon: FaHtml5, color: '#E34C26' },
  { name: 'GitHub', icon: FaGithub, color: '#ffffff' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'Figma', icon: FaFigma, color: '#ffffff' },
  { name: 'Unity', icon: FaUnity, color: '#ffffff' }
];

function TechCard({ name, icon: Icon, color, delay }: { name: string; icon: any; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-purple-500/20 hover:bg-zinc-800/60 transition-all duration-100 cursor-default group"
    >
      {/* Icon area */}
      <div 
        className="w-16 h-16 flex items-center justify-center transition-all duration-300 group-hover:scale-110 grayscale group-hover:grayscale-0"
        style={{
          color: color,
          textShadow: `0 0 12px ${color}40`,
        }}
      >
        <Icon size={40} />
      </div>
      {/* Label */}
      <p className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
        {name}
      </p>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section
      id="tech"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-3">
              Tech <span className="gradient-text">Stack</span>
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-1 h-12 bg-purple-500/40 rounded-full" />
              <p className="text-zinc-400 text-base max-w-md">
                Essential tools and technologies that power my development journey.
              </p>
            </div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
          {techs.map((tech, i) => (
            <TechCard
              key={tech.name}
              name={tech.name}
              icon={tech.icon}
              color={tech.color}
              delay={i * 0.04}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
