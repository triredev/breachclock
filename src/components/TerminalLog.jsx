import { useState, useEffect, useRef } from 'react';

const FAKE_LOGS = [
  "Initiating port scan (Nmap SYN Stealth)...",
  "Discovered port 80/tcp (Apache httpd 2.4.41)...",
  "Analyzing HTTP headers for vulnerable versions...",
  "LFI (Local File Inclusion) vulnerability detected...",
  "Extracting local users by reading /etc/passwd...",
  "Injecting payload for Remote Code Execution (RCE)...",
  "Establishing reverse shell connection on port 4444...",
  "Stabilizing interactive shell with Python (pty.spawn)...",
  "Downloading and executing enumeration script (LinPEAS.sh)...",
  "Searching for misconfigured SUID/SGID binaries...",
  "Checking current privileges with 'sudo -l'...",
  "Plaintext password detected in .config file...",
  "Reviewing scheduled tasks (cronjobs) executed by root...",
  "Identified vulnerable user group (Docker/LXD)...",
  "Compiling exploit for Kernel vulnerability (PwnKit)...",
  "SUCCESS! Escalating privileges to root user...",
  "Stealing administrator's SSH private keys (id_rsa)...",
  "Adding attacker public key to /root/.ssh/authorized_keys...",
  "Establishing persistence by creating hidden systemd service...",
  "Clearing access logs in /var/log/auth.log...",
  "Unsetting environment variables and history (unset HISTFILE)...",
  "Cleaning up final evidence in ~/.bash_history..."
];

export default function TerminalLog({ status }) {
  const [logs, setLogs] = useState(["[!] CONNECTION PAUSED. AWAITING COMMANDS..."]);
  const terminalRef = useRef(null);

  const scrollUp = () => {
    if (terminalRef.current) terminalRef.current.scrollBy({ top: -40, behavior: 'smooth' });
  };

  const scrollDown = () => {
    if (terminalRef.current) terminalRef.current.scrollBy({ top: 40, behavior: 'smooth' });
  };

  useEffect(() => {
    if (terminalRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = terminalRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      
      if (isAtBottom) {
        terminalRef.current.scrollTop = scrollHeight;
      }
    }
  }, [logs]);

  useEffect(() => {
    // 1. Si se Aborta (IDLE): Limpiamos la pantalla y reseteamos
    if (status === "INITIAL") {
      setLogs(["[!] SYSTEM READY. AWAITING COMMANDS..."]);
      return;
    }

    // 2. Si el usuario interviene y pulsa ABORT
    if (status === "ABORTED") {
      setLogs([
        "[!] SEQUENCE ABORTED.", 
        "[!] CONNECTIONS CLOSED.", 
        "[!] SYSTEM READY. AWAITING COMMANDS..."
      ]);
      return;
    }

    // 2. Si se Pausa: Añadimos un mensaje de advertencia pero conservamos el historial
    if (status === "PAUSED") {
      setLogs(prev => [...prev.slice(-50), "[!] WARNING: ATTACK PAUSED BY USER."]);
      return;
    }

    // 3. Si está RUNNING: Arrancamos el motor de los logs
    let progress = 0;
    let isProgressing = false;
    let currentAction = "";
    let tickCount = 0;

    const interval = setInterval(() => {
      if (isProgressing) {
        progress += Math.floor(Math.random() * 6) + 2; 
        if (progress >= 100) {
          setLogs(prev => {
            const copy = [...prev];
            copy[copy.length - 1] = `[+] ${currentAction} [====================] 100% COMPLETED`;
            return copy;
          });
          isProgressing = false;
          tickCount = 0;
        } else {
          const bars = Math.floor(progress / 5);
          const barString = "=".repeat(bars) + "-".repeat(20 - bars);
          setLogs(prev => {
            const copy = [...prev];
            if (copy.length === 0) return [`[*] ${currentAction} [${barString}] ${progress}%`];
            copy[copy.length - 1] = `[*] ${currentAction} [${barString}] ${progress}%`;
            return copy;
          });
        }
      } else {
        tickCount++;
        if (tickCount >= 10) {
          tickCount = 0;
          if (Math.random() > 0.7) {
            const actions = ["Directory Fuzzing", "Cracking local hashes", "SSH Brute Force", "Exfiltrating database"];
            currentAction = actions[Math.floor(Math.random() * actions.length)];
            progress = 0;
            isProgressing = true;
            setLogs(prev => [...prev.slice(-50), `[*] ${currentAction} [--------------------] 0%`]);
          } else {
            const randomLog = FAKE_LOGS[Math.floor(Math.random() * FAKE_LOGS.length)];
            const timeStamp = new Date().toLocaleTimeString();
            setLogs((prev) => [...prev.slice(-50), `[${timeStamp}] ${randomLog}`]);
          }
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, [status]); // <-- Ahora vigila los cambios de 'status'

  return (
    
    <div className="relative w-[500px] max-w-[90vw] h-[130px] mt-10 bg-black border border-green-500/30 rounded font-mono text-xs text-green-400/70 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] flex">
      
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 pr-12 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="min-h-full flex flex-col justify-end">
          {logs.map((log, i) => (
            <div key={i} className="mb-1 opacity-80 animate-pulse break-words">
              {log}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-8 bg-black border-l border-green-500/30 flex flex-col justify-between items-center py-2 z-10">
        <button 
          onClick={scrollUp} 
          className="text-green-500/50 hover:text-green-400 hover:bg-green-900/40 w-full flex justify-center py-1 transition-colors cursor-pointer select-none"
          title="Scroll Arriba"
        >
          ▲
        </button>
        <button 
          onClick={scrollDown} 
          className="text-green-500/50 hover:text-green-400 hover:bg-green-900/40 w-full flex justify-center py-1 transition-colors cursor-pointer select-none"
          title="Scroll Abajo"
        >
          ▼
        </button>
      </div>

    </div>
  );
}