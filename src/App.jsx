import { useState, useEffect, useRef } from 'react'
import HackTimer from './components/HackTimer'
import WhoamiProfile from './components/WhoamiProfile'
import SettingsPanel from './components/SettingsPanel';

function App() {
  const vantaRef = useRef(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const vantaEffectRef = useRef(null); 

  useEffect(() => {
    
    if (!vantaEffectRef.current && vantaRef.current && window.VANTA.FOG) {
      vantaEffectRef.current = window.VANTA.FOG({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: 0x004411,
        midtoneColor: 0x002200,
        lowlightColor: 0x000000,
        baseColor: 0x000000,
        blurFactor: 0.60,
        speed: 0.80,
        zoom: 1.00
      });
    }

    
    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  return (
   
    <div ref={vantaRef} className="min-h-screen flex items-center justify-center p-4 w-full h-full relative overflow-hidden">
      
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-[800px] h-[650px] max-w-full max-h-full bg-black/80 border border-green-500/30 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-sm p-8">

        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="absolute top-4 right-4 text-green-500/50 hover:text-green-400 font-mono text-sm tracking-wider hover:bg-green-900/30 px-3 py-1 border border-transparent hover:border-green-500/50 transition-all cursor-pointer z-20"
        >
          [ config ]
        </button>

        <HackTimer />

        <WhoamiProfile />

        <SettingsPanel 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />

      </div>
    </div>
  )
}

export default App