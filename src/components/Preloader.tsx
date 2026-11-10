import React, { useState, useEffect } from 'react';
import { sound } from '../utils/sound';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('INITIALIZING CORE SYSTEM...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const duration = 1800; // ~1.8 seconds
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentPct = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentPct);

      if (currentPct < 30) {
        setPhaseText('INITIALIZING RUNTIME & ASSETS...');
      } else if (currentPct < 65) {
        setPhaseText('CALIBRATING 3D REACTIVE ENGINE...');
      } else if (currentPct < 90) {
        setPhaseText('LOADING RESUME & ALGORITHMIC PROFILES...');
      } else {
        setPhaseText('SYSTEM OPERATIONAL // WELCOME');
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        sound.playSuccess();
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 500); // 500ms fade transition
        }, 200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808] transition-all duration-500 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background glow spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFD600]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#FF3838]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full">
        {/* Animated Brand Emblem */}
        <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
          {/* Outer Pulsing Rings */}
          <div className="absolute inset-0 rounded-2xl border border-[#FFD600]/40 animate-ping opacity-30" />
          <div className="absolute -inset-2 rounded-2xl border border-[#FF3838]/30 animate-pulse" />
          
          <div className="relative w-full h-full rounded-2xl bg-[#111111] border-2 border-[#FFD600] flex items-center justify-center shadow-[0_0_35px_rgba(255,214,0,0.5)]">
            <span className="font-grotesk font-black text-2xl text-[#FFD600] tracking-tighter">
              AKY
            </span>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#FF3838] rounded-full shadow-[0_0_8px_#FF3838]" />
          </div>
        </div>

        {/* Counter Percentage */}
        <div className="font-grotesk font-black text-5xl sm:text-6xl text-white tracking-tight mb-2">
          {progress}<span className="text-[#FFD600] text-3xl sm:text-4xl font-mono">%</span>
        </div>

        {/* Dynamic Status Text */}
        <div className="font-mono text-xs text-[#FFE94A] tracking-widest uppercase mb-6 h-4">
          &gt; {phaseText}
        </div>

        {/* Precision Progress Bar */}
        <div className="w-full h-1.5 bg-[#171717] rounded-full overflow-hidden border border-white/[0.08] shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#FFD600] via-[#FFE94A] to-[#FF3838] rounded-full transition-all duration-75 shadow-[0_0_15px_#FFD600]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom Technical HUD Label */}
        <div className="mt-8 flex items-center justify-between w-full text-[10px] font-mono text-neutral-500">
          <span>PORTFOLIO_V2.0</span>
          <span className="text-[#FFD600]">ANSH KUMAR YADAV</span>
          <span>NIT SILCHAR</span>
        </div>
      </div>
    </div>
  );
};
