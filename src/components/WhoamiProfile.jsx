import { useState } from 'react';

export default function WhoamiProfile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-green-500/50 hover:text-green-400 font-mono text-sm tracking-wider hover:bg-green-900/30 px-3 py-1 border border-transparent hover:border-green-500/50 transition-all cursor-pointer"
        >
          [ whoami ]
        </button>
      ) : (
        <div className="bg-black/95 border border-green-500 p-4 font-mono w-64 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <div className="flex justify-between items-start mb-4 border-b border-green-500/30 pb-2">
            <span className="text-green-400 font-bold uppercase tracking-wider">User_Dossier</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-red-500 hover:text-red-400 hover:bg-red-900/30 px-1 cursor-pointer transition-colors"
            >
              [X]
            </button>
          </div>
          
          <div className="text-green-500/80 text-sm space-y-3">
            <p><span className="text-green-400">ALIAS:</span> Tri Redo</p>
            <p><span className="text-green-400">ROLE:</span> Fullstack Dev</p>
            <p><span className="text-green-400">STATUS:</span> Active</p>
            
            <div className="pt-2">
              <a 
                href="https://github.com/triredev" 
                target="_blank" 
                rel="noreferrer" 
                className="block text-center border border-green-500/50 py-2 hover:bg-green-500 hover:text-black transition-colors font-bold tracking-widest cursor-pointer"
              >
                [ VIEW_GITHUB ]
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}