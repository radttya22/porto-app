'use client';

import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import ProjectCard, { Project } from './ProjectCard';
import SectionReveal from './SectionReveal';

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const publications = [
  {
    id: 'pub-1',
    title: 'Functional Testing of Web-Based Input Form Using Boundary Value Analysis Technique: A Case Study on TemanTernak',
    year: '2025',
    publisher: 'Jurnal Teknologi dan Open Source (JTOS)',
    type: 'Journal Article',
    doi: 'https://doi.org/10.36378/jtos.v8i2.5084',
    abstract: "Software reliability is highly dependent on robust data validation mechanisms to prevent data integrity issues. The main issue raised in this study is the risk of input errors in the 'Create Doctor Invitation' form in the TemanTernak web application, which could potentially cause invalid data storage. This study aims to evaluate the quality of the system's input validation to ensure its compliance with the requirements specifications. The proposed solution is the implementation of Black Box Testing with the Boundary Value Analysis (BVA) technique. The testing methodology was carried out following the Software Testing Life Cycle (STLC) stages, in which 17 test scenarios were run to assess four critical elements: name and title, email, phone number, and invitation message. The test results revealed that the system only achieved a functional success rate of 41.2%. Although the application successfully processed standard valid inputs, the system failed to reject the majority of inputs that were outside the tolerance limits (off-boundary) and passed empty inputs in mandatory fields. In conclusion , the current validation mechanism is insufficient to handle extreme conditions. In the future, the implementation of strict server-side validation with range constraints is necessary to mitigate these vulnerabilities.",
  },
  {
    id: 'pub-2',
    title: 'Fire Detection Berbasis Computer Vision Menggunakan YOLOv8 Secara Real-Time',
    year: '2025',
    publisher: 'Jurnal ICT : Information Communication & Technology (JICT-IKMI)',
    type: 'Journal Article',
    doi: 'https://doi.org/10.36054/jict-ikmi.v25i2',
    abstract: "This study presents the development of a fire detection system using image processing techniques based on the YOLOv8 object detection algorithm to achieve fast, accurate, and real-time performance. A dataset of fire images with various visual characteristics was preprocessed, converted into YOLO annotation format, and used to train the model for 30 epochs. Evaluation results demonstrate that the YOLOv8 model performs effectively, achieving an mAP50 of 0.646, a precision of 0.889, and an inference speed of 282.5 ms per frame. The system is integrated with OpenCV to process webcam input and display bounding boxes and confidence scores in real time. The implementation confirms that YOLOv8 is a reliable solution for early fire detection, offering faster and more adaptive responses compared to conventional sensor-based methods. This approach can be applied to modern safety monitoring systems to enhance fire prevention efforts.",
  }
];

const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Company Profile PT Rekayasa Surya Indonesia',
    description: 'A company profile website that showcases services, project portfolio, and brand identity for PT Rekayasa Surya Indonesia in a professional format.',
    tags: ['Next.js', 'React.js','Laravel'],
    github: 'https://github.com/MrafialexanderP/rsi-profile-page/',
    live: 'https://rsi.dgeo.id/',
    image: '/projects/1.png',
  },
  {
    id: 'proj-2',
    title: 'Tokoponik Admin Dashboard',
    description: 'An admin dashboard built to manage products, orders, and operational data for Tokoponik with a clean interface and efficient workflow.',
    tags: ['Laravel', 'PostgreSQL', 'REST API'],
    github: 'https://github.com/radityya2/tokoponik-admin',
    image: '/projects/6.png',
  },
  {
    id: 'proj-3',
    title: 'Health Guardian Application',
    description: 'An interactive board game companion app designed to bring human anatomy to life. Featuring an Augmented Reality (AR) scanner, it provides an immersive educational experience exploring five vital human organs.',
    tags: ['Unity'],
    link: 'https://drive.google.com/file/d/1DByubRo--0KaNmNCCOmca70FnWHL9Lhr/view?usp=sharing',
    image: '/projects/7.png',
  },
  {
    id: 'proj-4',
    title: 'Klasifikasi Customer Churn dengan Metode Random Forest pada Perusahaan Telecom',
    description: 'A data analysis project to predict potential customer churn in a telecom company using a Random Forest model based on customer features.',
    tags: ['R Project'],
    github: 'https://github.com/Dhamizan/Projek-Damin-Kel3',
    image: '/projects/2.png',
  },
  {
    id: 'proj-5',
    title: 'Company Profile Cimahpar Quail Farm',
    description: 'A company profile website for a quail farm that highlights business information, product details, and contact channels in one informative page.',
    tags: ['Next.js', 'React.js', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/radityya2/quail-farm',
    live: 'https://cimahparquailfarm.my.id/',
    image: '/projects/3.png',
  },
  {
    id: 'proj-6',
    title: 'Mini Project ePosyandu UI/UX',
    description: 'A UI/UX design project for an ePosyandu application focused on easy access to maternal and child data, service schedules, and simple input flows.',
    tags: ['Figma'],
    link: 'https://www.figma.com/design/TibzJBwKx8Y5uoJM87RLfl/P3?node-id=0-1&t=d4mFpck4mrVZLOiY-1',
    image: '/projects/4.png',
  },
  {
    id: 'proj-7',
    title: 'Website Kasir Warkop Mas Laul',
    description: 'A web-based cashier system for recording transactions, managing menu items, and monitoring daily sales at Warkop Mas Laul.',
    tags: ['Laravel', 'PostgreSQL','Supabase'],
    github: 'https://github.com/radityya2/kasir-warkopmaslaul/',
    image: '/projects/5.png',
  },
];

const typeColors: Record<string, string> = {
  'Journal Article': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

type Tab = 'projects' | 'publications';
const INITIAL_PROJECTS_COUNT = 3;

/* ─── Publication Card ────────────────────────────────────────────────────── */
function PublicationCard(
  { pub, index }: Readonly<{ pub: typeof publications[0]; index: number }>
) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // --- 3D Hover Effect Hooks ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200, damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200, damping: 20,
  });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.06) 0%, transparent 60%)`;

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      id={pub.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className="group h-fit cursor-pointer"
    >
      {/* Kartu Bagian Dalam (Glass & Glare) */}
      <div className="relative glass rounded-xl p-5 overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
        
        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: glareBackground,
          }}
        />

        {/* Wrapper Konten (TranslateZ memberikan efek "Maju/Pop-up") */}
        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-start gap-3 mb-3 flex-wrap">
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${
                typeColors[pub.type] || 'bg-zinc-800 text-zinc-400 border-zinc-700'
              }`}
            >
              {pub.type}
            </span>
            <span className="text-zinc-500 text-xs font-medium mt-1">{pub.year}</span>
          </div>

          <h3 className="text-white text-sm sm:text-[15px] font-semibold leading-snug mb-2 group-hover:text-purple-300 transition-colors duration-200">
            {pub.title}
          </h3>

          <p className="text-purple-400/70 text-xs font-medium mb-3">{pub.publisher}</p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5 mb-2"
            aria-expanded={expanded}
          >
            <motion.span
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              ▶
            </motion.span>
            {expanded ? 'Hide abstract' : 'Show abstract'}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-400 text-xs leading-relaxed mb-3 overflow-hidden"
              >
                {pub.abstract}
              </motion.p>
            )}
          </AnimatePresence>

          {pub.doi && (
            <a
              href={pub.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium mt-2"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Publication
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main Section ────────────────────────────────────────────────────────── */
export default function WorkSection() {
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const workSectionRef = useRef<HTMLElement>(null);
  const wasExpandedRef = useRef(false);

  useEffect(() => {
    if (wasExpandedRef.current && !showAllProjects) {
      const t = globalThis.setTimeout(() => {
        workSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 350);
      wasExpandedRef.current = showAllProjects;
      return () => globalThis.clearTimeout(t);
    }
    wasExpandedRef.current = showAllProjects;
  }, [showAllProjects]);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'projects', label: 'Projects', count: projects.length },
    { id: 'publications', label: 'Publication', count: publications.length },
  ];

  return (
    <section
      ref={workSectionRef}
      id="work"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="mb-10">
            <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              My <span className="gradient-text">Work</span>
            </h2>
            <p className="mt-4 text-zinc-400 text-base max-w-xl">
              A mix of production software and academic research — switch between them below.
            </p>
          </div>
        </SectionReveal>

        {/* ── Pill Tab Switcher (Fikri-style) ── */}
        <SectionReveal delay={0.1}>
          <div className="flex items-center gap-2 mb-10">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id !== 'projects') setShowAllProjects(false);
                  }}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    isActive
                      ? 'border-white/20 text-white'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-white/8 border border-white/15"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  {isActive && (
                    <span className="relative z-10 ml-2 text-xs text-zinc-500">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </SectionReveal>

        {/* ── Content ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                <AnimatePresence mode="popLayout" initial={false}>
                  {(showAllProjects ? projects : projects.slice(0, INITIAL_PROJECTS_COUNT)).map((project, i) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.96, filter: 'blur(4px)' }}
                      transition={{
                        duration: 0.50,
                        ease: [0.22, 1, 0.36, 1],
                        opacity: { duration: 0.28 },
                      }}
                    >
                      <ProjectCard project={project} index={i} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {projects.length > INITIAL_PROJECTS_COUNT && (
                <div className="mt-7 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllProjects((prev) => !prev)}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 hover:text-white transition-all duration-300"
                  >
                    {showAllProjects ? 'Show less' : 'Show more'}
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'publications' && (
            <motion.div
              key="publications"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start"
            >
              {publications.map((pub, i) => (
                <PublicationCard key={pub.id} pub={pub} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}