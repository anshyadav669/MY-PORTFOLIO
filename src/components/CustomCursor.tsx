import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch desktop pointer devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let isVisible = false;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Synchronous instant GPU update for center laser point (0ms latency, zero lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }

      // Check hover state efficiently without React state re-renders
      const target = e.target as HTMLElement | null;
      const hovering = !!(
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.glass-card-interactive') ||
          target.closest('.group') ||
          target.classList.contains('cursor-pointer'))
      );

      if (hovering !== isHovering) {
        isHovering = hovering;
        updateRingStyles();
      }
    };

    const handleMouseDown = () => {
      isClicking = true;
      updateRingStyles();
    };

    const handleMouseUp = () => {
      isClicking = false;
      updateRingStyles();
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    const updateRingStyles = () => {
      if (!ringRef.current) return;
      if (isClicking) {
        ringRef.current.style.width = '24px';
        ringRef.current.style.height = '24px';
        ringRef.current.style.borderColor = '#FF3838';
        ringRef.current.style.backgroundColor = 'rgba(255, 56, 56, 0.25)';
        ringRef.current.style.boxShadow = '0 0 20px rgba(255, 56, 56, 0.7)';
      } else if (isHovering) {
        ringRef.current.style.width = '50px';
        ringRef.current.style.height = '50px';
        ringRef.current.style.borderColor = '#FFD600';
        ringRef.current.style.backgroundColor = 'rgba(255, 214, 0, 0.12)';
        ringRef.current.style.boxShadow = '0 0 25px rgba(255, 214, 0, 0.45)';
      } else {
        ringRef.current.style.width = '32px';
        ringRef.current.style.height = '32px';
        ringRef.current.style.borderColor = 'rgba(255, 214, 0, 0.55)';
        ringRef.current.style.backgroundColor = 'transparent';
        ringRef.current.style.boxShadow = '0 0 10px rgba(255, 214, 0, 0.2)';
      }
    };

    // 60-120fps smooth lerp loop for the trailing ring
    const renderLoop = () => {
      ringX += (targetX - ringX) * 0.28;
      ringY += (targetY - ringY) * 0.28;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* High-Precision Laser Point (Synchronous 0ms tracking) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full will-change-transform opacity-0 transition-opacity duration-200"
        style={{
          width: '5px',
          height: '5px',
          backgroundColor: '#FFD600',
          boxShadow: '0 0 8px #FFD600, 0 0 16px #FFD600',
        }}
      />

      {/* Trailing Fluid Magnetic Reticle */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full will-change-transform border opacity-0 transition-[width,height,background-color,border-color,box-shadow,opacity] duration-150 ease-out"
        style={{
          width: '32px',
          height: '32px',
          borderColor: 'rgba(255, 214, 0, 0.55)',
          boxShadow: '0 0 10px rgba(255, 214, 0, 0.2)',
        }}
      />
    </>
  );
};
