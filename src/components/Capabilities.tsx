import React, { useRef, useState } from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sound } from '../utils/sound';
import { 
  LayoutTemplate, 
  Cpu, 
  Terminal, 
  Activity, 
  ArrowUpRight, 
  Check, 
  Zap, 
  Layers 
} from 'lucide-react';

const iconMap = {
  LayoutTemplate,
  Cpu,
  Terminal,
  Activity,
};

// Fluid Interactive Card with mouse-following radial lighting (Reference Image 1)
const FluidCard: React.FC<{
  service: typeof RESUME_DATA.services[0];
  index: number;
}> = ({ service }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Layers;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        sound.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl p-8 bg-[#171717]/80 backdrop-blur-xl border border-white/[0.08] hover:border-[#FFD600]/50 transition-all duration-300 overflow-hidden group shadow-xl"
    >
      {/* Fluid Cursor-Following Spotlight Glow (Reference Image 1 effect) */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 214, 0, 0.18), transparent 80%)`,
          }}
        />
      )}

      {/* Subtle Red Edge Glow on Hover */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-[#FF3838]/10 rounded-full blur-[40px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Bar with Number & Tag */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-2xl font-black text-[#FFD600]">
            {service.number}
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#111111] border border-white/[0.08] text-[#FFE94A] uppercase tracking-wider font-bold">
            {service.tag}
          </span>
        </div>

        <div className="w-12 h-12 rounded-xl bg-[#111111] border border-white/[0.1] flex items-center justify-center text-[#FFD600] group-hover:bg-[#FFD600] group-hover:text-black group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,214,0,0.5)] transition-all duration-300">
          <IconComponent className="w-6 h-6" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-outfit font-bold text-white mb-3 group-hover:text-[#FFD600] transition-colors relative z-10">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm text-[#BDBDBD] font-sans leading-relaxed mb-6 relative z-10">
        {service.shortDesc}
      </p>

      {/* Bullet Capabilities List */}
      <div className="space-y-2.5 pt-4 border-t border-white/[0.06] relative z-10">
        {service.capabilities.map((cap, i) => (
          <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-300 font-sans">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFD600] shrink-0" />
            <span>{cap}</span>
          </div>
        ))}
      </div>

      {/* Bottom Corner Accent */}
      <div className="mt-6 pt-3 flex items-center justify-between text-[11px] font-mono text-neutral-500 relative z-10">
        <span>DEV_CAPABILITY_VERIFIED</span>
        <span className="text-[#FFD600] opacity-0 group-hover:opacity-100 transition-opacity">
          PROD_READY // 0{service.number}
        </span>
      </div>
    </div>
  );
};

export const Capabilities: React.FC = () => {
  return (
    <section id="capabilities" className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden border-t border-white/[0.06]">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FFD600]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FFD600] tracking-widest uppercase">
              <Zap className="w-3.5 h-3.5 text-[#FFD600]" />
              <span>// 02 CORE CAPABILITIES & SERVICES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
              WHAT I <span className="text-[#FFD600]">ENGINEER & DELIVER</span>
            </h2>
          </div>
          <p className="mt-4 sm:mt-0 max-w-md text-xs sm:text-sm text-neutral-400 font-sans">
            Grounded in actual startup engineering and ML pipelines extracted from my resume. No hypothetical fluff.
          </p>
        </div>

        {/* 4 Interactive Fluid Cards (Asymmetric Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {RESUME_DATA.services.map((service, index) => (
            <FluidCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
