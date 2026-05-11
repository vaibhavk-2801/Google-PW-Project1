import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './components/HeroSection';
import TimelineTrack from './components/TimelineTrack';
import DashboardPanel from './components/DashboardPanel';
import CustomCursor from './components/CustomCursor';
import ThreeBackground from './components/ThreeBackground';
import { electionData } from './data/electionData';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [persona, setPersona] = useState(null);
  const [activeNodeId, setActiveNodeId] = useState(electionData[0].id);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Setup Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const totalTasks = electionData.reduce((acc, curr) => acc + curr.tasks.length, 0);
  const globalProgress = totalTasks === 0 ? 0 : (completedTasks.length / totalTasks) * 100;
  
  const activeNodeData = electionData.find(n => n.id === activeNodeId);

  return (
    <div className="relative">
      <CustomCursor />
      <ThreeBackground />
      {/* Global Civic Readiness Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-slate-900 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
          style={{ width: `${globalProgress}%` }}
        />
      </div>

      <main className="min-h-screen text-slate-200 bg-transparent">
        <HeroSection persona={persona} setPersona={setPersona} />
        
        <section id="dashboard-container" className="relative px-4 py-24 md:py-32">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 h-full">
            
            {/* Left Column: Timeline Track */}
            <div className="w-full md:w-5/12 flex-shrink-0 pt-12">
              <TimelineTrack 
                data={electionData} 
                activeNodeId={activeNodeId} 
                setActiveNodeId={setActiveNodeId} 
              />
            </div>

            {/* Right Column: Dashboard Panel */}
            <div className="w-full md:w-7/12 mt-12 md:mt-0 relative">
              <DashboardPanel 
                activeNodeData={activeNodeData} 
                completedTasks={completedTasks}
                toggleTask={toggleTask}
                globalProgress={globalProgress}
                persona={persona}
              />
            </div>
            
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 text-center text-slate-600 border-t border-white/5">
          <p>CivicFlow © 2026. Empowering informed decisions.</p>
        </footer>
      </main>
    </div>
  );
}
