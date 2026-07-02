import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "dark", toggle: () => {} });

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "dark";
        const saved = window.localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") return saved;
        return "dark";
    });

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-theme", theme);
        // Also toggle Tailwind dark class for shadcn tokens
        if (theme === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
