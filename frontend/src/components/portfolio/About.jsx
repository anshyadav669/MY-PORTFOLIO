import React from "react";
import { Section, SectionHeader } from "./Section";
import { PROFILE, EDUCATION } from "@/data/portfolio";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export const About = () => (
    <Section id="about">
        <SectionHeader index="01" sub="who / what" title="About the developer." />
        <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
                {PROFILE.about.map((p, i) => (
                    <p key={i} className="font-mono text-sm sm:text-base text-zinc-300 leading-relaxed">
                        {p}
                    </p>
                ))}
                <div className="pt-4 grid sm:grid-cols-2 gap-4">
                    <a href={`mailto:${PROFILE.email}`} className="group flex items-center gap-3 border border-ink-600 hover:border-brand p-4 card-hover" data-testid="about-email">
                        <FiMail className="text-brand" />
                        <span className="font-mono text-xs text-zinc-300 group-hover:text-brand break-all">{PROFILE.email}</span>
                    </a>
                    <a href={`tel:${PROFILE.phone}`} className="group flex items-center gap-3 border border-ink-600 hover:border-brand p-4 card-hover" data-testid="about-phone">
                        <FiPhone className="text-brand" />
                        <span className="font-mono text-xs text-zinc-300 group-hover:text-brand">{PROFILE.phone}</span>
                    </a>
                </div>
            </div>

            <div className="lg:col-span-5">
                <div className="border border-ink-600 bg-ink-800 p-6 sm:p-8 card-hover">
                    <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-6">
                        ~/quick_facts
                    </div>
                    <dl className="space-y-4 font-mono text-sm">
                        <Fact k="Name" v={PROFILE.name} />
                        <Fact k="Role" v="Freelance Web Dev / CP" />
                        <Fact k="Institution" v="NIT Silchar" />
                        <Fact k="Focus" v="Web · RAG · DSA" />
                        <Fact k="Location" v={PROFILE.location} icon={<FiMapPin className="inline text-brand" />} />
                    </dl>
                </div>
            </div>
        </div>

        {/* Education inline */}
        <div className="mt-24" id="education-anchor">
            <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-px bg-brand" />
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-zinc-400">education</span>
            </div>
            <div className="relative pl-6 sm:pl-10 border-l border-ink-600">
                {EDUCATION.map((e, i) => (
                    <div key={i} className="relative pb-10 last:pb-0 group" data-testid={`education-item-${i}`}>
                        <div className="absolute -left-[9px] sm:-left-[13px] top-2 w-4 h-4 rounded-full border-2 border-brand bg-black group-hover:bg-brand transition-colors" />
                        <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-1">
                            {e.period}
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-brand transition-colors">
                            {e.institution}
                        </h3>
                        <div className="font-mono text-sm text-zinc-400 mt-1">
                            {e.degree} · <span className="text-brand">{e.score}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Section>
);

const Fact = ({ k, v, icon }) => (
    <div className="flex justify-between items-baseline gap-4 border-b border-ink-600 pb-3 last:border-none last:pb-0">
        <dt className="text-zinc-500 uppercase text-[10px] tracking-widest">{k}</dt>
        <dd className="text-zinc-200 text-right">{icon} {v}</dd>
    </div>
);
