export default function VisitSummaryInsights() {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto overflow-x-hidden pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-background-light/90 backdrop-blur-md">
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <span className="material-symbols-outlined text-slate-900">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight">Visit Insights</h1>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <span className="material-symbols-outlined text-slate-900">share</span>
        </button>
      </header>

      <main className="flex flex-col gap-6 px-4 pt-2">
        {/* Doctor info */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-slate-100">
            <div className="relative shrink-0">
              {/* TODO: Replace with actual doctor avatar component or local image */}
              <div
                className="size-16 rounded-full bg-cover bg-center ring-2 ring-white"
                role="img"
                aria-label="Portrait of Dr. Sarah Smith"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-XV4Uj0Ieg_NGCpTC0DB3Pta56wMCoQxOCx99ZFYTTZrZp-QWUvLe-F8d2obCU-1xf04nAk2STuqQ2lGZMLkJyZfTSExNkdvre8kEQ3DxRa16MAiV-sP4qtGjCfF0TxlwLIfs-b1BeYLrMBAyaJdwOrWLs83yGM8BYQXtRW-WcCusTqx8GXzwHbNSQSfwhjR6Uok6pRs6e7p3kabg_8CrMPQJpPyoOaAcphna1yIHyxITyJV7W84KrjeQMMEYuqH1jNj1WF3IgIEw')",
                }}
              />
              <div className="absolute -bottom-1 -right-1 flex items-center justify-center size-6 rounded-full bg-hackviolet-gradient border-2 border-white text-white">
                <span className="material-symbols-outlined text-[14px] font-bold">
                  medical_services
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-bold leading-tight">Dr. Sarah Smith</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Oct 24, 2:30 PM</p>
              <p className="text-slate-400 text-xs">Cardiology Clinic</p>
            </div>
          </div>
        </section>

        {/* Visit summary */}
        <section className="flex flex-col gap-3">
          <h3 className="text-lg font-bold px-1 text-slate-800">Visit Summary</h3>

          {/* Audio player card */}
          <div className="flex flex-col gap-3 rounded-2xl bg-slate-900 p-5 shadow-lg shadow-slate-200">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <p className="text-white text-base font-bold leading-tight">
                  Listen to AI Summary
                </p>
                <p className="text-slate-400 text-xs font-normal mt-1">
                  Generated from visit audio
                </p>
              </div>
              {/* TODO: Wire up audio playback functionality */}
              <button className="flex shrink-0 items-center justify-center rounded-full size-12 bg-hackviolet-gradient text-white shadow-lg transition-transform active:scale-95">
                <span
                  className="material-symbols-outlined text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </button>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <div className="flex h-8 items-center justify-center gap-[3px]">
                <div className="w-1 h-3 rounded-full bg-purple-400/40" />
                <div className="w-1 h-5 rounded-full bg-purple-400/60" />
                <div className="w-1 h-3 rounded-full bg-purple-400/40" />
                <div className="w-1 h-6 rounded-full bg-purple-400" />
                <div className="w-1 h-4 rounded-full bg-pink-400/50" />
                <div className="w-1 h-3 rounded-full bg-pink-400/30" />
                <div className="w-1 h-5 rounded-full bg-pink-400/70" />
                <div className="w-1 h-7 rounded-full bg-pink-400" />
                <div className="w-1 h-4 rounded-full bg-pink-400/50" />
                <div className="w-1 h-3 rounded-full bg-white/20" />
                <div className="w-1 h-2 rounded-full bg-white/20" />
                <div className="w-1 h-4 rounded-full bg-white/20" />
                <div className="w-1 h-2 rounded-full bg-white/20" />
                <div className="w-1 h-3 rounded-full bg-white/20" />
                <div className="w-1 h-2 rounded-full bg-white/20" />
                <div className="w-1 h-2 rounded-full bg-white/20" />
                <div className="w-1 h-3 rounded-full bg-white/20" />
                <div className="w-1 h-2 rounded-full bg-white/20" />
                <div className="w-1 h-4 rounded-full bg-white/20" />
                <div className="w-1 h-2 rounded-full bg-white/20" />
                <div className="w-1 h-2 rounded-full bg-white/20" />
                <div className="w-1 h-3 rounded-full bg-white/20" />
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 tracking-wider">
                <span>02:14</span>
                <span>05:30</span>
              </div>
            </div>
          </div>

          {/* Summary text */}
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
            <p className="text-base font-normal leading-relaxed text-slate-600">
              The doctor confirmed your blood pressure is currently stable, which is great news.
              They suggested increasing your daily fiber intake to help with digestion and have
              prescribed a low-dose statin to manage cholesterol levels effectively moving forward.
            </p>
          </div>
        </section>

        {/* Next steps */}
        <section className="flex flex-col gap-3">
          <h3 className="text-lg font-bold px-1 text-slate-800">Next Steps</h3>
          <div className="flex flex-col rounded-2xl bg-white p-2 shadow-sm border border-slate-100 divide-y divide-slate-50">
            <label className="group flex items-start gap-4 p-4 cursor-pointer">
              <div className="relative flex items-center mt-0.5">
                <input
                  className="peer size-6 appearance-none rounded-lg border-2 border-slate-200 bg-transparent checked:border-0 transition-all"
                  type="checkbox"
                />
                <div className="absolute inset-0 hidden peer-checked:flex items-center justify-center rounded-lg bg-hackviolet-gradient pointer-events-none">
                  <span className="material-symbols-outlined text-white text-[18px] font-bold">
                    check
                  </span>
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <span className="text-base font-semibold text-slate-900 group-hover:text-hackviolet-start transition-colors">
                  Pick up prescription
                </span>
                <span className="text-sm text-slate-500">
                  Atorvastatin 10mg ready at pharmacy.
                </span>
              </div>
            </label>

            <label className="group flex items-start gap-4 p-4 cursor-pointer">
              <div className="relative flex items-center mt-0.5">
                <input
                  className="peer size-6 appearance-none rounded-lg border-2 border-slate-200 bg-transparent checked:border-0 transition-all"
                  type="checkbox"
                />
                <div className="absolute inset-0 hidden peer-checked:flex items-center justify-center rounded-lg bg-hackviolet-gradient pointer-events-none">
                  <span className="material-symbols-outlined text-white text-[18px] font-bold">
                    check
                  </span>
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <span className="text-base font-semibold text-slate-900 group-hover:text-hackviolet-start transition-colors">
                  Schedule Lab Work
                </span>
                <span className="text-sm text-slate-500">
                  Lipid panel blood draw for Nov 15th.
                </span>
              </div>
            </label>

            <label className="group flex items-start gap-4 p-4 cursor-pointer">
              <div className="relative flex items-center mt-0.5">
                <input
                  defaultChecked
                  className="peer size-6 appearance-none rounded-lg border-2 border-slate-200 bg-transparent checked:border-0 transition-all"
                  type="checkbox"
                />
                <div className="absolute inset-0 hidden peer-checked:flex items-center justify-center rounded-lg bg-hackviolet-gradient pointer-events-none">
                  <span className="material-symbols-outlined text-white text-[18px] font-bold">
                    check
                  </span>
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <span className="text-base font-semibold text-slate-400 line-through">
                  Book follow-up
                </span>
                <span className="text-sm text-slate-300 line-through">
                  Appointment set for Dec 10th.
                </span>
              </div>
            </label>
          </div>
        </section>

        {/* Medical terms */}
        <section className="flex flex-col gap-3 pb-12">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-slate-800">Medical Terms Explained</h3>
            <button className="text-hackviolet-start text-sm font-bold">View all</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 snap-x">
            <div className="snap-center shrink-0 w-[240px] flex flex-col gap-3 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-slate-50">
                  <span className="material-symbols-outlined text-[22px] text-hackviolet-gradient">
                    pill
                  </span>
                </div>
                <span className="font-bold text-base text-slate-800">Statin</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                A class of drugs often prescribed by doctors to help lower cholesterol levels in the
                blood.
              </p>
            </div>
            <div className="snap-center shrink-0 w-[240px] flex flex-col gap-3 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-slate-50">
                  <span className="material-symbols-outlined text-[22px] text-hackviolet-gradient">
                    monitor_heart
                  </span>
                </div>
                <span className="font-bold text-base text-slate-800">Hypertension</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Another name for high blood pressure. It can lead to severe health complications.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating CTA */}
      <div className="fixed bottom-8 left-0 right-0 z-30 flex justify-center px-4 pointer-events-none">
        <button className="pointer-events-auto shadow-xl shadow-pink-500/20 flex items-center justify-center gap-3 h-14 pl-5 pr-7 bg-hackviolet-gradient rounded-full text-white font-bold text-base hover:scale-[1.02] active:scale-95 transition-all">
          <span className="material-symbols-outlined">forum</span>
          Ask a Follow-up Question
        </button>
      </div>

      {/* Bottom fade */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-light to-transparent pointer-events-none z-10" />
    </div>
  );
}
