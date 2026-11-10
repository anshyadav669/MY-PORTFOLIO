import React, { useState, useEffect } from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sound } from '../utils/sound';
import { ReactiveOrb } from './ReactiveOrb';
import { GithubIcon, LinkedinIcon } from './icons';
import { 
  ArrowUpRight, 
  Download, 
  Mail, 
  Code, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Award,
  ChevronDown
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const roles = RESUME_DATA.personal.roles;

  // Typing effect for cycling roles
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          setDisplayedRole(currentRole.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Pause at full word
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayedRole(currentRole.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, roles]);

  const scrollTo = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative z-10 min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden">
      {/* Background Gradients & Spotlights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FFD600]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#FF3838]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />

      {/* Top Precision Metric Bar */}
      <div className="max-w-[1520px] mx-auto w-full px-4 sm:px-6 lg:px-8 mb-6">
        <div className="ruler-top mb-3 opacity-60" />
        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-400 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD600] inline-block animate-pulse" />
            <span className="text-[#FFD600] font-bold">STATUS: AVAILABLE</span>
            <span className="text-white/20">|</span>
            <span>SYSTEM.DEV_ENV: ONLINE</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>LOCATION: NIT SILCHAR, ASSAM [24.83° N, 92.77° E]</span>
            <span className="text-white/20">|</span>
            <span className="text-[#FF3838]">CGPA: 8.12 / 10.0</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1520px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Bold Typography & Headline */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-6">
            {/* Identity Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111] border border-[#FFD600]/30 shadow-[0_0_15px_rgba(255,214,0,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD600]" />
              <span className="text-xs font-mono font-medium text-neutral-300">
                {RESUME_DATA.personal.name}
              </span>
              <span className="text-[10px] bg-[#FFD600]/20 text-[#FFE94A] px-2 py-0.5 rounded-full font-bold">
                NIT SILCHAR
              </span>
            </div>

            {/* Giant Futuristic Headline */}
            <h1 className="font-outfit text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.05]">
              TURNING IDEAS INTO <br />
              <span className="text-[#FFD600] relative inline-block">
                DIGITAL REALITY
                <span className="absolute bottom-1 left-0 w-full h-[5px] bg-[#FF3838] opacity-80 rounded" />
              </span>
              .
            </h1>

            {/* Dynamic Cycling Role Line */}
            <div className="flex items-center gap-2 font-mono text-lg sm:text-xl text-neutral-300 h-8">
              <span className="text-[#FFD600]">&gt;</span>
              <span>I engineer as a</span>
              <span className="text-[#FFE94A] font-bold border-b-2 border-[#FFD600]">
                {displayedRole}
              </span>
              <span className="w-2.5 h-5 bg-[#FFD600] inline-block animate-pulse" />
            </div>

            {/* Personalized Resume Tagline */}
            <p className="text-sm sm:text-base text-[#BDBDBD] font-sans leading-relaxed max-w-xl">
              {RESUME_DATA.personal.tagline}
            </p>

            {/* Quick Stat Pill Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {RESUME_DATA.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#111111]/80 border border-white/[0.08] hover:border-[#FFD600]/40 transition-all hover:translate-y-[-2px] group"
                >
                  <div className="text-xl sm:text-2xl font-black font-grotesk text-[#FFD600] group-hover:text-white transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-mono font-semibold text-neutral-300 mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[9px] text-neutral-500 truncate">
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons & Links */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => scrollTo('projects')}
                onMouseEnter={() => sound.playHover()}
                className="group px-6 py-3.5 rounded-xl bg-[#FFD600] text-black font-grotesk font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(255,214,0,0.4)] hover:shadow-[0_0_40px_rgba(255,214,0,0.7)] transition-all hover:scale-105 active:scale-95"
              >
                <span>Explore Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenResume();
                }}
                onMouseEnter={() => sound.playHover()}
                className="px-6 py-3.5 rounded-xl bg-[#171717] hover:bg-[#202020] text-white border border-white/[0.15] hover:border-[#FFD600] font-grotesk font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <Download className="w-4 h-4 text-[#FFD600]" />
                <span>Resume PDF</span>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                onMouseEnter={() => sound.playHover()}
                className="px-5 py-3.5 rounded-xl text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5"
              >
                <span>Get In Touch</span>
                <span>→</span>
              </button>
            </div>

            {/* Social & Platform Quick Links */}
            <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                PROFILES:
              </span>

              <a
                href={RESUME_DATA.personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="p-2 rounded-lg bg-[#111111] border border-white/[0.08] hover:border-[#FFD600] text-neutral-400 hover:text-[#FFD600] transition-all hover:scale-110"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={RESUME_DATA.personal.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="p-2 rounded-lg bg-[#111111] border border-white/[0.08] hover:border-[#FFD600] text-neutral-400 hover:text-[#FFD600] transition-all hover:scale-110"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={RESUME_DATA.personal.leetcodeUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="px-2.5 py-1.5 rounded-lg bg-[#111111] border border-white/[0.08] hover:border-[#FFA116] text-neutral-400 hover:text-[#FFA116] transition-all text-xs font-mono flex items-center gap-1.5"
                title="LeetCode (400+ Solved)"
              >
                <Code className="w-3.5 h-3.5 text-[#FFA116]" />
                <span>LeetCode 400+</span>
              </a>

              <a
                href={RESUME_DATA.personal.codechefUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="px-2.5 py-1.5 rounded-lg bg-[#111111] border border-white/[0.08] hover:border-[#FFD600] text-neutral-400 hover:text-[#FFD600] transition-all text-xs font-mono flex items-center gap-1.5"
                title="CodeChef (2-Star, Rank 31)"
              >
                <Award className="w-3.5 h-3.5 text-[#FFD600]" />
                <span>CodeChef 2★</span>
              </a>

              <a
                href={`mailto:${RESUME_DATA.personal.email}`}
                onMouseEnter={() => sound.playHover()}
                className="p-2 rounded-lg bg-[#111111] border border-white/[0.08] hover:border-[#FF3838] text-neutral-400 hover:text-[#FF3838] transition-all hover:scale-110"
                title="Send Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Red Cubes (Expanded Width) */}
          <div className="lg:col-span-7 xl:col-span-7 relative w-full flex items-center justify-center">
            <ReactiveOrb />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="w-full flex justify-center mt-10">
        <button
          onClick={() => scrollTo('about')}
          onMouseEnter={() => sound.playHover()}
          className="flex flex-col items-center gap-1 text-neutral-500 hover:text-[#FFD600] transition-colors group"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL TO DISCOVER</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#FFD600]" />
        </button>
      </div>
    </section>
  );
};
