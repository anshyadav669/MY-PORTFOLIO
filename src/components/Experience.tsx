import React from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sound } from '../utils/sound';
import { Briefcase, Calendar, MapPin, CheckCircle, Terminal, Sparkles } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden border-t border-white/[0.06]">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FFD600]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FFD600] tracking-widest uppercase">
              <Briefcase className="w-3.5 h-3.5 text-[#FFD600]" />
              <span>// 06 PROFESSIONAL EXPERIENCE & ROLES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
              WORK <span className="text-[#FFD600]">EXPERIENCE</span>
            </h2>
          </div>
          <p className="mt-4 sm:mt-0 font-mono text-xs text-neutral-400">
            RECORD: <span className="text-white">STARTUP FREELANCE + PROBLEM SETTING</span>
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-[#FFD600]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {RESUME_DATA.experience.map((exp, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="relative group"
            >
              {/* Timeline Glowing Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#080808] border-2 border-[#FFD600] group-hover:scale-125 group-hover:bg-[#FFD600] group-hover:shadow-[0_0_15px_#FFD600] transition-all duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD600] m-auto mt-[3px] group-hover:bg-black transition-colors" />
              </div>

              {/* Experience Card */}
              <div className="glass-card-interactive p-6 sm:p-8 rounded-2xl border border-white/[0.08] hover:border-[#FFD600]/40 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#FFD600] uppercase tracking-wider block">
                      {exp.organization}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-outfit font-black text-white group-hover:text-[#FFD600] transition-colors mt-0.5">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs font-mono text-[#FFE94A] bg-[#111111] px-3 py-1 rounded-full border border-white/[0.08]">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 bg-[#111111] px-3 py-1 rounded-full border border-white/[0.08]">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-2.5 mb-6">
                  {exp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-[#FFD600] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.06]">
                  <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mr-1">
                    TECHNOLOGIES:
                  </span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded bg-[#111111] border border-white/[0.08] text-[11px] font-mono text-[#FFD600]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
