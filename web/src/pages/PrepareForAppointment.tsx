import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SuggestedQuestion {
  id: string;
  category: string;
  question: string;
}

const STORAGE_KEY = "clarity-prepare";

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  Medication: { bg: "bg-blue-50", text: "text-blue-600" },
  Lifestyle: { bg: "bg-purple-50", text: "text-purple-600" },
  Monitoring: { bg: "bg-orange-50", text: "text-orange-600" },
  Diagnosis: { bg: "bg-rose-50", text: "text-rose-600" },
  Prevention: { bg: "bg-green-50", text: "text-green-600" },
  "Follow-up": { bg: "bg-cyan-50", text: "text-cyan-600" },
};

function categoryStyle(cat: string) {
  return CATEGORY_STYLES[cat] ?? { bg: "bg-gray-50", text: "text-gray-600" };
}

const hashString = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
};

const buildQuestionId = (category: string, question: string) =>
  `q_${hashString(`${category}::${question}`)}`;

const normalizeQuestions = (raw: unknown[]): SuggestedQuestion[] =>
  raw
    .map((item) => {
      if (typeof item === "string") {
        const question = item.trim();
        return {
          id: buildQuestionId("General", question),
          category: "General",
          question,
        };
      }
      if (!item || typeof item !== "object") return null;
      const question = String((item as { question?: unknown }).question ?? "").trim();
      const category = String((item as { category?: unknown }).category ?? "General").trim() || "General";
      if (!question) return null;
      const id = String((item as { id?: unknown }).id ?? buildQuestionId(category, question));
      return { id, category, question };
    })
    .filter((item): item is SuggestedQuestion => Boolean(item));

export default function PrepareForAppointment() {
  const navigate = useNavigate();

  // --- persisted state ---
  const [symptoms, setSymptoms] = useState("");
  const [goals, setGoals] = useState("");
  const [questions, setQuestions] = useState<SuggestedQuestion[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [starredIds, setStarredIds] = useState<Set<string>>(new Set());

  // --- transient state ---
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveFlash, setSaveFlash] = useState(false);

  // mic recording state per field
  const [recordingField, setRecordingField] = useState<"symptoms" | "goals" | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const [transcribing, setTranscribing] = useState(false);

  // --- load from localStorage on mount ---
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.symptoms) setSymptoms(data.symptoms);
      if (data.goals) setGoals(data.goals);
      const storedQuestions = Array.isArray(data.questions)
        ? normalizeQuestions(data.questions)
        : [];
      if (storedQuestions.length) setQuestions(storedQuestions);
      if (Array.isArray(data.savedIds)) {
        setSavedIds(new Set(data.savedIds));
      } else if (Array.isArray(data.savedIndices) && storedQuestions.length) {
        const mapped = data.savedIndices
          .map((index: number) => storedQuestions[index]?.id)
          .filter(Boolean);
        setSavedIds(new Set(mapped));
      }
      if (Array.isArray(data.starredIds)) {
        setStarredIds(new Set(data.starredIds));
      } else if (Array.isArray(data.starredIndices) && storedQuestions.length) {
        const mapped = data.starredIndices
          .map((index: number) => storedQuestions[index]?.id)
          .filter(Boolean);
        setStarredIds(new Set(mapped));
      }
    } catch {
      /* ignore corrupt data */
    }
  }, []);

  // --- save to localStorage ---
  const persistToStorage = useCallback(() => {
    const data = {
      symptoms,
      goals,
      questions,
      savedIds: [...savedIds],
      starredIds: [...starredIds],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1500);
  }, [symptoms, goals, questions, savedIds, starredIds]);

  // --- mic recording ---
  const startRecording = async (field: "symptoms" | "goals") => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "";
      const mr = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || "audio/webm" });
        mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
        setRecordingField(null);
        await transcribeAndPopulate(blob, field);
      };

      mr.start();
      setRecordingField(field);
    } catch (e: any) {
      setRecordingField(null);
      setError(e?.message ?? "Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current = null;
  };

  const transcribeAndPopulate = async (blob: Blob, field: "symptoms" | "goals") => {
    setTranscribing(true);
    setError(null);
    try {
      const resp = await fetch("/api/whisper", {
        method: "POST",
        headers: { "Content-Type": blob.type || "audio/webm" },
        body: blob,
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error ?? "Transcription failed.");
      const text = (data?.text ?? "").toString();
      if (field === "symptoms") {
        setSymptoms((prev) => (prev ? prev + " " + text : text));
      } else {
        setGoals((prev) => (prev ? prev + " " + text : text));
      }
    } catch (e: any) {
      setError(e?.message ?? "Transcription failed.");
    } finally {
      setTranscribing(false);
    }
  };

  // --- AI analysis ---
  const generateQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch("/api/prepare-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, goals }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error ?? "Failed to generate questions.");
      const newQs = normalizeQuestions(Array.isArray(data?.questions) ? data.questions : []);
      setQuestions(newQs);
      setSavedIds(new Set());
      setStarredIds(new Set());
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // --- More button ---
  const fetchMore = async () => {
    setMoreLoading(true);
    setError(null);
    try {
      const resp = await fetch("/api/prepare-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms,
          goals,
          existing: questions.map((q) => q.question),
        }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error ?? "Failed to generate more questions.");
      const newQs = normalizeQuestions(Array.isArray(data?.questions) ? data.questions : []);
      setQuestions((prev) => {
        const existing = new Set(prev.map((q) => q.id));
        const merged = [...prev];
        for (const q of newQs) {
          if (!existing.has(q.id)) {
            merged.push(q);
            existing.add(q.id);
          }
        }
        return merged;
      });
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setMoreLoading(false);
    }
  };

  // --- toggle helpers ---
  const toggleSaved = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleStarred = (id: string) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const isBusy = loading || moreLoading || transcribing;

  return (
    <div className="relative flex h-full w-full flex-col max-w-md mx-auto overflow-hidden min-h-screen pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-background-light/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100">
        <button
          className="text-text-dark flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          type="button"
          onClick={() => navigate("/journal")}
          aria-label="Back to journal"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Prepare for Appointment
        </h2>
        <button
          className="flex w-12 items-center justify-end group"
          type="button"
          onClick={persistToStorage}
        >
          <p className={`text-base font-bold leading-normal tracking-[0.015em] shrink-0 transition-colors ${saveFlash ? "text-green-500" : "text-hack-violet hover:text-hack-pink"}`}>
            {saveFlash ? "Saved!" : "Save"}
          </p>
        </button>
      </header>

      {/* Doctor profile */}
      <div className="pt-6 px-4 pb-2">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="size-20 rounded-full overflow-hidden bg-gray-100 mb-2 ring-4 ring-white shadow-md">
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
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
              <button
                type="button"
                onClick={() =>
                  recordingField === "symptoms" ? stopRecording() : startRecording("symptoms")
                }
                disabled={isBusy && recordingField !== "symptoms"}
                className={`absolute bottom-3 right-3 p-3 rounded-full transition-colors flex items-center justify-center ${
                  recordingField === "symptoms"
                    ? "bg-red-500 text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-hack-violet"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {recordingField === "symptoms" ? "stop" : "mic"}
                </span>
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
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              />
              <button
                type="button"
                onClick={() =>
                  recordingField === "goals" ? stopRecording() : startRecording("goals")
                }
                disabled={isBusy && recordingField !== "goals"}
                className={`absolute bottom-3 right-3 p-3 rounded-full transition-colors flex items-center justify-center ${
                  recordingField === "goals"
                    ? "bg-red-500 text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-hack-violet"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {recordingField === "goals" ? "stop" : "mic"}
                </span>
              </button>
            </div>
          </label>
        </div>

        {/* Status / error banners */}
        {transcribing && (
          <p className="mt-3 text-xs font-semibold text-hack-violet animate-pulse">Transcribing audio…</p>
        )}
        {error && (
          <p className="mt-3 text-xs font-semibold text-red-500">{error}</p>
        )}
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
              {questions.length > 0
                ? `${savedIds.size} of ${questions.length} added to your list`
                : "Personalized AI recommendations"}
            </p>
          </div>
          {questions.length > 0 && (
            <span className="text-xs font-bold text-gray-400">
              {questions.length} generated
            </span>
          )}
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-4 px-4 pb-6 snap-x snap-mandatory">
          {questions.length === 0 && !loading && (
            <div className="snap-center shrink-0 w-[280px] bg-white p-6 rounded-3xl shadow-md ring-1 ring-gray-100 flex flex-col items-center justify-center h-[200px] text-center">
              <span className="material-symbols-outlined text-gray-200 text-[40px] mb-3">
                psychology
              </span>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                Add your notes above, then tap<br /><strong>Start AI Analysis</strong> to get personalized questions.
              </p>
            </div>
          )}

          {loading && questions.length === 0 && (
            <div className="snap-center shrink-0 w-[280px] bg-white p-6 rounded-3xl shadow-md ring-1 ring-gray-100 flex flex-col items-center justify-center h-[200px]">
              <span className="material-symbols-outlined text-hack-violet text-[32px] animate-spin">
                progress_activity
              </span>
              <p className="mt-3 text-sm font-semibold text-gray-500">Generating questions…</p>
            </div>
          )}

          {questions.map((q) => {
            const style = categoryStyle(q.category);
            const isSaved = savedIds.has(q.id);
            const isStarred = starredIds.has(q.id);

            return (
              <div
                key={q.id}
                className="snap-center shrink-0 w-[280px] bg-white p-6 rounded-3xl shadow-md ring-1 ring-gray-100 relative flex flex-col justify-between h-[200px]"
              >
                <div className="absolute top-5 right-5">
                  <button
                    type="button"
                    onClick={() => toggleStarred(q.id)}
                    className={`transition-colors ${isStarred ? "text-yellow-400" : "text-gray-200 hover:text-yellow-400"}`}
                  >
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={isStarred ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      star
                    </span>
                  </button>
                </div>
                <div>
                  <span
                    className={`inline-block px-2 py-0.5 rounded ${style.bg} ${style.text} text-[10px] font-bold uppercase tracking-widest mb-4`}
                  >
                    {q.category}
                  </span>
                  <p className="text-text-dark font-bold leading-tight text-base line-clamp-4 overflow-hidden">{q.question}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleSaved(q.id)}
                  className="mt-4 flex items-center gap-2 group w-full"
                >
                  {isSaved ? (
                    <>
                      <div className="size-6 rounded-full gradient-bg flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[16px]">check</span>
                      </div>
                      <span className="text-sm font-bold text-hack-violet transition-colors">Added</span>
                    </>
                  ) : (
                    <>
                      <div className="size-6 rounded-full border-2 border-gray-200 group-hover:border-hack-violet group-hover:bg-hack-violet/5 transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined text-transparent group-hover:text-hack-violet text-[16px]">
                          check
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-400 group-hover:text-hack-violet transition-colors">
                        Add to list
                      </span>
                    </>
                  )}
                </button>
              </div>
            );
          })}

          {/* More card */}
          {questions.length > 0 && (
            <button
              type="button"
              onClick={fetchMore}
              disabled={moreLoading}
              className="snap-center shrink-0 w-[140px] bg-gray-50/50 p-5 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors group"
            >
              {moreLoading ? (
                <span className="material-symbols-outlined text-hack-violet text-[28px] animate-spin">
                  progress_activity
                </span>
              ) : (
                <>
                  <div className="size-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-hack-violet transition-colors">
                      add
                    </span>
                  </div>
                  <p className="text-xs font-extrabold text-gray-400 group-hover:text-hack-violet transition-colors text-center uppercase tracking-widest">
                    More
                  </p>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light via-background-light to-transparent z-40 flex justify-center">
        <button
          type="button"
          onClick={generateQuestions}
          disabled={loading || (!symptoms.trim() && !goals.trim())}
          className="w-full max-w-md gradient-bg text-white font-extrabold text-lg py-4 rounded-2xl shadow-xl shadow-hack-violet/20 flex items-center justify-center gap-3 transition-transform active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
              Analyzing…
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
              Start AI Analysis
            </>
          )}
        </button>
      </div>
    </div>
  );
}
