import React, { useState } from 'react';
import { useQuantumWasm, QuantumCellResult } from '../hooks/useQuantumWasm';

interface CellData {
  raw_input: string;
  computed_value: string;
  quantum_metadata?: QuantumCellResult;
}

/**
 * High-performance spreadsheet grid system representing the visual interface of q-excel.
 * Dynamically binds user cell input with the underlying Rust/WebAssembly processing core.
 */
export const Spreadsheet: React.FC = () => {
  const { isLoaded, error, executeQuantumFormula } = useQuantumWasm();
  const [grid, setGrid] = useState<Record<string, CellData>>({});
  const [activeCell, setActiveCell] = useState<string | null>(null);

  // Setup sample 10x5 grid layout limits for the initial MVP footprint
  const rows = Array.from({ length: 10 }, (_, i) => i + 1);
  const cols = ['A', 'B', 'C', 'D', 'E'];

  const handleCellChange = (cellId: string, val: string) => {
    let computed = val;
    let metadata: QuantumCellResult | undefined;

    // Check if user is invoking an advanced industrial q-excel quantum operation
    if (val.startsWith('=')) {
      const isSuperposition = val.includes('SUPERPOSITION') || val.includes('VQE') || val.includes('QAOA');
      metadata = executeQuantumFormula(val, isSuperposition);
      
      if (metadata.status === 'SUCCESS') {
        computed = metadata.algorithm || 'Quantum Executed';
      } else {
        computed = metadata.error_message || '#REF!';
      }
    }

    setGrid((prev) => ({
      ...prev,
      [cellId]: { raw_input: val, computed_value: computed, quantum_metadata: metadata },
    }));
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100 font-sans">
      {/* Header Panel */}
      <div className="mb-6 flex justify-between items-center border-b border-slate-700 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-teal-400">q-excel</h1>
          <p className="text-xs text-slate-400 mt-1">High-Speed Quantum Spreadsheet Layer</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Core Runtime Status:</span>
          {isLoaded ? (
            <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs font-semibold rounded border border-teal-500/30">WASM ACTIVE</span>
          ) : error ? (
            <span className="px-2 py-1 bg-rose-500/20 text-rose-400 text-xs font-semibold rounded border border-rose-500/30">CORE ERROR</span>
          ) : (
            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-semibold rounded border border-amber-500/30">COMPILING...</span>
          )}
        </div>
      </div>

      {/* Spreadsheet Workspace Canvas */}
      <div className="overflow-x-auto rounded-lg border border-slate-700 shadow-2xl bg-slate-950">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-3 py-2 text-center text-xs font-medium text-slate-400 uppercase tracking-wider w-12 border-r border-slate-700">#</th>
              {cols.map((col) => (
                <th key={col} className="px-4 py-2 text-left text-xs font-medium text-slate-300 uppercase tracking-wider border-r border-slate-700">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-900/50">
            {rows.map((row) => (
              <tr key={row} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-3 py-2 text-center font-bold text-slate-500 border-r border-slate-700 bg-slate-800/20">{row}</td>
                {cols.map((col) => {
                  const cellId = `${col}${row}`;
                  const cell = grid[cellId] || { raw_input: '', computed_value: '' };
                  const isFocused = activeCell === cellId;

                  return (
                    <td key={cellId} className={`p-1 border-r border-slate-800 min-w-[150px] transition-all ${isFocused ? 'ring-2 ring-teal-500/70 bg-slate-800/60' : ''}`}>
                      <input
                        type="text"
                        className="w-full bg-transparent border-none text-slate-100 placeholder-slate-600 focus:outline-none px-2 py-1"
                        placeholder="--"
                        value={isFocused ? cell.raw_input : cell.computed_value}
                        onChange={(e) => handleCellChange(cellId, e.target.value)}
                        onFocus={() => setActiveCell(cellId)}
                        onBlur={() => setActiveCell(null)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sidebar Live Metrical Telemetry Inspection */}
      {activeCell && grid[activeCell]?.quantum_metadata && (
        <div className="mt-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700 animate-fadeIn">
          <h3 className="text-sm font-semibold text-teal-400 tracking-wide uppercase">Quantum Telemetry Inspection [{activeCell}]</h3>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="block text-slate-400">Algorithm Target</span>
              <span className="font-mono text-slate-200">{grid[activeCell].quantum_metadata?.algorithm}</span>
            </div>
            {grid[activeCell].quantum_metadata?.fidelity && (
              <div>
                <span className="block text-slate-400">Circuit Fidelity</span>
                <span className="font-mono text-emerald-400">{(grid[activeCell].quantum_metadata?.fidelity! * 100).toFixed(2)}%</span>
              </div>
            )}
            {grid[activeCell].quantum_metadata?.optimal_energy_state && (
              <div>
                <span className="block text-slate-400">VQE Energy Ground</span>
                <span className="font-mono text-cyan-400">{grid[activeCell].quantum_metadata?.optimal_energy_state}</span>
              </div>
            )}
            {grid[activeCell].quantum_metadata?.approximation_ratio && (
              <div>
                <span className="block text-slate-400">QAOA Optimal Ratio</span>
                <span className="font-mono text-amber-400">{grid[activeCell].quantum_metadata?.approximation_ratio}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
