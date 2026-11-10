import React from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sound } from '../utils/sound';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle, Sparkles } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden border-t border-white/[0.06]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#FFD600]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FFD600] tracking-widest uppercase">
              <GraduationCap className="w-3.5 h-3.5 text-[#FFD600]" />
              <span>// 07 ACADEMIC FOUNDATION & DEGREES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
              EDUCATION &amp; <span className="text-[#FFD600]">CREDENTIALS</span>
            </h2>
          </div>
          <p className="mt-4 sm:mt-0 font-mono text-xs text-neutral-400">
            RECORD: <span className="text-[#FFD600] font-bold">NIT SILCHAR + KOTA FOUNDATION</span>
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {RESUME_DATA.education.map((edu, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="glass-card-interactive p-8 rounded-3xl border border-white/[0.08] hover:border-[#FFD600]/50 relative group flex flex-col justify-between"
            >
              {/* HUD Corner Accents */}
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              <div>
                {/* Header with Institution & Duration */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#FFE94A] bg-[#111111] px-3 py-1 rounded-full border border-white/[0.08] flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#FFD600]" />
                    {edu.duration}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#FF3838]" />
                    {edu.location}
                  </span>
                </div>

                <h3 className="text-xl font-outfit font-black text-white group-hover:text-[#FFD600] transition-colors mb-1">
                  {edu.institution}
                </h3>
                <div className="text-xs font-mono text-neutral-300 mb-6">
                  {edu.degree} — {edu.field}
                </div>

                {/* Prominent Score Metric Badge */}
                <div className="p-4 rounded-2xl bg-[#111111] border border-[#FFD600]/30 mb-6 flex items-center justify-between group-hover:border-[#FFD600] transition-colors">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                      ACADEMIC PERFORMANCE
                    </span>
                    <span className="text-2xl font-grotesk font-black text-[#FFD600]">
                      {edu.score}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#FFD600]/15 text-[#FFE94A]">
                    {edu.scoreType}
                  </span>
                </div>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  {edu.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-sans leading-relaxed">
                      <CheckCircle className="w-3.5 h-3.5 text-[#FFD600] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom System Label */}
              <div className="mt-6 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-neutral-500 flex items-center justify-between">
                <span>VERIFIED_EDUCATION_RECORD</span>
                <span className="text-[#FFD600]">INDEX 0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
