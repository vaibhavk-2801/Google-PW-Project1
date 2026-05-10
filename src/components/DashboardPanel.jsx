import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function DashboardPanel({ activeNodeData, completedTasks, toggleTask }) {
  if (!activeNodeData) return null;

  return (
    <div className="glass-panel p-6 md:p-8 rounded-2xl w-full max-w-xl mx-auto md:mx-0 transition-all duration-500">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">{activeNodeData.phase}</h2>
        <h3 className="text-lg text-blue-400 font-medium">{activeNodeData.subtitle}</h3>
      </div>

      {/* The Blueprint */}
      <div className="mb-8">
        <h4 className="text-sm uppercase tracking-widest text-slate-400 mb-3">The Blueprint</h4>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          {activeNodeData.blueprint}
        </p>
      </div>

      {/* The Countdown */}
      <div className="mb-8 bg-slate-900/50 rounded-xl p-4 border border-white/5">
        <h4 className="text-sm uppercase tracking-widest text-slate-400 mb-3">The Countdown</h4>
        <div className="flex items-center gap-4">
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${activeNodeData.progress}%` }}
            />
          </div>
          <span className="text-xs font-mono text-slate-300 whitespace-nowrap">
            {activeNodeData.countdownText}
          </span>
        </div>
      </div>

      {/* The Action Checklist */}
      <div>
        <h4 className="text-sm uppercase tracking-widest text-slate-400 mb-4">Action Checklist</h4>
        <div className="space-y-3">
          {activeNodeData.tasks.map((task) => {
            const isCompleted = completedTasks.includes(task.id);
            return (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border text-left",
                  isCompleted 
                    ? "bg-blue-500/10 border-blue-500/30 text-slate-300" 
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0 animate-[scaleIn_0.2s_ease-out]" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-600 flex-shrink-0" />
                )}
                <span className={cn(
                  "text-sm md:text-base transition-all duration-300",
                  isCompleted && "line-through opacity-70"
                )}>
                  {task.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
