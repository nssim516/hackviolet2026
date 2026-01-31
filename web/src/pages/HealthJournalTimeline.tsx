import { NavLink, useNavigate } from "react-router-dom";

export default function HealthJournalTimeline() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light min-h-screen flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-background-light/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200/50 transition-colors text-slate-600">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
          <h1 className="text-base font-bold tracking-tight text-slate-900">Health Journal</h1>
          <div className="flex items-center justify-end w-10">
            <NavLink
              to="/profile"
              className="relative overflow-hidden w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center ring-2 ring-white hover:ring-hack-violet/30 transition-all"
              aria-label="Go to profile"
            >
              {/* TODO: Replace with actual user avatar component or local image */}
              <img
                alt="User Profile Portrait"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP3xYuUXZOKXOoIlmBuFJ10zmQt3yiJsNOoLn9J-_xXRsQtM9kmT7lUlQA3rcMZqaTACNFFz7PqTkhL1vMql68caAw3ltGNPxDQpkTG5n5vR7bB3tIslV7SB26bPEYZIXpFSkKbeC0n2G-aTEE2TPgapLfUKEvxAU47Jh8Mxp2omyl4dp1r80K0LjvvdUs3SDC9cu9q1Mn4IkwJCjPkJt65emRddpd7pe4cNAL8THqlj1CB5GPjnS65GN_Kxq0uutLofuWDUSpb4ob"
              />
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow w-full max-w-md mx-auto px-4 pt-6 pb-32">
        {/* Greeting */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Good morning,
            <br />
            Sarah.
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px] text-hack-violet">
              calendar_today
            </span>
            Jan 31, 2026
          </p>
        </div>

        {/* Journal input */}
        <section className="mb-10 bg-card-light rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
          <div className="flex items-center justify-between mb-4">
            <label className="text-lg font-bold text-slate-900" htmlFor="journal-input">
              How are you feeling?
            </label>
            <span className="material-symbols-outlined gradient-text">edit_note</span>
          </div>
          <textarea
            className="w-full bg-transparent border-0 border-b border-slate-100 focus:border-hack-violet focus:ring-0 px-0 py-2 text-base text-slate-700 placeholder-slate-400 resize-none min-h-[80px] leading-relaxed transition-colors"
            id="journal-input"
            placeholder="I woke up feeling a bit better..."
          />
        </section>

        {/* Recent history header */}
        <div className="flex items-center justify-between mb-6 px-1">
          <h3 className="text-xl font-bold text-slate-900">Recent History</h3>
          <button className="text-sm font-bold gradient-text">See All</button>
        </div>

        {/* Timeline */}
        <div className="relative pl-4 ml-2 space-y-8 border-l-2 border-slate-200/60 pb-4">
          {/* Entry 1 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[9px] top-6 h-[16px] w-[16px] rounded-full bg-white border-[3px] border-hack-violet group-hover:scale-110 transition-transform z-10 shadow-sm" />
            <article className="bg-card-light rounded-2xl p-0 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white overflow-hidden transition-all hover:shadow-md">
              <div className="p-4 pb-2 flex justify-between items-start gap-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-hack-violet/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-hack-violet">cardiology</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 leading-tight">
                      Dr. Emily Chen
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-0.5">
                      Cardiology
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-lg">
                  Jan 2
                </span>
              </div>
              <div className="px-4 pb-4">
                <div className="mt-2 text-sm text-slate-600 bg-slate-50/80 p-3 rounded-xl leading-relaxed">
                  <span className="font-bold text-slate-900 block text-[10px] mb-1 uppercase tracking-wider opacity-60">
                    Visit Summary
                  </span>
                  Discussed blood pressure medication adjustments. Next follow-up scheduled for 3
                  months.
                </div>
                <div className="mt-3 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/visit/1")}
                    className="text-xs font-bold text-hack-violet flex items-center gap-1 transition-colors"
                  >
                    DETAILS{" "}
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Entry 2 */}
          <div className="relative pl-8 group">
            <div className="absolute -left-[9px] top-6 h-[16px] w-[16px] rounded-full bg-white border-[3px] border-slate-300 group-hover:border-hack-pink transition-colors z-10" />
            <article className="bg-card-light rounded-2xl p-0 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white overflow-hidden transition-all hover:shadow-md">
              <div className="p-4 pb-2 flex justify-between items-start gap-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-hack-pink/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-hack-pink">stethoscope</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 leading-tight">
                      Dr. Mark Solis
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-0.5">
                      General Practitioner
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-lg">
                  Sep 12
                </span>
              </div>
              <div className="px-4 pb-4">
                <div className="mt-2 text-sm text-slate-600 bg-slate-50/80 p-3 rounded-xl leading-relaxed">
                  <span className="font-bold text-slate-900 block text-[10px] mb-1 uppercase tracking-wider opacity-60">
                    Visit Summary
                  </span>
                  Annual physical completed. All vitals normal. Recommended starting Vitamin D.
                </div>
                <div className="mt-3 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/visit/2")}
                    className="text-xs font-bold text-hack-pink flex items-center gap-1 transition-colors"
                  >
                    DETAILS{" "}
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* End marker */}
          <div className="relative pl-8 opacity-40">
            <div className="absolute -left-[5px] top-2 h-[8px] w-[8px] rounded-full bg-slate-300" />
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
              Beginning of journal
            </p>
          </div>
        </div>
      </main>

      {/* Floating CTA */}
      <div className="fixed bottom-24 left-0 right-0 z-50 pointer-events-none px-4">
        <div className="max-w-md mx-auto flex justify-center">
          <button
            className="pointer-events-auto shadow-[0_12px_40px_rgba(139,92,246,0.3)] gradient-bg hover:opacity-95 active:scale-95 text-white font-extrabold text-base py-4 px-8 rounded-full flex items-center gap-2 transition-all transform duration-200"
            type="button"
            onClick={() => navigate("/prepare")}
          >
            <span className="material-symbols-outlined text-[24px]">medical_services</span>
            Prepare for Appointment
          </button>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 w-full z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200/50">
        <div className="max-w-md mx-auto h-[84px] pb-6 flex justify-around items-center px-4">
          <NavLink to="/journal" className="relative flex flex-col items-center gap-1 w-16">
            <div className="absolute -top-[12px] w-8 h-1 gradient-bg rounded-b-full" />
            <span className="material-symbols-outlined gradient-text font-black text-[28px]">
              book_2
            </span>
            <span className="text-[10px] font-bold gradient-text">Journal</span>
          </NavLink>

          <NavLink
            to="/summary"
            className="flex flex-col items-center gap-1 w-16 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[28px]">insights</span>
            <span className="text-[10px] font-semibold">Visit</span>
          </NavLink>

          <NavLink
            to="/profile"
            className="flex flex-col items-center gap-1 w-16 text-slate-400 hover:text-slate-600 transition-colors"
          >
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
