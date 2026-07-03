'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Fingerprint, Zap, ShieldCheck, Key, Droplets,
    Activity, ShieldAlert, Cpu, Radar, BrainCircuit,
    LockKeyhole, ChevronLeft, Link2, Route, Scale,
    ServerCrash, Database, Share2, EyeOff, Bot, Network
} from 'lucide-react';
import { useCryptoStream } from '../hooks/useCryptoStream';

const EngineView = dynamic(() => import('../components/EngineView'), { ssr: false });

export default function InfrastructureCore() {
    const { volatility } = useCryptoStream();

    // === PREVIOUS FEATURE STATES ===
    const [authState, setAuthState] = useState<'locked' | 'scanning' | 'verified'>('locked');
    const [pqEnabled, setPqEnabled] = useState(false);
    const [sessionActive, setSessionActive] = useState(false);
    const [mevProtected, setMevProtected] = useState(true);
    const [moneyStream, setMoneyStream] = useState(1402.5501);
    const [whaleAlerts, setWhaleAlerts] = useState<{ id: number; asset: string; amt: string; type: string }[]>([]);
    const [zkTlsStatus, setZkTlsStatus] = useState<'idle' | 'proving' | 'verified'>('idle');
    const [relayStep, setRelayStep] = useState(0);
    const [govTokens, setGovTokens] = useState(1000);

    // === NEW ULTRA-ADVANCED STATES ===
    const [x402Step, setX402Step] = useState(0);
    const [fheHash, setFheHash] = useState('0x...');
    const [preConfMs, setPreConfMs] = useState(0);

    // Simulation Loops
    useEffect(() => {
        const streamInterval = setInterval(() => setMoneyStream(prev => prev + 0.0015), 50);

        const whaleInterval = setInterval(() => {
            const assets = ['BTC', 'ETH', 'USDC', 'PEPE', 'SOL'];
            const asset = assets[Math.floor(Math.random() * assets.length)];
            const amt = (Math.random() * 50 + 10).toFixed(1) + 'M';
            setWhaleAlerts(prev => [{ id: Date.now(), asset, amt, type: Math.random() > 0.5 ? 'SWAP' : 'TRANSFER' }, ...prev].slice(0, 4));
        }, 3500);

        const relayInterval = setInterval(() => setRelayStep(prev => (prev + 1) % 4), 1500);

        // NEW: x402 AI Payment Protocol Loop
        const x402Interval = setInterval(() => setX402Step(p => (p + 1) % 4), 1800);

        // NEW: FHE Ciphertext Generator
        const fheInterval = setInterval(() => {
            setFheHash('0x' + Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join(''));
        }, 800);

        // NEW: Shared Sequencer Latency (Sub-second)
        const seqInterval = setInterval(() => setPreConfMs(Math.floor(Math.random() * 100 + 50)), 150);

        return () => {
            clearInterval(streamInterval); clearInterval(whaleInterval);
            clearInterval(relayInterval); clearInterval(x402Interval);
            clearInterval(fheInterval); clearInterval(seqInterval);
        };
    }, []);

    const handlePasskeyAuth = () => {
        if (authState === 'verified') return;
        setAuthState('scanning');
        setTimeout(() => setAuthState('verified'), 2000);
    };

    const handleZkTlsProof = () => {
        if (zkTlsStatus !== 'idle') return;
        setZkTlsStatus('proving');
        setTimeout(() => setZkTlsStatus('verified'), 3500);
    };

    return (
        <main className="relative min-h-screen w-full bg-[#030508] text-white overflow-x-hidden overflow-y-auto font-mono select-none text-xs custom-scrollbar">

            {/* CRT SCANLINE OVERLAY */}
            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-30 mix-blend-overlay" />

            {/* 3D ENGINE PIPELINE */}
            <EngineView marketVolatility={volatility} />

            <div className="relative z-10 w-full min-h-screen p-4 md:p-8 flex flex-col pointer-events-none">

                {/* === TOP TELEMETRY BAR === */}
                <header className="w-full pointer-events-auto flex flex-wrap justify-between items-end border-b border-cyan-900/40 pb-4 mb-6 gap-4">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-cyan-500 hover:text-cyan-300 transition-colors border border-cyan-900/50 bg-black/40 px-4 py-2 w-max">
                            <ChevronLeft className="w-4 h-4" /> RETURN TO CORE MATRIX
                        </Link>

                        <div className="border border-cyan-900/50 bg-black/40 p-2 flex items-center gap-3 w-max">
                            <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                            <div>
                                <div className="text-[9px] tracking-[0.3em] text-neutral-500">ERC-4337 PAYMASTER</div>
                                <div className="text-amber-400 font-bold tracking-widest text-[10px]">GASLESS SPONSORED TX: ACTIVE</div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setPqEnabled(!pqEnabled)}
                        className={`border px-4 py-3 text-[9px] tracking-widest flex items-center gap-2 transition-all ${pqEnabled ? 'border-purple-500/50 bg-purple-950/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'border-cyan-900/50 bg-black/40 text-neutral-400 hover:border-cyan-500/50'
                            }`}
                    >
                        <Cpu className="w-4 h-4" />
                        <div className="text-left">
                            <div className="font-bold">{pqEnabled ? 'POST-QUANTUM MODE: ACTIVE' : 'ENABLE POST-QUANTUM SIGNATURES'}</div>
                            <div className="text-[8px] text-neutral-500 mt-0.5">{pqEnabled ? 'LATTICE ALGO: ML-DSA (DILITHIUM)' : 'CURRENT: ECDSA (VULNERABLE)'}</div>
                        </div>
                    </button>
                </header>

                {/* === MAIN DASHBOARD GRID (3 COLUMNS) === */}
                <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start pointer-events-auto pb-20">

                    {/* ========================================== */}
                    {/* LEFT COLUMN: IDENTITY, AUTH, & WEB PROOFS  */}
                    {/* ========================================== */}
                    <div className="col-span-1 xl:col-span-4 flex flex-col gap-6">

                        <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4">
                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-4 flex justify-between items-center font-bold">
                                <div className="flex items-center gap-2"><Fingerprint className="w-3.5 h-3.5" /> SMART ACCOUNT</div>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-2 h-2 border ${i <= 3 ? 'border-emerald-500 bg-emerald-500/50' : 'border-neutral-700 bg-neutral-900'}`} />)}
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center py-6 border border-white/5 bg-black/50 mb-4 relative overflow-hidden">
                                {authState === 'scanning' && <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />}
                                <Fingerprint className={`w-12 h-12 mb-3 transition-colors duration-500 ${authState === 'verified' ? 'text-emerald-400' : authState === 'scanning' ? 'text-cyan-400 animate-bounce' : 'text-neutral-600'}`} />
                                <div className="text-[10px] tracking-widest uppercase font-bold text-center">
                                    {authState === 'verified' ? <span className="text-emerald-400">BIOMETRIC PASSKEY VERIFIED</span> : <span className="text-neutral-500">NO SEED PHRASE REQUIRED</span>}
                                </div>
                            </div>

                            <div className="flex justify-between text-[8px] text-neutral-500 mb-3 border-b border-white/5 pb-2">
                                <span>CUSTODY MODEL</span> <span className="text-emerald-400">3-OF-5 MPC THRESHOLD</span>
                            </div>

                            <button onClick={handlePasskeyAuth} className={`w-full py-2.5 border text-[9px] tracking-widest font-bold uppercase transition-all ${authState === 'verified' ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-500 cursor-default' : 'border-cyan-500/30 bg-cyan-950/40 text-cyan-400'}`}>
                                {authState === 'verified' ? '[ SESSION AUTHENTICATED ]' : '[ INITIALIZE PASSKEY LOGIN ]'}
                            </button>
                        </div>

                        <div className={`border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4 transition-opacity duration-1000 ${authState === 'verified' ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-4 flex items-center gap-2 font-bold">
                                <ShieldCheck className="w-3.5 h-3.5" /> IDENTITY & zkTLS PROOFS
                            </div>

                            <div className="relative overflow-hidden border border-emerald-900/50 bg-emerald-950/10 p-4 mb-4">
                                <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/10 blur-xl rounded-full" />
                                <div className="text-[8px] text-emerald-500/70 tracking-[0.2em] mb-1">SOULBOUND CREDENTIAL (SBT)</div>
                                <div className="text-lg text-white font-bold tracking-widest mb-4">LUBHANSHU</div>
                                <div className="space-y-2 text-[9px] text-neutral-400">
                                    <div className="flex justify-between border-b border-white/5 pb-1"><span>NODE_LOCATION</span> <span className="text-cyan-400">GANGWA, IN</span></div>
                                    <div className="flex justify-between border-b border-white/5 pb-1"><span>ACADEMIC_ROLL</span> <span className="text-cyan-400">25BCS10043</span></div>
                                </div>
                            </div>

                            <div className="border border-white/5 bg-black/50 p-3">
                                <div className="text-[8px] text-cyan-500 tracking-widest mb-2 flex items-center gap-2"><Link2 className="w-3 h-3" /> WEB2 DATA ZERO-KNOWLEDGE PROOF</div>
                                <div className="text-[9px] text-neutral-400 mb-3">Prove off-chain Binance volume {'>'}$10,000 without revealing API keys via zkTLS.</div>

                                {zkTlsStatus === 'proving' && (
                                    <div className="text-[8px] text-emerald-400 font-mono mb-3 space-y-1">
                                        <div>&gt; Establishing TLS intercept...</div>
                                        <div>&gt; Generating client-side ZK proof...</div>
                                    </div>
                                )}

                                <button onClick={handleZkTlsProof} className={`w-full py-2 border text-[8px] tracking-widest font-bold uppercase transition-all ${zkTlsStatus === 'verified' ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400' : 'border-cyan-900/50 hover:border-cyan-500/50 text-cyan-400 bg-cyan-950/20'}`}>
                                    {zkTlsStatus === 'verified' ? '✓ zkTLS PROOF VERIFIED ON-CHAIN' : zkTlsStatus === 'proving' ? 'GENERATING PROOF...' : 'GENERATE zkTLS PROOF'}
                                </button>
                            </div>
                        </div>

                        {/* NEW: FHE CONFIDENTIAL COMPUTE */}
                        <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4">
                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-4 flex items-center gap-2 font-bold">
                                <EyeOff className="w-3.5 h-3.5" /> FHE CONFIDENTIAL COMPUTE
                            </div>
                            <div className="text-[9px] text-neutral-400 mb-3">
                                Fully Homomorphic Encryption (FHE) evaluates logic on ciphertexts without decryption.
                            </div>
                            <div className="bg-black/50 border border-white/5 p-3 text-center space-y-3">
                                <div className="text-[10px] text-emerald-400 font-mono tracking-widest">E(m₁) * E(m₂) = E(m₁ * m₂)</div>
                                <div className="flex items-center justify-center gap-2 text-[8px] text-neutral-500 font-mono">
                                    <div className="truncate w-16">{fheHash}</div> + <div className="truncate w-16 bg-neutral-900">{fheHash}</div>
                                </div>
                                <div className="text-cyan-500 text-[9px] animate-pulse tracking-widest border-t border-white/5 pt-2">ENCRYPTED RESULT VERIFIED</div>
                            </div>
                        </div>

                    </div>

                    {/* ========================================== */}
                    {/* CENTER COLUMN: YIELD, GOVERNANCE & AUTONOMY*/}
                    {/* ========================================== */}
                    <div className="col-span-1 xl:col-span-4 flex flex-col gap-6">

                        <div className="border border-cyan-900/30 bg-black/40 backdrop-blur-md p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50" />

                            <div className="text-[10px] tracking-[0.4em] text-emerald-400 mb-2 flex items-center gap-2 font-bold">
                                <Droplets className="w-4 h-4 animate-bounce" /> CONTINUOUS SABLIER STREAM
                            </div>

                            <div className="text-5xl md:text-6xl font-light tracking-tighter text-white tabular-nums drop-shadow-[0_0_20px_rgba(52,211,153,0.3)] my-4">
                                {moneyStream.toFixed(4)} <span className="text-xl text-emerald-500">USDC</span>
                            </div>

                            <div className="w-full mt-2">
                                <div className="flex justify-between text-[8px] tracking-widest mb-1">
                                    <span className="text-emerald-400">REAL YIELD (78%)</span>
                                    <span className="text-amber-500">EMISSIONS (22%)</span>
                                </div>
                                <div className="w-full h-1.5 flex rounded-full overflow-hidden">
                                    <div className="bg-emerald-400 h-full w-[78%] shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                    <div className="bg-amber-500 h-full w-[22%]" />
                                </div>
                                <div className="text-center text-[8px] text-neutral-500 mt-2 uppercase tracking-widest">Protocol Revenue vs Inflationary Token Sink</div>
                            </div>
                        </div>

                        <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4">
                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-4 flex items-center gap-2 font-bold">
                                <Scale className="w-3.5 h-3.5" /> QUADRATIC GOVERNANCE
                            </div>
                            <div className="text-[9px] text-neutral-400 mb-4">
                                Anti-whale voting mechanics. Voting power scales proportionally to the square root of committed tokens.
                            </div>
                            <div className="border border-white/5 bg-black/50 p-4">
                                <div className="flex justify-between text-[9px] mb-2 font-bold">
                                    <span className="text-neutral-400">TOKENS COMMITTED</span>
                                    <span className="text-cyan-400">{govTokens.toLocaleString()}</span>
                                </div>
                                <input type="range" min="1" max="10000" value={govTokens} onChange={(e) => setGovTokens(Number(e.target.value))} className="w-full accent-cyan-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer mb-6" />
                                <div className="flex justify-between items-end border-t border-white/5 pt-3">
                                    <span className="text-[8px] tracking-widest text-neutral-500">VOTING POWER (√x)</span>
                                    <span className="text-2xl font-light text-emerald-400">
                                        {Math.sqrt(govTokens).toFixed(2)} <span className="text-[10px]">VOTES</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4 grid grid-cols-2 gap-4">
                            <div className="col-span-2 text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 flex items-center gap-2 font-bold">
                                <Key className="w-3.5 h-3.5" /> ERC-6900 SESSION KEYS
                            </div>
                            <div className="border border-white/5 bg-black/50 p-3 space-y-2 text-[9px] col-span-2">
                                <div className="flex justify-between"><span className="text-neutral-500">AGENT:</span> <span className="text-cyan-400">ARB_BOT_v3</span></div>
                                <div className="flex justify-between"><span className="text-neutral-500">LIMIT:</span> <span className="text-white">5K USDC</span></div>
                            </div>
                            <button onClick={() => setSessionActive(!sessionActive)} className={`w-full h-full col-span-2 py-3 border text-[8px] tracking-widest font-bold uppercase transition-all flex flex-col items-center justify-center gap-1 ${sessionActive ? 'border-purple-500/50 bg-purple-950/30 text-purple-400 shadow-[inset_0_0_20px_rgba(168,85,247,0.2)]' : 'border-cyan-900/50 bg-cyan-950/20 text-neutral-400'}`}>
                                <BrainCircuit className={`w-4 h-4 ${sessionActive ? 'animate-pulse' : ''}`} />
                                {sessionActive ? 'AI ACTIVE' : 'DELEGATE AUTHORITY'}
                            </button>
                        </div>

                        {/* NEW: x402 AGENTIC COMMERCE */}
                        <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4">
                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-4 flex items-center gap-2 font-bold">
                                <Bot className="w-3.5 h-3.5" /> x402 AGENTIC COMMERCE
                            </div>
                            <div className="text-[9px] text-neutral-400 mb-3">
                                Machine-to-machine payment networks. Agents settle via HTTP 402 and ERC-8004 identity.
                            </div>
                            <div className="bg-black/50 border border-white/5 p-3 font-mono text-[8.5px] space-y-2 h-[100px] flex flex-col justify-center">
                                <div className={`${x402Step >= 0 ? 'text-cyan-400' : 'text-neutral-700'}`}>1. CLIENT: GET /api/inference</div>
                                <div className={`${x402Step >= 1 ? 'text-amber-400' : 'text-neutral-700'}`}>2. SERVER: 402 Payment Required</div>
                                <div className={`${x402Step >= 2 ? 'text-purple-400' : 'text-neutral-700'}`}>3. CLIENT: Sign EIP-712 (0.05 USDC)</div>
                                <div className={`${x402Step >= 3 ? 'text-emerald-400 font-bold drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]' : 'text-neutral-700'}`}>4. SERVER: 200 OK (Data Unlocked)</div>
                            </div>
                        </div>

                    </div>

                    {/* ========================================== */}
                    {/* RIGHT COLUMN: NETWORK, MEV, & CROSS-CHAIN  */}
                    {/* ========================================== */}
                    <div className="col-span-1 xl:col-span-4 flex flex-col gap-6">

                        <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4 flex flex-col">
                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-4 flex items-center gap-2 font-bold">
                                <Route className="w-3.5 h-3.5" /> INTENT MESSAGE FINALITY
                            </div>
                            <div className="text-[8px] text-neutral-500 tracking-widest mb-3">ROUTING USDC: ARBITRUM → OPTIMISM</div>
                            <div className="relative flex justify-between items-center px-4">
                                <div className="absolute top-1/2 left-8 right-8 h-[1px] bg-neutral-800 -z-10" />
                                <div className="absolute top-1/2 left-8 h-[1px] bg-cyan-400 transition-all duration-500 -z-10" style={{ width: relayStep === 0 ? '0%' : relayStep === 1 ? '50%' : '80%' }} />
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${relayStep >= 0 ? 'border-cyan-400 bg-cyan-950 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'border-neutral-700 bg-black text-neutral-600'}`}>1</div>
                                    <span className="text-[8px] font-bold text-center">SRC<br />CONFIRMED</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${relayStep >= 1 ? 'border-amber-400 bg-amber-950 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'border-neutral-700 bg-black text-neutral-600'}`}><Share2 className="w-3 h-3" /></div>
                                    <span className="text-[8px] font-bold text-center">LZ RELAY<br />IN-FLIGHT</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${relayStep >= 2 ? 'border-emerald-400 bg-emerald-950 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]' : 'border-neutral-700 bg-black text-neutral-600'}`}>3</div>
                                    <span className="text-[8px] font-bold text-center">DEST<br />VERIFIED</span>
                                </div>
                            </div>
                        </div>

                        <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4 flex flex-col">
                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-3 flex items-center gap-2 font-bold">
                                <LockKeyhole className="w-3.5 h-3.5" /> MEV DARK FOREST SHIELD
                            </div>
                            <div className="flex-1 border border-white/5 bg-black/50 p-3 flex flex-col justify-center items-center relative overflow-hidden mb-3">
                                <div className="flex justify-between w-full text-[8px] text-neutral-500 mb-2 px-1"><span>WALLET</span> <span>{mevProtected ? 'PRIVATE RPC' : 'PUBLIC POOL'}</span></div>
                                <div className="w-full h-1 bg-neutral-900 relative rounded-full">
                                    <div className={`absolute top-0 left-0 h-full w-full ${mevProtected ? 'bg-emerald-500/50' : 'bg-rose-500/50'}`} />
                                    <div className={`absolute top-0 h-full w-4 blur-sm animate-[marquee_2s_linear_infinite] ${mevProtected ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                                </div>
                            </div>
                            <button onClick={() => setMevProtected(!mevProtected)} className={`w-full py-2 border text-[9px] tracking-widest font-bold uppercase transition-all ${mevProtected ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-500' : 'border-rose-500/30 bg-rose-950/20 text-rose-400'}`}>
                                {mevProtected ? 'SHIELD ACTIVE' : 'ENABLE MEV PROTECTION'}
                            </button>
                        </div>

                        <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4 flex-1 flex flex-col overflow-hidden min-h-[120px]">
                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-3 flex items-center gap-2 font-bold">
                                <Radar className="w-3.5 h-3.5" /> LIVE WHALE TRACKER
                            </div>
                            <div className="flex-1 space-y-2 overflow-hidden flex flex-col">
                                <AnimatePresence>
                                    {whaleAlerts.map((alert) => (
                                        <motion.div key={alert.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="border-l-2 border-cyan-500 bg-cyan-950/20 p-1.5 text-[9px]">
                                            <div className="flex justify-between items-center mb-0.5"><span className="text-cyan-400 font-bold">{alert.type}</span><span className="text-neutral-500">Now</span></div>
                                            <div className="text-white tracking-wider"><span className="text-emerald-400 font-bold">{alert.amt}</span> <span className="text-neutral-300">{alert.asset}</span></div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* NEW: SHARED SEQUENCER */}
                        <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4">
                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-4 flex items-center gap-2 font-bold">
                                <Network className="w-3.5 h-3.5" /> SHARED SEQUENCER (ESPRESSO)
                            </div>
                            <div className="flex justify-between items-center bg-black/50 border border-white/5 p-3">
                                <div className="flex flex-col">
                                    <span className="text-[8px] text-neutral-500">PRE-CONFIRMATION</span>
                                    <span className="text-emerald-400 font-mono text-xl">{preConfMs}ms</span>
                                </div>
                                <div className="h-6 w-px bg-white/10" />
                                <div className="flex flex-col text-right">
                                    <span className="text-[8px] text-neutral-500">L1 SETTLEMENT</span>
                                    <span className="text-cyan-400 font-mono text-xl">12.0s</span>
                                </div>
                            </div>
                        </div>

                        {/* NEW: ZK COPROCESSOR */}
                        <div className="border border-cyan-900/30 bg-black/60 backdrop-blur-md p-4">
                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-4 flex items-center gap-2 font-bold">
                                <Database className="w-3.5 h-3.5" /> ZK COPROCESSOR (BREVIS)
                            </div>
                            <div className="text-[9px] text-neutral-400 mb-2">
                                Offloading heavy QML inference compute to ZK circuits.
                            </div>
                            <div className="bg-cyan-950/20 border border-cyan-900/50 p-2 text-[8px] text-cyan-400 font-mono text-center">
                                <span className="animate-pulse">GENERATING ZK-SNARK PROOF...</span>
                                <br />[OMNICHAIN_DATA_QUERY_SUCCESS]
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* 6. DECENTRALIZED STORAGE FOOTER PROOF */}
            <div className="fixed bottom-0 left-0 w-full border-t border-cyan-900/40 bg-black/80 backdrop-blur-md p-2 px-6 flex justify-between items-center text-[9px] z-50">
                <div className="flex items-center gap-2 text-emerald-400 tracking-widest font-bold">
                    <Database className="w-3 h-3" /> UI PINNED VIA IPFS
                    <span className="text-neutral-500 font-normal ml-2 hidden sm:inline-block">CID: QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG</span>
                </div>
                <div className="text-cyan-900 tracking-widest font-bold">PROJECT_ARCHITECT: LUBHANSHU // 25BCS10043</div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marquee { 0% { transform: translateX(0%); left: 0%; } 100% { transform: translateX(0%); left: 100%; } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6, 182, 212, 0.3); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6, 182, 212, 0.6); }
      `}} />
        </main>
    );
}