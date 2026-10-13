import React, { useEffect, useState } from 'react';
import { ThinkingOrb } from 'thinking-orbs';
import { blobatar } from 'blobatar';

type OrbState = 'working' | 'searching' | 'solving' | 'connecting' | 'weaving' | 'shaping' | 'listening' | 'composing' | 'breathing';

export default function DashboardPreview() {
  const [orbState, setOrbState] = useState<OrbState>('working');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const states: OrbState[] = ['working', 'searching', 'solving', 'connecting', 'weaving', 'shaping'];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % states.length;
      setOrbState(states[i]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] bg-white border border-neutral-200 rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col font-sans relative">
       {/* Ambient Glow */}
       <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-primary/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

       {/* Dashboard Header */}
       <div className="h-14 border-b border-neutral-200 bg-white/80 backdrop-blur flex items-center px-5 justify-between relative z-10">
          <div className="flex gap-2.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
          </div>
          <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
            <svg className="w-3 h-3 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Workspace / Primidac
          </div>
          <div className="flex items-center gap-3">
             <div className="text-xs text-neutral-900 font-medium hidden sm:block">Admin</div>
             <div className="w-7 h-7 rounded-full bg-neutral-100 overflow-hidden border border-neutral-200" dangerouslySetInnerHTML={{__html: blobatar('Primidac')}} />
          </div>
       </div>
       
       {/* Dashboard Body */}
       <div className="flex flex-1 overflow-hidden relative z-10">
         {/* Sidebar */}
         <div className="w-16 sm:w-20 border-r border-neutral-200 bg-neutral-50/50 flex flex-col items-center py-6 gap-6">
            <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400 hover:bg-neutral-200 transition-colors cursor-pointer"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></div>
            <div className="w-10 h-10 rounded-xl bg-brand-primary/20 text-brand-primary border border-brand-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(27,80,249,0.3)]"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg></div>
            <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400 hover:bg-neutral-200 transition-colors cursor-pointer"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
         </div>
         {/* Main Content Area */}
         <div className="flex-1 p-6 sm:p-8 relative">
            <div className="flex justify-between items-end mb-8">
               <div>
                  <h3 className="text-xl text-neutral-900 font-medium mb-1 font-display">Tools Marketplace</h3>
                  <p className="text-neutral-700 text-sm">Discover and connect business tools to your workspace.</p>
               </div>
               <div className="px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-md text-xs text-neutral-600 hidden sm:flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  Search tools...
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               {['DataSync Pro', 'Automator', 'Insights DB', 'Cloud Connect'].map((tool, idx) => (
                  <div key={tool} className={`bg-white border ${idx === 0 ? 'border-brand-primary/40 shadow-[0_0_20px_rgba(27,80,249,0.1)]' : 'border-neutral-200'} rounded-xl p-5 flex flex-col transition-colors`}>
                     <div className="flex items-start justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200 flex items-center justify-center p-2" dangerouslySetInnerHTML={{__html: blobatar(tool)}} />
                        {idx === 0 ? (
                           <div className="flex items-center gap-3 bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-full">
                             <span className="text-[10px] text-brand-primary font-mono uppercase tracking-widest">{orbState}</span>
                             {mounted && <ThinkingOrb state={orbState} size={20} theme="light" />}
                           </div>
                        ) : (
                           <div className="text-[10px] font-bold px-4 py-1.5 bg-neutral-200 rounded-full text-neutral-600 uppercase tracking-wide hover:bg-neutral-300 cursor-pointer transition-colors">Install</div>
                        )}
                     </div>
                     <div className="text-base text-neutral-900 font-semibold">{tool}</div>
                     <div className="text-xs text-neutral-500 mt-2 leading-relaxed">Connects to your core systems to synchronize data seamlessly across platforms.</div>
                  </div>
               ))}
            </div>

            {/* Fading bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
         </div>
       </div>
    </div>
  );
}
