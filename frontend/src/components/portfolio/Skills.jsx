import React, { useEffect, useRef, useState } from "react";
import { Section, SectionHeader } from "./Section";
import { SKILL_GROUPS, TOOLS } from "@/data/portfolio";

const useInView = (ref, threshold = 0.2) => {
    const [inView, setInView] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setInView(true),
            { threshold }
        );
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref, threshold]);
    return inView;
};

const SkillBar = ({ name, level, delay }) => {
    const ref = useRef(null);
    const inView = useInView(ref);
    return (
        <div ref={ref} className="group">
            <div className="flex justify-between items-baseline mb-2">
                <span className="font-mono text-xs sm:text-sm text-zinc-300 group-hover:text-brand transition-colors">
                    {name}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-zinc-500">
                    {level}%
                </span>
            </div>
            <div className="h-[3px] bg-ink-600 relative overflow-hidden">
                <div
                    className="absolute inset-y-0 left-0 bg-brand"
                    style={{
                        width: inView ? `${level}%` : "0%",
                        transition: `width 1.4s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
                    }}
                />
            </div>
        </div>
    );
};

export const Skills = () => (
    <Section id="skills">
        <SectionHeader index="02" sub="what i build with" title="Technical stack." />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {SKILL_GROUPS.map((g, gi) => (
                <div key={g.title} className="border border-ink-600 bg-ink-800 p-6 sm:p-8 card-hover" data-testid={`skill-group-${gi}`}>
                    <div className="flex items-center gap-3 mb-8">
                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand">
                            0{gi + 1}
                        </span>
                        <h3 className="font-display text-xl font-bold text-zinc-100 uppercase tracking-tight">
                            {g.title}
                        </h3>
                    </div>
                    <div className="space-y-5">
                        {g.items.map((s, i) => (
                            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 120} />
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* Tools marquee */}
        <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-brand" />
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-zinc-400">tools & tech</span>
            </div>
            <div className="relative overflow-hidden border-y border-ink-600 py-6" data-testid="tools-marquee">
                <div className="flex gap-8 marquee whitespace-nowrap">
                    {[...TOOLS, ...TOOLS].map((t, i) => (
                        <span key={i} className="font-mono text-xl sm:text-2xl text-zinc-400 hover:text-brand transition-colors">
                            {t} <span className="text-brand mx-4">×</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </Section>
);
