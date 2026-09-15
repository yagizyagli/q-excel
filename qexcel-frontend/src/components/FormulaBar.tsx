import React from 'react';

interface FormulaBarProps {
  activeCellId: string | null;
  rawValue: string;
  onChange: (val: string) => void;
}

/**
 * Enterprise-grade Formula Bar component sitting at the top of the q-excel grid workstation.
 * Provides a dedicated input ecosystem for complex multi-variable quantum script formula entries.
 */
export const FormulaBar: React.FC<FormulaBarProps> = ({
  activeCellId,
  rawValue,
  onChange,
}) => {
  const isQuantumSyntax = rawValue.startsWith('=') && 
    ['VQE', 'QAOA', 'GROVER', 'SHOR', 'QUANTUM'].some(keyword => rawValue.toUpperCase().includes(keyword));

  return (
    <div className="flex items-center space-x-2 bg-slate-900/80 border border-slate-800 rounded-xl p-2 mb-4 backdrop-blur-sm shadow-md">
      {/* Current Address Indicator */}
      <div className="flex items-center justify-center bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-xs font-mono font-bold text-teal-400 min-w-[50px] text-center shadow-inner select-none">
        {activeCellId || '--'}
      </div>

      {/* FX Divider Token */}
      <div className="text-slate-600 font-serif italic text-sm px-1 select-none font-bold">
        fx
      </div>

      {/* Main Streamlined Formula Input Buffer */}
      <div className="flex-1 relative">
        <input
          type="text"
          className={`w-full bg-slate-950 border rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none transition-all ${
            isQuantumSyntax 
              ? 'border-teal-500/50 focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 text-teal-300' 
              : 'border-slate-800 focus:border-slate-700 text-slate-200'
          }`}
          placeholder={activeCellId ? `Enter values or quantum formulas for ${activeCellId}...` : "Select a cell to begin processing formulas"}
          disabled={!activeCellId}
          value={rawValue}
          onChange={(e) => onChange(e.target.value)}
        />
        
        {/* Real-time Quantum Input Validation Sparkle */}
        {isQuantumSyntax && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-sans font-bold text-teal-400/80 bg-teal-950/60 border border-teal-500/20 px-1.5 py-0.5 rounded tracking-wider select-none animate-pulse">
            Q-SYNTAX
          </div>
        )}
      </div>
    </div>
  );
};
