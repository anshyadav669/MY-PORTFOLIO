import React, { useEffect, useRef } from 'react';

export const CyberBackground: React.FC = () => {
  const flashlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // Smooth lerp for flashlight halo without causing ANY React re-renders
    const updateLerp = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (flashlightRef.current) {
        flashlightRef.current.style.background = `radial-gradient(850px circle at ${currentX}px ${currentY}px, rgba(255, 214, 0, 0.11), rgba(255, 56, 56, 0.04) 40%, transparent 75%)`;
      }

      animId = requestAnimationFrame(updateLerp);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateLerp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Multi-Stop Cyber Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#060606] to-[#040404]" />

      {/* 2. Luminous Cybernetic Grid */}
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 214, 0, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 214, 0, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* 3. Hexagonal Dot Matrix Accent Layer */}
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 214, 0, 0.22) 1.2px, transparent 0)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(circle at 50% 35%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 35%, black 20%, transparent 75%)',
        }}
      />

      {/* 4. Mouse-Following Flashlight Halo (Direct GPU accelerated DOM Ref - Zero React Lag) */}
      <div
        ref={flashlightRef}
        className="absolute inset-0 will-change-[background]"
      />

      {/* 5. Breathing Ambient Nebulae (Layered for cinematic depth) */}
      {/* Top Left: Electric Yellow Spotlight */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-[#FFD600]/18 rounded-full blur-[160px] animate-pulse-slow" />

      {/* Top Right: Crimson Red Cyber Accent */}
      <div className="absolute top-10 -right-32 w-[600px] h-[600px] bg-[#FF3838]/16 rounded-full blur-[150px] animate-float" />

      {/* Center Left: Golden Horizon Flare */}
      <div className="absolute top-[42%] -left-48 w-[720px] h-[520px] bg-[#FFE94A]/14 rounded-full blur-[180px]" />

      {/* Center Right: Deep Red Nebula */}
      <div className="absolute top-[62%] -right-48 w-[680px] h-[680px] bg-[#FF3838]/15 rounded-full blur-[170px] animate-pulse-slow" />

      {/* Bottom Center: Electric Yellow Core */}
      <div className="absolute -bottom-40 left-1/3 w-[820px] h-[620px] bg-[#FFD600]/16 rounded-full blur-[190px]" />

      {/* 6. Glowing Horizontal Light Beams */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFD600]/60 to-transparent" />
      <div className="absolute top-[28%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFD600]/25 to-transparent opacity-70" />
      <div className="absolute top-[62%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF3838]/25 to-transparent opacity-70" />

      {/* 7. Subtle Vignette Edge Mask */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* 8. Floating Cyber Stardust Particles with soft neon glows */}
      <div className="absolute inset-0">
        {[
          { top: '10%', left: '15%', size: '3px', color: '#FFD600', anim: 'animate-ping' },
          { top: '20%', left: '82%', size: '4px', color: '#FF3838', anim: 'animate-pulse' },
          { top: '35%', left: '10%', size: '3px', color: '#FFE94A', anim: 'animate-pulse-slow' },
          { top: '48%', left: '90%', size: '4px', color: '#FFD600', anim: 'animate-float' },
          { top: '65%', left: '22%', size: '3px', color: '#FF3838', anim: 'animate-pulse' },
          { top: '78%', left: '75%', size: '4px', color: '#FFD600', anim: 'animate-ping' },
          { top: '88%', left: '32%', size: '3px', color: '#FFE94A', anim: 'animate-pulse-slow' },
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
