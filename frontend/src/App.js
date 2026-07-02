import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { CompetitiveProgramming } from "@/components/portfolio/CompetitiveProgramming";
import { GithubStats } from "@/components/portfolio/GithubStats";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { ScrollProgress, BackToTop } from "@/components/portfolio/Chrome";
import { ThemeProvider, useTheme } from "@/lib/theme";
import ProjectDetail from "@/pages/ProjectDetail";

const ThemedToaster = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    return (
        <Toaster
            theme={theme}
            position="bottom-right"
            toastOptions={{
                style: {
                    background: isDark ? "#0A0A0A" : "#FFFFFF",
                    border: `1px solid ${isDark ? "#1F1F1F" : "#E4E4E7"}`,
                    color: isDark ? "#F4F4F5" : "#18181B",
                    fontFamily: "'JetBrains Mono', monospace",
                    borderRadius: 0,
                },
            }}
        />
    );
};

const Home = () => (
    <div className="min-h-screen bg-ink-900 text-zinc-100 font-mono selection:bg-brand selection:text-black">
        <ScrollProgress />
        <Nav />
        <main>
            <Hero />
            <About />
            <Skills />
            <CompetitiveProgramming />
            <GithubStats />
            <Projects />
            <Experience />
            <Contact />
        </main>
        <Footer />
        <BackToTop />
        <ThemedToaster />
    </div>
);

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects/:slug" element={<ProjectDetailWithToaster />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

const ProjectDetailWithToaster = () => (
    <>
        <ProjectDetail />
        <ThemedToaster />
    </>
);

export default App;
