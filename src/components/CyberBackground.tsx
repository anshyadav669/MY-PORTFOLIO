import React, { useEffect, useState } from 'react';

export const CyberBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [smoothPos, setSmoothPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth lerp animation for fluid cursor flashlight
    let animId: number;
    const updateLerp = () => {
      setSmoothPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.1,
        y: prev.y + (mousePos.y - prev.y) * 0.1,
      }));
      animId = requestAnimationFrame(updateLerp);
    };
    animId = requestAnimationFrame(updateLerp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [mousePos.x, mousePos.y]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Base Gradient (Not flat black: rich dark void) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#060606] to-[#040404]" />

      {/* 2. Enhanced Luminous Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 214, 0, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 214, 0, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* 3. Subtle Hexagonal Dot Matrix Accent */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 214, 0, 0.18) 1.2px, transparent 0)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(circle at 50% 30%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black 20%, transparent 70%)',
        }}
      />

      {/* 4. Mouse-Following Flashlight Halo (Awwwards Creative Flashlight) */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(750px circle at ${smoothPos.x}px ${smoothPos.y}px, rgba(255, 214, 0, 0.09), rgba(255, 56, 56, 0.035) 45%, transparent 75%)`,
        }}
      />

      {/* 5. Permanent Vibrant Ambient Glow Nebulae (breathing) */}
      {/* Top Left: Electric Yellow Spotlight */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-[#FFD600]/18 rounded-full blur-[160px] animate-pulse-slow" />
      
      {/* Top Right: Crimson Red Cyber Accent */}
      <div className="absolute top-10 -right-32 w-[600px] h-[600px] bg-[#FF3838]/15 rounded-full blur-[150px] animate-float" />
      
      {/* Center Left: Golden Horizon Flare */}
      <div className="absolute top-[45%] -left-48 w-[700px] h-[500px] bg-[#FFE94A]/12 rounded-full blur-[180px]" />
      
      {/* Center Right: Deep Red Nebula */}
      <div className="absolute top-[65%] -right-48 w-[650px] h-[650px] bg-[#FF3838]/14 rounded-full blur-[170px] animate-pulse-slow" />

      {/* Bottom Center: Electric Yellow Core */}
      <div className="absolute -bottom-40 left-1/3 w-[800px] h-[600px] bg-[#FFD600]/15 rounded-full blur-[190px]" />

      {/* 6. Glowing Horizontal Light Streaks (Cyberpunk Horizon Beams) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFD600]/50 to-transparent" />
      <div className="absolute top-[28%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFD600]/20 to-transparent opacity-60" />
      <div className="absolute top-[62%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF3838]/20 to-transparent opacity-60" />

      {/* 7. Floating Cyber Stardust Particles */}
      <div className="absolute inset-0">
        {[
          { top: '12%', left: '18%', size: '3px', color: '#FFD600', anim: 'animate-ping' },
          { top: '22%', left: '78%', size: '4px', color: '#FF3838', anim: 'animate-pulse' },
          { top: '38%', left: '12%', size: '3px', color: '#FFE94A', anim: 'animate-pulse-slow' },
          { top: '48%', left: '88%', size: '4px', color: '#FFD600', anim: 'animate-float' },
          { top: '65%', left: '25%', size: '3px', color: '#FF3838', anim: 'animate-pulse' },
          { top: '78%', left: '72%', size: '4px', color: '#FFD600', anim: 'animate-ping' },
          { top: '88%', left: '35%', size: '3px', color: '#FFE94A', anim: 'animate-pulse-slow' },
        ].map((star, idx) => (
          <div
            key={idx}
            className={`absolute rounded-full pointer-events-none opacity-60 ${star.anim}`}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              boxShadow: `0 0 12px ${star.color}`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
