import React from "react";
import { PROFILE } from "@/data/portfolio";
import { SiGithub, SiLeetcode, SiCodechef } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

export const Footer = () => (
    <footer className="border-t border-ink-600 py-12" data-testid="site-footer">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-brand" />
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                        {PROFILE.handle}
                    </span>
                </div>
                <p className="font-mono text-xs text-zinc-500">
                    © {new Date().getFullYear()} Ansh Kumar Yadav · Crafted with code + caffeine.
                </p>
            </div>

            <div className="flex items-center gap-5">
                {[
                    { icon: <SiGithub size={16} />, href: PROFILE.socials.github, label: "github" },
                    { icon: <FaLinkedinIn size={16} />, href: PROFILE.socials.linkedin, label: "linkedin" },
                    { icon: <SiLeetcode size={16} />, href: PROFILE.socials.leetcode, label: "leetcode" },
                    { icon: <SiCodechef size={16} />, href: PROFILE.socials.codechef, label: "codechef" },
                ].map((s) => (
                    <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-500 hover:text-brand transition-colors"
                        aria-label={s.label}
                        data-testid={`footer-${s.label}`}
                    >
                        {s.icon}
                    </a>
                ))}
            </div>
        </div>
    </footer>
);
