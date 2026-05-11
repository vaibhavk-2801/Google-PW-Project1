import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Center the custom cursor relative to its coordinates
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, [role="button"], .cursor-pointer');
      
      if (isInteractive) {
        gsap.to(cursor, {
          scale: 3,
          backgroundColor: 'transparent',
          border: '1px solid rgba(59, 130, 246, 0.8)',
          duration: 0.3
        });
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, [role="button"], .cursor-pointer');
      
      if (isInteractive) {
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: '#3b82f6',
          border: 'none',
          duration: 0.3
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-screen hidden md:block shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-colors"
      style={{ transformOrigin: 'center' }}
    />
  );
}
