import React, { useState } from 'react';
import Head from 'next/head';
import { Spreadsheet } from '../components/Spreadsheet';
import { ProbChart } from '../components/QuantumVisuals/ProbChart';

/**
 * Enterprise workspace view bringing together the spreadsheet matrix and the WebGL telemetry monitor.
 * Orchestrates global viewport layout configurations for the q-excel client environment.
 */
export default function Home() {
  // Global viewport hook mocking active cell probability state stream vectors
  // Defaults to a neutral ground state vector before active user selection clicks
  const [selectedCellProbs, setSelectedCellProbs] = useState({ prob0: 0.5, prob1: 0.5 });
  const [activeInspectionCell, setActiveInspectionCell] = useState<string | null>("A1");

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col font-sans selection:bg-teal-500/30">
      <Head>
        <title>q-excel | Quantum-Accelerated Industrial Spreadsheet</title>
        <meta name="description" content="Next-generation reactive spreadsheet engine powered by Rust and WebAssembly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Top Banner Navigation Layer */}
      <nav className="bg-slate-900/60 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-gradient-to-tr from-teal-500 to-cyan-400 rounded-lg flex items-center justify-center font-black text-slate-950 text-sm shadow-lg shadow-teal-500/20">
            Q
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            q-excel <span className="text-teal-400 font-mono text-xs ml-1 px-1.5 py-0.5 bg-teal-950/40 rounded border border-teal-500/20">v0.1-beta</span>
          </span>
        </div>
        <div className="flex items-center space-x-4 text-xs text-slate-400">
          <span className="flex items-center"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>Local Simulator Engine Online</span>
        </div>
      </nav>

      {/* Main Core Responsive Dashboard Grid */}
      <main className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-4 gap-6 max-w-[1920px] mx-auto w-full">
        {/* Left Hand Workstation: The Reactive Spreadsheet Layer */}
        <section className="xl:col-span-3 flex flex-col bg-slate-900/30 rounded-2xl border border-slate-800/80 p-4 shadow-xl backdrop-blur-sm">
          <div className="mb-2 px-2 flex justify-between items-center">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-400">Quantum Analytical Grid</h2>
          </div>
          <div className="flex-1">
            <Spreadsheet />
          </div>
        </section>

        {/* Right Hand Control Deck: Real-time Telemetry Monitor Panels */}
        <section className="flex flex-col space-y-6 xl:col-span-1">
          {/* WebGL Spectrum Module */}
          <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-5 shadow-xl backdrop-blur-sm flex flex-col">
            <div className="mb-4">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-300">Live Telemetry Canvas</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">Real-time state vector distribution analytics</p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <ProbChart prob0={selectedCellProbs.prob0} prob1={selectedCellProbs.prob1} />
            </div>
          </div>

          {/* Quick-Action Reference Help Deck */}
          <div className="bg-slate-900/40 rounded-2xl border border-slate-800/80 p-5 shadow-xl backdrop-blur-sm">
            <h3 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-3">Supported Formula Matrix</h3>
            <ul className="space-y-2.5 text-[11px] font-mono text-slate-400">
              <li className="flex flex-col bg-slate-950/40 p-2 rounded border border-slate-800/60">
                <span className="text-slate-200 font-bold">=VQE_OPTIMIZE(range, mode)</span>
                <span className="text-slate-500 text-[10px] mt-0.5">Executes Portfolio Risk/Allocation Analysis</span>
              </li>
              <li className="flex flex-col bg-slate-950/40 p-2 rounded border border-slate-800/60">
                <span className="text-slate-200 font-bold">=QAOA_SOLVE(range)</span>
                <span className="text-slate-500 text-[10px] mt-0.5">Processes Combinatorial Logistics Routing</span>
              </li>
              <li className="flex flex-col bg-slate-950/40 p-2 rounded border border-slate-800/60">
                <span className="text-slate-200 font-bold">=GROVER_SEARCH(range, cell)</span>
                <span className="text-slate-500 text-[10px] mt-0.5">Accelerated Quantum Database Querying</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
