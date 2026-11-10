import React, { useState } from 'react';
import { RESUME_DATA, Project } from '../data/resumeData';
import { sound } from '../utils/sound';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './icons';
import { 
  FolderGit2, 
  ArrowUpRight, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  Terminal, 
  Sliders, 
  CheckCircle2,
  Cpu,
  Activity,
  Music,
  Film,
  KeyRound
} from 'lucide-react';

const projectVisualIcon = {
  'rag-chatbot': Cpu,
  'speech-emotion-recognition': Activity,
  'music-genre-prediction': Music,
  'movie-recommendation-system': Film,
  'password-generator': KeyRound,
};

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProject = (proj: Project) => {
    sound.playClick();
    setSelectedProject(proj);
  };

  return (
    <section id="projects" className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden border-t border-white/[0.06]">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#FFD600]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#FF3838]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FFD600] tracking-widest uppercase">
              <FolderGit2 className="w-3.5 h-3.5 text-[#FFD600]" />
              <span>// 04 PRODUCTION REPOSITORIES & APPS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
              FEATURED <span className="text-[#FFD600]">SHOWCASE</span>
            </h2>
          </div>
          <p className="mt-4 sm:mt-0 font-mono text-xs text-neutral-400">
            TOTAL_PROJECTS: <span className="text-[#FFD600] font-bold">05 ARCHITECTURES</span>
          </p>
        </div>

        {/* Vertically Stacked Full-Width Cinematic Project Panels */}
        <div className="space-y-12">
          {RESUME_DATA.projects.map((project, index) => {
            const VisualIcon = projectVisualIcon[project.id as keyof typeof projectVisualIcon] || Cpu;
            const isEven = index % 2 === 0;

            return (
              <div
                key={project.id}
                onMouseEnter={() => sound.playHover()}
                className="relative rounded-3xl p-6 sm:p-10 bg-[#141414]/90 backdrop-blur-2xl border border-white/[0.08] hover:border-[#FFD600]/50 shadow-2xl transition-all duration-300 group overflow-hidden"
              >
                {/* HUD Corner Accents */}
                <div className="hud-corner-tl" />
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                <div className="hud-corner-br" />

                {/* Ambient Red Glow on hover */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF3838]/8 rounded-full blur-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Relatable High-Definition Project Visual Canvas */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div 
                      onClick={() => openProject(project)}
                      className="relative h-64 sm:h-84 w-full rounded-2xl bg-[#0a0a0a] border border-white/[0.1] overflow-hidden flex flex-col justify-between p-5 group-hover:border-[#FFD600] group-hover:shadow-[0_0_35px_rgba(255,214,0,0.25)] transition-all duration-500 cursor-pointer"
                    >
                      {/* High-Resolution Relatable Project Cover Image */}
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.7] group-hover:brightness-[0.85] contrast-110"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80";
                        }}
                      />

                      {/* Dark Vignette Overlay for Crisp Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-black/60 pointer-events-none" />

                      {/* Top Bar with Status Indicators */}
                      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/[0.12]">
                          <span className="w-2 h-2 rounded-full bg-[#FF3838]" />
                          <span className="w-2 h-2 rounded-full bg-[#FFD600]" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-[10px] text-white/90 font-mono font-bold ml-1.5 uppercase tracking-wider">
                            MOD_0{index + 1} // {project.category}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#FFD600]/40 text-[#FFE94A] text-[10px] font-mono font-bold">
                          {project.technologies[0]}
                        </span>
                      </div>

                      {/* Center Floating Icon Pill */}
                      <div className="relative z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-[#FFD600] text-xs font-mono text-[#FFD600] font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(255,214,0,0.5)]">
                          <VisualIcon className="w-4 h-4" />
                          <span>Click to Inspect Pipeline</span>
                        </div>
                      </div>

                      {/* Bottom Visual Card Footer */}
                      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/[0.15]">
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-200 bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/[0.08]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600] animate-pulse" />
                          <span className="truncate max-w-[170px] sm:max-w-[220px] font-semibold text-white">
                            {project.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                          STATUS: 200 OK
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content & Details */}
                  <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#FFD600] bg-[#FFD600]/15 px-3 py-1 rounded-full border border-[#FFD600]/30">
                        PROJECT 0{index + 1}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-outfit font-black text-white group-hover:text-[#FFD600] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#BDBDBD] font-sans leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key features bullets */}
                    <div className="space-y-2 pt-1">
                      {project.keyFeatures.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-[#FFD600] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-[#1c1c1c] border border-white/[0.08] text-[11px] font-mono text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <button
                        onClick={() => openProject(project)}
                        onMouseEnter={() => sound.playHover()}
                        className="px-5 py-2.5 rounded-xl bg-[#FFD600] text-black font-grotesk font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,214,0,0.35)] hover:shadow-[0_0_30px_rgba(255,214,0,0.6)] transition-all hover:scale-105"
                      >
                        <span>Deep Dive &amp; Architecture</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => sound.playHover()}
                        className="px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#222222] border border-white/[0.1] text-white font-mono text-xs flex items-center gap-2 hover:border-[#FFD600] transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5 text-[#FFD600]" />
                        <span>GitHub</span>
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onMouseEnter={() => sound.playHover()}
                          className="px-4 py-2.5 rounded-xl bg-[#171717] hover:bg-[#222222] border border-white/[0.1] text-white font-mono text-xs flex items-center gap-2 hover:border-[#FFD600] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#FFD600]" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
