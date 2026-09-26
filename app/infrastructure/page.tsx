export default function InfrastructurePage() {
  return (
    <main className="min-h-screen bg-[#030508] text-white font-mono p-8 md:p-16">
      <div className="max-w-5xl mx-auto pt-24">
        <p className="text-cyan-500 text-xs tracking-[0.3em]">04 / INFRASTRUCTURE</p>
        <h1 className="text-5xl md:text-7xl tracking-tight mt-5">Infrastructure <span className="text-cyan-400">Matrix</span></h1>
        <p className="text-neutral-500 mt-6 max-w-2xl">Operational modules for chain telemetry, proving infrastructure, routing and verification. External integrations are clearly marked until production providers are configured.</p>
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {["Market stream","3D rendering engine","Proof simulator","Route preview"].map((x)=>(
            <div key={x} className="border border-cyan-900/40 bg-black/50 p-6 flex justify-between"><span>{x}</span><span className="text-emerald-400 text-[10px]">ONLINE</span></div>
          ))}
        </div>
      </div>
    </main>
  );
}