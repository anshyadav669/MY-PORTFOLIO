import React from "react";
import { Link } from "react-router-dom";
import { Section, SectionHeader } from "./Section";
import { PROJECTS } from "@/data/portfolio";
import { FiExternalLink, FiGithub, FiArrowUpRight } from "react-icons/fi";

export const Projects = () => (
    <Section id="projects">
        <SectionHeader index="05" sub="selected work" title="Featured projects." />

        <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
                <article
                    key={p.title}
                    className="group relative border border-ink-600 bg-ink-800 p-8 card-hover overflow-hidden"
                    data-testid={`project-card-${i}`}
                >
                    {/* Big number */}
                    <div className="absolute top-4 right-6 font-display text-7xl font-black text-ink-600 group-hover:text-brand/20 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                    </div>

                    <div className="relative">
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand mb-4">
                            {p.accent}
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100 group-hover:text-brand transition-colors">
                            {p.title}
                        </h3>
                        <p className="mt-3 font-mono text-sm text-zinc-400 leading-relaxed">
                            {p.tagline}
                        </p>

                        <div className="mt-6 space-y-2">
                            {p.features.slice(0, 4).map((f) => (
                                <div key={f} className="flex items-start gap-2 font-mono text-xs text-zinc-400">
                                    <span className="text-brand mt-1">→</span>
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {p.stack.map((s) => (
                                <span key={s} className="px-2 py-1 font-mono text-[10px] tracking-widest uppercase text-zinc-300 border border-ink-600">
                                    {s}
                                </span>
                            ))}
                        </div>

                        <div className="mt-8 flex items-center gap-4 flex-wrap">
                            <Link
                                to={`/projects/${p.slug}`}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-black font-mono text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-brand-hover transition-colors"
                                data-testid={`project-case-study-${i}`}
                            >
                                Read case study →
                            </Link>
                            {p.github && (
                                <a
                                    href={p.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-200 hover:text-brand transition-colors"
                                    data-testid={`project-github-${i}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FiGithub /> Code
                                </a>
                            )}
                            {p.demo && (
                                <a
                                    href={p.demo}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-200 hover:text-brand transition-colors"
                                    data-testid={`project-demo-${i}`}
                                >
                                    <FiExternalLink /> Live
                                </a>
                            )}
                            <span className="ml-auto text-zinc-500 group-hover:text-brand group-hover:-translate-y-1 group-hover:translate-x-1 transition-all">
                                <FiArrowUpRight size={20} />
                            </span>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    </Section>
);
