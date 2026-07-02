import React from "react";
import { Section, SectionHeader } from "./Section";
import { EXPERIENCE, ACHIEVEMENTS } from "@/data/portfolio";
import { FiAward } from "react-icons/fi";

export const Experience = () => (
    <Section id="experience">
        <SectionHeader index="06" sub="what i've done" title="Experience & achievements." />

        <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-8">
                    <span className="w-8 h-px bg-brand" />
                    <span className="font-mono text-xs tracking-[0.3em] uppercase text-zinc-400">timeline</span>
                </div>

                <div className="relative pl-6 sm:pl-10 border-l border-ink-600">
                    {EXPERIENCE.map((e, i) => (
                        <div key={i} className="relative pb-10 last:pb-0 group" data-testid={`experience-item-${i}`}>
                            <div className="absolute -left-[9px] sm:-left-[13px] top-2 w-4 h-4 rounded-full border-2 border-brand bg-black group-hover:bg-brand transition-colors" />
                            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-1">
                                {e.period}
                            </div>
                            <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-brand transition-colors">
                                {e.role}
                            </h3>
                            <div className="font-mono text-sm text-zinc-400 mb-3">{e.org}</div>
                            <ul className="space-y-2">
                                {e.bullets.map((b) => (
                                    <li key={b} className="flex items-start gap-2 font-mono text-sm text-zinc-300">
                                        <span className="text-brand mt-1">→</span>
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-8">
                    <span className="w-8 h-px bg-brand" />
                    <span className="font-mono text-xs tracking-[0.3em] uppercase text-zinc-400">wins</span>
                </div>
                <div className="space-y-4">
                    {ACHIEVEMENTS.map((a, i) => (
                        <div key={i} className="border border-ink-600 bg-ink-800 p-5 card-hover flex items-start gap-4" data-testid={`achievement-${i}`}>
                            <div className="w-10 h-10 border border-brand flex items-center justify-center shrink-0 text-brand">
                                <FiAward />
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-zinc-100 group-hover:text-brand">{a.title}</h4>
                                <p className="font-mono text-xs text-zinc-400 mt-1">{a.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Section>
);
