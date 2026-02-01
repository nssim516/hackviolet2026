import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVisitInsights } from "../state/visitInsights";

export default function MedicalTermsAll() {
  const navigate = useNavigate();
  const { medicalTerms } = useVisitInsights();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return medicalTerms;
    return medicalTerms.filter(
      (t) => t.term.toLowerCase().includes(q) || t.explanation.toLowerCase().includes(q)
    );
  }, [medicalTerms, query]);

  return (
    <div className="bg-background-light min-h-screen flex flex-col overflow-x-hidden pb-24">
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-background-light/90 backdrop-blur-md">
        <button
          className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          type="button"
          onClick={() => navigate("/summary")}
          aria-label="Back to visit insights"
        >
          <span className="material-symbols-outlined text-slate-900">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight">Medical terms</h1>
        <div className="size-10" />
      </header>

      <main className="flex flex-col gap-4 px-4 pt-2">
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Search
          </label>
          <div className="mt-2 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: statin, hypertension, MRI…"
              className="w-full rounded-2xl border border-slate-200 bg-white focus:border-hackviolet-start focus:ring-2 focus:ring-hackviolet-start/15 h-12 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 text-sm font-medium transition-all"
            />
          </div>
        </div>

        {filtered.length ? (
          <div className="flex flex-col gap-3">
            {filtered.map((t, i) => (
              <div
                key={`${t.term}-${i}`}
                className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-50">
                    <span className="material-symbols-outlined text-[22px] text-hackviolet-gradient">
                      local_library
                    </span>
                  </div>
                  <div>
                    <p className="text-base font-extrabold text-slate-900">{t.term}</p>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{t.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6">
            <p className="text-base font-bold text-slate-900">No terms to show</p>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Record a snippet on the Visit Insights page, then we’ll extract and explain any jargon
              here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

