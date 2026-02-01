import { useNavigate } from "react-router-dom";

export default function AppointmentAssistant() {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light min-h-screen flex flex-col overflow-hidden relative">
      {/* Header */}
      <header className="flex items-center p-4 pt-6 pb-2 justify-between z-20">
        <button
          className="text-slate-400 hover:text-slate-600 flex size-12 shrink-0 items-center justify-center rounded-full active:bg-slate-100 transition-colors"
          type="button"
          onClick={() => navigate("/prepare")}
          aria-label="Back to prepare"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
            expand_more
          </span>
        </button>
        <div className="flex items-center gap-3 bg-white shadow-sm border border-slate-100 pl-2 pr-4 py-1.5 rounded-full">
          {/* TODO: Replace with actual doctor avatar component or local image */}
          <div
            className="w-8 h-8 rounded-full bg-center bg-cover border border-slate-100"
            style={{
              backgroundImage:
                'url("https://upload.wikimedia.org/wikipedia/commons/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg")',
            }}
          />
          <div className="flex flex-col">
            <h2 className="text-slate-800 text-sm font-bold leading-none">Dr. Smith</h2>
            <span className="text-hack-violet text-[10px] font-bold uppercase tracking-wide leading-tight mt-0.5">
              Cardiology
            </span>
          </div>
        </div>
        <button className="text-slate-400 flex size-12 shrink-0 items-center justify-center rounded-full active:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
            more_vert
          </span>
        </button>
      </header>

      {/* Main recording area */}
      <main className="flex-1 flex flex-col items-center justify-center relative w-full -mt-4">
        {/* Animated background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="absolute w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] rounded-full border border-hack-violet/5" />
          <div className="absolute w-[60vw] h-[60vw] max-w-[380px] max-h-[380px] rounded-full border border-hack-violet/10" />
          <div className="w-72 h-72 rounded-full bg-hack-violet blur-[90px] opacity-10 animate-soft-pulse" />
          <div
            className="absolute w-56 h-56 rounded-full bg-hack-pink/10 blur-3xl animate-soft-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Recording indicator */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-500 text-xs font-bold uppercase tracking-widest">
                Recording
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-4xl md:text-5xl font-bold tracking-tighter tabular-nums">
                00:
              </span>
              <span className="text-slate-800 text-5xl md:text-6xl font-bold tracking-tighter tabular-nums drop-shadow-sm">
                12:43
              </span>
            </div>
          </div>

          {/* Audio waveform visualization */}
          <div className="h-12 flex items-center gap-1.5 px-8">
            <div className="w-1.5 h-4 bg-hack-violet/20 rounded-full" />
            <div className="w-1.5 h-6 bg-hack-violet/30 rounded-full" />
            <div className="w-1.5 h-8 bg-hack-violet/40 rounded-full" />
            <div className="w-1.5 h-10 bg-gradient-hackviolet rounded-full animate-wave" />
            <div className="w-1.5 h-7 bg-hack-pink/50 rounded-full" />
            <div
              className="w-1.5 h-12 bg-gradient-hackviolet rounded-full animate-wave"
              style={{ animationDelay: "0.1s" }}
            />
            <div className="w-1.5 h-6 bg-hack-violet/40 rounded-full" />
            <div
              className="w-1.5 h-10 bg-gradient-hackviolet rounded-full animate-wave"
              style={{ animationDelay: "0.2s" }}
            />
            <div className="w-1.5 h-4 bg-hack-violet/20 rounded-full" />
          </div>
        </div>
      </main>

      {/* Bottom panels */}
      <div className="relative z-20 flex flex-col w-full px-4 pb-8 gap-4">
        {/* Prepared questions */}
        <div className="w-full max-w-[480px] mx-auto bg-white/80 border border-white rounded-2xl overflow-hidden backdrop-blur-md shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400 text-lg">description</span>
              <h3 className="text-slate-500 text-xs font-bold tracking-wider uppercase">
                My Prepared Questions
              </h3>
            </div>
            <span className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">
              3 Total
            </span>
          </div>
          <div className="flex overflow-x-auto gap-3 p-3 no-scrollbar snap-x">
            {/* Question 1 - addressed */}
            <label className="question-card flex-none w-64 snap-center bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col justify-between min-h-[96px] cursor-pointer active:scale-95 transition-all">
              <input defaultChecked type="checkbox" />
              <p className="question-content text-slate-700 text-sm font-medium leading-snug line-clamp-2 transition-all duration-300">
                How will the new medication affect my sleep patterns?
              </p>
              <div className="status-container mt-auto pt-2">
                <div className="status-addressed items-center gap-1.5">
                  <span className="material-symbols-outlined text-gradient-hackviolet text-xs">
                    check_circle
                  </span>
                  <span className="text-[10px] font-bold text-hack-violet tracking-widest uppercase">
                    Addressed
                  </span>
                </div>
                <div className="status-pending items-center gap-1.5">
                  <span className="material-symbols-outlined text-slate-300 text-xs">
                    radio_button_unchecked
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                    Pending
                  </span>
                </div>
              </div>
            </label>

            {/* Question 2 - pending */}
            <label className="question-card flex-none w-64 snap-center bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col justify-between min-h-[96px] cursor-pointer active:scale-95 transition-all">
              <input type="checkbox" />
              <p className="question-content text-slate-700 text-sm font-medium leading-snug line-clamp-2 transition-all duration-300">
                When should I schedule the follow-up stress test?
              </p>
              <div className="status-container mt-auto pt-2">
                <div className="status-addressed items-center gap-1.5">
                  <span className="material-symbols-outlined text-gradient-hackviolet text-xs">
                    check_circle
                  </span>
                  <span className="text-[10px] font-bold text-hack-violet tracking-widest uppercase">
                    Addressed
                  </span>
                </div>
                <div className="status-pending items-center gap-1.5">
                  <span className="material-symbols-outlined text-slate-300 text-xs">
                    radio_button_unchecked
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                    Pending
                  </span>
                </div>
              </div>
            </label>

            {/* Question 3 - pending */}
            <label className="question-card flex-none w-64 snap-center bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col justify-between min-h-[96px] cursor-pointer active:scale-95 transition-all">
              <input type="checkbox" />
              <p className="question-content text-slate-700 text-sm font-medium leading-snug line-clamp-2 transition-all duration-300">
                Is there a digital portal for lab results?
              </p>
              <div className="status-container mt-auto pt-2">
                <div className="status-addressed items-center gap-1.5">
                  <span className="material-symbols-outlined text-gradient-hackviolet text-xs">
                    check_circle
                  </span>
                  <span className="text-[10px] font-bold text-hack-violet tracking-widest uppercase">
                    Addressed
                  </span>
                </div>
                <div className="status-pending items-center gap-1.5">
                  <span className="material-symbols-outlined text-slate-300 text-xs">
                    radio_button_unchecked
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                    Pending
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="w-full max-w-[480px] mx-auto bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50">
          <div className="flex items-center justify-between p-4 pb-2 border-b border-slate-50">
            <div className="flex items-center gap-2">
              <div className="bg-hack-violet/5 p-1.5 rounded-lg">
                <span className="material-symbols-outlined text-hack-violet text-lg">
                  auto_awesome
                </span>
              </div>
              <h3 className="text-slate-800 text-sm font-bold tracking-wide">AI Suggestions</h3>
            </div>
            <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
              <span className="material-symbols-outlined text-xl">expand_more</span>
            </button>
          </div>
          <div className="flex flex-col p-3 gap-2">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-transparent hover:border-hack-violet/10 transition-all cursor-pointer group">
              <div className="mt-0.5 min-w-[4px] h-4 rounded-full bg-hack-violet/20 group-hover:bg-hack-violet transition-colors" />
              <div>
                <p className="text-slate-700 text-sm font-medium leading-relaxed">
                  Ask if this medication interacts with your vitamins.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-transparent hover:border-hack-violet/10 transition-all cursor-pointer group">
              <div className="mt-0.5 min-w-[4px] h-4 rounded-full bg-slate-200 group-hover:bg-hack-violet transition-colors" />
              <div>
                <p className="text-slate-700 text-sm font-medium leading-relaxed">
                  Clarify how long the recovery period is.
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 pb-3 pt-0">
            <p className="text-slate-400 text-[11px] text-center font-normal tracking-wide flex items-center justify-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-hack-violet/40 animate-pulse" />
              AI is listening to suggest questions...
            </p>
          </div>
        </div>

        {/* Stop button */}
        <div className="flex justify-center w-full">
          <button className="group relative flex w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-gradient-hackviolet text-white text-base font-bold leading-normal tracking-[0.015em] shadow-xl shadow-hack-violet/20 hover:scale-[1.01] active:scale-[0.99] transition-all">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>
                stop_circle
              </span>
              <span className="truncate">Stop Recording</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
