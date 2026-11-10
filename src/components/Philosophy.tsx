import React from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sound } from '../utils/sound';
import { Binary, Compass, Sparkles, Lightbulb, Quote } from 'lucide-react';

const iconMap = {
  Binary,
  Compass,
  Sparkles,
};

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden border-t border-white/[0.06]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFD600]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FFD600] tracking-widest uppercase">
              <Lightbulb className="w-3.5 h-3.5 text-[#FFD600]" />
              <span>// 08 ENGINEERING VALUES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
              WHAT DRIVES <span className="text-[#FFD600]">MY CRAFT</span>
            </h2>
          </div>
          <p className="mt-4 sm:mt-0 font-mono text-xs text-neutral-400">
            FIRST_PRINCIPLES: <span className="text-white">HONESTY &amp; ALGORITHMIC RIGOR</span>
          </p>
        </div>

        {/* 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESUME_DATA.philosophy.map((item, idx) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Sparkles;

            return (
              <div
                key={idx}
                onMouseEnter={() => sound.playHover()}
                className="glass-card-interactive p-8 rounded-3xl border border-white/[0.08] hover:border-[#FFD600]/40 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#111111] border border-white/[0.1] flex items-center justify-center text-[#FFD600] group-hover:bg-[#FFD600] group-hover:text-black group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Quote className="w-6 h-6 text-neutral-600 group-hover:text-[#FFD600]/40 transition-colors" />
                  </div>

                  <h3 className="text-xl font-outfit font-black text-white group-hover:text-[#FFD600] transition-colors mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#BDBDBD] font-sans leading-relaxed italic">
                    &quot;{item.quote}&quot;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>PRINCIPLE_0{idx + 1}</span>
                  <span className="text-[#FFD600]">ANSH YADAV</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
