import React, { createContext, useContext, useMemo, useState } from "react";

export type NextStep = { title: string; detail?: string; done: boolean };
export type MedicalTerm = { term: string; explanation: string };

export type PrepareQuestion = {
  id: string;
  category: string;
  question: string;
  addressed: boolean;
};

export type PrepareContext = {
  symptoms: string;
  goals: string;
  savedQuestions: PrepareQuestion[];
};

export type VisitInsightsData = {
  transcript: string;
  summaryBullets: string[];
  nextSteps: NextStep[];
  followUpQuestions: string[];
  medicalTerms: MedicalTerm[];
  biasDetection: {
    score: number | null;
    notes: string[];
  };
  prepareContext: PrepareContext;
};

type VisitInsightsContextValue = VisitInsightsData & {
  setTranscript: (v: string) => void;
  setSummaryBullets: (v: string[]) => void;
  setNextSteps: (v: NextStep[] | ((prev: NextStep[]) => NextStep[])) => void;
  setFollowUpQuestions: (v: string[]) => void;
  setMedicalTerms: (v: MedicalTerm[]) => void;
  setBiasDetection: (v: VisitInsightsData["biasDetection"]) => void;
  setPrepareContext: (v: PrepareContext) => void;
  toggleQuestionAddressed: (questionId: string) => void;
  reset: () => void;
};

const VisitInsightsContext = createContext<VisitInsightsContextValue | null>(null);

const initialPrepareContext: PrepareContext = {
  symptoms: "",
  goals: "",
  savedQuestions: [],
};

const initial: VisitInsightsData = {
  transcript: "",
  summaryBullets: [],
  nextSteps: [],
  followUpQuestions: [],
  medicalTerms: [],
  biasDetection: { score: null, notes: [] },
  prepareContext: initialPrepareContext,
};

export function VisitInsightsProvider({ children }: { children: React.ReactNode }) {
  const [transcript, setTranscript] = useState(initial.transcript);
  const [summaryBullets, setSummaryBullets] = useState<string[]>(initial.summaryBullets);
  const [nextSteps, _setNextSteps] = useState<NextStep[]>(initial.nextSteps);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>(initial.followUpQuestions);
  const [medicalTerms, setMedicalTerms] = useState<MedicalTerm[]>(initial.medicalTerms);
  const [biasDetection, setBiasDetection] = useState(initial.biasDetection);
  const [prepareContext, setPrepareContext] = useState<PrepareContext>(initial.prepareContext);

  const toggleQuestionAddressed = (questionId: string) => {
    setPrepareContext((prev) => ({
      ...prev,
      savedQuestions: prev.savedQuestions.map((q) =>
        q.id === questionId ? { ...q, addressed: !q.addressed } : q
      ),
    }));
  };

  const value = useMemo<VisitInsightsContextValue>(
    () => ({
      transcript,
      summaryBullets,
      nextSteps,
      followUpQuestions,
      medicalTerms,
      biasDetection,
      prepareContext,

      setTranscript,
      setSummaryBullets,
      setNextSteps: _setNextSteps,
      setFollowUpQuestions,
      setMedicalTerms,
      setBiasDetection,
      setPrepareContext,
      toggleQuestionAddressed,

      reset: () => {
        setTranscript(initial.transcript);
        setSummaryBullets(initial.summaryBullets);
        _setNextSteps(initial.nextSteps);
        setFollowUpQuestions(initial.followUpQuestions);
        setMedicalTerms(initial.medicalTerms);
        setBiasDetection(initial.biasDetection);
        setPrepareContext(initial.prepareContext);
      },
    }),
    [biasDetection, followUpQuestions, medicalTerms, nextSteps, prepareContext, summaryBullets, transcript]
  );

  return <VisitInsightsContext.Provider value={value}>{children}</VisitInsightsContext.Provider>;
}

export function useVisitInsights() {
  const ctx = useContext(VisitInsightsContext);
  if (!ctx) throw new Error("useVisitInsights must be used within VisitInsightsProvider");
  return ctx;
}

