export default function PrepareForAppointment() {
  return (
    <div className="relative flex h-full w-full flex-col max-w-md mx-auto overflow-hidden min-h-screen pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100">
        <button className="text-text-dark flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Prepare for Appointment
        </h2>
        <button className="flex w-12 items-center justify-end group">
          <p className="text-hack-violet hover:text-hack-pink transition-colors text-base font-bold leading-normal tracking-[0.015em] shrink-0">
            Save
          </p>
        </button>
      </header>

      {/* Doctor profile */}
      <div className="pt-6 px-4 pb-2">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="size-20 rounded-full overflow-hidden bg-gray-100 mb-2 ring-4 ring-white shadow-md">
            {/* TODO: Replace with actual doctor avatar component or local image */}
            <img
              alt="Dr. Smith profile portrait"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCweBfcdNQcpm6c39GxNlGuwYwy_lKOeSPWf580NYkWhp3EUJb5CRwH23ijdgYqJtehoMFNXO0MfvVSJrC5EKYl-KYDOJPWZ7VK3gWD7L7gNx9V4OtbtBhhreWV4YOMRd6O3XqrpXgFqiNWkOrdi6tmMa7KiR2AvBhF70-CbJ1615d0696-wuaXjOAl4_YG98QxNxUaOMX20lgHQ-RLduCiRto-xQsXVnmOVI9vOPZd64c_JOBjoMoivj3zqE_2M21sndzFuzya0RXu"
            />
          </div>
          <h1 className="text-text-dark text-xl font-extrabold tracking-tight">Dr. Sarah Smith</h1>
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white shadow-sm ring-1 ring-gray-100">
            <span className="material-symbols-outlined text-hack-violet text-[16px]">
              calendar_today
            </span>
            <p className="text-gray-600 text-sm font-semibold">Tomorrow, 10:00 AM</p>
          </div>
        </div>
      </div>

      {/* Notes section */}
      <div className="flex flex-col px-4 pt-8 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="gradient-text text-sm font-extrabold leading-tight tracking-tight uppercase">
            Your Notes
          </h2>
          <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-widest">
            Private
          </span>
        </div>

        <div className="mb-5">
          <label className="block relative group">
            <p className="text-gray-500 text-xs font-bold mb-2 pl-1 uppercase tracking-wider">
              Symptoms &amp; Observations
            </p>
            <div className="relative">
              <textarea
                className="w-full resize-none rounded-2xl border-0 bg-white text-text-dark placeholder:text-gray-300 p-5 pb-14 text-base font-medium leading-relaxed shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-hack-violet/20 transition-all min-h-[160px]"
                placeholder="How have you been feeling lately? Any changes in sleep or diet?"
              />
              <button className="absolute bottom-3 right-3 p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-hack-violet transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
            </div>
          </label>
        </div>

        <div>
          <label className="block relative group">
            <p className="text-gray-500 text-xs font-bold mb-2 pl-1 uppercase tracking-wider">
              Appointment Goals
            </p>
            <div className="relative">
              <textarea
                className="w-full resize-none rounded-2xl border-0 bg-white text-text-dark placeholder:text-gray-300 p-5 pb-14 text-base font-medium leading-relaxed shadow-sm ring-1 ring-gray-100 focus:ring-2 focus:ring-hack-violet/20 transition-all min-h-[140px]"
                placeholder="What do you hope to get out of this visit?"
              />
              <button className="absolute bottom-3 right-3 p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-hack-violet transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
            </div>
          </label>
        </div>
      </div>

      {/* Suggested questions */}
      <div className="flex flex-col pt-10 pb-2">
        <div className="px-4 mb-4 flex items-end justify-between">
          <div>
            <h2 className="gradient-text text-sm font-extrabold leading-tight tracking-tight uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-hack-pink text-[20px]">
                auto_awesome
              </span>
              Suggested Questions
            </h2>
            <p className="text-gray-400 text-xs mt-1 font-medium">
              Personalized AI recommendations
            </p>
          </div>
          <button className="text-xs font-bold text-hack-violet hover:text-hack-pink transition-colors">
            View all
          </button>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-6 snap-x snap-mandatory">
          {/* Card 1 */}
          <div className="snap-center shrink-0 w-[280px] bg-white p-6 rounded-3xl shadow-md ring-1 ring-gray-100 relative flex flex-col justify-between h-[200px]">
            <div className="absolute top-5 right-5">
              <button className="text-gray-200 hover:text-yellow-400 transition-colors">
                <span className="material-symbols-outlined text-[24px]">star</span>
              </button>
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                Medication
              </span>
              <p className="text-text-dark font-bold leading-tight text-lg">
                Does this new medication interact with my daily vitamins?
              </p>
            </div>
            <button className="mt-4 flex items-center gap-2 group w-full">
              <div className="size-6 rounded-full border-2 border-gray-200 group-hover:border-hack-violet group-hover:bg-hack-violet/5 transition-all flex items-center justify-center">
                <span className="material-symbols-outlined text-transparent group-hover:text-hack-violet text-[16px]">
                  check
                </span>
              </div>
              <span className="text-sm font-bold text-gray-400 group-hover:text-hack-violet transition-colors">
                Add to list
              </span>
            </button>
          </div>

          {/* Card 2 */}
          <div className="snap-center shrink-0 w-[280px] bg-white p-6 rounded-3xl shadow-md ring-1 ring-gray-100 relative flex flex-col justify-between h-[200px]">
            <div className="absolute top-5 right-5">
              <button className="text-yellow-400">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
              </button>
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 rounded bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                Lifestyle
              </span>
              <p className="text-text-dark font-bold leading-tight text-lg">
                Are there specific diet changes that could help with energy?
              </p>
            </div>
            <button className="mt-4 flex items-center gap-2 group w-full">
              <div className="size-6 rounded-full gradient-bg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[16px]">check</span>
              </div>
              <span className="text-sm font-bold text-hack-violet transition-colors">Added</span>
            </button>
          </div>

          {/* Card 3 */}
          <div className="snap-center shrink-0 w-[280px] bg-white p-6 rounded-3xl shadow-md ring-1 ring-gray-100 relative flex flex-col justify-between h-[200px]">
            <div className="absolute top-5 right-5">
              <button className="text-gray-200 hover:text-yellow-400 transition-colors">
                <span className="material-symbols-outlined text-[24px]">star</span>
              </button>
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 rounded bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                Monitoring
              </span>
              <p className="text-text-dark font-bold leading-tight text-lg">
                What side effects should I watch for in the next 3 months?
              </p>
            </div>
            <button className="mt-4 flex items-center gap-2 group w-full">
              <div className="size-6 rounded-full border-2 border-gray-200 group-hover:border-hack-violet group-hover:bg-hack-violet/5 transition-all flex items-center justify-center">
                <span className="material-symbols-outlined text-transparent group-hover:text-hack-violet text-[16px]">
                  check
                </span>
              </div>
              <span className="text-sm font-bold text-gray-400 group-hover:text-hack-violet transition-colors">
                Add to list
              </span>
            </button>
          </div>

          {/* More card */}
          <div className="snap-center shrink-0 w-[140px] bg-gray-50/50 p-5 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors group">
            <div className="size-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-gray-400 group-hover:text-hack-violet transition-colors">
                add
              </span>
            </div>
            <p className="text-xs font-extrabold text-gray-400 group-hover:text-hack-violet transition-colors text-center uppercase tracking-widest">
              More
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light via-background-light to-transparent z-40 flex justify-center">
        <button className="w-full max-w-md gradient-bg text-white font-extrabold text-lg py-4 rounded-2xl shadow-xl shadow-hack-violet/20 flex items-center justify-center gap-3 transition-transform active:scale-[0.98]">
          <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
          Start AI Analysis
        </button>
      </div>
    </div>
  );
}
