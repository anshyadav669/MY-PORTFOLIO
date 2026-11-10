import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Capabilities } from './components/Capabilities';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { CodingProfiles } from './components/CodingProfiles';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Philosophy } from './components/Philosophy';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { CyberBackground } from './components/CyberBackground';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for navbar
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'capabilities',
      'skills',
      'projects',
      'profiles',
      'experience',
      'education',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 1.8 - 2 Second High-Tech Initial Loading Screen */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className="min-h-screen bg-[#080808] text-white selection:bg-[#FFD600] selection:text-black overflow-x-hidden font-sans relative">
        {/* Luminous Cyberpunk Interactive Background */}
        <CyberBackground />

        {/* Interactive Custom Cursor */}
        <CustomCursor />

        {/* Global Precision Navigation */}
        <Navbar onOpenResume={() => setResumeOpen(true)} activeSection={activeSection} />

        {/* Main Website Sections */}
        <main>
          <Hero onOpenResume={() => setResumeOpen(true)} />
          <About />
          <Capabilities />
          <Skills />
          <Projects />
          <CodingProfiles />
          <Experience />
          <Education />
          <Philosophy />
          <Contact />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Full Resume Preview & Download Modal */}
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </>
  );
};

export default App;
