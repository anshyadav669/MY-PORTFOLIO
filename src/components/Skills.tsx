import React, { useState } from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sound } from '../utils/sound';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Globe, 
  Layout, 
  Brain, 
  Layers, 
  Binary, 
  Music, 
  Database, 
  Server, 
  MonitorPlay, 
  LineChart, 
  GitFork, 
  Workflow, 
  Laptop, 
  CheckCircle2, 
  HardDrive, 
  TerminalSquare, 
  AppWindow, 
  Cloud, 
  Radio, 
  GitBranch, 
  Search, 
  HelpCircle, 
  Users, 
  MessageSquare, 
  Clock,
  Sparkles,
  Filter
} from 'lucide-react';

const iconLookup: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Terminal,
  Cpu,
  Globe,
  Layout,
  Brain,
  Layers,
  Binary,
  Music,
  Database,
  Server,
  MonitorPlay,
  LineChart,
  GitFork,
  Workflow,
  Laptop,
  CheckCircle2,
  HardDrive,
  TerminalSquare,
  AppWindow,
  Cloud,
  Radio,
  GitBranch,
  Search,
  HelpCircle,
  Users,
  MessageSquare,
  Clock,
};

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', ...RESUME_DATA.skillsCategories.map((c) => c.category)];

  const allSkills = RESUME_DATA.skillsCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({
      ...skill,
      category: cat.category,
    }))
  );

  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="relative py-24 lg:py-32 bg-transparent overflow-hidden border-t border-white/[0.06] z-10">
      {/* Background Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FFD600]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#FF3838]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FFD600] tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD600]" />
              <span>// 03 TECHNICAL STACK & PROFICIENCY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
              ENGINEERING <span className="text-[#FFD600]">TOOLKIT</span>
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 font-mono text-xs text-neutral-400">
            TOTAL_INDEXED_SKILLS: <span className="text-[#FFD600] font-bold">{allSkills.length}</span>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FFD600] text-black font-bold shadow-[0_0_15px_rgba(255,214,0,0.35)]'
                    : 'bg-[#111111] text-[#BDBDBD] hover:text-white border border-white/[0.06] hover:border-[#FFD600]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search stack (e.g. Python, C++, Flask)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] border border-white/[0.08] focus:border-[#FFD600] rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#FFD600] transition-all"
            />
          </div>
        </div>

        {/* Grid of Interactive Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => {
            const IconComponent = iconLookup[skill.icon] || Code2;
            return (
              <div
                key={index}
                onMouseEnter={() => sound.playHover()}
                className="glass-card-interactive p-4 sm:p-5 rounded-xl border border-white/[0.07] hover:border-[#FFD600]/50 transition-all duration-200 group relative"
              >
                {/* Glow accent */}
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#FFD600]/40 group-hover:bg-[#FFD600] group-hover:shadow-[0_0_8px_#FFD600] transition-all" />

                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#FFD600] group-hover:bg-[#FFD600] group-hover:text-black group-hover:scale-105 transition-all">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-grotesk font-bold text-sm text-white group-hover:text-[#FFD600] transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-500 block truncate">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#BDBDBD] font-sans leading-relaxed">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 bg-[#111111]/40 rounded-2xl border border-white/[0.06]">
            <p className="text-sm font-mono text-neutral-400">
              No skills found matching &quot;{searchQuery}&quot;.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
