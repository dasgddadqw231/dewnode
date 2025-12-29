export function AdminDashboard() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-xl font-light tracking-[0.4em] uppercase text-brand-cyan">DASHBOARD</h1>
        <p className="text-[11px] text-brand-light/40 uppercase tracking-widest leading-relaxed">
          Welcome to DEW&ODE administration. Overview of your store performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border border-brand-gray p-8 bg-brand-gray/5 space-y-4">
          <p className="text-[10px] text-brand-light/40 uppercase tracking-widest">Total Sales</p>
          <p className="text-2xl font-light tracking-widest text-brand-cyan">0 KRW</p>
        </div>
        <div className="border border-brand-gray p-8 bg-brand-gray/5 space-y-4">
          <p className="text-[10px] text-brand-light/40 uppercase tracking-widest">Total Orders</p>
          <p className="text-2xl font-light tracking-widest text-brand-cyan">0</p>
        </div>
        <div className="border border-brand-gray p-8 bg-brand-gray/5 space-y-4">
          <p className="text-[10px] text-brand-light/40 uppercase tracking-widest">Active Products</p>
          <p className="text-2xl font-light tracking-widest text-brand-cyan">4</p>
        </div>
      </div>
    </div>
  );
}