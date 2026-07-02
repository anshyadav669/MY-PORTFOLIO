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
import { ThemeProvider } from "@/lib/theme";

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
        <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
                style: {
                    background: "#0A0A0A",
                    border: "1px solid #1F1F1F",
                    color: "#F4F4F5",
                    fontFamily: "'JetBrains Mono', monospace",
                    borderRadius: 0,
                },
            }}
        />
    </div>
);

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
