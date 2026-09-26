'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Hexagon, Cpu, Zap, Fingerprint, Layers, Activity, GitCommit, LineChart, ArrowRightLeft, Radio, EyeOff, BrainCircuit } from 'lucide-react';
import { useCryptoStream } from './hooks/useCryptoStream';

const EngineView = dynamic(() => import('./components/EngineView'), { ssr: false });

export default function Home() {
  const { price, volatility } = useCryptoStream();

  // --- STATE FOR ADVANCED WIDGETS ---
  // 1. ZK-Proof Simulator State
  const [zkStatus, setZkStatus] = useState<'idle' | 'proving' | 'verified'>('idle');
  const [zkLogs, setZkLogs] = useState<string[]>([]);

  // 2. Restaking Yield Calculator State
  const [stakedEth, setStakedEth] = useState<number>(32);
  const baseYield = 3.8; // ETH Native Staking
  const restakingYield = 4.2; // EigenLayer AVS
  const totalApy = baseYield + restakingYield;

  // 3. Intent-Based Swap State
  const [swapState, setSwapState] = useState<'idle' | 'routing' | 'found'>('idle');

  // --- CROSS-CHAIN GAS TICKER ---
  const gasChains = [
    { name: 'ETHEREUM', gwei: '24', color: 'text-blue-400' },
    { name: 'ARBITRUM', gwei: '0.1', color: 'text-cyan-400' },
    { name: 'OPTIMISM', gwei: '0.05', color: 'text-rose-400' },
    { name: 'BASE', gwei: '0.02', color: 'text-blue-500' },
    { name: 'POLYGON_ZKEVM', gwei: '1.2', color: 'text-purple-400' },
  ];

  // --- ZK-PROOF SIMULATOR LOGIC ---
  const triggerZkProof = () => {
    setZkStatus('proving');
    setZkLogs(['INITIALIZING CIRCOM CIRCUIT...', 'LOADING SNARKJS WASM...']);

    setTimeout(() => setZkLogs(p => [...p, 'GENERATING WITNESS [AGE > 18]...']), 800);
    setTimeout(() => setZkLogs(p => [...p, 'COMPUTING GROTH16 PROOF...']), 1600);
    setTimeout(() => setZkLogs(p => [...p, 'VERIFYING ON-CHAIN...']), 2500);
    setTimeout(() => {
      setZkLogs(p => [...p, 'ZK_PROOF VERIFIED. DATA OBFUSCATED.']);
      setZkStatus('verified');
    }, 3200);
  };

  // --- INTENT SWAP ROUTING LOGIC ---
  const triggerSwapRoute = () => {
    setSwapState('routing');
    setTimeout(() => setSwapState('found'), 2000);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#030508] text-white overflow-hidden font-mono select-none">

      {/* CRT SCANLINE OVERLAY */}
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-30 mix-blend-overlay shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />

      {/* 3D ENGINE PIPELINE */}
      <EngineView marketVolatility={volatility} />

      <div className="relative z-10 w-full h-screen p-4 flex flex-col justify-between pointer-events-none">

        {/* === LIVE GAS MEMPOOL TRACKER BAR === */}
        <header className="w-full pointer-events-auto border-b border-cyan-900/40 pb-2 bg-black/40 backdrop-blur-md overflow-hidden">
          <div className="flex items-center gap-2 text-[9px] tracking-widest px-4 border-b border-cyan-900/40 pb-2 mb-2">
            <Hexagon className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span className="text-cyan-500 font-bold">LUBHANSHU // OMNI-CHAIN TERMINAL v5.0</span>
            <span className="ml-auto text-neutral-500">AUTH: 25BCS10043</span>
          </div>
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] gap-12 text-[10px] tracking-[0.2em] uppercase font-bold">
            {[...gasChains, ...gasChains].map((chain, i) => (
              <div key={i} className="flex items-center gap-2">
                <Zap className={`w-3 h-3 ${chain.color}`} />
                <span className="text-neutral-500">{chain.name} GAS:</span>
                <span className={chain.color}>{chain.gwei} GWEI</span>
              </div>
            ))}
          </div>
        </header>

        {/* === MAIN DASHBOARD GRID === */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center py-4 px-2">

          {/* LEFT COLUMN */}
          <div className="hidden lg:flex flex-col gap-4 col-span-3 pointer-events-auto h-full justify-center">

            {/* FEATURE 2: ZK-PROOF IDENTITY MATRIX */}
            <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4">
              <div className="text-[9px] tracking-[0.3em] text-cyan-600 mb-4 flex items-center gap-2 border-b border-cyan-900/30 pb-2">
                <Fingerprint className="w-3 h-3 text-cyan-400" /> ZERO-KNOWLEDGE IDENTITY
              </div>
              <div className="text-[10px] text-neutral-400 mb-4 leading-relaxed">
                Prove attribute <span className="text-white">"AGE {'>'} 18"</span> to smart contract without revealing actual birthdate or wallet balance.
              </div>

              <div className="h-24 bg-cyan-950/20 border border-cyan-900/30 p-2 mb-4 font-mono text-[8px] text-cyan-500/80 overflow-hidden flex flex-col justify-end">
                {zkLogs.map((log, i) => (
                  <div key={i} className={log.includes('VERIFIED') ? 'text-emerald-400 font-bold' : ''}>{'>'} {log}</div>
                ))}
              </div>

              <button
                onClick={triggerZkProof}
                disabled={zkStatus !== 'idle'}
                className={`w-full py-2 text-[10px] tracking-widest font-bold border transition-all ${zkStatus === 'verified'
                  ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400'
                  : 'border-cyan-500/30 bg-cyan-950/30 hover:bg-cyan-900/50 text-cyan-400'
                  }`}
              >
                {zkStatus === 'idle' ? '[ GENERATE ZK-SNARK PROOF ]' : zkStatus === 'proving' ? '[ COMPUTING CIRCUIT... ]' : '[ PROOF VALIDATED ]'}
              </button>
            </div>

            {/* FEATURE 3: PREDICTION MARKET WIDGET */}
            <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4">
              <div className="text-[9px] tracking-[0.3em] text-cyan-600 mb-4 flex items-center gap-2 border-b border-cyan-900/30 pb-2">
                <LineChart className="w-3 h-3 text-cyan-400" /> CONSENSUS PREDICTION
              </div>
              <div className="text-[10px] text-white font-bold tracking-wide mb-3">
                WILL BTC HIT $100K BEFORE EPOCH 2026?
              </div>
              <div className="relative h-6 w-full bg-rose-950/30 border border-rose-900/30 flex items-center overflow-hidden mb-2">
                <div className="absolute left-0 h-full bg-emerald-600/50 border-r border-emerald-400" style={{ width: '68%' }} />
                <div className="absolute left-2 text-[10px] text-emerald-400 font-bold z-10">YES (68%)</div>
                <div className="absolute right-2 text-[10px] text-rose-400 font-bold z-10">NO (32%)</div>
              </div>
              <div className="flex justify-between text-[8px] text-neutral-500 uppercase">
                <span>Vol: $1.2M</span>
                <span>Oracle: Chainlink</span>
              </div>
            </div>

          </div>

          {/* CENTER COLUMN: CORE ORACLE & INTENT SWAP */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-center items-center relative pointer-events-none">

            <h1 className="text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-4 leading-none mix-blend-screen text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">
              ${price.split('.')[0]}<span className="text-4xl text-cyan-500">.{price.split('.')[1]}</span>
            </h1>

            {/* FEATURE 4: CROSS-CHAIN INTENT BASED SWAP */}
            <div className="w-full max-w-md border border-cyan-900/50 bg-black/70 backdrop-blur-xl p-6 pointer-events-auto shadow-[0_0_50px_rgba(6,182,212,0.1)] mt-8">
              <div className="text-[10px] tracking-[0.3em] text-cyan-500 flex items-center justify-center gap-2 mb-6">
                <ArrowRightLeft className="w-4 h-4" /> INTENT-BASED ROUTER
              </div>

              <div className="flex flex-col gap-4">
                <div className="bg-black/50 border border-white/5 p-3 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-neutral-500">PAY (ARBITRUM)</span>
                    <span className="text-lg text-white font-bold">1,000 USDC</span>
                  </div>
                </div>

                <div className="bg-black/50 border border-white/5 p-3 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-neutral-500">RECEIVE (OPTIMISM)</span>
                    <span className="text-lg text-emerald-400 font-bold">~0.162 ETH</span>
                  </div>
                </div>
              </div>

              {swapState === 'found' && (
                <div className="mt-4 p-3 bg-cyan-950/20 border border-cyan-500/20 text-[8px] tracking-widest text-cyan-400 flex flex-col gap-2">
                  <div className="text-white">OPTIMAL ROUTE FOUND:</div>
                  <div className="flex items-center gap-2">
                    USDC <GitCommit className="w-3 h-3 text-neutral-600" /> STARGATE <GitCommit className="w-3 h-3 text-neutral-600" /> WETH <GitCommit className="w-3 h-3 text-neutral-600" /> UNISWAP V3 <GitCommit className="w-3 h-3 text-neutral-600" /> ETH
                  </div>
                  <div className="text-emerald-500 mt-1">EST. EXECUTION: 1.2s // NO BRIDGING REQUIRED</div>
                </div>
              )}

              <button
                onClick={triggerSwapRoute}
                className="w-full mt-6 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 py-3 text-[10px] tracking-[0.2em] text-cyan-300 font-bold transition-all"
              >
                {swapState === 'idle' ? '[ FIND BEST EXECUTION ROUTE ]' : swapState === 'routing' ? 'CALCULATING PATH...' : '[ EXECUTE INTENT ]'}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="hidden lg:flex flex-col gap-3 col-span-3 pointer-events-auto h-full justify-center">

            {/* FEATURE 5: LIQUID RESTAKING CALCULATOR */}
            <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4">
              <div className="text-[9px] tracking-[0.3em] text-cyan-600 mb-4 flex items-center gap-2 border-b border-cyan-900/30 pb-2">
                <Layers className="w-3 h-3 text-cyan-400" /> AVS RESTAKING YIELD
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-[10px] text-neutral-400 mb-2">
                  <span>INPUT DEPOSIT (ETH)</span>
                  <span className="text-cyan-400 font-bold">{stakedEth} ETH</span>
                </div>
                <input
                  type="range"
                  min="1" max="100"
                  value={stakedEth}
                  onChange={(e) => setStakedEth(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-2 border-l border-cyan-900/50 pl-3">
                <div className="flex justify-between items-center text-[9px] tracking-wider">
                  <span className="text-neutral-500">L1 STAKING (Lido)</span>
                  <span className="text-white">+{baseYield}% APY</span>
                </div>
                <div className="flex justify-between items-center text-[9px] tracking-wider">
                  <span className="text-neutral-500">RESTAKING (EigenLayer)</span>
                  <span className="text-purple-400">+{restakingYield}% APY</span>
                </div>
                <div className="w-full h-[1px] bg-white/10 my-1" />
                <div className="flex justify-between items-center text-[10px] tracking-wider font-bold">
                  <span className="text-cyan-500">1YR COMPOUNDED</span>
                  <span className="text-emerald-400">~{(stakedEth * Math.pow(1 + totalApy / 100, 1)).toFixed(2)} ETH</span>
                </div>
              </div>
            </div>

            {/* VOLATILITY METRICS */}
            <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-3">
              <div className="text-[9px] tracking-[0.3em] text-cyan-600 mb-2 flex items-center gap-2 border-b border-cyan-900/30 pb-2">
                <Activity className="w-3 h-3 text-cyan-400" /> KINETIC NETWORK STATUS
              </div>
              <div className="flex flex-col gap-1 text-[10px] tracking-wider">
                <div className="flex justify-between">
                  <span className="text-neutral-500">MARKET VOLATILITY</span>
                  <span className="text-cyan-400 font-bold">{(volatility * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">3D ENGINE STATUS</span>
                  <span className="text-emerald-500">RENDERING BLOCKS</span>
                </div>
              </div>
            </div>

            {/* === NEW ADDITION: BOTTOM RIGHT FRONTIER COGNITION CORE === */}
            <div className="border border-cyan-900/40 bg-black/70 backdrop-blur-md p-3 max-h-[210px] overflow-y-auto scrollbar-none border-t-2 border-t-cyan-500/50">
              <div className="text-[9px] tracking-[0.3em] text-cyan-400 mb-2.5 flex items-center gap-2 border-b border-cyan-900/30 pb-1.5 font-bold">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" /> FRONTIER_INFRA_LOGS // 2026
              </div>
              <div className="space-y-3 font-mono text-[9px] leading-relaxed text-neutral-400">
                <div className="border-l border-cyan-500/30 pl-2">
                  <div className="text-white font-bold uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-cyan-400" /> Real-Time ZK Proving
                  </div>
                  <p className="text-neutral-500 mt-0.5">
                    zkVM architectures (SP1 Hypercube) proving complete blocks client-side under 11s. Memory structures compressed below 2GB for native hardware deployment.
                  </p>
                </div>
                <div className="border-l border-purple-500/30 pl-2">
                  <div className="text-white font-bold uppercase tracking-wider flex items-center gap-1">
                    <BrainCircuit className="w-2.5 h-2.5 text-purple-400" /> Agentic Payments (x402/AP2)
                  </div>
                  <p className="text-neutral-500 mt-0.5">
                    AI-to-AI resource settlement loops using native HTTP 402 micro-billing frameworks. Authorization verified securely via cryptographic spend signatures.
                  </p>
                </div>
                <div className="border-l border-amber-500/30 pl-2">
                  <div className="text-white font-bold uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-2.5 h-2.5 text-amber-400" /> Verifiable Clouds
                  </div>
                  <p className="text-neutral-500 mt-0.5">
                    EigenLayer infrastructure scaling past simple staking parameters into open, decentralized trust grids verifying complex off-chain machine learning inferences.
                  </p>
                </div>
                <div className="border-l border-emerald-500/30 pl-2">
                  <div className="text-white font-bold uppercase tracking-wider flex items-center gap-1">
                    <EyeOff className="w-2.5 h-2.5 text-emerald-400" /> Confidential FHE Networks
                  </div>
                  <p className="text-neutral-500 mt-0.5">
                    ERC-7984 standards executing fully homomorphic mathematical algorithms on encrypted values without uncovering base variables to node entities.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Tailwind config extension for the marquee animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-\\[marquee_20s_linear_infinite\\] {
          animation: marquee 20s linear infinite;
        }
        /* Custom scrollbar hidden class for cleaner data feeds */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </main>
  );
}