import React, { useEffect, useState } from "react";
import { NAV, PROFILE } from "@/data/portfolio";
import { FiDownload, FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/lib/theme";

export const Nav = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggle } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (id) => {
        setOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled ? "backdrop-blur-xl bg-black/70 border-b border-white/10" : "bg-transparent"
            }`}
            data-testid="site-nav"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
                <button
                    onClick={() => scrollTo("home")}
                    className="flex items-center gap-2 group"
                    data-testid="nav-logo"
                >
                    <span className="w-2 h-2 bg-brand block group-hover:scale-125 transition-transform" />
                    <span className="font-mono text-xs tracking-[0.25em] uppercase text-zinc-300 group-hover:text-brand transition-colors">
                        {PROFILE.handle}
                    </span>
                </button>

                <nav className="hidden md:flex items-center gap-1">
                    {NAV.map((n) => (
                        <button
                            key={n.id}
                            onClick={() => scrollTo(n.id)}
                            className="px-3 py-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-brand transition-colors"
                            data-testid={`nav-${n.id}-link`}
                        >
                            {n.label}
                        </button>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={toggle}
                        aria-label="Toggle theme"
                        className="w-9 h-9 flex items-center justify-center border border-ink-600 text-zinc-300 hover:text-brand hover:border-brand transition-colors"
                        data-testid="theme-toggle"
                    >
                        {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
                    </button>
                    <a
                        href={PROFILE.resumeUrl}
                        download
                        className="group flex items-center gap-2 px-4 py-2 bg-brand text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-brand-hover transition-colors"
                        data-testid="nav-resume-download"
                    >
                        <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
                        Resume
                    </a>
                </div>

                <div className="md:hidden flex items-center gap-2">
                    <button
                        onClick={toggle}
                        aria-label="Toggle theme"
                        className="w-9 h-9 flex items-center justify-center border border-ink-600 text-zinc-300 hover:text-brand"
                        data-testid="theme-toggle-mobile"
                    >
                        {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
                    </button>
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-zinc-200 p-2"
                        aria-label="Menu"
                        data-testid="mobile-menu-toggle"
                    >
                        {open ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
                    <div className="px-6 py-4 flex flex-col gap-1">
                        {NAV.map((n) => (
                            <button
                                key={n.id}
                                onClick={() => scrollTo(n.id)}
                                className="text-left py-3 font-mono text-sm uppercase tracking-widest text-zinc-300 hover:text-brand"
                                data-testid={`mobile-nav-${n.id}-link`}
                            >
                                {n.label}
                            </button>
                        ))}
                        <a
                            href={PROFILE.resumeUrl}
                            download
                            className="mt-2 inline-flex items-center gap-2 px-4 py-3 bg-brand text-black font-mono text-xs uppercase tracking-widest font-bold w-fit"
                            data-testid="mobile-resume-download"
                        >
                            <FiDownload /> Resume
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};
