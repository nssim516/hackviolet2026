import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { computeBiasDetection } from "../lib/biasScore";
import { VISIT_HISTORY_KEY, type SavedVisit } from "../data/journalData";
import { useVisitInsights, type MedicalTerm, type NextStep } from "../state/visitInsights";

export default function VisitSummaryInsights() {
  const navigate = useNavigate();
  const {
    transcript,
    summaryBullets,
    nextSteps,
    followUpQuestions,
    medicalTerms,
    biasDetection,
    setTranscript,
    setSummaryBullets,
    setNextSteps,
    setFollowUpQuestions,
    setMedicalTerms,
    setBiasDetection,
    reset: resetInsights,
  } = useVisitInsights();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const serverBiasScore = biasDetection.score;
  const serverBiasNotes = biasDetection.notes;

  const audioUrl = useMemo(() => {
    if (!audioBlob) return null;
    return URL.createObjectURL(audioBlob);
  }, [audioBlob]);

  const localBias = useMemo(() => {
    const combined = [summaryBullets.join("\n"), followUpQuestions.join("\n"), transcript].join("\n");
    return computeBiasDetection(combined);
  }, [followUpQuestions, summaryBullets, transcript]);

  const startRecording = async () => {
    setError(null);
    setStatus("Requesting microphone…");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const mimeType =
        MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";

      const mr = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || "audio/webm" });
        setAudioBlob(blob);
        setIsRecording(false);

        // Release mic.
        mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;

        // Auto-generate insights after stopping.
        await generateInsights(blob);
      };

      mr.start();
      setIsRecording(true);
      setStatus("Recording…");
    } catch (e: any) {
      setStatus(null);
      setIsRecording(false);
      setError(e?.message ?? "Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    setStatus("Stopping…");
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current = null;
  };

  const reset = () => {
    setError(null);
    setStatus(null);
    setAudioBlob(null);
    resetInsights();
  };

  const generateInsights = async (blob: Blob) => {
    setError(null);
    setStatus("Transcribing (Whisper)…");

    try {
      // 1) Whisper STT (server-side proxy; requires OPENAI_API_KEY in web/.env.local)
      const whisper = await fetch("/api/whisper", {
        method: "POST",
        headers: {
          "Content-Type": blob.type || "audio/webm",
        },
        body: blob,
      });
      const whisperJson = await whisper.json();
      if (!whisper.ok) throw new Error(whisperJson?.error ?? "Whisper failed.");

      const text = (whisperJson?.text ?? "").toString();
      setTranscript(text);

      // 2) Summary bullets + follow-up questions
      setStatus("Generating visit insights…");
      const insights = await fetch("/api/visit-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text }),
      });
      const insightsJson = await insights.json();
      if (!insights.ok) throw new Error(insightsJson?.error ?? "Insights failed.");

      setSummaryBullets(Array.isArray(insightsJson?.summaryBullets) ? insightsJson.summaryBullets : []);

      const ns = insightsJson?.nextSteps;
      if (Array.isArray(ns)) {
        // Accept either {title, detail?}[] or string[]
        const mapped: NextStep[] = ns
          .map((item: any) => {
            if (typeof item === "string") return { title: item, done: false } satisfies NextStep;
            if (item && typeof item === "object" && typeof item.title === "string") {
              return {
                title: item.title,
                detail: typeof item.detail === "string" ? item.detail : undefined,
                done: false,
              } satisfies NextStep;
            }
            return null;
          })
          .filter(Boolean) as NextStep[];
        setNextSteps(mapped);
      } else {
        setNextSteps([]);
      }

      const mt = insightsJson?.medicalTerms;
      if (Array.isArray(mt)) {
        const mapped: MedicalTerm[] = mt
          .map((item: any) => {
            if (!item || typeof item !== "object") return null;
            if (typeof item.term !== "string" || typeof item.explanation !== "string") return null;
            return { term: item.term, explanation: item.explanation } satisfies MedicalTerm;
          })
          .filter(Boolean) as MedicalTerm[];
        setMedicalTerms(mapped);
      } else {
        setMedicalTerms([]);
      }

      setFollowUpQuestions(
        Array.isArray(insightsJson?.followUpQuestions) ? insightsJson.followUpQuestions : []
      );

      setBiasDetection({
        score:
          typeof insightsJson?.biasDetection?.score === "number" ? insightsJson.biasDetection.score : null,
        notes: Array.isArray(insightsJson?.biasDetection?.notes) ? insightsJson.biasDetection.notes : [],
      });

      // Persist this visit to history so it shows on the journal timeline.
      const savedBullets: string[] = Array.isArray(insightsJson?.summaryBullets)
        ? insightsJson.summaryBullets
        : text ? [text.slice(0, 120)] : [];
      const savedSteps = (Array.isArray(insightsJson?.nextSteps) ? insightsJson.nextSteps : [])
        .map((s: any) => {
          if (typeof s === "string") return { title: s };
          if (s && typeof s === "object" && typeof s.title === "string")
            return { title: s.title, ...(typeof s.detail === "string" ? { detail: s.detail } : {}) };
          return null;
        })
        .filter(Boolean);
      const now = Date.now();
      const newVisit: SavedVisit = {
        id: `visit-${now}`,
        dateLabel: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        doctor: "Dr. Sarah Smith",
        specialty: "Cardiology",
        summaryBullets: savedBullets,
        nextSteps: savedSteps,
        icon: "cardiology",
        accent: "violet",
        createdAt: now,
      };
      try {
        const prev = JSON.parse(localStorage.getItem(VISIT_HISTORY_KEY) || "[]") as SavedVisit[];
        localStorage.setItem(VISIT_HISTORY_KEY, JSON.stringify([newVisit, ...prev]));
      } catch { /* ignore storage errors */ }

      setStatus("Done.");
      setTimeout(() => setStatus(null), 1200);
    } catch (e: any) {
      setStatus(null);
      setError(e?.message ?? "Something went wrong.");
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-md mx-auto overflow-x-hidden pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-background-light/90 backdrop-blur-md">
        <button
          className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          type="button"
          onClick={() => navigate("/journal")}
          aria-label="Back to journal"
        >
          <span className="material-symbols-outlined text-slate-900">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight">Visit Insights</h1>
        {/* <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <span className="material-symbols-outlined text-slate-900">share</span>
        </button> */}
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
              <p className="text-slate-500 text-sm font-medium mt-1">Jan 2, 2:30 PM</p>
              <p className="text-slate-400 text-xs">Cardiology Clinic</p>
            </div>
          </div>
        </section>

        {/* Visit summary */}
        <section className="flex flex-col gap-3">
          <h3 className="text-lg font-bold px-1 text-slate-800">Visit Summary</h3>

          {/* Record + STT card */}
          <div className="flex flex-col gap-4 rounded-2xl bg-slate-900 p-5 shadow-lg shadow-slate-200">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <p className="text-white text-base font-bold leading-tight">Record + Generate</p>
                <p className="text-slate-400 text-xs font-normal mt-1">
                  Audio is only used to generate insights and provide transcript.
                </p>
              </div>
              {!isRecording ? (
                <button
                  className="flex shrink-0 items-center justify-center rounded-full size-12 bg-hackviolet-gradient text-white shadow-lg transition-transform active:scale-95"
                  type="button"
                  onClick={startRecording}
                  aria-label="Start recording"
                >
                  <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    mic
                  </span>
                </button>
              ) : (
                <button
                  className="flex shrink-0 items-center justify-center rounded-full size-12 bg-red-500 text-white shadow-lg transition-transform active:scale-95"
                  type="button"
                  onClick={stopRecording}
                  aria-label="Stop recording"
                >
                  <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    stop
                  </span>
                </button>
              )}
            </div>

            {status && (
              <div className="text-xs font-semibold text-slate-300 tracking-wide">{status}</div>
            )}
            {error && (
              <div className="text-xs font-semibold text-red-300 tracking-wide">{error}</div>
            )}

            {audioUrl && (
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <audio className="w-full" controls src={audioUrl} />
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={reset}
                    className="text-[11px] font-bold text-slate-300 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary bullets */}
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
            {summaryBullets.length ? (
              <ul className="list-disc pl-5 space-y-2 text-base font-normal leading-relaxed text-slate-600">
                {summaryBullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            ) : (
              <p className="text-base font-normal leading-relaxed text-slate-600">
                Record a short snippet, then we’ll generate bullet-point visit notes here.
              </p>
            )}

            {transcript && (
              <details className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-4">
                <summary className="cursor-pointer text-sm font-bold text-slate-700">
                  View transcript
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {transcript}
                </p>
              </details>
            )}
          </div>

          {/* Follow-up questions */}
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900">Recommended follow-up questions</h4>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                AI-generated
              </span>
            </div>
            {followUpQuestions.length ? (
              <ul className="mt-3 space-y-2">
                {followUpQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-hackviolet-start text-[18px] mt-0.5">
                      help
                    </span>
                    <span className="text-sm text-slate-700 leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                After transcription, we’ll suggest 3–6 clarifying questions you can ask at a follow-up.
              </p>
            )}
          </div>

          {/* Bias detection (placeholder) */}
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900">Bias detection score</h4>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                AI-Generated
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Bias Score
                </p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">
                  {serverBiasScore ?? "—"}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Local heuristic
                </p>
                <p className="mt-1 text-2xl font-extrabold text-slate-900">{localBias.score}</p>
              </div>
            </div>

            {(serverBiasNotes.length > 0 || localBias.flags.length > 0) && (
              <div className="mt-4 rounded-xl bg-violet-50 border border-violet-100 p-4">
                <p className="text-sm font-bold text-slate-900">What we flagged</p>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-slate-700">
                  {serverBiasNotes.map((n, i) => (
                    <li key={`s-${i}`}>{n}</li>
                  ))}
                  {localBias.flags.map((f, i) => (
                    <li key={`l-${i}`}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Next steps */}
        <section className="flex flex-col gap-3">
          <h3 className="text-lg font-bold px-1 text-slate-800">Next Steps</h3>
          <div className="flex flex-col rounded-2xl bg-white p-2 shadow-sm border border-slate-100 divide-y divide-slate-50">
            {nextSteps.length ? (
              nextSteps.map((s, idx) => (
                <label key={idx} className="group flex items-start gap-4 p-4 cursor-pointer">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      className="peer size-6 appearance-none rounded-lg border-2 border-slate-200 bg-transparent checked:border-0 transition-all"
                      type="checkbox"
                      checked={s.done}
                      onChange={() =>
                        setNextSteps((prev) =>
                          prev.map((p, i) => (i === idx ? { ...p, done: !p.done } : p))
                        )
                      }
                    />
                    <div className="absolute inset-0 hidden peer-checked:flex items-center justify-center rounded-lg bg-hackviolet-gradient pointer-events-none">
                      <span className="material-symbols-outlined text-white text-[18px] font-bold">
                        check
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 gap-1">
                    <span
                      className={[
                        "text-base font-semibold transition-colors",
                        s.done
                          ? "text-slate-400 line-through"
                          : "text-slate-900 group-hover:text-hackviolet-start",
                      ].join(" ")}
                    >
                      {s.title}
                    </span>
                    {s.detail && (
                      <span
                        className={[
                          "text-sm",
                          s.done ? "text-slate-300 line-through" : "text-slate-500",
                        ].join(" ")}
                      >
                        {s.detail}
                      </span>
                    )}
                  </div>
                </label>
              ))
            ) : (
              <div className="p-4 text-sm text-slate-500">
                After transcription, we’ll generate an actionable checklist here.
              </div>
            )}
          </div>
        </section>

        {/* Medical terms */}
        <section className="flex flex-col gap-3 pb-12">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-slate-800">Medical Terms Explained</h3>
            <button
              className="text-hackviolet-start text-sm font-bold disabled:opacity-40"
              type="button"
              onClick={() => navigate("/terms")}
              disabled={medicalTerms.length === 0}
            >
              View all
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 snap-x">
            {medicalTerms.length ? (
              medicalTerms.slice(0, 2).map((t, i) => (
                <div
                  key={`${t.term}-${i}`}
                  className="snap-center shrink-0 w-[240px] flex flex-col gap-3 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-50">
                      <span className="material-symbols-outlined text-[22px] text-hackviolet-gradient">
                        local_library
                      </span>
                    </div>
                    <span className="font-bold text-base text-slate-800">{t.term}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{t.explanation}</p>
                </div>
              ))
            ) : (
              <div className="snap-center shrink-0 w-[280px] flex flex-col gap-2 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <p className="text-sm font-bold text-slate-800">No terms detected yet</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  After transcription, we’ll pull out any jargon and explain it in plain language.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Bottom fade */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-light to-transparent pointer-events-none z-10" />
    </div>
  );
}
