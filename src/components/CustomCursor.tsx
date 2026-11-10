import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('glass-card-interactive'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth trailing animation loop
    let animId: number;
    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.2,
        y: prev.y + (pos.y - prev.y) * 0.2,
      }));
      animId = requestAnimationFrame(follow);
    };
    animId = requestAnimationFrame(follow);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center Yellow Dot */}
      <div
        className="fixed pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isClicking ? '6px' : isHovering ? '8px' : '6px',
          height: isClicking ? '6px' : isHovering ? '8px' : '6px',
          backgroundColor: '#FFD600',
          boxShadow: '0 0 10px #FFD600',
        }}
      />

      {/* Trailing Fluid Ring */}
      <div
        className="fixed pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out border"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovering ? '48px' : isClicking ? '26px' : '32px',
          height: isHovering ? '48px' : isClicking ? '26px' : '32px',
          borderColor: isHovering ? '#FFD600' : 'rgba(255, 214, 0, 0.45)',
          backgroundColor: isHovering ? 'rgba(255, 214, 0, 0.1)' : 'transparent',
          boxShadow: isHovering ? '0 0 20px rgba(255, 214, 0, 0.3)' : 'none',
        }}
      />
    </>
  );
};
