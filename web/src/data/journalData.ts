export type AppointmentEntry = {
  id: string;
  dateLabel: string;
  doctor: string;
  specialty: string;
  summary: string;
  details: {
    location: string;
    duration: string;
    highlights: string[];
    nextSteps: string[];
  };
  icon: string;
  accent: "violet" | "pink";
};

export type JournalEntry = {
  id: string;
  dateLabel: string;
  mood: string | null;
  text: string;
};

export const APPOINTMENTS: AppointmentEntry[] = [
  {
    id: "appt-2026-01-02",
    dateLabel: "Jan 2",
    doctor: "Dr. Emily Chen",
    specialty: "Cardiology",
    summary:
      "Discussed blood pressure medication adjustments. Next follow-up scheduled for 3 months.",
    details: {
      location: "Carilion Clinic",
      duration: "32 min",
      highlights: [
        "Reviewed medication timing and dosage.",
        "Noted morning dizziness improvement.",
      ],
      nextSteps: ["Refill Rx at 90 days", "Schedule April follow-up"],
    },
    icon: "cardiology",
    accent: "violet",
  },
  {
    id: "appt-2025-09-12",
    dateLabel: "Sep 12",
    doctor: "Dr. Mark Solis",
    specialty: "General Practitioner",
    summary: "Annual physical completed. All vitals normal. Recommended starting Vitamin D.",
    details: {
      location: "New River Family Practice",
      duration: "45 min",
      highlights: [
        "Reviewed sleep and stress levels.",
        "Labs ordered for thyroid + iron.",
      ],
      nextSteps: ["Start Vitamin D 1000 IU", "Review labs in portal"],
    },
    icon: "stethoscope",
    accent: "pink",
  },
];

export const JOURNAL_STORAGE_KEY = "hackviolet.journal.entries.v1";

export const SEED_ENTRIES: JournalEntry[] = [
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

export const MOODS = [
  { label: "Calm", icon: "sentiment_satisfied" },
  { label: "Anxious", icon: "sentiment_worried" },
  { label: "Pain", icon: "healing" },
  { label: "Steady", icon: "self_improvement" },
];
