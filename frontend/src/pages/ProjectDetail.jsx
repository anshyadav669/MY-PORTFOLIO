import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { PROJECTS, PROFILE } from "@/data/portfolio";
import { Nav } from "@/components/portfolio/Nav";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollProgress, BackToTop } from "@/components/portfolio/Chrome";
import { FiArrowLeft, FiGithub, FiExternalLink, FiCalendar, FiCode } from "react-icons/fi";

const PatternHero = ({ variant, title }) => {
    // Distinct CSS-only visuals per project (no external images)
    return (
        <div className="relative w-full h-64 sm:h-80 lg:h-96 border border-ink-600 bg-ink-800 overflow-hidden">
            {variant === "radial" && (
                <>
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "radial-gradient(circle at 30% 40%, rgba(204,255,0,0.35), transparent 55%), radial-gradient(circle at 75% 65%, rgba(204,255,0,0.18), transparent 60%)",
                        }}
                    />
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-brand animate-pulse">
                            &lt; retrieve · ground · generate /&gt;
                        </div>
                    </div>
                </>
            )}
            {variant === "grid" && (
                <>
                    <div className="absolute inset-0 bg-grid opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-3 gap-2">
                            {["■ Ship it", "□ Sleep", "☐ Repeat"].map((t, i) => (
                                <div key={i} className="px-4 py-3 border border-ink-600 bg-ink-900/70 backdrop-blur font-mono text-xs text-zinc-200">
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">/{title}</span>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">// case study</span>
            </div>
        </div>
    );
};

export default function ProjectDetail() {
    const { slug } = useParams();
    const project = PROJECTS.find((p) => p.slug === slug);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [slug]);

    if (!project) return <Navigate to="/" replace />;

    const cs = project.caseStudy;
    const idx = PROJECTS.findIndex((p) => p.slug === slug);
    const next = PROJECTS[(idx + 1) % PROJECTS.length];

    return (
        <div className="min-h-screen bg-ink-900 text-zinc-100 font-mono selection:bg-brand selection:text-black">
            <ScrollProgress />
            <Nav />

            <article className="pt-32 pb-24" data-testid="project-detail-page">
                <div className="max-w-5xl mx-auto px-6 lg:px-10">
                    <Link
                        to="/#projects"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-brand transition-colors mb-10"
                        data-testid="back-to-projects"
                    >
                        <FiArrowLeft /> back to projects
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand">{project.accent}</span>
                        <span className="w-8 h-px bg-brand" />
                        <span className="font-mono text-xs tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-2">
                            <FiCalendar size={12} /> {project.year}
                        </span>
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-100" data-testid="project-detail-title">
                        {project.title}.
                    </h1>
                    <p className="mt-6 font-mono text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
                        {project.tagline}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-black font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-hover transition-colors"
                                data-testid="detail-github-btn"
                            >
                                <FiGithub /> View code
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink-600 text-zinc-200 font-mono text-xs uppercase tracking-[0.2em] font-bold hover:border-brand hover:text-brand transition-colors"
                                data-testid="detail-demo-btn"
                            >
                                <FiExternalLink /> Live demo
                            </a>
                        )}
                    </div>

                    <div className="mt-12">
                        <PatternHero variant={project.heroPattern} title={project.slug} />
                    </div>

                    {/* Stack chips */}
                    <div className="mt-12 grid sm:grid-cols-4 gap-6 border-y border-ink-600 py-8">
                        <MetaBlock label="Year" value={project.year} />
                        <MetaBlock label="Role" value="Solo build" />
                        <MetaBlock label="Category" value={project.accent} />
                        <div>
                            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2">Stack</div>
                            <div className="flex flex-wrap gap-1.5">
                                {project.stack.map((s) => (
                                    <span key={s} className="px-2 py-1 font-mono text-[10px] tracking-widest uppercase text-zinc-300 border border-ink-600">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Problem */}
                    <CaseSection num="01" title="The problem">
                        <p className="font-mono text-sm sm:text-base text-zinc-300 leading-relaxed">
                            {cs.problem}
                        </p>
                    </CaseSection>

                    {/* Approach */}
                    <CaseSection num="02" title="Approach">
                        <p className="font-mono text-sm sm:text-base text-zinc-300 leading-relaxed">
                            {cs.approach}
                        </p>
                    </CaseSection>

                    {/* Architecture */}
                    <CaseSection num="03" title="Architecture">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {cs.architecture.map((step) => (
                                <div key={step.step} className="border border-ink-600 bg-ink-800 p-5 card-hover" data-testid={`arch-step-${step.step}`}>
                                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand mb-2">
                                        step · {step.step}
                                    </div>
                                    <h4 className="font-display text-lg font-bold text-zinc-100">
                                        {step.title}
                                    </h4>
                                    <p className="mt-2 font-mono text-xs text-zinc-400 leading-relaxed">
                                        {step.detail}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CaseSection>

                    {/* Code snippet */}
                    {cs.snippet && (
                        <CaseSection num="04" title="Code walkthrough">
                            <div className="border border-ink-600 bg-ink-800 overflow-hidden" data-testid="code-snippet">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-ink-600">
                                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                                        <FiCode /> {cs.snippet.lang}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-zinc-700" />
                                        <span className="w-2 h-2 rounded-full bg-zinc-700" />
                                        <span className="w-2 h-2 rounded-full bg-brand" />
                                    </div>
                                </div>
                                <pre className="p-5 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre">
{cs.snippet.code}
                                </pre>
                            </div>
                        </CaseSection>
                    )}

                    {/* Decisions */}
                    <CaseSection num="05" title="Tech decisions">
                        <div className="space-y-4">
                            {cs.decisions.map((d, i) => (
                                <div key={i} className="border-l-2 border-ink-600 hover:border-brand pl-5 transition-colors" data-testid={`decision-${i}`}>
                                    <h4 className="font-display text-lg font-bold text-zinc-100">
                                        {d.title}
                                    </h4>
                                    <p className="mt-1 font-mono text-sm text-zinc-400 leading-relaxed">
                                        {d.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CaseSection>

                    {/* Features recap */}
                    <CaseSection num="06" title="What it does">
                        <ul className="grid sm:grid-cols-2 gap-3">
                            {project.features.map((f) => (
                                <li key={f} className="flex items-start gap-3 font-mono text-sm text-zinc-300">
                                    <span className="text-brand mt-1">→</span>
                                    <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                    </CaseSection>

                    {/* Learnings */}
                    <CaseSection num="07" title="What I learned">
                        <ul className="space-y-3">
                            {cs.learnings.map((l, i) => (
                                <li key={i} className="flex items-start gap-3 font-mono text-sm text-zinc-300" data-testid={`learning-${i}`}>
                                    <span className="text-brand mt-1">■</span>
                                    <span>{l}</span>
                                </li>
                            ))}
                        </ul>
                    </CaseSection>

                    {/* Next project */}
                    {next && next.slug !== project.slug && (
                        <div className="mt-24 border-t border-ink-600 pt-12">
                            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-3">
                                next case study
                            </div>
                            <Link
                                to={`/projects/${next.slug}`}
                                className="group inline-flex items-center gap-4 font-display text-3xl sm:text-4xl font-black text-zinc-100 hover:text-brand transition-colors"
                                data-testid="next-project-link"
                            >
                                {next.title}
                                <span className="group-hover:translate-x-2 transition-transform">→</span>
                            </Link>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-24 border border-ink-600 bg-ink-800 p-8 sm:p-12">
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-brand mb-3">
                            like what you see?
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100">
                            Let&apos;s build the next one together.
                        </h3>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <Link
                                to="/#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-black font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-hover transition-colors"
                                data-testid="detail-cta-contact"
                            >
                                Get in touch →
                            </Link>
                            <a
                                href={PROFILE.socials.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-ink-600 text-zinc-200 font-mono text-xs uppercase tracking-[0.2em] font-bold hover:border-brand hover:text-brand transition-colors"
                            >
                                <FiGithub /> More on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
            <BackToTop />
        </div>
    );
}

const CaseSection = ({ num, title, children }) => (
    <section className="mt-16 sm:mt-20" data-testid={`case-section-${num}`}>
        <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand">{num}</span>
            <span className="w-8 h-px bg-brand" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
                {title}
            </h2>
        </div>
        {children}
    </section>
);

const MetaBlock = ({ label, value }) => (
    <div>
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-2">{label}</div>
        <div className="font-mono text-sm text-zinc-200">{value}</div>
    </div>
);
