import { useState, useEffect } from 'react';
import TerminalLog from './TerminalLog';

export default function HackTimer() {

  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isActive, setIsActive] = useState(false);

 
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);


  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

 
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-8">
  
      <div className="text-8xl font-mono font-bold text-green-500 tracking-widest drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
        {minutes}:{seconds}
      </div>

      <div className="flex gap-6">
        <button
          onClick={toggleTimer}
          className="px-6 py-3 border-2 border-green-500 text-green-500 font-mono font-bold hover:bg-green-500 hover:text-slate-950 transition-colors cursor-pointer"
        >
          {isActive ? '[ PAUSE_ATTACK ]' : '[ EXECUTE_EXPLOIT ]'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-3 border-2 border-red-500 text-red-500 font-mono font-bold hover:bg-red-500 hover:text-slate-950 transition-colors cursor-pointer"
        >
          [ ABORT ]
        </button>
      </div>

        <TerminalLog isActive={isActive} />

    </div>
  );
}