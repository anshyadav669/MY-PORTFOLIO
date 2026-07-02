import React, { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export const ScrollProgress = () => {
    const [w, setW] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const scrolled = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            setW(height > 0 ? (scrolled / height) * 100 : 0);
        };
        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-[60] pointer-events-none" data-testid="scroll-progress-container">
            <div className="h-full bg-brand transition-[width] duration-100" style={{ width: `${w}%` }} data-testid="scroll-progress-bar" />
        </div>
    );
};

export const BackToTop = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 800);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    if (!show) return null;
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center border border-brand bg-black/70 backdrop-blur text-brand hover:bg-brand hover:text-black transition-all"
            aria-label="Back to top"
            data-testid="back-to-top-btn"
        >
            <FiArrowUp size={20} />
        </button>
    );
};
