import React, { useState } from 'react';

export const ReactiveOrb: React.FC = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);

  return (
    <div className="relative w-full h-[540px] sm:h-[640px] lg:h-[720px] xl:h-[760px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0e0e0e] to-[#040404] border border-[#FFD600]/40 shadow-[0_0_90px_rgba(255,214,0,0.25)] flex items-center justify-center group transition-all duration-500 hover:border-[#FFD600] hover:shadow-[0_0_120px_rgba(255,214,0,0.35)]">
      {/* Corner Minimalist Brackets */}
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* Vibrant Red & Electric Yellow Ambient Backlights for the Red Cubes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#FF3838]/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#FFD600]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Sleek Minimalist Spinner while loading (Zero Text) */}
      {!splineLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#080808] z-10">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="w-14 h-14 border-2 border-[#FFD600]/20 border-t-[#FFD600] rounded-full animate-spin" />
            <div className="absolute w-8 h-8 border-2 border-[#FF3838]/30 border-b-[#FF3838] rounded-full animate-spin direction-reverse" />
          </div>
        </div>
      )}

      {/* 
        Spline 3D Red Cubes:
        - Wide, unclipped viewport (scale-100) ensuring the full animation and edges are 100% visible
        - Natural aspect ratio with full cursor interactivity
      */}
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
        <iframe
          src="https://my.spline.design/redcubes-MktdNT4LDVhpVoDHQ6etj7PZ/"
          title="Spline 3D Red Cubes Animation"
          className="w-full h-[calc(100%+45px)] -mb-[45px] border-0 block select-none pointer-events-auto filter contrast-105 brightness-105"
          onLoad={() => setSplineLoaded(true)}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>

      {/* Corner blackout mask to ensure no watermark text is visible */}
      <div className="absolute bottom-0 right-0 w-44 h-12 bg-gradient-to-t from-[#040404] to-transparent pointer-events-none z-20" />
    </div>
  );
};
