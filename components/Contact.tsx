'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { MouseEvent, useRef, useState } from 'react';
import ElectricBorder from './ElectricBorder';
import SectionReveal from './SectionReveal';

/* ─── Magnetic Button ─── */
function MagneticLink({
  href,
  children,
  className = '',
  external = false,
}: Readonly<{
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });

  const handleMouse = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((e.clientX - cx) * 0.4);
    my.set((e.clientY - cy) * 0.4);
  };

  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

const socialLinks = [
  {
    id: 'social-github',
    label: 'GitHub',
    href: 'https://github.com/radityya2',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'social-linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/raden-raditya',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    ),
  },
  {
    id: 'social-instagram',
    label: 'Instagram',
    href: 'https://instagram.com/radttyaaa',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string };
      if (!res.ok) {
        throw new Error(json?.error || 'Gagal mengirim pesan');
      }

      setStatus('sent');
      setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Gagal mengirim pesan');
    }
  };

  const FormContent = (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <h3 className="text-xl font-bold text-white mb-6">Send a message</h3>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-firstname" className="text-xs text-zinc-400 font-medium">
              First Name
            </label>
            <input
              id="contact-firstname"
              type="text"
              placeholder="Raden"
              value={form.firstName}
              onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
              className="px-4 py-3 rounded-xl bg-zinc-900 border border-white/8 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 focus:bg-zinc-900/80 transition-all duration-200 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-lastname" className="text-xs text-zinc-400 font-medium">
              Last Name
            </label>
            <input
              id="contact-lastname"
              type="text"
              placeholder="Raditya"
              value={form.lastName}
              onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
              className="px-4 py-3 rounded-xl bg-zinc-900 border border-white/8 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 focus:bg-zinc-900/80 transition-all duration-200 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="text-xs text-zinc-400 font-medium">
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="hello@example.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="px-4 py-3 rounded-xl bg-zinc-900 border border-white/8 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 transition-all duration-200 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-subject" className="text-xs text-zinc-400 font-medium">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="Project Inquiry / Collaboration"
            value={form.subject}
            onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
            className="px-4 py-3 rounded-xl bg-zinc-900 border border-white/8 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 transition-all duration-200 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-message" className="text-xs text-zinc-400 font-medium">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Tell me about your project or idea..."
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
            className="px-4 py-3 rounded-xl bg-zinc-900 border border-white/8 text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/60 transition-all duration-200 text-sm resize-none"
          />
        </div>

        <motion.button
          id="contact-submit"
          type="submit"
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(168,85,247,0.3)' }}
          whileTap={{ scale: 0.98 }}
          disabled={status === 'sending'}
          className="mt-2 w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-colors duration-300"
        >
          {status === 'sending' ? 'Sending...' : 'Let\u2019s Connect'}
        </motion.button>

        {status === 'sent' && (
          <p className="text-xs text-emerald-400 mt-2">Thank you for your message!</p>
        )}
        {status === 'error' && (
          <p className="text-xs text-red-400 mt-2">{errorMsg || 'Failed to send message.'}</p>
        )}
      </form>
    </div>
  );

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-16 relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        <SectionReveal>
          <div className="text-center mb-14">
            <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Let&apos;s collaborate
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              Let&apos;s <span className="gradient-text">build</span>
              <br />
              something great
            </h2>
            <p className="mt-5 text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
              Whether it&apos;s a startup MVP, an enterprise system, or a research collaboration —
              I&apos;m ready. Drop me a message.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form – spans 3 cols */}
          <SectionReveal direction="left" className="lg:col-span-3">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-zinc-300"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for opportunities</span>
            </motion.div>

            <fieldset
              className="border-0 p-0 m-0 min-w-0"
              onMouseEnter={() => setIsFormHovered(true)}
              onMouseLeave={() => setIsFormHovered(false)}
            >
              {isFormHovered ? (
                <ElectricBorder color="#a855f7" speed={1} chaos={0.12} borderRadius={16}>
                  {FormContent}
                </ElectricBorder>
              ) : (
                FormContent
              )}
            </fieldset>
          </SectionReveal>

          {/* Right info – spans 2 cols */}
          <SectionReveal direction="right" className="lg:col-span-2">
            <div className="flex flex-col gap-6 h-full">
              {/* Direct contact */}
              <div className="glass rounded-2xl p-6">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-5">
                  Direct Contact
                </p>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Email</p>
                    <a
                      href="mailto:raditya.rahman02@gmail.com"
                      className="text-white text-sm font-semibold hover:text-purple-400 transition-colors"
                    >
                      raditya.rahman02@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Phone</p>
                    <a
                      href="tel:+6281295974452"
                      className="text-white text-sm font-semibold hover:text-purple-400 transition-colors"
                    >
                      +62 812-9597-4452
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Location</p>
                    <p className="text-white text-sm font-semibold">Bogor, Indonesia</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="glass rounded-2xl p-6 flex-1">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-5">
                  Find Me Online
                </p>
                <div className="flex flex-col gap-3">
                  {socialLinks.map((social) => (
                    <MagneticLink
                      key={social.id}
                      href={social.href}
                      external
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 hover:bg-purple-600/15 hover:border-purple-500/30 border border-white/5 text-zinc-400 hover:text-purple-300 transition-all duration-200 text-sm font-medium group"
                    >
                      <span className="text-zinc-500 group-hover:text-purple-400 transition-colors">
                        {social.icon}
                      </span>
                      {social.label}
                      <span className="ml-auto text-zinc-700 group-hover:text-purple-400 transition-colors text-xs">↗</span>
                    </MagneticLink>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
