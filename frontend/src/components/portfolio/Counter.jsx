import React, { useEffect, useRef, useState } from "react";

// Animated number counter that runs when in view
export const Counter = ({ end, duration = 1600, suffix = "", prefix = "", className = "" }) => {
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        if (typeof end !== "number") return;
        if (!ref.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();
                    const step = (now) => {
                        const t = Math.min(1, (now - start) / duration);
                        const eased = 1 - Math.pow(1 - t, 3);
                        setValue(Math.floor(eased * end));
                        if (t < 1) requestAnimationFrame(step);
                        else setValue(end);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.3 }
        );
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, [end, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {typeof end === "number" ? value.toLocaleString() : (end ?? "—")}
            {suffix}
        </span>
    );
};
