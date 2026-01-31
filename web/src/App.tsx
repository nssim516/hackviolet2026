import { useState } from "react";
import WelcomeSignIn from "./pages/WelcomeSignIn";
import HealthJournalTimeline from "./pages/HealthJournalTimeline";
import PrepareForAppointment from "./pages/PrepareForAppointment";
import AppointmentAssistant from "./pages/AppointmentAssistant";
import AppointmentReflection from "./pages/AppointmentReflection";
import VisitSummaryInsights from "./pages/VisitSummaryInsights";

const pages = [
  { label: "Sign In", component: WelcomeSignIn },
  { label: "Journal", component: HealthJournalTimeline },
  { label: "Prepare", component: PrepareForAppointment },
  { label: "Assistant", component: AppointmentAssistant },
  { label: "Reflection", component: AppointmentReflection },
  { label: "Summary", component: VisitSummaryInsights },
] as const;

export default function App() {
  const [current, setCurrent] = useState(0);
  const Page = pages[current].component;

  return (
    <div className="min-h-screen bg-background-light">
      {/* Dev nav bar - screen switcher */}
      <div className="sticky top-0 z-[100] bg-slate-900/95 backdrop-blur text-white px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar">
        {pages.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setCurrent(i)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              i === current
                ? "bg-hack-violet text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <Page />
    </div>
  );
}
