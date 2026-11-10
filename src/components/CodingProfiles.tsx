import React from 'react';
import { RESUME_DATA } from '../data/resumeData';
import { sound } from '../utils/sound';
import { GithubIcon } from './icons';
import { 
  Terminal, 
  Code2, 
  Award, 
  ExternalLink, 
  CheckCircle, 
  Trophy, 
  Sparkles, 
  Zap, 
  TrendingUp 
} from 'lucide-react';

export const CodingProfiles: React.FC = () => {
  return (
    <section id="profiles" className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden border-t border-white/[0.06]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[300px] bg-[#FFD600]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#FF3838]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#FFD600] tracking-widest uppercase">
              <Trophy className="w-3.5 h-3.5 text-[#FFD600]" />
              <span>// 05 ALGORITHMIC TRACK RECORD & PROFILES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight text-white">
              COMPETITIVE <span className="text-[#FFD600]">PROGRAMMING</span>
            </h2>
          </div>
          <p className="mt-4 sm:mt-0 font-mono text-xs text-neutral-400">
            VERIFIED_METRICS: <span className="text-white">LEETCODE + CODECHEF</span>
          </p>
        </div>

        {/* 3 Profile Command Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {RESUME_DATA.codingProfiles.map((profile) => {
            const isLeetCode = profile.platform === 'LeetCode';
            const isCodeChef = profile.platform === 'CodeChef';
            const isGitHub = profile.platform === 'GitHub';

            return (
              <div
                key={profile.platform}
                onMouseEnter={() => sound.playHover()}
                className="glass-card-interactive p-8 rounded-3xl border border-white/[0.08] hover:border-[#FFD600]/50 relative group flex flex-col justify-between"
              >
                {/* HUD Corner Accents */}
                <div className="hud-corner-tl" />
                <div className="hud-corner-tr" />
                <div className="hud-corner-bl" />
                <div className="hud-corner-br" />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#111111] border border-white/[0.1] flex items-center justify-center text-[#FFD600] group-hover:scale-110 group-hover:bg-[#FFD600] group-hover:text-black transition-all duration-300">
                        {isLeetCode && <Code2 className="w-6 h-6" />}
                        {isCodeChef && <Award className="w-6 h-6" />}
                        {isGitHub && <GithubIcon className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="font-outfit font-black text-2xl text-white group-hover:text-[#FFD600] transition-colors">
                          {profile.platform}
                        </h3>
                        <span className="font-mono text-xs text-neutral-400">
                          @{profile.username}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#111111] border border-[#FFD600]/40 text-[#FFE94A]">
                      {profile.badge}
                    </span>
                  </div>

                  {/* High Impact Numbers Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {profile.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#111111] border border-white/[0.06] group-hover:border-white/[0.12] transition-colors"
                      >
                        <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          {stat.label}
                        </div>
                        <div className="text-xl font-grotesk font-black text-[#FFD600] mt-1">
                          {stat.value}
                        </div>
                        {stat.detail && (
                          <div className="text-[10px] text-neutral-500 font-sans mt-0.5 truncate">
                            {stat.detail}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.06] mb-6">
                    {profile.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
                        <CheckCircle className="w-3.5 h-3.5 text-[#FFD600] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* External Link Action */}
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="w-full py-3 rounded-xl bg-[#171717] hover:bg-[#FFD600] text-neutral-300 hover:text-black font-grotesk font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/[0.08] hover:border-[#FFD600] transition-all group-hover:shadow-[0_0_20px_rgba(255,214,0,0.3)]"
                >
                  <span>Open {profile.platform} Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

        {/* NIT Problem Setter Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#171717] via-[#141414] to-[#171717] border border-[#FFD600]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#080808] border border-[#FFD600] flex items-center justify-center text-[#FFD600] shrink-0">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#FFE94A] font-bold tracking-widest uppercase">
                INSTITUTE LEADERSHIP ROLE
              </div>
              <h4 className="text-xl font-outfit font-bold text-white mt-0.5">
                Problem Setter for Coding Contests @ NIT Silchar
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-1">
                Authored original algorithmic problems and designed boundary test cases for 100+ active participants.
              </p>
            </div>
          </div>

          <div className="shrink-0 font-mono text-xs text-[#FFD600] bg-[#080808] px-4 py-2 rounded-xl border border-white/[0.1]">
            ACTIVE // 2024 – PRESENT
          </div>
        </div>
      </div>
    </section>
  );
};
