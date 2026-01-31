import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const STORAGE_KEY = "healthiher-profile";

interface ProfileData {
  name: string;
  email: string;
  heartRate: string;
  bloodType: string;
  medications: string[];
  cycleLength: string;
  lastPeriod: string;
  height: string;
  weight: string;
  age: string;
}

const DEFAULTS: ProfileData = {
  name: "Sarah",
  email: "name@example.com",
  heartRate: "72",
  bloodType: "O+",
  medications: ["Atorvastatin 10mg", "Vitamin D 1000IU"],
  cycleLength: "28",
  lastPeriod: "2026-01-15",
  height: "5'6\"",
  weight: "135",
  age: "28",
};

function cycleDayFromLastPeriod(lastPeriod: string): number | null {
  if (!lastPeriod) return null;
  const last = new Date(lastPeriod + "T00:00:00");
  if (isNaN(last.getTime())) return null;
  const diff = Math.floor((Date.now() - last.getTime()) / 86400000);
  return diff >= 0 ? diff + 1 : null;
}

function nextPeriodDate(lastPeriod: string, cycleLength: string): string | null {
  if (!lastPeriod || !cycleLength) return null;
  const last = new Date(lastPeriod + "T00:00:00");
  const len = parseInt(cycleLength, 10);
  if (isNaN(last.getTime()) || isNaN(len) || len <= 0) return null;
  const next = new Date(last.getTime() + len * 86400000);
  return next.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function Profile() {
  const [view, setView] = useState<"profile" | "settings">("profile");
  const [data, setData] = useState<ProfileData>(DEFAULTS);
  const [medInput, setMedInput] = useState("");
  const [saveFlash, setSaveFlash] = useState(false);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setData((prev) => ({ ...prev, ...parsed }));
    } catch { /* ignore */ }
  }, []);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1500);
  };

  const addMedication = () => {
    const trimmed = medInput.trim();
    if (!trimmed) return;
    setData((prev) => ({ ...prev, medications: [...prev.medications, trimmed] }));
    setMedInput("");
  };

  const removeMedication = (idx: number) => {
    setData((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== idx),
    }));
  };

  const cycleDay = cycleDayFromLastPeriod(data.lastPeriod);
  const nextPeriod = nextPeriodDate(data.lastPeriod, data.cycleLength);

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

          <h1 className="text-base font-bold tracking-tight text-slate-900">
            {view === "settings" ? "Settings" : "Profile"}
          </h1>

          <button
            type="button"
            onClick={() => setView(view === "settings" ? "profile" : "settings")}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              view === "settings"
                ? "bg-hack-violet/10 text-hack-violet"
                : "hover:bg-slate-200/50 text-slate-600"
            }`}
            aria-label={view === "settings" ? "Back to profile" : "Open settings"}
          >
            <span className="material-symbols-outlined">
              {view === "settings" ? "person" : "settings"}
            </span>
          </button>
        </div>
      </header>

      <main className="flex-grow w-full max-w-md mx-auto px-4 pt-6 pb-10 flex flex-col gap-5">
        {view === "profile" ? (
          <>
            {/* User card */}
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
                  <p className="text-lg font-extrabold text-slate-900 leading-tight">{data.name}</p>
                  <p className="text-sm font-medium text-slate-500">{data.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setView("settings")}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
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
            </section>

            {/* Health widgets */}
            <section className="flex flex-col gap-3">
              <h2 className="gradient-text text-sm font-extrabold uppercase tracking-tight px-1">
                Health Overview
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {/* Heart rate */}
                <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-rose-500 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      favorite
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Heart Rate
                    </p>
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900 leading-none">
                    {data.heartRate}
                  </p>
                  <p className="text-xs font-semibold text-slate-400">BPM resting</p>
                </div>

                {/* Blood type */}
                <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-400 text-[20px]">
                      bloodtype
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Blood Type
                    </p>
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900 leading-none">
                    {data.bloodType}
                  </p>
                  <p className="text-xs font-semibold text-slate-400">Type</p>
                </div>
              </div>

              {/* Period cycle */}
              <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-pink-400 text-[20px]">
                    cycle
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Period Cycle
                  </p>
                </div>
                <div className="flex items-end gap-6">
                  <div>
                    <p className="text-3xl font-extrabold text-slate-900 leading-none">
                      {cycleDay !== null ? `Day ${cycleDay}` : "--"}
                    </p>
                    <p className="text-xs font-semibold text-slate-400 mt-1">
                      of {data.cycleLength}-day cycle
                    </p>
                  </div>
                  {nextPeriod && (
                    <div className="flex-1 text-right">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Next expected
                      </p>
                      <p className="text-base font-extrabold text-pink-500 mt-0.5">
                        {nextPeriod}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Medications */}
              <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-hack-violet text-[20px]">
                    medication
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Current Medications
                  </p>
                </div>
                {data.medications.length > 0 ? (
                  <ul className="space-y-2">
                    {data.medications.map((med, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 border border-slate-100"
                      >
                        <span className="text-sm font-semibold text-slate-700">{med}</span>
                        <button
                          type="button"
                          onClick={() => removeMedication(i)}
                          className="text-slate-300 hover:text-red-400 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-400">No medications added yet.</p>
                )}
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={medInput}
                    onChange={(e) => setMedInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addMedication()}
                    placeholder="Add medication..."
                    className="flex-1 text-sm rounded-xl border border-slate-200 px-3 py-2 bg-white focus:ring-2 focus:ring-hack-violet/20 focus:border-transparent outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={addMedication}
                    className="px-3 py-2 rounded-xl bg-hack-violet/10 text-hack-violet text-sm font-bold hover:bg-hack-violet/20 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </section>

            {/* Privacy */}
            <section>
              <div className="rounded-2xl bg-violet-50 border border-violet-100 p-4 flex gap-3 items-start">
                <span className="material-symbols-outlined text-hackviolet-start">verified_user</span>
                <div>
                  <p className="text-sm font-bold text-slate-900">Privacy</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This is a prototype. We'll add real account + data controls next.
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* -------- SETTINGS VIEW -------- */
          <>
            <section className="bg-card-light rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col gap-5">
              <h2 className="gradient-text text-sm font-extrabold uppercase tracking-tight">
                Account
              </h2>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Name</span>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 bg-white focus:ring-2 focus:ring-hack-violet/20 focus:border-transparent outline-none transition-all"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</span>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 bg-white focus:ring-2 focus:ring-hack-violet/20 focus:border-transparent outline-none transition-all"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</span>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-900 bg-white focus:ring-2 focus:ring-hack-violet/20 focus:border-transparent outline-none transition-all"
                />
              </label>
            </section>

            <section className="bg-card-light rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col gap-5">
              <h2 className="gradient-text text-sm font-extrabold uppercase tracking-tight">
                Body Measurements
              </h2>

              <div className="grid grid-cols-3 gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Height</span>
                  <input
                    type="text"
                    value={data.height}
                    onChange={(e) => setData((d) => ({ ...d, height: e.target.value }))}
                    className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 bg-white focus:ring-2 focus:ring-hack-violet/20 focus:border-transparent outline-none transition-all"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weight</span>
                  <input
                    type="text"
                    value={data.weight}
                    onChange={(e) => setData((d) => ({ ...d, weight: e.target.value }))}
                    placeholder="lbs"
                    className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 bg-white focus:ring-2 focus:ring-hack-violet/20 focus:border-transparent outline-none transition-all"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Age</span>
                  <input
                    type="text"
                    value={data.age}
                    onChange={(e) => setData((d) => ({ ...d, age: e.target.value }))}
                    className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 bg-white focus:ring-2 focus:ring-hack-violet/20 focus:border-transparent outline-none transition-all"
                  />
                </label>
              </div>
            </section>

            <section className="bg-card-light rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col gap-5">
              <h2 className="gradient-text text-sm font-extrabold uppercase tracking-tight">
                Health Info
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Heart Rate (BPM)</span>
                  <input
                    type="text"
                    value={data.heartRate}
                    onChange={(e) => setData((d) => ({ ...d, heartRate: e.target.value }))}
                    className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 bg-white focus:ring-2 focus:ring-hack-violet/20 focus:border-transparent outline-none transition-all"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Type</span>
                  <select
                    value={data.bloodType}
                    onChange={(e) => setData((d) => ({ ...d, bloodType: e.target.value }))}
                    className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 bg-white focus:ring-2 focus:ring-hack-violet/20 focus:border-transparent outline-none transition-all"
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cycle Length (Days)</span>
                  <input
                    type="number"
                    value={data.cycleLength}
                    onChange={(e) => setData((d) => ({ ...d, cycleLength: e.target.value }))}
                    className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 bg-white focus:ring-2 focus:ring-hack-violet/20 focus:border-transparent outline-none transition-all"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Last Period</span>
                  <input
                    type="date"
                    value={data.lastPeriod}
                    onChange={(e) => setData((d) => ({ ...d, lastPeriod: e.target.value }))}
                    className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-900 bg-white focus:ring-2 focus:ring-hack-violet/20 focus:border-transparent outline-none transition-all"
                  />
                </label>
              </div>
            </section>

            {/* Save button */}
            <button
              type="button"
              onClick={() => { save(); setView("profile"); }}
              className="w-full gradient-bg text-white font-extrabold text-lg py-4 rounded-2xl shadow-xl shadow-hack-violet/20 flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
            >
              {saveFlash ? "Saved!" : "Save Changes"}
            </button>
          </>
        )}
      </main>

      {/* Bottom nav */}
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
            <span className="text-[10px] font-semibold">Visit</span>
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
