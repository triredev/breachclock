import { useState, useEffect } from 'react';
import TerminalLog from './TerminalLog';

export default function HackTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isActive, setIsActive] = useState(false);
  const [hasAborted, setHasAborted] = useState(false);
  const [phase, setPhase] = useState("FOCUS");

  let currentStatus = "INITIAL";
  if (isActive) {
    currentStatus = "RUNNING";
  } else if (timeLeft < 25 * 60 && timeLeft > 0) {
    currentStatus = "PAUSED";
  } else if (hasAborted) {
    currentStatus = "ABORTED";
  }

  const isAbortDisabled = currentStatus === "INITIAL" || currentStatus === "ABORTED";

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

  const toggleTimer = () => {
    setIsActive(!isActive);
    setHasAborted(false);
  };
  
  const resetTimer = () => {
    if (isAbortDisabled) return;
    setIsActive(false);
    setTimeLeft(25 * 60);
    setHasAborted(true);
  };

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-8">
      
     <h1 
        className={`text-green-400 font-bold text-xl font-mono -mb-2 animate-pulse text-center tracking-wider drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] uppercase ${
          currentStatus === "RUNNING" || currentStatus === "PAUSED" ? 'visible' : 'invisible'
        }`}
      >
        &gt; CURRENT_PHASE: {currentStatus == "PAUSED" ? "PAUSED" : phase}
      </h1>

      <div className="text-8xl font-mono font-bold text-green-500 tracking-widest drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
        {minutes}:{seconds}
      </div>

      <div className="flex gap-6">
        <button
          onClick={toggleTimer}
          className="px-6 py-3 border-2 border-green-500 text-green-500 font-mono font-bold hover:bg-green-500 hover:text-slate-950 transition-colors cursor-pointer"
        >
          {currentStatus === "RUNNING" 
            ? '[ PAUSE_BREACH ]' 
            : currentStatus === "PAUSED" 
              ? '[ RESUME_BREACH ]' 
              : '[ START_BREACH ]'}
        </button>
        
        <button
          onClick={resetTimer}
          disabled={isAbortDisabled}
          className={`px-6 py-3 border-2 font-mono font-bold transition-colors ${
            isAbortDisabled 
              ? 'border-red-900/50 text-red-900/50 cursor-not-allowed opacity-50' 
              : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-slate-950 cursor-pointer'
          }`}
        >
          [ ABORT ]
        </button>
      </div>

      <TerminalLog status={currentStatus} />
    </div>
  );
}