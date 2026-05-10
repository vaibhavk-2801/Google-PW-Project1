import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function TimelineTrack({ data, activeNodeId, setActiveNodeId }) {
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      nodeRefs.current.forEach((node, index) => {
        if (!node) return;
        
        gsap.fromTo(node,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <div ref={containerRef} className="relative py-10 w-full max-w-sm mx-auto md:mx-0">
      {/* Vertical line */}
      <div className="absolute left-[39px] top-0 bottom-0 w-[2px] bg-white/10" />
      
      <div className="space-y-24 relative z-10">
        {data.map((node, index) => {
          const isActive = activeNodeId === node.id;
          return (
            <div 
              key={node.id} 
              ref={(el) => (nodeRefs.current[index] = el)}
              className="relative flex items-center gap-8 group cursor-pointer"
              onClick={() => setActiveNodeId(node.id)}
            >
              {/* Node Circle */}
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500 relative flex-shrink-0",
                isActive 
                  ? "bg-blue-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] scale-110" 
                  : "bg-slate-900 text-slate-500 border-2 border-slate-800 group-hover:border-slate-600 group-hover:text-slate-300"
              )}>
                {index + 1}
                {isActive && (
                  <div className="absolute inset-0 rounded-full border border-blue-400 animate-ping opacity-20" />
                )}
              </div>

              {/* Node Label */}
              <div className="flex-1">
                <h3 className={cn(
                  "text-2xl font-bold transition-colors duration-300",
                  isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                )}>
                  {node.phase}
                </h3>
                <p className="text-sm text-slate-500 mt-1 uppercase tracking-wider">{node.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
