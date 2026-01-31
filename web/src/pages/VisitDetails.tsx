import { useNavigate, useParams } from "react-router-dom";

interface VisitData {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  icon: string;
  accentColor: string;
  accentBg: string;
  summary: string;
  diagnoses: string[];
  vitals: { label: string; value: string; unit: string; icon: string }[];
  medications: { name: string; dosage: string; instruction: string; change?: string }[];
  nextSteps: { title: string; detail: string; done: boolean }[];
  notes: string;
}

const VISITS: Record<string, VisitData> = {
  "1": {
    id: "1",
    doctor: "Dr. Emily Chen",
    specialty: "Cardiology",
    date: "January 2, 2026",
    time: "2:30 PM",
    location: "HeartCare Clinic",
    icon: "cardiology",
    accentColor: "text-hack-violet",
    accentBg: "bg-hack-violet/10",
    summary:
      "Discussed blood pressure medication adjustments. Current Atorvastatin dosage reviewed and deemed appropriate. Blood pressure slightly elevated at 138/88. Recommended lifestyle changes alongside medication adjustment. Next follow-up scheduled for 3 months.",
    diagnoses: ["Stage 1 Hypertension", "Hyperlipidemia (managed)"],
    vitals: [
      { label: "Blood Pressure", value: "138/88", unit: "mmHg", icon: "vital_signs" },
      { label: "Heart Rate", value: "72", unit: "BPM", icon: "favorite" },
      { label: "Cholesterol", value: "195", unit: "mg/dL", icon: "water_drop" },
      { label: "Weight", value: "135", unit: "lbs", icon: "monitor_weight" },
    ],
    medications: [
      {
        name: "Atorvastatin",
        dosage: "10 mg",
        instruction: "Once daily at bedtime",
      },
      {
        name: "Lisinopril",
        dosage: "10 mg",
        instruction: "Once daily in the morning",
        change: "New prescription",
      },
    ],
    nextSteps: [
      { title: "Start Lisinopril 10 mg daily", detail: "Take in the morning with water", done: false },
      { title: "Monitor blood pressure at home", detail: "Record readings twice daily for 2 weeks", done: false },
      { title: "Reduce sodium intake", detail: "Aim for less than 2,300 mg per day", done: false },
      { title: "Schedule follow-up in 3 months", detail: "Re-check BP and cholesterol levels", done: false },
    ],
    notes:
      "Patient reported occasional lightheadedness in the mornings. Advised to rise slowly from bed. No chest pain or shortness of breath reported. Continue current exercise routine of 30 min walking 4x/week.",
  },
  "2": {
    id: "2",
    doctor: "Dr. Mark Solis",
    specialty: "General Practitioner",
    date: "September 12, 2025",
    time: "10:00 AM",
    location: "Wellness Primary Care",
    icon: "stethoscope",
    accentColor: "text-hack-pink",
    accentBg: "bg-hack-pink/10",
    summary:
      "Annual physical completed. All vitals within normal range. Blood work came back healthy. Recommended starting Vitamin D supplementation due to low levels detected. Overall health is good with no major concerns.",
    diagnoses: ["Vitamin D Deficiency (mild)", "Routine wellness exam — no concerns"],
    vitals: [
      { label: "Blood Pressure", value: "118/76", unit: "mmHg", icon: "vital_signs" },
      { label: "Heart Rate", value: "68", unit: "BPM", icon: "favorite" },
      { label: "BMI", value: "21.8", unit: "kg/m²", icon: "monitor_weight" },
      { label: "Vitamin D", value: "22", unit: "ng/mL", icon: "sunny" },
    ],
    medications: [
      {
        name: "Vitamin D3",
        dosage: "1000 IU",
        instruction: "Once daily with food",
        change: "New recommendation",
      },
    ],
    nextSteps: [
      { title: "Start Vitamin D 1000 IU daily", detail: "Take with a meal for better absorption", done: true },
      { title: "Continue routine exercise", detail: "Maintain 150 min/week of moderate activity", done: false },
      { title: "Schedule annual physical next year", detail: "Book for September 2026", done: false },
    ],
    notes:
      "Patient is in good overall health. All standard screenings completed. Flu shot administered during visit. Discussed importance of sun exposure and dietary sources of Vitamin D. No family history changes reported.",
  },
};

export default function VisitDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const visit = id ? VISITS[id] : undefined;

  if (!visit) {
    return (
      <div className="bg-background-light min-h-screen flex flex-col items-center justify-center px-4">
        <span className="material-symbols-outlined text-[48px] text-slate-300 mb-4">search_off</span>
        <p className="text-lg font-bold text-slate-700">Visit not found</p>
        <button
          type="button"
          onClick={() => navigate("/journal")}
          className="mt-6 gradient-bg text-white font-bold px-6 py-3 rounded-full"
        >
          Back to Journal
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background-light min-h-screen flex flex-col overflow-x-hidden pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-background-light/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/journal")}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-200/50 transition-colors text-slate-600"
            aria-label="Back to journal"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-900">Visit Details</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-grow w-full max-w-md mx-auto px-4 pt-6 pb-10 flex flex-col gap-5">
        {/* Doctor card */}
        <section className="bg-card-light rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
          <div className="flex items-center gap-4">
            <div className={`h-14 w-14 rounded-full ${visit.accentBg} flex items-center justify-center shrink-0`}>
              <span className={`material-symbols-outlined ${visit.accentColor} text-[28px]`}>
                {visit.icon}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">{visit.doctor}</h2>
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide mt-0.5">
                {visit.specialty}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-slate-400">calendar_today</span>
              {visit.date}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-slate-400">schedule</span>
              {visit.time}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            {visit.location}
          </div>
        </section>

        {/* Visit summary */}
        <section className="flex flex-col gap-3">
          <h3 className="gradient-text text-sm font-extrabold uppercase tracking-tight px-1">
            Visit Summary
          </h3>
          <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-700 leading-relaxed">{visit.summary}</p>
          </div>
        </section>

        {/* Diagnoses */}
        <section className="flex flex-col gap-3">
          <h3 className="gradient-text text-sm font-extrabold uppercase tracking-tight px-1">
            Diagnoses &amp; Conditions
          </h3>
          <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
            <ul className="space-y-3">
              {visit.diagnoses.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-hack-violet text-[20px] mt-0.5">
                    clinical_notes
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Vitals */}
        <section className="flex flex-col gap-3">
          <h3 className="gradient-text text-sm font-extrabold uppercase tracking-tight px-1">
            Vitals Recorded
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {visit.vitals.map((v, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-4 border border-slate-100 shadow-sm flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-[18px] text-hack-violet"
                    style={v.icon === "favorite" ? { fontVariationSettings: "'FILL' 1", color: "#f43f5e" } : undefined}
                  >
                    {v.icon}
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {v.label}
                  </p>
                </div>
                <p className="text-2xl font-extrabold text-slate-900 leading-none">{v.value}</p>
                <p className="text-xs font-semibold text-slate-400">{v.unit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Medications */}
        <section className="flex flex-col gap-3">
          <h3 className="gradient-text text-sm font-extrabold uppercase tracking-tight px-1">
            Medications
          </h3>
          <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm space-y-4">
            {visit.medications.map((med, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 border border-slate-100"
              >
                <span className="material-symbols-outlined text-hack-violet text-[22px] mt-0.5">
                  medication
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-900">{med.name}</p>
                    <span className="text-xs font-semibold text-slate-400">{med.dosage}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{med.instruction}</p>
                  {med.change && (
                    <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-widest text-white bg-hackviolet-gradient px-2 py-0.5 rounded-full">
                      {med.change}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next steps */}
        <section className="flex flex-col gap-3">
          <h3 className="gradient-text text-sm font-extrabold uppercase tracking-tight px-1">
            Follow-Up &amp; Next Steps
          </h3>
          <div className="rounded-2xl bg-white p-2 border border-slate-100 shadow-sm divide-y divide-slate-50">
            {visit.nextSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-4">
                <div className="relative flex items-center mt-0.5">
                  <div
                    className={`size-6 rounded-lg flex items-center justify-center ${
                      step.done
                        ? "bg-hackviolet-gradient"
                        : "border-2 border-slate-200"
                    }`}
                  >
                    {step.done && (
                      <span className="material-symbols-outlined text-white text-[18px] font-bold">
                        check
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <span
                    className={`text-sm font-semibold ${
                      step.done ? "text-slate-400 line-through" : "text-slate-900"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span
                    className={`text-xs ${
                      step.done ? "text-slate-300 line-through" : "text-slate-500"
                    }`}
                  >
                    {step.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Doctor's notes */}
        <section className="flex flex-col gap-3">
          <h3 className="gradient-text text-sm font-extrabold uppercase tracking-tight px-1">
            Doctor's Notes
          </h3>
          <div className="rounded-2xl bg-white p-5 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-700 leading-relaxed">{visit.notes}</p>
          </div>
        </section>

        {/* Reflection CTA */}
        <button
          type="button"
          onClick={() => navigate("/reflection")}
          className="w-full gradient-bg text-white font-extrabold text-base py-4 rounded-2xl shadow-xl shadow-hack-violet/20 flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">rate_review</span>
          Write a Reflection
        </button>
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 w-full z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200/50">
        <div className="max-w-md mx-auto h-[84px] pb-6 flex justify-around items-center px-4">
          <button
            type="button"
            onClick={() => navigate("/journal")}
            className="flex flex-col items-center gap-1 w-16 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[28px]">book_2</span>
            <span className="text-[10px] font-semibold">Journal</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/summary")}
            className="flex flex-col items-center gap-1 w-16 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[28px]">insights</span>
            <span className="text-[10px] font-semibold">Visit</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center gap-1 w-16 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[28px]">person</span>
            <span className="text-[10px] font-semibold">Profile</span>
          </button>
        </div>
      </nav>

      {/* Bottom fade */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light to-transparent pointer-events-none z-30 opacity-90" />
    </div>
  );
}
