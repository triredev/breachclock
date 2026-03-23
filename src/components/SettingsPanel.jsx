export default function SettingsPanel({ isOpen, onClose }) {
  
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="border border-green-500 bg-black p-6 w-96 shadow-[0_0_30px_rgba(34,197,94,0.2)] font-mono">
        
        <div className="flex justify-between items-center border-b border-green-500/30 pb-3 mb-6">
          <h2 className="text-green-400 font-bold tracking-widest uppercase">&gt; SYSTEM_CONFIG</h2>
          <button 
            onClick={onClose} 
            className="text-red-500 hover:text-red-400 hover:bg-red-900/30 px-2 transition-colors cursor-pointer"
          >
            [X]
          </button>
        </div>

        <div className="text-green-500 space-y-6">
          <p className="text-sm opacity-70 animate-pulse">Cargando módulos de configuración...</p>
        </div>

      </div>
    </div>
  );
}