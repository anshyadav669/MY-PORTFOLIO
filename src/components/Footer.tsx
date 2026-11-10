import React, { useState, useEffect } from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sound } from '../utils/sound';
import { GithubIcon, LinkedinIcon } from './icons';
import { 
  Mail, 
  Code2, 
  Award, 
  ArrowUp, 
  Sparkles, 
  Terminal, 
  Clock 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] text-white pt-20 pb-12 border-t border-white/[0.08] overflow-hidden">
      {/* Yellow Gradient Accent Top Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD600] to-[#FF3838]" />

      {/* Subtle Ambient Red Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF3838]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/[0.08]">
          {/* Col 1: Identity & Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#111111] border border-[#FFD600]/40 flex items-center justify-center font-grotesk font-black text-sm text-[#FFD600]">
                AKY
              </div>
              <div>
                <span className="font-grotesk font-black text-lg text-white tracking-wider block">
                  {RESUME_DATA.personal.name}
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  SOFTWARE DEVELOPER &bull; NIT SILCHAR
                </span>
              </div>
            </div>

            <p className="text-xs text-[#BDBDBD] font-sans max-w-sm leading-relaxed">
              Crafting high-performance digital products, intelligent ML inference systems, and competitive algorithmic solutions.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] border border-white/[0.08] text-[11px] font-mono text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>OPEN TO WORK &bull; CONTRACTS / INTERNSHIPS</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Map */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-bold">
              NAVIGATION MAP
            </span>
            <ul className="space-y-2">
              {['About', 'Capabilities', 'Skills', 'Projects', 'Profiles', 'Experience', 'Education', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onMouseEnter={() => sound.playHover()}
                      className="text-neutral-400 hover:text-[#FFD600] transition-colors"
                    >
                      &gt; {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 3: Coordinates & Live Clock */}
          <div className="md:col-span-4 space-y-4 font-mono text-xs">
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-bold">
              STATION METRICS
            </span>

            <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-neutral-400">
                <span>LOCATION:</span>
                <span className="text-white">NIT Silchar, Assam, IN</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>LOCAL TIME (IST):</span>
                <span className="text-[#FFD600] font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#FFD600]" />
                  {time || '13:00:00'}
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>STATUS:</span>
                <span className="text-emerald-400">AVAILABLE</span>
              </div>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              onMouseEnter={() => sound.playHover()}
              className="w-full py-2.5 rounded-xl bg-[#171717] hover:bg-[#FFD600] text-neutral-300 hover:text-black font-grotesk font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/[0.08] hover:border-[#FFD600] transition-all"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back To Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Channels */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} {RESUME_DATA.personal.name}. All Rights Reserved. Built with React, Three.js &amp; Tailwind CSS.
          </div>

          <div className="flex items-center gap-3">
            <a
              href={RESUME_DATA.personal.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-[#FFD600] transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={RESUME_DATA.personal.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-[#FFD600] transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={RESUME_DATA.personal.leetcodeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 hover:text-[#FFA116] transition-colors"
              title="LeetCode"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${RESUME_DATA.personal.email}`}
              className="text-neutral-400 hover:text-[#FF3838] transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
