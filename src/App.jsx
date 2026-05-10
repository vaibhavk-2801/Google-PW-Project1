import React, { useState, useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './components/HeroSection';
import TimelineTrack from './components/TimelineTrack';
import DashboardPanel from './components/DashboardPanel';
import { electionData } from './data/electionData';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const scrollRef = useRef(null);
  const [persona, setPersona] = useState(null);
  const [activeNodeId, setActiveNodeId] = useState(electionData[0].id);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Setup Locomotive Scroll
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const locomotiveScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      class: 'is-reveal'
    });

    locomotiveScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length 
          ? locomotiveScroll.scrollTo(value, 0, 0) 
          : locomotiveScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: scrollRef.current.style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locomotiveScroll.update());
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", () => locomotiveScroll.update());
      if (locomotiveScroll) locomotiveScroll.destroy();
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
      {/* Global Civic Readiness Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-slate-900 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
          style={{ width: `${globalProgress}%` }}
        />
      </div>

      <main ref={scrollRef} data-scroll-container className="bg-slate-950 min-h-screen text-slate-200">
        <HeroSection persona={persona} setPersona={setPersona} />
        
        <section id="dashboard-container" className="relative px-4 py-24 md:py-32" data-scroll-section>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 h-full">
            
            {/* Left Column: Timeline Track */}
            <div className="w-full md:w-5/12 flex-shrink-0 pt-12">
              <TimelineTrack 
                data={electionData} 
                activeNodeId={activeNodeId} 
                setActiveNodeId={setActiveNodeId} 
                scrollerRef={scrollRef}
              />
            </div>

            {/* Right Column: Dashboard Panel */}
            <div className="w-full md:w-7/12 mt-12 md:mt-0 relative">
              <div data-scroll data-scroll-sticky data-scroll-target="#dashboard-container">
                <DashboardPanel 
                  activeNodeData={activeNodeData} 
                  completedTasks={completedTasks}
                  toggleTask={toggleTask}
                />
              </div>
            </div>
            
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 text-center text-slate-600 border-t border-white/5" data-scroll-section>
          <p>CivicFlow © 2026. Empowering informed decisions.</p>
        </footer>
      </main>
    </div>
  );
}
