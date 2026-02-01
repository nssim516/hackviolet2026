import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

type AppointmentEntry = {
  id: string;
  dateLabel: string;
  doctor: string;
  specialty: string;
  summary: string;
  icon: string;
  accent: "violet" | "pink";
};

type JournalEntry = {
  id: string;
  dateLabel: string;
  mood: string | null;
  text: string;
};

const APPOINTMENTS: AppointmentEntry[] = [
  {
    id: "appt-2022-01-02",
    dateLabel: "Jan 3",
    doctor: "Dr. Emily Chen",
    specialty: "Cardiology",
    summary:
      "Discussed blood pressure medication adjustments. Next follow-up scheduled for 3 months.",
    icon: "cardiology",
    accent: "violet",
  },
  {
    id: "appt-2022-01-02",
    dateLabel: "Jan 3",
    doctor: "Dr. Emily Chen",
    specialty: "Cardiology",
    summary:
      "Discussed blood pressure medication adjustments. Next follow-up scheduled for 3 months.",
    icon: "cardiology",
    accent: "violet",
  },
  {
    id: "appt-2025-09-11",
    dateLabel: "Sep 11",
    doctor: "Dr. Mark Solis",
    specialty: "General Practitioner",
    summary: "Annual physical completed. All vitals normal. Recommended starting Vitamin D.",
    icon: "stethoscope",
    accent: "pink",
  },
];

const JOURNAL_STORAGE_KEY = "hackviolet.journal.entries.v1";

const SEED_ENTRIES: JournalEntry[] = [
  {
    id: "note-2026-01-29",
    dateLabel: "Jan 29, 2026",
    mood: "Steady",
    text: "Woke up less dizzy. Logged BP twice and it felt stable.",
  },
  {
    id: "note-2026-01-25",
    dateLabel: "Jan 25, 2026",
    mood: "Anxious",
    text: "A little nervous before the cardiology appointment. Need to ask about meds timing.",
  },
];

const MOODS = [
  { label: "Calm", icon: "sentiment_satisfied" },
  { label: "Anxious", icon: "sentiment_worried" },
  { label: "Pain", icon: "healing" },
  { label: "Steady", icon: "self_improvement" },
];

const formatFullDate = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function HealthJournalTimeline() {
  const navigate = useNavigate();
  const [journalText, setJournalText] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const todayLabel = useMemo(() => formatFullDate(new Date()), []);

  useEffect(() => {
    const stored = localStorage.getItem(JOURNAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as JournalEntry[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
          return;
        }
      } catch {
        // Ignore storage parse errors and fall back to seed data.
      }
    }
    setEntries(SEED_ENTRIES);
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
    }
  }, [entries]);

  const handleSaveEntry = () => {
    if (!journalText.trim()) {
      setStatusMessage("Add a few words before saving.");
      return;
    }
    const newEntry: JournalEntry = {
      id: `note-${Date.now()}`,
      dateLabel: todayLabel,
      mood: selectedMood,
      text: journalText.trim(),
    };
    setEntries((prev) => [newEntry, ...prev]);
    setJournalText("");
    setSelectedMood(null);
    setStatusMessage("Saved to your journal.");
    window.setTimeout(() => setStatusMessage(null), 1800);
  };

  return (
    <div className="bg-background-light min-h-screen flex flex-col overflow-x-hidden">
      {/* Hamburger drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-[280px] bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer header */}
              <div className="px-5 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-hack-violet/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-hack-violet">favorite</span>
                  </div>
                  <span className="text-lg font-extrabold gradient-text tracking-tight">
                    HealthiHer
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-slate-100 transition-colors text-slate-400"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-3 px-3">
                {MENU_ITEMS.map((item) => (
                  <button
                    key={item.to}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate(item.to);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold text-slate-700 hover:bg-hack-violet/5 hover:text-hack-violet transition-colors"
                  >
                    <span className="material-symbols-outlined text-[22px] text-slate-400">
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-5 py-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="relative overflow-hidden w-9 h-9 rounded-full bg-slate-200 ring-2 ring-white">
                    <img
                      alt="User avatar"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP3xYuUXZOKXOoIlmBuFJ10zmQt3yiJsNOoLn9J-_xXRsQtM9kmT7lUlQA3rcMZqaTACNFFz7PqTkhL1vMql68caAw3ltGNPxDQpkTG5n5vR7bB3tIslV7SB26bPEYZIXpFSkKbeC0n2G-aTEE2TPgapLfUKEvxAU47Jh8Mxp2omyl4dp1r80K0LjvvdUs3SDC9cu9q1Mn4IkwJCjPkJt65emRddpd7pe4cNAL8THqlj1CB5GPjnS65GN_Kxq0uutLofuWDUSpb4ob"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">Sarah</p>
                    <p className="text-xs text-slate-400 truncate">name@example.com</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-background-light/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200/50 transition-colors text-slate-600"
            >
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
            {todayLabel}
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
            value={journalText}
            onChange={(event) => setJournalText(event.target.value)}
          />
          <div className="mt-5 flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {MOODS.map((mood) => {
              const isActive = selectedMood === mood.label;
              return (
                <button
                  key={mood.label}
                  className={`group flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl pl-3 pr-4 transition-all active:scale-95 ${
                    isActive
                      ? "gradient-bg text-white shadow-lg shadow-hack-violet/20"
                      : "bg-slate-50 hover:bg-slate-100"
                  }`}
                  type="button"
                  onClick={() => setSelectedMood(mood.label)}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {mood.icon}
                  </span>
                  <span className={`text-sm ${isActive ? "font-bold" : "font-medium text-slate-600"}`}>
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold text-slate-400">
              {selectedMood ? `Mood: ${selectedMood}` : "Optional mood tag"}
            </p>
            <button
              className="text-sm font-bold text-white rounded-xl px-4 py-2 gradient-bg shadow-lg shadow-hack-violet/20 transition-all active:scale-95"
              type="button"
              onClick={handleSaveEntry}
            >
              Save entry
            </button>
          </div>
          {statusMessage ? (
            <p className="mt-3 text-xs font-semibold text-slate-500">{statusMessage}</p>
          ) : null}
        </section>

        {/* Recent notes header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-xl font-bold text-slate-900">Notes</h3>
          <button
            className="text-sm font-bold gradient-text"
            type="button"
            onClick={() => setShowAllNotes((prev) => !prev)}
          >
            {showAllNotes ? "Show Less" : "See All"}
          </button>
        </div>

        <section className="mb-10 space-y-3">
          {(showAllNotes ? entries : entries.slice(0, 3)).map((entry) => (
            <article
              key={entry.id}
              className="bg-white rounded-2xl border border-slate-100 p-4 shadow-[0_6px_20px_rgb(0,0,0,0.03)]"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {entry.dateLabel}
                </p>
                {entry.mood ? (
                  <span className="text-xs font-bold text-hack-violet bg-hack-violet/10 px-2 py-1 rounded-full">
                    {entry.mood}
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{entry.text}</p>
            </article>
          ))}
        </section>

        {/* Recent history header */}
        <div className="flex items-center justify-between mb-6 px-1">
          <h3 className="text-xl font-bold text-slate-900">History</h3>
          {/* <button className="text-sm font-bold gradient-text">See All</button> */}
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
