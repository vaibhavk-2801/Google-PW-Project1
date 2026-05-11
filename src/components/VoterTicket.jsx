import React, { forwardRef } from 'react';

const VoterTicket = forwardRef(({ persona }, ref) => {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div
      ref={ref}
      className="absolute -left-[9999px] top-0 w-[600px] h-[300px] bg-slate-900 border-2 border-blue-500 rounded-2xl flex overflow-hidden text-slate-200"
      style={{
        boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
      }}
    >
      {/* Left stub */}
      <div className="w-1/3 bg-blue-600 p-6 flex flex-col justify-between border-r-2 border-dashed border-slate-900">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter leading-none mb-1">CIVICFLOW</h2>
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Official Pass</p>
        </div>
        
        <div className="rotate-180" style={{ writingMode: 'vertical-rl' }}>
          <p className="text-white font-mono text-xl tracking-[0.3em] font-bold">100% READY</p>
        </div>
      </div>

      {/* Right main ticket */}
      <div className="w-2/3 p-8 flex flex-col justify-between relative bg-slate-900">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full pointer-events-none" />
        
        <div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Elector Persona</p>
          <h3 className="text-3xl font-black text-white mb-4">{persona || 'Citizen'}</h3>
          
          <div className="flex gap-8">
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Date</p>
              <p className="text-slate-300 text-sm font-medium">{today}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Status</p>
              <p className="text-green-400 text-sm font-bold">VERIFIED</p>
            </div>
          </div>
        </div>

        {/* Fake Barcode */}
        <div className="mt-6 flex flex-col gap-1">
          <div className="w-full h-12 flex gap-1 items-end">
            {Array.from({ length: 40 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-slate-400" 
                style={{ 
                  width: `${Math.random() * 4 + 1}px`, 
                  height: `${Math.random() > 0.8 ? 100 : 80}%` 
                }} 
              />
            ))}
          </div>
          <p className="text-center font-mono text-[10px] text-slate-500 tracking-[0.5em]">
            CF-2026-{Math.floor(Math.random() * 90000) + 10000}
          </p>
        </div>
      </div>
    </div>
  );
});

VoterTicket.displayName = 'VoterTicket';
export default VoterTicket;
