import React, { useRef, useEffect, useState } from 'react';
import { CheckCircle2, Circle, Download } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';

import { playClick, playSuccess } from '../utils/sounds';
import VoterTicket from './VoterTicket';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function DashboardPanel({ activeNodeData, completedTasks, toggleTask, globalProgress, persona }) {
  const panelRef = useRef(null);
  const progressRef = useRef(null);
  const ticketRef = useRef(null);
  const [prevTasksCount, setPrevTasksCount] = useState(0);

  // Confetti & Sound Check
  useEffect(() => {
    if (!activeNodeData) return;
    
    const phaseTasks = activeNodeData.tasks;
    const completedPhaseTasks = phaseTasks.filter(t => completedTasks.includes(t.id));
    
    // If we just completed all tasks in this phase
    if (completedPhaseTasks.length === phaseTasks.length && prevTasksCount < phaseTasks.length && phaseTasks.length > 0) {
      playSuccess();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#a855f7', '#ec4899']
      });
    }
    setPrevTasksCount(completedPhaseTasks.length);
  }, [completedTasks, activeNodeData]);

  // Number animation
  useEffect(() => {
    if (!activeNodeData || !progressRef.current) return;
    
    gsap.to(progressRef.current, {
      innerHTML: activeNodeData.progress,
      duration: 1,
      snap: { innerHTML: 1 },
      ease: "power2.out"
    });
  }, [activeNodeData?.progress]);

  // Tilt and Glow Effect
  const handleMouseMove = (e) => {
    if (!panelRef.current) return;
    
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    panelRef.current.style.setProperty('--x', `${x}px`);
    panelRef.current.style.setProperty('--y', `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    gsap.to(panelRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    if (!panelRef.current) return;
    gsap.to(panelRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5
    });
  };

  // Magnetic Button Effect
  const handleButtonMouseMove = (e, buttonElement) => {
    const rect = buttonElement.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(buttonElement, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleButtonMouseLeave = (buttonElement) => {
    gsap.to(buttonElement, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  const handleTaskClick = (taskId) => {
    playClick();
    toggleTask(taskId);
  };

  const handleDownloadTicket = async () => {
    if (!ticketRef.current) return;
    
    try {
      const canvas = await html2canvas(ticketRef.current, { 
        backgroundColor: null,
        scale: 2 // High-res download
      });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = 'CivicFlow-Pass.png';
      link.click();
    } catch (err) {
      console.error('Failed to generate ticket', err);
    }
  };

  if (!activeNodeData) return null;

  return (
    <>
      <div 
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-panel group relative p-5 md:p-6 rounded-2xl w-full max-w-xl mx-auto md:mx-0 sticky top-24 transform-style-3d z-10"
      >
        <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
             style={{
               background: `radial-gradient(600px circle at var(--x, 0px) var(--y, 0px), rgba(59, 130, 246, 0.15), transparent 40%)`
             }}
        />
        
        {/* Header */}
        <div className="mb-4 relative z-10">
          <h2 className="text-2xl font-bold text-white mb-1">{activeNodeData.phase}</h2>
          <h3 className="text-base text-blue-400 font-medium">{activeNodeData.subtitle}</h3>
        </div>

        {/* The Blueprint */}
        <div className="mb-5 relative z-10">
          <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-2">The Blueprint</h4>
          <p className="text-slate-300 leading-relaxed text-sm">
            {activeNodeData.blueprint}
          </p>
        </div>

        {/* The Countdown */}
        <div className="mb-5 bg-slate-900/50 rounded-xl p-3 border border-white/5 relative z-10 backdrop-blur-sm">
          <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-2">The Countdown</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-mono text-slate-300 whitespace-nowrap">
                {activeNodeData.countdownText}
              </span>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                <span ref={progressRef}>0</span>%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                style={{ width: `${activeNodeData.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* The Action Checklist */}
        <div className="relative z-10">
          <h4 className="text-xs uppercase tracking-widest text-slate-400 mb-3">Action Checklist</h4>
          <div className="space-y-2">
            {activeNodeData.tasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <button
                  key={task.id}
                  onClick={() => handleTaskClick(task.id)}
                  onMouseMove={(e) => handleButtonMouseMove(e, e.currentTarget)}
                  onMouseLeave={(e) => handleButtonMouseLeave(e.currentTarget)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl transition-colors duration-300 border text-left cursor-none",
                    isCompleted 
                      ? "bg-blue-500/10 border-blue-500/30 text-slate-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]" 
                      : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 animate-[scaleIn_0.2s_ease-out]" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600 flex-shrink-0" />
                  )}
                  <span className={cn(
                    "text-sm transition-all duration-300",
                    isCompleted && "line-through opacity-70"
                  )}>
                    {task.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Success Pass Generator (Shows at 100% Global Progress) */}
        {globalProgress >= 100 && (
          <div className="relative z-10 mt-6 pt-6 border-t border-white/10 animate-[fadeIn_0.5s_ease-out_forwards]">
            <button
              onClick={handleDownloadTicket}
              className="w-full relative group overflow-hidden rounded-xl p-[1px]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-sm" />
              <div className="relative bg-slate-900 border border-white/10 px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-colors duration-300 group-hover:bg-slate-900/80 cursor-none">
                <Download className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Download Ready-to-Vote Pass
                </span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Hidden element for canvas capture */}
      <VoterTicket ref={ticketRef} persona={persona} />
    </>
  );
}
