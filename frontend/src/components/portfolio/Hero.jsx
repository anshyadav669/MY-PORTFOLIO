import React from "react";
import { TypeAnimation } from "react-type-animation";
import { PROFILE } from "@/data/portfolio";
import { FiArrowDownRight, FiMapPin } from "react-icons/fi";
import { SiGithub, SiLeetcode, SiCodechef } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

export const Hero = () => {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
            data-testid="hero-section"
        >
            {/* Grid background */}
            <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60 pointer-events-none" />
            {/* Radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-20 blur-3xl pointer-events-none"
                 style={{ background: "radial-gradient(closest-side, #ccff00, transparent 70%)" }}
            />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8">
                    <div className="flex items-center gap-3 mb-8 animate-fade-up" style={{ animationDelay: "0ms" }}>
                        <span className="w-8 h-px bg-brand" />
                        <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand">
                            portfolio / v1.0
                        </span>
                    </div>

                    <h1
                        className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] text-zinc-100 animate-fade-up"
                        style={{ animationDelay: "80ms" }}
                        data-testid="hero-name"
                    >
                        Ansh Kumar
                        <br />
                        <span className="text-brand">Yadav.</span>
                    </h1>

                    <div className="mt-8 flex items-center gap-3 font-mono text-base sm:text-lg text-zinc-300 animate-fade-up" style={{ animationDelay: "160ms" }}>
                        <span className="text-brand">&gt;</span>
                        <span className="type-cursor">
                            <TypeAnimation
                                sequence={[
                                    "software developer",
                                    2000,
                                    "competitive programmer",
                                    2000,
                                    "problem setter",
                                    2000,
                                    "RAG systems builder",
                                    2000,
                                    "freelance web dev",
                                    2000,
                                ]}
                                wrapper="span"
                                speed={45}
                                repeat={Infinity}
                                cursor={false}
                            />
                        </span>
                    </div>

                    <p className="mt-8 max-w-2xl font-mono text-sm sm:text-base text-zinc-400 leading-relaxed animate-fade-up" style={{ animationDelay: "240ms" }}>
                        {PROFILE.subheadline} B.Tech @ NIT Silchar. 400+ problems solved on LeetCode.
                        2★ on CodeChef. I write code that ships.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "320ms" }}>
                        <a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="group inline-flex items-center gap-3 px-6 py-3 bg-brand text-black font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-brand-hover transition-all"
                            data-testid="hero-view-work"
                        >
                            View Work
                            <FiArrowDownRight className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="inline-flex items-center gap-3 px-6 py-3 border border-zinc-700 text-zinc-200 font-mono text-xs uppercase tracking-[0.2em] font-bold hover:border-brand hover:text-brand transition-all"
                            data-testid="hero-contact-btn"
                        >
                            Get in touch
                        </a>
                    </div>

                    <div className="mt-14 flex items-center gap-5 animate-fade-up" style={{ animationDelay: "400ms" }}>
                        {[
                            { icon: <SiGithub size={18} />, href: PROFILE.socials.github, label: "github" },
                            { icon: <FaLinkedinIn size={18} />, href: PROFILE.socials.linkedin, label: "linkedin" },
                            { icon: <SiLeetcode size={18} />, href: PROFILE.socials.leetcode, label: "leetcode" },
                            { icon: <SiCodechef size={18} />, href: PROFILE.socials.codechef, label: "codechef" },
                        ].map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-zinc-400 hover:text-brand transition-colors"
                                data-testid={`hero-social-${s.label}`}
                                aria-label={s.label}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-4 hidden lg:flex flex-col gap-4 animate-fade-up" style={{ animationDelay: "480ms" }}>
                    <div className="border border-ink-600 bg-ink-800 p-6">
                        <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-3">
                            ~/whereami
                        </div>
                        <div className="flex items-center gap-2 text-zinc-200 font-mono text-sm">
                            <FiMapPin className="text-brand" />
                            {PROFILE.location}
                        </div>
                    </div>
                    <div className="border border-ink-600 bg-ink-800 p-6">
                        <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-3">
                            ~/status
                        </div>
                        <div className="flex items-center gap-3 text-zinc-200 font-mono text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
                            </span>
                            Open to internships & collabs
                        </div>
                    </div>
                    <div className="border border-ink-600 bg-ink-800 p-6">
                        <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-3">
                            ~/stack
                        </div>
                        <div className="flex flex-wrap gap-2 font-mono text-xs text-zinc-300">
                            {["python", "c++", "flask", "js", "langchain"].map((t) => (
                                <span key={t} className="px-2 py-1 border border-ink-600 hover:border-brand hover:text-brand transition-colors">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 floaty">
                scroll ↓
            </div>
        </section>
    );
};
