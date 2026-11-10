import React, { useState, useEffect } from 'react';
import { sound } from '../utils/sound';
import { Volume2, VolumeX, Menu, X, FileText, Sparkles, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Overview', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Profiles', href: '#profiles' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sound.playSuccess();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/80 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-3 text-white transition-transform hover:scale-[1.02]"
            onMouseEnter={() => sound.playHover()}
          >
            <div className="relative w-9 h-9 rounded-lg bg-[#111111] border border-[#FFD600]/40 flex items-center justify-center overflow-hidden group-hover:border-[#FFD600] group-hover:shadow-[0_0_15px_rgba(255,214,0,0.5)] transition-all">
              <span className="font-grotesk font-black text-sm text-[#FFD600] tracking-tighter">AKY</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD600]/10 to-transparent pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#FF3838] rounded-full blur-[2px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-grotesk font-bold tracking-wider text-sm text-white group-hover:text-[#FFD600] transition-colors">
                  ANSH.DEV
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FFD600] animate-pulse" />
              </div>
              <span className="text-[10px] text-[#BDBDBD] font-mono tracking-widest block uppercase">
                NIT SILCHAR // 2028
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#111111]/70 border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium font-sans transition-all duration-200 ${
                    isActive
                      ? 'text-[#080808] font-semibold bg-[#FFD600] shadow-[0_0_15px_rgba(255,214,0,0.4)]'
                      : 'text-[#BDBDBD] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Unmute Cyber SFX' : 'Mute Cyber SFX'}
              className="p-2.5 rounded-lg bg-[#111111] border border-white/[0.08] hover:border-[#FFD600]/40 text-[#BDBDBD] hover:text-[#FFD600] transition-all hover:scale-105 active:scale-95"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-[#FFD600] animate-pulse" />}
            </button>

            {/* Resume CTA */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenResume();
              }}
              onMouseEnter={() => sound.playHover()}
              className="relative group overflow-hidden px-4 sm:px-5 py-2 rounded-lg bg-[#FFD600] text-[#080808] font-grotesk font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255,214,0,0.35)] hover:shadow-[0_0_30px_rgba(255,214,0,0.6)] transition-all flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#080808]" />
              <span>Resume</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="xl:hidden p-2 rounded-lg bg-[#111111] border border-white/[0.1] text-white hover:text-[#FFD600] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808]/95 backdrop-blur-2xl flex flex-col justify-center px-8 py-16 xl:hidden animate-in fade-in duration-200">
          <div className="space-y-3 max-w-sm mx-auto w-full">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-white/[0.08]">
              <Terminal className="w-4 h-4 text-[#FFD600]" />
              <span className="font-mono text-xs text-[#BDBDBD] tracking-widest uppercase">NAVIGATION INDEX</span>
            </div>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="flex items-center justify-between py-2 text-lg font-grotesk font-semibold text-neutral-300 hover:text-[#FFD600] border-b border-white/[0.04] transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-[#FFD600] opacity-60">→</span>
              </a>
            ))}

            <div className="pt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-3 bg-[#FFD600] text-black font-grotesk font-bold rounded-lg uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,214,0,0.4)]"
              >
                <Sparkles className="w-4 h-4" />
                View & Download Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
