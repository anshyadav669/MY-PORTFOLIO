import React, { useState, useEffect, useRef } from 'react';
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
import { ChevronUp } from 'lucide-react';
import { sound } from './utils/sound';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Track scroll progress and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0 && progressBarRef.current) {
        const progress = (window.scrollY / totalScroll) * 100;
        progressBarRef.current.style.width = `${progress}%`;
      }
      setShowScrollTop(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1.8 - 2 Second High-Tech Initial Loading Screen */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Cyber Reading Progress Laser Beam */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#FF3838] via-[#FFD600] to-[#FFE94A] z-[60] will-change-[width] shadow-[0_0_12px_#FFD600]"
        style={{ width: '0%' }}
      />

      <div className="min-h-screen bg-[#080808] text-white selection:bg-[#FFD600] selection:text-black overflow-x-hidden font-sans relative">
        {/* Luminous Cyberpunk Interactive Background */}
        <CyberBackground />

        {/* High-Performance Fluid Custom Cursor */}
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

        {/* Floating Quick Return-To-Top Cyber Pill */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            title="Return to System Origin (Top)"
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#111111]/90 backdrop-blur-md border border-[#FFD600]/40 text-[#FFD600] shadow-[0_0_20px_rgba(255,214,0,0.3)] hover:border-[#FFD600] hover:shadow-[0_0_30px_rgba(255,214,0,0.6)] transition-all hover:scale-110 active:scale-95 group"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}

        {/* Full Resume Preview & Download Modal */}
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </>
  );
};

export default App;
