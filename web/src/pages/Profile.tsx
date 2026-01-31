import { NavLink } from "react-router-dom";

export default function Profile() {
  return (
    <div className="bg-background-light min-h-screen flex flex-col overflow-x-hidden pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-background-light/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink
            to="/journal"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200/50 transition-colors text-slate-600"
            aria-label="Back to journal"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </NavLink>

          <h1 className="text-base font-bold tracking-tight text-slate-900">Profile</h1>

          <div className="w-10" />
        </div>
      </header>

      <main className="flex-grow w-full max-w-md mx-auto px-4 pt-6 pb-10">
        {/* Card */}
        <section className="bg-card-light rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
          <div className="flex items-center gap-4">
            <div className="relative overflow-hidden w-14 h-14 rounded-full bg-slate-200 ring-2 ring-white">
              <img
                alt="User avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP3xYuUXZOKXOoIlmBuFJ10zmQt3yiJsNOoLn9J-_xXRsQtM9kmT7lUlQA3rcMZqaTACNFFz7PqTkhL1vMql68caAw3ltGNPxDQpkTG5n5vR7bB3tIslV7SB26bPEYZIXpFSkKbeC0n2G-aTEE2TPgapLfUKEvxAU47Jh8Mxp2omyl4dp1r80K0LjvvdUs3SDC9cu9q1Mn4IkwJCjPkJt65emRddpd7pe4cNAL8THqlj1CB5GPjnS65GN_Kxq0uutLofuWDUSpb4ob"
              />
            </div>
            <div className="flex-1">
              <p className="text-lg font-extrabold text-slate-900 leading-tight">Sarah</p>
              <p className="text-sm font-medium text-slate-500">name@example.com</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-4 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Visits
              </p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">2</p>
            </div>
            <div className="rounded-2xl bg-white p-4 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Notes
              </p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">5</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-violet-50 border border-violet-100 p-4 flex gap-3 items-start">
            <span className="material-symbols-outlined text-hackviolet-start">verified_user</span>
            <div>
              <p className="text-sm font-bold text-slate-900">Privacy</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                This is a prototype. We’ll add real account + data controls next.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom nav (same style) */}
      <nav className="fixed bottom-0 w-full z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200/50">
        <div className="max-w-md mx-auto h-[84px] pb-6 flex justify-around items-center px-4">
          <NavLink
            to="/journal"
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-1 w-16 ${
                isActive
                  ? "text-hackviolet-gradient"
                  : "text-slate-400 hover:text-slate-600 transition-colors"
              }`
            }
          >
            <span className="material-symbols-outlined font-black text-[28px]">book_2</span>
            <span className="text-[10px] font-bold">Journal</span>
          </NavLink>

          <NavLink
            to="/summary"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 w-16 ${
                isActive
                  ? "text-hackviolet-gradient"
                  : "text-slate-400 hover:text-slate-600 transition-colors"
              }`
            }
          >
            <span className="material-symbols-outlined text-[28px]">insights</span>
            <span className="text-[10px] font-semibold">Trends</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-1 w-16 ${
                isActive
                  ? "text-hackviolet-gradient"
                  : "text-slate-400 hover:text-slate-600 transition-colors"
              }`
            }
          >
            <div className="absolute -top-[12px] w-8 h-1 gradient-bg rounded-b-full" />
            <span className="material-symbols-outlined text-[28px]">person</span>
            <span className="text-[10px] font-semibold">Profile</span>
          </NavLink>
        </div>
      </nav>

      {/* Bottom fade */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light to-transparent pointer-events-none z-30 opacity-90" />
    </div>
  );
}

