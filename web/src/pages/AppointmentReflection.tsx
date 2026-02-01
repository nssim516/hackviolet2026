import { useNavigate } from "react-router-dom";

export default function AppointmentReflection() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-100">
        <button
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          type="button"
          onClick={() => navigate("/summary")}
          aria-label="Back to visit insights"
        >
          <span className="material-symbols-outlined text-slate-900" style={{ fontSize: 24 }}>
            arrow_back
          </span>
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">
          Reflection
        </h2>
        <button className="flex h-10 px-2 items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
          <p className="text-slate-400 text-base font-bold">Skip</p>
        </button>
      </div>

      <div className="flex flex-col gap-6 p-4">
        {/* Doctor card */}
        <div className="w-full rounded-xl bg-surface-card p-4 shadow-sm border border-slate-100">
          <div className="flex gap-4 items-center">
            <div className="relative shrink-0">
              {/* TODO: Replace with actual doctor avatar component or local image */}
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full h-16 w-16 border-2 border-hackviolet-start/10"
                role="img"
                aria-label="Doctor profile portrait"
                style={{
                  backgroundImage:
                    'url("https://upload.wikimedia.org/wikipedia/commons/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg")',
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                <span
                  className="material-symbols-outlined text-hackviolet-start text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-slate-900 text-lg font-bold leading-tight">Dr. Sarah Smith</p>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Cardiology &bull; Today, 10:30 AM
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-hackviolet-end" />
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
                  Follow-up Visit
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reflection prompt */}
        <div className="px-1">
          <h1 className="text-slate-900 text-2xl font-bold leading-tight tracking-tight mb-2">
            How did it go?
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Take a moment to reflect on your visit. Your insights are private and help us prepare
            you for next time.
          </p>
        </div>

        {/* Sliders */}
        <div className="flex flex-col gap-6">
          {/* "Did you feel heard?" slider */}
          <div className="rounded-xl bg-surface-card p-5 shadow-sm border border-slate-100">
            <div className="flex justify-between items-end mb-4">
              <p className="text-slate-900 text-base font-bold">Did you feel heard?</p>
              <span className="text-2xl">&#128066;</span>
            </div>
            {/* TODO: Replace with a real range input or slider component for interactivity */}
            <div className="relative w-full h-6 flex items-center">
              <div className="absolute w-full h-1.5 bg-slate-100 rounded-full" />
              <div className="absolute h-1.5 bg-hackviolet-gradient rounded-full" style={{ width: "75%" }} />
              <div
                className="absolute h-6 w-6 rounded-full bg-white border-[3px] border-hackviolet-end shadow-md cursor-pointer -translate-x-1/2 flex items-center justify-center"
                style={{ left: "75%" }}
              >
                <div className="h-1.5 w-1.5 bg-hackviolet-end rounded-full" />
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                Not really
              </p>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                Very much
              </p>
            </div>
          </div>

          {/* "Clarity of next steps?" slider */}
          <div className="rounded-xl bg-surface-card p-5 shadow-sm border border-slate-100">
            <div className="flex justify-between items-end mb-4">
              <p className="text-slate-900 text-base font-bold">Clarity of next steps?</p>
              <span className="text-2xl">&#10024;</span>
            </div>
            {/* TODO: Replace with a real range input or slider component for interactivity */}
            <div className="relative w-full h-6 flex items-center">
              <div className="absolute w-full h-1.5 bg-slate-100 rounded-full" />
              <div className="absolute h-1.5 bg-hackviolet-gradient rounded-full" style={{ width: "40%" }} />
              <div
                className="absolute h-6 w-6 rounded-full bg-white border-[3px] border-hackviolet-start shadow-md cursor-pointer -translate-x-1/2 flex items-center justify-center"
                style={{ left: "40%" }}
              >
                <div className="h-1.5 w-1.5 bg-hackviolet-start rounded-full" />
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                Confused
              </p>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                Crystal clear
              </p>
            </div>
          </div>
        </div>

        {/* Communication concerns */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="px-1">
            <h3 className="text-slate-900 text-lg font-bold">Communication Concerns</h3>
            <p className="text-slate-500 text-sm mt-1">
              Select any areas where you struggled.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button className="px-4 py-2.5 rounded-full bg-hackviolet-gradient text-white font-bold text-sm shadow-md flex items-center gap-2">
              <span>Felt rushed</span>
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
            <button className="px-4 py-2.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-sm border border-slate-200 hover:bg-slate-200 transition-colors">
              Confused by jargon
            </button>
            <button className="px-4 py-2.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-sm border border-slate-200 hover:bg-slate-200 transition-colors">
              Forgot questions
            </button>
            <button className="px-4 py-2.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-sm border border-slate-200 hover:bg-slate-200 transition-colors">
              Hard to hear
            </button>
            <button className="px-4 py-2.5 rounded-full bg-slate-100 text-slate-600 font-semibold text-sm border border-slate-200 hover:bg-slate-200 transition-colors">
              Interrupted
            </button>
          </div>
        </div>

        {/* AI note */}
        <div className="mt-2 rounded-xl bg-violet-50 border border-violet-100 p-5 flex gap-4 items-start shadow-sm">
          <div className="bg-hackviolet-gradient p-2 rounded-lg shrink-0 text-white shadow-sm">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <div>
            <p className="text-slate-900 text-sm font-bold mb-1">AI Assistant Note</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              It&rsquo;s common to feel rushed during follow-ups. I&rsquo;ve noted this so we can
              prioritize your top 2 questions immediately next time.
            </p>
          </div>
        </div>

        {/* Voice note button */}
        <div className="flex items-center justify-center py-4">
          <button className="group flex flex-col items-center gap-2 transition-all">
            <div className="bg-white border border-slate-100 p-4 rounded-full shadow-sm group-active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[24px] text-hackviolet-start">
                mic
              </span>
            </div>
            <span className="font-bold text-xs text-slate-400 uppercase tracking-widest">
              Add a voice note
            </span>
          </button>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white to-transparent pt-12">
        <button className="w-full bg-hackviolet-gradient text-white font-extrabold text-lg h-14 rounded-2xl shadow-xl shadow-hackviolet-start/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
          <span>Save Reflection</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
