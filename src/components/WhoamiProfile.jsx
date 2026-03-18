import { useState } from 'react';

export default function WhoamiProfile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 text-green-500/50 hover:text-green-400 font-mono text-sm transition-colors cursor-pointer"
      >
        &gt; whoami
      </button>

      
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-green-500/50 p-6 rounded max-w-md w-full font-mono text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
            
            <div className="flex justify-between items-center mb-4 border-b border-green-500/30 pb-2">
              <span className="font-bold text-xs md:text-sm">root@breachclock:~# cat cv.txt</span>
              <button onClick={() => setIsOpen(false)} className="text-red-500 hover:text-red-400 font-bold cursor-pointer">
                [X]
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <p><span className="text-white">NAME:</span> Tri Redo</p>
              <p><span className="text-white">ROLE:</span> Junior Pentester / Red Team</p>
              <p><span className="text-white">STATUS:</span> Buscando mi primer asalto profesional</p>
              <p><span className="text-white">SKILLS:</span> Python, React, Kali Linux, Nmap, Burp Suite</p>
              
              <p className="pt-4 text-green-500/70 text-xs">/// ENLACES_DE_EXTRACCIÓN</p>
              <div className="flex gap-4">
                <a href="https://github.com/triredev" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">GitHub</a>
                <a href="https://www.linkedin.com/in/patriciaredo" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">LinkedIn</a>
                <a href="https://tryhackme.com/p/Dark.Lullaby" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">TryHackMe</a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}