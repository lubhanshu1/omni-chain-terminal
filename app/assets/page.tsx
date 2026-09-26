export default function AssetsPage() {
  return (
    <main className="min-h-screen bg-[#030508] text-white font-mono p-8 md:p-16">
      <div className="max-w-5xl mx-auto pt-24">
        <p className="text-cyan-500 text-xs tracking-[0.3em]">03 / ASSET TELEMETRY</p>
        <h1 className="text-5xl md:text-7xl tracking-tight mt-5">Asset <span className="text-cyan-400">Telemetry</span></h1>
        <p className="text-neutral-500 mt-6 max-w-2xl">Live asset integrations can be connected here. The core terminal currently streams BTC/USDT directly from Binance in the browser.</p>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {["BTC / USDT","ETH / USDT","SOL / USDT"].map((x)=>(
            <div key={x} className="border border-cyan-900/40 bg-black/50 p-6"><div className="text-xs text-neutral-500">PAIR</div><div className="text-xl text-cyan-300 mt-3">{x}</div><div className="text-[10px] text-amber-400 mt-6">INTEGRATION READY</div></div>
          ))}
        </div>
      </div>
    </main>
  );
}