import React from 'react';
import { QuantumCellResult } from '../hooks/useQuantumWasm';

interface CellProps {
  cellId: string;
  rawValue: string;
  computedValue: string;
  isFocused: boolean;
  quantumMetadata?: QuantumCellResult;
  onChange: (val: string) => void;
  onFocus: () => void;
  onBlur: () => void;
}

/**
 * Intelligent Quantum Cell (Q-Cell) component responsible for styling states dynamically.
 * Injects custom neon borders, wave fluctuations, and sub-state overlays when quantum computations are present.
 */
export const Cell: React.FC<CellProps> = ({
  cellId,
  rawValue,
  computedValue,
  isFocused,
  quantumMetadata,
  onChange,
  onFocus,
  onBlur,
}) => {
  const isQuantumActive = quantumMetadata && quantumMetadata.status === 'SUCCESS';
  
  // Dynamic layout color matrix mapping based on underlying quantum telemetry signature
  let borderStyle = 'border-slate-800 focus-within:ring-2 focus-within:ring-teal-500/70';
  let backgroundStyle = 'bg-transparent';
  let indicatorColor = 'bg-slate-700';

  if (isQuantumActive) {
    indicatorColor = 'bg-teal-400 animate-pulse';
    if (quantumMetadata?.algorithm?.includes('VQE')) {
      borderStyle = 'border-cyan-600/50 focus-within:ring-2 focus-within:ring-cyan-400/80';
      backgroundStyle = 'bg-cyan-950/20';
    } else if (quantumMetadata?.algorithm?.includes('QAOA')) {
      borderStyle = 'border-amber-600/50 focus-within:ring-2 focus-within:ring-amber-400/80';
      backgroundStyle = 'bg-amber-950/20';
    } else {
      borderStyle = 'border-teal-600/60 focus-within:ring-2 focus-within:ring-teal-400/80';
      backgroundStyle = 'bg-teal-950/25';
    }
  }

  return (
    <div className={`p-1 border-r min-w-[160px] transition-all relative group ${borderStyle} ${backgroundStyle} ${isFocused ? 'bg-slate-800/60' : ''}`}>
      {/* Small Quantum Indicator Core Badge */}
      <div className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${indicatorColor} z-10 transition-colors`} title={quantumMetadata?.algorithm || 'Classical Cell'} />
      
      <input
        type="text"
        className="w-full bg-transparent border-none text-slate-100 placeholder-slate-700 focus:outline-none px-2 py-1 font-mono text-xs z-0"
        placeholder="--"
        value={isFocused ? rawValue : computedValue}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {/* Dynamic Quantum Amplitude Overlay on Hover */}
      {isQuantumActive && !isFocused && (
        <div className="absolute inset-0 bg-slate-900/90 hidden group-hover:flex items-center justify-between px-3 text-[10px] text-slate-400 font-mono animate-fadeIn z-20 pointer-events-none">
          <span className="text-teal-400">|0⟩:{(quantumMetadata.probability_amplitude ? (quantumMetadata.probability_amplitude * 100).toFixed(0) : '50')}%</span>
          <span className="text-cyan-400">|1⟩:{(quantumMetadata.probability_amplitude ? ((1 - quantumMetadata.probability_amplitude) * 100).toFixed(0) : '50')}%</span>
        </div>
      )}
    </div>
  );
};
