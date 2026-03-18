import { useState, useEffect } from 'react';

const FAKE_LOGS = [
  "Iniciando escaneo de puertos (Nmap SYN Stealth)...",
  "Descubierto puerto 80/tcp (Apache httpd 2.4.41)...",
  "Analizando cabeceras HTTP en busca de versiones vulnerables...",
  "Detectada vulnerabilidad LFI (Local File Inclusion)...",
  "Extrayendo usuarios locales leyendo /etc/passwd...",
  "Inyectando payload para ejecución remota de comandos (RCE)...",
  "Estableciendo conexión inversa (Reverse Shell) en puerto 4444...",
  "Estabilizando la shell interactiva con Python (pty.spawn)...",
  "Descargando y ejecutando script de enumeración (LinPEAS.sh)...",
  "Buscando binarios con permisos SUID/SGID mal configurados...",
  "Comprobando privilegios actuales con 'sudo -l'...",
  "Detectada contraseña en texto plano en archivo .config...",
  "Revisando tareas programadas (cronjobs) ejecutadas por root...",
  "Identificado grupo de usuario vulnerable (Docker/LXD)...",
  "Compilando exploit para vulnerabilidad del Kernel (PwnKit)...",
  "¡ÉXITO! Escalando privilegios a usuario root...",
  "Robando claves privadas SSH (id_rsa) del administrador...",
  "Añadiendo clave pública atacante a /root/.ssh/authorized_keys...",
  "Estableciendo persistencia creando un servicio oculto en systemd...",
  "Borrando registros de acceso en /var/log/auth.log...",
  "Vaciando variables de entorno e historial (unset HISTFILE)...",
  "Limpiando evidencias finales en ~/.bash_history..."
];

export default function TerminalLog({ isActive }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!isActive) {
      setLogs(["[!] CONEXIÓN EN PAUSA. ESPERANDO ÓRDENES..."]);
      return;
    }

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
            copy[copy.length - 1] = `[+] ${currentAction} [====================] 100% COMPLETADO`;
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
            const actions = ["Fuzzing de directorios", "Crackeando hashes locales", "Fuerza bruta SSH", "Exfiltrando base de datos"];
            currentAction = actions[Math.floor(Math.random() * actions.length)];
            progress = 0;
            isProgressing = true;
            setLogs(prev => [...prev.slice(-4), `[*] ${currentAction} [--------------------] 0%`]);
          } else {
            const randomLog = FAKE_LOGS[Math.floor(Math.random() * FAKE_LOGS.length)];
            const timeStamp = new Date().toLocaleTimeString();
            setLogs((prev) => [...prev.slice(-4), `[${timeStamp}] ${randomLog}`]);
          }
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="w-[500px] max-w-[90vw] h-[130px] mt-10 bg-black/50 border border-green-500/30 rounded p-4 font-mono text-xs text-green-400/70 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] flex flex-col justify-end text-left">
      {logs.map((log, i) => (
        <div key={i} className="mb-1 opacity-80 animate-pulse break-words">
          {log}
        </div>
      ))}
    </div>
  );
}