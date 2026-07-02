import React from "react";
import useSWR from "swr";
import { Section, SectionHeader } from "./Section";
import { fetchGithubStats } from "@/lib/api";
import { Counter } from "./Counter";
import { ContributionHeatmap } from "./ContributionHeatmap";
import { SiGithub } from "react-icons/si";
import { FiStar, FiGitBranch, FiUsers, FiExternalLink, FiCode } from "react-icons/fi";
import { PROFILE } from "@/data/portfolio";

export const GithubStats = () => {
    const { data, error, isLoading } = useSWR("gh-stats", fetchGithubStats, { revalidateOnFocus: false });

    const topLang = data?.top_languages?.[0]?.name || "Python";
    const maxLangCount = Math.max(1, ...(data?.top_languages || []).map((l) => l.count));

    return (
        <Section id="github">
            <SectionHeader index="04" sub="live · repo stats" title="GitHub in numbers." />

            <div className="grid lg:grid-cols-6 grid-rows-auto gap-6">
                <div className="lg:col-span-2 border border-ink-600 bg-ink-800 p-6 sm:p-8 card-hover" data-testid="github-profile-card">
                    <div className="flex items-center gap-3 mb-6">
                        <SiGithub className="text-brand" size={26} />
                        <div>
                            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">github</div>
                            <div className="font-display text-lg font-bold text-zinc-100">
                                {data?.username || "anshyadav669"}
                            </div>
                        </div>
                    </div>

                    {data?.avatar_url && (
                        <img
                            src={data.avatar_url}
                            alt="avatar"
                            className="w-24 h-24 border border-ink-600 grayscale hover:grayscale-0 transition-all"
                            loading="lazy"
                        />
                    )}

                    <p className="mt-6 font-mono text-xs text-zinc-400 leading-relaxed line-clamp-3">
                        {data?.bio || "Builder. Learner. Currently shipping web apps + RAG systems."}
                    </p>

                    <a
                        href={PROFILE.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:text-brand"
                        data-testid="github-profile-link"
                    >
                        View profile <FiExternalLink />
                    </a>
                </div>

                <div className="lg:col-span-2 border border-ink-600 bg-ink-800 p-6 sm:p-8 card-hover flex flex-col justify-between" data-testid="github-stats-card">
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-6">
                        ~/aggregates
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <BigStat icon={<FiCode />} label="Repos" value={data?.public_repos} loading={isLoading} />
                        <BigStat icon={<FiStar />} label="Stars" value={data?.total_stars} loading={isLoading} />
                        <BigStat icon={<FiGitBranch />} label="Forks" value={data?.total_forks} loading={isLoading} />
                        <BigStat icon={<FiUsers />} label="Followers" value={data?.followers} loading={isLoading} />
                    </div>
                </div>

                <div className="lg:col-span-2 border border-ink-600 bg-ink-800 p-6 sm:p-8 card-hover" data-testid="github-langs-card">
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 mb-6">
                        top_languages
                    </div>
                    <div className="space-y-4">
                        {(data?.top_languages || []).slice(0, 5).map((l) => {
                            const pct = (l.count / maxLangCount) * 100;
                            return (
                                <div key={l.name}>
                                    <div className="flex justify-between font-mono text-xs mb-1.5">
                                        <span className="text-zinc-200">{l.name}</span>
                                        <span className="text-zinc-500">{l.count}</span>
                                    </div>
                                    <div className="h-[3px] bg-ink-600 overflow-hidden">
                                        <div className="h-full bg-brand transition-all duration-1000" style={{ width: `${pct}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                        {isLoading && <p className="font-mono text-xs text-zinc-500">fetching languages…</p>}
                        {!isLoading && !data?.top_languages?.length && (
                            <p className="font-mono text-xs text-zinc-500">Top: {topLang}</p>
                        )}
                    </div>
                </div>

                {/* Contribution heatmap - full width */}
                <ContributionHeatmap />

                {/* Top repos */}
                <div className="lg:col-span-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="github-repos-grid">
                    {(data?.top_repos || []).slice(0, 6).map((r) => (
                        <a
                            key={r.name}
                            href={r.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="group border border-ink-600 bg-ink-800 p-6 card-hover block"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="font-display text-base font-bold text-zinc-100 group-hover:text-brand transition-colors truncate">
                                    {r.name}
                                </div>
                                <FiExternalLink className="text-zinc-500 group-hover:text-brand shrink-0" />
                            </div>
                            <p className="font-mono text-xs text-zinc-400 line-clamp-2 mb-4 min-h-[32px]">
                                {r.description || "No description."}
                            </p>
                            <div className="flex items-center gap-4 font-mono text-[10px] tracking-widest uppercase text-zinc-500">
                                {r.language && <span className="text-brand">{r.language}</span>}
                                <span className="flex items-center gap-1"><FiStar /> {r.stargazers_count}</span>
                                <span className="flex items-center gap-1"><FiGitBranch /> {r.forks_count}</span>
                            </div>
                        </a>
                    ))}
                    {error && (
                        <div className="lg:col-span-3 font-mono text-xs text-zinc-500">
                            Couldn&apos;t reach GitHub API right now — please check the profile directly.
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
};

const BigStat = ({ icon, label, value, loading }) => (
    <div>
        <div className="flex items-center gap-2 text-brand text-sm">{icon}</div>
        <div className="font-display text-3xl sm:text-4xl font-black text-zinc-100 mt-2">
            {loading ? "…" : <Counter end={value ?? 0} />}
        </div>
        <div className="font-mono text-[10px] tracking-widest uppercase text-zinc-500 mt-1">
            {label}
        </div>
    </div>
);
