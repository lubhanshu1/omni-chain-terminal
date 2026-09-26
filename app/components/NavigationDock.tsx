'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Database, Cpu, Globe, Activity } from 'lucide-react';

export default function NavigationDock() {
    const pathname = usePathname();
    const [time, setTime] = useState('00:00:00');

    // Real-time Cyber Clock
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { name: 'CORE MATRIX', path: '/', icon: Terminal },
        { name: 'ASSET TELEMETRY', path: '/assets', icon: Database },
        { name: 'INFRASTRUCTURE', path: '/infrastructure', icon: Cpu },
    ];

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto flex flex-col items-center gap-2">

            {/* Main Holographic Dock */}
            <nav className="flex items-center gap-2 p-1.5 bg-black/60 backdrop-blur-xl border border-cyan-900/50 rounded-full shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] tracking-[0.2em] font-bold transition-all duration-500 ${isActive
                                ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/50 shadow-[inset_0_0_15px_rgba(6,182,212,0.3)]'
                                : 'bg-transparent text-neutral-500 hover:text-cyan-300 hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            <item.icon className={`w-3.5 h-3.5 ${isActive ? 'animate-pulse' : ''}`} />
                            <span className="hidden sm:block">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Global System Telemetry Readout */}
            <div className="flex items-center gap-4 text-[8px] tracking-[0.3em] font-mono text-neutral-500 bg-black/40 backdrop-blur-md px-6 py-1 rounded-full border border-white/5">
                <span className="flex items-center gap-1 text-emerald-400"><Activity className="w-2.5 h-2.5" /> ONLINE</span>
                <span>|</span>
                <span className="flex items-center gap-1 text-cyan-600"><Globe className="w-2.5 h-2.5" /> GANGWA_IN</span>
                <span>|</span>
                <span className="text-cyan-500">ARCHITECT: LUBHANSHU (25BCS10043)</span>
                <span>|</span>
                <span className="text-neutral-400 font-bold">{time} IST</span>
            </div>

        </div>
    );
}