'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, ChevronLeft, EyeOff, BarChart3,
    ShieldAlert, Cpu, X, Terminal, Fingerprint, ShieldCheck, Zap,
    Bot, GitMerge, LockKeyhole, Network, Hexagon
} from 'lucide-react';

const EngineView = dynamic(() => import('../components/EngineView'), { ssr: false });

interface Asset {
    symbol: string; name: string; price: number; change: number; type: string; color: string; trend: number[]; contractAddress: string; liquidity: string;
}

const INITIAL_ASSETS: Asset[] = [
    { symbol: 'BTC', name: 'BITCOIN', price: 61527.11, change: 2.41, type: 'L1_STORE_OF_VALUE', color: 'text-amber-400', trend: [40, 42, 41, 45, 48, 47, 50], contractAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', liquidity: '$45B' },
    { symbol: 'ETH', name: 'ETHEREUM', price: 3421.15, change: 1.82, type: 'L1_SMART_CONTRACT', color: 'text-purple-400', trend: [30, 31, 30, 33, 35, 34, 38], contractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', liquidity: '$28B' },
    { symbol: 'SOL', name: 'SOLANA', price: 145.20, change: -0.50, type: 'L1_HIGH_THROUGHPUT', color: 'text-emerald-400', trend: [50, 48, 45, 46, 42, 40, 38], contractAddress: '0x579...SOL_NATIVE', liquidity: '$12B' },
    { symbol: 'EIGEN', name: 'EIGENLAYER', price: 4.12, change: 12.45, type: 'INFRA_RESTAKING_AVS', color: 'text-cyan-400', trend: [10, 15, 25, 30, 40, 60, 80], contractAddress: '0xec53a077faeb560584b80bbf2c82352cbef7c47d', liquidity: '$1.4B' },
    { symbol: 'TIA', name: 'CELESTIA', price: 8.45, change: -2.10, type: 'INFRA_DATA_AVAILABILITY', color: 'text-rose-400', trend: [70, 65, 60, 50, 55, 45, 40], contractAddress: '0x384a...TIA_COSMOS', liquidity: '$850M' },
    { symbol: 'LINK', name: 'CHAINLINK', price: 14.85, change: 5.12, type: 'INFRA_DECENTRALIZED_ORACLE', color: 'text-blue-400', trend: [20, 22, 25, 24, 30, 35, 40], contractAddress: '0x514910771af9ca656af840dff83e8264ecf986ca', liquidity: '$3.1B' },
];

export default function AssetMatrix() {
    const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
    const [fheMode, setFheMode] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

    // Workspace States
    const [auditProgress, setAuditProgress] = useState(0);
    const [isAuditing, setIsAuditing] = useState(false);
    const [auditComplete, setAuditComplete] = useState(false);
    const [mevShieldActive, setMevShieldActive] = useState(false);
    const [vaultShielded, setVaultShielded] = useState(false);

    // Scrambler state for FHE Vault
    const [cipherText, setCipherText] = useState('');

    // Agentic Swarm State
    const [agentLogs, setAgentLogs] = useState<string[]>([]);

    // Jitter and Agent Simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setAssets(prev => prev.map(asset => ({
                ...asset,
                price: asset.price * (1 + (Math.random() * 0.0006 - 0.0003)),
            })));

            if (selectedAsset) {
                const hash = Math.random().toString(16).substring(2, 10).toUpperCase();
                setAgentLogs(p => [`[AGENT_0x${hash}] x402_NEGOTIATION: BUY ${((Math.random() * 10)).toFixed(2)} ${selectedAsset.symbol}`, ...p].slice(0, 4));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [selectedAsset]);

    // FHE Ciphertext Scrambler Effect
    useEffect(() => {
        let scrambleInterval: NodeJS.Timeout;
        if (vaultShielded && selectedAsset) {
            scrambleInterval = setInterval(() => {
                setCipherText('0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(''));
            }, 50);
        } else {
            setCipherText(selectedAsset ? `$${selectedAsset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '');
        }
        return () => clearInterval(scrambleInterval);
    }, [vaultShielded, selectedAsset, assets]);

    const triggerAuditPipeline = () => {
        setIsAuditing(true);
        setAuditComplete(false);
        setAuditProgress(0);

        const auditInterval = setInterval(() => {
            setAuditProgress(p => {
                if (p >= 100) {
                    clearInterval(auditInterval);
                    setIsAuditing(false);
                    setAuditComplete(true);
                    return 100;
                }
                return p + 5;
            });
        }, 100);
    };

    const drawSparkline = (trend: number[], colorClass: string) => {
        const max = Math.max(...trend); const min = Math.min(...trend); const range = max - min || 1;
        const points = trend.map((val, i) => `${(i / (trend.length - 1)) * 100},${40 - ((val - min) / range) * 40}`).join(' ');

        let strokeColor = '#06b6d4';
        if (colorClass.includes('amber')) strokeColor = '#fbbf24';
        if (colorClass.includes('purple')) strokeColor = '#c084fc';
        if (colorClass.includes('emerald')) strokeColor = '#34d399';
        if (colorClass.includes('rose')) strokeColor = '#fb7185';
        if (colorClass.includes('blue')) strokeColor = '#60a5fa';

        return (
            <svg viewBox="0 0 100 40" className="w-24 h-8 overflow-visible">
                <polyline points={points} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
                <circle cx="100" cy={40 - ((trend[trend.length - 1] - min) / range) * 40} r="2" fill={strokeColor} className="animate-ping" />
            </svg>
        );
    };

    return (
        <main className="relative min-h-screen w-full bg-[#030508] text-white overflow-hidden font-mono select-none text-xs">

            <div className="pointer-events-none fixed inset-0 z-50 h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-30 mix-blend-overlay shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />

            <EngineView marketVolatility={0.25} />

            <div className="relative z-10 w-full min-h-screen p-4 md:p-8 flex flex-col pointer-events-none">

                {/* === HEADER === */}
                <header className="w-full pointer-events-auto border-b border-cyan-900/40 pb-4 mb-8 flex justify-between items-end">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-cyan-500 hover:text-cyan-300 transition-colors mb-4 border border-cyan-900/50 bg-black/40 px-4 py-2">
                            <ChevronLeft className="w-4 h-4" /> RETURN TO CORE MATRIX
                        </Link>
                        <div className="flex items-center gap-3">
                            <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
                            <div>
                                <h1 className="text-2xl font-light tracking-widest text-white">GLOBAL ASSET TELEMETRY</h1>
                                <div className="text-[9px] tracking-[0.4em] text-neutral-500 mt-1">LUBHANSHU // GANGWA_IN CLUSTER // SECURE UPLINK</div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setFheMode(!fheMode)} className={`border px-4 py-2 text-[9px] tracking-widest flex items-center gap-2 transition-all ${fheMode ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400' : 'border-cyan-900/50 bg-black/40 text-neutral-400 hover:border-cyan-500/50'}`}>
                        <EyeOff className="w-3 h-3" />
                        {fheMode ? 'FHE ENCRYPTION: ACTIVE' : 'ENABLE CONFIDENTIAL FHE MODE'}
                    </button>
                </header>

                {/* === CARD MATRIX GRID === */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-auto">
                    {assets.map((asset) => (
                        <div key={asset.symbol} onClick={() => { setSelectedAsset(asset); setAuditComplete(false); setIsAuditing(false); setAuditProgress(0); setMevShieldActive(false); setVaultShielded(false); }} className="group relative border border-cyan-900/30 bg-black/60 backdrop-blur-md p-6 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-bold tracking-wider">{asset.symbol}</h2>
                                        <span className={`text-[9px] px-2 py-0.5 border bg-black/50 ${asset.change > 0 ? 'border-emerald-900 text-emerald-400' : 'border-rose-900 text-rose-400'}`}>{asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%</span>
                                    </div>
                                    <div className="text-[9px] tracking-widest text-neutral-500 mt-1">{asset.name}</div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-xl font-light ${asset.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]`}>
                                        {fheMode ? <span className="blur-sm select-none">$$$$$$$</span> : `$${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                    </div>
                                    <div className="text-[8px] tracking-[0.2em] text-neutral-600 mt-1">CLICK TO INTERACT</div>
                                </div>
                            </div>
                            <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-4">
                                <div className="space-y-1">
                                    <div className="text-[8px] tracking-[0.3em] text-neutral-500 flex items-center gap-1"><Cpu className="w-2.5 h-2.5" /> ARCHITECTURE</div>
                                    <div className="text-[9px] tracking-wider text-cyan-600/80">{asset.type}</div>
                                </div>
                                <div className="opacity-70 group-hover:opacity-100 transition-opacity">{drawSparkline(asset.trend, asset.color)}</div>
                            </div>
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
                        </div>
                    ))}
                </div>

                {/* === ULTRA ADVANCED INTERACTIVE WORKSPACE MODAL === */}
                <AnimatePresence>
                    {selectedAsset && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 md:p-8 pointer-events-auto">
                            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="w-full max-w-6xl border border-cyan-500/40 bg-[#020408] p-6 relative overflow-hidden flex flex-col justify-between h-[90vh] shadow-[0_0_100px_rgba(6,182,212,0.15)]">

                                {/* Modal Header */}
                                <div className="flex justify-between items-start border-b border-cyan-900/40 pb-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-4xl font-bold tracking-widest ${selectedAsset.color}`}>{selectedAsset.symbol}</span>
                                            <span className="text-xs text-neutral-500 border border-cyan-900 px-3 py-1 bg-black/40 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]">CORE WORKSPACE // ADVANCED CONTROLS</span>
                                        </div>
                                        <div className="text-[10px] text-cyan-500/80 mt-2 font-mono flex items-center gap-2">
                                            <LockKeyhole className="w-3 h-3" /> CONTRACT: {selectedAsset.contractAddress}
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedAsset(null)} className="border border-cyan-900/60 hover:border-rose-500 bg-black/50 p-2 text-neutral-400 hover:text-rose-500 transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Dashboard Sub-Matrix Layout */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch my-2 overflow-y-auto scrollbar-none">

                                    {/* --- PANEL 1: NEURAL CONTRACT AUDIT --- */}
                                    <div className="md:col-span-4 border border-cyan-900/30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 to-black p-4 flex flex-col justify-between relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full" />
                                        <div>
                                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-3 flex items-center gap-1.5 font-bold">
                                                <Terminal className="w-3.5 h-3.5" /> NEURAL CONTRACT AUDIT
                                            </div>

                                            {/* Interactive Visualizer */}
                                            <div className="h-40 border border-cyan-900/40 bg-black/80 p-3 mb-4 flex flex-col items-center justify-center relative">
                                                {!isAuditing && !auditComplete && (
                                                    <div className="text-[9px] text-cyan-700 font-mono animate-pulse text-center">AWAITING BYTECODE INJECTION...</div>
                                                )}
                                                {isAuditing && (
                                                    <div className="w-full text-center">
                                                        <div className="text-cyan-400 text-3xl font-light mb-2">{auditProgress}%</div>
                                                        <div className="w-full h-1 bg-cyan-950 rounded-full overflow-hidden">
                                                            <div className="h-full bg-cyan-400 transition-all duration-75" style={{ width: `${auditProgress}%` }} />
                                                        </div>
                                                        <div className="text-[8px] text-cyan-500 mt-2 uppercase tracking-widest">Scanning vulnerability vectors...</div>
                                                    </div>
                                                )}
                                                {auditComplete && (
                                                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center w-full">
                                                        <div className="flex justify-between w-full text-[9px] mb-2 px-2 text-neutral-400">
                                                            <span>REENTRANCY: <span className="text-emerald-400">0%</span></span>
                                                            <span>FLASHLOAN: <span className="text-emerald-400">0%</span></span>
                                                        </div>
                                                        <div className="w-20 h-20 rounded-full border-2 border-emerald-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                                                            <ShieldCheck className="w-8 h-8 text-emerald-400" />
                                                        </div>
                                                        <div className="text-emerald-400 text-[10px] font-bold tracking-widest mt-2 uppercase">SECURE // SCORE: 99.8</div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                        <button onClick={triggerAuditPipeline} disabled={isAuditing} className="w-full py-2.5 mt-2 bg-cyan-950/40 border border-cyan-500/30 text-[9px] tracking-widest hover:bg-cyan-900/40 transition-all font-bold uppercase">
                                            {isAuditing ? 'PROCESSING...' : auditComplete ? 'RE-RUN AUDIT VECTOR' : 'LAUNCH NEURAL AUDIT'}
                                        </button>
                                    </div>

                                    {/* --- PANEL 2: MEV-SHIELD PRIVATE ROUTER --- */}
                                    <div className="md:col-span-4 border border-cyan-900/30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 to-black p-4 flex flex-col justify-between relative">
                                        <div>
                                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-3 flex items-center gap-1.5 font-bold">
                                                <Zap className="w-3.5 h-3.5" /> MEV-SHIELD PRIVATE ROUTER
                                            </div>

                                            {/* Live Network Flow Visualizer */}
                                            <div className="h-40 border border-cyan-900/40 bg-black/80 p-4 mb-4 flex flex-col justify-center gap-4">
                                                <div className="flex justify-between text-[8px] text-neutral-500 px-1">
                                                    <span>USER TX</span>
                                                    <span>{mevShieldActive ? 'FLASHBOTS RPC' : 'PUBLIC MEMPOOL'}</span>
                                                    <span>BLOCK BUILDER</span>
                                                </div>

                                                <div className="flex items-center w-full">
                                                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                                                    <div className="flex-1 h-[2px] relative bg-neutral-800 overflow-hidden">
                                                        <motion.div
                                                            animate={{ x: ['-100%', '300%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                                            className={`absolute top-0 left-0 h-full w-1/3 ${mevShieldActive ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)]' : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,1)]'}`}
                                                        />
                                                    </div>

                                                    {/* Attack Simulation */}
                                                    <div className={`w-8 h-8 flex items-center justify-center border ${mevShieldActive ? 'border-emerald-500/50 bg-emerald-950/30' : 'border-rose-500/50 bg-rose-950/30 animate-pulse'}`}>
                                                        {mevShieldActive ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <ShieldAlert className="w-4 h-4 text-rose-500" />}
                                                    </div>

                                                    <div className="flex-1 h-[2px] bg-neutral-800 relative">
                                                        <div className={`absolute top-0 right-0 h-full w-full ${mevShieldActive ? 'bg-emerald-900/50' : 'bg-rose-900/50'}`} />
                                                    </div>
                                                    <Hexagon className="w-4 h-4 text-neutral-400" />
                                                </div>

                                                <div className="text-center text-[9px] mt-2 tracking-widest font-bold">
                                                    {mevShieldActive ? <span className="text-emerald-400">ENCRYPTED TUNNEL SECURED</span> : <span className="text-rose-500">EXPOSED TO SANDWICH ATTACKS</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <button onClick={() => setMevShieldActive(!mevShieldActive)} className={`w-full py-2.5 mt-2 border text-[9px] tracking-widest font-bold transition-all uppercase ${mevShieldActive ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400' : 'border-cyan-500/30 bg-cyan-950/40 text-cyan-400 hover:bg-cyan-900/50'}`}>
                                            {mevShieldActive ? '[ SHIELDED ROUTING ACTIVE ]' : 'ACTIVATE PRIVACY SHIELD'}
                                        </button>
                                    </div>

                                    {/* --- PANEL 3: ERC-7984 FHE SECURE VAULT --- */}
                                    <div className="md:col-span-4 border border-cyan-900/30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 to-black p-4 flex flex-col justify-between">
                                        <div>
                                            <div className="text-[9px] tracking-[0.3em] text-cyan-400 border-b border-cyan-900/30 pb-2 mb-3 flex items-center gap-1.5 font-bold">
                                                <Fingerprint className="w-3.5 h-3.5" /> ERC-7984 FHE SECURE VAULT
                                            </div>

                                            {/* Ciphertext Scrambler Visualizer */}
                                            <div className="h-40 border border-cyan-900/40 bg-black/80 p-4 mb-4 flex flex-col justify-center">
                                                <div className="text-[8px] text-neutral-500 mb-1 tracking-widest">NETWORK BROADCAST VALUE:</div>
                                                <div className={`text-xl font-bold tracking-wider break-all ${vaultShielded ? 'text-emerald-400 font-mono drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]' : selectedAsset.color}`}>
                                                    {cipherText}
                                                </div>
                                                <div className="mt-4 flex justify-between items-center border-t border-white/10 pt-2 text-[9px]">
                                                    <span className="text-neutral-500">HOMOMORPHIC COMPUTE:</span>
                                                    <span className={vaultShielded ? 'text-emerald-400 font-bold' : 'text-neutral-600'}>{vaultShielded ? 'ENABLED' : 'DISABLED'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button onClick={() => setVaultShielded(!vaultShielded)} className={`w-full py-2.5 mt-2 border text-[9px] tracking-widest font-bold transition-all uppercase ${vaultShielded ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400' : 'border-cyan-500/30 bg-cyan-950/40 text-cyan-400 hover:bg-cyan-900/50'}`}>
                                            {vaultShielded ? '[ CIPHER WRAPPER ACTIVE ]' : 'WRAP IN CRYPTOGRAPHIC CIPHER'}
                                        </button>
                                    </div>

                                    {/* --- NEW ROW: x402 AGENTIC PAYMENT SWARM --- */}
                                    <div className="md:col-span-12 border border-cyan-900/30 bg-black/60 p-4 flex items-center gap-6 overflow-hidden relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,1)]" />
                                        <div className="shrink-0 flex flex-col">
                                            <div className="text-[10px] tracking-[0.3em] text-white font-bold flex items-center gap-2 mb-1">
                                                <Bot className="w-4 h-4 text-cyan-400" /> x402 AGENTIC SWARM
                                            </div>
                                            <div className="text-[8px] text-neutral-500 tracking-widest">AUTONOMOUS RESOURCE ALLOCATION</div>
                                        </div>

                                        <div className="h-full w-[1px] bg-cyan-900/50" />

                                        <div className="flex-1 flex gap-4 overflow-hidden relative">
                                            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
                                            {agentLogs.map((log, i) => (
                                                <motion.div
                                                    key={i + log}
                                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                                    className="shrink-0 border border-cyan-900/40 bg-cyan-950/20 px-3 py-1.5 text-[9px] font-mono text-cyan-400 flex items-center gap-2"
                                                >
                                                    <GitMerge className="w-3 h-3 text-emerald-400" /> {log}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                {/* Footer Metadata */}
                                <div className="border-t border-cyan-900/40 pt-4 mt-2 flex justify-between items-center text-[9px] text-neutral-500 tracking-wider">
                                    <div className="flex gap-4">
                                        <span>LIQUIDITY DEPTH: <span className="text-white font-bold">{selectedAsset.liquidity}</span></span>
                                        <span>|</span>
                                        <span className="flex items-center gap-1"><Network className="w-3 h-3 text-cyan-500" /> ZK_PROVER: ACTIVE</span>
                                    </div>
                                    <div className="text-cyan-900 font-bold">PROJECT IDENTITY: LUBHANSHU // 25BCS10043</div>
                                </div>

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* === BOTTOM TERMINAL BAR === */}
                <footer className="mt-auto pt-8 pb-4 pointer-events-auto flex justify-between items-end border-t border-cyan-900/40 text-[9px] text-neutral-600 tracking-widest uppercase">
                    <div>
                        MARKET DATA SOURCED VIA DECENTRALIZED RPC CLUSTERS.<br />
                        <span className="text-cyan-950">SYSTEM ARCHITECT: LUBHANSHU // 25BCS10043</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-emerald-400 flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-emerald-500" /> SYSTEM ACTIVE</span>
                        <span className="text-purple-400 flex items-center gap-1"><BarChart3 className="w-3 h-3 text-purple-400" /> LIQUIDITY CONSTRAINTS: INTACT</span>
                    </div>
                </footer>

            </div>
        </main>
    );
}