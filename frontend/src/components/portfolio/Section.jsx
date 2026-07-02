import React from "react";

export const SectionHeader = ({ index, title, sub }) => (
    <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand">
                {index}
            </span>
            <span className="w-12 h-px bg-brand" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-zinc-500">
                {sub}
            </span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-zinc-100">
            {title}
        </h2>
    </div>
);

export const Section = ({ id, children, className = "" }) => (
    <section
        id={id}
        className={`relative py-24 sm:py-32 ${className}`}
        data-testid={`${id}-section`}
    >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">{children}</div>
    </section>
);
