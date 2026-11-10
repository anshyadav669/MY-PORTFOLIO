import React, { useState } from 'react';
import { Project } from '../data/resumeData';
import { sound } from '../utils/sound';
import { PasswordGenLiveDemo } from './PasswordGenLiveDemo';
import { GithubIcon } from './icons';
import { 
  X, 
  ExternalLink, 
  CheckCircle, 
  Terminal, 
  Cpu, 
  Layers, 
  Workflow, 
  Sparkles,
  Play
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'simulator'>('overview');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#111111] border border-[#FFD600]/40 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-white custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HUD Corner Accents */}
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Header Bar */}
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FFD600] text-black font-bold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                SYSTEM_ID: {project.id}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-outfit font-black text-white">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-[#FFE94A] mt-0.5">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-[#171717] border border-white/[0.1] text-neutral-400 hover:text-[#FFD600] hover:border-[#FFD600] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('overview');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-[#FFD600] text-black font-bold shadow-[0_0_15px_rgba(255,214,0,0.3)]'
                : 'bg-[#171717] text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Specifications & Features</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('architecture');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'bg-[#FFD600] text-black font-bold shadow-[0_0_15px_rgba(255,214,0,0.3)]'
                : 'bg-[#171717] text-neutral-400 hover:text-white'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Data Pipeline Architecture</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('simulator');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'simulator'
                ? 'bg-[#FFD600] text-black font-bold shadow-[0_0_15px_rgba(255,214,0,0.3)]'
                : 'bg-[#171717] text-neutral-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Project Hero Banner Image */}
            <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden border border-white/[0.1]">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover filter brightness-90 contrast-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/30" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[#FFD600] border border-white/[0.1] font-bold">
                  {project.category}
                </span>
                <span className="text-white/80 font-mono text-[11px] bg-black/60 px-2 py-0.5 rounded">
                  {project.technologies.slice(0, 3).join(' • ')}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
                EXECUTIVE SUMMARY
              </h4>
              <p className="text-sm text-neutral-200 font-sans leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Badges */}
            <div>
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2.5">
                TECHNOLOGY STACK
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md bg-[#171717] border border-white/[0.1] text-xs font-mono text-[#FFD600] font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
                KEY ARCHITECTURAL FEATURES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#171717]/60 border border-white/[0.06]">
                    <CheckCircle className="w-4 h-4 text-[#FFD600] shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-300 font-sans">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ansh's Contributions */}
            <div>
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
                ANSH&apos;S INDIVIDUAL CONTRIBUTIONS
              </h4>
              <div className="space-y-2">
                {project.contributions.map((con, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
                    <span className="text-[#FFD600] font-mono font-bold">&gt;</span>
                    <span>{con}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Architecture Pipeline */}
        {activeTab === 'architecture' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
                SYSTEM DATAFLOW PIPELINE
              </h4>
              <div className="p-4 rounded-xl bg-[#080808] border border-white/[0.08] font-mono text-xs text-[#FFD600] leading-relaxed">
                {project.architectureDetails}
              </div>
            </div>

            {/* Step-by-step pipeline view */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                PIPELINE BREAKDOWN
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#171717] border border-white/[0.08]">
                  <div className="text-[10px] font-mono text-[#FF3838] font-bold">PHASE 01</div>
                  <div className="text-sm font-bold text-white mt-1">Data Ingestion</div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Preprocessing audio wave signals, tokenizing documents, or capturing cryptographic entropy seeds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#171717] border border-[#FFD600]/30">
                  <div className="text-[10px] font-mono text-[#FFD600] font-bold">PHASE 02</div>
                  <div className="text-sm font-bold text-white mt-1">Algorithmic Inference</div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Vector similarity search, deep neural classification (Keras/Librosa), or cosine matrix filtering.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#171717] border border-white/[0.08]">
                  <div className="text-[10px] font-mono text-[#FFE94A] font-bold">PHASE 03</div>
                  <div className="text-sm font-bold text-white mt-1">UI Delivery</div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Streamlit dashboard, real-time Flask REST response, or dynamic client-side DOM rendering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Simulator */}
        {activeTab === 'simulator' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {project.id === 'password-generator' ? (
              <PasswordGenLiveDemo />
            ) : (
              <div className="p-6 rounded-xl bg-[#080808] border border-[#FFD600]/30 text-center space-y-4">
                <Cpu className="w-10 h-10 text-[#FFD600] mx-auto animate-pulse" />
                <h4 className="font-outfit text-lg font-bold text-white">
                  Live Deployment / Code Repository
                </h4>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  This system is hosted on GitHub and configured for local/Streamlit inference. Inspect the full code repository or run the live demo.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#FFD600] text-black font-grotesk font-bold rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,214,0,0.4)]"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View GitHub Repo</span>
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-[#171717] border border-white/[0.1] text-white hover:border-[#FFD600] rounded-lg text-xs font-mono flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-4 h-4 text-[#FFD600]" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
          <div className="text-xs font-mono text-neutral-400">
            STATUS: <span className="text-[#FFD600]">VERIFIED REPO ON GITHUB</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-[#171717] hover:bg-[#202020] border border-white/[0.1] text-white text-xs font-mono flex items-center gap-2 hover:border-[#FFD600] transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-[#FFD600]" />
              <span>GitHub Repo</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-[#FFD600] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(255,214,0,0.4)] hover:shadow-[0_0_25px_rgba(255,214,0,0.6)] transition-all"
              >
                <span>Live Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
