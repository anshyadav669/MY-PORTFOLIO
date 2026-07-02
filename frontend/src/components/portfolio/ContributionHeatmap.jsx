import React, { useMemo } from "react";
import useSWR from "swr";
import { fetchGithubContributions } from "@/lib/api";
import { FiGitCommit } from "react-icons/fi";

// Group days into weeks (columns of 7 days). Missing leading days get placeholders.
const groupByWeeks = (days) => {
    if (!days || !days.length) return [];
    // Determine start weekday (0=Sun) of first date, pad leading with nulls
    const first = new Date(days[0].date + "T00:00:00Z");
    const startDay = first.getUTCDay(); // 0..6
    const padded = Array(startDay).fill(null).concat(days);
    const weeks = [];
    for (let i = 0; i < padded.length; i += 7) {
        weeks.push(padded.slice(i, i + 7));
    }
    return weeks;
};

const LEVEL_CLASS = [
    "bg-[color:var(--heat-0)]",
    "bg-[color:var(--heat-1)]",
    "bg-[color:var(--heat-2)]",
    "bg-[color:var(--heat-3)]",
    "bg-[color:var(--heat-4)]",
];

export const ContributionHeatmap = () => {
    const { data, isLoading, error } = useSWR("gh-contribs", fetchGithubContributions, {
        revalidateOnFocus: false,
    });

    const weeks = useMemo(() => groupByWeeks(data?.days || []), [data]);
    const monthLabels = useMemo(() => {
        if (!weeks.length) return [];
        const labels = [];
        let lastMonth = -1;
        weeks.forEach((w, wi) => {
            const firstReal = w.find((d) => d);
            if (!firstReal) return;
            const m = new Date(firstReal.date + "T00:00:00Z").getUTCMonth();
            if (m !== lastMonth) {
                labels.push({
                    idx: wi,
                    label: new Date(firstReal.date + "T00:00:00Z").toLocaleString("en", {
                        month: "short",
                    }),
                });
                lastMonth = m;
            }
        });
        return labels;
    }, [weeks]);

    return (
        <div className="lg:col-span-6 border border-ink-600 bg-ink-800 p-6 sm:p-8 card-hover" data-testid="github-contributions-card">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <FiGitCommit className="text-brand" />
                    <div>
                        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500">
                            contribution graph · last 12 months
                        </div>
                        <div className="font-display text-lg font-bold text-zinc-100">
                            {data?.total_last_year ?? "…"} contributions
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-zinc-500">
                    less
                    {LEVEL_CLASS.map((cls, i) => (
                        <span key={i} className={`w-3 h-3 border border-black/30 ${cls}`} />
                    ))}
                    more
                </div>
            </div>

            {isLoading && (
                <div className="font-mono text-xs text-zinc-500">Loading contribution history…</div>
            )}
            {error && (
                <div className="font-mono text-xs text-zinc-500">
                    Contribution graph is temporarily unavailable.
                </div>
            )}

            {!isLoading && !error && weeks.length > 0 && (
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full">
                        {/* Month labels */}
                        <div className="grid gap-[3px] mb-1" style={{ gridTemplateColumns: `repeat(${weeks.length}, 12px)` }}>
                            {Array(weeks.length).fill(null).map((_, i) => {
                                const label = monthLabels.find((m) => m.idx === i);
                                return (
                                    <div key={i} className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 h-3">
                                        {label?.label || ""}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Grid */}
                        <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, 12px)` }}>
                            {weeks.map((w, wi) => (
                                <div key={wi} className="grid gap-[3px]" style={{ gridTemplateRows: "repeat(7, 12px)" }}>
                                    {w.map((day, di) => {
                                        if (!day) return <div key={di} className="w-3 h-3" />;
                                        return (
                                            <div
                                                key={di}
                                                className={`w-3 h-3 ${LEVEL_CLASS[Math.min(4, day.level || 0)]} transition-colors`}
                                                title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                                                data-testid={`heat-cell-${day.date}`}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
