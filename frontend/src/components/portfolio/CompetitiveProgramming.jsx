import React from "react";
import useSWR from "swr";
import { Section, SectionHeader } from "./Section";
import { fetchLeetcodeStats, fetchCodechefStats } from "@/lib/api";
import { PROFILE } from "@/data/portfolio";
import { Counter } from "./Counter";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { FiExternalLink, FiTrendingUp } from "react-icons/fi";

const Bar = ({ label, val, total, color = "#CCFF00" }) => {
    const pct = total ? Math.min(100, (val / total) * 100) : 0;
    return (
        <div>
            <div className="flex justify-between font-mono text-[10px] tracking-widest uppercase text-zinc-400 mb-1.5">
                <span>{label}</span>
                <span>
                    {val ?? "—"} / {total ?? "—"}
                </span>
            </div>
            <div className="h-[3px] bg-ink-600 overflow-hidden">
                <div className="h-full transition-all duration-[1500ms]" style={{ width: `${pct}%`, background: color }} />
            </div>
        </div>
    );
};

const CardShell = ({ children, className = "", testId }) => (
    <div className={`relative border border-ink-600 bg-ink-800 p-6 sm:p-8 card-hover overflow-hidden ${className}`} data-testid={testId}>
        {children}
    </div>
);

export const CompetitiveProgramming = () => {
    const { data: lc, error: lcErr, isLoading: lcLoading } = useSWR("lc-stats", fetchLeetcodeStats, { revalidateOnFocus: false });
    const { data: cc, error: ccErr, isLoading: ccLoading } = useSWR("cc-stats", fetchCodechefStats, { revalidateOnFocus: false });

    return (
        <Section id="cp">
            <SectionHeader index="03" sub="live · code stats" title="Competitive programming." />

            <div className="grid lg:grid-cols-6 gap-6">
                {/* LeetCode - large */}
                <CardShell className="lg:col-span-4" testId="leetcode-card">
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <SiLeetcode className="text-brand" size={26} />
                            <div>
                                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                                    leetcode
                                </div>
                                <div className="font-display text-lg font-bold text-zinc-100">
                                    {lc?.username || "AnshKumarYadav"}
                                </div>
                            </div>
                        </div>
                        <a href={PROFILE.socials.leetcode} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-brand" data-testid="leetcode-link">
                            <FiExternalLink />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                        <Stat label="Solved" value={lc?.total_solved ?? 400} isLoading={lcLoading} />
                        <Stat label="Easy" value={lc?.easy_solved} isLoading={lcLoading} />
                        <Stat label="Medium" value={lc?.medium_solved} isLoading={lcLoading} />
                        <Stat label="Hard" value={lc?.hard_solved} isLoading={lcLoading} />
                    </div>

                    <div className="space-y-4">
                        <Bar label="Easy" val={lc?.easy_solved} total={lc?.total_easy} />
                        <Bar label="Medium" val={lc?.medium_solved} total={lc?.total_medium} />
                        <Bar label="Hard" val={lc?.hard_solved} total={lc?.total_hard} />
                    </div>

                    {lc?.contest_rating && (
                        <div className="mt-8 pt-6 border-t border-ink-600 flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-400">
                            <div>
                                <div className="uppercase tracking-widest text-[10px] text-zinc-500">Contest Rating</div>
                                <div className="text-zinc-100 text-lg mt-1 flex items-center gap-2"><FiTrendingUp className="text-brand" /> {lc.contest_rating}</div>
                            </div>
                            {lc.global_ranking && (
                                <div>
                                    <div className="uppercase tracking-widest text-[10px] text-zinc-500">Global Rank</div>
                                    <div className="text-zinc-100 text-lg mt-1">#{lc.global_ranking?.toLocaleString?.() || lc.global_ranking}</div>
                                </div>
                            )}
                            {lc.top_percentage && (
                                <div>
                                    <div className="uppercase tracking-widest text-[10px] text-zinc-500">Top</div>
                                    <div className="text-zinc-100 text-lg mt-1">{lc.top_percentage}%</div>
                                </div>
                            )}
                        </div>
                    )}

                    {lcErr && (
                        <p className="mt-6 font-mono text-xs text-zinc-500">Live LeetCode fetch unavailable — showing profile snapshot.</p>
                    )}
                </CardShell>

                {/* CodeChef - tall */}
                <CardShell className="lg:col-span-2" testId="codechef-card">
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <SiCodechef className="text-brand" size={26} />
                            <div>
                                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">codechef</div>
                                <div className="font-display text-lg font-bold text-zinc-100">
                                    {cc?.username || "loop_hole39"}
                                </div>
                            </div>
                        </div>
                        <a href={PROFILE.socials.codechef} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-brand" data-testid="codechef-link">
                            <FiExternalLink />
                        </a>
                    </div>

                    <div className="mb-6">
                        <div className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">Current Rating</div>
                        <div className="font-display text-5xl font-black text-brand mt-2">
                            {ccLoading ? "..." : cc?.current_rating || "1400"}
                        </div>
                        <div className="font-mono text-sm text-zinc-400 mt-1">{cc?.stars || "2★ Coder"}</div>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                        <KV k="Highest" v={cc?.highest_rating || "—"} />
                        <KV k="Global Rank" v={cc?.global_rank || "—"} />
                        <KV k="Country Rank" v={cc?.country_rank || "—"} />
                    </div>

                    <div className="mt-6 pt-6 border-t border-ink-600">
                        <div className="font-mono text-[10px] tracking-widest uppercase text-zinc-500 mb-2">Best Finish</div>
                        <div className="font-display text-2xl font-bold text-zinc-100">Rank 21</div>
                        <div className="font-mono text-xs text-zinc-400">Starters 243 · 21,836 participants</div>
                    </div>
                </CardShell>
            </div>
        </Section>
    );
};

const Stat = ({ label, value, isLoading }) => (
    <div>
        <div className="font-mono text-[10px] tracking-widest uppercase text-zinc-500 mb-1">
            {label}
        </div>
        <div className="font-display text-3xl sm:text-4xl font-black text-zinc-100">
            {isLoading ? "…" : <Counter end={value ?? 0} />}
        </div>
    </div>
);

const KV = ({ k, v }) => (
    <div className="flex justify-between border-b border-ink-600 pb-2 last:border-none">
        <span className="uppercase tracking-widest text-[10px] text-zinc-500">{k}</span>
        <span className="text-zinc-200">{v}</span>
    </div>
);
