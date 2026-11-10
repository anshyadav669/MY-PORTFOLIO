import React from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sound } from '../utils/sound';
import { 
  GraduationCap, 
  Code2, 
  Zap, 
  BrainCircuit, 
  Terminal, 
  Sparkles, 
  MapPin, 
  CheckCircle,
  Binary,
  Layers
} from 'lucide-react';

export const About: React.FC = () => {
  const cards = [
    {
      title: "Academic Pedigree",
      subtitle: "NIT Silchar (B.Tech 2024-2028)",
      metric: "8.12 CGPA",
      desc: "Undergraduate student at National Institute of Technology, Silchar with an 8.12 CGPA. Rigorous foundation in computational mathematics and systems logic, backed by 91% HSC in Kota.",
      icon: GraduationCap,
      accent: "#FFD600"
    },
    {
      title: "Algorithmic Rigor",
      subtitle: "Competitive Programming",
      metric: "400+ Solved",
      desc: "Solved over 400 algorithmic challenges on LeetCode. Achieved 2-Star Coder status on CodeChef and secured Rank 31 in an international timed programming contest.",
      icon: Code2,
      accent: "#FFE94A"
    },
    {
      title: "Production Engineering",
      subtitle: "Startup Web Development",
      metric: "2024 – Present",
      desc: "Active freelance developer engineering responsive, mobile-first web platforms for early-stage startups. Managing full frontend implementation, performance optimization, and deployment.",
      icon: Zap,
      accent: "#FFD600"
    },
    {
      title: "Intelligent Systems",
      subtitle: "ML & Signal Processing",
      metric: "5 Core Projects",
      desc: "Architected RAG-based LLM conversational agents with vector retrieval, alongside deep neural audio models analyzing speech emotion and musical genres using Librosa and TensorFlow.",
      icon: BrainCircuit,
      accent: "#FF3838"
    }
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden border-t border-white/[0.06]">
      {/* Background Lighting & Grid */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FFD600]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#FF3838]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FFD600] tracking-widest uppercase">
              <Terminal className="w-3.5 h-3.5 text-[#FFD600]" />
              <span>// 01 ARCHITECTURE & ORIGIN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
              ABOUT <span className="text-[#FFD600]">ANSH YADAV</span>
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 font-mono text-xs text-neutral-400">
            SYSTEM_ID: <span className="text-white">NIT_SILCHAR_UG24</span>
          </div>
        </div>

        {/* Two-Column Artistic Text & Geometry Layout (Strictly NO fake portraits!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Abstract Typographic Sculpture & Geometric HUD */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-8 rounded-2xl border border-white/[0.08] relative overflow-hidden group hover:border-[#FFD600]/40 transition-colors">
              <div className="hud-corner-tl" />
              <div className="hud-corner-tr" />
              <div className="hud-corner-bl" />
              <div className="hud-corner-br" />

              {/* Glowing Yellow Ambient */}
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#FFD600]/15 rounded-full blur-[50px] pointer-events-none" />

              {/* Bold Editorial Graphic Element */}
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#FF3838] font-bold tracking-widest uppercase block">
                  CORE DIRECTIVE
                </span>

                <div className="text-5xl sm:text-6xl font-black font-grotesk tracking-tighter text-white leading-none">
                  CODE.<br />
                  <span className="text-[#FFD600]">OPTIMIZE.</span><br />
                  DEPLOY.
                </div>

                <div className="pt-6 border-t border-white/[0.08] space-y-3 font-mono text-xs text-neutral-300">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">INSTITUTION:</span>
                    <span className="text-white font-semibold">NIT Silchar, Assam</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">HOMETOWN / KOTA:</span>
                    <span className="text-[#FFE94A]">Kota, Rajasthan (91% HSC)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">PROBLEM SETTER:</span>
                    <span className="text-white">Institute Coding Contests</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">PRIMARY FOCUS:</span>
                    <span className="text-[#FFD600]">Full-Stack & Applied ML</span>
                  </div>
                </div>

                {/* Cybernetic Code Block Accent */}
                <div className="mt-6 p-4 rounded-xl bg-[#080808] border border-white/[0.08] font-mono text-[11px] leading-relaxed text-neutral-400 overflow-x-auto">
                  <div className="text-[#FFD600]">// Ansh Kumar Yadav Profile Struct</div>
                  <div><span className="text-[#FF3838]">struct</span> <span className="text-white">Developer</span> &#123;</div>
                  <div className="pl-4">leetcode_solved: <span className="text-[#FFE94A]">400+</span>,</div>
                  <div className="pl-4">codechef_rank: <span className="text-[#FFE94A]">31</span>,</div>
                  <div className="pl-4">languages: [<span className="text-[#FFE94A]">&quot;Python&quot;</span>, <span className="text-[#FFE94A]">&quot;C++&quot;</span>, <span className="text-[#FFE94A]">&quot;JavaScript&quot;</span>],</div>
                  <div className="pl-4">status: <span className="text-[#FFD600]">&quot;Building Startup MVPs &amp; ML Models&quot;</span></div>
                  <div>&#125;;</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Professional Resume Biography */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#FFD600] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                PROFESSIONAL BIOGRAPHY
              </span>

              <h3 className="text-2xl sm:text-3xl font-outfit font-bold text-white leading-snug">
                Bridging Mathematical Algorithms with User-Centric Digital Interfaces
              </h3>

              <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed">
                <p>
                  I am <strong className="text-white">Ansh Kumar Yadav</strong>, a software developer, problem setter, and engineering student at the <strong className="text-white">National Institute of Technology, Silchar</strong> (2024–2028, CGPA 8.12). My technical journey started in the competitive academic environment of Kota, where I achieved 91% in HSC and developed deep mathematical problem-solving skills.
                </p>

                <p>
                  In competitive programming, I have solved <span className="text-[#FFD600] font-bold">400+ problems on LeetCode</span>, achieved <span className="text-[#FFD600] font-bold">2-Star Coder status on CodeChef</span>, and secured <span className="text-[#FFD600] font-bold">Global Rank 31</span> in a CodeChef contest. These experiences led me to serve as a <strong className="text-white">Problem Setter</strong> at NIT Silchar, where I design algorithmic problems and boundary test cases for institute competitions with 100+ participants.
                </p>

                <p>
                  Beyond competitive algorithms, I build functional digital products. As a <strong className="text-white">Freelance Web Developer</strong>, I work directly with early-stage startups to architect responsive, high-performance web pages. Simultaneously, in the artificial intelligence domain, I have developed <span className="text-[#FFE94A]">Retrieval-Augmented Generation (RAG)</span> chatbots with vector databases and engineered deep learning classifiers for speech emotion and music genres using <span className="text-white">Librosa, TensorFlow, and Streamlit</span>.
                </p>
              </div>
            </div>

            {/* Quick Principles Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#111111]/60 border border-white/[0.06]">
                <CheckCircle className="w-4 h-4 text-[#FFD600] shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-300 font-sans">
                  <strong>First-Principles Logic:</strong> Efficient O(N) algorithmic architecture before premature abstraction.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#111111]/60 border border-white/[0.06]">
                <CheckCircle className="w-4 h-4 text-[#FFD600] shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-300 font-sans">
                  <strong>Speed & Responsiveness:</strong> Mobile-first UI layouts built for optimal user conversion and speed.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Glassmorphic Information Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => sound.playHover()}
                className="glass-card-interactive p-6 rounded-2xl relative overflow-hidden group"
              >
                {/* Glowing Corner Indicator */}
                <div 
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[30px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: card.accent }}
                />

                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#111111] border border-white/[0.1] flex items-center justify-center text-[#FFD600] group-hover:border-[#FFD600] group-hover:scale-110 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#111111] border border-white/[0.08] text-[#FFD600]">
                    {card.metric}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  {card.subtitle}
                </div>
                <h4 className="text-lg font-outfit font-bold text-white mb-2 group-hover:text-[#FFD600] transition-colors">
                  {card.title}
                </h4>
                <p className="text-xs text-[#BDBDBD] font-sans leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
