import React from 'react';
import ThreeHeroElement from './ThreeHeroElement';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function HeroSection({ persona, setPersona }) {
  const isFirstTime = persona === 'First-Time Voter';
  const isCurious = persona === 'Curious Citizen';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4 overflow-hidden" data-scroll-section>
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="text-center z-10 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 mb-6 drop-shadow-sm">
          Democracy, Demystified.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 h-16 transition-all duration-500">
          {persona === null 
            ? "Select your persona below to begin your tailored electoral journey."
            : isFirstTime 
              ? "Welcome to your first election. Let's break down the process step-by-step so you can cast your vote with confidence."
              : "Welcome back. Let's dive deeper into the mechanics, timelines, and behind-the-scenes processes of our elections."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => setPersona('First-Time Voter')}
            className={cn(
              "px-8 py-4 rounded-full font-medium transition-all duration-300 border backdrop-blur-md",
              isFirstTime 
                ? "bg-blue-600/20 border-blue-500 text-blue-100 shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
            )}
          >
            I'm a First-Time Voter
          </button>
          <button
            onClick={() => setPersona('Curious Citizen')}
            className={cn(
              "px-8 py-4 rounded-full font-medium transition-all duration-300 border backdrop-blur-md",
              isCurious 
                ? "bg-purple-600/20 border-purple-500 text-purple-100 shadow-[0_0_20px_rgba(168,85,247,0.3)]" 
                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
            )}
          >
            I'm a Curious Citizen
          </button>
        </div>
      </div>

      {/* 3D Element Container */}
      <div className="w-full max-w-3xl mt-4 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
        <ThreeHeroElement />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-bounce">
        <span className="text-xs uppercase tracking-widest text-slate-500 mb-2">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent"></div>
      </div>
    </section>
  );
}
